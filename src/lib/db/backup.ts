/**
 * db/backup.js — Database backup/restore operations.
 */

import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";
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

type CountRow = { cnt?: number };

// ──────────────── Backup Config ────────────────

let _lastBackupAt = 0;
const BACKUP_THROTTLE_MS = 60 * 60 * 1000; // 60 minutes
const MAX_DB_BACKUPS = 20;

// ──────────────── Backup ────────────────

export function backupDbFile(reason = "auto") {
  try {
    if (isBuildPhase || isCloud) return null;
    if (!SQLITE_FILE || !fs.existsSync(SQLITE_FILE)) return null;

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

    const backupDir = DB_BACKUPS_DIR || path.join(DATA_DIR, "db_backups");
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

    // Shrink check vs latest backup
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

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFile = path.join(backupDir, `db_${timestamp}_${reason}.sqlite`);

    // Use native SQLite backup API for consistency
    const db = getDbInstance();
    db.backup(backupFile)
      .then(() => {
        console.log(`[DB] Backup created: ${backupFile} (${stat.size} bytes)`);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        console.error("[DB] Backup failed:", message);
      });

    // Rotation — keep only last N, delete smallest first
    const files = fs
      .readdirSync(backupDir)
      .filter((f) => f.startsWith("db_") && f.endsWith(".sqlite"))
      .sort();
    while (files.length > MAX_DB_BACKUPS) {
      let smallestIdx = 0;
      let smallestSize = Infinity;
      for (let i = 0; i < files.length - 1; i++) {
        try {
          const fStat = fs.statSync(path.join(backupDir, files[i]));
          if (fStat.size < smallestSize) {
            smallestSize = fStat.size;
            smallestIdx = i;
          }
        } catch {
          smallestIdx = i;
          break;
        }
      }
      try {
        fs.unlinkSync(path.join(backupDir, files[smallestIdx]));
      } catch {
        /* gone */
      }
      files.splice(smallestIdx, 1);
    }

    return { filename: path.basename(backupFile), size: stat.size };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[DB] Backup failed:", message);
    return null;
  }
}

// ──────────────── List Backups ────────────────

export async function listDbBackups() {
  const backupDir = DB_BACKUPS_DIR || path.join(DATA_DIR, "db_backups");
  try {
    if (!fs.existsSync(backupDir)) return [];

    const entries = fs
      .readdirSync(backupDir)
      .filter((f) => f.startsWith("db_") && f.endsWith(".sqlite"))
      .sort()
      .reverse();

    return entries.map((filename) => {
      const filePath = path.join(backupDir, filename);
      const stat = fs.statSync(filePath);
      const match = filename.match(/^db_(.+?)_([^.]+)\.sqlite$/);
      const reason = match ? match[2] : "unknown";

      let connectionCount = 0;
      try {
        const backupDb = new Database(filePath, { readonly: true });
        const row = backupDb.prepare("SELECT COUNT(*) as cnt FROM provider_connections").get() as
          | CountRow
          | undefined;
        connectionCount = row?.cnt || 0;
        backupDb.close();
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
  const backupDir = DB_BACKUPS_DIR || path.join(DATA_DIR, "db_backups");

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
    const testDb = new Database(backupPath, { readonly: true });
    const result = testDb.pragma("integrity_check") as Array<{ integrity_check?: string }>;
    testDb.close();
    if (result[0]?.integrity_check !== "ok") {
      throw new Error("Backup integrity check failed");
    }
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "Backup integrity check failed") throw e;
    const message = e instanceof Error ? e.message : String(e);
    throw new Error(`Backup file is corrupt: ${message}`);
  }

  // Force pre-restore backup (bypass throttle)
  _lastBackupAt = 0;
  backupDbFile("pre-restore");

  // Close and reset current connection
  resetDbInstance();

  // Clear all cached prepared statements and other state bound to the old connection
  resetAllDbModuleState();

  const sqliteFile = SQLITE_FILE;
  if (!sqliteFile) {
    throw new Error("SQLITE_FILE is unavailable in local backup restore");
  }

  // Remove main file and WAL sidecars to avoid stale frame replay after restore.
  const sqliteFilesToReplace = [
    sqliteFile,
    `${sqliteFile}-wal`,
    `${sqliteFile}-shm`,
    `${sqliteFile}-journal`,
  ];
  for (const filePath of sqliteFilesToReplace) {
    if (!filePath) continue;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
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
