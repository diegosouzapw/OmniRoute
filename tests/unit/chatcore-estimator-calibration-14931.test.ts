// #14931 — end-to-end calibration wiring through handleChatCore. The stubbed
// upstream reports prompt_tokens = 1/4 of the chars/4 estimate for this
// provider's tokenizer. Three passing requests teach the bucket that ratio;
// the fourth request — raw estimate ABOVE the context limit — must then pass
// the guard (calibrated estimate below it), while the same request with
// calibration disabled must be rejected. This is the exact false-kill shape
// from the incident, inverted into a regression test.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-calint-14931-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { resetEstimatorCalibrationForTests } = await import(
  "../../open-sse/services/estimatorCalibration.ts"
);

const PROVIDER = "cal14931-prov";
const MODEL = "cal14931-model";
const LIMIT_ENV = "CONTEXT_LENGTH_CAL14931_PROV";
// 20,000-token window: passes a 12,000 raw estimate, rejects a 25,000 one.
const LIMIT = 20_000;
// 48,000 chars → 12,000 estimated; 100,000 chars → 25,000 estimated.
const PASSING_CHARS = 48_000;
const OVERSIZE_CHARS = 100_000;
// The stub prices 48,000 chars at 3,000 tokens → learned ratio 0.25.
const REPORTED_PROMPT_TOKENS = 3_000;

const originalFetch = globalThis.fetch;
const originalLimitEnv = process.env[LIMIT_ENV];
const originalCalibrationEnv = process.env.OMNIROUTE_ESTIMATOR_CALIBRATION;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function buildRequest(content: string) {
  return {
    body: {
      model: MODEL,
      messages: [{ role: "user", content }],
      stream: false,
    },
    modelInfo: {
      provider: PROVIDER,
      model: MODEL,
      extendedContext: false,
    },
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: { baseUrl: "https://cal14931.example.test" },
    },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: {
        model: MODEL,
        messages: [{ role: "user", content }],
        stream: false,
      },
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
    log: {
      debug() {},
      info() {},
      warn() {},
      error() {},
    },
  };
}

test.before(async () => {
  await resetStorage();
  process.env[LIMIT_ENV] = String(LIMIT);
  delete process.env.OMNIROUTE_ESTIMATOR_CALIBRATION;
  resetEstimatorCalibrationForTests();
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        choices: [{ message: { content: "stub ok" } }],
        usage: { prompt_tokens: REPORTED_PROMPT_TOKENS, completion_tokens: 10 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
});

test.after(() => {
  globalThis.fetch = originalFetch;
  if (originalLimitEnv === undefined) {
    delete process.env[LIMIT_ENV];
  } else {
    process.env[LIMIT_ENV] = originalLimitEnv;
  }
  if (originalCalibrationEnv !== undefined) {
    process.env.OMNIROUTE_ESTIMATOR_CALIBRATION = originalCalibrationEnv;
  }
  resetEstimatorCalibrationForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#14931: three provider reports recalibrate the guard for the same shape", async () => {
  // Phase 1 — warm-up: three requests that already fit report a 4x-smaller
  // actual prompt_tokens, teaching the (provider, model, no-tools) bucket.
  for (let i = 0; i < 3; i++) {
    const result = await handleChatCore(buildRequest("x".repeat(PASSING_CHARS)));
    assert.equal(result.success, true, `warm-up request ${i + 1} should succeed`);
  }

  // Phase 2 — the previously-fatal shape: raw estimate 25,000 > limit 20,000,
  // calibrated ≈ 6,250 → the guard must let it through to the stubbed upstream.
  const calibrated = await handleChatCore(buildRequest("x".repeat(OVERSIZE_CHARS)));
  assert.equal(
    calibrated.success,
    true,
    "after calibration the oversized-raw-estimate request must pass the guard"
  );

  // Phase 3 — counterfactual: same request with calibration disabled is still
  // rejected, proving the pass came from the learned factor (not a wider limit).
  resetEstimatorCalibrationForTests();
  process.env.OMNIROUTE_ESTIMATOR_CALIBRATION = "off";
  try {
    const uncalibrated = await handleChatCore(buildRequest("x".repeat(OVERSIZE_CHARS)));
    assert.equal(uncalibrated.success, false, "uncalibrated estimate must still be rejected");
    const failure = uncalibrated as { success: false; error: string; rawMessage?: string };
    const message = failure.rawMessage ?? failure.error;
    assert.match(message, /limit 20000\b/, `expected a context-window rejection; got: ${message}`);
  } finally {
    delete process.env.OMNIROUTE_ESTIMATOR_CALIBRATION;
  }
});
