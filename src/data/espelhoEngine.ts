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

/* ── Arquétipo (4 níveis) ───────────────────────────── */

export interface ArquetipoData {
  nome: 'Curiosa' | 'Buscadora' | 'Estrategista' | 'Soberana';
  abertura: string;
  dorRaiz: string;
  cicloRecomendado: string;
  codigosRecomendados: string[];
  sinais: (data: EspelhoData) => string[];
  primeiroPassoTexto: string;
  cleoBloco: string;
}

const arquetipos: Record<'Curiosa' | 'Buscadora' | 'Estrategista' | 'Soberana', Omit<ArquetipoData, 'sinais'> & { sinaisFactory: (data: EspelhoData) => string[] }> = {
  Curiosa: {
    nome: 'Curiosa',
    abertura: 'Você já sentiu o incômodo. Mas ainda não tem um mapa claro.',
    dorRaiz: 'O ruído está ocupando o espaço da escolha. Não é falta de força — é falta de código. O padrão ainda não tem forma, mas já tem custo.',
    cicloRecomendado: 'Ciclo Destrava — Códigos 01, 03 e 09',
    codigosRecomendados: ['Código 01', 'Código 03', 'Código 09'],
    sinaisFactory: (data) => [
      `Em ${data.bottom3[0].label}: o ruído ocupa mais espaço do que a escolha.`,
      `Em ${data.bottom3[1].label}: o automático ganhou do intencional.`,
      `Em ${data.bottom3[2].label}: a energia sai sem retorno proporcional.`,
    ],
    primeiroPassoTexto: 'Nomeie o padrão. Antes de mudar qualquer coisa, você precisa ver onde o custo está.',
    cleoBloco: 'Cléo não é bônus. É o próximo nível — e você chega lá pelo caminho, não pelo atalho.',
  },
  Buscadora: {
    nome: 'Buscadora',
    abertura: 'Você já entende que precisa mudar. Mas ainda perde consistência.',
    dorRaiz: 'Você já tentou. Já sabe o que precisa. O problema não é conhecimento — é sustentar o que você começa sem se punir quando oscila.',
    cicloRecomendado: 'Ciclo Recomeço — Códigos 04, 05 e 07',
    codigosRecomendados: ['Código 04', 'Código 05', 'Código 07'],
    sinaisFactory: (data) => [
      `Em ${data.bottom3[0].label}: a consistência quebra antes de virar hábito.`,
      `Em ${data.bottom3[1].label}: você recomeça, mas o ponto de partida muda a cada vez.`,
      `Em ${data.centralAxis.label}: aqui está a oscilação central — sentir e agir ainda não sincronizaram.`,
    ],
    primeiroPassoTexto: 'Estabilize antes de expandir. Uma ação pequena sustentada vale mais que dez picos.',
    cleoBloco: 'Cléo é o prêmio da consistência. Você desbloqueia quando o padrão se sustenta — não antes.',
  },
  Estrategista: {
    nome: 'Estrategista',
    abertura: 'Você já tem clareza e ação. O que falta é sustentação e padrão.',
    dorRaiz: 'Você funciona. Resolve. Entrega. Mas em algum ponto, você se trai — e isso aparece no corpo, no dinheiro ou nas emoções. O código existe. Falta pacto.',
    cicloRecomendado: 'Ciclo Direção — Códigos 06, 08 e 10',
    codigosRecomendados: ['Código 06', 'Código 08', 'Código 10'],
    sinaisFactory: (data) => [
      `Em ${data.bottom3[0].label}: a base está lá, mas o padrão ainda oscila.`,
      `Em ${data.bottom3[1].label}: você consegue — mas o custo é mais alto do que deveria.`,
      `Em ${data.centralAxis.label}: aqui está a tensão entre o que você sente e o que sustenta.`,
    ],
    primeiroPassoTexto: 'Feche o pacto. Transforme o que já funciona em ritual repetível — e sustente.',
    cleoBloco: 'Cléo é magnetismo estratégico. Para quem já tem base e quer precisão. Está próxima para você.',
  },
  Soberana: {
    nome: 'Soberana',
    abertura: 'Você já voltou pro comando. Agora é precisão, presença e influência.',
    dorRaiz: 'Você já tem base. O desafio agora é não transformar excelência em sobrecarga — e usar o que construiu para expandir com precisão, não com mais esforço.',
    cicloRecomendado: 'Código 10 (Pacto) + Cléo desbloqueada como prioridade',
    codigosRecomendados: ['Código 10', 'Cléo (prioridade)'],
    sinaisFactory: (data) => [
      `Em ${data.top3[0].label}: você está acima do ruído — isso precisa ser protegido, não expandido à força.`,
      `Em ${data.bottom3[0].label}: mesmo com base sólida, esse ponto ainda consome energia silenciosamente.`,
      `Em ${data.centralAxis.label}: a tensão aqui é de refinamento, não de reconstrução.`,
    ],
    primeiroPassoTexto: 'Eleve o padrão. Cléo é o próximo nível — e está disponível para você agora.',
    cleoBloco: 'Cléo é sua por direito. Você já tem a base. Agora é magnetismo, reputação e legado.',
  },
};

export function getArquetipo(data: EspelhoData): ArquetipoData {
  const score = data.overallMean;
  let nomeArquetipo: 'Curiosa' | 'Buscadora' | 'Estrategista' | 'Soberana';

  if (score <= 3) nomeArquetipo = 'Curiosa';
  else if (score <= 5) nomeArquetipo = 'Buscadora';
  else if (score <= 7) nomeArquetipo = 'Estrategista';
  else nomeArquetipo = 'Soberana';

  const { sinaisFactory, ...rest } = arquetipos[nomeArquetipo];
  return { ...rest, sinais: sinaisFactory(data) };
}

