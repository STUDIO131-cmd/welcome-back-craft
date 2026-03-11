import eagleLogo from "@/assets/eagle-logo.png";

const FooterSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buttons = [
  { label: "Sobre o Studio 131", bg: "rgba(120, 80, 160, 0.25)" },
  { label: "Conheça o Plano Profissional", bg: "rgba(70, 90, 140, 0.25)" },
  { label: "Fotografia", bg: "rgba(160, 90, 110, 0.25)" },
  { label: "Voltar ao topo", bg: "rgba(80, 90, 110, 0.25)", onClick: scrollToTop }];


  return (
    <footer className="py-8 md:py-12">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <img

          alt="Studio 131"
          className="h-16 md:h-20 w-auto" src="/lovable-uploads/e96bcd27-f057-48d3-b6de-5d3953b0b2ba.png" />
        

        {/* Button grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-[92vw] sm:w-auto sm:max-w-lg mx-auto">
          {buttons.map((btn) =>
          <button
            key={btn.label}
            onClick={btn.onClick}
            className="min-h-[44px] px-6 py-3 rounded-lg backdrop-blur-xl border border-white/[0.15] text-foreground/90 text-xs tracking-[0.2em] uppercase font-medium hover:bg-white/[0.15] transition-all text-center"
            style={{ backgroundColor: btn.bg }}>
            
              {btn.label}
            </button>
          )}
        </div>

        {/* Copyright */}
        <p className="text-xs text-white/40 text-center">
          Studio 131 © Copyright 2026 — Todos os direitos reservados
        </p>
      </div>
    </footer>);

};

export default FooterSection;