import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Play } from "lucide-react";

/* ───────── Types ───────── */

type GalleryItem = {
  src: string;
  type: "image" | "video";
  colSpan?: number;
};

type ClassifiedItem = GalleryItem & {
  ratio: number; // width / height
  index: number;
};

type Row = {
  items: ClassifiedItem[];
  fractions: number[]; // CSS fr values per item
  height: number; // normalised row height (relative to container width=1)
};

/* ───────── Dimension detection ───────── */

function detectDimensions(item: GalleryItem): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    if (item.type === "video") {
      const v = document.createElement("video");
      v.preload = "metadata";
      v.onloadedmetadata = () => resolve({ width: v.videoWidth || 16, height: v.videoHeight || 9 });
      v.onerror = () => resolve({ width: 16, height: 9 });
      v.src = item.src;
    } else {
      const img = new Image();
      img.onload = () => resolve({ width: img.naturalWidth || 1, height: img.naturalHeight || 1 });
      img.onerror = () => resolve({ width: 1, height: 1 });
      img.src = item.src;
    }
  });
}

/* ───────── Row math ───────── */

// Given items in a row, compute the normalised row height and fr values.
// All items share the same height h. For item i with ratio r_i and fraction f_i:
//   width_i = f_i * totalWidth, height = width_i / r_i
//   Since all heights are equal: f_i / r_i = constant = h
//   Sum(f_i) = 1, so h = 1 / Sum(r_i)  ... wait, with gap we adjust.
// Simpler: let S = sum of all ratios. Each fraction = r_i / S. Height = 1/S (normalised).
// Gap adjustment: with (n-1) gaps of gapPx in containerWidth, effective width = 1 - (n-1)*gap/containerWidth
// We ignore gap for scoring (tiny impact) but could refine later.

function computeRow(items: ClassifiedItem[], gapFraction: number = 0): Row {
  const n = items.length;
  const totalGap = (n - 1) * gapFraction;
  const availableWidth = 1 - totalGap;
  const sumRatios = items.reduce((s, it) => s + it.ratio, 0);
  const height = availableWidth / sumRatios;
  const fractions = items.map((it) => it.ratio); // raw ratios as fr units
  return { items, fractions, height };
}

/* ───────── DP optimal row partitioning ───────── */

// Target height as fraction of container width. 
// For a container ~700px wide, targetH=0.38 → ~266px row height. Reasonable.
const TARGET_H = 0.38;
const MIN_H = 0.15;
const MAX_H = 0.75;
const MAX_ITEMS_PER_ROW = 5;

function scoreRow(items: ClassifiedItem[]): number {
  const row = computeRow(items);
  const h = row.height;

  // Out of bounds → heavy penalty
  if (h < MIN_H * 0.5 || h > MAX_H * 1.5) return -1e6;

  // Height deviation from target
  const deviation = Math.abs(h - TARGET_H) / TARGET_H;
  let score = 100 - deviation * 80;

  // Bonus for rows with 2-3 items (denser, more editorial)
  if (items.length >= 2 && items.length <= 3) score += 10;
  if (items.length === 1) score -= 5; // single item rows are fine but not ideal

  // Penalty for very tall rows (single portrait items)
  if (h > MAX_H) score -= (h - MAX_H) * 200;
  if (h < MIN_H) score -= (MIN_H - h) * 200;

  // Bonus if row height is comfortably in the sweet spot
  if (h >= 0.25 && h <= 0.5) score += 15;

  return score;
}

type DPResult = { score: number; split: number[] };

function dpPlanRows(items: ClassifiedItem[]): Row[] {
  const n = items.length;
  if (n === 0) return [];

  // memo[i] = best way to partition items[i..n-1] into rows
  const memo: Map<number, DPResult> = new Map();

  function solve(start: number): DPResult {
    if (start >= n) return { score: 0, split: [] };
    if (memo.has(start)) return memo.get(start)!;

    let best: DPResult = { score: -Infinity, split: [] };

    const maxEnd = Math.min(start + MAX_ITEMS_PER_ROW, n);
    for (let end = start + 1; end <= maxEnd; end++) {
      const rowItems = items.slice(start, end);
      const rs = scoreRow(rowItems);
      const rest = solve(end);
      const total = rs + rest.score;
      if (total > best.score) {
        best = { score: total, split: [end, ...rest.split] };
      }
    }

    memo.set(start, best);
    return best;
  }

  const result = solve(0);

  // Build rows from splits
  const rows: Row[] = [];
  let prev = 0;
  for (const s of result.split) {
    const rowItems = items.slice(prev, s);
    rows.push(computeRow(rowItems));
    prev = s;
  }

  return rows;
}

