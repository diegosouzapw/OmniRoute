import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  AdaptiveAdmissionController,
  MAX_ADMISSION_COST_OR_LIMIT,
  MAX_ADMISSION_WINDOW_MS,
  type AdaptiveAdmissionConfig,
  type AdmissionLease,
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

describe("admission operational domain", () => {
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

  it("exports an operational domain that rejects max+1 and accepts exact max", () => {
    assert.ok(Number.isSafeInteger(MAX_ADMISSION_COST_OR_LIMIT));
    assert.ok(Number.isSafeInteger(MAX_ADMISSION_WINDOW_MS));
    assert.ok(
      Number.isSafeInteger(MAX_ADMISSION_COST_OR_LIMIT * MAX_ADMISSION_WINDOW_MS),
      "limit×window must remain a safe integer"
    );
    assert.throws(
      () =>
        make({
          minLimit: MAX_ADMISSION_COST_OR_LIMIT + 1,
          maxLimit: MAX_ADMISSION_COST_OR_LIMIT + 1,
          initialLimit: MAX_ADMISSION_COST_OR_LIMIT + 1,
        }),
      /minLimit|must be <=/
    );
    assert.throws(
      () => make({ maxQueueCost: MAX_ADMISSION_COST_OR_LIMIT + 1 }),
      /maxQueueCost|must be <=/
    );
    assert.throws(() => make({ windowMs: MAX_ADMISSION_WINDOW_MS + 1 }), /windowMs|must be <=/);
    assert.throws(
      () => make({ cost: { maxRequestCost: MAX_ADMISSION_COST_OR_LIMIT + 1 } }),
      /maxRequestCost|must be <=/
    );
    assert.throws(() => make({ maxLimit: Number.MAX_SAFE_INTEGER }), /maxLimit|must be <=/);

    const max = MAX_ADMISSION_COST_OR_LIMIT;
    const c = make({
      minLimit: max,
      maxLimit: max,
      initialLimit: max,
      maxQueueCount: 2,
      maxQueueCost: max,
      windowMs: 1000,
      cost: { maxRequestCost: max },
    });
    assert.equal(c.snapshot().currentLimit, max);
    c.shutdown();
  });

  it("keeps full utilization and multi-lease accounting exact at the domain max", async () => {
    const max = MAX_ADMISSION_COST_OR_LIMIT;
    const c = make({
      mode: "enforce",
      minLimit: max,
      maxLimit: max,
      initialLimit: max,
      maxQueueCount: 4,
      maxQueueCost: max,
      windowMs: 1000,
      cost: { maxRequestCost: max },
    });

    const full = await mustAdmit(c, req({ cost: max }));
    assert.equal(c.snapshot().activeCost, max);
    assert.equal(Number.isSafeInteger(c.snapshot().activeCost), true);
    clock.advance(1000);
    assert.equal(c.snapshot().utilization, 1);
    full.release("success");
    assert.equal(c.snapshot().activeCost, 0);
    assert.equal(c.snapshot().activeCount, 0);

    const left = Math.floor(max / 2);
    const right = max - left;
    const a = await mustAdmit(c, req({ cost: left }));
    const b = await mustAdmit(c, req({ cost: right }));
    assert.equal(c.snapshot().activeCost, max);
    assert.equal(c.snapshot().activeCount, 2);
    clock.advance(1000);
    assert.equal(c.snapshot().utilization, 1);
    a.release("success");
    assert.equal(c.snapshot().activeCost, right);
    b.release("success");
    assert.equal(c.snapshot().activeCost, 0);
    assert.equal(c.snapshot().activeCount, 0);
    c.shutdown();
  });
});

