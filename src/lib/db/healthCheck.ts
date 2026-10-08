import { normalizeComboStep } from "@/lib/combos/steps";
import { getSyntheticApiKeyIds } from "@/shared/constants/apiKeyIdentities";

import type { PreparedStatement, SqliteAdapter } from "./adapters/types";
type SqliteDatabase = SqliteAdapter;
type JsonRecord = Record<string, unknown>;

export type DbHealthIssueType =
  "integrity_check_failed" | "broken_reference" | "stale_snapshot" | "invalid_state";

export interface DbHealthIssue {
  type: DbHealthIssueType;
  table: string;
  description: string;
  count: number;
}

/** Derived from the adapter contract so a new driver cannot drift out of sync here. */
export type DbDriverName = SqliteAdapter["driver"];

export interface DbDriverHealth {
  name: DbDriverName;
  /**
   * True when writes are not durably backed by the database file: the `sql.js` WASM
   * fallback, or an in-memory database — which the cloud/build path opens through the
   * NATIVE cascade, so the driver name alone would read as healthy.
   * Informative only; `isHealthy` stays defined by `issues`.
   */
  degraded: boolean;
}

export interface DbHealthCheckResult {
  isHealthy: boolean;
  issues: DbHealthIssue[];
  repairedCount: number;
  backupCreated: boolean;
  autoRepair: boolean;
  checkedAt: string;
  driver: DbDriverHealth;
}

const IN_MEMORY_DB_NAME = ":memory:";

/** PURE: describe the driver serving `db`, and whether its writes survive a crash. */
export function describeDbDriver(db: Pick<SqliteAdapter, "driver" | "name">): DbDriverHealth {
  return {
    name: db.driver,
    degraded: db.driver === "sql.js" || db.name === IN_MEMORY_DB_NAME,
  };
}

export interface PagerCorruptionNote {
  source: string;
  message: string;
  at: string;
}

let pagerCorruption: PagerCorruptionNote | null = null;

function pagerErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message?: unknown }).message ?? "");
  }
  return String(error ?? "unknown");
}

export function isSqlitePagerCorruptError(error: unknown): boolean {
  const code =
    error && typeof error === "object" && "code" in error
      ? String((error as { code?: unknown }).code || "")
      : "";
  const message = pagerErrorMessage(error);
  return (
    code === "SQLITE_CORRUPT" ||
    code === "SQLITE_NOTADB" ||
    code === "SQLITE_IOERR" ||
    /malformed|SQLITE_CORRUPT|SQLITE_NOTADB|SQLITE_IOERR/i.test(message)
  );
}

export function notePagerCorruption(source: string, error: unknown): void {
  const message = pagerErrorMessage(error) || "unknown";
  pagerCorruption = {
    source,
    message,
    at: new Date().toISOString(),
  };
}

export function getPagerCorruption(): PagerCorruptionNote | null {
  return pagerCorruption;
}

export function resetPagerCorruption(): void {
  pagerCorruption = null;
}

interface RunDbHealthCheckOptions {
  autoRepair?: boolean;
  createBackupBeforeRepair?: () => boolean;
  expectedSchemaVersion?: string;
  /**
   * Skip `PRAGMA quick_check` during this run.
   * Set via env var `OMNIROUTE_SKIP_DB_HEALTHCHECK=1`.
   * On slow storage (HDD under I/O contention) quick_check can block the
   * Node.js event loop for minutes. The DB is implicitly validated by
   * opening it, applying the schema, and running migrations — if corruption
   * existed, those operations would fail first.
   */
  skipIntegrityCheck?: boolean;
}

interface ComboRow {
  id: string;
  name: string;
  data: string;
  sort_order?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
}

interface ComboRepairResult {
  issueCount: number;
  repairedCount: number;
}

interface QuotaSnapshotRow {
  id: string;
  provider?: string | null;
  connection_id?: string | null;
  created_at?: string | null;
}

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function toRecord(value: unknown): JsonRecord {
  return isRecord(value) ? value : {};
}

