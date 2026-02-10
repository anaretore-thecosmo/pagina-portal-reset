export interface DiagnosticoQuestion {
  id: string;
  text: string;
}

export const diagnosticoQuestions: DiagnosticoQuestion[] = [
  { id: "q01", text: "No fim do dia, quanta energia sobra depois do que era obrigatório?" },
  { id: "q02", text: "Hoje, você viveu mais como autora ou como personagem?" },
  { id: "q03", text: "Quando você senta para fazer o que importa, quanto tempo leva até você se distrair ou trocar de tarefa?" },
  { id: "q04", text: "Quando o dia aperta, sua voz interna fica mais nítida ou mais distante?" },
  { id: "q05", text: "Quantas vezes nesta semana você disse \"sim\" por reflexo e se arrependeu depois?" },
  { id: "q06", text: "Seu centro parece um lugar acessível ou um lugar que você visita raramente?" },
  { id: "q07", text: "Qual a frequência com que você adia uma decisão pequena e isso vira peso acumulado?" },
  { id: "q08", text: "Quando você pensa no que quer de verdade, o que aparece primeiro: clareza ou negociação?" },
  { id: "q09", text: "Nesta semana, o seu sono foi reparador ou foi apenas \"desligar o corpo\"?" },
  { id: "q10", text: "Você sente que está vivendo em alinhamento ou em adaptação?" },
  { id: "q11", text: "Quando surge atrito, você enfrenta, contorna ou desaparece?" },
  { id: "q12", text: "Em conversas importantes, você fala do que é verdade ou do que é aceitável?" },
  { id: "q13", text: "Quando a sua rotina muda, você perde estrutura ou consegue recalibrar rápido?" },
  { id: "q14", text: "Você sente que a sua presença ocupa espaço ou pede licença para existir?" },
  { id: "q15", text: "Quantas vezes você precisou se explicar além do necessário para ser levada a sério?" },
  { id: "q16", text: "Quando você coloca limite, o que aparece primeiro: culpa ou alívio?" },
  { id: "q17", text: "Seu corpo tem sido ouvido antes de você colapsar ou só depois?" },
  { id: "q18", text: "Você sente que sua vida está sendo escolhida ou empurrada?" },
  { id: "q19", text: "Você consegue manter uma coisa por vez ou vive em sobreposição de tarefas?" },
  { id: "q20", text: "Quando você imagina os próximos 30 dias, o sentimento dominante é direção ou sobrevivência?" },
  { id: "q21", text: "O seu ambiente facilita sua disciplina ou sabota sem você perceber?" },
  { id: "q22", text: "Você sente que seu valor está ancorado por dentro ou depende do retorno do mundo?" },
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
  "Fechou. Agora a gente transforma isso em direção.",
];
