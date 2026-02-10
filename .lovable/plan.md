
# ESPELHO DA CLAREZA — Plano de Implementacao

## Problema atual

Existem **4 arquivos ausentes** que impedem o funcionamento do quiz e do resultado:

1. `src/data/diagnosticoQuestions.ts` — dados das 24 perguntas, labels dos 12 eixos, textos dos respiros
2. `src/components/diagnostico/DiagnosticoIntro.tsx` — tela de entrada do quiz
3. `src/components/diagnostico/DiagnosticoQuestion.tsx` — tela de pergunta individual (escala 1-9)
4. `src/components/diagnostico/DiagnosticoRespiro.tsx` — telas de respiro entre blocos

Alem disso, o `DiagnosticoResult.tsx` usa `font-cormorant` que nao existe no Tailwind config (deve ser `font-playfair`).

## O que ja funciona e sera mantido

- **`espelhoEngine.ts`** — motor de calculo completo (normalizacao, classificacao, editorial, plano 7 dias, CTA params)
- **`DiagnosticoRadarChart.tsx`** — mandala com cores por categoria (cobre top3, carvao bottom3, oliva central)
- **`diagnosticoPdfGenerator.ts`** — PDF de 5 paginas
- **`DiagnosticoPage.tsx`** — fluxo do quiz (intro > pergunta > respiro > resultado)
- **`EspelhoPage.tsx`** — pagina wrapper que recebe dados via Router state
- **`App.tsx`** — rotas /diagnostico e /espelho ja registradas

## Plano de execucao

### 1. Criar `src/data/diagnosticoQuestions.ts`

Conteudo:
- Array `diagnosticoQuestions` com 24 objetos `{ id: "q01"..."q24", text: "..." }` usando exatamente as perguntas fornecidas nos comandos anteriores
- Array `dimensionLabels` com 12 labels internos para os eixos (ex: "Eixo 1", "Eixo 2"... ate "Eixo 12") — nomes neutros, sem mencionar astrologia/chakras/neurociencia
- Array `respiroTexts` com 4 frases ancora dos respiros

### 2. Criar `src/components/diagnostico/DiagnosticoIntro.tsx`

Tela de abertura editorial:
- Titulo: "MAPA DO PADRAO" (font-playfair, grande)
- Subtitulo: "Mapeie seu padrao atual"
- Instrucao: "Responda pensando nos ultimos 30 dias"
- Botao "Comecar" estilo selo editorial (variant="cta")
- Fundo escuro (azul editorial) com texto off-white

### 3. Criar `src/components/diagnostico/DiagnosticoQuestion.tsx`

Uma pergunta por tela:
- Barra de progresso editorial (X de 24)
- Texto da pergunta em font-playfair
- Escala 1-9 com botoes circulares, labels "1 quase nunca" e "9 quase sempre"
- Botoes Voltar e Proxima
- Animacao fade com framer-motion
- Alternancia de fundo claro/escuro por bloco de 6

### 4. Criar `src/components/diagnostico/DiagnosticoRespiro.tsx`

Tela de pausa:
- Frase ancora centralizada (font-playfair, grande)
- Fundo verde oliva profundo
- Botao "Continuar" (ou "Ver meu Espelho" no ultimo respiro)
- Animacao suave de entrada

### 5. Atualizar `DiagnosticoResult.tsx`

- Substituir todas as referencias `font-cormorant` por `font-playfair`
- Aplicar estilo editorial com alternancia de fundos escuros/claros nos blocos
- Manter toda a logica de calculo e exibicao intacta

### 6. Rota `/espelho` — fallback localStorage

- Atualizar `EspelhoPage.tsx` para tambem tentar carregar dados do `localStorage` (chave `mapa-padrao-session`) caso o Router state esteja vazio, permitindo acesso direto e testes

---

## Secao tecnica

### Fluxo de dados

```text
Quiz (/diagnostico)
  -> 24 respostas raw (1-9)
  -> salva localStorage "mapa-padrao-answers"
  -> calcula meanScores normalizados (10 - raw)
  -> navigate("/espelho", { state: { scores, answers } })

Espelho (/espelho)
  -> recebe scores + answers via state (ou localStorage fallback)
  -> computeEspelho(answers) gera EspelhoData
  -> renderiza resultado editorial + mandala + PDF
```

### Como testar com respostas falsas

Apos a implementacao, basta abrir o console do navegador e executar:

```javascript
// Simular respostas e ir direto ao Espelho
localStorage.setItem("mapa-padrao-answers", JSON.stringify([3,7,2,8,5,5,9,1,4,6,7,3,2,8,6,4,5,5,3,7,8,2,4,6]));
```

E depois navegar para `/espelho` — o fallback de localStorage carregara os dados.

### Onde fica cada coisa

| O que | Arquivo |
|-------|---------|
| Calculo completo | `src/data/espelhoEngine.ts` |
| Perguntas + labels | `src/data/diagnosticoQuestions.ts` (novo) |
| Botao Baixar PDF | `DiagnosticoResult.tsx` linha 257 |
| Botao Receber plano | `DiagnosticoResult.tsx` linha 252 |
| Mandala/grafico | `DiagnosticoRadarChart.tsx` |

### Arquivos criados/editados

- **Criar**: `src/data/diagnosticoQuestions.ts`
- **Criar**: `src/components/diagnostico/DiagnosticoIntro.tsx`
- **Criar**: `src/components/diagnostico/DiagnosticoQuestion.tsx`
- **Criar**: `src/components/diagnostico/DiagnosticoRespiro.tsx`
- **Editar**: `src/components/diagnostico/DiagnosticoResult.tsx` (font fix)
- **Editar**: `src/pages/EspelhoPage.tsx` (localStorage fallback)
