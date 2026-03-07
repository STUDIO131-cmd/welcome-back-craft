import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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
    gallery: [daniCimples],
  },
  {
    image: daniGallery,
    title: "Dani Fernandes × The National Gallery",
    subtitle: "Lançamento de novas fragrâncias",
    description:
      "A estética da campanha pedia uma proposta de galeria de arte para posicionar a fragrância como objeto de desejo. Nossa equipe ficou responsável pela escolha dos modelos, ambientação, direção da campanha, vídeo e foto.",
    tags: ["Branding", "Campanha", "Vídeo & Foto"],
    gallery: [daniGallery],
  },
  {
    image: pinkFriday,
    title: "PINK Friday × Marina Fraga",
    subtitle: "Black Friday — Pink Shine",
    description:
      "Campanha de Black Friday para a loja de acessórios Pink Shine, com direção criativa e produção completa.",
    tags: ["Promoção", "Direção Criativa"],
    gallery: [pinkFriday],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.2, ease: "easeOut" },
  }),
};

const CampaignsSection = () => {
  const [openGallery, setOpenGallery] = useState<number | null>(null);

  return (
    <>
      <section className="py-16 section-container">
        <h2 className="font-display text-2xl md:text-3xl text-center text-foreground/70 mb-16">
          Campanhas em Destaque
        </h2>

        <div className="space-y-10">
          {campaigns.map((campaign, i) => (
            <motion.div
              key={i}
              className="group relative cursor-pointer rounded-2xl overflow-hidden backdrop-blur-xl bg-white/[0.07] border border-white/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-500 hover:shadow-[0_8px_32px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.2)]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
              onClick={() => setOpenGallery(i)}
            >
              {/* Hover blink overlay */}
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span
                  className="text-white/90 text-sm md:text-base tracking-[0.3em] uppercase animate-pulse"
                  style={{
                    textShadow:
                      "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.5)",
                  }}
                >
                  Veja a galeria
                </span>
              </div>

              <div className="flex flex-col md:flex-row gap-0">
                {/* Image */}
                <div className="md:w-2/5 flex-shrink-0">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-48 md:h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 md:w-3/5 space-y-3 flex flex-col justify-center">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                    {campaign.subtitle}
                  </p>
                  <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground/90">
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {campaign.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {campaign.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-[10px] tracking-wider uppercase rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Popup */}
      <AnimatePresence>
        {openGallery !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenGallery(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full max-h-[85vh] overflow-y-auto rounded-2xl backdrop-blur-xl bg-white/[0.08] border border-white/[0.15] p-6 shadow-[0_16px_64px_rgba(0,0,0,0.3)]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 border border-white/20 text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setOpenGallery(null)}
              >
                <X size={20} />
              </button>

              <h3 className="font-heading text-xl font-semibold text-foreground/90 mb-6">
                {campaigns[openGallery].title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {campaigns[openGallery].gallery.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`${campaigns[openGallery].title} - ${idx + 1}`}
                    className="w-full rounded-lg object-cover"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CampaignsSection;
