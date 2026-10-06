import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

useDecollidedMigrationsDir();
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-call-log-files-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_RETENTION_DAYS = process.env.CALL_LOG_RETENTION_DAYS;
const ORIGINAL_MAX_ENTRIES = process.env.CALL_LOG_MAX_ENTRIES;
const ORIGINAL_MAX_ROWS = process.env.CALL_LOGS_TABLE_MAX_ROWS;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.CALL_LOG_RETENTION_DAYS = "7";
process.env.CALL_LOG_MAX_ENTRIES = "2";

const core = await import("../../src/lib/db/core.ts");
const { rotateCallLogs, cleanupOverflowCallLogFiles, cleanupOrphanCallLogFiles } =
  await import("../../src/lib/usage/callLogs.ts");
const { CALL_LOGS_DIR, deleteCallArtifact } =
  await import("../../src/lib/usage/callLogArtifacts.ts");

async function resetTestDataDir() {
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  let lastError;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      core.resetDbInstance();
      for (const entry of fs.readdirSync(TEST_DATA_DIR)) {
        if (/^storage\.sqlite(?:-shm|-wal)?$/i.test(entry)) {
          continue;
        }
        fs.rmSync(path.join(TEST_DATA_DIR, entry), {
          recursive: true,
          force: true,
          maxRetries: 5,
          retryDelay: 100,
        });
      }
      const db = core.getDbInstance();
      db.prepare("DELETE FROM call_logs").run();
      return;
    } catch (error: unknown) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }

  if (lastError) {
    throw lastError;
  }
}

