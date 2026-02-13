/**
 * usageDb.js — Usage tracking, request logging, and call logs.
 *
 * P1.2: Migrated from LowDB/JSON to SQLite.
 * - usage_history table replaces usage.json
 * - call_logs table replaces call_logs.json
 * - log.txt and call_logs/ disk files remain file-based
 */

import path from "path";
import fs from "fs";
import { getDbInstance, isCloud, isBuildPhase, DATA_DIR } from "./db/core.js";
import { resolveDataDir, getLegacyDotDataDir, isSamePath } from "./dataPaths.js";

const shouldPersistToDisk = !isCloud && !isBuildPhase;

// ──────────────── File Paths (log.txt + call_logs/) ────────────────

const LEGACY_DATA_DIR = isCloud ? null : getLegacyDotDataDir();
const LOG_FILE = isCloud ? null : path.join(DATA_DIR, "log.txt");
const CALL_LOGS_DIR = isCloud ? null : path.join(DATA_DIR, "call_logs");

// Legacy paths for migration
const LEGACY_DB_FILE =
  isCloud || !LEGACY_DATA_DIR ? null : path.join(LEGACY_DATA_DIR, "usage.json");
const LEGACY_LOG_FILE = isCloud || !LEGACY_DATA_DIR ? null : path.join(LEGACY_DATA_DIR, "log.txt");
const LEGACY_CALL_LOGS_DB_FILE =
  isCloud || !LEGACY_DATA_DIR ? null : path.join(LEGACY_DATA_DIR, "call_logs.json");
const LEGACY_CALL_LOGS_DIR =
  isCloud || !LEGACY_DATA_DIR ? null : path.join(LEGACY_DATA_DIR, "call_logs");

// Current-location JSON files (for migration into SQLite)
const USAGE_JSON_FILE = isCloud ? null : path.join(DATA_DIR, "usage.json");
const CALL_LOGS_JSON_FILE = isCloud ? null : path.join(DATA_DIR, "call_logs.json");

// ──────────────── Legacy File Migration ────────────────

function copyIfMissing(fromPath, toPath, label) {
  if (!fromPath || !toPath) return;
  if (!fs.existsSync(fromPath) || fs.existsSync(toPath)) return;

  if (fs.statSync(fromPath).isDirectory()) {
    fs.cpSync(fromPath, toPath, { recursive: true });
  } else {
    fs.copyFileSync(fromPath, toPath);
  }
  console.log(`[usageDb] Migrated ${label}: ${fromPath} -> ${toPath}`);
}

function migrateLegacyUsageFiles() {
  if (!shouldPersistToDisk || !LEGACY_DATA_DIR) return;
  if (isSamePath(DATA_DIR, LEGACY_DATA_DIR)) return;

  try {
    copyIfMissing(LEGACY_DB_FILE, USAGE_JSON_FILE, "usage history");
    copyIfMissing(LEGACY_LOG_FILE, LOG_FILE, "request log");
    copyIfMissing(LEGACY_CALL_LOGS_DB_FILE, CALL_LOGS_JSON_FILE, "call log index");
    copyIfMissing(LEGACY_CALL_LOGS_DIR, CALL_LOGS_DIR, "call log files");
  } catch (error) {
    console.error("[usageDb] Legacy migration failed:", error.message);
  }
}

migrateLegacyUsageFiles();

// ──────────────── JSON → SQLite Migration ────────────────

