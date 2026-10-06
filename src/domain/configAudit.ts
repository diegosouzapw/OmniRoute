/**
 * Configuration Audit Trail
 *
 * Records every change to provider connections, combos, and routing
 * policies with before/after snapshots and diff detection.
 * Enables rollback to previous configurations when changes cause issues.
 *
 * Each entry captures:
 * - What changed (target type + ID)
 * - Who/what triggered the change (source)
 * - Before/after state snapshots
 * - Computed diff summary
 * - Optional human notes
 */

import { getDbInstance } from "../lib/db/core";

/** Types of configuration entities that can be audited */
export type AuditTarget = "provider" | "combo" | "policy" | "connection" | "settings";

/** How the change was triggered */
export type AuditSource = "dashboard" | "api" | "sync" | "auto-healing" | "cli" | "mcp";

/** Type of change */
export type AuditAction = "create" | "update" | "delete" | "enable" | "disable";

/** A single audit log entry */
export interface ConfigAuditEntry {
  /** Unique entry ID */
  id: string;
  /** ISO timestamp of the change */
  timestamp: string;
  /** Type of change */
  action: AuditAction;
  /** What type of entity was changed */
  target: AuditTarget;
  /** ID of the changed entity */
  targetId: string;
  /** Human-readable name of the entity */
  targetName: string;
  /** State before the change (null for creates) */
  before: Record<string, unknown> | null;
  /** State after the change (null for deletes) */
  after: Record<string, unknown> | null;
  /** How the change was triggered */
  source: AuditSource;
  /** Computed diff summary */
  diff: ConfigDiff;
  /** Optional human note */
  note: string | null;
}

/** Computed diff between two states */
export interface ConfigDiff {
  /** Keys that were added */
  added: string[];
  /** Keys that were removed */
  removed: string[];
  /** Keys whose values changed */
  changed: Array<{ key: string; from: unknown; to: unknown }>;
  /** True if the states are identical */
  isEmpty: boolean;
}

/** Configuration snapshot for export/import */
export interface ConfigSnapshot {
  /** ISO timestamp when snapshot was taken */
  timestamp: string;
  /** Semantic version tag */
  version: string;
  /** Description of the snapshot */
  description: string;
  /** Full configuration data */
  data: Record<string, unknown>;
}

// ── SQLite-backed store ───────────────────────────────────────────────────────

let idCounter = 0;

function generateId(): string {
  idCounter++;
  const ts = Date.now().toString(36);
  const seq = idCounter.toString(36).padStart(4, "0");
  return `audit-${ts}-${seq}`;
}

function db() {
  return getDbInstance();
}

interface ConfigAuditRow {
  id: string;
  timestamp: string;
  action: string;
  target: string;
  target_id: string;
  target_name: string;
  before_json: string | null;
  after_json: string | null;
  diff_json: string;
  source: string;
  note: string | null;
}

function rowToEntry(row: ConfigAuditRow): ConfigAuditEntry {
  return {
    id: row.id,
    timestamp: row.timestamp,
    action: row.action as AuditAction,
    target: row.target as AuditTarget,
    targetId: row.target_id,
    targetName: row.target_name,
    before: row.before_json === null ? null : (JSON.parse(row.before_json) as Record<string, unknown> | null),
    after: row.after_json === null ? null : (JSON.parse(row.after_json) as Record<string, unknown> | null),
    source: row.source as AuditSource,
    diff: JSON.parse(row.diff_json) as ConfigDiff,
    note: row.note,
  };
}

/**
 * Compute a structured diff between two configuration states.
 */
export function computeDiff(
  before: Record<string, unknown> | null,
  after: Record<string, unknown> | null
): ConfigDiff {
  const beforeKeys = new Set(before ? Object.keys(before) : []);
  const afterKeys = new Set(after ? Object.keys(after) : []);

  const added: string[] = [];
  const removed: string[] = [];
  const changed: Array<{ key: string; from: unknown; to: unknown }> = [];

  // Keys in after but not in before → added
  for (const key of afterKeys) {
    if (!beforeKeys.has(key)) {
      added.push(key);
    }
  }

  // Keys in before but not in after → removed
  for (const key of beforeKeys) {
    if (!afterKeys.has(key)) {
      removed.push(key);
    }
  }

  // Keys in both → check for changes
  for (const key of beforeKeys) {
    if (afterKeys.has(key)) {
      const beforeVal = before![key];
      const afterVal = after![key];
      if (JSON.stringify(beforeVal) !== JSON.stringify(afterVal)) {
        changed.push({ key, from: beforeVal, to: afterVal });
      }
    }
  }

  return {
    added,
    removed,
    changed,
    isEmpty: added.length === 0 && removed.length === 0 && changed.length === 0,
  };
}

/**
 * Record a configuration change in the audit log.
 */
