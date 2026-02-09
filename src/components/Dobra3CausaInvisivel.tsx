import { motion } from "framer-motion";
import AccessibilityReader from "@/components/AccessibilityReader";

const Dobra3CausaInvisivel = () => {
  return (
    <section
      className="relative py-24 bg-card"
      role="region"
      aria-labelledby="dobra3-title"
    >
      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra3-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-[680px] mx-auto"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra3-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold mb-10 leading-tight tracking-tight"
          >
            <span className="text-editorial-black">O PROBLEMA NÃO É DISCIPLINA.</span>
            <br />
            <span className="text-editorial-gold">É SISTEMA.</span>
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
              Seu cérebro é uma máquina de economia de energia.
              Ele repete o que é familiar porque isso custa menos do que escolher de novo.
            </p>
            <p className="font-inter text-lg text-foreground/70 leading-relaxed">
              Sem um ambiente que sustente clareza, o automático vence — e você chama isso de "normal".
            </p>
            <p className="font-inter text-lg text-foreground/80 leading-relaxed font-medium">
              O Portal existe para reduzir atrito e proteger seu estado interno.
            </p>
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="editorial-border-left pl-6 py-2 mb-10"
          >
            <p className="font-playfair text-lg md:text-xl italic text-foreground/70">
              "Pensamentos não escolhidos governam vidas inteiras."
            </p>
          </motion.blockquote>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <AccessibilityReader contentId="dobra3-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra3CausaInvisivel;
