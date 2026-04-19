import portfolioTitle from "@/assets/portfolio-title.webp";

const PortfolioDivider = () => {
  return (
    <div className="w-full py-6 flex justify-center">
      <img
        src={portfolioTitle}
        alt="Portfólio"
        width={420}
        height={120}
        loading="lazy"
        decoding="async"
        className="w-[320px] md:w-[380px] lg:w-[420px] h-auto object-contain"
      />
    </div>
  );
};

export default PortfolioDivider;
