import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  createAdaptiveAdmissionRuntime,
  getAdaptiveAdmissionRuntime,
  reloadAdaptiveAdmissionRuntime,
  resetAdaptiveAdmissionRuntimeForTests,
  resolveAdaptiveAdmissionConfigFromEnv,
  DEFAULT_ADAPTIVE_ADMISSION_CONFIG,
  type AdaptiveAdmissionRuntime,
} from "../../open-sse/services/admission/runtime.ts";
import {
  MAX_ADMISSION_COST_OR_LIMIT,
  MAX_ADMISSION_WINDOW_MS,
  type AdaptiveAdmissionConfig,
} from "../../open-sse/services/admission/types.ts";
import type {
  ResourcePressureGuardResult,
  ResourcePressureObservation,
} from "../../open-sse/utils/resourcePressure.ts";
import { buildErrorBody } from "../../open-sse/utils/error.ts";

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

function enforceConfig(overrides: Partial<AdaptiveAdmissionConfig> = {}): AdaptiveAdmissionConfig {
  return {
    mode: "enforce",
    minLimit: 4,
    maxLimit: 20,
    initialLimit: 8,
    maxQueueCount: 2,
    maxQueueCost: 16,
    defaultMaxWaitMs: 100,
    windowMs: 50,
    ...overrides,
  };
}

function emptyObservation(
  overrides: Partial<ResourcePressureObservation["state"]> = {}
): ResourcePressureObservation {
  return {
    signals: null,
    state: {
      severity: "normal",
      reason: "none",
      elevatedStreak: 0,
      recoveryStreak: 0,
      lastTransitionAtMs: 0,
      observedAtMs: 0,
      ...overrides,
    },
  };
}

function criticalGuard(reason = "v8_heap_absolute"): ResourcePressureGuardResult {
  const message = "Service temporarily unavailable due to resource pressure. Retry shortly.";
  return {
    success: false,
    status: 503,
    error: message,
    response: new Response(
      JSON.stringify(
        buildErrorBody(503, message, undefined, {
          type: "server_error",
          code: "resource_pressure",
        })
      ),
      {
        status: 503,
        headers: { "Content-Type": "application/json", "Retry-After": "5" },
      }
    ),
  };
}

function makeRuntime(
  clock: FakeClock,
  overrides: {
    config?: AdaptiveAdmissionConfig;
    check?: () => ResourcePressureGuardResult | null;
    observe?: () => ResourcePressureObservation;
    warn?: (message: string) => void;
  } = {}
): AdaptiveAdmissionRuntime {
  return createAdaptiveAdmissionRuntime({
    config: overrides.config ?? { ...DEFAULT_ADAPTIVE_ADMISSION_CONFIG },
    clock: {
      now: clock.now,
      setTimer: clock.setTimer,
      clearTimer: clock.clearTimer,
    },
    checkResourcePressure: overrides.check ?? (() => null),
    getResourcePressureObservation: overrides.observe ?? (() => emptyObservation()),
    warn: overrides.warn,
  });
}

async function parseJson(response: Response): Promise<Record<string, unknown>> {
  return JSON.parse(await response.text()) as Record<string, unknown>;
}

