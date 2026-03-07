import portfolioTitle from "@/assets/portfolio-title.png";

const PortfolioDivider = () => {
  return (
    <div className="w-full py-6 flex justify-center">
      <img
        src={portfolioTitle}
        alt="Portfólio"
        className="w-[320px] md:w-[380px] lg:w-[420px] h-auto object-contain"
      />
    </div>
  );
};

export default PortfolioDivider;
