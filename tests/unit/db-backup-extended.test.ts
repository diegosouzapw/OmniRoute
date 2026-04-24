import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-backup-"));
const isWindows = process.platform === "win32";
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const backupDb = await import("../../src/lib/db/backup.ts");

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

async function waitForFile(filePath) {
  for (let attempt = 0; attempt < 20; attempt++) {
    if (fs.existsSync(filePath)) return;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error(`Timed out waiting for file: ${filePath}`);
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("backupDbFile creates manual backups and listDbBackups returns metadata", async () => {
  seedConnections(12);

  const result = backupDb.backupDbFile("manual");
  assert.ok(result);

  const backupPath = path.join(core.DB_BACKUPS_DIR, result.filename);
  await waitForFile(backupPath);

  const backups = await backupDb.listDbBackups();

  assert.equal(backups.length >= 1, true);
  assert.equal(backups[0].reason, "manual");
  assert.equal(backups[0].connectionCount, 12);
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
    .get("backup-conn-0");

  assert.equal(restored.restored, true);
  assert.equal(restored.backupId, backupId);
  assert.equal(restored.connectionCount, 1);
  assert.equal(restored.nodeCount, 0);
  assert.equal(restored.comboCount, 0);
  assert.equal(restored.apiKeyCount, 0);
  assert.equal((row as any).cnt, 1);
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
