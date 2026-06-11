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
import { shouldPersistToDisk } from "./migrations";
import { emitUsageRecorded } from "./usageEvents";
import {
  getLoggedInputTokens,
  getLoggedOutputTokens,
  getPromptCacheCreationTokens,
  getPromptCacheReadTokens,
  getReasoningTokens,
} from "./tokenAccounting";

type JsonRecord = Record<string, unknown>;
type PendingRequestMetadata = {
  clientEndpoint?: string | null;
  clientRequest?: unknown;
  providerRequest?: unknown;
  providerUrl?: string | null;
  providerResponse?: unknown;
  clientResponse?: unknown;
  stage?: string | null;
  stageUpdatedAt?: number | null;
};
type PendingRequestDetail = {
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
  stage?: string | null;
  stageUpdatedAt?: number | null;
  streamChunks?: {
    provider?: string[];
    openai?: string[];
    client?: string[];
  } | null;
};

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function normalizeServiceTier(value: unknown): string {
  const tier = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (tier === "priority" || tier === "fast") return "priority";
  if (tier === "flex") return "flex";
  return "standard";
}

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function percentile(sortedValues: number[], p: number): number {
  if (sortedValues.length === 0) return 0;
  if (sortedValues.length === 1) return sortedValues[0];
  const bounded = Math.max(0, Math.min(1, p));
  const idx = Math.round((sortedValues.length - 1) * bounded);
  return sortedValues[idx] ?? sortedValues[sortedValues.length - 1];
}

function stdDev(values: number[], avg: number): number {
  if (values.length <= 1) return 0;
  const variance = values.reduce((acc, v) => acc + (v - avg) ** 2, 0) / values.length;
  return Math.sqrt(Math.max(0, variance));
}

const MAX_PREVIEW_DEPTH = 6;
const MAX_PREVIEW_STRING = 1200;
const MAX_PREVIEW_ARRAY_ITEMS = 12;
const MAX_PREVIEW_OBJECT_KEYS = 24;

function truncatePendingPreview(value: unknown, depth = 0): unknown {
  if (depth >= MAX_PREVIEW_DEPTH) {
    return "[TRUNCATED_DEPTH]";
  }

  if (typeof value === "string") {
    return value.length > MAX_PREVIEW_STRING ? `${value.slice(0, MAX_PREVIEW_STRING)}...` : value;
  }

  if (Array.isArray(value)) {
    const preview = value
      .slice(0, MAX_PREVIEW_ARRAY_ITEMS)
      .map((item) => truncatePendingPreview(item, depth + 1));
    if (value.length > MAX_PREVIEW_ARRAY_ITEMS) {
      preview.push({ _truncatedItems: value.length - MAX_PREVIEW_ARRAY_ITEMS });
    }
    return preview;
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const entries = Object.entries(value as JsonRecord);
  const truncatedEntries = entries
    .slice(0, MAX_PREVIEW_OBJECT_KEYS)
    .map(([key, entryValue]) => [key, truncatePendingPreview(entryValue, depth + 1)]);
  const preview = Object.fromEntries(truncatedEntries);

  if (entries.length > MAX_PREVIEW_OBJECT_KEYS) {
    preview._truncatedKeys = entries.length - MAX_PREVIEW_OBJECT_KEYS;
  }

  return preview;
}

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
      const newDetail = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        model,
        provider,
        connectionId,
        startedAt: Date.now(),
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
  details[lastIdx] = { ...details[lastIdx], ...normalizePendingMetadata(metadata) };
}

/**
 * Update the first (oldest) pending request detail and then remove it.
 * Unlike updatePendingRequest which targets the last entry, this is designed
 * for the non-streaming completion path where the oldest entry must be finalized
 * before trackPendingRequest(false) removes it from the FIFO queue.
 */
/**
 * Completed details cache — keeps finalized response data available for the
 * active endpoint's fast-poll for a brief window after the pending detail is
 * removed, so the frontend can show providerResponse/clientResponse before
 * the persisted call log is fetched.
 */
const completedDetails = new Map<string, PendingRequestDetail>();

export function finalizePendingRequest(
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
  const updated = { ...details[0], ...normalizePendingMetadata(metadata) };
  completedDetails.set(updated.id, updated);
  setTimeout(() => completedDetails.delete(updated.id), 5000);
  trackPendingRequest(model, provider, connectionId, false);
}

