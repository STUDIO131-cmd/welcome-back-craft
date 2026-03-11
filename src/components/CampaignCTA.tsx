import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import campanhasVideo from "@/assets/campaigns/campanhas.mp4";

const CampaignCTA = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [coverDataUrl, setCoverDataUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleLoadedData = useCallback(() => {
    const v = videoRef.current;
    const canvas = canvasRef.current;
    if (v && canvas && !coverDataUrl) {
      canvas.width = v.videoWidth;
      canvas.height = v.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
        setCoverDataUrl(canvas.toDataURL());
      }
    }
  }, [coverDataUrl]);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.controls = true;
      videoRef.current.play();
    }
    setIsPlaying(true);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 section-container text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto space-y-6 md:space-y-8"
      >
        {/* Main text */}
        <p className="font-heading text-lg md:text-xl lg:text-2xl text-foreground/90 leading-relaxed">
          A campanha é construída para sustentar a venda naquele momento e não só
          <span className="text-foreground font-semibold"> "marcar presença"</span>.
        </p>

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-[660px] mx-auto">
          Conforme a necessidade e complexidade da campanha, entramos com o plano necessário:
          <br /><br />
          Pesquisamos fornecedores, desenhamos a estratégia, criamos os roteiros e organizamos os conteúdos que sustentam aquela brecha comercial.
        </p>

        {/* Title */}
        <h3 className="font-heading text-base md:text-lg text-muted-foreground">
          Como funciona a nossa atuação
        </h3>

        {/* Video container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto flex flex-col items-center gap-4 w-full"
        >
          {/* Video — vertical source → 9/16, height-capped */}
          <div
            className="relative rounded-2xl overflow-hidden border border-white/[0.1] max-h-[70vh] sm:max-h-[75vh] lg:max-h-[80vh]"
            style={{ aspectRatio: "9/16", width: "auto", margin: "0 auto" }}
          >
            <video
              ref={videoRef}
              src={campanhasVideo}
              className="w-full h-full object-cover"
              controlsList="nodownload"
              muted
              loop
              playsInline
              preload="metadata"
            />

            {/* Cover overlay with blur + play button */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer backdrop-blur-md bg-black/30"
                  onClick={handlePlay}
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-full backdrop-blur-xl bg-white/[0.15] border border-white/[0.25] flex items-center justify-center"
                  >
                    <Play className="w-6 h-6 text-foreground fill-foreground ml-0.5" />
                  </motion.div>
                  <span
                    className="mt-3 text-xs tracking-[0.2em] uppercase font-medium text-foreground"
                    style={{ textShadow: "0 0 12px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.3)" }}
                  >
                    Conheça a proposta
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA button — below video */}
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

export default CampaignCTA;
