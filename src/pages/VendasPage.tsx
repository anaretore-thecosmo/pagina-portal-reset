import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, RotateCcw, Zap, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PortalResetPayload } from "@/data/espelhoEngine";

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55 },
  }),
};

const stepIcons = [Zap, RotateCcw, Sparkles, ArrowRight, RotateCcw];

const VendasPage = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState<PortalResetPayload | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("portal_reset_payload");
      if (raw) {
        setPayload(JSON.parse(raw));
      } else {
        navigate("/");
      }
    } catch {
      navigate("/");
    }
  }, [navigate]);

  if (!payload) return null;

  const { sales_page: sp, diagnostic: diag } = payload;

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[720px] mx-auto px-6 py-16">

        {/* ===== HERO ===== */}
        <motion.div initial="hidden" animate="visible" custom={0} variants={fade}>
          <p className="kicker mb-4">Seu resultado</p>
          <h1
            className="font-playfair font-bold uppercase"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1, letterSpacing: "0.08em" }}
          >
            {sp.hero_headline}
          </h1>
          <p
            className="mt-3 text-[15px] leading-relaxed"
            style={{ color: "hsl(var(--graphite) / 0.78)" }}
          >
            {sp.hero_subheadline}
          </p>
        </motion.div>

        {/* ===== O QUE ISSO SIGNIFICA ===== */}
        <motion.div initial="hidden" animate="visible" custom={1} variants={fade} className="mt-12">
          <p className="kicker mb-3">O que isso significa</p>
          <p
            className="text-[15px] leading-relaxed"
            style={{ color: "hsl(var(--graphite) / 0.78)" }}
          >
            {sp.bloco_significado}
          </p>
        </motion.div>

        {/* ===== CAMINHO RECOMENDADO ===== */}
        <motion.div initial="hidden" animate="visible" custom={2} variants={fade} className="mt-12">
          <p className="kicker mb-3">Caminho recomendado</p>
          <div
            className="p-5 rounded-2xl"
            style={{
              border: "1px solid hsl(var(--matte-gold) / 0.25)",
              background: "hsl(var(--matte-gold) / 0.04)",
            }}
          >
            <p
              className="font-playfair font-semibold text-lg"
              style={{ color: "hsl(var(--foreground))" }}
            >
              {sp.bloco_caminho_recomendado}
            </p>
            <p
              className="text-sm mt-3"
              style={{ color: "hsl(var(--graphite) / 0.6)" }}
            >
              Comece por: <strong>{diag.codigo_recomendado}</strong>
            </p>
          </div>
        </motion.div>

        <div className="editorial-divider mt-14 mb-14" />

        {/* ===== COMO FUNCIONA ===== */}
        <motion.div initial="hidden" animate="visible" custom={3} variants={fade}>
          <p className="kicker mb-6">Como funciona o Portal Reset</p>
          <div className="space-y-4">
            {sp.como_funciona_steps.map((step, i) => {
              const Icon = stepIcons[i] ?? Zap;
              return (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "hsl(var(--matte-gold) / 0.1)" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "hsl(var(--matte-gold))" }} />
                  </div>
                  <span className="text-sm" style={{ color: "hsl(var(--graphite) / 0.75)" }}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ===== O QUE VOCÊ RECEBE ===== */}
        <motion.div initial="hidden" animate="visible" custom={4} variants={fade} className="mt-12">
          <p className="kicker mb-4">O que você recebe</p>
          <div className="space-y-3">
            {sp.o_que_recebe_bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "hsl(var(--matte-gold))" }}
                />
                <span className="text-sm" style={{ color: "hsl(var(--graphite) / 0.75)" }}>
                  {b}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ===== CLÉO ===== */}
        <motion.div initial="hidden" animate="visible" custom={5} variants={fade} className="mt-12">
          <div
            className="p-5 rounded-2xl flex gap-4 items-start"
            style={{
              border: "1px solid hsl(var(--graphite) / 0.1)",
              background: "hsl(var(--graphite) / 0.03)",
            }}
          >
            <Gift className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "hsl(var(--matte-gold))" }} />
            <div>
              <p className="font-playfair font-semibold text-sm" style={{ color: "hsl(var(--foreground))" }}>
                {sp.cleo_bloco.split(". ")[0]}.
              </p>
              <p className="text-xs mt-1" style={{ color: "hsl(var(--graphite) / 0.55)" }}>
                {sp.cleo_bloco.split(". ").slice(1).join(". ")}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="editorial-divider mt-14 mb-14" />

        {/* ===== OFERTA ===== */}
        <motion.div initial="hidden" animate="visible" custom={6} variants={fade} className="text-center">
          <p className="kicker mb-4">Oferta Fundadoras</p>
          <p
            className="font-playfair font-bold"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "hsl(var(--foreground))" }}
          >
            R$47<span className="text-lg font-normal">/mês</span>
          </p>
          <p className="text-xs mt-1" style={{ color: "hsl(var(--graphite) / 0.5)" }}>
            {sp.oferta_subheadline}
          </p>

          <div className="mt-8">
            <Button variant="cta" size="xl" className="gap-2">
              {sp.cta_text}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <p className="text-xs mt-3" style={{ color: "hsl(var(--graphite) / 0.45)" }}>
              {sp.cta_microcopy}
            </p>
          </div>
        </motion.div>

        {/* Author credit */}
        <div className="mt-16 pt-4" style={{ borderTop: "1px solid hsl(var(--matte-gold) / 0.15)" }}>
          <p className="font-inter text-[11px] md:text-[12px] text-left" style={{ color: "hsl(var(--graphite) / 0.65)" }}>
            © Ana Retore. Todos os direitos de design e copy reservados.
          </p>
        </div>

        <div className="h-20" />
      </div>
    </main>
  );
};

export default VendasPage;
