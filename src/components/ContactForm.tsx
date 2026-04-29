import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

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
    hasPlan: "",
    planDescription: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSubmitError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) {
        console.error("[ContactForm] Send failed", error);
        throw error;
      }

      setShowSuccess(true);

      setFormData({
        firstName: "",
        lastName: "",
        company: "",
        whatsapp: "",
        instagram: "",
        revenue: "",
        timing: "",
        campaignDate: "",
        hasPlan: "",
        planDescription: ""
      });
    } catch (err: unknown) {
      const e = err as { message?: string };
      console.error("[ContactForm] Send failed", e?.message);
      if (e?.message === "Failed to fetch") {
        setSubmitError(
          "Falha de conexão. Verifique sua internet e tente novamente."
        );
      } else {
        setSubmitError(
          "Erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const radioClasses = (field: string, value: string) =>
    `flex items-center gap-2 px-4 min-h-[44px] rounded-lg border cursor-pointer transition-colors text-sm ${
      formData[field as keyof typeof formData] === value
        ? "bg-primary text-primary-foreground border-primary"
        : "bg-background border-input text-foreground hover:bg-secondary"
    }`;

  return (
    <section
      className="py-12 sm:py-16 md:py-20 pb-16 md:pb-24 backdrop-blur-xl bg-white/[0.08] border-y border-white/[0.15]"
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
            Conte-nos sobre a sua próxima campanha. Vamos avaliar o escopo e
            retornar com uma proposta personalizada.
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
              <div className="flex flex-col md:flex-row flex-wrap gap-3">
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

            {/* Planejamento */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground/80">
                Você já tem um planejamento para a campanha?{" "}
                <span className="text-destructive">*</span>
              </label>
              <div className="flex gap-4">
                {["Não, estou avaliando", "Tenho, quero compartilhar"].map(
                  (opt) => (
                    <label key={opt} className={radioClasses("hasPlan", opt)}>
                      <input
                        type="radio"
                        name="hasPlan"
                        value={opt}
                        checked={formData.hasPlan === opt}
                        onChange={(e) =>
                          handleChange("hasPlan", e.target.value)
                        }
                        className="sr-only"
                        required
                      />
                      {opt}
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Conditional textarea */}
            <AnimatePresence>
              {formData.hasPlan === "Tenho, quero compartilhar" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="text-sm font-medium text-foreground/80">
                    Descreva brevemente o que você tem em mente para a campanha:{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    required
                    value={formData.planDescription}
                    onChange={(e) =>
                      handleChange("planDescription", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[120px]"
                    placeholder="Pode ser um conceito, referência, data, produto..."
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-center pt-4 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-fit md:mx-auto px-10 min-h-[44px] py-4 rounded-full bg-primary text-primary-foreground text-sm tracking-[0.2em] uppercase font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
              {submitError && (
                <p className="text-destructive text-sm">{submitError}</p>
              )}
            </div>
          </form>
        </motion.div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md max-w-[92vw] mx-auto rounded-2xl p-8 backdrop-blur-xl bg-white/[0.08] border border-white/[0.15] text-center"
            >
              <h3 className="font-heading text-xl md:text-2xl text-foreground/90 mb-4">
                Obrigado pelas informações :-)
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                Nossa equipa vai avaliar as informações sobre a campanha e
                retornaremos no contato de WhatsApp dentro de 24h.
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full md:w-fit md:mx-auto px-10 min-h-[44px] py-3 rounded-full backdrop-blur-xl bg-white/[0.08] border border-white/[0.15] text-foreground text-sm tracking-[0.2em] uppercase font-medium hover:bg-white/[0.15] transition-colors"
              >
                Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactForm;