describe("adaptive admission runtime env + defaults", () => {
  it("defaults to complete shadow config", () => {
    assert.equal(DEFAULT_ADAPTIVE_ADMISSION_CONFIG.mode, "shadow");
    assert.equal(DEFAULT_ADAPTIVE_ADMISSION_CONFIG.minLimit, 8);
    assert.equal(DEFAULT_ADAPTIVE_ADMISSION_CONFIG.initialLimit, 64);
    assert.equal(DEFAULT_ADAPTIVE_ADMISSION_CONFIG.maxLimit, 1000);
    assert.equal(DEFAULT_ADAPTIVE_ADMISSION_CONFIG.maxQueueCount, 128);
    assert.equal(DEFAULT_ADAPTIVE_ADMISSION_CONFIG.maxQueueCost, 2000);
    assert.equal(DEFAULT_ADAPTIVE_ADMISSION_CONFIG.defaultMaxWaitMs, 5000);
    assert.equal(DEFAULT_ADAPTIVE_ADMISSION_CONFIG.windowMs, 1000);
  });

  it("strictly resolves supported env names and rejects invalid values", () => {
    const cfg = resolveAdaptiveAdmissionConfigFromEnv({
      ADAPTIVE_ADMISSION_MODE: "enforce",
      ADAPTIVE_ADMISSION_MIN_LIMIT: "10",
      ADAPTIVE_ADMISSION_INITIAL_LIMIT: "20",
      ADAPTIVE_ADMISSION_MAX_LIMIT: "30",
      ADAPTIVE_ADMISSION_MAX_QUEUE_COUNT: "40",
      ADAPTIVE_ADMISSION_MAX_QUEUE_COST: "50",
      ADAPTIVE_ADMISSION_MAX_WAIT_MS: "600",
      ADAPTIVE_ADMISSION_WINDOW_MS: "700",
    });
    assert.deepEqual(
      {
        mode: cfg.mode,
        minLimit: cfg.minLimit,
        initialLimit: cfg.initialLimit,
        maxLimit: cfg.maxLimit,
        maxQueueCount: cfg.maxQueueCount,
        maxQueueCost: cfg.maxQueueCost,
        defaultMaxWaitMs: cfg.defaultMaxWaitMs,
        windowMs: cfg.windowMs,
      },
      {
        mode: "enforce",
        minLimit: 10,
        initialLimit: 20,
        maxLimit: 30,
        maxQueueCount: 40,
        maxQueueCost: 50,
        defaultMaxWaitMs: 600,
        windowMs: 700,
      }
    );

    assert.throws(
      () => resolveAdaptiveAdmissionConfigFromEnv({ ADAPTIVE_ADMISSION_MODE: "strict" }),
      /ADAPTIVE_ADMISSION_MODE/
    );
    assert.throws(
      () => resolveAdaptiveAdmissionConfigFromEnv({ ADAPTIVE_ADMISSION_MIN_LIMIT: "0" }),
      /ADAPTIVE_ADMISSION_MIN_LIMIT/
    );
    assert.throws(
      () => resolveAdaptiveAdmissionConfigFromEnv({ ADAPTIVE_ADMISSION_MAX_LIMIT: "1.5" }),
      /ADAPTIVE_ADMISSION_MAX_LIMIT/
    );
  });

  it("accepts exact documented maxima and rejects max+1 plus cross-field invalidity", () => {
    const maxCost = String(MAX_ADMISSION_COST_OR_LIMIT);
    const maxWindow = String(MAX_ADMISSION_WINDOW_MS);
    const maxQueue = String(Number.MAX_SAFE_INTEGER);

    const atMaxima = resolveAdaptiveAdmissionConfigFromEnv({
      ADAPTIVE_ADMISSION_MODE: "shadow",
      ADAPTIVE_ADMISSION_MIN_LIMIT: "1",
      ADAPTIVE_ADMISSION_INITIAL_LIMIT: maxCost,
      ADAPTIVE_ADMISSION_MAX_LIMIT: maxCost,
      ADAPTIVE_ADMISSION_MAX_QUEUE_COUNT: maxQueue,
      ADAPTIVE_ADMISSION_MAX_QUEUE_COST: maxCost,
      ADAPTIVE_ADMISSION_MAX_WAIT_MS: maxWindow,
      ADAPTIVE_ADMISSION_WINDOW_MS: maxWindow,
    });
    assert.equal(atMaxima.maxLimit, MAX_ADMISSION_COST_OR_LIMIT);
    assert.equal(atMaxima.maxQueueCount, Number.MAX_SAFE_INTEGER);
    assert.equal(atMaxima.windowMs, MAX_ADMISSION_WINDOW_MS);
    assert.equal(atMaxima.defaultMaxWaitMs, MAX_ADMISSION_WINDOW_MS);

    assert.throws(
      () =>
        resolveAdaptiveAdmissionConfigFromEnv({
          ADAPTIVE_ADMISSION_MAX_LIMIT: String(MAX_ADMISSION_COST_OR_LIMIT + 1),
        }),
      /maxLimit|must be <=/
    );
    assert.throws(
      () =>
        resolveAdaptiveAdmissionConfigFromEnv({
          ADAPTIVE_ADMISSION_MAX_QUEUE_COST: String(MAX_ADMISSION_COST_OR_LIMIT + 1),
        }),
      /maxQueueCost|must be <=/
    );
    assert.throws(
      () =>
        resolveAdaptiveAdmissionConfigFromEnv({
          ADAPTIVE_ADMISSION_WINDOW_MS: String(MAX_ADMISSION_WINDOW_MS + 1),
        }),
      /windowMs|must be <=/
    );
    assert.throws(
      () =>
        resolveAdaptiveAdmissionConfigFromEnv({
          ADAPTIVE_ADMISSION_MAX_WAIT_MS: String(MAX_ADMISSION_WINDOW_MS + 1),
        }),
      /defaultMaxWaitMs|must be <=/
    );
    // Queue count uses full safe-integer range; beyond that fails lexical/safe-integer parsing.
    assert.throws(
      () =>
        resolveAdaptiveAdmissionConfigFromEnv({
          ADAPTIVE_ADMISSION_MAX_QUEUE_COUNT: "9007199254740992",
        }),
      /ADAPTIVE_ADMISSION_MAX_QUEUE_COUNT|safe integer/
    );
    assert.throws(
      () =>
        resolveAdaptiveAdmissionConfigFromEnv({
          ADAPTIVE_ADMISSION_MIN_LIMIT: "20",
          ADAPTIVE_ADMISSION_MAX_LIMIT: "10",
        }),
      /minLimit must be <= maxLimit/
    );
  });

  it("default process runtime falls back to shadow on invalid env without crashing", () => {
    resetAdaptiveAdmissionRuntimeForTests();
    const warnings: string[] = [];
    const previous = process.env.ADAPTIVE_ADMISSION_MODE;
    process.env.ADAPTIVE_ADMISSION_MODE = "not-a-mode";
    try {
      const runtime = reloadAdaptiveAdmissionRuntime({
        warn: (message) => warnings.push(message),
        checkResourcePressure: () => null,
        getResourcePressureObservation: () => emptyObservation(),
      });
      const snap = runtime.snapshot();
      assert.equal(snap.mode, "shadow");
      assert.equal(snap.minLimit, 8);
      assert.equal(snap.initialLimit ?? snap.currentLimit >= 8, true);
      assert.equal(warnings.length, 1);
      assert.match(
        warnings[0]!,
        /invalid environment configuration; using default shadow admission settings/
      );
      assert.ok(!warnings.join("\n").includes("not-a-mode"));
      assert.ok(!warnings.join("\n").toLowerCase().includes("secret"));
      runtime.dispose();
    } finally {
      if (previous === undefined) delete process.env.ADAPTIVE_ADMISSION_MODE;
      else process.env.ADAPTIVE_ADMISSION_MODE = previous;
      resetAdaptiveAdmissionRuntimeForTests();
    }
  });
});

