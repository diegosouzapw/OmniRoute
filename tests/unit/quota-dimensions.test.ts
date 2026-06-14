import { test } from "node:test";
import assert from "node:assert/strict";

import {
  QuotaUnitSchema,
  QuotaWindowSchema,
  PolicySchema,
  QuotaDimensionSchema,
  PoolAllocationSchema,
  ProviderPlanSchema,
  QuotaPoolSchema,
  WINDOW_MS,
  dimensionKeyToString,
} from "../../src/lib/quota/dimensions";

test("QuotaUnitSchema accepts all 4 valid units", () => {
  for (const u of ["percent", "requests", "tokens", "usd"] as const) {
    const r = QuotaUnitSchema.safeParse(u);
    assert.ok(r.success);
    assert.equal(r.data, u);
  }
});

test("QuotaUnitSchema rejects unknown unit", () => {
  assert.equal(QuotaUnitSchema.safeParse("bytes").success, false);
});

test("QuotaWindowSchema accepts all 5 valid windows", () => {
  for (const w of ["5h", "hourly", "daily", "weekly", "monthly"] as const) {
    const r = QuotaWindowSchema.safeParse(w);
    assert.ok(r.success);
  }
});

test("QuotaWindowSchema rejects unknown window", () => {
  assert.equal(QuotaWindowSchema.safeParse("yearly").success, false);
});

test("PolicySchema accepts hard/soft/burst", () => {
  for (const p of ["hard", "soft", "burst"] as const) {
    assert.ok(PolicySchema.safeParse(p).success);
  }
});

test("PolicySchema rejects unknown policy", () => {
  assert.equal(PolicySchema.safeParse("strict").success, false);
});

test("QuotaDimensionSchema parses valid dimension", () => {
  const r = QuotaDimensionSchema.safeParse({ unit: "percent", window: "5h", limit: 100 });
  assert.ok(r.success);
  assert.deepEqual(r.data, { unit: "percent", window: "5h", limit: 100 });
});

test("QuotaDimensionSchema rejects limit <= 0", () => {
  assert.equal(
    QuotaDimensionSchema.safeParse({ unit: "tokens", window: "daily", limit: 0 }).success,
    false
  );
});

test("QuotaDimensionSchema rejects negative limit", () => {
  assert.equal(
    QuotaDimensionSchema.safeParse({ unit: "tokens", window: "daily", limit: -1 }).success,
    false
  );
});

test("PoolAllocationSchema parses valid allocation", () => {
  const r = PoolAllocationSchema.safeParse({ apiKeyId: "k-abc", weight: 50, policy: "hard" });
  assert.ok(r.success);
});

test("PoolAllocationSchema rejects weight > 100", () => {
  assert.equal(
    PoolAllocationSchema.safeParse({ apiKeyId: "k", weight: 101, policy: "soft" }).success,
    false
  );
});

test("PoolAllocationSchema rejects empty apiKeyId", () => {
  assert.equal(
    PoolAllocationSchema.safeParse({ apiKeyId: "", weight: 50, policy: "hard" }).success,
    false
  );
});

test("PoolAllocationSchema accepts capValue + capUnit", () => {
  const r = PoolAllocationSchema.safeParse({
    apiKeyId: "k1",
    weight: 30,
    policy: "burst",
    capValue: 1000,
    capUnit: "tokens",
  });
  assert.ok(r.success);
  assert.equal(r.data?.capValue, 1000);
});

test("ProviderPlanSchema parses valid plan", () => {
  const r = ProviderPlanSchema.safeParse({
    connectionId: "conn-1",
    provider: "codex",
    dimensions: [{ unit: "percent", window: "5h", limit: 100 }],
    source: "auto",
  });
  assert.ok(r.success);
});

test("ProviderPlanSchema accepts connectionId=null", () => {
  const r = ProviderPlanSchema.safeParse({
    connectionId: null,
    provider: "openai",
    dimensions: [{ unit: "tokens", window: "hourly", limit: 1000 }],
    source: "manual",
  });
  assert.ok(r.success);
  assert.equal(r.data?.connectionId, null);
});

test("ProviderPlanSchema rejects empty dimensions array", () => {
  assert.equal(
    ProviderPlanSchema.safeParse({
      connectionId: "c",
      provider: "openai",
      dimensions: [],
      source: "manual",
    }).success,
    false
  );
});

test("QuotaPoolSchema parses valid pool", () => {
  const r = QuotaPoolSchema.safeParse({
    id: "pool-1",
    connectionId: "conn-1",
    name: "My Pool",
    createdAt: "2024-01-01T00:00:00.000Z",
    allocations: [],
  });
  assert.ok(r.success);
});

test("QuotaPoolSchema defaults allocations to empty array", () => {
  const r = QuotaPoolSchema.safeParse({
    id: "pool-2",
    connectionId: "conn-2",
    name: "Pool2",
    createdAt: "2024-06-01T00:00:00.000Z",
  });
  assert.ok(r.success);
  assert.deepEqual(r.data?.allocations, []);
});

test("WINDOW_MS has correct value for hourly", () => {
  assert.equal(WINDOW_MS.hourly, 3_600_000);
});

test("WINDOW_MS has correct value for 5h", () => {
  assert.equal(WINDOW_MS["5h"], 18_000_000);
});

test("WINDOW_MS has correct value for daily", () => {
  assert.equal(WINDOW_MS.daily, 86_400_000);
});

test("WINDOW_MS has correct value for weekly", () => {
  assert.equal(WINDOW_MS.weekly, 604_800_000);
});

test("WINDOW_MS has correct value for monthly (30 days approximation)", () => {
  assert.equal(WINDOW_MS.monthly, 30 * 86_400_000);
});

test("WINDOW_MS covers all 5 windows", () => {
  for (const w of ["5h", "hourly", "daily", "weekly", "monthly"] as const) {
    assert.ok(WINDOW_MS[w] > 0);
  }
});

test("dimensionKeyToString produces stable colon-separated string", () => {
  assert.equal(
    dimensionKeyToString({ poolId: "pool-abc", unit: "percent", window: "5h" }),
    "pool-abc:percent:5h"
  );
});

test("dimensionKeyToString parts are recoverable", () => {
  const s = dimensionKeyToString({ poolId: "my-pool", unit: "tokens", window: "weekly" });
  assert.deepEqual(s.split(":"), ["my-pool", "tokens", "weekly"]);
});

test("dimensionKeyToString has no collision across unit/window combos", () => {
  const seen = new Set<string>();
  for (const unit of ["percent", "requests", "tokens", "usd"] as const) {
    for (const window of ["5h", "hourly", "daily", "weekly", "monthly"] as const) {
      const s = dimensionKeyToString({ poolId: "p", unit, window });
      assert.ok(!seen.has(s), `collision for ${s}`);
      seen.add(s);
    }
  }
  assert.equal(seen.size, 20);
});
