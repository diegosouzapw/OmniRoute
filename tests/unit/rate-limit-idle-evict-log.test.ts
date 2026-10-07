import test from "node:test";
import assert from "node:assert/strict";
import Bottleneck from "bottleneck";
import { LimiterWedgeWatchdog } from "../../open-sse/services/rateLimitManager/wedgeWatchdog.ts";

const INACTIVE_MS = 10 * 60 * 1000;

function buildWatchdog(
  _now: number,
  keys: string[],
  lastUsedOf: (key: string) => number,
  limiterOptions: Bottleneck.ConstructorOptions = {}
) {
  const limiters = new Map<string, Bottleneck>();
  const limiterLastUsed = new Map<string, number>();
  for (const key of keys) {
    const limiter = new Bottleneck(limiterOptions);
    limiters.set(key, limiter);
    limiterLastUsed.set(key, lastUsedOf(key));
  }
  const logCalls: unknown[][] = [];
  const debugCalls: unknown[][] = [];
  const tracked: Promise<unknown>[] = [];
  const watchdog = new LimiterWedgeWatchdog({
    limiters,
    limiterLastUsed,
    limiterEffectiveSettings: new WeakMap(),
    preservedReplacementSettings: new Map(),
    trackBackground: (promise) => {
      tracked.push(promise);
      promise.catch(() => {});
    },
    log: (...args) => {
      logCalls.push(args);
    },
    warn: (...args) => {
      void args;
    },
    debug: (...args) => {
      debugCalls.push(args);
    },
  });
  return { watchdog, limiters, logCalls, debugCalls, tracked };
}

async function cleanup(limiters: Map<string, Bottleneck>) {
  for (const limiter of limiters.values()) {
    await limiter.disconnect().catch(() => {});
  }
}

test("idle eviction aggregates the info log to one line with per-key debug detail", async (t) => {
  const now = Date.now();
  const keys = ["prov-a:conn-1", "prov-b:conn-2", "prov-c:conn-3"];
  const { watchdog, limiters, logCalls, debugCalls } = buildWatchdog(
    now,
    keys,
    () => now - INACTIVE_MS - 60_000
  );
  t.after(() => cleanup(limiters));
  await watchdog.run(now);
  assert.equal(logCalls.length, 1);
  assert.match(String(logCalls[0][0]), /Evicted idle limiters: 3/);
  assert.equal(debugCalls.length, 3);
  for (const key of keys) {
    assert.ok(
      debugCalls.some((args) => String(args[0]).includes(key)),
      `expected debug detail for ${key}`
    );
  }
});

test("a single idle eviction still emits one aggregated info line", async (t) => {
  const now = Date.now();
  const { watchdog, limiters, logCalls, debugCalls } = buildWatchdog(
    now,
    ["prov-a:conn-1"],
    () => now - INACTIVE_MS - 60_000
  );
  t.after(() => cleanup(limiters));
  await watchdog.run(now);
  assert.equal(logCalls.length, 1);
  assert.match(String(logCalls[0][0]), /Evicted idle limiters: 1/);
  assert.equal(debugCalls.length, 1);
});

test("a pass without eviction emits no eviction info line", async (t) => {
  const now = Date.now();
  const { watchdog, limiters, logCalls, debugCalls } = buildWatchdog(
    now,
    ["prov-a:conn-1"],
    () => now
  );
  t.after(() => cleanup(limiters));
  await watchdog.run(now);
  assert.equal(logCalls.length, 0);
  assert.equal(debugCalls.length, 0);
});

test("a limiter with queued work is kept and stays silent", async (t) => {
  const now = Date.now();
  const reservoir = { reservoir: 0, reservoirRefreshAmount: 0, reservoirRefreshInterval: 60_000 };
  const { watchdog, limiters, logCalls, debugCalls } = buildWatchdog(
    now,
    ["prov-a:conn-1"],
    () => now - INACTIVE_MS - 60_000,
    reservoir
  );
  const limiter = limiters.get("prov-a:conn-1")!;
  const gate = limiter.schedule(() => new Promise(() => {}));
  gate.catch(() => {});
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(limiter.counts().QUEUED, 1);
  t.after(async () => {
    await limiter.stop({ dropWaitingJobs: true }).catch(() => {});
    await cleanup(limiters);
  });
  await watchdog.run(now);
  assert.equal(logCalls.length, 0);
  assert.equal(debugCalls.length, 0);
  assert.ok(limiters.has("prov-a:conn-1"));
});

test("without an injected debug hook the per-key detail falls back to console.debug", async (t) => {
  const now = Date.now();
  const limiters = new Map<string, Bottleneck>();
  const limiterLastUsed = new Map<string, number>();
  for (const key of ["prov-a:conn-1", "prov-b:conn-2", "prov-c:conn-3"]) {
    limiters.set(key, new Bottleneck());
    limiterLastUsed.set(key, now - INACTIVE_MS - 60_000);
  }
  const logCalls: unknown[][] = [];
  const consoleDebugCalls: unknown[][] = [];
  const originalDebug = console.debug;
  console.debug = (...args: unknown[]) => {
    consoleDebugCalls.push(args);
  };
  t.after(() => {
    console.debug = originalDebug;
  });
  t.after(() => cleanup(limiters));
  const watchdog = new LimiterWedgeWatchdog({
    limiters,
    limiterLastUsed,
    limiterEffectiveSettings: new WeakMap(),
    preservedReplacementSettings: new Map(),
    trackBackground: (promise) => {
      promise.catch(() => {});
    },
    log: (...args) => {
      logCalls.push(args);
    },
    warn: () => {},
  });
  await watchdog.run(now);
  assert.equal(logCalls.length, 1);
  assert.equal(consoleDebugCalls.length, 3);
});

test("the headline oldest-idle figure ignores entries without a recorded last use", async (t) => {
  const now = Date.now();
  const keys = ["prov-a:conn-1", "prov-b:conn-2", "prov-c:conn-3"];
  const { watchdog, limiters, logCalls } = buildWatchdog(now, keys, (key) =>
    key === "prov-c:conn-3" ? 0 : now - 642_000
  );
  t.after(() => cleanup(limiters));
  await watchdog.run(now);
  assert.equal(logCalls.length, 1);
  assert.match(String(logCalls[0][0]), /oldest idle 642s/);
});