function insertCallLog(row) {
  const db = core.getDbInstance();
  db.prepare(
    `
    INSERT INTO call_logs (
      id, timestamp, method, path, status, model, provider, account, detail_state, artifact_relpath,
      has_request_body
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    row.id,
    row.timestamp,
    row.method || "POST",
    row.path || "/v1/chat/completions",
    row.status || 200,
    row.model || "openai/gpt-4.1",
    row.provider || "openai",
    row.account || "acct",
    row.detail_state || "ready",
    row.artifact_relpath || null,
    row.has_request_body || 1
  );
}

function buildArtifactRelPath(date: Date, label: string) {
  const dateFolder = date.toISOString().slice(0, 10);
  const timePart = `${String(date.getUTCHours()).padStart(2, "0")}${String(
    date.getUTCMinutes()
  ).padStart(2, "0")}${String(date.getUTCSeconds()).padStart(2, "0")}`;
  return `${dateFolder}/${timePart}_${label}_200.json`;
}

test.beforeEach(async () => {
  await resetTestDataDir();
});

test.afterEach(() => {
  core.resetDbInstance();
});

test.after(async () => {
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }

  if (ORIGINAL_RETENTION_DAYS === undefined) {
    delete process.env.CALL_LOG_RETENTION_DAYS;
  } else {
    process.env.CALL_LOG_RETENTION_DAYS = ORIGINAL_RETENTION_DAYS;
  }

  if (ORIGINAL_MAX_ENTRIES === undefined) {
    delete process.env.CALL_LOG_MAX_ENTRIES;
  } else {
    process.env.CALL_LOG_MAX_ENTRIES = ORIGINAL_MAX_ENTRIES;
  }

  if (ORIGINAL_MAX_ROWS === undefined) {
    delete process.env.CALL_LOGS_TABLE_MAX_ROWS;
  } else {
    process.env.CALL_LOGS_TABLE_MAX_ROWS = ORIGINAL_MAX_ROWS;
  }

  await resetTestDataDir();
});

test("call log file rotation honors both retention days and file count", () => {
  assert.ok(CALL_LOGS_DIR, "CALL_LOGS_DIR should resolve for test data dir");
  fs.rmSync(CALL_LOGS_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(CALL_LOGS_DIR, { recursive: true });

  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  const oldDate = new Date(now - 10 * oneDay);
  const keepADate = new Date(now - 3 * oneDay);
  const keepBDate = new Date(now - 2 * oneDay);
  const keepCDate = new Date(now - oneDay);

  const oldRelPath = buildArtifactRelPath(oldDate, "old");
  const keepARelPath = buildArtifactRelPath(keepADate, "keep-a");
  const keepBRelPath = buildArtifactRelPath(keepBDate, "keep-b");
  const keepCRelPath = buildArtifactRelPath(keepCDate, "keep-c");

  for (const relativePath of [oldRelPath, keepARelPath, keepBRelPath, keepCRelPath]) {
    const absolutePath = path.join(CALL_LOGS_DIR, relativePath);
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
    fs.writeFileSync(absolutePath, JSON.stringify({ relativePath }), "utf8");
  }

  insertCallLog({
    id: "old-log",
    timestamp: oldDate.toISOString(),
    artifact_relpath: oldRelPath,
  });
  insertCallLog({
    id: "keep-a",
    timestamp: keepADate.toISOString(),
    artifact_relpath: keepARelPath,
  });
  insertCallLog({
    id: "keep-b",
    timestamp: keepBDate.toISOString(),
    artifact_relpath: keepBRelPath,
  });
  insertCallLog({
    id: "keep-c",
    timestamp: keepCDate.toISOString(),
    artifact_relpath: keepCRelPath,
  });
  fs.utimesSync(
    path.join(CALL_LOGS_DIR, oldRelPath),
    new Date(now - 10 * oneDay),
    new Date(now - 10 * oneDay)
  );
  fs.utimesSync(
    path.join(CALL_LOGS_DIR, keepARelPath),
    new Date(now - 3 * oneDay),
    new Date(now - 3 * oneDay)
  );
  fs.utimesSync(
    path.join(CALL_LOGS_DIR, keepBRelPath),
    new Date(now - 2 * oneDay),
    new Date(now - 2 * oneDay)
  );
  fs.utimesSync(
    path.join(CALL_LOGS_DIR, keepCRelPath),
    new Date(now - oneDay),
    new Date(now - oneDay)
  );

  rotateCallLogs();

  const db = core.getDbInstance();
  assert.equal(
    (
      db.prepare("SELECT COUNT(*) AS cnt FROM call_logs WHERE id = ?").get("old-log") as {
        cnt: number;
      }
    ).cnt,
    0
  );
  assert.equal(fs.existsSync(path.join(CALL_LOGS_DIR, oldRelPath)), false);

  const keepARow = db
    .prepare("SELECT detail_state, artifact_relpath FROM call_logs WHERE id = ?")
    .get("keep-a");
  const typedKeepARow = keepARow as { detail_state: string; artifact_relpath: string | null };
  assert.equal(typedKeepARow.detail_state, "missing");
  assert.equal(typedKeepARow.artifact_relpath, null);
  assert.equal(fs.existsSync(path.join(CALL_LOGS_DIR, keepARelPath)), false);

  assert.equal(fs.existsSync(path.join(CALL_LOGS_DIR, keepBRelPath)), true);
  assert.equal(fs.existsSync(path.join(CALL_LOGS_DIR, keepCRelPath)), true);
});

test("rotateCallLogs swallows filesystem errors during cleanup", () => {
  assert.ok(CALL_LOGS_DIR, "CALL_LOGS_DIR should resolve for test data dir");
  fs.mkdirSync(CALL_LOGS_DIR, { recursive: true });

  const originalOpendirSync = fs.opendirSync;
  const originalConsoleError = console.error;
  const consoleCalls = [];

  fs.opendirSync = () => {
    throw new Error("simulated opendir failure");
  };
  console.error = (...args) => {
    consoleCalls.push(args.join(" "));
  };

  try {
    assert.doesNotThrow(() => rotateCallLogs());
  } finally {
    fs.opendirSync = originalOpendirSync;
    console.error = originalConsoleError;
  }

  assert.ok(consoleCalls.some((line) => /simulated opendir failure/.test(line)));
});

test("cleanupOverflowCallLogFiles ignores rmSync failures for old artifacts", () => {
  assert.ok(CALL_LOGS_DIR, "CALL_LOGS_DIR should resolve for test data dir");
  fs.rmSync(CALL_LOGS_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(CALL_LOGS_DIR, { recursive: true });

  const dayDir = path.join(CALL_LOGS_DIR, "2026-04-02");
  fs.mkdirSync(dayDir, { recursive: true });

  const newerRelPath = "2026-04-02/110000_keep.json";
  const olderRelPath = "2026-04-02/100000_remove.json";
  const newerFile = path.join(CALL_LOGS_DIR, newerRelPath);
  const olderFile = path.join(CALL_LOGS_DIR, olderRelPath);
  fs.writeFileSync(newerFile, "{}");
  fs.writeFileSync(olderFile, "{}");

  insertCallLog({
    id: "keep",
    timestamp: "2026-04-02T11:00:00.000Z",
    artifact_relpath: newerRelPath,
  });
  insertCallLog({
    id: "remove",
    timestamp: "2026-04-02T10:00:00.000Z",
    artifact_relpath: olderRelPath,
  });

  const now = Date.now();
  fs.utimesSync(newerFile, new Date(now), new Date(now));
  fs.utimesSync(olderFile, new Date(now - 5_000), new Date(now - 5_000));

  const originalRmSync = fs.rmSync;
  fs.rmSync = (targetPath, options) => {
    if (targetPath === olderFile) {
      throw new Error("simulated rm failure");
    }
    return originalRmSync.call(fs, targetPath, options);
  };

  try {
    assert.doesNotThrow(() => cleanupOverflowCallLogFiles(CALL_LOGS_DIR, 1));
  } finally {
    fs.rmSync = originalRmSync;
  }

  assert.equal(fs.existsSync(newerFile), true);
  assert.equal(fs.existsSync(olderFile), true);
});

test("artifact deletion never removes an equivalent trailing-slash root", () => {
  const baseDir = path.join(TEST_DATA_DIR, "root-preservation");
  const artifactPath = path.join(baseDir, "root.json");
  fs.mkdirSync(baseDir, { recursive: true });
  fs.writeFileSync(artifactPath, "{}");

  assert.equal(deleteCallArtifact("root.json", `${baseDir}${path.sep}`), true);
  assert.equal(fs.existsSync(artifactPath), false);
  assert.equal(fs.existsSync(baseDir), true);
});

test("scheduled rotation caps retention and max-row trimming at 100 each", () => {
  assert.ok(CALL_LOGS_DIR);
  fs.mkdirSync(CALL_LOGS_DIR, { recursive: true });
  process.env.CALL_LOG_RETENTION_DAYS = "1";
  process.env.CALL_LOGS_TABLE_MAX_ROWS = "150";

  const oldBase = Date.parse("2020-01-01T00:00:00.000Z");
  const freshBase = Date.now() - 60_000;
  for (let i = 0; i < 250; i++) {
    insertCallLog({ id: `old-${i}`, timestamp: new Date(oldBase + i).toISOString() });
  }
  for (let i = 0; i < 250; i++) {
    insertCallLog({ id: `fresh-${i}`, timestamp: new Date(freshBase + i).toISOString() });
  }

  rotateCallLogs();
  const db = core.getDbInstance();
  assert.equal(
    (
      db.prepare("SELECT COUNT(*) AS cnt FROM call_logs WHERE id LIKE 'old-%'").get() as {
        cnt: number;
      }
    ).cnt,
    50
  );
  assert.equal(
    (db.prepare("SELECT COUNT(*) AS cnt FROM call_logs").get() as { cnt: number }).cnt,
    300
  );
});

test("overflow cleanup removes at most 100 artifacts and continues across calls", () => {
  assert.ok(CALL_LOGS_DIR);
  const now = Date.now();
  for (let i = 0; i < 205; i++) {
    const relPath = `2026-04-03/${String(i).padStart(4, "0")}.json`;
    const absPath = path.join(CALL_LOGS_DIR, relPath);
    fs.mkdirSync(path.dirname(absPath), { recursive: true });
    fs.writeFileSync(absPath, "{}");
    insertCallLog({
      id: `overflow-${i}`,
      timestamp: new Date(now + i).toISOString(),
      artifact_relpath: relPath,
    });
  }

  assert.equal(cleanupOverflowCallLogFiles(CALL_LOGS_DIR, 5, 100), 100);
  assert.equal(cleanupOverflowCallLogFiles(CALL_LOGS_DIR, 5, 100), 100);
  assert.equal(cleanupOverflowCallLogFiles(CALL_LOGS_DIR, 5, 100), 0);
  assert.equal(
    (
      core
        .getDbInstance()
        .prepare("SELECT COUNT(*) AS cnt FROM call_logs WHERE artifact_relpath IS NOT NULL")
        .get() as { cnt: number }
    ).cnt,
    5
  );
});

test("orphan cleanup scans at most 100 candidates, resumes, and protects fresh files", () => {
  assert.ok(CALL_LOGS_DIR);
  const dayDir = path.join(CALL_LOGS_DIR, "2026-04-04");
  fs.mkdirSync(dayDir, { recursive: true });
  const old = new Date(Date.now() - 10 * 60_000);
  for (let i = 0; i < 205; i++) {
    const file = path.join(dayDir, `${String(i).padStart(4, "0")}.json`);
    fs.writeFileSync(file, "{}");
    fs.utimesSync(file, old, old);
  }
  assert.equal(cleanupOrphanCallLogFiles(CALL_LOGS_DIR, { maxCandidates: 100, minAgeMs: 0 }), 100);
  assert.equal(cleanupOrphanCallLogFiles(CALL_LOGS_DIR, { maxCandidates: 100, minAgeMs: 0 }), 100);

  const freshFile = path.join(dayDir, "fresh.json");
  fs.writeFileSync(freshFile, "{}");
  const third = cleanupOrphanCallLogFiles(CALL_LOGS_DIR, {
    maxCandidates: 100,
    minAgeMs: 5 * 60_000,
  });
  assert.equal(third, 5);
  assert.equal(fs.existsSync(freshFile), true);
});

test("orphan traversal bounds every directory operation and resumes", () => {
  const baseDir = path.join(TEST_DATA_DIR, "odd-artifact-tree");
  const dayDir = path.join(baseDir, "2026-04-05");
  fs.mkdirSync(dayDir, { recursive: true });
  for (let i = 0; i < 150; i++) {
    fs.writeFileSync(path.join(dayDir, `${String(i).padStart(4, "0")}.tmp`), "{}");
  }
  for (let i = 0; i < 10; i++) {
    fs.writeFileSync(path.join(dayDir, `${String(i).padStart(4, "0")}.json`), "{}");
  }

  const originalOpendirSync = fs.opendirSync;
  let operations = 0;
  fs.opendirSync = ((...args: Parameters<typeof fs.opendirSync>) => {
    operations++;
    const dir = originalOpendirSync(...args);
    const originalReadSync = dir.readSync.bind(dir);
    dir.readSync = () => {
      operations++;
      return originalReadSync();
    };
    return dir;
  }) as typeof fs.opendirSync;

  const passOperations: number[] = [];
  let deleted = 0;
  try {
    for (let pass = 0; pass < 2; pass++) {
      operations = 0;
      deleted += cleanupOrphanCallLogFiles(baseDir, {
        maxCandidates: 100,
        maxScanEntries: 100,
        minAgeMs: 0,
      });
      passOperations.push(operations);
    }
  } finally {
    fs.opendirSync = originalOpendirSync;
  }

  assert.equal(passOperations[0], 100);
  assert.ok(passOperations[1] > 0 && passOperations[1] <= 100);
  assert.equal(deleted, 10);
  assert.equal(fs.readdirSync(dayDir).filter((entry) => entry.endsWith(".json")).length, 0);
});

test("hot rotation avoids full artifact listing and bounds stat calls", () => {
  assert.ok(CALL_LOGS_DIR);
  const dayDir = path.join(CALL_LOGS_DIR, "2026-04-05");
  fs.mkdirSync(dayDir, { recursive: true });
  for (let i = 0; i < 150; i++) {
    fs.writeFileSync(path.join(dayDir, `${String(i).padStart(4, "0")}.json`), "{}");
  }

  const originalStatSync = fs.statSync;
  let statCalls = 0;
  fs.statSync = (...args) => {
    statCalls++;
    return originalStatSync.apply(fs, args);
  };
  try {
    rotateCallLogs();
  } finally {
    fs.statSync = originalStatSync;
  }
  assert.ok(statCalls <= 100, `expected at most 100 stat calls, got ${statCalls}`);
});
