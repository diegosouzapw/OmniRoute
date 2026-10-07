import test from "node:test";
import assert from "node:assert/strict";

const { boundedMap } = await import("../../src/lib/quota/boundedMap.ts");
const core = await import("../../src/lib/db/core.ts");

type LogLine = { meta: Record<string, unknown>; message: string };
function captureLog() {
  const lines: LogLine[] = [];
  return {
    lines,
    log: {
      warn: (meta: Record<string, unknown>, message: string) => lines.push({ meta, message }),
    },
  };
}

test.after(() => {
  core.resetDbInstance();
});

// ── boundedMap primitives ────────────────────────────────────────────────────

test("lru: evicts the least-recently-used entry and get refreshes recency", () => {
  const { log } = captureLog();
  const m = boundedMap<number>("t", 3, "lru", 0, { log });
  m.set("a", 1);
  m.set("b", 2);
  m.set("c", 3);
  assert.equal(m.get("a"), 1); // a is now the most recent
  m.set("d", 4); // evicts b
  assert.equal(m.get("b"), undefined);
  assert.equal(m.get("a"), 1);
  assert.equal(m.size, 3);
  assert.deepEqual(m.stats(), { evictions: 1, overflowInserts: 0 });
});

test("ttl: reads never refresh — the oldest-written entry is evicted", () => {
  const { log } = captureLog();
  const m = boundedMap<number>("t", 3, "ttl", 60_000, { log });
  m.set("a", 1, 0);
  m.set("b", 2, 1);
  m.set("c", 3, 2);
  assert.equal(m.get("a", 3), 1); // a read, but ttl ignores recency
  m.set("d", 4, 4); // evicts a (oldest write), unlike lru which would evict b
  assert.equal(m.get("a", 5), undefined);
  assert.equal(m.get("b", 5), 2);
});

test("ttl: entries expire after ttlMs; lru entries never expire", () => {
  const ttl = boundedMap<number>("t", 10, "ttl", 1000);
  ttl.set("a", 1, 0);
  assert.equal(ttl.get("a", 1000), 1);
  assert.equal(ttl.get("a", 1001), undefined);
  assert.equal(ttl.size, 0, "an expired read drops the entry");

  const lru = boundedMap<number>("t", 10, "lru", 1000);
  lru.set("a", 1, 0);
  assert.equal(lru.get("a", 10_000_000), 1);
});

test("ttl: expired entries are swept before any fresh entry is evicted", () => {
  const { log } = captureLog();
  const m = boundedMap<number>("t", 3, "ttl", 100, { log });
  m.set("old1", 1, 0);
  m.set("fresh", 2, 150);
  m.set("old2", 3, 0);
  m.set("new", 4, 160); // old1 + old2 expired at 160 → swept, fresh survives
  assert.equal(m.get("fresh", 170), 2);
  assert.equal(m.get("new", 170), 4);
  assert.equal(m.stats().evictions, 0, "a sweep of expired entries is not an eviction");
});

test("protected entries are never evicted: the map grows past the cap instead", () => {
  const { log } = captureLog();
  const m = boundedMap<{ pin: boolean }>("t", 2, "lru", 0, {
    shouldEvict: (v) => !v.pin,
    log,
  });
  m.set("pin1", { pin: true });
  m.set("x", { pin: false });
  m.set("y", { pin: false }); // evicts x, the only evictable entry
  assert.equal(m.get("x"), undefined);
  m.set("pin2", { pin: true }); // evicts y
  m.set("pin3", { pin: true }); // nothing evictable → grows
  assert.equal(m.size, 3);
  for (const key of ["pin1", "pin2", "pin3"]) assert.deepEqual(m.get(key), { pin: true });
  assert.deepEqual(m.stats(), { evictions: 2, overflowInserts: 1 });
});

test("eviction logging is aggregated and rate-limited, never one line per eviction", () => {
  const { lines, log } = captureLog();
  const m = boundedMap<number>("hot-cache", 10, "lru", 0, { log, logIntervalMs: 60_000 });
  for (let i = 0; i < 10; i++) m.set(`seed-${i}`, i, 0);
  for (let i = 0; i < 1000; i++) m.set(`k-${i}`, i, 1000 + i); // 1000 evictions in ~1s
  assert.equal(lines.length, 1, "first eviction logs once, the rest are aggregated");
  assert.equal(lines[0].meta.map, "hot-cache");
  assert.equal(lines[0].meta.evicted, 1);

  m.set("late", 1, 1000 + 61_000); // past the interval → one summary line
  assert.equal(lines.length, 2);
  assert.equal(
    lines[1].meta.evicted,
    1000,
    "the summary carries every eviction since the last line"
  );
  assert.match(lines[1].message, /\[boundedMap:hot-cache\] cap 10 reached: evicted 1000 entries/);
});

