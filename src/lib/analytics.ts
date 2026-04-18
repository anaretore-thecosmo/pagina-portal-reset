/**
 * Analytics — instrumentação unificada do funil Portal Reset
 *
 * Eventos canônicos (não inventar novos sem necessidade):
 *   landing_view · cta_click_hero · cta_click_midpage
 *   quiz_start · quiz_question_answered · quiz_complete
 *   lead_gate_view · lead_gate_submit · lead_gate_skip · lead_gate_error
 *   result_view · checkout_click · share_click · pdf_download
 *
 * Estratégia: dataLayer (GTM/GA4) + console (dev). Falha silenciosa.
 */

export type FunnelEvent =
  | "landing_view"
  | "cta_click_hero"
  | "cta_click_midpage"
  | "quiz_start"
  | "quiz_question_answered"
  | "quiz_complete"
  | "lead_gate_view"
  | "lead_gate_submit"
  | "lead_gate_skip"
  | "lead_gate_error"
  | "result_view"
  | "checkout_click"
  | "share_click"
  | "pdf_download";

export function track(event: FunnelEvent, data?: Record<string, unknown>): void {
  try {
    const w = window as unknown as { dataLayer?: unknown[] };
    if (!w.dataLayer) w.dataLayer = [];
    w.dataLayer.push({ event, ts: Date.now(), ...(data ?? {}) });
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.info(`[analytics] ${event}`, data ?? {});
    }
  } catch {
    /* noop */
  }
}
