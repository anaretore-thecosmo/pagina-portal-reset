import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { respiroTexts } from "@/data/diagnosticoQuestions";

interface DiagnosticoRespiroProps {
  index: number;
  onContinue: () => void;
}

const DiagnosticoRespiro = ({ index, onContinue }: DiagnosticoRespiroProps) => {
  const isLast = index === 3;
  const text = respiroTexts[index] ?? "";

  return (
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
          {isLast ? "Ver meu Espelho" : "Continuar"}
        </Button>
      </motion.div>
    </div>
  );
};

export default DiagnosticoRespiro;
