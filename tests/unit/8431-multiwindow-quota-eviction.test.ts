import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * #8431 — a provider with many quota windows (e.g. codebuddy-cn: 1 Monthly +
 * up to 8 Bonus Packs) can be wrongly reported as fully exhausted after a
 * fresh boot (empty in-memory cache) even though most windows still have
 * balance.
 *
 * Root cause: `getLatestQuotaSnapshotsForConnection()` fetched the most
 * recent 200 rows for the connection (across ALL windows), then deduped by
 * `window_key` *inside* that slice. A connection where a few windows churn
 * frequently (draining, so they keep writing fresh rows) and the rest stay
 * idle/healthy (a single old row each) can have its top-200 slice entirely
 * flooded by the hot windows once they collectively accumulate >200 rows.
 * The idle-but-healthy windows' only row falls outside the slice and is
 * silently dropped from rehydration, so `isExhausted()` — which is correct
 * on the data it's given — reports the connection exhausted because every
 * window it was handed genuinely is at 0%.
 *
 * Regression guard: without the fix, only the 3 hot windows survive
 * rehydration (of 9 total) and `isQuotaExhaustedForRequest` wrongly reports
 * `true`. With the fix, all 9 windows survive and the request stays
 * eligible because 6 of the 9 windows still have balance.
 */
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-quota-8431-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const quotaSnapshotsDb = await import("../../src/lib/db/quotaSnapshots.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const COLD_WINDOWS = ["Bonus Pack 1", "Bonus Pack 2", "Bonus Pack 3", "Bonus Pack 4", "Weekly", "Daily"];
const HOT_WINDOWS = ["Monthly", "Bonus Pack 5", "Bonus Pack 6"];

test("#8431 idle healthy windows survive rehydration even when hot windows accumulate >200 rows", () => {
  const connectionId = "conn-codebuddy-cn-8431";
  const provider = "codebuddy-cn";

  // 6 cold, healthy windows — each written exactly once (mirrors the #4438
  // no-op-write dedup for windows whose value never changes) and BEFORE the
  // hot rows below.
  for (const windowKey of COLD_WINDOWS) {
    quotaSnapshotsDb.saveQuotaSnapshot({
      provider,
      connection_id: connectionId,
      window_key: windowKey,
      remaining_percentage: 80,
      is_exhausted: 0,
      next_reset_at: "2099-01-01T00:00:00.000Z",
      window_duration_ms: null,
      raw_data: null,
    });
  }

  // 3 hot, actively-draining windows — 70 iterations x 3 windows = 210 rows,
  // all created after the cold rows, exceeding the old LIMIT 200.
  for (let i = 0; i < 70; i++) {
    for (const windowKey of HOT_WINDOWS) {
      quotaSnapshotsDb.saveQuotaSnapshot({
        provider,
        connection_id: connectionId,
        window_key: windowKey,
        remaining_percentage: 0,
        is_exhausted: 1,
        next_reset_at: "2099-01-08T00:00:00.000Z",
        window_duration_ms: null,
        raw_data: null,
      });
    }
  }

  const rehydrated = quotaSnapshotsDb.getLatestQuotaSnapshotsForConnection(connectionId);
  const rehydratedKeys = rehydrated
    .map((s) => (s as unknown as { windowKey?: string }).windowKey ?? s.window_key)
    .sort();

  assert.equal(
    rehydrated.length,
    9,
    `expected all 9 windows to survive rehydration, got ${rehydrated.length}: ${rehydratedKeys.join(", ")}`
  );

  assert.equal(
    quotaCache.isQuotaExhaustedForRequest(connectionId, provider, "deepseek-v4-pro"),
    false,
    "6 of 9 windows still have balance — the connection must not be reported as exhausted"
  );
});

test("#8431 a single-window provider is still correctly reported exhausted", () => {
  const connectionId = "conn-single-window-8431";
  const provider = "openai";

  quotaSnapshotsDb.saveQuotaSnapshot({
    provider,
    connection_id: connectionId,
    window_key: "weekly",
    remaining_percentage: 0,
    is_exhausted: 1,
    next_reset_at: null,
    window_duration_ms: null,
    raw_data: null,
  });

  assert.equal(
    quotaCache.isQuotaExhaustedForRequest(connectionId, provider, "gpt-5"),
    true,
    "single depleted window must still correctly report exhaustion"
  );
});
