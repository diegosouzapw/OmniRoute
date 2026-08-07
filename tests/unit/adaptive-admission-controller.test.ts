import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  AdaptiveAdmissionController,
  createAdmissionRejectError,
  type AdaptiveAdmissionConfig,
  type AdmissionLease,
  type AdmissionPressure,
  type AdmissionRequest,
} from "../../open-sse/services/admission/index.ts";

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
): Promise<AdmissionLease> {
  const result = await controller.acquire(request);
  assert.equal(result.status, "admitted");
  if (result.status !== "admitted") throw new Error("expected admitted");
  return result.lease;
}

describe("AdaptiveAdmissionController config and modes", () => {
  let clock: FakeClock;
  beforeEach(() => {
    clock = new FakeClock();
  });

  function make(overrides: Partial<AdaptiveAdmissionConfig> = {}) {
    return new AdaptiveAdmissionController(baseConfig(overrides), {
      now: clock.now,
      setTimer: clock.setTimer,
      clearTimer: clock.clearTimer,
    });
  }

  it("validates safe-integer bounds and ordered adaptation parameters", () => {
    assert.throws(() => make({ minLimit: 50, maxLimit: 10 }), /minLimit/);
    for (const invalid of [0.5, Number.POSITIVE_INFINITY, Number.MAX_VALUE]) {
      assert.throws(() => make({ maxQueueCount: invalid }), /maxQueueCount/);
      assert.throws(() => make({ initialLimit: invalid }), /initialLimit/);
    }
    assert.throws(() => make({ decreaseFactor: 1.2 }), /decreaseFactor/);
    assert.throws(
      () => make({ decreaseFactor: 0.5, criticalDecreaseFactor: 0.8 }),
      /criticalDecreaseFactor/
    );
    assert.throws(
      () => make({ lowUtilizationThreshold: 0.8, highUtilizationThreshold: 0.7 }),
      /lowUtilizationThreshold/
    );
    assert.throws(
      () => make({ shortLatencyAlpha: 0.1, longLatencyAlpha: 0.5 }),
      /shortLatencyAlpha/
    );
  });

  it("clamps initial limit into [minLimit, maxLimit]", () => {
    const low = make({ initialLimit: 1, minLimit: 10 });
    assert.equal(low.snapshot().currentLimit, 10);
    low.shutdown();
    const high = make({ initialLimit: 999, maxLimit: 100 });
    assert.equal(high.snapshot().currentLimit, 100);
    high.shutdown();
  });

  it("mode off never accounts cost or rejects", async () => {
    const c = make({ mode: "off", initialLimit: 5 });
    const a = await c.acquire(req({ cost: 100 }));
    const b = await c.acquire(req({ cost: 100 }));
    assert.equal(a.status, "admitted");
    assert.equal(b.status, "admitted");
    const snap = c.snapshot();
    assert.equal(snap.activeCost, 0);
    assert.equal(snap.activeCount, 0);
    assert.equal(snap.rejectedCount, 0);
    c.shutdown();
  });

  it("defaults to shadow mode when mode omitted", () => {
    const c = new AdaptiveAdmissionController(
      {
        minLimit: 10,
        maxLimit: 100,
        initialLimit: 20,
        maxQueueCount: 2,
        maxQueueCost: 20,
      } as AdaptiveAdmissionConfig,
      { now: clock.now, setTimer: clock.setTimer, clearTimer: clock.clearTimer }
    );
    assert.equal(c.snapshot().mode, "shadow");
    c.shutdown();
  });
});

