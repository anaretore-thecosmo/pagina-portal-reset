import { motion } from "framer-motion";
import AccessibilityReader from "@/components/AccessibilityReader";
import alchemistScroll from "@/assets/alchemist-scroll.png";

const Dobra9Origem = () => {
  return (
    <section
      className="relative py-20 overflow-hidden"
      role="region"
      aria-labelledby="dobra9-title"
    >
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={alchemistScroll}
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra9-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra9-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight"
          >
            <span className="text-gradient-gold">Isso nasceu de uma necessidade real.</span>
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
              Eu criei o PORTAL RESET depois de perceber que saber não bastava.
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed">
              Era preciso coerência aplicada.
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed mt-6">
              Não é método milagroso.
            </p>
            <p className="font-philosopher text-lg text-primary font-semibold leading-relaxed">
              É arquitetura de sustentação interna.
            </p>
          </motion.div>

          {/* Decorative element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="py-8"
            aria-hidden="true"
          >
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </motion.div>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <AccessibilityReader contentId="dobra9-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra9Origem;
