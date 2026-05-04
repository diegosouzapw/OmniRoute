import { normalizeComboStep } from "@/lib/combos/steps";
import {
  decryptConnectionFields,
  encryptConnectionFields,
  isMigrationNeeded,
  resetMigrationFlag,
} from "./encryption";

type SqliteDatabase = import("better-sqlite3").Database;
type JsonRecord = Record<string, unknown>;

export type DbHealthIssueType =
  | "integrity_check_failed"
  | "broken_reference"
  | "stale_snapshot"
  | "invalid_state"
  | "legacy_encryption";

export interface DbHealthIssue {
  type: DbHealthIssueType;
  table: string;
  description: string;
  count: number;
}

export interface DbHealthCheckResult {
  isHealthy: boolean;
  issues: DbHealthIssue[];
  repairedCount: number;
  backupCreated: boolean;
  autoRepair: boolean;
  checkedAt: string;
}

interface RunDbHealthCheckOptions {
  autoRepair?: boolean;
  createBackupBeforeRepair?: () => boolean;
  expectedSchemaVersion?: string;
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
  id?: number;
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

function hasProviderConnection(db: SqliteDatabase, connectionId: string): boolean {
  const row = db
    .prepare("SELECT 1 AS ok FROM provider_connections WHERE id = ? LIMIT 1")
    .get(connectionId) as { ok?: number } | undefined;
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
  options: { autoRepair: boolean }
): ComboRepairResult {
  if (rows.length === 0) return { issueCount: 0, repairedCount: 0 };

  const existingComboNames = new Set(rows.map((row) => row.name));
  let issueCount = 0;
  let repairedCount = 0;

  const updateComboStmt = db.prepare("UPDATE combos SET data = ?, updated_at = ? WHERE id = ?");

  for (const row of rows) {
    const parsed = parseJsonRecord(row.data);
    if (!parsed) {
      issueCount += 1;
      if (options.autoRepair) {
        const repaired = buildDisabledCombo(row, checkedAt);
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
      if (connectionId && !hasProviderConnection(db, connectionId)) {
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

    updateComboStmt.run(JSON.stringify(nextCombo), checkedAt, row.id);
    repairedCount += removedSteps + clearedConnectionPins + normalizedLegacyComboRefs;
  }

  return { issueCount, repairedCount };
}

function getBrokenQuotaSnapshotRowIds(db: SqliteDatabase): number[] {
  if (!hasRows(db, "quota_snapshots")) return [];

  const brokenRowIds = new Set<number>();
  const rows = db
    .prepare("SELECT id, provider, connection_id, created_at FROM quota_snapshots")
    .all() as QuotaSnapshotRow[];

  for (const row of rows) {
    const connectionId = toTrimmedString(row.connection_id);
    const missingConnection = !!connectionId && !hasProviderConnection(db, connectionId);
    const invalidTimestamp = !isValidIsoTimestamp(row.created_at);
    if ((missingConnection || invalidTimestamp) && typeof row.id === "number") {
      brokenRowIds.add(row.id);
    }
  }

  return Array.from(brokenRowIds);
}

function countOrphanQuotaSnapshots(db: SqliteDatabase): number {
  return getBrokenQuotaSnapshotRowIds(db).length;
}

function repairQuotaSnapshots(db: SqliteDatabase): number {
  if (!hasRows(db, "quota_snapshots")) return 0;
  const brokenRowIds = getBrokenQuotaSnapshotRowIds(db);
  if (brokenRowIds.length === 0) return 0;

  const deleteByRowId = db.prepare("DELETE FROM quota_snapshots WHERE id = ?");
  let repaired = 0;
  for (const rowId of brokenRowIds) {
    repaired += deleteByRowId.run(rowId).changes;
  }
  return repaired;
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
       WHERE api_key_id NOT IN (SELECT id FROM api_keys)`
    )
    .get() as { count?: number } | undefined;
  return row?.count || 0;
}

function repairOrphanDomainRows(
  db: SqliteDatabase,
  table: "domain_budgets" | "domain_cost_history"
): number {
  if (!hasRows(db, table)) return 0;
  return db.prepare(`DELETE FROM ${table} WHERE api_key_id NOT IN (SELECT id FROM api_keys)`).run()
    .changes;
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
    | { value?: string | null }
    | undefined;
  const current = typeof row?.value === "string" ? row.value : null;
  return current === expectedSchemaVersion ? 0 : 1;
}

function repairSchemaVersion(db: SqliteDatabase, expectedSchemaVersion: string): number {
  if (!hasRows(db, "db_meta")) return 0;
  return db
    .prepare("INSERT OR REPLACE INTO db_meta (key, value) VALUES ('schema_version', ?)")
    .run(expectedSchemaVersion).changes;
}

function countLegacyEncryptedTokens(db: SqliteDatabase): number {
  if (!hasRows(db, "provider_connections")) return 0;

  const rows = db
    .prepare("SELECT api_key, access_token, refresh_token, id_token FROM provider_connections")
    .all() as Array<{
    api_key?: string | null;
    access_token?: string | null;
    refresh_token?: string | null;
    id_token?: string | null;
  }>;

  let legacyCount = 0;
  for (const row of rows) {
    resetMigrationFlag();
    decryptConnectionFields({
      apiKey: row.api_key,
      accessToken: row.access_token,
      refreshToken: row.refresh_token,
      idToken: row.id_token,
    });
    if (isMigrationNeeded()) {
      legacyCount += 1;
    }
  }

  return legacyCount;
}

function repairLegacyEncryption(db: SqliteDatabase): number {
  if (!hasRows(db, "provider_connections")) return 0;

  const rows = db
    .prepare("SELECT id, api_key, access_token, refresh_token, id_token FROM provider_connections")
    .all() as Array<{
    id: string;
    api_key?: string | null;
    access_token?: string | null;
    refresh_token?: string | null;
    id_token?: string | null;
  }>;

  const updateStmt = db.prepare(
    "UPDATE provider_connections SET api_key = ?, access_token = ?, refresh_token = ?, id_token = ?, updated_at = ? WHERE id = ?"
  );

  let repaired = 0;
  const now = new Date().toISOString();

  for (const row of rows) {
    resetMigrationFlag();
    const camelRow = {
      apiKey: row.api_key,
      accessToken: row.access_token,
      refreshToken: row.refresh_token,
      idToken: row.id_token,
    };

    const decrypted = decryptConnectionFields(camelRow);

    if (isMigrationNeeded()) {
      const reEncrypted = encryptConnectionFields(decrypted);
      updateStmt.run(
        reEncrypted.apiKey || null,
        reEncrypted.accessToken || null,
        reEncrypted.refreshToken || null,
        reEncrypted.idToken || null,
        now,
        row.id
      );
      repaired += 1;
    }
  }

  return repaired;
}

export function runDbHealthCheck(
  db: SqliteDatabase,
  options: RunDbHealthCheckOptions = {}
): DbHealthCheckResult {
  const autoRepair = options.autoRepair === true;
  const expectedSchemaVersion = options.expectedSchemaVersion || "1";
  const checkedAt = new Date().toISOString();
  const issues: DbHealthIssue[] = [];
  let repairedCount = 0;
  let backupCreated = false;
  let backupAttempted = false;

  const ensureBackupBeforeRepair = () => {
    if (!autoRepair || backupAttempted || typeof options.createBackupBeforeRepair !== "function") {
      return;
    }
    backupAttempted = true;
    backupCreated = options.createBackupBeforeRepair();
  };

  const integrityCheck = db.pragma("integrity_check") as Array<{ integrity_check?: string }>;
  if (integrityCheck[0]?.integrity_check !== "ok") {
    issues.push({
      type: "integrity_check_failed",
      table: "sqlite",
      description: "SQLite integrity_check returned a non-ok status.",
      count: 1,
    });
  }

  if (hasRows(db, "combos")) {
    const comboRows = db
      .prepare(
        "SELECT id, name, data, sort_order, created_at, updated_at FROM combos ORDER BY name COLLATE NOCASE ASC"
      )
      .all() as ComboRow[];
    const comboRepair = repairComboRows(db, comboRows, checkedAt, { autoRepair });
    if (comboRepair.issueCount > 0) {
      issues.push({
        type: "broken_reference",
        table: "combos",
        description:
          "Combos contained broken combo references, legacy combo refs, invalid JSON, or pinned connections that no longer exist.",
        count: comboRepair.issueCount,
      });
      if (autoRepair) {
        ensureBackupBeforeRepair();
        repairedCount += comboRepair.repairedCount;
      }
    }
  }

  const orphanQuotaCount = countOrphanQuotaSnapshots(db);
  if (orphanQuotaCount > 0) {
    issues.push({
      type: "stale_snapshot",
      table: "quota_snapshots",
      description:
        "Quota snapshots referenced missing connections or contained invalid timestamps.",
      count: orphanQuotaCount,
    });
    if (autoRepair) {
      ensureBackupBeforeRepair();
      repairedCount += repairQuotaSnapshots(db);
    }
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

  const legacyEncryptionCount = countLegacyEncryptedTokens(db);
  if (legacyEncryptionCount > 0) {
    issues.push({
      type: "legacy_encryption",
      table: "provider_connections",
      description:
        "Provider connections contain tokens encrypted with the legacy dynamic salt derivation.",
      count: legacyEncryptionCount,
    });
    if (autoRepair) {
      ensureBackupBeforeRepair();
      repairedCount += repairLegacyEncryption(db);
    }
  }

  return {
    isHealthy: issues.length === 0,
    issues,
    repairedCount,
    backupCreated,
    autoRepair,
    checkedAt,
  };
}
