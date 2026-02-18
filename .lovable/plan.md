
# Plano: Remover o botao "Como Funciona"

## O que sera feito

Remover o botao "COMO FUNCIONA" que aparece abaixo do botao "ABRIR O MAPA" no painel direito do hero (desktop) e na versao mobile.

## Detalhes tecnicos

**Arquivo:** `src/pages/QuizMapaPadraoPage.tsx`

**Acao:** Deletar o bloco do botao secundario "Como funciona" (linhas 340-365 aproximadamente), que e um `<button>` com scroll suave para a secao "como-funciona-micro".

- O bloco "COMO FUNCIONA" interno do card (microblock com os 3 passos numerados 01, 02, 03) permanece intacto -- apenas o botao de acao e removido.
- Nenhum outro elemento sera alterado.
