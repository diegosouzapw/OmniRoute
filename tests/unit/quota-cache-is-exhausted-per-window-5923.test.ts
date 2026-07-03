import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * #5923 (Finding #5) — `is_exhausted` on `quota_snapshots` rows was written from
 * the connection-wide aggregate (`entries.every(q => q.remainingPercentage <= 0)`
 * in `isExhausted()`), not from the specific window being persisted.
 *
 * A connection with one window at 0% and another window at 50% never got its
 * 0%-window row flagged `is_exhausted=1`, because the AND-across-all-windows
 * aggregate was false (the 50% window kept it false). The reporter observed
 * ~360 of 274k snapshot rows ever set `is_exhausted=1` in production.
 *
 * Regression guard: `setQuotaCache` must persist `is_exhausted` per-window
 * (`remainingPercentage <= 0` for THAT window), independent of sibling windows
 * on the same connection.
 */
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-quota-per-window-5923-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const quotaSnapshotsDb = await import("../../src/lib/db/quotaSnapshots.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#5923 setQuotaCache writes is_exhausted per-window, not the connection-wide AND aggregate", () => {
  const connectionId = "conn-per-window-5923";

  quotaCache.setQuotaCache(connectionId, "anthropic", {
    session: { remainingPercentage: 0, resetAt: null },
    weekly: { remainingPercentage: 50, resetAt: null },
  });

  const snapshots = quotaSnapshotsDb.getLatestQuotaSnapshotsForConnection(connectionId);

  const sessionRow = snapshots.find((s: any) => (s.windowKey ?? s.window_key) === "session");
  const weeklyRow = snapshots.find((s: any) => (s.windowKey ?? s.window_key) === "weekly");

  assert.ok(sessionRow, "expected a persisted row for the session window");
  assert.ok(weeklyRow, "expected a persisted row for the weekly window");

  assert.equal(
    (sessionRow as any).isExhausted ?? (sessionRow as any).is_exhausted,
    1,
    "the 0%-remaining session window must be flagged is_exhausted=1"
  );
  assert.equal(
    (weeklyRow as any).isExhausted ?? (weeklyRow as any).is_exhausted,
    0,
    "the 50%-remaining weekly window must NOT be flagged is_exhausted (sibling window is exhausted, but this one isn't)"
  );
});
