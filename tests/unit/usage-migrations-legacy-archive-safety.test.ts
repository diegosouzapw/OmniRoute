// Regression tests for #6401 / #6799.
//
// #6799: archiveLegacyRequestLogs() treated the ENTIRE DATA_DIR/logs directory as a
// single "legacy request log" archive target and recursively deleted it after zipping —
// including DATA_DIR/logs/application/, which is the live file-logger's own directory
// since PR #6234 moved the default APP_LOG_FILE_PATH to DATA_DIR/logs/application/app.log.
//
// #6401: yazl's addFile() does an internal stat()-then-stream-read (TOCTOU). Because the
// live logger keeps appending to files under the swept directory while the migration is
// zipping them, the file can grow between yazl's stat and its later read, and yazl throws
// "file data stream has unexpected number of bytes" as an error event on a stream that
// was never wired into archiveLegacyRequestLogs()'s own try/catch — surfacing as an
// uncaught exception that crashes the process at boot.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ORIGINAL_HOME = process.env.HOME;
const ORIGINAL_USERPROFILE = process.env.USERPROFILE;
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_NEXT_PHASE = process.env.NEXT_PHASE;

const TEST_HOME_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-6401-6799-home-"));
const TEST_DATA_DIR = path.join(TEST_HOME_DIR, "data");

process.env.HOME = TEST_HOME_DIR;
process.env.USERPROFILE = TEST_HOME_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.NEXT_PHASE;

const migrations = await import("../../src/lib/usage/migrations.ts");
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");

const APP_LOG_DIR = path.join(TEST_DATA_DIR, "logs", "application");
const APP_LOG_FILE = path.join(APP_LOG_DIR, "app.log");
const CURRENT_REQUEST_LOGS_DIR = path.join(TEST_DATA_DIR, "logs");

test.before(() => {
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  try {
    const db = getDbInstance();
    if (db?.open) db.close();
  } catch {
    // Database may already be closed.
  }
  resetDbInstance?.();

  if (ORIGINAL_HOME === undefined) delete process.env.HOME;
  else process.env.HOME = ORIGINAL_HOME;
  if (ORIGINAL_USERPROFILE === undefined) delete process.env.USERPROFILE;
  else process.env.USERPROFILE = ORIGINAL_USERPROFILE;
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_NEXT_PHASE === undefined) delete process.env.NEXT_PHASE;
  else process.env.NEXT_PHASE = ORIGINAL_NEXT_PHASE;

  fs.rmSync(TEST_HOME_DIR, { recursive: true, force: true });
});

test("#6799: archiveLegacyRequestLogs() must not delete the live app-logger directory (DATA_DIR/logs/application)", async () => {
  fs.mkdirSync(APP_LOG_DIR, { recursive: true });
  fs.writeFileSync(APP_LOG_FILE, '{"level":30,"msg":"server starting"}\n');

  assert.equal(
    fs.existsSync(APP_LOG_FILE),
    true,
    "precondition: live app.log exists before migration runs"
  );

  await migrations.archiveLegacyRequestLogs();

  assert.equal(
    fs.existsSync(APP_LOG_FILE),
    true,
    "archiveLegacyRequestLogs() deleted the live app.log file — DATA_DIR/logs/application must be excluded from the legacy archive sweep"
  );
  assert.equal(
    fs.existsSync(CURRENT_REQUEST_LOGS_DIR),
    true,
    "archiveLegacyRequestLogs() deleted the entire DATA_DIR/logs directory, including the live application log subtree"
  );
});

test("#6401: archiveLegacyRequestLogs does not crash the process when a legacy target is being actively appended to (yazl TOCTOU)", async (t) => {
  const legacyLogFile = path.join(CURRENT_REQUEST_LOGS_DIR, "legacy-request.log");
  fs.mkdirSync(CURRENT_REQUEST_LOGS_DIR, { recursive: true });
  fs.writeFileSync(legacyLogFile, "x".repeat(64 * 1024));

  // Clear the marker written by the previous test so this run re-enters the archive path.
  const markerPath = path.join(TEST_DATA_DIR, "log_archives", "legacy-request-logs.json");
  fs.rmSync(markerPath, { force: true });

  let writing = true;
  const writer = setInterval(() => {
    if (!writing) return;
    try {
      fs.appendFileSync(legacyLogFile, "y".repeat(4096));
    } catch {
      /* ignore */
    }
  }, 2);
  writer.unref();

  let uncaught: unknown = null;
  const onUncaught = (err: unknown) => {
    uncaught = err;
  };
  process.on("uncaughtException", onUncaught);

  t.after(() => {
    writing = false;
    clearInterval(writer);
    process.off("uncaughtException", onUncaught);
  });

  let rejected: unknown = null;
  try {
    await migrations.archiveLegacyRequestLogs();
  } catch (err) {
    rejected = err;
  }

  await new Promise((r) => setTimeout(r, 800));

  writing = false;
  clearInterval(writer);

  assert.equal(
    uncaught,
    null,
    `archiveLegacyRequestLogs() let an uncaughtException escape instead of handling/rejecting it: ${String(uncaught)}`
  );
  // The function itself already has an outer try/catch at call sites; here we assert it
  // resolves or rejects cleanly rather than crashing the process via uncaughtException.
  void rejected;
});
