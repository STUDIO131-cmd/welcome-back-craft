import { useState, useEffect, useRef, useCallback } from "react";
import { Play } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   EDITORIAL LAYOUT ENGINE v3
   classify → compose → score → select → fix ending
   ═══════════════════════════════════════════════════════ */

/* ───────── Types ───────── */

type GalleryItem = { src: string; type: "image" | "video"; colSpan?: number; posterTime?: number; poster?: string };

type Orientation = "portrait" | "square" | "landscape";
type VisualWeight = "hero" | "primary" | "secondary";

type ClassifiedItem = GalleryItem & {
  ratio: number;
  index: number;
  orientation: Orientation;
  weight: VisualWeight;
};

type Row = {
  items: ClassifiedItem[];
  fractions: number[];
  height: number; // normalised (containerWidth = 1)
};

type Candidate = {
  rows: Row[];
  score: number;
};

/* ───────── Dimension detection ───────── */

function detectDimensions(item: GalleryItem): Promise<{ w: number; h: number }> {
  return new Promise((res) => {
    if (item.type === "video") {
      const v = document.createElement("video");
      v.preload = "metadata";
      v.onloadedmetadata = () => res({ w: v.videoWidth || 16, h: v.videoHeight || 9 });
      v.onerror = () => res({ w: 16, h: 9 });
      v.src = item.src;
    } else {
      const img = new Image();
      img.onload = () => res({ w: img.naturalWidth || 1, h: img.naturalHeight || 1 });
      img.onerror = () => res({ w: 1, h: 1 });
      img.src = item.src;
    }
  });
}

/* ───────── Step 1: Classify ───────── */

function classify(item: GalleryItem, ratio: number, index: number, totalVideos: number): ClassifiedItem {
  const orientation: Orientation =
    ratio > 1.15 ? "landscape" : ratio < 0.85 ? "portrait" : "square";

  let weight: VisualWeight = "secondary";
  if (item.type === "video") {
    weight = totalVideos <= 3 ? "hero" : "primary";
  } else if (orientation === "landscape") {
    weight = "primary";
  }

  return { ...item, ratio, index, orientation, weight };
}

/* ───────── Row math ───────── */

function computeRow(items: ClassifiedItem[]): Row {
  const sumRatios = items.reduce((s, it) => s + it.ratio, 0);
  const height = 1 / sumRatios; // normalised
  return { items, fractions: items.map((it) => it.ratio), height };
}

/* ───────── Step 2 & 3: DP planner with editorial scoring ───────── */

const TARGET_H = 0.38;
const MIN_H = 0.14;
const MAX_H = 0.85;
const MAX_PER_ROW = 4;

