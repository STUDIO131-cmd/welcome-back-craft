import { useState, useEffect, useRef, useCallback } from "react";
import { Play } from "lucide-react";

type GalleryItem = {
  src: string;
  type: "image" | "video";
  colSpan?: number;
};

type Orientation = "landscape" | "portrait" | "square";

type ClassifiedItem = GalleryItem & {
  orientation: Orientation;
  naturalWidth: number;
  naturalHeight: number;
  index: number;
};

type LayoutItem = ClassifiedItem & {
  computedSpan: number;
  fullWidth: boolean;
};

function classifyOrientation(w: number, h: number): Orientation {
  const ratio = w / h;
  if (ratio > 1.15) return "landscape";
  if (ratio < 0.85) return "portrait";
  return "square";
}

function detectDimensions(item: GalleryItem): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    if (item.type === "video") {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        resolve({ width: video.videoWidth, height: video.videoHeight });
      };
      video.onerror = () => resolve({ width: 16, height: 9 });
      video.src = item.src;
    } else {
      const img = new Image();
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = () => resolve({ width: 1, height: 1 });
      img.src = item.src;
    }
  });
}

function getDesktopCols(totalItems: number): number {
  if (totalItems <= 3) return 2;
  if (totalItems <= 6) return 3;
  return 4;
}

function buildGalleryLayout(items: ClassifiedItem[], cols: number): LayoutItem[] {
  const layoutItems: LayoutItem[] = items.map((item) => ({
    ...item,
    computedSpan: 1,
    fullWidth: false,
  }));

  // Pass 1: Assign base spans
  for (let i = 0; i < layoutItems.length; i++) {
    const item = layoutItems[i];
    if (item.orientation === "landscape") {
      // Landscape gets span 2 by default, or full-width if it's at start/end
      if (i === 0 || i === layoutItems.length - 1) {
        item.fullWidth = true;
        item.computedSpan = cols;
      } else {
        item.computedSpan = Math.min(2, cols);
      }
    } else {
      item.computedSpan = 1;
    }
  }

  // Pass 2: Simulate row filling and fix last row
  const rows = simulateRows(layoutItems, cols);
  const lastRow = rows[rows.length - 1];

  if (lastRow) {
    const lastRowSpanSum = lastRow.reduce((sum, item) => sum + item.computedSpan, 0);
    const gap = cols - lastRowSpanSum;

    if (gap > 0) {
      // Strategy: if only 1 item in last row, make it full-width
      if (lastRow.length === 1) {
        lastRow[0].fullWidth = true;
        lastRow[0].computedSpan = cols;
      }
      // If last item is landscape, make it full-width
      else if (lastRow[lastRow.length - 1].orientation === "landscape") {
        lastRow[lastRow.length - 1].fullWidth = true;
        lastRow[lastRow.length - 1].computedSpan = cols - (lastRowSpanSum - lastRow[lastRow.length - 1].computedSpan);
      }
      // Distribute gap across last row items
      else {
        let remaining = gap;
        for (let i = lastRow.length - 1; i >= 0 && remaining > 0; i--) {
          const add = Math.min(remaining, cols - lastRow[i].computedSpan);
          lastRow[i].computedSpan += add;
          remaining -= add;
        }
      }
    }
  }

  return layoutItems;
}

function simulateRows(items: LayoutItem[], cols: number): LayoutItem[][] {
  const rows: LayoutItem[][] = [];
  let currentRow: LayoutItem[] = [];
  let currentSpan = 0;

  for (const item of items) {
    const span = item.fullWidth ? cols : item.computedSpan;
    if (item.fullWidth || currentSpan + span > cols) {
      if (currentRow.length > 0) rows.push(currentRow);
      currentRow = [item];
      currentSpan = span;
    } else {
      currentRow.push(item);
      currentSpan += span;
    }
    if (currentSpan >= cols) {
      rows.push(currentRow);
      currentRow = [];
      currentSpan = 0;
    }
  }
  if (currentRow.length > 0) rows.push(currentRow);
  return rows;
}

// VideoPlayer - reused from CampaignsSection pattern
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
    <div className="relative w-full">
      <video
        ref={videoRef}
        src={src}
        controls={playing}
        playsInline
        onPause={handlePause}
        onEnded={handlePause}
        className="w-full h-auto block rounded-xl"
        aria-label={alt}
      />
      {!playing && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl transition-colors hover:bg-black/40"
        >
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <Play size={22} className="text-gray-900 ml-0.5" fill="currentColor" />
          </div>
        </button>
      )}
    </div>
  );
};

type AdaptiveGalleryProps = {
  items: GalleryItem[];
  campaignTitle: string;
};

const AdaptiveGallery = ({ items, campaignTitle }: AdaptiveGalleryProps) => {
  const [layout, setLayout] = useState<LayoutItem[] | null>(null);
  const [cols, setCols] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive columns via ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      if (width < 640) {
        setCols(1);
      } else if (width < 1024) {
        setCols(2);
      } else {
        setCols(getDesktopCols(items.length));
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [items.length]);

  // Classify media and build layout
  useEffect(() => {
    let cancelled = false;

    async function classify() {
      const classified: ClassifiedItem[] = await Promise.all(
        items.map(async (item, index) => {
          const dims = await detectDimensions(item);
          return {
            ...item,
            orientation: classifyOrientation(dims.width, dims.height),
            naturalWidth: dims.width,
            naturalHeight: dims.height,
            index,
          };
        })
      );

      if (!cancelled) {
        const layoutResult = buildGalleryLayout(classified, cols);
        setLayout(layoutResult);
      }
    }

    classify();
    return () => { cancelled = true; };
  }, [items, cols]);

  return (
    <div ref={containerRef} className="w-full">
      {!layout ? (
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {items.map((_, i) => (
            <div key={i} className="animate-pulse rounded-xl bg-white/10 h-40" />
          ))}
        </div>
      ) : (
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {layout.map((item, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-xl bg-black/40"
              style={{
                gridColumn: item.fullWidth ? "1 / -1" : `span ${item.computedSpan}`,
              }}
            >
              {item.type === "video" ? (
                <VideoPlayer src={item.src} alt={`${campaignTitle} - ${idx + 1}`} />
              ) : (
                <img
                  src={item.src}
                  alt={`${campaignTitle} - ${idx + 1}`}
                  className="w-full h-auto block rounded-xl"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdaptiveGallery;
