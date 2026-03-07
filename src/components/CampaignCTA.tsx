import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Play } from "lucide-react";
import campanhasVideo from "@/assets/campaigns/campanhas.mp4";

const CampaignCTA = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  return (
    <section className="py-12 section-container text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto space-y-10"
      >
        {/* Main text */}
        <p className="font-heading text-lg md:text-xl lg:text-2xl text-foreground/90 leading-relaxed">
          A campanha é construída para sustentar a venda naquele momento e não só
          <span className="text-foreground font-semibold"> "marcar presença"</span>.
        </p>

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Conforme a necessidade e complexidade da campanha, entramos com o plano necessário:
          <br /><br />
          Pesquisamos fornecedores, desenhamos a estratégia, criamos os roteiros e organizamos os conteúdos que sustentam aquela brecha comercial.
        </p>

        {/* Liquid glass button */}
        <motion.a
          href="#orcamento"
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.15)" }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full backdrop-blur-xl bg-white/[0.08] border border-white/[0.15] text-foreground text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:bg-white/[0.14]"
        >
          Quero avaliar uma campanha
        </motion.a>

        {/* Subtitle */}
        <h3 className="font-heading text-base md:text-lg text-muted-foreground">
          Como funciona a nossa atuação
        </h3>

        {/* Liquid glass video bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          <motion.button
            onClick={handlePlay}
            whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl bg-white/[0.08] border border-white/[0.15] text-foreground/80 text-sm transition-all duration-300 hover:bg-white/[0.14]"
          >
            <Clock className="w-4 h-4" />
            Assista ao vídeo 2 min.
          </motion.button>

          {/* Video with cover overlay */}
          <div
            className="relative w-[200px] md:w-[240px] rounded-2xl overflow-hidden border border-white/[0.1]"
            style={{ aspectRatio: "9/16" }}
          >
            <video
              ref={videoRef}
              src={campanhasVideo}
              className="w-full h-full object-cover"
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
                  className="absolute inset-0 flex items-center justify-center cursor-pointer backdrop-blur-md bg-black/30"
                  onClick={handlePlay}
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-full backdrop-blur-xl bg-white/[0.15] border border-white/[0.25] flex items-center justify-center"
                  >
                    <Play className="w-6 h-6 text-foreground fill-foreground ml-0.5" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CampaignCTA;
