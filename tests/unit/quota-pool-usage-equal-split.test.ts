/**
 * tests/unit/quota-pool-usage-equal-split.test.ts
 *
 * Regression: enforce.ts applies an equal-split fallback when every allocation
 * in a pool has weight 0 (see quota-equal-split.test.ts), but neither quota
 * store did the same in poolUsageWithDimensions. GET /api/quota/pools/[id]/usage
 * therefore reported fairShare = 0 for every key in such a pool, so each one
 * rendered as borrowing its entire consumption while enforcement was happily
 * granting it 100/N of the budget. Same pool, two answers.
 *
 * The tell was that the store's ternary could not do anything: weights are
 * non-negative, so `totalWeight === 0` implies every `alloc.weight` is already
 * 0, and `totalWeight > 0 ? alloc.weight : 0` returned `alloc.weight` either
 * way. The branch existed exactly where the fallback belonged.
 *
 * This is the same divergence class as quota-pool-usage-summed-budget.test.ts,
 * which corrected the accountCount side of the enforce↔usage split.
 *
 * Levels:
 *   A (structural): both stores compute effectiveWeight with the equal-split
 *     fallback, in the same shape enforce.ts uses, and the no-op form is gone.
 *   B (logic): replicate the store's per-key math to prove the fallback fixes
 *     fairShare and clears the bogus borrowing flag, and that pools with real
 *     weights are untouched.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..", "..");
const read = (rel: string) => readFileSync(join(ROOT, rel), "utf8");

const STORES = [
  "src/lib/quota/sqliteQuotaStore.ts",
  "src/lib/quota/redisQuotaStore.ts",
] as const;

// ---------------------------------------------------------------------------
// Level A — structural: both stores carry the enforce.ts fallback
// ---------------------------------------------------------------------------

for (const store of STORES) {
  test(`${store} applies the equal-split fallback to effectiveWeight`, () => {
    const src = read(store);
    assert.ok(
      /100 \/ allocations\.length/.test(src),
      "store must fall back to an equal 100/N share when the pool has no weights"
    );
    assert.ok(
      /allocations\.length > 0\s*\?\s*100 \/ allocations\.length\s*:\s*0/.test(src),
      "the equal split must guard against an empty allocation list, like enforce.ts"
    );
  });

  test(`${store} no longer zeroes effectiveWeight when the pool has no weights`, () => {
    const src = read(store);
    assert.ok(
      !/const effectiveWeight = totalWeight > 0 \? alloc\.weight : 0;/.test(src),
      "the old ternary was a no-op and must not come back"
    );
  });
}

test("enforce.ts is still the shape the stores are mirroring", () => {
  const src = read("src/lib/quota/enforce.ts");
  assert.ok(
    /allocCount > 0\s*\?\s*100 \/ allocCount\s*:\s*0/.test(src),
    "enforce.ts must keep the equal-split fallback the stores now mirror"
  );
});

// ---------------------------------------------------------------------------
// Level B — logic: the fallback corrects fairShare and the borrowing flag
//
// Replicates the per-key math from poolUsageWithDimensions:
//   fairShare = (effectiveWeight / 100) × planDim.limit
//   deficit   = consumed - fairShare
//   borrowing = consumed > fairShare
// ---------------------------------------------------------------------------

/** The store's per-key snapshot, parameterised by the effectiveWeight rule. */
function perKey(
  allocations: Array<{ weight: number }>,
  index: number,
  limit: number,
  consumed: number,
  withFallback: boolean
) {
  const totalWeight = allocations.reduce((sum, a) => sum + a.weight, 0);
  const alloc = allocations[index]!;
  const effectiveWeight = withFallback
    ? totalWeight > 0
      ? alloc.weight
      : allocations.length > 0
        ? 100 / allocations.length
        : 0
    : totalWeight > 0
      ? alloc.weight
      : 0;
  const fairShare = (effectiveWeight / 100) * limit;
  return { fairShare, deficit: consumed - fairShare, borrowing: consumed > fairShare };
}

test("all-zero pool: the snapshot now grants the same share enforcement does", () => {
  const allocations = [{ weight: 0 }, { weight: 0 }];
  const LIMIT = 1000;
  const CONSUMED = 100;

  const before = perKey(allocations, 0, LIMIT, CONSUMED, false);
  assert.equal(before.fairShare, 0, "sanity: the bug gave every key a zero share");
  assert.equal(before.deficit, CONSUMED, "sanity: the whole consumption read as a deficit");
  assert.equal(before.borrowing, true, "sanity: every key was flagged as borrowing");

  const after = perKey(allocations, 0, LIMIT, CONSUMED, true);
  assert.equal(after.fairShare, 500, "two unweighted keys split the limit evenly");
  assert.equal(after.deficit, -400, "a key inside its share runs a negative deficit");
  assert.equal(after.borrowing, false, "and must not be flagged as borrowing");
});

test("all-zero pool: the snapshot share matches what enforce.ts computes", () => {
  const allocations = [{ weight: 0 }, { weight: 0 }, { weight: 0 }, { weight: 0 }];
  const LIMIT = 1000;

  // enforce.ts: effectiveWeight = 100 / allocCount when poolTotalWeight === 0
  const enforced = (100 / allocations.length / 100) * LIMIT;
  const snapshot = perKey(allocations, 2, LIMIT, 0, true).fairShare;

  assert.equal(snapshot, enforced, "usage and enforcement must agree on the fair share");
  assert.equal(snapshot, 250, "four unweighted keys get a quarter each");
});

test("weighted pools are untouched by the fallback", () => {
  const allocations = [{ weight: 70 }, { weight: 30 }];
  const LIMIT = 1000;

  for (const index of [0, 1]) {
    const before = perKey(allocations, index, LIMIT, 0, false);
    const after = perKey(allocations, index, LIMIT, 0, true);
    assert.equal(after.fairShare, before.fairShare, "a weighted pool keeps its shares");
  }
  assert.equal(perKey(allocations, 0, LIMIT, 0, true).fairShare, 700);
  assert.equal(perKey(allocations, 1, LIMIT, 0, true).fairShare, 300);
});

test("a pool where one key carries all the weight still starves the rest", () => {
  // totalWeight > 0, so the fallback must not engage: a 0-weight key next to a
  // weighted one is a deliberate allocation, not an unconfigured pool.
  const allocations = [{ weight: 100 }, { weight: 0 }];
  const LIMIT = 1000;

  assert.equal(perKey(allocations, 0, LIMIT, 0, true).fairShare, 1000);
  assert.equal(
    perKey(allocations, 1, LIMIT, 0, true).fairShare,
    0,
    "an explicitly unweighted key in a weighted pool keeps its zero share"
  );
});
