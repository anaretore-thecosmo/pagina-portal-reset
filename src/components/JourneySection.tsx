import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import crystalGrimoire from "@/assets/crystal-grimoire.png";

const days = [
  { day: 1, title: "O Despertar", description: "Reconheça os padrões que te mantém preso" },
  { day: 2, title: "A Quebra", description: "Desmonte crenças limitantes na raiz" },
  { day: 3, title: "O Vazio", description: "Aprenda a sustentar o desconforto da mudança" },
  { day: 4, title: "A Semente", description: "Plante novas frequências mentais" },
  { day: 5, title: "O Cultivo", description: "Fortaleça os novos padrões diariamente" },
  { day: 6, title: "A Prova", description: "Teste sua nova identidade na prática" },
  { day: 7, title: "A Integração", description: "Una mente, corpo e propósito" },
  { day: 8, title: "A Expansão", description: "Amplifique sua nova frequência" },
  { day: 9, title: "A Consolidação", description: "Torne a transformação irreversível" },
  { day: 10, title: "O Reset Completo", description: "Renasça como sua versão mais elevada" },
];

const JourneySection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
      
      <div className="container relative z-10 px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-cinzel tracking-[0.3em] text-sm">A JORNADA</span>
          <h2 className="font-cinzel text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            <span className="text-gradient-gold">10 Dias</span>
            <span className="text-foreground"> de Reprogramação Alquímica</span>
          </h2>
          <p className="font-philosopher text-lg text-foreground/70 max-w-2xl mx-auto">
            Cada dia foi desenhado para desmontar uma camada do velho você e construir 
            a fundação do novo.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Days grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {days.map((item, index) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="mystical-card p-5 group hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:glow-gold transition-all duration-300">
                    <span className="font-cinzel text-primary font-bold text-sm">{item.day}</span>
                  </div>
                  <div>
                    <h3 className="font-cinzel text-foreground font-semibold text-sm group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-philosopher text-foreground/60 text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative sticky top-24"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-radial from-accent/10 to-transparent rounded-2xl blur-3xl" />
              <img
                src={crystalGrimoire}
                alt="Grimório com Cristal"
                className="relative z-10 w-full rounded-2xl shadow-2xl border border-primary/20"
              />
              
              {/* Floating info card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-card/95 backdrop-blur-sm border border-primary/30 rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-gold">
                    <span className="text-2xl">🔮</span>
                  </div>
                  <div>
                    <p className="font-cinzel text-primary text-sm font-semibold">Método Exclusivo</p>
                    <p className="font-philosopher text-foreground/70 text-xs">Reprogramação Alquímica</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
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
            <span className="relative z-10">COMEÇAR MEUS 10 DIAS</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneySection;
