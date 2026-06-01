/**
 * tests/unit/quota-equal-split.test.ts
 *
 * Fix: when a pool's allocations all have weight 0, enforce treats each as an
 * equal share (100/N), so the pool is usable without re-saving.
 *
 * Strategy (mirrors quota-summed-budget.test.ts):
 *   Level A — decideFairShare directly, with effectiveWeight computed as
 *     enforce.ts does after the fix. Two allocations, both weight=0 →
 *     effectiveWeight=50 each. A request consuming just under budget/2 is
 *     ALLOWED; consuming at or above budget/2 (in strict mode) is BLOCKED.
 *
 *   Level B — contrast with explicit non-zero weights (e.g. 70/30) — the
 *     original weights are kept and not replaced by equal split.
 *
 *   Level C — fail-open path: enforceQuotaShare still resolves to allow
 *     when DB is unavailable (B16 semantics intact after the change).
 */

import test from "node:test";
import assert from "node:assert/strict";

const POOL_ID = "pool-eq-split-1";
const API_KEY_ID = "key-eq-1";

// ---------------------------------------------------------------------------
// Import decideFairShare (no DB needed)
// ---------------------------------------------------------------------------

const { decideFairShare } = await import("../../src/lib/quota/fairShare.ts");

const BUDGET = 1000; // per-account plan limit
const THRESHOLD = 0.5;
const DIM_KEY = `${POOL_ID}:tokens:hourly`;

/** Build FairShareDimension in strict mode (globalUsedPercent = 0.7 > threshold 0.5) */
function makeDim(limit = BUDGET) {
  const globalUsedPercent = 0.7;
  return {
    key: { poolId: POOL_ID, unit: "tokens" as const, window: "hourly" as const },
    limit,
    consumedTotal: globalUsedPercent * limit,
    globalUsedPercent,
  };
}

/** Replicate the effectiveWeight computation from enforce.ts (after fix) */
function computeEffectiveWeight(
  allocationWeight: number,
  poolAllocations: Array<{ weight: number }>
): number {
  const poolTotalWeight = poolAllocations.reduce(
    (s, a) => s + (Number.isFinite(a.weight) ? a.weight : 0),
    0
  );
  const allocCount = poolAllocations.length;
  return poolTotalWeight > 0
    ? allocationWeight
    : allocCount > 0
      ? 100 / allocCount
      : 0;
}

// ---------------------------------------------------------------------------
// Level A.1 — 2 allocations, BOTH weight=0, budget/2 consumed → ALLOWED (just under)
// ---------------------------------------------------------------------------

await test("equal-split: 2 allocs both weight=0, consumed < budget/2 → ALLOWED", () => {
  // Pool: 2 keys, both weight=0 → effectiveWeight = 50 each
  const poolAllocations = [
    { weight: 0 },
    { weight: 0 },
  ];
  const effectiveWeight = computeEffectiveWeight(0, poolAllocations); // 50
  assert.equal(effectiveWeight, 50, "effectiveWeight should be 50 for 2 zero-weight allocs");

  const fairShareAmount = (effectiveWeight / 100) * BUDGET; // 500
  const consumed = fairShareAmount - 1; // just under → ALLOWED

  const decision = decideFairShare({
    dimensions: [makeDim(BUDGET)],
    allocation: { apiKeyId: API_KEY_ID, weight: effectiveWeight, policy: "hard" },
    consumedByThisKey: { [DIM_KEY]: consumed },
    saturationThreshold: THRESHOLD,
  });

  assert.equal(
    decision.kind,
    "allow",
    `consumed (${consumed}) < fairShare (${fairShareAmount}) with effectiveWeight=50 → ALLOW`
  );
});

// ---------------------------------------------------------------------------
// Level A.2 — 2 allocations, BOTH weight=0, consumed AT budget/2 → BLOCKED
// ---------------------------------------------------------------------------

await test("equal-split: 2 allocs both weight=0, consumed >= budget/2 → BLOCKED (hard policy strict)", () => {
  const poolAllocations = [{ weight: 0 }, { weight: 0 }];
  const effectiveWeight = computeEffectiveWeight(0, poolAllocations); // 50
  const fairShareAmount = (effectiveWeight / 100) * BUDGET; // 500
  const consumed = fairShareAmount; // exactly at fair share → BLOCKED in strict hard

  const decision = decideFairShare({
    dimensions: [makeDim(BUDGET)],
    allocation: { apiKeyId: API_KEY_ID, weight: effectiveWeight, policy: "hard" },
    consumedByThisKey: { [DIM_KEY]: consumed },
    saturationThreshold: THRESHOLD,
  });

  assert.equal(
    decision.kind,
    "block",
    `consumed (${consumed}) >= fairShare (${fairShareAmount}) with effectiveWeight=50 → BLOCK`
  );
  assert.equal(decision.reason, "fair-share");
});

