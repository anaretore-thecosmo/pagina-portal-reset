import { motion } from "framer-motion";
import AccessibilityReader from "@/components/AccessibilityReader";

const Dobra4OQueNaoFunciona = () => {
  return (
    <section
      className="relative py-24"
      role="region"
      aria-labelledby="dobra4-title"
    >
      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra4-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-[680px] mx-auto"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra4-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold mb-10 leading-tight tracking-tight text-editorial-black"
          >
            ENTENDER NÃO MUDA COMPORTAMENTO.
          </motion.h2>

          {/* 10 seconds text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-5 mb-10"
          >
            <p className="font-inter text-lg text-foreground/80 leading-relaxed">
              Insight sem sustentação vira frustração.
              <br />
              Motivação sem base vira exaustão.
            </p>
            <p className="font-inter text-lg text-foreground/70 leading-relaxed">
              Você não falhou.
              <br />
              Você só tentou mudar a ação sem mudar o lugar interno de onde a ação nasce.
            </p>
          </motion.div>

          {/* Decorative gold line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="w-16 h-px bg-primary mb-10"
            aria-hidden="true"
          />

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="editorial-border-left pl-6 py-2 mb-10"
          >
            <p className="font-playfair text-lg md:text-xl italic text-foreground/70">
              "Meu mundo é o que eu escolho perceber."
            </p>
            <cite className="font-inter text-sm text-muted-foreground mt-2 block not-italic">
              — William James
            </cite>
          </motion.blockquote>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <AccessibilityReader contentId="dobra4-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra4OQueNaoFunciona;
