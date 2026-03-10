import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  startIndex: number;
  onClose: () => void;
};

const PhotoLightbox = ({ images, startIndex, onClose }: Props) => {
  const [current, setCurrent] = useState(startIndex);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const prev = useCallback(() => setCurrent((c) => (c > 0 ? c - 1 : images.length - 1)), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c < images.length - 1 ? c + 1 : 0)), [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  const glassBtn = "min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full backdrop-blur-xl bg-white/[0.08] border border-white/[0.15] text-white/80 hover:bg-white/[0.14] transition-all duration-300";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close button */}
        <div className="absolute top-4 right-4 z-10">
          <button onClick={onClose} className={glassBtn}>
            <X size={20} />
          </button>
        </div>

        {/* Left arrow */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className={`${glassBtn} absolute left-3 top-1/2 -translate-y-1/2 z-10`}
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Image */}
        <motion.img
          key={current}
          src={images[current]}
          alt={`Photo ${current + 1}`}
          className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        />

        {/* Right arrow */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className={`${glassBtn} absolute right-3 top-1/2 -translate-y-1/2 z-10`}
          >
            <ChevronRight size={22} />
          </button>
        )}

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest">
          {current + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PhotoLightbox;
