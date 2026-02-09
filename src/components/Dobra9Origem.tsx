import { motion } from "framer-motion";
import AccessibilityReader from "@/components/AccessibilityReader";

const Dobra9Origem = () => {
  return (
    <section
      className="relative py-24"
      role="region"
      aria-labelledby="dobra9-title"
    >
      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra9-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-[680px] mx-auto"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra9-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold mb-10 leading-tight tracking-tight text-editorial-black"
          >
            EU CRIEI ISSO POR NECESSIDADE REAL.
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
              Em 2016 eu tive uma epifania: meu trabalho é ajudar pessoas a descobrir propósito — e traduzir isso em vida prática.
            </p>
            <p className="font-inter text-lg text-foreground/70 leading-relaxed">
              Mas eu vi um loop rodando em mim enquanto eu jurava que estava "fazendo tudo certo".
              Crenças antigas. Programas automáticos. Mentiras elegantes.
            </p>
            <p className="font-inter text-lg text-foreground/70 leading-relaxed">
              O custo foi concreto: energia drenada, dinheiro indo pro "mais uma coisa", relações sentindo o peso do desalinhamento.
            </p>
            <p className="font-inter text-lg text-foreground/80 leading-relaxed font-medium">
              A decisão foi virar a chave do como: método, execução e sistema.
            </p>
          </motion.div>

          {/* Gold editorial line as signature */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="w-20 h-px bg-primary mb-10"
            aria-hidden="true"
          />

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <AccessibilityReader contentId="dobra9-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra9Origem;
