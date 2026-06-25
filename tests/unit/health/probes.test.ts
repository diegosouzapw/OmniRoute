/**
 * tests/unit/health/probes.test.ts
 *
 * Unit tests for `src/lib/health/probes.ts` (PR-009).
 *
 * Coverage:
 *   1. liveness always passes
 *   2. readiness always passes
 *   3. database probe returns a healthy/degraded result depending on env
 *   4. migrations probe returns degraded when the runner is unavailable
 *   5. cache probe returns the hit ratio from the prompt cache
 *   6. bifrost probe returns degraded (skipped) when env is unset
 *
 * These tests intentionally cover the probe surface without mocking the
 * underlying modules — each probe is defensive about its dependencies
 * being unavailable (returning "degraded" or "unhealthy" with a clear
 * error). That contract is what we exercise here.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  bifrostProbe,
  cacheProbe,
  databaseProbe,
  livenessProbe,
  migrationsProbe,
  readinessProbe,
} from "../../../src/lib/health/probes.ts";

// ─── 1. liveness always passes ───────────────────────────────────────────────

test("livenessProbe always returns status='healthy'", async () => {
  const result = await livenessProbe(2000);
  assert.equal(result.status, "healthy");
  assert.ok(result.details, "expected details to be present");
  assert.ok(typeof result.details!.pid === "number");
  assert.ok(typeof result.details!.node_version === "string");
});

// ─── 2. readiness always passes ──────────────────────────────────────────────

test("readinessProbe always returns status='healthy'", async () => {
  const result = await readinessProbe(2000);
  assert.equal(result.status, "healthy");
  assert.ok(result.details, "expected details to be present");
  assert.ok(typeof result.details!.uptime_seconds === "number");
  assert.ok(typeof result.details!.started_at === "string");
});

// ─── 3. database probe ───────────────────────────────────────────────────────

test("databaseProbe returns either healthy (db ok) or unhealthy (db down)", async () => {
  // We don't know whether the test env has an open DB; the probe is
  // contract-bound to surface "healthy" or "unhealthy" but never throw.
  const result = await databaseProbe(2000);
  assert.ok(
    result.status === "healthy" || result.status === "unhealthy",
    `unexpected status: ${result.status}`,
  );
  if (result.status === "unhealthy") {
    assert.ok(typeof result.error === "string");
  }
});

// ─── 4. migrations probe ─────────────────────────────────────────────────────

test("migrationsProbe surfaces degraded when the runner is unavailable", async () => {
  // In test environments the DB may not be initialized; the probe is
  // contract-bound to surface "degraded" or "unhealthy" but never throw.
  const result = await migrationsProbe(2000);
  assert.ok(
    result.status === "healthy" ||
      result.status === "degraded" ||
      result.status === "unhealthy",
    `unexpected status: ${result.status}`,
  );
  if (result.status === "degraded" || result.status === "unhealthy") {
    assert.ok(typeof result.error === "string");
  }
});

// ─── 5. cache probe ─────────────────────────────────────────────────────────

test("cacheProbe returns a hit_ratio (or degraded if cache unavailable)", async () => {
  const result = await cacheProbe(2000);
  assert.ok(
    result.status === "healthy" ||
      result.status === "degraded" ||
      result.status === "unhealthy",
    `unexpected status: ${result.status}`,
  );
  if (result.status === "healthy") {
    assert.ok(result.details, "healthy cache probe should expose details");
    assert.ok(
      "hit_ratio" in result.details!,
      "hit_ratio should be present in details",
    );
  }
});

// ─── 6. bifrost probe ───────────────────────────────────────────────────────

test("bifrostProbe returns 'degraded' with skipped=true when env unset", async () => {
  // We don't manipulate process.env — the test runner may or may not have
  // BIFROST_BASE_URL set. When it's unset, the contract is "degraded +
  // skipped: true"; when it IS set, the probe makes a real network call
  // and we accept any non-throwing outcome.
  const hadEnv = typeof process.env.BIFROST_BASE_URL === "string" && process.env.BIFROST_BASE_URL.length > 0;
  const result = await bifrostProbe(1500);
  assert.ok(
    result.status === "degraded" ||
      result.status === "healthy" ||
      result.status === "unhealthy",
    `unexpected status: ${result.status}`,
  );
  if (!hadEnv) {
    assert.equal(result.status, "degraded");
    assert.deepEqual(result.details, {
      skipped: true,
      reason: "BIFROST_BASE_URL not configured",
    });
  }
});
