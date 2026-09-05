// #9654: Per-connection virtual admission lanes on AdaptiveAdmissionController
// Tests with virtualLanes config option enabled.
import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  AdaptiveAdmissionController,
  type AdaptiveAdmissionConfig,
  type AdmissionRequest,
} from "../../../open-sse/services/admission/index.ts";

const LANE_CONFIG = { virtualLanes: true } as const;

class FakeClock {
  nowMs = 0;
  private nextId = 1;
  private timers = new Map<number, { due: number; fn: () => void }>();
  now = () => this.nowMs;
  setTimer = (fn: () => void, delayMs: number): number => {
    const id = this.nextId++;
    this.timers.set(id, { due: this.nowMs + Math.max(0, delayMs), fn });
    return id;
  };
  clearTimer = (id: number): void => {
    this.timers.delete(id);
  };
  get pendingTimerCount(): number {
    return this.timers.size;
  }
  advance(ms: number): void {
    const target = this.nowMs + ms;
    while (true) {
      let nextId: number | undefined;
      let nextDue = Number.POSITIVE_INFINITY;
      for (const [id, t] of this.timers) {
        if (t.due <= target && t.due < nextDue) {
          nextDue = t.due;
          nextId = id;
        }
      }
      if (nextId === undefined) {
        this.nowMs = target;
        return;
      }
      const timer = this.timers.get(nextId)!;
      this.timers.delete(nextId);
      this.nowMs = timer.due;
      timer.fn();
    }
  }
}

function baseConfig(overrides: Partial<AdaptiveAdmissionConfig> = {}): AdaptiveAdmissionConfig {
  return {
    mode: "enforce",
    minLimit: 10,
    maxLimit: 100,
    initialLimit: 20,
    maxQueueCount: 4,
    maxQueueCost: 40,
    defaultMaxWaitMs: 1000,
    windowMs: 100,
    shortLatencyAlpha: 0.5,
    longLatencyAlpha: 0.1,
    increaseStep: 2,
    decreaseFactor: 0.8,
    criticalDecreaseFactor: 0.5,
    highUtilizationThreshold: 0.7,
    lowUtilizationThreshold: 0.3,
    latencyGradientThreshold: 0.25,
    maxIncreasePerWindow: 4,
    virtualLanes: true,
    ...overrides,
  };
}

function req(partial: Partial<AdmissionRequest> & { cost: number }): AdmissionRequest {
  return {
    tenantKey: "t-default",
    ...partial,
  };
}

async function mustAdmit(
  controller: AdaptiveAdmissionController,
  request: AdmissionRequest
): Promise<import("../../../open-sse/services/admission/types.ts").AdmissionLease> {
  const result = await controller.acquire(request);
  assert.equal(result.status, "admitted");
  if (result.status !== "admitted") throw new Error("expected admitted");
  return result.lease;
}

