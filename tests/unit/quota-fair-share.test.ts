/**
 * tests/unit/quota-fair-share.test.ts
 *
 * 10 scenarios covering src/lib/quota/fairShare.ts:
 *   1. Generous mode, key under fair_share → allow:ok
 *   2. Generous mode, key over fair_share, policy=burst → allow:ok
 *   3. Generous mode, key over fair_share, policy=hard, total under limit → allow:ok
 *   4. Strict mode, key over fair_share, policy=hard → block:fair-share
 *   5. Strict mode, key under fair_share → allow
 *   6. Cap absolute reached → block:cap-absolute
 *   7. Multi-dimension, A passes + B cap → block:cap-absolute
 *   8. Soft policy, over fair_share with slack → allow:ok + penalized=true
 *   9. Total >= limit, burst → block:global-saturated
 *   10. Empty dimensions → allow:ok
 */

import test from "node:test";
import assert from "node:assert/strict";

const { decideFairShare } = await import("../../src/lib/quota/fairShare.ts");

const THRESHOLD = 0.5;

// Helper to make a minimal dimension
function dim(opts: {
  poolId?: string;
  unit?: string;
  window?: string;
  limit: number;
  consumedTotal: number;
  globalUsedPercent: number;
}) {
  return {
    key: {
      poolId: opts.poolId ?? "pool1",
      unit: (opts.unit ?? "tokens") as "tokens" | "requests" | "percent" | "usd",
      window: (opts.window ?? "hourly") as "hourly" | "5h" | "daily" | "weekly" | "monthly",
    },
    limit: opts.limit,
    consumedTotal: opts.consumedTotal,
    globalUsedPercent: opts.globalUsedPercent,
  };
}

function alloc(weight: number, policy: "hard" | "soft" | "burst", capValue?: number, capUnit?: string) {
  return {
    weight,
    policy,
    ...(capValue !== undefined ? { capValue, capUnit: (capUnit ?? "tokens") as "tokens" | "requests" | "percent" | "usd" } : {}),
  };
}

// ─── Scenario 1 ─────────────────────────────────────────────────────────────
test("fairShare: generous mode, key under fair_share → allow:ok", () => {
  // globalUsedPercent=0.2 < 0.5 threshold → generous
  // weight=50, limit=1000 → fair_share=500
  // consumed=200 < 500 → allow
  const result = decideFairShare({
    dimensions: [dim({ limit: 1000, consumedTotal: 200, globalUsedPercent: 0.2 })],
    allocation: alloc(50, "hard"),
    consumedByThisKey: { "pool1:tokens:hourly": 200 },
    saturationThreshold: THRESHOLD,
  });
  assert.equal(result.kind, "allow");
  assert.equal(result.reason, "ok");
});

// ─── Scenario 2 ─────────────────────────────────────────────────────────────
test("fairShare: generous mode, key over fair_share, policy=burst → allow:ok", () => {
  // globalUsedPercent=0.3 < 0.5, consumedTotal=600 < 1000 → room exists
  // consumed=600 > fair_share=500 → but policy=burst → allow
  const result = decideFairShare({
    dimensions: [dim({ limit: 1000, consumedTotal: 600, globalUsedPercent: 0.3 })],
    allocation: alloc(50, "burst"),
    consumedByThisKey: { "pool1:tokens:hourly": 600 },
    saturationThreshold: THRESHOLD,
  });
  assert.equal(result.kind, "allow");
});

// ─── Scenario 3 ─────────────────────────────────────────────────────────────
test("fairShare: generous mode, key over fair_share, policy=hard, total under limit → allow:ok", () => {
  // globalUsedPercent=0.4 < 0.5 → generous
  // consumed=600 > fair_share=500, but consumedTotal=600 < 1000 → allow (borrowing)
  const result = decideFairShare({
    dimensions: [dim({ limit: 1000, consumedTotal: 600, globalUsedPercent: 0.4 })],
    allocation: alloc(50, "hard"),
    consumedByThisKey: { "pool1:tokens:hourly": 600 },
    saturationThreshold: THRESHOLD,
  });
  assert.equal(result.kind, "allow");
});

