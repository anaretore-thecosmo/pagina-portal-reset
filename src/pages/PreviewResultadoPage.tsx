import { useState } from "react";
import DiagnosticoResult from "@/components/diagnostico/DiagnosticoResult";

// Respostas fictícias calibradas para cada arquétipo
// Escala 1-9 (1 = quase nunca reativo, 9 = quase sempre reativo)
// Normalização interna: 10 - raw → overallMean determina arquétipo

const PRESETS: Record<string, { label: string; answers: number[] }> = {
  Curiosa: {
    label: "Curiosa",
    answers: [8, 7, 9, 8, 7, 9, 8, 7, 9, 8, 7, 6, 8, 9, 7, 8, 6, 9, 8, 7, 9, 8, 7, 6],
  },
  Buscadora: {
    label: "Buscadora",
    answers: [6, 7, 6, 7, 7, 6, 6, 7, 5, 6, 7, 5, 6, 7, 6, 5, 7, 6, 5, 6, 6, 7, 7, 6],
  },
  Estrategista: {
    label: "Estrategista",
    answers: [4, 5, 3, 4, 5, 4, 3, 4, 7, 6, 4, 5, 3, 4, 6, 7, 4, 5, 3, 4, 5, 4, 6, 5],
  },
  Soberana: {
    label: "Soberana",
    answers: [1, 2, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 1, 3, 2, 1, 1, 2, 2, 1, 3, 2],
  },
};

const ARQUETIPO_COLORS: Record<string, string> = {
  Curiosa: "hsl(150 28% 38%)",
  Buscadora: "hsl(28 58% 44%)",
  Estrategista: "hsl(215 38% 42%)",
  Soberana: "#C8B870",
};

const PreviewResultadoPage = () => {
  const [active, setActive] = useState<string>("Estrategista");
  const preset = PRESETS[active];

  return (
    <div>
      {/* Barra de controle fixa */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2 px-4 py-3 flex-wrap"
        style={{ background: "#0D0F16", borderBottom: "1px solid rgba(200,184,112,0.15)" }}
      >
        <span className="font-inter text-[10px] uppercase tracking-[0.3em] mr-2" style={{ color: "rgba(200,184,112,0.5)" }}>
          Preview
        </span>
        {Object.keys(PRESETS).map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className="font-inter text-xs px-4 py-1.5 rounded-full transition-all duration-200"
            style={{
              background: active === key ? ARQUETIPO_COLORS[key] : "transparent",
              color: active === key ? "#08090D" : "rgba(207,197,184,0.55)",
              border: `1px solid ${active === key ? ARQUETIPO_COLORS[key] : "rgba(207,197,184,0.15)"}`,
              fontWeight: active === key ? 600 : 400,
            }}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Resultado com padding top para não esconder atrás da barra */}
      <div className="pt-14">
        <DiagnosticoResult
          key={active}
          userName="Ana (preview)"
          answers={preset.answers}
          sessionId="preview-session"
        />
      </div>
    </div>
  );
};

export default PreviewResultadoPage;
