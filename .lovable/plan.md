

# Plano: Restaurar layout do Hero ao design de referência

## Problema
A coluna direita do hero nao corresponde ao print de referencia. Tres elementos estao fora de posicao ou ausentes.

## Mudancas necessarias (arquivo: `src/pages/QuizMapaPadraoPage.tsx`)

### 1. Coluna direita - Reordenar elementos
Substituir o conteudo da coluna direita (linhas ~156-290) para seguir esta ordem:

1. **Bloco "Sem julgamento. So direcao."** - com borda vertical dourada a esquerda (border-left 2px #C8B870), fonte Playfair Display italic, cor #F2EEE8, tamanho ~22-26px
2. **Botoes** - "ABRIR O MAPA" (primario gradient) + "COMO FUNCIONA" (outline), lado a lado
3. **Microtexto** - "24 perguntas · escala 1 a 9 · resultado imediato"
4. **Watermark "111"** - manter como esta (absoluto, 5% opacidade)

### 2. Coluna esquerda - Mover "Em 3 minutos..."
Mover o paragrafo "Em 3 minutos, voce mapeia..." para o final da coluna esquerda (apos o bloco de corpo), com cor #BFB6AA, tamanho pequeno (~13px).

### 3. Remover card "Ao final, voce recebe" do hero
O card translucido com os 3 itens (Mandala, Leitura, Plano de 7 dias) deve ser removido da dobra hero. Esse conteudo permanece na dobra 2 (secao clara editorial), onde ja existe uma versao dele.

### Resumo tecnico das edicoes
- Linhas ~134-146: adicionar "Em 3 minutos..." no final do bloco esquerdo
- Linhas ~173-184: remover "Em 3 minutos..." da coluna direita
- Linhas ~156-170: inserir bloco "Sem julgamento. So direcao." com borda dourada antes dos botoes
- Linhas ~241-290: remover o card "Ao final, voce recebe" do hero

Nenhuma alteracao de copy. Apenas reposicionamento de elementos existentes.
