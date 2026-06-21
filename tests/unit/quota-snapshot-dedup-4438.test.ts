import test from "node:test";
import assert from "node:assert/strict";

// #4438: the quota-cache background refresh persisted a snapshot row for ALL ~273
// connections every 60s (400K+ rows/day), most of them identical for idle connections.
// quotaSnapshotChanged gates the write so only real changes are recorded.

const { quotaSnapshotChanged } = await import("../../src/lib/db/quotaSnapshotDedup.ts");

test("#4438 records the first snapshot (no prior state)", () => {
  assert.equal(quotaSnapshotChanged(undefined, { remainingPercentage: 80, isExhausted: false }), true);
});

test("#4438 skips an identical snapshot (idle connection, unchanged quota)", () => {
  const prev = { remainingPercentage: 80, isExhausted: false };
  assert.equal(quotaSnapshotChanged(prev, { remainingPercentage: 80, isExhausted: false }), false);
});

test("#4438 records when remaining percentage changes", () => {
  const prev = { remainingPercentage: 80, isExhausted: false };
  assert.equal(quotaSnapshotChanged(prev, { remainingPercentage: 79, isExhausted: false }), true);
});

test("#4438 records when exhaustion flips", () => {
  const prev = { remainingPercentage: 0, isExhausted: false };
  assert.equal(quotaSnapshotChanged(prev, { remainingPercentage: 0, isExhausted: true }), true);
});
