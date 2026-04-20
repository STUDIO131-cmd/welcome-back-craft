import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import AdaptiveGallery from "./AdaptiveGallery";
import PhotoLightbox from "./PhotoLightbox";
import pageBg from "@/assets/page-bg.webp";
import cimplesCover from "@/assets/campaigns/cimples/cover.webp";
import daniGallery from "@/assets/campaigns/dani-gallery.webp";
import pinkFridayCover from "@/assets/campaigns/pinkfriday/cover.webp";
import pfVid1 from "@/assets/campaigns/pinkfriday/PF_1_2.mp4";
import pfImg1 from "@/assets/campaigns/pinkfriday/5D4A6291.webp";
import pfImg2 from "@/assets/campaigns/pinkfriday/A4_2.webp";
import pfVid2 from "@/assets/campaigns/pinkfriday/PF_5.mp4";
import pfVid3 from "@/assets/campaigns/pinkfriday/PF_3.mp4";
import pfImg3 from "@/assets/campaigns/pinkfriday/5D4A6298_1.webp";
import pfImg4 from "@/assets/campaigns/pinkfriday/DSC05583.webp";
import pfImg5 from "@/assets/campaigns/pinkfriday/5D4A6295_1.webp";
import pfImg6 from "@/assets/campaigns/pinkfriday/DSC05586_1.webp";
import pfImg7 from "@/assets/campaigns/pinkfriday/5D4A6286.webp";
import tngCover from "@/assets/campaigns/tng/cover.webp";
import tngVid1 from "@/assets/campaigns/tng/TNG-Campaing01.mp4";
import tngImg1 from "@/assets/campaigns/tng/5D4A5594.webp";
import tngImg2 from "@/assets/campaigns/tng/5D4A5611.webp";
import tngVid2 from "@/assets/campaigns/tng/TNG-Campaing03.mp4";
import tngVid3 from "@/assets/campaigns/tng/TNG-01.mp4";
import tngImg3 from "@/assets/campaigns/tng/5D4A5623.webp";
import tngImg4 from "@/assets/campaigns/tng/5D4A5613_1.webp";
import tngImg5 from "@/assets/campaigns/tng/5D4A6454.webp";
import tngVid4 from "@/assets/campaigns/tng/TNG-06.mp4";
import tngVid5 from "@/assets/campaigns/tng/TNG-07.mp4";
import tngVid5Poster from "@/assets/campaigns/tng/poster-vid5.webp";
import tngImg6 from "@/assets/campaigns/tng/5D4A6449.webp";
import cImg1 from "@/assets/campaigns/cimples/img1.webp";
import cImg2 from "@/assets/campaigns/cimples/img2.webp";
import cImg3 from "@/assets/campaigns/cimples/img3.webp";
import cImg4 from "@/assets/campaigns/cimples/img4.webp";
import cVid1 from "@/assets/campaigns/cimples/video1.mp4";
import cVid2 from "@/assets/campaigns/cimples/video2.mp4";
import cVid3 from "@/assets/campaigns/cimples/video3.mp4";
import cVid4 from "@/assets/campaigns/cimples/video4.mp4";
import cVid5 from "@/assets/campaigns/cimples/video5.mp4";
import cImg5 from "@/assets/campaigns/cimples/img5.webp";
import cImg6 from "@/assets/campaigns/cimples/img6.webp";
import cImg7 from "@/assets/campaigns/cimples/img7.webp";
import cImg8 from "@/assets/campaigns/cimples/img8.webp";
import aVid1 from "@/assets/campaigns/auramia/teaser2.mp4";
import aVid2 from "@/assets/campaigns/auramia/teaser3.mp4";
import aVid3 from "@/assets/campaigns/auramia/entrevista.mp4";
import aImg1 from "@/assets/campaigns/auramia/5D4A0703_1.webp";
import aImg2 from "@/assets/campaigns/auramia/5D4A0768_1.webp";
import aImg3 from "@/assets/campaigns/auramia/5D4A0750_1.webp";
import aImg4 from "@/assets/campaigns/auramia/5D4A0834_1.webp";
import aImg5 from "@/assets/campaigns/auramia/5D4A0723.webp";
import aImg6 from "@/assets/campaigns/auramia/5D4A0457.webp";
import aImg7 from "@/assets/campaigns/auramia/5D4A0977.webp";
import aPosterEntrevista from "@/assets/campaigns/auramia/poster-entrevista.webp";
import aCover from "@/assets/campaigns/auramia/cover.webp";
import crVid1 from "@/assets/campaigns/cravates/cravates1.mp4";
import crCover from "@/assets/campaigns/cravates/cover.webp";
import crImg1 from "@/assets/campaigns/cravates/IMG_0423.webp";
import crImg2 from "@/assets/campaigns/cravates/IMG_0706.webp";
import crImg3 from "@/assets/campaigns/cravates/IMG_0455.webp";
import crImg4 from "@/assets/campaigns/cravates/IMG_0276.webp";
import crImg5 from "@/assets/campaigns/cravates/IMG_0190.webp";
import crImg6 from "@/assets/campaigns/cravates/IMG_0143.webp";
import vcVid1 from "@/assets/campaigns/velvetcherry/video.mp4";
import vcImg1 from "@/assets/campaigns/velvetcherry/img1.webp";
import vcImg2 from "@/assets/campaigns/velvetcherry/img2.webp";
import vcImg3 from "@/assets/campaigns/velvetcherry/img3.webp";
import vcImg4 from "@/assets/campaigns/velvetcherry/img4.webp";
import vcImg5 from "@/assets/campaigns/velvetcherry/img5.webp";
import vcImg6 from "@/assets/campaigns/velvetcherry/img6.webp";
import vcImg7 from "@/assets/campaigns/velvetcherry/img7.webp";
import vcImg8 from "@/assets/campaigns/velvetcherry/img8.webp";
import vcImg9 from "@/assets/campaigns/velvetcherry/img9.webp";
import vcImg10 from "@/assets/campaigns/velvetcherry/img10.webp";
import vcImg11 from "@/assets/campaigns/velvetcherry/img11.webp";
import vcCover from "@/assets/campaigns/velvetcherry/cover.webp";
import ntVid1 from "@/assets/campaigns/novatrida/video1.mp4";
import ntVid2 from "@/assets/campaigns/novatrida/video2.mp4";
import ntVid3 from "@/assets/campaigns/novatrida/video3.mp4";
import ntImg1 from "@/assets/campaigns/novatrida/img1.webp";
import ntImg2 from "@/assets/campaigns/novatrida/img2.webp";
import ntCover from "@/assets/campaigns/novatrida/cover.webp";
import lvVid1 from "@/assets/campaigns/lavie/video1.mp4";
import lvVid2 from "@/assets/campaigns/lavie/video2.mp4";
import lvVid3 from "@/assets/campaigns/lavie/video3.mp4";
import lvVid4 from "@/assets/campaigns/lavie/video4.mp4";
import lvImg1 from "@/assets/campaigns/lavie/img1.webp";
import lvImg2 from "@/assets/campaigns/lavie/img2.webp";
import lvImg3 from "@/assets/campaigns/lavie/img3.webp";
import lvImg4 from "@/assets/campaigns/lavie/img4.webp";
import lvImg5 from "@/assets/campaigns/lavie/img5.webp";
import lvImg6 from "@/assets/campaigns/lavie/img6.webp";
import lvCover from "@/assets/campaigns/lavie/cover.webp";
import lvPosterVid1 from "@/assets/campaigns/lavie/poster-vid1.webp";
import dnVid1 from "@/assets/campaigns/daninatal/video1.mp4";
import dnVid2 from "@/assets/campaigns/daninatal/video2.mp4";
import dnVid3 from "@/assets/campaigns/daninatal/video3.mp4";
import dnVid4 from "@/assets/campaigns/daninatal/video4.mp4";
import dnCover from "@/assets/campaigns/daninatal/cover.webp";
import dnPoster1 from "@/assets/campaigns/daninatal/poster1.webp";
import dnPoster2 from "@/assets/campaigns/daninatal/poster2.webp";
import etVid1 from "@/assets/campaigns/etoiles/video1.mp4";
import etImg1 from "@/assets/campaigns/etoiles/img1.webp";
import etImg2 from "@/assets/campaigns/etoiles/img2.webp";
import etImg3 from "@/assets/campaigns/etoiles/img3.webp";
import etImg4 from "@/assets/campaigns/etoiles/img4.webp";
import etImg5 from "@/assets/campaigns/etoiles/img5.webp";
import etImg6 from "@/assets/campaigns/etoiles/img6.webp";
import etImg7 from "@/assets/campaigns/etoiles/img7.webp";
import etImg8 from "@/assets/campaigns/etoiles/img8.webp";
import etImg9 from "@/assets/campaigns/etoiles/img9.webp";
import etCover from "@/assets/campaigns/etoiles/cover.webp";
import etPosterVid1 from "@/assets/campaigns/etoiles/poster-vid1.webp";
import adCover from "@/assets/campaigns/adriano/cover.webp";
import adImg1 from "@/assets/campaigns/adriano/img1.webp";
import adImg2 from "@/assets/campaigns/adriano/img2.webp";
import adImg3 from "@/assets/campaigns/adriano/img3.webp";
import adImg4 from "@/assets/campaigns/adriano/img4.webp";
import adImg5 from "@/assets/campaigns/adriano/img5.webp";
import adImg6 from "@/assets/campaigns/adriano/img6.webp";
import adImg7 from "@/assets/campaigns/adriano/img7.webp";
import adImg8 from "@/assets/campaigns/adriano/img8.webp";
import adImg9 from "@/assets/campaigns/adriano/img9.webp";
import adImg10 from "@/assets/campaigns/adriano/img10.webp";

