import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-log-migration-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const migrations = await import("../../src/lib/usage/migrations.ts");
const { getDbInstance } = await import("../../src/lib/db/core.ts");

const LEGACY_LOGS_DIR = path.join(TEST_DATA_DIR, "logs");
const LEGACY_CALL_LOGS_DIR = path.join(TEST_DATA_DIR, "call_logs");
const LEGACY_SUMMARY_FILE = path.join(TEST_DATA_DIR, "log.txt");
const MARKER_PATH = path.join(migrations.LOG_ARCHIVES_DIR, "legacy-request-logs.json");

function seedLegacyLayout() {
  fs.mkdirSync(path.join(LEGACY_LOGS_DIR, "session-a"), { recursive: true });
  fs.writeFileSync(
    path.join(LEGACY_LOGS_DIR, "session-a", "1_req_client.json"),
    JSON.stringify({ ok: true }, null, 2)
  );

  fs.mkdirSync(path.join(LEGACY_CALL_LOGS_DIR, "2026-03-30"), { recursive: true });
  fs.writeFileSync(
    path.join(LEGACY_CALL_LOGS_DIR, "2026-03-30", "123000_model_200.json"),
    JSON.stringify({ ok: true }, null, 2)
  );

  fs.writeFileSync(LEGACY_SUMMARY_FILE, "legacy summary\n");
}

function cleanup() {
  // Close the SQLite connection that holds a lock on files inside TEST_DATA_DIR
  try {
    const db = getDbInstance();
    if (db && db.open) db.close();
  } catch {
    // DB may already be closed
  }
  // On Windows, rmSync can fail if file handles are still held.
  // Retry with a short delay to let the OS release locks.
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      return;
    } catch {
      /* retry */
    }
  }
}

test.after(() => {
  cleanup();
});

test("archives legacy request log layout into a zip and removes old files", async () => {
  seedLegacyLayout();

  const archiveFilename = await migrations.archiveLegacyRequestLogs();

  assert.match(archiveFilename || "", /_legacy-request-logs\.zip$/);
  assert.equal(fs.existsSync(LEGACY_LOGS_DIR), false);
  assert.equal(fs.existsSync(LEGACY_CALL_LOGS_DIR), false);
  assert.equal(fs.existsSync(LEGACY_SUMMARY_FILE), false);
  assert.equal(fs.existsSync(MARKER_PATH), true);

  const archivePath = path.join(migrations.LOG_ARCHIVES_DIR, archiveFilename);
  assert.equal(fs.existsSync(archivePath), true);
  assert.ok(fs.statSync(archivePath).size > 0);
});

test("keeps legacy files in place when zip creation fails", async () => {
  // Re-seed legacy layout (first test archived and removed them)
  seedLegacyLayout();

  // Remove the archive dir created by the first test, then write a file
  // at that path so mkdirSync throws EEXIST. This simulates a zip
  // creation failure. The migration should leave legacy files intact.
  fs.rmSync(migrations.LOG_ARCHIVES_DIR, { recursive: true, force: true });
  fs.writeFileSync(migrations.LOG_ARCHIVES_DIR, "not-a-directory");

  await assert.rejects(() => migrations.archiveLegacyRequestLogs());

  assert.equal(fs.existsSync(LEGACY_LOGS_DIR), true);
  assert.equal(fs.existsSync(LEGACY_CALL_LOGS_DIR), true);
  assert.equal(fs.existsSync(LEGACY_SUMMARY_FILE), true);
  assert.equal(fs.existsSync(MARKER_PATH), false);
});
