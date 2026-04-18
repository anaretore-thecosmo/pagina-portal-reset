import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import LandingSharedSections from "@/components/LandingSharedSections";
import LanguageSelector from "@/components/LanguageSelector";
import MiniMandala from "@/components/MiniMandala";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { track } from "@/lib/analytics";
import { getOrAssignHeroVariant, type HeroVariant } from "@/lib/abTest";

/* ── A/B/C copy variants — only H1 + subhead change ─────────────
   A · Solução-aware  → leitora já sabe que tem padrão
   B · Sintoma-aware  → leitora reconhece o ciclo (controle atual)
   C · Resultado-aware → leitora quer o entregável final
─────────────────────────────────────────────────────────────── */
type HeroCopy = {
  headline: React.ReactNode;
  subhead: string;
};

const HERO_COPY: Record<HeroVariant, HeroCopy> = {
  A: {
    headline: (
      <>
        Você sabe que tem um padrão.{" "}
        <span style={{ color: "#C8B870", fontStyle: "italic", textTransform: "none" }}>
          Agora veja qual é.
        </span>
      </>
    ),
    subhead:
      "Em 3 minutos, o mapa de 6 eixos do que sustenta — e do que drena.",
  },
  B: {
    headline: (
      <>
        Você começa, para,<br />
        recomeça.{" "}
        <span style={{ color: "#C8B870", fontStyle: "italic", textTransform: "none" }}>
          E ainda não sabe por quê.
        </span>
      </>
    ),
    subhead:
      "Em 3 minutos, o nome do padrão que decide por você — em corpo, dinheiro e relações.",
  },
  C: {
    headline: (
      <>
        O nome do padrão{" "}
        <span style={{ color: "#C8B870", fontStyle: "italic", textTransform: "none" }}>
          que decide por você.
        </span>
      </>
    ),
    subhead:
      "Em 3 minutos, o mapa que separa o que é seu do que é repetição.",
  },
};

const BG_IMAGES = [
  "https://res.cloudinary.com/dnd2s2dv4/image/upload/f_auto,q_auto,w_1600/v1770421209/erlYw0HUWPflK_zMTmFiM_ijbdeo.avif",
  "https://res.cloudinary.com/dnd2s2dv4/image/upload/f_auto,q_auto,w_1600/v1770420982/AaBCh0x73PbOjcEnfQDXy_ila51x.avif",
];

const GOLD = "#C8B870";
const DIM = "rgba(207,197,184,0.38)";

/* ── Hero background — crossfade editorial 60/40 ───────────────── */
function HeroBg() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % BG_IMAGES.length), 7000);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 2.4, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${BG_IMAGES[index]}")`,
            backgroundSize: "cover",
            backgroundPosition: "35% center",
            transform: "scaleX(-1)",
          }}
        />
      </AnimatePresence>

      {/*
        Gradient editorial 60/40 (Peirce: o signo precisa ser lido).
        Lado esquerdo (60%) consumido pela copy → escuro denso.
        Lado direito (40%) preserva o rosto da mulher → sombra mínima.
      */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(95deg, rgba(8,9,13,0.97) 0%, rgba(8,9,13,0.93) 35%, rgba(8,9,13,0.62) 55%, rgba(8,9,13,0.18) 72%, rgba(8,9,13,0.04) 100%)",
        }}
      />
      {/* Vinheta inferior + topo */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, #08090D 0%, transparent 100%)" }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(8,9,13,0.55) 0%, transparent 100%)" }}
      />
    </div>
  );
}

const fade = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.45 + i * 0.14, duration: 0.65, ease: "easeOut" as const },
  }),
};

