import test from "node:test";
import assert from "node:assert/strict";

// ═════════════════════════════════════════════════════
//  FASE-04: Error Handling & Observability Tests
//  Tests for circuitBreaker, requestTimeout, correlationId
// ═════════════════════════════════════════════════════

// ─── Circuit Breaker Tests ────────────────────────────

import {
  CircuitBreaker,
  CircuitBreakerOpenError,
  STATE,
} from "../../src/shared/utils/circuitBreaker.js";

const cbSuffix = `-${Date.now()}`;

test("CircuitBreaker: starts in CLOSED state", () => {
  const cb = new CircuitBreaker(`test-closed${cbSuffix}`);
  assert.equal(cb.getStatus().state, STATE.CLOSED);
});

test("CircuitBreaker: stays CLOSED on success", async () => {
  const cb = new CircuitBreaker(`test-success${cbSuffix}`);
  const result = await cb.execute(async () => "ok");
  assert.equal(result, "ok");
  assert.equal(cb.getStatus().state, STATE.CLOSED);
});

test("CircuitBreaker: opens after failure threshold", async () => {
  const cb = new CircuitBreaker(`test-open${cbSuffix}`, { failureThreshold: 3 });

  for (let i = 0; i < 3; i++) {
    try {
      await cb.execute(async () => {
        throw new Error("fail");
      });
    } catch {}
  }

  assert.equal(cb.getStatus().state, STATE.OPEN);
  assert.equal(cb.getStatus().failureCount, 3);
});

test("CircuitBreaker: rejects requests when open", async () => {
  const cb = new CircuitBreaker(`test-reject${cbSuffix}`, {
    failureThreshold: 1,
    resetTimeout: 60000,
  });

  try {
    await cb.execute(async () => {
      throw new Error("fail");
    });
  } catch {}

  await assert.rejects(
    () => cb.execute(async () => "should not run"),
    (err) => err instanceof CircuitBreakerOpenError
  );
});

test("CircuitBreaker: transitions to HALF_OPEN after reset timeout", async () => {
  const cb = new CircuitBreaker(`test-halfopen${cbSuffix}`, {
    failureThreshold: 1,
    resetTimeout: 10,
  });

  try {
    await cb.execute(async () => {
      throw new Error("fail");
    });
  } catch {}

  assert.equal(cb.state, STATE.OPEN);

  // Wait for reset timeout
  await new Promise((r) => setTimeout(r, 15));

  // Next call should transition to HALF_OPEN
  const result = await cb.execute(async () => "recovered");
  assert.equal(result, "recovered");
  assert.equal(cb.state, STATE.CLOSED);
});

test("CircuitBreaker: reset() forces back to CLOSED", () => {
  const cb = new CircuitBreaker(`test-reset${cbSuffix}`, { failureThreshold: 1 });
  cb.state = STATE.OPEN;
  cb.failureCount = 5;
  cb.reset();
  assert.equal(cb.state, STATE.CLOSED);
  assert.equal(cb.failureCount, 0);
});

test("CircuitBreaker: calls onStateChange callback", async () => {
  const changes = [];
  const cb = new CircuitBreaker(`test-callback${cbSuffix}`, {
    failureThreshold: 1,
    onStateChange: (name, from, to) => changes.push({ name, from, to }),
  });

  try {
    await cb.execute(async () => {
      throw new Error("fail");
    });
  } catch {}

  assert.ok(changes.length > 0);
  assert.equal(changes[0].from, STATE.CLOSED);
  assert.equal(changes[0].to, STATE.OPEN);
});

// ─── Request Timeout Tests ───────────────────────────

import { withTimeout, getProviderTimeout } from "../../src/shared/utils/requestTimeout.js";

test("requestTimeout: withTimeout resolves before timeout", async () => {
  const result = await withTimeout(async () => "fast", 1000, "test");
  assert.equal(result, "fast");
});

test("requestTimeout: withTimeout rejects on timeout", async () => {
  await assert.rejects(
    () => withTimeout(() => new Promise((r) => setTimeout(r, 500)), 10, "slow-op"),
    (err) => err.name === "TimeoutError"
  );
});

test("requestTimeout: getProviderTimeout returns default for unknown", () => {
  const timeout = getProviderTimeout("unknown-provider");
  assert.equal(timeout, 60000);
});

test("requestTimeout: getProviderTimeout returns provider-specific value", () => {
  const groqTimeout = getProviderTimeout("groq");
  assert.equal(groqTimeout, 30000);
  const claudeTimeout = getProviderTimeout("claude");
  assert.equal(claudeTimeout, 90000);
});

// ─── Correlation ID Tests ────────────────────────────

import { getCorrelationId, runWithCorrelation } from "../../src/shared/middleware/correlationId.js";

test("correlationId: getCorrelationId returns undefined outside context", () => {
  assert.equal(getCorrelationId(), undefined);
});

test("correlationId: runWithCorrelation provides ID in context", () => {
  const id = "test-correlation-123";
  runWithCorrelation(id, () => {
    assert.equal(getCorrelationId(), id);
  });
});

test("correlationId: runWithCorrelation generates ID when null", () => {
  runWithCorrelation(null, () => {
    const id = getCorrelationId();
    assert.ok(id);
    assert.ok(typeof id === "string");
    assert.ok(id.length > 0);
  });
});

test("correlationId: nested contexts are isolated", () => {
  runWithCorrelation("outer", () => {
    assert.equal(getCorrelationId(), "outer");
    runWithCorrelation("inner", () => {
      assert.equal(getCorrelationId(), "inner");
    });
    assert.equal(getCorrelationId(), "outer");
  });
});
