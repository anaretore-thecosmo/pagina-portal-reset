export interface QuizQuestion {
  id: string;
  text: string;
}

export interface QuizRespiro {
  text: string;
  buttonLabel: string;
}

export const quizQuestions: QuizQuestion[] = [
  { id: "q01", text: "No dia a dia, o quanto você consegue escolher o ritmo, em vez de só responder ao que chega?" },
  { id: "q02", text: "Quando o dia aperta, o quanto a sua versão mais lúcida continua acessível?" },
  { id: "q03", text: "Você cumpre o que combina com você mesma com a mesma firmeza que cumpre com os outros?" },
  { id: "q04", text: "Quantas vezes você sente que precisa se justificar para existir em paz?" },
  { id: "q05", text: "Você sustenta consistência quando a semana pesa, ou desorganiza por excesso de carga mental?" },
  { id: "q06", text: "Seu corpo pede pausa e você atende, ou você negocia e atropela?" },
  { id: "q07", text: "Decisões pequenas ficam simples para você, ou você acumula até virar peso?" },
  { id: "q08", text: "Você sente um puxão interno para o conhecido mesmo quando sabe o que faria bem?" },
  { id: "q09", text: "Você corta o que drena, ou você tolera para evitar atrito?" },
  { id: "q10", text: "Você escolhe a paz real, ou aceita menos do que merece para manter \"paz de fachada\"?" },
  { id: "q11", text: "Seu foco fica inteiro em uma coisa por vez, ou tudo vira urgência ao mesmo tempo?" },
  { id: "q12", text: "Sua mente fica tão cheia que a sua verdade some no barulho?" },
  { id: "q13", text: "Você encerra o dia de verdade, ou vai para a cama com o dia ainda rodando por dentro?" },
  { id: "q14", text: "Sua energia muda e suas decisões mudam junto, como se você virasse outra pessoa?" },
  { id: "q15", text: "Você coloca limites com clareza, ou se sente culpada e volta atrás?" },
  { id: "q16", text: "Você carrega \"ser forte\" como obrigação, mesmo quando isso te endurece?" },
  { id: "q17", text: "Em conversas importantes, você consegue ficar presente ou sua mente já está no depois?" },
  { id: "q18", text: "Sua voz sai inteira ou você fala só o que é aceitável para não gerar desconforto?" },
  { id: "q19", text: "Seu ambiente facilita o que te sustenta ou puxa você de volta para o caos?" },
  { id: "q20", text: "Você tem um lugar interno estável para voltar quando tudo fica barulhento?" },
  { id: "q21", text: "Você sente que vive abaixo do seu potencial por falta de sustentação, não por falta de capacidade?" },
  { id: "q22", text: "Sua clareza aparece em picos e desaparece na rotina?" },
  { id: "q23", text: "Ao fim da semana, você sente que se abandonou em pequenas escolhas?" },
  { id: "q24", text: "O que você precisa é mudar quem você é, ou mudar o lugar de onde você opera?" },
];

export const quizRespiros: QuizRespiro[] = [
  { text: "Respira. Aqui não é sobre resposta certa. É sobre padrão.", buttonLabel: "Continuar" },
  { text: "Volta. O que você sustenta, te sustenta.", buttonLabel: "Continuar" },
  { text: "Pausa. Clareza não exige força. Exige retorno.", buttonLabel: "Continuar" },
  { text: "Fechou. Agora a gente transforma isso em direção.", buttonLabel: "Ver meu Espelho" },
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
