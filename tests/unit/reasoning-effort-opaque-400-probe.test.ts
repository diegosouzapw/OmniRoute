import { test, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { BaseExecutor } from "../../open-sse/executors/base.ts";
import { applyReasoningEffortRecovery } from "../../open-sse/executors/base/reasoningEffortRecovery.ts";
import {
  getLearnedReasoningEffort,
  nextProbeReasoningEffort,
  recordLearnedProbeReasoningEffort,
  reasoningEffortProbeEnabled,
  recordLearnedReasoningEffort,
  parseReasoningEffortEnum,
  __test_resetLearnedReasoningEffortCaps,
} from "../../open-sse/services/learnedReasoningEffortCaps.ts";

// The failure this covers: an upstream that refuses an out-of-range
// reasoning_effort with a body naming no accepted set. Measured against
// opencode.ai/zen/go (mimo-v2.6-flash / mimo-v2.5-pro), whose rejection is an
// opaque `{"type":"server_error","message":"Streaming response failed: [400]
// Invalid request parameters"}` wrapped in the SSE error frame — no list, so
// `parseReasoningEffortEnum` has nothing to learn from and the request 400s on
// every attempt. The probe is opt-in per provider
// (OMNIROUTE_REASONING_EFFORT_PROBE_PROVIDERS) because such a body gives no
// signal that the effort was the cause, so it is applied only where an operator
// has said this gateway is known to answer opaquely on the effort.
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

// The probe is opt-in per provider (see reasoningEffortProbeEnabled), and
// Copilot's review is why: an opaque 4xx gives no signal that the effort was the
// cause, so a 2xx on the probe could mask an unrelated validation failure and
// pin an unproven cap. The end-to-end tests below enable it for this fake
// provider; the gate tests that follow then turn it back off explicitly.
const PROBE_ENV_KEY = "OMNIROUTE_REASONING_EFFORT_PROBE_PROVIDERS";
const savedProbeEnv = process.env[PROBE_ENV_KEY];
beforeEach(() => {
  __test_resetLearnedReasoningEffortCaps();
  process.env[PROBE_ENV_KEY] = PROVIDER;
});

after(() => {
  __test_resetLearnedReasoningEffortCaps();
  if (savedProbeEnv === undefined) delete process.env[PROBE_ENV_KEY];
  else process.env[PROBE_ENV_KEY] = savedProbeEnv;
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

/** Run `fn` with env overrides applied, then restore the previous values. */
async function withEnv<T>(
  vars: Record<string, string | undefined>,
  fn: () => Promise<T>
): Promise<T> {
  const saved = Object.fromEntries(Object.keys(vars).map((k) => [k, process.env[k]]));
  for (const [k, v] of Object.entries(vars)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
  try {
    return await fn();
  } finally {
    for (const [k, v] of Object.entries(saved)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
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

test("a successful probe learns ONLY the tier it proved, never the tiers below it", () => {
  // One accepted probe is proof about one value. A model can answer `high` and
  // still refuse `low` (the learned-cap tests already cover sparse sets such as
  // {high,max}), so the tiers below the probe stay unproven and unlearned.
  const learned = recordLearnedProbeReasoningEffort(PROVIDER, MODEL, "high");
  assert.deepEqual([...(learned as Set<string>)], ["high"]);
  const stored = getLearnedReasoningEffort(PROVIDER, MODEL) as unknown as Set<string>;
  assert.equal(stored.has("medium"), false, "medium was never probed");
  assert.equal(stored.has("low"), false, "low was never probed — a sparse set is real");
  assert.equal(stored.has("xhigh"), false, "xhigh stayed refused");
  assert.equal(stored.has("none"), false, "none was not proven");
});

test("a probe at the floor learns only low", () => {
  const learned = recordLearnedProbeReasoningEffort(PROVIDER, MODEL, "low");
  assert.deepEqual([...(learned as Set<string>)], ["low"]);
});

test("a refused 4xx on a HIGHER tier is not re-learned by a lower probe", () => {
  // xhigh 400s, the probe at high is answered. The accepted set is then exactly
  // {high} — xhigh stays out, which is the whole point of learning a ceiling
  // rather than a floor.
  recordLearnedReasoningEffort(PROVIDER, MODEL, ["high"]);
  const stored = getLearnedReasoningEffort(PROVIDER, MODEL) as unknown as Set<string>;
  assert.deepEqual([...stored].sort(), ["high"]);
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

// ── the opt-in gate ────────────────────────────────────────────────────────
// These exist because of review: an opaque 4xx names no enum, so nothing in it
// says the *effort* was the cause. Applying the probe to every such 400 would
// re-POST any unrelated validation failure (context too long, malformed tool
// schema) with a different body, and a 2xx on that probe would mask the real
// error while recording a reasoning cap nothing was ever proven against.

test("the probe is off by default, so an opaque 400 is surfaced unchanged", async () => {
  const executor = new SimpleExecutor();
  const captured: Record<string, unknown>[] = [];

  await withMockedFetch(async () => {
    mockFetchOnce(captured, OPAQUE_400_BODY);
    const result = await withEnv({ [PROBE_ENV_KEY]: undefined }, () =>
      executor.execute({
        model: MODEL,
        body: { reasoning_effort: "xhigh" },
        stream: false,
        credentials: CREDENTIALS,
      })
    );
    assert.equal(result.response.status, 400, "the original error is not masked");
  });

  assert.equal(captured.length, 1, "no second POST for an unrelated provider");
  assert.equal(
    getLearnedReasoningEffort(PROVIDER, MODEL),
    null,
    "no cap is recorded from a probe that never ran"
  );
});

test("an empty or blank provider list is treated as disabled", () => {
  // beforeEach enables the probe for PROVIDER, so each value is set explicitly.
  for (const value of ["", "   ", ",,"]) {
    assert.equal(
      withEnvSync(value, () => reasoningEffortProbeEnabled(PROVIDER)),
      false,
      JSON.stringify(value)
    );
  }
});

test("the opt-in matches the provider, case- and space-insensitively", () => {
  const mixed = `  ${PROVIDER.toUpperCase()} , other-provider `;
  assert.equal(
    withEnvSync(mixed, () => reasoningEffortProbeEnabled(PROVIDER)),
    true,
    "a padded, differently-cased entry still matches"
  );
  assert.equal(
    withEnvSync("some-other-provider", () => reasoningEffortProbeEnabled(PROVIDER)),
    false,
    "a provider that was not opted in stays off"
  );
});

test("`*` enables the probe for every provider", () => {
  assert.equal(
    withEnvSync("*", () => reasoningEffortProbeEnabled("anything-at-all")),
    true
  );
  assert.equal(
    withEnvSync("openai, *", () => reasoningEffortProbeEnabled("anything-at-all")),
    true,
    "a wildcard alongside real entries still wins"
  );
});

test("a null provider is never probed even under a wildcard-free list", () => {
  assert.equal(
    withEnvSync(PROVIDER, () => reasoningEffortProbeEnabled(null)),
    false
  );
});

/** Set the env var, read the result synchronously, restore. */
function withEnvSync<T>(value: string, fn: () => T): T {
  const saved = process.env[PROBE_ENV_KEY];
  process.env[PROBE_ENV_KEY] = value;
  try {
    return fn();
  } finally {
    if (saved === undefined) delete process.env[PROBE_ENV_KEY];
    else process.env[PROBE_ENV_KEY] = saved;
  }
}

// #14629 extracted the clamp-and-retry chain into applyReasoningEffortRecovery() so
// executors that never call super.execute() (commandCode, cliproxyapi, glm) reach it.
// The probe must live there too, or those callers keep 400ing on opaque bodies.
test("applyReasoningEffortRecovery probes one tier down for direct callers", async () => {
  const sent: Record<string, unknown>[] = [];
  const recovery = await applyReasoningEffortRecovery({
    response: new Response(OPAQUE_400_BODY, { status: 400 }),
    url: "https://example.invalid/v1/chat/completions",
    provider: PROVIDER,
    model: MODEL,
    body: { model: MODEL, reasoning_effort: "xhigh", messages: [] },
    fetchOptions: { method: "POST" },
    fetchFn: async (_url, init) => {
      sent.push(JSON.parse(String(init.body)));
      return new Response("{}", { status: 200 });
    },
  });

  assert.equal(recovery.retried, true);
  assert.equal(recovery.attempted, true);
  assert.equal(recovery.response.status, 200);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].reasoning_effort, "high");
  assert.deepEqual([...(getLearnedReasoningEffort(PROVIDER, MODEL) ?? [])], ["high"]);
});

test("applyReasoningEffortRecovery leaves an opaque 4xx alone when the probe is off", async () => {
  let calls = 0;
  const original = new Response(OPAQUE_400_BODY, { status: 400 });
  const recovery = await withEnvAsync("", () =>
    applyReasoningEffortRecovery({
      response: original,
      url: "https://example.invalid/v1/chat/completions",
      provider: PROVIDER,
      model: MODEL,
      body: { model: MODEL, reasoning_effort: "xhigh", messages: [] },
      fetchOptions: { method: "POST" },
      fetchFn: async () => {
        calls += 1;
        return new Response("{}", { status: 200 });
      },
    })
  );

  assert.equal(calls, 0);
  assert.equal(recovery.retried, false);
  assert.equal(recovery.response, original);
  assert.equal(getLearnedReasoningEffort(PROVIDER, MODEL), null);
});

async function withEnvAsync<T>(value: string, fn: () => Promise<T>): Promise<T> {
  const saved = process.env[PROBE_ENV_KEY];
  process.env[PROBE_ENV_KEY] = value;
  try {
    return await fn();
  } finally {
    if (saved === undefined) delete process.env[PROBE_ENV_KEY];
    else process.env[PROBE_ENV_KEY] = saved;
  }
}
