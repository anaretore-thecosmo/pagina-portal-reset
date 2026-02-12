import { useState, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  quizQuestions,
  quizRespiros,
  type QuizSession,
} from "@/data/quizMapaPadrao";
import quizIntroImage from "@/assets/quiz-intro-editorial.jpg";

const STORAGE_KEY = "quiz-mapa-padrao-session";
const RESPIRO_AFTER = [6, 12, 18, 24]; // 1-based question numbers
const SCALE = [1, 2, 3, 4, 5, 6, 7, 8, 9];

type Step = "intro" | "question" | "respiro";

function generateId(): string {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/* ── Intro Screen ──────────────────────────────────── */

const IntroScreen = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="relative" style={{ background: "#032A33" }}>

      {/* ════════ DOBRA 1 — HERO DARK, FULL-BLEED ════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Background image — atmosphere */}
        <div className="absolute inset-0">
          <img
            src={quizIntroImage}
            alt="Portal de pedra com luz dourada"
            className="w-full h-full object-cover"
            loading="eager"
            style={{ opacity: 0.24, filter: "blur(1px)" }}
          />
        </div>

        {/* Overlay: left opaque, right semi-transparent */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(3,42,51,0.85) 0%, rgba(3,42,51,0.85) 45%, rgba(3,42,51,0.60) 100%)",
          }}
        />

        {/* Vertical light line — "portal crack" */}
        <div
          className="absolute top-0 bottom-0 hidden lg:block pointer-events-none"
          style={{
            left: "50%",
            width: "1px",
            background: "linear-gradient(to bottom, transparent 10%, rgba(200,184,112,0.12) 40%, rgba(200,184,112,0.18) 50%, rgba(200,184,112,0.12) 60%, transparent 90%)",
          }}
        />

        {/* Black vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.45) 100%)" }}
        />

        {/* Film grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Gold top rule */}
        <div
          className="absolute top-0 left-0 right-0 h-px z-10"
          style={{ background: "linear-gradient(90deg, transparent 8%, rgba(200,184,112,0.22) 35%, rgba(200,184,112,0.22) 65%, transparent 92%)" }}
        />

        {/* ── Content: 12-col grid ── */}
        <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center min-h-screen lg:min-h-screen">

            {/* ── LEFT: 6 cols — Title + text ── */}
            <motion.div
              className="lg:col-span-6 flex flex-col justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              {/* Gold editorial line */}
              <div className="w-10 h-[2px] mb-8" style={{ background: "#C8B870" }} />

              {/* Kicker */}
              <p
                className="font-inter uppercase mb-8"
                style={{ fontSize: "10px", letterSpacing: "0.4em", color: "#C8B870" }}
              >
                Portal Reset
              </p>

              {/* H1 — Georgia serif editorial, very large */}
              <h1
                style={{
                  fontFamily: "'Playfair Display', 'Georgia', serif",
                  fontWeight: 700,
                  fontSize: "clamp(42px, 6.5vw, 76px)",
                  lineHeight: 0.92,
                  letterSpacing: "0.03em",
                  color: "#F2EEE8",
                  textTransform: "uppercase",
                }}
              >
                Mapeie seu<br />padrão
              </h1>

              {/* Subtitle — italic ONLY here */}
              <p
                className="mt-6"
                style={{
                  fontFamily: "'Playfair Display', 'Georgia', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(15px, 1.7vw, 19px)",
                  color: "#D1C7BD",
                  opacity: 0.7,
                }}
              >
                Um espelho do lugar de onde você está operando.
              </p>

              {/* Body text — Open Sans, no italic */}
              <div className="mt-10 space-y-3" style={{ maxWidth: "480px" }}>
                <p className="font-inter leading-[1.85]" style={{ fontSize: "clamp(14px, 1.4vw, 15.5px)", color: "#DAD3C9" }}>
                  Você já entendeu coisas demais.
                </p>
                <p style={{ fontSize: "clamp(14px, 1.4vw, 15.5px)", color: "rgba(242,238,232,0.92)", fontFamily: "'Inter', sans-serif", fontWeight: 600, lineHeight: 1.85 }}>
                  O problema não é consciência. É execução sustentada.
                  <span className="block mt-0.5 h-px w-48" style={{ background: "linear-gradient(90deg, rgba(200,184,112,0.4), transparent)" }} />
                </p>
                <p className="font-inter leading-[1.85]" style={{ fontSize: "clamp(14px, 1.4vw, 15.5px)", color: "#DAD3C9" }}>
                  Este mapa mostra onde você sustenta clareza — e onde começa a negociar com sua verdade.
                </p>
              </div>
            </motion.div>

            {/* ── RIGHT: 6 cols — Decision panel ── */}
            <motion.div
              className="lg:col-span-6 flex flex-col items-start lg:items-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12 }}
            >
              <div className="w-full max-w-md lg:ml-auto relative">

                {/* Watermark 111 — very subtle */}
                <p
                  className="absolute font-bold select-none pointer-events-none hidden lg:block"
                  style={{
                    fontFamily: "'Playfair Display', 'Georgia', serif",
                    fontSize: "clamp(140px, 16vw, 260px)",
                    lineHeight: 1,
                    color: "rgba(200,184,112,0.05)",
                    top: "-70px",
                    right: "-20px",
                  }}
                >
                  111
                </p>

                {/* "Em 3 minutos…" — decision reinforcer, right side */}
                <p
                  className="font-inter mb-10"
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.7,
                    color: "#BFB6AA",
                    maxWidth: "340px",
                  }}
                >
                  Em 3 minutos, você mapeia o que sustenta sua clareza e o que está drenando sua execução.
                </p>

                {/* CTAs — above the fold */}
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  {/* Primary — ABRIR O MAPA */}
                  <button
                    onClick={onStart}
                    className="relative uppercase tracking-[0.2em] font-inter font-semibold transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 flex-1 sm:flex-initial"
                    style={{
                      background: "linear-gradient(135deg, #C8B870 0%, #b88a3a 50%, #983D06 100%)",
                      color: "#032A33",
                      borderRadius: "10px",
                      border: "1px solid rgba(200,184,112,0.55)",
                      boxShadow: "0 6px 28px -6px rgba(152,61,6,0.35), 0 2px 8px rgba(0,0,0,0.2)",
                      minHeight: "56px",
                      fontSize: "13px",
                      padding: "0 40px",
                    }}
                  >
                    Abrir o Mapa
                  </button>

                  {/* Secondary — COMO FUNCIONA */}
                  <a
                    href="#como-funciona"
                    className="uppercase tracking-[0.2em] font-inter text-center transition-all duration-250 flex-1 sm:flex-initial"
                    style={{
                      border: "1px solid rgba(209,199,189,0.35)",
                      borderRadius: "10px",
                      color: "#DAD3C9",
                      minHeight: "56px",
                      fontSize: "12px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 32px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(200,184,112,0.65)";
                      e.currentTarget.style.boxShadow = "0 0 20px -4px rgba(200,184,112,0.12)";
                      e.currentTarget.style.color = "#C8B870";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(209,199,189,0.35)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.color = "#DAD3C9";
                    }}
                  >
                    Como funciona
                  </a>
                </div>

                {/* Microcopy */}
                <p className="mt-5 font-inter" style={{ fontSize: "10px", color: "#BFB6AA", opacity: 0.5, letterSpacing: "0.03em" }}>
                  24 perguntas · escala 1 a 9 · resultado imediato
                </p>

                {/* ── "Ao final, você recebe" card — translucent ── */}
                <div
                  className="mt-12 px-7 py-8"
                  style={{
                    background: "rgba(3,42,51,0.35)",
                    border: "1px solid rgba(209,199,189,0.15)",
                    borderRadius: "4px",
                  }}
                >
                  <p
                    className="font-inter uppercase mb-7"
                    style={{ fontSize: "9px", letterSpacing: "0.35em", color: "#BFB6AA" }}
                  >
                    Ao final, você recebe
                  </p>
                  <div className="space-y-5">
                    {[
                      { num: "1", text: "Mandala do seu padrão atual" },
                      { num: "2", text: "Leitura personalizada do seu padrão em ação" },
                      { num: "3", text: "Um plano de 7 dias para estabilizar o que está vazando" },
                    ].map((item) => (
                      <div key={item.num} className="flex gap-5 items-baseline">
                        <span
                          style={{
                      fontFamily: "'Playfair Display', 'Georgia', serif",
                      fontWeight: 700,
                      fontSize: "20px",
                            color: "#C8B870",
                            lineHeight: 1,
                            flexShrink: 0,
                          }}
                        >
                          {item.num}
                        </span>
                        <p className="font-inter leading-relaxed" style={{ fontSize: "14px", color: "#DAD3C9" }}>
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ════════ DOBRA 2 — LIGHT EDITORIAL ════════ */}
      <section
        id="como-funciona"
        style={{ background: "#F2EEE8" }}
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section label */}
            <p
              className="font-inter uppercase mb-12"
              style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#2A777C" }}
            >
              Como funciona
            </p>

            <div className="max-w-2xl space-y-7">
              {[
                { num: "01", text: "Escala 1 a 9, pensando nos últimos 30 dias." },
                { num: "02", text: "Pausas curtas a cada 6 etapas para recalibrar." },
                { num: "03", text: "No final, o espelho vira guia." },
              ].map((item) => (
                <div key={item.num} className="flex gap-6 items-baseline">
                  <span
                    style={{
                    fontFamily: "'Playfair Display', 'Georgia', serif",
                    fontWeight: 700,
                    fontSize: "18px",
                      color: "#983D06",
                    }}
                  >
                    {item.num}
                  </span>
                  <p
                    className="font-inter leading-relaxed"
                    style={{ fontSize: "16px", lineHeight: 1.75, color: "#032A33", maxWidth: "540px" }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* "Já tenho meu Espelho" — right-aligned, visible */}
            <div className="mt-16 flex justify-end">
              <a
                href="/espelho-da-clareza"
                className="font-inter transition-all duration-200 hover:opacity-70"
                style={{ fontSize: "12px", color: "#983D06", letterSpacing: "0.04em" }}
              >
                Já tenho meu Espelho →
              </a>
            </div>

            {/* Footer credit */}
            <div className="mt-14 pt-6" style={{ borderTop: "1px solid rgba(3,42,51,0.06)" }}>
              <p className="font-inter text-left" style={{ fontSize: "11px", color: "rgba(3,42,51,0.45)" }}>
                © Ana Retore. Todos os direitos de design e copy reservados.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

/* ── Question Screen ───────────────────────────────── */

interface QuestionScreenProps {
  questionId: string;
  questionText: string;
  currentIndex: number;
  total: number;
  initialValue: number | null;
  onNext: (value: number) => void;
  onBack: () => void;
}

const QuestionScreen = ({
  questionId,
  questionText,
  currentIndex,
  total,
  initialValue,
  onNext,
  onBack,
}: QuestionScreenProps) => {
  const [selected, setSelected] = useState<number | null>(initialValue);

  useEffect(() => {
    setSelected(initialValue);
  }, [currentIndex, initialValue]);

  const isDark = currentIndex % 2 !== 0;
  const bg = isDark ? "hsl(215 25% 10%)" : "hsl(var(--off-white))";
  const fg = isDark ? "hsl(var(--off-white))" : "hsl(var(--graphite))";
  const fgMuted = isDark ? "hsl(var(--off-white) / 0.4)" : "hsl(var(--graphite) / 0.4)";
  const borderSubtle = isDark ? "hsl(0 0% 100% / 0.12)" : "hsl(var(--graphite) / 0.12)";
  const goldAccent = "hsl(var(--matte-gold))";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={questionId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: bg, color: fg }}
      >
        <div className="w-full max-w-lg">
          {/* Progress */}
          <div className="mb-14">
            <div className="flex justify-between items-center mb-2" style={{ color: fgMuted }}>
              <span className="uppercase tracking-[0.2em] font-inter" style={{ fontSize: "10px" }}>
                Pergunta
              </span>
              <span className="font-inter tabular-nums" style={{ fontSize: "10px" }}>
                {String(currentIndex + 1).padStart(2, "0")} / {total}
              </span>
            </div>
            <div className="w-full h-px" style={{ background: borderSubtle }}>
              <div
                className="h-full transition-all duration-500 ease-out"
                style={{
                  width: `${((currentIndex + 1) / total) * 100}%`,
                  background: goldAccent,
                }}
              />
            </div>
          </div>

          {/* Micro-instruction */}
          <p
            className="text-center uppercase tracking-[0.18em] font-inter mb-6"
            style={{ fontSize: "9px", color: fgMuted }}
          >
            Responda pensando nos últimos 30 dias.
          </p>

          {/* Gold divider */}
          <div className="w-8 h-px mx-auto mb-6" style={{ background: goldAccent }} />

          {/* Question number watermark */}
          <p
            className="text-center font-playfair font-bold mb-4"
            style={{
              fontSize: "48px",
              lineHeight: 1,
              color: isDark ? "hsl(var(--off-white) / 0.06)" : "hsl(var(--clay) / 0.10)",
            }}
          >
            {String(currentIndex + 1).padStart(2, "0")}
          </p>

          {/* Question text */}
          <p
            className="font-playfair text-center leading-relaxed"
            style={{ fontSize: "clamp(18px, 3.2vw, 26px)" }}
          >
            {questionText}
          </p>

          {/* Scale */}
          <div className="mt-14">
            <div
              className="flex justify-between mb-4 font-inter uppercase tracking-[0.15em]"
              style={{ fontSize: "9px", color: fgMuted }}
            >
              <span>1 — quase nunca</span>
              <span>9 — quase sempre</span>
            </div>
            <div className="flex justify-between">
              {SCALE.map((val) => {
                const isSelected = selected === val;
                return (
                  <button
                    key={val}
                    onClick={() => setSelected(val)}
                    className="relative flex items-center justify-center transition-all duration-200"
                    style={{
                      width: "36px",
                      height: "48px",
                      borderTop: `1.5px solid ${isSelected ? goldAccent : borderSubtle}`,
                      borderBottom: `1.5px solid ${isSelected ? goldAccent : borderSubtle}`,
                      background: isSelected
                        ? isDark
                          ? "hsl(var(--matte-gold) / 0.12)"
                          : "hsl(var(--matte-gold) / 0.08)"
                        : "transparent",
                      color: isSelected ? goldAccent : fg,
                      fontFamily: "'Playfair Display', serif",
                      fontSize: isSelected ? "18px" : "15px",
                      fontWeight: isSelected ? 600 : 400,
                    }}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-14 flex justify-between items-center">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 font-inter uppercase tracking-[0.18em] transition-colors duration-200 hover:opacity-70"
              style={{ fontSize: "10px", color: fgMuted }}
            >
              <ArrowLeft className="w-3 h-3" />
              Voltar
            </button>

            <button
              onClick={() => selected !== null && onNext(selected)}
              disabled={selected === null}
              className="flex items-center gap-1.5 font-inter uppercase tracking-[0.18em] transition-all duration-200"
              style={{
                fontSize: "10px",
                color: selected !== null ? goldAccent : fgMuted,
                opacity: selected === null ? 0.35 : 1,
                cursor: selected === null ? "default" : "pointer",
                borderBottom: selected !== null ? `1px solid ${goldAccent}` : "1px solid transparent",
                paddingBottom: "2px",
              }}
            >
              Próxima
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ── Respiro Screen ────────────────────────────────── */

const RespiroScreen = ({
  text,
  buttonLabel,
  onContinue,
}: {
  text: string;
  buttonLabel: string;
  onContinue: () => void;
}) => (
  <div
    className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
    style={{ background: "hsl(80 20% 14%)", color: "hsl(var(--off-white))" }}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-md"
    >
      <p
        className="font-playfair italic leading-snug"
        style={{ fontSize: "clamp(22px, 4vw, 32px)", color: "hsl(var(--off-white) / 0.85)" }}
      >
        {text}
      </p>
      <Button
        onClick={onContinue}
        className="mt-12 px-10 py-3 uppercase tracking-[0.15em] text-sm font-medium rounded-none border"
        style={{
          background: "transparent",
          borderColor: "hsl(var(--matte-gold))",
          color: "hsl(var(--matte-gold))",
        }}
      >
        {buttonLabel}
      </Button>
    </motion.div>
  </div>
);

/* ── Main Page ─────────────────────────────────────── */

const QuizMapaPadraoPage = () => {
  const navigate = useNavigate();

  const restored = useMemo(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const session: QuizSession = JSON.parse(saved);
        if (session.quizId === "mapa-do-padrao" && session.answers.length === 24) {
          const vals = session.answers.map((a) => a.value);
          // Find first unanswered to resume
          const firstNull = vals.findIndex((v) => v === 0 || v === null);
          return { answers: vals as (number | null)[], resumeAt: firstNull === -1 ? 0 : firstNull, sid: session.sessionId };
        }
      }
    } catch {}
    return null;
  }, []);

  const [step, setStep] = useState<Step>(() => {
    if (restored && restored.answers.some((a) => a !== null && a !== 0)) return "question";
    return "intro";
  });
  const [currentQuestion, setCurrentQuestion] = useState(() => restored?.resumeAt ?? 0);
  const [respiroIndex, setRespiroIndex] = useState(0);
  const [sessionId] = useState(() => restored?.sid ?? generateId());
  const [answers, setAnswers] = useState<(number | null)[]>(() => restored?.answers ?? Array(24).fill(null));

  // Persist to localStorage
  const persistSession = useCallback(
    (vals: (number | null)[]) => {
      const session: QuizSession = {
        sessionId,
        quizId: "mapa-do-padrao",
        createdAt: new Date().toISOString(),
        scale: { min: 1, max: 9 },
        answers: vals.map((v, i) => ({
          id: quizQuestions[i].id,
          value: v ?? 0,
        })),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    },
    [sessionId]
  );

  useEffect(() => {
    persistSession(answers);
  }, [answers, persistSession]);

  const handleStart = useCallback(() => {
    const fresh: (number | null)[] = Array(24).fill(null);
    setAnswers(fresh);
    setCurrentQuestion(0);
    setRespiroIndex(0);
    setStep("question");
  }, []);

  const handleAnswer = useCallback(
    (value: number) => {
      setAnswers((prev) => {
        const next = [...prev];
        next[currentQuestion] = value;
        return next;
      });

      const questionNumber = currentQuestion + 1;
      const rIdx = RESPIRO_AFTER.indexOf(questionNumber);

      if (rIdx !== -1) {
        setRespiroIndex(rIdx);
        setStep("respiro");
      } else if (currentQuestion < 23) {
        setCurrentQuestion((prev) => prev + 1);
      }
    },
    [currentQuestion]
  );

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    } else {
      setStep("intro");
    }
  }, [currentQuestion]);

  const handleRespiroContinue = useCallback(() => {
    if (respiroIndex === 3) {
      // Validate no nulls
      const hasNull = answers.some((a) => a === null);
      if (hasNull) {
        // Find first unanswered and go there
        const firstNull = answers.findIndex((a) => a === null);
        setCurrentQuestion(firstNull);
        setStep("question");
        return;
      }

      // Build final session and navigate
      const finalSession: QuizSession = {
        sessionId,
        quizId: "mapa-do-padrao",
        createdAt: new Date().toISOString(),
        scale: { min: 1, max: 9 },
        answers: answers.map((v, i) => ({
          id: quizQuestions[i].id,
          value: v!,
        })),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalSession));
      navigate(`/espelho-da-clareza?sid=${sessionId}`, {
        state: { session: finalSession },
      });
    } else {
      setCurrentQuestion(RESPIRO_AFTER[respiroIndex]);
      setStep("question");
    }
  }, [respiroIndex, answers, navigate, sessionId]);

  return (
    <main className="bg-background">
      {step === "intro" && <IntroScreen onStart={handleStart} />}
      {step === "question" && (
        <QuestionScreen
          questionId={quizQuestions[currentQuestion].id}
          questionText={quizQuestions[currentQuestion].text}
          currentIndex={currentQuestion}
          total={24}
          initialValue={answers[currentQuestion]}
          onNext={handleAnswer}
          onBack={handleBack}
        />
      )}
      {step === "respiro" && (
        <RespiroScreen
          text={quizRespiros[respiroIndex].text}
          buttonLabel={quizRespiros[respiroIndex].buttonLabel}
          onContinue={handleRespiroContinue}
        />
      )}
    </main>
  );
};

export default QuizMapaPadraoPage;
