import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { ArrowRight, Lock } from "lucide-react";
import { trackLeadEvent } from "@/lib/leads";

/* ── Tokens (espelham diagnosticoTokens) ─────────────── */
const BG_DARK = "#08090D";
const GOLD = "#C8B870";
const CREAM = "#EDE6DB";
const MUTED = "rgba(207,197,184,0.62)";
const DIM = "rgba(207,197,184,0.38)";
const BORDER = "rgba(200,184,112,0.14)";

/* ── Schema ──────────────────────────────────────────── */
const leadSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, { message: "Como você quer ser chamada?" })
    .max(60, { message: "Máximo 60 caracteres" }),
  email: z
    .string()
    .trim()
    .email({ message: "Email inválido" })
    .max(255, { message: "Email muito longo" }),
  whatsapp: z
    .string()
    .trim()
    .max(20, { message: "Máximo 20 caracteres" })
    .regex(/^[\d+\s()-]*$/, { message: "Use apenas números" })
    .optional()
    .or(z.literal("")),
});

export type LeadFormData = z.infer<typeof leadSchema>;

interface LeadGateProps {
  onSubmit: (data: { nome: string; email: string; whatsapp?: string }) => void | Promise<void>;
  onSkip: () => void;
}

/* ── Animations ──────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.13, duration: 0.7, ease: "easeOut" as const },
  }),
};

const LeadGate = ({ onSubmit, onSkip }: LeadGateProps) => {
  const [form, setForm] = useState<LeadFormData>({ nome: "", email: "", whatsapp: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    trackLeadEvent("lead_gate_view");
  }, []);

  const handleChange = (field: keyof LeadFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = leadSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LeadFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof LeadFormData;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      trackLeadEvent("lead_gate_error", { reason: "validation", fields: Object.keys(fieldErrors) });
      return;
    }

    setSubmitting(true);
    try {
      trackLeadEvent("lead_gate_submit");
      await onSubmit({
        nome: result.data.nome,
        email: result.data.email,
        whatsapp: result.data.whatsapp || undefined,
      });
    } catch (err) {
      trackLeadEvent("lead_gate_error", { reason: "submit_failed" });
      console.warn("[LeadGate] submit failed:", err);
      // ainda assim avança — falha silenciosa preserva o funil
      await onSubmit({
        nome: result.data.nome,
        email: result.data.email,
        whatsapp: result.data.whatsapp || undefined,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = () => {
    trackLeadEvent("lead_gate_skip");
    onSkip();
  };

  const inputBase: React.CSSProperties = {
    background: "rgba(237,230,219,0.03)",
    border: `1px solid ${BORDER}`,
    color: CREAM,
    fontFamily: "Inter, sans-serif",
    fontSize: "15px",
    padding: "14px 16px",
    width: "100%",
    outline: "none",
    transition: "border-color 200ms ease, background 200ms ease",
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-5 py-16"
      style={{ background: BG_DARK }}
    >
      <div className="w-full max-w-[480px]">
        {/* Kicker */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-center mb-6"
        >
          <span
            className="font-inter uppercase"
            style={{ color: GOLD, fontSize: "10px", letterSpacing: "0.45em" }}
          >
            Espelho da Clareza
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-center font-playfair font-bold uppercase mb-4"
          style={{
            color: CREAM,
            fontSize: "clamp(28px, 5vw, 38px)",
            lineHeight: 1.15,
            letterSpacing: "0.01em",
          }}
        >
          Seu mapa está pronto.
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-center font-inter mb-10"
          style={{ color: MUTED, fontSize: "15px", lineHeight: 1.6 }}
        >
          Para onde enviamos uma cópia da sua leitura?
        </motion.p>

        {/* Form */}
        <motion.form
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          onSubmit={handleSubmit}
          className="space-y-5"
          noValidate
        >
          {/* Nome */}
          <div>
            <label
              htmlFor="lead-nome"
              className="block font-inter uppercase mb-2"
              style={{ color: DIM, fontSize: "10px", letterSpacing: "0.3em" }}
            >
              Nome
            </label>
            <input
              id="lead-nome"
              type="text"
              autoComplete="given-name"
              value={form.nome}
              onChange={handleChange("nome")}
              maxLength={60}
              style={inputBase}
              onFocus={(e) => (e.currentTarget.style.borderColor = GOLD)}
              onBlur={(e) => (e.currentTarget.style.borderColor = BORDER)}
            />
            {errors.nome && (
              <p className="font-inter mt-1.5" style={{ color: "#C97B5A", fontSize: "12px" }}>
                {errors.nome}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="lead-email"
              className="block font-inter uppercase mb-2"
              style={{ color: DIM, fontSize: "10px", letterSpacing: "0.3em" }}
            >
              Email
            </label>
            <input
              id="lead-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={form.email}
              onChange={handleChange("email")}
              maxLength={255}
              style={inputBase}
              onFocus={(e) => (e.currentTarget.style.borderColor = GOLD)}
              onBlur={(e) => (e.currentTarget.style.borderColor = BORDER)}
            />
            {errors.email && (
              <p className="font-inter mt-1.5" style={{ color: "#C97B5A", fontSize: "12px" }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* WhatsApp (opcional) */}
          <div>
            <label
              htmlFor="lead-whatsapp"
              className="block font-inter uppercase mb-2"
              style={{ color: DIM, fontSize: "10px", letterSpacing: "0.3em" }}
            >
              WhatsApp <span style={{ textTransform: "none", letterSpacing: "0.05em" }}>(opcional)</span>
            </label>
            <input
              id="lead-whatsapp"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={form.whatsapp}
              onChange={handleChange("whatsapp")}
              maxLength={20}
              placeholder="+55 11 99999-9999"
              style={inputBase}
              onFocus={(e) => (e.currentTarget.style.borderColor = GOLD)}
              onBlur={(e) => (e.currentTarget.style.borderColor = BORDER)}
            />
            {errors.whatsapp && (
              <p className="font-inter mt-1.5" style={{ color: "#C97B5A", fontSize: "12px" }}>
                {errors.whatsapp}
              </p>
            )}
          </div>

          {/* CTA */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full font-inter font-semibold uppercase inline-flex items-center justify-center gap-3 transition-all duration-300 mt-2"
            style={{
              background: "linear-gradient(135deg, #C8B870 0%, #b88a3a 50%, #983D06 100%)",
              color: "#08090D",
              padding: "16px 24px",
              fontSize: "13px",
              letterSpacing: "0.2em",
              borderRadius: "2px",
              opacity: submitting ? 0.6 : 1,
              cursor: submitting ? "wait" : "pointer",
              boxShadow: "0 8px 32px rgba(200,184,112,0.18)",
            }}
          >
            {submitting ? "Revelando..." : "Revelar meu mapa"}
            {!submitting && <ArrowRight size={16} strokeWidth={2} />}
          </button>

          {/* Trust line */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <Lock size={11} style={{ color: DIM }} strokeWidth={1.5} />
            <span
              className="font-inter"
              style={{ color: DIM, fontSize: "11px", letterSpacing: "0.05em" }}
            >
              Seus dados são privados. Sem spam. LGPD.
            </span>
          </div>

          {/* Skip discreto */}
          <div className="text-center pt-3">
            <button
              type="button"
              onClick={handleSkip}
              className="font-inter underline-offset-4 hover:underline transition-opacity"
              style={{
                color: "rgba(207,197,184,0.35)",
                fontSize: "11px",
                letterSpacing: "0.04em",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Prefiro ver sem cadastrar
            </button>
          </div>
        </motion.form>
      </div>
    </main>
  );
};

export default LeadGate;
