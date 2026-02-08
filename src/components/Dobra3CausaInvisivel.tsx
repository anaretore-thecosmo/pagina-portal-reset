import { motion } from "framer-motion";
import AccessibilityReader from "@/components/AccessibilityReader";
import bannerBrain from "@/assets/banner-brain.webp";

const Dobra3CausaInvisivel = () => {
  return (
    <section
      className="relative py-20 overflow-hidden"
      role="region"
      aria-labelledby="dobra3-title"
    >
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={bannerBrain}
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra3-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra3-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight"
          >
            <span className="text-gradient-gold">O problema não é falta de disciplina.</span>
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
              Segundo a neurociência, o cérebro foi projetado para economizar energia,
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed">
              não para gerar clareza.
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed mt-6">
              Ele repete o que é familiar.
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed">
              Mesmo quando isso custa caro.
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed mt-6">
              Tradições antigas já sabiam:<br />
              uma mente não observada governa a vida inteira.
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
              "Pensamentos não escolhidos governam vidas inteiras."
            </p>
          </motion.blockquote>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <AccessibilityReader contentId="dobra3-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra3CausaInvisivel;
