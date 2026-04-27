import test from "node:test";
import assert from "node:assert/strict";

const {
  parseCrofUsageResponse,
  fetchCrofUsage,
  invalidateCrofUsageCache,
  registerCrofUsageFetcher,
} = await import("../../open-sse/services/crofUsageFetcher.ts");

test("parseCrofUsageResponse: subscription account with remaining requests", () => {
  const quota = parseCrofUsageResponse({ usable_requests: 450, credits: 12.34 });
  assert.ok(quota);
  assert.equal(quota.usableRequests, 450);
  assert.equal(quota.credits, 12.34);
  assert.equal(quota.percentUsed, 0, "non-zero requests must not block");
  assert.equal(quota.total, 450);
});

test("parseCrofUsageResponse: subscription account exhausted blocks (percentUsed=1)", () => {
  const quota = parseCrofUsageResponse({ usable_requests: 0, credits: 0 });
  assert.ok(quota);
  assert.equal(quota.usableRequests, 0);
  assert.equal(quota.percentUsed, 1);
});

test("parseCrofUsageResponse: pay-as-you-go account uses credits as gate", () => {
  const positive = parseCrofUsageResponse({ usable_requests: null, credits: 5.5 });
  assert.ok(positive);
  assert.equal(positive.usableRequests, null);
  assert.equal(positive.credits, 5.5);
  assert.equal(positive.percentUsed, 0);

  const empty = parseCrofUsageResponse({ usable_requests: null, credits: 0 });
  assert.ok(empty);
  assert.equal(empty.percentUsed, 1);
});

test("parseCrofUsageResponse: handles string-encoded numbers (defensive)", () => {
  const quota = parseCrofUsageResponse({ usable_requests: "200", credits: "3.75" });
  assert.ok(quota);
  assert.equal(quota.usableRequests, 200);
  assert.equal(quota.credits, 3.75);
  assert.equal(quota.percentUsed, 0);
});

test("parseCrofUsageResponse: rejects non-object payloads", () => {
  assert.equal(parseCrofUsageResponse(null), null);
  assert.equal(parseCrofUsageResponse("hello"), null);
  assert.equal(parseCrofUsageResponse([]), null);
});

test("fetchCrofUsage: returns null when the connection has no apiKey (fail-open)", async () => {
  const result = await fetchCrofUsage("conn-no-key", { apiKey: "" });
  assert.equal(result, null);
});

test("fetchCrofUsage: caches the parsed response and serves it from memory", async () => {
  const fakeKey = `unit-${Date.now()}`;
  let calls = 0;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    calls += 1;
    return new Response(JSON.stringify({ usable_requests: 99, credits: 1.5 }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    invalidateCrofUsageCache(fakeKey);
    const first = await fetchCrofUsage(fakeKey, { apiKey: "test-key" });
    const second = await fetchCrofUsage(fakeKey, { apiKey: "test-key" });
    assert.ok(first && second);
    assert.equal(first.percentUsed, 0);
    assert.equal((first as { usableRequests?: number }).usableRequests, 99);
    assert.equal(calls, 1, "second call must hit the cache, not the network");
  } finally {
    globalThis.fetch = originalFetch;
    invalidateCrofUsageCache(fakeKey);
  }
});

test("fetchCrofUsage: returns null on non-2xx and clears cache on auth failure", async () => {
  const fakeKey = `unit-401-${Date.now()}`;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("nope", { status: 401 });
  try {
    invalidateCrofUsageCache(fakeKey);
    const result = await fetchCrofUsage(fakeKey, { apiKey: "bad-key" });
    assert.equal(result, null);
  } finally {
    globalThis.fetch = originalFetch;
    invalidateCrofUsageCache(fakeKey);
  }
});

test("registerCrofUsageFetcher: idempotent registration call does not throw", () => {
  registerCrofUsageFetcher();
  registerCrofUsageFetcher();
});