describe("shadow mode semantics", () => {
  let clock: FakeClock;
  beforeEach(() => {
    clock = new FakeClock();
  });

  it("never rejects or delays while recording would-decisions and real active cost", async () => {
    const c = new AdaptiveAdmissionController(
      baseConfig({ mode: "shadow", initialLimit: 10, maxQueueCount: 1, maxQueueCost: 10 }),
      { now: clock.now, setTimer: clock.setTimer, clearTimer: clock.clearTimer }
    );

    const first = await c.acquire(req({ cost: 8 }));
    assert.equal(first.status, "admitted");
    if (first.status !== "admitted") return;
    assert.equal(first.shadowDecision, "would-admit");
    assert.equal(c.snapshot().activeCost, 8);

    const second = await c.acquire(req({ cost: 8 }));
    assert.equal(second.status, "admitted");
    if (second.status !== "admitted") return;
    // Would have queued under enforce (active 8 + 8 > 10) but shadow admits immediately.
    assert.equal(second.shadowDecision, "would-queue");
    assert.equal(c.snapshot().activeCost, 16);
    assert.equal(c.snapshot().queuedCount, 0);
    assert.ok((c.snapshot().wouldQueueCount ?? 0) >= 1);

    const oversized = await c.acquire(req({ cost: 50 }));
    assert.equal(oversized.status, "admitted");
    if (oversized.status !== "admitted") return;
    assert.equal(oversized.shadowDecision, "would-reject");
    assert.ok((c.snapshot().wouldRejectCount ?? 0) >= 1);

    first.lease.release("success");
    second.lease.release("success");
    oversized.lease.release("success");
    assert.equal(c.snapshot().activeCost, 0);
    c.shutdown();
  });

  it("simulates virtual queue saturation and promotes queued work on release", async () => {
    const c = new AdaptiveAdmissionController(
      baseConfig({ mode: "shadow", initialLimit: 10, maxQueueCount: 1, maxQueueCost: 8 }),
      { now: clock.now, setTimer: clock.setTimer, clearTimer: clock.clearTimer }
    );
    const active = await c.acquire(req({ cost: 8, tenantKey: "active" }));
    const queued = await c.acquire(req({ cost: 8, tenantKey: "queued" }));
    const saturated = await c.acquire(req({ cost: 8, tenantKey: "saturated" }));
    assert.equal(active.status, "admitted");
    assert.equal(queued.status, "admitted");
    assert.equal(saturated.status, "admitted");
    if (
      active.status !== "admitted" ||
      queued.status !== "admitted" ||
      saturated.status !== "admitted"
    ) {
      return;
    }
    assert.equal(active.shadowDecision, "would-admit");
    assert.equal(queued.shadowDecision, "would-queue");
    assert.equal(saturated.shadowDecision, "would-reject");
    assert.deepEqual(
      {
        activeCost: c.snapshot().virtualActiveCost,
        activeCount: c.snapshot().virtualActiveCount,
        queuedCost: c.snapshot().virtualQueuedCost,
        queuedCount: c.snapshot().virtualQueuedCount,
      },
      { activeCost: 8, activeCount: 1, queuedCost: 8, queuedCount: 1 }
    );

    active.lease.release();
    assert.deepEqual(
      {
        activeCost: c.snapshot().virtualActiveCost,
        activeCount: c.snapshot().virtualActiveCount,
        queuedCost: c.snapshot().virtualQueuedCost,
        queuedCount: c.snapshot().virtualQueuedCount,
      },
      { activeCost: 8, activeCount: 1, queuedCost: 0, queuedCount: 0 }
    );
    queued.lease.release();
    saturated.lease.release();
    c.shutdown();
  });

  it("promotes shadow virtual queue after adaptation raises the limit", async () => {
    const c = new AdaptiveAdmissionController(
      baseConfig({
        mode: "shadow",
        minLimit: 10,
        maxLimit: 20,
        initialLimit: 10,
        maxQueueCount: 4,
        maxQueueCost: 40,
        windowMs: 100,
        increaseStep: 5,
        maxIncreasePerWindow: 5,
        highUtilizationThreshold: 0.5,
      }),
      { now: clock.now, setTimer: clock.setTimer, clearTimer: clock.clearTimer }
    );

    const active = await c.acquire(req({ cost: 10, tenantKey: "active" }));
    const queued = await c.acquire(req({ cost: 5, tenantKey: "queued" }));
    assert.equal(active.status, "admitted");
    assert.equal(queued.status, "admitted");
    if (active.status !== "admitted" || queued.status !== "admitted") return;
    assert.equal(active.shadowDecision, "would-admit");
    assert.equal(queued.shadowDecision, "would-queue");
    assert.equal(c.snapshot().virtualActiveCost, 10);
    assert.equal(c.snapshot().virtualQueuedCost, 5);

    // Raise the adaptive limit once while both leases remain open. Shadow admits a
    // probe for completion evidence; active integral is capped at the current limit.
    const probe = await c.acquire(req({ cost: 1, tenantKey: "probe" }));
    assert.equal(probe.status, "admitted");
    if (probe.status === "admitted") {
      clock.advance(80);
      probe.lease.release("success", { latencyMs: 10 });
      clock.advance(20);
      c.tick();
    }

    assert.equal(c.snapshot().currentLimit, 15);
    // Queued virtual work must be promoted before newer arrivals are classified.
    assert.equal(c.snapshot().virtualActiveCost, 15);
    assert.equal(c.snapshot().virtualQueuedCost, 0);

    const later = await c.acquire(req({ cost: 5, tenantKey: "later" }));
    assert.equal(later.status, "admitted");
    if (later.status !== "admitted") return;
    // With virtual active already 15 at limit 15, a later cost-5 cannot would-admit.
    assert.notEqual(later.shadowDecision, "would-admit");

    active.lease.release();
    queued.lease.release();
    later.lease.release();
    c.shutdown();
  });
});

