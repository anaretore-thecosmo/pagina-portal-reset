import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import DiagnosticoResult from "@/components/diagnostico/DiagnosticoResult";
import LeadGate from "@/components/diagnostico/LeadGate";
import { computeEspelho, getArquetipo } from "@/data/espelhoEngine";
import { getStoredLead, readUtmParams, saveLead, type LeadPayload } from "@/lib/leads";
import type { QuizSession } from "@/data/quizMapaPadrao";

const STORAGE_KEY = "quiz-mapa-padrao-session";

const EspelhoDaClarezaPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const state = location.state as { session?: QuizSession } | null;

  const sid = searchParams.get("sid") || undefined;

  const resolved = useMemo(() => {
    if (state?.session?.answers?.length === 12) {
      const answers = state.session.answers.map((a) => a.value);
      return { answers: answers as (number | null)[], sessionId: state.session.sessionId };
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const session: QuizSession = JSON.parse(raw);
        if (sid && session.sessionId !== sid) return null;
        if (session.answers.length === 12) {
          const answers = session.answers.map((a) => a.value);
          return { answers: answers as (number | null)[], sessionId: session.sessionId };
        }
      }
    } catch {}
    return null;
  }, [state, sid]);

  // Lead gate state — pula se já capturado anteriormente
  const [leadCaptured, setLeadCaptured] = useState<boolean>(() => getStoredLead() !== null);
  const [leadData, setLeadData] = useState<LeadPayload | null>(() => getStoredLead());

  useEffect(() => {
    if (!resolved) navigate("/quiz-mapa-do-padrao");
  }, [resolved, navigate]);

  if (!resolved) return null;

  // Calcula scores + arquetipo para enriquecer o lead (best-effort)
  const enrichLeadContext = () => {
    try {
      const espelho = computeEspelho(resolved.answers);
      const scores = espelho.axes.map((a) => a.mean);
      const arquetipo = getArquetipo(espelho);
      return { scores, arquetipo: arquetipo.nome };
    } catch {
      return { scores: undefined, arquetipo: undefined };
    }
  };

  const handleLeadSubmit = async (data: { nome: string; email: string; whatsapp?: string }) => {
    const ctx = enrichLeadContext();
    const payload = {
      nome: data.nome,
      email: data.email,
      whatsapp: data.whatsapp,
      arquetipo: ctx.arquetipo,
      scores: ctx.scores,
      utm: readUtmParams(),
    };
    await saveLead(payload);
    setLeadData({ ...payload, capturedAt: new Date().toISOString() });
    setLeadCaptured(true);
  };

  const handleSkip = () => {
    setLeadCaptured(true);
  };

  if (!leadCaptured) {
    return <LeadGate onSubmit={handleLeadSubmit} onSkip={handleSkip} />;
  }

  return (
    <main className="min-h-screen" style={{ background: "#08090D" }}>
      <DiagnosticoResult
        userName={leadData?.nome ?? ""}
        answers={resolved.answers}
        sessionId={resolved.sessionId}
      />
    </main>
  );
};

export default EspelhoDaClarezaPage;
