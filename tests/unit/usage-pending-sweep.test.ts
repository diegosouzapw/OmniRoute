import test from "node:test";
import assert from "node:assert/strict";

const {
  trackPendingRequest,
  getPendingById,
  getPendingRequests,
  sweepStalePendingRequests,
  clearPendingRequests,
} = await import("../../src/lib/usage/usageHistory.ts");

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
  stale.startedAt = Date.now() - 60 * 60 * 1000; // 1 hour ago

  const removed = sweepStalePendingRequests(Date.now(), 15 * 60 * 1000);

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

  const removed = sweepStalePendingRequests(Date.now(), 15 * 60 * 1000);

  assert.equal(removed, 0);
  assert.equal(getPendingById().size, 2);
  clearPendingRequests();
});
