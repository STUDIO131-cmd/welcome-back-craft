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
            className="w-[117px] h-[117px] md:w-[153px] md:h-[153px] lg:w-[165px] lg:h-[165px] rounded-full object-cover transition-all duration-500"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  </div>
);

const ClientsCarousel = () => {
  return (
    <div className="w-full py-12 md:py-20 relative">
      <div className="section-container">
        <h2 className="font-display text-2xl md:text-3xl text-center text-foreground mb-8">
          Algumas marcas que já atendemos:
        </h2>

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-6 md:px-10 py-6 overflow-hidden">
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
