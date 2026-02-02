import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-primary/20">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Logo/Brand */}
          <div className="mb-6">
            <h3 className="font-cinzel text-gradient-gold text-2xl font-bold">
              RESET MENTAL 10D
            </h3>
            <p className="font-philosopher text-foreground/50 text-sm mt-1">
              Reprogramação Alquímica
            </p>
          </div>

          {/* Links */}
          <div className="flex justify-center gap-8 mb-8 text-sm font-philosopher">
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              Contato
            </a>
          </div>

          {/* Social */}
          <div className="flex justify-center gap-4 mb-8">
            <a href="#" className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/60 transition-all">
              <span className="text-lg">📷</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/60 transition-all">
              <span className="text-lg">📱</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/60 transition-all">
              <span className="text-lg">✉️</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-primary/10">
            <p className="font-philosopher text-foreground/40 text-sm">
              © {new Date().getFullYear()} Reset Mental 10D. Todos os direitos reservados.
            </p>
            <p className="font-philosopher text-foreground/30 text-xs mt-2">
              Este produto não garante a obtenção de resultados. Qualquer referência ao desempenho 
              de uma estratégia não deve ser interpretada como uma garantia de resultados.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
