import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression test for GitHub issue #13597 (claim A): the callLogs artifact worker's
// failOpen() only ever logged a hardcoded "detail omitted" string — the real Error from
// the worker's `error`/`messageerror` events (and the exit code from a non-zero `exit`)
// were read and then discarded before warnRateLimited() was called, making the failure
// undiagnosable on a live system.
//
// This test forces a REAL worker_threads crash (a worker script that throws
// synchronously at import time) via the `__setCallLogWorkerOverrideForTests` test-only
// hook, so callLogArtifactWriter.ts's actual `worker.on("error", ...)` handler fires with
// a genuine Error object. It then asserts the resulting console.warn call carries that
// error's message. On the pre-fix code this assertion is RED: the only thing ever logged
// is the generic "detail omitted" string, with no trace of the injected error text.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-issue-13597-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { writeCallArtifactAsync, closeCallLogArtifactWriter, __setCallLogWorkerOverrideForTests } =
  await import("../../src/lib/usage/callLogArtifactWriter.ts");

const CRASH_MESSAGE = "probe-13597-worker-init-crash";
const crashWorkerFile = path.join(TEST_DATA_DIR, "crash-worker.mjs");
fs.writeFileSync(crashWorkerFile, `throw new Error(${JSON.stringify(CRASH_MESSAGE)});\n`);

test.after(async () => {
  __setCallLogWorkerOverrideForTests(null);
  await closeCallLogArtifactWriter(0);
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function buildArtifact(id: string) {
  return {
    schemaVersion: 5 as const,
    summary: {
      id,
      timestamp: "2026-09-15T00:00:00.000Z",
      method: "POST",
      path: "/v1/chat/completions",
      status: 200,
      model: "test-model",
      requestedModel: null,
      provider: "test-provider",
      account: "test-account",
      connectionId: null,
      duration: 10,
      tokens: {
        in: 1,
        out: 2,
        cacheRead: null,
        cacheWrite: null,
        reasoning: null,
        compressed: null,
      },
      requestType: "chat",
      sourceFormat: "openai",
      targetFormat: "openai",
      apiKeyId: null,
      apiKeyName: null,
      comboName: null,
      comboStepId: null,
      comboExecutionKey: null,
    },
    requestBody: {},
    responseBody: { content: "unreachable — worker never comes up" },
    error: null,
  };
}

test("issue #13597: a crashed call-log worker logs the underlying error detail, not 'detail omitted'", async () => {
  __setCallLogWorkerOverrideForTests({ workerFile: crashWorkerFile, execArgv: [] });

  const originalWarn = console.warn;
  const warnings: string[] = [];
  console.warn = (...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
  };

  try {
    const result = await writeCallArtifactAsync(buildArtifact("issue-13597-crash-1"));
    assert.equal(result, null); // fails open — existing, correct behavior

    const failureWarnings = warnings.filter((w) => w.includes("[callLogs]"));
    assert.ok(failureWarnings.length > 0, "expected a [callLogs] warning to be logged");

    const detailed = failureWarnings.some((w) => w.includes(CRASH_MESSAGE));
    assert.ok(
      detailed,
      `expected a [callLogs] warning to include the underlying error detail ` +
        `("${CRASH_MESSAGE}"), got: ${JSON.stringify(failureWarnings)}`
    );
  } finally {
    console.warn = originalWarn;
  }
});
