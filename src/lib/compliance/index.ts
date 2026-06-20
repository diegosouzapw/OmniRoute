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
import type { SqliteAdapter } from "@/lib/db/adapters/types";
import { getClientIpFromRequest } from "../ipUtils";
import {
  getAppLogRetentionDays,
  getCallLogRetentionDays,
  getAppLogRetentionDaysOverride,
  getCallLogRetentionDaysOverride,
  getCallLogsTableMaxRows,
  getProxyLogsTableMaxRows,
} from "../logEnv";
import { getUserDatabaseSettings } from "../db/databaseSettings";
import { generateRequestId, getRequestId } from "@/shared/utils/requestId";
import { HIGH_LEVEL_ACTIONS } from "@/lib/audit/highLevelActions";

/** @returns {SqliteAdapter | null} */
function getDb() {
  try {
    return getDbInstance();
  } catch {
    return null;
  }
}

type AuditLogWriteEntry = {
  action: string;
  actor?: string;
  target?: string;
  details?: unknown;
  metadata?: unknown;
  ipAddress?: string;
  resourceType?: string;
  status?: string;
  requestId?: string;
  createdAt?: string;
};

type AuditLogFilter = {
  action?: string;
  actor?: string;
  target?: string;
  resourceType?: string;
  status?: string;
  requestId?: string;
  from?: string;
  to?: string;
  limit?: number;
  offset?: number;
  /** When "high", restricts results to HIGH_LEVEL_ACTIONS only (B7). */
  levelFilter?: "high";
};

type AuditLogRow = Record<string, unknown> & {
  id?: number | null;
  action?: string | null;
  actor?: string | null;
  target?: string | null;
  status?: string | null;
  details?: string | null;
  metadata?: string | null;
  ip_address?: string | null;
  resource_type?: string | null;
  request_id?: string | null;
  timestamp?: string | null;
};

/**
 * Public shape of a normalized audit-log entry returned by `getAuditLog` /
 * `normalizeAuditLogRow`. Includes the column-level fields callers (and
 * tests) reach into directly — `action`, `actor`, `target`, `id`, `status`,
 * `timestamp` — alongside the derived/parsed fields. The
 * `Record<string, unknown>` intersection preserves the existing behaviour of
 * spreading any extra DB columns (e.g. schema additions) without losing
 * compile-time access to the known ones.
 */
export type AuditLogEntry = Record<string, unknown> & {
  id?: number | null;
  action?: string | null;
  actor?: string | null;
  target?: string | null;
  status: string | null;
  timestamp: string;
  createdAt: string;
  details: unknown;
  metadata: unknown;
  ip_address: string | null;
  ip: string | null;
  resource_type: string | null;
  resourceType: string | null;
  request_id: string | null;
  requestId: string | null;
};

const AUDIT_LOG_REQUIRED_COLUMNS: Record<string, string> = {
  resource_type: "TEXT",
  status: "TEXT",
  request_id: "TEXT",
  metadata: "TEXT",
};

const SENSITIVE_AUDIT_KEYS = new Set([
  "apikey",
  "accesstoken",
  "refreshtoken",
  "idtoken",
  "authtoken",
  "jwttoken",
  "token",
  "secret",
  "password",
  "authorization",
  "cookie",
  "setcookie",
  "consoleapikey",
  "clientsecret",
]);

function normalizeAuditKey(key: string) {
  return key.replace(/[^a-z0-9]/gi, "").toLowerCase();
}

function isSensitiveAuditKey(key: string) {
  const normalized = normalizeAuditKey(key);
  if (!normalized) return false;
  if (SENSITIVE_AUDIT_KEYS.has(normalized)) return true;
  return (
    normalized.endsWith("apikey") ||
    normalized.endsWith("token") ||
    normalized.endsWith("secret") ||
    normalized.endsWith("password")
  );
}

function sanitizeAuditValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeAuditValue(item));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, nestedValue]) => [
        key,
        isSensitiveAuditKey(key) ? "[redacted]" : sanitizeAuditValue(nestedValue),
      ])
    );
  }

  return value;
}

function serializeAuditValue(value: unknown): string | null {
  if (value === undefined || value === null || value === "") return null;
  const sanitizedValue = sanitizeAuditValue(value);
  if (typeof sanitizedValue === "string") {
    return sanitizedValue;
  }
  try {
    return JSON.stringify(sanitizedValue);
  } catch {
    return String(sanitizedValue);
  }
}

