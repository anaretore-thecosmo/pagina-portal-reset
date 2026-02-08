import { motion } from "framer-motion";
import AccessibilityReader from "@/components/AccessibilityReader";

const Dobra2Identificacao = () => {
  return (
    <section
      className="relative py-20 overflow-hidden"
      role="region"
      aria-labelledby="dobra2-title"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" aria-hidden="true" />

      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra2-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra2-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight"
          >
            <span className="text-gradient-gold">Você não está perdida.</span>
            <br />
            <span className="text-foreground">Está reagindo.</span>
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
              Você acorda, resolve, responde, sustenta.
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed">
              Mas percebe que suas decisões vêm sempre do mesmo lugar.
            </p>
            
            {/* Cycle visualization */}
            <div className="py-6" aria-label="Ciclo de repetição">
              <p className="font-cinzel text-primary text-lg tracking-wide">
                Pensamento → emoção → escolha → repetição
              </p>
            </div>

            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed">
              Mesmo quando você "sabe mais".
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed">
              Mesmo quando já entendeu.
            </p>
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="border-l-4 border-primary pl-6 py-2 mb-8"
          >
            <p className="font-crimson text-xl md:text-2xl italic text-foreground/90">
              "A ilusão mais eficiente é confundir hábito com decisão."
            </p>
          </motion.blockquote>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="font-philosopher text-lg text-foreground/70"
          >
            Não é confusão.<br />
            É ruído.
          </motion.p>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="mt-8"
          >
            <AccessibilityReader contentId="dobra2-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra2Identificacao;
