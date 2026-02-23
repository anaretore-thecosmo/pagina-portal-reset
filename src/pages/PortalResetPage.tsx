import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, RotateCcw, Zap, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  computeEspelho,
  getPerfilName,
  getAxisMicro,
  type EspelhoData,
} from "@/data/espelhoEngine";

const STORAGE_KEY = "mapa-padrao-session";

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55 },
  }),
};

const PortalResetPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    scores?: number[];
    answers?: (number | null)[];
  } | null;

  const resolved = useMemo(() => {
    if (state?.answers || state?.scores) return state;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const session = JSON.parse(raw);
        const answers: (number | null)[] =
          session.answers?.map?.((a: any) =>
            typeof a === "object" ? a.value : a
          ) ?? [];
        if (answers.length === 24) {
          const scores = Array.from({ length: 12 }, (_, i) => {
            const q1 = 10 - (answers[i * 2] ?? 5);
            const q2 = 10 - (answers[i * 2 + 1] ?? 5);
            return (q1 + q2) / 2;
          });
          return { scores, answers };
        }
      }
    } catch {}
    return null;
  }, [state]);

  useEffect(() => {
    if (!resolved) navigate("/");
  }, [resolved, navigate]);

  if (!resolved) return null;

  const data: EspelhoData = resolved.answers
    ? computeEspelho(resolved.answers)
    : computeEspelho(resolved.scores!.flatMap((s) => [s, s]));

  const perfil = getPerfilName(data);
  const centralMicro = getAxisMicro(data.centralAxis.type);

  const steps = [
    { icon: Zap, text: "Diagnóstico (2 min)" },
    { icon: RotateCcw, text: "Escolha do Código" },
    { icon: Sparkles, text: "Ritual (10–20 min)" },
    { icon: ArrowRight, text: "Micro-ação" },
    { icon: RotateCcw, text: "Repetição em ciclos" },
  ];

  const bullets = [
    "10 Códigos (rituais repetíveis e cíclicos)",
    "Ayra — sua guia dentro do portal",
    "Cléo desbloqueável (prêmio por consistência)",
    "Upgrades contínuos do portal",
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[720px] mx-auto px-6 py-16">

        {/* ===== HERO — continuação do relatório ===== */}
        <motion.div initial="hidden" animate="visible" custom={0} variants={fade}>
          <p className="kicker mb-4">Seu resultado</p>
          <h1
            className="font-playfair font-bold uppercase"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1, letterSpacing: "0.08em" }}
          >
            Seu diagnóstico mostrou:
          </h1>
          <p
            className="font-playfair font-semibold mt-3"
            style={{
              fontSize: "clamp(22px, 3.2vw, 36px)",
              lineHeight: 1.2,
              color: "hsl(var(--matte-gold))",
            }}
          >
            {perfil.nome}
          </p>
        </motion.div>

        {/* ===== BLOCO: O que isso significa ===== */}
        <motion.div initial="hidden" animate="visible" custom={1} variants={fade} className="mt-12">
          <p className="kicker mb-3">O que isso significa</p>
          <p
            className="text-[15px] leading-relaxed"
            style={{ color: "hsl(var(--graphite) / 0.78)" }}
          >
            {perfil.dorRaiz}
          </p>
          <p
            className="text-[15px] leading-relaxed mt-4"
            style={{ color: "hsl(var(--graphite) / 0.78)" }}
          >
            Isso não é diagnóstico clínico. É um mapa do seu padrão de operação
            mental — como você distribui energia, presença e ação nos últimos 30
            dias. E esse mapa mostrou que o custo do automático está mais alto do
            que o retorno.
          </p>
        </motion.div>

        {/* ===== BLOCO: Caminho recomendado ===== */}
        <motion.div initial="hidden" animate="visible" custom={2} variants={fade} className="mt-12">
          <p className="kicker mb-3">Caminho recomendado</p>
          <div
            className="p-5 rounded-2xl"
            style={{
              border: "1px solid hsl(var(--matte-gold) / 0.25)",
              background: "hsl(var(--matte-gold) / 0.04)",
            }}
          >
            <p
              className="font-playfair font-semibold text-lg"
              style={{ color: "hsl(var(--foreground))" }}
            >
              {perfil.recomendacao}
            </p>
            <p
              className="text-sm mt-3"
              style={{ color: "hsl(var(--graphite) / 0.6)" }}
            >
              Conflito central: Eixo {data.centralAxis.axis} — {centralMicro.title.toLowerCase()}.
              Tensão {data.centralAxis.tension.toFixed(0)}.
            </p>
          </div>
        </motion.div>

        <div className="editorial-divider mt-14 mb-14" />

        {/* ===== BLOCO: Como funciona ===== */}
        <motion.div initial="hidden" animate="visible" custom={3} variants={fade}>
          <p className="kicker mb-6">Como funciona o Portal Reset</p>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "hsl(var(--matte-gold) / 0.1)" }}
                >
                  <step.icon className="w-4 h-4" style={{ color: "hsl(var(--matte-gold))" }} />
                </div>
                <span className="text-sm" style={{ color: "hsl(var(--graphite) / 0.75)" }}>
                  {step.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ===== BLOCO: O que você recebe ===== */}
        <motion.div initial="hidden" animate="visible" custom={4} variants={fade} className="mt-12">
          <p className="kicker mb-4">O que você recebe</p>
          <div className="space-y-3">
            {bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "hsl(var(--matte-gold))" }}
                />
                <span className="text-sm" style={{ color: "hsl(var(--graphite) / 0.75)" }}>
                  {b}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ===== BLOCO: Cléo ===== */}
        <motion.div initial="hidden" animate="visible" custom={5} variants={fade} className="mt-12">
          <div
            className="p-5 rounded-2xl flex gap-4 items-start"
            style={{
              border: "1px solid hsl(var(--graphite) / 0.1)",
              background: "hsl(var(--graphite) / 0.03)",
            }}
          >
            <Gift className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "hsl(var(--matte-gold))" }} />
            <div>
              <p className="font-playfair font-semibold text-sm" style={{ color: "hsl(var(--foreground))" }}>
                Cléo não é bônus. Cléo é consequência.
              </p>
              <p className="text-xs mt-1" style={{ color: "hsl(var(--graphite) / 0.55)" }}>
                Você desbloqueia após consistência. Base histórica. Magnetismo estratégico.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="editorial-divider mt-14 mb-14" />

        {/* ===== OFERTA ===== */}
        <motion.div initial="hidden" animate="visible" custom={6} variants={fade} className="text-center">
          <p className="kicker mb-4">Oferta Fundadoras</p>
          <p
            className="font-playfair font-bold"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "hsl(var(--foreground))" }}
          >
            R$47<span className="text-lg font-normal">/mês</span>
          </p>
          <p className="text-xs mt-1" style={{ color: "hsl(var(--graphite) / 0.5)" }}>
            Primeiras 1000 fundadoras · Depois: R$147/mês com upgrades
          </p>

          <div className="mt-8">
            <Button variant="cta" size="xl" className="gap-2">
              ATIVAR MEU PORTAL (R$47/mês)
              <ArrowRight className="w-4 h-4" />
            </Button>
            <p className="text-xs mt-3" style={{ color: "hsl(var(--graphite) / 0.45)" }}>
              Cancele quando quiser. Aqui é sobre autonomia.
            </p>
          </div>
        </motion.div>

        {/* Author credit */}
        <div className="mt-16 pt-4" style={{ borderTop: "1px solid hsl(var(--matte-gold) / 0.15)" }}>
          <p className="font-inter text-[11px] md:text-[12px] text-left" style={{ color: "hsl(var(--graphite) / 0.65)" }}>
            © Ana Retore. Todos os direitos de design e copy reservados.
          </p>
        </div>

        <div className="h-20" />
      </div>
    </main>
  );
};

export default PortalResetPage;
