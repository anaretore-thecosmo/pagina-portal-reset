import { motion } from "framer-motion";
import AccessibilityReader from "@/components/AccessibilityReader";

const qualifications = [
  "Já percebeu que sabe — mas não sustenta.",
  "Quer sair do automático sem depender de motivação.",
  "Prefere consistência a promessa.",
];

const Dobra10ParaQuemE = () => {
  return (
    <section
      className="relative py-24 bg-card"
      role="region"
      aria-labelledby="dobra10-title"
    >
      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra10-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-[680px] mx-auto"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra10-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold mb-10 leading-tight tracking-tight text-editorial-black"
          >
            ISSO NÃO É PARA TODO MUNDO.
          </motion.h2>

          {/* Qualification list */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mb-10"
          >
            <p className="font-inter text-lg text-foreground/70 mb-6">
              É para quem:
            </p>
            <ul className="space-y-4 mb-8" role="list" aria-label="Para quem é o Portal Reset">
              {qualifications.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-sm" aria-hidden="true">—</span>
                  <span className="font-inter text-lg text-foreground/80">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Anti-qualification */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mb-10"
          >
            <p className="font-inter text-foreground/50">
              Não é para quem busca pico emocional, atalho, promessa barulhenta.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="font-inter text-lg text-foreground/80 font-medium"
          >
            Sem julgamento. Só alinhamento.
          </motion.p>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-10"
          >
            <AccessibilityReader contentId="dobra10-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra10ParaQuemE;
