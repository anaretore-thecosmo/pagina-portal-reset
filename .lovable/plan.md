

# Plano: Imagem de fundo editorial na pagina /vendas

## Etapa 1 — Gerar a imagem

Usar a AI de geracao de imagem (Gemini Flash Image) para criar uma imagem editorial de uma mulher sentada na praia vendo o por do sol. Estilo matte, alto contraste, sem rosto visivel (costas/silhueta), tons quentes dourados e ambar — alinhado com a paleta editorial do projeto.

Salvar como `src/assets/vendas-beach-sunset.png`.

## Etapa 2 — Aplicar como fundo na VendasPage

**Arquivo:** `src/pages/VendasPage.tsx`

Alterar o `<main>` (linha 41) para incluir:

1. `position: relative` e `overflow: hidden` no main
2. Um `<div>` absoluto como camada de imagem com:
   - `background-image` apontando para o asset
   - `background-size: cover`, `background-position: center`
   - `opacity: 0.12` (transparencia alta para nao competir com texto)
3. Um overlay escuro semi-transparente (`background: hsl(var(--background) / 0.88)`) sobre a imagem para garantir contraste total do texto
4. O conteudo (`max-w-[720px]`) recebe `position: relative` e `z-index: 10` para ficar acima das camadas

### Estrutura visual (camadas):

```text
┌─────────────────────────────┐
│  Camada 3: Conteudo (z-10)  │  ← texto nitido
│  Camada 2: Overlay escuro   │  ← protege legibilidade
│  Camada 1: Imagem (12%)     │  ← atmosfera sutil
│  Camada 0: bg-background    │  ← cor base
└─────────────────────────────┘
```

Isso garante que a imagem adiciona atmosfera sem comprometer a nitidez do texto.

