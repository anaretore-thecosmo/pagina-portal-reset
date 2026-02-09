import { motion } from "framer-motion";
import AccessibilityReader from "@/components/AccessibilityReader";

const Dobra6OProduto = () => {
  return (
    <section
      className="relative py-24 bg-card"
      role="region"
      aria-labelledby="dobra6-title"
    >
      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra6-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-[680px] mx-auto"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra6-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold mb-10 leading-tight tracking-tight"
          >
            <span className="text-editorial-black">O PORTAL RESET É UM ESPAÇO.</span>
            <br />
            <span className="text-editorial-gold">NÃO UM APP PARA "DAR CONTA".</span>
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
              Você não entra para consumir conteúdo.
              <br />
              Você entra para sustentar presença, clareza e poder no cotidiano.
            </p>
            <p className="font-inter text-lg text-foreground/70 leading-relaxed">
              Quando a mente volta ao ruído, você volta ao Portal.
              <br />
              Quando a vida aperta, você volta ao Portal.
            </p>
            <p className="font-inter text-lg text-foreground/80 leading-relaxed font-medium">
              Isso é sustentação.
            </p>
          </motion.div>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <AccessibilityReader contentId="dobra6-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra6OProduto;
