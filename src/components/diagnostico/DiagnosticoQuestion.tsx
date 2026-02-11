import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { DiagnosticoQuestion } from "@/data/diagnosticoQuestions";

interface Props {
  question: DiagnosticoQuestion;
  currentIndex: number;
  total: number;
  initialValue?: number;
  onNext: (value: number) => void;
  onBack: () => void;
  canGoBack: boolean;
}

const SCALE = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const DiagnosticoQuestionComponent = ({
  question,
  currentIndex,
  total,
  initialValue,
  onNext,
  onBack,
  canGoBack,
}: Props) => {
  const [selected, setSelected] = useState<number | null>(initialValue ?? null);

  useEffect(() => {
    setSelected(initialValue ?? null);
  }, [currentIndex, initialValue]);

  // Alternate every screen: even index = light, odd index = dark
  const isDark = currentIndex % 2 !== 0;

  const bg = isDark ? "hsl(215 25% 10%)" : "hsl(var(--off-white))";
  const fg = isDark ? "hsl(var(--off-white))" : "hsl(var(--graphite))";
  const fgMuted = isDark
    ? "hsl(var(--off-white) / 0.4)"
    : "hsl(var(--graphite) / 0.4)";
  const borderSubtle = isDark
    ? "hsl(0 0% 100% / 0.12)"
    : "hsl(var(--graphite) / 0.12)";
  const goldAccent = "hsl(var(--matte-gold))";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: bg, color: fg }}
      >
        <div className="w-full max-w-lg">
          {/* Progress bar — editorial thin line */}
          <div className="mb-14">
            <div
              className="flex justify-between items-center mb-2"
              style={{ color: fgMuted }}
            >
              <span
                className="uppercase tracking-[0.2em] font-inter"
                style={{ fontSize: "10px", letterSpacing: "0.2em" }}
              >
                Pergunta
              </span>
              <span
                className="font-inter tabular-nums"
                style={{ fontSize: "10px" }}
              >
                {String(currentIndex + 1).padStart(2, "0")} / {total}
              </span>
            </div>
            <div
              className="w-full h-px"
              style={{ background: borderSubtle }}
            >
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
            Responda pensando nos últimos 30 dias. Seja brutalmente honesta. Ninguém vai te julgar. Só o seu padrão.
          </p>

          {/* Divider above question */}
          <div
            className="w-8 h-px mx-auto mb-6"
            style={{ background: goldAccent }}
          />

          {/* Question text */}
          <p
            className="font-playfair text-center leading-relaxed"
            style={{ fontSize: "clamp(18px, 3.2vw, 26px)" }}
          >
            {question.text}
          </p>

          {/* Scale — editorial index style */}
          <div className="mt-14">
            {/* Labels */}
            <div
              className="flex justify-between mb-4 font-inter uppercase tracking-[0.15em]"
              style={{ fontSize: "9px", color: fgMuted }}
            >
              <span>1 — discordo totalmente</span>
              <span>9 — concordo totalmente</span>
            </div>

            {/* Number grid */}
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
            {canGoBack ? (
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 font-inter uppercase tracking-[0.18em] transition-colors duration-200 hover:opacity-70"
                style={{ fontSize: "10px", color: fgMuted }}
              >
                <ArrowLeft className="w-3 h-3" />
                Voltar
              </button>
            ) : (
              <div />
            )}

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

export default DiagnosticoQuestionComponent;
