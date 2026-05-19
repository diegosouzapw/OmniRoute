/**
 * Anti-cheat system — server-side validation and anomaly detection.
 *
 * @module lib/gamification/antiCheat
 */

import { getDbInstance } from "../db/core";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ScoreValidation {
  allowed: boolean;
  reason?: string;
}

interface AnomalyFlag {
  apiKeyId: string;
  xpLastHour: number;
  zScore: number;
}

// ─── Statement / DB helpers (match gamification.ts pattern) ──────────────────

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

function db(): DbLike {
  return getDbInstance() as unknown as DbLike;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const MAX_XP_PER_WINDOW = 1000;
const ANOMALY_Z_THRESHOLD = 3;

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Validate a score change. Returns true if allowed, false if suspicious.
 */
export async function validateScoreChange(
  apiKeyId: string,
  _action: string,
  amount: number
): Promise<ScoreValidation> {
  // Rate limiting: max XP per window
  const recentXp = await getRecentXp(apiKeyId, RATE_LIMIT_WINDOW_MS);
  if (recentXp + amount > MAX_XP_PER_WINDOW) {
    return {
      allowed: false,
      reason: `Rate limit exceeded: ${recentXp + amount} > ${MAX_XP_PER_WINDOW} XP/min`,
    };
  }

  // Anomaly detection: check if this user's XP velocity is abnormal
  const isAnomaly = await detectAnomaly(apiKeyId);
  if (isAnomaly) {
    return { allowed: false, reason: "Anomalous XP velocity detected" };
  }

  return { allowed: true };
}

/**
 * Get flagged anomalies for admin review.
 */
export async function getAnomalies(): Promise<AnomalyFlag[]> {
  const d = db();

  const rows = d
    .prepare(
      `SELECT api_key_id, SUM(xp_earned) AS hourly_total
       FROM xp_audit_log
       WHERE created_at > datetime('now', '-1 hour')
       GROUP BY api_key_id
       HAVING hourly_total > 1000`
    )
    .all() as Array<{ api_key_id: string; hourly_total: number }>;

  return rows.map((r) => ({
    apiKeyId: r.api_key_id,
    xpLastHour: r.hourly_total,
    zScore: 0, // Simplified for now
  }));
}

// ─── Internal Helpers ────────────────────────────────────────────────────────

/**
 * Get total XP earned in the last N milliseconds.
 */
async function getRecentXp(apiKeyId: string, windowMs: number): Promise<number> {
  const d = db();
  const since = new Date(Date.now() - windowMs).toISOString();

  const row = d
    .prepare(
      "SELECT COALESCE(SUM(xp_earned), 0) AS total FROM xp_audit_log WHERE api_key_id = ? AND created_at > ?"
    )
    .get(apiKeyId, since) as { total: number };

  return row.total;
}

/**
 * Detect anomalous XP velocity using z-score.
 */
async function detectAnomaly(apiKeyId: string): Promise<boolean> {
  const d = db();

  // Get user's XP in last hour
  const userRow = d
    .prepare(
      `SELECT COALESCE(SUM(xp_earned), 0) AS total
       FROM xp_audit_log
       WHERE api_key_id = ? AND created_at > datetime('now', '-1 hour')`
    )
    .get(apiKeyId) as { total: number };

  // Get global stats
  const statsRow = d
    .prepare(
      `SELECT AVG(hourly_total) AS mean,
              CASE WHEN AVG(hourly_total) = 0 THEN 1
                   ELSE AVG(hourly_total * hourly_total) - AVG(hourly_total) * AVG(hourly_total)
              END AS variance
       FROM (
         SELECT api_key_id, SUM(xp_earned) AS hourly_total
         FROM xp_audit_log
         WHERE created_at > datetime('now', '-1 hour')
         GROUP BY api_key_id
       )`
    )
    .get() as { mean: number; variance: number } | undefined;

  if (!statsRow || statsRow.variance <= 0) return false;

  const stdDev = Math.sqrt(statsRow.variance);
  const zScore = (userRow.total - statsRow.mean) / stdDev;

  return zScore > ANOMALY_Z_THRESHOLD;
}