function scoreRow(items: ClassifiedItem[], isLastRow: boolean, totalRows: number): number {
  const row = computeRow(items);
  const h = row.height;

  if (h < MIN_H * 0.4 || h > MAX_H * 1.6) return -1e6;

  // Base: closeness to target height
  const dev = Math.abs(h - TARGET_H) / TARGET_H;
  let s = 100 - dev * 70;

  // Height comfort zone
  if (h >= 0.22 && h <= 0.50) s += 12;
  if (h < MIN_H) s -= (MIN_H - h) * 250;
  if (h > MAX_H) s -= (h - MAX_H) * 250;

  const n = items.length;

  // Editorial density: prefer 2-3 items per row
  if (n === 2 || n === 3) s += 14;
  if (n === 4) s += 6;
  if (n === 1 && !isLastRow) s -= 8;
  if (n === 1 && isLastRow) s += 5; // single full-width closing is acceptable

  // Video prominence: STRONG bias for videos to dominate their row
  const videoItems = items.filter((it) => it.type === "video");
  const hasVideo = videoItems.length > 0;
  if (hasVideo) {
    const videoRatioShare = videoItems.reduce((sum, it) => sum + it.ratio, 0) / items.reduce((sum, it) => sum + it.ratio, 0);
    
    // Video solo or with 1 companion = ideal editorial
    if (videoItems.length === 1 && n === 1) s += 30; // full-width video = maximum impact
    if (videoItems.length === 1 && n === 2) s += 22; // video + 1 support = strong
    if (videoItems.length >= 2 && n === 2) s += 18; // two videos side by side = cinematic
    
    // Video getting good share of width
    if (videoRatioShare >= 0.5) s += 15;
    else if (videoRatioShare >= 0.35) s += 8;
    else s -= 12; // video squeezed = bad
    
    // Heavy penalty for video crammed with many items
    if (n >= 3 && hasVideo) s -= 18;
    if (n >= 4 && hasVideo) s -= 25;
  }

  // Hero items alone or with 1 support = good editorial
  const heroes = items.filter((it) => it.weight === "hero");
  if (heroes.length === 1 && n <= 2) s += 18;
  if (heroes.length === 1 && n === 1) s += 12; // stacks with video solo bonus

  // Landscape items getting full space
  const landscapes = items.filter((it) => it.orientation === "landscape");
  if (landscapes.length === 1 && n === 1) s += 8; // full-width landscape = strong

  // Last row special: prefer solid endings
  if (isLastRow) {
    if (n === 1 && items[0].orientation === "landscape") s += 15;
    if (n === 1 && items[0].type === "video") s += 12;
    if (n === 2) s += 8;
    if (n === 3) s += 5;
    // Penalise lonely portrait at the end
    if (n === 1 && items[0].orientation === "portrait") s -= 10;
  }

  // Monotony penalty: all same orientation
  const orientations = new Set(items.map((it) => it.orientation));
  if (n >= 3 && orientations.size === 1) s -= 6;

  return s;
}

