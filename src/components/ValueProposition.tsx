import { motion } from "framer-motion";

const ValueProposition = () => {
  return (
    <section className="py-10 section-container text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto space-y-6"
      >
        <h2 className="font-heading text-xl md:text-2xl lg:text-3xl text-foreground/80 leading-relaxed">
          Com método e ticket saudável, marketing deixa de ser custo e pode retornar até 20x o investimento.{" "}
          <strong className="text-foreground">
            Um padrão validado na prática com nossos clientes.
          </strong>
        </h2>
        <a
          href="#conteudo"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm tracking-wider uppercase hover:opacity-90 transition-opacity"
        >
          Vídeo 2 min | Entenda o Plano na Prática
        </a>
      </motion.div>
    </section>
  );
};

export default ValueProposition;
