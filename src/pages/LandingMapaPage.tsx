import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import LandingSharedSections from "@/components/LandingSharedSections";

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.12, duration: 0.65, ease: "easeOut" as const },
  }),
};

/* ── SVG mandala decorativa (6 eixos, estática) ─── */
const MandalaSVG = () => (
  <svg
    viewBox="0 0 260 260"
    width="260"
    height="260"
    aria-hidden="true"
    style={{ display: "block" }}
  >
    <defs>
      <radialGradient id="mg-fill" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="rgba(200,184,112,0.18)" />
        <stop offset="100%" stopColor="rgba(200,184,112,0.00)" />
      </radialGradient>
      <filter id="mg-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Anéis de fundo */}
    {[0.25, 0.5, 0.75, 1].map((r, i) => (
      <polygon
        key={i}
        points={Array.from({ length: 6 }, (_, k) => {
          const a = (k * Math.PI) / 3 - Math.PI / 2;
          const radius = 110 * r;
          return `${130 + radius * Math.cos(a)},${130 + radius * Math.sin(a)}`;
        }).join(" ")}
        fill="none"
        stroke={i === 3 ? "rgba(200,184,112,0.22)" : "rgba(200,184,112,0.07)"}
        strokeWidth={i === 3 ? 1 : 0.6}
        strokeDasharray={i === 3 ? undefined : "3,5"}
      />
    ))}

    {/* Eixos */}
    {Array.from({ length: 6 }, (_, k) => {
      const a = (k * Math.PI) / 3 - Math.PI / 2;
      return (
        <line
          key={k}
          x1={130} y1={130}
          x2={130 + 110 * Math.cos(a)}
          y2={130 + 110 * Math.sin(a)}
          stroke="rgba(200,184,112,0.07)"
          strokeWidth={0.6}
        />
      );
    })}

    {/* Área de dados — forma hexagonal em ~70% */}
    <polygon
      points={Array.from({ length: 6 }, (_, k) => {
        const vals = [0.82, 0.58, 0.71, 0.44, 0.67, 0.76];
        const a = (k * Math.PI) / 3 - Math.PI / 2;
        const r = 110 * vals[k];
        return `${130 + r * Math.cos(a)},${130 + r * Math.sin(a)}`;
      }).join(" ")}
      fill="url(#mg-fill)"
    />
    <polygon
      points={Array.from({ length: 6 }, (_, k) => {
        const vals = [0.82, 0.58, 0.71, 0.44, 0.67, 0.76];
        const a = (k * Math.PI) / 3 - Math.PI / 2;
        const r = 110 * vals[k];
        return `${130 + r * Math.cos(a)},${130 + r * Math.sin(a)}`;
      }).join(" ")}
      fill="none"
      stroke="#C8B870"
      strokeWidth={1.2}
      strokeOpacity={0.6}
      filter="url(#mg-glow)"
    />

    {/* Pontos nos vértices */}
    {Array.from({ length: 6 }, (_, k) => {
      const vals = [0.82, 0.58, 0.71, 0.44, 0.67, 0.76];
      const a = (k * Math.PI) / 3 - Math.PI / 2;
      const r = 110 * vals[k];
      return (
        <circle
          key={k}
          cx={130 + r * Math.cos(a)}
          cy={130 + r * Math.sin(a)}
          r={3}
          fill="#C8B870"
          opacity={0.7}
        />
      );
    })}

    {/* Centro */}
    <circle cx={130} cy={130} r={2.5} fill="rgba(200,184,112,0.4)" />
  </svg>
);

const LandingMapaPage = () => {
  const nav = useNavigate();
  const goToQuiz = () => nav("/quiz-mapa-do-padrao?start=1");

  return (
    <div style={{ background: "#08090D", color: "#EDE6DB", minHeight: "100vh" }}>

      {/* Gold top rule */}
      <div
        className="fixed top-0 left-0 right-0 h-px z-50"
        style={{ background: "linear-gradient(90deg, transparent 5%, rgba(200,184,112,0.25) 30%, rgba(200,184,112,0.25) 70%, transparent 95%)" }}
      />

      {/* ════════ HERO — tráfego morno ════════
          Sem foto de fundo. Foco total no mapa.
          Copy presume que a pessoa já conhece o trabalho
          e precisa de um convite direto para agir. */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Glow ambiente */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 70% 55%, rgba(200,184,112,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">

            {/* Coluna de texto */}
            <div>
              <motion.p
                initial="hidden" animate="visible" custom={0} variants={fade}
                className="font-inter uppercase mb-4"
                style={{ fontSize: "10px", letterSpacing: "0.45em", color: "rgba(200,184,112,0.75)" }}
              >
                Portal Reset · Mapa do Padrão
              </motion.p>

              <motion.div
                className="h-px mb-5 w-10"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                style={{ background: "#C8B870", transformOrigin: "left" }}
              />

              <motion.h1
                initial="hidden" animate="visible" custom={1} variants={fade}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "clamp(28px, 4vw, 52px)",
                  lineHeight: 1.08,
                  letterSpacing: "0.01em",
                  textTransform: "uppercase",
                  color: "#EDE6DB",
                }}
              >
                Seu mapa está<br />
                <span style={{ color: "#C8B870" }}>esperando por você.</span>
              </motion.h1>

              <motion.p
                initial="hidden" animate="visible" custom={2} variants={fade}
                className="mt-5 font-inter leading-[1.85]"
                style={{ fontSize: "clamp(14px, 1.4vw, 16px)", color: "rgba(207,197,184,0.75)" }}
              >
                Em 3 minutos você vê exatamente onde sustenta,
                onde vaza e qual padrão está operando agora.
                O diagnóstico é gratuito — o resultado é permanente.
              </motion.p>

              <motion.div
                initial="hidden" animate="visible" custom={3} variants={fade}
                className="mt-8 flex flex-col items-start gap-3"
              >
                <button
                  onClick={goToQuiz}
                  className="font-inter font-semibold uppercase tracking-[0.18em] transition-all duration-300 flex items-center gap-3"
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
                  Ver meu mapa agora
                  <ArrowRight size={14} />
                </button>

                <p
                  className="font-inter"
                  style={{ fontSize: "11px", color: "rgba(200,184,112,0.4)", letterSpacing: "0.04em" }}
                >
                  Gratuito · 3 minutos · Sem cadastro
                </p>
              </motion.div>
            </div>

            {/* Coluna da mandala */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-6"
            >
              <div
                className="relative flex items-center justify-center"
                style={{
                  width: "280px",
                  height: "280px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(200,184,112,0.06) 0%, transparent 70%)",
                  border: "1px solid rgba(200,184,112,0.08)",
                }}
              >
                <MandalaSVG />
              </div>

              <p
                className="font-playfair text-center"
                style={{ fontSize: "clamp(13px, 1.3vw, 15px)", color: "rgba(200,184,112,0.45)", fontStyle: "italic" }}
              >
                Sua mandala de 6 eixos — gerada em tempo real.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      <LandingSharedSections onCTA={goToQuiz} />

    </div>
  );
};

export default LandingMapaPage;
