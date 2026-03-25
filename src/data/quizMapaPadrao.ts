export interface QuizQuestion {
  id: string;
  text: string;
}

export interface QuizRespiro {
  text: string;
  buttonLabel: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Corpo (q01–q02)
  { id: "q01", text: "Eu passo por cima do meu corpo mesmo quando ele pede pausa." },
  { id: "q02", text: "Eu durmo, mas não desligo por dentro." },
  // Mente (q03–q04)
  { id: "q03", text: "Quando o dia aperta, eu perco acesso à minha lucidez." },
  { id: "q04", text: "Quando tudo fica barulhento, eu não tenho um lugar interno estável para voltar." },
  // Emoção (q05–q06)
  { id: "q05", text: "Eu sinto culpa quando coloco limites necessários." },
  { id: "q06", text: "Eu sinto que preciso ser forte o tempo todo para não desmoronar." },
  // Relações (q07–q08)
  { id: "q07", text: "Eu tolero situações que me drenam para evitar atrito." },
  { id: "q08", text: "Minha voz real fica presa, e eu digo só o que é aceitável." },
  // Propósito (q09–q10)
  { id: "q09", text: "Eu sei o que precisa ser feito, mas algo em mim puxa para o conhecido." },
  { id: "q10", text: "Eu vivo abaixo do meu potencial por falta de sustentação, não por falta de capacidade." },
  // Recursos (q11–q12)
  { id: "q11", text: "Eu começo o dia reagindo ao que chega, em vez de escolher o meu ritmo." },
  { id: "q12", text: "Eu cumpro compromissos com os outros e quebro acordos simples comigo." },
];

export const quizRespiros: QuizRespiro[] = [
  { text: "Pausa. Não responda 'bonito'. Responda verdadeiro.", buttonLabel: "Continuar" },
  { text: "Retorna. Seu padrão não te acusa. Ele te informa.", buttonLabel: "Continuar" },
  { text: "Fechou. Agora a gente transforma isso em direção.", buttonLabel: "Ver meu Espelho" },
];

export const dimensionLabels: string[] = [
  "Corpo", "Mente", "Emoção", "Relações", "Propósito", "Recursos",
];

export interface QuizAnswer {
  id: string;
  value: number;
}

export interface QuizSession {
  sessionId: string;
  quizId: string;
  createdAt: string;
  scale: { min: number; max: number };
  answers: QuizAnswer[];
}
