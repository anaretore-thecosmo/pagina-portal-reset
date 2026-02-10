import { useState, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  quizQuestions,
  quizRespiros,
  type QuizSession,
} from "@/data/quizMapaPadrao";

const STORAGE_KEY = "quiz-mapa-padrao-session";
const RESPIRO_AFTER = [6, 12, 18, 24]; // 1-based question numbers
const SCALE = [1, 2, 3, 4, 5, 6, 7, 8, 9];

type Step = "intro" | "question" | "respiro";

function generateId(): string {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/* ── Intro Screen ──────────────────────────────────── */

const IntroScreen = ({ onStart }: { onStart: () => void }) => (
  <div
    className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
    style={{ background: "hsl(215 25% 12%)", color: "hsl(var(--off-white))" }}
  >
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-lg"
    >
      <p
        className="text-xs uppercase tracking-[0.25em] mb-6"
        style={{ color: "hsl(var(--matte-gold))" }}
      >
        Diagnóstico editorial
      </p>

      <h1
        className="font-playfair font-bold uppercase"
        style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "0.12em" }}
      >
        Mapa do Padrão
      </h1>

      <p
        className="mt-4 text-lg font-playfair italic"
        style={{ color: "hsl(var(--off-white) / 0.7)" }}
      >
        Mapeie seu padrão atual.
      </p>

      <p
        className="mt-6 text-sm leading-relaxed"
        style={{ color: "hsl(var(--off-white) / 0.55)" }}
      >
        24 perguntas. Escala de 1 a 9.
        <br />
        Responda pensando nos últimos 30 dias.
      </p>

      <Button
        onClick={onStart}
        className="mt-10 px-10 py-3 uppercase tracking-[0.15em] text-sm font-medium rounded-none border"
        style={{
          background: "transparent",
          borderColor: "hsl(var(--matte-gold))",
          color: "hsl(var(--matte-gold))",
        }}
      >
        Começar
      </Button>
    </motion.div>
  </div>
);

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
