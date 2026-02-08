import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.png";
import AccessibilityReader from "./AccessibilityReader";

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
      role="banner"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-mystical-teal/10 to-background" aria-hidden="true" />
      
      {/* Animated glow orbs */}
      <div className="hero-glow w-[600px] h-[600px] -top-32 -left-32 animate-pulse-slow" aria-hidden="true" />
      <div className="hero-glow w-[400px] h-[400px] top-1/2 right-0 animate-pulse-slow" style={{ animationDelay: '2s' }} aria-hidden="true" />
      
      {/* Decorative symbols */}
      <div className="absolute top-20 left-10 decorative-symbol text-6xl font-cinzel animate-float" aria-hidden="true">✦</div>
      <div className="absolute bottom-20 right-10 decorative-symbol text-8xl font-cinzel animate-float" style={{ animationDelay: '3s' }} aria-hidden="true">☉</div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cdefs%3E%3Cpattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 100 0 L 0 0 0 100' fill='none' stroke='%23D4C4A8' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10 px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.article
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
            id="hero-content"
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
              id="hero-title"
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

            {/* Accessibility Reader Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-6 flex justify-center lg:justify-start"
            >
              <AccessibilityReader 
                contentId="hero-content" 
                label="Ouvir carta"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              role="group"
              aria-label="Ações principais"
            >
              <Button 
                variant="cta" 
                size="xl" 
                className="group"
                onClick={() => window.open('https://pay.kiwify.com.br/TNXfTZT', '_blank')}
                aria-label="Começar agora - Abre página de compra em nova aba"
              >
                <span className="relative z-10">Começar Agora</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true" />
              </Button>
              
              <Button 
                variant="mysticalOutline" 
                size="xl"
                onClick={() => window.open('https://pay.kiwify.com.br/TNXfTZT', '_blank')}
                aria-label="Saiba mais sobre o desafio - Abre página de compra em nova aba"
              >
                Saiba Mais
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-muted-foreground text-sm"
              role="list"
              aria-label="Benefícios do programa"
            >
              <div className="flex items-center gap-2" role="listitem">
                <span className="text-primary" aria-hidden="true">✦</span>
                <span>+2.500 alunos</span>
              </div>
              <div className="flex items-center gap-2" role="listitem">
                <span className="text-primary" aria-hidden="true">✦</span>
                <span>100% Online</span>
              </div>
              <div className="flex items-center gap-2" role="listitem">
                <span className="text-primary" aria-hidden="true">✦</span>
                <span>Acesso Imediato</span>
              </div>
            </motion.div>
          </motion.article>

          {/* Hero Image */}
          <motion.figure
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative hidden lg:block"
            aria-label="Ilustração do programa Reset Mental 10D"
          >
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-2xl blur-2xl" aria-hidden="true" />
              
              <img
                src={heroImage}
                alt="Ilustração representando a transformação pessoal através do Reset Mental - Uma jornada de 10 dias para mudar sua mentalidade"
                className="relative z-10 w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
              />
              
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-2"
                aria-hidden="true"
              >
                <span className="font-cinzel text-primary text-sm tracking-wider">Transformação Real</span>
              </motion.div>
            </div>
          </motion.figure>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
    </section>
  );
};

export default HeroSection;
