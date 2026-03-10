import { useState } from "react";
import { motion } from "framer-motion";
import eagleLogo from "@/assets/eagle-logo.png";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    whatsapp: "",
    isTargetArea: "",
    niche: "",
    hasTeam: "",
    revenue: "",
    urgency: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="py-12 md:py-20 backdrop-blur-xl bg-white/[0.08] border-y border-white/[0.15]" id="orcamento">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-heading text-2xl md:text-3xl text-center text-foreground/90 mb-4">
            Preencha o formulário de contato
          </h2>
          <p className="text-center text-muted-foreground text-sm leading-relaxed mb-12">
            Ao preencher o formulário abaixo, você se candidata a uma vaga no Plano
            Profissional e autoriza o envio de atualizações sobre as próximas
            etapas. Mantemos um limite de clientes ativos para preservar o padrão
            de entrega. Por isso, as vagas funcionam por lista de interesse.
            <br />
            <br />
            <strong className="text-foreground">
              Aplique-se preenchendo todas as informações abaixo.
            </strong>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">
                  Nome <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Nome"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">
                  Sobrenome
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Sobrenome"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Whatsapp <span className="text-destructive">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.whatsapp}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="DDD + Número"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground/80">
                Seu negócio está em alguma dessas áreas: medicina, clínica, hof ou
                advocacia? <span className="text-destructive">*</span>
              </label>
              <div className="flex gap-4">
                {["Sim", "Não"].map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                      formData.isTargetArea === opt
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-input text-foreground hover:bg-secondary"
                    }`}
                  >
                    <input
                      type="radio"
                      name="targetArea"
                      value={opt}
                      checked={formData.isTargetArea === opt}
                      onChange={(e) => handleChange("isTargetArea", e.target.value)}
                      className="sr-only"
                    />
                    <span className="text-sm">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Qual sua área de atuação específica?{" "}
                <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.niche}
                onChange={(e) => handleChange("niche", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Indique o seu nicho/especialidade"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground/80">
                Você tem time comercial? <span className="text-destructive">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {["Sim, secretária", "Sim, vendedor dedicado", "Não tenho"].map(
                  (opt) => (
                    <label
                      key={opt}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors text-sm ${
                        formData.hasTeam === opt
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-input text-foreground hover:bg-secondary"
                      }`}
                    >
                      <input
                        type="radio"
                        name="hasTeam"
                        value={opt}
                        checked={formData.hasTeam === opt}
                        onChange={(e) => handleChange("hasTeam", e.target.value)}
                        className="sr-only"
                      />
                      {opt}
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground/80">
                Faixa de faturamento mensal{" "}
                <span className="text-destructive">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  "Abaixo de 30k",
                  "Entre 30k - 60k",
                  "60k - 100k",
                  "Acima de 100k",
                ].map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors text-sm ${
                      formData.revenue === opt
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-input text-foreground hover:bg-secondary"
                    }`}
                  >
                    <input
                      type="radio"
                      name="revenue"
                      value={opt}
                      checked={formData.revenue === opt}
                      onChange={(e) => handleChange("revenue", e.target.value)}
                      className="sr-only"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground/80">
                Você precisa começar agora ou pode planejar?{" "}
                <span className="text-destructive">*</span>
              </label>
              <div className="flex flex-col gap-3">
                {[
                  "Preciso de um movimento imediato",
                  "Posso aguardar a abertura de novas vagas",
                  "Ainda estou avaliando possibilidades",
                ].map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-colors text-sm ${
                      formData.urgency === opt
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-input text-foreground hover:bg-secondary"
                    }`}
                  >
                    <input
                      type="radio"
                      name="urgency"
                      value={opt}
                      checked={formData.urgency === opt}
                      onChange={(e) => handleChange("urgency", e.target.value)}
                      className="sr-only"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Limitamos a 10 clientes ativos para manter excelência.
            </p>

            <div className="text-center pt-4">
              <button
                type="submit"
                className="px-10 py-4 rounded-full bg-primary text-primary-foreground text-sm tracking-[0.2em] uppercase font-medium hover:opacity-90 transition-opacity max-w-full"
              >
                Enviar
              </button>
            </div>
          </form>

          <div className="flex justify-center mt-12">
            <img
              src={eagleLogo}
              alt="Plano Profissional"
              className="w-32 opacity-60"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
