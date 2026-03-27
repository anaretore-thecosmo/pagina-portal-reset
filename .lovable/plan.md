

# Plano: Corrigir erro `isDark is not defined` no QuizMapaPadraoPage

## Problema

O arquivo `QuizMapaPadraoPage.tsx` referencia uma variavel `isDark` que nunca foi declarada (linhas 503 e 541), causando um `ReferenceError` que crasha a pagina do quiz inteira.

## Correcao

**Arquivo:** `src/pages/QuizMapaPadraoPage.tsx`

O projeto usa tema escuro fixo (`#08090D`), entao `isDark` e sempre `true`. A correcao e substituir as expressoes ternarias pelos valores do branch dark:

1. **Linha 503:** Trocar `isDark ? "hsl(var(--off-white) / 0.06)" : "hsl(var(--clay) / 0.10)"` por `"hsl(var(--off-white) / 0.06)"`
2. **Linha 541-543:** Trocar `isDark ? "hsl(var(--matte-gold) / 0.12)" : "hsl(var(--matte-gold) / 0.08)"` por `"hsl(var(--matte-gold) / 0.12)"`

Duas linhas editadas, zero dependencias novas. O quiz voltara a funcionar imediatamente.

