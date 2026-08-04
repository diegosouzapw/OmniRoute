import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";

const { WEB_COOKIE_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { WEB_SESSION_CREDENTIAL_REQUIREMENTS } = await import(
  "../../src/shared/providers/webSessionCredentials.ts"
);
const { GeminiBusinessExecutor, parseStreamResponse } = await import(
  "../../open-sse/executors/gemini-business.ts"
);

// ─── Provider metadata ──────────────────────────────────────────────────────

test("Gemini Business is registered in WEB_COOKIE_PROVIDERS with the canonical identity", () => {
  const gem = WEB_COOKIE_PROVIDERS["gemini-business"];
  assert.ok(gem, "WEB_COOKIE_PROVIDERS.gemini-business must be defined");
  assert.equal(gem.id, "gemini-business");
  assert.equal(gem.alias, "gembiz");
  assert.equal(gem.name, "Gemini Business (Enterprise)");
  assert.equal(gem.website, "https://business.gemini.google");
  assert.equal(gem.hasFree, true);
  assert.equal(typeof gem.textIcon, "string");
});

test("Gemini Business credential requirements use __Secure-1PSID cookies", () => {
  const req = WEB_SESSION_CREDENTIAL_REQUIREMENTS["gemini-business"];
  assert.ok(req, "credential requirements must be defined");
  assert.equal(req.kind, "cookie");
  assert.equal(req.acceptsFullCookieHeader, true);
  assert.ok(
    req.storageKeys.includes("__Secure-1PSID"),
    "storageKeys must include __Secure-1PSID"
  );
  assert.ok(
    req.storageKeys.includes("__Secure-1PSIDTS"),
    "storageKeys must include __Secure-1PSIDTS"
  );
  assert.ok(
    req.placeholder.includes("business.gemini.google"),
    "placeholder must reference business.gemini.google"
  );
});

// ─── Executor class ─────────────────────────────────────────────────────────

test("GeminiBusinessExecutor constructs with the correct provider", () => {
  const ex = new GeminiBusinessExecutor();
  assert.equal((ex as unknown as { provider: string }).provider, "gemini-business");
});

test("GeminiBusinessExecutor.execute returns 401 when no cookies are provided", async () => {
  const ex = new GeminiBusinessExecutor();
  const result = await ex.execute({
    model: "gemini-2.5-pro",
    body: { messages: [{ role: "user", content: "hello" }] },
    stream: false,
    credentials: {},
    signal: new AbortController().signal,
  });
  assert.equal(result.response.status, 401);
  const text = await result.response.text();
  assert.ok(text.includes("Missing Gemini Business cookies"));
});

test("GeminiBusinessExecutor.execute returns 400 when no user message is provided", async () => {
  const ex = new GeminiBusinessExecutor();
  const result = await ex.execute({
    model: "gemini-2.5-pro",
    body: { messages: [] },
    stream: false,
    credentials: { apiKey: "__Secure-1PSID=fake; __Secure-1PSIDTS=fake" },
    signal: new AbortController().signal,
  });
  assert.equal(result.response.status, 400);
  const text = await result.response.text();
  assert.ok(text.includes("No user message found"));
});

// ─── Upstream request path ──────────────────────────────────────────────────

/**
 * Regression guard: `execute()` built its fetch options with `combineAbortSignals(...)`,
 * a function that exists nowhere in the codebase (the module imports `mergeAbortSignals`
 * and never used it). Evaluating the options object threw `ReferenceError` *before* fetch
 * was called; the surrounding try/catch turned that into a generic 502 "network error",
 * so every Gemini Business request failed while looking like an upstream outage.
 *
 * It went unnoticed because `open-sse/tsconfig.json` could not be type-checked (the
 * deprecated `baseUrl` aborted the run with TS5101) and `typecheck:core` only covers a
 * curated 26-file allowlist that excludes this executor.
 */
test("GeminiBusinessExecutor.execute reaches the upstream fetch and passes an abort signal", async () => {
  const ex = new GeminiBusinessExecutor();
  const originalFetch = globalThis.fetch;
  let fetchCalled = false;
  let receivedSignal: unknown;

  // Same wire shape the parseStreamResponse tests below use: inner[4][0] is a
  // [metadata, text_list] pair. An empty body would take the "returned no text" 502
  // branch and mask what this test is actually asserting.
  const inner = new Array(80).fill(null);
  inner[4] = [[null, ["Hello from Gemini Business"]]];
  const upstreamBody = `[["wrb.fr", null, ${JSON.stringify(JSON.stringify(inner))}]]`;

  globalThis.fetch = (async (_url: unknown, init?: { signal?: unknown }) => {
    fetchCalled = true;
    receivedSignal = init?.signal;
    return new Response(upstreamBody, { status: 200 });
  }) as typeof globalThis.fetch;

  try {
    const result = await ex.execute({
      model: "gemini-2.5-pro",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: false,
      credentials: { apiKey: "__Secure-1PSID=fake; __Secure-1PSIDTS=fake" },
      signal: new AbortController().signal,
    });

    assert.equal(fetchCalled, true, "execute() must reach the upstream fetch");
    assert.ok(
      receivedSignal instanceof AbortSignal,
      "the upstream fetch must receive a combined AbortSignal"
    );
    assert.notEqual(
      result.response.status,
      502,
      "a ReferenceError while building fetch options must not surface as an upstream 502"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GeminiBusinessExecutor.execute still applies a timeout when the caller passes no signal", async () => {
  const ex = new GeminiBusinessExecutor();
  const originalFetch = globalThis.fetch;
  let receivedSignal: unknown;

  globalThis.fetch = (async (_url: unknown, init?: { signal?: unknown }) => {
    receivedSignal = init?.signal;
    return new Response("", { status: 200 });
  }) as typeof globalThis.fetch;

  try {
    // `ExecuteInput.signal` is `AbortSignal | null | undefined`; mergeAbortSignals()
    // requires two real signals, so the null case must fall back to the timeout alone.
    await ex.execute({
      model: "gemini-2.5-pro",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: false,
      credentials: { apiKey: "__Secure-1PSID=fake; __Secure-1PSIDTS=fake" },
      signal: null,
    });

    assert.ok(
      receivedSignal instanceof AbortSignal,
      "a timeout signal must still be applied when the caller supplies none"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ─── parseStreamResponse ────────────────────────────────────────────────────

test("parseStreamResponse extracts text from a single wrb.fr chunk", () => {
  // Real format per gemini-web2api.py: inner[4][0][1] is the text array.
  // inner[4][0] is a 2-element pair [metadata, text_list].
  const inner = new Array(80).fill(null);
  inner[4] = [[null, ["Hello, world!"]]];
  const innerStr = JSON.stringify(inner);
  const raw = `[["wrb.fr", null, ${JSON.stringify(innerStr)}]]`;
  const result = parseStreamResponse(raw);
  assert.equal(result, "Hello, world!");
});

test("parseStreamResponse concatenates text from multiple wrb.fr chunks", () => {
  const makeChunk = (text: string) => {
    const inner = new Array(80).fill(null);
    inner[4] = [[null, [text]]];
    return `[["wrb.fr", null, ${JSON.stringify(JSON.stringify(inner))}]]`;
  };
  const raw = `)]}'\n10\n${makeChunk("First ")}\n5\n${makeChunk("chunk")}`;
  const result = parseStreamResponse(raw);
  assert.equal(result, "First chunk");
});

test("parseStreamResponse filters out non-string entries and ignores text-metadata slot", () => {
  // Slot 0 of inner[4][0] is metadata (often null/empty), slot 1 is the text list.
  const inner = new Array(80).fill(null);
  inner[4] = [[null, ["clean ", 123, null, "text"]]];
  const innerStr = JSON.stringify(inner);
  const raw = `[["wrb.fr", null, ${JSON.stringify(innerStr)}]]`;
  const result = parseStreamResponse(raw);
  assert.equal(result, "clean text");
});

test("parseStreamResponse returns empty string for malformed response", () => {
  const result = parseStreamResponse(")]}'\n42\nnot json");
  assert.equal(result, "");
});

test("parseStreamResponse returns empty string for empty response", () => {
  const result = parseStreamResponse("");
  assert.equal(result, "");
});

test("parseStreamResponse returns empty string for non-wrb.fr lines", () => {
  const raw = `)]}'\n10\n[["other.rpc", null, "irrelevant"]]`;
  const result = parseStreamResponse(raw);
  assert.equal(result, "");
});

test("parseStreamResponse handles inner array with empty text", () => {
  const inner = new Array(80).fill(null);
  inner[4] = [[""]];
  const innerStr = JSON.stringify(inner);
  const raw = `[["wrb.fr", null, ${JSON.stringify(innerStr)}]]`;
  const result = parseStreamResponse(raw);
  assert.equal(result, "");
});

test("parseStreamResponse handles real Gemini response format with multiple inner array slots", () => {
  const inner = new Array(80).fill(null);
  inner[4] = [[null, ["This is the real format."]]];
  const innerStr = JSON.stringify(inner);
  const raw = `[["wrb.fr", null, ${JSON.stringify(innerStr)}]]`;
  const result = parseStreamResponse(raw);
  assert.equal(result, "This is the real format.");
});
