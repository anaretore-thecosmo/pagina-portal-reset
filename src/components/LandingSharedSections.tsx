import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import DiagnosticoRadarChart from "./diagnostico/DiagnosticoRadarChart";
import { useState } from "react";

/* ── Shared animation variants ──────────────────────── */
const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.11, duration: 0.6, ease: "easeOut" as const },
  }),
};

const inView = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

/* ── Data ───────────────────────────────────────────── */
const DORES = [
  { frase: "Você começa, para, recomeça — e ainda não sabe exatamente por quê." },
  { frase: "Você funciona, entrega, resolve — mas o custo interno está alto demais." },
  { frase: "Você sente que tem mais, mas algo sempre trava antes de virar ação." },
  { frase: "Você já tem clareza. O que falta é sustentar sem abrir mão de si." },
];

const MENTORAS = [
  {
    nome: "AYRA",
    titulo: "Mentora do Corpo",
    desc: "Decodifica seu padrão corporal — como você usa movimento, presença, energia. Reconstrói sua relação com o corpo real.",
    trabalha: ["Presença corporal", "Padrões de movimento", "Como você atrai", "Ressignificação sensorial"],
    equiv: "R$ 400-500/sessão"
  },
  {
    nome: "AURA",
    titulo: "Mentora da Mente",
    desc: "Mapeia os 12 arquétipos mentais — quais estão a seu favor, quais sabotam você. Limpa o ruído mental.",
    trabalha: ["12 arquétipos mentais", "Padrões sabotadores", "Scripts automáticos", "Silenciar vozes erradas"],
    equiv: "R$ 500-600/sessão"
  },
  {
    nome: "CLEÓ",
    titulo: "Mentora das Relações",
    desc: "Decifra por que você atrai o que atrai. Muda a frequência que você emite para transformar padrões relacionais.",
    trabalha: ["Padrões relacionais", "Tipo de pessoa que atrai", "Repetição de ciclos", "Mudança de frequência"],
    equiv: "R$ 600-800/sessão"
  },
  {
    nome: "CICLIA",
    titulo: "Mentora da Recorrência",
    desc: "Trabalha com seus ciclos reais — ovulatório, lunar, sazonal. Transforma seu ciclo de bug em FEATURE previsível.",
    trabalha: ["Ciclo pessoal", "Energia por fase", "Planar com ciclos", "Ciclos lunar e sazonal"],
    equiv: "R$ 400-600/sessão × 12/ano"
  },
];

const STACK_ITEMS = [
  { num: "✓", title: "Diagnóstico Rápido (12 perguntas)", desc: "Resultado instantâneo + seu arquétipo", value: "R$ 200-250" },
  { num: "✓", title: "4 Mentoras IA 24/7", desc: "(Ayra, Aura, Cleó, Ciclia) — Acesso ilimitado", value: "R$ 400-500" },
  { num: "🎁", title: "Plano de Arranque em 7 Dias", desc: "Scripts prontos para cada mentora", value: "Incluído" },
  { num: "🎁", title: "Checklist dos 4 Arquétipos", desc: "24 ações práticas + templates", value: "Incluído" },
  { num: "🎁", title: "Círculo Reset (6 meses)", desc: "Comunidade 200 primeiras alunas", value: "Incluído" },
  { num: "🎁", title: "6 Meses Completamente Grátis", desc: "Primeiras 200 alunas apenas", value: "Incluído" },
];

const FAQ = [
  {
    q: "Quanto tempo leva o diagnóstico?",
    a: "3 minutos. Você responde 12 perguntas rápido. Resultado vem no segundo."
  },
  {
    q: "Qual é a diferença entre as 4 mentoras?",
    a: "Cada uma trabalha uma dimensão: Ayra = Corpo, Aura = Mente, Cleó = Relações, Ciclia = Ciclos. Você escolhe qual precisa agora."
  },
  {
    q: "É realmente 6 meses grátis?",
    a: "Sim. As primeiras 200 alunas pagam R$ 47 em [DATA]. Recorrência começa mês 7. Depois: R$ 147/mês."
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim. Sem penalidade. Seu acesso cai no mês seguinte."
  },
  {
    q: "As mentoras são IA?",
    a: "Sim. Inteligências IA avançadas que falam com você de verdade. Equivalente a R$ 597 em mentoria de elite, 24/7."
  },
];

