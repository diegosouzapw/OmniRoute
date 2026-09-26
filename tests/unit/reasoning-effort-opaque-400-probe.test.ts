import { test, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { BaseExecutor } from "../../open-sse/executors/base.ts";
import {
  getLearnedReasoningEffort,
  nextProbeReasoningEffort,
  recordLearnedProbeReasoningEffort,
  parseReasoningEffortEnum,
  __test_resetLearnedReasoningEffortCaps,
} from "../../open-sse/services/learnedReasoningEffortCaps.ts";

// The failure this covers: an upstream that refuses an out-of-range
// reasoning_effort with a body naming no accepted set. Measured against
// opencode.ai/zen/go (mimo-v2.6-flash / mimo-v2.5-pro), whose rejection is an
// opaque `{"type":"server_error","message":"Streaming response failed: [400]
// Invalid request parameters"}` wrapped in the SSE error frame — no list, so
// `parseReasoningEffortEnum` has nothing to learn from and the request 400s on
// every attempt.
const OPAQUE_400_BODY = JSON.stringify({
  error: {
    param: "",
    type: "server_error",
    message: "Streaming response failed: [400] Invalid request parameters",
  },
});

const ANY_400_BODY = JSON.stringify({ error: { message: "Invalid request parameters" } });

const PROVIDER = "openai-compatible-probe-test";
const MODEL = "mimo-v2.6-flash";

const CREDENTIALS = {
  providerSpecificData: { baseUrl: "https://example.invalid/v1" },
};

class SimpleExecutor extends BaseExecutor {
  constructor() {
    super(PROVIDER, {
      baseUrls: ["https://example.invalid/v1/chat/completions"],
    });
  }
  async transformRequest(_model: string, body: Record<string, unknown>) {
    return { ...body };
  }
}

beforeEach(() => {
  __test_resetLearnedReasoningEffortCaps();
});

after(() => {
  __test_resetLearnedReasoningEffortCaps();
});

/** Mock fetch: first call 400s with `rejectBody`, later calls answer 200. */
function mockFetchOnce(capturedBodies: Record<string, unknown>[], rejectBody: string) {
  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    capturedBodies.push(JSON.parse(String(init.body)));
    if (capturedBodies.length === 1) {
      return new Response(rejectBody, {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
}

async function withMockedFetch<T>(fn: () => Promise<T>): Promise<T> {
  const originalFetch = globalThis.fetch;
  try {
    return await fn();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

// ── nextProbeReasoningEffort ───────────────────────────────────────────────

test("the opaque 400 body carries no enum, so the learned path cannot fire", () => {
  // Guards the premise of the whole probe: if this ever parses, the probe is
  // redundant and this file's assertions below would be testing dead code.
  assert.equal(parseReasoningEffortEnum(OPAQUE_400_BODY), null);
  assert.equal(parseReasoningEffortEnum(ANY_400_BODY), null);
});

test("the probe steps down exactly one tier", () => {
  assert.equal(nextProbeReasoningEffort("xhigh"), "high");
  assert.equal(nextProbeReasoningEffort("max"), "xhigh");
  assert.equal(nextProbeReasoningEffort("ultra"), "max");
  assert.equal(nextProbeReasoningEffort("medium"), "low");
  assert.equal(nextProbeReasoningEffort("high"), "medium");
});

test("the probe declines at the floor and on values outside the scale", () => {
  assert.equal(nextProbeReasoningEffort("low"), null, "low is the probe floor");
  assert.equal(nextProbeReasoningEffort("none"), null, "nothing below none");
  assert.equal(nextProbeReasoningEffort("minimal"), null);
  assert.equal(nextProbeReasoningEffort("banana"), null);
  assert.equal(nextProbeReasoningEffort(""), null);
});

// ── recordLearnedProbeReasoningEffort ──────────────────────────────────────

test("a successful probe learns the whole proven prefix, not just the probed tier", () => {
  const learned = recordLearnedProbeReasoningEffort(PROVIDER, MODEL, "high");
  assert.deepEqual([...(learned as Set<string>)].sort(), ["high", "low", "medium"]);
  const stored = getLearnedReasoningEffort(PROVIDER, MODEL);
  assert.equal((stored as unknown as Set<string>).has("xhigh"), false, "xhigh stays refused");
  assert.equal((stored as unknown as Set<string>).has("none"), false, "none was not proven");
});

test("a probe at the floor learns only low", () => {
  const learned = recordLearnedProbeReasoningEffort(PROVIDER, MODEL, "low");
  assert.deepEqual([...(learned as Set<string>)], ["low"]);
});

test("probing an unknown provider+model, or an unknown tier, learns nothing", () => {
  assert.equal(recordLearnedProbeReasoningEffort(PROVIDER, MODEL, "banana"), null);
  assert.equal(recordLearnedProbeReasoningEffort("", "", "high"), null);
  assert.equal(getLearnedReasoningEffort(PROVIDER, MODEL), null);
});

// ── the reactive chain in base.ts ──────────────────────────────────────────

test("an opaque 400 probes one step down, retries, and learns the ceiling", async () => {
  const executor = new SimpleExecutor();
  const captured: Record<string, unknown>[] = [];

  await withMockedFetch(async () => {
    mockFetchOnce(captured, OPAQUE_400_BODY);
    const result = await executor.execute({
      model: MODEL,
      body: { reasoning_effort: "xhigh" },
      stream: false,
      credentials: CREDENTIALS,
    });
    assert.equal(result.response.status, 200, "the probe answered, so the client sees 200");
  });

  assert.equal(captured.length, 2, "exactly one probe, not a ladder walk");
  assert.equal(captured[0].reasoning_effort, "xhigh", "the first attempt is untouched");
  assert.equal(captured[1].reasoning_effort, "high", "the probe steps down one tier");
  const stored = getLearnedReasoningEffort(PROVIDER, MODEL) as unknown as Set<string>;
  assert.equal(stored.has("high"), true, "learned from the probe that succeeded");
});

test("after the probe, a later request clamps on the FIRST attempt", async () => {
  const executor = new SimpleExecutor();
  const captured: Record<string, unknown>[] = [];

  await withMockedFetch(async () => {
    mockFetchOnce(captured, OPAQUE_400_BODY);
    await executor.execute({
      model: MODEL,
      body: { reasoning_effort: "xhigh" },
      stream: false,
      credentials: CREDENTIALS,
    });
    // Second request, same provider+model: the learned set must apply up front.
    captured.length = 0;
    globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
      captured.push(JSON.parse(String(init.body)));
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };
    await executor.execute({
      model: MODEL,
      body: { reasoning_effort: "xhigh" },
      stream: false,
      credentials: CREDENTIALS,
    });
  });

  assert.equal(captured.length, 1, "no 4xx round-trip needed any more");
  assert.equal(captured[0].reasoning_effort, "high", "clamped proactively from the learned set");
});

test("a failed probe learns nothing and surfaces the upstream error", async () => {
  const executor = new SimpleExecutor();
  const captured: Record<string, unknown>[] = [];

  const result = await withMockedFetch(async () => {
    // 400 on the original AND on the probe: the model refuses every tier.
    globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
      captured.push(JSON.parse(String(init.body)));
      return new Response(ANY_400_BODY, {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    };
    return executor.execute({
      model: MODEL,
      body: { reasoning_effort: "xhigh" },
      stream: false,
      credentials: CREDENTIALS,
    });
  });

  assert.equal(captured.length, 2, "probed once, then stopped");
  assert.equal(result.response.status, 400, "the probe's own status is surfaced");
  assert.equal(
    getLearnedReasoningEffort(PROVIDER, MODEL),
    null,
    "a failed probe proves nothing, so nothing is pinned"
  );
});

test("an effort at the probe floor is not probed — nothing to step down to", async () => {
  const executor = new SimpleExecutor();
  const captured: Record<string, unknown>[] = [];

  await withMockedFetch(async () => {
    globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
      captured.push(JSON.parse(String(init.body)));
      return new Response(ANY_400_BODY, {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    };
    await executor.execute({
      model: MODEL,
      body: { reasoning_effort: "low" },
      stream: false,
      credentials: CREDENTIALS,
    });
  });

  assert.equal(captured.length, 1, "no probe: low is already the floor");
  assert.equal(getLearnedReasoningEffort(PROVIDER, MODEL), null);
});

test("a 400 that names no enum but carries no effort is left alone", async () => {
  const executor = new SimpleExecutor();
  const captured: Record<string, unknown>[] = [];

  await withMockedFetch(async () => {
    globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
      captured.push(JSON.parse(String(init.body)));
      return new Response(ANY_400_BODY, {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    };
    await executor.execute({
      model: MODEL,
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: CREDENTIALS,
    });
  });

  assert.equal(captured.length, 1, "no effort to probe for, so no probe");
});

test("the probe rewrites only the effort, on the Responses carrier too", async () => {
  const executor = new SimpleExecutor();
  const captured: Record<string, unknown>[] = [];

  await withMockedFetch(async () => {
    mockFetchOnce(captured, ANY_400_BODY);
    await executor.execute({
      model: MODEL,
      body: { reasoning: { effort: "max" }, messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: CREDENTIALS,
    });
  });

  assert.equal(captured.length, 2);
  assert.deepEqual(captured[0].reasoning, { effort: "max" });
  assert.deepEqual(
    captured[1].reasoning,
    { effort: "xhigh" },
    "one rung down from max, on the same carrier"
  );
  assert.equal(
    captured[1].reasoning_effort,
    undefined,
    "a carrier the request did not use is not invented"
  );
});
