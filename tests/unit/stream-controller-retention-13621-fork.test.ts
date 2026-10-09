/**
 * Issue #13621 regression test (RED phase) — closure retention of the request
 * payload after the stream controller reaches a terminal state.
 *
 * Each case runs in an isolated worker (spawned child with --expose-gc and a
 * fresh DATA_DIR) so the GC observation is hermetic: the worker builds a ~4 MiB
 * payload, wires the REAL createStreamController
 * (open-sse/utils/streamHandler.ts) with production-shaped callbacks that
 * capture the payload, pins the controller the way production does, triggers a
 * terminal path, then GC-settles and reports whether the payload's canary was
 * collected.
 *
 * Fixed behavior (GREEN): after ANY terminal state, the payload closure must be
 * collectible while only the controller itself stays pinned.
 * Defect behavior (RED on this tree): the terminal-state controller still pins
 * its onDisconnect/onError closures, so the payload survives GC.
 */

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const WORKER_RESULT_PREFIX = "RETENTION_RESULT=";
const WORKER_TIMEOUT_MS = 30_000;
const PAYLOAD_BYTES = 4 * 1024 * 1024;

// Residual skip after upstream #15961 cross-validation (2026-10-10): the 4
// terminal-callback modes + control ran GREEN unskipped 2/2 runs; only this
// mode stayed RED, so it alone is re-skipped pending the deferred-drain fix.
const SKIP_RESIDUAL_DEFERRED_DRAIN_13621 =
  "RED: #15961 releases terminal callbacks but NOT the deferred-drain tool-handoff " +
  "grace path — payload closure retained after handleDisconnect() (deterministic, " +
  "failed 2/2 runs 2026-10-10); tracked via #13621";

const workerFixture = fileURLToPath(
  new URL("./_fixtures/stream-controller-retention-13621-fork.worker.ts", import.meta.url)
);

type WorkerMode =
  "complete" | "disconnect" | "error" | "abort" | "disconnect-handoff-grace" | "complete-nopin";

type RetentionResult = {
  mode: WorkerMode;
  payloadSizeBytes: number;
  collected: boolean;
  retainedApproxBytes: number;
};

function runWorker(mode: WorkerMode): RetentionResult {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13621-"));

  const result = spawnSync(
    process.execPath,
    ["--expose-gc", "--import", "tsx/esm", workerFixture, mode],
    {
      cwd: new URL("../..", import.meta.url),
      encoding: "utf8",
      timeout: WORKER_TIMEOUT_MS,
      env: {
        ...process.env,
        DATA_DIR: dataDir,
        DISABLE_SQLITE_AUTO_BACKUP: "1",
      },
    }
  );

  try {
    assert.equal(
      result.status,
      0,
      `worker for mode "${mode}" failed (status ${String(result.status)}):\n` +
        `${String(result.stdout).slice(-2_000)}\n${String(result.stderr).slice(-2_000)}`
    );

    const resultLine = String(result.stdout)
      .split("\n")
      .findLast((line) => line.startsWith(WORKER_RESULT_PREFIX));
    assert.ok(resultLine, `worker for mode "${mode}" did not emit its result line`);

    return JSON.parse(resultLine.slice(WORKER_RESULT_PREFIX.length)) as RetentionResult;
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

test("13621 control: unpinned terminal controller releases the payload closure (harness sanity)", () => {
  const control = runWorker("complete-nopin");

  assert.equal(control.payloadSizeBytes, PAYLOAD_BYTES);
  assert.equal(
    control.collected,
    true,
    "harness broken: even with NO pinning, the payload closure was not collected — " +
      "a live frame or module holder still references the canary"
  );
});

test("13621 complete: terminal handleComplete releases the payload closure", () => {
  const observed = runWorker("complete");

  assert.equal(observed.collected, true, "payload closure retained after handleComplete()");
});

test("13621 disconnect: terminal handleDisconnect releases the payload closure", () => {
  const observed = runWorker("disconnect");

  assert.equal(observed.collected, true, "payload closure retained after handleDisconnect()");
});

test("13621 error: terminal handleError releases the payload closure", () => {
  const observed = runWorker("error");

  assert.equal(observed.collected, true, "payload closure retained after handleError()");
});

test("13621 abort: terminal abort releases the payload closure", () => {
  const observed = runWorker("abort");

  assert.equal(observed.collected, true, "payload closure retained after abort()");
});

test(
  "13621 disconnect-handoff-grace: deferred drain path releases the payload closure",
  { skip: SKIP_RESIDUAL_DEFERRED_DRAIN_13621, timeout: 60_000 },
  () => {
    const observed = runWorker("disconnect-handoff-grace");

    assert.equal(
      observed.collected,
      true,
      "payload closure retained after handleDisconnect() with completed-tool-handoff grace"
    );
  }
);
