import { motion } from "framer-motion";
import AccessibilityReader from "@/components/AccessibilityReader";

const Dobra7ComoFunciona = () => {
  return (
    <section
      className="relative py-24"
      role="region"
      aria-labelledby="dobra7-title"
    >
      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra7-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-[680px] mx-auto"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra7-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold mb-10 leading-tight tracking-tight"
          >
            <span className="text-editorial-black">OS 10 DIAS NÃO SÃO O FIM.</span>
            <br />
            <span className="text-editorial-gold">SÃO A ENTRADA.</span>
          </motion.h2>

          {/* 10 seconds text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-5 mb-12"
          >
            <p className="font-inter text-lg text-foreground/80 leading-relaxed">
              O Reset 10D existe para reorganizar sua mente e te colocar de volta no comando.
            </p>
            <p className="font-inter text-lg text-foreground/70 leading-relaxed">
              2 a 5 minutos por dia. Sem sobrecarga. Sem performance.
            </p>
            <p className="font-inter text-lg text-foreground/80 leading-relaxed">
              Você aprende o caminho — e depois permanece no Portal para sustentar.
            </p>
          </motion.div>

          {/* Timeline - 10 points */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-2 mb-12"
            aria-label="Linha do tempo de 10 dias"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary/60 border border-primary" />
                <span className="font-inter text-xs text-muted-foreground">{i + 1}</span>
              </div>
            ))}
          </motion.div>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <AccessibilityReader contentId="dobra7-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra7ComoFunciona;
