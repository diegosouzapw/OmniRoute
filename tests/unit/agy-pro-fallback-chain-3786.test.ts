/**
 * #3786 — Antigravity (`agy` / `antigravity`) `gemini-3.1-pro-high` returns HTTP 400
 * ("Antigravity upstream error (400)") on recent upstream versions; `gemini-3.1-pro-low`
 * still works. OmniRoute sends the requested id VERBATIM (per #3696 wire capture). The
 * upstream changed the accepted model-id format for the Pro-high tier and the two
 * actively-maintained competitor proxies DISAGREE on the live id:
 *   - AntigravityManager  → `gemini-3.1-pro-high`
 *   - CLIProxyAPI         → `gemini-pro-agent` (display: "Gemini 3.1 Pro (High)")
 *   - older form          → `gemini-3-pro-high`
 *
 * Because the live id cannot be known from static analysis, we mirror AntigravityManager's
 * ROBUST approach: a per-request FALLBACK CHAIN that retries alternative upstream ids on a
 * 400, until one succeeds (2xx) or the chain is exhausted (then the original 400 surfaces,
 * sanitized — hard rule #12).
 *
 * The fallback chain lives at EXECUTOR REQUEST-TIME (retry on 400). It is NOT a change to
 * the static `resolveAntigravityModelId` map, so the #3696 invariant test stays green.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  ANTIGRAVITY_PRO_FALLBACK_CHAINS,
  getAntigravityModelFallbacks,
} from "../../open-sse/config/antigravityModelAliases.ts";
import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";
import { seedAntigravityVersionCache } from "../../open-sse/services/antigravityVersion.ts";

type ChatCompletionPayload = {
  object?: string;
  choices: Array<{ message: { content: string }; finish_reason: string }>;
};

type ErrorPayload = {
  error: { code?: string; message: string };
};

// ---------------------------------------------------------------------------
// Pure helper: getAntigravityModelFallbacks
// ---------------------------------------------------------------------------

test("(#3786) getAntigravityModelFallbacks returns the ordered pro-high chain", () => {
  assert.deepEqual(getAntigravityModelFallbacks("gemini-3.1-pro-high"), [
    "gemini-3.1-pro-high",
    "gemini-pro-agent",
    "gemini-3-pro-high",
  ]);
});

test("(#3786) getAntigravityModelFallbacks returns the ordered pro-low chain", () => {
  assert.deepEqual(getAntigravityModelFallbacks("gemini-3.1-pro-low"), [
    "gemini-3.1-pro-low",
    "gemini-3-pro-low",
  ]);
});

test("(#3786) getAntigravityModelFallbacks returns [] for unrelated models", () => {
  assert.deepEqual(getAntigravityModelFallbacks("gemini-2.5-flash"), []);
  assert.deepEqual(getAntigravityModelFallbacks("claude-sonnet-4-6"), []);
  assert.deepEqual(getAntigravityModelFallbacks("gemini-3-pro-preview"), []);
  assert.deepEqual(getAntigravityModelFallbacks(""), []);
});

test("(#3786) every chain starts with its own key (each candidate listed once)", () => {
  for (const [key, chain] of Object.entries(ANTIGRAVITY_PRO_FALLBACK_CHAINS)) {
    assert.equal(chain[0], key, `chain for ${key} must start with itself`);
    assert.equal(new Set(chain).size, chain.length, `chain for ${key} must have no duplicates`);
  }
});

// ---------------------------------------------------------------------------
// Behavioral: executor retries the next candidate on a 400
// ---------------------------------------------------------------------------

function makeSuccessSSE(): Response {
  return new Response(
    'data: {"response":{"candidates":[{"content":{"parts":[{"text":"OK"}]},"finishReason":"STOP"}]}}\n\n',
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

function make400(modelId: string): Response {
  return new Response(
    JSON.stringify({ error: { code: 400, message: `Model not found: ${modelId}` } }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
}

/** Extract the upstream model id from the serialized request envelope. */
function envelopeModel(init: RequestInit | undefined): string {
  try {
    return JSON.parse(String(init?.body)).model as string;
  } catch {
    return "";
  }
}

