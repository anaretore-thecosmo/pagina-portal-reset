
# Plano de Remodelação: O PORTAL RESET

## Visão Geral

Transformação completa da landing page do "Reset Mental 10D" para o novo produto "O PORTAL RESET" - um espaço feminino de consciência com modelo de assinatura recorrente.

---

## Estrutura Atual vs Nova

| Atual (5 seções) | Nova (12 dobras) |
|------------------|------------------|
| HeroSection | Dobra 1 - Interrupção Total |
| TransformationSection | Dobra 2 - Identificação |
| JourneySection | Dobra 3 - Causa Invisível |
| TestimonialsSection | Dobra 4 - O que não funciona |
| CTASection | Dobra 5 - Nova Perspectiva |
| Footer | Dobra 6 - O Produto |
| - | Dobra 7 - Como Funciona |
| - | Dobra 8 - Diferencial (Recorrência) |
| - | Dobra 9 - Origem |
| - | Dobra 10 - Para quem é |
| - | Dobra 11 - Transformação |
| - | Dobra 12 - CTA Final + Footer |

---

## Componentes a Criar/Modificar

### 1. Index.tsx - Reorganizar estrutura

```text
<main>
  <Dobra1InterrupcaoTotal />   // Hero - frase de impacto
  <Dobra2Identificacao />       // Você não está perdida
  <Dobra3CausaInvisivel />      // Neurociência + tradição
  <Dobra4OQueNaoFunciona />     // Insight sem sustentação
  <Dobra5NovaPerspectiva />     // Consciência é treino
  <Dobra6OProduto />            // O que é o Portal Reset
  <Dobra7ComoFunciona />        // Lista de entregáveis
  <Dobra8Diferencial />         // Recorrência sustenta
  <Dobra9Origem />              // História pessoal
  <Dobra10ParaQuemE />          // Qualificação
  <Dobra11Transformacao />      // Mudança de lugar interno
  <Dobra12CTA />                // Preço + botão final
  <Footer />                    // Atualizado para Portal Reset
</main>
```

### 2. Novos Componentes

| Arquivo | Descrição |
|---------|-----------|
| `Dobra1InterrupcaoTotal.tsx` | Hero com frase 3s + texto 10s |
| `Dobra2Identificacao.tsx` | Identificação do problema |
| `Dobra3CausaInvisivel.tsx` | Neurociência + tradição |
| `Dobra4OQueNaoFunciona.tsx` | Por que insight não basta |
| `Dobra5NovaPerspectiva.tsx` | Consciência como treino |
| `Dobra6OProduto.tsx` | Apresentação do Portal |
| `Dobra7ComoFunciona.tsx` | Entregáveis e estrutura |
| `Dobra8Diferencial.tsx` | Recorrência como diferencial |
| `Dobra9Origem.tsx` | História de criação |
| `Dobra10ParaQuemE.tsx` | Qualificação do público |
| `Dobra11Transformacao.tsx` | Mudança do lugar interno |
| `Dobra12CTA.tsx` | Preço R$47/mês + CTA |

---

## Padrão Visual de Cada Dobra

Todas as dobras seguem a estrutura 3|10:

```text
+------------------------------------------+
|  [Frase de 3 segundos]                   |
|  Título grande, impactante               |
|  font-cinzel, text-gradient-gold         |
|                                          |
|  [Texto de 10 segundos]                  |
|  Parágrafos curtos, espaçados            |
|  font-philosopher, text-foreground/80    |
|                                          |
|  [Citação destacada]                     |
|  Itálico, borda dourada à esquerda       |
+------------------------------------------+
```

---

## Detalhes Técnicos por Dobra

### Dobra 1 - Interrupção Total (Hero)
- Frase 3s: "A verdade não transforma. A escolha, sim."
- Texto 10s: "Você não precisa de mais informação..."
- Citação: "Sem consciência, a vontade não cria. Apenas repete."
- Visual: Fundo escuro, glow dourado sutil, sem imagem lateral
- Manter: Botão CTA + Acessibilidade (text-to-speech)

### Dobra 2 - Identificação
- Frase 3s: "Você não está perdida. Está reagindo."
- Texto 10s: Ciclo pensamento → emoção → escolha → repetição
- Citação: "A ilusão mais eficiente é confundir hábito com decisão."
- Visual: Diagrama sutil do ciclo mental (opcional)

