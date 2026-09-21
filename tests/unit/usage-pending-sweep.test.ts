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

// Live incident: a combo dispatch calls trackPendingRequest once PER TARGET
// ATTEMPT (open-sse/handlers/chatCore.ts's single "started" call site, hit
// again on every fallback), each previously generating its OWN fresh id. A
// dashboard tab polling /api/logs/<id> for the FIRST attempt went stale the
// moment that attempt finalized and the combo silently retried under a
// different id -- the tab had no way to discover the new id, even though the
// request kept streaming successfully. Fix: reuse the same pending id for
// every attempt sharing a correlationId (already passed as metadata on every
// "started" call, already stable across a combo's retries).
test("trackPendingRequest reuses the same id across a combo's target-attempt retries sharing a correlationId", () => {
  clearPendingRequests();

  const firstId = trackPendingRequest("model-a", "provider-a", "conn-a", true, {
    correlationId: "corr-retry-1",
  });
  assert.ok(firstId, "first attempt should produce an id");

  // First target attempt finalizes (fails) -- the combo retries with a
  // different target, but the SAME client-facing request/correlation.
  trackPendingRequest("model-a", "provider-a", "conn-a", false);
  assert.equal(getPendingById().has(firstId), false, "finalized attempt is removed by id");

  const secondId = trackPendingRequest("model-b", "provider-b", "conn-b", true, {
    correlationId: "corr-retry-1",
  });

  assert.equal(secondId, firstId, "retry attempt must reuse the first attempt's id");
  assert.equal(getPendingById().has(firstId), true, "reused id is live again under the new attempt");
  assert.equal(getPendingById().get(firstId)?.model, "model-b", "entry reflects the NEW attempt's target");

  clearPendingRequests();
});

test("trackPendingRequest never reuses an id across two different correlationIds", () => {
  clearPendingRequests();

  const idA = trackPendingRequest("model-a", "provider-a", "conn-a", true, {
    correlationId: "corr-unrelated-1",
  });
  const idB = trackPendingRequest("model-a", "provider-a", "conn-b", true, {
    correlationId: "corr-unrelated-2",
  });

  assert.ok(idA && idB);
  assert.notEqual(idA, idB, "unrelated client requests must never share a pending id");

  clearPendingRequests();
});

test("trackPendingRequest without a correlationId keeps generating a fresh id every attempt (unchanged behavior)", () => {
  clearPendingRequests();

  const idA = trackPendingRequest("model-a", "provider-a", "conn-a", true);
  trackPendingRequest("model-a", "provider-a", "conn-a", false);
  const idB = trackPendingRequest("model-a", "provider-a", "conn-a", true);

  assert.ok(idA && idB);
  assert.notEqual(idA, idB, "no correlationId means no cross-attempt identity to reuse");

  clearPendingRequests();
});

test("sweepStalePendingRequests evicts stale correlation-id-to-pending-id mappings so an old id can never resurface", () => {
  clearPendingRequests();

  const firstId = trackPendingRequest("model-a", "provider-a", "conn-a", true, {
    correlationId: "corr-stale-mapping",
  });
  assert.ok(firstId);
  trackPendingRequest("model-a", "provider-a", "conn-a", false);

  // Sweep with a max age of 0 so the just-recorded correlation mapping (whose
  // touchedAt is "now") is immediately treated as stale, mirroring what a
  // real 1-hour-later sweep does to a genuinely abandoned mapping.
  sweepStalePendingRequests(Date.now() + HOUR_MS + MINUTE_MS, HOUR_MS);

  const secondId = trackPendingRequest("model-b", "provider-b", "conn-b", true, {
    correlationId: "corr-stale-mapping",
  });

  assert.notEqual(secondId, firstId, "an evicted mapping must not resurrect the old id");

  clearPendingRequests();
});
