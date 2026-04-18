

## Plano: A/B/C test do Hero — 3 variantes de copy

### Objetivo
Medir qual nível de consciência (Schwartz) converte melhor `landing_view → cta_click_hero → quiz_start`, mantendo a mesma leitora sempre na mesma variante.

### As 3 variantes

| ID | Nível | Headline (H1) | Subhead |
|----|-------|---------------|---------|
| **A** | Solução-aware | "Você sabe que tem um padrão. Agora veja qual é." | "Em 3 minutos, o mapa de 6 eixos do que sustenta — e do que drena." |
| **B** | Sintoma-aware (atual) | "Você começa, para, recomeça. *E ainda não sabe por quê.*" | "Em 3 minutos, o nome do padrão que decide por você — em corpo, dinheiro e relações." |
| **C** | Resultado-aware | "O nome do padrão que decide por você." | "Em 3 minutos, o mapa que separa o que é seu do que é repetição." |

Kicker, CTA, trust line, imagem e gradiente permanecem **idênticos** — só H1 + subhead variam.

### Mecânica técnica

1. **`src/lib/abTest.ts` (novo)** — `getOrAssignVariant()` lê de `localStorage["ab_hero"]`; se vazio, sorteia 33/33/34 e persiste. SSR-safe. Suporta override por query param `?ab_hero=A|B|C` (QA).
2. **`LandingPage.tsx`** — `useEffect` para set inicial, mapa `HERO_COPY[variant]`, render condicional só do H1+subhead. `track("landing_view", { hero_variant })` no mount, `track("cta_click_hero", { hero_variant })` no clique.
3. **`QuizMapaPadraoPage.tsx`** — anexa `hero_variant` em `quiz_start` lendo a flag persistida. Fecha o CTR de fato.
4. **Analytics** — todos os eventos do funil ganham campo `hero_variant`. No dataLayer permite filtrar funil completo por variante no GA4/GTM.

### O que NÃO muda
- Identidade visual, gradientes, fontes, tom The Cosmo
- Layout do hero (5 elementos, gradient 60/40, MiniMandala, CTA "MAPEAR MEU PADRÃO")
- Sem urgência, sem dark patterns

### Validação
- Console dev: `[ab] hero variant: B (stored)` ou `(assigned)`
- Eventos sempre incluem `hero_variant`
- `?ab_hero=C` força variante
- Mesmo browser → mesma variante (persistência)

### Arquivos
- 🆕 `src/lib/abTest.ts`
- ✏️ `src/pages/LandingPage.tsx`
- ✏️ `src/pages/QuizMapaPadraoPage.tsx`

Sem dependências novas. Sem mudanças visuais. ~80 linhas líquidas.

