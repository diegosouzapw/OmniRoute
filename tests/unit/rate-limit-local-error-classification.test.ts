import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rl-local-errors-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-rate-limit-local-error-secret";

// Dynamic imports are required because DATA_DIR must be set before DB modules evaluate.
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const {
  isComboRequestScopedFailure,
  isRequestScopedUpstreamFailure,
  shouldRecordProviderBreakerFailure,
  shouldSkipConnDisable,
} = await import("../../open-sse/services/combo/comboPredicates.ts");
const {
  RATE_LIMIT_EXECUTION_TIMEOUT_CODE,
  RATE_LIMIT_QUEUE_WEDGED_CODE,
  getLocalRateLimitFailureStatus,
} = await import("../../open-sse/services/rateLimitManager/errors.ts");
const { clearAllModelLockouts, isModelLocked } =
  await import("../../open-sse/services/accountFallback.ts");
const { shouldTripProviderBreakerForResult } =
  await import("../../src/sse/handlers/chatPredicates.ts");

const LOCAL_WEDGE_RESULT = {
  status: 503,
  errorCode: RATE_LIMIT_QUEUE_WEDGED_CODE,
  errorType: "rate_limit_queue_wedged",
};

test.afterEach(() => {
  clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("local limiter failures bypass every upstream-failure predicate", () => {
  assert.equal(getLocalRateLimitFailureStatus(RATE_LIMIT_QUEUE_WEDGED_CODE), 503);
  assert.equal(getLocalRateLimitFailureStatus(RATE_LIMIT_EXECUTION_TIMEOUT_CODE), 504);
  assert.equal(isRequestScopedUpstreamFailure({ code: RATE_LIMIT_EXECUTION_TIMEOUT_CODE }), true);
  assert.equal(isRequestScopedUpstreamFailure({ code: RATE_LIMIT_QUEUE_WEDGED_CODE }), true);
  assert.equal(
    isComboRequestScopedFailure(503, "local queue reset", {
      code: RATE_LIMIT_QUEUE_WEDGED_CODE,
    }),
    true
  );
  assert.equal(shouldTripProviderBreakerForResult(LOCAL_WEDGE_RESULT, false, false), false);
  assert.equal(
    shouldSkipConnDisable(LOCAL_WEDGE_RESULT, false, false, "openai"),
    true,
    "a local queue repair must not disable a healthy provider connection"
  );
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: false,
      status: 503,
      sameProviderNext: false,
      skipProviderBreaker: false,
      requestScopedFailure: true,
      error: "local queue reset",
      isProxyUnreachable: false,
    }),
    false
  );
});

test("combo fallback preserves connection health and model lockout state for a local wedge", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "local-wedge-classification",
    apiKey: "sk-test-local-wedge",
    isActive: true,
    testStatus: "active",
    rateLimitedUntil: null,
    backoffLevel: 0,
    providerSpecificData: {},
  });

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "local-wedge-combo",
      strategy: "priority",
      models: ["openai/gpt-4o"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async () =>
      new Response(
        JSON.stringify({
          error: {
            message: "OmniRoute repaired a local limiter queue",
            code: RATE_LIMIT_QUEUE_WEDGED_CODE,
            type: "rate_limit_queue_wedged",
          },
        }),
        {
          status: 503,
          headers: {
            "content-type": "application/json",
            "X-OmniRoute-Selected-Connection-Id": connection.id,
          },
        }
      ),
    isModelAvailable: async () => true,
    log: { info() {}, warn() {}, error() {}, debug() {} },
    settings: {
      modelLockout: {
        enabled: true,
        errorCodes: [503],
        baseCooldownMs: 3_000,
        maxCooldownMs: 5_000,
        maxBackoffSteps: 10,
        useExponentialBackoff: true,
      },
    },
    allCombos: null,
  });

  assert.equal(result.status, 503);
  assert.equal(isModelLocked("openai", connection.id, "gpt-4o"), false);
  const storedConnection = await providersDb.getProviderConnectionById(connection.id);
  assert.equal(storedConnection?.testStatus, "active");
  assert.equal(storedConnection?.rateLimitedUntil ?? null, null);
});
