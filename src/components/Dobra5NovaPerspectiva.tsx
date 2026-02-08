import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AccessibilityReader from "@/components/AccessibilityReader";

const Dobra5NovaPerspectiva = () => {
  return (
    <section
      className="relative py-20 overflow-hidden"
      role="region"
      aria-labelledby="dobra5-title"
    >
      {/* Brighter background - transition */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      </div>

      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra5-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra5-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight"
          >
            <span className="text-gradient-gold">Consciência não é conceito.</span>
            <br />
            <span className="text-foreground">É treino.</span>
          </motion.h2>

          {/* 10 seconds text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-4 mb-8"
          >
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed">
              Clareza não vem de pensar mais.
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed">
              Vem de perceber antes.
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed mt-6">
              O estado interno antes da decisão.<br />
              A crença antes da escolha.<br />
              O corpo antes da reação.
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed mt-6">
              É aqui que a responsabilidade retorna.<br />
              Não como peso.<br />
              <span className="text-primary font-semibold">Como poder.</span>
            </p>
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="border-l-4 border-primary pl-6 py-2 mb-10"
          >
            <p className="font-crimson text-xl md:text-2xl italic text-foreground/90">
              "Liberdade não é fazer o que se quer,<br />
              mas perceber por que se quer."
            </p>
          </motion.blockquote>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <Button
              variant="mystical"
              size="lg"
              onClick={() => window.open('https://pay.kiwify.com.br/TNXfTZT', '_blank')}
              aria-label="Entrar no Portal Reset - abre página de compra em nova aba"
            >
              ENTRAR NO PORTAL RESET
            </Button>
          </motion.div>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
          >
            <AccessibilityReader contentId="dobra5-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra5NovaPerspectiva;
