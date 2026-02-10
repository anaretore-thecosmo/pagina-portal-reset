import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import DiagnosticoResult from "@/components/diagnostico/DiagnosticoResult";

const STORAGE_KEY = "mapa-padrao-session";

const EspelhoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { scores?: number[]; answers?: (number | null)[] } | null;

  // Try localStorage fallback
  const resolved = useMemo(() => {
    if (state?.scores) return state;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const session = JSON.parse(raw);
        const answers: (number | null)[] = session.answers?.map?.((a: any) =>
          typeof a === "object" ? a.value : a
        ) ?? [];
        if (answers.length === 24) {
          const scores = Array.from({ length: 12 }, (_, i) => {
            const q1 = 10 - (answers[i * 2] ?? 5);
            const q2 = 10 - (answers[i * 2 + 1] ?? 5);
            return (q1 + q2) / 2;
          });
          return { scores, answers };
        }
      }
    } catch {}

    return null;
  }, [state]);

  useEffect(() => {
    if (!resolved) navigate("/diagnostico");
  }, [resolved, navigate]);

  if (!resolved) return null;

  return (
    <main className="min-h-screen bg-background">
      <DiagnosticoResult scores={resolved.scores!} userName="" answers={resolved.answers} />
    </main>
  );
};

export default EspelhoPage;
