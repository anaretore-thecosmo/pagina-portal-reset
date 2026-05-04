import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Sparkles, Shield, Brain, Target, Share2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import DiagnosticoRadarChart from "./DiagnosticoRadarChart";
import ShareCard from "./ShareCard";
import { generateShareImage } from "./shareCardGenerator";
import { generateDiagnosticoPDF } from "@/components/diagnostico/diagnosticoPdfGenerator";
import {
  computeEspelho,
  generateEditorialDiagnostic,
  generate7DayPlan,
  getAxisMicro,
  getArquetipo,
  type EspelhoData,
} from "@/data/espelhoEngine";
import { track } from "@/lib/analytics";

/* ── Props ──────────────────────────────────────────── */
interface DiagnosticoResultProps {
  scores?: number[];
  userName: string;
  userEmail?: string;
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

/* ── Design tokens — DARK ──────────────────────────── */
const BG_DARK  = "#08090D";
const GOLD     = "#C8B870";
const CREAM    = "#EDE6DB";
const MUTED    = "rgba(207,197,184,0.62)";
const DIM      = "rgba(207,197,184,0.38)";
const BORDER   = "rgba(200,184,112,0.09)";
const TOP_CLR  = "#C8A050";
const BOT_CLR  = "#6B8BA4";
const CTR_CLR  = "#7A9B6E";

/* ── Design tokens — LIGHT ─────────────────────────── */
const BG_LIGHT       = "#EDE6DB";
const TEXT_DARK      = "#1A1A18";
const TEXT_MUTED_L   = "rgba(26,26,24,0.78)";
const TEXT_DIM_L     = "rgba(26,26,24,0.56)";
const BORDER_LIGHT   = "rgba(26,26,24,0.08)";
const GOLD_DARK      = "#8B7A3A";

/* ── Arquétipo palette ──────────────────────────────── */
const ARQUETIPO_THEME: Record<string, { accent: string; accentAlpha: string; accentDarkBg: string; fase: string }> = {
  Curiosa:      { accent: "#7BB89A", accentAlpha: "rgba(123,184,154,0.10)", accentDarkBg: "rgba(123,184,154,0.06)", fase: "Fase 1" },
  Buscadora:    { accent: "#C8A050", accentAlpha: "rgba(200,160,80,0.10)",  accentDarkBg: "rgba(200,160,80,0.06)",  fase: "Fase 2" },
  Estrategista: { accent: "#7B9EC8", accentAlpha: "rgba(123,158,200,0.10)", accentDarkBg: "rgba(123,158,200,0.06)", fase: "Fase 3" },
  Soberana:     { accent: "#C8B870", accentAlpha: "rgba(200,184,112,0.10)", accentDarkBg: "rgba(200,184,112,0.06)", fase: "Fase 4" },
};

/* ── Offer copy ─────────────────────────────────────── */
const KIWIFY_URL  = "https://pay.kiwify.com.br/SdH1PiX";
const PLANO_A_URL = "mailto:ana.retore@gmail.com?subject=Quero%20saber%20mais%20sobre%20o%20Plano%20A";

const ARQUETIPO_OFFER: Record<string, {
  aberturaCopy: string;
  destaques: { nome: string; desc: string; icon: string }[];
  ctaLabel: string;
  planoA?: boolean;
}> = {
  Curiosa: {
    aberturaCopy: "Você sentiu o incômodo. Agora ele tem nome. O Portal Reset foi criado para o momento em que você ainda não sabe exatamente o que precisa mudar — mas já sabe que algo precisa mudar.",
    destaques: [
      { nome: "10 Portais", desc: "Jornada com rituais guiados, passo a passo — cada portal desbloqueia uma camada nova de clareza", icon: "target" },
      { nome: "Ayra", desc: "Sua mentora de consciência com IA — disponível 24h para quando a mente acelerar", icon: "brain" },
      { nome: "Círculo", desc: "Diário de frequência que mostra padrões invisíveis e sustenta sua consistência", icon: "sparkles" },
      { nome: "Sistema de Progresso", desc: "Pontos, níveis e conquistas que tornam o caminho visível e sustentável", icon: "shield" },
    ],
    ctaLabel: "COMEÇAR MINHA JORNADA",
  },
  Buscadora: {
    aberturaCopy: "Você já tentou. Já sabe o que precisa. O que escapa não é intenção — é sustentação. O Portal Reset não é mais um conteúdo para consumir. É um sistema para sustentar o que você já sabe.",
    destaques: [
      { nome: "Rituais Guiados", desc: "10 portais com práticas curtas e repetíveis — desenhados para quem já entende mas não sustenta", icon: "target" },
      { nome: "Círculo", desc: "Diário de frequência que acompanha sua consistência e revela onde você quebra o padrão", icon: "sparkles" },
      { nome: "Ayra", desc: "Mentora de consciência — âncora quando a mente acelera e o automático tenta voltar", icon: "brain" },
      { nome: "Sistema de Progresso", desc: "Estrutura visível que prova que você está sustentando — não é sensação, é dado", icon: "shield" },
    ],
    ctaLabel: "ENTRAR NO SISTEMA",
  },
  Estrategista: {
    aberturaCopy: "Você funciona. Entrega. Mas em algum ponto cobra um preço de si mesma que ninguém vê. O Portal Reset não é sobre começar — é sobre honrar o chamado do que você já construiu.",
    destaques: [
      { nome: "Portal 10", desc: "Portal da Virada e do Propósito — o ponto de chegada que redefine sua relação com resultados", icon: "target" },
      { nome: "Cléo", desc: "Mentora de poder e magnetismo — para quem tem base e quer precisão na expansão", icon: "sparkles" },
      { nome: "Galeria Alquímica", desc: "Geração de imagem com IA para ancorar visualmente sua frequência e intenção", icon: "brain" },
      { nome: "Ayra", desc: "Mentora de consciência para refinar decisões — não para explicar o básico", icon: "shield" },
    ],
    ctaLabel: "RESPONDER O CHAMADO",
  },
  Soberana: {
    aberturaCopy: "Você já tem base. O Portal Reset é o lugar de ancorar o que você já é — e sustentar a expansão sem sacrifício.",
    destaques: [
      { nome: "Cléo", desc: "Mentora de poder pessoal — desbloqueada para você desde o início como reconhecimento da sua base", icon: "sparkles" },
      { nome: "Portal 10", desc: "Portal da Virada e do Propósito — seu ponto de partida, não de chegada", icon: "target" },
      { nome: "Galeria Alquímica", desc: "Geração de imagem com IA para materializar sua frequência em forma visível", icon: "brain" },
      { nome: "Ayra", desc: "Mentora de consciência para conversas de refinamento e expansão consciente", icon: "shield" },
    ],
    ctaLabel: "ENTRAR NO PORTAL RESET",
    planoA: true,
  },
};

/* ── SVG decorative divider ─────────────────────────── */
const GoldDivider = ({ light }: { light?: boolean }) => (
  <svg width="100%" height="16" viewBox="0 0 400 16" preserveAspectRatio="none" aria-hidden="true">
    <line x1="0" y1="8" x2="168" y2="8" stroke={light ? BORDER_LIGHT : BORDER} strokeWidth="1" />
    <circle cx="200" cy="8" r="2.5" fill={light ? GOLD_DARK : GOLD} opacity="0.3" />
    <line x1="232" y1="8" x2="400" y2="8" stroke={light ? BORDER_LIGHT : BORDER} strokeWidth="1" />
  </svg>
);

/* ── Section kicker ─────────────────────────────────── */
const Kicker = ({ children, color, light }: { children: React.ReactNode; color?: string; light?: boolean }) => (
  <p
    className="font-inter uppercase mb-3"
    style={{
      fontSize: "9.5px",
      letterSpacing: "0.45em",
      color: color ?? (light ? "rgba(139,122,58,0.7)" : "rgba(200,184,112,0.55)"),
    }}
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

/* ── Icon mapper ────────────────────────────────────── */
const IconMap = ({ icon, color }: { icon: string; color: string }) => {
  const size = 20;
  switch (icon) {
    case "target": return <Target size={size} color={color} />;
    case "brain": return <Brain size={size} color={color} />;
    case "sparkles": return <Sparkles size={size} color={color} />;
    case "shield": return <Shield size={size} color={color} />;
    default: return <Sparkles size={size} color={color} />;
  }
};

/* ── Main component ─────────────────────────────────── */
const DiagnosticoResult = ({ userName, userEmail, answers }: DiagnosticoResultProps) => {
  const data: EspelhoData = computeEspelho(answers ?? []);
  const editorial  = generateEditorialDiagnostic(data);
  const plan       = generate7DayPlan(data);
  const arquetipo  = getArquetipo(data);
  const theme      = ARQUETIPO_THEME[arquetipo.nome];
  const offer      = ARQUETIPO_OFFER[arquetipo.nome];

  // Checkout URL pré-preenchido (Kiwify aceita name + email via query)
  const checkoutUrl = (() => {
    const url = new URL(KIWIFY_URL);
    if (userName) url.searchParams.set("name", userName);
    if (userEmail) url.searchParams.set("email", userEmail);
    return url.toString();
  })();

  // Analytics — view do resultado, uma única vez
  useEffect(() => {
    track("result_view", { arquetipo: arquetipo.nome });
  }, [arquetipo.nome]);

  const onCheckoutClick = (origin: "primary" | "sticky") =>
    track("checkout_click", { arquetipo: arquetipo.nome, origin });

  const top3Indices    = data.top3.map((a) => a.index);
  const bottom3Indices = data.bottom3.map((a) => a.index);

  const handleDownloadPDF = async () => {
    await generateDiagnosticoPDF(data, userName, "radar-chart-pdf");
  };

  /* ── Sticky CTA state ──────────────────────────────── */
  const [showStickyCta, setShowStickyCta] = useState(false);
  const mandalaRef = useRef<HTMLDivElement>(null);
  const ofertaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const mandalaBottom = mandalaRef.current?.getBoundingClientRect().bottom ?? 0;
      const ofertaTop = ofertaRef.current?.getBoundingClientRect().top ?? Infinity;
      const viewportHeight = window.innerHeight;
      setShowStickyCta(mandalaBottom < 0 && ofertaTop > viewportHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Share modal state ─────────────────────────────── */
  const [showShareModal, setShowShareModal] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (shareCardRef.current) {
      await generateShareImage(shareCardRef.current);
    }
    setShowShareModal(false);
  };

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* Gold top rule */}
      <div
        className="fixed top-0 left-0 right-0 h-px z-50 pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent 5%, ${GOLD}30 30%, ${GOLD}30 70%, transparent 95%)` }}
      />

      {/* ═══════════════════════════════════════════════
          BLOCO 1: DIAGNÓSTICO — FUNDO ESCURO
          Header + Mandala + Leitura Editorial
          ═══════════════════════════════════════════════ */}
      <div style={{ background: BG_DARK, color: CREAM }}>
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

              <div className="flex items-center gap-2 shrink-0" style={{ marginTop: "4px" }}>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="font-inter flex items-center gap-2 transition-opacity hover:opacity-70"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    color: "rgba(200,184,112,0.45)",
                    border: `1px solid ${BORDER}`,
                    borderRadius: "6px",
                    padding: "8px 14px",
                    background: "transparent",
                  }}
                >
                  <Share2 size={11} />
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="font-inter flex items-center gap-2 transition-opacity hover:opacity-70"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    color: "rgba(200,184,112,0.45)",
                    border: `1px solid ${BORDER}`,
                    borderRadius: "6px",
                    padding: "8px 14px",
                    background: "transparent",
                  }}
                >
                  <Download size={11} />
                  PDF
                </button>
              </div>
            </div>
          </motion.div>

          {/* ════════════════ MANDALA ════════════════ */}
          <motion.section
            ref={mandalaRef}
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            variants={inView}
            className="mb-16"
          >
            <Kicker>Mandala do padrão</Kicker>
            <GoldBar />
            <p className="font-inter mb-8 leading-relaxed" style={{ fontSize: "13px", color: DIM }}>
              Quanto mais expandida a fatia, mais estável está seu acesso naquele eixo.
            </p>

            <div
              className="relative rounded-2xl p-8 md:p-10"
              style={{ background: "rgba(255,255,255,0.018)", border: `1px solid ${BORDER}` }}
            >
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
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          BLOCO 2: TRÍADE + CONFLITO — FUNDO CLARO
          ═══════════════════════════════════════════════ */}
      <div style={{ background: BG_LIGHT, color: TEXT_DARK }}>
        <div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-20">

          {/* ════════════════ TRÍADE BASE / VAZAMENTO ════════════════ */}
          <motion.section
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            variants={inView}
            className="mb-14"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {/* Base */}
              <div>
                <Kicker color={TOP_CLR} light>Tríade de base</Kicker>
                <GoldBar color={TOP_CLR} />
                {data.top3.map((axis) => (
                  <div key={axis.index} className="py-4" style={{ borderBottom: `1px solid ${BORDER_LIGHT}` }}>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="font-inter font-medium" style={{ fontSize: "13px", color: TEXT_DARK }}>
                        {axis.label}
                      </span>
                      <span className="font-playfair font-bold" style={{ fontSize: "18px", color: TOP_CLR }}>
                        {axis.mean.toFixed(1)}
                      </span>
                    </div>
                    <p className="font-inter" style={{ fontSize: "12.5px", color: TEXT_DIM_L }}>
                      {getAxisMicro(axis.type).micro}
                    </p>
                  </div>
                ))}
              </div>

              {/* Vazamento */}
              <div>
                <Kicker color={BOT_CLR} light>Tríade de vazamento</Kicker>
                <GoldBar color={BOT_CLR} />
                {data.bottom3.map((axis) => (
                  <div key={axis.index} className="py-4" style={{ borderBottom: `1px solid ${BORDER_LIGHT}` }}>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="font-inter font-medium" style={{ fontSize: "13px", color: TEXT_DARK }}>
                        {axis.label}
                      </span>
                      <span className="font-playfair font-bold" style={{ fontSize: "18px", color: BOT_CLR }}>
                        {axis.mean.toFixed(1)}
                      </span>
                    </div>
                    <p className="font-inter" style={{ fontSize: "12.5px", color: TEXT_DIM_L }}>
                      {getAxisMicro(axis.type).micro}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <GoldDivider light />

          {/* ════════════════ CONFLITO CENTRAL ════════════════ */}
          <motion.section
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            variants={inView}
            className="mt-14"
          >
            <Kicker color={CTR_CLR} light>Conflito central</Kicker>
            <GoldBar color={CTR_CLR} />

            <div
              className="relative p-6 rounded-xl overflow-hidden"
              style={{ border: `1px solid rgba(122,155,110,0.25)`, background: "rgba(122,155,110,0.06)" }}
            >
              <div
                className="absolute left-0 top-4 bottom-4 w-px"
                style={{ background: `linear-gradient(to bottom, transparent, ${CTR_CLR}66, transparent)` }}
              />
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-playfair font-bold" style={{ fontSize: "clamp(17px, 2vw, 21px)", color: TEXT_DARK }}>
                  {data.centralAxis.label}
                </span>
                <span
                  className="font-inter uppercase"
                  style={{ fontSize: "9px", letterSpacing: "0.2em", color: CTR_CLR, opacity: 0.8 }}
                >
                  tensão {data.centralAxis.tension.toFixed(0)}
                </span>
              </div>
              <p className="font-inter leading-relaxed" style={{ fontSize: "13px", color: TEXT_MUTED_L }}>
                {data.centralAxis.clinical > data.centralAxis.symbolic
                  ? `Em ${data.centralAxis.label}, você executa mais do que sente. A ação corre na frente da presença.`
                  : data.centralAxis.clinical < data.centralAxis.symbolic
                    ? `Em ${data.centralAxis.label}, você sente mais do que consegue sustentar. A percepção existe, mas falta chão.`
                    : `Em ${data.centralAxis.label}, existe uma oscilação entre sentir e agir. O ponto de equilíbrio ainda não estabilizou.`}
              </p>
            </div>
          </motion.section>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          BLOCO 3: PLANO 7 DIAS — FUNDO ESCURO
          ═══════════════════════════════════════════════ */}
      <div style={{ background: BG_DARK, color: CREAM }}>
        <div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-20">

          <motion.section
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            variants={inView}
          >
            <Kicker>Plano de sustentação · 7 dias</Kicker>
            <GoldBar />
            <p className="font-inter mb-6" style={{ fontSize: "12px", color: DIM }}>
              3 minutos por dia. Sem teatro. Sem pico.
            </p>

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
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          BLOCO 4: ARQUÉTIPO — FUNDO CLARO
          ═══════════════════════════════════════════════ */}
      <div style={{ background: BG_LIGHT, color: TEXT_DARK }}>
        <div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-20">

          <motion.section
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={inView}
          >
            <p
              className="font-inter uppercase mb-2"
              style={{ fontSize: "9.5px", letterSpacing: "0.5em", color: theme.accent, opacity: 0.9 }}
            >
              {theme.fase}
            </p>
            <h2
              className="font-playfair font-bold uppercase mb-5"
              style={{ fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 0.95, letterSpacing: "0.05em", color: theme.accent }}
            >
              {arquetipo.nome}
            </h2>
            <div className="w-10 h-px mb-6" style={{ background: theme.accent, opacity: 0.5 }} />

            <p
              className="font-playfair italic leading-relaxed mb-4"
              style={{ fontSize: "clamp(16px, 1.8vw, 19px)", color: TEXT_DARK }}
            >
              {arquetipo.abertura}
            </p>

            <p className="font-inter leading-[1.85] mb-10" style={{ fontSize: "clamp(13.5px, 1.4vw, 15px)", color: TEXT_MUTED_L }}>
              {arquetipo.dorRaiz}
            </p>

            {/* Sinais */}
            <p className="font-inter uppercase mb-5" style={{ fontSize: "9.5px", letterSpacing: "0.4em", color: TEXT_DIM_L }}>
              Onde isso aparece em você
            </p>
            <div className="space-y-3 mb-10">
              {(arquetipo.sinais as unknown as string[]).map((sinal: string, i: number) => (
                <div
                  key={i}
                  className="flex gap-4 items-start p-4 rounded-xl"
                  style={{ background: "rgba(26,26,24,0.04)", border: `1px solid ${theme.accent}30` }}
                >
                  <span
                    className="font-playfair font-bold shrink-0"
                    style={{ fontSize: "15px", color: theme.accent, lineHeight: 1, marginTop: "2px" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-inter leading-relaxed" style={{ fontSize: "13.5px", color: TEXT_MUTED_L }}>
                    {sinal}
                  </p>
                </div>
              ))}
            </div>

            {/* Ciclo recomendado */}
            <div
              className="p-5 rounded-xl"
              style={{ background: "rgba(26,26,24,0.04)", border: `1px solid ${theme.accent}30` }}
            >
              <p
                className="font-inter uppercase mb-2"
                style={{ fontSize: "9.5px", letterSpacing: "0.4em", color: theme.accent, opacity: 0.9 }}
              >
                Seu ciclo no Portal Reset
              </p>
              <p className="font-playfair font-semibold" style={{ fontSize: "15px", color: TEXT_DARK }}>
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
                      border: `1px solid ${theme.accent}30`,
                    }}
                  >
                    {codigo}
                  </span>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          BLOCO 5: OFERTA PORTAL RESET — FUNDO ESCURO
          Ancoragem forte + apresentação premium do app
          ═══════════════════════════════════════════════ */}
      <div ref={ofertaRef} style={{ background: BG_DARK, color: CREAM }}>
        <div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">

          <motion.section
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            variants={inView}
          >
            {/* Transição narrativa */}
            <div className="text-center mb-14">
              <svg className="mx-auto mb-6" width="120" height="20" viewBox="0 0 120 20" fill="none" aria-hidden="true">
                <line x1="0" y1="10" x2="50" y2="10" stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.2" />
                <path d="M55 10 L60 5 L65 10 L60 15 Z" fill={GOLD} opacity="0.25" />
                <line x1="70" y1="10" x2="120" y2="10" stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.2" />
              </svg>

              <p
                className="font-playfair italic mb-3"
                style={{ fontSize: "clamp(18px, 2.2vw, 24px)", color: "rgba(237,230,219,0.7)", lineHeight: 1.4 }}
              >
                Agora que você viu o mapa,<br />
                a pergunta é: o que você faz com ele?
              </p>
              <p className="font-inter" style={{ fontSize: "13px", color: DIM, maxWidth: "480px", margin: "0 auto", lineHeight: 1.8 }}>
                O diagnóstico mostrou onde você sustenta e onde vaza. Mas clareza sozinha não resolve. 
                Você precisa de um sistema que sustente o que acabou de ver — sem depender de pico, disciplina ou força de vontade.
              </p>
            </div>

            {/* Portal Reset — apresentação */}
            <div className="mb-12">
              <Kicker>Portal Reset Mental®</Kicker>
              <GoldBar />
              <h3
                className="font-playfair font-bold mb-4"
                style={{ fontSize: "clamp(22px, 2.8vw, 30px)", lineHeight: 1.15, color: CREAM }}
              >
                O sistema que transforma consciência<br />
                <span style={{ color: GOLD }}>em sustentação real.</span>
              </h3>
              <p className="font-inter leading-[1.85] mb-3" style={{ fontSize: "clamp(13.5px, 1.4vw, 15px)", color: MUTED }}>
                {offer.aberturaCopy}
              </p>
            </div>

            {/* O que você acessa — cards premium */}
            <Kicker>O que está dentro</Kicker>
            <GoldBar />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
              {offer.destaques.map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: `1px solid ${BORDER}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${GOLD}40`;
                    e.currentTarget.style.background = "rgba(200,184,112,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = BORDER;
                    e.currentTarget.style.background = "rgba(255,255,255,0.025)";
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${GOLD}12`, border: `1px solid ${GOLD}20` }}
                    >
                      <IconMap icon={item.icon} color={GOLD} />
                    </div>
                    <span className="font-inter font-semibold" style={{ fontSize: "13px", color: GOLD }}>
                      {item.nome}
                    </span>
                  </div>
                  <p className="font-inter leading-relaxed" style={{ fontSize: "12.5px", color: DIM }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Ancoragem de preço — comparação visual */}
            <div className="text-center mb-10">
              <p
                className="font-playfair italic mb-8"
                style={{ fontSize: "clamp(15px, 1.7vw, 18px)", color: "rgba(237,230,219,0.5)" }}
              >
                {arquetipo.primeiroPassoTexto}
              </p>

              {/* Comparação: mercado vs Portal Reset */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
              >
                <div className="p-5 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${BORDER}` }}>
                  <p className="font-inter uppercase mb-2" style={{ fontSize: "9px", letterSpacing: "0.3em", color: DIM }}>Mercado</p>
                  <p className="font-playfair font-bold line-through" style={{ fontSize: "28px", color: "rgba(237,230,219,0.3)" }}>R$500</p>
                  <p className="font-inter" style={{ fontSize: "11px", color: DIM }}>/sessão individual</p>
                </div>
                <div className="p-5 rounded-xl text-center" style={{ background: "rgba(200,184,112,0.06)", border: `1px solid rgba(200,184,112,0.25)` }}>
                  <p className="font-inter uppercase mb-2" style={{ fontSize: "9px", letterSpacing: "0.3em", color: GOLD }}>Portal Reset</p>
                  <p className="font-playfair font-bold" style={{ fontSize: "28px", color: CREAM }}>R$47</p>
                  <p className="font-inter" style={{ fontSize: "11px", color: "rgba(200,184,112,0.6)" }}>/mês · acesso completo</p>
                </div>
              </div>

              {/* Selo Fundadora */}
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" style={{ background: "rgba(200,184,112,0.08)", border: `1px solid rgba(200,184,112,0.2)` }}>
                <Sparkles size={13} color={GOLD} />
                <span className="font-inter uppercase" style={{ fontSize: "9.5px", letterSpacing: "0.25em", color: GOLD }}>Acesso Fundadora · 200 vagas</span>
              </div>

              <p
                className="font-inter uppercase mb-2"
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

              {/* Value stack */}
              <div
                className="inline-block px-6 py-4 rounded-xl mb-6 text-left"
                style={{ background: "rgba(200,184,112,0.04)", border: `1px solid ${BORDER}` }}
              >
                {[
                  "3 mentoras de IA · acesso 24/7",
                  "10 portais com rituais guiados",
                  "Diário de frequência + progresso",
                  "Diagnóstico personalizado incluso",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GOLD, opacity: 0.5 }} />
                    <p className="font-inter" style={{ fontSize: "11.5px", color: MUTED }}>{item}</p>
                  </div>
                ))}
              </div>

              {/* Preço */}
              <div className="mb-8">
                <div className="flex items-end justify-center gap-1.5">
                  <span
                    className="font-playfair font-bold"
                    style={{ fontSize: "clamp(52px, 7vw, 72px)", lineHeight: 1, color: CREAM }}
                  >
                    R$47
                  </span>
                  <span className="font-inter mb-2" style={{ fontSize: "14px", color: DIM }}>
                    /mês
                  </span>
                </div>
                <p className="font-inter mt-2" style={{ fontSize: "12px", color: "rgba(200,184,112,0.5)" }}>
                  Economia de até 92% comparado a sessões individuais
                </p>
                <p className="font-inter mt-1" style={{ fontSize: "11px", color: "rgba(200,184,112,0.38)" }}>
                  Cancele quando quiser. Sem fidelidade. Sem contrato.
                </p>
              </div>

              {/* CTA button */}
              <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" onClick={() => onCheckoutClick("primary")} className="inline-block w-full max-w-sm">
                <button
                  className="font-inter font-semibold uppercase tracking-[0.2em] inline-flex items-center justify-center gap-3 transition-all duration-300 w-full"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD} 0%, #b88a3a 50%, #983D06 100%)`,
                    color: BG_DARK,
                    borderRadius: "8px",
                    border: `1px solid rgba(200,184,112,0.45)`,
                    boxShadow: "0 4px 28px -4px rgba(46,139,87,0.45)",
                    height: "58px",
                    paddingLeft: "32px",
                    paddingRight: "32px",
                    fontSize: "12px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 32px -4px rgba(46,139,87,0.5), 0 0 40px -8px rgba(200,184,112,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 28px -4px rgba(46,139,87,0.45)";
                  }}
                >
                  {offer.ctaLabel}
                  <ArrowRight size={14} />
                </button>
              </a>

              <p className="font-inter mt-4" style={{ fontSize: "10.5px", color: DIM }}>
                Acesso imediato após confirmação do pagamento.
              </p>

              {/* Garantia / confiança — melhorada */}
              <div
                className="mt-8 p-5 rounded-xl flex items-start gap-4"
                style={{ background: "rgba(200,184,112,0.04)", border: `1px solid rgba(200,184,112,0.15)` }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(200,184,112,0.1)", border: `1px solid rgba(200,184,112,0.2)` }}>
                  <Shield size={18} color={GOLD} />
                </div>
                <div>
                  <p className="font-inter font-semibold mb-1" style={{ fontSize: "12px", color: CREAM }}>
                    30 dias de garantia integral
                  </p>
                  <p className="font-inter text-left" style={{ fontSize: "11px", color: DIM, lineHeight: 1.7 }}>
                    Explore o diagnóstico, as mentoras e os portais. Se não fizer sentido, devolvemos tudo — sem perguntas, sem burocracia.
                  </p>
                </div>
              </div>

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
            </div>
          </motion.section>

          {/* Footer */}
          <div className="mt-8 pt-5" style={{ borderTop: `1px solid ${BORDER}` }}>
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
        </div>
      </div>

      {/* ═══ Share Modal ═══ */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.85)" }}
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative flex flex-col items-center gap-4 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-xl overflow-hidden shadow-2xl" style={{ border: `1px solid ${BORDER}` }}>
                <ShareCard ref={shareCardRef} data={data} userName={userName} />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleShare}
                  className="font-inter font-semibold uppercase tracking-[0.15em] flex items-center gap-2 px-6 py-3 rounded-lg transition-all"
                  style={{
                    background: "linear-gradient(135deg, #C8B870 0%, #b88a3a 50%, #983D06 100%)",
                    color: BG_DARK,
                    fontSize: "11px",
                    border: "1px solid rgba(200,184,112,0.45)",
                  }}
                >
                  <Download size={13} />
                  Salvar como imagem
                </button>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="font-inter uppercase tracking-[0.15em] px-5 py-3 rounded-lg transition-opacity hover:opacity-70"
                  style={{ fontSize: "11px", color: DIM, border: `1px solid ${BORDER}`, background: "transparent" }}
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showStickyCta && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
            style={{ background: `linear-gradient(to top, ${BG_DARK} 70%, transparent)`, padding: "24px 16px 16px" }}
          >
            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" onClick={() => onCheckoutClick("sticky")} className="block">
              <button
                className="font-inter font-semibold uppercase tracking-[0.18em] w-full flex items-center justify-center gap-2.5"
                style={{
                  background: "linear-gradient(135deg, #C8B870 0%, #b88a3a 50%, #983D06 100%)",
                  color: BG_DARK,
                  borderRadius: "8px",
                  border: "1px solid rgba(200,184,112,0.45)",
                  boxShadow: "0 4px 24px -4px rgba(46,139,87,0.5)",
                  height: "52px",
                  fontSize: "11.5px",
                }}
              >
                {offer.ctaLabel}
                <ArrowRight size={14} />
              </button>
            </a>
            <p className="font-inter text-center mt-2" style={{ fontSize: "9.5px", color: "rgba(200,184,112,0.4)" }}>
              R$47/mês · 30 dias de garantia
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiagnosticoResult;