describe("updateConfig re-evaluation", () => {
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

  it("updateConfig rejects queued work above the new enforce limit immediately", async () => {
    const c = controller({
      minLimit: 5,
      initialLimit: 10,
      maxLimit: 10,
      maxQueueCount: 4,
      maxQueueCost: 40,
      defaultMaxWaitMs: 5_000,
    });
    const held = await mustAdmit(c, req({ cost: 10 }));
    const queued = await c.acquire(req({ cost: 8 }));
    assert.equal(queued.status, "queued");

    c.updateConfig(
      baseConfig({
        minLimit: 5,
        initialLimit: 5,
        maxLimit: 5,
        maxQueueCount: 4,
        maxQueueCost: 40,
        defaultMaxWaitMs: 5_000,
      })
    );

    if (queued.status === "queued") {
      await assert.rejects(queued.promise, (err: unknown) => {
        assert.equal((err as { code?: string }).code, "ADMISSION_OVERSIZED");
        return true;
      });
    }
    assert.equal(c.snapshot().queuedCount, 0);
    held.release();
  });

  it("updateConfig enforce→shadow classifies individually oversized active work as virtual rejected", async () => {
    const c = controller({
      mode: "enforce",
      minLimit: 5,
      initialLimit: 20,
      maxLimit: 20,
      maxQueueCount: 4,
      maxQueueCost: 40,
    });
    const oversized = await mustAdmit(c, req({ cost: 15 }));
    const fitting = await mustAdmit(c, req({ cost: 5 }));

    c.updateConfig(
      baseConfig({
        mode: "shadow",
        minLimit: 5,
        initialLimit: 10,
        maxLimit: 10,
        maxQueueCount: 4,
        maxQueueCost: 40,
      })
    );

    const snap = c.snapshot();
    // currentLimit clamps to 10; cost 15 is individually oversized → virtual rejected, not queued.
    assert.equal(snap.currentLimit, 10);
    assert.equal(snap.virtualActiveCost, 5);
    assert.equal(snap.virtualActiveCount, 1);
    assert.equal(snap.virtualQueuedCost, 0);
    assert.equal(snap.virtualQueuedCount, 0);
    // Real active leases remain until release.
    assert.equal(snap.activeCost, 20);
    assert.equal(snap.activeCount, 2);

    oversized.release();
    fitting.release();
  });

  it("updateConfig rebuilds shadow virtual dispositions under new limits and queue bounds", async () => {
    const c = controller({
      mode: "shadow",
      minLimit: 5,
      initialLimit: 20,
      maxLimit: 20,
      maxQueueCount: 2,
      maxQueueCost: 12,
    });
    const first = await c.acquire(req({ cost: 8 }));
    const second = await c.acquire(req({ cost: 8 }));
    const third = await c.acquire(req({ cost: 8 }));
    assert.equal(first.status, "admitted");
    assert.equal(second.status, "admitted");
    assert.equal(third.status, "admitted");

    c.updateConfig(
      baseConfig({
        mode: "shadow",
        minLimit: 5,
        initialLimit: 10,
        maxLimit: 10,
        maxQueueCount: 1,
        maxQueueCost: 8,
      })
    );

    const snap = c.snapshot();
    // One active (8), one queued (8), one rejected (queue full under new bounds).
    assert.equal(snap.virtualActiveCost, 8);
    assert.equal(snap.virtualActiveCount, 1);
    assert.equal(snap.virtualQueuedCost, 8);
    assert.equal(snap.virtualQueuedCount, 1);
    assert.equal(snap.activeCount, 3);

    if (first.status === "admitted") first.lease.release();
    if (second.status === "admitted") second.lease.release();
    if (third.status === "admitted") third.lease.release();
  });
});

describe("deterministic overload harness", () => {
  async function runEqualServiceWindows(offeredPerWindow: number) {
    const clock = new FakeClock();
    const c = new AdaptiveAdmissionController(
      baseConfig({
        mode: "enforce",
        initialLimit: 20,
        minLimit: 20,
        maxLimit: 20,
        maxQueueCount: 1,
        maxQueueCost: 1,
        defaultMaxWaitMs: 20,
      }),
      { now: clock.now, setTimer: clock.setTimer, clearTimer: clock.clearTimer }
    );
    let completed = 0;
    let fastRejected = 0;
    let active: AdmissionLease[] = [];

    for (let window = 0; window < 20; window++) {
      for (const lease of active) {
        lease.release("success", { latencyMs: 10 });
        completed += 1;
      }
      active = [];
      for (let i = 0; i < offeredPerWindow; i++) {
        const result = await c.acquire(req({ cost: 5, tenantKey: `tenant-${i % 3}` }));
        if (result.status === "admitted") active.push(result.lease);
        else if (result.status === "rejected") fastRejected += 1;
        else assert.fail("cost-5 excess must reject immediately when queue cost cap is 1");
      }
      clock.advance(10);
      const snapshot = c.snapshot();
      assert.ok(snapshot.activeCost <= 20);
      assert.ok(snapshot.activeCount <= 4);
      assert.equal(snapshot.queuedCost, 0);
      assert.equal(snapshot.queuedCount, 0);
    }
    for (const lease of active) {
      lease.release("success", { latencyMs: 10 });
      completed += 1;
    }
    c.shutdown();
    assert.equal(clock.pendingTimerCount, 0);
    return { completed, fastRejected };
  }

  it("raises goodput to capacity then plateaus at 2× and 5× offered load", async () => {
    // Capacity is 4 admits/window (limit 20, cost 5). Offered loads: 0.5×, 1×, 2×, 5×.
    const low = await runEqualServiceWindows(2);
    const atCapacity = await runEqualServiceWindows(4);
    const doubleOver = await runEqualServiceWindows(8);
    const fiveOver = await runEqualServiceWindows(20);

    assert.equal(low.completed, 40);
    assert.equal(atCapacity.completed, 80);
    assert.ok(atCapacity.completed >= low.completed * 1.9, "goodput must rise toward capacity");
    assert.equal(
      doubleOver.completed,
      atCapacity.completed,
      "2× offered load must plateau at capacity"
    );
    assert.equal(
      fiveOver.completed,
      atCapacity.completed,
      "5× offered load must plateau at capacity"
    );
    assert.equal(low.fastRejected, 0);
    assert.equal(atCapacity.fastRejected, 0);
    assert.equal(
      doubleOver.fastRejected,
      4 * 20,
      "2× excess rejects immediately with bounded queue"
    );
    assert.equal(
      fiveOver.fastRejected,
      16 * 20,
      "5× excess rejects immediately with bounded queue"
    );
  });
});
