import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import DiagnosticoRadarChart from "./DiagnosticoRadarChart";
import { generateDiagnosticoPDF } from "@/components/diagnostico/diagnosticoPdfGenerator";
import {
  computeEspelho,
  generateEditorialDiagnostic,
  generate7DayPlan,
  getAxisMicro,
  getArquetipo,
  type EspelhoData,
} from "@/data/espelhoEngine";

/* ── Props ──────────────────────────────────────────── */
interface DiagnosticoResultProps {
  scores?: number[];
  userName: string;
  answers?: (number | null)[];
  sessionId?: string;
}

/* ── Animation variants ─────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const inView = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

/* ── Design tokens ──────────────────────────────────── */
const BG      = "#08090D";
const GOLD    = "#C8B870";
const CREAM   = "#EDE6DB";
const MUTED   = "rgba(207,197,184,0.62)";
const DIM     = "rgba(207,197,184,0.38)";
const BORDER  = "rgba(200,184,112,0.09)";
const TOP_CLR = "#C8A050";
const BOT_CLR = "#6B8BA4";
const CTR_CLR = "#7A9B6E";

/* ── Arquétipo palette ──────────────────────────────── */
const ARQUETIPO_THEME: Record<string, { accent: string; accentAlpha: string; fase: string }> = {
  Curiosa:      { accent: "#7BB89A", accentAlpha: "rgba(123,184,154,0.10)", fase: "Fase 1" },
  Buscadora:    { accent: "#C8A050", accentAlpha: "rgba(200,160,80,0.10)",  fase: "Fase 2" },
  Estrategista: { accent: "#7B9EC8", accentAlpha: "rgba(123,158,200,0.10)", fase: "Fase 3" },
  Soberana:     { accent: "#C8B870", accentAlpha: "rgba(200,184,112,0.10)", fase: "Fase 4" },
};

/* ── Offer copy ─────────────────────────────────────── */
const KIWIFY_URL  = "https://pay.kiwify.com.br/ns0fjIx";
const PLANO_A_URL = "mailto:ana.retore@gmail.com?subject=Quero%20saber%20mais%20sobre%20o%20Plano%20A";

const ARQUETIPO_OFFER: Record<string, {
  aberturaCopy: string;
  destaques: { nome: string; desc: string }[];
  ctaLabel: string;
  planoA?: boolean;
}> = {
  Curiosa: {
    aberturaCopy: "Você sentiu o incômodo. Agora ele tem nome. O Portal Reset foi criado para o momento em que você ainda não sabe exatamente o que precisa mudar — mas já sabe que algo precisa mudar.",
    destaques: [
      { nome: "10 Portais", desc: "uma jornada com rituais guiados, passo a passo" },
      { nome: "Ayra", desc: "mentora de consciência com IA — disponível a qualquer momento" },
      { nome: "Círculo", desc: "diário de frequência para registrar o que está vivo em você" },
      { nome: "Sistema", desc: "pontos, níveis e conquistas que sustentam o caminho" },
    ],
    ctaLabel: "COMEÇAR MINHA JORNADA",
  },
  Buscadora: {
    aberturaCopy: "Você já tentou. Já sabe o que precisa. O que escapa não é intenção — é sustentação. O Portal Reset não é mais um conteúdo para consumir. É um sistema para sustentar o que você já sabe.",
    destaques: [
      { nome: "Rituais guiados", desc: "10 portais com práticas curtas e repetíveis" },
      { nome: "Círculo", desc: "diário de frequência que acompanha sua consistência" },
      { nome: "Ayra", desc: "mentora de consciência — âncora quando a mente acelera" },
      { nome: "Sistema de progresso", desc: "estrutura visível que mostra que você está sustentando" },
    ],
    ctaLabel: "ENTRAR NO SISTEMA",
  },
  Estrategista: {
    aberturaCopy: "Você funciona. Entrega. Mas em algum ponto cobra um preço de si mesma que ninguém vê. O Portal Reset não é sobre começar — é sobre fechar o pacto com o que você já construiu.",
    destaques: [
      { nome: "Portal 10", desc: "Selando o Pacto com o Propósito — o ponto de chegada" },
      { nome: "Cléo", desc: "mentora de poder e magnetismo — para quem tem base e quer precisão" },
      { nome: "Galeria Alquímica", desc: "geração de imagem com IA para ancorar sua visão" },
      { nome: "Ayra", desc: "mentora de consciência para refinar, não para explicar o básico" },
    ],
    ctaLabel: "FECHAR O PACTO",
  },
  Soberana: {
    aberturaCopy: "Você já tem base. O Portal Reset é o lugar de ancorar o que você já é — e sustentar a expansão sem sacrifício. Entre. E quando sentir que está pronta para um passo maior, o Plano A é a próxima conversa.",
    destaques: [
      { nome: "Cléo", desc: "mentora de poder pessoal — desbloqueada para você desde o início" },
      { nome: "Portal 10", desc: "Selando o Pacto com o Propósito — seu ponto de partida" },
      { nome: "Galeria Alquímica", desc: "geração de imagem com IA para materializar sua frequência" },
      { nome: "Ayra", desc: "mentora de consciência para conversas de refinamento" },
    ],
    ctaLabel: "ENTRAR NO PORTAL RESET",
    planoA: true,
  },
};