describe("adaptive admission runtime modes", () => {
  let clock: FakeClock;
  beforeEach(() => {
    clock = new FakeClock();
  });
  afterEach(() => {
    resetAdaptiveAdmissionRuntimeForTests();
  });

  it("default shadow always admits with a real lease and shadowDecision", async () => {
    const runtime = makeRuntime(clock);
    const result = await runtime.acquire({
      tenantKey: "tenant-secret-1",
      body: { messages: [{ role: "user", content: "hi" }], stream: true },
    });
    assert.equal(result.status, "admitted");
    if (result.status !== "admitted") throw new Error("expected admitted");
    assert.equal(result.mode, "shadow");
    assert.ok(result.lease);
    assert.equal(typeof result.lease.release, "function");
    assert.equal(result.lease.released, false);
    assert.ok(
      result.shadowDecision === "would-admit" ||
        result.shadowDecision === "would-queue" ||
        result.shadowDecision === "would-reject"
    );
    result.lease.release("success");
    assert.equal(result.lease.released, true);
    result.lease.release("success");
    runtime.dispose();
  });

  it("explicit off admits without enforcing capacity", async () => {
    const runtime = makeRuntime(clock, {
      config: {
        ...DEFAULT_ADAPTIVE_ADMISSION_CONFIG,
        mode: "off",
        initialLimit: 1,
        minLimit: 1,
        maxLimit: 1,
      },
    });
    const a = await runtime.acquire({ tenantKey: "t1", body: { messages: [] } });
    const b = await runtime.acquire({ tenantKey: "t2", body: { messages: [] } });
    assert.equal(a.status, "admitted");
    assert.equal(b.status, "admitted");
    if (a.status === "admitted") a.lease.release();
    if (b.status === "admitted") b.lease.release();
    runtime.dispose();
  });

  it("explicit enforce can reject with sanitized HTTP response", async () => {
    const runtime = makeRuntime(clock, {
      config: enforceConfig({
        initialLimit: 1,
        minLimit: 1,
        maxLimit: 1,
        maxQueueCount: 1,
        maxQueueCost: 1,
        defaultMaxWaitMs: 50,
        cost: { maxRequestCost: 1, baseCost: 1 },
      }),
    });
    const first = await runtime.acquire({
      tenantKey: "t1",
      body: { messages: [{ role: "user", content: "a" }], stream: true },
    });
    assert.equal(first.status, "admitted");

    const secondPromise = runtime.acquire({
      tenantKey: "t2",
      body: { messages: [{ role: "user", content: "b" }], stream: true },
      maxWaitMs: 50,
    });
    // Drive injected deadline timer; no wall-clock sleeps.
    clock.advance(50);
    const second = await secondPromise;
    assert.equal(second.status, "rejected");
    if (second.status !== "rejected") throw new Error("expected rejected");
    assert.equal(second.response.status, 503);
    const body = await parseJson(second.response);
    assert.equal(typeof body.error.message, "string");
    assert.match(second.code, /^admission_/);
    assert.ok(!JSON.stringify(body).includes("t2"));
    assert.ok(!JSON.stringify(body).includes("tenant"));
    if (first.status === "admitted") first.lease.release();
    runtime.dispose();
  });
});

