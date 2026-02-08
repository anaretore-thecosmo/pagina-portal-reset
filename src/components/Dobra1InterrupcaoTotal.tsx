import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AccessibilityReader from "@/components/AccessibilityReader";

const Dobra1InterrupcaoTotal = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
      role="banner"
      aria-labelledby="dobra1-title"
    >
      {/* Background glow effects */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra1-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
          role="region"
          aria-label="Introdução ao Portal Reset"
        >
          {/* 3 seconds phrase */}
          <motion.h1
            id="dobra1-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-cinzel text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight"
          >
            <span className="text-gradient-gold">A verdade não transforma.</span>
            <br />
            <span className="text-foreground">A escolha, sim.</span>
          </motion.h1>

          {/* 10 seconds text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4 mb-8"
          >
            <p className="font-philosopher text-lg md:text-xl text-foreground/80 leading-relaxed">
              Você não precisa de mais informação.
            </p>
            <p className="font-philosopher text-lg md:text-xl text-foreground/80 leading-relaxed">
              Precisa de um lugar onde a consciência não se perca no meio do dia.
            </p>
            <p className="font-philosopher text-lg md:text-xl text-foreground/80 leading-relaxed">
              A maioria das mulheres não vive sem poder.<br />
              Vive sem sustentação interna.
            </p>
            <p className="font-philosopher text-lg md:text-xl text-foreground/80 leading-relaxed">
              Isso não é falha pessoal.<br />
              É funcionamento automático.
            </p>
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="border-l-4 border-primary pl-6 py-2 mb-10"
          >
            <p className="font-crimson text-xl md:text-2xl italic text-foreground/90">
              "Sem consciência, a vontade não cria. Apenas repete."
            </p>
          </motion.blockquote>

          {/* Accessibility Reader */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mb-8"
          >
            <AccessibilityReader contentId="dobra1-content" label="Ouvir esta seção" />
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Button
              variant="cta"
              size="xl"
              className="group text-lg px-12"
              onClick={() => window.open('https://pay.kiwify.com.br/TNXfTZT', '_blank')}
              aria-label="Entrar no Portal Reset - abre página de compra em nova aba"
            >
              <span className="relative z-10">ENTRAR NO PORTAL RESET</span>
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                aria-hidden="true"
              />
            </Button>
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra1InterrupcaoTotal;
