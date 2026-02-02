import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import alchemistPortal from "@/assets/alchemist-portal.png";

const painPoints = [
  {
    before: "Você sabe o que fazer, mas não consegue fazer",
    after: "Age com clareza e propósito todos os dias",
  },
  {
    before: "Repete os mesmos padrões há anos",
    after: "Quebra ciclos e cria novos caminhos",
  },
  {
    before: "Sente que está preso em uma versão menor de si",
    after: "Vive alinhado com seu potencial real",
  },
  {
    before: "Procrastina e se sabota constantemente",
    after: "Executa com disciplina natural",
  },
];

const TransformationSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-mystical-teal/5 to-background" />
      
      <div className="container relative z-10 px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-cinzel tracking-[0.3em] text-sm">TRANSFORMAÇÃO</span>
          <h2 className="font-cinzel text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            <span className="text-foreground">Do </span>
            <span className="text-gradient-gold">Caos Mental</span>
            <span className="text-foreground"> à </span>
            <span className="text-gradient-gold">Clareza Absoluta</span>
          </h2>
          <p className="font-philosopher text-lg text-foreground/70 max-w-2xl mx-auto">
            Em 10 dias, você vai reprogramar padrões mentais profundos e criar uma nova 
            fundação para sua realidade.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent rounded-2xl blur-3xl" />
              <img
                src={alchemistPortal}
                alt="Laboratório Alquímico"
                className="relative z-10 w-full rounded-2xl shadow-2xl border border-primary/20"
              />
            </div>
          </motion.div>

          {/* Transformation cards */}
          <div className="space-y-6 order-1 lg:order-2">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="mystical-card p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                    <span className="text-destructive text-xl">✕</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-philosopher text-foreground/60 line-through decoration-destructive/50">
                      {point.before}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center my-3">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                  <span className="mx-3 text-primary text-lg">↓</span>
                  <div className="w-8 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-gold">
                    <span className="text-primary text-xl">✓</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-philosopher text-foreground font-medium">
                      {point.after}
                    </p>
                  </div>
                </div>
              </motion.div>
              ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <Button 
            variant="cta" 
            size="xl" 
            className="group"
            onClick={() => window.open('https://pay.kiwify.com.br/TNXfTZT', '_blank')}
          >
            <span className="relative z-10">QUERO MINHA TRANSFORMAÇÃO</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TransformationSection;
