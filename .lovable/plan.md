

# Plano: Atualizar dominio dos links legais no rodape

## O que sera feito

Substituir o dominio antigo (`oportalreset.com`) pelo novo dominio (`portalresetdigital.com`) nos dois links legais do rodape.

## Detalhes tecnicos

**Arquivo:** `src/components/Footer.tsx`

- Linha 24: `https://oportalreset.com/politica-de-privacidade` -> `https://portalresetdigital.com/politica-de-privacidade`
- Linha 27: `https://oportalreset.com/exclusao-de-dados` -> `https://portalresetdigital.com/exclusao-de-dados`

Nenhuma outra alteracao necessaria. Os atributos `target="_blank"` e `rel="noopener noreferrer"` ja estao configurados corretamente.

