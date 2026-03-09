# CLAUDE.md — Página de Vendas Portal Reset

> Leia este arquivo inteiro antes de qualquer modificação no projeto.
> Ele existe para preservar contexto entre sessões e garantir coerência filosófica, técnica e estratégica.

---

## 1. O QUE É ESTE PROJETO

Página de vendas + funil completo do **Portal Reset** — app de recorrência feminina para transformação de corpo, dinheiro e relações.

- **Site ao vivo:** https://portalresetdigital.com
- **GitHub:** https://github.com/anaretore-thecosmo/pagina-portal-reset
- **Hospedagem:** Lovable (sincroniza automaticamente com push no GitHub)
- **App do produto:** https://portal-reset.web.app

---

## 2. STACK

```
React 19 + TypeScript + Vite
Framer Motion (animações)
Shadcn UI + Radix UI + Tailwind CSS
react-router-dom (roteamento SPA)
Recharts (gráficos — mandala radar)
Fontes: Playfair Display (serif) + Inter (sans)
```

---

## 3. IDENTIDADE VISUAL — NUNCA ALTERAR SEM APROVAÇÃO

```
Fundo:        #08090D  (quase preto)
Foreground:   #EDE6DB  (off-white quente)
Ouro fosco:   #C8B870  (principal accent)
Ouro escuro:  #b88a3a  (gradient secundário)
Terracota:    #983D06  (gradient CTA)
Grafite:      #1E1E1C

Gradiente CTA: linear-gradient(135deg, #C8B870 0%, #b88a3a 50%, #983D06 100%)
```

**Fontes:**
- Headlines: `Playfair Display`, font-weight 700, uppercase
- Corpo: `Inter`, font-weight 400/500
- Kickers: Inter uppercase, letter-spacing 0.4-0.45em, 10px

**Tom:** elegante, austero, feminino sem ser cor-de-rosa. Sem emojis. Sem exclamações. Linguagem direta e poética.

---

## 4. FILOSOFIA — THE COSMO

**TUDO neste projeto passa pelo filtro The Cosmo:**
- Sem manipulação, urgência artificial, gatilhos de medo
- MKT vibracional: consciente, coerente, de frequência
- Os 4 princípios: Consciência acima da mente · Frequência acima da forma · Criação acima de performance · Verdade acima de validação

**Linguagem proibida:** "Oferta por tempo limitado", "Últimas vagas", "Não fique de fora", "Transforme sua vida em X dias" (promessa vaga)

**Linguagem certa:** específica, honesta, que nomeia a dor real antes de apresentar a solução.

---

## 5. FLUXO DO FUNIL (ordem das rotas)

```
/ → LandingPage         (aquecimento — tráfego frio)
    ↓
/quiz-mapa-do-padrao → QuizMapaPadraoPage   (IntroScreen → 24 perguntas + 3 respiros)
    ↓
/espelho-da-clareza → EspelhoDaClarezaPage  (transição, passa scores para o resultado)
    ↓
DiagnosticoResult (dentro de EspelhoDaClarezaPage)   (resultado completo por arquétipo)
    ↓
https://pay.kiwify.com.br/ns0fjIx            (checkout — R$47/mês)
```

---

## 6. ARQUIVOS-CHAVE

| Arquivo | O que faz |
|---|---|
| `src/pages/LandingPage.tsx` | Landing de aquecimento — hero com imagens em crossfade, seção de dores, entregas, CTA |
| `src/pages/QuizMapaPadraoPage.tsx` | IntroScreen + QuestionScreen + RespiroScreen do quiz |
| `src/pages/EspelhoDaClarezaPage.tsx` | Página de transição — recebe scores via state e renderiza DiagnosticoResult |
| `src/components/diagnostico/DiagnosticoResult.tsx` | Resultado completo: mandala radar + 6 blocos + arquétipo + CTA Kiwify |
| `src/data/espelhoEngine.ts` | Motor: `computeEspelho()`, `getArquetipo()`, `generateEditorialDiagnostic()`, `generate7DayPlan()` |
| `src/data/quizMapaPadrao.ts` | 24 perguntas + 3 respiros (a cada 6 perguntas) |
| `src/App.tsx` | Roteamento SPA completo |

---

## 7. OS 4 ARQUÉTIPOS

O arquétipo é calculado pela função `getArquetipo(score)` em `espelhoEngine.ts`.

