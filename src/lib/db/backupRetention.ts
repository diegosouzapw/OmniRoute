/**
 * Backup retention primitives — pure filesystem work, no `core.ts` dependency.
 *
 * `backup.ts` (manual/API/auto backups) resolves the operator's settings from the
 * database and delegates pure family pruning here. The migration runner deliberately
 * does not prune during its concurrent safety window: its snapshots are content-addressed
 * and reused for an identical DB state, while manual/scheduled cleanup remains the single
 * retention boundary. Before #10421, repeated failed starts created distinct timestamped
 * snapshots and `db_backups/` grew without bound (observed: 48,999 files / 204 GB).
 */

import fs from "fs";
import path from "path";

import type { SqliteAdapter } from "./adapters/types";

export const MAX_DB_BACKUPS = 20;
export const DEFAULT_DB_BACKUP_RETENTION_DAYS = 0;
// #3834: the "Keep latest backups" UI value is persisted here so it survives a page
// refresh. A dedicated namespace avoids cross-talk with the databaseSettings key_value
// store (which rewrites all of its own keys on every update).
export const DB_BACKUP_SETTINGS_NAMESPACE = "dbBackup";
export const DB_BACKUP_MAX_FILES_KEY = "maxFiles";
export const DB_BACKUP_RETENTION_DAYS_KEY = "retentionDays";

