/**
 * db/backup.js — Database backup/restore operations.
 */

import path from "path";
import fs from "fs";
import {
  getDbInstance,
  resetDbInstance,
  isBuildPhase,
  isCloud,
  SQLITE_FILE,
  DB_BACKUPS_DIR,
  DATA_DIR,
} from "./core";
import { resetAllDbModuleState } from "./stateReset";
import { isAutomatedTestProcess } from "@/shared/utils/testProcess";

type CountRow = { cnt?: number };

// ──────────────── Backup Config ────────────────

let _lastBackupAt = 0;
const BACKUP_THROTTLE_MS = 60 * 60 * 1000; // 60 minutes
const MAX_DB_BACKUPS = 20;
const DEFAULT_DB_BACKUP_RETENTION_DAYS = 0;
const TRUE_ENV_VALUES = new Set(["1", "true", "yes", "on"]);

function parsePositiveInt(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function parseNonNegativeInt(value: string | undefined, fallback: number) {
  if (value === undefined) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
}

// #3834: the "Keep latest backups" UI value is persisted here so it survives a page
// refresh / the loadStorageHealth() refetch. A dedicated namespace avoids any
// cross-talk with the databaseSettings key_value store (which rewrites all of its own
// keys on every update). It is intentionally separate from the orphan
// `databaseSettings.backup.keepLastNBackups` (default 5) so existing installs keep the
// historical default of 20 until an operator explicitly changes it here.
const DB_BACKUP_SETTINGS_NAMESPACE = "dbBackup";
const DB_BACKUP_MAX_FILES_KEY = "maxFiles";
const DB_BACKUP_RETENTION_DAYS_KEY = "retentionDays";

function getStoredDbBackupInteger(key: string, options: { min: number }): number | undefined {
  try {
    const db = getDbInstance();
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get(DB_BACKUP_SETTINGS_NAMESPACE, key) as { value?: string } | undefined;
    if (!row?.value) return undefined;
    const parsed = JSON.parse(row.value);
    return Number.isInteger(parsed) && parsed >= options.min ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function setStoredDbBackupInteger(key: string, value: number, options: { min: number }): void {
  if (!Number.isInteger(value) || value < options.min) return;
  const db = getDbInstance();
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    DB_BACKUP_SETTINGS_NAMESPACE,
    key,
    JSON.stringify(value)
  );
}

/** Persist the operator-chosen "keep latest backups" retention count (#3834). */
export function setDbBackupMaxFiles(value: number): void {
  setStoredDbBackupInteger(DB_BACKUP_MAX_FILES_KEY, value, { min: 1 });
}

export function getDbBackupMaxFiles() {
  // Precedence: DB_BACKUP_MAX_FILES env override (ops) → persisted UI value → default.
  if (process.env.DB_BACKUP_MAX_FILES) {
    return parsePositiveInt(process.env.DB_BACKUP_MAX_FILES, MAX_DB_BACKUPS);
  }
  return getStoredDbBackupInteger(DB_BACKUP_MAX_FILES_KEY, { min: 1 }) ?? MAX_DB_BACKUPS;
}

/** Persist the operator-chosen age-based backup retention window. */
export function setDbBackupRetentionDays(value: number): void {
  setStoredDbBackupInteger(DB_BACKUP_RETENTION_DAYS_KEY, value, { min: 0 });
}

export function getDbBackupRetentionDays() {
  // Precedence: DB_BACKUP_RETENTION_DAYS env override (ops) → persisted UI value → default.
  if (process.env.DB_BACKUP_RETENTION_DAYS) {
    return parseNonNegativeInt(
      process.env.DB_BACKUP_RETENTION_DAYS,
      DEFAULT_DB_BACKUP_RETENTION_DAYS
    );
  }
  return (
    getStoredDbBackupInteger(DB_BACKUP_RETENTION_DAYS_KEY, { min: 0 }) ??
    DEFAULT_DB_BACKUP_RETENTION_DAYS
  );
}

function getBackupDir() {
  return DB_BACKUPS_DIR || path.join(DATA_DIR, "db_backups");
}

function getBackupFamilyBase(filename: string) {
  if (filename.endsWith("-wal") || filename.endsWith("-shm")) return filename.slice(0, -4);
  if (filename.endsWith("-journal")) return filename.slice(0, -8);
  return filename;
}

function collectBackupFamilies(backupDir: string) {
  if (!fs.existsSync(backupDir)) return [];

  const families = new Map<
    string,
    {
      base: string;
      hasPrimary: boolean;
      primaryMtimeMs: number;
      latestMtimeMs: number;
      files: string[];
    }
  >();

  for (const name of fs.readdirSync(backupDir)) {
    if (!name.startsWith("db_")) continue;
    const base = getBackupFamilyBase(name);
    const filePath = path.join(backupDir, name);

    let stat;
    try {
      stat = fs.statSync(filePath);
    } catch {
      continue;
    }

    const family = families.get(base) || {
      base,
      hasPrimary: false,
      primaryMtimeMs: 0,
      latestMtimeMs: 0,
      files: [],
    };

    family.files.push(name);
    family.latestMtimeMs = Math.max(family.latestMtimeMs, stat.mtimeMs);
    if (name === base && name.endsWith(".sqlite")) {
      family.hasPrimary = true;
      family.primaryMtimeMs = stat.mtimeMs;
    }

    families.set(base, family);
  }

  return [...families.values()];
}

export function cleanupDbBackups(options?: { maxFiles?: number; retentionDays?: number }) {
  const backupDir = getBackupDir();
  if (!fs.existsSync(backupDir)) {
    return {
      deletedBackupFamilies: 0,
      deletedFiles: 0,
      keptBackupFamilies: 0,
      maxFiles: options?.maxFiles ?? getDbBackupMaxFiles(),
      retentionDays: options?.retentionDays ?? getDbBackupRetentionDays(),
    };
  }

  const maxFiles = Math.max(1, options?.maxFiles ?? getDbBackupMaxFiles());
  const retentionDays = Math.max(0, options?.retentionDays ?? getDbBackupRetentionDays());
  const cutoffMs = retentionDays > 0 ? Date.now() - retentionDays * 24 * 60 * 60 * 1000 : 0;
  const families = collectBackupFamilies(backupDir);
  const primaryFamilies = families
    .filter((family) => family.hasPrimary)
    .sort((a, b) => b.primaryMtimeMs - a.primaryMtimeMs);
  const keepPrimaryBases = new Set(primaryFamilies.slice(0, maxFiles).map((family) => family.base));

  let deletedBackupFamilies = 0;
  let deletedFiles = 0;

  for (const family of families) {
    const isOverflowPrimary = family.hasPrimary && !keepPrimaryBases.has(family.base);
    const isExpired = retentionDays > 0 && family.latestMtimeMs < cutoffMs;
    const isOrphan = !family.hasPrimary;
    if (!isOverflowPrimary && !isExpired && !isOrphan) continue;

    deletedBackupFamilies += 1;
    for (const name of family.files) {
      try {
        fs.unlinkSync(path.join(backupDir, name));
        deletedFiles += 1;
      } catch {
        /* ignore */
      }
    }
  }

  return {
    deletedBackupFamilies,
    deletedFiles,
    keptBackupFamilies: collectBackupFamilies(backupDir).filter((family) => family.hasPrimary)
      .length,
    maxFiles,
    retentionDays,
  };
}

function coerceBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const v = value.trim().toLowerCase();
    if (v === "true" || v === "1") return true;
    if (v === "false" || v === "0") return false;
  }
  return null;
}

