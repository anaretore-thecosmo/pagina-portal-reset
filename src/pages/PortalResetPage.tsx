import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  computeEspelho,
  getArquetipo,
  type EspelhoData,
} from "@/data/espelhoEngine";

const STORAGE_KEY = "mapa-padrao-session";
const KIWIFY_URL = "https://pay.kiwify.com.br/ns0fjIx";

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.14, duration: 0.6 },
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

  const arquetipo = getArquetipo(data);
  const isSoberana = arquetipo.nome === "Soberana";

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[680px] mx-auto px-6 py-16 space-y-0">

        {/* ── BLOCO 1: Fase + abertura ── */}
        <motion.div initial="hidden" animate="visible" custom={0} variants={fade}>
          <p className="kicker mb-5">Seu diagnóstico</p>
          <p
            className="text-sm uppercase tracking-[0.18em] mb-3"
            style={{ color: "hsl(var(--matte-gold) / 0.7)" }}
          >
            Fase
          </p>
          <h1
            className="font-playfair font-bold uppercase"
            style={{
              fontSize: "clamp(36px, 6vw, 58px)",
              lineHeight: 1.05,
              letterSpacing: "0.06em",
              color: "hsl(var(--matte-gold))",
            }}
          >
            {arquetipo.nome}
          </h1>
          <p
            className="mt-6 text-[16px] leading-relaxed"
            style={{ color: "hsl(var(--graphite) / 0.75)" }}
          >
            {arquetipo.abertura}
          </p>
          <p
            className="mt-4 text-[15px] leading-relaxed"
            style={{ color: "hsl(var(--graphite) / 0.65)" }}
          >
            {arquetipo.dorRaiz}
          </p>
        </motion.div>

        {/* ── DIVIDER ── */}
        <div className="editorial-divider mt-14 mb-14" />

        {/* ── BLOCO 2: 3 sinais que confirmam ── */}
        <motion.div initial="hidden" animate="visible" custom={1} variants={fade}>
          <p className="kicker mb-6">O que o mapa revelou</p>
          <div className="space-y-5">
            {arquetipo.sinais.map((sinal, i) => (
              <div key={i} className="flex items-start gap-5">
                <span
                  className="font-playfair font-bold text-2xl shrink-0"
                  style={{
                    color: "hsl(var(--matte-gold) / 0.4)",
                    lineHeight: 1,
                    marginTop: "2px",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className="text-[14px] leading-relaxed"
                  style={{ color: "hsl(var(--graphite) / 0.7)" }}
                >
                  {sinal}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── DIVIDER ── */}
        <div className="editorial-divider mt-14 mb-14" />

        {/* ── BLOCO 3: Plano de ação ── */}
        <motion.div initial="hidden" animate="visible" custom={2} variants={fade}>
          <p className="kicker mb-5">Seu plano</p>
          <div
            className="p-6 rounded-2xl space-y-4"
            style={{
              border: "1px solid hsl(var(--matte-gold) / 0.2)",
              background: "hsl(var(--matte-gold) / 0.03)",
            }}
          >
            <p
              className="font-playfair font-semibold text-lg leading-snug"
              style={{ color: "hsl(var(--foreground))" }}
            >
              {arquetipo.cicloRecomendado}
            </p>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "hsl(var(--graphite) / 0.6)" }}
            >
              {arquetipo.primeiroPassoTexto}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {arquetipo.codigosRecomendados.map((cod, i) => (
                <span
                  key={i}
                  className="text-[11px] uppercase tracking-[0.15em] px-3 py-1 rounded-full"
                  style={{
                    border: "1px solid hsl(var(--matte-gold) / 0.3)",
                    color: "hsl(var(--matte-gold) / 0.8)",
                  }}
                >
                  {cod}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── DIVIDER ── */}
        <div className="editorial-divider mt-14 mb-14" />

        {/* ── BLOCO 4: O app executa o plano ── */}
        <motion.div initial="hidden" animate="visible" custom={3} variants={fade}>
          <p className="kicker mb-5">A ferramenta</p>
          <p
            className="font-playfair font-semibold text-xl leading-snug mb-4"
            style={{ color: "hsl(var(--foreground))" }}
          >
            O Portal Reset executa esse plano.
          </p>
          <div className="space-y-3">
            {[
              "10 Códigos — rituais de 10 a 20 minutos, repetíveis quando precisar",
              "Ayra — sua guia dentro do portal, presente em cada código",
              isSoberana
                ? "Cléo — desbloqueada como prioridade para você"
                : "Cléo — desbloqueável por consistência (prêmio, não bônus)",
              "Cíclico — você repete quando a vida bagunça, sem recomeçar do zero",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="mt-[6px] w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "hsl(var(--matte-gold))" }}
                />
                <span
                  className="text-[14px] leading-relaxed"
                  style={{ color: "hsl(var(--graphite) / 0.72)" }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Cléo bloco */}
          <div
            className="mt-6 p-4 rounded-xl"
            style={{
              border: "1px solid hsl(var(--graphite) / 0.1)",
              background: "hsl(var(--graphite) / 0.03)",
            }}
          >
            <p
              className="font-playfair font-semibold text-sm"
              style={{ color: "hsl(var(--foreground))" }}
            >
              {arquetipo.cleoBloco.split(". ")[0]}.
            </p>
            <p
              className="text-xs mt-1 leading-relaxed"
              style={{ color: "hsl(var(--graphite) / 0.5)" }}
            >
              {arquetipo.cleoBloco.split(". ").slice(1).join(". ")}
            </p>
          </div>
        </motion.div>

        {/* ── DIVIDER ── */}
        <div className="editorial-divider mt-14 mb-14" />

        {/* ── BLOCO 5: Acesso ── */}
        <motion.div initial="hidden" animate="visible" custom={4} variants={fade}>
          <p className="kicker mb-5">Acesso</p>
          <div className="space-y-2 mb-8">
            <p
              className="font-playfair font-bold"
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                lineHeight: 1.05,
                color: "hsl(var(--foreground))",
              }}
            >
              R$47<span className="text-xl font-normal">/mês</span>
            </p>
            <p
              className="text-xs"
              style={{ color: "hsl(var(--graphite) / 0.45)" }}
            >
              Primeiras 1000 fundadoras · Depois: R$147/mês
            </p>
          </div>

          <Button
            variant="cta"
            size="xl"
            className="w-full gap-2"
            onClick={() => window.open(KIWIFY_URL, "_blank")}
          >
            ATIVAR MEU PORTAL
            <ArrowRight className="w-4 h-4" />
          </Button>

          <p
            className="text-xs mt-3 text-center"
            style={{ color: "hsl(var(--graphite) / 0.4)" }}
          >
            Cancele quando quiser. Aqui é sobre autonomia.
          </p>
        </motion.div>

        {/* ── FOOTER ── */}
        <div
          className="mt-20 pt-6 space-y-4"
          style={{ borderTop: "1px solid hsl(var(--matte-gold) / 0.12)" }}
        >
          <div className="flex flex-wrap gap-4 text-sm font-inter">
            <a
              href="https://portalresetdigital.com/politica-de-privacidade"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Política de Privacidade
            </a>
            <a
              href="https://portalresetdigital.com/exclusao-de-dados"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Exclusão de Dados
            </a>
          </div>
          <p className="font-inter text-muted-foreground/60 text-xs max-w-lg">
            Este produto não garante a obtenção de resultados. Qualquer referência ao desempenho de uma estratégia não deve ser interpretada como uma garantia de resultados.
          </p>
          <p
            className="font-inter text-[11px]"
            style={{ color: "hsl(var(--graphite) / 0.55)" }}
          >
            © Ana Retore. Todos os direitos de design e copy reservados.
          </p>
        </div>

        <div className="h-16" />
      </div>
    </main>
  );
};

export default PortalResetPage;
