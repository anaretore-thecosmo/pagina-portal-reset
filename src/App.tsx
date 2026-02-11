import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DiagnosticoPage from "./pages/DiagnosticoPage";
import EspelhoPage from "./pages/EspelhoPage";
import QuizMapaPadraoPage from "./pages/QuizMapaPadraoPage";
import EspelhoDaClarezaPage from "./pages/EspelhoDaClarezaPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuizMapaPadraoPage />} />
          <Route path="/quiz-mapa-do-padrao" element={<QuizMapaPadraoPage />} />
          <Route path="/hub" element={<Index />} />
          <Route path="/diagnostico" element={<DiagnosticoPage />} />
          <Route path="/espelho" element={<EspelhoPage />} />
          <Route path="/espelho-da-clareza" element={<EspelhoDaClarezaPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
