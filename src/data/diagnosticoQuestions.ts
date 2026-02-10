export interface DiagnosticoQuestion {
  id: string;
  text: string;
}

export const diagnosticoQuestions: DiagnosticoQuestion[] = [
  { id: "q01", text: "No fim do dia, quanta energia sobra depois do que era obrigatório?" },
  { id: "q02", text: "Hoje, você viveu mais como autora ou como personagem?" },
  { id: "q03", text: "Quando você senta para fazer o que importa, quanto tempo leva até você se distrair ou trocar de tarefa?" },
  { id: "q04", text: "Quando o dia aperta, sua voz interna fica mais nítida ou mais distante?" },
  { id: "q05", text: "Nesta semana, quantas vezes você disse sim por reflexo e se arrependeu depois?" },
  { id: "q06", text: "Seu centro parece um lugar acessível ou um lugar que você visita raramente?" },
  { id: "q07", text: "Qual a frequência com que você adia uma decisão pequena e isso vira peso acumulado?" },
  { id: "q08", text: "Quando você pensa no que quer de verdade, o que aparece primeiro: clareza ou negociação?" },
  { id: "q09", text: "Nos últimos dias, seu sono foi reparador ou foi apenas desligar o corpo?" },
  { id: "q10", text: "Você sente que está vivendo em alinhamento ou em adaptação?" },
  { id: "q11", text: "Quando surge atrito, você enfrenta, contorna ou desaparece?" },
  { id: "q12", text: "Em conversas importantes, você fala do que é verdade ou do que é aceitável?" },
  { id: "q13", text: "Quando a rotina muda, você perde estrutura ou consegue recalibrar rápido?" },
  { id: "q14", text: "Sua presença ocupa espaço ou pede licença para existir?" },
  { id: "q15", text: "Quantas vezes você se explicou além do necessário para ser levada a sério?" },
  { id: "q16", text: "Quando você coloca limite, o que aparece primeiro: culpa ou alívio?" },
  { id: "q17", text: "Seu corpo tem sido ouvido antes de você colapsar ou só depois?" },
  { id: "q18", text: "Você sente que sua vida está sendo escolhida ou empurrada?" },
  { id: "q19", text: "Você consegue manter uma coisa por vez ou vive em sobreposição de tarefas?" },
  { id: "q20", text: "Ao pensar nos próximos 30 dias, o sentimento dominante é direção ou sobrevivência?" },
  { id: "q21", text: "Seu ambiente facilita sua disciplina ou sabota sem você perceber?" },
  { id: "q22", text: "Seu valor está ancorado por dentro ou depende do retorno do mundo?" },
  { id: "q23", text: "Quantas vezes você se abandonou em micro escolhas para evitar conflito ou desconforto?" },
  { id: "q24", text: "O que você precisa é mudar quem você é ou mudar o lugar de onde você opera?" },
];

export const dimensionLabels: string[] = [
  "Eixo 1", "Eixo 2", "Eixo 3", "Eixo 4", "Eixo 5", "Eixo 6",
  "Eixo 7", "Eixo 8", "Eixo 9", "Eixo 10", "Eixo 11", "Eixo 12",
];

export const respiroTexts: string[] = [
  "Respira. Aqui não é sobre certo. É sobre padrão.",
  "Volta. O que você sustenta, te sustenta.",
  "Pausa. Clareza não exige força. Exige retorno.",
  "Fechou. Agora isso vira direção.",
];

export interface FlowStep {
  type: "question" | "breath";
  id: string;
  order: number;
  text: string;
  buttonLabel?: string;
}

export const flow: FlowStep[] = [
  {"type":"question","id":"q01","order":1,"text":"No fim do dia, quanta energia sobra depois do que era obrigatório?"},
  {"type":"question","id":"q02","order":2,"text":"Hoje, você viveu mais como autora ou como personagem?"},
  {"type":"question","id":"q03","order":3,"text":"Quando você senta para fazer o que importa, quanto tempo leva até você se distrair ou trocar de tarefa?"},
  {"type":"question","id":"q04","order":4,"text":"Quando o dia aperta, sua voz interna fica mais nítida ou mais distante?"},
  {"type":"question","id":"q05","order":5,"text":"Nesta semana, quantas vezes você disse sim por reflexo e se arrependeu depois?"},
  {"type":"question","id":"q06","order":6,"text":"Seu centro parece um lugar acessível ou um lugar que você visita raramente?"},
  {"type":"breath","id":"r01","order":7,"text":"Respira. Aqui não é sobre certo. É sobre padrão.","buttonLabel":"Continuar"},
  {"type":"question","id":"q07","order":8,"text":"Qual a frequência com que você adia uma decisão pequena e isso vira peso acumulado?"},
  {"type":"question","id":"q08","order":9,"text":"Quando você pensa no que quer de verdade, o que aparece primeiro: clareza ou negociação?"},
  {"type":"question","id":"q09","order":10,"text":"Nos últimos dias, seu sono foi reparador ou foi apenas desligar o corpo?"},
  {"type":"question","id":"q10","order":11,"text":"Você sente que está vivendo em alinhamento ou em adaptação?"},
  {"type":"question","id":"q11","order":12,"text":"Quando surge atrito, você enfrenta, contorna ou desaparece?"},
  {"type":"question","id":"q12","order":13,"text":"Em conversas importantes, você fala do que é verdade ou do que é aceitável?"},
  {"type":"breath","id":"r02","order":14,"text":"Volta. O que você sustenta, te sustenta.","buttonLabel":"Continuar"},
  {"type":"question","id":"q13","order":15,"text":"Quando a rotina muda, você perde estrutura ou consegue recalibrar rápido?"},
  {"type":"question","id":"q14","order":16,"text":"Sua presença ocupa espaço ou pede licença para existir?"},
  {"type":"question","id":"q15","order":17,"text":"Quantas vezes você se explicou além do necessário para ser levada a sério?"},
  {"type":"question","id":"q16","order":18,"text":"Quando você coloca limite, o que aparece primeiro: culpa ou alívio?"},
  {"type":"question","id":"q17","order":19,"text":"Seu corpo tem sido ouvido antes de você colapsar ou só depois?"},
  {"type":"question","id":"q18","order":20,"text":"Você sente que sua vida está sendo escolhida ou empurrada?"},
  {"type":"breath","id":"r03","order":21,"text":"Pausa. Clareza não exige força. Exige retorno.","buttonLabel":"Continuar"},
  {"type":"question","id":"q19","order":22,"text":"Você consegue manter uma coisa por vez ou vive em sobreposição de tarefas?"},
  {"type":"question","id":"q20","order":23,"text":"Ao pensar nos próximos 30 dias, o sentimento dominante é direção ou sobrevivência?"},
  {"type":"question","id":"q21","order":24,"text":"Seu ambiente facilita sua disciplina ou sabota sem você perceber?"},
  {"type":"question","id":"q22","order":25,"text":"Seu valor está ancorado por dentro ou depende do retorno do mundo?"},
  {"type":"question","id":"q23","order":26,"text":"Quantas vezes você se abandonou em micro escolhas para evitar conflito ou desconforto?"},
  {"type":"question","id":"q24","order":27,"text":"O que você precisa é mudar quem você é ou mudar o lugar de onde você opera?"},
  {"type":"breath","id":"r04","order":28,"text":"Fechou. Agora isso vira direção.","buttonLabel":"Ver meu Espelho"},
];
