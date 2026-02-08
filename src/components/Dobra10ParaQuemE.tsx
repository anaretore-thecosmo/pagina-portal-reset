import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AccessibilityReader from "@/components/AccessibilityReader";

const qualifications = [
  "Já cansou de reagir",
  "Sabe que clareza é base",
  "Prefere consistência a promessa",
];

const Dobra10ParaQuemE = () => {
  return (
    <section
      className="relative py-20 overflow-hidden"
      role="region"
      aria-labelledby="dobra10-title"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" aria-hidden="true" />

      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra10-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra10-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight"
          >
            <span className="text-gradient-gold">Isso não é para todo mundo.</span>
          </motion.h2>

          {/* Qualification list */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mb-10"
          >
            <p className="font-philosopher text-lg text-foreground/70 mb-6">
              É para quem:
            </p>
            <ul className="space-y-4 mb-8" role="list" aria-label="Para quem é o Portal Reset">
              {qualifications.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-center gap-3"
                >
                  <span className="text-primary" aria-hidden="true">✓</span>
                  <span className="font-philosopher text-lg text-foreground/80">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Anti-qualification */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="p-6 border border-primary/20 rounded-lg bg-card/50 mb-10"
          >
            <p className="font-philosopher text-foreground/60">
              <span className="text-foreground/40" aria-hidden="true">✕</span>
              {" "}Não é para quem quer fórmula rápida.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="mb-8"
          >
            <Button
              variant="mystical"
              size="lg"
              onClick={() => window.open('https://pay.kiwify.com.br/TNXfTZT', '_blank')}
              aria-label="Entrar no Portal Reset - abre página de compra em nova aba"
            >
              EU QUERO CONSISTÊNCIA
            </Button>
          </motion.div>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            <AccessibilityReader contentId="dobra10-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra10ParaQuemE;
