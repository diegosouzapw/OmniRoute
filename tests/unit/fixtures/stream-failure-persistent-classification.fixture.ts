import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-failure-code-"));
const TEST_DATA_DIR = path.join(TEST_ROOT, "data");
const TEST_PLUGINS_DIR = path.join(TEST_ROOT, "plugins");
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_PLUGINS_DIR = process.env.OMNIROUTE_PLUGINS_DIR;

fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
fs.mkdirSync(TEST_PLUGINS_DIR, { recursive: true });
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_PLUGINS_DIR = TEST_PLUGINS_DIR;

const core = await import("../../../src/lib/db/core.ts");
const failureUsage = await import("../../../open-sse/handlers/chatCore/failureUsage.ts");
const usageHistory = await import("../../../src/lib/usage/usageHistory.ts");
const { createStreamFailureFinalizers } =
  await import("../../../open-sse/utils/streamFailureFinalization.ts");

test.after(() => {
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_PLUGINS_DIR === undefined) delete process.env.OMNIROUTE_PLUGINS_DIR;
  else process.env.OMNIROUTE_PLUGINS_DIR = ORIGINAL_PLUGINS_DIR;
  fs.rmSync(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("stream failure persists only the projected public classification", () => {
  const opaqueCode = "opaque-stream-code-secret-9382746";
  let completionCode: string | null | undefined;
  let persistedCode: string | undefined;
  let classifierCode: string | undefined;
  const { handleStreamFailure } = createStreamFailureFinalizers({
    isFailureCompletionRecorded: () => false,
    onStreamComplete: (payload) => {
      completionCode = payload.errorCode;
    },
    persistFailureUsage: (_status, errorCode) => {
      persistedCode = errorCode;
    },
    onStreamFailure: (failure) => {
      classifierCode = failure.code;
    },
  });

  assert.equal(
    handleStreamFailure({ status: 502, message: "upstream failed", code: opaqueCode }),
    true
  );
  assert.equal(completionCode, "bad_gateway");
  assert.equal(persistedCode, "bad_gateway");
  assert.equal(classifierCode, opaqueCode);
});

test("pre-response failures persist only the projected public classification", async () => {
  const opaqueCode = "opaque-pre-response-code-secret-6382951";
  const projectedCode = failureUsage.projectFailureUsageErrorCode({
    statusCode: 502,
    message: "upstream request failed",
    errorCode: opaqueCode,
    errorType: "opaque-pre-response-type-secret-9472013",
  });

  assert.equal(projectedCode, "bad_gateway");

  const provider = "persistent-error-code-boundary";
  await usageHistory.saveRequestUsage(
    failureUsage.buildFailureUsageRecord({
      provider,
      model: "model",
      connectionId: null,
      apiKeyInfo: null,
      effectiveServiceTier: "standard",
      isCombo: false,
      comboStrategy: null,
      statusCode: 502,
      errorCode: projectedCode,
      latencyMs: 1,
    })
  );

  const rows = await usageHistory.getUsageHistory({ provider });
  assert.equal(rows.length, 1);
  assert.equal(rows[0]?.errorCode, "bad_gateway");
  assert.doesNotMatch(JSON.stringify(rows), /opaque-pre-response|6382951|9472013/);
});
