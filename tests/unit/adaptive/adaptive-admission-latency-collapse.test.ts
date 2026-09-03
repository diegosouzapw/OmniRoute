import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  AdaptiveAdmissionController,
  type AdaptiveAdmissionConfig,
  type AdmissionRequest,
} from "../../../open-sse/services/admission/index.ts";

/**
 * Regression guard for #10111 — adaptive admission latency collapse.
 *
 * A slow-provider turn shrinks the adaptive aggregate limit below an ordinary request's
 * cost; in enforce mode that request was rejected ADMISSION_OVERSIZED forever, and idle
 * recovery could never fire because the only limit-increase path requires a completed
 * admission (which can never happen once nothing can be admitted) — a self-lock.
 *
 * Fix: (1) solo-progress — an individually-valid request within the healthy aggregate
 * ceiling admitted while the system is idle & normal pressure, and (2) idle recovery —
 * sustained idle windows actively raise the collapsed limit back toward the recovery
 * ceiling. Reproduced deterministically with the shipping defaults via a fake clock.
 *
 * Uses the exact repro harness from the triage plan (same FakeClock, same defaults).
 */
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
  clearTimer = (id: number): void => { this.timers.delete(id); };
  advance(ms: number): void {
    const target = this.nowMs + ms;
    while (true) {
      let nextId: number | undefined;
      let nextDue = Number.POSITIVE_INFINITY;
      for (const [id, t] of this.timers) {
        if (t.due <= target && t.due < nextDue) { nextDue = t.due; nextId = id; }
      }
      if (nextId === undefined) { this.nowMs = target; return; }
      const timer = this.timers.get(nextId)!;
      this.timers.delete(nextId);
      this.nowMs = timer.due;
      timer.fn();
    }
  }
}

function shippingDefaults(overrides: Partial<AdaptiveAdmissionConfig> = {}): AdaptiveAdmissionConfig {
  return {
    mode: "enforce", minLimit: 8, initialLimit: 64, maxLimit: 1000,
    maxQueueCount: 128, maxQueueCost: 2000, defaultMaxWaitMs: 5_000, windowMs: 1_000,
    decreaseFactor: 0.8, criticalDecreaseFactor: 0.5, increaseStep: 1, maxIncreasePerWindow: 1,
    shortLatencyAlpha: 0.5, longLatencyAlpha: 0.1,
    highUtilizationThreshold: 0.7, lowUtilizationThreshold: 0.3, latencyGradientThreshold: 0.25,
    ...overrides,
  };
}
function req(cost: number): AdmissionRequest { return { tenantKey: "t-default", cost }; }

const REQUEST_COST = 63;

function newController(clock: FakeClock): AdaptiveAdmissionController {
  return new AdaptiveAdmissionController(shippingDefaults(), {
    now: clock.now, setTimer: clock.setTimer, clearTimer: clock.clearTimer,
  });
}

class Orchestrator {
  controller: AdaptiveAdmissionController;
  clock: FakeClock;
  constructor() {
    this.clock = new FakeClock();
    this.controller = newController(this.clock);
  }
  shutdown(): void { this.controller.shutdown(); }

  /** Admit+release one cost-63 request with the given end-to-end latency sample. */
  async ordinaryTurn(latencyMs: number): Promise<void> {
    const r = await this.controller.acquire(req(REQUEST_COST));
    assert.equal(r.status, "admitted");
    if (r.status === "admitted") {
      this.clock.advance(1_000);
      r.lease.release("success", { latencyMs });
      this.clock.advance(1_000);
    }
  }
}

