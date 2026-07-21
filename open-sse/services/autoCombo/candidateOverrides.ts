/**
 * #7819 (Level 2) — per-API-key candidate exclusions for `auto/*` channels.
 *
 * Pure, dependency-light filter kept separate from `virtualFactory.ts` so it
 * is unit-testable in isolation, mirroring `paidModelFilter.ts` in this same
 * directory (`filterPaidOnlyCandidates`). Fail-open by design: an empty
 * exclusion set is the identity function (near-zero overhead on the
 * unconfigured hot path), and any caller-side lookup failure should pass the
 * candidate pool through unfiltered rather than break routing.
 */

interface OverridableCandidate {
  connectionId: string | null;
  allowedConnectionIds?: string[];
}

/**
 * Return the candidate pool with excluded connection IDs removed. Returns
 * the SAME array reference (identity) when there is nothing to filter, so
 * callers can cheaply detect "unchanged" the same way
 * `filterPaidOnlyCandidates` does.
 */
export function filterExcludedCandidates<T extends OverridableCandidate>(
  pool: T[],
  excludedConnectionIds: Set<string>
): T[] {
  if (!excludedConnectionIds || excludedConnectionIds.size === 0) return pool;

  return pool.flatMap((candidate) => {
    if (Array.isArray(candidate.allowedConnectionIds)) {
      const allowedConnectionIds = candidate.allowedConnectionIds.filter(
        (connectionId) => !excludedConnectionIds.has(connectionId)
      );
      if (allowedConnectionIds.length === 0) return [];
      if (allowedConnectionIds.length === candidate.allowedConnectionIds.length) {
        return [candidate];
      }
      return [{ ...candidate, allowedConnectionIds }];
    }

    return candidate.connectionId && excludedConnectionIds.has(candidate.connectionId)
      ? []
      : [candidate];
  });
}
