/**
 * Filter candidates whose model is locked on every usable connection.
 *
 * A candidate is kept when at least one of its connection ids is not locked;
 * when only some are locked the candidate is kept with `allowedConnectionIds`
 * rewritten to the unlocked subset (same rewrite the STRICT filter applies).
 * Candidates without any usable connection id are kept untouched — the lockout
 * check needs a real id to decide anything.
 */
export type LockoutDiagnosis = { excludedLockout: number; total: number };

export interface LockoutCandidate {
  provider: string;
  model: string;
  connectionId?: string | null;
  allowedConnectionIds?: string[];
}

export function filterLockoutCandidates<T extends LockoutCandidate>(
  pool: T[],
  deps: { isModelLocked: (provider: string, connectionId: string, model: string) => boolean }
): { pool: T[]; diagnosis: LockoutDiagnosis | null } {
  if (pool.length === 0) return { pool, diagnosis: null };
  let excluded = 0;
  const kept: T[] = [];
  for (const candidate of pool) {
    const ids = candidate.connectionId
      ? [candidate.connectionId]
      : (candidate.allowedConnectionIds ?? []);
    if (ids.length === 0) {
      kept.push(candidate);
      continue;
    }
    let alive: string[];
    try {
      alive = ids.filter((id) => {
        try {
          return !deps.isModelLocked(candidate.provider, id, candidate.model);
        } catch {
          return true;
        }
      });
    } catch {
      alive = ids;
    }
    if (alive.length === 0) {
      excluded++;
      continue;
    }
    if (alive.length !== ids.length) kept.push({ ...candidate, allowedConnectionIds: alive } as T);
    else kept.push(candidate);
  }
  return {
    pool: kept,
    diagnosis: excluded > 0 ? { excludedLockout: excluded, total: pool.length } : null,
  };
}
