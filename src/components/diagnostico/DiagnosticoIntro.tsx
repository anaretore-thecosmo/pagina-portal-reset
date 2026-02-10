import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface DiagnosticoIntroProps {
  onStart: () => void;
}

const DiagnosticoIntro = ({ onStart }: DiagnosticoIntroProps) => {
  return (
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

        <p className="mt-4 text-lg font-playfair italic" style={{ color: "hsl(var(--off-white) / 0.7)" }}>
          Mapeie seu padrão atual.
        </p>

        <p className="mt-6 text-sm leading-relaxed" style={{ color: "hsl(var(--off-white) / 0.55)" }}>
          24 perguntas. Escala de 1 a 9.<br />
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
};

export default DiagnosticoIntro;
