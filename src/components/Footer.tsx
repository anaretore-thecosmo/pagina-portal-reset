import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-foreground/10">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Brand */}
          <div className="mb-6">
            <h3 className="font-playfair text-xl font-bold text-foreground tracking-tight">
              O PORTAL RESET
            </h3>
            <p className="font-inter text-muted-foreground text-sm mt-1">
              Espaço de Consciência e Escolha
            </p>
          </div>

          {/* Links */}
          <div className="flex justify-center gap-8 mb-8 text-sm font-inter">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Contato
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-foreground/5">
            <p className="font-inter text-muted-foreground text-sm">
              © {new Date().getFullYear()} O Portal Reset. Todos os direitos reservados.
            </p>
            <p className="font-inter text-muted-foreground/70 text-xs mt-2 max-w-lg mx-auto">
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
