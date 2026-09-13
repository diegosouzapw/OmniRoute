/**
 * Pure provider alias resolution — no DB, no server-only side effects.
 *
 * Extracted from open-sse/services/model.ts so that client-reachable modules
 * (e.g. lib/combos/controlCenter.ts) can resolve provider aliases without
 * pulling in the DB → tokenHealthCheck → playwright/sharp chain.
 *
 * #13474
 */

import { PROVIDER_ID_TO_ALIAS } from "../config/providerModels.ts";

// Derive alias→provider mapping from the single source of truth (PROVIDER_ID_TO_ALIAS)
// This prevents the two maps from drifting out of sync
const ALIAS_TO_PROVIDER_ID: Record<string, string> = {};
for (const [id, alias] of Object.entries(PROVIDER_ID_TO_ALIAS)) {
  if (ALIAS_TO_PROVIDER_ID[alias]) {
    // Duplicate alias — last writer wins (matches model.ts behaviour)
  }
  ALIAS_TO_PROVIDER_ID[alias] = id;
}
// Manual alias overrides — maps slug-style prefixes to canonical provider IDs.
ALIAS_TO_PROVIDER_ID["opencode"] = "opencode-zen";
ALIAS_TO_PROVIDER_ID["xiaomi"] = "xiaomi-mimo";
ALIAS_TO_PROVIDER_ID["llamacpp"] = "llama-cpp";
ALIAS_TO_PROVIDER_ID["agy"] = "antigravity";
ALIAS_TO_PROVIDER_ID["aq"] = "amazon-q";

/**
 * Resolve provider alias to provider ID.
 *
 * Follows the alias chain transitively so intermediate alias-only hops resolve
 * to the final target, but stops as soon as a hop lands on a registered
 * provider id (#2901). Guarded against infinite loops with both a depth limit
 * and a seen-set.
 */
export function resolveProviderAlias(aliasOrId: string | null | undefined): string | null {
  if (typeof aliasOrId !== "string") return null;
  let current = aliasOrId;
  const seen = new Set<string>();
  for (let i = 0; i < 10; i++) {
    const next = ALIAS_TO_PROVIDER_ID[current];
    if (!next || next === current) return current;
    if (next in PROVIDER_ID_TO_ALIAS) return next;
    if (seen.has(next)) return next;
    seen.add(next);
    current = next;
  }
  return current;
}

/**
 * Return the raw alias→provider mapping for callers that need direct lookups.
 * Prefer `resolveProviderAlias` for normal resolution.
 */
export function getAliasToProviderId(): Readonly<Record<string, string>> {
  return ALIAS_TO_PROVIDER_ID;
}