function toTrimmedString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function parseJsonRecord(value: string): JsonRecord | null {
  try {
    const parsed = JSON.parse(value);
    return isRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function isFiniteNumber(value: unknown): boolean {
  return typeof value === "number" && Number.isFinite(value);
}

function hasRows(db: SqliteDatabase, table: string): boolean {
  const row = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
    .get(table) as { name?: string } | undefined;
  return row?.name === table;
}

function hasProviderConnection(statement: PreparedStatement, connectionId: string): boolean {
  const row = statement.get(connectionId) as { ok?: number } | undefined;
  return row?.ok === 1;
}

function isValidIsoTimestamp(value: unknown): boolean {
  if (typeof value !== "string" || value.trim().length === 0) return false;
  return !Number.isNaN(Date.parse(value));
}

function buildRepairNote(message: string, checkedAt: string): string {
  return `[db-health:${checkedAt}] ${message}`;
}

function buildDisabledCombo(row: ComboRow, checkedAt: string): JsonRecord {
  const now = checkedAt;
  return {
    id: row.id,
    name: row.name,
    version: 2,
    strategy: "priority",
    models: [],
    config: {},
    isActive: false,
    isHidden: false,
    sortOrder: typeof row.sort_order === "number" ? row.sort_order : 0,
    createdAt: row.created_at || now,
    updatedAt: now,
    repairNote: buildRepairNote("Combo payload was rebuilt after invalid JSON was detected.", now),
  };
}

function normalizeComboModels(models: unknown): unknown[] {
  return Array.isArray(models) ? models : [];
}

function repairComboRows(
  db: SqliteDatabase,
  rows: ComboRow[],
  checkedAt: string,
  options: { autoRepair: boolean; beforeRepair: () => void }
): ComboRepairResult {
  if (rows.length === 0) return { issueCount: 0, repairedCount: 0 };

  const existingComboNames = new Set(rows.map((row) => row.name));
  let issueCount = 0;
  let repairedCount = 0;

  const updateComboStmt = db.prepare("UPDATE combos SET data = ?, updated_at = ? WHERE id = ?");
  const connectionStmt = db.prepare(
    "SELECT 1 AS ok FROM provider_connections WHERE id = ? LIMIT 1"
  );

  for (const row of rows) {
    const parsed = parseJsonRecord(row.data);
    if (!parsed) {
      issueCount += 1;
      if (options.autoRepair) {
        const repaired = buildDisabledCombo(row, checkedAt);
        options.beforeRepair();
        updateComboStmt.run(JSON.stringify(repaired), checkedAt, row.id);
        repairedCount += 1;
      }
      continue;
    }

    const currentModels = normalizeComboModels(parsed.models);
    if (currentModels.length === 0) continue;

    const nextModels: unknown[] = [];
    let removedSteps = 0;
    let clearedConnectionPins = 0;
    let normalizedLegacyComboRefs = 0;

    for (const [index, rawStep] of currentModels.entries()) {
      if (!isRecord(rawStep)) {
        if (typeof rawStep === "string") {
          const normalizedStep = normalizeComboStep(rawStep, {
            comboName: row.name,
            index,
            allCombos: existingComboNames,
          });
          if (normalizedStep?.kind === "combo-ref") {
            if (
              normalizedStep.comboName === row.name ||
              !existingComboNames.has(normalizedStep.comboName)
            ) {
              removedSteps += 1;
              continue;
            }
            nextModels.push(normalizedStep);
            normalizedLegacyComboRefs += 1;
            continue;
          }
        }
        nextModels.push(rawStep);
        continue;
      }

      if (rawStep.kind === "combo-ref") {
        const comboName = toTrimmedString(rawStep.comboName);
        if (!comboName || comboName === row.name || !existingComboNames.has(comboName)) {
          removedSteps += 1;
          continue;
        }
        nextModels.push(rawStep);
        continue;
      }

      const connectionId = toTrimmedString(rawStep.connectionId);
      if (connectionId && !hasProviderConnection(connectionStmt, connectionId)) {
        const repairedStep = { ...rawStep };
        delete repairedStep.connectionId;
        nextModels.push(repairedStep);
        clearedConnectionPins += 1;
        continue;
      }

      nextModels.push(rawStep);
    }

    if (removedSteps === 0 && clearedConnectionPins === 0 && normalizedLegacyComboRefs === 0) {
      continue;
    }

    issueCount += removedSteps + clearedConnectionPins + normalizedLegacyComboRefs;
    if (!options.autoRepair) continue;

    const nextCombo = {
      ...parsed,
      models: nextModels,
      updatedAt: checkedAt,
      repairNote: buildRepairNote(
        [
          removedSteps > 0 ? `${removedSteps} broken combo step(s) removed.` : null,
          clearedConnectionPins > 0
            ? `${clearedConnectionPins} missing connection pin(s) cleared.`
            : null,
          normalizedLegacyComboRefs > 0
            ? `${normalizedLegacyComboRefs} legacy combo ref step(s) canonicalized.`
            : null,
        ]
          .filter(Boolean)
          .join(" "),
        checkedAt
      ),
      ...(nextModels.length === 0 ? { isActive: false } : {}),
    };

    options.beforeRepair();
    updateComboStmt.run(JSON.stringify(nextCombo), checkedAt, row.id);
    repairedCount += removedSteps + clearedConnectionPins + normalizedLegacyComboRefs;
  }

  return { issueCount, repairedCount };
}

const QUOTA_SNAPSHOT_PAGE_SIZE = 1000;

function isInvalidQuotaSnapshot(row: QuotaSnapshotRow, connectionStmt: PreparedStatement): boolean {
  const connectionId = toTrimmedString(row.connection_id);
  const missingConnection = !!connectionId && !hasProviderConnection(connectionStmt, connectionId);
  return missingConnection || !isValidIsoTimestamp(row.created_at);
}

function scanQuotaSnapshots(
  db: SqliteDatabase,
  options: { autoRepair: boolean; beforeRepair: () => void }
): ComboRepairResult {
  if (!hasRows(db, "quota_snapshots")) return { issueCount: 0, repairedCount: 0 };
  const upper = db
    .prepare(
      "SELECT CAST(id AS TEXT) AS id FROM quota_snapshots ORDER BY quota_snapshots.id DESC LIMIT 1"
    )
    .get() as { id: string } | undefined;
  if (!upper) return { issueCount: 0, repairedCount: 0 };

  // The first page has no lower bound, so negative and zero IDs are included.
  const firstPage = db.prepare(
    "SELECT CAST(id AS TEXT) AS id, connection_id, created_at FROM quota_snapshots WHERE id <= CAST(? AS INTEGER) ORDER BY quota_snapshots.id LIMIT ?"
  );
  const nextPage = db.prepare(
    "SELECT CAST(id AS TEXT) AS id, connection_id, created_at FROM quota_snapshots WHERE id > CAST(? AS INTEGER) AND id <= CAST(? AS INTEGER) ORDER BY quota_snapshots.id LIMIT ?"
  );
  const connectionStmt = db.prepare(
    "SELECT 1 AS ok FROM provider_connections WHERE id = ? LIMIT 1"
  );
  const deleteByRowId = options.autoRepair
    ? db.prepare("DELETE FROM quota_snapshots WHERE id = CAST(? AS INTEGER)")
    : null;
  let issueCount = 0;
  let repairedCount = 0;
  let rows = firstPage.all(upper.id, QUOTA_SNAPSHOT_PAGE_SIZE) as QuotaSnapshotRow[];

  while (rows.length > 0) {
    for (const row of rows) {
      if (isInvalidQuotaSnapshot(row, connectionStmt)) {
        issueCount += 1;
        if (deleteByRowId) {
          options.beforeRepair();
          repairedCount += deleteByRowId.run(row.id).changes;
        }
      }
    }
    const lastId = rows[rows.length - 1].id;
    // Rows appended during a scan belong to the next health check.
    if (lastId === upper.id) break;
    rows = nextPage.all(lastId, upper.id, QUOTA_SNAPSHOT_PAGE_SIZE) as QuotaSnapshotRow[];
  }
  return { issueCount, repairedCount };
}

/**
 * `api_keys` is NOT the complete set of budget / cost-history owners. The
 * deployment-time environment key authenticates without ever being persisted,
 * so every row it owns looks like a broken reference while being live state —
 * see `@/shared/constants/apiKeyIdentities`.
 *
 * Deleting those rows removes the active spend policy, and `checkBudget()` is
 * fail-open when no budget row exists: the "repair" silently lifts the spend
 * ceiling instead of degrading it. Genuinely unowned rows are still removed.
 */
const SYNTHETIC_OWNER_IDS = getSyntheticApiKeyIds();

function orphanDomainRowsPredicate(): string {
  const placeholders = SYNTHETIC_OWNER_IDS.map(() => "?").join(", ");
  const syntheticGuard = placeholders ? ` AND api_key_id NOT IN (${placeholders})` : "";
  return `api_key_id NOT IN (SELECT id FROM api_keys)${syntheticGuard}`;
}

function countOrphanDomainRows(
  db: SqliteDatabase,
  table: "domain_budgets" | "domain_cost_history"
) {
  if (!hasRows(db, table)) return 0;
  const row = db
    .prepare(
      `SELECT COUNT(*) AS count
       FROM ${table}
       WHERE ${orphanDomainRowsPredicate()}`
    )
    .get(...SYNTHETIC_OWNER_IDS) as { count?: number } | undefined;
  return row?.count || 0;
}

function repairOrphanDomainRows(
  db: SqliteDatabase,
  table: "domain_budgets" | "domain_cost_history"
): number {
  if (!hasRows(db, table)) return 0;
  return db
    .prepare(`DELETE FROM ${table} WHERE ${orphanDomainRowsPredicate()}`)
    .run(...SYNTHETIC_OWNER_IDS).changes;
}

function countInvalidJsonRows(
  db: SqliteDatabase,
  table: "domain_fallback_chains" | "domain_lockout_state" | "domain_circuit_breakers",
  column: "chain" | "attempts" | "options"
): number {
  if (!hasRows(db, table)) return 0;
  const rows = db.prepare(`SELECT ${column} FROM ${table}`).all() as Array<Record<string, unknown>>;
  let invalid = 0;
  for (const row of rows) {
    const raw = row[column];
    if (raw == null && column === "options") continue;
    if (typeof raw !== "string") {
      invalid += 1;
      continue;
    }
    try {
      JSON.parse(raw);
    } catch {
      invalid += 1;
    }
  }
  return invalid;
}

function repairInvalidJsonRows(
  db: SqliteDatabase,
  table: "domain_fallback_chains" | "domain_lockout_state" | "domain_circuit_breakers",
  column: "chain" | "attempts" | "options"
): number {
  if (!hasRows(db, table)) return 0;

  const rows = db.prepare(`SELECT rowid, ${column} FROM ${table}`).all() as Array<{
    rowid: number;
    [key: string]: unknown;
  }>;

  const deleteByRowId = db.prepare(`DELETE FROM ${table} WHERE rowid = ?`);
  const clearOptionsByRowId = db.prepare(
    "UPDATE domain_circuit_breakers SET options = NULL WHERE rowid = ?"
  );
  let repaired = 0;

  for (const row of rows) {
    const raw = row[column];
    if (raw == null && table === "domain_circuit_breakers") {
      continue;
    }
    if (typeof raw !== "string") {
      if (table === "domain_circuit_breakers") {
        repaired += clearOptionsByRowId.run(row.rowid).changes;
        continue;
      }
      deleteByRowId.run(row.rowid);
      repaired += 1;
      continue;
    }
    try {
      JSON.parse(raw);
    } catch {
      if (table === "domain_circuit_breakers") {
        repaired += clearOptionsByRowId.run(row.rowid).changes;
        continue;
      }
      deleteByRowId.run(row.rowid);
      repaired += 1;
    }
  }

  return repaired;
}

function getSchemaVersionIssueCount(db: SqliteDatabase, expectedSchemaVersion: string): number {
  if (!hasRows(db, "db_meta")) return 0;
  const row = db.prepare("SELECT value FROM db_meta WHERE key = 'schema_version'").get() as
    { value?: string | null } | undefined;
  const current = typeof row?.value === "string" ? row.value : null;
  return current === expectedSchemaVersion ? 0 : 1;
}

function repairSchemaVersion(db: SqliteDatabase, expectedSchemaVersion: string): number {
  if (!hasRows(db, "db_meta")) return 0;
  return db
    .prepare("INSERT OR REPLACE INTO db_meta (key, value) VALUES ('schema_version', ?)")
    .run(expectedSchemaVersion).changes;
}

export function runDbHealthCheck(
  db: SqliteDatabase,
  options: RunDbHealthCheckOptions = {}
): DbHealthCheckResult {
  const autoRepair = options.autoRepair === true;
  const expectedSchemaVersion = options.expectedSchemaVersion || "1";
  const checkedAt = new Date().toISOString();
  const issues: DbHealthIssue[] = [];
  if (pagerCorruption) {
    issues.push({
      type: "integrity_check_failed",
      table: "sqlite",
      description: `Pager reported SQLITE_CORRUPT during ${pagerCorruption.source}: ${pagerCorruption.message}`,
      count: 1,
    });
  }
  let repairedCount = 0;
  let backupCreated = false;
  let backupAttempted = false;

  const ensureBackupBeforeRepair = () => {
    if (!autoRepair || backupAttempted || typeof options.createBackupBeforeRepair !== "function") {
      return;
    }
    backupAttempted = true;
    backupCreated = options.createBackupBeforeRepair();
    if (!backupCreated) {
      throw new Error("Database health repair aborted: backup creation failed.");
    }
  };

  // Use quick_check instead of integrity_check on startup — integrity_check
  // does a full page-by-page scan that can take minutes on a fragmented WAL,
  // causing 7+ minute boot times. quick_check still catches corruption but
  // skips deep index verification, reducing I/O to seconds.
  // Skip entirely when skipIntegrityCheck is set (env OMNIROUTE_SKIP_DB_HEALTHCHECK=1).
  if (!options.skipIntegrityCheck) {
    const integrityCheck = db.pragma("quick_check") as Array<{ quick_check?: string }>;
    if (integrityCheck[0]?.quick_check !== "ok") {
      issues.push({
        type: "integrity_check_failed",
        table: "sqlite",
        description: "SQLite integrity_check returned a non-ok status.",
        count: 1,
      });
    }
  }

  if (hasRows(db, "combos")) {
    const comboRows = db
      .prepare(
        "SELECT id, name, data, sort_order, created_at, updated_at FROM combos ORDER BY name COLLATE NOCASE ASC"
      )
      .all() as ComboRow[];
    const comboRepair = repairComboRows(db, comboRows, checkedAt, {
      autoRepair,
      beforeRepair: ensureBackupBeforeRepair,
    });
    if (comboRepair.issueCount > 0) {
      issues.push({
        type: "broken_reference",
        table: "combos",
        description:
          "Combos contained broken combo references, legacy combo refs, invalid JSON, or pinned connections that no longer exist.",
        count: comboRepair.issueCount,
      });
      repairedCount += comboRepair.repairedCount;
    }
  }

  const quotaRepair = scanQuotaSnapshots(db, {
    autoRepair,
    beforeRepair: ensureBackupBeforeRepair,
  });
  if (quotaRepair.issueCount > 0) {
    issues.push({
      type: "stale_snapshot",
      table: "quota_snapshots",
      description:
        "Quota snapshots referenced missing connections or contained invalid timestamps.",
      count: quotaRepair.issueCount,
    });
    repairedCount += quotaRepair.repairedCount;
  }

  const orphanBudgets = countOrphanDomainRows(db, "domain_budgets");
  if (orphanBudgets > 0) {
    issues.push({
      type: "broken_reference",
      table: "domain_budgets",
      description: "Domain budgets referenced API keys that no longer exist.",
      count: orphanBudgets,
    });
    if (autoRepair) {
      ensureBackupBeforeRepair();
      repairedCount += repairOrphanDomainRows(db, "domain_budgets");
    }
  }

  const orphanCostHistory = countOrphanDomainRows(db, "domain_cost_history");
  if (orphanCostHistory > 0) {
    issues.push({
      type: "broken_reference",
      table: "domain_cost_history",
      description: "Domain cost history referenced API keys that no longer exist.",
      count: orphanCostHistory,
    });
    if (autoRepair) {
      ensureBackupBeforeRepair();
      repairedCount += repairOrphanDomainRows(db, "domain_cost_history");
    }
  }

  const invalidFallbackChains = countInvalidJsonRows(db, "domain_fallback_chains", "chain");
  if (invalidFallbackChains > 0) {
    issues.push({
      type: "invalid_state",
      table: "domain_fallback_chains",
      description: "Fallback chain rows contained invalid JSON payloads.",
      count: invalidFallbackChains,
    });
    if (autoRepair) {
      ensureBackupBeforeRepair();
      repairedCount += repairInvalidJsonRows(db, "domain_fallback_chains", "chain");
    }
  }

  const invalidLockoutState = countInvalidJsonRows(db, "domain_lockout_state", "attempts");
  if (invalidLockoutState > 0) {
    issues.push({
      type: "invalid_state",
      table: "domain_lockout_state",
      description: "Lockout state rows contained invalid JSON payloads.",
      count: invalidLockoutState,
    });
    if (autoRepair) {
      ensureBackupBeforeRepair();
      repairedCount += repairInvalidJsonRows(db, "domain_lockout_state", "attempts");
    }
  }

  const invalidBreakerOptions = countInvalidJsonRows(db, "domain_circuit_breakers", "options");
  if (invalidBreakerOptions > 0) {
    issues.push({
      type: "invalid_state",
      table: "domain_circuit_breakers",
      description: "Circuit breaker option payloads were invalid JSON.",
      count: invalidBreakerOptions,
    });
    if (autoRepair) {
      ensureBackupBeforeRepair();
      repairedCount += repairInvalidJsonRows(db, "domain_circuit_breakers", "options");
    }
  }

  const schemaVersionIssues = getSchemaVersionIssueCount(db, expectedSchemaVersion);
  if (schemaVersionIssues > 0) {
    issues.push({
      type: "invalid_state",
      table: "db_meta",
      description: `db_meta.schema_version did not match expected version ${expectedSchemaVersion}.`,
      count: schemaVersionIssues,
    });
    if (autoRepair) {
      ensureBackupBeforeRepair();
      repairedCount += repairSchemaVersion(db, expectedSchemaVersion);
    }
  }

  return {
    isHealthy: issues.length === 0,
    issues,
    repairedCount,
    backupCreated,
    autoRepair,
    checkedAt,
    driver: describeDbDriver(db),
  };
}
