import { motion } from "framer-motion";
import diffCrm from "@/assets/diff-crm.png";
import diffTeam from "@/assets/diff-team.png";
import diffOrganic from "@/assets/diff-organic.png";
import diffStudio from "@/assets/diff-studio.png";

const differentials = [
  {
    image: diffCrm,
    title: "Sistema próprio de CRM + Comercial",
    description:
      "Desenvolvemos um sistema próprio de CRM para uso diário de vendedores e secretárias. Entregamos análises e indicadores de eficiência e performance.",
  },
  {
    image: diffTeam,
    title: "Trabalho em equipe",
    description:
      "Nossa atuação conta com um time completo: estrategista de marca, gestor de tráfego, produtor de conteúdo, social media e editores dedicados.",
  },
  {
    image: diffOrganic,
    title: "Resultados sólidos em tráfego orgânico",
    description:
      "Incentivamos e estudamos a fundo a geração de demanda através de conteúdos orgânicos, reduzindo o investimento em mídia paga.",
  },
  {
    image: diffStudio,
    title: "Atendemos em estúdio ou in loco",
    description:
      "Nossa base fica em Catanduva (SP) com escritório e estúdio próprio. Priorizamos diversidade e captamos no local indicado.",
  },
];

const DifferentialsSection = () => {
  return (
    <section className="py-10" id="conteudo">
      <div className="section-container">
        <h2 className="font-heading text-xl md:text-2xl text-center text-foreground/80 mb-4">
          Entenda se estamos prontos para o próximo passo:
        </h2>
        <div className="text-center mb-8">
          <a
            href="#conteudo"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            2 min | Assista a este conteúdo
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {differentials.map((diff, i) => (
            <motion.div
              key={i}
              className="rounded-xl overflow-hidden bg-card border border-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <img
                src={diff.image}
                alt={diff.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6 space-y-2">
                <h3 className="font-heading text-lg font-semibold text-foreground/90">
                  {diff.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {diff.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