export function recordChange(
  action: AuditAction,
  target: AuditTarget,
  targetId: string,
  targetName: string,
  before: Record<string, unknown> | null,
  after: Record<string, unknown> | null,
  source: AuditSource,
  note?: string | null
): ConfigAuditEntry {
  const entry: ConfigAuditEntry = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    action,
    target,
    targetId,
    targetName,
    before,
    after,
    source,
    diff: computeDiff(before, after),
    note: note ?? null,
  };

  db().prepare(
    `INSERT INTO config_audit_log
       (id, timestamp, action, target, target_id, target_name, before_json, after_json, diff_json, source, note)
     VALUES
       (@id, @timestamp, @action, @target, @targetId, @targetName, @beforeJson, @afterJson, @diffJson, @source, @note)`
  ).run({
    id: entry.id,
    timestamp: entry.timestamp,
    action: entry.action,
    target: entry.target,
    targetId: entry.targetId,
    targetName: entry.targetName,
    beforeJson: before === null ? null : JSON.stringify(before),
    afterJson: after === null ? null : JSON.stringify(after),
    diffJson: JSON.stringify(entry.diff),
    source: entry.source,
    note: entry.note,
  });

  return entry;
}

/**
 * Get audit entries, optionally filtered.
 */
export function getAuditLog(options?: {
  target?: AuditTarget;
  targetId?: string;
  action?: AuditAction;
  source?: AuditSource;
  since?: string; // ISO date
  limit?: number;
  offset?: number;
}): { entries: ConfigAuditEntry[]; total: number } {
  const where: string[] = [];
  const params: Record<string, unknown> = {};

  if (options?.target) {
    where.push("target = @target");
    params.target = options.target;
  }
  if (options?.targetId) {
    where.push("target_id = @targetId");
    params.targetId = options.targetId;
  }
  if (options?.action) {
    where.push("action = @action");
    params.action = options.action;
  }
  if (options?.source) {
    where.push("source = @source");
    params.source = options.source;
  }
  if (options?.since) {
    where.push("timestamp >= @since");
    params.since = options.since;
  }

  const whereSql = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  const totalRow = db()
    .prepare(`SELECT COUNT(*) AS c FROM config_audit_log ${whereSql}`)
    .get(params) as { c: number };
  const total = totalRow.c;

  const offset = options?.offset ?? 0;
  const limit = options?.limit ?? 50;

  const rows = db()
    .prepare(
      `SELECT * FROM config_audit_log ${whereSql} ORDER BY datetime(timestamp) DESC, id DESC LIMIT @limit OFFSET @offset`
    )
    .all({ ...params, limit, offset }) as ConfigAuditRow[];

  return { entries: rows.map(rowToEntry), total };
}

/**
 * Get a specific audit entry by ID.
 */
export function getAuditEntry(id: string): ConfigAuditEntry | null {
  const row = db()
    .prepare("SELECT * FROM config_audit_log WHERE id = @id")
    .get({ id }) as ConfigAuditRow | undefined;
  return row ? rowToEntry(row) : null;
}

/**
 * Get the state of an entity before a specific audit entry.
 * Enables rollback by returning the `before` snapshot.
 */
export function getRollbackState(entryId: string): Record<string, unknown> | null {
  const entry = getAuditEntry(entryId);
  if (!entry) return null;
  return entry.before;
}

/**
 * Create a full configuration snapshot for export.
 */
export function createSnapshot(
  version: string,
  description: string,
  configData: Record<string, unknown>
): ConfigSnapshot {
  return {
    timestamp: new Date().toISOString(),
    version,
    description,
    data: JSON.parse(JSON.stringify(configData)), // deep clone
  };
}

/**
 * Get summary statistics of the audit log.
 */
export function getAuditSummary(): {
  totalEntries: number;
  byTarget: Record<string, number>;
  byAction: Record<string, number>;
  bySource: Record<string, number>;
  oldestEntry: string | null;
  newestEntry: string | null;
} {
  const byTarget: Record<string, number> = {};
  const byAction: Record<string, number> = {};
  const bySource: Record<string, number> = {};

  const rows = db()
    .prepare("SELECT * FROM config_audit_log ORDER BY datetime(timestamp) DESC, id DESC")
    .all() as ConfigAuditRow[];

  for (const row of rows) {
    byTarget[row.target] = (byTarget[row.target] || 0) + 1;
    byAction[row.action] = (byAction[row.action] || 0) + 1;
    bySource[row.source] = (bySource[row.source] || 0) + 1;
  }

  return {
    totalEntries: rows.length,
    byTarget,
    byAction,
    bySource,
    oldestEntry: rows.length > 0 ? rows[rows.length - 1].timestamp : null,
    newestEntry: rows.length > 0 ? rows[0].timestamp : null,
  };
}

/**
 * Reset the audit log. Useful for testing.
 */
export function resetAuditLog(): void {
  db().prepare("DELETE FROM config_audit_log").run();
  idCounter = 0;
}
