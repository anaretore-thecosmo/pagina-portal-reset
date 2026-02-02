import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Marina S.",
    role: "Empresária",
    content: "Em 10 dias, consegui quebrar padrões que me limitavam há mais de 15 anos. O método é cirúrgico.",
    rating: 5,
  },
  {
    name: "Carlos R.",
    role: "Executivo",
    content: "Nunca pensei que seria possível mudar minha relação com a procrastinação. Hoje executo com clareza.",
    rating: 5,
  },
  {
    name: "Patrícia L.",
    role: "Terapeuta",
    content: "Como profissional da área, reconheço a profundidade do trabalho. Revolucionou minha prática pessoal.",
    rating: 5,
  },
  {
    name: "Roberto M.",
    role: "Atleta",
    content: "O Reset Mental me deu o edge mental que faltava. Minha performance mudou completamente.",
    rating: 5,
  },
  {
    name: "Ana Paula F.",
    role: "Advogada",
    content: "Saí da teoria e entrei na ação. Finalmente entendi o que significa viver com coerência.",
    rating: 5,
  },
  {
    name: "Thiago B.",
    role: "Empreendedor",
    content: "Os 10 dias mais transformadores da minha vida. Recomendo para quem quer mudança real.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="container relative z-10 px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-cinzel tracking-[0.3em] text-sm">DEPOIMENTOS</span>
          <h2 className="font-cinzel text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            <span className="text-foreground">Quem Viveu a </span>
            <span className="text-gradient-gold">Transformação</span>
          </h2>
          <p className="font-philosopher text-lg text-foreground/70 max-w-2xl mx-auto">
            Histórias reais de pessoas que decidiram sustentar a verdade e colheram os resultados.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mystical-card p-6 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-primary text-lg">★</span>
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="font-crimson text-foreground/90 italic text-lg leading-relaxed flex-1 mb-6">
                "{testimonial.content}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-primary/20">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                  <span className="font-cinzel text-primary font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-cinzel text-foreground font-semibold text-sm">{testimonial.name}</p>
                  <p className="font-philosopher text-foreground/60 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
