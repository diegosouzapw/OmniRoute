/**
 * Compliance Controls — T-43
 *
 * Implements compliance features:
 * - APP_LOG_RETENTION_DAYS / CALL_LOG_RETENTION_DAYS: automatic log cleanup
 * - noLog opt-out per API key
 * - audit_log table for administrative actions
 *
 * @module lib/compliance
 */

import { getDbInstance } from "../db/core";
import {
  getAppLogRetentionDays,
  getCallLogRetentionDays,
  getCallLogsTableMaxRows,
  getProxyLogsTableMaxRows,
} from "../logEnv";

/** @returns {import("better-sqlite3").Database | null} */
function getDb() {
  try {
    return getDbInstance();
  } catch {
    return null;
  }
}

/**
 * Initialize the audit_log table.
 */
export function initAuditLog() {
  const db = getDb();
  if (!db) return;

  db.exec(`
    CREATE TABLE IF NOT EXISTS audit_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL DEFAULT (datetime('now')),
      action TEXT NOT NULL,
      actor TEXT NOT NULL DEFAULT 'system',
      target TEXT,
      details TEXT,
      ip_address TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON audit_log(timestamp);
    CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_log(action);
  `);
}

/**
 * Log an administrative action.
 *
 * @param {Object} entry
 * @param {string} entry.action - Action type (e.g. "settings.update", "apiKey.create", "password.reset")
 * @param {string} [entry.actor="system"] - Who performed the action
 * @param {string} [entry.target] - What was affected
 * @param {Object|string} [entry.details] - Additional details
 * @param {string} [entry.ipAddress] - Client IP
 */
