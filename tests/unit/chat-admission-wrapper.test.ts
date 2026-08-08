/**
 * Focused unit tests for the shared handleChat adaptive-admission lifecycle wrapper.
 * No provider/network work — pure wrapper + context seams.
 */
import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  ANONYMOUS_ADMISSION_TENANT_KEY,
  captureDeferredClientRawBody,
  classifyHandlerFailure,
  createChatAdmissionContext,
  resolveAdmissionTenantKey,
  withChatAdmission,
  type ChatAdmissionContext,
} from "../../src/sse/handlers/chatAdmission.ts";
import {
  createAdaptiveAdmissionRuntime,
  type AdaptiveAdmissionRuntime,
} from "../../open-sse/services/admission/runtime.ts";
import type { AdaptiveAdmissionConfig } from "../../open-sse/services/admission/types.ts";

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
    minLimit: 1,
    maxLimit: 4,
    initialLimit: 1,
    maxQueueCount: 1,
    maxQueueCost: 4,
    defaultMaxWaitMs: 50,
    windowMs: 50,
    ...overrides,
  };
}

function makeRuntime(
  clock: FakeClock,
  config: AdaptiveAdmissionConfig = enforceConfig()
): AdaptiveAdmissionRuntime {
  return createAdaptiveAdmissionRuntime({
    config,
    clock: {
      now: clock.now,
      setTimer: clock.setTimer,
      clearTimer: clock.clearTimer,
    },
    checkResourcePressure: () => null,
    getResourcePressureObservation: () => ({
      signals: null,
      state: {
        severity: "normal",
        reason: "none",
        elevatedStreak: 0,
        recoveryStreak: 0,
        lastTransitionAtMs: 0,
        observedAtMs: 0,
      },
    }),
    nowMs: clock.now,
  });
}

describe("resolveAdmissionTenantKey", () => {
  it("uses only opaque api key id; never falls through to empty/raw", () => {
    assert.equal(resolveAdmissionTenantKey("key-abc"), "key-abc");
    assert.equal(resolveAdmissionTenantKey(""), ANONYMOUS_ADMISSION_TENANT_KEY);
    assert.equal(resolveAdmissionTenantKey(null), ANONYMOUS_ADMISSION_TENANT_KEY);
    assert.equal(resolveAdmissionTenantKey(undefined), ANONYMOUS_ADMISSION_TENANT_KEY);
  });
});

describe("captureDeferredClientRawBody", () => {
  it("captures only fixed mutable fields and restores client-visible values after admission", () => {
    let enumerations = 0;
    const target: Record<string, unknown> = {
      model: "no-think/openai/model",
      reasoning: { effort: "high" },
      untouched: "value",
    };
    const body = new Proxy(target, {
      ownKeys() {
        enumerations += 1;
        return Reflect.ownKeys(target);
      },
    });

    const deferred = captureDeferredClientRawBody(body);
    assert.equal(enumerations, 0, "pre-admission capture must not enumerate the body");

    body.model = "openai/model";
    body.reasoning_effort = "none";
    delete body.reasoning;

    const captured = deferred.withClientBody((clientBody) => ({
      model: (clientBody as Record<string, unknown>).model,
      reasoning: (clientBody as Record<string, unknown>).reasoning,
      hasEffort: Object.hasOwn(clientBody as object, "reasoning_effort"),
    }));

    assert.deepEqual(captured, {
      model: "no-think/openai/model",
      reasoning: { effort: "high" },
      hasEffort: false,
    });
    assert.equal(body.model, "openai/model", "working body must be restored after snapshot build");
    assert.equal(body.reasoning_effort, "none");
    assert.equal(Object.hasOwn(body, "reasoning"), false);
  });
});

describe("classifyHandlerFailure", () => {
  it("classifies abort / timeout / 4xx / else correctly", () => {
    const aborted = new AbortController();
    aborted.abort();
    assert.equal(classifyHandlerFailure(new Error("x"), aborted.signal), "cancelled");

    const abortErr = new Error("aborted");
    abortErr.name = "AbortError";
    assert.equal(classifyHandlerFailure(abortErr), "cancelled");

    const timeoutErr = new Error("timed out");
    timeoutErr.name = "TimeoutError";
    assert.equal(classifyHandlerFailure(timeoutErr), "timeout");

    assert.equal(classifyHandlerFailure(Object.assign(new Error("t"), { status: 504 })), "timeout");
    assert.equal(
      classifyHandlerFailure(Object.assign(new Error("bad"), { status: 400 })),
      "local_reject"
    );
    assert.equal(classifyHandlerFailure(new Error("upstream boom")), "upstream_error");
  });
});

