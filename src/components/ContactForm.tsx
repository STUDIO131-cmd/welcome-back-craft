import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import eagleLogo from "@/assets/eagle-logo.png";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    whatsapp: "",
    instagram: "",
    revenue: "",
    timing: "",
    campaignDate: "",
    hasIdea: "",
    ideaDescription: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/send-campaign-inquiry`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to send");

      toast.success("Obrigado pelas informações :-)", {
        description:
          "Nossa equipa vai avaliar as informações sobre a campanha e retornaremos no contato de WhatsApp dentro de 24h.",
        duration: 8000,
      });

      setFormData({
        firstName: "",
        lastName: "",
        company: "",
        whatsapp: "",
        instagram: "",
        revenue: "",
        timing: "",
        campaignDate: "",
        hasIdea: "",
        ideaDescription: "",
      });
    } catch {
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const radioClasses = (field: string, value: string) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors text-sm ${
      formData[field as keyof typeof formData] === value
        ? "bg-primary text-primary-foreground border-primary"
        : "bg-background border-input text-foreground hover:bg-secondary"
    }`;

  return (
    <section
      className="py-12 md:py-20 backdrop-blur-xl bg-white/[0.08] border-y border-white/[0.15]"
      id="orcamento"
    >
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
          <p className="text-center text-muted-foreground text-sm leading-relaxed mb-6 md:mb-12">
            Ao preencher o formulário abaixo, você se candidata a uma vaga no
            Plano Profissional e autoriza o envio de atualizações sobre as
            próximas etapas. Mantemos um limite de clientes ativos para preservar
            o padrão de entrega. Por isso, as vagas funcionam por lista de
            interesse.
            <br />
            <br />
            <strong className="text-foreground">
              Aplique-se preenchendo todas as informações abaixo.
            </strong>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome + Sobrenome */}
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
                  Sobrenome <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Sobrenome"
                />
              </div>
            </div>

            {/* Empresa */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Empresa
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Nome da empresa (opcional)"
              />
            </div>

            {/* WhatsApp */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                WhatsApp <span className="text-destructive">*</span>
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

            {/* Instagram */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Instagram da empresa <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.instagram}
                onChange={(e) => handleChange("instagram", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="@nomedeusuario"
              />
            </div>

            {/* Faturamento */}
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
                  <label key={opt} className={radioClasses("revenue", opt)}>
                    <input
                      type="radio"
                      name="revenue"
                      value={opt}
                      checked={formData.revenue === opt}
                      onChange={(e) => handleChange("revenue", e.target.value)}
                      className="sr-only"
                      required
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            {/* Timing */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground/80">
                Você está buscando uma campanha para agora ou planejando?{" "}
                <span className="text-destructive">*</span>
              </label>
              <div className="flex flex-col gap-3">
                {[
                  "Quero começar logo (objetivos em 30 dias)",
                  "Estou programando e quero conhecer proposta",
                ].map((opt) => (
                  <label key={opt} className={radioClasses("timing", opt)}>
                    <input
                      type="radio"
                      name="timing"
                      value={opt}
                      checked={formData.timing === opt}
                      onChange={(e) => handleChange("timing", e.target.value)}
                      className="sr-only"
                      required
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            {/* Data da campanha */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Há alguma data específica para a campanha?
              </label>
              <input
                type="text"
                value={formData.campaignDate}
                onChange={(e) => handleChange("campaignDate", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="ex: black friday, dia das mães..."
              />
            </div>

            {/* Tem ideia? */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground/80">
                Há alguma ideia sobre o que você quer fazer?{" "}
                <span className="text-destructive">*</span>
              </label>
              <div className="flex gap-4">
                {["Sim", "Não"].map((opt) => (
                  <label key={opt} className={radioClasses("hasIdea", opt)}>
                    <input
                      type="radio"
                      name="hasIdea"
                      value={opt}
                      checked={formData.hasIdea === opt}
                      onChange={(e) => handleChange("hasIdea", e.target.value)}
                      className="sr-only"
                      required
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            {/* Conditional textarea */}
            <AnimatePresence>
              {formData.hasIdea === "Sim" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="text-sm font-medium text-foreground/80">
                    Descreva brevemente sua ideia sobre a campanha:{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    required
                    value={formData.ideaDescription}
                    onChange={(e) =>
                      handleChange("ideaDescription", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[100px]"
                    placeholder="Conte-nos um pouco sobre a campanha..."
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-4 rounded-full bg-primary text-primary-foreground text-sm tracking-[0.2em] uppercase font-medium hover:opacity-90 transition-opacity max-w-full disabled:opacity-50"
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
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
