import g1 from "@/assets/gallery/1.webp";
import g2 from "@/assets/gallery/2.webp";
import g3 from "@/assets/gallery/3.webp";
import g4 from "@/assets/gallery/4.webp";
import g5 from "@/assets/gallery/5.webp";
import g6 from "@/assets/gallery/6.webp";
import g7 from "@/assets/gallery/7.webp";
import g8 from "@/assets/gallery/8.webp";
import g9 from "@/assets/gallery/9.webp";

const images = [g1, g2, g3, g4, g5, g6, g7, g8, g9];

const GalleryScroll = () => {
  return (
    <section className="py-8 overflow-hidden">
      <div className="flex animate-scroll-gallery" style={{ width: "max-content" }}>
        {[...images, ...images].map((src, i) => (
          <div key={i} className="flex-shrink-0 mx-2">
            <img
              src={src}
              alt="Projeto"
              className="h-48 md:h-64 w-auto rounded-md object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GalleryScroll;