/**
 * Finalize the most recent (last) pending request for the given model/provider/connection.
 * This is used for streaming requests where the active stream corresponds to the last
 * entry in the FIFO for the connection/model key. It removes that specific entry and
 * moves it to completedDetails so the UI fast-poll can pick it up.
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
  const lastIdx = details.length - 1;
  const updated = { ...details[lastIdx], ...normalizePendingMetadata(metadata) };
  // Move to completed cache
  completedDetails.set(updated.id, updated);

  // If provider/client responses are missing, attempt to enrich the completed
  // detail from persisted call_log artifacts (best-effort, non-blocking).
  (async () => {
    try {
      const missingProvider =
        updated.providerResponse === undefined || updated.providerResponse === null;
      const missingClient = updated.clientResponse === undefined || updated.clientResponse === null;
      if ((missingProvider || missingClient) && connectionId) {
        const db = getDbInstance();
        const sinceIso = new Date(Date.now() - 30_000).toISOString();
        const rows = db
          .prepare(
            `SELECT artifact_relpath FROM call_logs WHERE connection_id = ? AND model = ? AND timestamp >= ? ORDER BY timestamp DESC LIMIT 5`
          )
          .all(connectionId, model, sinceIso) as Array<{ artifact_relpath: string | null }>;
        for (const row of rows) {
          if (!row.artifact_relpath) continue;
          const { readCallArtifact } = await import("./callLogArtifacts");
          const art = readCallArtifact(row.artifact_relpath);
          if (art.state !== "ready" || !art.artifact) continue;
          const pipeline = art.artifact.pipeline as any | undefined;
          // Prefer pipeline payloads over responseBody for structured data
          if (missingProvider && pipeline?.providerResponse) {
            updated.providerResponse = pipeline.providerResponse;
          }
          if (missingClient && pipeline?.clientResponse) {
            updated.clientResponse = pipeline.clientResponse;
          }
          if (
            (missingProvider && art.artifact.responseBody) ||
            (missingClient && art.artifact.responseBody)
          ) {
            // use responseBody as a fallback for both
            if (missingProvider) updated.providerResponse = art.artifact.responseBody;
            if (missingClient) updated.clientResponse = art.artifact.responseBody;
          }
          if (updated.providerResponse || updated.clientResponse) {
            // write-back to completed cache and stop searching
            completedDetails.set(updated.id, updated);
            break;
          }
        }
      }
    } catch (e) {
      try {
        console.warn(
          "[usageHistory] failed to enrich completed detail from artifacts:",
          e && (e.message || e)
        );
      } catch {}
    }
  })();

  setTimeout(() => completedDetails.delete(updated.id), 5000);

  // Remove the specific pending detail
  details.splice(lastIdx, 1);
  pendingById.delete(updated.id);

  // Decrement counters (mirror trackPendingRequest(false) behaviour)
  if (Object.hasOwn(pendingRequests.byModel, modelKey)) {
    pendingRequests.byModel[modelKey] = Math.max(0, pendingRequests.byModel[modelKey] - 1);
    if (pendingRequests.byModel[modelKey] === 0) delete pendingRequests.byModel[modelKey];
  }
  if (connectionId && Object.hasOwn(pendingRequests.byAccount, connectionId)) {
    if (Object.hasOwn(pendingRequests.byAccount[connectionId], modelKey)) {
      pendingRequests.byAccount[connectionId][modelKey] = Math.max(
        0,
        pendingRequests.byAccount[connectionId][modelKey] - 1
      );
      if (pendingRequests.byAccount[connectionId][modelKey] === 0) {
        delete pendingRequests.byAccount[connectionId][modelKey];
      }
    }
    // Clean up details map if empty
    if (
      !pendingRequests.details[connectionId] ||
      Object.keys(pendingRequests.details[connectionId]).length === 0
    ) {
      delete pendingRequests.details[connectionId];
    }
    if (
      !pendingRequests.byAccount[connectionId] ||
      Object.keys(pendingRequests.byAccount[connectionId]).length === 0
    ) {
      delete pendingRequests.byAccount[connectionId];
    }
  }
}

export function getCompletedDetails(): Map<string, PendingRequestDetail> {
  return completedDetails;
}

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
  const nextCursor = rows.length === maxRows ? (rows[rows.length - 1] as any)?.timestamp : null;

  return { data: { history, nextCursor } };
}

// ──────────────── Save Request Usage ────────────────

/**
 * Save request usage entry to SQLite.
 */
