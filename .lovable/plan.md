

## Curadoria Estratégica — Conselho de Mestres para o Portal Reset

Reuni um painel imaginário de 8 referências, cada uma olhando uma camada específica da página. Antes do plano, mapeei o que cada um veria, depois consolidei em ações concretas e priorizadas.

---

### O que cada mestre observou

**Bill Gates — eficiência sistêmica e dados**
- Não há instrumentação de funil. Hoje você não sabe onde a leitora desiste: hero, quiz, lead gate ou checkout.
- Falta um dashboard mínimo de métricas (view → start → complete → lead → checkout).

**Steve Jobs — redução radical e foco**
- O hero tem 8 elementos competindo: kicker, linha ouro, H1 (duas frases longas), subhead de 3 linhas, card de 3 entregas, CTA, trust line, cliff effect. Excessivo.
- A promessa precisa caber em uma respiração: uma frase, um botão, uma prova.

**Tim Brown (IDEO) — design thinking e jornada**
- A jornada emocional não tem mapa explícito: dor → reconhecimento → esperança → ação. O hero pula direto para "diagnóstico" sem ancorar a dor primeiro.
- Falta um momento de empatia visível antes do CTA.

**Charles Sanders Peirce — semiótica (signo, objeto, interpretante)**
- A imagem da mulher (signo) precisa ser lida instantaneamente como "essa sou eu" (interpretante). Hoje o gradient escuro consome o rosto e quebra a identificação.
- O ouro (#C8B870) está usado em excesso → vira ruído, deixa de ser símbolo de raridade.

**Darren Bridger — neuromarketing aplicado**
- Princípio da fluência cognitiva: quanto mais fácil de processar, mais verdadeiro parece. As frases do H1 têm 18+ palavras — alta carga.
- Falta ancoragem de preço/valor visível antes do quiz (a leitora não sabe o que está sendo oferecido depois).

**David Ogilvy — copywriting clássico**
- Headline atual descreve um problema interno em terceira pessoa filosófica. Ogilvy diria: prometa um benefício específico e mensurável OU faça uma pergunta que a leitora só pode responder fazendo o quiz.
- A subhead repete a headline em vez de adicionar prova/specificity.

**Eugene Schwartz — níveis de consciência (Breakthrough Advertising)**
- A copy atual presume nível 4-5 (sabe que tem um padrão e que existe diagnóstico). Tráfego frio do Instagram chega em nível 2-3 (sente o sintoma, não nomeia a causa).
- Falta uma versão da headline para "problema-aware" que descreva o sintoma em vez do diagnóstico.

**Hugo Veiga (AKQA) — direção criativa contemporânea**
- A página é bonita mas estática. Falta um gesto criativo memorável — algo que vire screenshot/conversa (ex: um momento interativo de respiração, uma frase que reage ao scroll, uma transição inesquecível).
- O midpage CTA é genérico — desperdício de um espaço de ouro.

---

### Plano de Ação — 4 Ondas Priorizadas

**ONDA 1 — Fundação invisível (faça primeiro, baixo risco)**
1. Instrumentar analytics em todo o funil: `landing_view`, `cta_click_hero`, `cta_click_midpage`, `quiz_start`, `quiz_q{n}_answered`, `quiz_complete`, `lead_gate_view/submit/skip`, `result_view`, `checkout_click`. Persistir em `dataLayer` + endpoint Supabase simples.
2. Adicionar `aria-labels` e `<noscript>` fallback no hero para SEO/acessibilidade real.
3. Implementar `prefers-reduced-motion` nos crossfades e parallax.

**ONDA 2 — Hero cirúrgico (Jobs + Ogilvy + Schwartz)**
4. Reescrever o hero em 3 versões A/B/C de copy para níveis de consciência diferentes:
   - A (atual, problema-solução-aware)
   - B (sintoma-aware): "Você começa, para, recomeça. E ainda não sabe por quê."
   - C (resultado-aware): "Em 3 minutos, o nome do padrão que decide por você."
5. Reduzir hero a 5 elementos: kicker · H1 (1 frase, ≤12 palavras) · subhead (1 frase) · CTA · trust line. Remover o card de 3 entregas do hero — mover para uma seção dedicada logo abaixo.
6. Aumentar contraste do gradient sobre a imagem em até 60% da largura, deixando o rosto da mulher visível e iluminado nos 40% restantes (Peirce: o signo precisa ser lido).
7. Trocar o midpage CTA genérico por um **bloco de prova social/autoral** (Ana + linha sobre The Cosmo) ou um trecho real do diagnóstico anonimizado.

**ONDA 3 — Jornada emocional (Brown + Bridger)**
8. Inserir uma seção curta logo após o hero ancorando a dor em 3 frases curtas estilo "você se reconhece?" — antes de oferecer a solução. Essa seção já existe parcialmente em `LandingSharedSections` (dores) — promover para mais cedo no scroll.
9. Adicionar uma "barra de progresso emocional" sutil no quiz (não percentual frio, mas marcadores poéticos: "respira... metade do mapa... quase lá").
10. Pré-revelação no lead gate: mostrar o nome do arquétipo borrado/parcial ANTES do form ("Seu padrão é ▓▓▓▓▓▓▓▓ — para revelar, deixe seu nome"). Aumenta motivação para completar.

**ONDA 4 — Gesto memorável (Veiga)**
11. Criar UM momento interativo único — escolha entre:
    - **Respiração guiada** de 4 segundos antes de iniciar o quiz (círculo que expande/contrai com áudio opcional). Sinaliza "isso não é mais um quiz de Instagram".
    - **Mandala viva no hero**: mini-mandala animada que pulsa suavemente, prévia visual do que ela vai receber.
    - **Frase que se completa no scroll**: H1 começa "Você não fracassa por falta de potência." e ao rolar, a segunda linha se monta letra por letra.
12. Compartilhamento do resultado refinado: card de IG já existe, mas adicionar variação "story 9:16" com mandala animada exportável como vídeo curto (3s loop).

---

### Priorização recomendada (ordem de execução)

```text
Semana 1: Onda 1 (analytics + acessibilidade)        ← invisível, destrava tudo
Semana 2: Onda 2 itens 4-6 (hero cirúrgico)          ← maior impacto em conversão
Semana 3: Onda 3 itens 8-10 (jornada + lead gate)    ← reduz drop-off
Semana 4: Onda 4 (gesto memorável)                   ← diferenciação de marca
```

### Métricas de sucesso

- **Hero → Quiz start**: hoje desconhecido → meta ≥35%
- **Quiz start → complete**: meta ≥70%
- **Lead gate submit (não skip)**: meta ≥55%
- **Result → Checkout click**: meta ≥18%
- **Tempo médio na landing antes do CTA**: 25-45s (sweet spot de leitura sem fadiga)

### O que NÃO mudar (preservação coerente com The Cosmo)

- Paleta, tipografia, gradient oficial, dark theme fixo.
- Tom austero, ausência de emojis/exclamações.
- Ausência de urgência artificial e contadores.
- Estrutura de 12 perguntas + 3 respiros do quiz.
- Link Kiwify e preço R$47/mês.

### Próximo passo sugerido

Aprovar este plano e escolher por **qual onda começar** — recomendo Onda 1 (analytics) imediatamente porque ela destrava decisões baseadas em dado real para todas as ondas seguintes. Se preferir impacto visual rápido, começar pela Onda 2.