describe("runtime streaming cost forwarding", () => {
  it("acquire lease cost reflects input.streaming via feature extraction", async () => {
    const clock = new FakeClock();
    // Sharply distinct streaming class costs; neutralize other feature contributions.
    const runtime = makeRuntime(clock, {
      config: {
        ...DEFAULT_ADAPTIVE_ADMISSION_CONFIG,
        mode: "shadow",
        cost: {
          baseCost: 1,
          bodyBytesPerUnit: 1_000_000,
          tokensPerUnit: 1_000_000,
          messagesPerUnit: 1_000_000,
          toolsPerUnit: 1_000_000,
          fanoutPerUnit: 1_000_000,
          streamingClassCost: 1,
          nonStreamingClassCost: 50,
          maxRequestCost: 1_000,
        },
      },
    });

    // Empty body keeps non-class contributions identical; stream omitted defaults false when not forwarded.

    const body = {};
    const streamed = await runtime.acquire({
      tenantKey: "stream-on",
      body,
      streaming: true,
    });
    assert.equal(streamed.status, "admitted");
    if (streamed.status !== "admitted") throw new Error("expected admitted");
    const streamCost = streamed.lease.cost;
    streamed.lease.release("success");

    const nonStreamed = await runtime.acquire({
      tenantKey: "stream-off",
      body,
      streaming: false,
    });
    assert.equal(nonStreamed.status, "admitted");
    if (nonStreamed.status !== "admitted") throw new Error("expected admitted");
    const nonStreamCost = nonStreamed.lease.cost;
    nonStreamed.lease.release("success");

    const defaulted = await runtime.acquire({
      tenantKey: "stream-default",
      body,
    });
    assert.equal(defaulted.status, "admitted");
    if (defaulted.status !== "admitted") throw new Error("expected admitted");
    const defaultCost = defaulted.lease.cost;
    defaulted.lease.release("success");

    runtime.dispose();

    // base(1) + fanout unit(1) + class cost → streaming 3, non-streaming 52
    assert.equal(streamCost, 3);
    assert.equal(nonStreamCost, 52);
    assert.equal(defaultCost, 52);
    assert.notEqual(
      streamCost,
      nonStreamCost,
      "streaming true/false must produce different acquired lease costs"
    );
  });
});

