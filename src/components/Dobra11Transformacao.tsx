import { motion } from "framer-motion";
import AccessibilityReader from "@/components/AccessibilityReader";

const Dobra11Transformacao = () => {
  return (
    <section
      className="relative py-24"
      role="region"
      aria-labelledby="dobra11-title"
    >
      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra11-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-[680px] mx-auto"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra11-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold mb-10 leading-tight tracking-tight text-editorial-black"
          >
            VOCÊ MUDA O LUGAR DE ONDE OPERA.
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
              Quando a clareza se sustenta, as decisões mudam.
              <br />
              Quando as decisões mudam, a realidade acompanha.
            </p>
            <p className="font-inter text-lg text-foreground/70 leading-relaxed">
              Não porque a vida vira perfeita — mas porque você volta a agir de dentro.
            </p>
            <p className="font-inter text-lg text-foreground/80 leading-relaxed font-medium">
              Isso é poder feminino: presença que governa.
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
              "Quando uma situação interna não se torna consciente, ela aparece fora, como destino."
            </p>
            <cite className="font-inter text-sm text-muted-foreground mt-2 block not-italic">
              — C. G. Jung
            </cite>
          </motion.blockquote>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <AccessibilityReader contentId="dobra11-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra11Transformacao;
