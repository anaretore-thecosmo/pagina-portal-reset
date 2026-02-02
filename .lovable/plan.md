

# Plano: Adicionar Botões de Compra em Cada Seção

## Objetivo
Adicionar um botão CTA em cada dobra (seção) da landing page, todos direcionando para o link de pagamento do Kiwify: `https://pay.kiwify.com.br/TNXfTZT`

## Seções a Modificar

A página atual tem 5 seções principais + footer:

| Seção | Status Atual | Ação |
|-------|--------------|------|
| HeroSection | Tem 2 botões (sem link) | Adicionar link Kiwify |
| TransformationSection | Sem botão | Adicionar botão CTA |
| JourneySection | Sem botão | Adicionar botão CTA |
| TestimonialsSection | Sem botão | Adicionar botão CTA |
| CTASection | Tem 1 botão (sem link) | Adicionar link Kiwify |

## Alterações por Componente

### 1. HeroSection.tsx
- Modificar o botão "Começar Agora" para abrir o link Kiwify em nova aba
- Modificar o botão "Saiba Mais" para scroll suave para próxima seção (ou também link para Kiwify)

### 2. TransformationSection.tsx
- Adicionar import do Button
- Adicionar botão CTA centralizado ao final da seção, após os cards de transformação
- Texto sugerido: "QUERO MINHA TRANSFORMAÇÃO"

### 3. JourneySection.tsx
- Adicionar import do Button
- Adicionar botão CTA centralizado ao final da seção, após a grade dos 10 dias
- Texto sugerido: "COMEÇAR MEUS 10 DIAS"

### 4. TestimonialsSection.tsx
- Adicionar import do Button
- Adicionar botão CTA centralizado ao final dos depoimentos
- Texto sugerido: "QUERO RESULTADOS ASSIM"

### 5. CTASection.tsx
- Modificar o botão existente para abrir o link Kiwify em nova aba

## Detalhes Técnicos

```text
Padrão do botão em cada seção:
+------------------------------------------+
|  <Button                                 |
|    variant="cta"                         |
|    size="xl"                             |
|    className="group"                     |
|    onClick={() => window.open(           |
|      'https://pay.kiwify.com.br/TNXfTZT',|
|      '_blank'                            |
|    )}                                    |
|  >                                       |
|    TEXTO DO CTA                          |
|  </Button>                               |
+------------------------------------------+
```

- Todos os botões usarão `variant="cta"` para manter consistência visual
- Os botões terão animação de hover com efeito shimmer
- O link abrirá em nova aba (`_blank`) para não perder o usuário da página

## Resultado Final

Após as alterações, a página terá um botão de compra visível em cada dobra, facilitando a conversão em qualquer ponto da jornada do usuário na página.

