

# Plano: Redesign Visual Completo - Sistema Editorial Premium

## Visao Geral

Transformacao total do sistema visual: sair do tema mistico/alquimico escuro para um estilo editorial de revista premium com fundo claro, tipografia refinada e luxo sobrio.

---

## 1. Nova Paleta e Tipografia

### Cores (substituem todo o tema atual)

| Token | Hex | Uso |
|-------|-----|-----|
| Off-white quente | #F6F1E8 | Fundo principal |
| Areia | #E7D9C3 | Cards, planos |
| Grafite | #1E1E1C | Texto primario |
| Preto quente | #0B0B0A | Titulos, contraste |
| Dourado fosco | #B08D57 | Acento principal |
| Ambar | #C08A2C | CTA hover, detalhes |
| Salvia | #6B7B67 | Apoio discreto |
| Argila | #A46A4A | Apoio raro |

### Fontes (substituem Cinzel/Philosopher/Crimson)

| Uso | Fonte | Fallback |
|-----|-------|----------|
| Headlines (serif editorial) | Playfair Display | Libre Baskerville, serif |
| Texto (sans limpa) | Inter | Helvetica Neue, sans-serif |
| Citacoes (serif italica) | Playfair Display Italic | serif |

---

## 2. Arquivos a Modificar

### 2.1 `index.html`
- Trocar Google Fonts import de Cinzel/Philosopher/Crimson para Playfair Display + Inter

### 2.2 `src/index.css`
- Trocar import de fontes para Playfair Display + Inter
- Reescrever todas as CSS variables com a nova paleta clara
- Fundo body: `#F6F1E8` em vez de preto
- Remover gradientes misticos, glows neon
- Bordas: `1px rgba(30,30,28,0.10)`; sombras quase invisiveis
- Atualizar classes utilitarias (`.text-gradient-gold`, `.mystical-card`, etc.) para o novo visual editorial
- Largura de leitura: max 640-720px para texto

### 2.3 `tailwind.config.ts`
- Atualizar `fontFamily` para `playfair` e `inter`
- Atualizar cores customizadas (mystical tokens -> editorial tokens)
- Remover gradientes misticos, adicionar gradientes sutis
- Ajustar keyframes/animacoes para serem mais discretas

### 2.4 `src/components/ui/button.tsx`
- Variante `cta`: fundo grafite `#1E1E1C` com texto off-white, hover ambar `#C08A2C`
- Remover variantes `mystical` e `mysticalOutline` (substituir por `editorial` e `editorialOutline`)
- Sem glows neon, sem sombras exageradas

### 2.5 Todas as 12 Dobras (componentes)
Cada componente sera reescrito com:

**Dobra 1** (`Dobra1InterrupcaoTotal.tsx`):
- Novo copy: "A VERDADE NAO TRANSFORMA. SUA ESCOLHA, SIM."
- Texto 10s reescrito (Portal Reset como espaco de mentalidade)
- CTA primario acima da dobra
- Fundo off-white, titulo preto quente, acento dourado
- H1 Playfair 64-84px; subtitulo Inter 18-20px
- Remover glows e efeitos neon

**Dobra 2** (`Dobra2Identificacao.tsx`):
- Copy mantido (ja esta correto)
- Layout editorial: imagem lateral (direita), texto (esquerda)
- Grafite em fundo off-white; acento dourado so em 1 palavra

**Dobra 3** (`Dobra3CausaInvisivel.tsx`):
- Novo 3s: "O PROBLEMA NAO E DISCIPLINA. E SISTEMA."
- Texto 10s reescrito (foco em economia de energia + ambiente)
- Fundo areia + grafite; salvia discreta
- Remover imagem brain mistica, usar visual limpo

**Dobra 4** (`Dobra4OQueNaoFunciona.tsx`):
- Copy praticamente mantido
- Adicionar citacao: "Meu mundo e o que eu escolho perceber." -- William James
- Faixa fina dourada como detalhe editorial

**Dobra 5** (`Dobra5NovaPerspectiva.tsx`):
- Texto 10s reescrito (treino + ambiente + eixo em poucos minutos)
- Citacao: "Atencao, no grau mais alto, e oracao." -- Simone Weil

**Dobra 6** (`Dobra6OProduto.tsx`):
- Novo 3s: "O PORTAL RESET E UM ESPACO. NAO UM APP PARA 'DAR CONTA'."
- Texto 10s reescrito (sustentar presenca, voltar ao Portal)
- Remover card mistico, usar bloco visual calmo editorial

