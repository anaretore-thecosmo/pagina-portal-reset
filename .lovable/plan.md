
# Plano: Atualizar Preço do Produto

## Objetivo
Corrigir o preço do produto de R$ 97 para R$ 197 na seção de CTA.

## Alteração no CTASection.tsx

### Linha 72-75 - Atualizar valores:
| Campo | Valor Atual | Novo Valor |
|-------|-------------|------------|
| Preço riscado (de) | R$ 497 | R$ 497 (manter) |
| Preço atual | R$ 97 | R$ 197 |
| Parcelamento | 12x de R$ 9,70 | 12x de R$ 19,70 |

### Código atualizado:
```tsx
<span className="font-philosopher text-foreground/40 text-lg line-through">R$ 497</span>
<span className="font-cinzel text-gradient-gold text-5xl font-bold">R$ 197</span>
// ...
<p className="font-philosopher text-primary text-sm mt-2">ou 12x de R$ 19,70</p>
```

## Resultado
O preço será exibido corretamente como R$ 197 (ou 12x de R$ 19,70), com o preço original de R$ 497 riscado mostrando o desconto.
