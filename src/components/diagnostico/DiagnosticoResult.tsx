import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
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

interface DiagnosticoResultProps {
  scores?: number[];
  userName: string;
  answers?: (number | null)[];
  sessionId?: string;
}

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const ARQUETIPO_THEME: Record<string, {
  accent: string;
  accentLight: string;
  accentBorder: string;
  fase: string;
}> = {
  Curiosa: {
    accent: "hsl(150 28% 38%)",
    accentLight: "hsl(150 28% 38% / 0.08)",
    accentBorder: "hsl(150 28% 38% / 0.22)",
    fase: "Fase 1 — Curiosa",
  },
  Buscadora: {
    accent: "hsl(28 58% 44%)",
    accentLight: "hsl(28 58% 44% / 0.08)",
    accentBorder: "hsl(28 58% 44% / 0.22)",
    fase: "Fase 2 — Buscadora",
  },
  Estrategista: {
    accent: "hsl(215 38% 42%)",
    accentLight: "hsl(215 38% 42% / 0.08)",
    accentBorder: "hsl(215 38% 42% / 0.22)",
    fase: "Fase 3 — Estrategista",
  },
  Soberana: {
    accent: "hsl(var(--matte-gold))",
    accentLight: "hsl(var(--matte-gold) / 0.08)",
    accentBorder: "hsl(var(--matte-gold) / 0.22)",
    fase: "Fase 4 — Soberana",
  },
};

const KIWIFY_URL = "https://pay.kiwify.com.br/ns0fjIx";
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
      { nome: "10 Portais", desc: "uma jornada de autoconhecimento com rituais guiados, passo a passo" },
      { nome: "Ayra", desc: "mentora de consciência com IA — disponível para conversar a qualquer momento" },
      { nome: "Círculo", desc: "diário de frequência para registrar o que está vivo em você" },
      { nome: "Sistema", desc: "pontos, níveis e conquistas que sustentam o caminho" },
    ],
    ctaLabel: "COMEÇAR MINHA JORNADA",
  },
  Buscadora: {
    aberturaCopy: "Você já tentou. Já sabe o que precisa. O que escapa não é intenção — é sustentação. O Portal Reset não é mais um conteúdo para consumir. É um sistema para sustentar o que você já sabe.",
    destaques: [
      { nome: "Rituais guiados", desc: "10 portais com práticas curtas e repetíveis — sem depender de motivação" },
      { nome: "Círculo", desc: "diário de frequência que acompanha sua consistência sem julgamento" },
      { nome: "Ayra", desc: "mentora de consciência — para quando a mente acelera e você precisa de âncora" },
      { nome: "Sistema de progresso", desc: "estrutura visível que mostra que você está sustentando" },
    ],
    ctaLabel: "ENTRAR NO SISTEMA",
  },
  Estrategista: {
    aberturaCopy: "Você funciona. Entrega. Mas em algum ponto cobra um preço de si mesma que ninguém vê. O Portal Reset não é sobre começar — é sobre fechar o pacto com o que você já construiu.",
    destaques: [
      { nome: "Portal 10", desc: "Selando o Pacto com o Propósito — o ponto de chegada da jornada" },
      { nome: "Cléo", desc: "mentora de poder e magnetismo — 10 lições para quem já tem base e quer precisão" },
      { nome: "Galeria Alquímica", desc: "geração de imagem com IA para ancorar sua visão no campo simbólico" },
      { nome: "Ayra", desc: "mentora de consciência para refinar, não para explicar o básico" },
    ],
    ctaLabel: "FECHAR O PACTO",
  },
  Soberana: {
    aberturaCopy: "Você já tem base. O Portal Reset é o lugar de ancorar o que você já é — e sustentar a expansão sem sacrifício. Entre. E quando sentir que está pronta para um passo maior, o Plano A é a próxima conversa.",
    destaques: [
      { nome: "Cléo", desc: "mentora de poder pessoal — desbloqueada para você desde o início" },
      { nome: "Portal 10", desc: "Selando o Pacto com o Propósito — seu ponto de partida, não de chegada" },
      { nome: "Galeria Alquímica", desc: "geração de imagem com IA para materializar a frequência do que você está criando" },
      { nome: "Ayra", desc: "mentora de consciência disponível para conversas de refinamento" },
    ],
    ctaLabel: "ENTRAR NO PORTAL RESET",
    planoA: true,
  },
};

