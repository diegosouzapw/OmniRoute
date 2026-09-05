import test from "node:test";
import assert from "node:assert/strict";
import { handleComboChat } from "../../../open-sse/services/combo.ts";
import { getCircuitBreaker, STATE } from "../../../src/shared/utils/circuitBreaker.js";

function okResponse() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

test("#9630: combo returns 503 when circuit breaker is OPEN but other healthy targets exist", async () => {
  const cb = getCircuitBreaker("openai");
  cb.state = STATE.OPEN;
  cb.resetTimeout = 60000;
  cb.failureCount = 5;
  cb.failureThreshold = 3;
  cb.lastFailureTime = Date.now();

  const result = await handleComboChat({
    body: { messages: [{ role: "user", content: "hello" }] },
    combo: {
      name: "repro-9630",
      strategy: "priority",
      models: ["openai/gpt-4", "anthropic/claude-opus-5"],
    },
    handleSingleModel: async (_body, modelStr) => {
      assert.equal(
        modelStr,
        "anthropic/claude-opus-5",
        "should skip openai breaker and try anthropic"
      );
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: { info: () => {}, warn: () => {}, debug: () => {}, error: () => {} },
    settings: null,
    relayOptions: null,
    allCombos: null,
  });

  assert.ok(result.ok, "should succeed via anthropic fallback when openai breaker is open");
});

test("#9630: combo returns truthful error, not false ALL_ACCOUNTS_INACTIVE, when ALL targets are breaker-open", async () => {
  const cb = getCircuitBreaker("openai");
  cb.state = STATE.OPEN;
  cb.resetTimeout = 60000;
  cb.failureCount = 5;
  cb.failureThreshold = 3;
  cb.lastFailureTime = Date.now();

  const cb2 = getCircuitBreaker("anthropic");
  cb2.state = STATE.OPEN;
  cb2.resetTimeout = 60000;
  cb2.failureCount = 5;
  cb2.failureThreshold = 3;
  cb2.lastFailureTime = Date.now();

  const result = await handleComboChat({
    body: { messages: [{ role: "user", content: "hello" }] },
    combo: {
      name: "repro-9630-all-breaker",
      strategy: "priority",
      models: ["openai/gpt-4", "anthropic/claude-opus-5"],
    },
    handleSingleModel: async () => {
      throw new Error("should not be called");
    },
    isModelAvailable: async () => true,
    log: { info: () => {}, warn: () => {}, debug: () => {}, error: () => {} },
    settings: {
      resilienceSettings: {
        comboCooldownWait: { enabled: false },
      },
    },
    relayOptions: null,
    allCombos: null,
  });

  assert.equal(result.status, 503);
  const body = await result.json();
  // The diagnostic should NOT claim ALL_ACCOUNTS_INACTIVE when no real dispatch was attempted
  assert.notEqual(
    body.error?.code,
    "ALL_ACCOUNTS_INACTIVE",
    "should not claim ALL_ACCOUNTS_INACTIVE when all targets were gated by pre-dispatch checks"
  );
});
