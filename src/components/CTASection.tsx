import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import alchemistScroll from "@/assets/alchemist-scroll.png";

const CTASection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with image */}
      <div className="absolute inset-0">
        <img
          src={alchemistScroll}
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>
      
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Decorative element */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 mx-auto mb-8 relative"
          >
            <div className="absolute inset-0 border border-primary/30 rounded-full" />
            <div className="absolute inset-2 border border-primary/20 rounded-full" />
            <div className="absolute inset-4 border border-primary/10 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-primary text-3xl">☉</span>
            </div>
          </motion.div>
          
          <span className="text-primary font-cinzel tracking-[0.3em] text-sm">SUA HORA CHEGOU</span>
          
          <h2 className="font-cinzel text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            <span className="text-foreground">Pare de </span>
            <span className="text-gradient-gold">Explicar</span>
            <br />
            <span className="text-foreground">Comece a </span>
            <span className="text-gradient-gold">Transformar</span>
          </h2>
          
          <p className="font-philosopher text-lg text-foreground/80 leading-relaxed mb-8">
            Você tem duas opções: continuar entendendo por que não muda, 
            ou começar a fazer as escolhas que criam uma nova realidade.
            <br /><br />
            <span className="text-primary font-semibold">
              O Reset Mental 10D é para quem escolheu a segunda opção.
            </span>
          </p>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mystical-card inline-block p-8 mb-8"
          >
            <p className="font-philosopher text-foreground/60 text-sm mb-2">Investimento</p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="font-philosopher text-foreground/40 text-lg line-through">R$ 497</span>
              <span className="font-cinzel text-gradient-gold text-5xl font-bold">R$ 197</span>
            </div>
            <p className="font-philosopher text-primary text-sm mt-2">ou 12x de R$ 19,70</p>
            <div className="mt-4 pt-4 border-t border-primary/20">
              <p className="font-philosopher text-foreground/70 text-sm">
                ✓ Acesso imediato • ✓ 10 dias de conteúdo • ✓ Suporte exclusivo
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              variant="cta" 
              size="xl" 
              className="group text-lg px-12"
              onClick={() => window.open('https://pay.kiwify.com.br/TNXfTZT', '_blank')}
            >
              <span className="relative z-10">QUERO COMEÇAR MEU RESET</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Button>
            
            <p className="font-philosopher text-foreground/50 text-sm mt-4">
              🔒 Compra segura • Garantia de 7 dias
            </p>
          </motion.div>

          {/* Urgency */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 p-4 border border-primary/30 rounded-lg bg-primary/5"
          >
            <p className="font-cinzel text-primary text-sm tracking-wide">
              ⚡ OFERTA ESPECIAL — Preço promocional por tempo limitado
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
