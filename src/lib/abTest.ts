/**
 * A/B/C test infrastructure — Hero copy variant assignment
 *
 * Persists per-browser via localStorage so the same reader always sees the
 * same variant across sessions (consistency = clean attribution).
 *
 * Override for QA: ?ab_hero=A|B|C in the URL forces a variant and persists it.
 *
 * Distribution: 33/33/34 (uniform). Falls back to "B" (current control) on
 * any error — never break the page for an experiment.
 */

export type HeroVariant = "A" | "B" | "C";

const STORAGE_KEY = "ab_hero";
const VARIANTS: HeroVariant[] = ["A", "B", "C"];

function isValid(v: unknown): v is HeroVariant {
  return v === "A" || v === "B" || v === "C";
}

function readQueryOverride(): HeroVariant | null {
  try {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("ab_hero")?.toUpperCase();
    return isValid(raw) ? raw : null;
  } catch {
    return null;
  }
}

/**
 * Returns the assigned hero variant for this browser.
 * - If `?ab_hero=X` is in the URL → use it and persist.
 * - If localStorage has a valid value → reuse it.
 * - Otherwise → assign uniformly at random and persist.
 */
export function getOrAssignHeroVariant(): HeroVariant {
  try {
    if (typeof window === "undefined" || !window.localStorage) return "B";

    const override = readQueryOverride();
    if (override) {
      window.localStorage.setItem(STORAGE_KEY, override);
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.info(`[ab] hero variant: ${override} (override)`);
      }
      return override;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isValid(stored)) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.info(`[ab] hero variant: ${stored} (stored)`);
      }
      return stored;
    }

    const assigned = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
    window.localStorage.setItem(STORAGE_KEY, assigned);
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.info(`[ab] hero variant: ${assigned} (assigned)`);
    }
    return assigned;
  } catch {
    return "B";
  }
}

/**
 * Reads the persisted variant without assigning. Use in downstream funnel
 * steps (quiz_start, lead_gate_submit, checkout_click) to attach the
 * `hero_variant` field to events without re-rolling.
 */
export function getHeroVariant(): HeroVariant | null {
  try {
    if (typeof window === "undefined" || !window.localStorage) return null;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isValid(stored) ? stored : null;
  } catch {
    return null;
  }
}
