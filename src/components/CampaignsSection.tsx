import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import galleryBg from "@/assets/campaigns/gallery-bg.jpg";
import daniCimples from "@/assets/campaigns/dani-cimples.png";
import daniGallery from "@/assets/campaigns/dani-gallery.png";
import pinkFriday from "@/assets/campaigns/pink-friday.png";
import cImg1 from "@/assets/campaigns/cimples/img1.jpg";
import cImg2 from "@/assets/campaigns/cimples/img2.jpg";
import cImg3 from "@/assets/campaigns/cimples/img3.jpg";
import cImg4 from "@/assets/campaigns/cimples/img4.jpg";
import cVid1 from "@/assets/campaigns/cimples/video1.mp4";
import cVid2 from "@/assets/campaigns/cimples/video2.mp4";
import cVid3 from "@/assets/campaigns/cimples/video3.mp4";
import cVid4 from "@/assets/campaigns/cimples/video4.mp4";

type GalleryItem = {
  src: string;
  type: "image" | "video";
};

const campaigns = [
  {
    image: daniCimples,
    title: "Dani Fernandes × CIMPLES (by Carolina Ferraz)",
    subtitle: "Campanha de Dia das Mães",
    description:
      "Direção criativa, produção e captação em Alphaville (SP). O briefing do projeto foi pensado pra transmitir a leveza do momento de presentear em uma fragrância.",
    tags: ["Direção Criativa", "Fotografia", "Vídeo"],
    gallery: [
      { src: cImg1, type: "image" as const },
      { src: cImg2, type: "image" as const },
      { src: cImg3, type: "image" as const },
      { src: cImg4, type: "image" as const },
      { src: cVid1, type: "video" as const },
      { src: cVid2, type: "video" as const },
      { src: cVid3, type: "video" as const },
      { src: cVid4, type: "video" as const },
    ] satisfies GalleryItem[],
  },
  {
    image: daniGallery,
    title: "Dani Fernandes × The National Gallery",
    subtitle: "Lançamento de novas fragrâncias",
    description:
      "A estética da campanha pedia uma proposta de galeria de arte para posicionar a fragrância como objeto de desejo. Nossa equipe ficou responsável pela escolha dos modelos, ambientação, direção da campanha, vídeo e foto.",
    tags: ["Branding", "Campanha", "Vídeo & Foto"],
    gallery: [
      { src: daniGallery, type: "image" as const },
    ] satisfies GalleryItem[],
  },
  {
    image: pinkFriday,
    title: "PINK Friday × Marina Fraga",
    subtitle: "Black Friday — Pink Shine",
    description:
      "Campanha de Black Friday para a loja de acessórios Pink Shine, com direção criativa e produção completa.",
    tags: ["Promoção", "Direção Criativa"],
    gallery: [
      { src: pinkFriday, type: "image" as const },
    ] satisfies GalleryItem[],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.2, ease: "easeOut" as const },
  }),
};

const VideoPlayer = ({ src, alt }: { src: string; alt: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play();
    setPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setPlaying(false);
  }, []);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        src={src}
        controls={playing}
        playsInline
        onPause={handlePause}
        onEnded={handlePause}
        className="w-full h-auto rounded-lg"
        aria-label={alt}
      />
      {!playing && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg transition-colors hover:bg-black/40"
        >
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <Play size={28} className="text-gray-900 ml-1" fill="currentColor" />
          </div>
        </button>
      )}
    </div>
  );
};

const CampaignsSection = () => {
  const [openGallery, setOpenGallery] = useState<number | null>(null);

  return (
    <>
      <section className="py-8 section-container">
        <div className="space-y-6">
          {campaigns.map((campaign, i) => (
            <motion.div
              key={i}
              className="group relative cursor-pointer rounded-2xl overflow-hidden bg-[#EAEAEA] shadow-md transition-all duration-500 hover:shadow-lg"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
              onClick={() => setOpenGallery(i)}
            >
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="px-6 py-3 rounded-full backdrop-blur-md bg-white/[0.08] border border-white/[0.15]">
                  <span
                    className="text-white/90 text-sm md:text-base tracking-[0.3em] uppercase"
                    style={{
                      textShadow:
                        "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)",
                    }}
                  >
                    VEJA A GALERIA
                  </span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-0">
                <div className="md:w-2/5 flex-shrink-0">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-48 md:h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 md:p-8 md:w-3/5 space-y-3 flex flex-col justify-center">
                  <p className="text-xs tracking-[0.2em] uppercase text-gray-500">
                    {campaign.subtitle}
                  </p>
                  <h3
                    className="font-heading text-lg md:text-xl font-semibold"
                    style={{ color: "#C73C32", textShadow: "0 0 8px rgba(199,60,50,0.4)" }}
                  >
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {campaign.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {campaign.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-[10px] tracking-wider uppercase rounded-full bg-gray-200 border border-gray-300 text-gray-500"
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

      <AnimatePresence>
        {openGallery !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${galleryBg})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenGallery(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full max-h-[85vh] overflow-y-auto rounded-2xl backdrop-blur-xl bg-white/[0.08] border border-white/[0.15] p-6 shadow-[0_16px_64px_rgba(0,0,0,0.3)]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 border border-white/20 text-white/70 hover:text-white transition-colors"
                onClick={() => setOpenGallery(null)}
              >
                <X size={20} />
              </button>

              <h3 className="font-heading text-xl font-semibold text-white text-center mb-3">
                {campaigns[openGallery].title}
              </h3>

              <p className="text-sm text-white/70 text-center leading-relaxed line-clamp-4 max-w-2xl mx-auto mb-6">
                {campaigns[openGallery].description}
              </p>

              {/* Masonry columns layout */}
              <div className="columns-1 sm:columns-2 gap-2">
                {campaigns[openGallery].gallery.map((item, idx) => (
                  <div key={idx} className="mb-2 break-inside-avoid">
                    {item.type === "video" ? (
                      <VideoPlayer
                        src={item.src}
                        alt={`${campaigns[openGallery].title} - ${idx + 1}`}
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={`${campaigns[openGallery].title} - ${idx + 1}`}
                        className="w-full h-auto rounded-lg"
                      />
                    )}
                  </div>
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
