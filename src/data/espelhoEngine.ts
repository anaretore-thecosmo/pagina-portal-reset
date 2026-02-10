import { dimensionLabels, diagnosticoQuestions } from "@/data/diagnosticoQuestions";

/* ── Types ──────────────────────────────────────────── */

export type AxisType =
  | "EXCELENCIA"
  | "BASE_ESTAVEL"
  | "APAGAMENTO"
  | "EXECUTA_SEM_SI"
  | "SENTE_SEM_ESTRUTURA"
  | "OSCILACAO";

export interface AxisData {
  index: number;       // 0-based
  axis: number;        // 1-based
  label: string;
  clinical: number;    // normalized
  symbolic: number;    // normalized
  mean: number;
  tension: number;
  type: AxisType;
}

export interface EspelhoData {
  axes: AxisData[];
  top3: AxisData[];
  bottom3: AxisData[];
  centralAxis: AxisData;
  overallMean: number;
  rawAnswers: { id: string; value: number }[];
  normAnswers: { id: string; value: number }[];
}

/* ── Normalization ──────────────────────────────────── */
// Questions are phrased as frequency of noise/reactivity.
// Raw 9 = "almost always in noise" → normalized 1 (low stability).
// Raw 1 = "almost never in noise" → normalized 9 (high stability).

function normalize(rawValue: number): number {
  return 10 - rawValue;
}

/* ── Classification ─────────────────────────────────── */

function classifyAxis(clin: number, symb: number, tension: number): AxisType {
  // Extreme rules first
  if (clin === 9 && symb === 9) return "EXCELENCIA";
  if (clin >= 7 && symb >= 7) return "BASE_ESTAVEL";
  if (clin <= 3 && symb <= 3) return "APAGAMENTO";
  if (clin >= 7 && symb <= 3) return "EXECUTA_SEM_SI";
  if (clin <= 3 && symb >= 7) return "SENTE_SEM_ESTRUTURA";

  // Tension-based fallback (tension >= 4)
  if (tension >= 4) {
    return clin > symb ? "EXECUTA_SEM_SI" : "SENTE_SEM_ESTRUTURA";
  }

  return "OSCILACAO";
}

/* ── Core computation ───────────────────────────────── */

export function computeEspelho(answers: (number | null)[]): EspelhoData {
  // Build raw + norm answer arrays
  const rawAnswers = diagnosticoQuestions.map((q, i) => ({
    id: q.id,
    value: answers[i] ?? 5,
  }));

  const normAnswers = rawAnswers.map((a) => ({
    id: a.id,
    value: normalize(a.value),
  }));

  // Build 12 axes (each = pair of consecutive questions)
  const axes: AxisData[] = dimensionLabels.map((label, i) => {
    const clin = normAnswers[i * 2].value;     // odd question (clinical)
    const symb = normAnswers[i * 2 + 1].value; // even question (symbolic)
    const mean = (clin + symb) / 2;
    const tension = Math.abs(clin - symb);
    return {
      index: i,
      axis: i + 1,
      label,
      clinical: clin,
      symbolic: symb,
      mean,
      tension,
      type: classifyAxis(clin, symb, tension),
    };
  });

  // Overall mean
  const overallMean = axes.reduce((sum, a) => sum + a.mean, 0) / axes.length;

  // Rankings — tiebreakers: 1) primary sort, 2) higher tension, 3) lower index
  const sortedDesc = [...axes].sort(
    (a, b) => b.mean - a.mean || b.tension - a.tension || a.index - b.index
  );
  const sortedAsc = [...axes].sort(
    (a, b) => a.mean - b.mean || b.tension - a.tension || a.index - b.index
  );

  const top3 = sortedDesc.slice(0, 3);
  const bottom3 = sortedAsc.slice(0, 3);

  // Central axis = highest tension; tiebreak: lower mean, then lower index
  const centralAxis = [...axes].sort(
    (a, b) => b.tension - a.tension || a.mean - b.mean || a.index - b.index
  )[0];

  return { axes, top3, bottom3, centralAxis, overallMean, rawAnswers, normAnswers };
}

