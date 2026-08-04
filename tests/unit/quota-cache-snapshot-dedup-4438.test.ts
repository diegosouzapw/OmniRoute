import { test } from "node:test";
import assert from "node:assert/strict";

import { quotaSnapshotChanged } from "@/domain/quotaCache";

// Regression guard for #4438: quota_snapshots generated 400K+ rows/day because
// setQuotaCache wrote a snapshot row for EVERY window of EVERY connection on each
// 60s background refresh, even for idle connections whose quota never changed.
// quotaSnapshotChanged() gates the write so unchanged idle connections stop
// generating rows, while the first observation and every real change still persist.

test("#4438 writes when there is no prior cache entry (baseline row)", () => {
  assert.equal(quotaSnapshotChanged(null, "daily", 100, false), true);
  assert.equal(quotaSnapshotChanged(undefined, "daily", 42, false), true);
});

test("#4438 writes when the window was never seen before", () => {
  const prior = { quotas: { weekly: { remainingPercentage: 80 } }, exhausted: false };
  assert.equal(quotaSnapshotChanged(prior, "daily", 80, false), true);
});

test("#4438 skips when remaining_percentage and is_exhausted are unchanged (idle connection)", () => {
  const prior = { quotas: { daily: { remainingPercentage: 73 } }, exhausted: false };
  assert.equal(quotaSnapshotChanged(prior, "daily", 73, false), false);
});

test("#4438 writes when remaining_percentage changed", () => {
  const prior = { quotas: { daily: { remainingPercentage: 73 } }, exhausted: false };
  assert.equal(quotaSnapshotChanged(prior, "daily", 72, false), true);
});

test("#4438 writes when is_exhausted flipped even if percentage matches", () => {
  const prior = { quotas: { daily: { remainingPercentage: 0 } }, exhausted: false };
  assert.equal(quotaSnapshotChanged(prior, "daily", 0, true), true);
});
