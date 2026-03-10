import { motion } from "framer-motion";

const ValueProposition = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 section-container text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto space-y-6">
        
        




        
        <a
          href="#conteudo"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm tracking-wider uppercase hover:opacity-90 transition-opacity max-w-full w-fit mx-auto text-center">
          
          Vídeo 2 min | Entenda o Plano na Prática
        </a>
      </motion.div>
    </section>);

};

export default ValueProposition;