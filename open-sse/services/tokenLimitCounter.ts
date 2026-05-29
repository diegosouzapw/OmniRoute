/**
 * Token Limit Counter — in-memory write-through accelerator.
 *
 * The DB (api_key_token_counters) is the source of truth for enforcement.
 * This module keeps a short-lived in-memory mirror of the current window's
 * usage per limit to avoid a DB round-trip on every hot-path read, and seeds
 * a cold window by SUMming usage_history for the active window when no counter
 * row exists yet.
 *
 * Steps 006/007 (checkTokenLimits / recordTokenUsage) build on top of this.
 *
 * @module services/tokenLimitCounter
 */

import { getDbInstance } from "../../src/lib/db/core.ts";
import {
  resetWindowIfElapsed,
  getWindowUsage,
  incrementWindowTokens,
  getTokenLimitsForRequest,
  logTokenLimitReset,
  type TokenLimit,
} from "@/lib/localDb";

interface CacheEntry {
  windowStart: string;
  tokensUsed: number;
  /** epoch-ms when this cache entry was last synced from / written to the DB */
  syncedAt: number;
}

/** key = `${limitId}` ; value tracks the *current* window only */
const cache = new Map<string, CacheEntry>();

/** Cache entries older than this are re-validated against the DB on read. */
const CACHE_TTL_MS = 5_000;

/**
 * Sum billable tokens recorded in usage_history for this limit's API key within
 * the active window, filtered by scope (model / provider / global). Used to seed
 * a cold counter so enforcement is correct even before the first write-through.
 *
 * Returns the windowed total (>= 0). DB-authoritative point-in-time read.
 */
export function seedWindowUsageFromHistory(limit: TokenLimit, now = Date.now()): number {
  const { periodStartAt } = resetWindowIfElapsed(limit, now);
  const lowerBound = new Date(periodStartAt).toISOString();
  const db = getDbInstance();

  // Canonical billable total = input + output + reasoning. tokens_cache_read and
  // tokens_cache_creation are a BREAKDOWN already inside tokens_input (see migration
  // 012_fix_token_input_cache_tokens.sql) — summing them again would double-count.
  // This must mirror computeBillableTokens() in chatCore.ts.
  const tokenSum = `COALESCE(SUM(
      COALESCE(tokens_input, 0) + COALESCE(tokens_output, 0)
      + COALESCE(tokens_reasoning, 0)
    ), 0) AS total`;

  let row: unknown;
  if (limit.scopeType === "model") {
    row = db
      .prepare(
        `SELECT ${tokenSum} FROM usage_history
         WHERE api_key_id = ? AND model = ? AND timestamp >= ?`
      )
      .get(limit.apiKeyId, limit.scopeValue, lowerBound);
  } else if (limit.scopeType === "provider") {
    row = db
      .prepare(
        `SELECT ${tokenSum} FROM usage_history
         WHERE api_key_id = ? AND provider = ? AND timestamp >= ?`
      )
      .get(limit.apiKeyId, limit.scopeValue, lowerBound);
  } else {
    row = db
      .prepare(
        `SELECT ${tokenSum} FROM usage_history
         WHERE api_key_id = ? AND timestamp >= ?`
      )
      .get(limit.apiKeyId, lowerBound);
  }

  const total = row && typeof row === "object" ? (row as { total?: unknown }).total : 0;
  const n = typeof total === "number" ? total : Number(total);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}

/**
 * Current-window usage for a limit. DB is authoritative; the in-memory cache is
 * a read accelerator only. On a fresh window with no DB counter row, seeds the
 * value from usage_history so enforcement is correct immediately.
 *
 * `forceFresh` bypasses the cache (used by the authoritative enforcement read).
 */
