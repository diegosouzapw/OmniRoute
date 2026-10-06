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
  LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE,
  RATE_LIMIT_EXECUTION_TIMEOUT_CODE,
  RATE_LIMIT_QUEUE_WEDGED_CODE,
  getTrustedLocalRateLimitError,
  getTrustedLocalRateLimitResponse,
  inheritTrustedLocalRateLimitResponse,
  markLocalRateLimitError,
  markTrustedLocalRateLimitResponse,
} = await import("../../open-sse/services/rateLimitManager/errors.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const providerCooldown = await import("../../open-sse/services/providerCooldownTracker.ts");
const rateLimitSemaphore = await import("../../open-sse/services/rateLimitSemaphore.ts");
const { createStreamingErrorResult } =
  await import("../../open-sse/handlers/chatCore/streamErrorResult.ts");
const { shouldTripProviderBreakerForResult } =
  await import("../../src/sse/handlers/chatPredicates.ts");

const LOCAL_ERROR_MESSAGE = "OmniRoute repaired a local limiter queue";

function createLocalLimiterSseResponse(connectionId: string, code = RATE_LIMIT_QUEUE_WEDGED_CODE) {
  const error = markLocalRateLimitError(new Error(LOCAL_ERROR_MESSAGE), code);
  const { response } = createStreamingErrorResult(
    getTrustedLocalRateLimitError(error)?.status ?? 503,
    LOCAL_ERROR_MESSAGE,
    code,
    "rate_limit_queue_wedged"
  );
  response.headers.set("X-OmniRoute-Selected-Connection-Id", connectionId);
  return markTrustedLocalRateLimitResponse(response, error);
}

function createUpstreamCollisionResponse(connectionId: string) {
  return new Response(
    JSON.stringify({
      error: {
        message: "Provider emitted a colliding code",
        code: RATE_LIMIT_QUEUE_WEDGED_CODE,
        type: "rate_limit_queue_wedged",
      },
    }),
    {
      status: 503,
      headers: {
        "content-type": "application/json",
        "X-OmniRoute-Selected-Connection-Id": connectionId,
      },
    }
  );
}

function createSuccessResponse(connectionId: string) {
  return new Response(JSON.stringify({ choices: [{ message: { content: "fallback ok" } }] }), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "X-OmniRoute-Selected-Connection-Id": connectionId,
    },
  });
}

const log = { info() {}, warn() {}, error() {}, debug() {} };
const settings = {
  modelLockout: {
    enabled: true,
    errorCodes: [503],
    baseCooldownMs: 3_000,
    maxCooldownMs: 5_000,
    maxBackoffSteps: 10,
    useExponentialBackoff: true,
  },
};

test.afterEach(() => {
  accountFallback.clearAllModelLockouts();
  accountFallback.clearProviderFailure("openai");
  providerCooldown.clearCooldownState();
  rateLimitSemaphore.resetAll();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  accountFallback.clearAllModelLockouts();
  accountFallback.clearProviderFailure("openai");
  providerCooldown.clearCooldownState();
  rateLimitSemaphore.resetAll();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("execution-timeout classification requires trusted provenance; queue codes classify by string (#9164/#9342)", () => {
  const executionError = markLocalRateLimitError(
    new Error("local execution expiration"),
    RATE_LIMIT_EXECUTION_TIMEOUT_CODE
  );
  const localResponse = markTrustedLocalRateLimitResponse(
    new Response("local", { status: 504 }),
    executionError
  );
  const collisionResponse = createUpstreamCollisionResponse("collision-conn");

  assert.deepEqual(getTrustedLocalRateLimitError(executionError), {
    code: RATE_LIMIT_EXECUTION_TIMEOUT_CODE,
    status: 504,
  });
  assert.equal(getTrustedLocalRateLimitResponse(localResponse)?.status, 504);
  const wrappedResponse = inheritTrustedLocalRateLimitResponse(
    localResponse,
    new Response("wrapped local", { status: 504 })
  );
  assert.equal(getTrustedLocalRateLimitResponse(wrappedResponse)?.status, 504);
  assert.equal(
    isRequestScopedUpstreamFailure({ code: RATE_LIMIT_EXECUTION_TIMEOUT_CODE }),
    false,
    "an upstream-controlled code string must not establish local provenance"
  );
  assert.equal(
    isComboRequestScopedFailure(localResponse, "local execution expiration", {
      code: RATE_LIMIT_EXECUTION_TIMEOUT_CODE,
    }),
    true
  );
  // #9164 (3898305df0) deliberately widened the contract: the rate_limit_queue_*
  // code strings are OmniRoute-owned backpressure codes and classify as
  // request-scoped even without WeakMap provenance (an upstream collision is
  // accepted as fail-safe: worst case a colliding provider 503 skips health
  // penalties, it never amplifies into fallback storms).
  assert.equal(
    isComboRequestScopedFailure(collisionResponse, "provider collision", {
      code: RATE_LIMIT_QUEUE_WEDGED_CODE,
    }),
    true
  );
  assert.equal(
    shouldTripProviderBreakerForResult(
      {
        status: 504,
        response: localResponse,
        errorCode: RATE_LIMIT_EXECUTION_TIMEOUT_CODE,
      },
      false,
      false
    ),
    false
  );
  assert.equal(
    shouldTripProviderBreakerForResult(
      {
        status: 503,
        response: collisionResponse,
        errorCode: RATE_LIMIT_QUEUE_WEDGED_CODE,
      },
      false,
      false
    ),
    false,
    "#9342 (47c819df66): RATE_LIMIT_QUEUE_* codes are OmniRoute backpressure and never trip the provider breaker, provenance or not"
  );
  assert.equal(
    shouldSkipConnDisable(
      {
        status: 504,
        response: localResponse,
        errorCode: RATE_LIMIT_EXECUTION_TIMEOUT_CODE,
      },
      false,
      false,
      "openai"
    ),
    true
  );
  assert.equal(
    shouldSkipConnDisable(
      {
        status: 503,
        response: collisionResponse,
        errorCode: RATE_LIMIT_QUEUE_WEDGED_CODE,
      },
      false,
      false,
      "openai"
    ),
    true,
    "#9164: the queue-code string alone marks the failure request-scoped, so the connection is not disabled"
  );
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: false,
      status: 504,
      sameProviderNext: false,
      skipProviderBreaker: false,
      requestScopedFailure: true,
      error: executionError,
      isProxyUnreachable: false,
    }),
    false
  );
});