// ─── Scenario 4 ─────────────────────────────────────────────────────────────
test("fairShare: strict mode, key over fair_share, policy=hard → block:fair-share", () => {
  // globalUsedPercent=0.6 >= 0.5 → strict
  // consumed=600 > fair_share=500 → block
  const result = decideFairShare({
    dimensions: [dim({ limit: 1000, consumedTotal: 700, globalUsedPercent: 0.6 })],
    allocation: alloc(50, "hard"),
    consumedByThisKey: { "pool1:tokens:hourly": 600 },
    saturationThreshold: THRESHOLD,
  });
  assert.equal(result.kind, "block");
  assert.equal(result.reason, "fair-share");
});

// ─── Scenario 5 ─────────────────────────────────────────────────────────────
test("fairShare: strict mode, key under fair_share → allow", () => {
  // globalUsedPercent=0.7 >= 0.5 → strict
  // consumed=300 < fair_share=500 → allow
  const result = decideFairShare({
    dimensions: [dim({ limit: 1000, consumedTotal: 700, globalUsedPercent: 0.7 })],
    allocation: alloc(50, "hard"),
    consumedByThisKey: { "pool1:tokens:hourly": 300 },
    saturationThreshold: THRESHOLD,
  });
  assert.equal(result.kind, "allow");
});

// ─── Scenario 6 ─────────────────────────────────────────────────────────────
test("fairShare: cap absolute reached → block:cap-absolute regardless of policy", () => {
  // capValue=100, consumed=100 → block:cap-absolute even in generous mode
  const result = decideFairShare({
    dimensions: [dim({ limit: 1000, consumedTotal: 100, globalUsedPercent: 0.1 })],
    allocation: alloc(50, "burst", 100, "tokens"),
    consumedByThisKey: { "pool1:tokens:hourly": 100 },
    saturationThreshold: THRESHOLD,
  });
  assert.equal(result.kind, "block");
  assert.equal(result.reason, "cap-absolute");
});

// ─── Scenario 7 ─────────────────────────────────────────────────────────────
test("fairShare: multi-dimension, A passes + B cap absolute → block:cap-absolute", () => {
  const dimA = {
    key: { poolId: "pool1", unit: "tokens" as const, window: "hourly" as const },
    limit: 1000,
    consumedTotal: 200,
    globalUsedPercent: 0.2,
  };
  const dimB = {
    key: { poolId: "pool1", unit: "requests" as const, window: "hourly" as const },
    limit: 100,
    consumedTotal: 50,
    globalUsedPercent: 0.2,
  };
  const result = decideFairShare({
    dimensions: [dimA, dimB],
    allocation: {
      weight: 50,
      policy: "burst",
      capValue: 10, // cap 10 requests
      capUnit: "requests" as const,
    },
    consumedByThisKey: {
      "pool1:tokens:hourly": 100,
      "pool1:requests:hourly": 10, // at the cap
    },
    saturationThreshold: THRESHOLD,
  });
  assert.equal(result.kind, "block");
  assert.equal(result.reason, "cap-absolute");
});

// ─── Scenario 8 ─────────────────────────────────────────────────────────────
test("fairShare: soft policy, over fair_share with slack → allow:ok + penalized=true", () => {
  // generous mode (globalUsedPercent=0.3), consumed=600 > fair_share=500
  // policy=soft → allow but penalized
  const result = decideFairShare({
    dimensions: [dim({ limit: 1000, consumedTotal: 600, globalUsedPercent: 0.3 })],
    allocation: alloc(50, "soft"),
    consumedByThisKey: { "pool1:tokens:hourly": 600 },
    saturationThreshold: THRESHOLD,
  });
  assert.equal(result.kind, "allow");
  assert.equal(result.penalized, true);
});

// ─── Scenario 9 ─────────────────────────────────────────────────────────────
test("fairShare: total >= limit, burst → block:global-saturated", () => {
  // consumedTotal=1000 = limit → no room at all
  const result = decideFairShare({
    dimensions: [dim({ limit: 1000, consumedTotal: 1000, globalUsedPercent: 1.0 })],
    allocation: alloc(50, "burst"),
    consumedByThisKey: { "pool1:tokens:hourly": 500 },
    saturationThreshold: THRESHOLD,
  });
  assert.equal(result.kind, "block");
  assert.equal(result.reason, "global-saturated");
});

// ─── Scenario 10 ────────────────────────────────────────────────────────────
test("fairShare: empty dimensions → allow:ok", () => {
  const result = decideFairShare({
    dimensions: [],
    allocation: alloc(50, "hard"),
    consumedByThisKey: {},
    saturationThreshold: THRESHOLD,
  });
  assert.equal(result.kind, "allow");
  assert.equal(result.reason, "ok");
});
