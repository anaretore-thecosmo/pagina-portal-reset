import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DiagnosticoResult from "@/components/diagnostico/DiagnosticoResult";

const EspelhoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { scores?: number[]; answers?: (number | null)[] } | null;

  useEffect(() => {
    if (!state?.scores) {
      navigate("/diagnostico");
    }
  }, [state, navigate]);

  if (!state?.scores) return null;

  return (
    <main className="min-h-screen bg-background">
      <DiagnosticoResult scores={state.scores} userName="" answers={state.answers} />
    </main>
  );
};

export default EspelhoPage;
