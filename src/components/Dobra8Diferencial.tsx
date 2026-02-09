import { motion } from "framer-motion";
import { Brain, Sparkles, Layout, PlayCircle } from "lucide-react";
import AccessibilityReader from "@/components/AccessibilityReader";

const episodes = [
  "Destravando Seus Relacionamentos",
  "Destravando a Conexão com o Corpo",
  "Destravando Seu Propósito",
  "Destravando a Conexão com o Dinheiro",
  "Destravando a Lei da Atração",
  "Destravando o Poder das Palavras",
  "Destravando Sua Espiritualidade",
];

const Dobra8Diferencial = () => {
  return (
    <section
      className="relative py-24 bg-card"
      role="region"
      aria-labelledby="dobra8-title"
    >
      <div className="container relative z-10 px-4">
        <motion.article
          id="dobra8-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-[680px] mx-auto"
        >
          {/* 3 seconds phrase */}
          <motion.h2
            id="dobra8-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold mb-10 leading-tight tracking-tight"
          >
            <span className="text-editorial-black">VOCÊ NÃO ENTRA SOZINHA.</span>
            <br />
            <span className="text-editorial-gold">VOCÊ ENTRA COM SUPORTE.</span>
          </motion.h2>

          {/* 10 seconds - deliverables */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="font-inter text-lg text-foreground/80 leading-relaxed mb-10"
          >
            Dentro do Portal Reset, você acessa:
          </motion.p>

          {/* AYRA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-start gap-4 mb-8"
          >
            <Brain className="w-5 h-5 text-primary mt-1 shrink-0" strokeWidth={1.5} />
            <div>
              <h3 className="font-playfair font-bold text-foreground mb-1">AYRA</h3>
              <p className="font-inter text-foreground/70">
                Clareza mental — corta ruído, questiona padrões, transforma insight em próxima ação.
              </p>
            </div>
          </motion.div>

          {/* CLÉO */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex items-start gap-4 mb-8"
          >
            <Sparkles className="w-5 h-5 text-primary mt-1 shrink-0" strokeWidth={1.5} />
            <div>
              <h3 className="font-playfair font-bold text-foreground mb-1">CLÉO</h3>
              <p className="font-inter text-foreground/70">
                Presença e magnetismo — sustenta identidade, dignidade e poder feminino sem pedir licença.
              </p>
            </div>
          </motion.div>

          {/* NOTION */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="flex items-start gap-4 mb-10"
          >
            <Layout className="w-5 h-5 text-primary mt-1 shrink-0" strokeWidth={1.5} />
            <div>
              <h3 className="font-playfair font-bold text-foreground mb-1">NOTION INTEGRADO</h3>
              <p className="font-inter text-foreground/70">
                Organização externa para reduzir sobrecarga interna.
              </p>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="editorial-divider mb-10" aria-hidden="true" />

          {/* SÉRIE */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-start gap-4 mb-6">
              <PlayCircle className="w-5 h-5 text-primary mt-1 shrink-0" strokeWidth={1.5} />
              <div>
                <h3 className="font-playfair font-bold text-foreground mb-1">DESTRAVANDO OS CADEADOS DA MENTE</h3>
                <p className="font-inter text-foreground/70 text-sm">7 episódios de apoio</p>
              </div>
            </div>
            <ol className="space-y-2 pl-9" role="list" aria-label="Episódios da série">
              {episodes.map((ep, i) => (
                <li key={i} className="font-inter text-sm text-foreground/60">
                  <span className="text-muted-foreground mr-2">{String(i + 1).padStart(2, '0')}</span>
                  {ep}
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Accessibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="mt-10"
          >
            <AccessibilityReader contentId="dobra8-content" label="Ouvir esta seção" />
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default Dobra8Diferencial;
