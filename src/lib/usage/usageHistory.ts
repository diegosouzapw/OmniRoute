// @ts-check
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

// ──────────────── Pending Requests (in-memory) ────────────────

const pendingRequests = {
  byModel: {},
  byAccount: {},
};

/**
 * Track a pending request.
 */
export function trackPendingRequest(model, provider, connectionId, started) {
  const modelKey = provider ? `${model} (${provider})` : model;

  if (!pendingRequests.byModel[modelKey]) pendingRequests.byModel[modelKey] = 0;
  pendingRequests.byModel[modelKey] = Math.max(
    0,
    pendingRequests.byModel[modelKey] + (started ? 1 : -1)
  );

  if (connectionId) {
    if (!pendingRequests.byAccount[connectionId]) pendingRequests.byAccount[connectionId] = {};
    if (!pendingRequests.byAccount[connectionId][modelKey])
      pendingRequests.byAccount[connectionId][modelKey] = 0;
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

  const history = rows.map((r) => ({
    provider: r.provider,
    model: r.model,
    connectionId: r.connection_id,
    apiKeyId: r.api_key_id,
    apiKeyName: r.api_key_name,
    tokens: {
      input: r.tokens_input,
      output: r.tokens_output,
      cacheRead: r.tokens_cache_read,
      cacheCreation: r.tokens_cache_creation,
      reasoning: r.tokens_reasoning,
    },
    status: r.status,
    timestamp: r.timestamp,
  }));

  return { data: { history } };
}

// ──────────────── Save Request Usage ────────────────

/**
 * Save request usage entry to SQLite.
 */
export async function saveRequestUsage(entry) {
  if (!shouldPersistToDisk) return;

  try {
    const db = getDbInstance();
    const timestamp = entry.timestamp || new Date().toISOString();

    db.prepare(
      `
      INSERT INTO usage_history (provider, model, connection_id, api_key_id, api_key_name,
        tokens_input, tokens_output, tokens_cache_read, tokens_cache_creation, tokens_reasoning,
        status, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    ).run(
      entry.provider || null,
      entry.model || null,
      entry.connectionId || null,
      entry.apiKeyId || null,
      entry.apiKeyName || null,
      entry.tokens?.input ?? entry.tokens?.prompt_tokens ?? 0,
      entry.tokens?.output ?? entry.tokens?.completion_tokens ?? 0,
      entry.tokens?.cacheRead ?? entry.tokens?.cached_tokens ?? 0,
      entry.tokens?.cacheCreation ?? entry.tokens?.cache_creation_input_tokens ?? 0,
      entry.tokens?.reasoning ?? entry.tokens?.reasoning_tokens ?? 0,
      entry.status || null,
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
export async function getUsageHistory(filter = {}) {
  const db = getDbInstance();
  let sql = "SELECT * FROM usage_history";
  const conditions = [];
  const params = {};

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
  return rows.map((r) => ({
    provider: r.provider,
    model: r.model,
    connectionId: r.connection_id,
    apiKeyId: r.api_key_id,
    apiKeyName: r.api_key_name,
    tokens: {
      input: r.tokens_input,
      output: r.tokens_output,
      cacheRead: r.tokens_cache_read,
      cacheCreation: r.tokens_cache_creation,
      reasoning: r.tokens_reasoning,
    },
    status: r.status,
    timestamp: r.timestamp,
  }));
}

// ──────────────── Request Log (log.txt) ────────────────

import fs from "fs";
import { LOG_FILE } from "./migrations";

function formatLogDate(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
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
export async function appendRequestLog({ model, provider, connectionId, tokens, status }) {
  if (!shouldPersistToDisk) return;

  try {
    const timestamp = formatLogDate();
    const p = provider?.toUpperCase() || "-";
    const m = model || "-";

    let account = connectionId ? connectionId.slice(0, 8) : "-";
    try {
      const { getProviderConnections } = await import("@/lib/localDb");
      const connections = await getProviderConnections();
      const conn = connections.find((c) => c.id === connectionId);
      if (conn) account = conn.name || conn.email || account;
    } catch {}

    const sent =
      tokens?.input !== undefined
        ? tokens.input
        : tokens?.prompt_tokens !== undefined
          ? tokens.prompt_tokens
          : "-";
    const received =
      tokens?.output !== undefined
        ? tokens.output
        : tokens?.completion_tokens !== undefined
          ? tokens.completion_tokens
          : "-";

    const line = `${timestamp} | ${m} | ${p} | ${account} | ${sent} | ${received} | ${status}\n`;
    fs.appendFileSync(LOG_FILE, line);

    const content = fs.readFileSync(LOG_FILE, "utf-8");
    const lines = content.trim().split("\n");
    if (lines.length > 200) {
      fs.writeFileSync(LOG_FILE, lines.slice(-200).join("\n") + "\n");
    }
  } catch (error) {
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
  } catch (error) {
    console.error("[usageDb] Failed to read log.txt:", error.message);
    return [];
  }
}
