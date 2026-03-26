import { useState } from "react";

const FooterSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const buttons = [
    {
      label: "131 FOTOS",
      href: "https://131fotos.studio131.com.br",
      external: true,
      disabled: true,
      tooltip: "EM BREVE",
    },
    {
      label: "O PLANO PROFISSIONAL",
      href: "https://planoprofissional.studio131.com.br",
      external: true,
    },
    {
      label: "THE JOURNEY",
      href: "https://ajornadaimersao.studio131.com.br",
      external: true,
      subtitle: "FRENTE EDUCACIONAL",
    },
    { label: "VOLTAR AO TOPO", onClick: scrollToTop },
  ];

  const btnClass =
    "min-h-[56px] px-5 py-3 rounded-lg backdrop-blur-xl border border-white/[0.15] text-foreground/90 text-xs sm:text-[0.7rem] tracking-[0.2em] uppercase font-medium hover:bg-white/[0.15] transition-all text-center leading-[1.3] whitespace-normal relative overflow-hidden no-underline inline-flex flex-col items-center justify-center";

  return (
    <footer className="py-8 md:py-12">
      <div className="flex flex-col items-center gap-6">
        <img
          alt="Studio 131"
          className="h-16 md:h-20 w-auto"
          src="/lovable-uploads/e96bcd27-f057-48d3-b6de-5d3953b0b2ba.png"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-[92vw] sm:w-auto sm:max-w-lg mx-auto">
          {buttons.map((btn, i) => {
            if (btn.external) {
              return (
                <a
                  key={btn.label}
                  href={btn.disabled ? undefined : btn.href}
                  target={btn.disabled ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`${btnClass} ${btn.disabled ? "cursor-default opacity-80" : ""}`}
                  style={{ backgroundColor: "rgba(80, 90, 110, 0.25)" }}
                  onClick={btn.disabled ? (e) => e.preventDefault() : undefined}
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {btn.label}
                    {btn.tag && (
                      <span className="text-[8px] tracking-[0.12em] font-semibold bg-white/15 border border-white/20 text-foreground/70 px-1.5 py-0.5 rounded">
                        {btn.tag}
                      </span>
                    )}
                  </span>
                  {btn.subtitle && (
                    <span className="relative z-10 block text-[9px] tracking-[0.15em] text-foreground/50 mt-0.5">
                      {btn.subtitle}
                    </span>
                  )}
                  {btn.tooltip && hoveredIndex === i && (
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white/90 text-black text-[9px] tracking-[0.15em] font-semibold px-2.5 py-1 rounded shadow-md z-20 whitespace-nowrap">
                      {btn.tooltip}
                    </span>
                  )}
                </a>
              );
            }

            return (
              <button
                key={btn.label}
                onClick={btn.onClick}
                className={btnClass}
                style={{ backgroundColor: "rgba(80, 90, 110, 0.25)" }}
              >
                <span className="relative z-10">{btn.label}</span>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-white/40 text-center">
          Studio 131 © Copyright 2026 — Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
