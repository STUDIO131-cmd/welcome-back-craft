const PortfolioDivider = () => {
  return (
    <div className="w-full py-4 backdrop-blur-xl bg-white/10 border-y border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.08)]">
      <p
        className="text-center text-lg md:text-xl tracking-[0.4em] uppercase text-white/90"
        style={{
          fontFamily: "'TikTok Sans', sans-serif",
          fontWeight: 500,
          textShadow:
            "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(200,180,255,0.4)",
        }}
      >
        Portfolio
      </p>
    </div>
  );
};

export default PortfolioDivider;
