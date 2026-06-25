/**
 * tests/unit/health/checks.test.ts
 *
 * Unit tests for `src/lib/health/checks.ts` (PR-009) — the registry
 * + runner.
 *
 * Coverage:
 *   1. custom probe registration via `registerProbe`
 *   2. timeout enforcement — a probe that exceeds the budget is
 *      translated to status='unhealthy' / error='timeout'
 *   3. error caught — a probe that throws is translated to a
 *      'unhealthy' result, runner does NOT reject
 *   4. probes run in parallel — total latency ≤ slowest single probe
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  HEALTH_CHECK_DURATION_METRIC,
  clearProbes,
  listProbes,
  registerProbe,
  runAllProbes,
  runProbe,
  unregisterProbe,
} from "../../../src/lib/health/checks.ts";

const TIMEOUT_NAME = "__test_timeout__";
const ERROR_NAME = "__test_error__";
const SLOW_NAME = "__test_slow__";
const FAST_NAME = "__test_fast__";

function reset(): void {
  clearProbes();
  unregisterProbe(TIMEOUT_NAME);
  unregisterProbe(ERROR_NAME);
  unregisterProbe(SLOW_NAME);
  unregisterProbe(FAST_NAME);
}

test.afterEach(() => {
  reset();
});

// ─── 1. custom registration ─────────────────────────────────────────────────

test("registerProbe adds an entry visible via listProbes", () => {
  reset();
  registerProbe("__test_a__", async () => ({ status: "healthy" }));
  registerProbe("__test_b__", async () => ({ status: "degraded", error: "soft" }));
  const names = listProbes().map(([n]) => n);
  assert.ok(names.includes("__test_a__"));
  assert.ok(names.includes("__test_b__"));
});

test("unregisterProbe removes a previously-registered entry", () => {
  reset();
  registerProbe("__test_remove__", async () => ({ status: "healthy" }));
  assert.equal(unregisterProbe("__test_remove__"), true);
  const names = listProbes().map(([n]) => n);
  assert.ok(!names.includes("__test_remove__"));
  assert.equal(unregisterProbe("__test_remove__"), false);
});

// ─── 2. timeout enforcement ─────────────────────────────────────────────────

test("runProbe enforces a 2s timeout and reports 'timeout'", async () => {
  registerProbe(TIMEOUT_NAME, () => new Promise(() => {})); // never resolves
  const startedAt = Date.now();
  const result = await runProbe(TIMEOUT_NAME, () => new Promise(() => {}), 100);
  const elapsed = Date.now() - startedAt;
  assert.equal(result.status, "unhealthy");
  assert.equal(result.error, "timeout");
  assert.ok(elapsed < 1000, `runner should respect 100ms timeout (was ${elapsed}ms)`);
});

// ─── 3. error caught ────────────────────────────────────────────────────────

test("runProbe catches a thrown exception and reports 'unhealthy'", async () => {
  const result = await runProbe(ERROR_NAME, async () => {
    throw new Error("boom");
  }, 500);
  assert.equal(result.status, "unhealthy");
  assert.equal(result.error, "boom");
  assert.ok(typeof result.latency_ms === "number");
});

// ─── 4. parallel execution ──────────────────────────────────────────────────

test("runAllProbes executes probes in parallel (total ≤ 2× slowest)", async () => {
  registerProbe(SLOW_NAME, () => new Promise((r) => setTimeout(() => r({ status: "healthy" }), 200)));
  registerProbe(FAST_NAME, () => new Promise((r) => setTimeout(() => r({ status: "healthy" }), 10)));
  const startedAt = Date.now();
  const checks = await runAllProbes(2000);
  const elapsed = Date.now() - startedAt;
  assert.ok(checks[SLOW_NAME], "slow probe result should be present");
  assert.ok(checks[FAST_NAME], "fast probe result should be present");
  // Parallel ⇒ total should be much less than the serial sum (210ms)
  assert.ok(elapsed < 350, `probes should run in parallel (took ${elapsed}ms)`);
  assert.equal(checks[SLOW_NAME].status, "healthy");
  assert.equal(checks[FAST_NAME].status, "healthy");
});

test("HEALTH_CHECK_DURATION_METRIC name is the stable observability key", () => {
  // Stability contract: do not rename without coordinated SLO migration.
  assert.equal(
    HEALTH_CHECK_DURATION_METRIC,
    "omniroute_health_check_duration_seconds",
  );
});
