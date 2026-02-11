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
  const [showHow, setShowHow] = useState(false);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(170deg, hsl(215 30% 8%) 0%, hsl(215 25% 12%) 50%, hsl(220 20% 10%) 100%)",
        color: "hsl(var(--off-white))",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 20% 30%, hsl(var(--matte-gold) / 0.04) 0%, transparent 55%)",
        }}
      />

      {/* Gold spine */}
      <div
        className="absolute left-6 md:left-10 top-0 bottom-0 w-px"
        style={{ background: "hsl(var(--matte-gold) / 0.10)" }}
      />

      {/* Watermark number */}
      <p
        className="absolute font-playfair font-bold select-none pointer-events-none"
        style={{
          fontSize: "clamp(160px, 22vw, 320px)",
          lineHeight: 1,
          color: "hsl(var(--off-white) / 0.015)",
          right: "4%",
          bottom: "4%",
        }}
      >
        01
      </p>

      {/* Main grid */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-8 md:px-16 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left column — text */}
            <motion.div
              className="lg:col-span-7 xl:col-span-6"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              {/* Kicker */}
              <p
                className="text-[10px] uppercase tracking-[0.35em] mb-8 font-inter"
                style={{ color: "hsl(var(--matte-gold) / 0.7)" }}
              >
                Portal Reset
              </p>

              {/* Gold divider */}
              <div className="w-12 h-px mb-8" style={{ background: "hsl(var(--matte-gold) / 0.45)" }} />

              {/* Title */}
              <h1
                className="font-playfair font-bold uppercase"
                style={{
                  fontSize: "clamp(34px, 5.5vw, 62px)",
                  lineHeight: 1.0,
                  letterSpacing: "0.08em",
                }}
              >
                Mapeie seu padrão
              </h1>

              {/* Subtitle */}
              <p
                className="mt-5 font-playfair italic"
                style={{
                  fontSize: "clamp(16px, 2.2vw, 21px)",
                  color: "hsl(var(--off-white) / 0.6)",
                }}
              >
                Um espelho do lugar de onde você está operando.
              </p>

              {/* Body copy */}
              <div
                className="mt-10 space-y-5 leading-[1.85]"
                style={{
                  fontSize: "clamp(13.5px, 1.6vw, 15.5px)",
                  color: "hsl(var(--off-white) / 0.5)",
                  maxWidth: "460px",
                }}
              >
                <p>
                  Você já entendeu coisas demais.
                </p>
                <p>
                  O problema não é consciência. É execução sustentada.
                </p>
                <p>
                  Este mapa mostra onde você está consistente — e onde você começa a negociar com a sua verdade.
                </p>
                <p>
                  No fim, você recebe um guia simples e cirúrgico para fazer o que já sabe que precisa ser feito.
                </p>
              </div>

              {/* "Ao final" block */}
              <div
                className="mt-12 p-7 rounded-sm"
                style={{
                  border: "1px solid hsl(var(--matte-gold) / 0.12)",
                  background: "hsl(var(--off-white) / 0.015)",
                }}
              >
                <p
                  className="text-[10px] uppercase tracking-[0.25em] mb-5 font-inter"
                  style={{ color: "hsl(var(--matte-gold) / 0.6)" }}
                >
                  Ao final, você recebe
                </p>
                <ul className="space-y-3.5" style={{ color: "hsl(var(--off-white) / 0.55)" }}>
                  {[
                    "Mandala com o gráfico do seu padrão atual",
                    "Leitura personalizada do seu padrão em ação",
                    "Um plano de 7 dias para estabilizar o que está vazando",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start text-sm leading-relaxed">
                      <span
                        className="font-playfair font-bold shrink-0"
                        style={{
                          color: "hsl(var(--clay))",
                          fontSize: "16px",
                          lineHeight: "1.4",
                          minWidth: "16px",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Microcopy */}
              <p
                className="mt-7 font-inter italic"
                style={{ fontSize: "12px", color: "hsl(var(--off-white) / 0.3)" }}
              >
                Em 3 minutos, você mapeia o que sustenta sua clareza e o que está drenando sua execução.
              </p>

              {/* Buttons */}
              <div className="mt-12 flex flex-wrap gap-5 items-center">
                <Button
                  onClick={onStart}
                  className="group relative px-12 py-4 uppercase tracking-[0.2em] text-sm font-medium rounded-none border overflow-hidden transition-all duration-300"
                  style={{
                    background: "hsl(var(--matte-gold) / 0.06)",
                    borderColor: "hsl(var(--matte-gold))",
                    color: "hsl(var(--matte-gold))",
                    boxShadow: "0 2px 12px -4px hsl(var(--matte-gold) / 0.15)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "hsl(var(--matte-gold) / 0.12)";
                    e.currentTarget.style.boxShadow = "0 4px 20px -6px hsl(var(--matte-gold) / 0.25)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "hsl(var(--matte-gold) / 0.06)";
                    e.currentTarget.style.boxShadow = "0 2px 12px -4px hsl(var(--matte-gold) / 0.15)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Abrir o Mapa
                </Button>

                <button
                  onClick={() => setShowHow(true)}
                  className="uppercase tracking-[0.2em] font-inter transition-all duration-200 hover:opacity-70"
                  style={{
                    fontSize: "11px",
                    color: "hsl(var(--off-white) / 0.35)",
                    borderBottom: "1px solid hsl(var(--off-white) / 0.12)",
                    paddingBottom: "3px",
                  }}
                >
                  Como funciona
                </button>
              </div>
            </motion.div>

            {/* Right column — image */}
            <motion.div
              className="lg:col-span-5 xl:col-span-6 relative"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative">
                {/* Thin gold frame offset */}
                <div
                  className="absolute -inset-3 pointer-events-none hidden lg:block"
                  style={{
                    border: "1px solid hsl(var(--matte-gold) / 0.08)",
                  }}
                />

                <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <img
                    src={quizIntroImage}
                    alt="Corredor arquitetônico com luz dourada — silêncio e direção"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  {/* Overlay gradient for text contrast */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, hsl(215 30% 8% / 0.6) 0%, transparent 40%)",
                    }}
                  />
                </div>

                {/* Caption */}
                <p
                  className="mt-4 font-playfair italic text-right"
                  style={{
                    fontSize: "11px",
                    color: "hsl(var(--off-white) / 0.25)",
                    letterSpacing: "0.03em",
                  }}
                >
                  "Um mapa não te melhora. Te localiza."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* "Como funciona" modal */}
      <Dialog open={showHow} onOpenChange={setShowHow}>
        <DialogContent
          className="rounded-sm border"
          style={{
            background: "hsl(215 25% 11%)",
            borderColor: "hsl(var(--matte-gold) / 0.12)",
            color: "hsl(var(--off-white))",
            maxWidth: "440px",
          }}
        >
          <DialogHeader>
            <DialogTitle
              className="font-playfair font-bold uppercase tracking-[0.12em]"
              style={{ fontSize: "18px" }}
            >
              Como funciona
            </DialogTitle>
          </DialogHeader>

          <div className="w-8 h-px mt-2 mb-4" style={{ background: "hsl(var(--matte-gold) / 0.3)" }} />

          <ul
            className="space-y-3.5 text-sm leading-relaxed"
            style={{ color: "hsl(var(--off-white) / 0.55)" }}
          >
            {[
              "Você responde em escala 1 a 9 pensando nos últimos 30 dias.",
              "A cada 6 etapas, uma pausa curta para recalibrar.",
              "No final, o mapa vira guia.",
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span
                  className="w-1 h-1 rounded-full mt-2 shrink-0"
                  style={{ background: "hsl(var(--matte-gold) / 0.5)" }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Button
              onClick={() => setShowHow(false)}
              className="w-full py-3 uppercase tracking-[0.15em] text-sm font-medium rounded-none border"
              style={{
                background: "transparent",
                borderColor: "hsl(var(--matte-gold) / 0.25)",
                color: "hsl(var(--matte-gold))",
              }}
            >
              Entendi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
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
