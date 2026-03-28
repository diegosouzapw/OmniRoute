/**
 * Usage History — extracted from usageDb.js (T-15)
 *
 * Usage tracking: saving, querying, and analytics shim for
 * the usage_history SQLite table.
 *
 * @module lib/usage/usageHistory
 */

import { getDbInstance } from "../db/core";
import { shouldPersistToDisk } from "./migrations";
import {
  getLoggedInputTokens,
  getLoggedOutputTokens,
  getPromptCacheCreationTokens,
  getPromptCacheReadTokens,
} from "./tokenAccounting";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
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

// ──────────────── Pending Requests (in-memory) ────────────────

const pendingRequests: {
  byModel: Record<string, number>;
  byAccount: Record<string, Record<string, number>>;
} = {
  byModel: Object.create(null) as Record<string, number>,
  byAccount: Object.create(null) as Record<string, Record<string, number>>,
};

/**
 * Track a pending request.
 */
export function trackPendingRequest(
  model: string,
  provider: string,
  connectionId: string | null,
  started: boolean
) {
  const modelKey = provider ? `${model} (${provider})` : model;

  // Use hasOwnProperty guard to prevent prototype pollution via crafted keys
  if (!Object.prototype.hasOwnProperty.call(pendingRequests.byModel, modelKey)) {
    pendingRequests.byModel[modelKey] = 0;
  }
  pendingRequests.byModel[modelKey] = Math.max(
    0,
    pendingRequests.byModel[modelKey] + (started ? 1 : -1)
  );

  if (connectionId) {
    if (!Object.prototype.hasOwnProperty.call(pendingRequests.byAccount, connectionId)) {
      pendingRequests.byAccount[connectionId] = Object.create(null) as Record<string, number>;
    }
    if (!Object.prototype.hasOwnProperty.call(pendingRequests.byAccount[connectionId], modelKey)) {
      pendingRequests.byAccount[connectionId][modelKey] = 0;
    }
    pendingRequests.byAccount[connectionId][modelKey] = Math.max(
      0,
      pendingRequests.byAccount[connectionId][modelKey] + (started ? 1 : -1)
    );
  }
}

/**
 * Get the pending requests state (for usageStats).
 * @returns {{ byModel: Object, byAccount: Object }}
 */
export function getPendingRequests() {
  return pendingRequests;
}

// ──────────────── getUsageDb Shim (backward compat) ────────────────

/**
 * Returns an object compatible with the old LowDB interface.
 * Only `api/usage/analytics/route.js` uses this — it reads `db.data.history`.
 */
export async function getUsageDb() {
  const db = getDbInstance();
  const rows = db.prepare("SELECT * FROM usage_history ORDER BY timestamp ASC").all();

  const history = rows.map((row) => {
    const r = asRecord(row);
    return {
      provider: toStringOrNull(r.provider),
      model: toStringOrNull(r.model),
      connectionId: toStringOrNull(r.connection_id),
      apiKeyId: toStringOrNull(r.api_key_id),
      apiKeyName: toStringOrNull(r.api_key_name),
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

  return { data: { history } };
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

    db.prepare(
      `
      INSERT INTO usage_history (provider, model, connection_id, api_key_id, api_key_name,
        tokens_input, tokens_output, tokens_cache_read, tokens_cache_creation, tokens_reasoning,
        status, success, latency_ms, ttft_ms, error_code, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      entry.tokens?.reasoning ?? entry.tokens?.reasoning_tokens ?? 0,
      entry.status || null,
      entry.success === false ? 0 : 1,
      Number.isFinite(Number(entry.latencyMs)) ? Number(entry.latencyMs) : 0,
      Number.isFinite(Number(entry.timeToFirstTokenMs))
        ? Number(entry.timeToFirstTokenMs)
        : Number.isFinite(Number(entry.latencyMs))
          ? Number(entry.latencyMs)
          : 0,
      entry.errorCode || null,
      timestamp
    );
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

// ──────────────── Request Log (log.txt) ────────────────

import fs from "fs";
import { LOG_FILE } from "./migrations";

function formatLogDate(date = new Date()) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const d = pad(date.getDate());
  const m = pad(date.getMonth() + 1);
  const y = date.getFullYear();
  const h = pad(date.getHours());
  const min = pad(date.getMinutes());
  const s = pad(date.getSeconds());
  return `${d}-${m}-${y} ${h}:${min}:${s}`;
}

/**
 * Append to log.txt.
 */
export async function appendRequestLog({
  model,
  provider,
  connectionId,
  tokens,
  status,
}: {
  model?: string;
  provider?: string;
  connectionId?: string;
  tokens?: any;
  status?: string | number;
}) {
  if (!shouldPersistToDisk) return;

  try {
    const timestamp = formatLogDate();
    const p = provider?.toUpperCase() || "-";
    const m = model || "-";

    let account = connectionId ? connectionId.slice(0, 8) : "-";
    try {
      const { getProviderConnections } = await import("@/lib/localDb");
      const connections = await getProviderConnections();
      const connRaw = connections.find((c) => asRecord(c).id === connectionId);
      if (connRaw) {
        const conn = asRecord(connRaw);
        account = toStringOrNull(conn.name) || toStringOrNull(conn.email) || account;
      }
    } catch {}

    const sent = tokens ? getLoggedInputTokens(tokens) : "-";
    const received = tokens ? getLoggedOutputTokens(tokens) : "-";

    const line = `${timestamp} | ${m} | ${p} | ${account} | ${sent} | ${received} | ${status}\n`;
    fs.appendFileSync(LOG_FILE, line);

    const content = fs.readFileSync(LOG_FILE, "utf-8");
    const lines = content.trim().split("\n");
    if (lines.length > 200) {
      fs.writeFileSync(LOG_FILE, lines.slice(-200).join("\n") + "\n");
    }
  } catch (error: any) {
    console.error("Failed to append to log.txt:", error.message);
  }
}

/**
 * Get last N lines of log.txt.
 */
export async function getRecentLogs(limit = 200) {
  if (!shouldPersistToDisk) return [];
  if (!fs || typeof fs.existsSync !== "function") return [];
  if (!LOG_FILE) return [];
  if (!fs.existsSync(LOG_FILE)) return [];

  try {
    const content = fs.readFileSync(LOG_FILE, "utf-8");
    const lines = content.trim().split("\n");
    return lines.slice(-limit).reverse();
  } catch (error: any) {
    console.error("[usageDb] Failed to read log.txt:", error.message);
    return [];
  }
}