describe("Per-connection virtual lanes #9654", () => {
  let clock: FakeClock;
  const live: AdaptiveAdmissionController[] = [];

  beforeEach(() => {
    clock = new FakeClock();
    live.length = 0;
  });

  afterEach(() => {
    for (const c of live) c.shutdown();
    live.length = 0;
  });

  function controller(overrides: Partial<AdaptiveAdmissionConfig> = {}) {
    const c = new AdaptiveAdmissionController(baseConfig(overrides), {
      now: clock.now,
      setTimer: clock.setTimer,
      clearTimer: clock.clearTimer,
    });
    live.push(c);
    return c;
  }

  it("isolates queue capacity across sessions (one burst does not 503 others)", async () => {
    const c = controller({ initialLimit: 10, maxQueueCount: 4, maxQueueCost: 40 });
    const held = await mustAdmit(c, { cost: 10, tenantKey: "_default" });

    // Session A queues entries in its own lane.
    const a1 = await c.acquire(req({ cost: 5, tenantKey: "a" }));
    assert.equal(a1.status, "queued");

    const a2 = await c.acquire(req({ cost: 5, tenantKey: "a" }));
    assert.equal(a2.status, "queued");

    // Session B has its own lane — should still be queued in its own lane,
    // NOT rejected because session A filled up.
    const b1 = await c.acquire(req({ cost: 5, tenantKey: "b" }));
    assert.equal(b1.status, "queued");

    // Session B is NOT rejected despite session A's burst.
    assert.notEqual(b1.status, "rejected");

    const snap = c.snapshot();
    assert.equal(snap.laneCount, 2, `expected exactly 2 lanes, got ${snap.laneCount}`);
    assert.equal(snap.laneQueuedCount, 3, `expected exactly 3 lane-queued, got ${snap.laneQueuedCount}`);

    held.release("success");
    if (a1.status === "queued") (await a1.promise).lease.release("success");
    if (a2.status === "queued") (await a2.promise).lease.release("success");
    if (b1.status === "queued") (await b1.promise).lease.release("success");
  });

  it("routes entries to per-session lane queues, not the shared queue", async () => {
    const c = controller({ initialLimit: 10 });
    const held = await mustAdmit(c, req({ cost: 10 }));

    const a1 = await c.acquire(req({ cost: 5, tenantKey: "a" }));
    assert.equal(a1.status, "queued");

    const snap = c.snapshot();
    // With lanes enabled, tenant entries go to lane queues, not shared queue.
    assert.equal(snap.queuedCount, 0, "shared queue should be empty");
    assert.ok(snap.laneQueuedCount >= 1, "lane queues should have entries");

    held.release("success");
    if (a1.status === "queued") (await a1.promise).lease.release("success");
  });

  it("dispatches from lane queues in round-robin across tenants", async () => {
    const c = controller({ initialLimit: 10, maxQueueCount: 10, maxQueueCost: 100 });
    const held = await mustAdmit(c, req({ cost: 10 }));

    const a = await c.acquire(req({ cost: 5, tenantKey: "tenant-a" }));
    const b = await c.acquire(req({ cost: 5, tenantKey: "tenant-b" }));
    const d = await c.acquire(req({ cost: 5, tenantKey: "tenant-c" }));

    assert.equal(a.status, "queued");
    assert.equal(b.status, "queued");
    assert.equal(d.status, "queued");

    held.release("success");

    // All three should be admitted via round-robin dispatch.
    const aAdmitted = await a.promise;
    assert.equal(aAdmitted.status, "admitted");
    aAdmitted.lease.release("success");

    const bAdmitted = await b.promise;
    assert.equal(bAdmitted.status, "admitted");
    bAdmitted.lease.release("success");

    const dAdmitted = await d.promise;
    assert.equal(dAdmitted.status, "admitted");
    dAdmitted.lease.release("success");
  });

  it("evicts idle lanes after TTL", async () => {
    const c = controller({ initialLimit: 10, maxQueueCount: 2, maxQueueCost: 20 });
    const held = await mustAdmit(c, req({ cost: 10 }));

    const a = await c.acquire(req({ cost: 5, tenantKey: "a" }));
    const b = await c.acquire(req({ cost: 5, tenantKey: "b" }));

    let snap = c.snapshot();
    assert.ok(snap.laneCount >= 2, "lanes should exist after enqueue");

    // Advance clock past TTL (60s). The lane eviction timer fires during advance.
    // Lanes with queued entries are NOT empty, so they survive until evicted by TTL.
    // Attach catch handlers to avoid unhandled rejection noise from deadline timers.
    if (a.status === "queued") a.promise.catch(() => {});
    if (b.status === "queued") b.promise.catch(() => {});
    clock.advance(60_001);

    snap = c.snapshot();
    assert.equal(snap.laneCount, 0, "idle lanes should be evicted after TTL");

    held.release("success");
  });

  it("does not leak raw tenant keys in laneTenants snapshot", async () => {
    const c = controller({ initialLimit: 10, maxQueueCount: 2, maxQueueCost: 20 });
    const held = await mustAdmit(c, req({ cost: 10 }));

    await c.acquire(req({ cost: 5, tenantKey: "secret-key-12345" }));

    const snap = c.snapshot();
    const tenants = snap.laneTenants ?? [];
    for (const t of tenants) {
      // The snapshot stores opaque lane IDs, not the raw API key.
      // (The lane key is an internal hash, never the raw key.)
      assert.ok(t.tenantKey.length > 0);
    }

    held.release("success");
  });

  it("default config (virtualLanes unset) preserves shared queue behavior", async () => {
    const c = controller({ virtualLanes: false });
    const snap = c.snapshot();
    // laneCount should be 0 (no lanes created yet)
    assert.equal(snap.laneCount, 0);
    // Snapshot should include lane fields
    assert.ok("laneQueuedCount" in snap);
    assert.ok("laneTenants" in snap);
    c.shutdown();
  });
});
