/**
 * tests/unit/quota-pool-usage-summed-budget.test.ts
 *
 * Regression: GET /api/quota/pools/[id]/usage reported per-account plan limits
 * for multi-connection pools while enforce.ts scales every dimension by the
 * pool's member-connection count (summed budget, see quota-summed-budget.test.ts).
 * A pool with N connections therefore looked ~N× more utilised on the dashboard
 * than enforcement actually allowed: a 27-connection pool at 3% real utilisation
 * rendered as 81%, and per-key `borrowing` flags tripped N× too early.
 *
 * The fix scales plan.dimensions by accountCount in the usage route before
 * calling poolUsageWithDimensions — the same multiply enforce.ts applies — so
 * the snapshot's limit, fairShare, deficit and borrowing all describe the
 * budget enforcement really uses.
 *
 * Levels:
 *   A (structural): the route computes accountCount with the enforce.ts
 *     fallback semantics and passes the scaled dimensions to the store.
 *   B (logic): replicate the store's per-key math to prove that scaling the
 *     dimension limit corrects fairShare and the borrowing flag for a pool
 *     shape where the unscaled snapshot misreports both.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..", "..", "..");
const read = (rel: string) => readFileSync(join(ROOT, rel), "utf8");

const ROUTE = "src/app/api/quota/pools/[id]/usage/route.ts";

// ---------------------------------------------------------------------------
// Level A — structural: the route applies the summed-budget multiply
// ---------------------------------------------------------------------------

test("usage route computes accountCount with the enforce.ts fallback semantics", () => {
  const src = read(ROUTE);
  assert.ok(
    /Array\.isArray\(pool\.connectionIds\)\s*&&\s*pool\.connectionIds\.length\s*>\s*0/.test(src),
    "route must guard connectionIds exactly like enforce.ts"
  );
  assert.ok(
    /\?\s*pool\.connectionIds\.length\s*:\s*1/.test(src),
    "route must fall back to accountCount = 1 for legacy pools without connectionIds"
  );
});

test("usage route scales every dimension limit by accountCount before calling the store", () => {
  const src = read(ROUTE);
  assert.ok(
    /limit:\s*dim\.limit\s*\*\s*accountCount/.test(src),
    "route must multiply dim.limit by accountCount"
  );
  assert.ok(
    /poolUsageWithDimensions\(\s*id,\s*effectiveDimensions\s*\)/.test(src),
    "route must pass the scaled dimensions to poolUsageWithDimensions"
  );
  assert.ok(
    !/poolUsageWithDimensions\(\s*id,\s*plan\.dimensions\s*\)/.test(src),
    "route must NOT pass the unscaled plan.dimensions to the store"
  );
});

test("usage endpoint still wraps the snapshot as { usage: snapshot }", () => {
  const src = read(ROUTE);
  assert.ok(
    /NextResponse\.json\(\s*\{\s*usage:/.test(src),
    "endpoint contract from quota-pool-usage-shape.test.ts must survive the fix"
  );
});

// ---------------------------------------------------------------------------
// Level B — logic: scaled limits correct fairShare and borrowing
//
// Replicates the per-key math from sqliteQuotaStore.poolUsageWithDimensions:
//   fairShare = (weight / 100) × planDim.limit
//   borrowing = consumed > fairShare
// for a 27-connection pool where one key consumed more than its per-account
// slice but far less than its share of the summed budget.
// ---------------------------------------------------------------------------

test("summed-budget snapshot: fairShare and borrowing describe the enforced budget", () => {
  const PER_ACCOUNT_LIMIT = 66.67; // per-connection plan limit (L)
  const ACCOUNT_COUNT = 27; // pool members (N)
  const WEIGHT = 3.97; // key's allocation weight (%)
  const CONSUMED = 10.75; // above weight% × L, far below weight% × N × L

  const perKeySnapshot = (dimLimit: number) => {
    const fairShare = (WEIGHT / 100) * dimLimit;
    return { fairShare, borrowing: CONSUMED > fairShare };
  };

  // Unscaled (the bug): the key looks like a borrower at 27× the real threshold.
  const unscaled = perKeySnapshot(PER_ACCOUNT_LIMIT);
  assert.ok(
    unscaled.borrowing,
    "sanity: against the per-account limit this consumption reads as borrowing"
  );

  // Scaled (the fix): same consumption sits comfortably inside the enforced fair share.
  const scaled = perKeySnapshot(PER_ACCOUNT_LIMIT * ACCOUNT_COUNT);
  assert.equal(
    Math.round(scaled.fairShare * 100) / 100,
    Math.round(((WEIGHT / 100) * PER_ACCOUNT_LIMIT * ACCOUNT_COUNT) * 100) / 100,
    "fairShare must be weight% of the summed budget"
  );
  assert.equal(
    scaled.borrowing,
    false,
    "a key inside its summed-budget fair share must not be flagged as borrowing"
  );

  // Utilisation follows the same correction: consumedTotal / limit.
  const CONSUMED_TOTAL = 54.09;
  const shownUnscaled = CONSUMED_TOTAL / PER_ACCOUNT_LIMIT;
  const shownScaled = CONSUMED_TOTAL / (PER_ACCOUNT_LIMIT * ACCOUNT_COUNT);
  assert.ok(shownUnscaled > 0.8, "sanity: the bug rendered ~81% utilisation");
  assert.ok(shownScaled < 0.035, "the fix renders the real ~3% utilisation");
});

test("summed-budget snapshot: single-connection and legacy pools are unchanged", () => {
  const PER_ACCOUNT_LIMIT = 1000;

  const accountCount = (pool: { connectionIds?: string[] }) =>
    Array.isArray(pool.connectionIds) && pool.connectionIds.length > 0
      ? pool.connectionIds.length
      : 1;

  assert.equal(
    PER_ACCOUNT_LIMIT * accountCount({ connectionIds: ["conn-a"] }),
    PER_ACCOUNT_LIMIT,
    "1-connection pool: limit unchanged"
  );
  assert.equal(
    PER_ACCOUNT_LIMIT * accountCount({ connectionIds: [] }),
    PER_ACCOUNT_LIMIT,
    "empty connectionIds: fallback to 1"
  );
  assert.equal(
    PER_ACCOUNT_LIMIT * accountCount({}),
    PER_ACCOUNT_LIMIT,
    "legacy pool without connectionIds: fallback to 1"
  );
});
