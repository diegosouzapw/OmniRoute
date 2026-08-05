import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  createAdaptiveAdmissionRuntime,
  DEFAULT_ADAPTIVE_ADMISSION_CONFIG,
  type AdaptiveAdmissionRuntime,
} from "../../open-sse/services/admission/runtime.ts";
import {
  type AdaptiveAdmissionConfig,
  type AdmissionLease,
  type AdmissionReleaseMeta,
  type AdmissionReleaseOutcome,
} from "../../open-sse/services/admission/types.ts";
import type {
  ResourcePressureGuardResult,
  ResourcePressureObservation,
} from "../../open-sse/utils/resourcePressure.ts";

/** Purpose-built lease spy: counts every release() while exposing released after first call. */
function createSpyLease(id = "spy-lease", cost = 1) {
  const calls: Array<{ outcome?: AdmissionReleaseOutcome; meta?: AdmissionReleaseMeta }> = [];
  let released = false;
  const lease: AdmissionLease = {
    id,
    cost,
    get released() {
      return released;
    },
    release(outcome?: AdmissionReleaseOutcome, meta?: AdmissionReleaseMeta) {
      calls.push({ outcome, meta });
      released = true;
    },
  };
  return {
    lease,
    calls,
    get releaseCount() {
      return calls.length;
    },
  };
}

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

