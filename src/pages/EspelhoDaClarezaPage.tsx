import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import DiagnosticoResult from "@/components/diagnostico/DiagnosticoResult";
import type { QuizSession } from "@/data/quizMapaPadrao";

const STORAGE_KEY = "quiz-mapa-padrao-session";

const EspelhoDaClarezaPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const state = location.state as { session?: QuizSession } | null;

  const sid = searchParams.get("sid") || undefined;

  const resolved = useMemo(() => {
    // Try navigation state first
    if (state?.session?.answers?.length === 24) {
      const answers = state.session.answers.map((a) => a.value);
      const scores = Array.from({ length: 12 }, (_, i) => {
        const q1 = 10 - (answers[i * 2] ?? 5);
        const q2 = 10 - (answers[i * 2 + 1] ?? 5);
        return (q1 + q2) / 2;
      });
      return { scores, answers: answers as (number | null)[], sessionId: state.session.sessionId };
    }

    // Fallback: localStorage
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const session: QuizSession = JSON.parse(raw);
        if (sid && session.sessionId !== sid) return null;
        if (session.answers.length === 24) {
          const answers = session.answers.map((a) => a.value);
          const scores = Array.from({ length: 12 }, (_, i) => {
            const q1 = 10 - (answers[i * 2] ?? 5);
            const q2 = 10 - (answers[i * 2 + 1] ?? 5);
            return (q1 + q2) / 2;
          });
          return { scores, answers: answers as (number | null)[], sessionId: session.sessionId };
        }
      }
    } catch {}

    return null;
  }, [state, sid]);

  useEffect(() => {
    if (!resolved) navigate("/quiz-mapa-do-padrao");
  }, [resolved, navigate]);

  if (!resolved) return null;

  return (
    <main className="min-h-screen bg-background">
      <DiagnosticoResult scores={resolved.scores} userName="" answers={resolved.answers} sessionId={resolved.sessionId} />
    </main>
  );
};

export default EspelhoDaClarezaPage;
