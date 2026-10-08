import test from "node:test";
import assert from "node:assert/strict";

const satMod = await import("../../src/lib/quota/saturationSignals.ts");
const { getSaturation, _clearSaturationCache, __setGenericUsageFetcherForTests } = satMod;

test.beforeEach(() => {
  _clearSaturationCache();
  // NOTE: _clearSaturationCache empties _cache AND _inflight. _inflight must
  // always be empty between tests anyway because every getSaturation call is
  // awaited (finally deletes on settle) — never fire-and-forget a call
  // without awaiting it in tests.
});

test("concurrent same-key calls resolve to the same value (singleflight)", async () => {
  const dim = { unit: "tokens", window: "hourly" } as const;
  const [a, b] = await Promise.all([
    getSaturation("conn-dedup", "unknown_xyz_dedup", dim),
    getSaturation("conn-dedup", "unknown_xyz_dedup", dim),
  ]);
  assert.equal(a, b);
  assert.equal(a, 0); // fail-open; both callers shared the single miss
});

test("_inflight entry is cleaned up after resolve (no leak across keys)", async () => {
  const dim = { unit: "tokens", window: "hourly" } as const;
  await getSaturation("conn-a", "unknown_xyz_a", dim);
  await getSaturation("conn-b", "unknown_xyz_b", dim);
  const [a, b] = await Promise.all([
    getSaturation("conn-a", "unknown_xyz_a", dim),
    getSaturation("conn-b", "unknown_xyz_b", dim),
  ]);
  assert.equal(a, 0);
  assert.equal(b, 0);
});

test("error path serves fail-open 0 and poisons _cache (no refetch before TTL)", async () => {
  const dim = { unit: "tokens", window: "hourly" } as const;
  const first = await getSaturation("conn-rej", "unknown_xyz_rej", dim);
  assert.equal(first, 0);
  const second = await getSaturation("conn-rej", "unknown_xyz_rej", dim);
  assert.equal(second, 0); // _cache hit, not a refetch
});

test("cache hit does not create _inflight state", async () => {
  const dim = { unit: "tokens", window: "hourly" } as const;
  await getSaturation("conn-hit", "unknown_xyz_hit", dim);
  const again = await getSaturation("conn-hit", "unknown_xyz_hit", dim);
  assert.equal(again, 0);
});

test("concurrent same-key calls start ONE upstream fetch (singleflight)", async () => {
  const dim = { unit: "tokens", window: "hourly" } as const;
  let calls = 0;
  __setGenericUsageFetcherForTests(async () => { calls++; return { quotas: {} }; });
  try {
    _clearSaturationCache();
    const [a, b] = await Promise.all([
      getSaturation("conn-dedup-count", "unknown_xyz_count", dim),
      getSaturation("conn-dedup-count", "unknown_xyz_count", dim),
    ]);
    assert.equal(a, b);
    assert.equal(calls, 1, "second concurrent caller must share the inflight fetch");
  } finally {
    __setGenericUsageFetcherForTests(null);
  }
});

test("reject path fails open to 0, serves _cache without refetch, cleans _inflight", async () => {
  const dim = { unit: "tokens", window: "hourly" } as const;
  let calls = 0;
  __setGenericUsageFetcherForTests(async () => { calls++; throw new Error("boom"); });
  try {
    _clearSaturationCache();
    const [a, b] = await Promise.all([
      getSaturation("conn-rej-throw", "unknown_xyz_rej_throw", dim),
      getSaturation("conn-rej-throw", "unknown_xyz_rej_throw", dim),
    ]);
    assert.equal(a, 0); // fail-open
    assert.equal(b, 0); // shared inflight reject
    assert.equal(calls, 1, "concurrent reject must share the single inflight fetch");
    const second = await getSaturation("conn-rej-throw", "unknown_xyz_rej_throw", dim);
    assert.equal(second, 0); // _cache poisoned to 0 for CACHE_TTL_MS
    assert.equal(calls, 1, "immediate call must hit _cache, not refetch");
    // _inflight was cleaned by the finally delete: after clearing the poisoned
    // _cache entry a new fetch is possible again.
    _clearSaturationCache();
    const third = await getSaturation("conn-rej-throw", "unknown_xyz_rej_throw", dim);
    assert.equal(third, 0);
    assert.equal(calls, 2, "after clear a refetch must be possible");
  } finally {
    __setGenericUsageFetcherForTests(null);
  }
});