export async function saveRequestUsage(entry: any) {
  if (!shouldPersistToDisk) return;

  try {
    const db = getDbInstance();
    const timestamp = entry.timestamp || new Date().toISOString();
    const serviceTier = normalizeServiceTier(entry.serviceTier ?? entry.service_tier);

    db.prepare(
      `
      INSERT INTO usage_history (provider, model, connection_id, api_key_id, api_key_name,
        tokens_input, tokens_output, tokens_cache_read, tokens_cache_creation, tokens_reasoning,
        service_tier, status, success, latency_ms, ttft_ms, error_code, combo_strategy, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    ).run(
      entry.provider || null,
      entry.model || null,
      entry.connectionId || null,
      entry.apiKeyId || null,
      entry.apiKeyName || null,
      getLoggedInputTokens(entry.tokens),
      getLoggedOutputTokens(entry.tokens),
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
      timestamp
    );

    // Decoupled via the event bus so usageHistory never imports providerLimits
    // (which would pull the executors/translator graph into the type-check surface).
    emitUsageRecorded(entry.provider, entry.connectionId);
  } catch (error) {
    console.error("Failed to save usage stats:", error);
  }
}

// ──────────────── Get Usage History ────────────────

/**
 * Get usage history with optional filters.
 */
export async function getUsageHistory(filter: any = {}) {
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

export interface ModelLatencyStatsEntry {
  provider: string;
  model: string;
  key: string;
  totalRequests: number;
  successfulRequests: number;
  successRate: number; // 0..1
  avgLatencyMs: number;
  p50LatencyMs: number;
  p95LatencyMs: number;
  p99LatencyMs: number;
  latencyStdDev: number;
  windowHours: number;
}

/**
 * Aggregate rolling latency stats per provider/model from usage_history.
 * Used by auto-combo routing to incorporate real-world latency and reliability.
 */
export async function getModelLatencyStats(
  options: { windowHours?: number; minSamples?: number; maxRows?: number } = {}
): Promise<Record<string, ModelLatencyStatsEntry>> {
  const windowHours =
    Number.isFinite(Number(options.windowHours)) && Number(options.windowHours) > 0
      ? Number(options.windowHours)
      : 24;
  const minSamples =
    Number.isFinite(Number(options.minSamples)) && Number(options.minSamples) > 0
      ? Number(options.minSamples)
      : 1;
  const maxRows =
    Number.isFinite(Number(options.maxRows)) && Number(options.maxRows) > 0
      ? Number(options.maxRows)
      : 10000;

  const db = getDbInstance();
  const sinceIso = new Date(Date.now() - windowHours * 60 * 60 * 1000).toISOString();

  type LatencyRow = {
    provider: string | null;
    model: string | null;
    success: number | null;
    latency_ms: number | null;
  };

  const rows = db
    .prepare(
      `
      SELECT provider, model, success, latency_ms
      FROM usage_history
      WHERE timestamp >= @sinceIso
        AND provider IS NOT NULL
        AND model IS NOT NULL
      ORDER BY timestamp DESC
      LIMIT @maxRows
    `
    )
    .all({ sinceIso, maxRows }) as LatencyRow[];

  const grouped = new Map<
    string,
    {
      provider: string;
      model: string;
      totalRequests: number;
      successfulRequests: number;
      successfulLatencies: number[];
      allLatencies: number[];
    }
  >();

  for (const row of rows) {
    const provider = toStringOrNull(row.provider);
    const model = toStringOrNull(row.model);
    if (!provider || !model) continue;

    const key = `${provider}/${model}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        provider,
        model,
        totalRequests: 0,
        successfulRequests: 0,
        successfulLatencies: [],
        allLatencies: [],
      });
    }

    const bucket = grouped.get(key);
    if (!bucket) continue;

    bucket.totalRequests += 1;
    const isSuccess = toNumber(row.success) !== 0;
    if (isSuccess) bucket.successfulRequests += 1;

    const latency = toNumber(row.latency_ms);
    if (latency > 0) {
      bucket.allLatencies.push(latency);
      if (isSuccess) bucket.successfulLatencies.push(latency);
    }
  }

  const stats: Record<string, ModelLatencyStatsEntry> = {};
  for (const [key, bucket] of grouped.entries()) {
    const baseLatencies =
      bucket.successfulLatencies.length >= minSamples
        ? bucket.successfulLatencies
        : bucket.allLatencies;

    if (baseLatencies.length < minSamples) continue;

    const sorted = [...baseLatencies].sort((a, b) => a - b);
    const avg = sorted.reduce((acc, n) => acc + n, 0) / sorted.length;
    const successRate =
      bucket.totalRequests > 0 ? bucket.successfulRequests / bucket.totalRequests : 0;

    stats[key] = {
      provider: bucket.provider,
      model: bucket.model,
      key,
      totalRequests: bucket.totalRequests,
      successfulRequests: bucket.successfulRequests,
      successRate,
      avgLatencyMs: Math.round(avg),
      p50LatencyMs: Math.round(percentile(sorted, 0.5)),
      p95LatencyMs: Math.round(percentile(sorted, 0.95)),
      p99LatencyMs: Math.round(percentile(sorted, 0.99)),
      latencyStdDev: Math.round(stdDev(sorted, avg)),
      windowHours,
    };
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
  tokens?: any;
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
  } catch (error: any) {
    console.error("[usageDb] Failed to read recent call logs:", error.message);
    return [];
  }
}
