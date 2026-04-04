/* ── Landing design tokens ──────────────────────────── */

/* Dark sections */
export const D = {
  bg:        "#08090D",
  text:      "#EDE6DB",
  sub:       "rgba(207,197,184,0.7)",
  muted:     "rgba(207,197,184,0.45)",
  accent:    "#C8B870",
  accentDim: "rgba(200,184,112,0.6)",
  accentFaint:"rgba(200,184,112,0.12)",
  cardBg:    "rgba(200,184,112,0.05)",
  border:    "rgba(200,184,112,0.15)",
  kicker:    "rgba(200,184,112,0.55)",
  line:      "rgba(200,184,112,0.2)",
};

/* Light sections */
export const L = {
  bg:        "#EDE6DB",
  text:      "#08090D",
  sub:       "rgba(8,9,13,0.65)",
  muted:     "rgba(8,9,13,0.4)",
  accent:    "#6B5000",
  accentDim: "rgba(107,80,0,0.7)",
  accentFaint:"rgba(8,9,13,0.06)",
  cardBg:    "rgba(8,9,13,0.04)",
  border:    "rgba(8,9,13,0.1)",
  kicker:    "rgba(8,9,13,0.4)",
  line:      "rgba(8,9,13,0.15)",
};

/* Animation variants */
export const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.11, duration: 0.6, ease: "easeOut" as const },
  }),
};

export const inView = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
