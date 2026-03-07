import portfolioTitle from "@/assets/portfolio-title.png";

const PortfolioDivider = () => {
  return (
    <div className="w-full py-6 flex justify-center">
      <img
        src={portfolioTitle}
        alt="Portfólio"
        className="h-12 md:h-16 lg:h-20 w-auto object-contain"
      />
    </div>
  );
};

export default PortfolioDivider;
