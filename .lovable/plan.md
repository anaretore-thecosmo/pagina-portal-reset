

# Plano de Acao: Implementar Curadoria Estrategica do Portal Reset

## Visao Geral

A curadoria identificou melhorias em 5 frentes: UX/Design, Arquitetura, Internacionalizacao, Shareability e Ancoragem de vendas. Este plano prioriza as implementacoes por impacto imediato no funil de conversao, organizadas em fases.

---

## Fase 1 — UX e Conversao (impacto direto em vendas)

### 1.1 CTA Sticky no mobile durante resultado do diagnostico
**Arquivo:** `src/components/diagnostico/DiagnosticoResult.tsx`
- Adicionar um botao CTA fixo no bottom do viewport (position: fixed) que aparece apos o usuario scrollar alem do bloco 1 (mandala)
- Botao com o gradiente dourado-ambar-verde ja implementado
- Texto dinamico baseado no arquetipo (ex: "COMECAR MINHA JORNADA")
- Visivel apenas em mobile (max-width 768px)
- Desaparece quando o usuario chega na secao de oferta (bloco 5) para nao duplicar

### 1.2 Melhorar ancoragem de preco no DiagnosticoResult
**Arquivo:** `src/components/diagnostico/DiagnosticoResult.tsx` (bloco 5, linhas 560-760)
- Adicionar comparacao visual clara: "Mentoria individual: R$500/sessao" riscado vs "Portal Reset: R$47/mês"
- Adicionar contador visual de valor empilhado (stack de valor) antes do preco
- Adicionar selo "Fundadora" com badge dourado ao lado do preco
- Reforcar a frase de garantia com icone de escudo mais proeminente

### 1.3 Melhorar ancoragem na Landing (LandingSharedSections)
**Arquivo:** `src/components/LandingSharedSections.tsx` (secao 6 — Value Stack, linhas 444-510)
- Tornar o stack de valor mais visual com barras de progresso ou icones
- Adicionar animacao de "risco" no valor de R$597 (line-through animado)
- Destacar o desconto percentual (92% de economia)

---

## Fase 2 — Card Compartilhavel (Shareability)

### 2.1 Gerar card de resultado para Instagram Stories
**Novos arquivos:**
- `src/components/diagnostico/ShareCard.tsx` — componente visual 9:16 com mandala mini + arquetipo + nome
- `src/components/diagnostico/shareCardGenerator.ts` — usa html2canvas para capturar o card como imagem

**Alteracao:** `src/components/diagnostico/DiagnosticoResult.tsx`
- Adicionar botao "Compartilhar meu resultado" ao lado do botao PDF no header
- Abre modal com preview do card + botao "Salvar como imagem"
- Card com fundo escuro, mandala simplificada, nome do arquetipo e QR code/link para o quiz

---

## Fase 3 — Refatoracao de Componentes

### 3.1 Quebrar DiagnosticoResult.tsx (794 linhas)
**Novos arquivos:**
- `src/components/diagnostico/DiagnosticoHeader.tsx` — header + botoes PDF/share
- `src/components/diagnostico/DiagnosticoMandala.tsx` — secao da mandala
- `src/components/diagnostico/DiagnosticoEditorial.tsx` — leitura editorial
- `src/components/diagnostico/DiagnosticoTriades.tsx` — triades + conflito central
- `src/components/diagnostico/DiagnosticoPlan7Days.tsx` — plano 7 dias
- `src/components/diagnostico/DiagnosticoArquetipo.tsx` — bloco do arquetipo
- `src/components/diagnostico/DiagnosticoOferta.tsx` — bloco de oferta/CTA
- `src/components/diagnostico/diagnosticoTokens.ts` — design tokens (cores, animacoes)

### 3.2 Quebrar LandingSharedSections.tsx (779 linhas)
**Novos arquivos:**
- `src/components/landing/ArquetiposSection.tsx`
- `src/components/landing/MentorasSection.tsx`
- `src/components/landing/DoresSection.tsx`
- `src/components/landing/CodigoZeroSection.tsx`
- `src/components/landing/MandalaPreviewSection.tsx`
- `src/components/landing/ValueStackSection.tsx`
- `src/components/landing/PricingSection.tsx`
- `src/components/landing/GarantiaSection.tsx`
- `src/components/landing/FAQSection.tsx`
- `src/components/landing/CTAFinalSection.tsx`
- `src/components/landing/landingTokens.ts`

---

## Fase 4 — Internacionalizacao (i18n)

### 4.1 Setup do react-i18next
**Novos arquivos:**
- `src/i18n/index.ts` — configuracao do i18next
- `src/i18n/locales/pt-BR.json` — ~230 strings extraidas
- `src/i18n/locales/en-US.json` — traducao inglês
- `src/i18n/locales/es-ES.json` — traducao espanhol

**Alteracao:** `src/main.tsx` — importar e inicializar i18n
**Alteracao:** Todos os componentes — substituir strings hardcoded por `t('key')`

### 4.2 Seletor de idioma
**Novo arquivo:** `src/components/LanguageSelector.tsx`
- Dropdown discreto no header com bandeiras/siglas (PT / EN / ES)
- Persiste escolha no localStorage

---

## Fase 5 — Backend e Persistencia

### 5.1 Ativar Lovable Cloud
- Configurar autenticacao (email + Google)
- Criar tabela `diagnostico_results` para salvar resultados
- Criar tabela `user_profiles` para dados do usuario
- Migrar de localStorage para banco de dados

### 5.2 Analytics e tracking
- Registrar cada diagnostico completado
- Registrar cliques no CTA de compra
- Registrar taxa de abandono por pergunta do quiz

---

## Ordem de Execucao Recomendada

```text
Prioridade    Fase     Impacto          Esforco
─────────────────────────────────────────────────
1 (agora)     1.1      Conversao +15%   30 min
2 (agora)     1.2-1.3  Conversao +10%   1h
3 (proximo)   2.1      Viralidade       1.5h
4 (proximo)   3.1-3.2  Manutencao       2h
5 (depois)    4.1-4.2  Alcance global   3h
6 (depois)    5.1-5.2  Retencao         2h+
```

## Detalhes Tecnicos

- **Dependencias novas:** `html2canvas` (share card), `react-i18next` + `i18next` (i18n)
- **Sem breaking changes:** todas as fases sao aditivas
- **Mobile-first:** CTA sticky e card compartilhavel priorizados para tela 375px
- **Gradiente dos botoes mantido:** `linear-gradient(135deg, #C8B870 0%, #b88a3a 50%, #983D06 100%)`

