import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import pageBg from "@/assets/page-bg.jpg";
import daniCimples from "@/assets/campaigns/dani-cimples.png";
import daniGallery from "@/assets/campaigns/dani-gallery.png";
import pinkFridayCover from "@/assets/campaigns/pink-friday-cover.png";
import pfVid1 from "@/assets/campaigns/pinkfriday/PF_1_2.mp4";
import pfImg1 from "@/assets/campaigns/pinkfriday/5D4A6291.jpg";
import pfImg2 from "@/assets/campaigns/pinkfriday/A4_2.jpg";
import pfVid2 from "@/assets/campaigns/pinkfriday/PF_5.mp4";
import pfImg3 from "@/assets/campaigns/pinkfriday/5D4A6298_1.jpg";
import pfImg4 from "@/assets/campaigns/pinkfriday/DSC05583.jpg";
import pfImg5 from "@/assets/campaigns/pinkfriday/5D4A6295_1.jpg";
import pfImg6 from "@/assets/campaigns/pinkfriday/DSC05586_1.jpg";
import tngVid1 from "@/assets/campaigns/tng/TNG-Campaing01.mp4";
import tngImg1 from "@/assets/campaigns/tng/5D4A5594.jpg";
import tngImg2 from "@/assets/campaigns/tng/5D4A5611.jpg";
import tngVid2 from "@/assets/campaigns/tng/TNG-Campaing03.mp4";
import tngVid3 from "@/assets/campaigns/tng/TNG-01.mp4";
import tngImg3 from "@/assets/campaigns/tng/5D4A5623.jpg";
import tngImg4 from "@/assets/campaigns/tng/5D4A5613_1.jpg";
import tngImg5 from "@/assets/campaigns/tng/5D4A6454.jpg";
import cImg1 from "@/assets/campaigns/cimples/img1.jpg";
import cImg2 from "@/assets/campaigns/cimples/img2.jpg";
import cImg3 from "@/assets/campaigns/cimples/img3.jpg";
import cImg4 from "@/assets/campaigns/cimples/img4.jpg";
import cVid1 from "@/assets/campaigns/cimples/video1.mp4";
import cVid2 from "@/assets/campaigns/cimples/video2.mp4";
import cVid3 from "@/assets/campaigns/cimples/video3.mp4";
import cVid4 from "@/assets/campaigns/cimples/video4.mp4";
import aVid1 from "@/assets/campaigns/auramia/teaser2.mp4";
import aVid2 from "@/assets/campaigns/auramia/teaser3.mp4";
import aVid3 from "@/assets/campaigns/auramia/entrevista.mp4";
import aImg1 from "@/assets/campaigns/auramia/5D4A0703_1.jpg";
import aImg2 from "@/assets/campaigns/auramia/5D4A0768_1.jpg";
import aImg3 from "@/assets/campaigns/auramia/5D4A0750_1.jpg";
import aImg4 from "@/assets/campaigns/auramia/5D4A0834_1.jpg";
import crVid1 from "@/assets/campaigns/cravates/cravates1.mp4";
import crImg1 from "@/assets/campaigns/cravates/IMG_0423.jpg";
import crImg2 from "@/assets/campaigns/cravates/IMG_0706.jpg";
import crImg3 from "@/assets/campaigns/cravates/IMG_0455.jpg";
import crImg4 from "@/assets/campaigns/cravates/IMG_0276.jpg";
import crImg5 from "@/assets/campaigns/cravates/IMG_0190.jpg";
import crImg6 from "@/assets/campaigns/cravates/IMG_0143.jpg";
import vcVid1 from "@/assets/campaigns/velvetcherry/video.mp4";
import vcImg1 from "@/assets/campaigns/velvetcherry/img1.jpg";
import vcImg2 from "@/assets/campaigns/velvetcherry/img2.jpg";
import vcImg3 from "@/assets/campaigns/velvetcherry/img3.jpg";
import vcImg4 from "@/assets/campaigns/velvetcherry/img4.jpg";
import vcImg5 from "@/assets/campaigns/velvetcherry/img5.jpg";
import vcImg6 from "@/assets/campaigns/velvetcherry/img6.jpg";
import vcImg7 from "@/assets/campaigns/velvetcherry/img7.jpg";

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
      { src: cVid1, type: "video" },
      { src: cImg1, type: "image" },
      { src: cImg2, type: "image" },
      { src: cVid2, type: "video" },
      { src: cVid3, type: "video" },
      { src: cImg3, type: "image" },
      { src: cImg4, type: "image" },
      { src: cVid4, type: "video" },
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
      { src: tngVid1, type: "video" },
      { src: tngImg1, type: "image" },
      { src: tngImg2, type: "image" },
      { src: tngImg3, type: "image" },
      { src: tngVid2, type: "video" },
      { src: tngVid3, type: "video" },
      { src: tngImg4, type: "image" },
      { src: tngImg5, type: "image" },
    ] satisfies GalleryItem[],
  },
  {
    image: pinkFridayCover,
    title: "PINK Friday × Marina Fraga",
    subtitle: "Black Friday — Pink Shine",
    description:
      "Campanha de Black Friday para a loja de acessórios Pink Shine, com direção criativa e produção completa.",
    tags: ["Promoção", "Direção Criativa"],
    gallery: [
      { src: pfVid1, type: "video" },
      { src: pfImg1, type: "image" },
      { src: pfImg2, type: "image" },
      { src: pfVid2, type: "video" },
      { src: pfImg3, type: "image" },
      { src: pfImg4, type: "image" },
      { src: pfImg5, type: "image" },
      { src: pfImg6, type: "image" },
    ] satisfies GalleryItem[],
  },
  {
    image: null,
    title: "Auramia by Beatriz Manganelli",
    subtitle: "Lançamento | Moda Fitness",
    description:
      "Estivemos em Aracaju (SE) para o lançamento da Auramia. A coleção Brisa trouxe sensação: calmaria, leveza e um tecido que abraça o corpo na rotina da mulher brasileira.\n\nPara este projeto fizemos estudo de público, calendário de publicações com fases de antecipação e lançamento, foto e vídeo, tudo alinhado para gerar intenção de compra.\n\nCom a repercussão organizada, causamos o efeito empilhamento de demanda: quando o site abriu, vários modelos esgotaram em 24h.",
    tags: ["Calendário de Conteúdo", "Audiovisual", "Direção"],
    gallery: [
      { src: aVid1, type: "video" },
      { src: aImg1, type: "image" },
      { src: aImg2, type: "image" },
      { src: aVid2, type: "video" },
      { src: aVid3, type: "video" },
      { src: aImg3, type: "image" },
      { src: aImg4, type: "image" },
    ] satisfies GalleryItem[],
  },
  {
    image: null,
    title: "Coleção Cravates by Corpo De Ballet",
    subtitle: "Lançamento | Moda Ballet",
    description:
      "Campos do Jordão foi o lugar escolhido para dar vida ao universo criado no lançamento da coleção de ballet Cravates.\n\nToda a ideia da campanha partiu de duas personagens que já faziam parte da história da marca: Cher e Etoiles.\n\nCada uma delas carrega um estilo e uma personalidade própria, e isso foi usado como base para construir a identidade visual da nova coleção.\n\nCher traz leveza, delicadeza e suavidade. Etoiles representa um lado mais refinado, elegante e sofisticado. A coleção Cravates nasceu justamente da união dessas duas essências.",
    tags: ["Fotografia", "Lookbook", "Direção Criativa", "Vídeo"],
    gallery: [
      { src: crVid1, type: "video" },
      { src: crImg1, type: "image" },
      { src: crImg2, type: "image" },
      { src: crImg3, type: "image" },
      { src: crImg4, type: "image" },
      { src: crImg5, type: "image" },
      { src: crImg6, type: "image" },
    ] satisfies GalleryItem[],
  },
  {
    image: null,
    title: "Velvet Cherry by Dani Fernandes",
    subtitle: "Nova coleção | Lançamento",
    description:
      "O aroma que se tornou sucesso em vendas carrega uma identidade que foi construída em um material de fotos e vídeos para a rede social:\n\nTextura leve, maciez, feminilidade e doçura.\n\nNosso time entregou fotografia ambientada, still e direção criativa em estúdio.",
    tags: ["Direção Criativa", "Fotografia", "Vídeo"],
    gallery: [
      { src: vcImg1, type: "image" },
      { src: vcVid1, type: "video" },
      { src: vcImg2, type: "image" },
      { src: vcImg3, type: "image" },
      { src: vcImg4, type: "image" },
      { src: vcImg5, type: "image" },
      { src: vcImg6, type: "image" },
      { src: vcImg7, type: "image" },
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

const VideoPlayer = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
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
    <div className={`relative w-full h-full ${className ?? ""}`}>
      <video
        ref={videoRef}
        src={src}
        controls={playing}
        playsInline
        onPause={handlePause}
        onEnded={handlePause}
        className="w-full h-auto rounded-xl"
        aria-label={alt}
      />
      {!playing && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl transition-colors hover:bg-black/40"
        >
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <Play size={22} className="text-gray-900 ml-0.5" fill="currentColor" />
          </div>
        </button>
      )}
    </div>
  );
};

