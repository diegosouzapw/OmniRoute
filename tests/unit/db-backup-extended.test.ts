import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-backup-"));
const isWindows = process.platform === "win32";
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.INITIAL_PASSWORD = "";
delete process.env.JWT_SECRET;

const core = await import("../../src/lib/db/core.ts");
const backupDb = await import("../../src/lib/db/backup.ts");
const dbBackupsRoute = await import("../../src/app/api/db-backups/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  await new Promise((resolve) => setTimeout(resolve, 50));
  if (fs.existsSync(TEST_DATA_DIR)) {
    for (const entry of fs.readdirSync(TEST_DATA_DIR, { recursive: true }).sort().reverse()) {
      const targetPath = path.join(TEST_DATA_DIR, entry);
      const stat = fs.lstatSync(targetPath);
      if (stat.isDirectory()) {
        fs.rmSync(targetPath, { recursive: true, force: true });
      } else {
        await backupDb.unlinkFileWithRetry(targetPath, { maxAttempts: 20, baseDelayMs: 25 });
      }
    }
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function seedConnections(count = 8) {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  const insert = db.prepare(
    "INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );

  for (let index = 0; index < count; index++) {
    insert.run(`backup-conn-${index}`, "openai", "apikey", `backup-${index}`, 1, now, now);
  }
}

// backupDbFile() kicks off db.backup() fire-and-forget — better-sqlite3 creates
// the destination file when the page copy STARTS, not when it finishes. Waiting
// on file existence alone races the copy: under load listDbBackups() can open a
// partially-written backup and read connectionCount as 0 (flake repro: under CPU
// contention the backup file existed but the seeded rows were not yet copied →
// connectionCount 0 ≠ 12). Wait for the real completion condition instead — the
// backup actually contains the seeded connections. The 30s ceiling only bounds
// the failure case; the green path returns as soon as the data lands (sub-second
// in practice — the wide ceiling absorbs heavy CI page-copy contention).
async function waitForBackupEntry(filename, expectedConnectionCount, timeoutMs = 30000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const entry = (await backupDb.listDbBackups()).find((backup) => backup.id === filename);
    if (entry && entry.connectionCount === expectedConnectionCount) return entry;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error(
    `Timed out waiting for backup ${filename} to finish copying ${expectedConnectionCount} connections`
  );
}

function makeDbBackupsJsonRequest(method: string, body: unknown): NextRequest {
  return new Request("http://localhost/api/db-backups", {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-omniroute-peer-locality": "loopback",
    },
    body: JSON.stringify(body),
  }) as unknown as NextRequest;
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }
  if (ORIGINAL_JWT_SECRET === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
  }
});

test("backupDbFile creates manual backups and listDbBackups returns metadata", async () => {
  seedConnections(12);

  const result = backupDb.backupDbFile("manual");
  assert.ok(result);

  const backupPath = path.join(core.DB_BACKUPS_DIR, result.filename);
  // Wait for the async backup to finish copying the 12 seeded connections, not
  // merely for the destination file to appear (see waitForBackupEntry).
  const entry = await waitForBackupEntry(result.filename, 12);

  assert.equal(entry.reason, "manual");
  assert.equal(entry.connectionCount, 12);
  assert.equal(fs.existsSync(backupPath), true);
});

test("listDbBackups returns an empty list when the backup directory is missing", async () => {
  fs.rmSync(core.DB_BACKUPS_DIR, { recursive: true, force: true });
  const backups = await backupDb.listDbBackups();
  assert.deepEqual(backups, []);
});

test(
  "restoreDbBackup rejects invalid identifiers and corrupt backup files",
  { skip: isWindows },
  async () => {
    await assert.rejects(() => backupDb.restoreDbBackup("../escape.sqlite"), /Invalid backup ID/);

    const missingId = "db_2000-01-01T00-00-00-000Z_manual.sqlite";
    await assert.rejects(() => backupDb.restoreDbBackup(missingId), /Backup not found/);

    fs.mkdirSync(core.DB_BACKUPS_DIR, { recursive: true });
    const corruptId = "db_2001-01-01T00-00-00-000Z_manual.sqlite";
    fs.writeFileSync(path.join(core.DB_BACKUPS_DIR, corruptId), "not a sqlite database");

    await assert.rejects(() => backupDb.restoreDbBackup(corruptId), /Backup file is corrupt/);
    await backupDb.unlinkFileWithRetry(path.join(core.DB_BACKUPS_DIR, corruptId), {
      maxAttempts: 20,
      baseDelayMs: 25,
    });
  }
);

