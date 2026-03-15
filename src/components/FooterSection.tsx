const FooterSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buttons = [
    { label: "CAMPANHAS", href: "#campanhas" },
    { label: "O PLANO PROFISSIONAL", href: "#orcamento" },
    { label: "THE JOURNEY", href: "#diferenciais", subtitle: "FRENTE EDUCACIONAL" },
    { label: "VOLTAR AO TOPO", onClick: scrollToTop },
  ];

  return (
    <footer className="py-8 md:py-12">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <img
          alt="Studio 131"
          className="h-16 md:h-20 w-auto"
          src="/lovable-uploads/e96bcd27-f057-48d3-b6de-5d3953b0b2ba.png"
        />

        {/* Button grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-[92vw] sm:w-auto sm:max-w-lg mx-auto">
          {buttons.map((btn) => (
            <button
              key={btn.label}
              onClick={btn.onClick ?? (() => {
                if (btn.href) {
                  const el = document.querySelector(btn.href);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }
              })}
              className="min-h-[56px] px-5 py-3 rounded-lg backdrop-blur-xl border border-white/[0.15] text-foreground/90 text-xs sm:text-[0.7rem] tracking-[0.2em] uppercase font-medium hover:bg-white/[0.15] transition-all text-center leading-[1.3] whitespace-normal relative overflow-hidden"
              style={{ backgroundColor: "rgba(80, 90, 110, 0.25)" }}
            >
              <span className="relative z-10">{btn.label}</span>
              {btn.subtitle && (
                <span className="relative z-10 block text-[9px] tracking-[0.15em] text-foreground/50 mt-0.5">
                  {btn.subtitle}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-white/40 text-center">
          Studio 131 © Copyright 2026 — Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
