

# Analise Completa e Plano de Correcoes

## Resultado do teste end-to-end

Testei o fluxo completo: Intro → 24 perguntas → Pausas (a cada 6) → Resultado (Espelho da Clareza) → CTA "VER MEU PLANO NO APP" → Pagina de vendas (/vendas).

### O que funciona corretamente

- Pagina inicial (/) carrega com layout editorial correto
- Botao "ABRIR O MAPA" inicia o quiz
- 24 perguntas carregam sequencialmente com escala 1-9
- 3 telas de pausa/respiro aparecem a cada 6 perguntas (correto)
- Tela final "VER MEU ESPELHO" exibe corretamente
- Relatorio "Espelho da Clareza" renderiza com mandala radar, leitura editorial, triade de base/vazamento, conflito central e plano de 7 dias
- Botao "BAIXAR PDF" visivel
- CTA "VER MEU PLANO NO APP" navega para /vendas
- Pagina de vendas carrega com perfil dinamico ("Ciclo de Picos e Quedas") preenchido corretamente
- Blocos "O que isso significa", "Caminho recomendado", "Como funciona", "O que voce recebe", bloco Cleo e oferta R$47/mes todos renderizam
- Zero erros no console (apenas warnings de postMessage do Lovable, normais)

### Problemas encontrados

**1. Pagina /vendas nao tem links legais (LGPD)**

O rodape da pagina de vendas tem apenas o credito "Ana Retore", mas nao inclui os links de Politica de Privacidade e Exclusao de Dados. O componente `Footer.tsx` existe com esses links, porem nao e usado na VendasPage — ela tem um rodape inline proprio.

**2. Botao CTA da oferta nao tem acao**

O botao "ATIVAR MEU PORTAL (R$47/MES)" na pagina /vendas nao tem `onClick`. Deveria redirecionar para o link de checkout Kiwify: `https://pay.kiwify.com.br/ns0fjIx`

## Plano de correcoes

### Correcao 1: Adicionar links legais na VendasPage

**Arquivo:** `src/pages/VendasPage.tsx` (linhas 187-192)

Substituir o bloco de "Author credit" por um rodape completo que inclua:
- Link "Politica de Privacidade" → `https://portalresetdigital.com/politica-de-privacidade`
- Link "Solicitacao de Exclusao de Dados" → `https://portalresetdigital.com/exclusao-de-dados`
- Ambos com `target="_blank"` e `rel="noopener noreferrer"`
- Credito Ana Retore mantido abaixo

### Correcao 2: Conectar CTA ao checkout Kiwify

**Arquivo:** `src/pages/VendasPage.tsx` (linha 177)

Adicionar `onClick` ao botao CTA que redirecione para `https://pay.kiwify.com.br/ns0fjIx` (abrindo em nova aba ou redirecionando).

## Detalhes tecnicos

Ambas as correcoes sao no mesmo arquivo `src/pages/VendasPage.tsx`:

1. Linha 177: adicionar `onClick={() => window.open("https://pay.kiwify.com.br/ns0fjIx", "_blank")}`
2. Linhas 187-192: expandir rodape com links legais + copyright + disclaimer, seguindo o mesmo padrao visual do `Footer.tsx`

