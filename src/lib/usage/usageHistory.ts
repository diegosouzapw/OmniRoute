/**
 * Usage History — extracted from usageDb.js (T-15)
 *
 * Usage tracking: saving, querying, and analytics shim for
 * the usage_history SQLite table.
 *
 * @module lib/usage/usageHistory
 */

import { getDbInstance } from "../db/core";
import { protectPayloadForLog } from "../logPayloads";
import {
  resolveOrphanedUsageAccountIdentity,
  resolveUsageAccountIdentity,
} from "./accountIdentity";
import {
  accumulateLatencySample,
  asRecord,
  buildLatencyStatsEntry,
  createLatencyBucket,
  normalizeServiceTier,
  resolvePositiveOption,
  toNumber,
  toStringOrNull,
  truncatePendingPreview,
} from "./usageHistory/helpers";
import type { ModelLatencyStatsEntry } from "./usageHistory/helpers";
import {
  clearCompletedDetails,
  maybeEnrichCompletedDetail,
  scheduleCompletedDetailCleanup,
  storeCompletedDetail,
} from "./completedRequestDetails";
import { shouldPersistToDisk } from "./migrations";
import { emitUsageRecorded } from "./usageEvents";
import {
  getLoggedInputTokens,
  getLoggedOutputTokens,
  getPromptCacheCreationTokens,
  getPromptCacheReadTokens,
  getReasoningTokens,
} from "./tokenAccounting";

export type PendingRequestMetadata = {
  clientEndpoint?: string | null;
  clientRequest?: unknown;
  providerRequest?: unknown;
  providerUrl?: string | null;
  providerResponse?: unknown;
  clientResponse?: unknown;
  status?: number | null;
  error?: string | null;
  errorCode?: string | null;
  stage?: string | null;
  stageUpdatedAt?: number | null;
  correlationId?: string | null;
};
export type PendingRequestDetail = {
  id: string;
  model: string;
  provider: string;
  connectionId: string | null;
  startedAt: number;
  clientEndpoint?: string | null;
  clientRequest?: unknown;
  providerRequest?: unknown;
  providerUrl?: string | null;
  providerResponse?: unknown;
  clientResponse?: unknown;
  status?: number | null;
  error?: string | null;
  errorCode?: string | null;
  completedAt?: number | null;
  durationMs?: number | null;
  stage?: string | null;
  stageUpdatedAt?: number | null;
  correlationId?: string | null;
  streamChunks?: {
    provider?: string[];
    openai?: string[];
    client?: string[];
  } | null;
};

function normalizePendingMetadata(metadata?: PendingRequestMetadata): PendingRequestMetadata {
  if (!metadata) return {};

  const normalized: PendingRequestMetadata = {};

  if (metadata.clientEndpoint !== undefined) {
    normalized.clientEndpoint = toStringOrNull(metadata.clientEndpoint) || null;
  }
  if (metadata.providerUrl !== undefined) {
    normalized.providerUrl = toStringOrNull(metadata.providerUrl) || null;
  }
  if (metadata.stage !== undefined) {
    normalized.stage = toStringOrNull(metadata.stage) || null;
    normalized.stageUpdatedAt = Date.now();
  }
  if (metadata.stageUpdatedAt !== undefined) {
    normalized.stageUpdatedAt =
      typeof metadata.stageUpdatedAt === "number" && Number.isFinite(metadata.stageUpdatedAt)
        ? metadata.stageUpdatedAt
        : null;
  }
  if (metadata.clientRequest !== undefined) {
    normalized.clientRequest = truncatePendingPreview(protectPayloadForLog(metadata.clientRequest));
  }
  if (metadata.providerRequest !== undefined) {
    normalized.providerRequest = truncatePendingPreview(
      protectPayloadForLog(metadata.providerRequest)
    );
  }
  if (metadata.providerResponse !== undefined) {
    normalized.providerResponse = truncatePendingPreview(
      protectPayloadForLog(metadata.providerResponse)
    );
  }
  if (metadata.clientResponse !== undefined) {
    normalized.clientResponse = truncatePendingPreview(
      protectPayloadForLog(metadata.clientResponse)
    );
  }
  if (metadata.status !== undefined) {
    const status = Number(metadata.status);
    normalized.status = Number.isFinite(status) ? status : null;
  }
  if (metadata.error !== undefined) {
    normalized.error = toStringOrNull(metadata.error) || null;
  }
  if (metadata.errorCode !== undefined) {
    normalized.errorCode = toStringOrNull(metadata.errorCode) || null;
  }
  if (metadata.correlationId !== undefined) {
    normalized.correlationId = toStringOrNull(metadata.correlationId) || null;
  }

  return normalized;
}