/* ───────── Rebalancing: try permutations of last items ───────── */

function tryRebalance(items: ClassifiedItem[]): ClassifiedItem[] {
  const n = items.length;
  if (n <= 3) return items; // too few to rebalance

  // Try swapping last few items with earlier ones to see if we get better score
  // Simple approach: try moving the best landscape item to the end
  const best = dpPlanRows(items);
  const bestScore = best.reduce((s, r) => s + scoreRow(r.items), 0);

  let bestItems = items;
  let bestTotal = bestScore;

  // Try: move each landscape item to the end position
  for (let i = 0; i < n - 1; i++) {
    if (items[i].ratio > 1.2) {
      const variant = [...items];
      const [moved] = variant.splice(i, 1);
      variant.push(moved);
      const rows = dpPlanRows(variant);
      const total = rows.reduce((s, r) => s + scoreRow(r.items), 0);
      if (total > bestTotal + 5) {
        bestTotal = total;
        bestItems = variant;
      }
    }
  }

  // Try: swap last portrait with an earlier landscape
  const lastIdx = n - 1;
  if (items[lastIdx].ratio < 0.85) {
    for (let i = 0; i < lastIdx; i++) {
      if (items[i].ratio > 1.15) {
        const variant = [...items];
        [variant[i], variant[lastIdx]] = [variant[lastIdx], variant[i]];
        const rows = dpPlanRows(variant);
        const total = rows.reduce((s, r) => s + scoreRow(r.items), 0);
        if (total > bestTotal + 5) {
          bestTotal = total;
          bestItems = variant;
        }
      }
    }
  }

  return bestItems;
}

/* ───────── VideoPlayer ───────── */

const VideoPlayer = ({ src, alt }: { src: string; alt: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play();
    setPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setPlaying(false);
  }, []);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src={src}
        controls={playing}
        playsInline
        onPause={handlePause}
        onEnded={handlePause}
        className="w-full h-full object-contain block"
        aria-label={alt}
      />
      {!playing && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40"
        >
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <Play size={22} className="text-gray-900 ml-0.5" fill="currentColor" />
          </div>
        </button>
      )}
    </div>
  );
};

/* ───────── Main component ───────── */

type AdaptiveGalleryProps = {
  items: GalleryItem[];
  campaignTitle: string;
};

const AdaptiveGallery = ({ items, campaignTitle }: AdaptiveGalleryProps) => {
  const [rows, setRows] = useState<Row[] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function buildLayout() {
      // 1. Detect dimensions for all items
      const classified: ClassifiedItem[] = await Promise.all(
        items.map(async (item, index) => {
          const dims = await detectDimensions(item);
          const ratio = dims.width / dims.height;
          return { ...item, ratio, index };
        })
      );

      if (cancelled) return;

      // 2. Rebalance order for better composition
      const rebalanced = tryRebalance(classified);

      // 3. DP optimal row partitioning
      const optimalRows = dpPlanRows(rebalanced);

      if (!cancelled) setRows(optimalRows);
    }

    buildLayout();
    return () => { cancelled = true; };
  }, [items]);

  return (
    <div ref={containerRef} className="w-full space-y-2">
      {!rows ? (
        <div className="grid grid-cols-3 gap-2">
          {items.map((_, i) => (
            <div key={i} className="animate-pulse rounded-xl bg-white/10 h-40" />
          ))}
        </div>
      ) : (
        rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            style={{
              display: "grid",
              gridTemplateColumns: row.fractions.map((f) => `${f.toFixed(4)}fr`).join(" "),
              gap: "8px",
            }}
          >
            {row.items.map((item, idx) => (
              <div
                key={`${rowIdx}-${idx}`}
                className="overflow-hidden rounded-xl bg-black/40"
              >
                {item.type === "video" ? (
                  <VideoPlayer
                    src={item.src}
                    alt={`${campaignTitle} - ${item.index + 1}`}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={`${campaignTitle} - ${item.index + 1}`}
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                )}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default AdaptiveGallery;