describe("createChatAdmissionContext", () => {
  let clock: FakeClock;
  let runtime: AdaptiveAdmissionRuntime;

  beforeEach(() => {
    clock = new FakeClock();
    runtime = makeRuntime(clock);
  });

  afterEach(() => {
    runtime.dispose();
  });

  it("does not acquire when never called", async () => {
    const ctx = createChatAdmissionContext(() => runtime);
    assert.equal(ctx.getAdmittedState(), null);
    assert.equal(runtime.snapshot().activeCount, 0);
    assert.equal(runtime.snapshot().admittedCount, 0);
  });

  it("acquires once and rejects a second acquire without re-entering runtime", async () => {
    // Capacity must clear default feature cost; this case only locks once-semantics.
    runtime.dispose();
    runtime = makeRuntime(
      clock,
      enforceConfig({
        initialLimit: 64,
        minLimit: 8,
        maxLimit: 100,
        maxQueueCount: 8,
        maxQueueCost: 200,
      })
    );
    const ctx = createChatAdmissionContext(() => runtime);
    const first = await ctx.acquire(
      "tenant-a",
      { signal: undefined },
      {
        messages: [{ role: "user", content: "hi" }],
        stream: false,
      }
    );
    assert.equal(first, null);
    assert.ok(ctx.getAdmittedState());
    assert.equal(runtime.snapshot().activeCount, 1);

    const second = await ctx.acquire("tenant-b", {}, { messages: [] });
    assert.equal(second, null);
    assert.equal(runtime.snapshot().activeCount, 1);
    assert.equal(runtime.snapshot().admittedCount, 1);

    ctx.getAdmittedState()!.admitted.lease.release("success");
  });

  it("returns standardized 503 rejection without holding a lease", async () => {
    const tiny = makeRuntime(
      clock,
      enforceConfig({
        initialLimit: 1,
        minLimit: 1,
        maxLimit: 1,
        maxQueueCount: 1,
        maxQueueCost: 1,
        cost: { maxRequestCost: 1, baseCost: 1 },
      })
    );
    const holdCtx = createChatAdmissionContext(() => tiny);
    assert.equal(await holdCtx.acquire("hold", {}, { messages: [] }), null);

    const rejectCtx = createChatAdmissionContext(() => tiny);
    const rejectPromise = rejectCtx.acquire(
      "waiter",
      {},
      { messages: [{ role: "user", content: "x" }] }
    );
    clock.advance(50);
    const rejection = await rejectPromise;
    assert.ok(rejection);
    assert.equal(rejection!.status, 503);
    const body = await rejection!.json();
    assert.match(String(body.error?.code || ""), /^admission_/);
    assert.equal(rejectCtx.getAdmittedState(), null);

    holdCtx.getAdmittedState()!.admitted.lease.release("success");
    tiny.dispose();
  });
});