describe("#10111 — adaptive admission latency collapse", () => {
  it("a slow-provider gradient collapse does not terminally reject an idle, individually-valid request (solo-progress)", async () => {
    const env = new Orchestrator();
    try {
      await env.ordinaryTurn(1_000);
      await env.ordinaryTurn(10_000);

      const collapsed = env.controller.snapshot().currentLimit;
      assert.ok(collapsed < REQUEST_COST, `expected limit collapsed below ${REQUEST_COST}, got ${collapsed}`);
      assert.equal(env.controller.snapshot().activeCount, 0);
      assert.equal(env.controller.snapshot().queuedCount, 0);

      // System idle & normal pressure: must make progress, not be terminally rejected.
      const r3 = await env.controller.acquire(req(REQUEST_COST));
      assert.equal(r3.status, "admitted");
      if (r3.status === "admitted") r3.lease.release("success", { latencyMs: 100 });
    } finally {
      env.shutdown();
    }
  });

  it("sustained idle windows actively recover the collapsed limit so normal requests re-enter", async () => {
    const env = new Orchestrator();
    try {
      await env.ordinaryTurn(1_000);
      await env.ordinaryTurn(10_000);

      assert.ok(env.controller.snapshot().currentLimit < REQUEST_COST);

      // No work in flight; run 20 idle windows.
      for (let i = 0; i < 20; i++) env.clock.advance(1_000);

      const recovered = env.controller.snapshot().currentLimit;
      assert.ok(
        recovered >= REQUEST_COST,
        `expected idle recovery to restore the limit >= ${REQUEST_COST}, got ${recovered}`
      );
      assert.equal(env.controller.snapshot().activeCount, 0);
      assert.equal(env.controller.snapshot().queuedCount, 0);

      const r4 = await env.controller.acquire(req(REQUEST_COST));
      assert.equal(r4.status, "admitted");
      if (r4.status === "admitted") r4.lease.release("success", { latencyMs: 100 });
    } finally {
      env.shutdown();
    }
  });

  it("critical pressure fuse still wins over solo-progress", async () => {
    const env = new Orchestrator();
    try {
      await env.ordinaryTurn(1_000);
      await env.ordinaryTurn(10_000);

      assert.ok(env.controller.snapshot().currentLimit < REQUEST_COST);
      env.controller.observePressure("critical");

      const r = await env.controller.acquire(req(REQUEST_COST));
      assert.equal(r.status, "rejected");
      if (r.status === "rejected") assert.equal(r.code, "ADMISSION_OVERSIZED");
    } finally {
      env.shutdown();
    }
  });

  it("solo-progress does not bypass the healthy aggregate ceiling (maxLimit) or run under load", async () => {
    const env = new Orchestrator();
    try {
      // A request beyond the healthy aggregate ceiling is still rejected even when idle.
      // Distinct maxLimit (20) vs maxRequestCost (100): raw cost 50 is within the hard
      // per-request ceiling but exceeds the aggregate ceiling → solo-progress must not
      // admit it.
      const ceilingGuard = new AdaptiveAdmissionController(
        shippingDefaults({ minLimit: 8, initialLimit: 20, maxLimit: 20, cost: { maxRequestCost: 100 } }),
        { now: env.clock.now, setTimer: env.clock.setTimer, clearTimer: env.clock.clearTimer }
      );
      try {
        const heavy = await ceilingGuard.acquire(req(50));
        assert.equal(heavy.status, "rejected");
        if (heavy.status === "rejected") assert.equal(heavy.code, "ADMISSION_OVERSIZED");
      } finally {
        ceilingGuard.shutdown();
      }

      // A busy controller (active + queued work present): solo-progress must NOT admit a
      // request over the limit — genuine load still sheds oversized-for-limit work.
      const busy = new AdaptiveAdmissionController(
        shippingDefaults({ minLimit: 8, initialLimit: 20, maxLimit: 20 }),
        { now: env.clock.now, setTimer: env.clock.setTimer, clearTimer: env.clock.clearTimer }
      );
      try {
        const first = await busy.acquire(req(15));
        assert.equal(first.status, "admitted");
        const second = await busy.acquire(req(15));
        assert.equal(second.status, "queued");
        // Active + queued present → not idle → solo must not bypass; oversized rejected.
        const over = await busy.acquire(req(25));
        assert.equal(over.status, "rejected");
        if (over.status === "rejected") assert.equal(over.code, "ADMISSION_OVERSIZED");
        if (first.status === "admitted") first.lease.release("success", { latencyMs: 1_000 });
        if (second.status === "queued") { (await second.promise).lease.release("success"); }
      } finally {
        busy.shutdown();
      }
    } finally {
      env.shutdown();
    }
  });
});

