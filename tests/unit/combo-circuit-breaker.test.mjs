import test from "node:test";
import assert from "node:assert/strict";

// Reset circuit breaker registry between tests
const { CircuitBreaker, getCircuitBreaker, getAllCircuitBreakerStatuses, STATE } =
  await import("../../src/shared/utils/circuitBreaker.ts");

const { handleComboChat, getComboFromData } = await import("../../open-sse/services/combo.ts");
const { normalizeComboStep } = await import("../../src/lib/combos/steps.ts");

const { PROVIDER_PROFILES } = await import("../../open-sse/config/constants.ts");

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Create a mock logger */
function mockLog() {
  const entries = [];
  return {
    info: (tag, msg) => entries.push({ level: "info", tag, msg }),
    warn: (tag, msg) => entries.push({ level: "warn", tag, msg }),
    error: (tag, msg) => entries.push({ level: "error", tag, msg }),
    entries,
  };
}

/** Create a handleSingleModel that returns given status codes in sequence */
function mockHandler(statusSequence) {
  let callIndex = 0;
  return async (body, modelStr) => {
    const status = statusSequence[callIndex] ?? statusSequence[statusSequence.length - 1] ?? 200;
    callIndex++;
    if (status === 200) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }
    return new Response(JSON.stringify({ error: { message: `Error ${status}` } }), {
      status,
      statusText: `Error ${status}`,
    });
  };
}

function getComboTargetBreakerKey(combo, index = 0) {
  const step = normalizeComboStep(combo.models[index], {
    comboName: combo.name,
    index,
  });
  return `combo:${combo.name}:${step.id}`;
}

// ─── Circuit Breaker Integration Tests ──────────────────────────────────────
// NOTE: combo.ts uses the full model string (e.g. "combo:groq/llama-3.3-70b")
// as the circuit breaker key, not just the provider prefix.

test("handleComboChat: circuit breaker opens after repeated 502 errors", async () => {
  const combo = {
    name: "test-combo",
    models: [{ model: "groq/llama-3.3-70b", weight: 0 }],
    strategy: "priority",
    config: { maxRetries: 0 },
  };
  const breakerKey = getComboTargetBreakerKey(combo);
  const breaker = getCircuitBreaker(breakerKey, {
    failureThreshold: PROVIDER_PROFILES.apikey.circuitBreakerThreshold,
    resetTimeout: 60000,
  });
  breaker.reset();

  const log = mockLog();

  // Send requests that all fail with 502 until the API-key profile threshold is reached.
  for (let i = 0; i < PROVIDER_PROFILES.apikey.circuitBreakerThreshold; i++) {
    await handleComboChat({
      body: {},
      combo,
      handleSingleModel: mockHandler([502]),
      isModelAvailable: () => true,
      log,
      settings: null,
      allCombos: null,
    });
  }

  // Breaker should now be OPEN
  const status = breaker.getStatus();
  console.log("=== BREAKER STATUS AFTER THRESHOLD CALLS ===", status);
  assert.equal(
    status.state,
    STATE.OPEN,
    "Breaker should be OPEN after the API-key failure threshold is reached"
  );
  assert.equal(
    status.failureCount,
    PROVIDER_PROFILES.apikey.circuitBreakerThreshold,
    "Failure count should match the API-key profile threshold"
  );
});

test("handleComboChat: skips models with open circuit breaker", async () => {
  // Set up: groq breaker is OPEN, fireworks breaker is CLOSED
  const combo = {
    name: "test-skip-combo",
    models: [
      { model: "groq/llama-3.3-70b", weight: 0 },
      { model: "fireworks/deepseek-v3p1", weight: 0 },
    ],
    strategy: "priority",
  };
  const groqBreakerKey = getComboTargetBreakerKey(combo, 0);
  const groqBreaker = getCircuitBreaker(groqBreakerKey, {
    failureThreshold: 3,
    resetTimeout: 60000,
  });
  groqBreaker.reset();
  // Force open the breaker
  groqBreaker._onFailure();
  groqBreaker._onFailure();
  groqBreaker._onFailure();
  assert.equal(groqBreaker.getStatus().state, STATE.OPEN);

  const fireworksBreakerKey = getComboTargetBreakerKey(combo, 1);
  const fireworksBreaker = getCircuitBreaker(fireworksBreakerKey, {
    failureThreshold: 5,
    resetTimeout: 30000,
  });
  fireworksBreaker.reset();

  const log = mockLog();

  const result = await handleComboChat({
    body: {},
    combo,
    handleSingleModel: mockHandler([200]), // fireworks will succeed
    isModelAvailable: () => true,
    log,
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true, "Should succeed via fireworks fallback");

  // Check logs show groq was skipped
  const skipLog = log.entries.find(
    (e) => e.msg.includes("circuit breaker OPEN") && e.msg.includes("groq")
  );
  assert.ok(skipLog, "Should log that groq was skipped due to breaker");
});

test("handleComboChat: returns 503 when all breakers are open", async () => {
  const combo = {
    name: "test-all-open",
    models: [
      { model: "groq/llama-3.3-70b", weight: 0 },
      { model: "fireworks/deepseek-v3p1", weight: 0 },
    ],
    strategy: "priority",
  };

  // Open both breakers explicitly before invoking the combo.
  const groqBreaker = getCircuitBreaker(getComboTargetBreakerKey(combo, 0), {
    failureThreshold: 3,
    resetTimeout: 60000,
  });
  groqBreaker.reset();
  groqBreaker._onFailure();
  groqBreaker._onFailure();
  groqBreaker._onFailure();
  assert.equal(groqBreaker.getStatus().state, STATE.OPEN);

  const fireworksBreaker = getCircuitBreaker(getComboTargetBreakerKey(combo, 1), {
    failureThreshold: 5,
    resetTimeout: 30000,
  });
  fireworksBreaker.reset();
  for (let i = 0; i < 5; i++) fireworksBreaker._onFailure();
  assert.equal(fireworksBreaker.getStatus().state, STATE.OPEN);

  const log = mockLog();

  const result = await handleComboChat({
    body: {},
    combo,
    handleSingleModel: mockHandler([200]), // Won't be called
    isModelAvailable: () => true,
    log,
    settings: null,
    allCombos: null,
  });

  assert.equal(result.status, 503, "Should return 503");
  const body = await result.json();
  assert.ok(body.error.message.includes("circuit breakers open"), "Should mention breakers");
});

test("handleComboChat: 429 errors also trigger circuit breaker", async () => {
  const combo = {
    name: "test-429",
    models: [{ model: "cerebras/llama-3.3-70b", weight: 0 }],
    strategy: "priority",
  };
  const breakerKey = getComboTargetBreakerKey(combo);
  const breaker = getCircuitBreaker(breakerKey, {
    failureThreshold: 5,
    resetTimeout: 30000,
  });
  breaker.reset();

  const log = mockLog();

  // 5 x 429 should open breaker
  for (let i = 0; i < 5; i++) {
    await handleComboChat({
      body: {},
      combo,
      handleSingleModel: mockHandler([429]),
      isModelAvailable: () => true,
      log,
      settings: null,
      allCombos: null,
    });
  }

  assert.equal(breaker.getStatus().state, STATE.OPEN, "429s should open breaker");
});

test("circuit breaker uses provider profile thresholds", () => {
  // OAuth providers (e.g. claude) should have lower threshold
  assert.equal(PROVIDER_PROFILES.oauth.circuitBreakerThreshold, 3);
  // API providers (e.g. groq) should have higher threshold
  assert.equal(PROVIDER_PROFILES.apikey.circuitBreakerThreshold, 5);
});
