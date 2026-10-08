import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";
import { createBetterSqliteAdapter } from "../../src/lib/db/adapters/betterSqliteAdapter.ts";
import {
  createDbHealthCoordinator,
  runDbHealthInChild,
} from "../../src/lib/db/healthCheckRunner.ts";
import type { DbHealthCheckResult } from "../../src/lib/db/healthCheck.ts";

const result = (autoRepair = false): DbHealthCheckResult => ({
  isHealthy: true,
  issues: [],
  repairedCount: 0,
  backupCreated: false,
  autoRepair,
  checkedAt: new Date().toISOString(),
  driver: { name: "better-sqlite3", degraded: false },
});

test("diagnosis is coalesced and cached; repair cannot join it", async () => {
  let calls = 0;
  let finish!: (value: DbHealthCheckResult) => void;
  const coordinator = createDbHealthCoordinator(() => {
    calls++;
    return new Promise<DbHealthCheckResult>((resolve) => {
      finish = resolve;
    });
  });
  const first = coordinator.run(false);
  const second = coordinator.run(false);
  assert.equal(first, second);
  await assert.rejects(coordinator.run(true), /in progress/);
  finish(result());
  const original = await first;
  assert.equal(await coordinator.run(false), original);
  assert.equal(calls, 1);
  const repair = coordinator.run(true);
  assert.equal(calls, 2);
  await assert.rejects(coordinator.run(false), /in progress/);
  finish(result(true));
  await repair;
  const fresh = coordinator.run(false);
  assert.equal(calls, 3, "repair invalidates diagnosis cache");
  finish(result());
  await fresh;
});

test("failures are not cached and coordinator retries", async () => {
  let calls = 0;
  const coordinator = createDbHealthCoordinator(async () => {
    if (++calls === 1) throw new Error("failed");
    return result();
  });
  await assert.rejects(coordinator.run(false), /failed/);
  assert.equal((await coordinator.run(false)).isHealthy, true);
  assert.equal(calls, 2);
});

test("cache expires without changing checkedAt", async () => {
  let now = 0;
  let calls = 0;
  const coordinator = createDbHealthCoordinator(
    async () => {
      calls++;
      return result();
    },
    { now: () => now, cacheMs: 60 }
  );
  const first = await coordinator.run(false);
  now = 59;
  assert.equal(await coordinator.run(false), first);
  now = 60;
  await coordinator.run(false);
  assert.equal(calls, 2);
});

test("real native child diagnoses and repairs with a real backup", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "db-health-child-"));
  const file = path.join(dir, "storage.sqlite");
  const raw = new Database(file);
  const db = createBetterSqliteAdapter(raw);
  raw.pragma("journal_mode = WAL");
  raw.exec(
    "CREATE TABLE provider_connections (id TEXT PRIMARY KEY); CREATE TABLE quota_snapshots (id INTEGER PRIMARY KEY, provider TEXT, connection_id TEXT, created_at TEXT)"
  );
  raw
    .prepare("INSERT INTO quota_snapshots VALUES (?, ?, ?, ?)")
    .run(1, "test", "missing", "2026-01-01");
  try {
    const job = {
      filePath: file,
      autoRepair: false,
      skipIntegrityCheck: false,
      backupDir: path.join(dir, "backups"),
      pagerCorruption: null,
    };
    const diagnosis = await runDbHealthInChild(job);
    assert.equal(diagnosis.issues.find((i) => i.table === "quota_snapshots")?.count, 1);
    assert.equal(raw.prepare("SELECT count(*) n FROM quota_snapshots").get().n, 1);
    const repaired = await runDbHealthInChild({ ...job, autoRepair: true });
    assert.equal(repaired.repairedCount, 1);
    assert.equal(repaired.backupCreated, true);
    const backups = fs.readdirSync(job.backupDir).filter((name) => name.endsWith(".sqlite"));
    assert.equal(backups.length, 1);
    const backup = new Database(path.join(job.backupDir, backups[0]), { readonly: true });
    assert.equal(backup.prepare("SELECT count(*) n FROM quota_snapshots").get().n, 1);
    backup.close();
    assert.equal(raw.prepare("SELECT count(*) n FROM quota_snapshots").get().n, 0);
  } finally {
    db.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("missing worker and timeout fail rather than running synchronously", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "db-health-failure-"));
  const hang = path.join(dir, "hang.mjs");
  fs.writeFileSync(hang, "setInterval(() => {}, 1000);\n");
  const job = {
    filePath: path.join(dir, "absent.sqlite"),
    autoRepair: false,
    skipIntegrityCheck: false,
    backupDir: dir,
    pagerCorruption: null,
  };
  try {
    await assert.rejects(
      runDbHealthInChild(job, { workerFile: path.join(dir, "missing.mjs"), execArgv: [] }),
      /worker/
    );
    await assert.rejects(
      runDbHealthInChild(job, { workerFile: hang, execArgv: [], timeoutMs: 100 }),
      /timed out/
    );
    assert.equal(fs.existsSync(job.filePath), false);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("child repair rolls back earlier deletions if a later mutation fails", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "db-health-rollback-"));
  const file = path.join(dir, "storage.sqlite");
  const raw = new Database(file);
  raw.exec(
    "CREATE TABLE provider_connections (id TEXT PRIMARY KEY); CREATE TABLE quota_snapshots (id INTEGER PRIMARY KEY, connection_id TEXT, created_at TEXT); INSERT INTO quota_snapshots VALUES (1, 'absent', '2026-01-01'), (2, 'absent', '2026-01-01'); CREATE TRIGGER stop_delete BEFORE DELETE ON quota_snapshots WHEN OLD.id = 2 BEGIN SELECT RAISE(ABORT, 'injected write failure'); END"
  );
  try {
    await assert.rejects(
      runDbHealthInChild({
        filePath: file,
        autoRepair: true,
        skipIntegrityCheck: false,
        backupDir: path.join(dir, "backup"),
        pagerCorruption: null,
      }),
      /worker/
    );
    assert.equal(
      (raw.prepare("SELECT count(*) n FROM quota_snapshots").get() as { n: number }).n,
      2
    );
  } finally {
    raw.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
