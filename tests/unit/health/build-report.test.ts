/**
 * tests/unit/health/build-report.test.ts
 *
 * Unit tests for `src/lib/health/buildReport.ts` (PR-009).
 *
 * Coverage:
 *   1. all-healthy → status='healthy'
 *   2. one unhealthy → status='degraded' (sanity: one degraded)
 *   3. all unhealthy → status='unhealthy'
 *   4. latency aggregation sums the per-check latency_ms
 *   5. timeout handling — a probe that errored with "timeout" still
 *      produces a valid HealthCheck (status='unhealthy', error='timeout')
 *   6. worst-wins logic — `aggregateStatus` ranks statuses correctly when
 *      mixed
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  aggregateLatencyMs,
  aggregateStatus,
  buildReport,
  httpStatusFor,
  worstCheck,
} from "../../../src/lib/health/buildReport.ts";
import type { HealthCheck } from "../../../src/lib/health/types.ts";

function healthy(latency_ms = 1): HealthCheck {
  return { status: "healthy", latency_ms };
}
function degraded(latency_ms = 1, msg = "soft"): HealthCheck {
  return { status: "degraded", latency_ms, error: msg };
}
function unhealthy(latency_ms = 1, msg = "hard"): HealthCheck {
  return { status: "unhealthy", latency_ms, error: msg };
}
function timeout(latency_ms = 2000): HealthCheck {
  return { status: "unhealthy", latency_ms, error: "timeout" };
}

const STARTED_AT = "2026-06-25T00:00:00.000Z";
const NOW = new Date("2026-06-25T00:01:30.000Z"); // 90s after start

// ─── 1. all healthy ──────────────────────────────────────────────────────────

test("aggregateStatus returns 'healthy' when every check is healthy", () => {
  const status = aggregateStatus({
    a: healthy(),
    b: healthy(),
    c: healthy(),
  });
  assert.equal(status, "healthy");
});

// ─── 2. one unhealthy ────────────────────────────────────────────────────────

test("aggregateStatus returns 'degraded' when exactly one check is degraded", () => {
  const status = aggregateStatus({
    a: healthy(),
    b: degraded(),
    c: healthy(),
  });
  assert.equal(status, "degraded");
});

// ─── 3. all unhealthy ────────────────────────────────────────────────────────

test("aggregateStatus returns 'unhealthy' when every check is unhealthy", () => {
  const status = aggregateStatus({
    a: unhealthy(),
    b: unhealthy(),
  });
  assert.equal(status, "unhealthy");
});

// ─── 4. latency aggregation ──────────────────────────────────────────────────

test("aggregateLatencyMs sums per-check latency_ms", () => {
  const total = aggregateLatencyMs({
    a: healthy(12),
    b: degraded(8),
    c: unhealthy(35),
  });
  assert.equal(total, 12 + 8 + 35);
});

// ─── 5. timeout handling ─────────────────────────────────────────────────────

test("buildReport includes a timeout check with status='unhealthy' and error='timeout'", () => {
  const checks = {
    fast: healthy(5),
    slow: timeout(2000),
  };
  const report = buildReport({
    checks,
    startedAt: STARTED_AT,
    version: "v3.8.34-test",
    now: () => NOW,
  });
  assert.equal(report.status, "unhealthy");
  assert.equal(report.checks.slow.status, "unhealthy");
  assert.equal(report.checks.slow.error, "timeout");
  assert.equal(report.checks.slow.latency_ms, 2000);
  assert.equal(httpStatusFor(report), 503);
});

// ─── 6. worst-wins logic ─────────────────────────────────────────────────────

test("aggregateStatus picks the worst status (unhealthy > degraded > healthy)", () => {
  // Mixed: one of each, in random order. Expected: unhealthy wins.
  const status = aggregateStatus({
    a: healthy(1),
    b: unhealthy(2),
    c: degraded(3),
    d: healthy(4),
  });
  assert.equal(status, "unhealthy");
});

test("worstCheck returns the highest-severity entry with latency as tie-breaker", () => {
  const checks = {
    a: healthy(10),
    b: unhealthy(50),
    c: unhealthy(100),
  };
  const picked = worstCheck(checks);
  assert.ok(picked, "expected a picked check");
  assert.equal(picked!.name, "c");
  assert.equal(picked!.check.latency_ms, 100);
});

test("buildReport exposes uptime_seconds derived from startedAt", () => {
  const report = buildReport({
    checks: { a: healthy(1) },
    startedAt: STARTED_AT,
    version: "v3.8.34-test",
    now: () => NOW,
  });
  // 90 seconds between STARTED_AT and NOW
  assert.equal(report.uptime_seconds, 90);
  assert.equal(report.started_at, STARTED_AT);
});
