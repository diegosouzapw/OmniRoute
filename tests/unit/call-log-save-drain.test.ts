import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

useDecollidedMigrationsDir();
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-call-log-drain-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const artifactWriter = await import("../../src/lib/usage/callLogArtifactWriter.ts");

test.after(async () => {
  await artifactWriter.closeCallLogArtifactWriter();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("call-log drain waits for artifact metadata and summary commit", async () => {
  const id = "drain-write-1";
  void callLogs.saveCallLog({
    id,
    timestamp: "2026-08-11T12:34:56.789Z",
    status: 200,
    model: "test-model",
    provider: "test-provider",
    requestBody: { pending: true },
    responseBody: { committed: true },
  });

  // The first cold spawn of the worker_threads artifact worker (loaded via tsx)
  // can take ~2.4s on its own before queued artifact writes even start draining,
  // so a 2s wait is flaky on cold runs. 10s is generous headroom while still
  // failing fast on a genuinely stuck drain.
  assert.equal(await callLogs.waitForCallLogSaves(10_000), true);

  const row = core
    .getDbInstance()
    .prepare(
      `SELECT detail_state, artifact_relpath, artifact_size_bytes, artifact_sha256
       FROM call_logs WHERE id = ?`
    )
    .get(id) as {
    detail_state: string;
    artifact_relpath: string | null;
    artifact_size_bytes: number | null;
    artifact_sha256: string | null;
  };

  assert.equal(row.detail_state, "ready");
  assert.ok(row.artifact_relpath);
  assert.ok(row.artifact_size_bytes && row.artifact_size_bytes > 0);
  assert.match(row.artifact_sha256 || "", /^[0-9a-f]{8}$/);
  assert.equal(fs.existsSync(path.join(TEST_DATA_DIR, "call_logs", row.artifact_relpath)), true);
});

test("forced close settles tracked saves before rejecting late saves", async () => {
  const pendingId = "drain-forced-close";
  const pending = callLogs.saveCallLog({
    id: pendingId,
    timestamp: "2026-08-11T12:35:56.789Z",
    status: 200,
    model: "test-model",
    provider: "test-provider",
    requestBody: { pending: true },
  });

  await callLogs.closeCallLogSaves(0);
  await pending;

  const row = core
    .getDbInstance()
    .prepare(
      `SELECT detail_state, artifact_relpath, artifact_size_bytes, artifact_sha256
       FROM call_logs WHERE id = ?`
    )
    .get(pendingId) as {
    detail_state: string;
    artifact_relpath: string | null;
    artifact_size_bytes: number | null;
    artifact_sha256: string | null;
  };
  assert.equal(row.detail_state, "missing");
  assert.equal(row.artifact_relpath, null);
  assert.equal(row.artifact_size_bytes, null);
  assert.equal(row.artifact_sha256, null);

  await callLogs.saveCallLog({
    id: "drain-late-save",
    timestamp: "2026-08-11T12:36:56.789Z",
    status: 200,
    model: "test-model",
    provider: "test-provider",
  });
  const lateCount = core
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS count FROM call_logs WHERE id = ?")
    .get("drain-late-save") as { count: number };
  assert.equal(lateCount.count, 0);
});
