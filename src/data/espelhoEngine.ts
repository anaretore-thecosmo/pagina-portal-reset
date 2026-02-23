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

/* ── Editorial diagnostic text (4 paragraphs) ──────── */

export function generateEditorialDiagnostic(data: EspelhoData): string[] {
  const { top3, bottom3, centralAxis, axes, overallMean } = data;

  const axesAbove7 = axes.filter((a) => a.mean >= 7).length;
  const axesBelow4 = axes.filter((a) => a.mean < 4).length;
  const avgTension = axes.reduce((s, a) => s + a.tension, 0) / axes.length;

  // ── P1 — Panorama ──
  let clima: string;
  if (axesAbove7 >= 8) {
    clima = "Seu padrão atual tem base sólida na maioria dos eixos. A estrutura existe — o risco agora não é fragilidade, é sobrecarga silenciosa.";
  } else if (axesBelow4 >= 6) {
    clima = "Seu padrão revela um custo alto de operação. Não é falta de capacidade — é excesso de demanda sem retorno proporcional. O sistema está funcionando, mas no limite.";
  } else if (avgTension >= 3) {
    clima = `Há acesso e há custo. ${axesAbove7} eixos operam acima do ruído, ${axesBelow4} estão abaixo da linha de sustentação, e a tensão média entre sentir e agir é alta. O padrão não é estável — oscila.`;
  } else {
    clima = `Seu mapa mostra ${axesAbove7} eixos com base firme e ${axesBelow4} em zona de dispersão. A tensão interna é moderada, o que significa que há margem para estabilizar sem forçar intensidade.`;
  }

  // ── P2 — Onde você está acima do ruído ──
  const t1 = top3[0];
  const t2 = top3[1];
  const t3 = top3[2];
  const t1m = getAxisMicro(t1.type);
  const t2m = getAxisMicro(t2.type);

  let p2 = `${t1.label}, ${t2.label} e ${t3.label} são suas zonas de base — onde o padrão opera com mais estabilidade.`;
  if (t1.type === "EXCELENCIA" || t1.type === "BASE_ESTAVEL") {
    p2 += ` Em ${t1.label}, ${t1m.micro.toLowerCase()} O ponto de atenção aqui é não transformar base em sobrecarga: proteger é diferente de exigir mais.`;
  }
  if (t2.type === "EXCELENCIA" || t2.type === "BASE_ESTAVEL") {
    p2 += ` ${t2.label} também sustenta — ${t2m.micro.toLowerCase()}`;
  } else {
    p2 += ` Em ${t2.label}, a estabilidade existe mas oscila. Precisa de manutenção, não de intensidade.`;
  }

  // ── P3 — Onde o automático está ganhando ──
  const b1 = bottom3[0];
  const b2 = bottom3[1];
  const b3 = bottom3[2];

  let p3 = `${b1.label}, ${b2.label} e ${b3.label} são os pontos onde a energia se dispersa com mais facilidade.`;
  for (const b of [b1, b2]) {
    const micro = getAxisMicro(b.type);
    if (b.type === "APAGAMENTO") {
      p3 += ` Em ${b.label}, o ruído está ocupando o espaço da escolha. O caminho é retorno — não correção. Comece pelo mínimo sustentável.`;
    } else if (b.type === "EXECUTA_SEM_SI") {
      p3 += ` Em ${b.label}, você executa, mas se perde no processo. Antes de dizer sim, insira uma pausa: a ação sem presença vira custo.`;
    } else if (b.type === "SENTE_SEM_ESTRUTURA") {
      p3 += ` Em ${b.label}, a percepção existe mas falta chão. Decisão mínima e ambiente facilitador são o primeiro passo.`;
    } else {
      p3 += ` Em ${b.label}, ${micro.micro.toLowerCase()}`;
    }
  }

  // ── P4 — A virada ──
  const conflictDir =
    centralAxis.clinical > centralAxis.symbolic
      ? `você executa mais do que sente — a ação corre na frente da presença`
      : centralAxis.clinical < centralAxis.symbolic
        ? `você sente mais do que consegue sustentar — a percepção existe, mas falta chão para ela`
        : `existe oscilação entre sentir e agir — o ponto de equilíbrio ainda não estabilizou`;

  const p4 = `O conflito central do seu padrão está em ${centralAxis.label}: ${conflictDir}. Essa é a tensão que mais consome energia sem que você perceba. O próximo passo não é mudar tudo — é estabilizar o que já sustenta e reduzir o vazamento onde a energia se perde sem retorno. Clareza sem sustentação vira mais um pico que some. O caminho é retorno, não intensidade.`;

  return [clima, p2, p3, p4];
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

/* ── Profile name mapping ───────────────────────────── */

export interface PerfilData {
  nome: string;
  dorRaiz: string;
  recomendacao: string;
}

const perfilMap: Record<AxisType, PerfilData> = {
  APAGAMENTO: {
    nome: "Modo Sobrevivência Ativo",
    dorRaiz: "Você está operando no limite — e o custo disso é invisível até que o corpo cobra.",
    recomendacao: "Comece pelo Código de Retorno. Antes de agir, volte para si.",
  },
  EXECUTA_SEM_SI: {
    nome: "Alta Performance sem Presença",
    dorRaiz: "Você entrega, resolve, sustenta — mas se perde no processo. A ação virou automático.",
    recomendacao: "Comece pelo Código de Pausa. Insira presença antes da próxima entrega.",
  },
  SENTE_SEM_ESTRUTURA: {
    nome: "Consciência sem Chão",
    dorRaiz: "Você percebe tudo, mas não consegue sustentar o que sente. Falta estrutura, não sensibilidade.",
    recomendacao: "Comece pelo Código de Estrutura. Decisão mínima, ambiente facilitador.",
  },
  OSCILACAO: {
    nome: "Ciclo de Picos e Quedas",
    dorRaiz: "Você alterna entre clareza e dispersão. O padrão não estabiliza — oscila.",
    recomendacao: "Comece pelo Código de Estabilização. Reduza o custo mental antes de buscar mais.",
  },
  BASE_ESTAVEL: {
    nome: "Base Presente, Risco de Sobrecarga",
    dorRaiz: "A estrutura existe — mas o risco agora é exigir demais do que já funciona.",
    recomendacao: "Comece pelo Código de Proteção. Sustente sem forçar intensidade.",
  },
  EXCELENCIA: {
    nome: "Acesso Pleno ao Padrão",
    dorRaiz: "Você está acima do ruído. O desafio agora é manter sem criar um novo teto.",
    recomendacao: "Comece pelo Código de Expansão. Proteja o que sustenta e explore o próximo nível.",
  },
};

export function getPerfilName(data: EspelhoData): PerfilData {
  // Count dominant types
  const typeCounts: Record<AxisType, number> = {
    EXCELENCIA: 0, BASE_ESTAVEL: 0, APAGAMENTO: 0,
    EXECUTA_SEM_SI: 0, SENTE_SEM_ESTRUTURA: 0, OSCILACAO: 0,
  };
  data.axes.forEach((a) => typeCounts[a.type]++);

  // Dominant = most frequent type; tiebreak: bottom3's dominant type
  const bottom3Types = data.bottom3.map((a) => a.type);
  const sorted = (Object.entries(typeCounts) as [AxisType, number][])
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      const aInBottom = bottom3Types.filter((t) => t === a[0]).length;
      const bInBottom = bottom3Types.filter((t) => t === b[0]).length;
      return bInBottom - aInBottom;
    });

  return perfilMap[sorted[0][0]];
}

/* ── CTA params builder ─────────────────────────────── */

export function buildCtaParams(data: EspelhoData): string {
  const m = data.axes.map((a) => a.mean.toFixed(1)).join(",");
  const t = data.top3.map((a) => a.index).join(",");
  const b = data.bottom3.map((a) => a.index).join(",");
  const c = data.centralAxis.index;
  return `?m=${m}&t=${t}&b=${b}&c=${c}`;
}
