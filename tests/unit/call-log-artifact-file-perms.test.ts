// Call-log artifacts carry full request/response bodies (prompts, tool output) and the
// legacy log archive zips whole request-log trees. Both used to inherit the process
// umask (typically 0755 dirs / 0644 files), so any other OS user on a shared host could
// read them whenever the parent DATA_DIR was not itself locked down (bind mounts, a
// DATA_DIR created outside the CLI bootstrap). They are now written 0700 / 0600.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ORIGINAL_HOME = process.env.HOME;
const ORIGINAL_USERPROFILE = process.env.USERPROFILE;
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_NEXT_PHASE = process.env.NEXT_PHASE;

const TEST_HOME_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-call-log-perms-"));
const TEST_DATA_DIR = path.join(TEST_HOME_DIR, "data");

process.env.HOME = TEST_HOME_DIR;
process.env.USERPROFILE = TEST_HOME_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.NEXT_PHASE;

// Pre-existing, umask-default directories from before the hardening must be tightened.
fs.mkdirSync(path.join(TEST_DATA_DIR, "call_logs"), { recursive: true, mode: 0o755 });
fs.chmodSync(path.join(TEST_DATA_DIR, "call_logs"), 0o755);
fs.mkdirSync(path.join(TEST_DATA_DIR, "log_archives"), { recursive: true, mode: 0o755 });
fs.chmodSync(path.join(TEST_DATA_DIR, "log_archives"), 0o755);

const { getCallLogsDir, writeCallArtifact } =
  await import("../../src/lib/usage/callLogArtifacts.ts");
const CALL_LOGS_DIR = getCallLogsDir();
const migrations = await import("../../src/lib/usage/migrations.ts");
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");

const skipOnWindows = process.platform === "win32";

function modeOf(target: string): number {
  return fs.statSync(target).mode & 0o777;
}

test.after(() => {
  try {
    const db = getDbInstance();
    if (db?.open) db.close();
  } catch {
    // Database may never have been opened.
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

  fs.rmSync(TEST_HOME_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test(
  "writeCallArtifact writes the artifact 0600 inside 0700 directories",
  { skip: skipOnWindows },
  () => {
    const timestamp = "2026-10-13T12:00:00.000Z";
    const result = writeCallArtifact({
      schemaVersion: 5 as const,
      summary: {
        id: "perms-artifact",
        timestamp,
        method: "POST",
        path: "/v1/chat/completions",
        status: 200,
        model: "openai/gpt-4.1",
        requestedModel: null,
      },
      requestBody: { messages: [{ role: "user", content: "private prompt" }] },
      error: null,
    } as never);

    assert.ok(result, "artifact should be written");
    assert.ok(CALL_LOGS_DIR, "CALL_LOGS_DIR must be configured outside cloud mode");
    const absPath = path.join(CALL_LOGS_DIR, result.relPath);

    assert.equal(modeOf(absPath), 0o600, "artifact file must be owner read/write only");
    assert.equal(modeOf(path.dirname(absPath)), 0o700, "dated directory must be owner-only");
    assert.equal(modeOf(CALL_LOGS_DIR), 0o700, "pre-existing call_logs root must be tightened");

    const leftovers = fs
      .readdirSync(path.dirname(absPath))
      .filter((entry) => entry.endsWith(".tmp"));
    assert.deepEqual(leftovers, [], "atomic write must not leave temp files behind");
  }
);

test(
  "archiveLegacyRequestLogs writes the archive and marker 0600 in a 0700 dir",
  { skip: skipOnWindows },
  async () => {
    fs.writeFileSync(path.join(TEST_DATA_DIR, "log.txt"), "legacy summary line\n");

    const archiveFilename = await migrations.archiveLegacyRequestLogs();
    assert.ok(archiveFilename, "legacy log.txt should produce an archive");

    const archiveDir = migrations.LOG_ARCHIVES_DIR;
    assert.ok(archiveDir, "LOG_ARCHIVES_DIR must be configured outside cloud mode");
    assert.equal(modeOf(archiveDir), 0o700, "pre-existing log_archives dir must be tightened");
    assert.equal(modeOf(path.join(archiveDir, archiveFilename)), 0o600, "zip must be 0600");
    assert.equal(
      modeOf(path.join(archiveDir, "legacy-request-logs.json")),
      0o600,
      "legacy layout marker must be 0600"
    );
  }
);
