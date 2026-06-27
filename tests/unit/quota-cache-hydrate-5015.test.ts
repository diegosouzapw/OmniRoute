import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * PR #5015 — hydrate the in-memory quota cache from persisted snapshots.
 *
 * After a restart the in-memory quota cache is empty, so a connection that was
 * known-exhausted before the restart looked healthy again until it was queried
 * organically and re-fetched. `isAccountQuotaExhausted` now lazily hydrates the
 * cache from `quota_snapshots` on the first miss, so persisted exhaustion is
 * honoured immediately.
 *
 * Regression guard: without the hydration path, a fresh cache returns `false`
 * (no entry) even though a persisted exhausted snapshot exists — this test
 * would fail on the pre-#5015 tip.
 */
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-quota-hydrate-5015-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const quotaSnapshotsDb = await import("../../src/lib/db/quotaSnapshots.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#5015 isAccountQuotaExhausted hydrates exhausted state from a persisted snapshot", () => {
  const connectionId = "conn-hydrate-5015";
  // Persist an exhausted snapshot with no reset time (so it does not auto-advance)
  // and a fresh created_at (so it does not expire via EXHAUSTED_TTL).
  quotaSnapshotsDb.saveQuotaSnapshot({
    provider: "openai",
    connection_id: connectionId,
    window_key: "weekly",
    remaining_percentage: 0,
    is_exhausted: 1,
    next_reset_at: null,
    window_duration_ms: null,
    raw_data: JSON.stringify({ source: "test" }),
  });

  // The in-memory cache is empty for this connection (simulating a fresh boot).
  // The getter must hydrate from the persisted snapshot and report exhaustion.
  assert.equal(
    quotaCache.isAccountQuotaExhausted(connectionId),
    true,
    "exhausted state persisted in quota_snapshots must hydrate the empty cache"
  );
});

test("#5015 a connection with no snapshot is not reported exhausted", () => {
  assert.equal(
    quotaCache.isAccountQuotaExhausted("conn-unknown-5015"),
    false,
    "no snapshot → no hydration → not exhausted"
  );
});
