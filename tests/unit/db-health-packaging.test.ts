import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import Database from "better-sqlite3";
import { runDbHealthInChild } from "../../src/lib/db/healthCheckRunner.ts";

test("standalone build ships an executable health worker without tsx", async () => {
  const root = process.cwd();
  const dir = fs.mkdtempSync(path.join(root, ".health-package-"));
  const file = path.join(dir, "fixture.sqlite");
  const raw = new Database(file);
  raw.exec(
    "CREATE TABLE provider_connections (id TEXT PRIMARY KEY); CREATE TABLE quota_snapshots (id INTEGER PRIMARY KEY, provider TEXT, connection_id TEXT, created_at TEXT)"
  );
  raw
    .prepare("INSERT INTO quota_snapshots VALUES (?, ?, ?, ?)")
    .run(1, "test", "absent", "2026-01-01");
  raw.close();
  try {
    execFileSync(process.execPath, ["scripts/build/colocate-standalone.mjs"], {
      cwd: root,
      env: { ...process.env, OMNIROUTE_STANDALONE_DIR: dir },
      stdio: "pipe",
    });
    const workerFile = path.join(dir, "src/lib/db/healthCheckWorker.js");
    assert.ok(fs.existsSync(workerFile));
    assert.equal(
      JSON.parse(fs.readFileSync(path.join(path.dirname(workerFile), "package.json"), "utf8")).type,
      "module"
    );
    const result = await runDbHealthInChild(
      {
        filePath: file,
        autoRepair: false,
        skipIntegrityCheck: false,
        backupDir: path.join(dir, "backup"),
        pagerCorruption: null,
      },
      { workerFile, execArgv: [] }
    );
    assert.equal(result.issues.find((issue) => issue.table === "quota_snapshots")?.count, 1);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
