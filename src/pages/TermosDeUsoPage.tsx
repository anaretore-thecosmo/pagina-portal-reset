const SECTIONS = [
  {
    title: "1. Aceitação dos Termos",
    content: `Ao acessar ou utilizar o Portal Reset Digital ("Portal Reset", "plataforma", "serviço"), você concorda com estes Termos de Uso e com nossa Política de Privacidade. Se não concordar com qualquer disposição, não utilize o serviço.

O Portal Reset é operado por Ana Retore, inscrita sob o CPF nº [PREENCHER], com sede em Indaiatuba, SP, Brasil.`,
  },
  {
    title: "2. Descrição do Serviço",
    content: `O Portal Reset Digital é uma plataforma de autoconhecimento e desenvolvimento pessoal que oferece:

· Diagnóstico de padrão comportamental (Mapa do Padrão);
· Jornada de 10 dias com rituais diários guiados;
· Mentoras com inteligência artificial (Ayra e Cléo);
· Ferramentas de frequência e diário pessoal (Círculo);
· Galeria Alquímica de geração de imagens com IA;
· Sistema de pontos, níveis e conquistas.

O conteúdo do Portal Reset tem natureza informativa e de desenvolvimento pessoal. Não constitui aconselhamento médico, psicológico, jurídico ou financeiro.`,
  },
  {
    title: "3. Elegibilidade",
    content: `Para utilizar o Portal Reset Digital, você deve:

· Ter 18 anos ou mais;
· Ter capacidade legal para celebrar contratos;
· Fornecer informações verdadeiras durante o cadastro.

O serviço é destinado a uso pessoal e intransferível. É vedada a utilização para fins comerciais, revenda ou distribuição de conteúdo sem autorização prévia por escrito.`,
  },
  {
    title: "4. Assinatura, Pagamento e Cancelamento",
    content: `O Portal Reset Digital é oferecido no modelo de assinatura mensal recorrente, processada pela plataforma Kiwify (kiwify.com.br).

Valor: R$47,00 por mês (sujeito a alteração com aviso prévio de 30 dias).

Cobrança: automática e mensal na data de contratação.

Cancelamento: pode ser realizado a qualquer momento, diretamente na plataforma Kiwify ou pelo e-mail ana.retore@gmail.com. O cancelamento encerra a renovação automática; o acesso permanece ativo até o fim do período já pago.

Reembolso: solicitações de reembolso devem ser feitas em até 7 dias corridos após a cobrança, conforme o Código de Defesa do Consumidor (Art. 49, Lei nº 8.078/1990).`,
  },
  {
    title: "5. Conta e Responsabilidades do Usuário",
    content: `Você é responsável por:

· Manter a confidencialidade de suas credenciais de acesso;
· Toda atividade realizada em sua conta;
· Fornecer informações precisas e atualizadas;
· Utilizar o serviço de forma ética e legal.

É vedado:
· Compartilhar ou revender credenciais de acesso;
· Reproduzir, distribuir ou explorar comercialmente conteúdos do Portal Reset;
· Tentar obter acesso não autorizado a sistemas ou dados;
· Utilizar o serviço para fins ilegais ou que violem direitos de terceiros.`,
  },
  {
    title: "6. Propriedade Intelectual",
    content: `Todo o conteúdo do Portal Reset Digital — incluindo textos, metodologia, design, imagens, áudios, vídeos, nomes, marcas e código-fonte — é de propriedade exclusiva de Ana Retore e protegido pelas leis de propriedade intelectual brasileiras (Lei nº 9.610/1998 e Lei nº 9.279/1996).

É concedida ao assinante uma licença pessoal, não exclusiva, intransferível e revogável para acesso ao conteúdo durante o período de assinatura ativa. Nenhum direito de propriedade é transferido ao usuário.`,
  },
  {
    title: "7. Conteúdo Gerado pelo Usuário",
    content: `Ao utilizar ferramentas como o Círculo (diário) ou a Galeria Alquímica, você mantém a titularidade do conteúdo que criar. Ao inserir conteúdo na plataforma, você nos concede licença limitada para armazená-lo e processá-lo com o objetivo de prestar o serviço.

Não somos responsáveis pelo conteúdo inserido por usuários. Você concorda em não inserir conteúdo ilegal, ofensivo, difamatório ou que viole direitos de terceiros.`,
  },
  {
    title: "8. Disponibilidade e Limitação de Responsabilidade",
    content: `Nos esforçamos para manter o Portal Reset disponível 24 horas por dia, 7 dias por semana. No entanto, não garantimos disponibilidade ininterrupta, podendo ocorrer indisponibilidades por manutenção, falhas técnicas ou fatores fora do nosso controle.

Na máxima extensão permitida por lei, não seremos responsáveis por:

· Danos indiretos, incidentais ou consequentes decorrentes do uso ou impossibilidade de uso do serviço;
· Resultados específicos de desenvolvimento pessoal, uma vez que estes dependem exclusivamente do engajamento e das circunstâncias individuais de cada usuário.

Nossa responsabilidade total, em qualquer hipótese, limita-se ao valor pago pelo usuário nos 3 meses anteriores ao evento que gerou o dano.`,
  },
  {
    title: "9. Modificações no Serviço e nos Termos",
    content: `Reservamo-nos o direito de modificar, suspender ou encerrar o serviço ou qualquer funcionalidade, a qualquer momento, com aviso prévio de 30 dias em casos de alterações substanciais.

Estes Termos de Uso podem ser atualizados periodicamente. A versão vigente estará sempre disponível em oportalreset.com/termos-de-uso. O uso continuado do serviço após modificações implica aceitação dos novos termos.`,
  },
  {
    title: "10. Lei Aplicável e Foro",
    content: `Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de Indaiatuba, SP, para dirimir quaisquer controvérsias decorrentes deste instrumento, com renúncia a qualquer outro, por mais privilegiado que seja.`,
  },
  {
    title: "11. Contato",
    content: `Para dúvidas, solicitações ou notificações relacionadas a estes Termos:

Ana Retore
E-mail: ana.retore@gmail.com
Rua Bertha Kraembull Magnusson Itaici, Indaiatuba, SP`,
  },
];

