import test from "node:test";
import assert from "node:assert/strict";

const {
  trackPendingRequest,
  getPendingById,
  getPendingRequests,
  sweepStalePendingRequests,
  getMaxPendingRequestAgeMs,
  clearPendingRequests,
} = await import("../../src/lib/usage/usageHistory.ts");

const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;

test("sweepStalePendingRequests evicts orphaned pending details and self-heals counts", () => {
  clearPendingRequests();

  // One request that will be treated as orphaned (never finalized), one fresh.
  const staleId = trackPendingRequest("gpt-x", "openai", "conn-stale", true);
  const freshId = trackPendingRequest("gpt-x", "openai", "conn-fresh", true);

  assert.ok(staleId && freshId, "both started requests should produce ids");
  assert.equal(getPendingById().size, 2);
  assert.equal(getPendingRequests().byModel["gpt-x (openai)"], 2);

  // Age the stale entry well beyond the max age.
  const stale = getPendingById().get(staleId);
  assert.ok(stale, "stale detail should exist");
  stale.startedAt = Date.now() - 2 * HOUR_MS;

  const removed = sweepStalePendingRequests(Date.now(), HOUR_MS);

  assert.equal(removed, 1, "exactly one orphaned entry should be swept");
  assert.equal(getPendingById().size, 1, "only the fresh entry should remain");
  assert.ok(getPendingById().has(freshId), "fresh entry must survive");

  // Counts must reflect the eviction (decremented, not left dangling).
  assert.equal(getPendingRequests().byModel["gpt-x (openai)"], 1);
  assert.equal(getPendingRequests().byAccount["conn-stale"], undefined);
  assert.equal(getPendingRequests().byAccount["conn-fresh"]["gpt-x (openai)"], 1);

  clearPendingRequests();
});

test("sweepStalePendingRequests is a no-op when nothing is stale", () => {
  clearPendingRequests();
  trackPendingRequest("m", "p", "c1", true);
  trackPendingRequest("m", "p", "c2", true);

  const removed = sweepStalePendingRequests(Date.now(), HOUR_MS);

  assert.equal(removed, 0);
  assert.equal(getPendingById().size, 2);
  clearPendingRequests();
});

test("sweepStalePendingRequests defaults to a one hour max pending age", () => {
  clearPendingRequests();

  const staleId = trackPendingRequest("m", "p", "old", true);
  const recentId = trackPendingRequest("m", "p", "recent", true);
  assert.ok(staleId && recentId);

  const now = Date.now();
  const stale = getPendingById().get(staleId);
  const recent = getPendingById().get(recentId);
  assert.ok(stale && recent);

  stale.startedAt = now - 61 * MINUTE_MS;
  recent.startedAt = now - 59 * MINUTE_MS;

  const removed = sweepStalePendingRequests(now);

  assert.equal(removed, 1);
  assert.equal(getPendingById().has(staleId), false);
  assert.equal(getPendingById().has(recentId), true);
  clearPendingRequests();
});

test("pending sweep max age can be overridden through environment", () => {
  clearPendingRequests();
  const previous = process.env.MAX_PENDING_REQUEST_AGE_MS;
  process.env.MAX_PENDING_REQUEST_AGE_MS = String(2 * HOUR_MS);

  try {
    const requestId = trackPendingRequest("m", "p", "custom-age", true);
    assert.ok(requestId);

    const detail = getPendingById().get(requestId);
    assert.ok(detail);
    detail.startedAt = Date.now() - 90 * MINUTE_MS;

    assert.equal(getMaxPendingRequestAgeMs(), 2 * HOUR_MS);
    assert.equal(sweepStalePendingRequests(Date.now()), 0);
    assert.equal(getPendingById().has(requestId), true);
  } finally {
    if (previous === undefined) delete process.env.MAX_PENDING_REQUEST_AGE_MS;
    else process.env.MAX_PENDING_REQUEST_AGE_MS = previous;
    clearPendingRequests();
  }
});

test("invalid pending sweep max age falls back to one hour", () => {
  const previous = process.env.MAX_PENDING_REQUEST_AGE_MS;
  process.env.MAX_PENDING_REQUEST_AGE_MS = "not-a-number";

  try {
    assert.equal(getMaxPendingRequestAgeMs(), HOUR_MS);
  } finally {
    if (previous === undefined) delete process.env.MAX_PENDING_REQUEST_AGE_MS;
    else process.env.MAX_PENDING_REQUEST_AGE_MS = previous;
  }
});
