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
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div style={{ maxWidth: "440px" }}>

            {/* Kicker */}
            <motion.p
              initial="hidden" animate="visible" custom={0} variants={fade}
              className="font-inter uppercase mb-4"
              style={{ fontSize: "9px", letterSpacing: "0.5em", color: "rgba(200,184,112,0.65)" }}
            >
              Portal Reset · Diagnóstico Gratuito
            </motion.p>

            {/* Gold line */}
            <motion.div
              className="h-px mb-7"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              style={{ background: "#C8B870", transformOrigin: "left", width: "48px" }}
            />

            {/* H1 — espelho primeiro, problema depois */}
            <motion.h1
              initial="hidden" animate="visible" custom={1} variants={fade}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(20px, 3vw, 34px)",
                lineHeight: 1.2,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                color: "#EDE6DB",
              }}
            >
              Você não fracassa por falta de potência.<br />
              <span style={{ color: "#C8B870" }}>Fracassa porque ainda não percebeu onde o seu automático decide por você.</span>
            </motion.h1>

            {/* Subhead — nomeia a dor com precisão, abre curiosidade */}
            <motion.p
              initial="hidden" animate="visible" custom={2} variants={fade}
              className="mt-6 font-inter leading-[1.85]"
              style={{ fontSize: "clamp(13px, 1.15vw, 15px)", color: "rgba(207,197,184,0.75)" }}
            >
              Não é falta de disciplina. Não é falta de método.<br />
              É um padrão que ninguém ainda mapeou para você —<br />
              e que opera em corpo, dinheiro e relações<br />
              ao mesmo tempo.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial="hidden" animate="visible" custom={3} variants={fade}
              className="mt-9 flex items-center gap-4 flex-wrap"
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
                  height: "48px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  fontSize: "11px",
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
                Mapear meu padrão
                <ArrowRight size={13} />
              </button>
            </motion.div>

            {/* Microcopy — sem garantia fora de contexto */}
            <motion.p
              initial="hidden" animate="visible" custom={4} variants={fade}
              className="mt-3 font-inter"
              style={{ fontSize: "11px", color: "rgba(200,184,112,0.45)", letterSpacing: "0.04em" }}
            >
              3 minutos · Gratuito · Sem cadastro
            </motion.p>

            {/* Descritivo — legível, cria curiosidade */}
            <motion.p
              initial="hidden" animate="visible" custom={5} variants={fade}
              className="mt-7 font-inter leading-[1.8]"
              style={{ fontSize: "clamp(11px, 1vw, 13px)", color: "rgba(207,197,184,0.55)" }}
            >
              12 perguntas. Depois, 4 perspectivas distintas —<br />
              cada uma aprofunda o que as outras não alcançam.
            </motion.p>

            {/* Cliff effect — scroll indicator */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.8, ease: "easeOut" }}
              className="mt-12 flex flex-col items-start gap-2"
            >
              <span
                className="font-inter uppercase"
                style={{ fontSize: "8px", letterSpacing: "0.45em", color: "rgba(200,184,112,0.3)" }}
              >
                Continue
              </span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              >
                <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
                  <line x1="7" y1="0" x2="7" y2="13" stroke="rgba(200,184,112,0.3)" strokeWidth="1"/>
                  <polyline points="3,10 7,15 11,10" fill="none" stroke="rgba(200,184,112,0.3)" strokeWidth="1"/>
                </svg>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      <LandingSharedSections onCTA={goToQuiz} />

    </div>
  );
};

export default LandingPage;