export function parsePositiveInt(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export function parseNonNegativeInt(value: string | undefined, fallback: number) {
  if (value === undefined) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
}

function getStoredInteger(
  db: Pick<SqliteAdapter, "prepare">,
  key: string,
  min: number
): number | undefined {
  try {
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get(DB_BACKUP_SETTINGS_NAMESPACE, key) as { value?: string } | undefined;
    if (!row?.value) return undefined;
    const parsed = JSON.parse(row.value);
    return Number.isInteger(parsed) && parsed >= min ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function getDatabaseSettingsKeepLastNBackups(
  db: Pick<SqliteAdapter, "prepare">
): number | undefined {
  try {
    const rows = db
      .prepare(
        "SELECT namespace, key, value FROM key_value WHERE (namespace = 'databaseSettings' AND key IN ('backup.keepLastNBackups', 'keepLastNBackups')) OR (namespace = 'settings' AND key = 'databaseSettings')"
      )
      .all() as Array<{ namespace: string; key: string; value: string }>;

    let fromSettingsNested: number | undefined = undefined;
    let fromDbFlat: number | undefined = undefined;
    let fromDbNested: number | undefined = undefined;

    for (const row of rows) {
      if (!row.value) continue;
      let parsed: unknown;
      try {
        parsed = JSON.parse(row.value);
      } catch {
        continue;
      }

      if (row.namespace === "settings") {
        if (row.key === "databaseSettings" && typeof parsed === "object" && parsed !== null) {
          const backup = (parsed as Record<string, unknown>).backup;
          if (typeof backup === "object" && backup !== null) {
            const val = (backup as Record<string, unknown>).keepLastNBackups;
            if (typeof val === "number" && Number.isInteger(val) && val >= 1) {
              fromSettingsNested = val;
            }
          }
        }
      } else if (row.namespace === "databaseSettings") {
        if (row.key === "backup.keepLastNBackups") {
          if (typeof parsed === "number" && Number.isInteger(parsed) && parsed >= 1) {
            fromDbNested = parsed;
          }
        } else if (row.key === "keepLastNBackups") {
          if (typeof parsed === "number" && Number.isInteger(parsed) && parsed >= 1) {
            fromDbFlat = parsed;
          }
        }
      }
    }

    if (fromDbNested !== undefined) return fromDbNested;
    if (fromSettingsNested !== undefined) return fromSettingsNested;

    // Legacy flat key: migration 046 seeded uncustomized '3' into key_value
    // for all fresh installations. A fresh installation with nothing set by the
    // operator must fall through to MAX_DB_BACKUPS (20) (#13308).
    // Therefore, only honor the legacy flat key if it differs from the migration 046 default.
    if (fromDbFlat !== undefined && fromDbFlat !== 3) {
      return fromDbFlat;
    }

    return undefined;
  } catch {
    return undefined;
  }
}

/**
 * Resolve the operator's backup retention settings with the same precedence
 * `backup.ts` uses for manual/API/auto backups:
 * 1. env override (ops)
 * 2. persisted Storage-page setting (`dbBackup.maxFiles`)
 * 3. persisted Database-page setting (`databaseSettings.backup.keepLastNBackups`) (#15550)
 * 4. default `MAX_DB_BACKUPS`
 */
export function resolveDbBackupRetention(
  db: Pick<SqliteAdapter, "prepare">,
  env: NodeJS.ProcessEnv = process.env
): { maxFiles: number; retentionDays: number } {
  const maxFiles =
    (env.DB_BACKUP_MAX_FILES ? parsePositiveInt(env.DB_BACKUP_MAX_FILES, MAX_DB_BACKUPS) : undefined) ??
    getStoredInteger(db, DB_BACKUP_MAX_FILES_KEY, 1) ??
    getDatabaseSettingsKeepLastNBackups(db) ??
    MAX_DB_BACKUPS;

  return {
    maxFiles,
    retentionDays: env.DB_BACKUP_RETENTION_DAYS
      ? parseNonNegativeInt(env.DB_BACKUP_RETENTION_DAYS, DEFAULT_DB_BACKUP_RETENTION_DAYS)
      : (getStoredInteger(db, DB_BACKUP_RETENTION_DAYS_KEY, 0) ?? DEFAULT_DB_BACKUP_RETENTION_DAYS),
  };
}

/**
 * A backup "family" is the primary `.sqlite` file plus its SQLite sidecars
 * (`-wal` / `-shm` / `-journal`). Retention operates on families so a sidecar is never
 * orphaned from — or outlives — the snapshot it belongs to.
 */
export function getBackupFamilyBase(filename: string) {
  if (filename.endsWith("-wal") || filename.endsWith("-shm")) return filename.slice(0, -4);
  if (filename.endsWith("-journal")) return filename.slice(0, -8);
  return filename;
}

export type BackupFamily = {
  base: string;
  hasPrimary: boolean;
  primaryMtimeMs: number;
  latestMtimeMs: number;
  files: string[];
};

export function collectBackupFamilies(backupDir: string): BackupFamily[] {
  if (!fs.existsSync(backupDir)) return [];

  const families = new Map<string, BackupFamily>();

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

export type PruneResult = {
  deletedBackupFamilies: number;
  deletedFiles: number;
  keptBackupFamilies: number;
  maxFiles: number;
  retentionDays: number;
};

function syncSleep(ms: number): void {
  if (typeof SharedArrayBuffer !== "undefined" && typeof Atomics !== "undefined") {
    try {
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
      return;
    } catch {
      // Atomics.wait may throw on restricted runtimes — fall through to busy-wait
    }
  }
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    /* busy-wait */
  }
}

/**
 * Synchronous file unlinker with retry backoff for Windows EBUSY / EPERM locks (#15550).
 * Avoids crashing the process or swallowing permanent failures silently while keeping
 * `pruneBackupDirectory()` completely synchronous.
 */
export function unlinkSyncWithRetry(
  filePath: string,
  options?: { maxAttempts?: number; baseDelayMs?: number }
): boolean {
  const maxAttempts = Math.max(1, options?.maxAttempts ?? 5);
  const baseDelayMs = Math.max(0, options?.baseDelayMs ?? 25);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return true;
    } catch (err: unknown) {
      const code =
        err && typeof err === "object" && "code" in err ? (err as NodeJS.ErrnoException).code : "";
      if (code === "ENOENT") return true;
      if ((code === "EBUSY" || code === "EPERM") && attempt < maxAttempts - 1) {
        syncSleep(baseDelayMs * (attempt + 1));
      } else {
        return false;
      }
    }
  }
  return false;
}

/**
 * Delete backup families beyond `maxFiles` (newest kept), older than `retentionDays`
 * (0 disables the age rule), or orphaned (sidecars whose primary is already gone).
 */
export function pruneBackupDirectory(options: {
  backupDir: string;
  maxFiles: number;
  retentionDays: number;
}): PruneResult {
  const { backupDir } = options;
  const maxFiles = Math.max(1, options.maxFiles);
  const retentionDays = Math.max(0, options.retentionDays);

  if (!fs.existsSync(backupDir)) {
    return {
      deletedBackupFamilies: 0,
      deletedFiles: 0,
      keptBackupFamilies: 0,
      maxFiles,
      retentionDays,
    };
  }

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

    let anyDeletedInFamily = false;
    for (const name of family.files) {
      const deleted = unlinkSyncWithRetry(path.join(backupDir, name));
      if (deleted) {
        deletedFiles += 1;
        anyDeletedInFamily = true;
      }
    }
    if (anyDeletedInFamily) {
      deletedBackupFamilies += 1;
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
