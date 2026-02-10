export interface DiagnosticoQuestion {
  id: string;
  text: string;
}

export const diagnosticoQuestions: DiagnosticoQuestion[] = [
  { id: "q01", text: "Com que frequência você termina o dia com a sensação de que viveu no automático, sem escolher o ritmo?" },
  { id: "q02", text: "Com que frequência você sente que existe uma versão sua mais lúcida, mas ela fica inacessível quando o dia aperta?" },
  { id: "q03", text: "Com que frequência você mantém compromissos com todo mundo, mas quebra acordos simples com você?" },
  { id: "q04", text: "Com que frequência você percebe que está se explicando demais para ser compreendida, como se precisasse se justificar para existir?" },
  { id: "q05", text: "Com que frequência você começa algo com clareza e, no meio, perde consistência por excesso de carga mental?" },
  { id: "q06", text: "Com que frequência você sente que seu corpo pede pausa, mas sua mente negocia e você passa por cima mesmo assim?" },
  { id: "q07", text: "Com que frequência você adia decisões pequenas e isso vira um acúmulo que te pesa?" },
  { id: "q08", text: "Com que frequência você sente que sabe o que precisa fazer, mas algo interno puxa você para o conhecido?" },
  { id: "q09", text: "Com que frequência você tolera situações que drenam sua energia por não querer lidar com o atrito?" },
  { id: "q10", text: "Com que frequência você percebe que aceita menos do que merece para manter uma falsa paz?" },
  { id: "q11", text: "Com que frequência você tem dificuldade de manter foco em uma coisa por vez, porque tudo parece urgente?" },
  { id: "q12", text: "Com que frequência você sente que sua mente está cheia demais para escutar o que é verdade para você?" },
  { id: "q13", text: "Com que frequência você dorme sem realmente desligar, como se o dia continuasse por dentro?" },
  { id: "q14", text: "Com que frequência você sente que sua energia oscila e isso muda totalmente suas decisões?" },
  { id: "q15", text: "Com que frequência você sente culpa quando coloca limites, mesmo quando eles são necessários?" },
  { id: "q16", text: "Com que frequência você sente que precisa ser forte o tempo todo para não desmoronar?" },
  { id: "q17", text: "Com que frequência você perde presença em conversas importantes porque está pensando no depois?" },
  { id: "q18", text: "Com que frequência você sente que a sua voz real fica presa, e você fala só o que é aceitável?" },
  { id: "q19", text: "Com que frequência você tenta se organizar, mas o ambiente ao redor continua puxando você para o caos?" },
  { id: "q20", text: "Com que frequência você sente que falta um lugar interno estável para voltar quando tudo fica barulhento?" },
  { id: "q21", text: "Com que frequência você sente que está vivendo abaixo do seu potencial por falta de sustentação, não por falta de capacidade?" },
  { id: "q22", text: "Com que frequência você percebe que sua clareza aparece em picos, mas some na rotina?" },
  { id: "q23", text: "Com que frequência você termina uma semana sentindo que se abandonou em pequenas decisões?" },
  { id: "q24", text: "Com que frequência você sente que o que você precisa não é mudar quem você é, mas mudar o lugar de onde você opera?" },
];

export const dimensionLabels: string[] = [
  "Eixo 1",
  "Eixo 2",
  "Eixo 3",
  "Eixo 4",
  "Eixo 5",
  "Eixo 6",
  "Eixo 7",
  "Eixo 8",
  "Eixo 9",
  "Eixo 10",
  "Eixo 11",
  "Eixo 12",
];

export const respiroTexts: string[] = [
  "Respira. Aqui não é sobre resposta certa. É sobre padrão.",
  "Volta. O que você sustenta, te sustenta.",
  "Pausa. Clareza não exige força. Exige retorno.",
  "Fechou. Agora a gente transforma isso em direção.",
];