**Dobra 7** (`Dobra7ComoFunciona.tsx`) -- REESTRUTURADO como "RITO DE ENTRADA":
- Novo 3s: "OS 10 DIAS NAO SAO O FIM. SAO A ENTRADA."
- Texto 10s sobre Reset 10D como reorganizacao (2-5 min/dia)
- Visual: linha do tempo minimalista (10 pontos)
- Remover imagem crystal-grimoire

**Dobra 8** (`Dobra8Diferencial.tsx`) -- REESTRUTURADO como "O QUE TEM DENTRO":
- Novo 3s: "VOCE NAO ENTRA SOZINHA. VOCE ENTRA COM SUPORTE."
- Novos entregaveis:
  - AYRA (clareza mental)
  - CLEO (presenca e magnetismo)
  - NOTION INTEGRADO
  - SERIE: DESTRAVANDO OS CADEADOS DA MENTE (7 episodios listados)
- Icones lineares em grafite, off-white + dourado fosco

**Dobra 9** (`Dobra9Origem.tsx`):
- Novo 3s: "EU CRIEI ISSO POR NECESSIDADE REAL."
- Texto 10s totalmente reescrito (historia 2016, epifania, loop, custo concreto, virada de chave)
- Remover imagem alchemist-scroll
- Linha dourada editorial como assinatura

**Dobra 10** (`Dobra10ParaQuemE.tsx`):
- Texto 10s ajustado: "ja percebeu que sabe mas nao sustenta", "sair do automatico sem depender de motivacao"
- Anti-qualificacao: "pico emocional, atalho, promessa barulhenta"
- Encerrar com: "Sem julgamento. So alinhamento."

**Dobra 11** (`Dobra11Transformacao.tsx`):
- Texto 10s ajustado: "Nao porque a vida vira perfeita -- mas porque voce volta a agir de dentro."
- Adicionar: "Isso e poder feminino: presenca que governa."
- Citacao Jung: "Quando uma situacao interna nao se torna consciente, ela aparece fora, como destino."
- Remover elementos decorativos misticos (circulos pulsantes)

**Dobra 12** (`Dobra12CTA.tsx`):
- Manter preco R$47/mes
- Microcopy abaixo do botao: "Um espaco para sustentar clareza no dia a dia."
- Botao: fundo grafite #1E1E1C, texto off-white, hover ambar
- Fundo limpo, sem distracao
- Remover elementos decorativos rotativos

### 2.6 `src/components/Footer.tsx`
- Adaptar ao novo visual claro/editorial

### 2.7 `src/components/AccessibilityReader.tsx`
- Adaptar estilos dos botoes ao novo tema (bordas sutis, sem glow)

---

## 3. Regras de Design (aplicadas em todos os componentes)

- Largura de leitura: `max-w-[680px]` para texto
- Espaco branco generoso (luxo = respiro)
- Bordas: `border border-[rgba(30,30,28,0.10)]`
- Sombras quase invisiveis
- Icones minimalistas (linha fina)
- Sem emojis decorativos
- Animacoes discretas (sem glows, sem pulsos neon)

---

## 4. Ordem de Execucao

1. Atualizar `index.html` (fontes)
2. Reescrever `src/index.css` (paleta + utilitarios)
3. Atualizar `tailwind.config.ts` (tokens + fontes)
4. Atualizar `button.tsx` (variantes editoriais)
5. Reescrever as 12 dobras com novo copy + novo visual
6. Atualizar Footer e AccessibilityReader
7. Limpar `src/App.css` (remover estilos antigos)

---

## 5. Resumo das Mudancas

| Item | Antes | Depois |
|------|-------|--------|
| Fundo | Preto (#0a0a0a) | Off-white quente (#F6F1E8) |
| Texto | Dourado/pergaminho | Grafite (#1E1E1C) |
| Titulos | Cinzel + gradient gold | Playfair Display + preto quente |
| Corpo | Philosopher | Inter |
| Acentos | Teal neon + gold glow | Dourado fosco + ambar sutil |
| CTA | Gold gradient + glow | Grafite solido + hover ambar |
| Cards | Mistico escuro + borda dourada | Areia + borda quase invisivel |
| Vibe geral | Alquimia mistica | Revista editorial premium |
| Dobra 7 | Como Funciona (lista) | Rito de Entrada (Reset 10D) |
| Dobra 8 | Diferencial (recorrencia) | O Que Tem Dentro (AYRA, CLEO, serie) |
| Dobra 9 | Historia curta | Historia completa (2016, epifania) |