describe("withChatAdmission lifecycle", () => {
  let clock: FakeClock;
  let runtime: AdaptiveAdmissionRuntime;

  beforeEach(() => {
    clock = new FakeClock();
    runtime = makeRuntime(clock, enforceConfig({ mode: "shadow", initialLimit: 8, maxLimit: 20 }));
  });

  afterEach(() => {
    runtime.dispose();
  });

  function wrap(
    impl: (
      request: unknown,
      clientRaw: unknown,
      body: unknown,
      correlationId: string | undefined,
      ctx: ChatAdmissionContext
    ) => Promise<Response>
  ) {
    return withChatAdmission(impl as never, { getRuntime: () => runtime });
  }

  it("early return before acquire creates no lease / runtime activity", async () => {
    const handle = wrap(async () => new Response(JSON.stringify({ ok: true }), { status: 400 }));
    const res = await handle({ signal: undefined }, null, null);
    assert.equal(res.status, 400);
    assert.equal(runtime.snapshot().activeCount, 0);
    assert.equal(runtime.snapshot().admittedCount, 0);
  });

  it("JSON success releases active lease before return", async () => {
    const handle = wrap(async (_req, _raw, _body, _id, ctx) => {
      const rejection = await ctx.acquire("k1", {}, { messages: [], stream: false });
      assert.equal(rejection, null);
      assert.equal(runtime.snapshot().activeCount, 1);
      return new Response(JSON.stringify({ choices: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });
    const res = await handle({}, null, null);
    assert.equal(res.status, 200);
    assert.equal(runtime.snapshot().activeCount, 0);
    assert.equal(runtime.snapshot().admittedCount, 1);
  });

  it("SSE keeps lease through open stream and releases once on cancel", async () => {
    const handle = wrap(async (_req, _raw, _body, _id, ctx) => {
      const rejection = await ctx.acquire("k-sse", {}, { messages: [], stream: true });
      assert.equal(rejection, null);
      const stream = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new TextEncoder().encode("data: hi\n\n"));
        },
      });
      return new Response(stream, {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    });
    const res = await handle({}, null, null);
    assert.equal(runtime.snapshot().activeCount, 1);
    await res.body!.cancel();
    assert.equal(runtime.snapshot().activeCount, 0);
  });

  it("handler throw after acquisition releases once as upstream_error and rethrows", async () => {
    const outcomes: string[] = [];
    const release = runtime.releaseHandlerFailure;
    runtime.releaseHandlerFailure = (lease, outcome, options) => {
      outcomes.push(outcome);
      release.call(runtime, lease, outcome, options);
    };
    const handle = wrap(async (_req, _raw, _body, _id, ctx) => {
      assert.equal(await ctx.acquire("k-err", {}, { messages: [] }), null);
      throw new Error("provider exploded");
    });
    await assert.rejects(() => handle({}, null, null), /provider exploded/);
    assert.deepEqual(outcomes, ["upstream_error"]);
    assert.equal(runtime.snapshot().activeCount, 0);
  });

  it("attach failure releases exactly once before rethrow", async () => {
    const outcomes: string[] = [];
    const release = runtime.releaseHandlerFailure;
    runtime.releaseHandlerFailure = (lease, outcome, options) => {
      outcomes.push(outcome);
      release.call(runtime, lease, outcome, options);
    };
    runtime.attachResponseLifecycle = () => {
      throw new Error("attach failed");
    };

    const handle = wrap(async (_req, _raw, _body, _id, ctx) => {
      assert.equal(await ctx.acquire("k-attach", {}, { messages: [] }), null);
      return new Response("ok");
    });

    await assert.rejects(() => handle({}, null, null), /attach failed/);
    assert.deepEqual(outcomes, ["upstream_error"]);
    assert.equal(runtime.snapshot().activeCount, 0);
  });

  it("timeout-classified throw releases as timeout", async () => {
    const handle = wrap(async (_req, _raw, _body, _id, ctx) => {
      assert.equal(await ctx.acquire("k-to", {}, { messages: [] }), null);
      throw Object.assign(new Error("gateway timeout"), { status: 504 });
    });
    await assert.rejects(() => handle({}, null, null), /gateway timeout/);
    assert.equal(runtime.snapshot().activeCount, 0);
  });

  it("queue deadline rejection never invokes inner work after rejection", async () => {
    const tiny = makeRuntime(
      clock,
      enforceConfig({
        initialLimit: 1,
        minLimit: 1,
        maxLimit: 1,
        maxQueueCount: 1,
        maxQueueCost: 1,
        defaultMaxWaitMs: 40,
        cost: { maxRequestCost: 1, baseCost: 1 },
      })
    );

    const holdHandle = withChatAdmission(
      async (_req, _raw, _body, _id, ctx) => {
        assert.equal(await ctx.acquire("hold", {}, { messages: [] }), null);
        const stream = new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(new TextEncoder().encode("data: hold\n\n"));
          },
        });
        return new Response(stream, {
          status: 200,
          headers: { "Content-Type": "text/event-stream" },
        });
      },
      { getRuntime: () => tiny }
    );
    const holdRes = await holdHandle({}, null, null);
    assert.equal(tiny.snapshot().activeCount, 1);

    let innerCalls = 0;
    const rejectHandle = withChatAdmission(
      async (_req, _raw, _body, _id, ctx) => {
        const rejection = await ctx.acquire("waiter", {}, { messages: [] });
        if (rejection) return rejection;
        innerCalls += 1;
        return new Response("inner", { status: 200 });
      },
      { getRuntime: () => tiny }
    );

    const pending = rejectHandle({}, null, null);
    clock.advance(40);
    const rejected = await pending;
    assert.equal(rejected.status, 503);
    assert.equal(innerCalls, 0);

    await holdRes.body!.cancel();
    tiny.dispose();
  });

  it("queued request abort settles without inner provider work", async () => {
    const tiny = makeRuntime(
      clock,
      enforceConfig({
        initialLimit: 1,
        minLimit: 1,
        maxLimit: 1,
        maxQueueCount: 4,
        maxQueueCost: 16,
        defaultMaxWaitMs: 5_000,
        cost: { maxRequestCost: 1, baseCost: 1 },
      })
    );

    const holdHandle = withChatAdmission(
      async (_req, _raw, _body, _id, ctx) => {
        assert.equal(await ctx.acquire("hold", {}, { messages: [] }), null);
        return new Response(
          new ReadableStream({
            start(c) {
              c.enqueue(new TextEncoder().encode("data: h\n\n"));
            },
          }),
          { status: 200, headers: { "Content-Type": "text/event-stream" } }
        );
      },
      { getRuntime: () => tiny }
    );
    const holdRes = await holdHandle({}, null, null);

    let innerCalls = 0;
    const ac = new AbortController();
    const waitHandle = withChatAdmission(
      async (req, _raw, _body, _id, ctx) => {
        const rejection = await ctx.acquire("waiter", req, { messages: [] });
        if (rejection) return rejection;
        innerCalls += 1;
        return new Response("inner", { status: 200 });
      },
      { getRuntime: () => tiny }
    );

    const pending = waitHandle({ signal: ac.signal }, null, null);
    // Allow queue promise to arm, then abort without wall-clock sleep.
    await Promise.resolve();
    ac.abort();
    const rejected = await pending;
    assert.ok(rejected.status === 499 || rejected.status === 503);
    assert.equal(innerCalls, 0);

    await holdRes.body!.cancel();
    tiny.dispose();
  });
});
