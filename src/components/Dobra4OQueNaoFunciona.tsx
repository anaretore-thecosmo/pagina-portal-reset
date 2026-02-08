import { motion } from "framer-motion";
import AccessibilityReader from "@/components/AccessibilityReader";

const Dobra4OQueNaoFunciona = () => {
  return (
    <section
      className="relative py-20 overflow-hidden"
      role="region"
      aria-labelledby="dobra4-title"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" aria-hidden="true" />

      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra4-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra4-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight"
          >
            <span className="text-gradient-gold">Entender não muda comportamento.</span>
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
              Insight sem sustentação vira frustração.
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed">
              Motivação sem base vira exaustão.
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed mt-6">
              Não porque você falhou.
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed">
              Mas porque tentou mudar a ação sem mudar o lugar interno de onde ela nasce.
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
              "A consciência costuma apenas justificar o que já aconteceu."
            </p>
          </motion.blockquote>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <AccessibilityReader contentId="dobra4-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra4OQueNaoFunciona;
