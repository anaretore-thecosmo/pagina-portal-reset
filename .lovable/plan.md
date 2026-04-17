
## Plano: Espelhar a Primeira Dobra do Hero

### Objetivo
Inverter a composição visual do hero da landing page (`src/pages/LandingPage.tsx`):
- **Imagem da mulher**: posicionada do lado **esquerdo**, olhando para a **direita** (em direção ao texto).
- **Bloco de texto + CTA**: alinhado à **direita**.

Isso aproveita o princípio de neuromarketing dos **neurônios-espelho**: o olhar da mulher na imagem direciona naturalmente o olhar da leitora para a copy e o CTA.

---

### Mudanças em `src/pages/LandingPage.tsx`

**1. Componente `HeroBg` — inverter a posição da imagem**
- Trocar `backgroundPosition: "65% center"` → `"35% center"` (move o foco da imagem para a esquerda).
- Inverter o gradiente de overlay para escurecer o lado **direito** (onde ficará o texto), deixando a imagem da mulher visível à esquerda:
  - De: `linear-gradient(105deg, rgba(8,9,13,0.96) 0%, ... transparent 100%)`
  - Para: `linear-gradient(255deg, rgba(8,9,13,0.96) 0%, rgba(8,9,13,0.90) 30%, rgba(8,9,13,0.72) 48%, rgba(8,9,13,0.28) 65%, rgba(8,9,13,0.06) 80%, transparent 100%)`
  - (Inverte o ângulo de 105deg para 255deg = espelha o gradiente.)

**2. Container do conteúdo do hero — alinhar à direita**
- Wrapper externo: adicionar `flex justify-end` para empurrar o bloco para a direita.
- Bloco interno (`maxWidth: "480px"`): mantém a largura, agora ancorado à direita.

**3. Verificar imagens do Cloudinary**
- As duas imagens atuais já têm rostos/corpos voltados para a direita ou centro. Se após inversão a mulher ficar olhando "para fora" (esquerda), avaliar:
  - **Opção A**: Aplicar `transform: scaleX(-1)` no div da imagem para espelhar (rosto passa a olhar para a direita, em direção ao texto).
  - **Opção B**: Manter sem espelhar se a composição já funcionar.
- Recomendo **Opção A** (espelhar via CSS) — garante o efeito desejado dos neurônios-espelho sem trocar assets.

**4. Mobile (responsivo)**
- No mobile (< 768px), o texto ocupa a largura total e a imagem fica ao fundo. O `justify-end` no flex se mantém, mas o `maxWidth: 480px` em viewport pequena ocupa quase tudo — funciona naturalmente.
- Ajustar gradiente mobile se necessário para garantir legibilidade do texto sobre o fundo.

**5. Cliff effect (seta de scroll)**
- Atualmente alinhada à esquerda (`items-start`). Trocar para `items-end` para alinhar com o novo bloco de texto à direita.

---

### Arquivos editados
- `src/pages/LandingPage.tsx` (apenas)

### Considerações
- **Sem breaking changes** — apenas reposicionamento visual.
- **Mantém todas as animações**, copy, CTA e trust signals já implementados.
- **Mantém o gradiente oficial** dos botões (ouro-âmbar-terracota).
- **Coerente com The Cosmo**: inversão é estética/estratégica, não muda tom nem mensagem.

### Observação sobre a Fase 1 do plano original
O usuário mencionou "Implemente a Fase 1 do plano" junto desta solicitação. Como a mensagem principal pede um **plano de ação** para espelhar a dobra (read-only), vou focar nesse plano. A implementação da Fase 1 (CTA sticky + analytics) já estava parcialmente coberta em iterações anteriores e pode ser revisitada após esta mudança visual ser aprovada e aplicada.
