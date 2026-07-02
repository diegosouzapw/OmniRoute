import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-call-log-files-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_RETENTION_DAYS = process.env.CALL_LOG_RETENTION_DAYS;
const ORIGINAL_MAX_ENTRIES = process.env.CALL_LOG_MAX_ENTRIES;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.CALL_LOG_RETENTION_DAYS = "7";
process.env.CALL_LOG_MAX_ENTRIES = "2";

const core = await import("../../src/lib/db/core.ts");
const { rotateCallLogs, cleanupOverflowCallLogFiles } =
  await import("../../src/lib/usage/callLogs.ts");
const { CALL_LOGS_DIR } = await import("../../src/lib/usage/callLogArtifacts.ts");

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
        fs.rmSync(path.join(TEST_DATA_DIR, entry), { recursive: true, force: true });
      }
      const db = core.getDbInstance();
      db.prepare("DELETE FROM call_logs").run();
      return;
    } catch (error: any) {
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

  await resetTestDataDir();
});

test("call log file rotation honors both retention days and file count", () => {
  assert.ok(CALL_LOGS_DIR, "CALL_LOGS_DIR should resolve for test data dir");
  fs.rmSync(CALL_LOGS_DIR, { recursive: true, force: true });
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
    (db.prepare("SELECT COUNT(*) AS cnt FROM call_logs WHERE id = ?").get("old-log") as any).cnt,
    0
  );
  assert.equal(fs.existsSync(path.join(CALL_LOGS_DIR, oldRelPath)), false);

  const keepARow = db
    .prepare("SELECT detail_state, artifact_relpath FROM call_logs WHERE id = ?")
    .get("keep-a");
  assert.equal((keepARow as any).detail_state, "missing");
  (assert as any).equal((keepARow as any).artifact_relpath, null);
  assert.equal(fs.existsSync(path.join(CALL_LOGS_DIR, keepARelPath)), false);

  assert.equal(fs.existsSync(path.join(CALL_LOGS_DIR, keepBRelPath)), true);
  assert.equal(fs.existsSync(path.join(CALL_LOGS_DIR, keepCRelPath)), true);
});

test("rotateCallLogs swallows filesystem errors during cleanup", () => {
  assert.ok(CALL_LOGS_DIR, "CALL_LOGS_DIR should resolve for test data dir");
  fs.mkdirSync(CALL_LOGS_DIR, { recursive: true });

  const originalReaddirSync = fs.readdirSync;
  const originalConsoleError = console.error;
  const consoleCalls = [];

  fs.readdirSync = () => {
    throw new Error("simulated readdir failure");
  };
  console.error = (...args) => {
    consoleCalls.push(args.join(" "));
  };

  try {
    assert.doesNotThrow(() => rotateCallLogs());
  } finally {
    fs.readdirSync = originalReaddirSync;
    console.error = originalConsoleError;
  }

  assert.ok(consoleCalls.length >= 1);
  assert.ok(consoleCalls.some((line) => /simulated readdir failure/.test(line)));
});

test("cleanupOverflowCallLogFiles logs and returns when directory scanning fails", () => {
  assert.ok(CALL_LOGS_DIR, "CALL_LOGS_DIR should resolve for test data dir");
  fs.mkdirSync(CALL_LOGS_DIR, { recursive: true });

  const originalReaddirSync = fs.readdirSync;
  const originalConsoleError = console.error;
  const consoleCalls = [];

  fs.readdirSync = (targetPath, ...args) => {
    if (targetPath === CALL_LOGS_DIR) {
      throw new Error("simulated overflow scan failure");
    }
    return originalReaddirSync.call(fs, targetPath, ...args);
  };
  console.error = (...args) => {
    consoleCalls.push(args.join(" "));
  };

  try {
    assert.doesNotThrow(() => cleanupOverflowCallLogFiles(CALL_LOGS_DIR, 2));
  } finally {
    fs.readdirSync = originalReaddirSync;
    console.error = originalConsoleError;
  }

  assert.equal(consoleCalls.length, 1);
  assert.match(consoleCalls[0], /Failed to prune overflow request artifacts/);
  assert.match(consoleCalls[0], /simulated overflow scan failure/);
});

test("cleanupOverflowCallLogFiles ignores directory entries that fail nested inspection", () => {
  assert.ok(CALL_LOGS_DIR, "CALL_LOGS_DIR should resolve for test data dir");
  fs.rmSync(CALL_LOGS_DIR, { recursive: true, force: true });
  fs.mkdirSync(CALL_LOGS_DIR, { recursive: true });

  const nestedDir = path.join(CALL_LOGS_DIR, "2026-04-01");
  fs.mkdirSync(nestedDir, { recursive: true });
  fs.writeFileSync(path.join(nestedDir, "100000_keep.json"), "{}");

  const originalReaddirSync = fs.readdirSync;
  fs.readdirSync = (targetPath, ...args) => {
    if (targetPath === nestedDir) {
      throw new Error("simulated nested scan failure");
    }
    return originalReaddirSync.call(fs, targetPath, ...args);
  };

  try {
    assert.doesNotThrow(() => cleanupOverflowCallLogFiles(CALL_LOGS_DIR, 1));
  } finally {
    fs.readdirSync = originalReaddirSync;
  }

  assert.equal(fs.existsSync(nestedDir), true);
  assert.equal(fs.existsSync(path.join(nestedDir, "100000_keep.json")), true);
});

test("cleanupOverflowCallLogFiles ignores rmSync failures for old artifacts", () => {
  assert.ok(CALL_LOGS_DIR, "CALL_LOGS_DIR should resolve for test data dir");
  fs.rmSync(CALL_LOGS_DIR, { recursive: true, force: true });
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
