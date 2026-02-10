import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DiagnosticoIntro from "@/components/diagnostico/DiagnosticoIntro";
import DiagnosticoQuestionComponent from "@/components/diagnostico/DiagnosticoQuestion";
import DiagnosticoRespiro from "@/components/diagnostico/DiagnosticoRespiro";
import { diagnosticoQuestions } from "@/data/diagnosticoQuestions";

const STORAGE_KEY = "mapa-padrao-answers";
const RESPIRO_AFTER = [6, 12, 18, 24]; // question indices (1-based) that trigger respiro

type Step = "intro" | "question" | "respiro";

const DiagnosticoPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [respiroIndex, setRespiroIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return Array(24).fill(null);
  });

  // Persist answers
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const handleStart = useCallback(() => {
    // Clear previous answers
    const fresh = Array(24).fill(null);
    setAnswers(fresh);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    setCurrentQuestion(0);
    setRespiroIndex(0);
    setStep("question");
  }, []);

  const handleAnswer = useCallback(
    (value: number) => {
      setAnswers((prev) => {
        const next = [...prev];
        next[currentQuestion] = value;
        return next;
      });

      const questionNumber = currentQuestion + 1; // 1-based
      const respiroIdx = RESPIRO_AFTER.indexOf(questionNumber);

      if (respiroIdx !== -1) {
        // Show respiro screen
        setRespiroIndex(respiroIdx);
        setStep("respiro");
      } else if (currentQuestion < 23) {
        setCurrentQuestion((prev) => prev + 1);
      }
    },
    [currentQuestion]
  );

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    } else {
      setStep("intro");
    }
  }, [currentQuestion]);

  const handleRespiroContinue = useCallback(() => {
    if (respiroIndex === 3) {
      // Last respiro → navigate to /espelho with normalized scores
      const meanScores = Array.from({ length: 12 }, (_, i) => {
        const q1 = 10 - (answers[i * 2] ?? 5);
        const q2 = 10 - (answers[i * 2 + 1] ?? 5);
        return (q1 + q2) / 2;
      });
      navigate("/espelho", { state: { scores: meanScores, answers } });
    } else {
      // Continue to next question
      setCurrentQuestion(RESPIRO_AFTER[respiroIndex]);
      setStep("question");
    }
  }, [respiroIndex, answers, navigate]);

  return (
    <main className="bg-background">
      {step === "intro" && <DiagnosticoIntro onStart={handleStart} />}
      {step === "question" && (
        <DiagnosticoQuestionComponent
          question={diagnosticoQuestions[currentQuestion]}
          currentIndex={currentQuestion}
          total={24}
          initialValue={answers[currentQuestion] ?? undefined}
          onNext={handleAnswer}
          onBack={handleBack}
          canGoBack={true}
        />
      )}
      {step === "respiro" && (
        <DiagnosticoRespiro
          index={respiroIndex}
          onContinue={handleRespiroContinue}
        />
      )}
    </main>
  );
};

export default DiagnosticoPage;
