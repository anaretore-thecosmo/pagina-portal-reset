import { motion } from "framer-motion";
import AccessibilityReader from "@/components/AccessibilityReader";

const Dobra5NovaPerspectiva = () => {
  return (
    <section
      className="relative py-24"
      role="region"
      aria-labelledby="dobra5-title"
    >
      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra5-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-[680px] mx-auto"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra5-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold mb-10 leading-tight tracking-tight"
          >
            <span className="text-editorial-black">CONSCIÊNCIA NÃO É CONCEITO.</span>
            <br />
            <span className="text-editorial-gold">É TREINO.</span>
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
              Treino é repetição com intenção.
              E repetição precisa de ambiente.
            </p>
            <p className="font-inter text-lg text-foreground/80 leading-relaxed">
              O Portal te devolve ao eixo em poucos minutos — para que sua vida não dependa do seu humor, nem do seu "dia bom".
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
              "Atenção, no grau mais alto, é oração."
            </p>
            <cite className="font-inter text-sm text-muted-foreground mt-2 block not-italic">
              — Simone Weil
            </cite>
          </motion.blockquote>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <AccessibilityReader contentId="dobra5-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra5NovaPerspectiva;
