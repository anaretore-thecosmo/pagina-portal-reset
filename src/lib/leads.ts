/**
 * Lead capture — Mapa do Padrão
 * 
 * Persistência local imediata + stub para Supabase (a ser conectado pela Ana).
 * Falha silenciosa: NUNCA bloqueia o fluxo do diagnóstico.
 */

export interface LeadPayload {
  nome: string;
  email: string;
  whatsapp?: string;
  arquetipo?: string;
  scores?: number[];
  utm?: Record<string, string>;
  capturedAt: string;
}

const LEAD_STORAGE_KEY = "portalreset_lead";

/** Lê UTM params da URL atual (se houver) */
export function readUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((key) => {
    const v = params.get(key);
    if (v) utm[key] = v;
  });
  return utm;
}

/** Recupera lead salvo do localStorage (se existir) */
export function getStoredLead(): LeadPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LEAD_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LeadPayload) : null;
  } catch {
    return null;
  }
}

/** Salva lead localmente + dispara persistência remota (best-effort) */
export async function saveLead(payload: Omit<LeadPayload, "capturedAt">): Promise<void> {
  const full: LeadPayload = { ...payload, capturedAt: new Date().toISOString() };

  // 1) Local first — sempre funciona
  try {
    localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(full));
  } catch (err) {
    console.warn("[leads] localStorage falhou:", err);
  }

  // 2) Remote — Supabase (TODO: conectar quando credenciais estiverem disponíveis)
  // Quando o cliente Supabase for adicionado, descomentar:
  //
  // try {
  //   const { supabase } = await import("@/integrations/supabase/client");
  //   await supabase.from("leads_mapa_padrao").insert({
  //     nome: full.nome,
  //     email: full.email,
  //     whatsapp: full.whatsapp ?? null,
  //     arquetipo: full.arquetipo ?? null,
  //     scores: full.scores ?? null,
  //     utm: full.utm ?? null,
  //   });
  // } catch (err) {
  //   console.warn("[leads] Supabase insert falhou:", err);
  // }
}

/** Analytics — best-effort, falha silenciosa. Reusa o tracker central. */
export function trackLeadEvent(
  event: "lead_gate_view" | "lead_gate_submit" | "lead_gate_skip" | "lead_gate_error",
  data?: Record<string, unknown>,
): void {
  // Importação dinâmica para evitar ciclo se algum dia leads importar de analytics
  import("./analytics")
    .then(({ track }) => track(event, data))
    .catch(() => {
      /* noop */
    });
}