// ──────────────── Pending Requests (in-memory) ────────────────

const pendingRequests: {
  byModel: Record<string, number>;
  byAccount: Record<string, Record<string, number>>;
  details: Record<string, Record<string, PendingRequestDetail[]>>;
} = {
  byModel: Object.create(null) as Record<string, number>,
  byAccount: Object.create(null) as Record<string, Record<string, number>>,
  details: Object.create(null) as Record<string, Record<string, PendingRequestDetail[]>>,
};

/**
 * O(1) ID → PendingRequestDetail lookup map.
 * Populated when a detail is created and cleaned up when it is removed/finalized.
 */
const pendingById = new Map<string, PendingRequestDetail>();

const DEFAULT_MAX_PENDING_REQUEST_AGE_MS = 60 * 60 * 1000;
const MAX_PENDING_DETAILS = 5000;
const PENDING_SWEEP_INTERVAL_MS = 5 * 60 * 1000;
let _pendingSweepTimer: ReturnType<typeof setInterval> | null = null;

export function getMaxPendingRequestAgeMs(
  rawValue: string | undefined = process.env.MAX_PENDING_REQUEST_AGE_MS
): number {
  const parsed = Number.parseInt(rawValue ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_MAX_PENDING_REQUEST_AGE_MS;
}

function ensurePendingSweepTimer(): void {
  if (_pendingSweepTimer || typeof setInterval !== "function") return;
  _pendingSweepTimer = setInterval(() => {
    try {
      sweepStalePendingRequests();
    } catch {
      /* never let the reaper throw on the timer thread */
    }
  }, PENDING_SWEEP_INTERVAL_MS);
  // Don't keep the process alive just for the reaper.
  (_pendingSweepTimer as { unref?: () => void })?.unref?.();
}

/**
 * Evicts orphaned pending-request details older than `maxAgeMs` and enforces a hard size
 * cap. Mirrors the normal removal path (decrement counters + cleanup detail buckets) so the
 * dashboard's pending counts self-heal. Exported for deterministic testing.
 * @returns number of entries removed.
 */
export function sweepStalePendingRequests(
  now: number = Date.now(),
  maxAgeMs: number = getMaxPendingRequestAgeMs()
): number {
  let removed = 0;

  const remove = (detail: PendingRequestDetail): void => {
    const modelKey = detail.provider ? `${detail.model} (${detail.provider})` : detail.model;
    pendingById.delete(detail.id);
    if (detail.connectionId && isSafeKey(modelKey)) {
      const bucket = pendingRequests.details[detail.connectionId]?.[modelKey];
      if (bucket) {
        const index = bucket.findIndex((entry) => entry.id === detail.id);
        if (index >= 0) bucket.splice(index, 1);
      }
      cleanupPendingDetails(detail.connectionId, modelKey);
      decrementPendingCounters(modelKey, detail.connectionId);
    }
    removed++;
  };

  for (const detail of pendingById.values()) {
    if (now - detail.startedAt > maxAgeMs) remove(detail);
  }

  // Hard backstop: if entries are still piling up faster than they age out, drop the oldest
  // beyond the cap.
  if (pendingById.size > MAX_PENDING_DETAILS) {
    const overflow = pendingById.size - MAX_PENDING_DETAILS;
    const oldest = [...pendingById.values()]
      .sort((a, b) => a.startedAt - b.startedAt)
      .slice(0, overflow);
    for (const detail of oldest) remove(detail);
  }

  return removed;
}

/** Prototype-pollution denylist — prevents crafted model/provider names from mutating Object.prototype. */
const UNSAFE_KEYS = new Set(["__proto__", "constructor", "prototype"]);
function isSafeKey(key: string): boolean {
  return !UNSAFE_KEYS.has(key);
}

/**
 * Track a pending request.
 */
export function trackPendingRequest(
  model: string,
  provider: string,
  connectionId: string | null,
  started: boolean,
  metadata?: PendingRequestMetadata
) {
  const modelKey = provider ? `${model} (${provider})` : model;
  if (!isSafeKey(modelKey)) return;
  const normalizedMetadata = normalizePendingMetadata(metadata);

  // Ensure the orphaned-pending reaper is running once pending tracking is in use.
  if (started) ensurePendingSweepTimer();

  // Use hasOwnProperty guard to prevent prototype pollution via crafted keys
  if (!Object.hasOwn(pendingRequests.byModel, modelKey)) {
    pendingRequests.byModel[modelKey] = 0;
  }
  pendingRequests.byModel[modelKey] = Math.max(
    0,
    pendingRequests.byModel[modelKey] + (started ? 1 : -1)
  );

  if (connectionId) {
    if (!Object.hasOwn(pendingRequests.byAccount, connectionId)) {
      pendingRequests.byAccount[connectionId] = Object.create(null) as Record<string, number>;
    }
    if (!Object.hasOwn(pendingRequests.details, connectionId)) {
      pendingRequests.details[connectionId] = Object.create(null) as Record<
        string,
        PendingRequestDetail[]
      >;
    }
    if (!Object.hasOwn(pendingRequests.byAccount[connectionId], modelKey)) {
      pendingRequests.byAccount[connectionId][modelKey] = 0;
    }
    pendingRequests.byAccount[connectionId][modelKey] = Math.max(
      0,
      pendingRequests.byAccount[connectionId][modelKey] + (started ? 1 : -1)
    );

    const nextCount = pendingRequests.byAccount[connectionId][modelKey];
    if (started && nextCount > 0) {
      if (!pendingRequests.details[connectionId][modelKey]) {
        pendingRequests.details[connectionId][modelKey] = [];
      }
      const now = Date.now();
      const newDetail = {
        // crypto RNG (not Math.random) to satisfy CodeQL js/insecure-randomness —
        // this pending-request id flows into attempt logging; it's a correlation
        // id, not a security secret.
        id: `${now}-${globalThis.crypto.randomUUID().slice(0, 6)}`,
        model,
        provider,
        connectionId,
        startedAt: now,
        ...normalizedMetadata,
      };
      pendingRequests.details[connectionId][modelKey].push(newDetail);
      pendingById.set(newDetail.id, newDetail);
      return newDetail.id;
    } else if (!started && nextCount >= 0) {
      if (pendingRequests.details[connectionId]?.[modelKey]?.length) {
        const removed = pendingRequests.details[connectionId][modelKey].shift();
        if (removed) pendingById.delete(removed.id);
      }
      if (!pendingRequests.details[connectionId]?.[modelKey]?.length) {
        delete pendingRequests.details[connectionId]?.[modelKey];
        if (Object.keys(pendingRequests.details[connectionId] || {}).length === 0) {
          delete pendingRequests.details[connectionId];
        }
      }
    }
  }
}

export function updatePendingRequest(
  model: string,
  provider: string,
  connectionId: string | null,
  metadata: PendingRequestMetadata
) {
  if (!connectionId) return;
  const modelKey = provider ? `${model} (${provider})` : model;
  if (!isSafeKey(modelKey)) return;
  const details = pendingRequests.details[connectionId]?.[modelKey];
  if (!details?.length) return;
  const lastIdx = details.length - 1;
  Object.assign(details[lastIdx], normalizePendingMetadata(metadata));
}

export function updatePendingRequestById(id: string | null, metadata: PendingRequestMetadata) {
  const detail = id ? pendingById.get(id) : null;
  if (!detail) return false;
  Object.assign(detail, normalizePendingMetadata(metadata));
  return true;
}

/**
 * Update the first (oldest) pending request detail and then remove it.
 * Unlike updatePendingRequest which targets the last entry, this is designed
 * for the non-streaming completion path where the oldest entry must be finalized
 * before trackPendingRequest(false) removes it from the FIFO queue.
 */
function decrementPendingCounters(modelKey: string, connectionId: string) {
  if (Object.hasOwn(pendingRequests.byModel, modelKey)) {
    pendingRequests.byModel[modelKey] = Math.max(0, pendingRequests.byModel[modelKey] - 1);
    if (pendingRequests.byModel[modelKey] === 0) delete pendingRequests.byModel[modelKey];
  }
  if (Object.hasOwn(pendingRequests.byAccount, connectionId)) {
    if (Object.hasOwn(pendingRequests.byAccount[connectionId], modelKey)) {
      pendingRequests.byAccount[connectionId][modelKey] = Math.max(
        0,
        pendingRequests.byAccount[connectionId][modelKey] - 1
      );
      if (pendingRequests.byAccount[connectionId][modelKey] === 0) {
        delete pendingRequests.byAccount[connectionId][modelKey];
      }
    }
    if (
      !pendingRequests.byAccount[connectionId] ||
      Object.keys(pendingRequests.byAccount[connectionId]).length === 0
    ) {
      delete pendingRequests.byAccount[connectionId];
    }
  }
}

function cleanupPendingDetails(connectionId: string, modelKey: string) {
  if (!pendingRequests.details[connectionId]?.[modelKey]?.length) {
    delete pendingRequests.details[connectionId]?.[modelKey];
  }
  if (
    !pendingRequests.details[connectionId] ||
    Object.keys(pendingRequests.details[connectionId]).length === 0
  ) {
    delete pendingRequests.details[connectionId];
  }
}

function finalizePendingDetailAt(
  connectionId: string,
  modelKey: string,
  index: number,
  metadata: PendingRequestMetadata
): string | null {
  if (!isSafeKey(modelKey)) return null;
  const details = pendingRequests.details[connectionId]?.[modelKey];
  if (!details?.length || index < 0 || index >= details.length) return null;

  const completedAt = Date.now();
  const updated = {
    ...details[index],
    ...normalizePendingMetadata(metadata),
    completedAt,
    durationMs: Math.max(0, completedAt - details[index].startedAt),
  };
  storeCompletedDetail(updated);
  maybeEnrichCompletedDetail(updated, connectionId);
  scheduleCompletedDetailCleanup(updated.id);

  details.splice(index, 1);
  pendingById.delete(updated.id);
  cleanupPendingDetails(connectionId, modelKey);
  decrementPendingCounters(modelKey, connectionId);
  return updated.id;
}

export function finalizePendingRequest(
  model: string,
  provider: string,
  connectionId: string | null,
  metadata: PendingRequestMetadata
) {
  if (!connectionId) return;
  const modelKey = provider ? `${model} (${provider})` : model;
  finalizePendingDetailAt(connectionId, modelKey, 0, metadata);
}

export function finalizePendingRequestById(
  id: string | null | undefined,
  metadata: PendingRequestMetadata
): boolean {
  if (!id) return false;
  const detail = pendingById.get(id);
  if (!detail?.connectionId) return false;
  const modelKey = detail.provider ? `${detail.model} (${detail.provider})` : detail.model;
  if (!isSafeKey(modelKey)) return false;
  const details = pendingRequests.details[detail.connectionId]?.[modelKey];
  const index = details?.findIndex((entry) => entry.id === id) ?? -1;
  return finalizePendingDetailAt(detail.connectionId, modelKey, index, metadata) !== null;
}

/**
 * Finalize the most recent (last) pending request for the given model/provider/connection.
 * This remains as a compatibility fallback for callers that do not have a request id.
 */
export function finalizeMostRecentPendingRequest(
  model: string,
  provider: string,
  connectionId: string | null,
  metadata: PendingRequestMetadata
) {
  if (!connectionId) return;
  const modelKey = provider ? `${model} (${provider})` : model;
  if (!isSafeKey(modelKey)) return;
  const details = pendingRequests.details[connectionId]?.[modelKey];
  if (!details?.length) return;
  finalizePendingDetailAt(connectionId, modelKey, details.length - 1, metadata);
}

export { getCompletedDetails } from "./completedRequestDetails";

export function updatePendingRequestStreamChunks(
  model: string,
  provider: string,
  connectionId: string | null,
  streamChunks: {
    provider?: string[];
    openai?: string[];
    client?: string[];
  } | null
) {
  if (!connectionId) return;
  const modelKey = provider ? `${model} (${provider})` : model;
  if (!isSafeKey(modelKey)) return;
  const details = pendingRequests.details[connectionId]?.[modelKey];
  if (!details?.length) return;
  details[0].streamChunks = streamChunks;
}

/**
 * Get the pending requests state (for usageStats).
 * @returns {{ byModel: Record<string, number>, byAccount: Record<string, Record<string, number>> }}
 */
export function getPendingRequests(): {
  byModel: Record<string, number>;
  byAccount: Record<string, Record<string, number>>;
} {
  return pendingRequests;
}

export function getPendingById(): Map<string, PendingRequestDetail> {
  return pendingById;
}

/**
 * Clear all pending request counts.
 * Used for admin reset when counts leak due to uncaught timeouts or process-level errors.
 */
export function clearPendingRequests() {
  pendingRequests.byModel = Object.create(null) as Record<string, number>;
  pendingRequests.byAccount = Object.create(null) as Record<string, Record<string, number>>;
  pendingRequests.details = Object.create(null) as Record<
    string,
    Record<string, PendingRequestDetail[]>
  >;
  pendingById.clear();
  clearCompletedDetails();
}

// ──────────────── getUsageDb Shim (backward compat) ────────────────

const MAX_ROWS = 10000;

/**
 * Returns an object compatible with the old LowDB interface.
 * Only `api/usage/analytics/route.js` uses this — it reads `db.data.history`.
 *
 * @param sinceIso - ISO timestamp to filter from (inclusive)
 * @param limit - Max rows to return (default 10,000)
 * @param cursor - Timestamp cursor for pagination (exclusive, for next page)
 */
export async function getUsageDb(sinceIso?: string | null, limit?: number, cursor?: string | null) {
  const db = getDbInstance();
  const maxRows = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : MAX_ROWS;

  let rows;
  if (cursor) {
    // Cursor-based pagination (next page after cursor)
    // Use > cursor to get rows after the last timestamp of previous page (ASC order)
    rows = sinceIso
      ? db
          .prepare(
            `SELECT * FROM usage_history WHERE timestamp >= ? AND timestamp > ? ORDER BY timestamp ASC LIMIT ?`
          )
          .all(sinceIso, cursor, maxRows)
      : db
          .prepare(`SELECT * FROM usage_history WHERE timestamp > ? ORDER BY timestamp ASC LIMIT ?`)
          .all(cursor, maxRows);
  } else if (sinceIso) {
    // Initial query with date filter
    rows = db
      .prepare(`SELECT * FROM usage_history WHERE timestamp >= ? ORDER BY timestamp ASC LIMIT ?`)
      .all(sinceIso, maxRows);
  } else {
    // No filter - get all (with limit)
    rows = db.prepare(`SELECT * FROM usage_history ORDER BY timestamp ASC LIMIT ?`).all(maxRows);
  }

  const history = rows.map((row) => {
    const r = asRecord(row);
    return {
      provider: toStringOrNull(r.provider),
      model: toStringOrNull(r.model),
      connectionId: toStringOrNull(r.connection_id),
      apiKeyId: toStringOrNull(r.api_key_id),
      apiKeyName: toStringOrNull(r.api_key_name),
      serviceTier: normalizeServiceTier(r.service_tier),
      tokens: {
        input: toNumber(r.tokens_input),
        output: toNumber(r.tokens_output),
        cacheRead: toNumber(r.tokens_cache_read),
        cacheCreation: toNumber(r.tokens_cache_creation),
        reasoning: toNumber(r.tokens_reasoning),
      },
      status: toStringOrNull(r.status),
      success: toNumber(r.success) === 1,
      latencyMs: toNumber(r.latency_ms),
      timeToFirstTokenMs: toNumber(r.ttft_ms),
      errorCode: toStringOrNull(r.error_code),
      timestamp: toStringOrNull(r.timestamp),
    };
  });

  // Provide next cursor if we hit the limit (more rows exist)
  const nextCursor =
    rows.length === maxRows ? toStringOrNull(asRecord(rows[rows.length - 1]).timestamp) : null;

  return { data: { history, nextCursor } };
}

// ──────────────── Save Request Usage ────────────────

/**
 * DB-entity-mapped shape accepted by {@link saveRequestUsage}, mirroring the
 * `usage_history` table columns 1:1 (see `src/lib/db/migrations/`). Convention
 * (#3512): every `usage_history` writer should type its entry against this
 * interface instead of an inline anonymous object or `any` — call sites are
 * intentionally permissive (fields optional/nullable) because rows are built
 * incrementally across several extraction points (chatCore success/failure
 * paths, rejected-request accounting, the Codex Responses WS bridge).
 *
 * `tokens` stays `unknown` on purpose: callers pass either the raw
 * provider-shaped usage object (OpenAI `prompt_tokens`/`completion_tokens`,
 * Anthropic `input_tokens`/`cache_read_input_tokens`, …) or the already
 * normalized `{ input, output, cacheRead, cacheCreation, reasoning }` shape —
 * `getLoggedInputTokens`/`getLoggedOutputTokens`/`getPromptCache*Tokens` in
 * `./tokenAccounting` accept both and extract the right fields.
 */
export interface UsageEntry {
  provider?: string | null;
  model?: string | null;
  /** Raw or normalized token usage — see the interface doc above. */
  tokens?: unknown;
  status?: string | null;
  success?: boolean;
  latencyMs?: number;
  timeToFirstTokenMs?: number;
  errorCode?: string | null;
  /** ISO timestamp; defaults to `new Date().toISOString()` when omitted. */
  timestamp?: string;
  connectionId?: string | null;
  apiKeyId?: string | null;
  apiKeyName?: string | null;
  serviceTier?: string | null;
  /** @deprecated legacy snake_case fallback, read only if `serviceTier` is unset. */
  service_tier?: string | null;
  comboStrategy?: string | null;
  /** @deprecated legacy snake_case fallback, read only if `comboStrategy` is unset. */
  combo_strategy?: string | null;
  endpoint?: string | null;
}

/**
 * Save request usage entry to SQLite.
 */
export async function saveRequestUsage(entry: UsageEntry) {
  if (!shouldPersistToDisk) return;

  try {
    const db = getDbInstance();
    const timestamp = entry.timestamp || new Date().toISOString();
    const serviceTier = normalizeServiceTier(entry.serviceTier ?? entry.service_tier);

    const tokensInput = getLoggedInputTokens(entry.tokens);
    const tokensOutput = getLoggedOutputTokens(entry.tokens);
    const connection = entry.connectionId
      ? (db.prepare("SELECT * FROM provider_connections WHERE id = ?").get(entry.connectionId) as
          Record<string, unknown> | undefined)
      : undefined;
    const accountIdentity = connection
      ? resolveUsageAccountIdentity(connection)
      : resolveOrphanedUsageAccountIdentity(entry.provider, entry.connectionId);

    // Dedup guard: skip INSERT when an identical row already exists in the same
    // second. This prevents double-counting when onRequestSuccess fires more
    // than once (e.g. combo routing calling the callback from both the
    // streaming and non-streaming paths for the same underlying request).
    // Keyed on the natural identity of a request: timestamp + provider + model
    // + connectionId + apiKeyId + token counts. If only the endpoint is missing
    // on the existing row, fill it in rather than inserting a duplicate.
    let inserted = false;

    db.transaction(() => {
      const existing = db
        .prepare(
          `SELECT id, endpoint FROM usage_history
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
          entry.provider || null,
          entry.model || null,
          entry.connectionId || null,
          entry.apiKeyId || null,
          tokensInput,
          tokensOutput
        ) as { id: number; endpoint: string | null } | undefined;

      if (existing) {
        // Back-fill endpoint if the original row missed it.
        if (!existing.endpoint && entry.endpoint) {
          db.prepare(`UPDATE usage_history SET endpoint = ? WHERE id = ?`).run(
            entry.endpoint,
            existing.id
          );
        }
        return; // duplicate — do not insert
      }

      db.prepare(
        `
        INSERT INTO usage_history (provider, model, connection_id, account_key, account_label,
          account_label_priority, api_key_id, api_key_name, tokens_input, tokens_output,
          tokens_cache_read, tokens_cache_creation, tokens_reasoning, service_tier, status, success,
          latency_ms, ttft_ms, error_code, combo_strategy, endpoint, timestamp)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
      ).run(
        entry.provider || null,
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
        Number.isFinite(Number(entry.latencyMs)) ? Number(entry.latencyMs) : 0,
        Number.isFinite(Number(entry.timeToFirstTokenMs))
          ? Number(entry.timeToFirstTokenMs)
          : Number.isFinite(Number(entry.latencyMs))
            ? Number(entry.latencyMs)
            : 0,
        entry.errorCode || null,
        entry.comboStrategy || entry.combo_strategy || null,
        entry.endpoint || null,
        timestamp
      );

      inserted = true;
    })();

    // Decoupled via the event bus so usageHistory never imports providerLimits
    // (which would pull the executors/translator graph into the type-check surface).
    // Only emit when a row was actually inserted — not on dedup no-ops.
    if (inserted) {
      emitUsageRecorded(entry.provider, entry.connectionId);
    }
  } catch (error) {
    console.error("Failed to save usage stats:", error);
  }
}

// ──────────────── Get Usage History ────────────────

export interface UsageHistoryFilter {
  provider?: string;
  model?: string;
  startDate?: string | number | Date;
  endDate?: string | number | Date;
}

/**
 * Get usage history with optional filters.
 */
export async function getUsageHistory(filter: UsageHistoryFilter = {}) {
  const db = getDbInstance();
  let sql = "SELECT * FROM usage_history";
  const conditions: string[] = [];
  const params: Record<string, unknown> = {};

  if (filter.provider) {
    conditions.push("provider = @provider");
    params.provider = filter.provider;
  }
  if (filter.model) {
    conditions.push("model = @model");
    params.model = filter.model;
  }
  if (filter.startDate) {
    conditions.push("timestamp >= @startDate");
    params.startDate = new Date(filter.startDate).toISOString();
  }
  if (filter.endDate) {
    conditions.push("timestamp <= @endDate");
    params.endDate = new Date(filter.endDate).toISOString();
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }
  sql += " ORDER BY timestamp ASC";

  const rows = db.prepare(sql).all(params);
  return rows.map((row) => {
    const r = asRecord(row);
    return {
      provider: toStringOrNull(r.provider),
      model: toStringOrNull(r.model),
      connectionId: toStringOrNull(r.connection_id),
      apiKeyId: toStringOrNull(r.api_key_id),
      apiKeyName: toStringOrNull(r.api_key_name),
      serviceTier: normalizeServiceTier(r.service_tier),
      tokens: {
        input: toNumber(r.tokens_input),
        output: toNumber(r.tokens_output),
        cacheRead: toNumber(r.tokens_cache_read),
        cacheCreation: toNumber(r.tokens_cache_creation),
        reasoning: toNumber(r.tokens_reasoning),
      },
      status: toStringOrNull(r.status),
      success: toNumber(r.success) === 1,
      latencyMs: toNumber(r.latency_ms),
      timeToFirstTokenMs: toNumber(r.ttft_ms),
      errorCode: toStringOrNull(r.error_code),
      timestamp: toStringOrNull(r.timestamp),
    };
  });
}

export type { ModelLatencyStatsEntry } from "./usageHistory/helpers";

/**
 * Aggregate rolling latency stats per provider/model from usage_history.
 * Used by auto-combo routing to incorporate real-world latency and reliability.
 * Also computes avgTtftMs/avgE2ELatencyMs/avgTokensPerSecond (#6875) via the
 * accumulateLatencySample/buildLatencyStatsEntry helpers.
 */
export async function getModelLatencyStats(
  options: {
    windowHours?: number;
    minSamples?: number;
    maxRows?: number;
    provider?: string;
    model?: string;
  } = {}
): Promise<Record<string, ModelLatencyStatsEntry>> {
  const windowHours = resolvePositiveOption(options.windowHours, 24);
  const minSamples = resolvePositiveOption(options.minSamples, 1);
  const maxRows = resolvePositiveOption(options.maxRows, 10000);

  const db = getDbInstance();
  const sinceIso = new Date(Date.now() - windowHours * 60 * 60 * 1000).toISOString();

  type LatencyRow = {
    provider: string | null;
    model: string | null;
    success: number | null;
    latency_ms: number | null;
    ttft_ms: number | null;
    tokens_output: number | null;
  };

  const conditions = ["timestamp >= @sinceIso", "provider IS NOT NULL", "model IS NOT NULL"];
  const queryParams: Record<string, unknown> = { sinceIso, maxRows };
  if (options.provider) {
    conditions.push("provider = @provider");
    queryParams.provider = options.provider;
  }
  if (options.model) {
    conditions.push("model = @model");
    queryParams.model = options.model;
  }

  const rows = db
    .prepare(
      `
      SELECT provider, model, success, latency_ms, ttft_ms, tokens_output
      FROM usage_history
      WHERE ${conditions.join(" AND ")}
      ORDER BY timestamp DESC
      LIMIT @maxRows
    `
    )
    .all(queryParams) as LatencyRow[];

  const grouped = new Map<string, ReturnType<typeof createLatencyBucket>>();

  for (const row of rows) {
    const provider = toStringOrNull(row.provider);
    const model = toStringOrNull(row.model);
    if (!provider || !model) continue;

    const key = `${provider}/${model}`;
    if (!grouped.has(key)) grouped.set(key, createLatencyBucket(provider, model));
    const bucket = grouped.get(key);
    if (!bucket) continue;

    bucket.totalRequests += 1;
    const isSuccess = toNumber(row.success) !== 0;
    if (isSuccess) bucket.successfulRequests += 1;

    accumulateLatencySample(
      bucket,
      toNumber(row.latency_ms),
      toNumber(row.ttft_ms),
      toNumber(row.tokens_output),
      isSuccess
    );
  }

  const stats: Record<string, ModelLatencyStatsEntry> = {};
  for (const [key, bucket] of grouped.entries()) {
    const entry = buildLatencyStatsEntry(key, bucket, minSamples, windowHours);
    if (entry) stats[key] = entry;
  }

  return stats;
}

// ──────────────── Request Log Compatibility Shim ────────────────

/**
 * Legacy compatibility shim.
 * Request summary lines are no longer written to data/log.txt.
 */
export async function appendRequestLog({
  model: _model,
  provider: _provider,
  connectionId: _connectionId,
  tokens: _tokens,
  status: _status,
}: {
  model?: string;
  provider?: string;
  connectionId?: string;
  tokens?: unknown;
  status?: string | number;
}) {
  // Deprecated: request summaries now come from SQLite call_logs.
}

/**
 * Return recent request summaries generated from SQLite call_logs rows.
 */
export async function getRecentLogs(limit = 200) {
  try {
    const db = getDbInstance();
    const rows = db
      .prepare(
        `
        SELECT timestamp, model, provider, account, tokens_in, tokens_out, status
        FROM call_logs
        ORDER BY timestamp DESC
        LIMIT ?
      `
      )
      .all(limit) as Array<Record<string, unknown>>;

    return rows.map((row) => {
      const timestamp =
        typeof row.timestamp === "string" ? row.timestamp : new Date().toISOString();
      const provider = typeof row.provider === "string" ? row.provider.toUpperCase() : "-";
      const model = typeof row.model === "string" ? row.model : "-";
      const account = typeof row.account === "string" ? row.account : "-";
      const tokensIn = toNumber(row.tokens_in);
      const tokensOut = toNumber(row.tokens_out);
      const status = typeof row.status === "number" ? row.status : String(row.status || "-");
      return `${timestamp} | ${model} | ${provider} | ${account} | ${tokensIn} | ${tokensOut} | ${status}`;
    });
  } catch (error) {
    console.error(
      "[usageDb] Failed to read recent call logs:",
      error instanceof Error ? error.message : String(error)
    );
    return [];
  }
}
