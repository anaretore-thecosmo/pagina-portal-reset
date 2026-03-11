import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ── Shared animation variants ──────────────────────── */
const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.11, duration: 0.6, ease: "easeOut" as const },
  }),
};

const inView = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

/* ── Data ───────────────────────────────────────────── */
const DORES = [
  { frase: "Você começa, para, recomeça — e ainda não sabe exatamente por quê." },
  { frase: "Você funciona, entrega, resolve — mas o custo interno está alto demais." },
  { frase: "Você sente que tem mais, mas algo sempre trava antes de virar ação." },
  { frase: "Você já tem clareza. O que falta é sustentar sem abrir mão de si." },
];

const ENTREGAS = [
  { num: "01", texto: "Seu arquétipo de padrão — Curiosa, Buscadora, Estrategista ou Soberana" },
  { num: "02", texto: "Sua mandala de 6 eixos — onde você sustenta e onde vaza energia" },
  { num: "03", texto: "Um plano de 7 dias com ações específicas para onde você está agora" },
  { num: "04", texto: "A prescrição exata do próximo ciclo do seu padrão" },
];

/* ── Props ──────────────────────────────────────────── */
interface LandingSharedSectionsProps {
  onCTA: () => void;
}

/* ── Component ──────────────────────────────────────── */
const LandingSharedSections = ({ onCTA }: LandingSharedSectionsProps) => (
  <>
    {/* ════════ SEÇÃO 2 — O QUE VOCÊ RECEBE + COMO FUNCIONA ════════ */}
    <section
      className="px-6 md:px-12 lg:px-20 py-20 md:py-28"
      style={{ borderTop: "1px solid rgba(200,184,112,0.07)" }}
    >
      <div className="max-w-[820px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">

        {/* Coluna 1 — Ao final, você recebe */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          variants={inView}
        >
          <p className="font-inter uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.4em", color: "rgba(200,184,112,0.6)" }}>
            Ao final, você recebe
          </p>
          <div className="w-8 h-px mb-8" style={{ background: "rgba(200,184,112,0.3)" }} />

          <div className="space-y-6">
            {[
              { n: "1", t: "Sua mandala de 6 eixos" },
              { n: "2", t: "Uma leitura que traduz o mapa em decisão" },
              { n: "3", t: "Um plano de 7 dias com foco real" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
                variants={fade}
                className="flex gap-4 items-start"
              >
                <span
                  className="font-playfair font-bold shrink-0"
                  style={{ fontSize: "20px", color: "#C8B870", lineHeight: 1, marginTop: "2px" }}
                >
                  {item.n}
                </span>
                <p
                  className="font-inter leading-relaxed"
                  style={{ fontSize: "clamp(14px, 1.4vw, 16px)", color: "rgba(207,197,184,0.82)" }}
                >
                  {item.t}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Coluna 2 — Como funciona */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          variants={inView}
        >
          <p className="font-inter uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.4em", color: "rgba(200,184,112,0.6)" }}>
            Como funciona
          </p>
          <div className="w-8 h-px mb-8" style={{ background: "rgba(200,184,112,0.3)" }} />

          <div className="space-y-6">
            {[
              { n: "01", t: "Escala de 1 a 9, pensando nos últimos 30 dias." },
              { n: "02", t: "Pausas curtas a cada 6 etapas para recalibrar." },
              { n: "03", t: "No final, o espelho vira guia." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
                variants={fade}
                className="flex gap-4 items-start"
              >
                <span
                  className="font-playfair font-bold shrink-0"
                  style={{ fontSize: "20px", color: "rgba(200,184,112,0.4)", lineHeight: 1, marginTop: "2px" }}
                >
                  {item.n}
                </span>
                <p
                  className="font-inter leading-relaxed"
                  style={{ fontSize: "clamp(14px, 1.4vw, 16px)", color: "rgba(207,197,184,0.65)" }}
                >
                  {item.t}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={inView}
            className="mt-10 font-playfair"
            style={{ fontSize: "clamp(13px, 1.3vw, 15px)", color: "rgba(200,184,112,0.5)", fontStyle: "italic" }}
          >
            Sem julgamento. Só direção.
          </motion.p>
        </motion.div>

      </div>
    </section>

    {/* ════════ SEÇÃO 3 — IDENTIFICAÇÃO (dores) ════════ */}
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
      <div className="max-w-[820px] mx-auto">

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          variants={inView}
        >
          <p className="font-inter uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.4em", color: "rgba(200,184,112,0.6)" }}>
            Você se reconhece aqui?
          </p>
          <div className="w-8 h-px mb-10" style={{ background: "rgba(200,184,112,0.35)" }} />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DORES.map((d, i) => (
            <motion.div
              key={i}
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
              variants={fade}
              className="p-6 rounded-xl"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(200,184,112,0.1)" }}
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

    {/* ════════ SEÇÃO 4 — O QUE VOCÊ VAI DESCOBRIR ════════ */}
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
              initial="hidden" whileInView="visible"
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

    {/* ════════ SEÇÃO 5 — CTA FINAL ════════ */}
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
            style={{ fontSize: "clamp(28px, 3.5vw, 42px)", lineHeight: 1.1, letterSpacing: "0.03em", color: "#EDE6DB" }}
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
            onClick={onCTA}
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

    {/* ════════ FOOTER ════════ */}
    <footer style={{ borderTop: "1px solid rgba(200,184,112,0.07)", padding: "24px 32px" }}>
      <div className="max-w-[820px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="font-inter" style={{ fontSize: "11px", color: "rgba(207,197,184,0.35)" }}>
          © Ana Retore. Todos os direitos reservados.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <a
            href="/politica-de-privacidade"
            className="font-inter transition-opacity hover:opacity-80"
            style={{ fontSize: "11px", color: "rgba(207,197,184,0.35)" }}
          >
            Política de Privacidade
          </a>
          <a
            href="/termos-de-uso"
            className="font-inter transition-opacity hover:opacity-80"
            style={{ fontSize: "11px", color: "rgba(207,197,184,0.35)" }}
          >
            Termos de Uso
          </a>
          <button
            onClick={onCTA}
            className="font-inter transition-opacity hover:opacity-80"
            style={{ fontSize: "11.5px", color: "rgba(200,184,112,0.5)", letterSpacing: "0.03em" }}
          >
            Fazer o diagnóstico →
          </button>
        </div>
      </div>
    </footer>
  </>
);

export default LandingSharedSections;
