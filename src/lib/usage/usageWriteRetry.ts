/**
 * Deferred retry for usage writes blocked by a locked database.
 *
 * The hot-path writers here are best-effort: the database caps a contended
 * write at 2 s (`busy_timeout = 2000` in `src/lib/db/core.ts`) so a busy disk
 * cannot freeze the event loop. When a write still meets a lock, the first
 * failure is swallowed silently and the entry is attempted once more after a
 * short delay, off the request path (`setTimeout`, never awaited). If the
 * second attempt fails the existing log line is written and the row is
 * dropped. Any other error keeps the current behaviour: logged at once,
 * never retried. If the server stops during the wait the row is lost as
 * before, on a best-effort basis (the timer never keeps the loop alive).
 *
 * @module lib/usage/usageWriteRetry
 */

import { getDbInstance } from "../db/core";
import { resolveProviderId } from "@/shared/constants/providers";
import {
  resolveOrphanedUsageAccountIdentity,
  resolveUsageAccountIdentity,
} from "./accountIdentity";
import { normalizeServiceTier } from "./usageHistory/helpers";
import { emitUsageRecorded } from "./usageEvents";
import {
  getLoggedInputTokens,
  getLoggedOutputTokens,
  getPromptCacheCreationTokens,
  getPromptCacheReadTokens,
  getReasoningTokens,
} from "./tokenAccounting";
import type { UsageEntry } from "./usageHistory";

/** Delay before the single deferred attempt. Internal, not user-facing. */
const RETRY_DELAY_MS = 1000;

/**
 * True when the error is a database lock, in any shape the supported drivers
 * report it. Restricted to locks: only a lock is expected to clear within the
 * retry delay. Lock classification mirrors the lock subset of the probe
 * classifier and the busy checker (drivers report plain "database is locked"
 * while better-sqlite3 carries the name in `code` and node:sqlite the numeric
 * primary code in `errcode`, extended codes in the high bits).
 */
export function isWriteLockError(error: unknown): boolean {
  const details = error as { code?: unknown; errcode?: unknown; message?: unknown } | null;
  const code = details?.code ?? details?.errcode;
  if (typeof code === "string" && isLockCodeName(code)) return true;
  if (typeof code === "number" && isLockCodeNumber(code)) return true;
  const message = error instanceof Error ? error.message : String(details?.message ?? error);
  return isLockMessage(message);
}

function isLockCodeName(code: string): boolean {
  return /^SQLITE_(BUSY|LOCKED)/.test(code);
}

function isLockCodeNumber(code: number): boolean {
  const primary = code & 0xff;
  return primary === 5 || primary === 6;
}

function isLockMessage(message: string): boolean {
  return /database(?: table| schema)? is (?:locked|busy)|SQLITE_BUSY|SQLITE_LOCKED/i.test(message);
}

/**
 * Single write attempt. Throws on failure so the caller decides between a
 * deferred retry (lock) and an immediate log (anything else).
 */
export function attemptWrite(entry: UsageEntry): void {
  const db = getDbInstance();
  const prepared = prepareEntry(db, entry);
  let inserted = false;

  db.transaction(() => {
    inserted = insertUnlessDuplicate(db, prepared);
  })();

  // Decoupled via the event bus so usageHistory never imports providerLimits
  // (which would pull the executors/translator graph into the type-check surface).
  // Only emit when a row was actually inserted — not on dedup no-ops.
  if (inserted) {
    emitUsageRecorded(entry.provider, entry.connectionId);
  }
}

type PreparedEntry = {
  entry: UsageEntry;
  timestamp: string;
  serviceTier: string;
  tokensInput: number;
  tokensOutput: number;
  accountIdentity: {
    accountKey: string | null;
    accountLabel: string | null;
    accountLabelPriority: number;
  };
};

function prepareEntry(db: ReturnType<typeof getDbInstance>, entry: UsageEntry): PreparedEntry {
  const timestamp = entry.timestamp || new Date().toISOString();
  const connection = entry.connectionId
    ? (db.prepare("SELECT * FROM provider_connections WHERE id = ?").get(entry.connectionId) as
        Record<string, unknown> | undefined)
    : undefined;
  return {
    entry,
    timestamp,
    serviceTier: normalizeServiceTier(entry.serviceTier ?? entry.service_tier),
    tokensInput: getLoggedInputTokens(entry.tokens),
    tokensOutput: getLoggedOutputTokens(entry.tokens),
    accountIdentity: connection
      ? resolveUsageAccountIdentity(connection)
      : resolveOrphanedUsageAccountIdentity(entry.provider, entry.connectionId),
  };
}

