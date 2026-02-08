import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AccessibilityReader from "@/components/AccessibilityReader";

const Dobra12CTA = () => {
  return (
    <section
      className="relative py-24 overflow-hidden"
      role="region"
      aria-labelledby="dobra12-title"
    >
      {/* Background glow */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra12-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Decorative element */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 mx-auto mb-8 relative"
            aria-hidden="true"
          >
            <div className="absolute inset-0 border border-primary/30 rounded-full" />
            <div className="absolute inset-2 border border-primary/20 rounded-full" />
            <div className="absolute inset-4 border border-primary/10 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-primary text-3xl">☉</span>
            </div>
          </motion.div>

          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra12-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-cinzel text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight"
          >
            <span className="text-gradient-gold">Entre no PORTAL RESET.</span>
          </motion.h2>

          {/* Price Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mystical-card p-8 md:p-10 mb-8"
          >
            <p className="font-philosopher text-foreground/60 text-sm mb-2">Investimento mensal</p>
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="font-cinzel text-gradient-gold text-5xl md:text-6xl font-bold">R$ 47</span>
              <span className="font-philosopher text-foreground/60 text-lg">/mês</span>
            </div>
            <p className="font-philosopher text-foreground/70 text-base mb-4">
              Acesso contínuo ao PORTAL RESET
            </p>
            <div className="pt-4 border-t border-primary/20 space-y-2">
              <p className="font-philosopher text-foreground/80 text-sm">
                ✓ Protocolo RESET MENTAL 10D incluso
              </p>
              <p className="font-philosopher text-foreground/80 text-sm">
                ✓ Práticas diárias de clareza
              </p>
              <p className="font-philosopher text-foreground/80 text-sm">
                ✓ Acesso contínuo ao ambiente
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <Button
              variant="cta"
              size="xl"
              className="group text-lg px-12"
              onClick={() => window.open('https://pay.kiwify.com.br/TNXfTZT', '_blank')}
              aria-label="Entrar no Portal Reset - abre página de compra em nova aba"
            >
              <span className="relative z-10">ENTRAR NO PORTAL RESET</span>
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                aria-hidden="true"
              />
            </Button>
          </motion.div>

          {/* Guarantee */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="font-philosopher text-foreground/50 text-sm mb-4"
          >
            🔒 Compra segura • Garantia de 30 dias
          </motion.p>

          {/* Subtexto */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="font-philosopher text-foreground/60 text-base"
          >
            Você permanece enquanto fizer sentido.
          </motion.p>

          {/* Final message */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="mt-8 p-4 border border-primary/20 rounded-lg bg-primary/5"
          >
            <p className="font-philosopher text-primary/80 text-sm italic">
              Um espaço para sustentar clareza no dia a dia.
            </p>
          </motion.div>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mt-8"
          >
            <AccessibilityReader contentId="dobra12-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra12CTA;
