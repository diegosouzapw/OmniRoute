/**
 * freeProviderRankingsAuthType.ts — Pure Type-filter/sort helpers for the Free
 * Provider Rankings page (#6915).
 *
 * Deliberately split out of `freeProviderRankings.ts`: that module imports
 * DB-touching code (`./db/modelIntelligence`, `./db/providers`,
 * `./db/models`) at module scope, so importing a runtime value from it
 * (rather than only types) would pull server-only DB wiring into the
 * "use client" page's bundle. This module has zero imports beyond a shared
 * type, so it is safe to import from client components.
 */

import type { FreeProviderRanking } from "./freeProviderRankings";

export type ProviderAuthType = "noauth" | "oauth" | "apikey";

const AUTH_TYPE_ORDER: Record<ProviderAuthType, number> = {
  noauth: 0,
  oauth: 1,
  apikey: 2,
};

/**
 * Pure filter: keep only rankings whose `category` (auth type) matches `type`.
 * `type` falsy/omitted returns the input unchanged (#6915 — "All" filter state).
 */
export function filterRankingsByAuthType(
  rankings: FreeProviderRanking[],
  type?: ProviderAuthType | ""
): FreeProviderRanking[] {
  if (!type) return rankings;
  return rankings.filter((r) => r.category === type);
}

/**
 * Pure stable sort: group NOAUTH first, then OAUTH, then APIKEY. Relies on
 * `Array.prototype.sort` being stable (guaranteed ES2019+, our Node engine
 * range is >=22), so the existing score-descending order from
 * `computeFreeProviderRankings` is preserved *within* each auth-type group
 * (#6915 — "least effort" and "best quality" compose instead of fighting).
 */
export function sortRankingsAuthTypeFirst(
  rankings: FreeProviderRanking[]
): FreeProviderRanking[] {
  return [...rankings].sort((a, b) => AUTH_TYPE_ORDER[a.category] - AUTH_TYPE_ORDER[b.category]);
}
