import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AccessibilityReader from "@/components/AccessibilityReader";
import crystalGrimoire from "@/assets/crystal-grimoire.png";

const deliverables = [
  "Protocolo inicial RESET MENTAL — 10D",
  "Práticas diárias de 2 a 5 minutos",
  "Exercícios de clareza e presença",
  "Rituais simples de reorganização mental",
  "Acesso contínuo ao ambiente",
];

const Dobra7ComoFunciona = () => {
  return (
    <section
      className="relative py-20 overflow-hidden"
      role="region"
      aria-labelledby="dobra7-title"
    >
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={crystalGrimoire}
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra7-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra7-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight"
          >
            <span className="text-gradient-gold">Simples. Aplicável. Habitável.</span>
          </motion.h2>

          {/* 10 seconds - intro */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="font-philosopher text-lg text-foreground/80 leading-relaxed mb-10"
          >
            Ao entrar no PORTAL RESET, você acessa:
          </motion.p>

          {/* Deliverables list */}
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="space-y-4 mb-10"
            role="list"
            aria-label="O que você recebe no Portal Reset"
          >
            {deliverables.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-center gap-3"
              >
                <span className="text-primary" aria-hidden="true">✦</span>
                <span className="font-philosopher text-lg text-foreground/80">
                  {item}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Closing text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="space-y-2 mb-10"
          >
            <p className="font-philosopher text-lg text-foreground/70">
              Nada de sobrecarga.
            </p>
            <p className="font-philosopher text-lg text-foreground/70">
              Nada de performance espiritual.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mb-8"
          >
            <Button
              variant="mysticalOutline"
              size="lg"
              onClick={() => window.open('https://pay.kiwify.com.br/TNXfTZT', '_blank')}
              aria-label="Entrar no Portal Reset - abre página de compra em nova aba"
            >
              QUERO ENTRAR NO PORTAL
            </Button>
          </motion.div>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1 }}
          >
            <AccessibilityReader contentId="dobra7-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra7ComoFunciona;
