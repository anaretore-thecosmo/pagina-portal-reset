/* ── Design tokens — Shared across diagnostico components ──── */

/* DARK theme */
export const BG_DARK  = "#08090D";
export const GOLD     = "#C8B870";
export const CREAM    = "#EDE6DB";
export const MUTED    = "rgba(207,197,184,0.62)";
export const DIM      = "rgba(207,197,184,0.38)";
export const BORDER   = "rgba(200,184,112,0.09)";
export const TOP_CLR  = "#C8A050";
export const BOT_CLR  = "#6B8BA4";
export const CTR_CLR  = "#7A9B6E";

/* LIGHT theme */
export const BG_LIGHT       = "#EDE6DB";
export const TEXT_DARK      = "#1A1A18";
export const TEXT_MUTED_L   = "rgba(26,26,24,0.78)";
export const TEXT_DIM_L     = "rgba(26,26,24,0.56)";
export const BORDER_LIGHT   = "rgba(26,26,24,0.08)";
export const GOLD_DARK      = "#8B7A3A";

/* URLs */
export const KIWIFY_URL  = "https://pay.kiwify.com.br/SdH1PiX";
export const PLANO_A_URL = "mailto:ana.retore@gmail.com?subject=Quero%20saber%20mais%20sobre%20o%20Plano%20A";

/* Arquétipo palette */
export const ARQUETIPO_THEME: Record<string, { accent: string; accentAlpha: string; accentDarkBg: string; fase: string }> = {
  Curiosa:      { accent: "#7BB89A", accentAlpha: "rgba(123,184,154,0.10)", accentDarkBg: "rgba(123,184,154,0.06)", fase: "Fase 1" },
  Buscadora:    { accent: "#C8A050", accentAlpha: "rgba(200,160,80,0.10)",  accentDarkBg: "rgba(200,160,80,0.06)",  fase: "Fase 2" },
  Estrategista: { accent: "#7B9EC8", accentAlpha: "rgba(123,158,200,0.10)", accentDarkBg: "rgba(123,158,200,0.06)", fase: "Fase 3" },
  Soberana:     { accent: "#C8B870", accentAlpha: "rgba(200,184,112,0.10)", accentDarkBg: "rgba(200,184,112,0.06)", fase: "Fase 4" },
};

/* Animation variants */
export const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export const inView = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
