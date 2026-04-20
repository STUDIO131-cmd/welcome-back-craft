import { motion } from "framer-motion";
import logoCampanhas from "@/assets/logo-campanhas.webp";
import logoHeader from "@/assets/logo-campanhas-header.webp";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[70vh] py-8 sm:py-12 md:py-20 px-4 sm:px-6 text-center">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, hsl(249, 30%, 36%), transparent)' }} />

      <motion.img
        src={logoHeader}
        alt="Campanhas Studio 131"
        width={650}
        height={180}
        loading="eager"
        decoding="async"
        // @ts-expect-error - fetchpriority is valid HTML attribute
        fetchpriority="high"
        className="relative z-10 w-[450px] md:w-[650px] max-w-full h-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      <motion.div
        className="relative z-10 mt-4 sm:mt-8 max-w-xl space-y-3 sm:space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}>
        
        <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
          Projetos sob medida para vender mais
          <br />
          em momentos decisivos de negócio.
        </p>
        <div className="mt-2 sm:mt-4 inline-flex px-4 sm:px-6 py-2 rounded-full backdrop-blur-md bg-white/15 border border-white/20 shadow-lg max-w-[90vw] mx-auto">
          <p className="tracking-[0.15em] sm:tracking-[0.3em] uppercase text-white text-center" style={{ fontSize: 'clamp(0.65rem, 2.5vw, 0.875rem)', textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(200,180,255,0.4)' }}>
            Lançamentos, Coleções<br />& Datas Estratégicas.
          </p>
        </div>
      </motion.div>
    </section>);

};

export default HeroSection;