function parseStoredJson(value: string | undefined): unknown {
  if (value === undefined) return undefined;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

/**
 * #5871: resolve the persisted `backup.autoBackupEnabled` dashboard setting.
 *
 * This mirrors the precedence used by `databaseSettings.getUserDatabaseSettings()`
 * (default `false` → `settings.databaseSettings.backup` → `settings.backup` →
 * `databaseSettings` namespace, last wins) but reads `key_value` rows directly so
 * `backup.ts` does not create a static import cycle with `databaseSettings.ts`
 * (which imports `backupDbFile` at module load). Returns `true` when auto backups
 * are explicitly disabled by the operator, so callers can skip non-manual backups.
 */
export function isAutoBackupDisabledBySetting(): boolean {
  try {
    const db = getDbInstance();
    const rows = db
      .prepare("SELECT namespace, key, value FROM key_value WHERE namespace IN (?, ?)")
      .all("settings", "databaseSettings") as Array<{
      namespace: string;
      key: string;
      value: string;
    }>;

    // Candidate values by source, resolved regardless of DB row iteration order.
    // Precedence (lowest → highest, last wins), mirroring getUserDatabaseSettings():
    //   settings.databaseSettings.backup → settings.backup → databaseSettings namespace.
    let fromSettingsNested: boolean | null = null; // settings.databaseSettings.backup.autoBackupEnabled
    let fromSettingsBackup: boolean | null = null; // settings.backup.autoBackupEnabled
    let fromDbFlat: boolean | null = null; // databaseSettings namespace flat alias "autoBackupEnabled"
    let fromDbNested: boolean | null = null; // databaseSettings namespace nested "backup.autoBackupEnabled"

    for (const row of rows) {
      const parsed = parseStoredJson(row.value);

      if (row.namespace === "settings") {
        if (row.key === "databaseSettings" && isPlainObject(parsed)) {
          const backup = (parsed as Record<string, unknown>).backup;
          if (isPlainObject(backup)) {
            const b = coerceBoolean((backup as Record<string, unknown>).autoBackupEnabled);
            if (b !== null) fromSettingsNested = b;
          }
        } else if (row.key === "backup" && isPlainObject(parsed)) {
          const b = coerceBoolean((parsed as Record<string, unknown>).autoBackupEnabled);
          if (b !== null) fromSettingsBackup = b;
        }
      } else if (row.namespace === "databaseSettings") {
        if (row.key === "autoBackupEnabled") {
          const b = coerceBoolean(parsed);
          if (b !== null) fromDbFlat = b;
        } else if (row.key === "backup.autoBackupEnabled") {
          const b = coerceBoolean(parsed);
          if (b !== null) fromDbNested = b;
        }
      }
    }

    // Apply precedence: last non-null wins (mirrors getUserDatabaseSettings — flat alias
    // first, then nested key). Default (no persisted value) → not disabled.
    let enabled: boolean | null = null;
    for (const candidate of [fromSettingsNested, fromSettingsBackup, fromDbFlat, fromDbNested]) {
      if (candidate !== null) enabled = candidate;
    }

    return enabled === false;
  } catch {
    // If the setting cannot be read (e.g. DB not ready), do not block backups.
    return false;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isSqliteAutoBackupDisabled() {
  if (isAutomatedTestProcess()) return true;

  const value = process.env.DISABLE_SQLITE_AUTO_BACKUP;
  if (!value) return false;
  return TRUE_ENV_VALUES.has(value.trim().toLowerCase());
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function unlinkFileWithRetry(
  filePath: string,
  options?: { maxAttempts?: number; retryableCodes?: string[]; baseDelayMs?: number }
) {
  const maxAttempts = Math.max(1, options?.maxAttempts ?? 10);
  const retryableCodes = new Set(options?.retryableCodes ?? ["EBUSY", "EPERM"]);
  const baseDelayMs = Math.max(0, options?.baseDelayMs ?? 100);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      return;
    } catch (err: unknown) {
      const code =
        err && typeof err === "object" && "code" in err ? (err as NodeJS.ErrnoException).code : "";
      if (code === "ENOENT") return;
      if (retryableCodes.has(String(code)) && attempt < maxAttempts - 1) {
        await sleep(baseDelayMs * (attempt + 1));
      } else {
        throw err;
      }
    }
  }
}

// ──────────────── Backup ────────────────

export function backupDbFile(reason = "auto") {
  try {
    if (isBuildPhase || isCloud) return null;
    if (!SQLITE_FILE || !fs.existsSync(SQLITE_FILE)) return null;
    if (reason !== "manual" && isSqliteAutoBackupDisabled()) return null;
    // #5871: honor the persisted `backup.autoBackupEnabled` dashboard toggle. Only
    // manual and pre-restore backups bypass this gate; automatic + pre-write safety
    // snapshots must stop firing once the operator disables auto-backup in the UI.
    if (reason !== "manual" && reason !== "pre-restore" && isAutoBackupDisabledBySetting())
      return null;

    const stat = fs.statSync(SQLITE_FILE);
    if (stat.size < 4096) {
      console.warn(`[DB] Backup SKIPPED — DB too small (${stat.size}B)`);
      return null;
    }

    // Throttle
    const now = Date.now();
    if (reason !== "manual" && reason !== "pre-restore" && now - _lastBackupAt < BACKUP_THROTTLE_MS)
      return null;
    _lastBackupAt = now;

    const backupDir = getBackupDir();
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

    if (reason !== "manual" && reason !== "pre-restore") {
      // Shrink detection is useful for automatic safety backups, but it should
      // never block an explicit operator action like manual backup or pre-restore.
      const existingBackups = fs
        .readdirSync(backupDir)
        .filter((f) => f.startsWith("db_") && f.endsWith(".sqlite"))
        .sort();
      if (existingBackups.length > 0) {
        const latestBackup = existingBackups[existingBackups.length - 1];
        const latestStat = fs.statSync(path.join(backupDir, latestBackup));
        if (latestStat.size > 4096 && stat.size < latestStat.size * 0.5) {
          console.warn(`[DB] Backup SKIPPED — DB shrank from ${latestStat.size}B to ${stat.size}B`);
          return null;
        }
      }
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFile = path.join(backupDir, `db_${timestamp}_${reason}.sqlite`);

    // Use native SQLite backup API for consistency
    const db = getDbInstance();
    db.backup(backupFile)
      .then(() => {
        console.log(`[DB] Backup created: ${backupFile} (${stat.size} bytes)`);
        cleanupDbBackups();
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        console.error("[DB] Backup failed:", message);
      });

    return { filename: path.basename(backupFile), size: stat.size };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[DB] Backup failed:", message);
    return null;
  }
}

// ──────────────── List Backups ────────────────

export async function listDbBackups() {
  const backupDir = getBackupDir();
  try {
    if (!fs.existsSync(backupDir)) return [];

    const entries = fs
      .readdirSync(backupDir)
      .filter((f) => f.startsWith("db_") && f.endsWith(".sqlite"))
      .sort()
      .reverse();

    const { tryOpenSync } = await import("@/lib/db/adapters/driverFactory");
    return entries.map((filename) => {
      const filePath = path.join(backupDir, filename);
      const stat = fs.statSync(filePath);
      const match = filename.match(/^db_(.+?)_([^.]+)\.sqlite$/);
      const reason = match ? match[2] : "unknown";

      let connectionCount = 0;
      try {
        const backupDb = tryOpenSync(filePath, { readonly: true });
        if (backupDb) {
          try {
            const row = backupDb
              .prepare("SELECT COUNT(*) as cnt FROM provider_connections")
              .get() as CountRow | undefined;
            connectionCount = Number(row?.cnt ?? 0);
          } finally {
            backupDb.close();
          }
        }
      } catch {
        /* ignore */
      }

      return {
        id: filename,
        filename,
        createdAt: stat.mtime.toISOString(),
        size: stat.size,
        reason,
        connectionCount,
      };
    });
  } catch {
    return [];
  }
}

// ──────────────── Restore Backup ────────────────

export async function restoreDbBackup(backupId: string) {
  const backupDir = getBackupDir();

  // Validate format: must be db_<timestamp>_<reason>.sqlite, no path separators
  if (
    !backupId.startsWith("db_") ||
    !backupId.endsWith(".sqlite") ||
    backupId.includes(path.sep) ||
    backupId.includes("/")
  ) {
    throw new Error("Invalid backup ID");
  }

  const backupPath = path.resolve(backupDir, backupId);
  // Prevent path traversal: resolved path must stay within backupDir
  if (
    !backupPath.startsWith(path.resolve(backupDir) + path.sep) &&
    backupPath !== path.resolve(backupDir)
  ) {
    throw new Error("Invalid backup ID: path traversal detected");
  }

  if (!fs.existsSync(backupPath)) {
    throw new Error(`Backup not found: ${backupId}`);
  }

  // Validate backup integrity
  try {
    const { tryOpenSync } = await import("@/lib/db/adapters/driverFactory");
    const testDb = tryOpenSync(backupPath, { readonly: true });
    if (!testDb) {
      throw new Error("Backup file is corrupt: could not open");
    }
    let result: Array<{ integrity_check?: string }>;
    try {
      result = testDb.pragma("integrity_check") as Array<{ integrity_check?: string }>;
    } finally {
      testDb.close();
    }
    if (result[0]?.integrity_check !== "ok") {
      throw new Error("Backup integrity check failed");
    }
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "Backup integrity check failed") throw e;
    const message = e instanceof Error ? e.message : String(e);
    throw new Error(`Backup file is corrupt: ${message}`);
  }

  // Force pre-restore backup (bypass throttle) and await so the DB is not closed while backup runs
  if (!isSqliteAutoBackupDisabled()) {
    _lastBackupAt = 0;
    const backupDirForPre = getBackupDir();
    if (SQLITE_FILE && fs.existsSync(SQLITE_FILE)) {
      const stat = fs.statSync(SQLITE_FILE);
      if (stat.size >= 4096) {
        if (!fs.existsSync(backupDirForPre)) fs.mkdirSync(backupDirForPre, { recursive: true });
        const preBackupPath = path.join(
          backupDirForPre,
          `db_${new Date().toISOString().replace(/[:.]/g, "-")}_pre-restore.sqlite`
        );
        const dbForBackup = getDbInstance();
        await dbForBackup.backup(preBackupPath);
        _lastBackupAt = Date.now();
      }
    }
  }

  // Close and reset current connection
  resetDbInstance();

  // Clear all cached prepared statements and other state bound to the old connection
  resetAllDbModuleState();

  const sqliteFile = SQLITE_FILE;
  if (!sqliteFile) {
    throw new Error("SQLITE_FILE is unavailable in local backup restore");
  }

  // On Windows, the file handle may be released asynchronously after close; give it a moment.
  await sleep(500);

  // Remove main file and WAL sidecars to avoid stale frame replay after restore.
  // Retry unlink on EBUSY/EPERM (Windows may hold the handle briefly).
  const sqliteFilesToReplace = [
    sqliteFile,
    `${sqliteFile}-wal`,
    `${sqliteFile}-shm`,
    `${sqliteFile}-journal`,
  ];
  for (const filePath of sqliteFilesToReplace) {
    if (!filePath) continue;
    await unlinkFileWithRetry(filePath);
  }

  // Copy backup over current DB
  fs.copyFileSync(backupPath, sqliteFile);

  // Reopen
  const db = getDbInstance();
  const connCount =
    (db.prepare("SELECT COUNT(*) as cnt FROM provider_connections").get() as CountRow | undefined)
      ?.cnt || 0;
  const nodeCount =
    (db.prepare("SELECT COUNT(*) as cnt FROM provider_nodes").get() as CountRow | undefined)?.cnt ||
    0;
  const comboCount =
    (db.prepare("SELECT COUNT(*) as cnt FROM combos").get() as CountRow | undefined)?.cnt || 0;
  const keyCount =
    (db.prepare("SELECT COUNT(*) as cnt FROM api_keys").get() as CountRow | undefined)?.cnt || 0;

  console.log(`[DB] Restored backup: ${backupId} (${connCount} connections)`);

  return {
    restored: true,
    backupId,
    connectionCount: connCount,
    nodeCount,
    comboCount,
    apiKeyCount: keyCount,
  };
}

// ──────────────── Export-All helpers (for /api/db-backups/exportAll) ────────────────

export interface ExportAllRows {
  settings: Record<string, string>;
  combos: unknown[];
  providers: unknown[];
  apiKeys: unknown[];
  reasoningRoutingRules: unknown[];
}

/**
 * Reads summary rows used by the exportAll backup route.
 *
 * - settings:  full key_value table (key → value map)
 * - combos:    full combos table
 * - providers: provider_connections rows, **excluding sensitive credentials**
 *              (id, provider, name, auth_type, is_active, email, created_at only)
 * - apiKeys:   api_keys rows with masked prefix
 *              (id, name, first 8 chars of key, machine_id, created_at)
 *
 * Each category is wrapped in a try/catch so a missing table never aborts the
 * entire export — consistent with the original inline behaviour.
 */
export function exportAllSummaryRows(): ExportAllRows {
  const db = getDbInstance();

  const settings: Record<string, string> = {};
  try {
    const rows = db.prepare("SELECT key, value FROM key_value").all() as {
      key: string;
      value: string;
    }[];
    for (const row of rows) {
      settings[row.key] = row.value;
    }
  } catch {
    // key_value table might not exist
  }

  const combos: unknown[] = [];
  try {
    combos.push(...db.prepare("SELECT * FROM combos").all());
  } catch {
    // combos table might not exist
  }

  const providers: unknown[] = [];
  try {
    providers.push(
      ...db
        .prepare(
          "SELECT id, provider, name, auth_type, is_active, email, created_at FROM provider_connections"
        )
        .all()
    );
  } catch {
    // provider_connections table might not exist
  }

  const apiKeys: unknown[] = [];
  try {
    apiKeys.push(
      ...db
        .prepare(
          "SELECT id, name, substr(key, 1, 8) as prefix, machine_id, created_at FROM api_keys"
        )
        .all()
    );
  } catch {
    // api_keys table might not exist
  }

  const reasoningRoutingRules: unknown[] = [];
  try {
    reasoningRoutingRules.push(...db.prepare("SELECT * FROM reasoning_routing_rules").all());
  } catch {
    // reasoning_routing_rules table might not exist in an older backup
  }

  return { settings, combos, providers, apiKeys, reasoningRoutingRules };
}

// ──────────────── Import validation helpers (for /api/db-backups/import) ────────────────

/**
 * Queries an **already-opened** SQLite adapter for the list of table names.
 *
 * Used by the import route to validate that a candidate database contains the
 * required OmniRoute tables before replacing the live database.
 *
 * Accepting an adapter as a parameter (rather than calling getDbInstance()) is
 * intentional: the import route opens a *temporary* database for validation,
 * not the live one.
 */
export function getTableNamesFromAdapter(adapter: {
  prepare: (sql: string) => { all: () => unknown[] };
}): string[] {
  const rows = adapter.prepare("SELECT name FROM sqlite_master WHERE type='table'").all() as Array<{
    name: string;
  }>;
  return rows.map((r) => r.name);
}

/**
 * Counts rows in a set of tables from the **live** database (post-import).
 * Returns an object keyed by table name with the row count as value.
 */
export function countImportedRows(): {
  connCount: number;
  nodeCount: number;
  comboCount: number;
  keyCount: number;
} {
  const db = getDbInstance();
  const connCount =
    (db.prepare("SELECT COUNT(*) as cnt FROM provider_connections").get() as any)?.cnt || 0;
  const nodeCount =
    (db.prepare("SELECT COUNT(*) as cnt FROM provider_nodes").get() as any)?.cnt || 0;
  const comboCount = (db.prepare("SELECT COUNT(*) as cnt FROM combos").get() as any)?.cnt || 0;
  const keyCount = (db.prepare("SELECT COUNT(*) as cnt FROM api_keys").get() as any)?.cnt || 0;
  return { connCount, nodeCount, comboCount, keyCount };
}