test("the default logger is the project logger, not console.warn", () => {
  const original = console.warn;
  let consoleWarnings = 0;
  console.warn = () => {
    consoleWarnings += 1;
  };
  try {
    const m = boundedMap<number>("console-check", 1, "lru");
    m.set("a", 1);
    m.set("b", 2);
    m.set("c", 3);
    assert.equal(m.stats().evictions, 2);
  } finally {
    console.warn = original;
  }
  assert.equal(consoleWarnings, 0);
});

test("keys() iteration tolerates delete during iteration", () => {
  const m = boundedMap<number>("t", 10, "lru");
  m.set("a", 1);
  m.set("b", 2);
  for (const key of m.keys()) {
    if (key === "a") m.delete(key);
  }
  assert.deepEqual([...m.keys()], ["b"]);
});

// ── account buckets: never fail open ─────────────────────────────────────────

test("account buckets never evict a live saturated bucket, even past the soft cap", async () => {
  const b = await import("../../src/lib/quota/accountBuckets.ts");
  b._clearBucketsForTest();
  const now = 1_800_000_000_000;
  const future = new Date(now + 3_600_000).toISOString();
  try {
    const total = b.ACCOUNT_BUCKETS_SOFT_CAP + 25;
    for (let i = 0; i < total; i++) b.recordUsage(`conn-live-${i}`, "5h", 100, future, now);
    assert.equal(b._bucketCountForTest(), total, "no saturated bucket was dropped");
    assert.equal(b.isBucketSaturated("conn-live-0", "5h", now + 1), true, "oldest still saturated");
    assert.equal(b.isBucketSaturated(`conn-live-${total - 1}`, "5h", now + 1), true);
  } finally {
    b._clearBucketsForTest();
  }
});

test("account buckets at the cap evict buckets whose reset already passed first", async () => {
  const b = await import("../../src/lib/quota/accountBuckets.ts");
  b._clearBucketsForTest();
  const now = 1_800_000_000_000;
  const soon = new Date(now + 1_000).toISOString();
  const later = new Date(now + 3_600_000).toISOString();
  try {
    b.recordUsage("conn-stale", "5h", 100, soon, now); // resets 1s later
    for (let i = 1; i < b.ACCOUNT_BUCKETS_SOFT_CAP; i++) {
      b.recordUsage(`conn-keep-${i}`, "5h", 100, later, now);
    }
    assert.equal(b._bucketCountForTest(), b.ACCOUNT_BUCKETS_SOFT_CAP);
    b.recordUsage("conn-new", "5h", 100, later, now + 5_000); // stale bucket is evictable now
    assert.equal(b._bucketCountForTest(), b.ACCOUNT_BUCKETS_SOFT_CAP, "stale bucket made room");
    assert.equal(b.isBucketSaturated("conn-keep-1", "5h", now + 5_001), true);
    assert.equal(b.isBucketSaturated("conn-new", "5h", now + 5_001), true);
  } finally {
    b._clearBucketsForTest();
  }
});

// ── quality tracker under real pressure ──────────────────────────────────────

test("quality: past the cap the LRU unscored pair is dropped, semantic pins survive", async () => {
  const q = await import("../../open-sse/services/routing/quality.ts");
  q.resetQualityTracker();
  const event = (provider: string, model: string) => ({
    provider,
    model,
    outcome: "success",
    status: 200,
    latencyMs: 100,
    finishReason: "stop",
  });
  try {
    q.recordQualityEvent(event("pinned", "model"));
    q.setSemanticQuality("pinned", "model", 0.9, 1);
    q.recordQualityEvent(event("first", "unscored"));
    for (let i = 0; i < q.QUALITY_STATES_CAP + 50; i++) {
      q.recordQualityEvent(event("bulk", `m-${i}`));
    }
    const snapshot = q.getQualitySnapshot(q.QUALITY_STATES_CAP * 2);
    assert.equal(snapshot.length, q.QUALITY_STATES_CAP, "tracker stays at its cap");
    const pinned = snapshot.find((v) => v.provider === "pinned");
    assert.ok(pinned, "the semantic pin survived the pressure");
    assert.equal(pinned.semantic, 0.9);
    assert.equal(q.getProviderQuality("first", "unscored").samples, 0, "LRU unscored pair evicted");
    assert.ok(q.getProviderQuality("bulk", `m-${q.QUALITY_STATES_CAP + 49}`).samples > 0);
  } finally {
    q.resetQualityTracker();
  }
});

// ── learned rate limits ──────────────────────────────────────────────────────

const HEADERS = {
  "x-ratelimit-limit-requests": "100",
  "x-ratelimit-remaining-requests": "5",
  "x-ratelimit-reset-requests": "30s",
};

