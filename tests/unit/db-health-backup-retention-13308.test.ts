import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-health-backup-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("health-check repair backups apply the shared retention policy (#13308)", () => {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO quota_snapshots
      (provider, connection_id, window_key, remaining_percentage, is_exhausted, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run("openai", "missing-connection", "monthly", 75, 0, new Date().toISOString());

  fs.mkdirSync(core.DB_BACKUPS_DIR, { recursive: true });
  for (const name of [
    "db_2026-01-01T00-00-00-000Z_health-check-repair.sqlite",
    "db_2026-01-02T00-00-00-000Z_health-check-repair.sqlite",
  ]) {
    fs.writeFileSync(path.join(core.DB_BACKUPS_DIR, name), name);
  }

  const argv = [...process.argv];
  const execArgv = [...process.execArgv];
  const nodeEnv = process.env.NODE_ENV;
  const vitest = process.env.VITEST;
  process.argv.splice(0, process.argv.length, "node", "omniroute.js");
  process.execArgv.splice(0);
  delete process.env.NODE_ENV;
  delete process.env.VITEST;
  process.env.DB_BACKUP_MAX_FILES = "1";

  try {
    const result = core.runManagedDbHealthCheck({ autoRepair: true });
    assert.equal(result.backupCreated, true);
  } finally {
    process.argv.splice(0, process.argv.length, ...argv);
    process.execArgv.splice(0, process.execArgv.length, ...execArgv);
    if (nodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = nodeEnv;
    if (vitest === undefined) delete process.env.VITEST;
    else process.env.VITEST = vitest;
    delete process.env.DB_BACKUP_MAX_FILES;
  }

  const backups = fs.readdirSync(core.DB_BACKUPS_DIR);
  assert.equal(backups.length, 1);
  assert.match(backups[0]!, /health-check-repair\.sqlite$/);
});
