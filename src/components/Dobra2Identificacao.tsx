import { motion } from "framer-motion";
import AccessibilityReader from "@/components/AccessibilityReader";

const Dobra2Identificacao = () => {
  return (
    <section
      className="relative py-24"
      role="region"
      aria-labelledby="dobra2-title"
    >
      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra2-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-[680px] mx-auto"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra2-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold mb-10 leading-tight tracking-tight"
          >
            <span className="text-editorial-black">VOCÊ NÃO ESTÁ PERDIDA.</span>
            <br />
            <span className="text-editorial-gold">ESTÁ REAGINDO.</span>
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
              Você acorda resolvendo.
              E percebe que suas decisões vêm sempre do mesmo lugar — mesmo depois de ter entendido "tanta coisa".
            </p>
            <p className="font-inter text-lg text-foreground/70 leading-relaxed">
              Isso não é falta de força.
              É automático: repetição com aparência de escolha.
            </p>
          </motion.div>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <AccessibilityReader contentId="dobra2-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra2Identificacao;