### Dobra 3 - Causa Invisível
- Frase 3s: "O problema não é falta de disciplina."
- Texto 10s: Neurociência + tradições antigas
- Citação: "Pensamentos não escolhidos governam vidas inteiras."
- Visual: Imagem de fundo sutil (brain ou alchemist)

### Dobra 4 - O Que Não Funciona
- Frase 3s: "Entender não muda comportamento."
- Texto 10s: Insight sem sustentação = frustração
- Citação: "A consciência costuma apenas justificar o que já aconteceu."

### Dobra 5 - Nova Perspectiva
- Frase 3s: "Consciência não é conceito. É treino."
- Texto 10s: Perceber antes de reagir
- Citação: "Liberdade não é fazer o que se quer, mas perceber por que se quer."
- Visual: Transição visual mais luminosa

### Dobra 6 - O Produto
- Frase 3s: "O PORTAL RESET é um espaço. Não um aplicativo para usar."
- Texto 10s: Espaço feminino de consciência
- Visual: Card destacado com o nome do produto

### Dobra 7 - Como Funciona
- Frase 3s: "Simples. Aplicável. Habitável."
- Lista de entregáveis:
  - Protocolo inicial RESET MENTAL 10D
  - Práticas diárias de 2 a 5 minutos
  - Exercícios de clareza e presença
  - Rituais de reorganização mental
  - Acesso contínuo ao ambiente

### Dobra 8 - Diferencial
- Frase 3s: "O protocolo inicia. O PORTAL sustenta."
- Texto 10s: Recorrência como sustentação
- Lista de benefícios: reorganizar, voltar para si, sustentar decisões

### Dobra 9 - Origem
- Frase 3s: "Isso nasceu de uma necessidade real."
- Texto 10s: História pessoal da criadora
- Visual: Mais intimista, talvez citação em destaque

### Dobra 10 - Para Quem É
- Frase 3s: "Isso não é para todo mundo."
- Lista de qualificação:
  - Quem cansou de reagir
  - Quem sabe que clareza é base
  - Quem prefere consistência a promessa
- Anti-qualificação: Não é para quem quer fórmula rápida

### Dobra 11 - Transformação
- Frase 3s: "Você muda o lugar de onde opera."
- Texto 10s: Clareza → decisões → realidade
- Visual: Transição visual, mais brilho

### Dobra 12 - CTA Final
- Frase 3s: "Entre no PORTAL RESET."
- Preço: **R$ 47 por mês** (não mais R$ 197 único)
- Inclui: Protocolo RESET MENTAL 10D
- Garantia: 30 dias
- Botão: "ENTRAR NO PORTAL RESET"
- Subtexto: "Um espaço para sustentar clareza no dia a dia."

---

## Atualizações no Footer

- Trocar "RESET MENTAL 10D" por "O PORTAL RESET"
- Atualizar subtítulo para "Espaço de Consciência e Escolha"
- Copyright atualizado

---

## Recursos Visuais

| Imagem existente | Uso sugerido |
|------------------|--------------|
| alchemist-portal.png | Dobra 6 ou 8 (fundo sutil) |
| alchemist-scroll.png | Dobra 9 (origem) |
| crystal-grimoire.png | Dobra 7 (como funciona) |
| banner-brain.webp | Dobra 3 (neurociência) |
| hero-image.png | Dobra 1 (se mantiver imagem) |
| golden-magic.png | Dobra 11 (transformação) |

---

## Alteração de Link de Pagamento

O link de pagamento deverá ser atualizado quando você fornecer o novo link (atualmente `https://pay.kiwify.com.br/TNXfTZT`).

---

## Acessibilidade

- Manter o componente `AccessibilityReader` existente
- Aplicar em cada dobra com ID único para leitura
- Manter HTML semântico e ARIA labels

---

## Ordem de Execução

1. Criar os 12 novos componentes de dobra
2. Atualizar Index.tsx com a nova estrutura
3. Atualizar Footer.tsx com novo branding
4. Remover componentes antigos não utilizados
5. Ajustar links de pagamento
6. Testar acessibilidade em todas as dobras

---

## Resumo das Mudanças

| Item | Antes | Depois |
|------|-------|--------|
| Produto | Reset Mental 10D | O PORTAL RESET |
| Modelo | Pagamento único R$197 | Assinatura R$47/mês |
| Garantia | 7 dias | 30 dias |
| Seções | 5 | 12 dobras |
| Público | Geral | Feminino |
| Estrutura | Variada | 3s + 10s em cada dobra |
