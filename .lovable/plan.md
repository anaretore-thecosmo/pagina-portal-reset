

# Plano: Redesign editorial de luxo — "Mapeie seu Padrao"

## Resumo
Ajustar layout, cores, tipografia e hierarquia da landing page em 2 dobras, sem alterar nenhum texto. Todas as mudancas acontecem em um unico arquivo: `src/pages/QuizMapaPadraoPage.tsx`.

---

## Mudancas detalhadas

### 1. Cor de fundo principal
- Trocar `#080E1A` por `#032A33` (indigo profundo) no wrapper e no overlay gradient.
- Overlay gradient: `rgba(3,42,51,0.88)` esquerda ate `rgba(3,42,51,0.55)` direita.

### 2. Cores de texto no hero (mais quentes, nao cinza)
- Headline: `#EDE6DA` (marfim elegante, ligeiramente mais quente).
- Subtitulo italic: `#CFC6BA` (prata quente).
- Corpo: `#CFC6BA` em vez de `#DAD3C9`.
- Frase destaque ("O problema nao e consciencia..."): `#EDE6DA` com peso 600.
- Microtexto: `#AFA79E`.
- "Em 3 minutos...": `#AFA79E`.

### 3. Botoes
- Primario "Abrir o Mapa": manter gradiente ambar/terracota, trocar `color` para `#032A33`, borda `rgba(200,184,112,0.55)`.
- Secundario "Como funciona": borda `#C8B870` (dourado, nao prata), texto `#EDE6DA`.

### 4. Selo editorial (microcopy)
- "24 perguntas..." — aumentar opacidade de 0.5 para 0.7, cor `#AFA79E`, manter tamanho 10px. Se nao ficar elegante, sera removido.

### 5. Bloco "Ao final, voce recebe" — adicionar na dobra 2
- Inserir um card editorial na segunda dobra (fundo marfim) ABAIXO dos 3 passos "Como funciona".
- Card com: `background: #FFFFFF`, `border: 1px solid rgba(3,42,51,0.08)`, sombra minima.
- Numeros 1/2/3 em dourado `#C8B870`, texto em `#032A33`.
- Itens: "Sua mandala de 6 eixos", "Uma leitura que traduz o mapa em decisao", "Um plano de 7 dias com foco real".

### 6. Dobra 2 — fundo e detalhes
- Fundo: `#F4EFE8` (marfim quente, como solicitado).
- Label "Como funciona": cor `#983D06` (terracota) em vez de `#2A777C` (teal — proibido).
- Numeros 01/02/03: manter `#983D06`.
- Texto: `#032A33`.

### 7. Rodape
- Manter "Ana Retore" como esta, ajustar cor para `rgba(3,42,51,0.50)` para melhor legibilidade.

### 8. Vinheta, grain e portal crack
- Manter como estao, apenas ajustar a cor do portal crack line para usar `rgba(200,184,112,...)` (ja esta correto).

---

## Arquivos editados
- `src/pages/QuizMapaPadraoPage.tsx` (unico arquivo)

## O que NAO muda
- Nenhum texto/copy.
- Nenhuma nova pagina ou rota.
- Fluxo do quiz (perguntas, respiros, resultado) intacto.
- Fontes permanecem Playfair Display + Inter.

