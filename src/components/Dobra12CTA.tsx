import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AccessibilityReader from "@/components/AccessibilityReader";

const Dobra12CTA = () => {
  return (
    <section
      className="relative py-24"
      role="region"
      aria-labelledby="dobra12-title"
    >
      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra12-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-[680px] mx-auto text-center"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra12-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-10 leading-tight tracking-tight text-editorial-black"
          >
            ENTRE NO PORTAL RESET.
          </motion.h2>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="font-playfair text-5xl md:text-6xl font-bold text-editorial-black">R$ 47</span>
              <span className="font-inter text-foreground/50 text-lg">/mês</span>
            </div>
            <p className="font-inter text-foreground/70">
              Acesso contínuo ao Portal Reset + Reset 10D como rito de entrada.
            </p>
          </motion.div>

          {/* Deliverables */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="space-y-2 mb-10"
          >
            <p className="font-inter text-sm text-foreground/60">
              Você permanece enquanto fizer sentido.
            </p>
            <p className="font-inter text-sm text-foreground/60">
              Garantia de 30 dias. Sem drama.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mb-4"
          >
            <Button
              variant="cta"
              size="xl"
              className="text-base px-12"
              onClick={() => window.open('https://pay.kiwify.com.br/ns0fjIx', '_blank')}
              aria-label="Entrar no Portal Reset - abre página de compra em nova aba"
            >
              ENTRAR NO PORTAL RESET
            </Button>
          </motion.div>

          {/* Microcopy */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="font-inter text-sm text-muted-foreground"
          >
            Um espaço para sustentar clareza no dia a dia.
          </motion.p>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-10"
          >
            <AccessibilityReader contentId="dobra12-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra12CTA;
