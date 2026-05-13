/**
 * Tests for circuit breaker per-failure-kind cooldowns (Issue #2100).
 *
 * Each test creates a uniquely-named breaker so SQLite-backed state from
 * `loadCircuitBreakerState()` cannot leak between tests when run in any
 * order or with --test-concurrency > 1.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  CircuitBreaker,
  resetAllCircuitBreakers,
  getCircuitBreaker,
} from "../../src/shared/utils/circuitBreaker.ts";
import type { FailureKind } from "../../src/shared/utils/classify429.ts";

const uniqueName = (suffix: string) =>
  `cb-test-#2100-${suffix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

test("default behavior unchanged when neither cooldownByKind nor classifyError is set", () => {
  const cb = new CircuitBreaker(uniqueName("legacy"), {
    failureThreshold: 2,
    resetTimeout: 30_000,
  });
  cb._onFailure();
  cb._onFailure();
  assert.equal(cb.state, "OPEN");
  assert.equal(cb.lastFailureKind, null);
  // Cooldown is the legacy resetTimeout — not biased by kind.
  const t = cb._timeUntilReset();
  assert.ok(t > 29_000 && t <= 30_000, `expected ~30s, got ${t}`);
  cb.reset();
});

test("cooldownByKind: quota_exhausted gets longer cooldown than rate_limit", () => {
  const cb = new CircuitBreaker(uniqueName("kind-cooldown"), {
    failureThreshold: 1,
    resetTimeout: 30_000,
    cooldownByKind: {
      rate_limit: 60_000,
      quota_exhausted: 3_600_000,
    },
  });

  cb._onFailure("rate_limit");
  assert.equal(cb.state, "OPEN");
  assert.equal(cb.lastFailureKind, "rate_limit");
  const tRate = cb._timeUntilReset();
  assert.ok(tRate > 59_000 && tRate <= 60_000, `rate_limit cooldown: expected ~60s, got ${tRate}`);

  cb.reset();
  cb._onFailure("quota_exhausted");
  const tQuota = cb._timeUntilReset();
  assert.ok(
    tQuota > 3_599_000 && tQuota <= 3_600_000,
    `quota_exhausted cooldown: expected ~3600s, got ${tQuota}`
  );

  cb.reset();
});

test("cooldownByKind falls back to resetTimeout when no override for the kind", () => {
  const cb = new CircuitBreaker(uniqueName("partial-cooldown"), {
    failureThreshold: 1,
    resetTimeout: 45_000,
    cooldownByKind: {
      quota_exhausted: 3_600_000,
      // rate_limit intentionally omitted — should use resetTimeout
    },
  });
  cb._onFailure("rate_limit");
  const t = cb._timeUntilReset();
  assert.ok(t > 44_000 && t <= 45_000, `expected ~45s fallback, got ${t}`);
  cb.reset();
});

test("cooldownByKind falls back to resetTimeout when lastFailureKind is null", () => {
  const cb = new CircuitBreaker(uniqueName("null-kind"), {
    failureThreshold: 1,
    resetTimeout: 30_000,
    cooldownByKind: {
      rate_limit: 60_000,
      quota_exhausted: 3_600_000,
    },
  });
  // Old-style call site that doesn't classify — kind stays null.
  cb._onFailure();
  assert.equal(cb.lastFailureKind, null);
  const t = cb._timeUntilReset();
  assert.ok(t > 29_000 && t <= 30_000, `expected resetTimeout fallback, got ${t}`);
  cb.reset();
});

test("classifyError on execute() routes errors to the correct kind", async () => {
  const cb = new CircuitBreaker(uniqueName("classifier"), {
    failureThreshold: 1,
    resetTimeout: 1_000,
    cooldownByKind: { quota_exhausted: 600_000 },
    classifyError: (err: unknown): FailureKind | undefined => {
      if (err instanceof Error && err.message.includes("daily limit")) {
        return "quota_exhausted";
      }
      return "transient";
    },
  });

  await assert.rejects(async () => {
    await cb.execute(async () => {
      throw new Error("You exceeded your daily limit");
    });
  });

  assert.equal(cb.state, "OPEN");
  assert.equal(cb.lastFailureKind, "quota_exhausted");
  const t = cb._timeUntilReset();
  assert.ok(t > 599_000 && t <= 600_000, `expected ~600s quota cooldown, got ${t}`);
  cb.reset();
});

test("_onSuccess clears lastFailureKind on close transition", () => {
  const cb = new CircuitBreaker(uniqueName("success-clear"), {
    failureThreshold: 1,
    resetTimeout: 100,
    cooldownByKind: { rate_limit: 100 },
  });
  cb._onFailure("rate_limit");
  assert.equal(cb.lastFailureKind, "rate_limit");
  // simulate elapsed time & success path through _onSuccess (which the
  // combo path uses); after success, kind should clear and breaker close.
  cb._onSuccess();
  assert.equal(cb.lastFailureKind, null);
  assert.equal(cb.state, "CLOSED");
});

test("reset() clears lastFailureKind", () => {
  const cb = new CircuitBreaker(uniqueName("reset-clear"), {
    failureThreshold: 1,
    cooldownByKind: { rate_limit: 60_000 },
  });
  cb._onFailure("rate_limit");
  assert.equal(cb.lastFailureKind, "rate_limit");
  cb.reset();
  assert.equal(cb.lastFailureKind, null);
});

test("getCircuitBreaker registry merges new options on subsequent calls", () => {
  const name = uniqueName("registry-merge");
  const cb1 = getCircuitBreaker(name, { failureThreshold: 5 });
  // First call: no cooldownByKind, classifyError null
  assert.deepEqual(cb1.cooldownByKind, {});
  assert.equal(cb1.classifyError, null);
  // Second call: add overrides
  const cb2 = getCircuitBreaker(name, {
    cooldownByKind: { rate_limit: 60_000 },
    classifyError: () => "rate_limit" as FailureKind,
  });
  assert.equal(cb1, cb2, "registry returns same instance");
  assert.deepEqual(cb1.cooldownByKind, { rate_limit: 60_000 });
  assert.ok(typeof cb1.classifyError === "function");
  cb1.reset();
});

test("registry MERGES cooldownByKind across calls (does not replace)", () => {
  // Regression test for codex audit MEDIUM #1: if two registrations supply
  // disjoint keys, both must survive. Without spread-merge the second call
  // wiped the first.
  const name = uniqueName("registry-merge-keys");
  const cb1 = getCircuitBreaker(name, {
    cooldownByKind: { quota_exhausted: 3_600_000 },
  });
  assert.deepEqual(cb1.cooldownByKind, { quota_exhausted: 3_600_000 });
  const cb2 = getCircuitBreaker(name, {
    cooldownByKind: { rate_limit: 60_000 },
  });
  assert.equal(cb1, cb2);
  assert.deepEqual(cb1.cooldownByKind, {
    quota_exhausted: 3_600_000,
    rate_limit: 60_000,
  });
  cb1.reset();
});

test("classifyError throwing does not mask original error or skip _onFailure", async () => {
  // Regression test for codex audit MEDIUM #2.
  const cb = new CircuitBreaker(uniqueName("classifier-throws"), {
    failureThreshold: 1,
    resetTimeout: 1_000,
    classifyError: () => {
      throw new Error("classifier itself blew up");
    },
  });
  let caught: unknown;
  try {
    await cb.execute(async () => {
      throw new Error("original error");
    });
  } catch (e) {
    caught = e;
  }
  assert.ok(caught instanceof Error);
  assert.equal((caught as Error).message, "original error");
  assert.equal(cb.state, "OPEN", "failure was still recorded");
  assert.equal(cb.lastFailureKind, null, "kind defaults to null when classifier throws");
  cb.reset();
});

test("invalid cooldownByKind values (NaN, Infinity, negative) fall back to resetTimeout", () => {
  // Regression test for codex audit MEDIUM #3.
  const cb = new CircuitBreaker(uniqueName("invalid-cooldown"), {
    failureThreshold: 1,
    resetTimeout: 30_000,
    cooldownByKind: {
      rate_limit: NaN,
      quota_exhausted: -5_000,
      transient: Number.POSITIVE_INFINITY,
    },
  });
  for (const kind of ["rate_limit", "quota_exhausted", "transient"] as const) {
    cb.reset();
    cb._onFailure(kind);
    const t = cb._timeUntilReset();
    assert.ok(t > 29_000 && t <= 30_000, `expected resetTimeout fallback for ${kind}, got ${t}`);
  }
  cb.reset();
});

// Cleanup: clear the registry (and SQLite-persisted breaker state) so this
// test file does not leak into others when --test-concurrency=10.
test("teardown — reset all circuit breakers", () => {
  resetAllCircuitBreakers();
});
