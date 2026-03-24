import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import LandingSharedSections from "@/components/LandingSharedSections";

const BG_IMAGES = [
  "https://res.cloudinary.com/dnd2s2dv4/image/upload/f_auto,q_auto,w_1600/v1770421209/erlYw0HUWPflK_zMTmFiM_ijbdeo.avif",
  "https://res.cloudinary.com/dnd2s2dv4/image/upload/f_auto,q_auto,w_1600/v1770420982/AaBCh0x73PbOjcEnfQDXy_ila51x.avif",
];

function HeroBg() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % BG_IMAGES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${BG_IMAGES[index]}")`,
            backgroundSize: "cover",
            // Desktop: mulher à direita, texto à esquerda
            backgroundPosition: "65% center",
          }}
        />
      </AnimatePresence>

      {/* Overlay esquerda→direita: texto legível + imagem respira à direita */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(8,9,13,0.96) 0%, rgba(8,9,13,0.90) 30%, rgba(8,9,13,0.72) 48%, rgba(8,9,13,0.28) 65%, rgba(8,9,13,0.06) 80%, transparent 100%)",
        }}
      />
      {/* Vinheta inferior → transição suave para próxima seção */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, #08090D 0%, transparent 100%)" }}
      />
      {/* Vinheta superior */}
      <div
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(8,9,13,0.65) 0%, transparent 100%)" }}
      />
    </div>
  );
}

// Neuromarketing timing: imagem carrega primeiro (priming emocional),
// texto entra depois — cérebro límbico processa a imagem antes da razão ler
const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.55 + i * 0.13, duration: 0.65, ease: "easeOut" as const },
  }),
};

const LandingPage = () => {
  const nav = useNavigate();
  const goToQuiz = () => nav("/quiz-mapa-do-padrao?start=1");

  return (
    <div style={{ background: "#08090D", color: "#EDE6DB", minHeight: "100vh" }}>

      {/* Gold top rule */}
      <div
        className="fixed top-0 left-0 right-0 h-px z-50"
        style={{ background: "linear-gradient(90deg, transparent 5%, rgba(200,184,112,0.25) 30%, rgba(200,184,112,0.25) 70%, transparent 95%)" }}
      />

      {/* ═══════════════════════════════════════════
          SEÇÃO 1 — HERO
          Neuromarketing:
          · Imagem entra primeiro (priming emocional ~100ms)
          · Texto começa a 550ms (cérebro límbico já processou)
          · F-pattern: kicker → linha → headline → subhead → CTA (esquerda→baixo)
          · Mulher à direita respira sem overlay — neurônios-espelho ativam
          · Crossfade 2.2s entre imagens — movimento periférico inconsciente
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Imagens em crossfade no fundo */}
        <HeroBg />

        {/* Conteúdo — coluna esquerda (F-pattern) */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-16">
          <div style={{ maxWidth: "500px" }}>

            {/* Kicker */}
            <motion.p
              initial="hidden" animate="visible" custom={0} variants={fade}
              className="font-inter uppercase mb-4"
              style={{ fontSize: "10px", letterSpacing: "0.45em", color: "rgba(200,184,112,0.75)" }}
            >
              Portal Reset · Diagnóstico Gratuito
            </motion.p>

            {/* Gold line */}
            <motion.div
              className="h-px mb-5 w-10"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ background: "#C8B870", transformOrigin: "left" }}
            />

            {/* H1 — fonte reduzida, cabe na primeira dobra */}
            <motion.h1
              initial="hidden" animate="visible" custom={1} variants={fade}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(26px, 3.8vw, 50px)",
                lineHeight: 1.08,
                letterSpacing: "0.01em",
                textTransform: "uppercase",
                color: "#EDE6DB",
              }}
            >
              Você não fracassa por falta<br />
              <span style={{ color: "#C8B870" }}>de esforço. Fracassa porque ninguém mostrou onde seu automático ganha.</span>
            </motion.h1>

            {/* Subhead — dor nomeada */}
            <motion.p
              initial="hidden" animate="visible" custom={2} variants={fade}
              className="mt-5 font-inter leading-[1.85]"
              style={{ fontSize: "clamp(13px, 1.4vw, 16px)", color: "rgba(207,197,184,0.78)" }}
            >
              Não é falta de força. Não é falta de informação.<br />
              É que ninguém ainda mostrou <em>onde exatamente</em> o seu automático está ganhando da sua escolha.
            </motion.p>

            {/* CTA — logo após a dor (pico emocional) */}
            <motion.div
              initial="hidden" animate="visible" custom={3} variants={fade}
              className="mt-7 flex items-center gap-4 flex-wrap"
            >
              <button
                onClick={goToQuiz}
                className="relative font-inter font-semibold uppercase tracking-[0.18em] transition-all duration-300 flex items-center gap-3"
                style={{
                  background: "linear-gradient(135deg, #C8B870 0%, #b88a3a 50%, #983D06 100%)",
                  color: "#08090D",
                  borderRadius: "8px",
                  border: "1px solid rgba(200,184,112,0.45)",
                  boxShadow: "0 4px 24px -4px rgba(152,61,6,0.4)",
                  height: "52px",
                  paddingLeft: "26px",
                  paddingRight: "26px",
                  fontSize: "12px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 28px -4px rgba(152,61,6,0.45), 0 0 32px -6px rgba(200,184,112,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 24px -4px rgba(152,61,6,0.4)";
                }}
              >
                Ver meu mapa grátis
                <ArrowRight size={14} />
              </button>
            </motion.div>

            {/* Texto descritivo — confirmação racional pós-CTA */}
            <motion.p
              initial="hidden" animate="visible" custom={4} variants={fade}
              className="mt-5 font-inter leading-[1.8]"
              style={{ fontSize: "clamp(12px, 1.2vw, 14px)", color: "rgba(207,197,184,0.45)" }}
            >
              12 perguntas rápidas revelam seu arquétipo. Depois, 4 mentoras IA exploram profundidade 24/7.
            </motion.p>

            {/* Microcopy */}
            <motion.p
              initial="hidden" animate="visible" custom={5} variants={fade}
              className="mt-2 font-inter"
              style={{ fontSize: "11px", color: "rgba(200,184,112,0.4)", letterSpacing: "0.04em" }}
            >
              3 minutos · Gratuito · 4 mentoras
            </motion.p>

          </div>
        </div>
      </section>

      <LandingSharedSections onCTA={goToQuiz} />

    </div>
  );
};

export default LandingPage;
