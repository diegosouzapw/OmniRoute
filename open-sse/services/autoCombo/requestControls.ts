/**
 * Per-request Auto-Combo routing controls (#6023 / #6024 / #6025).
 *
 * These let a caller steer an `auto` combo on a single request via response-safe
 * request headers, without changing the combo's stored config:
 *
 *   X-OmniRoute-Mode:   fast | balanced | quality | <raw mode-pack name>  (#6024/#6025)
 *   X-OmniRoute-Budget: <max USD per request>                             (#6023)
 *
 * Both resolvers are pure so they can be unit-tested and reused by the entry
 * handler (src/sse/handlers/chat.ts) and the combo router (open-sse/services/combo.ts).
 * The resolved values feed the auto-combo engine's existing `config.modePack` /
 * `config.budgetCap` inputs — no engine changes required.
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