| Arquétipo | Score | Cor tema | Ciclo |
|---|---|---|---|
| **Curiosa** | ≤ 3 | Verde sálvia `hsl(150 28% 38%)` | Ciclo Destrava (01, 03, 09) |
| **Buscadora** | ≤ 5 | Terracota `hsl(28 58% 44%)` | Ciclo Recomeço (04, 05, 07) |
| **Estrategista** | ≤ 7 | Azul `hsl(215 38% 42%)` | Ciclo Direção (06, 08, 10) |
| **Soberana** | > 7 | Ouro `hsl(var(--matte-gold))` | Código 10 + Cléo prioridade |

Os 6 eixos medidos: Corpo · Mente · Emoção · Relações · Propósito · Recursos

---

## 8. IMAGENS — CLOUDINARY

Ana tem imagens autorais hospedadas no Cloudinary. Usar sempre via URL com transformações otimizadas.

**Imagens em uso no hero:**
```
Imagem 1 (close-up, praial):
https://res.cloudinary.com/dnd2s2dv4/image/upload/f_auto,q_auto,w_1600/v1770421209/erlYw0HUWPflK_zMTmFiM_ijbdeo.avif

Imagem 2 (meditação, montanhas):
https://res.cloudinary.com/dnd2s2dv4/image/upload/f_auto,q_auto,w_1600/v1770420982/AaBCh0x73PbOjcEnfQDXy_ila51x.avif
```

**Cloud name:** `dnd2s2dv4`

**Transformações Cloudinary úteis:**
- `f_auto` → formato ideal para cada browser (WebP/AVIF/JPEG)
- `q_auto` → qualidade automática otimizada
- `w_1600` → largura máxima (hero desktop)
- `w_800` → mobile
- `c_fill,g_face` → crop focado no rosto

---

## 9. PRINCÍPIOS DE NEUROMARKETING APLICADOS

Antes de alterar qualquer layout, considerar:

1. **Priming emocional** — Imagem carrega antes do texto. Nunca esconder imagem atrás de overlay opaco.
2. **F-pattern** — Texto sempre no eixo esquerdo. Imagem respira à direita.
3. **Cliff effect** — Conteúdo da próxima seção aparece cortado na borda inferior → força scroll.
4. **Timing de entrada** — Texto começa a entrar em 550ms+ (depois do cérebro límbico processar a imagem).
5. **Contraste mínimo 4.5:1** — Texto branco/ouro sobre overlay escuro, sempre.
6. **Neurônios-espelho** — Mulheres com olhos fechados/voltados para dentro: leitora projeta a si mesma.

---

## 10. KIWIFY — CHECKOUT

```
URL de checkout: https://pay.kiwify.com.br/ns0fjIx
Produto: Portal Reset recorrência
Preço: R$47/mês
```

Nunca alterar este link sem confirmação da Ana.

---

## 11. COMO DEPLOYAR

O fluxo é sempre:
```bash
git add <arquivos>
git commit -m "feat/fix: descrição"
git push origin main
```

Depois do push, o **Lovable sincroniza automaticamente**. Se não sincronizar, acessar lovable.dev → projeto → Settings → GitHub → Sync. Após sincronizar, clicar em **Publish** para atualizar o site ao vivo.

---

## 12. CONVENÇÕES DE CÓDIGO

- Componentes: PascalCase
- Arquivos de página: `NomePaginaPage.tsx`
- Dados/engine: camelCase em `src/data/`
- Animações Framer Motion: variante `fade` com `custom={i}` para stagger
- CSS: sempre inline style para valores dinâmicos, Tailwind para estrutura/layout
- Nunca usar `!important`
- Mobile-first para breakpoints: `sm:` → `md:` → `lg:`

---

## 13. CONTEXTO THE COSMO (holding)

Portal Reset é um produto dentro do ecossistema **The Cosmo** — holding multissetorial de consciência aplicada fundada por Ana.

**Guardiãs:**
- Ana (visão, frequência, metodologia)
- Simone (jurídico, estrutura)
- Mirella (expressão, expansão)

**Outros produtos do ecossistema:** Cosmo Essence (Plano A), Cosmo Scan, Cosmo Hub, cosmo.agents.

Qualquer copy ou decisão de design deve ser coerente com a frequência do The Cosmo.
