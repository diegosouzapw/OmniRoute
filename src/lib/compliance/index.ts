/**
 * Compliance Controls — T-43
 *
 * Implements compliance features:
 * - LOG_RETENTION_DAYS: automatic log cleanup
 * - noLog opt-out per API key
 * - audit_log table for administrative actions
 *
 * @module lib/compliance
 */

// @ts-check

import { getDbInstance } from "../db/core";

/** @returns {import("better-sqlite3").Database | null} */
function getDb() {
  try { return getDbInstance(); } catch { return null; }
}

const LOG_RETENTION_DAYS = parseInt(process.env.LOG_RETENTION_DAYS || "90", 10);

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
export function logAuditEvent(entry) {
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
export function getAuditLog(filter = {}) {
  const db = getDb();
  if (!db) return [];

  const conditions = [];
  const params = [];

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

  /** @type {any[]} */
  const rows = db
    .prepare(`SELECT * FROM audit_log ${where} ORDER BY timestamp DESC LIMIT ? OFFSET ?`)
    .all(...params, limit, offset);

  return rows.map((row) => ({
    ...row,
    details: row.details ? JSON.parse(String(row.details)) : null,
  }));
}

// ─── No-Log Opt-Out ────────────────

/** @type {Set<string>} API key IDs with logging disabled */
const noLogKeys = new Set();

/**
 * Set whether an API key opts out of request logging.
 *
 * @param {string} apiKeyId
 * @param {boolean} noLog
 */
export function setNoLog(apiKeyId, noLog) {
  if (noLog) {
    noLogKeys.add(apiKeyId);
  } else {
    noLogKeys.delete(apiKeyId);
  }
}

/**
 * Check if an API key has opted out of logging.
 *
 * @param {string} apiKeyId
 * @returns {boolean}
 */
export function isNoLog(apiKeyId) {
  return noLogKeys.has(apiKeyId);
}

// ─── Log Retention / Cleanup ────────────────

/**
 * Get the configured retention period.
 * @returns {number} Days
 */
export function getRetentionDays() {
  return LOG_RETENTION_DAYS;
}

/**
 * Clean up logs older than LOG_RETENTION_DAYS.
 * Should be called periodically (e.g. daily cron or on startup).
 *
 * @returns {{ deletedUsage: number, deletedCallLogs: number, deletedAuditLogs: number }}
 */
export function cleanupExpiredLogs() {
  const db = getDb();
  if (!db) return { deletedUsage: 0, deletedCallLogs: 0, deletedAuditLogs: 0 };

  const cutoff = new Date(Date.now() - LOG_RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString();

  let deletedUsage = 0;
  let deletedCallLogs = 0;
  let deletedAuditLogs = 0;

  try {
    // Clean usage_history
    const r1 = db.prepare("DELETE FROM usage_history WHERE timestamp < ?").run(cutoff);
    deletedUsage = r1.changes;
  } catch {
    /* table may not exist */
  }

  try {
    // Clean call_logs
    const r2 = db.prepare("DELETE FROM call_logs WHERE timestamp < ?").run(cutoff);
    deletedCallLogs = r2.changes;
  } catch {
    /* table may not exist */
  }

  try {
    // Clean audit_log (keep longer, 2x retention)
    const auditCutoff = new Date(
      Date.now() - LOG_RETENTION_DAYS * 2 * 24 * 60 * 60 * 1000
    ).toISOString();
    const r3 = db.prepare("DELETE FROM audit_log WHERE timestamp < ?").run(auditCutoff);
    deletedAuditLogs = r3.changes;
  } catch {
    /* table may not exist */
  }

  logAuditEvent({
    action: "compliance.cleanup",
    details: { deletedUsage, deletedCallLogs, deletedAuditLogs, retentionDays: LOG_RETENTION_DAYS },
  });

  return { deletedUsage, deletedCallLogs, deletedAuditLogs };
}
