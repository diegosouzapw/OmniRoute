import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "omni-backup-management-16035-"));
process.env.DATA_DIR = root;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(root, "plugins");
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const { createPreMigrationBackup } =
  await import("../../src/lib/db/migrationRunner/preMigrationBackup.ts");
const { listDbBackups, restoreDbBackup, cleanupDbBackups } =
  await import("../../src/lib/db/backup.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(root, { recursive: true, force: true });
});

test("portable snapshots remain listed, restorable and subject to selective retention", async (t) => {
  const db = core.getDbInstance();
  db.exec("CREATE TABLE preserved_16035(id INTEGER); INSERT INTO preserved_16035 VALUES (42)");
  t.mock.method(fs, "linkSync", () => {
    throw Object.assign(new Error("Termux hard-link denial"), { code: "EACCES" });
  });
  const receipt = createPreMigrationBackup(db);
  assert.ok(receipt);
  const id = `db_state-${receipt.sha256}_pre-migration.sqlite`;
  const listed = await listDbBackups();
  assert.equal(listed.find((entry) => entry.id === id)?.size, fs.statSync(receipt.path).size);
  assert.equal(listed.find((entry) => entry.id === id)?.reason, "pre-migration");

  db.exec("DELETE FROM preserved_16035");
  await restoreDbBackup(id);
  assert.deepEqual(core.getDbInstance().prepare("SELECT * FROM preserved_16035").all(), [
    { id: 42 },
  ]);

  const newer = path.join(core.DB_BACKUPS_DIR, "db_2099-01-01_manual.sqlite");
  await core.getDbInstance().backup(newer);
  fs.utimesSync(receipt.path, 1, 1);
  const unrelated = path.join(core.DB_BACKUPS_DIR, "unrelated");
  fs.mkdirSync(unrelated);
  fs.writeFileSync(path.join(unrelated, "keep"), "untouched");
  const pruned = cleanupDbBackups({ maxFiles: 1, retentionDays: 0 });
  assert.equal(fs.existsSync(receipt.path), false);
  assert.equal(fs.existsSync(path.dirname(receipt.path)), false);
  assert.equal(pruned.keptBackupFamilies, 1);
  assert.equal(fs.readFileSync(path.join(unrelated, "keep"), "utf8"), "untouched");
});

for (const id of [
  "../db_escape.sqlite",
  "db_../escape.sqlite",
  "db_..\\escape.sqlite",
  "db_bad\0.sqlite",
]) {
  test(`restore rejects unsafe backup ID ${JSON.stringify(id)}`, async () => {
    await assert.rejects(() => restoreDbBackup(id), /Invalid backup ID/);
  });
}

test("listing and restore reject portable directory or inner-file symlinks", async () => {
  const { resolveBackupFile } = await import("../../src/lib/db/backupPaths.ts");
  const target = path.join(root, "foreign.sqlite");
  fs.writeFileSync(target, "foreign-content");
  const id = `db_state-${"a".repeat(64)}_pre-migration.sqlite`;
  const directory = path.join(core.DB_BACKUPS_DIR, `${id}.snapshot`);
  fs.mkdirSync(directory);
  fs.symlinkSync(target, path.join(directory, "snapshot.sqlite"));
  assert.throws(() => resolveBackupFile(core.DB_BACKUPS_DIR, id), /regular SQLite file/);
  await assert.rejects(() => restoreDbBackup(id), /regular SQLite file/);
  assert.equal(
    (await listDbBackups()).some((entry) => entry.id === id),
    false
  );
  cleanupDbBackups({ maxFiles: 1, retentionDays: 1 });
  assert.equal(fs.readFileSync(target, "utf8"), "foreign-content");
  assert.ok(fs.lstatSync(path.join(directory, "snapshot.sqlite")).isSymbolicLink());

  fs.unlinkSync(path.join(directory, "snapshot.sqlite"));
  fs.rmdirSync(directory);
  fs.symlinkSync(root, directory, "dir");
  assert.throws(() => resolveBackupFile(core.DB_BACKUPS_DIR, id), /directory/);
  cleanupDbBackups({ maxFiles: 1, retentionDays: 1 });
  assert.ok(fs.lstatSync(directory).isSymbolicLink());
});
