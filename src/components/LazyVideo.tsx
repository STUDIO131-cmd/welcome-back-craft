import { useEffect, useRef, useState, forwardRef, VideoHTMLAttributes } from "react";

interface LazyVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  rootMargin?: string;
}

const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(
  ({ src, rootMargin = "200px", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const ref = (forwardedRef as React.RefObject<HTMLVideoElement>) || localRef;

    useEffect(() => {
      const el = (ref as React.RefObject<HTMLVideoElement>)?.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { rootMargin }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, [ref, rootMargin]);

    return (
      <video
        ref={ref}
        src={isVisible ? src : undefined}
        preload="none"
        {...props}
      />
    );
  }
);

LazyVideo.displayName = "LazyVideo";

export default LazyVideo;
