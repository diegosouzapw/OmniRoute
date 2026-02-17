import test from "node:test";
import assert from "node:assert/strict";

// ═════════════════════════════════════════════════════
//  Remaining Tasks Tests: Telemetry, Domain Extraction
// ═════════════════════════════════════════════════════

// ─── Request Telemetry (T-45) ────────────────────

import {
  RequestTelemetry,
  recordTelemetry,
  getTelemetrySummary,
} from "../../src/shared/utils/requestTelemetry.ts";

test("RequestTelemetry: records phases", async () => {
  const t = new RequestTelemetry("tel-1");
  t.startPhase("parse");
  t.endPhase();
  t.startPhase("validate");
  t.endPhase();

  const summary = t.getSummary();
  assert.equal(summary.phases.length, 2);
  assert.equal(summary.phases[0].phase, "parse");
  assert.equal(summary.phases[1].phase, "validate");
});

test("RequestTelemetry: measure() wraps async functions", async () => {
  const t = new RequestTelemetry("tel-2");
  const result = await t.measure("parse", async () => "parsed");
  assert.equal(result, "parsed");
  assert.equal(t.getSummary().phases.length, 1);
  assert.equal(t.getSummary().phases[0].phase, "parse");
});

test("RequestTelemetry: measure() records errors", async () => {
  const t = new RequestTelemetry("tel-3");
  await assert.rejects(
    () => t.measure("connect", async () => { throw new Error("timeout"); }),
    (err) => err.message === "timeout"
  );
  assert.equal(t.getSummary().phases[0].error, "timeout");
});

test("RequestTelemetry: getTelemetrySummary returns valid output", () => {
  const t = new RequestTelemetry("tel-4");
  t.startPhase("parse");
  t.endPhase();
  recordTelemetry(t);

  const summary = getTelemetrySummary();
  assert.ok(summary.count > 0);
  assert.ok(typeof summary.p50 === "number");
  assert.ok(typeof summary.p95 === "number");
});

// ─── Combo Resolver (T-46) ──────────────────────

import {
  resolveComboModel,
  getComboFallbacks,
} from "../../src/domain/comboResolver.ts";

test("comboResolver: priority returns first model", () => {
  const combo = {
    name: "test-combo",
    strategy: "priority",
    models: ["gpt-4", "claude-3.5-sonnet", "gemini-pro"],
  };
  const result = resolveComboModel(combo);
  assert.equal(result.model, "gpt-4");
  assert.equal(result.index, 0);
});

test("comboResolver: random returns a valid model", () => {
  const combo = {
    name: "test-random",
    strategy: "random",
    models: ["a", "b", "c"],
  };
  const result = resolveComboModel(combo);
  assert.ok(["a", "b", "c"].includes(result.model));
});

test("comboResolver: least-used picks model with lowest count", () => {
  const combo = {
    name: "test-least",
    strategy: "least-used",
    models: ["a", "b", "c"],
  };
  const result = resolveComboModel(combo, {
    modelUsageCounts: { a: 10, b: 2, c: 5 },
  });
  assert.equal(result.model, "b");
});

test("comboResolver: throws on empty models", () => {
  assert.throws(
    () => resolveComboModel({ name: "empty", strategy: "priority", models: [] }),
    /no models configured/
  );
});

test("comboResolver: getComboFallbacks returns remaining models", () => {
  const combo = { models: ["a", "b", "c", "d"] };
  const fallbacks = getComboFallbacks(combo, 1); // primary = "b"
  assert.deepEqual(fallbacks, ["c", "d", "a"]);
});

// ─── Lockout Policy (T-46) ──────────────────────

import {
  checkLockout,
  recordFailedAttempt,
  recordSuccess,
  forceUnlock,
} from "../../src/domain/lockoutPolicy.ts";

test("lockoutPolicy: initially not locked", () => {
  const result = checkLockout("user-fresh");
  assert.equal(result.locked, false);
});

test("lockoutPolicy: locks after max attempts", () => {
  const config = { maxAttempts: 3, lockoutDurationMs: 60000, attemptWindowMs: 60000 };
  const id = "user-lock-test-" + Date.now();

  recordFailedAttempt(id, config);
  recordFailedAttempt(id, config);
  const result = recordFailedAttempt(id, config);

  assert.equal(result.locked, true);
  assert.ok(result.remainingMs > 0);
});

test("lockoutPolicy: recordSuccess clears state", () => {
  const id = "user-success-" + Date.now();
  recordFailedAttempt(id);
  recordSuccess(id);

  const result = checkLockout(id);
  assert.equal(result.locked, false);
  assert.equal(result.attempts, 0);
});

test("lockoutPolicy: forceUnlock works", () => {
  const config = { maxAttempts: 1, lockoutDurationMs: 60000, attemptWindowMs: 60000 };
  const id = "user-force-" + Date.now();

  recordFailedAttempt(id, config);
  forceUnlock(id);

  const result = checkLockout(id);
  assert.equal(result.locked, false);
});