type GalleryItem = {
  src: string;
  type: "image" | "video";
  colSpan?: 1 | 2 | 3;
  posterTime?: number;
  poster?: string;
  ratio?: number;
  fit?: "cover" | "contain";
};

const campaigns: {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  gallery: GalleryItem[];
  manualLayout?: { indices: number[]; fractions?: number[]; heights?: number[] }[];
  coverPosition?: string; // CSS object-position per campaign
}[] = [
  // 1 - Cimples e Dani Fernandes
  {
    image: cimplesCover,
    coverPosition: "center top",
    title: "Dani Fernandes × CIMPLES (by Carolina Ferraz)",
    subtitle: "Campanha de Dia das Mães",
    description:
      "Uma campanha criada para transformar uma fragrância em um presente desejado. A construção visual buscou leveza, intimidade e beleza cotidiana para conectar duas marcas de forma natural. E isso apareceu no que mais importa no fim: mais visibilidade, mais compartilhamento e mais força de venda.",
    tags: ["Direção criativa da campanha", "Ambientação + roteiro de captação", "Foto e vídeo"],
    gallery: [
      { src: cVid1, type: "video", colSpan: 2 },
      { src: cImg1, type: "image", colSpan: 1 },
      { src: cImg2, type: "image", colSpan: 1 },
      { src: cVid2, type: "video", colSpan: 2, posterTime: 3 },
      { src: cVid3, type: "video", colSpan: 2, posterTime: 2 },
      { src: cImg3, type: "image", colSpan: 1 },
      { src: cImg4, type: "image", colSpan: 1 },
      { src: cVid4, type: "video", colSpan: 2 },
      { src: cVid5, type: "video", colSpan: 2 },
      { src: cImg5, type: "image", colSpan: 1 },
      { src: cImg6, type: "image", colSpan: 1 },
      { src: cImg7, type: "image", colSpan: 1 },
      { src: cImg8, type: "image", colSpan: 2 },
    ] satisfies GalleryItem[],
  },
  // 2 - Pink Friday
  {
    image: pinkFridayCover,
    coverPosition: "center center",
    title: "PINK Friday × Marina Fraga",
    subtitle: "Black Friday — Pink Shine",
    description:
      "A Pink Friday foi construída com calendário de publicações, estratégia de oferta e antecipação para criar expectativa antes da abertura.\nCom uma estrutura enxuta de lançamento, a campanha ganhou força rápido e acelerou a decisão de compra.\nO que era para durar uma semana esgotou em 2 dias.",
    tags: ["Black Friday", "Estratégia de oferta", "Calendário de publicações"],
    gallery: [
      { src: pfVid1, type: "video", colSpan: 2, posterTime: 4 },
      { src: pfImg1, type: "image", colSpan: 1 },
      { src: pfImg2, type: "image", colSpan: 1 },
      { src: pfVid2, type: "video", colSpan: 2 },
      { src: pfVid3, type: "video", colSpan: 2 },
      { src: pfImg3, type: "image", colSpan: 1 },
      { src: pfImg4, type: "image", colSpan: 1 },
      { src: pfImg5, type: "image", colSpan: 2 },
      { src: pfImg7, type: "image", colSpan: 2 },
      { src: pfImg6, type: "image", colSpan: 2 },
    ] satisfies GalleryItem[],
  },
  // 3 - Dani Fernandes Campanha de Natal
  {
    image: dnCover,
    coverPosition: "center center",
    title: "Dani Fernandes | Campanha de Natal",
    subtitle: "Ação Comercial | Lançamento",
    description:
      "Dani Fernandes precisava de alguns conteúdos para potencializar a campanha de Natal. Fizemos melhor: levamos o comprador para um universo de sensações natalinas e familiares por meio do aroma.",
    tags: ["Produção visual", "Ambientação", "Vídeo"],
    gallery: [
      { src: dnVid1, type: "video", colSpan: 2, poster: dnPoster1 },
      { src: dnVid4, type: "video", colSpan: 2, poster: dnPoster2 },
      { src: dnVid2, type: "video", colSpan: 2 },
      { src: dnVid3, type: "video", colSpan: 2 },
    ] satisfies GalleryItem[],
  },
  // 4 - The National Gallery
  {
    image: tngCover,
    coverPosition: "center center",
    title: "Dani Fernandes × The National Gallery",
    subtitle: "Lançamento de novas fragrâncias",
    description:
      "No encontro entre a marca Dani Fernandes e o tradicional museu de Londres, criamos uma campanha para aproximar a arte do cotidiano, transformando a fragrância em um objeto de desejo dentro de casa.\n\nIsso fortalece a narrativa da marca e facilita a decisão de compra.",
    tags: ["Direção criativa da campanha", "Ambientação e produção visual", "Foto + vídeo de lançamento"],
    gallery: [
      { src: tngVid1, type: "video", colSpan: 2 },
      { src: tngImg1, type: "image", colSpan: 1 },
      { src: tngImg2, type: "image", colSpan: 1 },
      { src: tngVid2, type: "video", colSpan: 2 },
      { src: tngVid3, type: "video", colSpan: 2 },
      { src: tngImg3, type: "image", colSpan: 1 },
      { src: tngImg4, type: "image", colSpan: 1 },
      { src: tngImg5, type: "image", colSpan: 1 },
      { src: tngImg6, type: "image", colSpan: 1 },
      { src: tngVid4, type: "video", colSpan: 2 },
      { src: tngVid5, type: "video", colSpan: 2, poster: tngVid5Poster },
    ] satisfies GalleryItem[],
  },
  // 5 - Etoiles
  {
    image: etCover,
    coverPosition: "center top",
    title: "Etoiles by Corpo de Ballet Shop",
    subtitle: "Nova coleção | Lançamento",
    description:
      "Na segunda coleção da Corpo de Ballet Shop, a marca firmou presença ao apresentar com mais clareza o seu universo.\n\nAtravés da personagem Etoiles, a campanha mostrou ao público o sonho de viver uma rotina elegante, com estética europeia e os looks como plano de fundo.",
    tags: ["Roteiro e vídeo", "Produção visual", "Fotografia + look book"],
    gallery: [
      { src: etVid1, type: "video", colSpan: 2, poster: etPosterVid1 },
      { src: etImg1, type: "image", colSpan: 1 },
      { src: etImg2, type: "image", colSpan: 1 },
      { src: etImg3, type: "image", colSpan: 1 },
      { src: etImg4, type: "image", colSpan: 1 },
      { src: etImg5, type: "image", colSpan: 2 },
      { src: etImg6, type: "image", colSpan: 1 },
      { src: etImg7, type: "image", colSpan: 1 },
      { src: etImg8, type: "image", colSpan: 1 },
      { src: etImg9, type: "image", colSpan: 1 },
    ] satisfies GalleryItem[],
  },
  // 6 - La Vie
  {
    image: lvCover,
    coverPosition: "center center",
    title: "La Vie - Moda Feminina",
    subtitle: "Reposicionamento | Ação Comercial | Inauguração",
    description:
      "A loja precisava comunicar uma nova identidade visual, a reinauguração do espaço e aproveitar esse momento para aquecer as vendas para o Rodeio de Catanduva.\nO resultado foi um alto alcance orgânico, seguido de um movimento maior de vendas.",
    tags: ["Produção visual", "Calendário de conteúdo", "Fotografia e audiovisual"],
    gallery: [
      { src: lvVid1, type: "video", colSpan: 2, poster: lvPosterVid1 },
      { src: lvImg1, type: "image", colSpan: 1 },
      { src: lvImg2, type: "image", colSpan: 1 },
      { src: lvImg3, type: "image", colSpan: 1 },
      { src: lvImg4, type: "image", colSpan: 1 },
      { src: lvVid2, type: "video", colSpan: 2 },
      { src: lvImg5, type: "image", colSpan: 1 },
      { src: lvImg6, type: "image", colSpan: 1 },
      { src: lvVid3, type: "video", colSpan: 2 },
      { src: lvVid4, type: "video", colSpan: 3 },
    ] satisfies GalleryItem[],
  },
  // 7 - Velvet Cherry
  {
    image: vcCover,
    coverPosition: "center top",
    title: "Velvet Cherry by Dani Fernandes",
    subtitle: "Nova coleção | Lançamento",
    description:
      "O aroma que se tornou sucesso em vendas carrega uma identidade que foi construída em um material de fotos e vídeos para a rede social:\n\nTextura leve, maciez, feminilidade e doçura.\n\nNosso time entregou fotografia ambientada, still e direção criativa em estúdio.",
    tags: ["Direção Criativa", "Fotografia", "Vídeo"],
    gallery: [
      { src: vcImg1, type: "image", colSpan: 1 },
      { src: vcVid1, type: "video", colSpan: 2 },
      { src: vcImg2, type: "image", colSpan: 1 },
      { src: vcImg3, type: "image", colSpan: 1 },
      { src: vcImg4, type: "image", colSpan: 1 },
      { src: vcImg5, type: "image", colSpan: 1 },
      { src: vcImg8, type: "image", colSpan: 1 },
      { src: vcImg9, type: "image", colSpan: 1 },
      { src: vcImg10, type: "image", colSpan: 2 },
      { src: vcImg11, type: "image", colSpan: 1 },
      { src: vcImg6, type: "image", colSpan: 2 },
      { src: vcImg7, type: "image", colSpan: 3 },
    ] satisfies GalleryItem[],
  },
  // 8 - Adriano Martins
  {
    image: adCover,
    coverPosition: "center top",
    title: "Adriano Martins Estilista",
    subtitle: "Moda Noiva & Festa | Lançamento de Coleção",
    description:
      "A proposta de criar um lookbook irreverente agrega valor à marca e direciona a comunicação ao público certo.\nIsso diminui os ruídos no caminho até o cliente e ajuda a qualificar melhor a venda, tudo por meio de imagens que impactam.",
    tags: ["Produção visual", "Fotografia", "Lookbook"],
    gallery: [
      { src: adImg1, type: "image", colSpan: 1 },
      { src: adImg2, type: "image", colSpan: 1 },
      { src: adImg3, type: "image", colSpan: 1 },
      { src: adImg4, type: "image", colSpan: 1 },
      { src: adImg5, type: "image", colSpan: 1 },
      { src: adImg6, type: "image", colSpan: 1 },
      { src: adImg7, type: "image", colSpan: 1 },
      { src: adImg8, type: "image", colSpan: 2 },
      { src: adImg9, type: "image", colSpan: 1 },
      { src: adImg10, type: "image", colSpan: 2 },
    ] satisfies GalleryItem[],
  },
  // 9 - AuraMia
  {
    image: aCover,
    coverPosition: "center center",
    title: "Auramia by Beatriz Manganelli",
    subtitle: "Lançamento | Moda Fitness",
    description:
      "Em Aracaju (SE), criamos a campanha de lançamento da Auramia para apresentar a coleção Brisa com leveza, desejo e intenção de compra.\nA comunicação foi pensada para aquecer o público antes da abertura e transformar expectativa em movimento real.\nQuando o site abriu, vários modelos esgotaram em 24 horas.",
    tags: ["Estudo de público", "Calendário de lançamento", "Foto + vídeo de campanha"],
    gallery: [
      { src: aVid1, type: "video", colSpan: 2 },
      { src: aImg2, type: "image", colSpan: 2 },
      { src: aImg5, type: "image", colSpan: 2 },
      { src: aVid2, type: "video", colSpan: 2 },
      { src: aVid3, type: "video", colSpan: 2, poster: aPosterEntrevista },
      { src: aImg6, type: "image", colSpan: 2 },
      { src: aImg7, type: "image", colSpan: 1 },
      { src: aImg3, type: "image", colSpan: 1 },
      { src: aImg4, type: "image", colSpan: 2 },
    ] satisfies GalleryItem[],
  },
  // 10 - Nova Trida
  {
    image: ntCover,
    coverPosition: "center center",
    title: "Nova Trida | Tecnologia & Suprimentos para Empresas",
    subtitle: "Reposicionamento | Institucional",
    description:
      "A Nova Trida já era uma empresa tradicional em Catanduva, mas decidiu se comunicar com uma nova parcela do público para expandir o negócio.\n\nO rebranding foi institucional, mas com humanidade, para deixar claro esse novo momento da marca.\n\nTambém renovamos o vídeo institucional, alinhamos a comunicação com os clientes e criamos um calendário estratégico para o Instagram.",
    tags: ["Foto e vídeo", "Estratégia de comunicação", "Calendário de publicações"],
    gallery: [
      { src: ntVid1, type: "video", colSpan: 2 },
      { src: ntImg1, type: "image", colSpan: 1 },
      { src: ntImg2, type: "image", colSpan: 1 },
      { src: ntVid2, type: "video", colSpan: 2 },
      { src: ntVid3, type: "video", colSpan: 3 },
    ] satisfies GalleryItem[],
  },
  // 11 - Cravates
  {
    image: crCover,
    coverPosition: "center center",
    title: "Coleção Cravates by Corpo De Ballet",
    subtitle: "Lançamento | Moda Ballet",
    description:
      "Campos do Jordão foi o cenário perfeito para uma campanha extremamente elegante.\nPara apresentar a coleção, unimos duas personagens já conhecidas da marca: Cher, delicada e americana, e Etoiles, fina e europeia.\nEssa construção de imagem e narrativa fez o público responder — Cravates se tornou a coleção mais vendida da CB Shop.",
    tags: ["Produção visual", "Fotografia de campanha", "Roteiro + captação de vídeo"],
    gallery: [
      // 0: Video, 1: IMG_0706, 2: IMG_0455, 3: IMG_0423, 4: IMG_0276, 5: IMG_0190, 6: IMG_0143
      { src: crVid1, type: "video", ratio: 9/16, fit: "contain" },
      { src: crImg2, type: "image" },
      { src: crImg3, type: "image" },
      { src: crImg1, type: "image" },
      { src: crImg4, type: "image" },
      { src: crImg5, type: "image" },
      { src: crImg6, type: "image" },
    ] satisfies GalleryItem[],
    manualLayout: [
      { indices: [0, 1], fractions: [2, 3] },   // L1: Vídeo portrait + foto (foto domina largura)
      { indices: [2] },                           // L2: Foto sozinha full-width
      { indices: [3, 4] },                        // L3: Duas fotos
      { indices: [5, 6] },                        // L4: Duas fotos proporcionais
    ],
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


const CampaignsSection = () => {
  const [openGallery, setOpenGallery] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStartIdx, setLightboxStartIdx] = useState(0);

  return (
    <>
      <section className="py-12 sm:py-16 md:py-20 section-container">
        <div className="space-y-8 md:space-y-12">
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

              <div className="flex flex-col gap-0 h-full">
                {/* Cover image — full width, editorial proportion */}
                <div className="w-[48%] mx-auto flex-shrink-0 overflow-hidden">
                  {campaign.image ? (
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full min-h-[140px] md:min-h-[210px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: campaign.coverPosition || "center center" }}
                    />
                  ) : (
                    <div className="w-full min-h-[140px] md:min-h-[210px] flex items-center justify-center bg-white/[0.05]">
                      <span className="text-white/40 text-sm tracking-[0.2em] uppercase">Em breve</span>
                    </div>
                  )}
                </div>
                <div className="w-[48%] mx-auto p-6 md:p-8 space-y-2 flex flex-col">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/50">{campaign.subtitle}</p>
                  <h3
                    className="font-heading text-base md:text-xl font-semibold leading-tight text-foreground"
                    style={{ textShadow: "0 0 12px rgba(234,234,234,0.3)" }}
                  >
                    {campaign.title}
                  </h3>
                  <p className="text-xs md:text-sm text-white/70 leading-relaxed">{campaign.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {campaign.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-[9px] tracking-wider uppercase rounded-full bg-white/10 border border-white/20 text-white/60"
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

              <h3 className="font-heading text-xl font-semibold text-white text-center mb-4">
                {campaigns[openGallery].title}
              </h3>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {campaigns[openGallery].tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-[10px] tracking-wider uppercase rounded-full bg-white/10 border border-white/20 text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="max-w-3xl mx-auto">
                <AdaptiveGallery
                  items={campaigns[openGallery].gallery}
                  campaignTitle={campaigns[openGallery].title}
                  manualLayout={(campaigns[openGallery] as any).manualLayout}
                  onImageClick={(imgIdx) => {
                    setLightboxStartIdx(imgIdx);
                    setLightboxOpen(true);
                  }}
                />
              </div>

              {lightboxOpen && openGallery !== null && (
                <PhotoLightbox
                  images={campaigns[openGallery].gallery.filter(g => g.type === "image").map(g => g.src)}
                  startIndex={lightboxStartIdx}
                  onClose={() => setLightboxOpen(false)}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CampaignsSection;
