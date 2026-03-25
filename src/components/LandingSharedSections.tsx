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
  { num: "01", title: "Diagnóstico Rápido (12 perguntas)", desc: "Resultado instantâneo + seu arquétipo", value: "R$ 200-250" },
  { num: "02", title: "4 Mentoras IA 24/7", desc: "(Ayra, Aura, Cleó, Ciclia) — Acesso ilimitado", value: "R$ 400-500" },
  { num: "03", title: "Plano de Arranque em 7 Dias", desc: "Scripts prontos para cada mentora", value: "Incluído" },
  { num: "04", title: "Checklist dos 4 Arquétipos", desc: "24 ações práticas + templates", value: "Incluído" },
  { num: "05", title: "Círculo Reset (6 meses)", desc: "Comunidade 200 primeiras fundadoras", value: "Incluído" },
  { num: "06", title: "6 Meses Completamente Incluídos", desc: "Primeiras 200 fundadoras apenas", value: "Incluído" },
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
    q: "É realmente 6 meses incluídos?",
    a: "Sim. As primeiras 200 fundadoras têm 6 meses incluídos no investimento inicial. A recorrência começa no mês 7. Depois: R$ 147/mês."
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim. Sem penalidade. Seu acesso permanece até o fim do período pago."
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
              { nome: "CURIOSA", desc: "Você estuda antes de agir. Enxerga nuances que ninguém mais vê.", desafio: "Sair da observação pra ação" },
              { nome: "BUSCADORA", desc: "Você testa, aprende, recomeça. Se reinventa constantemente.", desafio: "Construir algo que dure" },
              { nome: "ESTRATEGISTA", desc: "Você planeja, executa, entrega. Constrói estruturas que funcionam.", desafio: "Permitir flexibilidade" },
              { nome: "SOBERANA", desc: "Você já sabe. Você já é. Sua presença transforma espaços.", desafio: "Agir sem esperar perfeição" },
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
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "11px",
                    letterSpacing: "0.3em",
                    color: "rgba(200,184,112,0.4)",
                    marginBottom: "12px",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
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

      {/* ════════ SEÇÃO 4B — CÓDIGO ZERO / MANIFESTO FUNDADORA ════════ */}
      <section
        className="px-6 md:px-12 lg:px-20 py-24 md:py-32"
        style={{ borderTop: "1px solid rgba(200,184,112,0.08)", background: "rgba(200,184,112,0.02)" }}
      >
        <div className="max-w-[700px] mx-auto text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={inView}
          >
            <p className="font-inter uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.5em", color: "rgba(200,184,112,0.5)" }}>
              Acesso fundadora · Código Zero
            </p>

            <div className="w-6 h-px mx-auto mb-10" style={{ background: "rgba(200,184,112,0.3)" }} />

            <h2
              className="font-playfair font-bold mb-8"
              style={{
                fontSize: "clamp(26px, 3.5vw, 44px)",
                lineHeight: 1.12,
                letterSpacing: "0.02em",
                color: "#EDE6DB",
              }}
            >
              Você está aqui<br />
              <span style={{ color: "#C8B870" }}>antes do mundo saber.</span>
            </h2>

            <p
              className="font-inter leading-[2] mb-10"
              style={{ fontSize: "clamp(14px, 1.5vw, 17px)", color: "rgba(207,197,184,0.72)" }}
            >
              Esta ferramenta ainda não foi testada por centenas de pessoas.<br />
              Não tem depoimentos. Não tem provas sociais acumuladas.<br />
              Tem algo mais raro: você é a geração que escreve o primeiro capítulo.
            </p>

            <div
              className="p-8 rounded-xl mb-10 text-left"
              style={{ background: "rgba(200,184,112,0.05)", border: "1px solid rgba(200,184,112,0.15)" }}
            >
              <p
                className="font-playfair font-medium leading-[1.9]"
                style={{ fontSize: "clamp(15px, 1.6vw, 18px)", color: "rgba(237,230,219,0.85)", fontStyle: "italic", textAlign: "center" }}
              >
                "Não temos depoimentos.<br />
                Porque quem está aqui<br />
                ainda está escrevendo o primeiro."
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              {[
                { num: "01", titulo: "Descoberta", texto: "Você acessou uma frequência que a maioria nunca vai conhecer — porque não buscou." },
                { num: "02", titulo: "Escolha", texto: "Ser fundadora não é uma oferta. É uma posição. As primeiras 200 moldam o que vem depois." },
                { num: "03", titulo: "Identidade", texto: "Daqui a seis meses, haverá quem diga que deveria ter entrado antes. Você não vai ser essa pessoa." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  custom={i}
                  variants={fade}
                  className="p-6 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(200,184,112,0.1)" }}
                >
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "11px", color: "rgba(200,184,112,0.4)", letterSpacing: "0.25em", marginBottom: "10px" }}>
                    {item.num}
                  </p>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#C8B870", marginBottom: "8px" }}>{item.titulo}</p>
                  <p style={{ fontSize: "13px", color: "rgba(207,197,184,0.7)", lineHeight: 1.65 }}>{item.texto}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
              Exemplo de resultado — Sua mandala dos 6 eixos
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
              O que você acessa
            </p>
            <h2
              className="font-playfair font-bold"
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                lineHeight: 1.1,
                color: "#EDE6DB",
              }}
            >
              Tudo incluído
            </h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            variants={inView}
            className="mb-12 p-8 rounded-xl"
            style={{ background: "rgba(200,184,112,0.06)", border: "1px solid rgba(200,184,112,0.15)" }}
          >
            <div className="space-y-4">
              {STACK_ITEMS.map((item, i) => (
                <div key={i} className="flex justify-between items-start gap-4 pb-4" style={{ borderBottom: i < STACK_ITEMS.length - 1 ? "1px solid rgba(200,184,112,0.08)" : "none" }}>
                  <div className="flex gap-4 flex-1">
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "13px", color: "rgba(200,184,112,0.4)", flexShrink: 0, paddingTop: "1px" }}>
                      {item.num}
                    </span>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: "#EDE6DB" }}>{item.title}</p>
                      <p style={{ fontSize: "12px", color: "rgba(200,184,112,0.6)" }}>{item.desc}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#C8B870", whiteSpace: "nowrap" }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(200,184,112,0.15)" }}>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p style={{ fontSize: "11px", color: "rgba(200,184,112,0.6)", marginBottom: "4px" }}>Valor percebido</p>
                  <p style={{ fontSize: "22px", fontWeight: 700, color: "#C8B870" }}>R$ 597</p>
                </div>
                <div>
                  <p style={{ fontSize: "11px", color: "rgba(200,184,112,0.6)", marginBottom: "4px" }}>Seu investimento</p>
                  <p style={{ fontSize: "22px", fontWeight: 700, color: "#C8B870" }}>R$ 47/mês</p>
                </div>
              </div>
              <p style={{ fontSize: "13px", color: "rgba(207,197,184,0.5)", marginTop: "12px", textAlign: "center", fontStyle: "italic" }}>
                O valor percebido é R$ 597. O investimento é R$ 47.
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
              Código Zero · Acesso Fundadora
            </p>
            <h2
              className="font-playfair font-bold mb-2"
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                lineHeight: 1.1,
                color: "#EDE6DB",
              }}
            >
              Primeiras 200
            </h2>
            <p
              className="font-inter mb-8"
              style={{ fontSize: "clamp(13px, 1.3vw, 15px)", color: "rgba(207,197,184,0.55)", fontStyle: "italic" }}
            >
              A frequência desta ferramenta ainda está sendo descoberta.<br />
              Quem entra agora define o que ela se torna.
            </p>
            <div className="p-8 rounded-xl" style={{ background: "rgba(200,184,112,0.06)", border: "1px solid rgba(200,184,112,0.2)" }}>
              <p style={{ fontSize: "11px", fontFamily: "'Playfair Display', serif", fontWeight: 700, letterSpacing: "0.3em", color: "rgba(200,184,112,0.5)", marginBottom: "12px" }}>INVESTIMENTO FUNDADORA</p>
              <p style={{ fontSize: "36px", fontWeight: 700, color: "#C8B870", marginBottom: "4px", fontFamily: "'Playfair Display', serif" }}>R$ 47/mês</p>
              <p style={{ fontSize: "13px", color: "rgba(207,197,184,0.75)", marginBottom: "16px" }}>
                6 meses completamente incluídos no primeiro acesso.
              </p>
              <div style={{ borderTop: "1px solid rgba(200,184,112,0.12)", paddingTop: "16px" }}>
                <p style={{ fontSize: "12px", color: "rgba(200,184,112,0.5)", fontStyle: "italic" }}>
                  Condição exclusiva para as primeiras 200 · Depois: R$ 147/mês
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            variants={inView}
          >
            <p className="font-inter mb-6" style={{ fontSize: "12px", letterSpacing: "0.06em", color: "rgba(200,184,112,0.45)", textTransform: "uppercase" }}>
              Planos a partir do 2º mês
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Mensal", price: "R$ 47/mês", desc: "Sem comprometimento" },
                { label: "Trimestral", price: "3x de R$ 42 = R$ 126", desc: "Desconto 10%" },
                { label: "Semestral", price: "6x de R$ 38 = R$ 228", desc: "Economia 19%" },
                { label: "Anual", price: "12x de R$ 35 = R$ 420", desc: "Economia 25% — Melhor custo" },
              ].map((pkg, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  custom={i}
                  variants={fade}
                  className="p-6 rounded-xl"
                  style={{ background: "rgba(200,184,112,0.05)", border: "1px solid rgba(200,184,112,0.12)" }}
                >
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#EDE6DB" }}>{pkg.label}</p>
                  <p style={{ fontSize: "18px", fontWeight: 700, color: "#C8B870", marginTop: "8px" }}>{pkg.price}</p>
                  <p style={{ fontSize: "12px", color: "rgba(200,184,112,0.55)", marginTop: "4px" }}>{pkg.desc}</p>
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
              "Trinta dias para explorar. Se não fizer sentido, devolvemos tudo — sem perguntas."
            </p>
            <div className="p-6 rounded-xl" style={{ background: "rgba(200,184,112,0.06)", border: "1px solid rgba(200,184,112,0.12)" }}>
              <p style={{ fontSize: "13px", color: "rgba(207,197,184,0.8)", lineHeight: 2 }}>
                30 dias para fazer o diagnóstico e explorar as mentoras.<br />
                Acesso completo às 4 dimensões.<br />
                Decida com clareza se continua.<br />
                <br />
                <span style={{ color: "#C8B870" }}>Reembolso integral. Sem burocracia.</span>
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

            <div className="mt-5">
              <p style={{ fontSize: "12px", color: "rgba(200,184,112,0.5)", letterSpacing: "0.06em" }}>
                3 minutos · Gratuito · 30 dias de garantia
              </p>
            </div>

            <p
              className="mt-3 font-inter"
              style={{ fontSize: "11px", color: "rgba(200,184,112,0.35)", letterSpacing: "0.06em" }}
            >
              SEM CADASTRO · RESULTADO IMEDIATO · PRIVADO
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
            <a
              href="/exclusao-de-dados"
              className="font-inter transition-opacity hover:opacity-80"
              style={{ fontSize: "11px", color: "rgba(207,197,184,0.35)" }}
            >
              Exclusão de Dados
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingSharedSections;
