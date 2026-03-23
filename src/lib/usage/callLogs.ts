/**
 * Call Logs — extracted from usageDb.js (T-15)
 *
 * Structured call log management: save, query, rotate, and
 * full-payload disk storage for the Logger UI.
 *
 * @module lib/usage/callLogs
 */

import path from "path";
import fs from "fs";
import { getDbInstance } from "../db/core";
import { shouldPersistToDisk, CALL_LOGS_DIR } from "./migrations";
import { isNoLog } from "../compliance";
import { sanitizePII } from "../piiSanitizer";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function parseJsonString(value: unknown): unknown | null {
  if (typeof value !== "string" || value.trim().length === 0) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function hasTruncatedFlag(value: unknown): boolean {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return (value as Record<string, unknown>)._truncated === true;
}

const CALL_LOGS_MAX = parseInt(process.env.CALL_LOGS_MAX || "200", 10);
const LOG_RETENTION_DAYS = parseInt(process.env.LOG_RETENTION_DAYS || "7", 10);
const CALL_LOG_PAYLOAD_MODE = (() => {
  const value = (process.env.CALL_LOG_PAYLOAD_MODE || "full").toLowerCase();
  return value === "full" || value === "metadata" || value === "none" ? value : "full";
})();
const shouldLogPayloadInDb = CALL_LOG_PAYLOAD_MODE !== "none";
const shouldLogPayloadOnDisk = CALL_LOG_PAYLOAD_MODE === "full";

/** Fields that should always be redacted from logged payloads */
const SENSITIVE_KEYS = new Set([
  "api_key",
  "apiKey",
  "api-key",
  "authorization",
  "Authorization",
  "x-api-key",
  "X-Api-Key",
  "access_token",
  "accessToken",
  "refresh_token",
  "refreshToken",
  "password",
  "secret",
  "token",
]);

/**
 * Redact sensitive fields from a payload before persistence.
 */
function redactPayload(obj: any): any {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(redactPayload);

  const redacted: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (SENSITIVE_KEYS.has(key)) {
      redacted[key] = "[REDACTED]";
    } else if (typeof value === "string" && value.startsWith("Bearer ")) {
      redacted[key] = "Bearer [REDACTED]";
    } else if (typeof value === "object" && value !== null) {
      redacted[key] = redactPayload(value);
    } else {
      redacted[key] = value;
    }
  }
  return redacted;
}

/**
 * Recursively sanitize PII from string fields in a payload.
 * Uses lib/piiSanitizer config flags to determine if redaction is enabled.
 */
function sanitizePayloadPII(obj: any): any {
  if (typeof obj === "string") {
    return sanitizePII(obj).text;
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizePayloadPII);
  }
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  const sanitized: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    sanitized[key] = sanitizePayloadPII(value);
  }
  return sanitized;
}

/**
 * Apply payload protection chain before persistence.
 * 1) Optional PII sanitization
 * 2) Mandatory key/token redaction
 */
function protectPayloadForLog(payload: any): any {
  if (!payload || !shouldLogPayloadInDb) return null;
  const piiSanitized = sanitizePayloadPII(payload);
  return redactPayload(piiSanitized);
}

let logIdCounter = 0;
function generateLogId() {
  logIdCounter++;
  return `${Date.now()}-${logIdCounter}`;
}

/**
 * Save a structured call log entry.
 */
