import { motion } from "framer-motion";

const CtaSection = () => {
  return (
    <section className="py-12 md:py-20 section-container text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto space-y-6 md:space-y-8"
      >
        <h2 className="font-heading text-2xl md:text-3xl text-foreground/85 leading-relaxed">
          Nossa régua é simples: Para cada R$1 investido, construímos estruturas
          capazes de retornar <strong className="text-foreground">20x ou mais.</strong>
        </h2>
        <a
          href="#orcamento"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground text-sm tracking-[0.2em] uppercase font-medium hover:opacity-90 transition-opacity"
        >
          Quero Avançar
        </a>
      </motion.div>
    </section>
  );
};

export default CtaSection;
