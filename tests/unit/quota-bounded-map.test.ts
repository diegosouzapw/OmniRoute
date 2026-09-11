import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../src/lib/quota/boundedMap.ts");
const { boundedMap } = mod;

test("boundedMap evicts least-recently-used beyond cap and get refreshes recency", () => {
  const m = boundedMap("t", 3, "lru");
  m.set("a", 1); m.set("b", 2); m.set("c", 3);
  assert.equal(m.get("a"), 1); // refreshes a
  m.set("d", 4); // evicts b (least recent)
  assert.equal(m.get("b"), undefined);
  assert.equal(m.get("a"), 1);
  assert.equal(m.size, 3);
});

test("boundedMap shouldEvict protects pins, last-resort evicts oldest pin", () => {
  const m = boundedMap<{ pin: boolean }>("t", 2, "lru", 0, { shouldEvict: (v) => !v.pin });
  m.set("pin1", { pin: true });
  m.set("x", { pin: false });
  m.set("y", { pin: false }); // evicts x (non-pin LRU), pin1 survives
  assert.deepEqual(m.get("pin1"), { pin: true });
  assert.equal(m.get("x"), undefined);
  m.set("pin2", { pin: true }); // pins only → last resort: pin1 (oldest)
  m.set("pin3", { pin: true });
  assert.equal(m.size, 2);
  assert.equal(m.get("pin1"), undefined); // pin1, the oldest, is the victim
  assert.deepEqual(m.get("pin2"), { pin: true });
  assert.deepEqual(m.get("pin3"), { pin: true });
});

test("boundedMap logs eviction with the map name", () => {
  const warned: string[] = [];
  const orig = console.warn;
  console.warn = (msg: string) => { warned.push(String(msg)); };
  try {
    const m = boundedMap("my-cache", 1, "lru");
    m.set("a", 1);
    m.set("b", 2); // evicts a → warns
  } finally {
    console.warn = orig;
  }
  assert.ok(warned.some((w) => w.includes("my-cache")), `warned=${JSON.stringify(warned)}`);
});

test("boundedMap iterates keys and supports delete-during-iteration", () => {
  const m = boundedMap("t", 10, "lru");
  m.set("a", 1); m.set("b", 2);
  for (const key of m.keys()) {
    if (key === "a") m.delete(key);
  }
  assert.equal(m.size, 1);
  assert.deepEqual([...m.keys()], ["b"]);
});

test("boundedMap refetch-lazy expires entries past TTL on get", () => {
  const m = boundedMap("t", 10, "refetch-lazy", 1000);
  m.set("a", 1, 0);
  assert.equal(m.get("a", 500), 1);
  assert.equal(m.get("a", 2000), undefined); // expired → caller refetches
});

test("boundedMap hard-expire returns undefined past TTL", () => {
  const m = boundedMap("t", 10, "hard-expire", 1000);
  m.set("a", 1, 0);
  assert.equal(m.get("a", 2000), undefined);
});

test("learnedLimits caps at 200 via public updateFromHeaders + getLearnedLimits", async () => {
  const rl = await import("../../open-sse/services/rateLimitManager.ts");
  await rl.__resetRateLimitManagerForTests();
  try {
    for (let i = 0; i < 201; i++) {
      const conn = `conn-cap-${i}`;
      rl.enableRateLimitProtection(conn);
      rl.updateFromHeaders(
        "openai",
        conn,
        { "x-ratelimit-limit-requests": "100", "x-ratelimit-remaining-requests": "5", "x-ratelimit-reset-requests": "30s" },
        200
      );
    }
    const learned = rl.getLearnedLimits();
    assert.ok(Object.keys(learned).length <= 200, `size=${Object.keys(learned).length}`);
  } finally {
    await rl.__resetRateLimitManagerForTests();
  }
});

test("learnedLimits persist/load round-trip via __flushLearnedLimitsForTests + settings", async () => {
  const rl = await import("../../open-sse/services/rateLimitManager.ts");
  const settings = await import("../../src/lib/db/settings.ts");
  await rl.__resetRateLimitManagerForTests();
  try {
    rl.enableRateLimitProtection("conn-rt");
    rl.updateFromHeaders(
      "openai",
      "conn-rt",
      { "x-ratelimit-limit-requests": "100", "x-ratelimit-remaining-requests": "5", "x-ratelimit-reset-requests": "30s" },
      200
    );
    await rl.__flushLearnedLimitsForTests();
    const raw = (await settings.getSettings())?.learnedRateLimits;
    assert.equal(typeof raw, "string");
    const parsed = JSON.parse(raw as string) as Record<string, { limit?: number }>;
    assert.ok(parsed["openai:conn-rt"], "persisted payload must contain the learned key");
    assert.equal(parsed["openai:conn-rt"].limit, 100);
    // Load path: reset memory then re-init from settings → entry survives.
    await rl.__resetRateLimitManagerForTests();
    assert.deepEqual(rl.getLearnedLimits(), {});
    await rl.initializeRateLimits();
    assert.ok(rl.getLearnedLimits()["openai:conn-rt"], "load must restore the persisted entry");
  } finally {
    await rl.__resetRateLimitManagerForTests();
  }
});

