import { motion } from "framer-motion";
import AccessibilityReader from "@/components/AccessibilityReader";

const benefits = [
  "Reorganizar pensamentos em momentos de confusão",
  "Voltar para si sem esforço",
  "Sustentar decisões coerentes",
];

const Dobra8Diferencial = () => {
  return (
    <section
      className="relative py-20 overflow-hidden"
      role="region"
      aria-labelledby="dobra8-title"
    >
      {/* Background glow */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra8-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra8-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight"
          >
            <span className="text-gradient-gold">O protocolo inicia.</span>
            <br />
            <span className="text-foreground">O PORTAL sustenta.</span>
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
              O verdadeiro divisor de águas não é despertar.
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed">
              É permanecer lúcida no dia a dia.
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed mt-6">
              Por isso o PORTAL RESET é recorrente.
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed">
              Você não paga por um desafio.
            </p>
            <p className="font-philosopher text-lg text-primary font-semibold leading-relaxed">
              Você permanece em um espaço.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mb-10"
          >
            <p className="font-philosopher text-lg text-foreground/70 mb-6">
              Aqui você pode:
            </p>
            <ul className="space-y-4" role="list" aria-label="Benefícios do Portal Reset">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center justify-center gap-3"
                >
                  <span className="text-primary" aria-hidden="true">◆</span>
                  <span className="font-philosopher text-lg text-foreground/80">
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            <AccessibilityReader contentId="dobra8-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra8Diferencial;
