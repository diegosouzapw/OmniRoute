/**
 * Canonical numeric coercion helpers — DRY extraction from ~51 near-identical
 * local `toNumber` definitions scattered across `src/` and `open-sse/` (#7879).
 *
 * All three variants share the SAME strict coercion shape as the dominant
 * pre-existing pattern found across the codebase:
 *   - `number` inputs pass through only when `Number.isFinite`.
 *   - `string` inputs are `trim()`-med first; empty/whitespace-only strings
 *     are treated as absent. The trimmed string is coerced with `Number(...)`
 *     and accepted only when the result is finite (rejects `"12abc"`,
 *     `"Infinity"`, `"NaN"`, etc).
 *   - Every other type (`null`, `undefined`, `boolean`, `object`, `array`, ...)
 *     is treated as absent.
 *
 * This is intentionally the STRICT variant — it does NOT use `parseFloat`
 * (which would accept `"12abc"` -> `12`). A small number of call sites in the
 * codebase intentionally keep `parseFloat` (leniency is a documented,
 * deliberate behavior choice there, not a bug) — see
 * `open-sse/services/crofUsageFetcher.ts` for the annotated exception.
 *
 * Migration is happening tier-by-tier (report/analytics first, then
 * quota/billing, then hot-path auth/costRules/combo) to avoid silently
 * changing fallback semantics anywhere cost or quota math depends on it.
 * See the issue for the full plan.
 */

/**
 * Coerce an unknown value to a finite number, or return `fallback` (default
 * `0`) when the value cannot be strictly coerced.
 *
 * @param v - the value to coerce.
 * @param fallback - value returned when coercion fails (default `0`).
 */
export function toNumber(v: unknown, fallback = 0): number {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim().length > 0) {
    const parsed = Number(v.trim());
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

/**
 * Coerce an unknown value to a finite number, or `null` when the value
 * cannot be strictly coerced. Same coercion shape as {@link toNumber}, but
 * with a `null` fallback instead of `0` — useful where "absent" must stay
 * distinguishable from "zero" downstream (e.g. optional metrics).
 */
export function toNumberOrNull(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim().length > 0) {
    const parsed = Number(v.trim());
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

/**
 * Coerce an unknown value to an array of finite numbers.
 *
 * - Non-array inputs return `fallback` (default `[]`) unchanged.
 * - Each array element is coerced independently via {@link toNumber}; an
 *   element that fails to coerce becomes `0` (NOT the array-level
 *   `fallback` — the two fallbacks are intentionally independent so a
 *   caller can distinguish "no array at all" from "one bad element").
 */
export function toNumberArray(v: unknown, fallback: number[] = []): number[] {
  if (!Array.isArray(v)) return fallback;
  return v.map((item) => toNumber(item, 0));
}