/* ── CTA params builder ─────────────────────────────── */

export function buildCtaParams(data: EspelhoData): string {
  const m = data.axes.map((a) => a.mean.toFixed(1)).join(",");
  const t = data.top3.map((a) => a.index).join(",");
  const b = data.bottom3.map((a) => a.index).join(",");
  const c = data.centralAxis.index;
  return `?m=${m}&t=${t}&b=${b}&c=${c}`;
}

/* ── Sales payload builder ──────────────────────────── */

export interface PortalResetPayload {
  diagnostic: {
    perfil_nome: string;
    dor_raiz: string;
    sintomas: string[];
    consequencia: string;
    ciclo_recomendado: string;
    codigo_recomendado: string;
    primeiro_passo: string;
  };
  report_screen: {
    headline: string;
    paragrafo_interpretacao: string;
    bullets_sintomas: string[];
    frase_custo_real: string;
    caminho_recomendado: string;
    acao_imediata: string;
    cta_text: string;
    cta_microcopy: string;
  };
  sales_page: {
    hero_headline: string;
    hero_subheadline: string;
    bloco_significado: string;
    bloco_caminho_recomendado: string;
    como_funciona_steps: string[];
    o_que_recebe_bullets: string[];
    cleo_bloco: string;
    oferta_headline: string;
    oferta_subheadline: string;
    cta_text: string;
    cta_microcopy: string;
  };
}

export function buildPortalResetPayload(data: EspelhoData): PortalResetPayload {
  const perfil = getPerfilName(data);
  const centralMicro = getAxisMicro(data.centralAxis.type);
  const editorial = generateEditorialDiagnostic(data);

  const bottom1 = data.bottom3[0];
  const bottom2 = data.bottom3[1];
  const bottom3item = data.bottom3[2];

  const sintomas = [
    `${bottom1.label}: ${getAxisMicro(bottom1.type).micro}`,
    `${bottom2.label}: ${getAxisMicro(bottom2.type).micro}`,
    `${bottom3item.label}: ${getAxisMicro(bottom3item.type).micro}`,
  ];

  const codigoMap: Record<string, string> = {
    "Comece pelo Código de Retorno. Antes de agir, volte para si.": "Código de Retorno",
    "Comece pelo Código de Pausa. Insira presença antes da próxima entrega.": "Código de Pausa",
    "Comece pelo Código de Estrutura. Decisão mínima, ambiente facilitador.": "Código de Estrutura",
    "Comece pelo Código de Estabilização. Reduza o custo mental antes de buscar mais.": "Código de Estabilização",
    "Comece pelo Código de Proteção. Sustente sem forçar intensidade.": "Código de Proteção",
    "Comece pelo Código de Expansão. Proteja o que sustenta e explore o próximo nível.": "Código de Expansão",
  };
  const codigoRecomendado = codigoMap[perfil.recomendacao] ?? "Código de Retorno";

  return {
    diagnostic: {
      perfil_nome: perfil.nome,
      dor_raiz: perfil.dorRaiz,
      sintomas,
      consequencia: `Tensão central no Eixo ${data.centralAxis.axis} (${centralMicro.title.toLowerCase()}) — tensão ${data.centralAxis.tension.toFixed(0)}.`,
      ciclo_recomendado: perfil.recomendacao,
      codigo_recomendado: codigoRecomendado,
      primeiro_passo: perfil.recomendacao.replace(/^Comece pelo /, ""),
    },
    report_screen: {
      headline: `Seu padrão: ${perfil.nome}`,
      paragrafo_interpretacao: editorial[0],
      bullets_sintomas: sintomas,
      frase_custo_real: editorial[3],
      caminho_recomendado: perfil.recomendacao,
      acao_imediata: `Estabilizar Eixo ${data.bottom3[0].axis} e reduzir tensão no Eixo ${data.centralAxis.axis}.`,
      cta_text: "VER MEU PLANO NO APP",
      cta_microcopy: "Isso é cíclico. Você pode repetir quando precisar.",
    },
    sales_page: {
      hero_headline: `Seu diagnóstico mostrou: ${perfil.nome}`,
      hero_subheadline: perfil.dorRaiz,
      bloco_significado: `Isso não é diagnóstico clínico. É um mapa do seu padrão de operação mental — como você distribui energia, presença e ação nos últimos 30 dias. E esse mapa mostrou que o custo do automático está mais alto do que o retorno.`,
      bloco_caminho_recomendado: perfil.recomendacao,
      como_funciona_steps: ["Diagnóstico (2 min)", "Escolha do Código", "Ritual (10–20 min)", "Micro-ação", "Repetição em ciclos"],
      o_que_recebe_bullets: ["10 Códigos (rituais repetíveis e cíclicos)", "Ayra — sua guia dentro do portal", "Cléo desbloqueável (prêmio por consistência)", "Upgrades contínuos do portal"],
      cleo_bloco: "Cléo não é bônus. Cléo é consequência. Você desbloqueia após consistência. Base histórica. Magnetismo estratégico.",
      oferta_headline: "Fundadoras: R$47/mês (primeiras 1000)",
      oferta_subheadline: "Depois: R$147/mês com upgrades",
      cta_text: "ATIVAR MEU PORTAL (R$47/mês)",
      cta_microcopy: "Cancele quando quiser. Aqui é sobre autonomia.",
    },
  };
}
