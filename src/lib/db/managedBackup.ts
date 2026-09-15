import fs from "node:fs";
import path from "node:path";
import type { SqliteAdapter } from "./adapters/types";
import {
  MAX_DB_BACKUPS,
  DEFAULT_DB_BACKUP_RETENTION_DAYS,
  parsePositiveInt,
  parseNonNegativeInt,
  pruneBackupDirectory,
} from "./backupRetention";

interface SqlJsSnapshotDatabase {
  constructor: unknown;
  exec(sql: string): Array<{ values: unknown[][] }>;
  run(sql: string, params: string[]): void;
  export(): Uint8Array;
  close(): void;
}

type SqlJsSnapshotConstructor = new (data: Uint8Array) => SqlJsSnapshotDatabase;

function exportSqlJsSnapshot(owner: SqlJsSnapshotDatabase): Uint8Array {
  // Export closes its connection. Copy main into an exclusively allocated
  // WASM file and export only that disposable connection, never the owner.
  const Database = owner.constructor as SqlJsSnapshotConstructor;
  // Supplying bytes makes sql.js create the file exclusively before open.
  // Omitting them could alias an existing random filename and unlink it.
  const snapshot = new Database(new Uint8Array());
  let image: Uint8Array;
  try {
    const filename = snapshot
      .exec("PRAGMA database_list")[0]
      ?.values.find((row) => row[1] === "main")?.[2];
    if (typeof filename !== "string" || !filename) {
      throw new Error("Missing sql.js snapshot filename");
    }
    owner.run("VACUUM main INTO ?", [filename]);
    image = snapshot.export();
  } finally {
    snapshot.close();
  }
  return image;
}

export function createManagedDbBackup(
  db: SqliteAdapter,
  reason: string,
  backupDir: string
): boolean {
  try {
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = path.join(backupDir, `db_${timestamp}_${reason}.sqlite`);
    const escapedBackupPath = backupPath.replace(/'/g, "''");

    if (db.driver === "sql.js") {
      const image = exportSqlJsSnapshot(db.raw as SqlJsSnapshotDatabase);
      const fd = fs.openSync(backupPath, "wx", 0o600);
      try {
        fs.writeFileSync(fd, image);
        fs.fsyncSync(fd);
      } catch (error) {
        try {
          fs.unlinkSync(backupPath);
        } catch {
          // Preserve the original write failure.
        }
        throw error;
      } finally {
        fs.closeSync(fd);
      }
    } else {
      db.exec(`VACUUM INTO '${escapedBackupPath}'`);
    }
    console.log(`[DB] Backup created (${reason}): ${backupPath}`);

    // Prune old backups to prevent the directory from growing without bound.
    // This mirrors the post-backup pruning in backup.ts but avoids a circular
    // dependency by importing directly from backupRetention.ts.
    try {
      const maxFiles = process.env.DB_BACKUP_MAX_FILES
        ? parsePositiveInt(process.env.DB_BACKUP_MAX_FILES, MAX_DB_BACKUPS)
        : MAX_DB_BACKUPS;
      const retentionDays = process.env.DB_BACKUP_RETENTION_DAYS
        ? parseNonNegativeInt(
            process.env.DB_BACKUP_RETENTION_DAYS,
            DEFAULT_DB_BACKUP_RETENTION_DAYS
          )
        : DEFAULT_DB_BACKUP_RETENTION_DAYS;
      pruneBackupDirectory({ backupDir, maxFiles, retentionDays });
    } catch {
      // Retention is best-effort; never let a pruning failure obscure the backup result.
    }

    return true;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[DB] Failed to create ${reason} backup:`, message);
    return false;
  }
}
