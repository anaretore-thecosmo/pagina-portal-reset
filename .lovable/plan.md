

## Plano: Captação de Lead antes do Resultado do Mapa

### Objetivo
Inserir um gate de captação (nome + email + WhatsApp opcional) entre o último passo do quiz e a revelação do diagnóstico, sem quebrar o fluxo narrativo nem a arquitetura atual do funil.

### Princípio estratégico (The Cosmo)
- **Não é paywall, é portal**: a leitora termina as 24 perguntas, vê uma tela que diz "seu mapa está pronto" e é convidada a deixar o nome para receber a leitura editorial.
- **Honestidade vibracional**: deixar claro que receberá o resultado na tela agora E uma cópia por email/WhatsApp.
- **Sem urgência artificial**: nada de "última chance", "vagas limitadas".
- **Skip opcional invisível**: o link "ver sem cadastrar" fica discreto (cinza, fonte pequena) — preserva confiança sem matar conversão.

---

### Onde encaixa no fluxo

```text
Quiz (24 perguntas) 
  → EspelhoDaClarezaPage (transição "respira, seu mapa está sendo desenhado")
    → [NOVO] LeadGate (nome + email + whatsapp opcional)   ← inserido aqui
      → DiagnosticoResult (mandala + arquétipo + CTA Kiwify)
```

A inserção é **dentro de `EspelhoDaClarezaPage`**, como um estado intermediário antes de renderizar `DiagnosticoResult`. Não cria nova rota — preserva o state com os scores que já trafega via `location.state`.

---

### Mudanças

**1. Novo componente: `src/components/diagnostico/LeadGate.tsx`**
- Card editorial centralizado, mesmo padrão visual do quiz (fundo `#08090D`, ouro `#C8B870`, Playfair + Inter).
- Headline: "Seu mapa está pronto."
- Sub: "Para onde enviamos uma cópia da sua leitura?"
- Campos:
  - Nome (obrigatório, max 60)
  - Email (obrigatório, validação zod)
  - WhatsApp (opcional, max 20, só dígitos/+/espaço)
- Validação com **zod** (schema client-side, mensagens em PT).
- Botão primário com gradiente oficial: "Revelar meu mapa".
- Link discreto abaixo: "Prefiro ver sem cadastrar" (cinza 35% opacity, 11px).
- Trust line: "Seus dados são privados. Sem spam. LGPD."
- Animações Framer Motion coerentes com o resto (fade + stagger 130ms).

**2. Edição: `src/pages/EspelhoDaClarezaPage.tsx`**
- Adicionar estado `leadCaptured: boolean` (default false).
- Ler `localStorage.portalreset_lead` no mount: se já existe, pula o gate.
- Renderização condicional:
  - Se `!leadCaptured` → `<LeadGate onSubmit={...} onSkip={...} />`
  - Se `leadCaptured` → `<DiagnosticoResult ... />` (atual)
- `onSubmit`: salva lead em localStorage + dispara persistência (ver item 3) + seta `leadCaptured = true`.
- `onSkip`: apenas seta `leadCaptured = true` (sem persistir).

**3. Persistência do lead — Supabase**
- Conforme regra do projeto (stack Supabase, NÃO Lovable Cloud).
- Tabela nova: `leads_mapa_padrao`
  ```
  id uuid pk default gen_random_uuid()
  nome text not null
  email text not null
  whatsapp text
  arquetipo text          -- preenchido após cálculo (Curiosa/Buscadora/Estrategista/Soberana)
  scores jsonb            -- 6 eixos
  utm jsonb               -- captura utm_source/medium/campaign se houver
  created_at timestamptz default now()
  ```
- RLS: insert público (anon), select restrito a service_role.
- Função `saveLead(payload)` em `src/lib/leads.ts` chamando `supabase.from('leads_mapa_padrao').insert(...)`.
- Falha silenciosa: se Supabase falhar, log no console e segue o fluxo (NUNCA bloqueia o resultado).

**4. Analytics (alinhado ao plano da Fase 1)**
Eventos novos no funil:
- `lead_gate_view` — quando o gate é exibido
- `lead_gate_submit` — submit válido
- `lead_gate_skip` — clique em "ver sem cadastrar"
- `lead_gate_error` — falha de validação ou Supabase

Permite medir: taxa de captação real, % skip, drop-off no gate.

**5. Pré-preenchimento no checkout Kiwify**
- Quando lead já capturado, passar nome/email como query params para a URL Kiwify no `DiagnosticoResult`:
  - `https://pay.kiwify.com.br/ns0fjIx?name={nome}&email={email}`
- Reduz fricção no checkout → conversão maior sem mudar produto.

---

### Arquivos editados/criados

| Arquivo | Tipo | Motivo |
|---|---|---|
| `src/components/diagnostico/LeadGate.tsx` | NOVO | Componente do gate editorial |
| `src/lib/leads.ts` | NOVO | `saveLead()` + tipo `LeadPayload` |
| `src/pages/EspelhoDaClarezaPage.tsx` | EDIT | Renderização condicional do gate antes do resultado |
| `src/components/diagnostico/DiagnosticoResult.tsx` | EDIT | Append de nome/email à URL Kiwify se disponível |
| Supabase migration | NOVO | Tabela `leads_mapa_padrao` + RLS |

---

### Considerações estratégicas

- **Não interfere no funil**: o quiz continua igual, o resultado continua igual. Apenas adiciona um passo de respiração entre a transição e a revelação.
- **Reversível**: se a taxa de skip for alta demais ou a conversão cair, basta remover o estado condicional em `EspelhoDaClarezaPage` (1 linha) e o gate desaparece.
- **A/B-ready**: estrutura já permite testar gate com/sem skip, ou copy diferente, no futuro.
- **LGPD**: link de privacidade visível no gate; consentimento implícito ao submeter (campo de aceite explícito não é necessário aqui pois o uso é declarado em texto curto, mas pode ser adicionado se Simone solicitar).
- **Mantém gradiente oficial** ouro→âmbar→terracota no botão primário.
- **Coerente com The Cosmo**: linguagem direta, sem manipulação, opção de pular preserva a soberania da leitora.

