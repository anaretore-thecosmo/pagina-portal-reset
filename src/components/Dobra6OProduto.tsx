import { motion } from "framer-motion";
import AccessibilityReader from "@/components/AccessibilityReader";
import alchemistPortal from "@/assets/alchemist-portal.png";

const Dobra6OProduto = () => {
  return (
    <section
      className="relative py-24 overflow-hidden"
      role="region"
      aria-labelledby="dobra6-title"
    >
      {/* Background with portal image */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={alchemistPortal}
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra6-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra6-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight"
          >
            <span className="text-gradient-gold">O PORTAL RESET é um espaço.</span>
            <br />
            <span className="text-foreground">Não um aplicativo para usar.</span>
          </motion.h2>

          {/* Product highlight card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mystical-card p-8 md:p-12 mb-8"
          >
            <span className="font-cinzel text-primary tracking-[0.3em] text-sm uppercase">
              Apresentando
            </span>
            <h3 className="font-cinzel text-gradient-gold text-3xl md:text-4xl font-bold mt-4 mb-6">
              O PORTAL RESET
            </h3>
            <p className="font-philosopher text-foreground/80 text-lg leading-relaxed">
              Um espaço feminino de consciência, escolha e poder.
            </p>
          </motion.div>

          {/* 10 seconds text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="space-y-4 mb-8"
          >
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed">
              Um ambiente contínuo para retornar à clareza,
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed">
              sem precisar começar do zero toda vez.
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed mt-6">
              Você não entra para aprender algo novo.
            </p>
            <p className="font-philosopher text-lg text-foreground/80 leading-relaxed">
              Você entra para sustentar o que já sabe, sem se perder de si.
            </p>
          </motion.div>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <AccessibilityReader contentId="dobra6-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra6OProduto;
