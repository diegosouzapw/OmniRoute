import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

function createTempDataDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-backup-"));
}

async function withBackupEnv(fn: (dataDir: string) => Promise<void>) {
  const dataDir = createTempDataDir();
  process.env.DATA_DIR = dataDir;

  const originalLog = console.log;
  console.log = () => {};

  try {
    await fn(dataDir);
  } finally {
    console.log = originalLog;
    fs.rmSync(dataDir, { recursive: true, force: true });
    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
}

test("backup returns 0 with no files (empty data dir)", async () => {
  await withBackupEnv(async () => {
    const { runBackupCommand } = await import("../../bin/cli/commands/backup.mjs");
    const result = await runBackupCommand({});
    assert.equal(result, 0);
  });
});

test("backup creates backup-info.json when storage.sqlite exists", async () => {
  await withBackupEnv(async (dataDir) => {
    const dbPath = path.join(dataDir, "storage.sqlite");
    const Database = (await import("better-sqlite3")).default;
    new Database(dbPath).close();

    const { runBackupCommand } = await import("../../bin/cli/commands/backup.mjs");
    const result = await runBackupCommand({});
    assert.equal(result, 0);

    const backupDir = path.join(dataDir, "backups");
    assert.ok(fs.existsSync(backupDir));
    const entries = fs.readdirSync(backupDir).filter((d) => d.startsWith("omniroute-backup-"));
    assert.ok(entries.length > 0);
    const infoPath = path.join(backupDir, entries[0], "backup-info.json");
    assert.ok(fs.existsSync(infoPath));
    const info = JSON.parse(fs.readFileSync(infoPath, "utf8"));
    assert.ok(info.timestamp);
    assert.ok(Array.isArray(info.files));
  });
});

test("restore --list returns 0 with no backups", async () => {
  await withBackupEnv(async () => {
    const { runRestoreCommand } = await import("../../bin/cli/commands/backup.mjs");
    const result = await runRestoreCommand(undefined, { list: true });
    assert.equal(result, 0);
  });
});

test("restore returns 1 when backup id not found", async () => {
  await withBackupEnv(async () => {
    const { runRestoreCommand } = await import("../../bin/cli/commands/backup.mjs");
    const originalError = console.error;
    console.error = () => {};
    const result = await runRestoreCommand("nonexistent-id", { yes: true });
    console.error = originalError;
    assert.equal(result, 1);
  });
});