test("restoreDbBackup restores SQLite contents and returns entity counts", async () => {
  seedConnections(1);

  const backupId = "db_2002-01-01T00-00-00-000Z_manual.sqlite";
  fs.mkdirSync(core.DB_BACKUPS_DIR, { recursive: true });
  await core.getDbInstance().backup(path.join(core.DB_BACKUPS_DIR, backupId));

  core
    .getDbInstance()
    .prepare("DELETE FROM provider_connections WHERE id = ?")
    .run("backup-conn-0");

  const restored = await backupDb.restoreDbBackup(backupId);
  const row = core
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS cnt FROM provider_connections WHERE id = ?")
    .get("backup-conn-0") as { cnt: number };

  assert.equal(restored.restored, true);
  assert.equal(restored.backupId, backupId);
  assert.equal(restored.connectionCount, 1);
  assert.equal(restored.nodeCount, 0);
  assert.equal(restored.comboCount, 0);
  assert.equal(restored.apiKeyCount, 0);
  assert.equal(row.cnt, 1);
});

test("cleanupDbBackups removes overflow families and orphaned sidecars", async () => {
  fs.mkdirSync(core.DB_BACKUPS_DIR, { recursive: true });

  const makeFamily = (baseName, minutesAgo) => {
    const familyPath = path.join(core.DB_BACKUPS_DIR, baseName);
    fs.writeFileSync(familyPath, baseName);
    fs.writeFileSync(`${familyPath}-wal`, `${baseName}-wal`);
    fs.writeFileSync(`${familyPath}-shm`, `${baseName}-shm`);
    const time = new Date(Date.now() - minutesAgo * 60 * 1000);
    fs.utimesSync(familyPath, time, time);
    fs.utimesSync(`${familyPath}-wal`, time, time);
    fs.utimesSync(`${familyPath}-shm`, time, time);
  };

  makeFamily("db_2026-04-10T00-00-00-000Z_manual.sqlite", 60);
  makeFamily("db_2026-04-10T01-00-00-000Z_manual.sqlite", 40);
  makeFamily("db_2026-04-10T02-00-00-000Z_manual.sqlite", 20);

  fs.writeFileSync(
    path.join(core.DB_BACKUPS_DIR, "db_2026-04-09T00-00-00-000Z_manual.sqlite-wal"),
    "orphan-wal"
  );

  const result = backupDb.cleanupDbBackups({ maxFiles: 2, retentionDays: 0 });
  const remaining = fs.readdirSync(core.DB_BACKUPS_DIR).sort();

  assert.equal(result.deletedBackupFamilies, 2);
  assert.equal(
    remaining.includes("db_2026-04-10T00-00-00-000Z_manual.sqlite"),
    false,
    "oldest backup family should be removed"
  );
  assert.equal(
    remaining.some((name) => name.startsWith("db_2026-04-09T00-00-00-000Z_manual.sqlite")),
    false,
    "orphaned backup sidecars should be removed"
  );
  assert.equal(
    remaining.includes("db_2026-04-10T02-00-00-000Z_manual.sqlite"),
    true,
    "newest backup family should remain"
  );
});

test("cleanupDbBackups honors retentionDays for older backups", async () => {
  fs.mkdirSync(core.DB_BACKUPS_DIR, { recursive: true });

  const oldBackup = path.join(core.DB_BACKUPS_DIR, "db_2026-04-01T00-00-00-000Z_manual.sqlite");
  const freshBackup = path.join(core.DB_BACKUPS_DIR, "db_2026-04-15T00-00-00-000Z_manual.sqlite");
  fs.writeFileSync(oldBackup, "old");
  fs.writeFileSync(freshBackup, "fresh");

  const oldTime = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
  const freshTime = new Date();
  fs.utimesSync(oldBackup, oldTime, oldTime);
  fs.utimesSync(freshBackup, freshTime, freshTime);

  const result = backupDb.cleanupDbBackups({ maxFiles: 10, retentionDays: 5 });

  assert.equal(result.deletedBackupFamilies, 1);
  assert.equal(fs.existsSync(oldBackup), false);
  assert.equal(fs.existsSync(freshBackup), true);
});

