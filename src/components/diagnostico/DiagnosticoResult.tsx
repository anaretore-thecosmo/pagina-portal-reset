import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import DiagnosticoRadarChart from "./DiagnosticoRadarChart";
import { generateDiagnosticoPDF } from "@/components/diagnostico/diagnosticoPdfGenerator";
import {
  computeEspelho,
  generateEditorialDiagnostic,
  generate7DayPlan,
  getAxisMicro,
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

const DiagnosticoResult = ({ scores, userName, answers, sessionId }: DiagnosticoResultProps) => {
  const nav = useNavigate();
  const data: EspelhoData = answers
    ? computeEspelho(answers)
    : computeEspelho(scores.flatMap((s) => [s, s]));

  const editorial = generateEditorialDiagnostic(data);
  const plan = generate7DayPlan(data);

  const top3Indices = data.top3.map((a) => a.index);
  const bottom3Indices = data.bottom3.map((a) => a.index);

  const handleDownloadPDF = async () => {
    await generateDiagnosticoPDF(data, userName, "radar-chart-pdf");
  };

  const handleCta = () => {
    nav("/portal-reset", { state: { scores, answers } });
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

        {/* ===== FECHAMENTO + CTA ===== */}
        <div className="editorial-divider mt-16 mb-12" />

        <motion.div initial="hidden" animate="visible" custom={6} variants={fade}>
          <p
            className="font-playfair font-semibold text-center text-lg"
            style={{ color: "hsl(var(--graphite) / 0.7)" }}
          >
            Você não precisa de mais consciência.<br />
            Precisa de sustentação aplicada.
          </p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" custom={7} variants={fade} className="mt-10 text-center">
          <Button variant="cta" size="xl" onClick={handleCta} className="gap-2">
            Entrar no Portal Reset
            <ArrowRight className="w-4 h-4" />
          </Button>
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