// Dedup guard: skip INSERT when an identical row already exists in the same
// second. This prevents double-counting when onRequestSuccess fires more
// than once (e.g. combo routing calling the callback from both the
// streaming and non-streaming paths for the same underlying request).
// Keyed on the natural identity of a request: timestamp + provider + model
// + connectionId + apiKeyId + token counts. If only the endpoint is missing
// on the existing row, fill it in rather than inserting a duplicate.
function insertUnlessDuplicate(
  db: ReturnType<typeof getDbInstance>,
  prepared: PreparedEntry
): boolean {
  const { entry, timestamp, tokensInput, tokensOutput } = prepared;
  const existing = db
    .prepare(
      `SELECT id, endpoint, cpa_auth_index FROM usage_history
       WHERE timestamp = ?
         AND COALESCE(provider, '')     = COALESCE(?, '')
         AND COALESCE(model, '')        = COALESCE(?, '')
         AND COALESCE(connection_id, '') = COALESCE(?, '')
         AND COALESCE(api_key_id, '')   = COALESCE(?, '')
         AND tokens_input  = ?
         AND tokens_output = ?
       ORDER BY id DESC LIMIT 1`
    )
    .get(
      timestamp,
      entry.provider ? resolveProviderId(entry.provider) : null,
      entry.model || null,
      entry.connectionId || null,
      entry.apiKeyId || null,
      tokensInput,
      tokensOutput
    ) as { id: number; endpoint: string | null; cpa_auth_index: string | null } | undefined;

  if (existing) {
    backfillDuplicate(db, existing, entry);
    return false;
  }

  insertEntry(db, prepared);
  return true;
}

function backfillDuplicate(
  db: ReturnType<typeof getDbInstance>,
  existing: { id: number; endpoint: string | null; cpa_auth_index: string | null },
  entry: UsageEntry
): void {
  // Back-fill endpoint if the original row missed it.
  if (!existing.endpoint && entry.endpoint) {
    db.prepare(`UPDATE usage_history SET endpoint = ? WHERE id = ?`).run(
      entry.endpoint,
      existing.id
    );
  }
  // A later completed attempt can carry the trace the first write missed.
  if (!existing.cpa_auth_index && entry.cpaAuthIndex) {
    db.prepare(`UPDATE usage_history SET cpa_auth_index = ? WHERE id = ?`).run(
      entry.cpaAuthIndex,
      existing.id
    );
  }
}

function insertEntry(db: ReturnType<typeof getDbInstance>, prepared: PreparedEntry): void {
  const { entry, timestamp, serviceTier, tokensInput, tokensOutput, accountIdentity } = prepared;
  db.prepare(
    `
    INSERT INTO usage_history (provider, model, connection_id, account_key, account_label,
      account_label_priority, api_key_id, api_key_name, tokens_input, tokens_output,
      tokens_cache_read, tokens_cache_creation, tokens_reasoning, service_tier, status, success,
      latency_ms, ttft_ms, error_code, combo_strategy, endpoint, cpa_auth_index, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    entry.provider ? resolveProviderId(entry.provider) : null,
    entry.model || null,
    entry.connectionId || null,
    accountIdentity.accountKey,
    accountIdentity.accountLabel,
    accountIdentity.accountLabelPriority,
    entry.apiKeyId || null,
    entry.apiKeyName || null,
    tokensInput,
    tokensOutput,
    getPromptCacheReadTokens(entry.tokens),
    getPromptCacheCreationTokens(entry.tokens),
    getReasoningTokens(entry.tokens),
    serviceTier,
    entry.status || null,
    entry.success === false ? 0 : 1,
    toFinite(entry.latencyMs),
    toFirstToken(entry),
    entry.errorCode || null,
    entry.comboStrategy || entry.combo_strategy || null,
    entry.endpoint || null,
    entry.cpaAuthIndex || null,
    timestamp
  );
}

function toFinite(value: unknown): number {
  return Number.isFinite(Number(value)) ? Number(value) : 0;
}

function toFirstToken(entry: UsageEntry): number {
  if (Number.isFinite(Number(entry.timeToFirstTokenMs))) return Number(entry.timeToFirstTokenMs);
  return toFinite(entry.latencyMs);
}

/**
 * Schedule the single deferred retry, off the request path. Never chained:
 * the retry attempts the write once and, on failure, writes the existing log
 * line and stops.
 */
export function scheduleWriteRetry(entry: UsageEntry): void {
  const timer = setTimeout(() => {
    try {
      attemptWrite(entry);
    } catch (retryError) {
      console.error("Failed to save usage stats:", retryError);
    }
  }, RETRY_DELAY_MS);
  // Allow Node.js to exit naturally even if the timer is still pending
  // (avoids keeping the event loop alive for a stray retry).
  detachTimer(timer);
}

type DetachableTimer = { unref?: () => void };

function detachTimer(timer: DetachableTimer): void {
  timer.unref?.();
}