export function getCurrentWindowUsage(
  limit: TokenLimit,
  now = Date.now(),
  forceFresh = false
): number {
  const { windowStart } = resetWindowIfElapsed(limit, now);
  const cached = cache.get(limit.id);

  if (
    !forceFresh &&
    cached &&
    cached.windowStart === windowStart &&
    now - cached.syncedAt < CACHE_TTL_MS
  ) {
    return cached.tokensUsed;
  }

  // DB point-read (authoritative for the window).
  let dbUsage = getWindowUsage(limit, now);

  // Cold window: no counter row yet → seed from usage_history and PERSIST the
  // seed to the counter row so a subsequent recordTokenUsage increment does not
  // forget the existing historical usage in this window (force-fresh read then
  // first record must accumulate on top of history, not restart from 0).
  if (dbUsage === 0 && (!cached || cached.windowStart !== windowStart)) {
    const seeded = seedWindowUsageFromHistory(limit, now);
    if (seeded > 0) {
      // UPSERT creates the row at `seeded`; safe because there is no row yet
      // (dbUsage === 0). Returns the new authoritative total.
      dbUsage = incrementWindowTokens(limit.id, windowStart, seeded);
    }
  }

  cache.set(limit.id, { windowStart, tokensUsed: dbUsage, syncedAt: now });
  return dbUsage;
}

/**
 * Atomically add `tokens` to the DB counter for the limit's current window and
 * update the in-memory cache to the new authoritative total. Returns the total.
 *
 * NOTE: callers that need transactional reset-detection (step 007) should call
 * the DB increment inside their own transaction; this helper is the simple
 * write-through used outside a transaction.
 */
export function addWindowTokens(limit: TokenLimit, tokens: number, now = Date.now()): number {
  const { windowStart } = resetWindowIfElapsed(limit, now);
  const delta = tokens > 0 ? Math.floor(tokens) : 0;
  const newTotal = incrementWindowTokens(limit.id, windowStart, delta);
  cache.set(limit.id, { windowStart, tokensUsed: newTotal, syncedAt: now });
  return newTotal;
}

/** Overwrite the cache entry for a limit (e.g. after a transactional increment in step 007). */
export function syncCache(limitId: string, windowStart: string, tokensUsed: number): void {
  cache.set(limitId, { windowStart, tokensUsed, syncedAt: Date.now() });
}

/** Drop a single limit's cache entry (e.g. on limit delete/update). */
export function invalidateLimit(limitId: string): void {
  cache.delete(limitId);
}

/** Clear the whole cache (tests / config reload). */
export function clearTokenLimitCache(): void {
  cache.clear();
}

/**
 * Breach detail returned when an applicable token limit is exceeded. `remaining`
 * is `limitValue - tokensUsed` (clamped at 0). The breach with the SMALLEST
 * remaining is the most-restrictive and is the one returned by checkTokenLimits.
 */
export interface TokenLimitBreach {
  limitId: string;
  scopeType: TokenLimit["scopeType"];
  scopeValue: string;
  limitValue: number;
  tokensUsed: number;
  remaining: number;
  windowStart: string;
  nextResetAt: number;
}

/**
 * Enforcement check. Loads every enabled limit applicable to (apiKeyId, provider,
 * model) — model-scoped, provider-scoped, and global — reads DB-authoritative
 * window usage for each (forceFresh, bypassing the read cache), and returns the
 * most-restrictive breach (smallest remaining tokens) or null if none breach.
 *
 * A limit is breached when window usage is at or above the configured limit
 * (tokensUsed >= limitValue), i.e. there is no remaining budget for more tokens.
 *
 * @param apiKeyId  the API key id (required)
 * @param provider  resolved upstream provider id (optional; "" matches no provider scope)
 * @param model     resolved model id (optional; "" matches no model scope)
 */
export function checkTokenLimits(
  apiKeyId: string,
  provider = "",
  model = "",
  now = Date.now()
): TokenLimitBreach | null {
  if (!apiKeyId) return null;

  const limits = getTokenLimitsForRequest(apiKeyId, provider, model);
  if (!limits || limits.length === 0) return null;

  let worst: TokenLimitBreach | null = null;

  for (const limit of limits) {
    if (limit.enabled === false) continue;
    const limitValue = limit.tokenLimit;
    if (!Number.isFinite(limitValue) || limitValue <= 0) continue;

    // Authoritative read (bypass the in-memory accelerator).
    const tokensUsed = getCurrentWindowUsage(limit, now, true);
    if (tokensUsed < limitValue) continue; // within budget

    const { windowStart, nextResetAt } = resetWindowIfElapsed(limit, now);
    const remaining = Math.max(0, limitValue - tokensUsed);
    const breach: TokenLimitBreach = {
      limitId: limit.id,
      scopeType: limit.scopeType,
      scopeValue: limit.scopeValue,
      limitValue,
      tokensUsed,
      remaining,
      windowStart,
      nextResetAt,
    };

    // Most-restrictive wins: smallest remaining. Tie-break: smaller limitValue.
    if (
      worst === null ||
      breach.remaining < worst.remaining ||
      (breach.remaining === worst.remaining && breach.limitValue < worst.limitValue)
    ) {
      worst = breach;
    }
  }

  return worst;
}

