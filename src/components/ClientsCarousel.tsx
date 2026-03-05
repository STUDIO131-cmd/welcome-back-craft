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

const clients = [
  cimples, auramia, corpoBallet, ouromil, anaFlavia,
  laVie, client7, client8, client9, client10,
];

const ClientsCarousel = () => {
  return (
    <section className="py-16">
      <div className="section-divider" />
      <h2 className="font-display text-2xl md:text-3xl text-center text-foreground/70 mb-12">
        Algumas marcas que já atendemos:
      </h2>

      <div className="section-container">
        <div className="flex flex-wrap justify-center gap-6">
          {clients.map((src, i) => (
            <div key={i}>
              <img
                src={src}
                alt="Cliente"
                className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
};

export default ClientsCarousel;
