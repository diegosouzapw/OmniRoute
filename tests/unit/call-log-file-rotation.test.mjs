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

const { rotateCallLogs } = await import("../../src/lib/usage/callLogs.ts");
const { CALL_LOGS_DIR } = await import("../../src/lib/usage/migrations.ts");

test.after(() => {
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

  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("call log file rotation honors both retention days and file count", () => {
  assert.ok(CALL_LOGS_DIR, "CALL_LOGS_DIR should resolve for test data dir");
  fs.rmSync(CALL_LOGS_DIR, { recursive: true, force: true });
  fs.mkdirSync(CALL_LOGS_DIR, { recursive: true });

  const oldDir = path.join(CALL_LOGS_DIR, "2026-03-01");
  const activeDir = path.join(CALL_LOGS_DIR, "2026-03-31");
  fs.mkdirSync(oldDir, { recursive: true });
  fs.mkdirSync(activeDir, { recursive: true });

  const oldFile = path.join(oldDir, "080000_old_200.json");
  const keepA = path.join(activeDir, "090000_keep-a_200.json");
  const keepB = path.join(activeDir, "091000_keep-b_200.json");
  const keepC = path.join(activeDir, "092000_keep-c_200.json");

  for (const file of [oldFile, keepA, keepB, keepC]) {
    fs.writeFileSync(file, JSON.stringify({ file }), "utf8");
  }

  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  fs.utimesSync(oldFile, new Date(now - 10 * oneDay), new Date(now - 10 * oneDay));
  fs.utimesSync(oldDir, new Date(now - 10 * oneDay), new Date(now - 10 * oneDay));
  fs.utimesSync(keepA, new Date(now - 3 * oneDay), new Date(now - 3 * oneDay));
  fs.utimesSync(keepB, new Date(now - 2 * oneDay), new Date(now - 2 * oneDay));
  fs.utimesSync(keepC, new Date(now - oneDay), new Date(now - oneDay));

  rotateCallLogs();

  assert.equal(fs.existsSync(oldDir), false);
  assert.equal(fs.existsSync(keepA), false);
  assert.equal(fs.existsSync(keepB), true);
  assert.equal(fs.existsSync(keepC), true);
});
