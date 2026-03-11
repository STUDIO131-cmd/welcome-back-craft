import { motion } from "framer-motion";
import cimples from "@/assets/clients/cimples.png";
import auramia from "@/assets/clients/auramia.png";
import corpoBallet from "@/assets/clients/corpo-ballet.png";
import ouromil from "@/assets/clients/ouromil.png";
import anaFlavia from "@/assets/clients/ana-flavia.png";
import laVie from "@/assets/clients/la-vie.png";
import client7 from "@/assets/clients/client7.png";
import client8 from "@/assets/clients/client8.png";
import client9 from "@/assets/clients/client9.png";
import client10 from "@/assets/clients/client10.png";

const row1 = [cimples, auramia, corpoBallet, ouromil, anaFlavia];
const row2 = [laVie, client7, client8, client9, client10];

const ScrollRow = ({ items }: { items: string[] }) => (
  <div className="overflow-hidden py-2">
    <div className="flex animate-scroll-right" style={{ width: "max-content" }}>
      {[...items, ...items].map((src, i) => (
        <div key={i} className="flex-shrink-0 mx-3">
          <img
            src={src}
            alt="Cliente"
            className="w-[117px] h-[117px] md:w-[153px] md:h-[153px] lg:w-[165px] lg:h-[165px] rounded-full object-contain transition-all duration-500"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  </div>
);

const ClientsCarousel = () => {
  return (
    <div className="w-full py-12 sm:py-16 md:py-20 relative">
      <div className="section-container">
        <h2
          className="text-center text-foreground mb-8"
          style={{
            fontFamily: "'TikTok Sans', sans-serif",
            fontSize: "clamp(1.2rem, 4vw, 2rem)",
            fontWeight: 500,
            letterSpacing: "0.05em",
          }}
        >
          Algumas marcas que já atendemos:
        </h2>

        {/* Glass bar container with faders */}
        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-6 md:px-10 py-6 overflow-hidden">
          {/* Left fader */}
          <div
            className="absolute left-0 top-0 h-full w-[40px] sm:w-[60px] md:w-[80px] lg:w-[100px] z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, rgba(255,255,255,0.10), transparent)" }}
          />
          {/* Right fader */}
          <div
            className="absolute right-0 top-0 h-full w-[40px] sm:w-[60px] md:w-[80px] lg:w-[100px] z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, rgba(255,255,255,0.10), transparent)" }}
          />

          <div className="flex flex-col gap-2">
            <ScrollRow items={row1} />
            <ScrollRow items={row2} />
          </div>
        </div>

        {/* CTA button */}
        <div className="flex justify-center mt-8">
          <motion.a
            href="#orcamento"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.97 }}
            className="w-[92vw] sm:w-fit inline-flex items-center justify-center gap-2 px-8 min-h-[44px] py-4 rounded-full backdrop-blur-xl bg-white/[0.08] border border-white/[0.15] text-foreground text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:bg-white/[0.14] text-center"
          >
            Quero Avaliar Uma Campanha
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default ClientsCarousel;
