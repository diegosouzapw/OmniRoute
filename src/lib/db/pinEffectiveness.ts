/**
 * db/pinEffectiveness.ts — Context-cache pinning effectiveness counters.
 *
 * Tracks whether server-side context-cache pinning (session_model_history) is
 * helping or hurting, per combo (PR2A / Pin Recovery):
 *   - kept      — a pin was validated against the incoming request and honored.
 *   - invalid   — a pin was dropped by the capability-aware validation layer
 *                 (tools/vision/context/cooldown/learned-gap mismatch).
 *   - repinned  — a session's pin moved to a different model (a switch happened,
 *                 which is what pinning is supposed to minimise).
 *
 * Average pin lifetime is derived on read from session_model_history (time a
 * session stays on one model), so it needs no extra writes.
 *
 * All writers are fail-open: a counter write must never block a request.
 */

import { getDbInstance } from "./core";

export interface PinEffectivenessStats {
  comboName: string;
  keptCount: number;
  invalidCount: number;
  repinnedCount: number;
  lastInvalidAt: string | null;
  lastInvalidReason: string | null;
  /** Mean time a session stayed on one pinned model, in ms (null when <2 pins). */
  avgLifetimeMs: number | null;
}

const COUNTER_SELECT = `kept_count AS keptCount, invalid_count AS invalidCount,
  repinned_count AS repinnedCount, last_invalid_at AS lastInvalidAt,
  last_invalid_reason AS lastInvalidReason`;

function upsertCounter(
  comboName: string,
  increments: Partial<Record<"kept" | "invalid" | "repinned", number>>,
  extra: { invalidReason?: string } = {}
): void {
  if (!comboName) return;
  try {
    const db = getDbInstance();
    const now = new Date().toISOString();
    const kept = increments.kept ?? 0;
    const invalid = increments.invalid ?? 0;
    const repinned = increments.repinned ?? 0;
    const reason = extra.invalidReason ?? null;
    db.prepare(
      `INSERT INTO pin_effectiveness
         (combo_name, kept_count, invalid_count, repinned_count, last_invalid_at, last_invalid_reason, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(combo_name) DO UPDATE SET
         kept_count = kept_count + excluded.kept_count,
         invalid_count = invalid_count + excluded.invalid_count,
         repinned_count = repinned_count + excluded.repinned_count,
         last_invalid_at = COALESCE(excluded.last_invalid_at, last_invalid_at),
         last_invalid_reason = COALESCE(excluded.last_invalid_reason, last_invalid_reason),
         updated_at = excluded.updated_at`
    ).run(comboName, kept, invalid, repinned, reason ? now : null, reason, now);
  } catch {
    // fail-open — counters must never block a request
  }
}

/** A validated pin was honored for the combo. */
export function recordPinKept(comboName: string): void {
  upsertCounter(comboName, { kept: 1 });
}

/** A pin was dropped by the capability-aware validation layer. */
export function recordPinInvalid(comboName: string, reason: string): void {
  upsertCounter(comboName, { invalid: 1 }, { invalidReason: reason });
}

/** A session's pin moved to a different model (forced re-pin). */
export function recordPinRepinned(comboName: string): void {
  upsertCounter(comboName, { repinned: 1 });
}

/**
 * Average pin lifetime for a combo: mean duration a session stays pinned to one
 * model, derived from session_model_history. The final (still-open) segment of
 * each session is measured up to `now`, so the average converges as sessions age.
 */
function computeAvgPinLifetimeMs(comboName: string, now: number): number | null {
  try {
    const db = getDbInstance();
    const rows = db
      .prepare(
        `SELECT session_id AS sessionId, model_str AS modelStr, used_at AS usedAt
         FROM session_model_history
         WHERE combo_name = ?
         ORDER BY session_id ASC, id ASC`
      )
      .all(comboName) as Array<{ sessionId: string; modelStr: string; usedAt: string }>;

    const segmentsBySession = new Map<string, number>();
    const modelBySession = new Map<string, string>();
    let totalLifetimeMs = 0;
    let segmentCount = 0;

    for (const row of rows) {
      const session = row.sessionId;
      const model = row.modelStr;
      const at = Date.parse(
        row.usedAt.includes("T") ? row.usedAt : `${row.usedAt.replace(" ", "T")}Z`
      );
      if (!Number.isFinite(at)) continue;

      const previousStart = segmentsBySession.get(session);
      const previousModel = modelBySession.get(session);
      if (previousStart !== undefined && previousModel !== undefined && previousModel !== model) {
        // Closed the previous segment when the model changed.
        totalLifetimeMs += at - previousStart;
        segmentCount += 1;
      }
      segmentsBySession.set(session, at);
      modelBySession.set(session, model);
    }

    // Close the still-open final segment of every session (up to now).
    for (const [session, start] of segmentsBySession) {
      totalLifetimeMs += now - start;
      segmentCount += 1;
    }

    if (segmentCount === 0) return null;
    return Math.round(totalLifetimeMs / segmentCount);
  } catch {
    return null;
  }
}

export function getPinEffectiveness(comboName: string, now = Date.now()): PinEffectivenessStats {
  const fallback: PinEffectivenessStats = {
    comboName,
    keptCount: 0,
    invalidCount: 0,
    repinnedCount: 0,
    lastInvalidAt: null,
    lastInvalidReason: null,
    avgLifetimeMs: null,
  };
  try {
    const row = getDbInstance()
      .prepare(`SELECT ${COUNTER_SELECT} FROM pin_effectiveness WHERE combo_name = ?`)
      .get(comboName) as PinEffectivenessStats | undefined;
    return {
      comboName,
      keptCount: row?.keptCount ?? 0,
      invalidCount: row?.invalidCount ?? 0,
      repinnedCount: row?.repinnedCount ?? 0,
      lastInvalidAt: row?.lastInvalidAt ?? null,
      lastInvalidReason: row?.lastInvalidReason ?? null,
      avgLifetimeMs: computeAvgPinLifetimeMs(comboName, now),
    };
  } catch {
    return fallback;
  }
}
