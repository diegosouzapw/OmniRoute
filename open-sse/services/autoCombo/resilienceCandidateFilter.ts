/**
 * #7623 — exclude models/connections the existing resilience runtime already
 * marked unavailable from `auto/*` candidate pools.
 *
 * Uses the same reads as dispatch-time account selection and the #7819
 * candidate inspector (`isModelLocked`, connection cooldown / testStatus).
 * Pure filter kept separate from `virtualFactory.ts` for unit testing, mirroring
 * `paidModelFilter.ts` and `candidateOverrides.ts` in this directory.
 */
import { isAccountUnavailable, isModelLocked } from "../accountFallback.ts";

export const SYNTHETIC_NOAUTH_CONNECTION_ID = "noauth";

const TERMINAL_CONNECTION_STATUSES = new Set([
  "banned",
  "expired",
  "credits_exhausted",
  "deactivated",
]);

interface ResilienceFilterCandidate {
  provider: string;
  connectionId: string | null;
  allowedConnectionIds?: string[];
  model: string;
}

export interface ConnectionResilienceView {
  id: string;
  rateLimitedUntil?: string | null;
  testStatus?: string | null;
}

function isConnectionResilienceBlocked(connection: ConnectionResilienceView): boolean {
  if (isAccountUnavailable(connection.rateLimitedUntil)) return true;
  const status = connection.testStatus;
  if (status === "unavailable") return true;
  if (typeof status === "string" && TERMINAL_CONNECTION_STATUSES.has(status)) return true;
  return false;
}

function isConnectionEligibleForModel(
  provider: string,
  connectionId: string,
  model: string,
  connectionsById: Map<string, ConnectionResilienceView>
): boolean {
  const connection = connectionsById.get(connectionId);
  if (connection && isConnectionResilienceBlocked(connection)) return false;
  return !isModelLocked(provider, connectionId, model);
}

/**
 * Remove auto-combo candidates whose provider/model pair is model-locked, and
 * trim credentialed logical candidates whose allowed connections are all blocked.
 * Returns the input reference when nothing changed.
 */
export function filterResilienceBlockedCandidates<T extends ResilienceFilterCandidate>(
  pool: T[],
  connectionsById: Map<string, ConnectionResilienceView>
): T[] {
  if (!Array.isArray(pool) || pool.length === 0) return pool;

  let changed = false;
  const filtered = pool.flatMap((candidate) => {
    if (candidate.connectionId === SYNTHETIC_NOAUTH_CONNECTION_ID) {
      if (isModelLocked(candidate.provider, SYNTHETIC_NOAUTH_CONNECTION_ID, candidate.model)) {
        changed = true;
        return [];
      }
      return [candidate];
    }

    if (Array.isArray(candidate.allowedConnectionIds)) {
      const allowedConnectionIds = candidate.allowedConnectionIds.filter((connectionId) =>
        isConnectionEligibleForModel(
          candidate.provider,
          connectionId,
          candidate.model,
          connectionsById
        )
      );
      if (allowedConnectionIds.length === 0) {
        changed = true;
        return [];
      }
      if (allowedConnectionIds.length === candidate.allowedConnectionIds.length) {
        return [candidate];
      }
      changed = true;
      return [{ ...candidate, allowedConnectionIds }];
    }

    if (candidate.connectionId) {
      if (
        !isConnectionEligibleForModel(
          candidate.provider,
          candidate.connectionId,
          candidate.model,
          connectionsById
        )
      ) {
        changed = true;
        return [];
      }
    }

    return [candidate];
  });

  return changed ? filtered : pool;
}
