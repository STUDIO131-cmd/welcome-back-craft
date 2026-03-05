import { motion } from "framer-motion";
import logoCampanhas from "@/assets/logo-campanhas.png";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] py-20 px-6 text-center">
      <motion.img
        src={logoCampanhas}
        alt="Studio 131 - Campanhas"
        className="w-48 md:w-64 mb-8 opacity-90"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 1 }}
      />
      
      <motion.h1
        className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tight text-foreground/20 font-light lowercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        campanhas
      </motion.h1>

      <motion.div
        className="mt-8 max-w-xl space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
          Projetos sob medida para vender mais
          <br />
          em momentos decisivos de negócio.
        </p>
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
          Lançamentos, Coleções & Datas Estratégicas.
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