describe("response lifecycle helpers", () => {
  let clock: FakeClock;
  beforeEach(() => {
    clock = new FakeClock();
  });

  function attachJson(
    runtime: AdaptiveAdmissionRuntime,
    spy: ReturnType<typeof createSpyLease>,
    status: number,
    options: { signal?: AbortSignal; admittedAtMs?: number } = {}
  ) {
    const admittedAtMs = options.admittedAtMs ?? clock.nowMs;
    return runtime.attachResponseLifecycle(
      new Response(JSON.stringify({ ok: status < 400 }), {
        status,
        headers: { "Content-Type": "application/json" },
      }),
      spy.lease,
      { admittedAtMs, signal: options.signal, nowMs: clock.now }
    );
  }

  it("classifies non-SSE HTTP outcomes with cancellation winning", async () => {
    const runtime = makeRuntime(clock);
    const cases: Array<{
      status: number;
      expected: AdmissionReleaseOutcome;
      signal?: AbortSignal;
      label: string;
    }> = [
      { status: 200, expected: "success", label: "2xx" },
      { status: 302, expected: "success", label: "3xx" },
      { status: 400, expected: "local_reject", label: "ordinary 4xx" },
      { status: 429, expected: "local_reject", label: "429" },
      { status: 408, expected: "timeout", label: "408" },
      { status: 499, expected: "cancelled", label: "499" },
      { status: 504, expected: "timeout", label: "504" },
      { status: 502, expected: "upstream_error", label: "5xx" },
      { status: 500, expected: "upstream_error", label: "500" },
    ];

    for (const c of cases) {
      const spy = createSpyLease(`json-${c.label}`);
      clock.nowMs = 100;
      attachJson(runtime, spy, c.status, { admittedAtMs: 40 });
      assert.equal(spy.releaseCount, 1, c.label);
      assert.equal(spy.calls[0]!.outcome, c.expected, c.label);
      assert.equal(spy.calls[0]!.meta?.latencyMs, 60, c.label);
      assert.equal(spy.lease.released, true, c.label);
    }

    // Already-aborted signal wins over 2xx.
    const ac = new AbortController();
    ac.abort();
    const abortedSpy = createSpyLease("aborted-2xx");
    clock.nowMs = 200;
    attachJson(runtime, abortedSpy, 200, { signal: ac.signal, admittedAtMs: 150 });
    assert.equal(abortedSpy.releaseCount, 1);
    assert.equal(abortedSpy.calls[0]!.outcome, "cancelled");
    assert.equal(abortedSpy.calls[0]!.meta?.latencyMs, 50);
    runtime.dispose();
  });

  it("classifies SSE completion outcomes using the request signal", async () => {
    const runtime = makeRuntime(clock);
    let spySuffix = 0;

    async function drainSse(
      status: number,
      signal?: AbortSignal,
      expectImmediateRelease = false
    ): Promise<ReturnType<typeof createSpyLease>> {
      const spy = createSpyLease(`sse-${status}-${spySuffix++}`);
      const body = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new TextEncoder().encode("data: done\n\n"));
          controller.close();
        },
      });
      clock.nowMs = 300;
      const wrapped = runtime.attachResponseLifecycle(
        new Response(body, {
          status,
          statusText: "OK",
          headers: { "Content-Type": "text/event-stream" },
        }),
        spy.lease,
        { admittedAtMs: 250, signal, nowMs: clock.now }
      );
      if (expectImmediateRelease) {
        assert.equal(spy.releaseCount, 1);
        return spy;
      }
      assert.equal(spy.releaseCount, 0);
      await wrapped.text();
      return spy;
    }

    const ok = await drainSse(200);
    assert.equal(ok.releaseCount, 1);
    assert.equal(ok.calls[0]!.outcome, "success");
    assert.equal(ok.calls[0]!.meta?.latencyMs, 50);

    const redirect = await drainSse(302);
    assert.equal(redirect.calls[0]!.outcome, "success");

    const ordinary4xx = await drainSse(404);
    assert.equal(ordinary4xx.calls[0]!.outcome, "local_reject");

    const tooMany = await drainSse(429);
    assert.equal(tooMany.calls[0]!.outcome, "local_reject");

    const requestTimeout = await drainSse(408);
    assert.equal(requestTimeout.calls[0]!.outcome, "timeout");

    const clientGone = await drainSse(499);
    assert.equal(clientGone.calls[0]!.outcome, "cancelled");

    const gatewayTimeout = await drainSse(504);
    assert.equal(gatewayTimeout.calls[0]!.outcome, "timeout");

    const upstream = await drainSse(503);
    assert.equal(upstream.calls[0]!.outcome, "upstream_error");

    // Already-aborted signal settles immediately as cancelled (wins over 2xx).
    const ac = new AbortController();
    ac.abort();
    const abortedOk = await drainSse(200, ac.signal, true);
    assert.equal(abortedOk.releaseCount, 1);
    assert.equal(abortedOk.calls[0]!.outcome, "cancelled");

    runtime.dispose();
  });

  it("requires explicit non-success outcomes for handler failures", async () => {
    const runtime = makeRuntime(clock);
    const outcomes: Array<Exclude<AdmissionReleaseOutcome, "success">> = [
      "local_reject",
      "upstream_error",
      "timeout",
      "cancelled",
    ];
    for (const outcome of outcomes) {
      const spy = createSpyLease(`handler-${outcome}`);
      clock.nowMs = 500;
      runtime.releaseHandlerFailure(spy.lease, outcome, {
        admittedAtMs: 400,
        nowMs: clock.now,
      });
      assert.equal(spy.releaseCount, 1, outcome);
      assert.equal(spy.calls[0]!.outcome, outcome);
      assert.equal(spy.calls[0]!.meta?.latencyMs, 100);
      // Exactly-once: second call must not re-release.
      runtime.releaseHandlerFailure(spy.lease, outcome, {
        admittedAtMs: 400,
        nowMs: clock.now,
      });
      assert.equal(spy.releaseCount, 1, `${outcome} second`);
    }
    runtime.dispose();
  });

  it("releases JSON/non-SSE responses immediately once", async () => {
    const runtime = makeRuntime(clock);
    const spy = createSpyLease("json-once");
    clock.nowMs = 80;
    const wrapped = attachJson(runtime, spy, 200, { admittedAtMs: 20 });
    assert.equal(spy.releaseCount, 1);
    assert.equal(spy.calls[0]!.outcome, "success");
    assert.equal(spy.calls[0]!.meta?.latencyMs, 60);
    assert.equal(await wrapped.text(), JSON.stringify({ ok: true }));
    runtime.attachResponseLifecycle(
      new Response("{}", { status: 200, headers: { "Content-Type": "application/json" } }),
      spy.lease,
      { admittedAtMs: 20, nowMs: clock.now }
    );
    assert.equal(spy.releaseCount, 1);
    runtime.dispose();
  });

  it("keeps SSE lease until stream drain and releases exactly once", async () => {
    const runtime = makeRuntime(clock);
    const spy = createSpyLease("sse-drain");
    let pullCount = 0;
    const chunks = [
      new TextEncoder().encode("data: 1\n\n"),
      new TextEncoder().encode("data: 2\n\n"),
    ];
    const body = new ReadableStream<Uint8Array>({
      pull(controller) {
        if (pullCount < chunks.length) {
          controller.enqueue(chunks[pullCount++]);
          return;
        }
        controller.close();
      },
    });
    clock.nowMs = 120;
    const wrapped = runtime.attachResponseLifecycle(
      new Response(body, {
        status: 200,
        statusText: "OK",
        headers: { "Content-Type": "text/event-stream" },
      }),
      spy.lease,
      { admittedAtMs: 100, nowMs: clock.now }
    );
    assert.equal(spy.releaseCount, 0);
    assert.equal(wrapped.status, 200);
    assert.equal(wrapped.statusText, "OK");
    assert.equal(wrapped.headers.get("Content-Type"), "text/event-stream");
    const text = await wrapped.text();
    assert.match(text, /data: 1/);
    assert.match(text, /data: 2/);
    assert.equal(spy.releaseCount, 1);
    assert.equal(spy.calls[0]!.outcome, "success");
    assert.equal(spy.calls[0]!.meta?.latencyMs, 20);
    // Drain again must not re-release (stream already consumed).
    runtime.dispose();
  });

  it("releases once on stream error", async () => {
    const runtime = makeRuntime(clock);
    const spy = createSpyLease("sse-error");
    const body = new ReadableStream<Uint8Array>({
      pull(controller) {
        controller.error(new Error("upstream boom"));
      },
    });
    clock.nowMs = 90;
    const wrapped = runtime.attachResponseLifecycle(
      new Response(body, { status: 200, headers: { "Content-Type": "text/event-stream" } }),
      spy.lease,
      { admittedAtMs: 70, nowMs: clock.now }
    );
    await assert.rejects(async () => {
      await wrapped.text();
    });
    assert.equal(spy.releaseCount, 1);
    assert.equal(spy.calls[0]!.outcome, "upstream_error");
    assert.equal(spy.calls[0]!.meta?.latencyMs, 20);
    runtime.dispose();
  });

  it("releases once on consumer cancel without buffering", async () => {
    const runtime = makeRuntime(clock);
    const spy = createSpyLease("sse-cancel");
    let cancelCount = 0;
    let pulled = 0;
    const body = new ReadableStream<Uint8Array>({
      pull(controller) {
        pulled += 1;
        controller.enqueue(new TextEncoder().encode(`data: ${pulled}\n\n`));
      },
      cancel() {
        cancelCount += 1;
      },
    });
    clock.nowMs = 60;
    const wrapped = runtime.attachResponseLifecycle(
      new Response(body, { status: 200, headers: { "Content-Type": "text/event-stream" } }),
      spy.lease,
      { admittedAtMs: 10, nowMs: clock.now }
    );
    const reader = wrapped.body!.getReader();
    await reader.read();
    assert.equal(spy.releaseCount, 0);
    const pulledAfterFirst = pulled;
    await reader.cancel("client gone");
    assert.equal(cancelCount, 1);
    assert.equal(spy.releaseCount, 1);
    assert.equal(spy.calls[0]!.outcome, "cancelled");
    assert.equal(spy.calls[0]!.meta?.latencyMs, 50);
    // Laziness: no full buffering of the infinite producer.
    assert.ok(pulledAfterFirst <= 2);
    assert.ok(pulled < 20);
    // Second cancel is a no-op for both reader cancel and lease release.
    await reader.cancel("again");
    assert.equal(cancelCount, 1);
    assert.equal(spy.releaseCount, 1);
    runtime.dispose();
  });

  it("request abort cancels the reader and releases once under races", async () => {
    const runtime = makeRuntime(clock);
    const spy = createSpyLease("sse-abort-race");
    const ac = new AbortController();
    let cancelCount = 0;
    const body = new ReadableStream<Uint8Array>({
      async pull(controller) {
        controller.enqueue(new TextEncoder().encode("data: ping\n\n"));
        await new Promise<void>(() => {
          /* hang until cancel */
        });
      },
      cancel() {
        cancelCount += 1;
      },
    });
    clock.nowMs = 40;
    const wrapped = runtime.attachResponseLifecycle(
      new Response(body, { status: 200, headers: { "Content-Type": "text/event-stream" } }),
      spy.lease,
      { admittedAtMs: 10, signal: ac.signal, nowMs: clock.now }
    );
    const reader = wrapped.body!.getReader();
    const first = reader.read();
    ac.abort();
    // Race: also cancel consumer.
    void reader.cancel("race");
    await Promise.race([
      first.catch(() => undefined),
      new Promise((resolve) => setImmediate(resolve)),
    ]);
    await Promise.resolve();
    await Promise.resolve();
    assert.equal(spy.releaseCount, 1);
    assert.equal(spy.calls[0]!.outcome, "cancelled");
    assert.equal(typeof spy.calls[0]!.meta?.latencyMs, "number");
    assert.ok((spy.calls[0]!.meta?.latencyMs ?? -1) >= 0);
    assert.equal(cancelCount, 1);
    runtime.dispose();
  });
});
