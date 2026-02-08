import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AccessibilityReaderProps {
  contentId: string;
  label?: string;
}

const AccessibilityReader = ({ contentId, label = "Ouvir conteúdo" }: AccessibilityReaderProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const speak = useCallback(() => {
    const element = document.getElementById(contentId);
    if (!element) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const text = element.innerText || element.textContent || "";
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure for Portuguese
    utterance.lang = "pt-BR";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [contentId]);

  const togglePause = useCallback(() => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isPaused]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2"
      role="region"
      aria-label="Controles de acessibilidade para leitura do conteúdo"
    >
      <AnimatePresence mode="wait">
        {!isPlaying ? (
          <Button
            key="play"
            variant="outline"
            size="sm"
            onClick={speak}
            className="gap-2 border-primary/30 hover:border-primary hover:bg-primary/10"
            aria-label={label}
          >
            <Volume2 className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm">{label}</span>
          </Button>
        ) : (
          <motion.div
            key="controls"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center gap-2"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={togglePause}
              className="gap-2 border-primary/30 hover:border-primary hover:bg-primary/10"
              aria-label={isPaused ? "Continuar leitura" : "Pausar leitura"}
            >
              {isPaused ? (
                <Play className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Pause className="h-4 w-4" aria-hidden="true" />
              )}
              <span className="text-sm">{isPaused ? "Continuar" : "Pausar"}</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={stop}
              className="gap-2 border-destructive/30 hover:border-destructive hover:bg-destructive/10"
              aria-label="Parar leitura"
            >
              <VolumeX className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm">Parar</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AccessibilityReader;