describe("weighted enforce, queue, fairness, and races", () => {
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

  it("enforces weighted active-cost budget and rejects oversized requests immediately", async () => {
    const c = controller({ initialLimit: 20 });
    const a = await mustAdmit(c, req({ cost: 12 }));
    const b = await c.acquire(req({ cost: 12 }));
    assert.equal(b.status, "queued");

    const over = await c.acquire(req({ cost: 25 }));
    assert.equal(over.status, "rejected");
    if (over.status === "rejected") {
      assert.equal(over.code, "ADMISSION_OVERSIZED");
    }

    a.release("success");
    if (b.status === "queued") {
      const admitted = await b.promise;
      assert.equal(admitted.status, "admitted");
      admitted.lease.release("success");
    }
  });

  it("bounds queue by count and total queued cost", async () => {
    const c = controller({
      minLimit: 10,
      initialLimit: 10,
      maxLimit: 10,
      maxQueueCount: 2,
      maxQueueCost: 15,
    });
    const held = await mustAdmit(c, req({ cost: 10 }));

    const q1 = await c.acquire(req({ cost: 5, tenantKey: "a" }));
    const q2 = await c.acquire(req({ cost: 5, tenantKey: "b" }));
    assert.equal(q1.status, "queued");
    assert.equal(q2.status, "queued");
    assert.equal(c.snapshot().queuedCount, 2);
    assert.equal(c.snapshot().queuedCost, 10);

    const byCount = await c.acquire(req({ cost: 1, tenantKey: "c" }));
    assert.equal(byCount.status, "rejected");
    if (byCount.status === "rejected") assert.equal(byCount.code, "ADMISSION_QUEUE_FULL");

    held.release("success");
    if (q1.status === "queued") (await q1.promise).lease.release("success");
    if (q2.status === "queued") (await q2.promise).lease.release("success");

    const c2 = controller({
      minLimit: 5,
      initialLimit: 5,
      maxLimit: 5,
      maxQueueCount: 10,
      maxQueueCost: 7,
    });
    const h = await mustAdmit(c2, req({ cost: 5 }));
    // cost 3 fits limit but not active budget → queued (queuedCost=3).
    // Another cost 5 fits the budget but 3+5 > maxQueueCost=7 → QUEUE_FULL.
    const ok = await c2.acquire(req({ cost: 3 }));
    assert.equal(ok.status, "queued");
    const costFull = await c2.acquire(req({ cost: 5 }));
    assert.equal(costFull.status, "rejected");
    if (costFull.status === "rejected") assert.equal(costFull.code, "ADMISSION_QUEUE_FULL");
    h.release("success");
    if (ok.status === "queued") (await ok.promise).lease.release("success");
  });

  it("expires deadline and abort without leaking queue slots", async () => {
    const c = controller({
      minLimit: 5,
      initialLimit: 5,
      maxLimit: 5,
      maxQueueCount: 4,
      maxQueueCost: 40,
      defaultMaxWaitMs: 50,
    });
    const held = await mustAdmit(c, req({ cost: 5 }));

    const timed = await c.acquire(req({ cost: 3, maxWaitMs: 30 }));
    assert.equal(timed.status, "queued");
    clock.advance(31);
    if (timed.status === "queued") {
      await assert.rejects(timed.promise, (err: unknown) => {
        assert.equal((err as { code?: string }).code, "ADMISSION_DEADLINE");
        return true;
      });
    }
    assert.equal(c.snapshot().queuedCount, 0);

    const ac = new AbortController();
    const aborted = await c.acquire(req({ cost: 3, signal: ac.signal }));
    assert.equal(aborted.status, "queued");
    ac.abort();
    if (aborted.status === "queued") {
      await assert.rejects(aborted.promise, (err: unknown) => {
        assert.equal((err as { code?: string }).code, "ADMISSION_ABORTED");
        return true;
      });
    }
    assert.equal(c.snapshot().queuedCount, 0);
    held.release("success");
  });

  it("treats the exact deadline as expired and settles abort/release races once", async () => {
    const c = controller({ minLimit: 5, initialLimit: 5, maxLimit: 5, defaultMaxWaitMs: 30 });
    const held = await mustAdmit(c, req({ cost: 5 }));
    const ac = new AbortController();
    const queued = await c.acquire(req({ cost: 3, maxWaitMs: 30, signal: ac.signal }));
    assert.equal(queued.status, "queued");

    clock.advance(30);
    ac.abort();
    held.release("success");

    if (queued.status === "queued") {
      await assert.rejects(queued.promise, (err: unknown) => {
        assert.equal((err as { code?: string }).code, "ADMISSION_DEADLINE");
        return true;
      });
    }
    assert.equal(c.snapshot().queuedCount, 0);
    assert.equal(c.snapshot().rejectedCount, 1);
  });

  it("shutdown rejects queued work and clears every fake-clock timer", async () => {
    const c = controller({
      minLimit: 5,
      initialLimit: 5,
      maxLimit: 5,
      maxQueueCount: 4,
      maxQueueCost: 40,
    });
    const held = await mustAdmit(c, req({ cost: 5 }));
    const q = await c.acquire(req({ cost: 3, maxWaitMs: 5000 }));
    assert.equal(q.status, "queued");
    assert.ok(clock.pendingTimerCount >= 2);
    c.shutdown();
    if (q.status === "queued") {
      await assert.rejects(q.promise, (err: unknown) => {
        assert.equal((err as { code?: string }).code, "ADMISSION_SHUTDOWN");
        return true;
      });
    }
    assert.equal(c.snapshot().queuedCount, 0);
    assert.equal(clock.pendingTimerCount, 0);
    held.release("success");
    const after = await c.acquire(req({ cost: 1 }));
    assert.equal(after.status, "rejected");
    if (after.status === "rejected") assert.equal(after.code, "ADMISSION_SHUTDOWN");
  });

  it("updateConfig atomically settles queues, dispatches raised capacity, and respects decreases", async () => {
    const c = controller({ minLimit: 5, initialLimit: 5, maxLimit: 20, windowMs: 100 });
    const held = await mustAdmit(c, req({ cost: 5 }));
    const queued = await c.acquire(req({ cost: 5 }));
    assert.equal(queued.status, "queued");

    c.updateConfig(baseConfig({ minLimit: 10, initialLimit: 10, maxLimit: 20, windowMs: 50 }));
    assert.equal(clock.pendingTimerCount, 1);
    if (queued.status === "queued") {
      const admitted = await queued.promise;
      assert.equal(c.snapshot().activeCost, 10);

      c.updateConfig(baseConfig({ minLimit: 5, initialLimit: 5, maxLimit: 5, windowMs: 50 }));
      const afterDecrease = await c.acquire(req({ cost: 1 }));
      assert.equal(afterDecrease.status, "queued");

      c.updateConfig(baseConfig({ mode: "shadow", minLimit: 5, initialLimit: 5, maxLimit: 5 }));
      if (afterDecrease.status === "queued") {
        const settled = await afterDecrease.promise;
        assert.equal(settled.status, "admitted");
        settled.lease.release();
      }
      admitted.lease.release();
    }
    held.release();
  });

  it("queue shrink rejects deterministic round-robin excess and preserves fitting entries", async () => {
    const c = controller({
      minLimit: 5,
      initialLimit: 5,
      maxLimit: 5,
      maxQueueCount: 4,
      maxQueueCost: 20,
    });
    const held = await mustAdmit(c, req({ cost: 5 }));
    const first = await c.acquire(req({ cost: 2, tenantKey: "a" }));
    const second = await c.acquire(req({ cost: 2, tenantKey: "b" }));
    const third = await c.acquire(req({ cost: 2, tenantKey: "a" }));
    assert.equal(first.status, "queued");
    assert.equal(second.status, "queued");
    assert.equal(third.status, "queued");

    c.updateConfig(
      baseConfig({
        minLimit: 5,
        initialLimit: 5,
        maxLimit: 5,
        maxQueueCount: 2,
        maxQueueCost: 4,
      })
    );
    assert.equal(c.snapshot().queuedCount, 2);
    if (third.status === "queued") {
      await assert.rejects(third.promise, (err: unknown) => {
        assert.equal((err as { code?: string }).code, "ADMISSION_QUEUE_FULL");
        return true;
      });
    }
    held.release();
    if (first.status === "queued") (await first.promise).lease.release();
    if (second.status === "queued") (await second.promise).lease.release();
  });

  it("release is idempotent under race with abort", async () => {
    const c = controller({ initialLimit: 10 });
    const lease = await mustAdmit(c, req({ cost: 4 }));
    lease.release("success");
    lease.release("timeout");
    lease.release("success");
    assert.equal(c.snapshot().activeCost, 0);
    assert.equal(c.snapshot().activeCount, 0);
  });

  it("fairly schedules across tenants under skew without exposing tenant ids", async () => {
    const c = controller({
      minLimit: 5,
      initialLimit: 5,
      maxLimit: 5,
      maxQueueCount: 10,
      maxQueueCost: 100,
    });
    const held = await mustAdmit(c, req({ cost: 5, tenantKey: "hold" }));

    const order: string[] = [];
    const queued: Array<Promise<void>> = [];
    for (let i = 0; i < 4; i++) {
      const r = await c.acquire(req({ cost: 5, tenantKey: "heavy" }));
      assert.equal(r.status, "queued");
      if (r.status === "queued") {
        queued.push(
          r.promise.then((admitted) => {
            order.push("heavy");
            admitted.lease.release("success");
          })
        );
      }
    }
    const light = await c.acquire(req({ cost: 5, tenantKey: "light" }));
    assert.equal(light.status, "queued");
    if (light.status === "queued") {
      queued.push(
        light.promise.then((admitted) => {
          order.push("light");
          admitted.lease.release("success");
        })
      );
    }

    // Free capacity one slot at a time.
    held.release("success");
    await Promise.resolve();
    // After first release, one request should admit; keep draining by waiting microtasks between releases.
    // Drain remaining by letting each admitted release free the next.
    await Promise.all(queued);

    // Light must not be starved behind all four heavy requests.
    const lightIndex = order.indexOf("light");
    assert.ok(lightIndex >= 0);
    assert.ok(lightIndex < 4, `light scheduled too late: ${order.join(",")}`);

    const snap = c.snapshot();
    const json = JSON.stringify(snap);
    assert.equal(json.includes("heavy"), false);
    assert.equal(json.includes("light"), false);
    assert.equal(json.includes("hold"), false);
  });

  it("dispatches a fitting tenant when another tenant's queue head cannot fit", async () => {
    const c = controller({
      minLimit: 10,
      initialLimit: 10,
      maxLimit: 10,
      maxQueueCount: 10,
      maxQueueCost: 100,
    });
    const heldSix = await mustAdmit(c, req({ cost: 6, tenantKey: "holder" }));
    const heldFour = await mustAdmit(c, req({ cost: 4, tenantKey: "holder" }));
    const expensive = await c.acquire(req({ cost: 6, tenantKey: "expensive" }));
    const fitting = await c.acquire(req({ cost: 4, tenantKey: "fitting" }));
    assert.equal(expensive.status, "queued");
    assert.equal(fitting.status, "queued");

    heldFour.release("success");
    if (fitting.status === "queued") {
      const admitted = await fitting.promise;
      assert.equal(admitted.lease.cost, 4);
      admitted.lease.release("success");
    }
    assert.equal(c.snapshot().queuedCount, 1);

    heldSix.release("success");
    if (expensive.status === "queued") (await expensive.promise).lease.release("success");
  });

  it("bounds starvation of an older unfittable cost-6 behind a stream of cost-2 work", async () => {
    const c = controller({
      minLimit: 10,
      initialLimit: 10,
      maxLimit: 10,
      maxQueueCount: 20,
      maxQueueCost: 100,
      defaultMaxWaitMs: 10_000,
    });
    // Hold 6 so available=4: cost-2 can pass over cost-6 until reservation engages.
    const held = await mustAdmit(c, req({ cost: 6, tenantKey: "holder" }));

    const expensive = await c.acquire(req({ cost: 6, tenantKey: "expensive" }));
    assert.equal(expensive.status, "queued");

    // Two actual smaller dequeues through queued promises (pass-overs that age the head).
    const passOvers: AdmissionLease[] = [];
    for (let i = 0; i < 2; i++) {
      const r = await c.acquire(req({ cost: 2, tenantKey: `small-pass-${i}` }));
      assert.equal(r.status, "queued", `pass-over ${i} should join the non-empty queue`);
      if (r.status !== "queued") throw new Error("expected queued");
      const admitted = await r.promise;
      assert.equal(admitted.lease.cost, 2);
      passOvers.push(admitted.lease);
      admitted.lease.release("success");
      assert.equal(c.snapshot().activeCost, 6);
    }
    assert.equal(passOvers.length, 2);

    // A subsequent fitting cost-2 must remain queued: capacity is reserved for cost-6.
    // Without reservation accounting this would admit immediately and the assertion fails.
    const blocked = await c.acquire(req({ cost: 2, tenantKey: "small-blocked" }));
    assert.equal(blocked.status, "queued");
    await Promise.resolve();
    assert.equal(c.snapshot().activeCost, 6, "reserved head must block fitting smaller work");
    assert.equal(c.snapshot().queuedCount, 2);

    const order: number[] = [];
    assert.equal(expensive.status, "queued");
    assert.equal(blocked.status, "queued");
    const expensiveDone = expensive.promise.then((admitted) => {
      order.push(admitted.lease.cost);
      return admitted;
    });
    const blockedDone = blocked.promise.then((admitted) => {
      order.push(admitted.lease.cost);
      return admitted;
    });

    // Free enough capacity for cost-6; the older reserved request must admit first.
    // With activeCost back at 0 both may fit in one dispatch turn, so only order is asserted.
    held.release("success");
    const [expAdmitted, blockedAdmitted] = await Promise.all([expensiveDone, blockedDone]);
    assert.equal(expAdmitted.lease.cost, 6);
    assert.equal(blockedAdmitted.lease.cost, 2);
    assert.deepEqual(order, [6, 2]);
    expAdmitted.lease.release("success");
    blockedAdmitted.lease.release("success");
    assert.equal(c.snapshot().queuedCount, 0);
  });

  async function ageReservedCost6(
    c: AdaptiveAdmissionController,
    expensiveSignal?: AbortSignal,
    expensiveMaxWaitMs?: number
  ) {
    const held = await mustAdmit(c, req({ cost: 6, tenantKey: "holder" }));
    const expensive = await c.acquire(
      req({
        cost: 6,
        tenantKey: "expensive",
        signal: expensiveSignal,
        maxWaitMs: expensiveMaxWaitMs,
      })
    );
    assert.equal(expensive.status, "queued");
    for (let i = 0; i < 2; i++) {
      const r = await c.acquire(req({ cost: 2, tenantKey: `age-pass-${i}` }));
      assert.equal(r.status, "queued");
      if (r.status !== "queued") throw new Error("expected queued");
      (await r.promise).lease.release("success");
    }
    const blocked = await c.acquire(req({ cost: 2, tenantKey: "age-blocked" }));
    assert.equal(blocked.status, "queued");
    await Promise.resolve();
    assert.equal(c.snapshot().activeCost, 6);
    assert.equal(c.snapshot().queuedCount, 2);
    return { held, expensive, blocked };
  }

  it("aborting a reserved head immediately admits the next fitting request", async () => {
    const c = controller({
      minLimit: 10,
      initialLimit: 10,
      maxLimit: 10,
      maxQueueCount: 20,
      maxQueueCost: 100,
      defaultMaxWaitMs: 10_000,
    });
    const ac = new AbortController();
    const { held, expensive, blocked } = await ageReservedCost6(c, ac.signal);
    assert.equal(expensive.status, "queued");
    assert.equal(blocked.status, "queued");

    ac.abort();
    // No tick / new arrival / release / config update — only the abort path.
    if (expensive.status === "queued") {
      await assert.rejects(expensive.promise, (err: unknown) => {
        assert.equal((err as { code?: string }).code, "ADMISSION_ABORTED");
        return true;
      });
    }
    if (blocked.status !== "queued") throw new Error("expected queued blocked request");
    const admitted = await blocked.promise;
    assert.equal(admitted.lease.cost, 2);
    assert.equal(c.snapshot().activeCost, 8);
    assert.equal(c.snapshot().queuedCount, 0);
    admitted.lease.release("success");
    held.release("success");
  });

  it("deadline-expiring a reserved head immediately admits the next fitting request", async () => {
    const c = controller({
      minLimit: 10,
      initialLimit: 10,
      maxLimit: 10,
      maxQueueCount: 20,
      maxQueueCost: 100,
      defaultMaxWaitMs: 10_000,
    });
    const { held, expensive, blocked } = await ageReservedCost6(c, undefined, 40);
    assert.equal(expensive.status, "queued");
    assert.equal(blocked.status, "queued");

    clock.advance(40);
    // No tick / new arrival / release / config update — only the deadline timer.
    if (expensive.status === "queued") {
      await assert.rejects(expensive.promise, (err: unknown) => {
        assert.equal((err as { code?: string }).code, "ADMISSION_DEADLINE");
        return true;
      });
    }
    if (blocked.status !== "queued") throw new Error("expected queued blocked request");
    const admitted = await blocked.promise;
    assert.equal(admitted.lease.cost, 2);
    assert.equal(c.snapshot().activeCost, 8);
    assert.equal(c.snapshot().queuedCount, 0);
    admitted.lease.release("success");
    held.release("success");
  });
});

