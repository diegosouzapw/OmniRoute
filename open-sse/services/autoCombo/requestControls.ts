/**
 * Per-request Auto-Combo routing controls (#6023 / #6024 / #6025 / #3470).
 *
 * These let a caller steer an `auto` combo on a single request via response-safe
 * request headers, without changing the combo's stored config:
 *
 *   X-OmniRoute-Mode:            fast | balanced | quality | <raw mode-pack name>  (#6024/#6025)
 *   X-OmniRoute-Budget:          <max USD per request>                             (#6023)
 *   X-OmniRoute-Budget-Fallback: cheapest | strict                                 (#3470)
 *
 * All resolvers are pure so they can be unit-tested and reused by the entry
 * handler (src/sse/handlers/chat.ts) and the combo router (open-sse/services/combo.ts).
 * The resolved values feed the auto-combo engine's existing `config.modePack` /
 * `config.budgetCap` / `config.budgetFallback` inputs.
 */

import { MODE_PACKS } from "./modePacks";

/**
 * Friendly latency-vs-quality preset aliases (#6024). These map human-facing
 * preset names to the concrete scoring mode packs the engine already ships.
 * `balanced`/`default` are handled specially (they mean "no pack" = default weights).
 */
const MODE_PACK_ALIASES: Record<string, string> = {
  fast: "ship-fast",
  fastest: "ship-fast",
  speed: "ship-fast",
  quality: "quality-first",
  best: "quality-first",
  cheap: "cost-saver",
  cost: "cost-saver",
  saver: "cost-saver",
  reliable: "reliability-first",
  offline: "offline-friendly",
};

export interface RequestModePack {
  /** True when the request explicitly selected a mode (overrides combo config). */
  override: boolean;
  /** Resolved mode-pack name, or undefined for the balanced/default profile. */
  modePack: string | undefined;
}

/**
 * Resolve the `X-OmniRoute-Mode` header value into a mode-pack override.
 *
 * - A friendly alias (`fast`, `quality`, `cheap`, …) or a raw mode-pack name
 *   (`ship-fast`, `quality-first`, …) → `{ override: true, modePack: <name> }`.
 * - `balanced` / `default` → `{ override: true, modePack: undefined }` (default weights).
 * - Unknown / empty / non-string → `{ override: false }` so the combo's own
 *   stored `modePack` config is preserved.
 */
export function resolveRequestModePack(input: unknown): RequestModePack {
  const noOverride: RequestModePack = { override: false, modePack: undefined };
  if (typeof input !== "string") return noOverride;
  const key = input.trim().toLowerCase();
  if (!key) return noOverride;
  if (key === "balanced" || key === "default") return { override: true, modePack: undefined };
  if (Object.prototype.hasOwnProperty.call(MODE_PACKS, key)) {
    return { override: true, modePack: key };
  }
  const alias = MODE_PACK_ALIASES[key];
  if (alias) return { override: true, modePack: alias };
  return noOverride;
}

/**
 * Parse the `X-OmniRoute-Budget` header into a hard per-request cost ceiling (USD).
 * Only a finite, strictly-positive amount is accepted; anything else returns
 * `undefined` so the combo's own stored `budgetCap` (if any) stays in effect.
 */
export function parseRequestBudgetCap(input: unknown): number | undefined {
  const n =
    typeof input === "number"
      ? input
      : typeof input === "string"
        ? Number(input.trim())
        : NaN;
  if (!Number.isFinite(n) || n <= 0) return undefined;
  return n;
}

/** Policy applied when every candidate exceeds `budgetCap` — see `AutoComboConfig.budgetFallback`. */
export type RequestBudgetFallback = "cheapest" | "strict";

/**
 * Parse the `X-OmniRoute-Budget-Fallback` header into a budget-fallback policy override.
 * Unknown/empty/non-string values return `undefined` so the combo's own stored
 * `config.budgetFallback` (or the engine default of `"cheapest"`) stays in effect.
 */
export function parseRequestBudgetFallback(input: unknown): RequestBudgetFallback | undefined {
  if (typeof input !== "string") return undefined;
  const key = input.trim().toLowerCase();
  if (key === "strict" || key === "block" || key === "hard") return "strict";
  if (key === "cheapest" || key === "cheapest-viable" || key === "soft") return "cheapest";
  return undefined;
}

/** Aggregated per-request auto-combo overrides resolved from request headers (#3470). */
export interface PerRequestAutoControls {
  mode?: string;
  budgetCap?: number;
  budgetFallback?: RequestBudgetFallback;
}

/**
 * Resolve all per-request Auto-Combo headers in one pass, returning only the keys
 * that were actually overridden. Consolidates `resolveRequestModePack()` /
 * `parseRequestBudgetCap()` / `parseRequestBudgetFallback()` so entry handlers (e.g.
 * `src/sse/handlers/chat.ts`) can thread a single object into `relayOptions` instead
 * of repeating the per-header boilerplate for each new control.
 */
export function resolveRequestAutoControls(headers: {
  get(name: string): string | null;
}): PerRequestAutoControls {
  const modeHeader = headers.get("x-omniroute-mode")?.trim() || null;
  const budgetHeader = headers.get("x-omniroute-budget")?.trim() || null;
  const budgetFallbackHeader = headers.get("x-omniroute-budget-fallback")?.trim() || null;

  const mode = resolveRequestModePack(modeHeader);
  const budgetCap = parseRequestBudgetCap(budgetHeader);
  const budgetFallback = parseRequestBudgetFallback(budgetFallbackHeader);

  return {
    ...(mode.override && modeHeader ? { mode: modeHeader } : {}),
    ...(budgetCap !== undefined ? { budgetCap } : {}),
    ...(budgetFallback !== undefined ? { budgetFallback } : {}),
  };
}