const LandingPage = () => {
  const nav = useNavigate();
  const reduced = useReducedMotion();
  const [heroVariant, setHeroVariant] = useState<HeroVariant>("B");

  // Assign A/B/C variant on mount and fire landing_view with it
  useEffect(() => {
    const v = getOrAssignHeroVariant();
    setHeroVariant(v);
    track("landing_view", { hero_variant: v });
  }, []);

  const goToQuiz = (origin: "hero" | "midpage") => {
    track(origin === "hero" ? "cta_click_hero" : "cta_click_midpage", {
      hero_variant: heroVariant,
    });
    nav("/quiz-mapa-do-padrao?start=1");
  };

  const copy = HERO_COPY[heroVariant];

  return (
    <div style={{ background: "#08090D", color: "#EDE6DB", minHeight: "100vh" }}>
      {/* Gold top rule */}
      <div
        className="fixed top-0 left-0 right-0 h-px z-50 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, rgba(200,184,112,0.25) 30%, rgba(200,184,112,0.25) 70%, transparent 95%)",
        }}
      />

      {/* Language selector — top right */}
      <div className="fixed top-3 right-4 z-50">
        <LanguageSelector />
      </div>

      {/* ═══════════════════════ HERO CIRÚRGICO ═══════════════════════
          5 elementos · 1 promessa · 1 botão · 1 prova
          (Jobs · Ogilvy · Schwartz · Bridger · Peirce)
      ────────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        aria-label="Diagnóstico Mapa do Padrão — Portal Reset"
      >
        <HeroBg />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-20 flex justify-end">
          <div style={{ maxWidth: "520px" }}>
            {/* 1 · KICKER + mini-mandala viva (gesto memorável — Veiga) */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fade}
              className="flex items-center gap-4 mb-6"
            >
              <MiniMandala size={40} />
              <div>
                <p
                  className="font-inter uppercase"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.5em",
                    color: "rgba(200,184,112,0.65)",
                    marginBottom: "4px",
                  }}
                >
                  Portal Reset · Diagnóstico Gratuito
                </p>
                <motion.div
                  className="h-px"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.55 }}
                  style={{ background: GOLD, transformOrigin: "left", width: "44px" }}
                />
              </div>
            </motion.div>

            {/* 2 · H1 — uma frase, fluência cognitiva alta (Bridger + Ogilvy)
                 Versão sintoma-aware (Schwartz nível 2-3): nomeia o sintoma
                 que a leitora reconhece antes de oferecer diagnóstico. */}
            <motion.h1
              key={`h1-${heroVariant}`}
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fade}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(28px, 4.2vw, 46px)",
                lineHeight: 1.08,
                letterSpacing: "0.015em",
                textTransform: "uppercase",
                color: "#EDE6DB",
              }}
              data-ab-variant={heroVariant}
            >
              {copy.headline}
            </motion.h1>

            {/* 3 · SUBHEAD — uma frase, promessa específica e mensurável */}
            <motion.p
              key={`sub-${heroVariant}`}
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fade}
              className="mt-5 font-inter leading-[1.7]"
              style={{
                fontSize: "clamp(14px, 1.2vw, 16px)",
                color: "rgba(207,197,184,0.78)",
                maxWidth: "440px",
              }}
            >
              {copy.subhead}
            </motion.p>

            {/* 4 · CTA — gradiente oficial */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fade}
              className="mt-9"
            >
              <button
                onClick={() => goToQuiz("hero")}
                aria-label="Iniciar diagnóstico Mapa do Padrão — leva 3 minutos, gratuito"
                className="relative font-inter font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto"
                style={{
                  background:
                    "linear-gradient(135deg, #C8B870 0%, #b88a3a 50%, #983D06 100%)",
                  color: "#08090D",
                  borderRadius: "8px",
                  border: "1px solid rgba(200,184,112,0.45)",
                  boxShadow: "0 4px 28px -4px rgba(152,61,6,0.45)",
                  height: "58px",
                  paddingLeft: "34px",
                  paddingRight: "34px",
                  fontSize: "12px",
                }}
                onMouseEnter={(e) => {
                  if (reduced) return;
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 36px -4px rgba(152,61,6,0.5), 0 0 40px -8px rgba(200,184,112,0.25)";
                }}
                onMouseLeave={(e) => {
                  if (reduced) return;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 28px -4px rgba(152,61,6,0.45)";
                }}
              >
                Mapear meu padrão
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </motion.div>

            {/* 5 · TRUST LINE — uma linha, sem ruído */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={4}
              variants={fade}
              className="mt-5 flex items-center gap-4 flex-wrap"
            >
              <p
                className="font-inter"
                style={{
                  fontSize: "10.5px",
                  color: "rgba(200,184,112,0.45)",
                  letterSpacing: "0.06em",
                }}
              >
                3 min · Gratuito · Sem cadastro para começar
              </p>
              <div className="flex items-center gap-1.5">
                <Shield
                  size={10}
                  color={GOLD}
                  style={{ opacity: 0.32 }}
                  aria-hidden="true"
                />
                <p
                  className="font-inter"
                  style={{ fontSize: "10px", color: DIM }}
                >
                  Dados privados · LGPD
                </p>
              </div>
            </motion.div>

            {/* Cliff effect — discreto, força scroll */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 2.2, duration: 0.8, ease: "easeOut" }}
              className="mt-14 flex flex-col items-end gap-2"
              aria-hidden="true"
            >
              <span
                className="font-inter uppercase"
                style={{
                  fontSize: "8px",
                  letterSpacing: "0.45em",
                  color: "rgba(200,184,112,0.25)",
                }}
              >
                Continue
              </span>
              <motion.div
                animate={reduced ? undefined : { y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              >
                <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
                  <line
                    x1="7"
                    y1="0"
                    x2="7"
                    y2="13"
                    stroke="rgba(200,184,112,0.25)"
                    strokeWidth="1"
                  />
                  <polyline
                    points="3,10 7,15 11,10"
                    fill="none"
                    stroke="rgba(200,184,112,0.25)"
                    strokeWidth="1"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Fallback acessível para crawlers sem JS / leitores de tela */}
        <noscript>
          <div className="sr-only">
            <h1>Portal Reset — Diagnóstico Mapa do Padrão</h1>
            <p>
              Você começa, para, recomeça. Em 3 minutos, descubra o nome do
              padrão que decide por você em corpo, dinheiro e relações.
            </p>
            <a href="/quiz-mapa-do-padrao?start=1">Iniciar diagnóstico</a>
          </div>
        </noscript>
      </section>

      {/* ═══════════════ MIDPAGE — BLOCO AUTORAL (substitui CTA genérico)
          Prova social autoral: Ana + The Cosmo. Espaço de ouro usado para
          autoridade narrativa antes de jogar a leitora nas seções longas.
      ═════════════════════════════════════════════════════════════════ */}
      <section
        className="px-6 md:px-12 lg:px-20 py-20 md:py-24"
        style={{ background: "#08090D", borderTop: "1px solid rgba(200,184,112,0.06)" }}
        aria-label="Sobre Ana Retore e The Cosmo"
      >
        <div className="max-w-[680px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p
              className="font-inter uppercase mb-4"
              style={{
                fontSize: "9px",
                letterSpacing: "0.5em",
                color: "rgba(200,184,112,0.55)",
              }}
            >
              Quem desenhou este mapa
            </p>
            <div
              className="w-8 h-px mx-auto mb-7"
              style={{ background: "rgba(200,184,112,0.25)" }}
            />

            <p
              className="font-playfair italic mb-6"
              style={{
                fontSize: "clamp(18px, 2.1vw, 23px)",
                color: "rgba(237,230,219,0.82)",
                lineHeight: 1.5,
              }}
            >
              "Não construí este diagnóstico para descrever você.
              <br />
              Construí para você se reconhecer."
            </p>

            <p
              className="font-inter"
              style={{
                fontSize: "12px",
                color: "rgba(200,184,112,0.7)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "32px",
              }}
            >
              Ana Retore · The Cosmo
            </p>

            <button
              onClick={() => goToQuiz("midpage")}
              aria-label="Iniciar diagnóstico Mapa do Padrão"
              className="font-inter font-semibold uppercase tracking-[0.18em] transition-all duration-300 inline-flex items-center gap-3"
              style={{
                background: "transparent",
                color: GOLD,
                borderRadius: "8px",
                border: "1px solid rgba(200,184,112,0.3)",
                height: "46px",
                paddingLeft: "26px",
                paddingRight: "26px",
                fontSize: "11px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                if (reduced) return;
                e.currentTarget.style.background = "rgba(200,184,112,0.06)";
                e.currentTarget.style.borderColor = "rgba(200,184,112,0.45)";
              }}
              onMouseLeave={(e) => {
                if (reduced) return;
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(200,184,112,0.3)";
              }}
            >
              Fazer meu diagnóstico
              <ArrowRight size={13} aria-hidden="true" />
            </button>
          </motion.div>
        </div>
      </section>

      <LandingSharedSections onCTA={() => goToQuiz("midpage")} />
    </div>
  );
};

export default LandingPage;