function dpPlanRows(items: ClassifiedItem[]): Row[] {
  const n = items.length;
  if (n === 0) return [];

  const memo: Map<number, { score: number; split: number[] }> = new Map();

  function solve(start: number): { score: number; split: number[] } {
    if (start >= n) return { score: 0, split: [] };
    if (memo.has(start)) return memo.get(start)!;

    let best = { score: -Infinity, split: [] as number[] };
    const maxEnd = Math.min(start + MAX_PER_ROW, n);

    for (let end = start + 1; end <= maxEnd; end++) {
      const rowItems = items.slice(start, end);
      const isLast = end === n;
      // Estimate total rows for context
      const remainingItems = n - end;
      const estRemaining = Math.ceil(remainingItems / 2.5);
      const rs = scoreRow(rowItems, isLast, estRemaining + 1);
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
  const rows: Row[] = [];
  let prev = 0;
  for (const s of result.split) {
    rows.push(computeRow(items.slice(prev, s)));
    prev = s;
  }
  return rows;
}

/* ───────── Step 2b: Generate candidate permutations ───────── */

function generateCandidates(items: ClassifiedItem[]): ClassifiedItem[][] {
  const candidates: ClassifiedItem[][] = [items];
  const n = items.length;
  if (n <= 2) return candidates;

  // Strategy 1: Move best landscape to end (strong closing)
  const bestLandscapeIdx = items.reduce(
    (best, it, i) => (it.orientation === "landscape" && it.ratio > (items[best]?.ratio ?? 0) ? i : best),
    -1
  );
  if (bestLandscapeIdx > 0 && bestLandscapeIdx < n - 1) {
    const v = [...items];
    const [moved] = v.splice(bestLandscapeIdx, 1);
    v.push(moved);
    candidates.push(v);
  }

  // Strategy 2: Move best landscape to start (strong opening)
  if (bestLandscapeIdx > 0) {
    const v = [...items];
    const [moved] = v.splice(bestLandscapeIdx, 1);
    v.unshift(moved);
    candidates.push(v);
  }

  // Strategy 3: Move first hero video to position 0 if not already
  const firstHeroIdx = items.findIndex((it) => it.weight === "hero");
  if (firstHeroIdx > 0) {
    const v = [...items];
    const [moved] = v.splice(firstHeroIdx, 1);
    v.unshift(moved);
    candidates.push(v);
  }

  // Strategy 4: Swap last item with a stronger item if last is weak
  const last = items[n - 1];
  if (last.orientation === "portrait" && last.type === "image") {
    // Find a landscape or video to swap with
    for (let i = Math.max(0, n - 5); i < n - 1; i++) {
      if (items[i].orientation === "landscape" || items[i].type === "video") {
        const v = [...items];
        [v[i], v[n - 1]] = [v[n - 1], v[i]];
        candidates.push(v);
        break;
      }
    }
  }

  // Strategy 5: Alternate video/image for editorial rhythm
  const videos = items.filter((it) => it.type === "video");
  const images = items.filter((it) => it.type === "image");
  if (videos.length >= 2 && images.length >= 2) {
    const interleaved: ClassifiedItem[] = [];
    let vi = 0, ii = 0;
    let useVideo = true;
    while (vi < videos.length || ii < images.length) {
      if (useVideo && vi < videos.length) {
        interleaved.push(videos[vi++]);
      } else if (ii < images.length) {
        interleaved.push(images[ii++]);
      } else if (vi < videos.length) {
        interleaved.push(videos[vi++]);
      }
      useVideo = !useVideo;
    }
    candidates.push(interleaved);
  }

  // Strategy 6: Group portraits together in middle, landscapes at edges
  const portraits = items.filter((it) => it.orientation === "portrait");
  const nonPortraits = items.filter((it) => it.orientation !== "portrait");
  if (portraits.length >= 2 && nonPortraits.length >= 2) {
    const half = Math.ceil(nonPortraits.length / 2);
    const arranged = [
      ...nonPortraits.slice(0, half),
      ...portraits,
      ...nonPortraits.slice(half),
    ];
    candidates.push(arranged);
  }

  return candidates;
}

/* ───────── Step 3b: Score entire composition ───────── */

function scoreComposition(rows: Row[]): number {
  let total = 0;

  // Sum row scores
  rows.forEach((row, i) => {
    total += scoreRow(row.items, i === rows.length - 1, rows.length);
  });

  // Editorial alternation bonus: check weight variety between consecutive rows
  for (let i = 1; i < rows.length; i++) {
    const prevHasHero = rows[i - 1].items.some((it) => it.weight === "hero" || it.weight === "primary");
    const currHasHero = rows[i].items.some((it) => it.weight === "hero" || it.weight === "primary");
    // Alternation between heavy and light rows
    if (prevHasHero !== currHasHero) total += 6;
    // Penalise two consecutive heavy rows
    if (prevHasHero && currHasHero) total -= 3;

    // Penalise same item count in consecutive rows (monotony)
    if (rows[i].items.length === rows[i - 1].items.length && rows[i].items.length >= 3) {
      total -= 4;
    }
  }

  // Height variance penalty: rows should have somewhat similar heights
  const heights = rows.map((r) => r.height);
  const avgH = heights.reduce((a, b) => a + b, 0) / heights.length;
  const variance = heights.reduce((s, h) => s + (h - avgH) ** 2, 0) / heights.length;
  total -= variance * 300;

  // Last row strength
  const lastRow = rows[rows.length - 1];
  if (lastRow) {
    const lastH = lastRow.height;
    // Penalise very thin last row
    if (lastH < 0.18) total -= 20;
    // Bonus for last row being a single landscape/video full-width
    if (lastRow.items.length === 1 && (lastRow.items[0].orientation === "landscape" || lastRow.items[0].type === "video")) {
      total += 10;
    }
  }

  return total;
}

/* ───────── Step 5: Fix ending ───────── */

function fixEnding(rows: Row[]): Row[] {
  if (rows.length < 2) return rows;

  const lastRow = rows[rows.length - 1];
  const prevRow = rows[rows.length - 2];

  // Case: last row has a single lonely portrait → try pulling an item from prev row
  if (
    lastRow.items.length === 1 &&
    lastRow.items[0].orientation === "portrait" &&
    prevRow.items.length >= 3
  ) {
    const combined = [...prevRow.items, ...lastRow.items];
    // Try splitting combined as [n-1, rest]
    const splitPoint = Math.ceil(combined.length / 2);
    const newPrev = computeRow(combined.slice(0, splitPoint));
    const newLast = computeRow(combined.slice(splitPoint));

    const oldScore =
      scoreRow(prevRow.items, false, rows.length) +
      scoreRow(lastRow.items, true, rows.length);
    const newScore =
      scoreRow(newPrev.items, false, rows.length) +
      scoreRow(newLast.items, true, rows.length);

    if (newScore > oldScore) {
      return [...rows.slice(0, -2), newPrev, newLast];
    }
  }

  // Case: last row is very thin → merge with previous
  if (lastRow.height < 0.15 && prevRow.items.length + lastRow.items.length <= MAX_PER_ROW) {
    const merged = computeRow([...prevRow.items, ...lastRow.items]);
    if (merged.height >= MIN_H && merged.height <= MAX_H) {
      return [...rows.slice(0, -2), merged];
    }
  }

  return rows;
}

/* ───────── Step 4: Select best ───────── */

function selectBestLayout(items: ClassifiedItem[]): Row[] {
  const candidates = generateCandidates(items);
  let bestRows: Row[] = [];
  let bestScore = -Infinity;

  for (const candidate of candidates) {
    let rows = dpPlanRows(candidate);
    rows = fixEnding(rows);
    const score = scoreComposition(rows);
    if (score > bestScore) {
      bestScore = score;
      bestRows = rows;
    }
  }

  return bestRows;
}

/* ───────── VideoPlayer ───────── */

const VideoPlayer = ({ src, alt, posterTime, poster }: { src: string; alt: string; posterTime?: number; poster?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [pendingPlay, setPendingPlay] = useState(false);

  const handlePlay = useCallback(() => {
    if (poster && !playing) {
      // Video element not in DOM yet — flag it and let useEffect handle playback
      setPlaying(true);
      setPendingPlay(true);
      return;
    }
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    v.play();
    setPlaying(true);
  }, [poster, playing]);

  // When switching from poster to video element, start playback once mounted
  useEffect(() => {
    if (pendingPlay && playing && videoRef.current) {
      const v = videoRef.current;
      v.currentTime = 0;
      v.muted = false;
      v.play();
      setPendingPlay(false);
    }
  }, [pendingPlay, playing]);

  const handleLoadedMetadata = useCallback(() => {
    const v = videoRef.current;
    if (v && posterTime !== undefined && !poster && !playing) {
      v.currentTime = posterTime;
    }
  }, [posterTime, poster, playing]);

  return (
    <div className="relative w-full h-full">
      {poster && !playing ? (
        <img src={poster} alt={alt} className="w-full h-full object-cover block" />
      ) : (
        <video
          ref={videoRef}
          src={src}
          controls={playing}
          playsInline
          preload={poster ? "auto" : "metadata"}
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={() => {
            if (pendingPlay) {
              const v = videoRef.current;
              if (v) { v.currentTime = 0; v.muted = false; v.play(); setPendingPlay(false); }
            }
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          className="w-full h-full object-cover block"
          aria-label={alt}
        />
      )}
      {!playing && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
        >
          <div
            className="flex items-center gap-2.5 rounded-full px-5 py-2.5 backdrop-blur-md border border-white/[0.15] transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.08)",
              boxShadow: "0 0 20px rgba(255,255,255,0.25), 0 0 40px rgba(255,255,255,0.1)",
            }}
          >
            <Play size={16} className="text-white/90" fill="currentColor" />
            <span className="text-white/90 text-xs font-medium tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-heading)" }}>
              Play
            </span>
          </div>
        </button>
      )}
    </div>
  );
};