test("(#3786) execute retries pro-high with the next candidate when the first id 400s", async () => {
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;
  seedAntigravityVersionCache("2026.04.17-test");
  const modelsTried: string[] = [];

  globalThis.fetch = (async (_url: string, init?: RequestInit) => {
    const m = envelopeModel(init);
    modelsTried.push(m);
    // First candidate (gemini-3.1-pro-high) → 400, second (gemini-pro-agent) → 200
    if (m === "gemini-3.1-pro-high") return make400(m);
    return makeSuccessSSE();
  }) as typeof fetch;

  try {
    const result = await executor.execute({
      model: "antigravity/gemini-3.1-pro-high",
      body: { request: { contents: [] } },
      stream: false,
      credentials: { accessToken: "token", projectId: "project-1" },
      log: { debug() {}, warn() {}, info() {} },
    });
    const payload = (await result.response.json()) as ChatCompletionPayload;

    assert.equal(result.response.status, 200, "second candidate should succeed");
    assert.equal(payload.choices[0].message.content, "OK");
    // Exactly two upstream calls: the 400 then the 200 on the next id.
    assert.deepEqual(modelsTried, ["gemini-3.1-pro-high", "gemini-pro-agent"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("(#3786) execute exhausts the chain on all-400 and surfaces a sanitized 400 (each candidate tried once)", async () => {
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;
  seedAntigravityVersionCache("2026.04.17-test");
  const modelsTried: string[] = [];

  globalThis.fetch = (async (_url: string, init?: RequestInit) => {
    const m = envelopeModel(init);
    modelsTried.push(m);
    return make400(m); // every candidate fails with 400
  }) as typeof fetch;

  try {
    const result = await executor.execute({
      model: "antigravity/gemini-3.1-pro-high",
      body: { request: { contents: [] } },
      stream: false,
      credentials: { accessToken: "token", projectId: "project-1" },
      log: { debug() {}, warn() {}, info() {} },
    });
    const payload = (await result.response.json()) as ErrorPayload;

    // Surfaces a real, sanitized 400 — not a masked empty chat.completion.
    assert.equal(result.response.status, 400);
    assert.ok(payload.error, "must carry an error object");
    assert.equal(typeof payload.error.message, "string");
    assert.ok(!payload.error.message.includes("at /"), "no raw stack trace (hard rule #12)");

    // Each candidate tried EXACTLY once (bounded — no infinite loop).
    assert.deepEqual(modelsTried, ["gemini-3.1-pro-high", "gemini-pro-agent", "gemini-3-pro-high"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("(#3786) happy path: first id 200 makes exactly ONE upstream call (zero extra)", async () => {
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;
  seedAntigravityVersionCache("2026.04.17-test");
  const modelsTried: string[] = [];

  globalThis.fetch = (async (_url: string, init?: RequestInit) => {
    modelsTried.push(envelopeModel(init));
    return makeSuccessSSE();
  }) as typeof fetch;

  try {
    const result = await executor.execute({
      model: "antigravity/gemini-3.1-pro-high",
      body: { request: { contents: [] } },
      stream: false,
      credentials: { accessToken: "token", projectId: "project-1" },
      log: { debug() {}, warn() {}, info() {} },
    });

    assert.equal(result.response.status, 200);
    assert.deepEqual(modelsTried, ["gemini-3.1-pro-high"], "exactly one call on the happy path");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ---------------------------------------------------------------------------
// Behavioral: executor catches exceptions and continues the fallback chain
// ---------------------------------------------------------------------------

test("(#3786) exception on first candidate (timeout) falls through to second candidate returning 200", async () => {
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;
  seedAntigravityVersionCache("2026.04.17-test");
  const modelsTried: string[] = [];

  globalThis.fetch = (async (_url: string, init?: RequestInit) => {
    const m = envelopeModel(init);
    modelsTried.push(m);
    if (m === "gemini-3.1-pro-high") throw new Error("upstream timeout after 30000ms");
    return makeSuccessSSE();
  }) as typeof fetch;

  try {
    const result = await executor.execute({
      model: "antigravity/gemini-3.1-pro-high",
      body: { request: { contents: [] } },
      stream: false,
      credentials: { accessToken: "token", projectId: "project-1" },
      log: { debug() {}, warn() {}, info() {} },
    });
    const payload = (await result.response.json()) as ChatCompletionPayload;

    assert.equal(result.response.status, 200, "second candidate should succeed after first threw");
    assert.equal(payload.choices[0].message.content, "OK");
    // First candidate retried internally (URL-level retries on throw), then second succeeded.
    assert.equal(modelsTried[0], "gemini-3.1-pro-high", "first call targets first candidate");
    assert.ok(modelsTried.includes("gemini-pro-agent"), "must eventually try second candidate");
    assert.ok(
      modelsTried.lastIndexOf("gemini-3.1-pro-high") < modelsTried.indexOf("gemini-pro-agent"),
      "first candidate exhausted before second tried"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("(#3786) all candidates throw exceptions -- error includes 'chain exhausted'", async () => {
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;
  seedAntigravityVersionCache("2026.04.17-test");
  const modelsTried: string[] = [];

  globalThis.fetch = (async (_url: string, init?: RequestInit) => {
    const m = envelopeModel(init);
    modelsTried.push(m);
    throw new Error(`timeout on ${m}`);
  }) as typeof fetch;

  try {
    await assert.rejects(
      () =>
        executor.execute({
          model: "antigravity/gemini-3.1-pro-high",
          body: { request: { contents: [] } },
          stream: false,
          credentials: { accessToken: "token", projectId: "project-1" },
          log: { debug() {}, warn() {}, info() {} },
        }),
      (err: Error) => {
        assert.ok(
          err.message.includes("chain exhausted"),
          `error must mention chain exhausted, got: ${err.message}`
        );
        assert.ok(
          err.message.includes("timeout on"),
          `error must include last error message, got: ${err.message}`
        );
        return true;
      }
    );
    // All 3 candidates tried (each retries internally on throw).
    assert.ok(modelsTried.includes("gemini-3.1-pro-high"), "tried first candidate");
    assert.ok(modelsTried.includes("gemini-pro-agent"), "tried second candidate");
    assert.ok(modelsTried.includes("gemini-3-pro-high"), "tried third candidate");
    // Ordering: all first-candidate attempts before second, etc.
    const lastFirst = modelsTried.lastIndexOf("gemini-3.1-pro-high");
    const firstSecond = modelsTried.indexOf("gemini-pro-agent");
    const lastSecond = modelsTried.lastIndexOf("gemini-pro-agent");
    const firstThird = modelsTried.indexOf("gemini-3-pro-high");
    assert.ok(lastFirst < firstSecond, "first candidate exhausted before second tried");
    assert.ok(lastSecond < firstThird, "second candidate exhausted before third tried");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("(#3786) mixed path: 400 on first, exception on second, 200 on third", async () => {
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;
  seedAntigravityVersionCache("2026.04.17-test");
  const modelsTried: string[] = [];

  globalThis.fetch = (async (_url: string, init?: RequestInit) => {
    const m = envelopeModel(init);
    modelsTried.push(m);
    if (m === "gemini-3.1-pro-high") return make400(m);
    if (m === "gemini-pro-agent") throw new Error("connection reset");
    return makeSuccessSSE();
  }) as typeof fetch;

  try {
    const result = await executor.execute({
      model: "antigravity/gemini-3.1-pro-high",
      body: { request: { contents: [] } },
      stream: false,
      credentials: { accessToken: "token", projectId: "project-1" },
      log: { debug() {}, warn() {}, info() {} },
    });
    const payload = (await result.response.json()) as ChatCompletionPayload;

    assert.equal(result.response.status, 200, "third candidate should succeed");
    assert.equal(payload.choices[0].message.content, "OK");
    // First candidate (400, no retry) -> second candidate (throws, retried internally) -> third (200).
    assert.equal(modelsTried[0], "gemini-3.1-pro-high", "first call targets first candidate");
    assert.ok(modelsTried.includes("gemini-pro-agent"), "second candidate attempted");
    assert.ok(modelsTried.includes("gemini-3-pro-high"), "third candidate reached");
    assert.ok(
      modelsTried.lastIndexOf("gemini-pro-agent") < modelsTried.indexOf("gemini-3-pro-high"),
      "second candidate exhausted before third tried"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("(#3786) a non-pro model that 400s does NOT trigger the fallback chain", async () => {
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;
  seedAntigravityVersionCache("2026.04.17-test");
  const modelsTried: string[] = [];

  globalThis.fetch = (async (_url: string, init?: RequestInit) => {
    modelsTried.push(envelopeModel(init));
    return make400(envelopeModel(init));
  }) as typeof fetch;

  try {
    const result = await executor.execute({
      model: "antigravity/gemini-2.5-flash",
      body: { request: { contents: [] } },
      stream: false,
      credentials: { accessToken: "token", projectId: "project-1" },
      log: { debug() {}, warn() {}, info() {} },
    });

    // flash 400 surfaces directly — only the requested id is tried, no chain.
    assert.equal(result.response.status, 400);
    assert.deepEqual(modelsTried, ["gemini-2.5-flash"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("(#3786) mixed: first 400 + last throws returns firstResult (original 400) instead of throwing", async () => {
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;
  seedAntigravityVersionCache("2026.04.17-test");
  const modelsTried: string[] = [];

  globalThis.fetch = (async (_url: string, init?: RequestInit) => {
    const m = envelopeModel(init);
    modelsTried.push(m);
    if (m === "gemini-3.1-pro-high") return make400(m);
    // Second and third candidates throw
    throw new Error(`connection reset on ${m}`);
  }) as typeof fetch;

  try {
    const result = await executor.execute({
      model: "antigravity/gemini-3.1-pro-high",
      body: { request: { contents: [] } },
      stream: false,
      credentials: { accessToken: "token", projectId: "project-1" },
      log: { debug() {}, warn() {}, info() {} },
    });

    // Returns the original 400 from firstResult, not a thrown error.
    assert.equal(result.response.status, 400, "should return first candidate's 400");
    const payload = (await result.response.json()) as ErrorPayload;
    assert.ok(payload.error, "must carry an error object");
    assert.equal(typeof payload.error.message, "string");
    assert.ok(!payload.error.message.includes("at /"), "no raw stack trace (hard rule #12)");
    // All candidates tried (executeOnce retries internally, so duplicates are expected).
    assert.ok(modelsTried.includes("gemini-3.1-pro-high"), "first candidate tried");
    assert.ok(modelsTried.includes("gemini-pro-agent"), "second candidate tried");
    assert.ok(modelsTried.includes("gemini-3-pro-high"), "third candidate tried");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("(#3786) AbortError from standard Error (not DOMException) propagates immediately", async () => {
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;
  seedAntigravityVersionCache("2026.04.17-test");
  // Signal is NOT aborted -- this exercises the new Error.name === "AbortError" path.
  const controller = new AbortController();

  globalThis.fetch = (async (_url: string, _init?: RequestInit) => {
    // Simulate a polyfill/test env that throws standard Error with name AbortError
    const err = new Error("The operation was aborted");
    err.name = "AbortError";
    throw err;
  }) as typeof fetch;

  try {
    await assert.rejects(
      () =>
        executor.execute({
          model: "antigravity/gemini-3.1-pro-high",
          body: { request: { contents: [] } },
          stream: false,
          credentials: { accessToken: "token", projectId: "project-1" },
          signal: controller.signal,
          log: { debug() {}, warn() {}, info() {} },
        }),
      (err: Error) => {
        assert.equal(err.name, "AbortError", "must propagate as AbortError");
        return true;
      }
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
