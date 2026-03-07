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
  <div className="overflow-hidden">
    <div className="flex animate-scroll-right" style={{ width: "max-content" }}>
      {[...items, ...items].map((src, i) => (
        <div key={i} className="flex-shrink-0 mx-3">
          <img
            src={src}
            alt="Cliente"
            className="w-[117px] h-[117px] md:w-[153px] md:h-[153px] lg:w-[165px] lg:h-[165px] rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  </div>
);

const ClientsCarousel = () => {
  return (
    <div
      className="w-full py-12 backdrop-blur-xl border-y border-white/10"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.08) 100%)",
        boxShadow: "0 0 40px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <div className="section-container">
        <h2 className="font-display text-2xl md:text-3xl text-center text-white/70 mb-8">
          Algumas marcas que já atendemos:
        </h2>

        <div
          className="overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="flex flex-col gap-2">
            <ScrollRow items={row1} />
            <ScrollRow items={row2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsCarousel;
