import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const CampaignCTA = () => {
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
            whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl bg-white/[0.08] border border-white/[0.15] text-foreground/80 text-sm transition-all duration-300 hover:bg-white/[0.14]"
          >
            <Clock className="w-4 h-4" />
            Assista ao vídeo 2 min.
          </motion.button>

          {/* Video placeholder (9:16 ratio, scaled down) */}
          <div
            className="w-[200px] md:w-[240px] rounded-2xl overflow-hidden border border-white/[0.1] bg-white/[0.05] backdrop-blur-sm"
            style={{ aspectRatio: "9/16" }}
          >
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
              Vídeo em breve
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CampaignCTA;
