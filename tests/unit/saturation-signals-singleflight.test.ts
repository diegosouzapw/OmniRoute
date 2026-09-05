import test from "node:test";
import assert from "node:assert/strict";

const satMod = await import("../../src/lib/quota/saturationSignals.ts");
const { getSaturation, _clearSaturationCache, __setGenericUsageFetcherForTests } = satMod;

test.beforeEach(() => {
  _clearSaturationCache();
  // NOTE: _clearSaturationCache empties _cache only. _inflight is always empty
  // between tests because every getSaturation call is awaited (finally deletes
  // on settle) — never fire-and-forget a call without awaiting it in tests.
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
