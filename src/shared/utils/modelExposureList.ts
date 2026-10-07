/**
 * #11481 — explicit model exposure allow/deny list for the `/v1/models` catalog.
 *
 * Mirrors the opt-in shape of `hidePaidModels`/`hideAutoCombos`
 * (`src/lib/db/settings.ts`): default-off, two independent string arrays
 * (`modelVisibilityDenylist` / `modelVisibilityAllowlist`). An entry may be an
 * exact catalog id ("provider/model" or a bare "model") or a glob pattern
 * (`*`/`?`) via the shared `globToRegex` matcher already used by
 * `ModelRoutingSection`'s per-model combo mappings and
 * `freeModels.ts::matchesOnlyPaidModels` — no new matching logic.
 *
 * This predicate is the single chokepoint called from BOTH places the catalog
 * template requires (#6512's lesson: a catalog-only filter still leaks into
 * `auto/*` combo routing):
 *   - `src/app/api/v1/models/catalog.ts` (the `/v1/models` listing itself)
 *   - `open-sse/services/autoCombo/modelExposureFilter.ts` (the `auto/*`
 *     candidate-pool mirror)
 *
 * A model id sent EXPLICITLY (not via `auto/*`) is never blocked at dispatch —
 * only catalog advertisement / candidate-pool membership is filtered, exactly
 * like `hideAutoCombos` already behaves.
 */
import { globToRegex } from "./globPattern";

export interface ModelExposureListSettings {
  modelVisibilityAllowlist?: unknown;
  modelVisibilityDenylist?: unknown;
}

function normalizeList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string" && v.trim() !== "");
}

/** Whether any entry in `list` matches one of `candidates` — exact string match
 * first (the common case, no regex cost), falling back to a glob match only
 * when the entry actually contains a wildcard character. */
function listMatchesAny(list: string[], candidates: string[]): boolean {
  return list.some((entry) => {
    if (candidates.includes(entry)) return true;
    if (!/[*?]/.test(entry)) return false;
    let regex: RegExp;
    try {
      regex = globToRegex(entry);
    } catch {
      return false;
    }
    return candidates.some((candidate) => regex.test(candidate));
  });
}

/**
 * Whether a (provider, model) pair should be exposed given the operator's
 * allow/deny lists. Empty lists (the default) always expose — opt-in, off by
 * default, matching Hard Rule #20's "never mutate the operator's behaviour on
 * their behalf by default" spirit. Denylist is checked first (deny wins over
 * an overlapping allow entry); when the allowlist is non-empty, only entries
 * it matches survive.
 */
export function isModelExposureAllowed(
  provider: string,
  modelId: string,
  settings: ModelExposureListSettings | null | undefined
): boolean {
  const denylist = normalizeList(settings?.modelVisibilityDenylist);
  const allowlist = normalizeList(settings?.modelVisibilityAllowlist);
  if (denylist.length === 0 && allowlist.length === 0) return true;

  const candidates = [modelId, `${provider}/${modelId}`];
  if (listMatchesAny(denylist, candidates)) return false;
  if (allowlist.length === 0) return true;
  return listMatchesAny(allowlist, candidates);
}
