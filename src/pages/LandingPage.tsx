import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import LandingSharedSections from "@/components/LandingSharedSections";
import LanguageSelector from "@/components/LanguageSelector";

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
            backgroundPosition: "65% center",
          }}
        />
      </AnimatePresence>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(8,9,13,0.96) 0%, rgba(8,9,13,0.90) 30%, rgba(8,9,13,0.72) 48%, rgba(8,9,13,0.28) 65%, rgba(8,9,13,0.06) 80%, transparent 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, #08090D 0%, transparent 100%)" }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(8,9,13,0.65) 0%, transparent 100%)" }}
      />
    </div>
  );
}

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.55 + i * 0.13, duration: 0.65, ease: "easeOut" as const },
  }),
};

const GOLD = "#C8B870";
const DIM = "rgba(207,197,184,0.38)";

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

      {/* Language selector — top right */}
      <div className="fixed top-3 right-4 z-50">
        <LanguageSelector />
      </div>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroBg />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div style={{ maxWidth: "480px" }}>

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
              style={{ background: GOLD, transformOrigin: "left", width: "48px" }}
            />

            {/* H1 */}
            <motion.h1
              initial="hidden" animate="visible" custom={1} variants={fade}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(22px, 3.2vw, 36px)",
                lineHeight: 1.18,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                color: "#EDE6DB",
              }}
            >
              Você não fracassa por falta de potência.<br />
              <span style={{ color: GOLD }}>Fracassa porque ainda não percebeu onde o seu automático decide por você.</span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial="hidden" animate="visible" custom={2} variants={fade}
              className="mt-6 font-inter leading-[1.85]"
              style={{ fontSize: "clamp(13px, 1.15vw, 15px)", color: "rgba(207,197,184,0.75)" }}
            >
              Não é falta de disciplina. Não é falta de método.<br />
              É um padrão que ninguém ainda mapeou para você —<br />
              e que opera em corpo, dinheiro e relações ao mesmo tempo.
            </motion.p>

            {/* Card: O que você recebe */}
            <motion.div
              initial="hidden" animate="visible" custom={3} variants={fade}
              className="mt-8 p-5 rounded-xl"
              style={{
                background: "rgba(200,184,112,0.04)",
                border: "1px solid rgba(200,184,112,0.12)",
                backdropFilter: "blur(8px)",
              }}
            >
              <p className="font-inter uppercase mb-3" style={{ fontSize: "8px", letterSpacing: "0.4em", color: "rgba(200,184,112,0.55)" }}>
                Ao final, você recebe
              </p>
              {[
                { num: "01", text: "Mandala dos 6 eixos — onde sustenta e onde vaza" },
                { num: "02", text: "Seu arquétipo com leitura editorial personalizada" },
                { num: "03", text: "Plano de sustentação de 7 dias" },
              ].map((item) => (
                <div key={item.num} className="flex gap-3 items-start py-1.5">
                  <span className="font-playfair font-bold shrink-0" style={{ fontSize: "11px", color: GOLD, opacity: 0.6 }}>
                    {item.num}
                  </span>
                  <p className="font-inter" style={{ fontSize: "12px", color: "rgba(207,197,184,0.6)", lineHeight: 1.5 }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA principal */}
            <motion.div
              initial="hidden" animate="visible" custom={4} variants={fade}
              className="mt-8"
            >
              <button
                onClick={goToQuiz}
                className="relative font-inter font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto"
                style={{
                  background: "linear-gradient(135deg, #C8B870 0%, #D4A017 35%, #F5A623 60%, #2E8B57 100%)",
                  color: "#08090D",
                  borderRadius: "8px",
                  border: "1px solid rgba(200,184,112,0.45)",
                  boxShadow: "0 4px 28px -4px rgba(46,139,87,0.45)",
                  height: "56px",
                  paddingLeft: "32px",
                  paddingRight: "32px",
                  fontSize: "12px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 36px -4px rgba(46,139,87,0.5), 0 0 40px -8px rgba(200,184,112,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 28px -4px rgba(46,139,87,0.45)";
                }}
              >
                MAPEAR MEU PADRÃO AGORA
                <ArrowRight size={14} />
              </button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial="hidden" animate="visible" custom={5} variants={fade}
              className="mt-4 flex items-center gap-4 flex-wrap"
            >
              <p className="font-inter" style={{ fontSize: "10.5px", color: "rgba(200,184,112,0.4)", letterSpacing: "0.06em" }}>
                3 min · Gratuito · Sem cadastro
              </p>
              <div className="flex items-center gap-1.5">
                <Shield size={10} color={GOLD} style={{ opacity: 0.3 }} />
                <p className="font-inter" style={{ fontSize: "10px", color: DIM }}>
                  Dados privados
                </p>
              </div>
            </motion.div>

            {/* Cliff effect */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.8, ease: "easeOut" }}
              className="mt-14 flex flex-col items-start gap-2"
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

      {/* ═══════════ MIDPAGE CTA — Ponte narrativa antes das seções ═══════════ */}
      <section
        className="px-6 md:px-12 lg:px-20 py-16 md:py-20 text-center"
        style={{ background: "#08090D", borderTop: "1px solid rgba(200,184,112,0.06)" }}
      >
        <div className="max-w-[560px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="font-playfair italic mb-4"
              style={{ fontSize: "clamp(18px, 2.2vw, 24px)", color: "rgba(237,230,219,0.65)", lineHeight: 1.45 }}
            >
              "Não é mais informação que resolve.<br />
              É ver onde o automático ainda decide por você."
            </p>
            <div className="w-8 h-px mx-auto mb-6" style={{ background: "rgba(200,184,112,0.2)" }} />
            <button
              onClick={goToQuiz}
              className="font-inter font-semibold uppercase tracking-[0.18em] transition-all duration-300 inline-flex items-center gap-3"
              style={{
                background: "transparent",
                color: GOLD,
                borderRadius: "8px",
                border: "1px solid rgba(200,184,112,0.25)",
                height: "44px",
                paddingLeft: "24px",
                paddingRight: "24px",
                fontSize: "11px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(200,184,112,0.06)";
                e.currentTarget.style.borderColor = "rgba(200,184,112,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(200,184,112,0.25)";
              }}
            >
              Fazer meu diagnóstico
              <ArrowRight size={13} />
            </button>
          </motion.div>
        </div>
      </section>

      <LandingSharedSections onCTA={goToQuiz} />

    </div>
  );
};

export default LandingPage;
