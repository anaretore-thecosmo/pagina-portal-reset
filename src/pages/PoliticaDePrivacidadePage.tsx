const SECTIONS = [
  {
    title: "1. Quem somos",
    content: `Esta Política de Privacidade se aplica ao Portal Reset Digital, operado por Ana Retore, inscrita sob o CPF nº 024.607.659-32, com sede em Indaiatuba, SP, Brasil ("nós", "nosso" ou "Portal Reset").

Para dúvidas sobre esta política, entre em contato pelo e-mail: ana.retore@gmail.com.`,
  },
  {
    title: "2. Quais dados coletamos",
    content: `Ao utilizar o Portal Reset Digital, podemos coletar as seguintes categorias de dados:

· Dados de uso e navegação: páginas visitadas, tempo de sessão, dispositivo, sistema operacional e endereço IP.
· Respostas do diagnóstico: as respostas fornecidas no Mapa do Padrão são armazenadas localmente no seu dispositivo (localStorage) e não são transmitidas a terceiros sem seu consentimento.
· Dados de pagamento: processados exclusivamente pela Kiwify (kiwify.com.br). Não armazenamos dados de cartão de crédito.
· Dados de conta: nome e e-mail fornecidos durante o processo de assinatura, gerenciados pela Kiwify.
· Dados de comportamento via pixel: com seu consentimento, coletamos dados de comportamento de navegação por meio do Meta Pixel (Facebook/Instagram) para fins publicitários.`,
  },
  {
    title: "3. Como usamos seus dados",
    content: `Utilizamos os dados coletados para:

· Personalizar e entregar o diagnóstico e resultado do Mapa do Padrão;
· Processar pagamentos e gerenciar assinaturas (via Kiwify);
· Melhorar a experiência e o conteúdo do Portal Reset;
· Veicular anúncios e mensurar a eficácia de campanhas publicitárias (via Meta Pixel);
· Cumprir obrigações legais e regulatórias.

Base legal (LGPD, Art. 7º): consentimento, execução de contrato e legítimo interesse.`,
  },
  {
    title: "4. Meta Pixel e cookies",
    content: `Utilizamos o Meta Pixel, uma tecnologia da Meta Platforms, Inc. (Facebook e Instagram), que coleta dados sobre suas ações em nosso site para:

· Mensurar a eficácia de anúncios;
· Criar públicos personalizados para campanhas;
· Otimizar a entrega de anúncios.

O Meta Pixel pode coletar: endereço IP, dados do navegador, páginas visitadas e ações realizadas (ex: início do diagnóstico, conclusão do quiz).

Você pode optar por não ter seus dados coletados pelo Meta Pixel acessando as configurações de privacidade do Facebook em: facebook.com/privacy/explanation ou utilizando o recurso "Suas preferências de anúncios".

Também utilizamos cookies técnicos essenciais para o funcionamento do site (ex: armazenamento de sessão do diagnóstico). Esses cookies não coletam dados pessoais identificáveis e são necessários para o funcionamento correto da plataforma.`,
  },
  {
    title: "5. Compartilhamento com terceiros",
    content: `Seus dados podem ser compartilhados com:

· Kiwify (kiwify.com.br): para processamento de pagamentos e gestão de assinaturas. Consulte a Política de Privacidade da Kiwify em kiwify.com.br/privacy.
· Meta Platforms, Inc.: para veiculação de anúncios e análise de campanhas, conforme descrito na seção 4.
· Autoridades públicas: quando exigido por lei ou ordem judicial.

Não vendemos seus dados pessoais a terceiros.`,
  },
  {
    title: "6. Seus direitos (LGPD)",
    content: `Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:

· Confirmação da existência de tratamento de dados;
· Acesso aos dados que mantemos sobre você;
· Correção de dados incompletos ou incorretos;
· Anonimização, bloqueio ou eliminação de dados desnecessários;
· Portabilidade dos seus dados;
· Eliminação dos dados tratados com base em consentimento;
· Informação sobre o compartilhamento de dados com terceiros;
· Revogação do consentimento a qualquer momento.

Para exercer seus direitos, entre em contato pelo e-mail: ana.retore@gmail.com.
Responderemos em até 15 dias úteis.`,
  },
  {
    title: "7. Retenção de dados",
    content: `Os dados coletados são mantidos pelo tempo necessário para a prestação dos serviços contratados ou pelo prazo exigido por lei. Dados de assinatura são mantidos por até 5 anos após o encerramento do contrato para fins fiscais e legais.

As respostas do diagnóstico armazenadas localmente no seu dispositivo podem ser removidas a qualquer momento limpando o armazenamento local (localStorage) do seu navegador.`,
  },
  {
    title: "8. Segurança",
    content: `Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum sistema de transmissão pela internet é 100% seguro. Em caso de incidente de segurança que possa gerar risco relevante, notificaremos você e a ANPD nos prazos estabelecidos pela LGPD.`,
  },
  {
    title: "9. Crianças e adolescentes",
    content: `O Portal Reset Digital é destinado exclusivamente a pessoas maiores de 18 anos. Não coletamos conscientemente dados de menores. Caso identifiquemos coleta inadvertida de dados de menores, excluiremos as informações imediatamente.`,
  },
  {
    title: "10. Alterações nesta política",
    content: `Podemos atualizar esta Política de Privacidade periodicamente. A data de vigência constará sempre ao final do documento. Recomendamos a revisão periódica desta página. Alterações relevantes serão comunicadas por e-mail ou aviso em destaque no site.`,
  },
  {
    title: "11. Contato e Encarregado de Dados (DPO)",
    content: `Responsável pelo tratamento de dados:
Ana Retore
E-mail: ana.retore@gmail.com
Rua Bertha Kraembull Magnusson Itaici, Indaiatuba, SP

Para solicitações relacionadas a dados pessoais, envie e-mail com o assunto "LGPD — [sua solicitação]".`,
  },
];

const PoliticaDePrivacidadePage = () => {
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
            Política de Privacidade
          </h1>
          <p className="mt-3 font-inter" style={{ fontSize: "13px", color: "rgba(207,197,184,0.45)" }}>
            Vigência: 10 de março de 2026 · Em conformidade com a LGPD (Lei nº 13.709/2018)
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
            href="/termos-de-uso"
            className="font-inter transition-opacity hover:opacity-80"
            style={{ fontSize: "12px", color: "rgba(200,184,112,0.5)" }}
          >
            Termos de Uso →
          </a>
        </div>
      </div>
    </div>
  );
};

export default PoliticaDePrivacidadePage;