// ---------------------------------------------------------------------------
// Level A.3 — With weight=0, fairShare is NOT 0 (old broken behavior)
// ---------------------------------------------------------------------------

await test("equal-split: without fix, weight=0 gives fairShare=0 → everything BLOCKS", () => {
  // Demonstrate the old broken behavior: weight=0 → fairShare=0 → any consumption blocks
  const oldWeight = 0; // original un-fixed weight
  const consumed = 1; // minimal consumption

  const decision = decideFairShare({
    dimensions: [makeDim(BUDGET)],
    allocation: { apiKeyId: API_KEY_ID, weight: oldWeight, policy: "hard" },
    consumedByThisKey: { [DIM_KEY]: consumed },
    saturationThreshold: THRESHOLD,
  });

  // With weight=0, fairShare=0, any consumed>=0 (strict mode) → block.
  // This demonstrates the BUG that the fix addresses.
  assert.equal(
    decision.kind,
    "block",
    "weight=0 → fairShare=0 → even consumed=1 is blocked (the bug we fix)"
  );
});

// ---------------------------------------------------------------------------
// Level A.4 — effectiveWeight: 0-weight pool with N=3 → each gets 100/3
// ---------------------------------------------------------------------------

await test("equal-split: 3 allocs all weight=0 → effectiveWeight = 100/3 ≈ 33.33", () => {
  const poolAllocations = [{ weight: 0 }, { weight: 0 }, { weight: 0 }];
  const effectiveWeight = computeEffectiveWeight(0, poolAllocations);
  assert.ok(
    Math.abs(effectiveWeight - 100 / 3) < 0.001,
    `effectiveWeight should be ~33.33, got ${effectiveWeight}`
  );
});

// ---------------------------------------------------------------------------
// Level B — explicit non-zero weights: 70/30 → originals are preserved
// ---------------------------------------------------------------------------

await test("equal-split: explicit 70/30 weights → originals used (no equal-split override)", () => {
  // Key A has weight=70, key B has weight=30; pool total = 100 > 0 → use original
  const poolAllocations = [{ weight: 70 }, { weight: 30 }];

  const effectiveWeightA = computeEffectiveWeight(70, poolAllocations); // 70
  const effectiveWeightB = computeEffectiveWeight(30, poolAllocations); // 30

  assert.equal(effectiveWeightA, 70, "70-weight key: effectiveWeight should stay 70");
  assert.equal(effectiveWeightB, 30, "30-weight key: effectiveWeight should stay 30");

  // 70% fair share = 700 tokens. Consumed=650 → under fair share → ALLOW in strict mode
  const consumed = 650;
  const decisionA = decideFairShare({
    dimensions: [makeDim(BUDGET)],
    allocation: { apiKeyId: API_KEY_ID, weight: effectiveWeightA, policy: "hard" },
    consumedByThisKey: { [DIM_KEY]: consumed },
    saturationThreshold: THRESHOLD,
  });
  assert.equal(decisionA.kind, "allow", "70% share: consumed=650 < fairShare=700 → ALLOW");

  // 30% fair share = 300. Consumed=400 → over fair share → BLOCK in strict mode
  const decisionB = decideFairShare({
    dimensions: [makeDim(BUDGET)],
    allocation: { apiKeyId: API_KEY_ID, weight: effectiveWeightB, policy: "hard" },
    consumedByThisKey: { [DIM_KEY]: 400 },
    saturationThreshold: THRESHOLD,
  });
  assert.equal(decisionB.kind, "block", "30% share: consumed=400 > fairShare=300 → BLOCK");
});

// ---------------------------------------------------------------------------
// Level B.2 — mixed weights (some 0, some non-zero): total > 0 → originals used
// ---------------------------------------------------------------------------

await test("equal-split: mixed weights (50, 0) → total=50>0, original weights preserved", () => {
  const poolAllocations = [{ weight: 50 }, { weight: 0 }];
  const effectiveWeightForZeroKey = computeEffectiveWeight(0, poolAllocations);

  // total = 50 > 0 → keep original weight (0) for the zero-weight key
  assert.equal(
    effectiveWeightForZeroKey,
    0,
    "When total weight > 0, individual 0-weight key keeps weight=0"
  );
});

// ---------------------------------------------------------------------------
// Level C — enforceQuotaShare fail-open (no DB) still resolves (B16 intact)
// ---------------------------------------------------------------------------

await test("equal-split: enforceQuotaShare fail-open path → allow (B16 semantics intact)", async () => {
  const { enforceQuotaShare } = await import("../../src/lib/quota/enforce.ts");

  const result = await enforceQuotaShare({
    apiKeyId: "key-eq-failopen",
    connectionId: "conn-eq-x",
    provider: "codex",
    estimatedCost: { tokens: 100 },
  });

  assert.equal(
    result.kind,
    "allow",
    "No DB → fail-open → allow; B16 semantics preserved after equal-split change"
  );
});
