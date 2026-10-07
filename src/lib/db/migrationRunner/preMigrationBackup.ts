import { createHash } from "crypto";
import fs from "fs";
import path from "path";

import type { SqliteAdapter } from "../adapters/types";
import { tryOpenSync } from "../adapters/driverFactory";
import { migrationConsole as console } from "./logger";

export type PreMigrationBackupReceipt = {
  path: string;
  sha256: string;
};

function fsyncDirectoryEntry(directory: string): void {
  let fd: number | null = null;
  try {
    fd = fs.openSync(directory, "r");
    fs.fsyncSync(fd);
  } catch (error: unknown) {
    const code = (error as NodeJS.ErrnoException | null)?.code;
    const windowsDirectoryHandleUnsupported =
      process.platform === "win32" &&
      (code === "EACCES" || code === "EPERM" || code === "EISDIR" || code === "EINVAL");
    if (!windowsDirectoryHandleUnsupported) throw error;
  } finally {
    if (fd !== null) fs.closeSync(fd);
  }
}

export function hashFileSync(filePath: string): string {
  const hash = createHash("sha256");
  const fd = fs.openSync(filePath, "r");
  const buffer = Buffer.allocUnsafe(1024 * 1024);
  let position = 0;

  try {
    while (true) {
      const bytesRead = fs.readSync(fd, buffer, 0, buffer.length, position);
      if (bytesRead === 0) break;
      hash.update(buffer.subarray(0, bytesRead));
      position += bytesRead;
    }
  } finally {
    fs.closeSync(fd);
  }

  return hash.digest("hex");
}

function getReusablePreMigrationBackup(
  candidatePath: string,
  expectedSha256: string
): PreMigrationBackupReceipt | null {
  if (!fs.existsSync(candidatePath)) return null;

  const before = fs.lstatSync(candidatePath);
  if (!before.isFile() || hashFileSync(candidatePath) !== expectedSha256) {
    throw new Error(
      `[Migration] Content-addressed snapshot path exists with unexpected content: ${candidatePath}`
    );
  }
  const after = fs.lstatSync(candidatePath);
  if (
    before.dev !== after.dev ||
    before.ino !== after.ino ||
    before.size !== after.size ||
    before.mtimeMs !== after.mtimeMs
  ) {
    throw new Error(
      `[Migration] Content-addressed snapshot changed while it was being validated: ${candidatePath}`
    );
  }

  return { path: candidatePath, sha256: expectedSha256 };
}

function publishSnapshotWithoutOverwrite(tempPath: string, destination: string): void {
  // link() publishes a complete same-filesystem image atomically and, unlike rename(),
  // fails with EEXIST instead of overwriting a path created by another process. There is
  // deliberately no copy/rename fallback: filesystems without this primitive fail closed
  // instead of exposing a partial canonical `.sqlite` file after a crash.
  fs.linkSync(tempPath, destination);
  const publishedFd = fs.openSync(destination, "r+");
  try {
    // Flush through the published name as well as the already-fsynced temp handle.
    // On Windows this maps to FlushFileBuffers and is the strongest file-level
    // durability proof available when directory handles are unsupported by Node.
    fs.fsyncSync(publishedFd);
  } finally {
    fs.closeSync(publishedFd);
  }
  fsyncDirectoryEntry(path.dirname(destination));
}

function fsyncReusableSnapshot(snapshotPath: string): void {
  const fd = fs.openSync(snapshotPath, "r+");
  try {
    fs.fsyncSync(fd);
  } finally {
    fs.closeSync(fd);
  }
}

type SqlJsSnapshotClone = {
  run(sql: string): void;
  export(): Uint8Array;
  close(): void;
};

const SQLITE_HEADER_MIN_BYTES = 100;
const SQLITE_HEADER_MAGIC = "SQLite format 3\0";
const SQLITE_CHANGE_COUNTER_OFFSET = 24;
const SQLITE_VERSION_VALID_FOR_OFFSET = 92;
const SQLITE_STANDALONE_CHANGE_COUNTER = 1;

function exportCanonicalSqlJsSnapshot(raw: { export: () => Uint8Array }): Buffer {
  const RawDatabase = (
    raw as unknown as { constructor: new (data: Uint8Array) => SqlJsSnapshotClone }
  ).constructor;
  let clone: SqlJsSnapshotClone | null = null;

  try {
    // A rolled-back sql.js SAVEPOINT can leave SQLite's physical change counter advanced
    // even though every logical row/schema change was undone. Canonicalize only a detached
    // clone: VACUUM removes rollback-only page artifacts without touching the live database.
    clone = new RawDatabase(raw.export());
    clone.run("VACUUM");
    const canonical = Buffer.from(clone.export());

    if (
      canonical.length < SQLITE_HEADER_MIN_BYTES ||
      canonical.subarray(0, SQLITE_HEADER_MAGIC.length).toString("binary") !== SQLITE_HEADER_MAGIC
    ) {
      throw new Error("sql.js export did not produce a valid SQLite file header");
    }

    // SQLite file-header offsets 24 and 92 are the change counter and
    // version-valid-for number. VACUUM keeps the two equal, but seeds them from the
    // source image, so an otherwise identical rolled-back retry still gets a different
    // byte hash. A standalone snapshot has no open readers to invalidate; assigning the
    // same stable value to both fields preserves a valid/restorable header while making
    // the complete canonical image deterministic.
    canonical.writeUInt32BE(SQLITE_STANDALONE_CHANGE_COUNTER, SQLITE_CHANGE_COUNTER_OFFSET);
    canonical.writeUInt32BE(SQLITE_STANDALONE_CHANGE_COUNTER, SQLITE_VERSION_VALID_FOR_OFFSET);
    return canonical;
  } finally {
    clone?.close();
  }
}