function parseAuditValue(value: unknown): unknown {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function ensureAuditLogSchema(db: SqliteAdapter) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS audit_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL DEFAULT (datetime('now')),
      action TEXT NOT NULL,
      actor TEXT NOT NULL DEFAULT 'system',
      target TEXT,
      details TEXT,
      ip_address TEXT,
      resource_type TEXT,
      status TEXT,
      request_id TEXT,
      metadata TEXT
    );
  `);

  let columns: Array<{ name: string }> = [];
  try {
    columns = db.prepare("PRAGMA table_info(audit_log)").all() as Array<{ name: string }>;
  } catch {
    columns = [];
  }

  const existingColumns = new Set(columns.map((column) => column.name));
  for (const [columnName, columnType] of Object.entries(AUDIT_LOG_REQUIRED_COLUMNS)) {
    if (existingColumns.has(columnName)) continue;
    try {
      db.exec(`ALTER TABLE audit_log ADD COLUMN ${columnName} ${columnType}`);
    } catch {
      // Another worker may have upgraded the schema first. Ignore.
    }
  }

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON audit_log(timestamp);
    CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_log(action);
    CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_log(actor);
    CREATE INDEX IF NOT EXISTS idx_audit_resource_type ON audit_log(resource_type);
    CREATE INDEX IF NOT EXISTS idx_audit_status ON audit_log(status);
    CREATE INDEX IF NOT EXISTS idx_audit_request_id ON audit_log(request_id);
  `);
}

type AuditLogQuery = {
  where: string;
  params: string[];
};

function buildAuditLogQuery(filter: AuditLogFilter = {}): AuditLogQuery {
  const conditions: string[] = [];
  const params: string[] = [];

  const addLikeFilter = (column: string, value?: string) => {
    if (!value) return;
    conditions.push(`${column} LIKE ?`);
    params.push(`%${value}%`);
  };

  addLikeFilter("action", filter.action);
  addLikeFilter("actor", filter.actor);
  addLikeFilter("target", filter.target);
  addLikeFilter("resource_type", filter.resourceType);
  addLikeFilter("status", filter.status);
  addLikeFilter("request_id", filter.requestId);

  if (filter.from) {
    conditions.push("datetime(timestamp) >= datetime(?)");
    params.push(filter.from);
  }
  if (filter.to) {
    conditions.push("datetime(timestamp) <= datetime(?)");
    params.push(filter.to);
  }

  // B7: level=high filter — restrict to HIGH_LEVEL_ACTIONS via parameterized IN clause
  if (filter.levelFilter === "high" && HIGH_LEVEL_ACTIONS.length > 0) {
    const placeholders = HIGH_LEVEL_ACTIONS.map(() => "?").join(", ");
    conditions.push(`action IN (${placeholders})`);
    // HIGH_LEVEL_ACTIONS is readonly — create a mutable copy for spread
    params.push(...Array.from(HIGH_LEVEL_ACTIONS));
  }

  return {
    where: conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "",
    params,
  };
}

function normalizeAuditLogRow(row: AuditLogRow): AuditLogEntry {
  const details = parseAuditValue(row.details);
  const metadata = parseAuditValue(row.metadata);
  const resourceType = typeof row.resource_type === "string" ? row.resource_type : null;
  const requestId = typeof row.request_id === "string" ? row.request_id : null;
  const ip = typeof row.ip_address === "string" ? row.ip_address : null;
  const timestamp = typeof row.timestamp === "string" ? row.timestamp : new Date().toISOString();

  return {
    ...(row as Record<string, unknown>),
    timestamp,
    createdAt: timestamp,
    details,
    metadata: metadata ?? (details && typeof details === "object" ? details : null),
    ip_address: ip,
    ip,
    resource_type: resourceType,
    resourceType,
    request_id: requestId,
    requestId,
    status: typeof row.status === "string" ? row.status : null,
  };
}

export function getAuditRequestContext(request?: {
  headers?: Headers | { get?: (name: string) => string | null };
  socket?: { remoteAddress?: string };
  ip?: string;
}) {
  return {
    ipAddress: request ? getClientIpFromRequest(request) : null,
    requestId: getRequestId() || request?.headers?.get?.("x-request-id") || generateRequestId(),
  };
}

/**
 * Initialize the audit_log table.
 */