/**
 * Record token consumption against every applicable token limit for a request.
 *
 * FIRE-AND-FORGET: scheduled on a microtask so it NEVER blocks the SSE stream.
 * The DB work runs inside a synchronous better-sqlite3 transaction so the
 * reset-detection + reset-log + atomic increment for all matching limits commit
 * atomically. The in-memory cache is updated to the new authoritative totals.
 *
 * A rollover (window reset) is detected when the current window has no counter
 * row yet but a prior window row for the same limit still holds usage; in that
 * case a reset-log row is written before incrementing the new window.
 *
 * @param apiKeyId  API key id (no-op if falsy)
 * @param provider  resolved upstream provider id
 * @param model     resolved model id
 * @param tokens    billable tokens consumed by this request (no-op if <= 0)
 */
export function recordTokenUsage(
  apiKeyId: string,
  provider: string,
  model: string,
  tokens: number
): void {
  if (!apiKeyId) return;
  const delta = Number.isFinite(tokens) && tokens > 0 ? Math.floor(tokens) : 0;
  if (delta <= 0) return;

  // Schedule off the hot path; never await, never block the stream.
  Promise.resolve()
    .then(() => {
      const now = Date.now();
      const limits = getTokenLimitsForRequest(apiKeyId, provider || "", model || "");
      if (!limits || limits.length === 0) return;

      const db = getDbInstance();
      const applied: Array<{ limitId: string; windowStart: string; total: number }> = [];

      const tx = db.transaction(() => {
        for (const limit of limits) {
          if (limit.enabled === false) continue;

          const { windowStart } = resetWindowIfElapsed(limit, now);

          const currentRow = db
            .prepare(
              "SELECT tokens_used FROM api_key_token_counters WHERE limit_id = ? AND window_start = ?"
            )
            .get(limit.id, windowStart) as { tokens_used?: number } | undefined;

          // First write to a new window? Detect rollover from the prior window.
          if (!currentRow) {
            const priorRow = db
              .prepare(
                `SELECT window_start, tokens_used FROM api_key_token_counters
                 WHERE limit_id = ? AND window_start < ?
                 ORDER BY window_start DESC LIMIT 1`
              )
              .get(limit.id, windowStart) as
              | { window_start?: string; tokens_used?: number }
              | undefined;
            const prevTokens =
              priorRow && typeof priorRow.tokens_used === "number" ? priorRow.tokens_used : 0;
            if (prevTokens > 0) {
              logTokenLimitReset(limit.id, prevTokens, windowStart);
            }

            // Cold window with no counter row: seed from usage_history so the
            // running total reflects prior usage already recorded in this window
            // before applying the new delta. Synchronous (better-sqlite3) — safe
            // inside this transaction. Mirrors getCurrentWindowUsage seed-on-miss.
            const seeded = seedWindowUsageFromHistory(limit, now);
            if (seeded > 0) {
              incrementWindowTokens(limit.id, windowStart, seeded);
            }
          }

          const total = incrementWindowTokens(limit.id, windowStart, delta);
          applied.push({ limitId: limit.id, windowStart, total });
        }
      });

      try {
        tx();
        // Update the read accelerator to the new authoritative totals.
        for (const a of applied) {
          syncCache(a.limitId, a.windowStart, a.total);
        }
      } catch (err) {
        // better-sqlite3 auto-rolls-back on throw; verify we are not stuck mid-txn.
        if (db.inTransaction) {
          try {
            db.exec("ROLLBACK");
          } catch {
            // already rolled back
          }
        }
        // Swallow — usage recording must never surface to the request path.
      }
    })
    .catch(() => {
      // Microtask scheduling/setup failure — non-fatal, never blocks the stream.
    });
}