describe("#10111 — updateConfig refreshes the idle-recovery ceiling", () => {
  it("a larger initialLimit raises the recovery ceiling, clamped to the (possibly new) maxLimit", () => {
    const clock = new FakeClock();
    const controller = new AdaptiveAdmissionController(
      shippingDefaults({ minLimit: 5, initialLimit: 20, maxLimit: 50, increaseStep: 1, maxIncreasePerWindow: 1 }),
      { now: clock.now, setTimer: clock.setTimer, clearTimer: clock.clearTimer }
    );
    try {
      // Collapse the limit well below the original ceiling (20) via one critical hit.
      controller.observePressure("critical"); // 20 -> floor(20 * 0.5) = 10
      assert.equal(controller.snapshot().currentLimit, 10);
      // Close the window the critical hit landed in — idle recovery is suppressed for a
      // window where pressure is still critical, so the limit stays put.
      clock.advance(1_000);
      assert.equal(controller.snapshot().currentLimit, 10);

      // Raise initialLimit far past the (unchanged) maxLimit, and widen the recovery step
      // so a single idle window jumps straight to the new ceiling.
      controller.updateConfig(
        shippingDefaults({
          minLimit: 5,
          initialLimit: 1_000,
          maxLimit: 50,
          increaseStep: 1_000,
          maxIncreasePerWindow: 1_000,
        })
      );

      // Idle window: no active/queued work, pressure normal — idle recovery climbs
      // straight to the recovery ceiling.
      clock.advance(1_000);
      assert.equal(
        controller.snapshot().currentLimit,
        50,
        "recoveryCeiling must track the raised initialLimit, clamped to maxLimit (50)"
      );
    } finally {
      controller.shutdown();
    }
  });

  it("a smaller initialLimit lowers the recovery ceiling, clamped to the (possibly new) minLimit", () => {
    const clock = new FakeClock();
    const controller = new AdaptiveAdmissionController(
      shippingDefaults({ minLimit: 5, initialLimit: 100, maxLimit: 200, increaseStep: 1, maxIncreasePerWindow: 1 }),
      { now: clock.now, setTimer: clock.setTimer, clearTimer: clock.clearTimer }
    );
    try {
      // Three separate critical-pressure windows collapse the limit well below the
      // original ceiling (100): 100 -> 50 -> 25 -> 12. Each hit lands in its own window
      // (advance closes it) so criticalDecreaseConsumed resets and the next hit re-fires.
      controller.observePressure("critical"); // 100 -> 50
      clock.advance(1_000);
      controller.observePressure("critical"); // 50 -> 25
      clock.advance(1_000);
      controller.observePressure("critical"); // 25 -> 12
      clock.advance(1_000);
      assert.equal(controller.snapshot().currentLimit, 12);

      // Lower initialLimit below the new minLimit, and widen the recovery step so a stale
      // (unrefreshed) ceiling would be unmistakable: it would let idle recovery jump the
      // limit straight back up to the old ceiling (100).
      controller.updateConfig(
        shippingDefaults({
          minLimit: 5,
          initialLimit: 1,
          maxLimit: 200,
          increaseStep: 1_000,
          maxIncreasePerWindow: 1_000,
        })
      );

      // Idle window: with the ceiling correctly refreshed to clampLimit(1, 5, 200) = 5,
      // currentLimit (12) is already above the ceiling, so idle recovery must not grow it
      // at all — in particular it must not climb back to the stale 100 ceiling.
      clock.advance(1_000);
      assert.equal(
        controller.snapshot().currentLimit,
        12,
        "recoveryCeiling must track the lowered initialLimit (clamped to minLimit), not the stale higher ceiling"
      );
    } finally {
      controller.shutdown();
    }
  });
});