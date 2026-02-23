import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import DiagnosticoPage from "./pages/DiagnosticoPage";
import EspelhoPage from "./pages/EspelhoPage";
import QuizMapaPadraoPage from "./pages/QuizMapaPadraoPage";
import EspelhoDaClarezaPage from "./pages/EspelhoDaClarezaPage";
import CheckoutTestPage from "./pages/CheckoutTestPage";
import PortalResetPage from "./pages/PortalResetPage";
import VendasPage from "./pages/VendasPage";
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
          <Route path="/landing-antiga" element={<Index />} />
          <Route path="/diagnostico" element={<DiagnosticoPage />} />
          <Route path="/espelho" element={<EspelhoPage />} />
          <Route path="/espelho-da-clareza" element={<EspelhoDaClarezaPage />} />
          <Route path="/portal-reset" element={<PortalResetPage />} />
          <Route path="/vendas" element={<VendasPage />} />
          <Route path="/checkout-test" element={<CheckoutTestPage />} />
          {/* Redirects de segurança */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/index" element={<Navigate to="/" replace />} />
          <Route path="/landing" element={<Navigate to="/" replace />} />
          <Route path="/hub" element={<Navigate to="/" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