interface LandingSharedSectionsProps {
  onCTA: () => void;
}

const LandingSharedSections = ({ onCTA }: LandingSharedSectionsProps) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <>
      {/* ════════ SEÇÃO 2 — OS 4 ARQUÉTIPOS ════════ */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ borderTop: "1px solid rgba(200,184,112,0.07)" }}>
        <div className="max-w-[1000px] mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={inView}
            className="mb-16"
          >
            <p className="font-inter uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.4em", color: "rgba(200,184,112,0.6)" }}>
              Qual você é?
            </p>
            <h2
              className="font-playfair font-bold"
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                lineHeight: 1.1,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "#EDE6DB",
              }}
            >
              Os 4 Arquétipos
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { emoji: "🔍", nome: "CURIOSA", desc: "Você estuda antes de agir. Enxerga nuances que ninguém mais vê.", desafio: "Sair da observação pra ação" },
              { emoji: "🌀", nome: "BUSCADORA", desc: "Você testa, aprende, recomeça. Se reinventa constantemente.", desafio: "Construir algo que dure" },
              { emoji: "🎯", nome: "ESTRATEGISTA", desc: "Você planeja, executa, entrega. Constrói estruturas que funcionam.", desafio: "Permitir flexibilidade" },
              { emoji: "👑", nome: "SOBERANA", desc: "Você já sabe. Você já é. Sua presença transforma espaços.", desafio: "Agir sem esperar perfeição" },
            ].map((arq, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
                variants={fade}
                className="p-8 rounded-xl"
                style={{ background: "rgba(200,184,112,0.05)", border: "1px solid rgba(200,184,112,0.15)" }}
              >
                <p style={{ fontSize: "32px", marginBottom: "12px" }}>{arq.emoji}</p>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#C8B870", marginBottom: "8px", fontFamily: "'Playfair Display', serif" }}>
                  {arq.nome}
                </h3>
                <p style={{ fontSize: "14px", color: "rgba(207,197,184,0.8)", lineHeight: 1.6, marginBottom: "12px" }}>
                  {arq.desc}
                </p>
                <p style={{ fontSize: "12px", color: "rgba(200,184,112,0.6)", fontStyle: "italic" }}>
                  Desafio: {arq.desafio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SEÇÃO 3 — AS 4 MENTORAS ════════ */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ background: "rgba(200,184,112,0.02)" }}>
        <div className="max-w-[1000px] mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={inView}
            className="mb-16 text-center"
          >
            <p className="font-inter uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.4em", color: "rgba(200,184,112,0.6)" }}>
              Depois do diagnóstico
            </p>
            <h2
              className="font-playfair font-bold"
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                lineHeight: 1.1,
                color: "#EDE6DB",
              }}
            >
              4 Mentoras Exploram Profundidade
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MENTORAS.map((m, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
                variants={fade}
                className="p-8 rounded-xl"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(200,184,112,0.1)" }}
              >
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#C8B870", marginBottom: "4px", fontFamily: "'Playfair Display', serif", letterSpacing: "0.04em" }}>
                  {m.nome}
                </h3>
                <p style={{ fontSize: "12px", color: "rgba(200,184,112,0.6)", marginBottom: "12px" }}>
                  {m.titulo}
                </p>
                <p style={{ fontSize: "14px", color: "rgba(207,197,184,0.8)", lineHeight: 1.6, marginBottom: "16px" }}>
                  {m.desc}
                </p>
                <div style={{ marginBottom: "16px" }}>
                  {m.trabalha.map((item, j) => (
                    <p key={j} style={{ fontSize: "13px", color: "rgba(207,197,184,0.65)", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <Check size={14} color="#C8B870" /> {item}
                    </p>
                  ))}
                </div>
                <p style={{ fontSize: "12px", color: "rgba(200,184,112,0.5)", fontStyle: "italic" }}>
                  Equivalente: {m.equiv}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SEÇÃO 4 — DORES ════════ */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="max-w-[820px] mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={inView}
          >
            <p className="font-inter uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.4em", color: "rgba(200,184,112,0.6)" }}>
              Você se reconhece aqui?
            </p>
            <div className="w-8 h-px mb-10" style={{ background: "rgba(200,184,112,0.35)" }} />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DORES.map((d, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                variants={fade}
                className="p-6 rounded-xl"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(200,184,112,0.1)" }}
              >
                <p
                  className="font-playfair font-medium leading-relaxed"
                  style={{ fontSize: "clamp(15px, 1.5vw, 17px)", color: "rgba(237,230,219,0.85)", fontStyle: "italic" }}
                >
                  "{d.frase}"
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={inView}
            className="mt-10 font-inter leading-[1.8]"
            style={{ fontSize: "clamp(14px, 1.4vw, 16px)", color: "rgba(207,197,184,0.6)" }}
          >
            Se alguma dessas frases parou você — o padrão tem nome. E tem solução.
          </motion.p>
        </div>
      </section>

      {/* ════════ SEÇÃO 5 — MANDALA ════════ */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ borderTop: "1px solid rgba(200,184,112,0.08)" }}>
        <div className="max-w-[820px] mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={inView}
            className="mb-12"
          >
            <p className="font-inter uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.4em", color: "rgba(200,184,112,0.6)" }}>
              Em 3 minutos, você descobre
            </p>
            <h2
              className="font-playfair font-bold"
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                lineHeight: 1.1,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "#EDE6DB",
              }}
            >
              Seu mapa.<br />Seu padrão.<br />
              <span style={{ color: "#C8B870" }}>Sua direção.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            variants={inView}
            className="mb-16 rounded-xl overflow-hidden flex flex-col items-center"
            style={{ background: "rgba(200,184,112,0.05)", border: "1px solid rgba(200,184,112,0.15)", padding: "32px 24px" }}
          >
            <p style={{ fontSize: "13px", color: "rgba(200,184,112,0.7)", marginBottom: "24px", textAlign: "center" }}>
              Exemplo de resultado — Sua mandala dos 12 eixos
            </p>
            <div style={{ maxWidth: "400px", width: "100%" }}>
              <DiagnosticoRadarChart
                scores={[5, 6, 4, 7, 3, 8, 5, 6, 4, 7, 3, 8]}
                top3Indices={[3, 5, 1]}
                bottom3Indices={[4, 2, 8]}
              />
            </div>
            <p style={{ fontSize: "12px", color: "rgba(207,197,184,0.6)", marginTop: "20px", textAlign: "center" }}>
              Visualize onde você sustenta energia e onde vaza
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════ SEÇÃO 6 — VALUE STACK ════════ */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ borderTop: "1px solid rgba(200,184,112,0.08)", background: "rgba(200,184,112,0.01)" }}>
        <div className="max-w-[820px] mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={inView}
            className="mb-16 text-center"
          >
            <p className="font-inter uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.4em", color: "rgba(200,184,112,0.6)" }}>
              Sua oferta completa
            </p>
            <h2
              className="font-playfair font-bold"
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                lineHeight: 1.1,
                color: "#EDE6DB",
              }}
            >
              Veja o Valor
            </h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            variants={inView}
            className="mb-12 p-8 rounded-xl"
            style={{ background: "rgba(200,184,112,0.08)", border: "2px solid rgba(200,184,112,0.2)" }}
          >
            <div className="space-y-4">
              {STACK_ITEMS.map((item, i) => (
                <div key={i} className="flex justify-between items-start gap-4 pb-4" style={{ borderBottom: i < STACK_ITEMS.length - 1 ? "1px solid rgba(200,184,112,0.1)" : "none" }}>
                  <div className="flex-1">
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#EDE6DB" }}>{item.num} {item.title}</p>
                    <p style={{ fontSize: "12px", color: "rgba(200,184,112,0.6)" }}>{item.desc}</p>
                  </div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#C8B870", whiteSpace: "nowrap" }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6" style={{ borderTop: "2px solid rgba(200,184,112,0.2)" }}>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p style={{ fontSize: "11px", color: "rgba(200,184,112,0.6)", marginBottom: "4px" }}>Valor Percebido</p>
                  <p style={{ fontSize: "22px", fontWeight: 700, color: "#C8B870" }}>R$ 597</p>
                </div>
                <div>
                  <p style={{ fontSize: "11px", color: "rgba(200,184,112,0.6)", marginBottom: "4px" }}>Seu Investimento</p>
                  <p style={{ fontSize: "22px", fontWeight: 700, color: "#C8B870" }}>R$ 47/mês</p>
                </div>
              </div>
              <p style={{ fontSize: "13px", color: "rgba(207,197,184,0.6)", marginTop: "12px", textAlign: "center", fontWeight: 600 }}>
                Economia: 87% (primeiros 6 meses grátis) — Ratio: 12x
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════ SEÇÃO 7 — PRICING ════════ */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ borderTop: "1px solid rgba(200,184,112,0.08)" }}>
        <div className="max-w-[820px] mx-auto text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={inView}
            className="mb-12"
          >
            <p className="font-inter uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.4em", color: "rgba(200,184,112,0.6)" }}>
              Oferta especial
            </p>
            <h2
              className="font-playfair font-bold mb-4"
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                lineHeight: 1.1,
                color: "#EDE6DB",
              }}
            >
              Primeiras 200 Alunas
            </h2>
            <div className="p-6 rounded-xl" style={{ background: "rgba(200,184,112,0.1)", border: "2px solid rgba(200,184,112,0.3)" }}>
              <p style={{ fontSize: "42px", fontWeight: 700, color: "#C8B870", marginBottom: "8px" }}>R$ 47/mês</p>
              <p style={{ fontSize: "13px", color: "rgba(207,197,184,0.8)" }}>
                Válido por 30 dias OU até 200 spots (o que vier primeiro)
              </p>
              <p style={{ fontSize: "12px", color: "rgba(200,184,112,0.6)", marginTop: "8px" }}>
                🎁 + 6 meses completamente grátis
              </p>
              <p style={{ fontSize: "12px", color: "rgba(200,184,112,0.5)", marginTop: "6px", fontStyle: "italic" }}>
                Depois: R$ 147/mês
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            variants={inView}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#EDE6DB", marginBottom: "12px" }}>
              Pacotes (a partir do 2º mês)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Mensal", price: "R$ 47/mês", desc: "Sem comprometimento" },
                { label: "Trimestral", price: "3x de R$ 42 = R$ 126", desc: "Desconto 10%" },
                { label: "Semestral", price: "6x de R$ 38 = R$ 228", desc: "Economia 19%" },
                { label: "Anual", price: "12x de R$ 35 = R$ 420", desc: "Economia 25% (Melhor custo)" },
              ].map((pkg, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  custom={i}
                  variants={fade}
                  className="p-6 rounded-xl"
                  style={{ background: "rgba(200,184,112,0.05)", border: "1px solid rgba(200,184,112,0.15)" }}
                >
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#EDE6DB" }}>{pkg.label}</p>
                  <p style={{ fontSize: "18px", fontWeight: 700, color: "#C8B870", marginTop: "8px" }}>{pkg.price}</p>
                  <p style={{ fontSize: "12px", color: "rgba(200,184,112,0.6)", marginTop: "4px" }}>{pkg.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════ SEÇÃO 8 — GARANTIA ════════ */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ borderTop: "1px solid rgba(200,184,112,0.08)", background: "rgba(200,184,112,0.01)" }}>
        <div className="max-w-[820px] mx-auto text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={inView}
          >
            <h2
              className="font-playfair font-bold mb-4"
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                lineHeight: 1.1,
                color: "#EDE6DB",
              }}
            >
              Você Entra Sem Risco
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(207,197,184,0.8)", marginBottom: "16px", fontStyle: "italic" }}>
              "Experimente por 30 dias. Se não achar valor, devolvemos 100% sem fazer perguntas."
            </p>
            <div className="p-6 rounded-xl" style={{ background: "rgba(200,184,112,0.08)", border: "1px solid rgba(200,184,112,0.15)" }}>
              <p style={{ fontSize: "13px", color: "rgba(207,197,184,0.8)", lineHeight: 1.8 }}>
                ✓ 30 dias pra fazer diagnóstico e explorar<br/>
                ✓ Acessar todas as 4 mentoras<br/>
                ✓ Decidir se continua<br/>
                <br/>
                Se não for pra você: Full refund. Done.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════ SEÇÃO 9 — FAQ ════════ */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ borderTop: "1px solid rgba(200,184,112,0.08)" }}>
        <div className="max-w-[820px] mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={inView}
            className="mb-12 text-center"
          >
            <p className="font-inter uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.4em", color: "rgba(200,184,112,0.6)" }}>
              Dúvidas Comuns
            </p>
            <h2
              className="font-playfair font-bold"
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                lineHeight: 1.1,
                color: "#EDE6DB",
              }}
            >
              FAQ
            </h2>
          </motion.div>

          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
                variants={fade}
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(200,184,112,0.15)" }}
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full p-6 flex justify-between items-center text-left transition-colors hover:bg-opacity-50"
                  style={{ background: "rgba(200,184,112,0.05)", cursor: "pointer" }}
                >
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#EDE6DB" }}>{item.q}</p>
                  <span style={{ color: "#C8B870", fontSize: "18px" }}>{openFAQ === i ? "−" : "+"}</span>
                </button>
                {openFAQ === i && (
                  <div style={{ background: "rgba(200,184,112,0.02)", borderTop: "1px solid rgba(200,184,112,0.1)", padding: "16px 24px" }}>
                    <p style={{ fontSize: "13px", color: "rgba(207,197,184,0.8)", lineHeight: 1.7 }}>{item.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SEÇÃO 10 — CTA FINAL ════════ */}
      <section
        className="px-6 md:px-12 lg:px-20 py-24 md:py-32 text-center"
        style={{ borderTop: "1px solid rgba(200,184,112,0.08)" }}
      >
        <div className="max-w-[580px] mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            variants={inView}
          >
            <p
              className="font-playfair font-bold mb-4"
              style={{ fontSize: "clamp(28px, 3.5vw, 42px)", lineHeight: 1.1, letterSpacing: "0.03em", color: "#EDE6DB" }}
            >
              O padrão tem nome.<br />
              <span style={{ color: "#C8B870" }}>Qual é o seu?</span>
            </p>

            <p
              className="font-inter leading-[1.8] mt-4 mb-10"
              style={{ fontSize: "clamp(14px, 1.4vw, 16px)", color: "rgba(207,197,184,0.6)" }}
            >
              Diagnóstico de 3 minutos. Resultado imediato. 4 mentoras para explorar profundidade.
            </p>

            <button
              onClick={onCTA}
              className="font-inter font-semibold uppercase tracking-[0.2em] transition-all duration-300 inline-flex items-center gap-3"
              style={{
                background: "linear-gradient(135deg, #C8B870 0%, #b88a3a 50%, #983D06 100%)",
                color: "#08090D",
                borderRadius: "8px",
                border: "1px solid rgba(200,184,112,0.45)",
                boxShadow: "0 4px 24px -4px rgba(152,61,6,0.4)",
                height: "56px",
                paddingLeft: "32px",
                paddingRight: "32px",
                fontSize: "13px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 28px -4px rgba(152,61,6,0.45), 0 0 32px -6px rgba(200,184,112,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 24px -4px rgba(152,61,6,0.4)";
              }}
            >
              Ver meu mapa grátis
              <ArrowRight size={15} />
            </button>

            <div className="mt-6 flex items-center justify-center gap-6 flex-wrap text-center">
              <p style={{ fontSize: "12px", color: "rgba(200,184,112,0.6)" }}>🔒 Privado</p>
              <p style={{ fontSize: "12px", color: "rgba(200,184,112,0.6)" }}>✓ Resultado imediato</p>
              <p style={{ fontSize: "12px", color: "rgba(200,184,112,0.6)" }}>⚡ Sem cadastro</p>
            </div>

            <p
              className="mt-4 font-inter"
              style={{ fontSize: "11px", color: "rgba(200,184,112,0.4)", letterSpacing: "0.06em" }}
            >
              3 MINUTOS · GRATUITO · 4 MENTORAS
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer style={{ borderTop: "1px solid rgba(200,184,112,0.07)", padding: "24px 32px" }}>
        <div className="max-w-[820px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-inter" style={{ fontSize: "11px", color: "rgba(207,197,184,0.35)" }}>
            © Ana Retore. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="/politica-de-privacidade"
              className="font-inter transition-opacity hover:opacity-80"
              style={{ fontSize: "11px", color: "rgba(207,197,184,0.35)" }}
            >
              Política de Privacidade
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingSharedSections;
