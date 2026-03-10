import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const PLACEHOLDER_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";

const videos = Array(6).fill(PLACEHOLDER_VIDEO);

const BastidoresSection = () => {
  const [current, setCurrent] = useState(0);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const prev = useCallback(() => {
    setPlayingIdx(null);
    setCurrent((c) => (c > 0 ? c - 1 : videos.length - 1));
  }, []);
  const next = useCallback(() => {
    setPlayingIdx(null);
    setCurrent((c) => (c < videos.length - 1 ? c + 1 : 0));
  }, []);

  const handlePlay = (idx: number) => {
    const v = videoRefs.current[idx];
    if (v) {
      v.currentTime = 0;
      v.muted = false;
      v.controls = true;
      v.play();
      setPlayingIdx(idx);
    }
  };

  const glassBtn =
    "min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full backdrop-blur-xl bg-white/[0.08] border border-white/[0.15] text-white/80 hover:bg-white/[0.14] transition-all duration-300";

  // Compute visible items with offsets
  // Mobile: 1 centered; Tablet: 1 + 2 partials; Desktop: 2 + 2 partials
  // We'll render all and use CSS transforms

  return (
    <section className="py-12 md:py-20 section-container text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h2
          className="font-heading text-lg md:text-xl lg:text-2xl text-foreground/90"
          style={{ textShadow: "0 0 20px rgba(255,255,255,0.15)" }}
        >
          Bastidores de uma campanha em construção.
        </h2>

        {/* Carousel */}
        <div className="relative flex items-center justify-center">
          {/* Left arrow */}
          <button onClick={prev} className={`${glassBtn} absolute left-0 sm:left-2 z-20`}>
            <ChevronLeft size={22} />
          </button>

          {/* Track */}
          <div className="overflow-hidden w-full mx-12 sm:mx-14">
            <div
              className="flex items-center justify-center transition-transform duration-500 ease-out gap-3 sm:gap-4"
              style={{
                // Each item width: on mobile full, tablet ~60%, desktop ~40%
                // We'll translate based on current
              }}
            >
              {videos.map((src, i) => {
                // Relative position to current
                const rel = i - current;
                // Determine visibility class
                const isCenter = rel === 0;
                const isCenterSecond = rel === 1; // desktop second center
                const isPartialLeft = rel === -1;
                const isPartialRight = rel === 2; // desktop right partial

                // Mobile: only show current
                // Tablet: current + partials at -1, +1
                // Desktop: current, current+1 center, -1 partial, +2 partial

                return (
                  <div
                    key={i}
                    className={`flex-shrink-0 transition-all duration-500 ease-out
                      ${isCenter ? "opacity-100 scale-100" : ""}
                      ${isCenterSecond ? "opacity-100 scale-100 hidden lg:block" : ""}
                      ${isPartialLeft ? "opacity-50 scale-95 blur-[4px] hidden sm:block" : ""}
                      ${isPartialRight ? "opacity-50 scale-95 blur-[4px] hidden lg:block" : ""}
                      ${!isCenter && !isCenterSecond && !isPartialLeft && !isPartialRight ? "hidden" : ""}
                    `}
                    style={{ aspectRatio: "9/16", maxHeight: "70vh", width: "auto" }}
                  >
                    <div className="relative h-full rounded-2xl overflow-hidden border border-white/[0.1]">
                      <video
                        ref={(el) => { videoRefs.current[i] = el; }}
                        src={src}
                        className="h-full w-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                        controlsList="nodownload"
                        onPause={() => { if (playingIdx === i) setPlayingIdx(null); }}
                        onEnded={() => { if (playingIdx === i) setPlayingIdx(null); }}
                      />
                      {playingIdx !== i && (
                        <button
                          onClick={() => handlePlay(i)}
                          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                        >
                          <div
                            className="flex items-center gap-2.5 rounded-full px-5 py-2.5 backdrop-blur-md border border-white/[0.15]"
                            style={{
                              background: "rgba(255,255,255,0.08)",
                              boxShadow: "0 0 20px rgba(255,255,255,0.25), 0 0 40px rgba(255,255,255,0.1)",
                            }}
                          >
                            <Play size={16} className="text-white/90" fill="currentColor" />
                            <span className="text-white/90 text-xs font-medium tracking-[0.15em] uppercase font-heading">
                              Play
                            </span>
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right arrow */}
          <button onClick={next} className={`${glassBtn} absolute right-0 sm:right-2 z-20`}>
            <ChevronRight size={22} />
          </button>
        </div>

        {/* CTA */}
        <div className="flex justify-center pt-2">
          <motion.a
            href="#orcamento"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.97 }}
            className="w-[92vw] sm:w-fit inline-flex items-center justify-center gap-2 px-8 min-h-[44px] py-4 rounded-full backdrop-blur-xl bg-white/[0.08] border border-white/[0.15] text-foreground text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:bg-white/[0.14] text-center"
          >
            Quero Avaliar Uma Campanha
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default BastidoresSection;
