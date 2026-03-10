export interface QuizQuestion {
  id: string;
  text: string;
}

export interface QuizRespiro {
  text: string;
  buttonLabel: string;
}

export const quizQuestions: QuizQuestion[] = [
  { id: "q01", text: "Eu começo o dia reagindo ao que chega, em vez de escolher o meu ritmo." },
  { id: "q02", text: "Quando o dia aperta, eu perco acesso à minha lucidez." },
  { id: "q03", text: "Eu cumpro compromissos com os outros e quebro acordos simples comigo." },
  { id: "q04", text: "Eu me explico demais para ser compreendida." },
  { id: "q05", text: "Eu começo com clareza e perco consistência por excesso de carga mental." },
  { id: "q06", text: "Eu passo por cima do meu corpo mesmo quando ele pede pausa." },
  { id: "q07", text: "Pequenas decisões adiadas viram um acúmulo que me pesa." },
  { id: "q08", text: "Eu sei o que precisa ser feito, mas algo em mim puxa para o conhecido." },
  { id: "q09", text: "Eu tolero situações que me drenam para evitar atrito." },
  { id: "q10", text: "Eu aceito menos do que mereço para manter uma falsa paz." },
  { id: "q11", text: "Eu me disperso facilmente porque tudo parece urgente ao mesmo tempo." },
  { id: "q12", text: "Minha mente fica tão cheia que eu perco contato com o que é verdade para mim." },
  { id: "q13", text: "Eu durmo, mas não desligo por dentro." },
  { id: "q14", text: "Minha energia oscila e isso muda minhas decisões." },
  { id: "q15", text: "Eu sinto culpa quando coloco limites necessários." },
  { id: "q16", text: "Eu sinto que preciso ser forte o tempo todo para não desmoronar." },
  { id: "q17", text: "Em conversas importantes, eu não estou inteira porque já estou no depois." },
  { id: "q18", text: "Minha voz real fica presa, e eu digo só o que é aceitável." },
  { id: "q19", text: "Eu tento me organizar, mas meu ambiente me puxa de volta para o caos." },
  { id: "q20", text: "Quando tudo fica barulhento, eu não tenho um lugar interno estável para voltar." },
  { id: "q21", text: "Eu vivo abaixo do meu potencial por falta de sustentação, não por falta de capacidade." },
  { id: "q22", text: "Minha clareza aparece em picos e some na rotina." },
  { id: "q23", text: "Eu termino semanas sentindo que me abandonei em pequenas decisões." },
  { id: "q24", text: "O que eu preciso não é mudar quem eu sou, é mudar o lugar de onde eu opero." },
];

export const quizRespiros: QuizRespiro[] = [
  { text: "Pausa. Não responda 'bonito'. Responda verdadeiro.", buttonLabel: "Continuar" },
  { text: "Retorna. Seu padrão não te acusa. Ele te informa.", buttonLabel: "Continuar" },
  { text: "Respira. Clareza não exige força. Exige retorno.", buttonLabel: "Continuar" },
  { text: "Fechou. Agora a gente transforma isso em direção.", buttonLabel: "Ver meu Espelho" },
];

export const dimensionLabels: string[] = [
  "Presença", "Valor", "Mente", "Raízes", "Essência", "Prática",
  "Espelho", "Transformação", "Expansão", "Missão", "Visão", "Sombra",
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