const MasonryGallery = ({ items, campaignTitle }: { items: GalleryItem[]; campaignTitle: string }) => {
  const columns: GalleryItem[][] = [[], [], []];
  items.forEach((item, i) => columns[i % 3].push(item));

  return (
    <div className="flex gap-2">
      {columns.map((col, ci) => (
        <div key={ci} className="flex-1 flex flex-col gap-2">
          {col.map((item, idx) => (
            <div key={idx} className="overflow-hidden rounded-xl bg-black/40">
              {item.type === "video" ? (
                <VideoPlayer src={item.src} alt={`${campaignTitle} - ${ci * columns[0].length + idx + 1}`} />
              ) : (
                <img
                  src={item.src}
                  alt={`${campaignTitle} - ${ci * columns[0].length + idx + 1}`}
                  className="w-full h-auto rounded-xl"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      ))}
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
              className="group relative cursor-pointer rounded-2xl overflow-hidden backdrop-blur-xl bg-white/[0.12] border border-white/[0.15] shadow-md transition-all duration-500 hover:shadow-lg"
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
                  {campaign.image ? (
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-48 md:h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-48 md:h-full flex items-center justify-center bg-white/[0.05] group-hover:scale-[1.02] transition-transform duration-700">
                      <span className="text-white/40 text-sm tracking-[0.2em] uppercase">Em breve</span>
                    </div>
                  )}
                </div>
                <div className="p-6 md:p-8 md:w-3/5 space-y-3 flex flex-col justify-center">
                  <p className="text-xs tracking-[0.2em] uppercase text-white/50">{campaign.subtitle}</p>
                  <h3
                    className="font-heading text-lg md:text-xl font-semibold"
                    style={{ color: "#FFFFFF", textShadow: "0 0 12px rgba(255,255,255,0.3)" }}
                  >
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">{campaign.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {campaign.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-[10px] tracking-wider uppercase rounded-full bg-white/10 border border-white/20 text-white/60"
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
            style={{ backgroundImage: `url(${pageBg})` }}
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

              <div className="max-w-3xl mx-auto">
                <MasonryGallery
                  items={campaigns[openGallery].gallery}
                  campaignTitle={campaigns[openGallery].title}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CampaignsSection;