function migrateUsageJsonToSqlite() {
  if (!shouldPersistToDisk) return;
  const db = getDbInstance();

  // 1. Migrate usage.json
  if (USAGE_JSON_FILE && fs.existsSync(USAGE_JSON_FILE)) {
    try {
      const raw = fs.readFileSync(USAGE_JSON_FILE, "utf-8");
      const data = JSON.parse(raw);
      const history = data.history || [];

      if (history.length > 0) {
        console.log(`[usageDb] Migrating ${history.length} usage entries from JSON → SQLite...`);

        const insert = db.prepare(`
          INSERT INTO usage_history (provider, model, connection_id, api_key_id, api_key_name,
            tokens_input, tokens_output, tokens_cache_read, tokens_cache_creation, tokens_reasoning,
            status, timestamp)
          VALUES (@provider, @model, @connectionId, @apiKeyId, @apiKeyName,
            @tokensInput, @tokensOutput, @tokensCacheRead, @tokensCacheCreation, @tokensReasoning,
            @status, @timestamp)
        `);

        const tx = db.transaction(() => {
          for (const entry of history) {
            insert.run({
              provider: entry.provider || null,
              model: entry.model || null,
              connectionId: entry.connectionId || null,
              apiKeyId: entry.apiKeyId || null,
              apiKeyName: entry.apiKeyName || null,
              tokensInput: entry.tokens?.input ?? entry.tokens?.prompt_tokens ?? 0,
              tokensOutput: entry.tokens?.output ?? entry.tokens?.completion_tokens ?? 0,
              tokensCacheRead: entry.tokens?.cacheRead ?? entry.tokens?.cached_tokens ?? 0,
              tokensCacheCreation:
                entry.tokens?.cacheCreation ?? entry.tokens?.cache_creation_input_tokens ?? 0,
              tokensReasoning: entry.tokens?.reasoning ?? entry.tokens?.reasoning_tokens ?? 0,
              status: entry.status || null,
              timestamp: entry.timestamp || new Date().toISOString(),
            });
          }
        });
        tx();
        console.log(`[usageDb] ✓ Migrated ${history.length} usage entries`);
      }

      fs.renameSync(USAGE_JSON_FILE, USAGE_JSON_FILE + ".migrated");
    } catch (err) {
      console.error("[usageDb] Failed to migrate usage.json:", err.message);
    }
  }

  // 2. Migrate call_logs.json
  if (CALL_LOGS_JSON_FILE && fs.existsSync(CALL_LOGS_JSON_FILE)) {
    try {
      const raw = fs.readFileSync(CALL_LOGS_JSON_FILE, "utf-8");
      const data = JSON.parse(raw);
      const logs = data.logs || [];

      if (logs.length > 0) {
        console.log(`[usageDb] Migrating ${logs.length} call log entries from JSON → SQLite...`);

        const insert = db.prepare(`
          INSERT OR IGNORE INTO call_logs (id, timestamp, method, path, status, model, provider,
            account, connection_id, duration, tokens_in, tokens_out, source_format, target_format,
            api_key_id, api_key_name, combo_name, request_body, response_body, error)
          VALUES (@id, @timestamp, @method, @path, @status, @model, @provider,
            @account, @connectionId, @duration, @tokensIn, @tokensOut, @sourceFormat, @targetFormat,
            @apiKeyId, @apiKeyName, @comboName, @requestBody, @responseBody, @error)
        `);

        const tx = db.transaction(() => {
          for (const log of logs) {
            insert.run({
              id: log.id || `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              timestamp: log.timestamp || new Date().toISOString(),
              method: log.method || "POST",
              path: log.path || null,
              status: log.status || 0,
              model: log.model || null,
              provider: log.provider || null,
              account: log.account || null,
              connectionId: log.connectionId || null,
              duration: log.duration || 0,
              tokensIn: log.tokens?.in ?? 0,
              tokensOut: log.tokens?.out ?? 0,
              sourceFormat: log.sourceFormat || null,
              targetFormat: log.targetFormat || null,
              apiKeyId: log.apiKeyId || null,
              apiKeyName: log.apiKeyName || null,
              comboName: log.comboName || null,
              requestBody: log.requestBody ? JSON.stringify(log.requestBody) : null,
              responseBody: log.responseBody ? JSON.stringify(log.responseBody) : null,
              error: log.error || null,
            });
          }
        });
        tx();
        console.log(`[usageDb] ✓ Migrated ${logs.length} call log entries`);
      }

      fs.renameSync(CALL_LOGS_JSON_FILE, CALL_LOGS_JSON_FILE + ".migrated");
    } catch (err) {
      console.error("[usageDb] Failed to migrate call_logs.json:", err.message);
    }
  }
}

// Run migration on module load
if (shouldPersistToDisk) {
  try {
    migrateUsageJsonToSqlite();
  } catch {
    /* ok */
  }
}

// ──────────────── Pending Requests (in-memory) ────────────────

const pendingRequests = {
  byModel: {},
  byAccount: {},
};

/**
 * Track a pending request
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
 * Save request usage entry to SQLite
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
 * Get usage history with optional filters
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

// ──────────────── Request Log (log.txt — file-based) ────────────────

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
 * Append to log.txt
 */
export async function appendRequestLog({ model, provider, connectionId, tokens, status }) {
  if (!shouldPersistToDisk) return;

  try {
    const timestamp = formatLogDate();
    const p = provider?.toUpperCase() || "-";
    const m = model || "-";

    let account = connectionId ? connectionId.slice(0, 8) : "-";
    try {
      const { getProviderConnections } = await import("@/lib/localDb.js");
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
 * Get last N lines of log.txt
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

// ──────────────── Calculate Cost ────────────────

/**
 * Calculate cost for a usage entry (pure function, no DB interaction)
 */
export async function calculateCost(provider, model, tokens) {
  if (!tokens || !provider || !model) return 0;

  try {
    const { getPricingForModel } = await import("@/lib/localDb.js");
    const pricing = await getPricingForModel(provider, model);
    if (!pricing) return 0;

    let cost = 0;

    const inputTokens = tokens.input ?? tokens.prompt_tokens ?? tokens.input_tokens ?? 0;
    const cachedTokens =
      tokens.cacheRead ?? tokens.cached_tokens ?? tokens.cache_read_input_tokens ?? 0;
    const nonCachedInput = Math.max(0, inputTokens - cachedTokens);
    cost += nonCachedInput * (pricing.input / 1000000);

    if (cachedTokens > 0) {
      cost += cachedTokens * ((pricing.cached || pricing.input) / 1000000);
    }

    const outputTokens = tokens.output ?? tokens.completion_tokens ?? tokens.output_tokens ?? 0;
    cost += outputTokens * (pricing.output / 1000000);

    const reasoningTokens = tokens.reasoning ?? tokens.reasoning_tokens ?? 0;
    if (reasoningTokens > 0) {
      cost += reasoningTokens * ((pricing.reasoning || pricing.output) / 1000000);
    }

    const cacheCreationTokens = tokens.cacheCreation ?? tokens.cache_creation_input_tokens ?? 0;
    if (cacheCreationTokens > 0) {
      cost += cacheCreationTokens * ((pricing.cache_creation || pricing.input) / 1000000);
    }

    return cost;
  } catch (error) {
    console.error("Error calculating cost:", error);
    return 0;
  }
}

// ──────────────── Usage Stats ────────────────

/**
 * Get aggregated usage stats
 */
export async function getUsageStats() {
  const db = getDbInstance();
  const rows = db.prepare("SELECT * FROM usage_history ORDER BY timestamp ASC").all();

  const { getProviderConnections } = await import("@/lib/localDb.js");
  let allConnections = [];
  try {
    allConnections = await getProviderConnections();
  } catch {}

  const connectionMap = {};
  for (const conn of allConnections) {
    connectionMap[conn.id] = conn.name || conn.email || conn.id;
  }

  const stats = {
    totalRequests: rows.length,
    totalPromptTokens: 0,
    totalCompletionTokens: 0,
    totalCost: 0,
    byProvider: {},
    byModel: {},
    byAccount: {},
    byApiKey: {},
    last10Minutes: [],
    pending: pendingRequests,
    activeRequests: [],
  };

  // Build active requests
  for (const [connectionId, models] of Object.entries(pendingRequests.byAccount)) {
    for (const [modelKey, count] of Object.entries(models)) {
      if (count > 0) {
        const accountName = connectionMap[connectionId] || `Account ${connectionId.slice(0, 8)}...`;
        const match = modelKey.match(/^(.*) \((.*)\)$/);
        stats.activeRequests.push({
          model: match ? match[1] : modelKey,
          provider: match ? match[2] : "unknown",
          account: accountName,
          count,
        });
      }
    }
  }

  // 10-minute buckets
  const now = new Date();
  const currentMinuteStart = new Date(Math.floor(now.getTime() / 60000) * 60000);
  const tenMinutesAgo = new Date(currentMinuteStart.getTime() - 9 * 60 * 1000);

  const bucketMap = {};
  for (let i = 0; i < 10; i++) {
    const bucketTime = new Date(currentMinuteStart.getTime() - (9 - i) * 60 * 1000);
    const bucketKey = bucketTime.getTime();
    bucketMap[bucketKey] = { requests: 0, promptTokens: 0, completionTokens: 0, cost: 0 };
    stats.last10Minutes.push(bucketMap[bucketKey]);
  }

  for (const row of rows) {
    const promptTokens = row.tokens_input || 0;
    const completionTokens = row.tokens_output || 0;
    const entryTime = new Date(row.timestamp);

    const entryTokens = {
      input: row.tokens_input,
      output: row.tokens_output,
      cacheRead: row.tokens_cache_read,
      cacheCreation: row.tokens_cache_creation,
      reasoning: row.tokens_reasoning,
    };
    const entryCost = await calculateCost(row.provider, row.model, entryTokens);

    stats.totalPromptTokens += promptTokens;
    stats.totalCompletionTokens += completionTokens;
    stats.totalCost += entryCost;

    // 10-min buckets
    if (entryTime >= tenMinutesAgo && entryTime <= now) {
      const entryMinuteStart = Math.floor(entryTime.getTime() / 60000) * 60000;
      if (bucketMap[entryMinuteStart]) {
        bucketMap[entryMinuteStart].requests++;
        bucketMap[entryMinuteStart].promptTokens += promptTokens;
        bucketMap[entryMinuteStart].completionTokens += completionTokens;
        bucketMap[entryMinuteStart].cost += entryCost;
      }
    }

    // By Provider
    if (!stats.byProvider[row.provider]) {
      stats.byProvider[row.provider] = {
        requests: 0,
        promptTokens: 0,
        completionTokens: 0,
        cost: 0,
      };
    }
    stats.byProvider[row.provider].requests++;
    stats.byProvider[row.provider].promptTokens += promptTokens;
    stats.byProvider[row.provider].completionTokens += completionTokens;
    stats.byProvider[row.provider].cost += entryCost;

    // By Model
    const modelKey = row.provider ? `${row.model} (${row.provider})` : row.model;
    if (!stats.byModel[modelKey]) {
      stats.byModel[modelKey] = {
        requests: 0,
        promptTokens: 0,
        completionTokens: 0,
        cost: 0,
        rawModel: row.model,
        provider: row.provider,
        lastUsed: row.timestamp,
      };
    }
    stats.byModel[modelKey].requests++;
    stats.byModel[modelKey].promptTokens += promptTokens;
    stats.byModel[modelKey].completionTokens += completionTokens;
    stats.byModel[modelKey].cost += entryCost;
    if (new Date(row.timestamp) > new Date(stats.byModel[modelKey].lastUsed)) {
      stats.byModel[modelKey].lastUsed = row.timestamp;
    }

    // By Account
    if (row.connection_id) {
      const accountName =
        connectionMap[row.connection_id] || `Account ${row.connection_id.slice(0, 8)}...`;
      const accountKey = `${row.model} (${row.provider} - ${accountName})`;
      if (!stats.byAccount[accountKey]) {
        stats.byAccount[accountKey] = {
          requests: 0,
          promptTokens: 0,
          completionTokens: 0,
          cost: 0,
          rawModel: row.model,
          provider: row.provider,
          connectionId: row.connection_id,
          accountName,
          lastUsed: row.timestamp,
        };
      }
      stats.byAccount[accountKey].requests++;
      stats.byAccount[accountKey].promptTokens += promptTokens;
      stats.byAccount[accountKey].completionTokens += completionTokens;
      stats.byAccount[accountKey].cost += entryCost;
      if (new Date(row.timestamp) > new Date(stats.byAccount[accountKey].lastUsed)) {
        stats.byAccount[accountKey].lastUsed = row.timestamp;
      }
    }

    // By API key
    if (row.api_key_id || row.api_key_name) {
      const keyName = row.api_key_name || row.api_key_id || "unknown";
      const keyId = row.api_key_id || null;
      const apiKey = keyId ? `${keyName} (${keyId})` : keyName;
      if (!stats.byApiKey[apiKey]) {
        stats.byApiKey[apiKey] = {
          requests: 0,
          promptTokens: 0,
          completionTokens: 0,
          cost: 0,
          apiKeyId: keyId,
          apiKeyName: keyName,
          lastUsed: row.timestamp,
        };
      }
      stats.byApiKey[apiKey].requests++;
      stats.byApiKey[apiKey].promptTokens += promptTokens;
      stats.byApiKey[apiKey].completionTokens += completionTokens;
      stats.byApiKey[apiKey].cost += entryCost;
      if (new Date(row.timestamp) > new Date(stats.byApiKey[apiKey].lastUsed)) {
        stats.byApiKey[apiKey].lastUsed = row.timestamp;
      }
    }
  }

  return stats;
}

// ============================================================================
// Call Logs — Structured logs for the Logger UI
// ============================================================================

const CALL_LOGS_MAX = 500;

let logIdCounter = 0;
function generateLogId() {
  logIdCounter++;
  return `${Date.now()}-${logIdCounter}`;
}

/**
 * Save a structured call log entry
 */
export async function saveCallLog(entry) {
  if (!shouldPersistToDisk) return;

  try {
    // Resolve account name
    let account = entry.connectionId ? entry.connectionId.slice(0, 8) : "-";
    try {
      const { getProviderConnections } = await import("@/lib/localDb.js");
      const connections = await getProviderConnections();
      const conn = connections.find((c) => c.id === entry.connectionId);
      if (conn) account = conn.name || conn.email || account;
    } catch {}

    // Truncate large payloads for DB storage (keep under 8KB each)
    const truncatePayload = (obj) => {
      if (!obj) return null;
      const str = JSON.stringify(obj);
      if (str.length <= 8192) return str;
      try {
        return JSON.stringify({
          _truncated: true,
          _originalSize: str.length,
          _preview: str.slice(0, 8192) + "...",
        });
      } catch {
        return JSON.stringify({ _truncated: true });
      }
    };

    const logEntry = {
      id: generateLogId(),
      timestamp: new Date().toISOString(),
      method: entry.method || "POST",
      path: entry.path || "/v1/chat/completions",
      status: entry.status || 0,
      model: entry.model || "-",
      provider: entry.provider || "-",
      account,
      connectionId: entry.connectionId || null,
      duration: entry.duration || 0,
      tokensIn: entry.tokens?.prompt_tokens || 0,
      tokensOut: entry.tokens?.completion_tokens || 0,
      sourceFormat: entry.sourceFormat || null,
      targetFormat: entry.targetFormat || null,
      apiKeyId: entry.apiKeyId || null,
      apiKeyName: entry.apiKeyName || null,
      comboName: entry.comboName || null,
      requestBody: truncatePayload(entry.requestBody),
      responseBody: truncatePayload(entry.responseBody),
      error: entry.error || null,
    };

    // 1. Insert into SQLite
    const db = getDbInstance();
    db.prepare(
      `
      INSERT INTO call_logs (id, timestamp, method, path, status, model, provider,
        account, connection_id, duration, tokens_in, tokens_out, source_format, target_format,
        api_key_id, api_key_name, combo_name, request_body, response_body, error)
      VALUES (@id, @timestamp, @method, @path, @status, @model, @provider,
        @account, @connectionId, @duration, @tokensIn, @tokensOut, @sourceFormat, @targetFormat,
        @apiKeyId, @apiKeyName, @comboName, @requestBody, @responseBody, @error)
    `
    ).run(logEntry);

    // 2. Trim old entries beyond CALL_LOGS_MAX
    const count = db.prepare("SELECT COUNT(*) as cnt FROM call_logs").get()?.cnt || 0;
    if (count > CALL_LOGS_MAX) {
      db.prepare(
        `
        DELETE FROM call_logs WHERE id IN (
          SELECT id FROM call_logs ORDER BY timestamp ASC LIMIT ?
        )
      `
      ).run(count - CALL_LOGS_MAX);
    }

    // 3. Write full payload to disk file (untruncated)
    writeCallLogToDisk(
      { ...logEntry, tokens: { in: logEntry.tokensIn, out: logEntry.tokensOut } },
      entry.requestBody,
      entry.responseBody
    );
  } catch (error) {
    console.error("[callLogs] Failed to save call log:", error.message);
  }
}

/**
 * Write call log as JSON file to disk (full payloads, not truncated)
 */
function writeCallLogToDisk(logEntry, requestBody, responseBody) {
  if (!CALL_LOGS_DIR) return;

  try {
    const now = new Date();
    const dateFolder = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const dir = path.join(CALL_LOGS_DIR, dateFolder);

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const safeModel = (logEntry.model || "unknown").replace(/[/:]/g, "-");
    const time = `${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
    const filename = `${time}_${safeModel}_${logEntry.status}.json`;

    const fullEntry = {
      ...logEntry,
      requestBody: requestBody || null,
      responseBody: responseBody || null,
    };

    fs.writeFileSync(path.join(dir, filename), JSON.stringify(fullEntry, null, 2));
  } catch (err) {
    console.error("[callLogs] Failed to write disk log:", err.message);
  }
}

/**
 * Rotate old call log directories (keep last 7 days)
 */
export function rotateCallLogs() {
  if (!CALL_LOGS_DIR || !fs.existsSync(CALL_LOGS_DIR)) return;

  try {
    const entries = fs.readdirSync(CALL_LOGS_DIR);
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    for (const entry of entries) {
      const entryPath = path.join(CALL_LOGS_DIR, entry);
      const stat = fs.statSync(entryPath);
      if (stat.isDirectory() && now - stat.mtimeMs > sevenDays) {
        fs.rmSync(entryPath, { recursive: true, force: true });
        console.log(`[callLogs] Rotated old logs: ${entry}`);
      }
    }
  } catch (err) {
    console.error("[callLogs] Failed to rotate logs:", err.message);
  }
}

// Run rotation on startup
if (shouldPersistToDisk) {
  try {
    rotateCallLogs();
  } catch {}
}

/**
 * Get call logs with optional filtering
 */
export async function getCallLogs(filter = {}) {
  const db = getDbInstance();
  let sql = "SELECT * FROM call_logs";
  const conditions = [];
  const params = {};

  if (filter.status) {
    if (filter.status === "error") {
      conditions.push("(status >= 400 OR error IS NOT NULL)");
    } else if (filter.status === "ok") {
      conditions.push("status >= 200 AND status < 300");
    } else {
      const statusCode = parseInt(filter.status);
      if (!isNaN(statusCode)) {
        conditions.push("status = @statusCode");
        params.statusCode = statusCode;
      }
    }
  }

  if (filter.model) {
    conditions.push("model LIKE @modelQ");
    params.modelQ = `%${filter.model}%`;
  }
  if (filter.provider) {
    conditions.push("provider LIKE @providerQ");
    params.providerQ = `%${filter.provider}%`;
  }
  if (filter.account) {
    conditions.push("account LIKE @accountQ");
    params.accountQ = `%${filter.account}%`;
  }
  if (filter.apiKey) {
    conditions.push("(api_key_name LIKE @apiKeyQ OR api_key_id LIKE @apiKeyQ)");
    params.apiKeyQ = `%${filter.apiKey}%`;
  }
  if (filter.combo) {
    conditions.push("combo_name IS NOT NULL");
  }
  if (filter.search) {
    conditions.push(`(
      model LIKE @searchQ OR path LIKE @searchQ OR account LIKE @searchQ OR
      provider LIKE @searchQ OR api_key_name LIKE @searchQ OR api_key_id LIKE @searchQ OR
      combo_name LIKE @searchQ OR CAST(status AS TEXT) LIKE @searchQ
    )`);
    params.searchQ = `%${filter.search}%`;
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  const limit = filter.limit || 200;
  sql += ` ORDER BY timestamp DESC LIMIT ${limit}`;

  const rows = db.prepare(sql).all(params);

  return rows.map((l) => ({
    id: l.id,
    timestamp: l.timestamp,
    method: l.method,
    path: l.path,
    status: l.status,
    model: l.model,
    provider: l.provider,
    account: l.account,
    duration: l.duration,
    tokens: { in: l.tokens_in, out: l.tokens_out },
    sourceFormat: l.source_format,
    targetFormat: l.target_format,
    error: l.error,
    comboName: l.combo_name || null,
    apiKeyId: l.api_key_id || null,
    apiKeyName: l.api_key_name || null,
    hasRequestBody: !!l.request_body,
    hasResponseBody: !!l.response_body,
  }));
}

/**
 * Get a single call log by ID (with full payloads from disk when available)
 */
export async function getCallLogById(id) {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM call_logs WHERE id = ?").get(id);
  if (!row) return null;

  const entry = {
    id: row.id,
    timestamp: row.timestamp,
    method: row.method,
    path: row.path,
    status: row.status,
    model: row.model,
    provider: row.provider,
    account: row.account,
    connectionId: row.connection_id,
    duration: row.duration,
    tokens: { in: row.tokens_in, out: row.tokens_out },
    sourceFormat: row.source_format,
    targetFormat: row.target_format,
    apiKeyId: row.api_key_id,
    apiKeyName: row.api_key_name,
    comboName: row.combo_name,
    requestBody: row.request_body ? JSON.parse(row.request_body) : null,
    responseBody: row.response_body ? JSON.parse(row.response_body) : null,
    error: row.error,
  };

  // If payloads were truncated, try to read full version from disk
  const needsDisk = entry.requestBody?._truncated || entry.responseBody?._truncated;
  if (needsDisk && CALL_LOGS_DIR) {
    try {
      const diskEntry = readFullLogFromDisk(entry);
      if (diskEntry) {
        return {
          ...entry,
          requestBody: diskEntry.requestBody ?? entry.requestBody,
          responseBody: diskEntry.responseBody ?? entry.responseBody,
        };
      }
    } catch (err) {
      console.error("[callLogs] Failed to read full log from disk:", err.message);
    }
  }

  return entry;
}

/**
 * Read the full (untruncated) log entry from disk
 */
function readFullLogFromDisk(entry) {
  if (!CALL_LOGS_DIR || !entry.timestamp) return null;

  try {
    const date = new Date(entry.timestamp);
    const dateFolder = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const dir = path.join(CALL_LOGS_DIR, dateFolder);

    if (!fs.existsSync(dir)) return null;

    const time = `${String(date.getHours()).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}${String(date.getSeconds()).padStart(2, "0")}`;
    const safeModel = (entry.model || "unknown").replace(/[/:]/g, "-");
    const expectedName = `${time}_${safeModel}_${entry.status}.json`;

    const exactPath = path.join(dir, expectedName);
    if (fs.existsSync(exactPath)) {
      return JSON.parse(fs.readFileSync(exactPath, "utf8"));
    }

    const files = fs
      .readdirSync(dir)
      .filter((f) => f.startsWith(time) && f.endsWith(`_${entry.status}.json`));
    if (files.length > 0) {
      return JSON.parse(fs.readFileSync(path.join(dir, files[0]), "utf8"));
    }
  } catch (err) {
    console.error("[callLogs] Disk log read error:", err.message);
  }

  return null;
}