describe("rejection mapping", () => {
  let clock: FakeClock;
  beforeEach(() => {
    clock = new FakeClock();
  });

  it("maps ADMISSION_ABORTED to local 499 without Retry-After", async () => {
    const runtime = makeRuntime(clock, {
      config: enforceConfig({
        initialLimit: 1,
        minLimit: 1,
        maxLimit: 1,
        maxQueueCount: 4,
        maxQueueCost: 40,
        defaultMaxWaitMs: 1000,
        // Force unit cost so one admitted request fills the limit.
        cost: { maxRequestCost: 1, baseCost: 1 },
      }),
    });
    const holder = await runtime.acquire({
      tenantKey: "hold",
      body: { messages: [{ role: "user", content: "hold" }], stream: true },
    });
    assert.equal(holder.status, "admitted");

    const ac = new AbortController();
    const pending = runtime.acquire({
      tenantKey: "wait",
      body: { messages: [{ role: "user", content: "wait" }], stream: true },
      signal: ac.signal,
      maxWaitMs: 1000,
    });
    ac.abort();
    const rejected = await pending;
    assert.equal(rejected.status, "rejected");
    if (rejected.status !== "rejected") throw new Error("expected rejected");
    assert.equal(rejected.code, "admission_aborted");
    assert.equal(rejected.response.status, 499);
    assert.equal(rejected.response.headers.get("Retry-After"), null);
    const body = await parseJson(rejected.response);
    assert.equal(body.error.code, "admission_aborted");
    assert.ok(!JSON.stringify(body).includes("wait"));
    if (holder.status === "admitted") holder.lease.release();
    runtime.dispose();
  });

  it("maps queue full / deadline / oversized to sanitized 503 codes", async () => {
    const runtime = makeRuntime(clock, {
      config: enforceConfig({
        initialLimit: 1,
        minLimit: 1,
        maxLimit: 1,
        maxQueueCount: 1,
        maxQueueCost: 1,
        defaultMaxWaitMs: 20,
        cost: { maxRequestCost: 1, baseCost: 1, bodyBytesPerUnit: 1_000_000 },
      }),
    });
    const hold = await runtime.acquire({
      tenantKey: "hold",
      body: { stream: true },
    });
    assert.equal(hold.status, "admitted");

    const deadlinePromise = runtime.acquire({
      tenantKey: "q1",
      body: { stream: true },
      maxWaitMs: 20,
    });
    clock.advance(20);
    const deadlineRejected = await deadlinePromise;
    assert.equal(deadlineRejected.status, "rejected");
    if (deadlineRejected.status === "rejected") {
      assert.equal(deadlineRejected.response.status, 503);
      assert.equal(deadlineRejected.code, "admission_deadline");
      const body = await parseJson(deadlineRejected.response);
      assert.equal(body.error.code, "admission_deadline");
      assert.equal(deadlineRejected.response.headers.get("Retry-After"), "1");
    }

    // Fill the single queue slot then force queue_full on the next arrival.
    const waiterPromise = runtime.acquire({
      tenantKey: "waiter",
      body: { stream: true },
      maxWaitMs: 1_000,
    });
    const full = await runtime.acquire({
      tenantKey: "full",
      body: { stream: true },
    });
    assert.equal(full.status, "rejected");
    if (full.status === "rejected") {
      assert.equal(full.code, "admission_queue_full");
      assert.equal(full.response.status, 503);
      assert.equal(full.response.headers.get("Retry-After"), "1");
      const body = await parseJson(full.response);
      assert.equal(body.error.code, "admission_queue_full");
    }
    clock.advance(1_000);
    await waiterPromise;

    // Oversized: cost features that exceed limit 1 with tiny max.
    const oversizedRuntime = makeRuntime(clock, {
      config: enforceConfig({
        initialLimit: 1,
        minLimit: 1,
        maxLimit: 1,
        maxQueueCount: 1,
        maxQueueCost: 1,
        cost: {
          maxRequestCost: 100,
          baseCost: 1,
          bodyBytesPerUnit: 1,
          tokensPerUnit: 1,
          messagesPerUnit: 1,
          toolsPerUnit: 1,
          fanoutPerUnit: 1,
        },
      }),
    });
    const huge = await oversizedRuntime.acquire({
      tenantKey: "huge",
      body: {
        messages: Array.from({ length: 50 }, (_, i) => ({
          role: "user",
          content: `m${i}-${"x".repeat(32)}`,
        })),
        stream: true,
      },
    });
    assert.equal(huge.status, "rejected");
    if (huge.status === "rejected") {
      assert.equal(huge.code, "admission_oversized");
      assert.equal(huge.response.status, 503);
      const body = await parseJson(huge.response);
      assert.equal(body.error.code, "admission_oversized");
      assert.ok(!JSON.stringify(body).toLowerCase().includes("cost"));
      assert.ok(!JSON.stringify(body).includes("huge"));
    }
    if (hold.status === "admitted") hold.lease.release();
    runtime.dispose();
    oversizedRuntime.dispose();
  });
});