export async function saveCallLog(entry: any) {
  if (!shouldPersistToDisk) return;

  try {
    const apiKeyId = entry.apiKeyId || null;
    const noLogEnabled = Boolean(entry.noLog) || (apiKeyId ? isNoLog(apiKeyId) : false);

    const protectedRequestBody = noLogEnabled ? null : protectPayloadForLog(entry.requestBody);
    const protectedResponseBody = noLogEnabled ? null : protectPayloadForLog(entry.responseBody);

    // Resolve account name
    let account = entry.connectionId ? entry.connectionId.slice(0, 8) : "-";
    try {
      const { getProviderConnections } = await import("@/lib/localDb");
      const connections = await getProviderConnections();
      const conn = connections.find((c) => c.id === entry.connectionId);
      if (conn) account = conn.name || conn.email || account;
    } catch {}

    // Truncate large payloads for DB storage (keep under 8KB each)
    const truncatePayload = (obj: any) => {
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
      requestedModel: entry.requestedModel || null, // T01: model the client asked for
      provider: entry.provider || "-",
      account,
      connectionId: entry.connectionId || null,
      duration: entry.duration || 0,
      tokensIn: toNumber(
        (entry.tokens?.prompt_tokens ?? entry.tokens?.input_tokens ?? 0) +
          (entry.tokens?.cache_read_input_tokens ?? entry.tokens?.cached_tokens ?? 0) +
          (entry.tokens?.cache_creation_input_tokens ?? 0)
      ),
      tokensOut: toNumber(entry.tokens?.completion_tokens ?? entry.tokens?.output_tokens ?? 0),
      requestType: entry.requestType || null,
      sourceFormat: entry.sourceFormat || null,
      targetFormat: entry.targetFormat || null,
      apiKeyId,
      apiKeyName: entry.apiKeyName || null,
      comboName: entry.comboName || null,
      requestBody: truncatePayload(protectedRequestBody),
      responseBody: truncatePayload(protectedResponseBody),
      error: typeof entry.error === "string" ? sanitizePII(entry.error).text : entry.error || null,
    };

    // 1. Insert into SQLite
    const db = getDbInstance();
    db.prepare(
      `
      INSERT INTO call_logs (id, timestamp, method, path, status, model, requested_model, provider,
        account, connection_id, duration, tokens_in, tokens_out, request_type, source_format, target_format,
        api_key_id, api_key_name, combo_name, request_body, response_body, error)
      VALUES (@id, @timestamp, @method, @path, @status, @model, @requestedModel, @provider,
        @account, @connectionId, @duration, @tokensIn, @tokensOut, @requestType, @sourceFormat, @targetFormat,
        @apiKeyId, @apiKeyName, @comboName, @requestBody, @responseBody, @error)
    `
    ).run(logEntry);

    // 2. Trim old entries beyond CALL_LOGS_MAX
    const countRow = asRecord(db.prepare("SELECT COUNT(*) as cnt FROM call_logs").get());
    const count = toNumber(countRow.cnt);
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
    // Disabled when no-log is active or payload mode is metadata/none.
    if (
      shouldLogPayloadOnDisk &&
      !noLogEnabled &&
      (protectedRequestBody !== null || protectedResponseBody !== null)
    ) {
      writeCallLogToDisk(
        { ...logEntry, tokens: { in: logEntry.tokensIn, out: logEntry.tokensOut } },
        protectedRequestBody,
        protectedResponseBody
      );
    }
  } catch (error: any) {
    console.error("[callLogs] Failed to save call log:", error.message);
  }
}

/**
 * Write call log as JSON file to disk (full payloads, not truncated).
 */
function writeCallLogToDisk(logEntry: any, requestBody: any, responseBody: any) {
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
  } catch (err: any) {
    console.error("[callLogs] Failed to write disk log:", err.message);
  }
}

/**
 * Rotate old call log directories (keep last 7 days).
 */
