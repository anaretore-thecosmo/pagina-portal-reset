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

      {/* ════════ DOBRA 1 — HERO PÔSTER FULL-SCREEN ════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Background image — full-bleed atmosphere */}
        <div className="absolute inset-0">
          <img
            src={quizIntroImage}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            loading="eager"
            style={{ opacity: 0.3, objectPosition: "65% center" }}
          />
        </div>

        {/* Heavy dark overlay — #032A33, 75% left fading to 60% right */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(3,42,51,0.82) 0%, rgba(3,42,51,0.78) 40%, rgba(3,42,51,0.62) 100%)",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 60% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)" }}
        />

        {/* Film grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Gold spotlight behind headline */}
        <div
          className="absolute pointer-events-none hidden lg:block"
          style={{
            left: "8%",
            top: "22%",
            width: "500px",
            height: "380px",
            background: "radial-gradient(ellipse at center, rgba(200,184,112,0.04) 0%, transparent 70%)",
          }}
        />

        {/* Gold top rule */}
        <div
          className="absolute top-0 left-0 right-0 h-px z-10"
          style={{ background: "linear-gradient(90deg, transparent 5%, rgba(200,184,112,0.2) 30%, rgba(200,184,112,0.2) 70%, transparent 95%)" }}
        />

        {/* ── Content: 2-column poster ── */}
        <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center lg:min-h-screen">

            {/* ── LEFT COLUMN: 7 cols ── */}
            <div className="lg:col-span-7 flex flex-col justify-center pt-8 lg:pt-0">

              {/* Gold editorial line */}
              <motion.div
                className="w-10 h-[2px] mb-4 lg:mb-6"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ background: "#C8B870", transformOrigin: "left" }}
              />

              {/* Kicker */}
              <motion.p
                className="font-inter uppercase mb-3 lg:mb-5"
                style={{ fontSize: "10px", letterSpacing: "0.4em", color: "#C8B870" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                Portal Reset · Diagnóstico
              </motion.p>

              {/* H1 — maximum impact */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                style={{
                  fontFamily: "'Playfair Display', 'Georgia', serif",
                  fontWeight: 700,
                  fontSize: "clamp(40px, 7vw, 84px)",
                  lineHeight: 0.9,
                  letterSpacing: "0.04em",
                  color: "#EDE6DA",
                  textTransform: "uppercase",
                }}
              >
                Mapeie<br />seu padrão
              </motion.h1>

              {/* Subtitle — italic, short */}
              <motion.p
                className="mt-3 lg:mt-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{
                  fontFamily: "'Playfair Display', 'Georgia', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(14px, 1.6vw, 19px)",
                  color: "rgba(207,198,186,0.75)",
                }}
              >
                Um espelho do lugar de onde você está operando.
              </motion.p>

              {/* ── MOBILE-ONLY: CTA above fold ── */}
              <motion.div
                className="mt-6 flex flex-col gap-3 lg:hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <button
                  onClick={onStart}
                  className="uppercase tracking-[0.2em] font-inter font-semibold w-full"
                  style={{
                    background: "linear-gradient(135deg, #C8B870 0%, #b88a3a 50%, #983D06 100%)",
                    color: "#032A33",
                    borderRadius: "8px",
                    border: "1px solid rgba(200,184,112,0.45)",
                    boxShadow: "0 4px 20px -4px rgba(152,61,6,0.3)",
                    height: "52px",
                    fontSize: "13px",
                  }}
                >
                  Abrir o Mapa
                </button>
              </motion.div>

              {/* Body */}
              <motion.div
                className="mt-6 lg:mt-8 space-y-2.5"
                style={{ maxWidth: "520px" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <p className="font-inter leading-[1.8]" style={{ fontSize: "clamp(14.5px, 1.5vw, 16px)", color: "#CFC5B8" }}>
                  Você já entendeu coisas demais.
                </p>
                <p
                  className="font-inter"
                  style={{
                    fontSize: "clamp(16px, 1.7vw, 19px)",
                    fontWeight: 600,
                    color: "#EDE6DA",
                    lineHeight: 1.6,
                  }}
                >
                  O problema não é consciência. É execução sustentada.
                </p>
                <p className="font-inter leading-[1.8]" style={{ fontSize: "clamp(14.5px, 1.5vw, 16px)", color: "#CFC5B8" }}>
                  Este mapa mostra onde você sustenta clareza — e onde começa a negociar com sua verdade.
                </p>
              </motion.div>

              {/* "Em 3 minutos…" */}
              <motion.p
                className="font-inter mt-5 lg:mt-6"
                style={{ fontSize: "13px", lineHeight: 1.7, color: "#AFA79E", maxWidth: "460px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Em 3 minutos, você mapeia o que sustenta sua clareza e o que está drenando sua execução.
              </motion.p>

              {/* "Ao final, você recebe" — slim card */}
              <motion.div
                className="mt-6 lg:mt-8"
                style={{
                  maxWidth: "460px",
                  background: "rgba(3,42,51,0.4)",
                  border: "1px solid rgba(200,184,112,0.1)",
                  borderRadius: "8px",
                  padding: "16px 20px",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <p className="font-inter uppercase mb-3" style={{ fontSize: "9px", letterSpacing: "0.3em", color: "#C8B870" }}>
                  Ao final, você recebe
                </p>
                <div className="space-y-2">
                  {[
                    { num: "1", text: "Sua mandala de 6 eixos" },
                    { num: "2", text: "Uma leitura que traduz o mapa em decisão" },
                    { num: "3", text: "Um plano de 7 dias com foco real" },
                  ].map((item) => (
                    <div key={item.num} className="flex gap-4 items-baseline">
                      <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "14px", color: "#C8B870" }}>
                        {item.num}
                      </span>
                      <p className="font-inter" style={{ fontSize: "13px", lineHeight: 1.5, color: "#CFC5B8" }}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT COLUMN: 5 cols — Decision panel ── */}
            <motion.div
              className="lg:col-span-5 hidden lg:flex flex-col items-end"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div
                className="w-full max-w-md lg:ml-auto relative"
                style={{
                  background: "rgba(3,42,51,0.3)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(200,184,112,0.1)",
                  borderRadius: "12px",
                  padding: "40px 32px 32px",
                }}
              >

                {/* Manifesto — poster-sized */}
                <div
                  className="mb-10"
                  style={{ borderLeft: "2px solid rgba(200,184,112,0.5)", paddingLeft: "20px" }}
                >
                  <p
                    style={{
                      fontFamily: "'Playfair Display', 'Georgia', serif",
                      fontStyle: "italic",
                      fontSize: "clamp(22px, 2.5vw, 30px)",
                      color: "#EDE6DA",
                      lineHeight: 1.35,
                    }}
                  >
                    Sem julgamento.<br />Só direção.
                  </p>
                </div>

                {/* Como funciona — microblock */}
                <div className="mb-8 space-y-2">
                  <p className="font-inter uppercase" style={{ fontSize: "9px", letterSpacing: "0.3em", color: "#C8B870", marginBottom: "8px" }}>
                    Como funciona
                  </p>
                  {[
                    "Escala 1 a 9, pensando nos últimos 30 dias.",
                    "Pausas curtas a cada 6 etapas para recalibrar.",
                    "No final, o espelho vira guia.",
                  ].map((t, i) => (
                    <div key={i} className="flex gap-3 items-baseline">
                      <span className="font-inter" style={{ fontSize: "10px", color: "#C8B870", fontWeight: 600 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-inter" style={{ fontSize: "12.5px", lineHeight: 1.6, color: "rgba(207,197,184,0.8)" }}>
                        {t}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Gold divider */}
                <div className="w-full h-px mb-8" style={{ background: "linear-gradient(90deg, rgba(200,184,112,0.2), transparent)" }} />

                {/* CTAs — big, above fold */}
                <div className="flex flex-col gap-3.5 w-full">
                  {/* Primary CTA */}
                  <button
                    onClick={onStart}
                    className="relative uppercase tracking-[0.2em] font-inter font-semibold transition-all duration-300 group w-full"
                    style={{
                      background: "linear-gradient(135deg, #C8B870 0%, #b88a3a 50%, #983D06 100%)",
                      color: "#032A33",
                      borderRadius: "8px",
                      border: "1px solid rgba(200,184,112,0.45)",
                      boxShadow: "0 4px 20px -4px rgba(152,61,6,0.3), 0 2px 6px rgba(0,0,0,0.15)",
                      height: "56px",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 4px 20px -4px rgba(152,61,6,0.3), 0 0 28px -4px rgba(200,184,112,0.3)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 4px 20px -4px rgba(152,61,6,0.3), 0 2px 6px rgba(0,0,0,0.15)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    Abrir o Mapa
                  </button>

                  {/* Secondary CTA */}
                  <button
                    onClick={() => {
                      const el = document.getElementById("como-funciona-micro");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="uppercase tracking-[0.2em] font-inter transition-all duration-250 w-full"
                    style={{
                      border: "1px solid rgba(200,184,112,0.35)",
                      borderRadius: "8px",
                      color: "#EDE6DA",
                      height: "48px",
                      fontSize: "11.5px",
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(200,184,112,0.6)";
                      e.currentTarget.style.color = "#C8B870";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(200,184,112,0.35)";
                      e.currentTarget.style.color = "#EDE6DA";
                    }}
                  >
                    Como funciona
                  </button>
                </div>


              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ════════ DOBRA 2 — RODAPÉ MÍNIMO DARK ════════ */}
      <footer
        className="relative"
        style={{ background: "#032A33", borderTop: "1px solid rgba(200,184,112,0.08)" }}
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-12 lg:px-16 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-inter" style={{ fontSize: "11px", color: "rgba(207,197,184,0.5)" }}>
            © Ana Retore. Todos os direitos de design e copy reservados.
          </p>
          <a
            href="/espelho-da-clareza"
            className="font-inter transition-colors duration-200 hover:opacity-80"
            style={{ fontSize: "11.5px", color: "rgba(200,184,112,0.6)", letterSpacing: "0.03em" }}
          >
            Já tenho meu Espelho →
          </a>
        </div>
      </footer>
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
