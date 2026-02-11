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
    <div
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(175deg, hsl(215 35% 6%) 0%, hsl(218 30% 10%) 40%, hsl(220 28% 8%) 100%)",
        color: "#F0EAD6",
      }}
    >
      {/* ── Vignette overlay ── */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 40%, hsl(215 35% 4% / 0.55) 100%)",
        }}
      />

      {/* ── Film grain overlay ── */}
      <div
        className="fixed inset-0 pointer-events-none z-[2] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* ── Gold top rule ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: "linear-gradient(90deg, transparent 5%, hsl(37 35% 52% / 0.25) 30%, hsl(37 35% 52% / 0.25) 70%, transparent 95%)" }}
      />

      {/* ── Gold spine ── */}
      <div
        className="absolute left-6 md:left-10 top-0 bottom-0 w-px z-10"
        style={{ background: "hsl(37 35% 52% / 0.08)" }}
      />

      {/* ── Watermark number ── */}
      <p
        className="absolute font-playfair font-bold select-none pointer-events-none z-[3]"
        style={{
          fontSize: "clamp(180px, 24vw, 360px)",
          lineHeight: 1,
          color: "hsl(200 20% 80% / 0.018)",
          right: "3%",
          bottom: "2%",
        }}
      >
        01
      </p>

      {/* ── Ambient glow ── */}
      <div
        className="absolute pointer-events-none z-[3]"
        style={{
          top: "15%",
          left: "-5%",
          width: "50%",
          height: "60%",
          background: "radial-gradient(ellipse, hsl(37 40% 45% / 0.04) 0%, transparent 65%)",
        }}
      />

      {/* ════════ HERO SECTION ════════ */}
      <section className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-[1360px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* ── Left column: text ── */}
            <motion.div
              className="lg:col-span-6 xl:col-span-6"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              {/* Kicker */}
              <p
                className="font-inter uppercase mb-7"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.4em",
                  color: "hsl(37 35% 52% / 0.65)",
                }}
              >
                Portal Reset
              </p>

              {/* Gold divider */}
              <div
                className="w-14 h-px mb-9"
                style={{ background: "linear-gradient(90deg, hsl(37 35% 52% / 0.5), hsl(37 35% 52% / 0.1))" }}
              />

              {/* H1 */}
              <h1
                className="font-playfair font-bold uppercase"
                style={{
                  fontSize: "clamp(36px, 5.8vw, 66px)",
                  lineHeight: 0.95,
                  letterSpacing: "0.07em",
                  color: "#F0EAD6",
                  textShadow: "0 0 40px hsl(37 40% 60% / 0.06)",
                }}
              >
                Mapeie seu<br />padrão
              </h1>

              {/* Subtitle */}
              <p
                className="mt-5 font-playfair italic"
                style={{
                  fontSize: "clamp(15px, 2vw, 20px)",
                  color: "hsl(36 20% 80% / 0.55)",
                }}
              >
                Um espelho do lugar de onde você está operando.
              </p>

              {/* Thesis — 3 short lines */}
              <div
                className="mt-10 space-y-4"
                style={{
                  maxWidth: "480px",
                }}
              >
                {[
                  "Você já entendeu coisas demais.",
                  "O problema não é consciência. É execução sustentada.",
                  "Este mapa mostra onde você sustenta clareza — e onde começa a negociar com sua verdade.",
                ].map((line, i) => (
                  <p
                    key={i}
                    className="font-inter leading-[1.9]"
                    style={{
                      fontSize: "clamp(13.5px, 1.5vw, 15px)",
                      color: i === 2 ? "hsl(36 15% 82% / 0.75)" : "hsl(36 15% 82% / 0.62)",
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Measurable close */}
              <p
                className="mt-8 font-inter italic"
                style={{ fontSize: "12px", color: "hsl(36 12% 78% / 0.4)" }}
              >
                Em 3 minutos, você mapeia o que sustenta sua clareza e o que está drenando sua execução.
              </p>

              {/* ── CTAs ── */}
              <div className="mt-12 flex flex-wrap gap-5 items-center">
                {/* Primary CTA */}
                <button
                  onClick={onStart}
                  className="group relative px-14 py-4 uppercase tracking-[0.22em] font-inter font-medium text-sm overflow-hidden transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, hsl(37 35% 52% / 0.12) 0%, hsl(37 35% 52% / 0.06) 100%)",
                    border: "1px solid hsl(37 35% 52% / 0.55)",
                    color: "hsl(37 40% 62%)",
                    boxShadow: "0 2px 16px -4px hsl(37 35% 52% / 0.12), inset 0 1px 0 hsl(37 35% 52% / 0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, hsl(37 35% 52% / 0.2) 0%, hsl(37 35% 52% / 0.1) 100%)";
                    e.currentTarget.style.boxShadow = "0 4px 24px -6px hsl(37 35% 52% / 0.2), inset 0 1px 0 hsl(37 35% 52% / 0.12)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, hsl(37 35% 52% / 0.12) 0%, hsl(37 35% 52% / 0.06) 100%)";
                    e.currentTarget.style.boxShadow = "0 2px 16px -4px hsl(37 35% 52% / 0.12), inset 0 1px 0 hsl(37 35% 52% / 0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Começar o Mapa
                </button>

                {/* Secondary CTA */}
                <a
                  href="#como-funciona"
                  className="uppercase tracking-[0.22em] font-inter transition-all duration-200 hover:opacity-70"
                  style={{
                    fontSize: "11px",
                    color: "hsl(220 10% 72% / 0.5)",
                    borderBottom: "1px solid hsl(220 10% 72% / 0.15)",
                    paddingBottom: "3px",
                  }}
                >
                  Como funciona
                </a>
              </div>
            </motion.div>

            {/* ── Right column: visual window ── */}
            <motion.div
              className="lg:col-span-6 xl:col-span-6 relative"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.25 }}
            >
              <div className="relative">
                {/* Outer frame — thin gold */}
                <div
                  className="absolute -inset-4 pointer-events-none hidden lg:block"
                  style={{
                    border: "1px solid hsl(37 35% 52% / 0.07)",
                  }}
                />
                {/* Inner frame — stronger */}
                <div
                  className="absolute -inset-1.5 pointer-events-none hidden lg:block"
                  style={{
                    border: "1px solid hsl(37 35% 52% / 0.14)",
                  }}
                />

                {/* Image container */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    aspectRatio: "3/4",
                    maxHeight: "min(72vh, 600px)",
                  }}
                >
                  <img
                    src={quizIntroImage}
                    alt="Corredor de pedra com feixe de luz dourada — silêncio e direção"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  {/* Navy overlay 50% */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(180deg, hsl(215 35% 6% / 0.45) 0%, hsl(215 35% 6% / 0.55) 60%, hsl(215 35% 6% / 0.7) 100%)",
                      mixBlendMode: "multiply",
                    }}
                  />
                  {/* Grain on image */}
                  <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "repeat",
                    }}
                  />
                  {/* Subtle inner glow on edges */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      boxShadow: "inset 0 0 60px hsl(215 35% 6% / 0.3)",
                    }}
                  />
                </div>

                {/* Caption */}
                <p
                  className="mt-4 font-playfair italic text-right"
                  style={{
                    fontSize: "11px",
                    color: "hsl(36 15% 80% / 0.25)",
                    letterSpacing: "0.03em",
                  }}
                >
                  "Um mapa não te melhora. Te localiza."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ COMO FUNCIONA (below hero) ════════ */}
      <section
        id="como-funciona"
        className="relative z-10 pb-20 pt-6"
      >
        <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-16">
          {/* Divider */}
          <div
            className="w-full h-px mb-14"
            style={{ background: "linear-gradient(90deg, transparent, hsl(37 35% 52% / 0.12), transparent)" }}
          />

          <div className="max-w-2xl">
            <p
              className="font-inter uppercase mb-8"
              style={{
                fontSize: "10px",
                letterSpacing: "0.35em",
                color: "hsl(37 35% 52% / 0.5)",
              }}
            >
              Como funciona
            </p>

            <div className="space-y-6">
              {[
                { num: "01", text: "Escala 1 a 9, pensando nos últimos 30 dias." },
                { num: "02", text: "Pausas curtas a cada 6 etapas para recalibrar." },
                { num: "03", text: "No final, o espelho vira guia." },
              ].map((item) => (
                <div key={item.num} className="flex gap-5 items-baseline">
                  <span
                    className="font-playfair font-bold shrink-0"
                    style={{
                      fontSize: "18px",
                      color: "hsl(20 39% 46% / 0.6)",
                    }}
                  >
                    {item.num}
                  </span>
                  <p
                    className="font-inter leading-relaxed"
                    style={{
                      fontSize: "14px",
                      color: "hsl(220 10% 72% / 0.55)",
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
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
