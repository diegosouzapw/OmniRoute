/**
 * db/providers/rateLimit.ts — Rate-limit/quota runtime helpers for provider_connections.
 */

import { getDbInstance } from "../core";
import { invalidateDbCache } from "../readCache";

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes?: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

// ──────────────── T05: Rate-Limit DB Persistence ──────────────────────────
// Allows rate-limit state to survive token refresh without being accidentally
// cleared. DB column rate_limited_until already exists in schema.
// Ref: sub2api PR #1218 (fix(openai): prevent rescheduling rate-limited accounts)

/**
 * T05: Persist when a connection is rate-limited, directly in DB.
 * This survives token refresh — OAuth flows must NOT override this field.
 *
 * @param connectionId - The provider_connections.id
 * @param until - Epoch ms when the rate limit expires (null to clear)
 */
export function setConnectionRateLimitUntil(connectionId: string, until: number | null): void {
  const db = getDbInstance() as unknown as DbLike;
  db.prepare(
    "UPDATE provider_connections SET rate_limited_until = ?, updated_at = ? WHERE id = ?"
  ).run(until, new Date().toISOString(), connectionId);
  invalidateDbCache("connections");
}

/**
 * T05: Check if a connection is currently rate-limited (DB-backed).
 * Use this before account selection to skip transiently rate-limited accounts.
 *
 * @returns true if rate_limited_until is set and in the future
 */
export function isConnectionRateLimited(connectionId: string): boolean {
  const db = getDbInstance() as unknown as DbLike;
  const row = db
    .prepare("SELECT rate_limited_until FROM provider_connections WHERE id = ?")
    .get(connectionId) as { rate_limited_until?: number | null } | undefined;
  if (!row?.rate_limited_until) return false;
  return Date.now() < row.rate_limited_until;
}

/**
 * T05: Get all connections for a provider that are currently rate-limited.
 * Returns an array of { id, rateLimitedUntil } for dashboard display.
 */
export function getRateLimitedConnections(
  provider: string
): Array<{ id: string; rateLimitedUntil: number }> {
  const db = getDbInstance() as unknown as DbLike;
  const now = Date.now();
  const rows = db
    .prepare(
      "SELECT id, rate_limited_until FROM provider_connections WHERE provider = ? AND rate_limited_until > ?"
    )
    .all(provider, now) as Array<{ id: string; rate_limited_until: number }>;
  return rows.map((r) => ({ id: r.id, rateLimitedUntil: r.rate_limited_until }));
}

// ──────────────── T13: Stale Quota Display Fix ─────────────────────────────
// Codex/Claude quotas display stale cumulative usage after the window resets.
// By comparing resetAt timestamp to now(), we can show 0 when window has passed.
// Ref: sub2api PR #1171 (fix: quota display shows stale cumulative usage after reset)

/**
 * T13: Get effective quota usage, zeroing it out if the window has already reset.
 *
 * @param used - Stored usage value (tokens used in the window)
 * @param resetAt - ISO-8601 string or epoch ms when the window resets, or null
 * @returns Effective usage: 0 if window expired, original value otherwise
 */
export function getEffectiveQuotaUsage(
  used: number,
  resetAt: string | number | null | undefined
): number {
  if (!resetAt) return used;
  const resetTime = typeof resetAt === "number" ? resetAt : new Date(resetAt).getTime();
  if (isNaN(resetTime)) return used;
  // Window has passed — display should show 0 (pending next snapshot)
  if (Date.now() >= resetTime) return 0;
  return used;
}

/**
 * T05: Startup crash-recovery — clear stale transient connection cooldowns.
 *
 * After an unclean crash (SIGKILL, OOM-kill, large-body burst) the normal
 * error-handler paths that would clear/normalise cooldowns never run.
 * A connection's `rate_limited_until` may have been pushed far into the
 * future by exponential back-off.  On next startup that leaves all affected
 * connections excluded by `getProviderCredentials()`, so every request sits
 * in the Bottleneck queue and times out at `maxWaitMs` (120 s default).
 *
 * Safe invariants:
 *  - Only connections with `rate_limited_until IS NOT NULL` are touched.
 *  - Terminal states (`banned`, `expired`, `credits_exhausted`) are skipped —
 *    those require a deliberate credential change or operator reset.
 *  - Past timestamps are also cleared: they are already expired in the lazy
 *    expiry sense, but clearing them resets `backoffLevel` / transient error
 *    fields so the connection gets a clean slate on this fresh process.
 *
 * Must be called once, early in the startup sequence, before any request
 * is handled.  Returns the number of connections that were cleared.
 */
export function clearStaleCrashCooldowns(): { cleared: number } {
  const db = getDbInstance() as unknown as DbLike;
  const now = new Date().toISOString();

  // Fetch all connections that have a rate_limited_until set and are NOT in
  // a terminal state.  We do the terminal-status filter in JS to reuse the
  // canonical `TERMINAL_STATUSES` set rather than duplicating the list in SQL.
  const TERMINAL_STATUSES = new Set(["banned", "expired", "credits_exhausted"]);

  const rows = db
    .prepare(
      `SELECT id, test_status FROM provider_connections WHERE rate_limited_until IS NOT NULL`
    )
    .all() as Array<{ id: string; test_status: string | null }>;

  const toReset = rows.filter((r) => {
    const status = (r.test_status || "").trim().toLowerCase();
    return !TERMINAL_STATUSES.has(status);
  });

  if (toReset.length === 0) return { cleared: 0 };

  const stmt = db.prepare(
    `UPDATE provider_connections SET
       rate_limited_until = NULL,
       test_status        = 'active',
       backoff_level      = 0,
       last_error         = NULL,
       last_error_at      = NULL,
       last_error_type    = NULL,
       last_error_source  = NULL,
       error_code         = NULL,
       updated_at         = ?
     WHERE id = ?`
  );

  for (const row of toReset) {
    stmt.run(now, row.id);
  }

  invalidateDbCache("connections");

  return { cleared: toReset.length };
}

/**
 * T13: Format a reset countdown as a human-readable string: "2h 35m" or "4m 30s".
 * Returns null if resetAt is in the past or not set.
 */
export function formatResetCountdown(resetAt: string | number | null | undefined): string | null {
  if (!resetAt) return null;
  const resetTime = typeof resetAt === "number" ? resetAt : new Date(resetAt).getTime();
  if (isNaN(resetTime)) return null;
  const diffMs = resetTime - Date.now();
  if (diffMs <= 0) return null;
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}