/* ───────── Manual layout types ───────── */

type ManualRow = { indices: number[]; fractions?: number[]; height?: string };

/* ───────── Main component ───────── */

type Props = {
  items: GalleryItem[];
  campaignTitle: string;
  /** Optional manual layout: array of rows, each with item indices and optional fr fractions */
  manualLayout?: ManualRow[];
};

const AdaptiveGallery = ({ items, campaignTitle, manualLayout }: Props) => {
  const [rows, setRows] = useState<Row[] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (manualLayout) {
      // Manual mode: build rows from provided layout
      let cancelled = false;
      (async () => {
        const dims = await Promise.all(items.map((item) => detectDimensions(item)));
        if (cancelled) return;
        const totalVideos = items.filter((it) => it.type === "video").length;
        const classified = items.map((item, i) =>
          classify(item, dims[i].w / dims[i].h, i, totalVideos)
        );

        const manualRows: Row[] = manualLayout.map((mr) => {
          const rowItems = mr.indices.map((idx) => classified[idx]);
          const fractions = mr.fractions || rowItems.map((it) => it.ratio);
          const sumRatios = fractions.reduce((s, f) => s + f, 0);
          return { items: rowItems, fractions, height: 1 / sumRatios };
        });

        if (!cancelled) setRows(manualRows);
      })();
      return () => { cancelled = true; };
    }

    // Auto mode (existing logic)
    let cancelled = false;
    (async () => {
      const totalVideos = items.filter((it) => it.type === "video").length;
      const classified: ClassifiedItem[] = await Promise.all(
        items.map(async (item, index) => {
          const dims = await detectDimensions(item);
          return classify(item, dims.w / dims.h, index, totalVideos);
        })
      );
      if (cancelled) return;
      const best = selectBestLayout(classified);
      if (!cancelled) setRows(best);
    })();
    return () => { cancelled = true; };
  }, [items, manualLayout]);

  return (
    <div ref={containerRef} className="w-full space-y-2">
      {!rows ? (
        <div className="grid grid-cols-3 gap-2">
          {items.map((_, i) => (
            <div key={i} className="animate-pulse rounded-xl bg-muted/30 h-40" />
          ))}
        </div>
      ) : (
        rows.map((row, ri) => {
          // For manual layout, compute a consistent row height based on container width and fractions
          const isManual = !!manualLayout;
          const rowItemCount = row.items.length;
          
          const manualRow = manualLayout?.[ri];
          const rowHeight = manualRow?.height;
          return (
            <div
              key={ri}
              style={{
                display: "grid",
                gridTemplateColumns: row.fractions.map((f) => `${f.toFixed(4)}fr`).join(" "),
                gap: "8px",
                ...(rowHeight ? { height: rowHeight } : {}),
                ...(isManual && rowItemCount === 1 && !rowHeight
                  ? {}
                  : isManual
                  ? { gridAutoRows: "1fr" }
                  : {}),
              }}
            >
              {row.items.map((item, ci) => (
                <div
                  key={`${ri}-${ci}`}
                  className="overflow-hidden rounded-xl bg-black/40"
                  style={isManual && rowItemCount > 1 ? { aspectRatio: `${row.fractions[ci]} / ${row.fractions.reduce((a, b) => a + b, 0) / row.fractions.length}` } : undefined}
                >
                  {item.type === "video" ? (
                    <VideoPlayer src={item.src} alt={`${campaignTitle} - ${item.index + 1}`} posterTime={item.posterTime} poster={item.poster} />
                  ) : (
                    <img
                      src={item.src}
                      alt={`${campaignTitle} - ${item.index + 1}`}
                      className={isManual ? "w-full h-full object-cover block" : "w-full h-auto block"}
                      loading="lazy"
                    />
                  )}
                </div>
              ))}
            </div>
          );
        })
      )}
    </div>
  );
};

export default AdaptiveGallery;
