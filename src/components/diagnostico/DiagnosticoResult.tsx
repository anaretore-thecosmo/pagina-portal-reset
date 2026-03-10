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
                  Eixo {axis.axis}
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

          {/* ── Virada: seção de oferta com fundo escuro ── */}
          <div
            className="mt-10 -mx-6 px-6 pt-10 pb-2 sm:-mx-0 sm:rounded-2xl"
            style={{ background: "#08090D" }}
          >
            {/* O que o Portal Reset entrega */}
            <p className="font-inter uppercase mb-5" style={{ fontSize: "10px", letterSpacing: "0.4em", color: "rgba(200,184,112,0.6)" }}>
              O que o Portal Reset entrega
            </p>
            <div className="space-y-3">
              {[
                { nome: "Jornada", desc: "10 dias com rituais diários guiados" },
                { nome: "Ayra", desc: "mentora de consciência com IA (chat livre)" },
                { nome: "Cléo", desc: "mentora de poder e magnetismo (10 lições)" },
                { nome: "Círculo", desc: "diário de frequência com tags de energia" },
                { nome: "Galeria Alquímica", desc: "geração de imagem com IA" },
                { nome: "Sistema", desc: "pontos, níveis e conquistas" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-baseline">
                  <span
                    className="font-inter font-semibold text-sm shrink-0"
                    style={{ color: "#C8B870" }}
                  >
                    {item.nome}
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(207,197,184,0.6)" }}>
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>

            {/* Cléo bloco */}
            <div
              className="mt-8 p-5 rounded-xl"
              style={{
                background: "rgba(200,184,112,0.06)",
                border: "1px solid rgba(200,184,112,0.18)",
              }}
            >
              <p className="font-inter uppercase mb-2" style={{ fontSize: "9px", letterSpacing: "0.35em", color: "#C8B870" }}>
                Sobre Cléo
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(207,197,184,0.65)" }}>
                {arquetipo.cleoBloco}
              </p>
            </div>

            {/* Primeiro passo */}
            <p
              className="mt-8 text-[15px] leading-relaxed font-medium text-center"
              style={{ color: "rgba(237,230,219,0.75)" }}
            >
              {arquetipo.primeiroPassoTexto}
            </p>
          </div>
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
                ENTRAR NO PORTAL RESET
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>

            <p className="text-xs mt-4" style={{ color: "rgba(207,197,184,0.35)" }}>
              Acesso imediato após confirmação do pagamento.
            </p>

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