describe("resource pressure integration", () => {
  let clock: FakeClock;
  beforeEach(() => {
    clock = new FakeClock();
  });

  it("returns the existing critical guard response without acquiring work", async () => {
    let acquires = 0;
    const guard = criticalGuard();
    const runtime = makeRuntime(clock, {
      config: enforceConfig({ initialLimit: 10 }),
      check: () => {
        acquires += 1;
        return guard;
      },
    });
    const result = await runtime.acquire({
      tenantKey: "t-pressure",
      body: { messages: [{ role: "user", content: "x" }] },
    });
    assert.equal(result.status, "rejected");
    if (result.status !== "rejected") throw new Error("expected rejected");
    assert.equal(result.response, guard.response);
    assert.equal(result.code, "resource_pressure");
    assert.equal(runtime.snapshot().pressureGuardRejectCount, 1);
    assert.equal(runtime.snapshot().activeCount, 0);
    assert.equal(acquires, 1);
    runtime.dispose();
  });

  it("feeds fresh critical pressure observation even when the safety guard rejects", async () => {
    const guard = criticalGuard();
    let observation = emptyObservation({
      severity: "critical",
      reason: "v8_heap_absolute",
      observedAtMs: 1_000,
    });
    const pressures: string[] = [];
    const runtime = createAdaptiveAdmissionRuntime({
      config: enforceConfig({
        initialLimit: 20,
        minLimit: 4,
        maxLimit: 20,
        windowMs: 50,
        criticalDecreaseFactor: 0.5,
      }),
      clock: {
        now: clock.now,
        setTimer: clock.setTimer,
        clearTimer: clock.clearTimer,
      },
      checkResourcePressure: () => guard,
      getResourcePressureObservation: () => observation,
      onPressureObserved: (pressure) => pressures.push(pressure),
    });

    const first = await runtime.acquire({
      tenantKey: "guarded",
      body: { messages: [{ role: "user", content: "x" }] },
    });
    assert.equal(first.status, "rejected");
    if (first.status !== "rejected") throw new Error("expected rejected");
    // Exact same guard response identity; zero controller acquisition.
    assert.equal(first.response, guard.response);
    assert.equal(first.code, "resource_pressure");
    assert.equal(runtime.snapshot().activeCount, 0);
    assert.deepEqual(pressures, ["critical"]);
    // One critical reduction: floor(20 * 0.5) = 10.
    assert.equal(runtime.snapshot().currentLimit, 10);

    // Replay same observation: no additional feed or reduction.
    const second = await runtime.acquire({
      tenantKey: "guarded-2",
      body: { messages: [{ role: "user", content: "y" }] },
    });
    assert.equal(second.response, guard.response);
    assert.deepEqual(pressures, ["critical"]);
    assert.equal(runtime.snapshot().currentLimit, 10);

    // New window resets criticalDecreaseConsumed; fresh observation may reduce again.
    clock.advance(50);
    observation = emptyObservation({
      severity: "critical",
      reason: "v8_heap_absolute",
      observedAtMs: 2_000,
    });
    const third = await runtime.acquire({
      tenantKey: "guarded-3",
      body: { messages: [{ role: "user", content: "z" }] },
    });
    assert.equal(third.response, guard.response);
    assert.deepEqual(pressures, ["critical", "critical"]);
    assert.equal(runtime.snapshot().currentLimit, 5);
    runtime.dispose();
  });

  it("dedupes unchanged observations and re-feeds genuinely fresh ones", async () => {
    let observation = emptyObservation({
      severity: "high",
      reason: "psi_some",
      observedAtMs: 100,
    });
    const pressures: string[] = [];
    const runtime = createAdaptiveAdmissionRuntime({
      config: { ...DEFAULT_ADAPTIVE_ADMISSION_CONFIG, mode: "shadow" },
      clock: {
        now: clock.now,
        setTimer: clock.setTimer,
        clearTimer: clock.clearTimer,
      },
      checkResourcePressure: () => null,
      getResourcePressureObservation: () => observation,
      onPressureObserved: (pressure) => pressures.push(pressure),
    });

    await runtime.acquire({ tenantKey: "a", body: {} });
    await runtime.acquire({ tenantKey: "b", body: {} });
    assert.deepEqual(pressures, ["high"]);

    observation = emptyObservation({
      severity: "high",
      reason: "psi_some",
      observedAtMs: 100,
    });
    await runtime.acquire({ tenantKey: "c", body: {} });
    assert.deepEqual(pressures, ["high"]);

    observation = emptyObservation({
      severity: "critical",
      reason: "psi_full",
      observedAtMs: 200,
    });
    await runtime.acquire({ tenantKey: "d", body: {} });
    assert.deepEqual(pressures, ["high", "critical"]);
    runtime.dispose();
  });

  it("fails open when pressure check or observation throws", async () => {
    const runtime = makeRuntime(clock, {
      config: { ...DEFAULT_ADAPTIVE_ADMISSION_CONFIG, mode: "shadow" },
      check: () => {
        throw new Error("check boom");
      },
      observe: () => {
        throw new Error("observe boom");
      },
    });
    const result = await runtime.acquire({ tenantKey: "t", body: { messages: [] } });
    assert.equal(result.status, "admitted");
    if (result.status === "admitted") result.lease.release();
    runtime.dispose();
  });
});

