import { motion } from "framer-motion";

const CtaSection = () => {
  return (
    <section className="py-12 md:py-20 section-container text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <a
          href="#orcamento"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full backdrop-blur-xl bg-white/[0.08] border border-white/[0.15] text-foreground/90 text-sm tracking-[0.2em] uppercase font-medium hover:bg-white/[0.15] transition-all max-w-full w-fit mx-auto text-center"
        >
          Quero Avaliar Uma Campanha
        </a>
      </motion.div>
    </section>
  );
};

export default CtaSection;
