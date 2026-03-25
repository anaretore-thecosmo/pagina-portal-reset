import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LandingMapaPage from "./pages/LandingMapaPage";
import QuizMapaPadraoPage from "./pages/QuizMapaPadraoPage";
import EspelhoDaClarezaPage from "./pages/EspelhoDaClarezaPage";
import PoliticaDePrivacidadePage from "./pages/PoliticaDePrivacidadePage";
import ExclusaoDeDadosPage from "./pages/ExclusaoDeDadosPage";
import TermosDeUsoPage from "./pages/TermosDeUsoPage";
import PreviewResultadoPage from "./pages/PreviewResultadoPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mapa" element={<LandingMapaPage />} />
          <Route path="/quiz-mapa-do-padrao" element={<QuizMapaPadraoPage />} />
          <Route path="/espelho-da-clareza" element={<EspelhoDaClarezaPage />} />
          <Route path="/preview-resultado" element={<PreviewResultadoPage />} />
          <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidadePage />} />
          <Route path="/exclusao-de-dados" element={<ExclusaoDeDadosPage />} />
          <Route path="/termos-de-uso" element={<TermosDeUsoPage />} />
          {/* Redirects de segurança */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/index" element={<Navigate to="/" replace />} />
          <Route path="/landing" element={<Navigate to="/" replace />} />
          <Route path="/hub" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
