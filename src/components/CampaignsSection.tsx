import { motion } from "framer-motion";
import daniCimples from "@/assets/campaigns/dani-cimples.png";
import daniGallery from "@/assets/campaigns/dani-gallery.png";
import pinkFriday from "@/assets/campaigns/pink-friday.png";

const campaigns = [
  {
    image: daniCimples,
    title: "Dani Fernandes × CIMPLES (by Carolina Ferraz)",
    subtitle: "Campanha de Dia das Mães",
    description:
      "Direção criativa, produção e captação em Alphaville (SP). O briefing do projeto foi pensado pra transmitir a leveza do momento de presentear em uma fragrância.",
    tags: ["Direção Criativa", "Fotografia", "Vídeo"],
  },
  {
    image: daniGallery,
    title: "Dani Fernandes × The National Gallery",
    subtitle: "Lançamento de novas fragrâncias",
    description:
      "A estética da campanha pedia uma proposta de galeria de arte para posicionar a fragrância como objeto de desejo. Nossa equipe ficou responsável pela escolha dos modelos, ambientação, direção da campanha, vídeo e foto.",
    tags: ["Branding", "Campanha", "Vídeo & Foto"],
  },
  {
    image: pinkFriday,
    title: "PINK Friday × Marina Fraga",
    subtitle: "Black Friday — Pink Shine",
    description:
      "Campanha de Black Friday para a loja de acessórios Pink Shine, com direção criativa e produção completa.",
    tags: ["Promoção", "Direção Criativa"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15 },
  }),
};

const CampaignsSection = () => {
  return (
    <section className="py-16 section-container">
      <h2 className="font-display text-2xl md:text-3xl text-center text-foreground/70 mb-16">
        Campanhas em Destaque
      </h2>

      <div className="space-y-24">
        {campaigns.map((campaign, i) => (
          <motion.div
            key={i}
            className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-12 items-center`}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={i}
          >
            <div className="md:w-1/2">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground">
                {campaign.subtitle}
              </p>
              <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground/90">
                {campaign.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {campaign.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {campaign.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs tracking-wider uppercase rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CampaignsSection;
