/**
 * tests/unit/combo-headroom-strategy.test.ts
 *
 * Integration coverage for orderTargetsByHeadroom
 * (open-sse/services/combo/quotaStrategies.ts) — the async orderer that wires
 * per-connection saturation into the pure rankByHeadroom helper.
 *
 * Isolated from DB/network: targets carry explicit connectionIds and use a
 * provider with NO registered quota fetcher, so getQuotaAwareConnectionsForTarget
 * short-circuits (no getProviderConnections call). The getSaturation signal is
 * injected via __setHeadroomSaturationFetcherForTests.
 */

import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/services/combo/quotaStrategies.ts");
const { orderTargetsByHeadroom, __setHeadroomSaturationFetcherForTests } = mod;

const silentLog = { warn: () => {} };

function target(connectionId: string, modelStr = "testprov/model-a") {
  return {
    kind: "model" as const,
    stepId: connectionId,
    executionKey: `key-${connectionId}`,
    modelStr,
    provider: "testprov",
    providerId: "testprov",
    connectionId,
    weight: 1,
    label: null,
  };
}

test.afterEach(() => {
  __setHeadroomSaturationFetcherForTests(null);
});

test("orderTargetsByHeadroom: prefers the connection with the most free capacity", async () => {
  // conn-busy is at 0.8 util (5h), conn-free at 0.2 → free should come first.
  __setHeadroomSaturationFetcherForTests(async (connectionId, _provider, dim) => {
    const table: Record<string, { "5h": number; weekly: number }> = {
      "conn-busy": { "5h": 0.8, weekly: 0.1 },
      "conn-free": { "5h": 0.2, weekly: 0.1 },
    };
    return table[connectionId]?.[dim.window as "5h" | "weekly"] ?? 0;
  });

  const ordered = await orderTargetsByHeadroom(
    [target("conn-busy"), target("conn-free")],
    "combo-x",
    silentLog
  );
  assert.deepEqual(
    ordered.map((t) => t.connectionId),
    ["conn-free", "conn-busy"]
  );
});

test("orderTargetsByHeadroom: weekly window can bind even when 5h is low", async () => {
  // conn-a: balanced 0.5/0.5 → headroom 0.5
  // conn-b: 5h great (0.1) but weekly nearly exhausted (0.95) → headroom 0.05
  __setHeadroomSaturationFetcherForTests(async (connectionId, _provider, dim) => {
    const table: Record<string, { "5h": number; weekly: number }> = {
      "conn-a": { "5h": 0.5, weekly: 0.5 },
      "conn-b": { "5h": 0.1, weekly: 0.95 },
    };
    return table[connectionId]?.[dim.window as "5h" | "weekly"] ?? 0;
  });

  const ordered = await orderTargetsByHeadroom(
    [target("conn-a"), target("conn-b")],
    "combo-x",
    silentLog
  );
  assert.deepEqual(
    ordered.map((t) => t.connectionId),
    ["conn-a", "conn-b"]
  );
});

test("orderTargetsByHeadroom: equal saturation preserves priority order (stable)", async () => {
  __setHeadroomSaturationFetcherForTests(async () => 0.3);
  const ordered = await orderTargetsByHeadroom(
    [target("c1"), target("c2"), target("c3")],
    "combo-x",
    silentLog
  );
  assert.deepEqual(
    ordered.map((t) => t.connectionId),
    ["c1", "c2", "c3"]
  );
});

test("orderTargetsByHeadroom: saturation fetcher throwing fails open (keeps order)", async () => {
  __setHeadroomSaturationFetcherForTests(async () => {
    throw new Error("boom");
  });
  const ordered = await orderTargetsByHeadroom(
    [target("c1"), target("c2")],
    "combo-x",
    silentLog
  );
  // Fail-open: the orderer catches and returns the original target order.
  assert.deepEqual(
    ordered.map((t) => t.connectionId),
    ["c1", "c2"]
  );
});

test("orderTargetsByHeadroom: single / empty target is a no-op without calling the fetcher", async () => {
  let called = 0;
  __setHeadroomSaturationFetcherForTests(async () => {
    called++;
    return 0;
  });
  assert.deepEqual(await orderTargetsByHeadroom([], "combo-x", silentLog), []);
  const one = [target("solo")];
  const orderedOne = await orderTargetsByHeadroom(one, "combo-x", silentLog);
  assert.deepEqual(
    orderedOne.map((t) => t.connectionId),
    ["solo"]
  );
  assert.equal(called, 0, "fetcher must not be called for <=1 target");
});

test("orderTargetsByHeadroom: fetches each unique connection's saturation once (5h+weekly)", async () => {
  const calls: string[] = [];
  __setHeadroomSaturationFetcherForTests(async (connectionId, _provider, dim) => {
    calls.push(`${connectionId}:${dim.window}`);
    return connectionId === "hot" ? 0.9 : 0.1;
  });

  const ordered = await orderTargetsByHeadroom(
    [target("hot"), target("cool")],
    "combo-x",
    silentLog
  );
  assert.deepEqual(
    ordered.map((t) => t.connectionId),
    ["cool", "hot"]
  );
  // Exactly one 5h + one weekly probe per unique connection (2 conns → 4 calls).
  calls.sort();
  assert.deepEqual(calls, ["cool:5h", "cool:weekly", "hot:5h", "hot:weekly"]);
});