function writeSqlJsSnapshot(raw: { export: () => Uint8Array }, tempPath: string): void {
  let fd: number | null = null;

  try {
    fd = fs.openSync(tempPath, "wx");
    fs.writeFileSync(fd, exportCanonicalSqlJsSnapshot(raw));
    fs.fsyncSync(fd);
    fs.closeSync(fd);
    fd = null;
  } catch (error: unknown) {
    if (fd !== null) {
      try {
        fs.closeSync(fd);
      } catch {
        // The original snapshot error remains authoritative.
      }
    }
    throw error;
  }
}

function cleanupOwnedSnapshotTemp(tempDir: string | null, tempPath: string | null): void {
  if (!tempDir || !fs.existsSync(tempDir)) return;

  try {
    // `tempDir` comes only from mkdtempSync below. Removing that exact owned directory
    // lets Node retry Windows/AV EBUSY and EPERM failures without touching canonical backups.
    fs.rmSync(tempDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 25 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(
      `[Migration] Failed to remove owned snapshot temp directory` +
        `${tempPath ? ` (${tempPath})` : ""}: ${message}`
    );
  }
}

/**
 * Create a synchronous pre-migration snapshot.
 *
 * Native SQLite drivers use VACUUM INTO. sql.js has an in-memory VFS, so a host
 * path passed to VACUUM INTO is not writable; export its current database image
 * directly instead. The SHA-256 content address lives in the first portion of the
 * canonical `db_<snapshot-id>_<reason>.sqlite` shape, preserving reason parsing while
 * making unchanged retries an O(1) lookup even with tens of thousands of old backups.
 * Work happens inside an exclusively-created
 * temp directory, so failure cleanup has exact ownership. Publication uses an atomic,
 * no-overwrite hard link. If the filesystem cannot provide that primitive, the caller
 * fails closed instead of exposing a partial canonical `.sqlite` file. A content hash
 * reuses an identical prior snapshot, so repeated zero-progress startups retain one
 * restore point for that database state without ever deleting a published backup.
 */
export function createPreMigrationBackup(db: SqliteAdapter): PreMigrationBackupReceipt | null {
  let backupPath: string | null = null;
  let tempPath: string | null = null;
  let tempDir: string | null = null;

  try {
    const sqliteFile = db.name;
    if (!sqliteFile || sqliteFile === ":memory:") return null;

    const backupDir = path.join(path.dirname(sqliteFile), "db_backups");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
      fsyncDirectoryEntry(path.dirname(backupDir));
    }

    tempDir = fs.mkdtempSync(path.join(backupDir, ".migration-snapshot-"));
    tempPath = path.join(tempDir, "snapshot.sqlite");

    if (db.driver === "sql.js") {
      const raw = db.raw as { export?: () => Uint8Array } | null;
      if (!raw || typeof raw.export !== "function") {
        throw new Error("sql.js adapter does not expose database export()");
      }
      writeSqlJsSnapshot(raw as { export: () => Uint8Array }, tempPath);
    } else {
      const escapedTempPath = tempPath.replace(/'/g, "''");
      const snapshotDb = tryOpenSync(sqliteFile, { readonly: true, fileMustExist: true });
      if (!snapshotDb) {
        throw new Error("no synchronous read-only SQLite driver is available for snapshotting");
      }
      try {
        snapshotDb.exec(`VACUUM INTO '${escapedTempPath}'`);
      } finally {
        snapshotDb.close();
      }
      const fd = fs.openSync(tempPath, "r+");
      try {
        fs.fsyncSync(fd);
      } finally {
        fs.closeSync(fd);
      }
    }

    const sha256 = hashFileSync(tempPath);
    backupPath = path.join(backupDir, `db_state-${sha256}_pre-migration.sqlite`);
    const reusable = getReusablePreMigrationBackup(backupPath, sha256);
    if (reusable) {
      fsyncReusableSnapshot(reusable.path);
      fsyncDirectoryEntry(backupDir);
      cleanupOwnedSnapshotTemp(tempDir, tempPath);
      tempDir = null;
      tempPath = null;
      console.log(`[Migration] Reusing identical pre-migration backup: ${reusable.path}`);
      return reusable;
    }

    try {
      publishSnapshotWithoutOverwrite(tempPath, backupPath);
    } catch (error: unknown) {
      if ((error as NodeJS.ErrnoException | null)?.code !== "EEXIST") throw error;
      const racedReusable = getReusablePreMigrationBackup(backupPath, sha256);
      if (!racedReusable) throw error;
      fsyncReusableSnapshot(racedReusable.path);
      fsyncDirectoryEntry(backupDir);
      cleanupOwnedSnapshotTemp(tempDir, tempPath);
      tempDir = null;
      tempPath = null;
      console.log(`[Migration] Reusing concurrently published backup: ${racedReusable.path}`);
      return racedReusable;
    }
    cleanupOwnedSnapshotTemp(tempDir, tempPath);
    tempDir = null;
    tempPath = null;
    console.log(`[Migration] Pre-migration backup created: ${backupPath}`);

    return { path: backupPath, sha256 };
  } catch (error: unknown) {
    // Never unlink a canonical backup here: publication may have failed because another
    // actor created it first. The exclusive temp directory is the only cleanup authority.
    cleanupOwnedSnapshotTemp(tempDir, tempPath);
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[Migration] Failed to create pre-migration backup: ${message}`);
    throw new Error(
      `[Migration] Refusing to migrate an existing database without a durable snapshot. ` +
        `Snapshot creation failed: ${message}. The DATA_DIR filesystem must support atomic ` +
        `no-overwrite hard links, durable file synchronization, and directory synchronization ` +
        `where the platform exposes it.`,
      { cause: error instanceof Error ? error : undefined }
    );
  }
}