describe("adaptive algorithm", () => {
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

  async function complete(
    c: AdaptiveAdmissionController,
    cost: number,
    latencyMs: number,
    outcome: "success" | "upstream_error" | "timeout" = "success",
    pressure: AdmissionPressure = "normal"
  ) {
    const lease = await mustAdmit(c, req({ cost, pressure }));
    clock.advance(latencyMs);
    lease.release(outcome, { latencyMs, pressure });
  }

  it("keeps currentLimit within validated bounds", async () => {
    const c = controller({ initialLimit: 20, minLimit: 10, maxLimit: 30, increaseStep: 50 });
    for (let i = 0; i < 20; i++) {
      await complete(c, 5, 5, "success", "normal");
      clock.advance(100);
    }
    assert.ok(c.snapshot().currentLimit <= 30);
    assert.ok(c.snapshot().currentLimit >= 10);

    for (let i = 0; i < 10; i++) {
      await complete(c, 5, 5, "success", "critical");
      clock.advance(100);
    }
    assert.ok(c.snapshot().currentLimit >= 10);
  });

  it("decreases rapidly under critical pressure", async () => {
    const c = controller({ initialLimit: 80, minLimit: 10, maxLimit: 100 });
    const before = c.snapshot().currentLimit;
    await complete(c, 10, 10, "success", "critical");
    clock.advance(100);
    // Force a window tick with pressure observation.
    c.observePressure("critical");
    clock.advance(100);
    assert.ok(c.snapshot().currentLimit < before);
    assert.ok(c.snapshot().currentLimit <= Math.ceil(before * 0.5) + 1);
  });

  it("applies criticalDecreaseFactor once for a single observePressure(critical)", () => {
    const c = controller({
      initialLimit: 80,
      minLimit: 10,
      maxLimit: 100,
      criticalDecreaseFactor: 0.5,
      decreaseFactor: 0.8,
      windowMs: 100,
    });
    assert.equal(c.snapshot().currentLimit, 80);

    c.observePressure("critical");
    // Immediate fast decrease: 80 * 0.5 = 40.
    assert.equal(c.snapshot().currentLimit, 40);

    // Closing the same window must not multiply again (would become 20).
    clock.advance(100);
    c.tick();
    assert.equal(c.snapshot().currentLimit, 40);

    // A fresh critical observation in a later window still decreases once.
    c.observePressure("critical");
    assert.equal(c.snapshot().currentLimit, 20);
    clock.advance(100);
    c.tick();
    assert.equal(c.snapshot().currentLimit, 20);
  });

  it("decreases on high pressure or sustained latency gradient", async () => {
    const c = controller({
      initialLimit: 50,
      shortLatencyAlpha: 0.8,
      longLatencyAlpha: 0.1,
      latencyGradientThreshold: 0.2,
    });
    // Seed long baseline with low latency.
    for (let i = 0; i < 5; i++) {
      await complete(c, 8, 10, "success", "normal");
      clock.advance(100);
    }
    const mid = c.snapshot().currentLimit;
    // Spike short latency relative to long.
    for (let i = 0; i < 5; i++) {
      await complete(c, 8, 200, "success", "normal");
      clock.advance(100);
    }
    assert.ok(c.snapshot().currentLimit <= mid);

    const beforeHigh = c.snapshot().currentLimit;
    c.observePressure("high");
    await complete(c, 8, 20, "success", "high");
    clock.advance(100);
    assert.ok(c.snapshot().currentLimit <= beforeHigh);
  });

  it("increases slowly when healthy and highly utilized, and does not inflate when idle", async () => {
    const c = controller({
      minLimit: 20,
      maxLimit: 40,
      initialLimit: 20,
      increaseStep: 2,
      maxIncreasePerWindow: 2,
      highUtilizationThreshold: 0.5,
      windowMs: 100,
    });

    // Idle windows should not inflate.
    clock.advance(500);
    c.tick();
    clock.advance(500);
    c.tick();
    assert.equal(c.snapshot().currentLimit, 20);

    // Healthy high utilization: hold nearly full budget across most of each window.
    for (let w = 0; w < 5; w++) {
      const lease = await mustAdmit(c, req({ cost: 16, pressure: "normal" }));
      clock.advance(80);
      lease.release("success", { latencyMs: 10, pressure: "normal" });
      clock.advance(20);
      c.tick();
    }
    assert.ok(c.snapshot().currentLimit > 20);
    assert.ok(c.snapshot().currentLimit <= 20 + 2 * 5);
  });

  it("does not collapse capacity on a single upstream business error", async () => {
    const c = controller({ initialLimit: 40, decreaseFactor: 0.5, criticalDecreaseFactor: 0.5 });
    await complete(c, 10, 15, "upstream_error", "normal");
    clock.advance(100);
    c.tick();
    // One business error may freeze growth but must not apply critical collapse.
    assert.ok(c.snapshot().currentLimit >= 30);
  });

  it("integrates active utilization exactly once over a full window", async () => {
    const c = controller({
      minLimit: 20,
      initialLimit: 20,
      maxLimit: 20,
      highUtilizationThreshold: 0.9,
      windowMs: 100,
    });
    const lease = await mustAdmit(c, req({ cost: 8 }));
    clock.advance(100);
    assert.equal(c.snapshot().utilization, 0.4);
    lease.release("success");
  });

  it("consumes latency and pressure evidence only in the window where it was observed", async () => {
    const c = controller({
      initialLimit: 80,
      minLimit: 10,
      maxLimit: 100,
      decreaseFactor: 0.5,
      criticalDecreaseFactor: 0.25,
      windowMs: 100,
    });

    await complete(c, 8, 200, "success", "high");
    clock.advance(100);
    const afterObservedWindow = c.snapshot().currentLimit;
    assert.ok(afterObservedWindow < 80);

    clock.advance(500);
    assert.equal(c.snapshot().currentLimit, afterObservedWindow);
  });
});

describe("createAdmissionRejectError", () => {
  it("builds typed rejection errors", () => {
    const err = createAdmissionRejectError("ADMISSION_QUEUE_FULL", "queue full");
    assert.equal(err.code, "ADMISSION_QUEUE_FULL");
    assert.equal(err.name, "AdmissionRejectError");
    assert.match(err.message, /queue full/);
  });
});