const TermosDeUsoPage = () => {
  return (
    <div style={{ background: "#08090D", color: "#EDE6DB", minHeight: "100vh" }}>
      <div
        className="fixed top-0 left-0 right-0 h-px z-50"
        style={{ background: "linear-gradient(90deg, transparent 5%, rgba(200,184,112,0.2) 30%, rgba(200,184,112,0.2) 70%, transparent 95%)" }}
      />

      <div className="max-w-[720px] mx-auto px-6 py-20">

        {/* Header */}
        <div className="mb-14">
          <p className="font-inter uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.4em", color: "rgba(200,184,112,0.6)" }}>
            Portal Reset Digital
          </p>
          <h1
            className="font-playfair font-bold uppercase"
            style={{ fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.08, letterSpacing: "0.06em", color: "#EDE6DB" }}
          >
            Termos de Uso
          </h1>
          <p className="mt-3 font-inter" style={{ fontSize: "13px", color: "rgba(207,197,184,0.45)" }}>
            Vigência: 10 de março de 2026 · Versão 1.0
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {SECTIONS.map((section, i) => (
            <div key={i}>
              <div className="w-6 h-px mb-4" style={{ background: "rgba(200,184,112,0.3)" }} />
              <h2
                className="font-playfair font-bold mb-3"
                style={{ fontSize: "16px", color: "#C8B870", letterSpacing: "0.02em" }}
              >
                {section.title}
              </h2>
              <p
                className="font-inter leading-[1.85] whitespace-pre-line"
                style={{ fontSize: "14px", color: "rgba(207,197,184,0.7)" }}
              >
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="mt-16 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(200,184,112,0.1)" }}
        >
          <p className="font-inter" style={{ fontSize: "11px", color: "rgba(207,197,184,0.3)" }}>
            © Ana Retore. Todos os direitos reservados.
          </p>
          <a
            href="/politica-de-privacidade"
            className="font-inter transition-opacity hover:opacity-80"
            style={{ fontSize: "12px", color: "rgba(200,184,112,0.5)" }}
          >
            Política de Privacidade →
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermosDeUsoPage;
