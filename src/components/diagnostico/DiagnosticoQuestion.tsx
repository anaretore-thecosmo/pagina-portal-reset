import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
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

  const blockIndex = Math.floor(currentIndex / 6);
  const isDark = blockIndex % 2 === 0;

  const bg = isDark ? "hsl(215 25% 12%)" : "hsl(var(--off-white))";
  const fg = isDark ? "hsl(var(--off-white))" : "hsl(var(--graphite))";
  const fgMuted = isDark ? "hsl(var(--off-white) / 0.45)" : "hsl(var(--graphite) / 0.45)";
  const progressColor = "hsl(var(--matte-gold))";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.35 }}
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: bg, color: fg }}
      >
        <div className="w-full max-w-lg">
          {/* Progress */}
          <div className="mb-10">
            <div className="flex justify-between items-center text-xs mb-2" style={{ color: fgMuted }}>
              <span className="uppercase tracking-[0.15em]">Pergunta</span>
              <span>{currentIndex + 1} de {total}</span>
            </div>
            <div className="w-full h-[2px] rounded-full" style={{ background: isDark ? "hsl(0 0% 100% / 0.08)" : "hsl(var(--graphite) / 0.08)" }}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / total) * 100}%`, background: progressColor }}
              />
            </div>
          </div>

          {/* Question text */}
          <p
            className="font-playfair text-center leading-snug"
            style={{ fontSize: "clamp(18px, 3vw, 24px)" }}
          >
            {question.text}
          </p>

          {/* Scale */}
          <div className="mt-10">
            <div className="flex justify-between text-[11px] mb-3 px-1" style={{ color: fgMuted }}>
              <span>1 quase nunca</span>
              <span>9 quase sempre</span>
            </div>
            <div className="flex justify-between gap-1">
              {SCALE.map((val) => {
                const isSelected = selected === val;
                return (
                  <button
                    key={val}
                    onClick={() => setSelected(val)}
                    className="flex-1 aspect-square max-w-[44px] rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200"
                    style={{
                      border: `1.5px solid ${isSelected ? progressColor : (isDark ? "hsl(0 0% 100% / 0.15)" : "hsl(var(--graphite) / 0.15)")}`,
                      background: isSelected ? progressColor : "transparent",
                      color: isSelected ? "hsl(var(--warm-black))" : fg,
                    }}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex justify-between items-center">
            {canGoBack ? (
              <button
                onClick={onBack}
                className="flex items-center gap-1 text-xs uppercase tracking-wider"
                style={{ color: fgMuted }}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Voltar
              </button>
            ) : (
              <div />
            )}

            <Button
              onClick={() => selected !== null && onNext(selected)}
              disabled={selected === null}
              className="px-8 py-2.5 uppercase tracking-[0.12em] text-sm rounded-none border"
              style={{
                background: selected !== null ? progressColor : "transparent",
                borderColor: progressColor,
                color: selected !== null ? "hsl(var(--warm-black))" : fgMuted,
                opacity: selected === null ? 0.4 : 1,
              }}
            >
              Próxima
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DiagnosticoQuestionComponent;
