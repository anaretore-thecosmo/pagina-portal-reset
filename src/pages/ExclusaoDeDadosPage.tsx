const ExclusaoDeDadosPage = () => {
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
            Solicitação de<br />Exclusão de Dados
          </h1>
          <p className="mt-3 font-inter" style={{ fontSize: "13px", color: "rgba(207,197,184,0.45)" }}>
            Em conformidade com a LGPD — Lei nº 13.709/2018
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">

          <div>
            <div className="w-6 h-px mb-4" style={{ background: "rgba(200,184,112,0.3)" }} />
            <h2 className="font-playfair font-bold mb-3" style={{ fontSize: "16px", color: "#C8B870", letterSpacing: "0.02em" }}>
              1. Seu direito à exclusão
            </h2>
            <p className="font-inter leading-[1.85]" style={{ fontSize: "14px", color: "rgba(207,197,184,0.7)" }}>
              Nos termos da Lei Geral de Proteção de Dados (LGPD), você tem o direito de solicitar a exclusão dos seus dados pessoais que mantemos. Processaremos sua solicitação em até 15 dias úteis.
            </p>
          </div>

          <div>
            <div className="w-6 h-px mb-4" style={{ background: "rgba(200,184,112,0.3)" }} />
            <h2 className="font-playfair font-bold mb-3" style={{ fontSize: "16px", color: "#C8B870", letterSpacing: "0.02em" }}>
              2. Como solicitar
            </h2>
            <p className="font-inter leading-[1.85] whitespace-pre-line" style={{ fontSize: "14px", color: "rgba(207,197,184,0.7)" }}>
              {`Envie um e-mail para ana.retore@gmail.com com o assunto:

"LGPD — Solicitação de Exclusão de Dados"

Inclua no corpo do e-mail:

· Seu nome completo
· E-mail utilizado no cadastro
· Descrição do que deseja excluir (conta completa, dados específicos, etc.)

Responderemos em até 15 dias úteis confirmando a exclusão ou, se houver impedimento legal, explicando o motivo.`}
            </p>
          </div>

          <div>
            <div className="w-6 h-px mb-4" style={{ background: "rgba(200,184,112,0.3)" }} />
            <h2 className="font-playfair font-bold mb-3" style={{ fontSize: "16px", color: "#C8B870", letterSpacing: "0.02em" }}>
              3. O que será excluído
            </h2>
            <p className="font-inter leading-[1.85] whitespace-pre-line" style={{ fontSize: "14px", color: "rgba(207,197,184,0.7)" }}>
              {`Ao confirmar a exclusão, removeremos:

· Seus dados de conta (nome e e-mail);
· Histórico de uso da plataforma;
· Dados de comunicações de suporte.

Os dados de diagnóstico (Mapa do Padrão) são armazenados localmente no seu dispositivo — você pode removê-los a qualquer momento limpando o armazenamento local (localStorage) do navegador.`}
            </p>
          </div>

          <div>
            <div className="w-6 h-px mb-4" style={{ background: "rgba(200,184,112,0.3)" }} />
            <h2 className="font-playfair font-bold mb-3" style={{ fontSize: "16px", color: "#C8B870", letterSpacing: "0.02em" }}>
              4. Exceções legais
            </h2>
            <p className="font-inter leading-[1.85]" style={{ fontSize: "14px", color: "rgba(207,197,184,0.7)" }}>
              Alguns dados podem ser retidos mesmo após a solicitação de exclusão quando houver obrigação legal (ex: dados fiscais por até 5 anos, conforme legislação tributária brasileira). Nesses casos, informaremos você sobre o prazo e a base legal aplicável.
            </p>
          </div>

          <div>
            <div className="w-6 h-px mb-4" style={{ background: "rgba(200,184,112,0.3)" }} />
            <h2 className="font-playfair font-bold mb-3" style={{ fontSize: "16px", color: "#C8B870", letterSpacing: "0.02em" }}>
              5. Cancelamento da assinatura
            </h2>
            <p className="font-inter leading-[1.85]" style={{ fontSize: "14px", color: "rgba(207,197,184,0.7)" }}>
              A solicitação de exclusão de dados não cancela automaticamente sua assinatura. Para cancelar a assinatura, acesse diretamente a plataforma Kiwify ou envie e-mail para ana.retore@gmail.com.
            </p>
          </div>

          <div>
            <div className="w-6 h-px mb-4" style={{ background: "rgba(200,184,112,0.3)" }} />
            <h2 className="font-playfair font-bold mb-3" style={{ fontSize: "16px", color: "#C8B870", letterSpacing: "0.02em" }}>
              6. Contato
            </h2>
            <p className="font-inter leading-[1.85] whitespace-pre-line" style={{ fontSize: "14px", color: "rgba(207,197,184,0.7)" }}>
              {`Ana Retore
E-mail: ana.retore@gmail.com
Indaiatuba, SP, Brasil

Prazo de resposta: até 15 dias úteis.`}
            </p>
          </div>

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
            ← Política de Privacidade
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExclusaoDeDadosPage;