export function logAuditEvent(entry: {
  action: string;
  actor?: string;
  target?: string;
  details?: unknown;
  ipAddress?: string;
}) {
  const db = getDb();
  if (!db) return;

  try {
    const stmt = db.prepare(`
      INSERT INTO audit_log (action, actor, target, details, ip_address)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(
      entry.action,
      entry.actor || "system",
      entry.target || null,
      typeof entry.details === "object" ? JSON.stringify(entry.details) : entry.details || null,
      entry.ipAddress || null
    );
  } catch {
    // Silently fail — audit logging should never break the main flow
  }
}

/**
 * Query audit log entries.
 *
 * @param {Object} [filter={}]
 * @param {string} [filter.action] - Filter by action type
 * @param {string} [filter.actor] - Filter by actor
 * @param {number} [filter.limit=100] - Max results
 * @param {number} [filter.offset=0] - Pagination offset
 * @returns {Array<{ id: number, timestamp: string, action: string, actor: string, target: string, details: any, ip_address: string }>}
 */
export function getAuditLog(
  filter: { action?: string; actor?: string; limit?: number; offset?: number } = {}
) {
  const db = getDb();
  if (!db) return [];

  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (filter.action) {
    conditions.push("action = ?");
    params.push(filter.action);
  }
  if (filter.actor) {
    conditions.push("actor = ?");
    params.push(filter.actor);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const limit = filter.limit || 100;
  const offset = filter.offset || 0;

  const rows = db
    .prepare(`SELECT * FROM audit_log ${where} ORDER BY timestamp DESC LIMIT ? OFFSET ?`)
    .all(...params, limit, offset) as Array<Record<string, unknown> & { details?: string | null }>;

  return rows.map((row) => ({
    ...(row as Record<string, unknown>),
    details: row.details ? JSON.parse(String(row.details)) : null,
  }));
}

// ─── No-Log Opt-Out ────────────────

/** @type {Set<string>} API key IDs with logging disabled */
const noLogKeys = new Set();
const noLogDbCache = new Map<string, { value: boolean; timestamp: number }>();
let noLogColumnVerified = false;
let hasNoLogColumn = false;
const NO_LOG_CACHE_TTL_MS = 30_000;
const noLogIdsFromEnv = (process.env.NO_LOG_API_KEY_IDS || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
for (const id of noLogIdsFromEnv) {
  noLogKeys.add(id);
}

/**
 * Set whether an API key opts out of request logging.
 *
 * @param {string} apiKeyId
 * @param {boolean} noLog
 */
export function setNoLog(apiKeyId: string, noLog: boolean) {
  if (noLog) {
    noLogKeys.add(apiKeyId);
  } else {
    noLogKeys.delete(apiKeyId);
  }
  noLogDbCache.set(apiKeyId, { value: noLog, timestamp: Date.now() });
}

function ensureNoLogColumn(db: import("better-sqlite3").Database) {
  if (noLogColumnVerified) {
    return hasNoLogColumn;
  }

  try {
    const columns = db.prepare("PRAGMA table_info(api_keys)").all() as Array<{ name: string }>;
    hasNoLogColumn = columns.some((column) => column.name === "no_log");
  } catch {
    hasNoLogColumn = false;
  }

  noLogColumnVerified = true;
  return hasNoLogColumn;
}

function readNoLogFromDb(apiKeyId: string): boolean {
  const db = getDb();
  if (!db || !apiKeyId) return false;
  if (!ensureNoLogColumn(db)) return false;

  const cached = noLogDbCache.get(apiKeyId);
  if (cached && Date.now() - cached.timestamp < NO_LOG_CACHE_TTL_MS) {
    return cached.value;
  }

  try {
    const row = db.prepare("SELECT no_log FROM api_keys WHERE id = ?").get(apiKeyId) as
      | { no_log?: number }
      | undefined;
    const value = Boolean(row && Number(row.no_log) === 1);
    noLogDbCache.set(apiKeyId, { value, timestamp: Date.now() });
    return value;
  } catch {
    return false;
  }
}

/**
 * Check if an API key has opted out of logging.
 *
 * @param {string} apiKeyId
 * @returns {boolean}
 */
export function isNoLog(apiKeyId: string) {
  if (!apiKeyId) return false;
  if (noLogKeys.has(apiKeyId)) return true;

  const persistedNoLog = readNoLogFromDb(apiKeyId);
  if (persistedNoLog) {
    noLogKeys.add(apiKeyId);
  }
  return persistedNoLog;
}

// ─── Log Retention / Cleanup ────────────────

/**
 * Get the configured retention periods.
 */
export function getRetentionDays() {
  return {
    app: getAppLogRetentionDays(),
    call: getCallLogRetentionDays(),
  };
}

/**
 * Clean up logs using split APP/CALL retention windows.
 * Should be called periodically (e.g. daily cron or on startup).
 *
 * @returns {{
 *   deletedUsage: number,
 *   deletedCallLogs: number,
 *   deletedProxyLogs: number,
 *   deletedRequestDetailLogs: number,
 *   deletedAuditLogs: number,
 *   deletedMcpAuditLogs: number,
 *   trimmedCallLogs: number,
 *   trimmedProxyLogs: number,
 *   appRetentionDays: number,
 *   callRetentionDays: number,
 *   callLogsMaxRows: number,
 *   proxyLogsMaxRows: number
 * }}
 */
export function cleanupExpiredLogs() {
  const db = getDb();
  const appRetentionDays = getAppLogRetentionDays();
  const callRetentionDays = getCallLogRetentionDays();
  const callLogsMaxRows = getCallLogsTableMaxRows();
  const proxyLogsMaxRows = getProxyLogsTableMaxRows();

  if (!db) {
    return {
      deletedUsage: 0,
      deletedCallLogs: 0,
      deletedProxyLogs: 0,
      deletedRequestDetailLogs: 0,
      deletedAuditLogs: 0,
      deletedMcpAuditLogs: 0,
      trimmedCallLogs: 0,
      trimmedProxyLogs: 0,
      appRetentionDays,
      callRetentionDays,
      callLogsMaxRows,
      proxyLogsMaxRows,
    };
  }

  const callCutoff = new Date(Date.now() - callRetentionDays * 24 * 60 * 60 * 1000).toISOString();
  const appCutoff = new Date(Date.now() - appRetentionDays * 24 * 60 * 60 * 1000).toISOString();

  let deletedUsage = 0;
  let deletedCallLogs = 0;
  let deletedProxyLogs = 0;
  let deletedRequestDetailLogs = 0;
  let deletedAuditLogs = 0;
  let deletedMcpAuditLogs = 0;
  let trimmedCallLogs = 0;
  let trimmedProxyLogs = 0;

  try {
    const r1 = db.prepare("DELETE FROM usage_history WHERE timestamp < ?").run(callCutoff);
    deletedUsage = r1.changes;
  } catch {
    /* table may not exist */
  }

  try {
    const r2 = db.prepare("DELETE FROM call_logs WHERE timestamp < ?").run(callCutoff);
    deletedCallLogs = r2.changes;
  } catch {
    /* table may not exist */
  }

  try {
    const r3 = db.prepare("DELETE FROM proxy_logs WHERE timestamp < ?").run(callCutoff);
    deletedProxyLogs = r3.changes;
  } catch {
    /* table may not exist */
  }

  try {
    const r4 = db.prepare("DELETE FROM request_detail_logs WHERE timestamp < ?").run(callCutoff);
    deletedRequestDetailLogs = r4.changes;
  } catch {
    /* legacy table may not exist */
  }

  try {
    const r5 = db.prepare("DELETE FROM audit_log WHERE timestamp < ?").run(appCutoff);
    deletedAuditLogs = r5.changes;
  } catch {
    /* table may not exist */
  }

  try {
    const r6 = db.prepare("DELETE FROM mcp_tool_audit WHERE created_at < ?").run(appCutoff);
    deletedMcpAuditLogs = r6.changes;
  } catch {
    /* table may not exist */
  }

  // Enforce row count limits to prevent unbounded DB growth (batched to avoid long locks)
  const BATCH_SIZE = 5000;
  if (callLogsMaxRows > 0) {
    try {
      let currentCount = db.prepare("SELECT COUNT(*) as cnt FROM call_logs").get() as {
        cnt: number;
      };
      while (currentCount.cnt > callLogsMaxRows) {
        const toDelete = Math.min(currentCount.cnt - callLogsMaxRows, BATCH_SIZE);
        const trimmed = db
          .prepare(
            `DELETE FROM call_logs WHERE id IN (
              SELECT id FROM call_logs ORDER BY timestamp ASC LIMIT ?
            )`
          )
          .run(toDelete);
        trimmedCallLogs += trimmed.changes;
        currentCount.cnt -= trimmed.changes;
        if (trimmed.changes === 0) break;
      }
    } catch {
      /* best effort */
    }
  }

  if (proxyLogsMaxRows > 0) {
    try {
      let currentProxyCount = db.prepare("SELECT COUNT(*) as cnt FROM proxy_logs").get() as {
        cnt: number;
      };
      while (currentProxyCount.cnt > proxyLogsMaxRows) {
        const toDelete = Math.min(currentProxyCount.cnt - proxyLogsMaxRows, BATCH_SIZE);
        const trimmed = db
          .prepare(
            `DELETE FROM proxy_logs WHERE id IN (
              SELECT id FROM proxy_logs ORDER BY timestamp ASC LIMIT ?
            )`
          )
          .run(toDelete);
        trimmedProxyLogs += trimmed.changes;
        currentProxyCount.cnt -= trimmed.changes;
        if (trimmed.changes === 0) break;
      }
    } catch {
      /* best effort */
    }
  }

  logAuditEvent({
    action: "compliance.cleanup",
    details: {
      deletedUsage,
      deletedCallLogs,
      deletedProxyLogs,
      deletedRequestDetailLogs,
      deletedAuditLogs,
      deletedMcpAuditLogs,
      trimmedCallLogs,
      trimmedProxyLogs,
      appRetentionDays,
      callRetentionDays,
      callLogsMaxRows,
      proxyLogsMaxRows,
    },
  });

  return {
    deletedUsage,
    deletedCallLogs,
    deletedProxyLogs,
    deletedRequestDetailLogs,
    deletedAuditLogs,
    deletedMcpAuditLogs,
    trimmedCallLogs,
    trimmedProxyLogs,
    appRetentionDays,
    callRetentionDays,
    callLogsMaxRows,
    proxyLogsMaxRows,
  };
}
