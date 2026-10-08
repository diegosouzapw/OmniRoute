import { OAUTH_PROVIDERS } from "@/shared/constants/providers/oauth";
import { NOAUTH_PROVIDERS } from "@/shared/constants/providers/noauth";
import { APIKEY_PROVIDERS } from "@/shared/constants/providers/apikey";

/** Registry-canonical provider precedence: OAUTH -> NOAUTH -> APIKEY (canonical keys, not aliases). */
export const CANONICAL_PROVIDER_ORDER: readonly string[] = [
  ...Object.keys(OAUTH_PROVIDERS),
  ...Object.keys(NOAUTH_PROVIDERS),
  ...Object.keys(APIKEY_PROVIDERS),
];

// Single load-time pass (never resolve per sorted item: getProviderByAlias loops
// ~10 sections x providers, which costs more than the indexOf it replaces on ~1k catalog rows).
function buildRankResolved(): ReadonlyMap<string, number> {
  const rank = new Map<string, number>();
  CANONICAL_PROVIDER_ORDER.forEach((id, i) => rank.set(id, i));
  // Canonical keys win over homonym aliases (m-a: ~17 aliases like minimax-cn
  // are also canonical keys — an alias must never steal a canonical slot).
  const canonicals = new Set<string>(CANONICAL_PROVIDER_ORDER);
  for (const def of Object.values({
    ...OAUTH_PROVIDERS,
    ...NOAUTH_PROVIDERS,
    ...APIKEY_PROVIDERS,
  })) {
    const a = (def as { id: string; alias?: string }).alias;
    if (typeof a === "string" && a.length > 0 && !canonicals.has(a) && rank.has(def.id)) {
      rank.set(a, rank.get(def.id) as number);
    }
  }
  return rank;
}

const RANK_RESOLVED: ReadonlyMap<string, number> = buildRankResolved();

/** Finite rank (combos): alias resolved, unknown -> length (existing comboSort contract). */
export function providerRank(providerId: string): number {
  return RANK_RESOLVED.get(providerId) ?? CANONICAL_PROVIDER_ORDER.length;
}

/** Combo bucket key, distinct from any real provider id. Single definition (was also in catalogOrder.ts:45). */
export const COMBO_GROUP = " combo";

/** Catalog priority: combo first, then registry precedence, unknown -> Infinity (code-unit branch stays live). */
export function groupSortPriority(groupKey: string): number {
  if (groupKey === COMBO_GROUP) return -1;
  const r = RANK_RESOLVED.get(groupKey);
  return r ?? Infinity;
}
