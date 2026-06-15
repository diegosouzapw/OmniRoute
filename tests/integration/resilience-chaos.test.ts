import { test, before, after, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  getCircuitBreaker,
  resetAllCircuitBreakers,
  STATE,
} from "../../src/shared/utils/circuitBreaker.ts";
import { checkFallbackError } from "../../open-sse/services/accountFallback.ts";
import { startFaultyUpstream, type FaultyUpstream } from "../helpers/faultyUpstream.ts";

const RUN = process.env.RUN_CHAOS_INT === "1";

let up: FaultyUpstream;
before(async () => {
  up = await startFaultyUpstream({ kind: "ok" });
});
after(async () => {
  await up?.stop();
});
afterEach(() => {
  resetAllCircuitBreakers();
});

test("breaker OPENs after real timeouts, then refreshes to HALF_OPEN", { skip: !RUN }, async () => {
  up.setMode({ kind: "timeout" });
  const breaker = getCircuitBreaker("chaos-timeout", {
    failureThreshold: 3,
    resetTimeout: 300,
    isFailure: () => true,
  });
  for (let i = 0; i < 3; i++) {
    await assert.rejects(() =>
      breaker.execute(() => fetch(up.url, { signal: AbortSignal.timeout(120) }))
    );
  }
  assert.equal(breaker.canExecute(), false);
  assert.equal(breaker.getStatus().state, STATE.OPEN);
  await new Promise((r) => setTimeout(r, 330));
  assert.equal(breaker.getStatus().state, STATE.HALF_OPEN);
  assert.equal(breaker.canExecute(), true);
});

test("breaker trips on a real connection reset", { skip: !RUN }, async () => {
  up.setMode({ kind: "reset" });
  const breaker = getCircuitBreaker("chaos-reset", {
    failureThreshold: 2,
    resetTimeout: 300,
    isFailure: () => true,
  });
  for (let i = 0; i < 2; i++) {
    await assert.rejects(() => breaker.execute(() => fetch(up.url)));
  }
  assert.equal(breaker.getStatus().state, STATE.OPEN);
});

test("checkFallbackError classifies a real 503 response as recoverable fallback", { skip: !RUN }, async () => {
  up.setMode({ kind: "status", code: 503, body: "service unavailable" });
  const res = await fetch(up.url);
  const text = await res.text();
  const decision = checkFallbackError(res.status, text, 0, null, "chaos-provider", res.headers);
  assert.equal(decision.shouldFallback, true);
  assert.ok(decision.cooldownMs > 0, "503 should yield a positive cooldown");
});
