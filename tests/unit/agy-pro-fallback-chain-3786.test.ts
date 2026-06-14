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
