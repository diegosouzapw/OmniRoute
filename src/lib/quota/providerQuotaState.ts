/**
 * providerQuotaState.ts — per-connection token budget ledger.
 *
 * Tracks tokens used against a configured per-minute (or per-window) token
 * limit for a (connection, model) pair. The purpose is PRE-REQUEST capacity
 * awareness: before dispatching to a provider, the scheduler can ask "does
 * this connection have budget left?" and skip exhausted connections instead
 * of waiting for a 429.
 *
 * Design notes:
 *  - Window semantics: fixed windows keyed by `window_start` (epoch ms).
 *    When `window_reset` passes, usage resets to 0 for the new window.
 *  - Fail-open: reads return `{ known: false }` when the store is missing
 *    or empty — the scheduler treats unknown budget as available (existing
 *    routing behavior is preserved when quota tracking is not configured).
 *  - Writes are best-effort: recording usage must never break the request
 *    path (catch + log + return).
 *
 * Part of: Quota-aware provider scheduling (feat/quota-aware-scheduling).
 */
import { getDbInstance } from "@/lib/db/core";
import { createLogger } from "@/shared/utils/logger";

const log = createLogger("quota:provider-state");

export interface ProviderQuotaRow {
  connectionId: string;
  model: string;
  tokensUsed: number;
  tokenLimit: number;
  windowStart: number;
  windowReset: number;
  updatedAt: string;
}

export interface ProviderQuotaSnapshot {
  /** true when the store has a fresh record for this window */
  known: boolean;
  tokensUsed: number;
  tokenLimit: number;
  /** remaining tokens in the current window (clamped >= 0) */
  tokensRemaining: number;
  /** 0..1 ratio of the window budget still available */
  remainingRatio: number;
  windowReset: number;
}

interface RowLike {
  connection_id?: string;
  model?: string;
  tokens_used?: number;
  token_limit?: number;
  window_start?: number;
  window_reset?: number;
  updated_at?: string;
}

function normalizeRow(row: RowLike): ProviderQuotaRow {
  return {
    connectionId: String(row.connection_id ?? ""),
    model: String(row.model ?? ""),
    tokensUsed: Number(row.tokens_used ?? 0),
    tokenLimit: Number(row.token_limit ?? 0),
    windowStart: Number(row.window_start ?? 0),
    windowReset: Number(row.window_reset ?? 0),
    updatedAt: String(row.updated_at ?? ""),
  };
}

/**
 * Read the current quota snapshot for (connectionId, model).
 * When the record is stale (its window expired) the caller sees
 * `known: false` — usage for the new window is implicitly zero.
 */
export function getProviderQuota(
  connectionId: string,
  model: string
): ProviderQuotaSnapshot | null {
  if (!connectionId || !model) return null;
  try {
    const db = getDbInstance();
    const row = db
      .prepare("SELECT * FROM provider_quota_state WHERE connection_id = ? AND model = ?")
      .get(connectionId, model) as RowLike | undefined;
    if (!row) return null;

    const normalized = normalizeRow(row);
    const now = Date.now();
    if (normalized.windowReset > 0 && now > normalized.windowReset) {
      return {
        known: false,
        tokensUsed: 0,
        tokenLimit: 0,
        tokensRemaining: 0,
        remainingRatio: 1,
        windowReset: normalized.windowReset,
      };
    }

    const tokenLimit = normalized.tokenLimit > 0 ? normalized.tokenLimit : 0;
    const tokensUsed = Math.max(0, normalized.tokensUsed);
    const tokensRemaining = tokenLimit > 0 ? Math.max(0, tokenLimit - tokensUsed) : 0;
    const remainingRatio =
      tokenLimit > 0 ? Math.min(1, Math.max(0, tokensRemaining / tokenLimit)) : 1;

    return {
      known: true,
      tokensUsed,
      tokenLimit,
      tokensRemaining,
      remainingRatio,
      windowReset: normalized.windowReset,
    };
  } catch (err) {
    log.warn(
      { err: (err as Error)?.message, connectionId, model },
      "getProviderQuota failed — fail-open"
    );
    return null;
  }
}

/**
 * Record token usage for (connectionId, model) in the current window.
 *
 * If no row exists, seeds one with the configured tokenLimit. If the window
 * has rolled over, resets usage to the new usage. Best-effort: never throws.
 */
export function recordProviderQuotaUsage(
  connectionId: string,
  model: string,
  tokensUsedDelta: number,
  opts: { tokenLimit?: number; windowMs?: number } = {}
): void {
  if (!connectionId || !model || !(tokensUsedDelta > 0)) return;
  try {
    const db = getDbInstance();
    const existing = db
      .prepare("SELECT * FROM provider_quota_state WHERE connection_id = ? AND model = ?")
      .get(connectionId, model) as RowLike | undefined;

    const now = Date.now();
    const windowMs = opts.windowMs ?? 60_000; // default: per-minute window
    const windowStart = Math.floor(now / windowMs) * windowMs;
    const windowReset = windowStart + windowMs;

    if (!existing) {
      db.prepare(
        `INSERT OR REPLACE INTO provider_quota_state
         (connection_id, model, tokens_used, token_limit, window_start, window_reset, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).run(
        connectionId,
        model,
        tokensUsedDelta,
        opts.tokenLimit ?? 0,
        windowStart,
        windowReset,
        new Date().toISOString()
      );
      return;
    }

    const normalized = normalizeRow(existing);
    const windowRolledOver = normalized.windowReset > 0 && now > normalized.windowReset;
    const nextUsed = windowRolledOver ? tokensUsedDelta : normalized.tokensUsed + tokensUsedDelta;
    const nextLimit =
      opts.tokenLimit && opts.tokenLimit > 0 ? opts.tokenLimit : normalized.tokenLimit;

    db.prepare(
      `UPDATE provider_quota_state
       SET tokens_used = ?, token_limit = ?, window_start = ?, window_reset = ?, updated_at = ?
       WHERE connection_id = ? AND model = ?`
    ).run(
      nextUsed,
      nextLimit,
      windowStart,
      windowReset,
      new Date().toISOString(),
      connectionId,
      model
    );
  } catch (err) {
    log.warn(
      { err: (err as Error)?.message, connectionId, model },
      "recordProviderQuotaUsage failed — best-effort"
    );
  }
}

/** Delete all quota state for a connection (used on connection removal). */
export function clearProviderQuota(connectionId: string): void {
  if (!connectionId) return;
  try {
    getDbInstance()
      .prepare("DELETE FROM provider_quota_state WHERE connection_id = ?")
      .run(connectionId);
  } catch {
    // best-effort
  }
}