test("legacy queue-timeout code classifies as request-scoped with or without provenance (#9164)", () => {
  const untrusted = new Response("legacy collision", { status: 503 });
  const legacyError = markLocalRateLimitError(
    new Error("legacy local timeout"),
    LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE
  );
  const trusted = markTrustedLocalRateLimitResponse(
    new Response("legacy local timeout", { status: 503 }),
    legacyError
  );

  // #9164 added rate_limit_queue_timeout to REQUEST_SCOPED_UPSTREAM_ERROR_CODES,
  // so the code string is sufficient — trusted provenance is no longer required
  // for this classification (it still works, next assertion).
  assert.equal(
    isComboRequestScopedFailure(untrusted, "legacy collision", {
      code: LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE,
    }),
    true
  );
  assert.equal(
    isComboRequestScopedFailure(trusted, "legacy local timeout", {
      code: LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE,
    }),
    true
  );
});

for (const strategy of ["priority", "round-robin"] as const) {
  test(`${strategy} fallback preserves all health state for a trusted local SSE failure`, async () => {
    const connection = await providersDb.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: `local-wedge-${strategy}`,
      apiKey: `sk-local-wedge-${strategy}`,
      isActive: true,
      testStatus: "active",
      rateLimitedUntil: null,
      backoffLevel: 0,
      providerSpecificData: {},
    });
    const models = [
      {
        kind: "model",
        model: "openai/gpt-local-first",
        connectionId: connection.id,
      },
      {
        kind: "model",
        model: "openai/gpt-local-second",
        connectionId: connection.id,
      },
    ];
    const calls: string[] = [];

    const result = await handleComboChat({
      body: {},
      combo: {
        name: `local-wedge-${strategy}-combo`,
        strategy,
        models,
        config: {
          maxRetries: 1,
          retryDelayMs: 0,
          fallbackDelayMs: 0,
          maxConcurrency: 1,
        },
      },
      handleSingleModel: async (_body, modelStr) => {
        calls.push(modelStr);
        return calls.length === 1
          ? createLocalLimiterSseResponse(connection.id)
          : createSuccessResponse(connection.id);
      },
      isModelAvailable: async () => true,
      log,
      settings,
      allCombos: null,
    });

    assert.equal(result.status, 200, `attempted targets: ${calls.join(", ")}`);
    assert.deepEqual(calls, ["openai/gpt-local-first", "openai/gpt-local-second"]);
    assert.equal(accountFallback.isModelLocked("openai", connection.id, "gpt-local-first"), false);
    assert.equal(
      accountFallback.getProviderBreakerState("openai")?.failureCount ?? 0,
      0,
      "local failure must not increment the provider breaker"
    );
    assert.equal(
      providerCooldown.isProviderInCooldown("openai", connection.id),
      false,
      "local failure must not enter provider cooldown"
    );
    const semaphoreStates = Object.values(rateLimitSemaphore.getStats());
    assert.equal(
      semaphoreStates.some((state) => state.rateLimitedUntil !== null),
      false,
      "local failure must not cool a round-robin semaphore"
    );
    const storedConnection = await providersDb.getProviderConnectionById(connection.id);
    assert.equal(storedConnection?.testStatus, "active");
    assert.equal(storedConnection?.rateLimitedUntil ?? null, null);
  });
}

test("an upstream body colliding with local queue codes is treated as local backpressure (#9164)", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "upstream-local-code-collision",
    apiKey: "sk-upstream-local-code-collision",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "upstream-local-code-collision-combo",
      strategy: "priority",
      models: [
        {
          kind: "model",
          model: "openai/gpt-collision",
          connectionId: connection.id,
        },
      ],
      config: { maxRetries: 1, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async () => createUpstreamCollisionResponse(connection.id),
    isModelAvailable: async () => true,
    log,
    settings,
    allCombos: null,
  });

  assert.equal(result.status, 503);
  // #9164 (3898305df0): isLocalQueueCapacityErrorBody matches the queue-code
  // string in the body, so the combo returns the 503 without upstream fallback
  // and without counting it toward provider health — the collision is accepted
  // as fail-safe (no breaker/cooldown penalties, but also no retry amplification).
  assert.equal(
    accountFallback.getProviderBreakerState("openai")?.failureCount ?? 0,
    0,
    "a queue-code collision body is classified local backpressure and skips breaker accounting"
  );
  const storedConnection = await providersDb.getProviderConnectionById(connection.id);
  assert.equal(storedConnection?.testStatus, "active", "the connection must not be disabled");
});
