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
  buildCtaParams,
  type EspelhoData,
} from "@/data/espelhoEngine";

interface DiagnosticoResultProps {
  scores: number[];
  userName: string;
  answers?: (number | null)[];
}

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const DiagnosticoResult = ({ scores, userName, answers }: DiagnosticoResultProps) => {
  const data: EspelhoData = answers
    ? computeEspelho(answers)
    : computeEspelho(scores.flatMap((s) => [s, s]));

  const editorial = generateEditorialDiagnostic(data);
  const plan = generate7DayPlan(data);
  const ctaParams = buildCtaParams(data);

  const top3Indices = data.top3.map((a) => a.index);
  const bottom3Indices = data.bottom3.map((a) => a.index);

  const handleDownloadPDF = async () => {
    await generateDiagnosticoPDF(data, userName, "radar-chart-pdf");
  };

  const handleCta = () => {
    window.open(`https://pay.kiwify.com.br/TNXfTZT${ctaParams}`, "_blank");
  };

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-[720px] mx-auto">
        {/* ===== PARTE A ===== */}

        {/* Header */}
        <motion.div initial="hidden" animate="visible" custom={0} variants={fade}>
          <p className="kicker mb-4 text-center">Resultado</p>
          <h1
            className="font-playfair font-bold text-center uppercase"
            style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.08, letterSpacing: "0.1em" }}
          >
            Espelho da Clareza
          </h1>
          <p
            className="text-center mt-2 text-sm"
            style={{ color: "hsl(var(--graphite) / 0.55)" }}
          >
            Mapa do seu padrão atual
          </p>
          {userName && (
            <p className="text-center mt-2 font-playfair text-lg" style={{ color: "hsl(var(--graphite) / 0.6)" }}>
              {userName}
            </p>
          )}
        </motion.div>

        {/* Bloco 1: Diagnóstico editorial */}
        <motion.div initial="hidden" animate="visible" custom={1} variants={fade} className="mt-12">
          <p className="kicker mb-3">Seu padrão</p>
          <p
            className="text-[15px] leading-relaxed"
            style={{ color: "hsl(var(--graphite) / 0.78)" }}
          >
            {editorial}
          </p>
          <p
            className="text-sm mt-2 italic font-playfair"
            style={{ color: "hsl(var(--graphite) / 0.45)" }}
          >
            Um retrato do seu padrão recente, sem julgamento.
          </p>
        </motion.div>

        {/* Bloco 2: Mandala */}
        <motion.div initial="hidden" animate="visible" custom={2} variants={fade} className="mt-12">
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

        {/* Bloco 3: Base e Vazamento */}
        <motion.div initial="hidden" animate="visible" custom={3} variants={fade} className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Zonas de base */}
            <div>
              <p className="kicker mb-3" style={{ color: "hsl(30 55% 48%)" }}>Zonas de base</p>
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

            {/* Zonas de vazamento */}
            <div>
              <p className="kicker mb-3" style={{ color: "hsl(215 12% 32%)" }}>Zonas de vazamento</p>
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

        {/* Bloco 4: Conflito central */}
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

        {/* Bloco 5: Plano de 7 dias */}
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
            Seu foco esta semana é estabilizar {data.bottom3[0].label}, {data.bottom3[1].label} e reduzir a tensão em{" "}
            {data.centralAxis.label}. Proteja {data.top3[0].label} para não virar sobrecarga.
          </p>
        </motion.div>

        {/* ===== PARTE B ===== */}

        <div className="editorial-divider mt-16 mb-12" />

        {/* Dobra: Não foi um teste */}
        <motion.div initial="hidden" animate="visible" custom={6} variants={fade}>
          <h2
            className="font-playfair font-bold"
            style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.1 }}
          >
            Isso não foi um teste. Foi um espelho.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "hsl(var(--graphite) / 0.72)" }}>
            O que você acabou de ver não é um diagnóstico para corrigir. É um retrato do padrão que opera quando você não
            está escolhendo. Clareza sem sustentação vira mais um pico que some. O próximo passo não é intensidade — é
            retorno.
          </p>
        </motion.div>

        {/* Dobra: Sustentar esse retorno */}
        <motion.div initial="hidden" animate="visible" custom={7} variants={fade} className="mt-12">
          <h2
            className="font-playfair font-bold"
            style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.1 }}
          >
            Se você quer sustentar esse retorno, o caminho é simples.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "hsl(var(--graphite) / 0.72)" }}>
            O Portal Reset existe para transformar esse mapa em prática diária, sem depender de intensidade.
          </p>
        </motion.div>

        {/* Botões finais */}
        <motion.div initial="hidden" animate="visible" custom={8} variants={fade} className="mt-12 text-center space-y-4">
          <Button variant="cta" size="xl" onClick={handleCta} className="gap-2">
            Receber plano de ação
            <ArrowRight className="w-4 h-4" />
          </Button>
          <div>
            <Button variant="editorialOutline" size="lg" onClick={handleDownloadPDF} className="gap-2">
              <Download className="w-4 h-4" />
              Baixar PDF
            </Button>
          </div>
        </motion.div>

        <div className="h-20" />
      </div>
    </div>
  );
};

export default DiagnosticoResult;
