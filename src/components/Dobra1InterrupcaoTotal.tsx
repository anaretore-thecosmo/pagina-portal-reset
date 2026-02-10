import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AccessibilityReader from "@/components/AccessibilityReader";

const Dobra1InterrupcaoTotal = () => {
  const navigate = useNavigate();
  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-24"
      role="banner"
      aria-labelledby="dobra1-title"
    >
      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra1-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-[680px] mx-auto text-center"
          role="region"
          aria-label="Introdução ao Portal Reset"
        >
          {/* 3 seconds phrase */}
          <motion.h1
            id="dobra1-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-playfair text-4xl md:text-5xl lg:text-7xl font-bold mb-10 leading-[1.1] tracking-tight"
          >
            <span className="text-editorial-black">A VERDADE NÃO TRANSFORMA.</span>
            <br />
            <span className="text-editorial-gold">SUA ESCOLHA, SIM.</span>
          </motion.h1>

          {/* 10 seconds text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-5 mb-10"
          >
            <p className="font-inter text-lg md:text-xl text-foreground/80 leading-relaxed">
              O PORTAL RESET é um espaço de mentalidade e poder feminino.
            </p>
            <p className="font-inter text-lg md:text-xl text-foreground/80 leading-relaxed">
              Você entra com um Reset de 10 dias — e permanece com um sistema que sustenta a mudança no dia comum.
            </p>
            <p className="font-inter text-lg md:text-xl text-foreground/70 leading-relaxed">
              Sem vídeos longos. Sem personagem. Sem marketing barulhento.
            </p>
            <p className="font-inter text-lg md:text-xl text-foreground/80 leading-relaxed font-medium">
              Consciência não falta. O que falta é sustentação.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mb-8"
          >
            <Button
              variant="cta"
              size="xl"
              className="text-base px-12"
              onClick={() => window.open('https://pay.kiwify.com.br/TNXfTZT', '_blank')}
              aria-label="Entrar no Portal Reset - abre página de compra em nova aba"
            >
              ENTRAR NO PORTAL RESET
            </Button>
          </motion.div>

          {/* Diagnóstico Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.5 }}
            className="mb-8"
          >
            <Button
              variant="editorialOutline"
              size="lg"
              className="text-sm px-10 uppercase tracking-[0.12em]"
              onClick={() => navigate('/quiz-mapa-do-padrao')}
              aria-label="Fazer o diagnóstico Mapa do Padrão"
            >
              Fazer o diagnóstico
            </Button>
          </motion.div>

          {/* Accessibility Reader */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.4 }}
          >
            <AccessibilityReader contentId="dobra1-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra1InterrupcaoTotal;
