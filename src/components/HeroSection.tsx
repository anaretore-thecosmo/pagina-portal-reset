import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-mystical-teal/10 to-background" />
      
      {/* Animated glow orbs */}
      <div className="hero-glow w-[600px] h-[600px] -top-32 -left-32 animate-pulse-slow" />
      <div className="hero-glow w-[400px] h-[400px] top-1/2 right-0 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      {/* Decorative symbols */}
      <div className="absolute top-20 left-10 decorative-symbol text-6xl font-cinzel animate-float">✦</div>
      <div className="absolute bottom-20 right-10 decorative-symbol text-8xl font-cinzel animate-float" style={{ animationDelay: '3s' }}>☉</div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cdefs%3E%3Cpattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 100 0 L 0 0 0 100' fill='none' stroke='%23D4C4A8' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10 px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary font-cinzel tracking-[0.3em] text-sm mb-4"
            >
              DESAFIO • 10 DIAS
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              <span className="text-gradient-gold">A verdade não transforma</span>
              <br />
              <span className="text-foreground">Sua escolha sim</span>
              <br />
              <span className="text-gradient-gold">Sustente a coerência</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-philosopher text-lg md:text-xl text-foreground/80 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              A maioria prefere explicações a transformações porque explicar não exige mudança. 
              A vida só responde quando você escolhe sustentar a verdade mesmo no desconforto.
              <br /><br />
              <span className="text-primary font-medium">
                Saia da teoria e viva a coerência silenciosa que realmente gera resultados.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button variant="cta" size="xl" className="group">
                <span className="relative z-10">Começar Agora</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
              
              <Button variant="mysticalOutline" size="xl">
                Saiba Mais
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-muted-foreground text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-primary">✦</span>
                <span>+2.500 alunos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✦</span>
                <span>100% Online</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✦</span>
                <span>Acesso Imediato</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-2xl blur-2xl" />
              
              <img
                src={heroImage}
                alt="Transformação Real - Reset Mental"
                className="relative z-10 w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
              />
              
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-2"
              >
                <span className="font-cinzel text-primary text-sm tracking-wider">Transformação Real</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
