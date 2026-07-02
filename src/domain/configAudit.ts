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

// ── In-memory store ──────────────────────────────────────────────────────────
// In production, persist to SQLite alongside other domain state.

let auditLog: ConfigAuditEntry[] = [];
let idCounter = 0;

function generateId(): string {
  idCounter++;
  const ts = Date.now().toString(36);
  const seq = idCounter.toString(36).padStart(4, "0");
  return `audit-${ts}-${seq}`;
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

  auditLog.push(entry);

  // Keep log bounded (max 1000 entries in memory)
  if (auditLog.length > 1000) {
    auditLog = auditLog.slice(-1000);
  }

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
  let filtered = auditLog;

  if (options?.target) {
    filtered = filtered.filter((e) => e.target === options.target);
  }
  if (options?.targetId) {
    filtered = filtered.filter((e) => e.targetId === options.targetId);
  }
  if (options?.action) {
    filtered = filtered.filter((e) => e.action === options.action);
  }
  if (options?.source) {
    filtered = filtered.filter((e) => e.source === options.source);
  }
  if (options?.since) {
    filtered = filtered.filter((e) => e.timestamp >= options.since!);
  }

  const total = filtered.length;

  // Sort newest first
  filtered = [...filtered].sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  // Paginate
  const offset = options?.offset ?? 0;
  const limit = options?.limit ?? 50;
  filtered = filtered.slice(offset, offset + limit);

  return { entries: filtered, total };
}

/**
 * Get a specific audit entry by ID.
 */
export function getAuditEntry(id: string): ConfigAuditEntry | null {
  return auditLog.find((e) => e.id === id) ?? null;
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

  for (const entry of auditLog) {
    byTarget[entry.target] = (byTarget[entry.target] || 0) + 1;
    byAction[entry.action] = (byAction[entry.action] || 0) + 1;
    bySource[entry.source] = (bySource[entry.source] || 0) + 1;
  }

  return {
    totalEntries: auditLog.length,
    byTarget,
    byAction,
    bySource,
    oldestEntry: auditLog.length > 0 ? auditLog[0].timestamp : null,
    newestEntry: auditLog.length > 0 ? auditLog[auditLog.length - 1].timestamp : null,
  };
}

/**
 * Reset the audit log. Useful for testing.
 */
export function resetAuditLog(): void {
  auditLog = [];
  idCounter = 0;
}