const DiagnosticoResult = ({ userName, answers }: DiagnosticoResultProps) => {
  const data: EspelhoData = computeEspelho(answers ?? []);

  const editorial = generateEditorialDiagnostic(data);
  const plan = generate7DayPlan(data);
  const arquetipo = getArquetipo(data);
  const theme = ARQUETIPO_THEME[arquetipo.nome];

  const top3Indices = data.top3.map((a) => a.index);
  const bottom3Indices = data.bottom3.map((a) => a.index);

  const handleDownloadPDF = async () => {
    await generateDiagnosticoPDF(data, userName, "radar-chart-pdf");
  };

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-[720px] mx-auto">

        {/* ===== HEADER ===== */}
        <motion.div initial="hidden" animate="visible" custom={0} variants={fade}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="kicker mb-4">Resultado</p>
              <h1
                className="font-playfair font-bold uppercase"
                style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.08, letterSpacing: "0.1em" }}
              >
                Espelho da Clareza
              </h1>
              <p
                className="mt-2 text-sm"
                style={{ color: "hsl(var(--graphite) / 0.55)" }}
              >
                O seu mapa de agora. Sem julgamento. Com direção.
              </p>
              {userName && (
                <p className="mt-2 font-playfair text-lg" style={{ color: "hsl(var(--graphite) / 0.6)" }}>
                  {userName}
                </p>
              )}
            </div>
            <Button variant="editorialOutline" size="sm" onClick={handleDownloadPDF} className="gap-2 shrink-0 self-start sm:mt-2">
              <Download className="w-4 h-4" />
              Baixar PDF
            </Button>
          </div>
        </motion.div>

        {/* ===== BLOCO 1: MANDALA ===== */}
        <motion.div initial="hidden" animate="visible" custom={1} variants={fade} className="mt-12">
          <p className="kicker mb-3">Mandala do padrão</p>
          <p className="text-xs mb-4" style={{ color: "hsl(var(--graphite) / 0.5)" }}>
            Quanto mais alta a fatia, mais estável está seu acesso naquele eixo interno.
          </p>
          <div className="editorial-card p-6">
            <DiagnosticoRadarChart
              scores={data.axes.map((a) => a.mean)}
              id="radar-chart-pdf"
              top3Indices={top3Indices}
              bottom3Indices={bottom3Indices}
              centralIndex={data.centralAxis.index}
            />
          </div>
        </motion.div>

        {/* ===== BLOCO 2: LEITURA EDITORIAL (4 parágrafos) ===== */}
        <motion.div initial="hidden" animate="visible" custom={2} variants={fade} className="mt-12">
          <p className="kicker mb-3">Seu padrão</p>

          {/* P1 — Panorama */}
          <p
            className="text-[15px] leading-relaxed"
            style={{ color: "hsl(var(--graphite) / 0.78)" }}
          >
            {editorial[0]}
          </p>

          {/* P2 — Acima do ruído */}
          <p
            className="text-[15px] leading-relaxed mt-4"
            style={{ color: "hsl(var(--graphite) / 0.78)" }}
          >
            {editorial[1]}
          </p>

          {/* P3 — Automático ganhando */}
          <p
            className="text-[15px] leading-relaxed mt-4"
            style={{ color: "hsl(var(--graphite) / 0.78)" }}
          >
            {editorial[2]}
          </p>

          {/* P4 — Virada */}
          <p
            className="text-[15px] leading-relaxed mt-4 font-medium"
            style={{ color: "hsl(var(--graphite) / 0.88)" }}
          >
            {editorial[3]}
          </p>
        </motion.div>

        {/* ===== BLOCO 3: TRÍADE DE BASE E VAZAMENTO ===== */}
        <motion.div initial="hidden" animate="visible" custom={3} variants={fade} className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Tríade de base */}
            <div>
              <p className="kicker mb-3" style={{ color: "hsl(30 55% 48%)" }}>Tríade de base</p>
              {data.top3.map((axis) => {
                const micro = getAxisMicro(axis.type);
                return (
                  <div
                    key={axis.index}
                    className="py-3 border-b"
                    style={{ borderColor: "hsl(var(--graphite) / 0.08)" }}
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-medium">{axis.label}</span>
                      <span className="font-playfair font-bold text-lg" style={{ color: "hsl(30 55% 48%)" }}>
                        {axis.mean.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs mt-1" style={{ color: "hsl(var(--graphite) / 0.55)" }}>
                      {micro.micro}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Tríade de vazamento */}
            <div>
              <p className="kicker mb-3" style={{ color: "hsl(215 12% 32%)" }}>Tríade de vazamento</p>
              {data.bottom3.map((axis) => {
                const micro = getAxisMicro(axis.type);
                return (
                  <div
                    key={axis.index}
                    className="py-3 border-b"
                    style={{ borderColor: "hsl(var(--graphite) / 0.08)" }}
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-medium">{axis.label}</span>
                      <span className="font-playfair font-bold text-lg" style={{ color: "hsl(215 12% 32%)" }}>
                        {axis.mean.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs mt-1" style={{ color: "hsl(var(--graphite) / 0.55)" }}>
                      {micro.micro}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ===== BLOCO 4: CONFLITO CENTRAL ===== */}
        <motion.div initial="hidden" animate="visible" custom={4} variants={fade} className="mt-12">
          <p className="kicker mb-3">Seu conflito central</p>
          <div
            className="p-5 rounded-2xl"
            style={{
              border: "1px solid hsl(80 20% 28% / 0.3)",
              background: "hsl(80 20% 28% / 0.06)",
            }}
          >
            <p className="font-playfair font-semibold text-lg" style={{ color: "hsl(var(--foreground))" }}>
              {data.centralAxis.label}
              <span className="text-sm font-inter font-normal ml-2" style={{ color: "hsl(var(--graphite) / 0.5)" }}>
                tensão {data.centralAxis.tension.toFixed(0)}
              </span>
            </p>
            <p className="text-sm mt-2" style={{ color: "hsl(var(--graphite) / 0.68)" }}>
              {data.centralAxis.clinical > data.centralAxis.symbolic
                ? `Em ${data.centralAxis.label}, você executa mais do que sente. A ação corre na frente da presença.`
                : data.centralAxis.clinical < data.centralAxis.symbolic
                  ? `Em ${data.centralAxis.label}, você sente mais do que consegue sustentar. A percepção existe, mas falta chão.`
                  : `Em ${data.centralAxis.label}, existe uma oscilação entre sentir e agir. O ponto de equilíbrio ainda não estabilizou.`}
            </p>
          </div>
        </motion.div>

        {/* ===== BLOCO 5: PLANO DE 7 DIAS ===== */}
        <motion.div initial="hidden" animate="visible" custom={5} variants={fade} className="mt-12">
          <p className="kicker mb-2">Plano de sustentação leve · 7 dias</p>
          <p className="text-xs mb-4" style={{ color: "hsl(var(--graphite) / 0.5)" }}>
            3 minutos por dia. Sem teatro. Sem pico.
          </p>

          {/* Mini legenda — referência rápida dos eixos citados no plano */}
          <div
            className="mb-5 p-4 rounded-xl flex flex-wrap gap-x-6 gap-y-2"
            style={{ background: "hsl(var(--graphite) / 0.04)", border: "1px solid hsl(var(--graphite) / 0.07)" }}
          >
            {[
              { axis: data.bottom3[0], tag: "vazamento" },
              { axis: data.bottom3[1], tag: "vazamento" },
              { axis: data.centralAxis, tag: "conflito central" },
              { axis: data.top3[0], tag: "base" },
            ].map(({ axis, tag }) => (
              <div key={axis.index} className="flex items-baseline gap-1.5">
                <span className="font-playfair font-bold text-sm" style={{ color: "hsl(var(--matte-gold))" }}>
                  {axis.label}
                </span>
                <span className="text-xs" style={{ color: "hsl(var(--graphite) / 0.55)" }}>
                  {getAxisMicro(axis.type).title}
                </span>
                <span
                  className="text-[10px] uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-full"
                  style={{ background: "hsl(var(--graphite) / 0.06)", color: "hsl(var(--graphite) / 0.4)" }}
                >
                  {tag}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {plan.map((day, i) => (
              <div
                key={i}
                className="flex gap-3 py-3 border-b text-sm"
                style={{ borderColor: "hsl(var(--graphite) / 0.06)", color: "hsl(var(--graphite) / 0.72)" }}
              >
                <span className="font-playfair font-bold shrink-0" style={{ color: "hsl(var(--matte-gold))" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{day.replace(/^Dia \d+ — /, "")}</span>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4 italic" style={{ color: "hsl(var(--graphite) / 0.5)" }}>
            Seu foco esta semana é estabilizar {data.bottom3[0].label} e {data.bottom3[1].label}, e reduzir a tensão em{" "}
            {data.centralAxis.label}. Proteja {data.top3[0].label} para não virar sobrecarga.
          </p>
        </motion.div>

        {/* ===== BLOCO 6: ARQUÉTIPO ===== */}
        <motion.div initial="hidden" animate="visible" custom={6} variants={fade} className="mt-16">
          <div className="editorial-divider mb-12" />

          {/* Fase label */}
          <p
            className="kicker mb-2"
            style={{ color: theme.accent }}
          >
            {theme.fase}
          </p>

          {/* Nome do arquétipo */}
          <h2
            className="font-playfair font-bold"
            style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "0.06em",
              color: theme.accent,
            }}
          >
            {arquetipo.nome}
          </h2>

          {/* Abertura */}
          <p
            className="mt-4 text-[16px] leading-relaxed font-medium"
            style={{ color: "hsl(var(--graphite) / 0.82)" }}
          >
            {arquetipo.abertura}
          </p>

          {/* Dor raiz */}
          <p
            className="mt-3 text-[15px] leading-relaxed"
            style={{ color: "hsl(var(--graphite) / 0.68)" }}
          >
            {arquetipo.dorRaiz}
          </p>

          {/* Sinais */}
          <div className="mt-8">
            <p className="kicker mb-4" style={{ color: "hsl(var(--graphite) / 0.5)" }}>
              Onde isso aparece em você
            </p>
            <div className="space-y-3">
              {(arquetipo.sinais as unknown as string[]).map((sinal: string, i: number) => (
                <div
                  key={i}
                  className="flex gap-3 items-start p-4 rounded-xl text-sm"
                  style={{
                    background: theme.accentLight,
                    border: `1px solid ${theme.accentBorder}`,
                    color: "hsl(var(--graphite) / 0.75)",
                  }}
                >
                  <span
                    className="font-playfair font-bold shrink-0 mt-0.5"
                    style={{ color: theme.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{sinal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ciclo recomendado + códigos */}
          <div
            className="mt-8 p-5 rounded-2xl"
            style={{
              background: theme.accentLight,
              border: `1px solid ${theme.accentBorder}`,
            }}
          >
            <p className="kicker mb-2" style={{ color: theme.accent }}>
              Seu ciclo no Portal Reset
            </p>
            <p className="font-playfair font-semibold text-base" style={{ color: "hsl(var(--foreground))" }}>
              {arquetipo.cicloRecomendado}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {arquetipo.codigosRecomendados.map((codigo: string) => (
                <span
                  key={codigo}
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{
                    background: theme.accentBorder,
                    color: theme.accent,
                  }}
                >
                  {codigo}
                </span>
              ))}
            </div>
          </div>

          {/* ── Oferta: variação por arquétipo ── */}
          {(() => {
            const offer = ARQUETIPO_OFFER[arquetipo.nome];
            return (
              <div
                className="mt-10 -mx-6 px-6 pt-10 pb-2 sm:-mx-0 sm:rounded-2xl"
                style={{ background: "#08090D" }}
              >
                {/* Abertura copy */}
                <p
                  className="text-[15px] leading-[1.85] mb-8"
                  style={{ color: "rgba(207,197,184,0.72)" }}
                >
                  {offer.aberturaCopy}
                </p>

                {/* Destaques */}
                <p className="font-inter uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.4em", color: "rgba(200,184,112,0.6)" }}>
                  O que você acessa
                </p>
                <div className="space-y-3 mb-8">
                  {offer.destaques.map((item, i) => (
                    <div key={i} className="flex gap-3 items-baseline">
                      <span className="font-inter font-semibold text-sm shrink-0" style={{ color: "#C8B870" }}>
                        {item.nome}
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: "rgba(207,197,184,0.6)" }}>
                        {item.desc}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Primeiro passo */}
                <p
                  className="text-[14px] leading-relaxed font-medium text-center mb-2"
                  style={{ color: "rgba(237,230,219,0.65)" }}
                >
                  {arquetipo.primeiroPassoTexto}
                </p>
              </div>
            );
          })()}
        </motion.div>

        {/* ===== CTA FINAL ===== */}
        <motion.div initial="hidden" animate="visible" custom={7} variants={fade}>
          <div
            className="-mx-6 px-6 pt-10 pb-10 sm:-mx-0 sm:rounded-b-2xl text-center"
            style={{ background: "#08090D" }}
          >
            {/* Gold rule */}
            <div className="w-10 h-px mx-auto mb-8" style={{ background: "rgba(200,184,112,0.3)" }} />

            <p className="font-inter uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.4em", color: "rgba(200,184,112,0.6)" }}>
              Portal Reset
            </p>
            <p
              className="font-playfair font-bold mb-3"
              style={{
                fontSize: "clamp(24px, 3vw, 34px)",
                lineHeight: 1.1,
                color: "#EDE6DB",
              }}
            >
              Sua jornada<br />começa agora.
            </p>
            <p
              className="text-sm mt-3 mb-10 max-w-sm mx-auto leading-relaxed"
              style={{ color: "rgba(207,197,184,0.55)" }}
            >
              Jornada de 10 dias com rituais diários, 3 mentoras de IA e um sistema de sustentação real — para quem já sabe que entender não é suficiente.
            </p>

            {/* Price block */}
            <div className="mb-8">
              <span
                className="font-playfair font-bold"
                style={{ fontSize: "clamp(48px, 6vw, 64px)", color: "#EDE6DB", lineHeight: 1 }}
              >
                R$47
              </span>
              <span className="text-base ml-1.5" style={{ color: "rgba(207,197,184,0.5)" }}>
                /mês
              </span>
              <p className="text-xs mt-2" style={{ color: "rgba(200,184,112,0.45)" }}>
                Cancele quando quiser. Sem fidelidade.
              </p>
            </div>

            <a href={KIWIFY_URL} target="_blank" rel="noopener noreferrer" className="block">
              <Button variant="cta" size="xl" className="gap-2 w-full max-w-xs mx-auto">
                {ARQUETIPO_OFFER[arquetipo.nome].ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>

            <p className="text-xs mt-4" style={{ color: "rgba(207,197,184,0.35)" }}>
              Acesso imediato após confirmação do pagamento.
            </p>

            {/* Plano A — apenas para Soberana */}
            {ARQUETIPO_OFFER[arquetipo.nome].planoA && (
              <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(200,184,112,0.08)" }}>
                <p className="text-xs mb-3" style={{ color: "rgba(207,197,184,0.4)" }}>
                  Se sentir que está pronta para um passo maior —
                </p>
                <a
                  href={PLANO_A_URL}
                  className="font-inter text-sm transition-opacity hover:opacity-80"
                  style={{ color: "rgba(200,184,112,0.6)", textDecoration: "underline", textUnderlineOffset: "3px" }}
                >
                  Quero saber sobre o Plano A →
                </a>
              </div>
            )}

            {/* Author credit dentro do bloco escuro */}
            <div className="mt-12 pt-4" style={{ borderTop: '1px solid rgba(200,184,112,0.1)' }}>
              <p className="font-inter text-[11px] text-center" style={{ color: 'rgba(207,197,184,0.3)' }}>
                © Ana Retore. Todos os direitos de design e copy reservados.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default DiagnosticoResult;