test("learnedLimits: a deployment above the old unenforced 200 keeps every entry", async () => {
  const rl = await import("../../open-sse/services/rateLimitManager.ts");
  await rl.__resetRateLimitManagerForTests();
  try {
    for (let i = 0; i < 300; i++) {
      rl.enableRateLimitProtection(`conn-many-${i}`);
      rl.updateFromHeaders("openai", `conn-many-${i}`, HEADERS, 200);
    }
    assert.equal(Object.keys(rl.getLearnedLimits()).length, 300);
  } finally {
    await rl.__resetRateLimitManagerForTests();
  }
});

test("learnedLimits: capped at MAX_LEARNED_LIMITS", async () => {
  const rl = await import("../../open-sse/services/rateLimitManager.ts");
  await rl.__resetRateLimitManagerForTests();
  try {
    for (let i = 0; i <= rl.MAX_LEARNED_LIMITS; i++) {
      rl.enableRateLimitProtection(`conn-cap-${i}`);
      rl.updateFromHeaders("openai", `conn-cap-${i}`, HEADERS, 200);
    }
    const learned = rl.getLearnedLimits();
    assert.equal(Object.keys(learned).length, rl.MAX_LEARNED_LIMITS);
    assert.equal(learned["openai:conn-cap-0"], undefined, "oldest entry evicted");
  } finally {
    await rl.__resetRateLimitManagerForTests();
  }
});

test("learnedLimits persist/load round-trip", async () => {
  const rl = await import("../../open-sse/services/rateLimitManager.ts");
  const settings = await import("../../src/lib/db/settings.ts");
  await rl.__resetRateLimitManagerForTests();
  try {
    rl.enableRateLimitProtection("conn-rt");
    rl.updateFromHeaders("openai", "conn-rt", HEADERS, 200);
    await rl.__flushLearnedLimitsForTests();
    const raw = (await settings.getSettings())?.learnedRateLimits;
    assert.equal(typeof raw, "string");
    const parsed = JSON.parse(raw as string) as Record<string, { limit?: number }>;
    assert.equal(parsed["openai:conn-rt"]?.limit, 100);
    await rl.__resetRateLimitManagerForTests();
    assert.deepEqual(rl.getLearnedLimits(), {});
    await rl.initializeRateLimits();
    assert.ok(rl.getLearnedLimits()["openai:conn-rt"], "load restores the persisted entry");
  } finally {
    await rl.__resetRateLimitManagerForTests();
  }
});

// ── TTL caches keep their read-through behaviour ────────────────────────────

test("saturation cache: hits stay cached below the cap, the evicted key refetches past it", async () => {
  const sat = await import("../../src/lib/quota/saturationSignals.ts");
  sat._clearSaturationCache();
  let calls = 0;
  sat.__setGenericUsageFetcherForTests(async () => {
    calls++;
    return { percentUsed: 0.1 };
  });
  const dim = { unit: "tokens", window: "hourly" } as const;
  try {
    for (let i = 0; i < 600; i++) await sat.getSaturation(`conn-sat-${i}`, "some-provider", dim);
    const warm = calls;
    await sat.getSaturation("conn-sat-0", "some-provider", dim);
    assert.equal(calls, warm, "600 entries (above the old 512 cap) are still cached");

    for (let i = 600; i < 4097; i++) await sat.getSaturation(`conn-sat-${i}`, "some-provider", dim);
    const before = calls;
    // ttl policy: the read above did not refresh conn-sat-0, so as the oldest write
    // it is the one entry evicted by the 4097th insert.
    await sat.getSaturation("conn-sat-0", "some-provider", dim);
    assert.ok(calls > before, `evicted key must refetch (calls ${before} -> ${calls})`);
  } finally {
    sat.__setGenericUsageFetcherForTests(null);
    sat._clearSaturationCache();
  }
});

test("quota-fetcher cache: entries above the old 512 cap stay cached", async () => {
  const g = await import("../../open-sse/services/genericQuotaFetcher.ts");
  g.__resetGenericQuotaFetcherForTests();
  let calls = 0;
  g.__setGenericUsageFetcherForTests(async () => {
    calls++;
    return { quotas: { session: { remainingPercentage: 50, resetAt: null } } };
  });
  try {
    for (let i = 0; i < 600; i++) {
      await g.fetchGenericQuota(`gqf-${i}`, { id: `gqf-${i}`, provider: "openai" });
    }
    const before = calls;
    await g.fetchGenericQuota("gqf-0", { id: "gqf-0", provider: "openai" });
    assert.equal(calls, before, "cache hit, no refetch");
  } finally {
    g.__setGenericUsageFetcherForTests(null);
    g.__resetGenericQuotaFetcherForTests();
  }
});
