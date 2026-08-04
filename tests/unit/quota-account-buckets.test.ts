/**
 * tests/unit/quota-account-buckets.test.ts
 *
 * Unit tests for src/lib/quota/accountBuckets.ts.
 *
 * Required cases (Phase 3 #3):
 *   - 5h reaches limit → saturated; after resets_at passes → auto-eligible (lazy)
 *   - per-model buckets independent: 7d:opus saturated does NOT saturate 7d:sonnet
 *   - concurrent 5h and 7d: saturating 5h does NOT saturate 7d
 *   - fail-open: no data → not saturated
 *
 * The clock is injected via `nowMs` so the lazy-reset behaviour is deterministic
 * (no real Date.now() on the tested path).
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  isBucketSaturated,
  recordUsage,
  updateAccountBuckets,
  _clearBucketsForTest,
  _bucketCountForTest,
  SATURATION_THRESHOLD_PCT,
  type ClaudeUsageResult,
  type UsageQuotaSlim,
} from "../../src/lib/quota/accountBuckets.ts";

// Fixed epoch for deterministic tests — 2026-06-24T12:00:00Z.
const NOW = Date.UTC(2026, 5, 24, 12, 0, 0);
const ONE_HOUR_MS = 60 * 60 * 1000;
const FUTURE_ISO = new Date(NOW + ONE_HOUR_MS).toISOString(); // window still open
const PAST_ISO = new Date(NOW - ONE_HOUR_MS).toISOString(); // window already reset

function makeQuota(used: number, resetAt: string | null): UsageQuotaSlim {
  return { used, total: 100, resetAt };
}

test.beforeEach(() => {
  _clearBucketsForTest();
});

// ─── fail-open ────────────────────────────────────────────────────────────────

test("isBucketSaturated: no entry → false (fail-open, no data)", () => {
  assert.equal(isBucketSaturated("conn-1", "5h", NOW), false);
  assert.equal(isBucketSaturated("conn-1", "7d", NOW), false);
  assert.equal(isBucketSaturated("conn-1", "7d:opus", NOW), false);
});

test("isBucketSaturated: empty connectionId or windowKey → false", () => {
  assert.equal(isBucketSaturated("", "5h", NOW), false);
  assert.equal(isBucketSaturated("conn-1", "", NOW), false);
});

// ─── 5h window saturation + lazy reset ───────────────────────────────────────

test("5h bucket: reaches 100% → saturated; after resets_at passes → auto-eligible (lazy)", () => {
  const connectionId = "conn-5h";
  const windowKey = "5h";

  recordUsage(connectionId, windowKey, 100, FUTURE_ISO, NOW);
  assert.equal(isBucketSaturated(connectionId, windowKey, NOW), true, "should be saturated at 100%");

  // Advance the clock past resets_at — lazy reset fires on the next read.
  const afterReset = NOW + ONE_HOUR_MS + 1;
  assert.equal(
    isBucketSaturated(connectionId, windowKey, afterReset),
    false,
    "should be eligible again once resets_at has passed"
  );
});

test("5h bucket: 99% (below threshold) → NOT saturated", () => {
  recordUsage("conn-99pct", "5h", 99, FUTURE_ISO, NOW);
  assert.equal(isBucketSaturated("conn-99pct", "5h", NOW), false);
});

test("SATURATION_THRESHOLD_PCT is 100", () => {
  assert.equal(SATURATION_THRESHOLD_PCT, 100);
});

test("5h bucket: stale signal (resets_at already past) is NOT recorded", () => {
  recordUsage("conn-stale", "5h", 100, PAST_ISO, NOW);
  assert.equal(isBucketSaturated("conn-stale", "5h", NOW), false);
  assert.equal(_bucketCountForTest(), 0);
});

// ─── 7d window ───────────────────────────────────────────────────────────────

test("7d bucket: reaches 100% → saturated", () => {
  recordUsage("conn-7d", "7d", 100, FUTURE_ISO, NOW);
  assert.equal(isBucketSaturated("conn-7d", "7d", NOW), true);
});

test("concurrent windows: saturating 5h does NOT saturate 7d", () => {
  recordUsage("conn-two-windows", "5h", 100, FUTURE_ISO, NOW);
  assert.equal(isBucketSaturated("conn-two-windows", "5h", NOW), true, "5h should be saturated");
  assert.equal(isBucketSaturated("conn-two-windows", "7d", NOW), false, "7d should NOT be saturated");
});

test("concurrent windows: saturating 7d does NOT saturate 5h", () => {
  recordUsage("conn-7d-only", "7d", 100, FUTURE_ISO, NOW);
  assert.equal(isBucketSaturated("conn-7d-only", "7d", NOW), true, "7d should be saturated");
  assert.equal(isBucketSaturated("conn-7d-only", "5h", NOW), false, "5h should NOT be saturated");
});

// ─── per-model buckets ────────────────────────────────────────────────────────

test("per-model buckets are independent: 7d:opus saturated does NOT saturate 7d:sonnet", () => {
  recordUsage("conn-models", "7d:opus", 100, FUTURE_ISO, NOW);
  assert.equal(isBucketSaturated("conn-models", "7d:opus", NOW), true, "opus should be saturated");
  assert.equal(
    isBucketSaturated("conn-models", "7d:sonnet", NOW),
    false,
    "sonnet should NOT be saturated"
  );
});

test("per-model: 7d:sonnet saturated does NOT affect the base 7d bucket", () => {
  recordUsage("conn-pm-base", "7d:sonnet", 100, FUTURE_ISO, NOW);
  assert.equal(isBucketSaturated("conn-pm-base", "7d:sonnet", NOW), true);
  assert.equal(isBucketSaturated("conn-pm-base", "7d", NOW), false, "base 7d should be independent");
});

test("per-model: lazy reset works for 7d:designer", () => {
  recordUsage("conn-designer", "7d:designer", 100, FUTURE_ISO, NOW);
  assert.equal(isBucketSaturated("conn-designer", "7d:designer", NOW), true);

  const afterReset = NOW + ONE_HOUR_MS + 1;
  assert.equal(isBucketSaturated("conn-designer", "7d:designer", afterReset), false);
});

// ─── updateAccountBuckets mapping (getClaudeUsage shape) ──────────────────────

test("updateAccountBuckets: null result → no-op (fail-open)", () => {
  updateAccountBuckets("conn-null", null, NOW);
  assert.equal(_bucketCountForTest(), 0);
});

test("updateAccountBuckets: empty quotas → no-op", () => {
  updateAccountBuckets("conn-empty", { quotas: {} }, NOW);
  assert.equal(_bucketCountForTest(), 0);
});

test("updateAccountBuckets: 'session (5h)' maps to '5h' window key", () => {
  const usage: ClaudeUsageResult = {
    quotas: { "session (5h)": makeQuota(100, FUTURE_ISO) },
  };
  updateAccountBuckets("conn-map-5h", usage, NOW);
  assert.equal(isBucketSaturated("conn-map-5h", "5h", NOW), true);
});

test("updateAccountBuckets: 'weekly (7d)' maps to '7d' window key", () => {
  const usage: ClaudeUsageResult = {
    quotas: { "weekly (7d)": makeQuota(100, FUTURE_ISO) },
  };
  updateAccountBuckets("conn-map-7d", usage, NOW);
  assert.equal(isBucketSaturated("conn-map-7d", "7d", NOW), true);
});

test("updateAccountBuckets: 'weekly designer (7d)' maps to '7d:designer' (base 7d unaffected)", () => {
  const usage: ClaudeUsageResult = {
    quotas: { "weekly designer (7d)": makeQuota(100, FUTURE_ISO) },
  };
  updateAccountBuckets("conn-designer-map", usage, NOW);
  assert.equal(isBucketSaturated("conn-designer-map", "7d:designer", NOW), true);
  assert.equal(isBucketSaturated("conn-designer-map", "7d", NOW), false, "base 7d unaffected");
});

test("updateAccountBuckets: an unsaturated update clears a previously saturated bucket", () => {
  recordUsage("conn-unsaturate", "5h", 100, FUTURE_ISO, NOW);
  assert.equal(isBucketSaturated("conn-unsaturate", "5h", NOW), true);

  const usage: ClaudeUsageResult = {
    quotas: { "session (5h)": makeQuota(50, FUTURE_ISO) },
  };
  updateAccountBuckets("conn-unsaturate", usage, NOW);
  assert.equal(
    isBucketSaturated("conn-unsaturate", "5h", NOW),
    false,
    "should be cleared when the latest reading is below threshold"
  );
});

test("updateAccountBuckets: multiple windows recorded from one usage payload", () => {
  const usage: ClaudeUsageResult = {
    quotas: {
      "session (5h)": makeQuota(100, FUTURE_ISO),
      "weekly (7d)": makeQuota(85, FUTURE_ISO), // not saturated
      "weekly designer (7d)": makeQuota(100, FUTURE_ISO),
    },
  };
  updateAccountBuckets("conn-multi", usage, NOW);
  assert.equal(isBucketSaturated("conn-multi", "5h", NOW), true, "5h saturated");
  assert.equal(isBucketSaturated("conn-multi", "7d", NOW), false, "7d at 85% not saturated");
  assert.equal(isBucketSaturated("conn-multi", "7d:designer", NOW), true, "designer 7d saturated");
});

// ─── recordUsage guards ───────────────────────────────────────────────────────

test("recordUsage: no-op when connectionId is empty", () => {
  recordUsage("", "5h", 100, FUTURE_ISO, NOW);
  assert.equal(_bucketCountForTest(), 0);
});

test("recordUsage: no-op when windowKey is empty", () => {
  recordUsage("conn-empty-wk", "", 100, FUTURE_ISO, NOW);
  assert.equal(_bucketCountForTest(), 0);
});

test("recordUsage: null resetAt → saturated with unknown reset (lazy reset cannot fire)", () => {
  recordUsage("conn-null-reset", "5h", 100, null, NOW);
  assert.equal(isBucketSaturated("conn-null-reset", "5h", NOW), true);
  // Without a known resets_at, the lazy reset has nothing to compare against.
  assert.equal(
    isBucketSaturated("conn-null-reset", "5h", NOW + 24 * ONE_HOUR_MS),
    true,
    "stays saturated until a fresh non-saturated reading clears it"
  );
});
