export interface DiagnosticoQuestion {
  id: string;
  text: string;
}

export const diagnosticoQuestions: DiagnosticoQuestion[] = [
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

export const dimensionLabels: string[] = [
  "Eixo 1", "Eixo 2", "Eixo 3", "Eixo 4", "Eixo 5", "Eixo 6",
  "Eixo 7", "Eixo 8", "Eixo 9", "Eixo 10", "Eixo 11", "Eixo 12",
];

export const respiroTexts: string[] = [
  "Pausa. Não responda 'bonito'. Responda verdadeiro.",
  "Volta. Seu padrão não te acusa. Ele te informa.",
  "Respira. Clareza não exige força. Exige retorno.",
  "Fechou. Agora a gente transforma isso em direção.",
];

export interface FlowStep {
  type: "question" | "breath";
  id: string;
  order: number;
  text: string;
  buttonLabel?: string;
}

export const flow: FlowStep[] = [
  {"type":"question","id":"q01","order":1,"text":"Eu começo o dia reagindo ao que chega, em vez de escolher o meu ritmo."},
  {"type":"question","id":"q02","order":2,"text":"Quando o dia aperta, eu perco acesso à minha lucidez."},
  {"type":"question","id":"q03","order":3,"text":"Eu cumpro compromissos com os outros e quebro acordos simples comigo."},
  {"type":"question","id":"q04","order":4,"text":"Eu me explico demais para ser compreendida."},
  {"type":"question","id":"q05","order":5,"text":"Eu começo com clareza e perco consistência por excesso de carga mental."},
  {"type":"question","id":"q06","order":6,"text":"Eu passo por cima do meu corpo mesmo quando ele pede pausa."},
  {"type":"breath","id":"r01","order":7,"text":"Pausa. Não responda 'bonito'. Responda verdadeiro.","buttonLabel":"Continuar"},
  {"type":"question","id":"q07","order":8,"text":"Pequenas decisões adiadas viram um acúmulo que me pesa."},
  {"type":"question","id":"q08","order":9,"text":"Eu sei o que precisa ser feito, mas algo em mim puxa para o conhecido."},
  {"type":"question","id":"q09","order":10,"text":"Eu tolero situações que me drenam para evitar atrito."},
  {"type":"question","id":"q10","order":11,"text":"Eu aceito menos do que mereço para manter uma falsa paz."},
  {"type":"question","id":"q11","order":12,"text":"Eu me disperso facilmente porque tudo parece urgente ao mesmo tempo."},
  {"type":"question","id":"q12","order":13,"text":"Minha mente fica tão cheia que eu perco contato com o que é verdade para mim."},
  {"type":"breath","id":"r02","order":14,"text":"Volta. Seu padrão não te acusa. Ele te informa.","buttonLabel":"Continuar"},
  {"type":"question","id":"q13","order":15,"text":"Eu durmo, mas não desligo por dentro."},
  {"type":"question","id":"q14","order":16,"text":"Minha energia oscila e isso muda minhas decisões."},
  {"type":"question","id":"q15","order":17,"text":"Eu sinto culpa quando coloco limites necessários."},
  {"type":"question","id":"q16","order":18,"text":"Eu sinto que preciso ser forte o tempo todo para não desmoronar."},
  {"type":"question","id":"q17","order":19,"text":"Em conversas importantes, eu não estou inteira porque já estou no depois."},
  {"type":"question","id":"q18","order":20,"text":"Minha voz real fica presa, e eu digo só o que é aceitável."},
  {"type":"breath","id":"r03","order":21,"text":"Respira. Clareza não exige força. Exige retorno.","buttonLabel":"Continuar"},
  {"type":"question","id":"q19","order":22,"text":"Eu tento me organizar, mas meu ambiente me puxa de volta para o caos."},
  {"type":"question","id":"q20","order":23,"text":"Quando tudo fica barulhento, eu não tenho um lugar interno estável para voltar."},
  {"type":"question","id":"q21","order":24,"text":"Eu vivo abaixo do meu potencial por falta de sustentação, não por falta de capacidade."},
  {"type":"question","id":"q22","order":25,"text":"Minha clareza aparece em picos e some na rotina."},
  {"type":"question","id":"q23","order":26,"text":"Eu termino semanas sentindo que me abandonei em pequenas decisões."},
  {"type":"question","id":"q24","order":27,"text":"O que eu preciso não é mudar quem eu sou, é mudar o lugar de onde eu opero."},
  {"type":"breath","id":"r04","order":28,"text":"Fechou. Agora a gente transforma isso em direção.","buttonLabel":"Ver meu Espelho"},
];
