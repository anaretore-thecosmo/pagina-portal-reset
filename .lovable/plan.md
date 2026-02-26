

# Problema: Imagem de fundo invisivel na /vendas

## Diagnostico

A imagem `vendas-beach-sunset.png` existe e o codigo em `VendasPage.tsx` esta correto estruturalmente. Porem a combinacao de `opacity: 0.12` na imagem + overlay de `0.88` torna a imagem praticamente invisivel — o resultado visual e quase identico a nao ter imagem.

## Plano de correcao

**Arquivo:** `src/pages/VendasPage.tsx`

1. Aumentar a opacidade da imagem de `0.12` para `0.25` (linha 50)
2. Reduzir a opacidade do overlay de `0.88` para `0.75` (linha 56)

Isso torna a imagem visivelmente presente sem comprometer a legibilidade do texto — a silhueta dourada da mulher na praia ficara perceptivel como atmosfera editorial.