export function initAuditLog() {
  const db = getDb();
  if (!db) return;

  ensureAuditLogSchema(db);
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
  metadata?: unknown;
  ipAddress?: string;
  resourceType?: string;
  status?: string;
  requestId?: string;
  createdAt?: string;
}) {
  const db = getDb();
  if (!db) return;

  try {
    ensureAuditLogSchema(db);
    const createdAt = entry.createdAt || new Date().toISOString();
    const serializedDetails = serializeAuditValue(entry.details ?? entry.metadata);
    const metadataSource =
      entry.metadata !== undefined
        ? entry.metadata
        : entry.details && typeof entry.details === "object"
          ? entry.details
          : null;
    const stmt = db.prepare(`
      INSERT INTO audit_log (
        timestamp,
        action,
        actor,
        target,
        details,
        ip_address,
        resource_type,
        status,
        request_id,
        metadata
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      createdAt,
      entry.action,
      entry.actor || "system",
      entry.target || null,
      serializedDetails,
      entry.ipAddress || null,
      entry.resourceType || null,
      entry.status || null,
      entry.requestId || null,
      serializeAuditValue(metadataSource)
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
export function getAuditLog(filter: AuditLogFilter = {}): AuditLogEntry[] {
  const db = getDb();
  if (!db) return [];

  ensureAuditLogSchema(db);

  const { where, params } = buildAuditLogQuery(filter);
  const limit = Number.isFinite(filter.limit)
    ? Math.max(1, Math.min(500, filter.limit || 100))
    : 100;
  const offset = Number.isFinite(filter.offset) ? Math.max(0, filter.offset || 0) : 0;

  const rows = db
    .prepare(`SELECT * FROM audit_log ${where} ORDER BY timestamp DESC, id DESC LIMIT ? OFFSET ?`)
    .all(...params, limit, offset) as AuditLogRow[];

  return rows.map((row) => normalizeAuditLogRow(row));
}

export function countAuditLog(filter: AuditLogFilter = {}) {
  const db = getDb();
  if (!db) return 0;

  ensureAuditLogSchema(db);
  const { where, params } = buildAuditLogQuery(filter);
  const row = db.prepare(`SELECT COUNT(*) as count FROM audit_log ${where}`).get(...params) as
    | { count?: number }
    | undefined;
  return Number(row?.count || 0);
}

// ─── No-Log Opt-Out ────────────────
// Moved to ./noLog.ts to break the callLogs → compliance → callLogs ESM cycle
// that deadlocks the bundled MCP server under Node.js 24 (#2650). Re-exported
// here so downstream callers that import from "../compliance" keep working.
export { isNoLog, setNoLog } from "./noLog";

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
export async function cleanupExpiredLogs() {
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

  // #4354: retention precedence is explicit env override > dashboard DB setting > 7-day
  // default. Previously this path always used the env default (7d), silently overriding a
  // configured dashboard "Data Retention" (e.g. 90d) on every startup and trimming
  // usage_history before the dashboard-based runAutoCleanup() could run. We now honor the
  // dashboard retention per table when the operator did not set the env var, while still
  // letting an explicit env var win (and falling back to env for non-DB deployments).
  const callOverride = getCallLogRetentionDaysOverride();
  const appOverride = getAppLogRetentionDaysOverride();
  let dbRetention: { usageHistory: number; callLogs: number; mcpAudit: number } | null = null;
  try {
    const r = getUserDatabaseSettings().retention;
    dbRetention = { usageHistory: r.usageHistory, callLogs: r.callLogs, mcpAudit: r.mcpAudit };
  } catch {
    /* settings table unavailable (e.g. very early startup) — keep env fallback */
  }
  const usageHistoryRetentionDays = callOverride ?? dbRetention?.usageHistory ?? callRetentionDays;
  const callLogRetentionDays = callOverride ?? dbRetention?.callLogs ?? callRetentionDays;
  const mcpAuditRetentionDays = appOverride ?? dbRetention?.mcpAudit ?? appRetentionDays;

  const day = 24 * 60 * 60 * 1000;
  const usageCutoff = new Date(Date.now() - usageHistoryRetentionDays * day).toISOString();
  const callCutoff = new Date(Date.now() - callLogRetentionDays * day).toISOString();
  const appCutoff = new Date(Date.now() - appRetentionDays * day).toISOString();
  const mcpCutoff = new Date(Date.now() - mcpAuditRetentionDays * day).toISOString();

  let deletedUsage = 0;
  let deletedCallLogs = 0;
  let deletedProxyLogs = 0;
  let deletedRequestDetailLogs = 0;
  let deletedAuditLogs = 0;
  let deletedMcpAuditLogs = 0;
  let trimmedCallLogs = 0;
  let trimmedProxyLogs = 0;

  try {
    const r1 = db.prepare("DELETE FROM usage_history WHERE timestamp < ?").run(usageCutoff);
    deletedUsage = r1.changes;
  } catch {
    /* table may not exist */
  }

  try {
    const { deleteCallLogsBefore } = await import("../usage/callLogs");
    const r2 = deleteCallLogsBefore(callCutoff);
    deletedCallLogs = r2.deletedRows;
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
    const r6 = db.prepare("DELETE FROM mcp_tool_audit WHERE created_at < ?").run(mcpCutoff);
    deletedMcpAuditLogs = r6.changes;
  } catch {
    /* table may not exist */
  }

  // Enforce row count limits to prevent unbounded DB growth (batched to avoid long locks)
  const BATCH_SIZE = 5000;
  if (callLogsMaxRows > 0) {
    try {
      const { trimCallLogsToMaxRows } = await import("../usage/callLogs");
      const trimmed = trimCallLogsToMaxRows(callLogsMaxRows);
      trimmedCallLogs = trimmed.deletedRows;
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
    actor: "system",
    target: "log-retention",
    resourceType: "maintenance",
    status: "success",
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
