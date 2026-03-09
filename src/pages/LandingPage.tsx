import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

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
    transition: { delay: 0.55 + i * 0.13, duration: 0.65, ease: "easeOut" },
  }),
};

const inView = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const DORES = [
  {
    frase: "Você começa, para, recomeça — e ainda não sabe exatamente por quê.",
    for: "Buscadora",
  },
  {
    frase: "Você funciona, entrega, resolve — mas o custo interno está alto demais.",
    for: "Estrategista",
  },
  {
    frase: "Você sente que tem mais, mas algo sempre trava antes de virar ação.",
    for: "Curiosa",
  },
  {
    frase: "Você já tem clareza. O que falta é sustentar sem abrir mão de si.",
    for: "Soberana",
  },
];

const ENTREGAS = [
  { num: "01", texto: "Seu arquétipo de padrão — Curiosa, Buscadora, Estrategista ou Soberana" },
  { num: "02", texto: "Sua mandala de 6 eixos — onde você sustenta e onde vaza energia" },
  { num: "03", texto: "Um plano de 7 dias com ações específicas para onde você está agora" },
  { num: "04", texto: "A prescrição exata do próximo ciclo do seu padrão" },
];

const LandingPage = () => {
  const nav = useNavigate();
  const goToQuiz = () => nav("/quiz-mapa-do-padrao");

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
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-28">
          <div style={{ maxWidth: "520px" }}>

            {/* Kicker */}
            <motion.p
              initial="hidden" animate="visible" custom={0} variants={fade}
              className="font-inter uppercase mb-5"
              style={{ fontSize: "10px", letterSpacing: "0.45em", color: "rgba(200,184,112,0.75)" }}
            >
              Portal Reset · Diagnóstico Gratuito
            </motion.p>

            {/* Gold line — ancora atenção no eixo X antes da headline */}
            <motion.div
              className="h-px mb-7 w-10"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ background: "#C8B870", transformOrigin: "left" }}
            />

            {/* H1 — tamanho máximo que cabe no grid de 520px sem quebrar para o lado da imagem */}
            <motion.h1
              initial="hidden" animate="visible" custom={1} variants={fade}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(34px, 5vw, 64px)",
                lineHeight: 1.05,
                letterSpacing: "0.01em",
                textTransform: "uppercase",
                color: "#EDE6DB",
              }}
            >
              Por que você<br />sabe o que fazer<br />
              <span style={{ color: "#C8B870" }}>e ainda assim<br />não faz?</span>
            </motion.h1>

            {/* Subhead 1 */}
            <motion.p
              initial="hidden" animate="visible" custom={2} variants={fade}
              className="mt-7 font-inter leading-[1.85]"
              style={{ fontSize: "clamp(14px, 1.5vw, 17px)", color: "rgba(207,197,184,0.78)" }}
            >
              Não é falta de força. Não é falta de informação.<br />
              É que ninguém ainda mostrou <em>onde exatamente</em> o seu automático está ganhando da sua escolha.
            </motion.p>

            {/* Subhead 2 */}
            <motion.p
              initial="hidden" animate="visible" custom={3} variants={fade}
              className="mt-3 font-inter leading-[1.85]"
              style={{ fontSize: "clamp(13px, 1.3vw, 15px)", color: "rgba(207,197,184,0.50)" }}
            >
              Este diagnóstico mapeia os 6 eixos do seu padrão interno e revela o arquétipo que define onde você está operando agora.
            </motion.p>

            {/* CTA — âncora final do F-pattern */}
            <motion.div
              initial="hidden" animate="visible" custom={4} variants={fade}
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
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
                  height: "56px",
                  paddingLeft: "28px",
                  paddingRight: "28px",
                  fontSize: "13px",
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
                Descobrir meu arquétipo
                <ArrowRight size={15} />
              </button>

              <p className="font-inter" style={{ fontSize: "12px", color: "rgba(200,184,112,0.5)", letterSpacing: "0.04em" }}>
                3 minutos · Gratuito · Resultado imediato
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SEÇÃO 2 — IDENTIFICAÇÃO (dores)
      ═══════════════════════════════════════════ */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="max-w-[820px] mx-auto">

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={inView}
          >
            <p className="font-inter uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.4em", color: "rgba(200,184,112,0.6)" }}>
              Você se reconhece aqui?
            </p>
            <div
              className="w-8 h-px mb-10"
              style={{ background: "rgba(200,184,112,0.35)" }}
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DORES.map((d, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                variants={fade}
                className="p-6 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(200,184,112,0.1)",
                }}
              >
                <p
                  className="font-playfair font-medium leading-relaxed"
                  style={{ fontSize: "clamp(15px, 1.5vw, 17px)", color: "rgba(237,230,219,0.85)", fontStyle: "italic" }}
                >
                  "{d.frase}"
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={inView}
            className="mt-10 font-inter leading-[1.8]"
            style={{ fontSize: "clamp(14px, 1.4vw, 16px)", color: "rgba(207,197,184,0.6)" }}
          >
            Se alguma dessas frases parou você — o padrão tem nome. E tem solução.
          </motion.p>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SEÇÃO 3 — O QUE VOCÊ VAI DESCOBRIR
      ═══════════════════════════════════════════ */}
      <section
        className="px-6 md:px-12 lg:px-20 py-20 md:py-28"
        style={{ borderTop: "1px solid rgba(200,184,112,0.08)" }}
      >
        <div className="max-w-[820px] mx-auto">

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={inView}
            className="mb-12"
          >
            <p className="font-inter uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.4em", color: "rgba(200,184,112,0.6)" }}>
              Em 3 minutos, você descobre
            </p>
            <h2
              className="font-playfair font-bold"
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                lineHeight: 1.1,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "#EDE6DB",
              }}
            >
              Seu mapa.<br />Seu padrão.<br />
              <span style={{ color: "#C8B870" }}>Sua direção.</span>
            </h2>
          </motion.div>

          <div className="space-y-5">
            {ENTREGAS.map((e, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
                variants={fade}
                className="flex gap-5 items-start py-5"
                style={{ borderBottom: "1px solid rgba(200,184,112,0.07)" }}
              >
                <span
                  className="font-playfair font-bold shrink-0"
                  style={{ fontSize: "22px", color: "#C8B870", lineHeight: 1, marginTop: "2px" }}
                >
                  {e.num}
                </span>
                <p
                  className="font-inter leading-relaxed"
                  style={{ fontSize: "clamp(14px, 1.4vw, 16px)", color: "rgba(207,197,184,0.8)" }}
                >
                  {e.texto}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SEÇÃO 4 — CTA FINAL
      ═══════════════════════════════════════════ */}
      <section
        className="px-6 md:px-12 lg:px-20 py-24 md:py-32 text-center"
        style={{ borderTop: "1px solid rgba(200,184,112,0.08)" }}
      >
        <div className="max-w-[580px] mx-auto">

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            variants={inView}
          >
            <p
              className="font-playfair font-bold mb-4"
              style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
                lineHeight: 1.1,
                letterSpacing: "0.03em",
                color: "#EDE6DB",
              }}
            >
              O padrão tem nome.<br />
              <span style={{ color: "#C8B870" }}>Qual é o seu?</span>
            </p>

            <p
              className="font-inter leading-[1.8] mt-4 mb-10"
              style={{ fontSize: "clamp(14px, 1.4vw, 16px)", color: "rgba(207,197,184,0.6)" }}
            >
              Diagnóstico gratuito. Resultado imediato. Sem julgamento — só direção.
            </p>

            <button
              onClick={goToQuiz}
              className="font-inter font-semibold uppercase tracking-[0.2em] transition-all duration-300 inline-flex items-center gap-3"
              style={{
                background: "linear-gradient(135deg, #C8B870 0%, #b88a3a 50%, #983D06 100%)",
                color: "#08090D",
                borderRadius: "8px",
                border: "1px solid rgba(200,184,112,0.45)",
                boxShadow: "0 4px 24px -4px rgba(152,61,6,0.4)",
                height: "56px",
                paddingLeft: "32px",
                paddingRight: "32px",
                fontSize: "13px",
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
              Descobrir meu arquétipo
              <ArrowRight size={15} />
            </button>

            <p
              className="mt-5 font-inter"
              style={{ fontSize: "11px", color: "rgba(200,184,112,0.4)", letterSpacing: "0.06em" }}
            >
              3 MINUTOS · GRATUITO · SEM CADASTRO
            </p>
          </motion.div>

        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(200,184,112,0.07)", padding: "24px 32px" }}>
        <div className="max-w-[820px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-inter" style={{ fontSize: "11px", color: "rgba(207,197,184,0.35)" }}>
            © Ana Retore. Todos os direitos reservados.
          </p>
          <button
            onClick={goToQuiz}
            className="font-inter transition-opacity hover:opacity-80"
            style={{ fontSize: "11.5px", color: "rgba(200,184,112,0.5)", letterSpacing: "0.03em" }}
          >
            Fazer o diagnóstico →
          </button>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