export function rotateCallLogs() {
  if (!CALL_LOGS_DIR || !fs.existsSync(CALL_LOGS_DIR)) return;

  try {
    const entries = fs.readdirSync(CALL_LOGS_DIR);
    const now = Date.now();
    const retentionMs = LOG_RETENTION_DAYS * 24 * 60 * 60 * 1000;

    for (const entry of entries) {
      const entryPath = path.join(CALL_LOGS_DIR, entry);
      const stat = fs.statSync(entryPath);
      if (stat.isDirectory() && now - stat.mtimeMs > retentionMs) {
        fs.rmSync(entryPath, { recursive: true, force: true });
        console.log(`[callLogs] Rotated old logs: ${entry}`);
      }
    }
  } catch (err: any) {
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
 * Get call logs with optional filtering.
 */
export async function getCallLogs(filter: any = {}) {
  const db = getDbInstance();
  let sql = "SELECT * FROM call_logs";
  const conditions: string[] = [];
  const params: Record<string, unknown> = {};

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
    conditions.push("(model LIKE @modelQ OR requested_model LIKE @modelQ)");
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
      requested_model LIKE @searchQ OR provider LIKE @searchQ OR
      api_key_name LIKE @searchQ OR api_key_id LIKE @searchQ OR
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

  return rows.map((row) => {
    const l = asRecord(row);
    return {
      id: toStringOrNull(l.id),
      timestamp: toStringOrNull(l.timestamp),
      method: toStringOrNull(l.method),
      path: toStringOrNull(l.path),
      status: toNumber(l.status),
      model: toStringOrNull(l.model),
      requestedModel: toStringOrNull(l.requested_model), // T01: original model from client
      provider: toStringOrNull(l.provider),
      account: toStringOrNull(l.account),
      duration: toNumber(l.duration),
      tokens: { in: toNumber(l.tokens_in), out: toNumber(l.tokens_out) },
      sourceFormat: toStringOrNull(l.source_format),
      targetFormat: toStringOrNull(l.target_format),
      error: toStringOrNull(l.error),
      comboName: toStringOrNull(l.combo_name),
      apiKeyId: toStringOrNull(l.api_key_id),
      apiKeyName: toStringOrNull(l.api_key_name),
      hasRequestBody: typeof l.request_body === "string" && l.request_body.length > 0,
      hasResponseBody: typeof l.response_body === "string" && l.response_body.length > 0,
    };
  });
}

/**
 * Get a single call log by ID (with full payloads from disk when available).
 */
export async function getCallLogById(id: string) {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM call_logs WHERE id = ?").get(id);
  if (!row) return null;
  const entryRow = asRecord(row);

  const entry = {
    id: toStringOrNull(entryRow.id),
    timestamp: toStringOrNull(entryRow.timestamp),
    method: toStringOrNull(entryRow.method),
    path: toStringOrNull(entryRow.path),
    status: toNumber(entryRow.status),
    model: toStringOrNull(entryRow.model),
    requestedModel: toStringOrNull(entryRow.requested_model),
    provider: toStringOrNull(entryRow.provider),
    account: toStringOrNull(entryRow.account),
    connectionId: toStringOrNull(entryRow.connection_id),
    duration: toNumber(entryRow.duration),
    tokens: { in: toNumber(entryRow.tokens_in), out: toNumber(entryRow.tokens_out) },
    sourceFormat: toStringOrNull(entryRow.source_format),
    targetFormat: toStringOrNull(entryRow.target_format),
    apiKeyId: toStringOrNull(entryRow.api_key_id),
    apiKeyName: toStringOrNull(entryRow.api_key_name),
    comboName: toStringOrNull(entryRow.combo_name),
    requestBody: parseJsonString(entryRow.request_body),
    responseBody: parseJsonString(entryRow.response_body),
    error: toStringOrNull(entryRow.error),
  };

  // If payloads were truncated, try to read full version from disk
  const needsDisk = hasTruncatedFlag(entry.requestBody) || hasTruncatedFlag(entry.responseBody);
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
    } catch (err: any) {
      console.error("[callLogs] Failed to read full log from disk:", err.message);
    }
  }

  return entry;
}

/**
 * Read the full (untruncated) log entry from disk.
 */
function readFullLogFromDisk(entry: any) {
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
  } catch (err: any) {
    console.error("[callLogs] Disk log read error:", err.message);
  }

  return null;
}
