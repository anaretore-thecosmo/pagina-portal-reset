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
  scores: number[];
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

const DiagnosticoResult = ({ scores, userName, answers }: DiagnosticoResultProps) => {
  const data: EspelhoData = answers
    ? computeEspelho(answers)
    : computeEspelho(scores.flatMap((s) => [s, s]));

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
          <div className="flex items-start justify-between">
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
            <Button variant="editorialOutline" size="sm" onClick={handleDownloadPDF} className="gap-2 shrink-0 mt-2">
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
                      <span className="text-sm font-medium">Eixo {axis.axis}</span>
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
                      <span className="text-sm font-medium">Eixo {axis.axis}</span>
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
              Eixo {data.centralAxis.axis}
              <span className="text-sm font-inter font-normal ml-2" style={{ color: "hsl(var(--graphite) / 0.5)" }}>
                tensão {data.centralAxis.tension.toFixed(0)}
              </span>
            </p>
            <p className="text-sm mt-2" style={{ color: "hsl(var(--graphite) / 0.68)" }}>
              {data.centralAxis.clinical > data.centralAxis.symbolic
                ? `No Eixo ${data.centralAxis.axis}, você executa mais do que sente. A ação corre na frente da presença.`
                : data.centralAxis.clinical < data.centralAxis.symbolic
                  ? `No Eixo ${data.centralAxis.axis}, você sente mais do que consegue sustentar. A percepção existe, mas falta chão.`
                  : `No Eixo ${data.centralAxis.axis}, existe uma oscilação entre sentir e agir. O ponto de equilíbrio ainda não estabilizou.`}
            </p>
          </div>
        </motion.div>

        {/* ===== BLOCO 5: PLANO DE 7 DIAS ===== */}
        <motion.div initial="hidden" animate="visible" custom={5} variants={fade} className="mt-12">
          <p className="kicker mb-2">Plano de sustentação leve · 7 dias</p>
          <p className="text-xs mb-4" style={{ color: "hsl(var(--graphite) / 0.5)" }}>
            3 minutos por dia. Sem teatro. Sem pico.
          </p>
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
            Seu foco esta semana é estabilizar Eixo {data.bottom3[0].axis} e Eixo {data.bottom3[1].axis}, e reduzir a tensão no Eixo{" "}
            {data.centralAxis.axis}. Proteja Eixo {data.top3[0].axis} para não virar sobrecarga.
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

          {/* Ferramentas do app */}
          <div className="mt-8">
            <p className="kicker mb-4" style={{ color: "hsl(var(--graphite) / 0.5)" }}>
              O que o Portal Reset entrega para você
            </p>
            <div className="space-y-2">
              {[
                "Jornada de 10 dias com rituais diários guiados",
                "Ayra — mentora de consciência com IA (chat livre)",
                "Cléo — mentora de poder e magnetismo (10 lições)",
                "Círculo — diário de frequência com tags de energia",
                "Galeria Alquímica — geração de imagem com IA",
                "Sistema de pontos, níveis e conquistas",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-center text-sm py-2 border-b"
                  style={{
                    borderColor: "hsl(var(--graphite) / 0.06)",
                    color: "hsl(var(--graphite) / 0.7)",
                  }}
                >
                  <span style={{ color: theme.accent }}>—</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Cléo bloco */}
          <div
            className="mt-8 p-5 rounded-2xl"
            style={{
              background: "hsl(var(--matte-gold) / 0.06)",
              border: "1px solid hsl(var(--matte-gold) / 0.2)",
            }}
          >
            <p className="kicker mb-2" style={{ color: "hsl(var(--matte-gold))" }}>
              Sobre Cléo
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--graphite) / 0.72)" }}>
              {arquetipo.cleoBloco}
            </p>
          </div>

          {/* Primeiro passo */}
          <p
            className="mt-8 text-[15px] leading-relaxed font-medium text-center"
            style={{ color: "hsl(var(--graphite) / 0.78)" }}
          >
            {arquetipo.primeiroPassoTexto}
          </p>
        </motion.div>

        {/* ===== CTA FINAL ===== */}
        <motion.div initial="hidden" animate="visible" custom={7} variants={fade} className="mt-12 text-center">
          <p
            className="font-playfair font-semibold text-lg mb-2"
            style={{ color: "hsl(var(--graphite) / 0.7)" }}
          >
            Sua jornada começa agora.
          </p>
          <p className="text-sm mb-6" style={{ color: "hsl(var(--graphite) / 0.5)" }}>
            Portal Reset · R$47/mês · Cancele quando quiser.
          </p>
          <a href={KIWIFY_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="cta" size="xl" className="gap-2">
              ENTRAR NO PORTAL RESET
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </motion.div>

        {/* Author credit */}
        <div className="mt-16 pt-4" style={{ borderTop: '1px solid hsl(var(--matte-gold) / 0.15)' }}>
          <p className="font-inter text-[11px] md:text-[12px] text-left" style={{ color: 'hsl(var(--graphite) / 0.65)' }}>
            © Ana Retore. Todos os direitos de design e copy reservados.
          </p>
        </div>

        <div className="h-20" />
      </div>
    </div>
  );
};

export default DiagnosticoResult;
