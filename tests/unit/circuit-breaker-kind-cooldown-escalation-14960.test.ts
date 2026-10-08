/**
 * Regression tests for issue #14960.
 *
 * The per-kind `cooldownByKind` override short-circuited `_effectiveCooldown()`
 * before the `openCycleCount` escalation applied, so a `quota_exhausted`
 * provider re-probed at the same fixed interval (e.g. 1h) forever instead of
 * backing off. The override now gets the same doubling the base resetTimeout
 * gets, capped at `override * maxBackoffMultiplier`.
 *
 * Secondary: `providerCircuitOpenResponse` now surfaces the classified
 * `failure_kind` on the 503 body so operators can tell a quota_exhausted
 * breaker from a generic rate_limit one without reading server logs.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { CircuitBreaker } from "../../src/shared/utils/circuitBreaker.ts";
import { providerCircuitOpenResponse } from "../../open-sse/utils/error.ts";

const uniqueName = (suffix: string) =>
  `cb-test-#14960-${suffix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

test("cooldownByKind override escalates with openCycleCount (#14960)", () => {
  const cb = new CircuitBreaker(uniqueName("kind-escalation"), {
    failureThreshold: 1,
    resetTimeout: 30_000,
    backoffEscalationCount: 2,
    maxBackoffMultiplier: 8,
    cooldownByKind: { quota_exhausted: 60_000 },
  });

  cb._onFailure("quota_exhausted");
  assert.equal(cb.state, "OPEN");
  assert.equal(cb.lastFailureKind, "quota_exhausted");

  // Simulate elapsed time so _effectiveCooldown() is measured, not the wait.
  cb.lastFailureTime = Date.now();

  cb.openCycleCount = 0;
  assert.equal(cb._effectiveCooldown(), 60_000, "override applies pre-escalation");

  cb.openCycleCount = 2;
  assert.equal(
    cb._effectiveCooldown(),
    60_000,
    "openCycleCount <= backoffEscalationCount keeps the flat override"
  );

  cb.openCycleCount = 3;
  assert.equal(cb._effectiveCooldown(), 120_000, "first escalated cycle doubles");

  cb.openCycleCount = 4;
  assert.equal(cb._effectiveCooldown(), 240_000, "second escalated cycle quadruples");

  cb.openCycleCount = 20;
  assert.equal(
    cb._effectiveCooldown(),
    480_000,
    "escalation is capped at override * maxBackoffMultiplier"
  );

  cb.reset();
});

test("kindless failures keep using the escalated base resetTimeout (#14960)", () => {
  const cb = new CircuitBreaker(uniqueName("kindless-escalation"), {
    failureThreshold: 1,
    resetTimeout: 10_000,
    backoffEscalationCount: 1,
    maxBackoffMultiplier: 4,
    cooldownByKind: { quota_exhausted: 60_000 },
  });

  cb._onFailure(); // no kind → override does not apply
  assert.equal(cb.lastFailureKind, null);
  cb.lastFailureTime = Date.now();

  cb.openCycleCount = 1;
  assert.equal(cb._effectiveCooldown(), 10_000);

  cb.openCycleCount = 2;
  assert.equal(cb._effectiveCooldown(), 20_000);

  cb.openCycleCount = 20;
  assert.equal(cb._effectiveCooldown(), 40_000, "capped at resetTimeout * multiplier");

  cb.reset();
});

test("providerCircuitOpenResponse surfaces failure_kind when provided (#14960)", async () => {
  const res = providerCircuitOpenResponse("glm", 60, "quota_exhausted");
  assert.equal(res.status, 503);
  const body = JSON.parse(await res.text());
  assert.equal(body.error.code, "provider_circuit_open");
  assert.equal(body.error.failure_kind, "quota_exhausted");

  const legacy = providerCircuitOpenResponse("glm", 60);
  const legacyBody = JSON.parse(await legacy.text());
  assert.equal(legacyBody.error.failure_kind, undefined);
});