/* ── SVG decorative divider ─────────────────────────── */
const GoldDivider = () => (
  <svg width="100%" height="16" viewBox="0 0 400 16" preserveAspectRatio="none" aria-hidden="true">
    <line x1="0" y1="8" x2="168" y2="8" stroke={BORDER} strokeWidth="1" />
    <circle cx="200" cy="8" r="2.5" fill={GOLD} opacity="0.3" />
    <line x1="232" y1="8" x2="400" y2="8" stroke={BORDER} strokeWidth="1" />
  </svg>
);

/* ── Section kicker ─────────────────────────────────── */
const Kicker = ({ children, color }: { children: React.ReactNode; color?: string }) => (
  <p
    className="font-inter uppercase mb-3"
    style={{ fontSize: "9.5px", letterSpacing: "0.45em", color: color ?? "rgba(200,184,112,0.55)" }}
  >
    {children}
  </p>
);

/* ── Gold bar ───────────────────────────────────────── */
const GoldBar = ({ color }: { color?: string }) => (
  <div
    className="w-8 h-px mb-6"
    style={{ background: `linear-gradient(90deg, ${color ?? GOLD}, transparent)` }}
  />
);

/* ── Main component ─────────────────────────────────── */
const DiagnosticoResult = ({ userName, answers }: DiagnosticoResultProps) => {
  const data: EspelhoData = computeEspelho(answers ?? []);
  const editorial  = generateEditorialDiagnostic(data);
  const plan       = generate7DayPlan(data);
  const arquetipo  = getArquetipo(data);
  const theme      = ARQUETIPO_THEME[arquetipo.nome];
  const offer      = ARQUETIPO_OFFER[arquetipo.nome];

  const top3Indices    = data.top3.map((a) => a.index);
  const bottom3Indices = data.bottom3.map((a) => a.index);

  const handleDownloadPDF = async () => {
    await generateDiagnosticoPDF(data, userName, "radar-chart-pdf");
  };

  return (
    <div style={{ background: BG, color: CREAM, minHeight: "100vh" }}>

      {/* Gold top rule */}
      <div
        className="fixed top-0 left-0 right-0 h-px z-50 pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent 5%, ${GOLD}30 30%, ${GOLD}30 70%, transparent 95%)` }}
      />

      <div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">

        {/* ════════════════ HEADER ════════════════ */}
        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} className="mb-16">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Kicker>Espelho da Clareza</Kicker>
              <GoldBar />
              <h1
                className="font-playfair font-bold uppercase"
                style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.06, letterSpacing: "0.06em" }}
              >
                Seu mapa.<br />
                <span style={{ color: GOLD }}>Sua direção.</span>
              </h1>
              {userName && (
                <p className="mt-3 font-playfair italic" style={{ fontSize: "16px", color: MUTED }}>
                  {userName}
                </p>
              )}
            </div>

            <button
              onClick={handleDownloadPDF}
              className="font-inter flex items-center gap-2 shrink-0 transition-opacity hover:opacity-70"
              style={{
                fontSize: "10px",
                letterSpacing: "0.18em",
                color: "rgba(200,184,112,0.45)",
                border: `1px solid ${BORDER}`,
                borderRadius: "6px",
                padding: "8px 14px",
                marginTop: "4px",
                background: "transparent",
              }}
            >
              <Download size={11} />
              PDF
            </button>
          </div>
        </motion.div>

        {/* ════════════════ MANDALA ════════════════ */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          variants={inView}
          className="mb-16"
        >
          <Kicker>Mandala do padrão</Kicker>
          <GoldBar />
          <p className="font-inter mb-8 leading-relaxed" style={{ fontSize: "13px", color: DIM }}>
            Quanto mais expandida a fatia, mais estável está seu acesso naquele eixo.
          </p>

          {/* Radar container with corner ornaments */}
          <div
            className="relative rounded-2xl p-8 md:p-10"
            style={{ background: "rgba(255,255,255,0.018)", border: `1px solid ${BORDER}` }}
          >
            {/* SVG corner ornaments */}
            {[
              { cls: "top-0 left-0",  d: "M2 30 L2 2 L30 2" },
              { cls: "top-0 right-0", d: "M30 30 L30 2 L2 2" },
              { cls: "bottom-0 left-0",  d: "M2 2 L2 30 L30 30" },
              { cls: "bottom-0 right-0", d: "M30 2 L30 30 L2 30" },
            ].map(({ cls, d }) => (
              <svg
                key={d}
                className={`absolute ${cls}`}
                width="32" height="32" viewBox="0 0 32 32"
                fill="none" aria-hidden="true"
              >
                <path d={d} stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.28" />
              </svg>
            ))}

            <DiagnosticoRadarChart
              scores={data.axes.map((a) => a.mean)}
              id="radar-chart-pdf"
              top3Indices={top3Indices}
              bottom3Indices={bottom3Indices}
              centralIndex={data.centralAxis.index}
            />
          </div>
        </motion.section>

        <GoldDivider />

        {/* ════════════════ LEITURA EDITORIAL ════════════════ */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          variants={inView}
          className="mt-14 mb-16"
        >
          <Kicker>Seu padrão</Kicker>
          <GoldBar />

          <div className="space-y-5">
            {editorial.map((para, i) => (
              <p
                key={i}
                className="font-inter leading-[1.9]"
                style={{
                  fontSize: "clamp(14px, 1.45vw, 15.5px)",
                  color: i === 3 ? "rgba(237,230,219,0.85)" : MUTED,
                  fontWeight: i === 3 ? 500 : 400,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </motion.section>

        <GoldDivider />

        {/* ════════════════ TRÍADE BASE / VAZAMENTO ════════════════ */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          variants={inView}
          className="mt-14 mb-16"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

            {/* Base */}
            <div>
              <Kicker color={TOP_CLR}>Tríade de base</Kicker>
              <GoldBar color={TOP_CLR} />
              {data.top3.map((axis) => (
                <div key={axis.index} className="py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-inter font-medium" style={{ fontSize: "13px", color: CREAM }}>
                      {axis.label}
                    </span>
                    <span className="font-playfair font-bold" style={{ fontSize: "18px", color: TOP_CLR }}>
                      {axis.mean.toFixed(1)}
                    </span>
                  </div>
                  <p className="font-inter" style={{ fontSize: "11px", color: DIM }}>
                    {getAxisMicro(axis.type).micro}
                  </p>
                </div>
              ))}
            </div>

            {/* Vazamento */}
            <div>
              <Kicker color={BOT_CLR}>Tríade de vazamento</Kicker>
              <GoldBar color={BOT_CLR} />
              {data.bottom3.map((axis) => (
                <div key={axis.index} className="py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-inter font-medium" style={{ fontSize: "13px", color: CREAM }}>
                      {axis.label}
                    </span>
                    <span className="font-playfair font-bold" style={{ fontSize: "18px", color: BOT_CLR }}>
                      {axis.mean.toFixed(1)}
                    </span>
                  </div>
                  <p className="font-inter" style={{ fontSize: "11px", color: DIM }}>
                    {getAxisMicro(axis.type).micro}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <GoldDivider />

        {/* ════════════════ CONFLITO CENTRAL ════════════════ */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          variants={inView}
          className="mt-14 mb-16"
        >
          <Kicker color={CTR_CLR}>Conflito central</Kicker>
          <GoldBar color={CTR_CLR} />

          <div
            className="relative p-6 rounded-xl overflow-hidden"
            style={{ border: `1px solid rgba(122,155,110,0.22)`, background: "rgba(122,155,110,0.05)" }}
          >
            <div
              className="absolute left-0 top-4 bottom-4 w-px"
              style={{ background: `linear-gradient(to bottom, transparent, ${CTR_CLR}55, transparent)` }}
            />
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-playfair font-bold" style={{ fontSize: "clamp(17px, 2vw, 21px)", color: CREAM }}>
                {data.centralAxis.label}
              </span>
              <span
                className="font-inter uppercase"
                style={{ fontSize: "9px", letterSpacing: "0.2em", color: CTR_CLR, opacity: 0.7 }}
              >
                tensão {data.centralAxis.tension.toFixed(0)}
              </span>
            </div>
            <p className="font-inter leading-relaxed" style={{ fontSize: "13px", color: MUTED }}>
              {data.centralAxis.clinical > data.centralAxis.symbolic
                ? `Em ${data.centralAxis.label}, você executa mais do que sente. A ação corre na frente da presença.`
                : data.centralAxis.clinical < data.centralAxis.symbolic
                  ? `Em ${data.centralAxis.label}, você sente mais do que consegue sustentar. A percepção existe, mas falta chão.`
                  : `Em ${data.centralAxis.label}, existe uma oscilação entre sentir e agir. O ponto de equilíbrio ainda não estabilizou.`}
            </p>
          </div>
        </motion.section>

        <GoldDivider />

        {/* ════════════════ PLANO 7 DIAS ════════════════ */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          variants={inView}
          className="mt-14 mb-16"
        >
          <Kicker>Plano de sustentação · 7 dias</Kicker>
          <GoldBar />
          <p className="font-inter mb-6" style={{ fontSize: "12px", color: DIM }}>
            3 minutos por dia. Sem teatro. Sem pico.
          </p>

          {/* Axis reference tags */}
          <div
            className="flex flex-wrap gap-x-5 gap-y-2 mb-7 p-4 rounded-xl"
            style={{ background: "rgba(255,255,255,0.018)", border: `1px solid ${BORDER}` }}
          >
            {[
              { axis: data.bottom3[0], tag: "vazamento" },
              { axis: data.bottom3[1], tag: "vazamento" },
              { axis: data.centralAxis, tag: "conflito" },
              { axis: data.top3[0], tag: "base" },
            ].map(({ axis, tag }) => (
              <span key={axis.index} className="font-inter flex items-center gap-1.5" style={{ fontSize: "11px" }}>
                <span style={{ color: GOLD, fontWeight: 600 }}>{axis.label}</span>
                <span className="uppercase" style={{ fontSize: "8.5px", letterSpacing: "0.15em", color: DIM }}>
                  {tag}
                </span>
              </span>
            ))}
          </div>

          {plan.map((day, i) => (
            <div key={i} className="flex gap-4 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
              <span
                className="font-playfair font-bold shrink-0"
                style={{ fontSize: "20px", lineHeight: 1, color: GOLD, marginTop: "2px" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-inter leading-relaxed" style={{ fontSize: "13.5px", color: MUTED }}>
                {day.replace(/^Dia \d+ — /, "")}
              </p>
            </div>
          ))}

          <p className="font-inter italic mt-5" style={{ fontSize: "12px", color: DIM }}>
            Foco desta semana: estabilizar{" "}
            <span style={{ color: "rgba(200,184,112,0.6)" }}>{data.bottom3[0].label}</span> e{" "}
            <span style={{ color: "rgba(200,184,112,0.6)" }}>{data.bottom3[1].label}</span>, e
            reduzir a tensão em{" "}
            <span style={{ color: "rgba(200,184,112,0.6)" }}>{data.centralAxis.label}</span>.
          </p>
        </motion.section>

        {/* ════════════════ ARQUÉTIPO REVEAL ════════════════ */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          variants={inView}
        >
          <div
            className="-mx-6 md:-mx-10 px-6 md:px-10 pt-14 pb-14"
            style={{ background: "rgba(255,255,255,0.014)", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
          >
            {/* Fase + nome */}
            <p
              className="font-inter uppercase mb-2"
              style={{ fontSize: "9.5px", letterSpacing: "0.5em", color: theme.accent, opacity: 0.8 }}
            >
              {theme.fase}
            </p>
            <h2
              className="font-playfair font-bold uppercase mb-5"
              style={{ fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 0.95, letterSpacing: "0.05em", color: theme.accent }}
            >
              {arquetipo.nome}
            </h2>
            <div className="w-10 h-px mb-6" style={{ background: theme.accent, opacity: 0.4 }} />

            {/* Abertura */}
            <p
              className="font-playfair italic leading-relaxed mb-4"
              style={{ fontSize: "clamp(16px, 1.8vw, 19px)", color: "rgba(237,230,219,0.85)" }}
            >
              {arquetipo.abertura}
            </p>

            {/* Dor raiz */}
            <p className="font-inter leading-[1.85] mb-10" style={{ fontSize: "clamp(13.5px, 1.4vw, 15px)", color: MUTED }}>
              {arquetipo.dorRaiz}
            </p>

            {/* Sinais */}
            <p className="font-inter uppercase mb-5" style={{ fontSize: "9.5px", letterSpacing: "0.4em", color: DIM }}>
              Onde isso aparece em você
            </p>
            <div className="space-y-3 mb-10">
              {(arquetipo.sinais as unknown as string[]).map((sinal: string, i: number) => (
                <div
                  key={i}
                  className="flex gap-4 items-start p-4 rounded-xl"
                  style={{ background: theme.accentAlpha, border: `1px solid ${theme.accent}28` }}
                >
                  <span
                    className="font-playfair font-bold shrink-0"
                    style={{ fontSize: "15px", color: theme.accent, lineHeight: 1, marginTop: "2px" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-inter leading-relaxed" style={{ fontSize: "13.5px", color: MUTED }}>
                    {sinal}
                  </p>
                </div>
              ))}
            </div>

            {/* Ciclo recomendado */}
            <div
              className="p-5 rounded-xl"
              style={{ background: theme.accentAlpha, border: `1px solid ${theme.accent}25` }}
            >
              <p
                className="font-inter uppercase mb-2"
                style={{ fontSize: "9.5px", letterSpacing: "0.4em", color: theme.accent, opacity: 0.8 }}
              >
                Seu ciclo no Portal Reset
              </p>
              <p className="font-playfair font-semibold" style={{ fontSize: "15px", color: CREAM }}>
                {arquetipo.cicloRecomendado}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {arquetipo.codigosRecomendados.map((codigo: string) => (
                  <span
                    key={codigo}
                    className="font-inter"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      padding: "4px 12px",
                      borderRadius: "100px",
                      background: `${theme.accent}18`,
                      color: theme.accent,
                      border: `1px solid ${theme.accent}28`,
                    }}
                  >
                    {codigo}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ════════════════ OFERTA ════════════════ */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          variants={inView}
          className="-mx-6 md:-mx-10 px-6 md:px-10 pt-14"
          style={{ background: BG }}
        >
          <p className="font-inter leading-[1.9] mb-10" style={{ fontSize: "clamp(14px, 1.45vw, 15.5px)", color: MUTED }}>
            {offer.aberturaCopy}
          </p>

          <Kicker>O que você acessa</Kicker>
          <GoldBar />

          <div className="space-y-0 mb-12">
            {offer.destaques.map((item, i) => (
              <div
                key={i}
                className="flex items-baseline gap-3 py-4"
                style={{ borderBottom: `1px solid ${BORDER}` }}
              >
                <svg width="4" height="4" viewBox="0 0 4 4" aria-hidden="true" className="shrink-0 mt-2">
                  <circle cx="2" cy="2" r="2" fill={GOLD} opacity="0.5" />
                </svg>
                <span className="font-inter font-semibold shrink-0" style={{ fontSize: "13px", color: GOLD }}>
                  {item.nome}
                </span>
                <span className="font-inter" style={{ fontSize: "13px", color: DIM }}>
                  {item.desc}
                </span>
              </div>
            ))}
          </div>

          <p
            className="font-playfair italic text-center mb-12"
            style={{ fontSize: "clamp(15px, 1.7vw, 18px)", color: "rgba(237,230,219,0.5)" }}
          >
            {arquetipo.primeiroPassoTexto}
          </p>
        </motion.section>

        {/* ════════════════ CTA ════════════════ */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          variants={inView}
          className="-mx-6 md:-mx-10 px-6 md:px-10 pb-16 text-center"
          style={{ background: BG }}
        >
          {/* SVG diamond ornament */}
          <svg className="mx-auto mb-8" width="120" height="20" viewBox="0 0 120 20" fill="none" aria-hidden="true">
            <line x1="0" y1="10" x2="50" y2="10" stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.2" />
            <path d="M55 10 L60 5 L65 10 L60 15 Z" fill={GOLD} opacity="0.25" />
            <line x1="70" y1="10" x2="120" y2="10" stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.2" />
          </svg>

          <p
            className="font-inter uppercase mb-3"
            style={{ fontSize: "9.5px", letterSpacing: "0.5em", color: "rgba(200,184,112,0.45)" }}
          >
            Portal Reset
          </p>
          <h3
            className="font-playfair font-bold mb-3"
            style={{ fontSize: "clamp(26px, 3.2vw, 36px)", lineHeight: 1.1, color: CREAM }}
          >
            Sua jornada<br />
            <span style={{ color: GOLD }}>começa agora.</span>
          </h3>
          <p
            className="font-inter leading-relaxed mb-10 max-w-sm mx-auto"
            style={{ fontSize: "13.5px", color: DIM }}
          >
            Jornada de 10 dias com rituais diários, 3 mentoras de IA e um sistema de sustentação real —
            para quem já sabe que entender não é suficiente.
          </p>

          {/* Price */}
          <div className="mb-8">
            <div className="flex items-end justify-center gap-1.5">
              <span
                className="font-playfair font-bold"
                style={{ fontSize: "clamp(52px, 7vw, 68px)", lineHeight: 1, color: CREAM }}
              >
                R$47
              </span>
              <span className="font-inter mb-2" style={{ fontSize: "14px", color: DIM }}>
                /mês
              </span>
            </div>
            <p className="font-inter mt-1" style={{ fontSize: "11px", color: "rgba(200,184,112,0.38)" }}>
              Cancele quando quiser. Sem fidelidade.
            </p>
          </div>

          {/* CTA button */}
          <a href={KIWIFY_URL} target="_blank" rel="noopener noreferrer" className="block">
            <button
              className="font-inter font-semibold uppercase tracking-[0.2em] inline-flex items-center justify-center gap-3 transition-all duration-300 w-full max-w-xs mx-auto"
              style={{
                background: `linear-gradient(135deg, ${GOLD} 0%, #b88a3a 50%, #983D06 100%)`,
                color: BG,
                borderRadius: "8px",
                border: `1px solid rgba(200,184,112,0.45)`,
                boxShadow: "0 4px 28px -4px rgba(152,61,6,0.45)",
                height: "56px",
                paddingLeft: "32px",
                paddingRight: "32px",
                fontSize: "12px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 32px -4px rgba(152,61,6,0.5), 0 0 40px -8px rgba(200,184,112,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 28px -4px rgba(152,61,6,0.45)";
              }}
            >
              {offer.ctaLabel}
              <ArrowRight size={14} />
            </button>
          </a>

          <p className="font-inter mt-4" style={{ fontSize: "10.5px", color: DIM }}>
            Acesso imediato após confirmação do pagamento.
          </p>

          {/* Plano A — só Soberana */}
          {offer.planoA && (
            <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${BORDER}` }}>
              <p className="font-inter mb-3" style={{ fontSize: "12px", color: DIM }}>
                Se sentir que está pronta para um passo maior —
              </p>
              <a
                href={PLANO_A_URL}
                className="font-inter transition-opacity hover:opacity-70"
                style={{ fontSize: "13px", color: "rgba(200,184,112,0.55)", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                Quero saber sobre o Plano A →
              </a>
            </div>
          )}

          {/* Footer */}
          <div className="mt-14 pt-5" style={{ borderTop: `1px solid ${BORDER}` }}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
              <p className="font-inter" style={{ fontSize: "10.5px", color: "rgba(207,197,184,0.22)" }}>
                © Ana Retore. Todos os direitos reservados.
              </p>
              <div className="hidden sm:block w-px h-3" style={{ background: BORDER }} />
              <a
                href="/politica-de-privacidade"
                className="font-inter transition-opacity hover:opacity-70"
                style={{ fontSize: "10.5px", color: "rgba(207,197,184,0.22)" }}
              >
                Política de Privacidade
              </a>
              <div className="hidden sm:block w-px h-3" style={{ background: BORDER }} />
              <a
                href="/termos-de-uso"
                className="font-inter transition-opacity hover:opacity-70"
                style={{ fontSize: "10.5px", color: "rgba(207,197,184,0.22)" }}
              >
                Termos de Uso
              </a>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default DiagnosticoResult;