test("saturation _cache evicts beyond 512 via __setGenericUsageFetcherForTests + getSaturation", async () => {
  const sat = await import("../../src/lib/quota/saturationSignals.ts");
  sat._clearSaturationCache();
  let calls = 0;
  sat.__setGenericUsageFetcherForTests(async () => { calls++; return { percentUsed: 0.1 }; });
  try {
    for (let i = 0; i < 513; i++) {
      await sat.getSaturation(`conn-sat-${i}`, "some-provider", { unit: "tokens", window: "hourly" });
    }
    const before = calls;
    await sat.getSaturation("conn-sat-0", "some-provider", { unit: "tokens", window: "hourly" });
    assert.ok(calls > before, `evicted key must refetch (calls ${before} -> ${calls})`);
  } finally {
    sat.__setGenericUsageFetcherForTests(null);
    sat._clearSaturationCache();
  }
});

test("header caches evict beyond 256 each via storeRateLimitHeaders", async () => {
  const sat = await import("../../src/lib/quota/saturationSignals.ts");
  sat._clearRateLimitHeaders();
  try {
    for (let i = 0; i < 257; i++) {
      sat.storeRateLimitHeaders(`hdr-${i}`, "openai", {
        "x-ratelimit-limit-requests": "100",
        "x-ratelimit-remaining-requests": "5",
        "anthropic-ratelimit-tokens-limit": "1000",
        "anthropic-ratelimit-tokens-remaining": "10",
      });
    }
    // First entry evicted from both maps: request → 0 (fail-open), token → null.
    const { getSaturation } = sat;
    assert.equal(await getSaturation("hdr-0", "anthropic", { unit: "tokens", window: "hourly" }), 0);
    assert.equal(sat.getTokenHeaderSaturation("openai", "hdr-0"), null);
    // Last entry still present in both maps.
    assert.ok(sat.getTokenHeaderSaturation("openai", "hdr-256") !== null);
  } finally {
    sat._clearRateLimitHeaders();
  }
});

test("quality semantic pin survives LRU pressure via shouldEvict predicate", async () => {
  const q = await import("../../open-sse/services/routing/quality.ts");
  q.resetQualityTracker();
  q.recordQualityEvent({ provider: "pinned", model: "model", outcome: "success", status: 200, latencyMs: 100, finishReason: "stop" });
  q.setSemanticQuality("pinned", "model", 0.9, 1);
  const snap = q.getQualitySnapshot();
  const view = snap.find((v) => v.provider === "pinned" && v.model === "model");
  assert.ok(view, "pinned entry must be tracked");
  assert.equal(view!.semantic, 0.9);
  q.resetQualityTracker();
});

test("quota-fetcher cache evicts beyond 512 (refetch-lazy, 60s TTL)", async () => {
  const g = await import("../../open-sse/services/genericQuotaFetcher.ts");
  g.__resetGenericQuotaFetcherForTests();
  let calls = 0;
  g.__setGenericUsageFetcherForTests(async () => {
    calls++;
    return { quotas: { session: { remainingPercentage: 50, resetAt: null } } };
  });
  try {
    for (let i = 0; i < 513; i++) {
      await g.fetchGenericQuota(`gqf-${i}`, { id: `gqf-${i}`, provider: "openai" });
    }
    const before = calls;
    await g.fetchGenericQuota("gqf-0", { id: "gqf-0", provider: "openai" });
    assert.ok(calls > before, `evicted key must refetch (calls ${before} -> ${calls})`);
  } finally {
    g.__setGenericUsageFetcherForTests(null);
    g.__resetGenericQuotaFetcherForTests();
  }
});

test("account buckets cap at 1024 via recordUsage", async () => {
  const b = await import("../../src/lib/quota/accountBuckets.ts");
  b._clearBucketsForTest();
  for (let i = 0; i < 1025; i++) {
    b.recordUsage(`conn-b-${i}`, "5h", 100, null);
  }
  assert.ok(b._bucketCountForTest() <= 1024, `count=${b._bucketCountForTest()}`);
  b._clearBucketsForTest();
});
