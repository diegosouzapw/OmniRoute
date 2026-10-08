// #14359 — a quota park is trusted at most EXHAUSTED_MAX_PARK_MS past the
// observation that justified it. A provider whose console reports a far-future
// window reset (e.g. qwen-cloud-token-plan weekly, ~4 days) must not park the
// connection until that date: the park expires (and streak preservation keeps
// the quota monitor's periodic re-writes from re-anchoring it), so the next
// request reaches the upstream and the real answer (200 or genuine 429)
// replaces the cached guess.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-quota-park-cap-14359-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Dynamic imports are required: DATA_DIR must be set before the db modules
// open SQLite, so static imports would initialize against the wrong data dir
// (same pattern as tests/unit/quota-cache-hydrate-5015.test.ts).
const coreDb = await import("../../src/lib/db/core.ts");
const quotaSnapshotsDb = await import("../../src/lib/db/quotaSnapshots.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");

// The park window under test (30 minutes — mirrors EXHAUSTED_MAX_PARK_MS).
const MAX_PARK_MS = 30 * 60 * 1000;

const FAR_RESET = new Date(Date.now() + 4 * 24 * 3600 * 1000).toISOString();

function farQuotas() {
  return { weekly: { remainingPercentage: 0, resetAt: FAR_RESET } };
}

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#14359 setQuotaCache caps a far-future park at the park window", () => {
  quotaCache.__clearForTests();
  quotaCache.setQuotaCache("cap-14359", "qwen-cloud-token-plan", farQuotas());

  const entry = quotaCache.getQuotaCache("cap-14359");
  assert.ok(entry, "entry cached");
  assert.equal(entry.exhausted, true);
  assert.ok(entry.nextResetAt, "exhausted entry carries a park deadline");

  const parkedFor = new Date(entry.nextResetAt!).getTime() - Date.now();
  assert.ok(
    parkedFor <= MAX_PARK_MS + 5_000,
    `park must be capped at ~${MAX_PARK_MS}ms, got ${parkedFor}ms`
  );
  assert.ok(parkedFor > 0, "capped park must still be in the future");
});

test("#14359 the quota monitor cannot re-anchor the park while the exhausted streak continues", () => {
  quotaCache.__clearForTests();
  quotaCache.setQuotaCache("streak-14359", "qwen-cloud-token-plan", farQuotas());
  const firstDeadline = quotaCache.getQuotaCache("streak-14359")!.nextResetAt;

  // Background refresh re-writes the same bad console data minutes later.
  // Re-anchoring at Date.now() would keep the park alive forever (v1 failure).
  quotaCache.setQuotaCache("streak-14359", "qwen-cloud-token-plan", farQuotas());
  quotaCache.setQuotaCache("streak-14359", "qwen-cloud-token-plan", farQuotas());

  assert.equal(
    quotaCache.getQuotaCache("streak-14359")!.nextResetAt,
    firstDeadline,
    "streak preservation must keep the original (capped) deadline"
  );
});

test("#14359 hydration caps the park from the snapshot age — an old snapshot must not block", () => {
  quotaCache.__clearForTests();
  quotaSnapshotsDb.saveQuotaSnapshot({
    provider: "qwen-cloud-token-plan",
    connection_id: "hyd-14359",
    window_key: "weekly",
    remaining_percentage: 0,
    is_exhausted: 1,
    next_reset_at: FAR_RESET,
    window_duration_ms: null,
    raw_data: null,
  });
  // The snapshot was observed 2 hours ago — older than any park window.
  const db = coreDb.getDbInstance();
  db.prepare("UPDATE quota_snapshots SET created_at = ? WHERE connection_id = ?").run(
    new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    "hyd-14359"
  );

  assert.equal(
    quotaCache.isAccountQuotaExhausted("hyd-14359"),
    false,
    "a hydrated park older than the park window must not report exhaustion"
  );
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest("hyd-14359", "qwen-cloud-token-plan"),
    false,
    "request-time predicate must honour the expired hydrated park too"
  );
});

test("#14359 a fresh exhausted snapshot still parks after hydration (cap not a bypass)", () => {
  quotaCache.__clearForTests();
  quotaSnapshotsDb.saveQuotaSnapshot({
    provider: "qwen-cloud-token-plan",
    connection_id: "hyd-fresh-14359",
    window_key: "weekly",
    remaining_percentage: 0,
    is_exhausted: 1,
    next_reset_at: FAR_RESET,
    window_duration_ms: null,
    raw_data: null,
  });

  assert.equal(
    quotaCache.isAccountQuotaExhausted("hyd-fresh-14359"),
    true,
    "a fresh exhausted observation must still park the connection"
  );
  const entry = quotaCache.getQuotaCache("hyd-fresh-14359");
  const parkedFor = new Date(entry!.nextResetAt!).getTime() - Date.now();
  assert.ok(
    parkedFor <= MAX_PARK_MS + 5_000,
    "hydrated park must also be capped at the park window"
  );
});

test("#14359 an expired park unblocks both predicates without waiting for a refresh", () => {
  quotaCache.__clearForTests();
  quotaCache.setQuotaCache("exp-14359", "qwen-cloud-token-plan", farQuotas());

  // The cache state is a deliberate globalThis anchor (#8065 — chunk-shared
  // singleton); reach it via a named reference so the test can simulate time.
  interface QuotaCacheTestState {
    cache: Map<string, { nextResetAt: string | null }>;
  }
  const state: QuotaCacheTestState | undefined = (
    globalThis as {
      __omnirouteQuotaCacheState?: QuotaCacheTestState;
    }
  ).__omnirouteQuotaCacheState;
  const entry = state?.cache.get("exp-14359");
  assert.ok(entry, "cache entry present");
  entry!.nextResetAt = new Date(Date.now() - 1_000).toISOString();

  assert.equal(quotaCache.isAccountQuotaExhausted("exp-14359"), false);
  assert.equal(quotaCache.isQuotaExhaustedForRequest("exp-14359", "qwen-cloud-token-plan"), false);
});