// Regression for #3834: the "Keep latest backups" value did not persist — it always
// snapped back to 20 because getDbBackupMaxFiles() only read the env var (no setter,
// no stored value). It now round-trips through a dedicated key_value store.
test("getDbBackupMaxFiles defaults to 20 when nothing is stored (#3834)", () => {
  delete process.env.DB_BACKUP_MAX_FILES;
  core.getDbInstance(); // ensure the DB + key_value table exist
  assert.equal(backupDb.getDbBackupMaxFiles(), 20);
});

test("setDbBackupMaxFiles persists and getDbBackupMaxFiles reflects it (#3834)", () => {
  delete process.env.DB_BACKUP_MAX_FILES;
  core.getDbInstance();
  backupDb.setDbBackupMaxFiles(5);
  assert.equal(backupDb.getDbBackupMaxFiles(), 5);
  // A second value overwrites the first (operator changes the setting again).
  backupDb.setDbBackupMaxFiles(12);
  assert.equal(backupDb.getDbBackupMaxFiles(), 12);
});

test("DB_BACKUP_MAX_FILES env override wins over the persisted value (#3834)", () => {
  core.getDbInstance();
  backupDb.setDbBackupMaxFiles(5);
  process.env.DB_BACKUP_MAX_FILES = "7";
  try {
    assert.equal(backupDb.getDbBackupMaxFiles(), 7);
  } finally {
    delete process.env.DB_BACKUP_MAX_FILES;
  }
});

test("getDbBackupRetentionDays defaults to 0 when nothing is stored", () => {
  delete process.env.DB_BACKUP_RETENTION_DAYS;
  core.getDbInstance();
  assert.equal(backupDb.getDbBackupRetentionDays(), 0);
});

test("setDbBackupRetentionDays persists zero and positive values", () => {
  delete process.env.DB_BACKUP_RETENTION_DAYS;
  core.getDbInstance();
  backupDb.setDbBackupRetentionDays(0);
  assert.equal(backupDb.getDbBackupRetentionDays(), 0);

  backupDb.setDbBackupRetentionDays(14);
  assert.equal(backupDb.getDbBackupRetentionDays(), 14);
});

test("stored backup retention values must be JSON integers", () => {
  delete process.env.DB_BACKUP_RETENTION_DAYS;
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run("dbBackup", "retentionDays", JSON.stringify([14, 2]));

  assert.equal(backupDb.getDbBackupRetentionDays(), 0);
});

test("DB_BACKUP_RETENTION_DAYS env override wins over the persisted value", () => {
  core.getDbInstance();
  backupDb.setDbBackupRetentionDays(14);
  process.env.DB_BACKUP_RETENTION_DAYS = "3";
  try {
    assert.equal(backupDb.getDbBackupRetentionDays(), 3);
  } finally {
    delete process.env.DB_BACKUP_RETENTION_DAYS;
  }
});

test("PATCH /api/db-backups persists retention controls without cleanup", async () => {
  delete process.env.DB_BACKUP_MAX_FILES;
  delete process.env.DB_BACKUP_RETENTION_DAYS;
  fs.mkdirSync(core.DB_BACKUPS_DIR, { recursive: true });

  const oldBackup = path.join(core.DB_BACKUPS_DIR, "db_2026-04-01T00-00-00-000Z_manual.sqlite");
  fs.writeFileSync(oldBackup, "old");
  const oldTime = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
  fs.utimesSync(oldBackup, oldTime, oldTime);

  const response = await dbBackupsRoute.PATCH(
    makeDbBackupsJsonRequest("PATCH", { keepLatest: 9, retentionDays: 5 })
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.saved, true);
  assert.equal(body.keepLatest, 9);
  assert.equal(body.retentionDays, 5);
  assert.equal(backupDb.getDbBackupMaxFiles(), 9);
  assert.equal(backupDb.getDbBackupRetentionDays(), 5);
  assert.equal(fs.existsSync(oldBackup), true);
});

test("DELETE /api/db-backups persists both retention controls", async () => {
  delete process.env.DB_BACKUP_MAX_FILES;
  delete process.env.DB_BACKUP_RETENTION_DAYS;

  const response = await dbBackupsRoute.DELETE(
    makeDbBackupsJsonRequest("DELETE", { keepLatest: 11, retentionDays: 17 })
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.keepLatest, 11);
  assert.equal(body.retentionDays, 17);
  assert.equal(backupDb.getDbBackupMaxFiles(), 11);
  assert.equal(backupDb.getDbBackupRetentionDays(), 17);
});
