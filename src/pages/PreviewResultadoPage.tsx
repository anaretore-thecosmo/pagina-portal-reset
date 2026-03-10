import { useState } from "react";
import DiagnosticoResult from "@/components/diagnostico/DiagnosticoResult";

const PRESETS: Record<string, number[]> = {
  Curiosa:      [8, 7, 9, 8, 7, 9, 8, 7, 9, 8, 7, 6, 8, 9, 7, 8, 6, 9, 8, 7, 9, 8, 7, 6],
  Buscadora:    [6, 7, 6, 7, 7, 6, 6, 7, 5, 6, 7, 5, 6, 7, 6, 5, 7, 6, 5, 6, 6, 7, 7, 6],
  Estrategista: [4, 5, 3, 4, 5, 4, 3, 4, 7, 6, 4, 5, 3, 4, 6, 7, 4, 5, 3, 4, 5, 4, 6, 5],
  Soberana:     [1, 2, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 1, 3, 2, 1, 1, 2, 2, 1, 3, 2],
};

const KEYS = Object.keys(PRESETS);

const PreviewResultadoPage = () => {
  const [idx, setIdx] = useState(2); // Estrategista por padrão
  const active = KEYS[idx];

  return (
    <div>
      {/* Barra de navegação discreta — apenas setas, sem nomes de arquétipo */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-4 px-4 py-2"
        style={{ background: "#0D0F16", borderBottom: "1px solid rgba(200,184,112,0.1)" }}
      >
        <button
          onClick={() => setIdx((i) => (i - 1 + KEYS.length) % KEYS.length)}
          className="font-inter text-xs px-3 py-1 rounded transition-opacity hover:opacity-80"
          style={{ color: "rgba(207,197,184,0.45)", border: "1px solid rgba(207,197,184,0.12)" }}
        >
          ←
        </button>
        <span className="font-inter text-[10px] uppercase tracking-[0.35em]" style={{ color: "rgba(200,184,112,0.4)" }}>
          {idx + 1} / {KEYS.length}
        </span>
        <button
          onClick={() => setIdx((i) => (i + 1) % KEYS.length)}
          className="font-inter text-xs px-3 py-1 rounded transition-opacity hover:opacity-80"
          style={{ color: "rgba(207,197,184,0.45)", border: "1px solid rgba(207,197,184,0.12)" }}
        >
          →
        </button>
      </div>

      <div className="pt-10">
        <DiagnosticoResult
          key={active}
          userName=""
          answers={PRESETS[active]}
          sessionId="preview-session"
        />
      </div>
    </div>
  );
};

export default PreviewResultadoPage;