describe("public snapshot privacy", () => {
  it("exposes only aggregate counters and low-cardinality resource fields", async () => {
    const clock = new FakeClock();
    const runtime = makeRuntime(clock, {
      observe: () =>
        emptyObservation({
          severity: "high",
          reason: "cgroup_ratio",
          observedAtMs: 42,
        }),
    });
    await runtime.acquire({
      tenantKey: "tenant-very-secret",
      body: {
        messages: [{ role: "user", content: "SECRET_PAYLOAD_XYZ" }],
        api_key: "sk-live-secret",
      },
    });
    const snap = runtime.snapshot();
    const text = JSON.stringify(snap);
    assert.ok(!text.includes("tenant-very-secret"));
    assert.ok(!text.includes("SECRET_PAYLOAD_XYZ"));
    assert.ok(!text.includes("sk-live-secret"));
    assert.ok(!text.includes("lease-"));
    assert.equal(typeof snap.mode, "string");
    assert.equal(typeof snap.currentLimit, "number");
    assert.equal(typeof snap.activeCount, "number");
    assert.equal(snap.resourceSeverity, "high");
    assert.equal(snap.resourceReason, "cgroup_ratio");
    assert.equal(snap.resourceObservedAtMs, 42);
    assert.equal(typeof snap.pressureGuardRejectCount, "number");
    const snapRecord = snap as unknown as Record<string, unknown>;
    assert.equal(snapRecord.tenants, undefined);
    assert.equal(snapRecord.queue, undefined);
    assert.equal(snapRecord.features, undefined);
    runtime.dispose();
  });
});

describe("process runtime reload isolation", () => {
  afterEach(() => {
    resetAdaptiveAdmissionRuntimeForTests();
  });

  it("reload disposes previous queued work/timers and replaces the process runtime", async () => {
    resetAdaptiveAdmissionRuntimeForTests();
    const clock = new FakeClock();
    const first = reloadAdaptiveAdmissionRuntime({
      config: enforceConfig({
        initialLimit: 1,
        minLimit: 1,
        maxLimit: 1,
        maxQueueCount: 4,
        maxQueueCost: 40,
        defaultMaxWaitMs: 5_000,
        windowMs: 1_000,
        cost: { maxRequestCost: 1, baseCost: 1 },
      }),
      clock: {
        now: clock.now,
        setTimer: clock.setTimer,
        clearTimer: clock.clearTimer,
      },
      checkResourcePressure: () => null,
      getResourcePressureObservation: () => emptyObservation(),
    });

    const hold = await first.acquire({
      tenantKey: "hold",
      body: { messages: [{ role: "user", content: "h" }], stream: true },
    });
    assert.equal(hold.status, "admitted");
    assert.ok(clock.pendingTimerCount >= 1);

    const waiting = first.acquire({
      tenantKey: "waiter",
      body: { messages: [{ role: "user", content: "w" }], stream: true },
      maxWaitMs: 5_000,
    });

    const second = reloadAdaptiveAdmissionRuntime({
      config: { ...DEFAULT_ADAPTIVE_ADMISSION_CONFIG, mode: "shadow" },
      checkResourcePressure: () => null,
      getResourcePressureObservation: () => emptyObservation(),
    });
    assert.notEqual(second, first);
    assert.equal(getAdaptiveAdmissionRuntime(), second);

    const rejected = await waiting;
    assert.equal(rejected.status, "rejected");
    if (rejected.status === "rejected") {
      assert.equal(rejected.code, "admission_shutdown");
    }
    // Previous timers should be cleared by dispose/shutdown.
    assert.equal(clock.pendingTimerCount, 0);
    second.dispose();
    resetAdaptiveAdmissionRuntimeForTests();
  });
});