/* ── Microtexts ─────────────────────────────────────── */

const typeLabels: Record<AxisType, { title: string; micro: string }> = {
  EXCELENCIA: {
    title: "Excelência",
    micro: "PARABÉNS. Aqui você está acima do ruído. Sustente isso.",
  },
  BASE_ESTAVEL: {
    title: "Base estável",
    micro: "Aqui existe base. O foco é proteger, não exigir mais.",
  },
  APAGAMENTO: {
    title: "Apagamento",
    micro: "Aqui o ruído está ocupando espaço. Comece pelo mínimo.",
  },
  EXECUTA_SEM_SI: {
    title: "Executa sem si",
    micro: "Você consegue fazer, mas se perde de si. Traga retorno antes da ação.",
  },
  SENTE_SEM_ESTRUTURA: {
    title: "Sente sem estrutura",
    micro: "Você percebe, mas não sustenta. Precisa de estrutura leve, não força.",
  },
  OSCILACAO: {
    title: "Oscilação",
    micro: "Aqui há alternância. Reduzir custo mental estabiliza.",
  },
};

export function getAxisMicro(type: AxisType) {
  return typeLabels[type];
}

/* ── Editorial diagnostic text ──────────────────────── */

export function generateEditorialDiagnostic(data: EspelhoData): string {
  const { top3, bottom3, centralAxis } = data;
  const t1 = top3[0];
  const t2 = top3[1];
  const b1 = bottom3[0];
  const b2 = bottom3[1];

  const t1Micro = getAxisMicro(t1.type).micro;
  const b1Micro = getAxisMicro(b1.type).micro;

  const conflictDir =
    centralAxis.clinical > centralAxis.symbolic
      ? "você executa mais do que sente"
      : centralAxis.clinical < centralAxis.symbolic
        ? "você sente mais do que consegue sustentar"
        : "existe uma oscilação entre sentir e agir";

  return `Seu padrão atual revela uma estrutura com pontos de apoio e zonas que pedem atenção. ${t1.label} e ${t2.label} aparecem como suas áreas mais estáveis — ${t1Micro.toLowerCase()} Já ${b1.label} e ${b2.label} indicam os pontos onde a energia se dispersa com mais facilidade. ${b1Micro} O eixo de maior tensão é ${centralAxis.label}: ${conflictDir}. O próximo passo não é mudar tudo — é estabilizar o que já sustenta e reduzir o vazamento onde a energia se perde sem retorno.`;
}

/* ── 7-day plan ─────────────────────────────────────── */

export function generate7DayPlan(data: EspelhoData): string[] {
  const { bottom3, centralAxis, top3 } = data;
  const b1 = bottom3[0].label;
  const b2 = bottom3[1].label;
  const ca = centralAxis.label;
  const t1 = top3[0].label;

  return [
    `Dia 1 — Observe sem agir. Perceba em que momento do dia ${b1} pesa mais.`,
    `Dia 2 — Escolha uma micro-ação que proteja ${t1}. Algo que leva menos de 3 minutos.`,
    `Dia 3 — Identifique um momento onde ${ca} aparece como tensão. Apenas nomeie.`,
    `Dia 4 — Reduza uma decisão desnecessária. Simplifique algo pequeno na rotina.`,
    `Dia 5 — Dê espaço para ${b2}. Não resolva — apenas permita que exista.`,
    `Dia 6 — Repita a micro-ação do dia 2. Sustentação é repetição sem drama.`,
    `Dia 7 — Feche a semana nomeando o que mudou. Sem julgamento, sem meta.`,
  ];
}

/* ── CTA params builder ─────────────────────────────── */

export function buildCtaParams(data: EspelhoData): string {
  const m = data.axes.map((a) => a.mean.toFixed(1)).join(",");
  const t = data.top3.map((a) => a.index).join(",");
  const b = data.bottom3.map((a) => a.index).join(",");
  const c = data.centralAxis.index;
  return `?m=${m}&t=${t}&b=${b}&c=${c}`;
}
