import { motion } from "framer-motion";
import AccessibilityReader from "@/components/AccessibilityReader";
import goldenMagic from "@/assets/golden-magic.png";

const Dobra11Transformacao = () => {
  return (
    <section
      className="relative py-24 overflow-hidden"
      role="region"
      aria-labelledby="dobra11-title"
    >
      {/* Background with golden magic image */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={goldenMagic}
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        {/* Extra glow for transformation feel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra11-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra11-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight"
          >
            <span className="text-gradient-gold">Você muda o lugar de onde opera.</span>
          </motion.h2>

          {/* 10 seconds text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-4 mb-10"
          >
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed">
              Quando a clareza se sustenta,
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed">
              as decisões mudam.
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed mt-6">
              Quando as decisões mudam,
            </p>
            <p className="font-philosopher text-lg text-primary font-semibold leading-relaxed">
              a realidade acompanha.
            </p>
            <p className="font-philosopher text-lg text-foreground/70 leading-relaxed mt-6">
              Sem força.
            </p>
            <p className="font-philosopher text-lg text-foreground/70 leading-relaxed">
              Sem personagem.
            </p>
          </motion.div>

          {/* Decorative transformation element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="py-8"
            aria-hidden="true"
          >
            <div className="w-16 h-16 mx-auto relative">
              <div className="absolute inset-0 border border-primary/30 rounded-full animate-pulse-slow" />
              <div className="absolute inset-2 border border-primary/50 rounded-full animate-pulse-slow" style={{ animationDelay: "0.5s" }} />
              <div className="absolute inset-4 border border-primary rounded-full animate-pulse-slow" style={{ animationDelay: "1s" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-primary text-xl">☉</span>
              </div>
            </div>
          </motion.div>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <AccessibilityReader contentId="dobra11-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra11Transformacao;
