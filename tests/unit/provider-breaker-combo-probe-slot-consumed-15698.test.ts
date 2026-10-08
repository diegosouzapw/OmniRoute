/**
 * #15698: in HALF_OPEN a combo dispatch goes through breaker.execute(), which consumes the
 * single probe slot. The probe must settle the provider breaker (via classifyProbeResult)
 * and the later recordProviderSuccess(provider, connectionId) must not leave it HALF_OPEN.
 */
import { test, after } from "node:test";
import assert from "node:assert/strict";
import {
  getCircuitBreaker,
  resetAllCircuitBreakers,
} from "../../src/shared/utils/circuitBreaker.ts";
import { recordProviderSuccess } from "../../open-sse/services/accountFallback.ts";
import { classifyProviderBreakerResult } from "../../src/sse/handlers/chatPredicates.ts";
import { classifyProviderProbeResult } from "../../src/sse/handlers/providerProbeClassification.ts";

after(() => resetAllCircuitBreakers());

const unique = () => `p15698-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

async function openThenHalfOpen(provider: string) {
  const breaker = getCircuitBreaker(provider, { failureThreshold: 1, resetTimeout: 80 });
  breaker._onFailure();
  assert.equal(breaker.state, "OPEN");
  await new Promise((r) => setTimeout(r, 120));
  assert.equal(breaker.canExecute(), true);
  assert.equal(breaker.state, "HALF_OPEN");
  return breaker;
}

// Mirrors executeChatWithBreaker (chatHelpers.ts) for a combo dispatch.
const comboDispatch = (breaker: ReturnType<typeof getCircuitBreaker>) =>
  breaker.execute(async () => ({ success: true, status: 200 }), {
    classifyResult: (r) => classifyProviderBreakerResult(r, true, false),
    classifyProbeResult: classifyProviderProbeResult,
  });

test("combo probe success + recordProviderSuccess(provider, connectionId) closes the provider breaker", async () => {
  const provider = unique();
  const breaker = await openThenHalfOpen(provider);
  await comboDispatch(breaker);
  recordProviderSuccess(provider, "conn-1", { providerProbeSettled: true });
  assert.equal(breaker.state, "CLOSED", "provider breaker stuck in HALF_OPEN (#15698)");
});

test("combo probe success without connectionId closes the provider breaker", async () => {
  const provider = unique();
  const breaker = await openThenHalfOpen(provider);
  await comboDispatch(breaker);
  recordProviderSuccess(provider, undefined, { providerProbeSettled: true });
  assert.equal(breaker.state, "CLOSED");
});
