// Characterization of storeStreamingSemanticCacheResponse — the streaming Phase 9.1 cache store
// extracted from handleChatCore's onStreamComplete (chatCore god-file decomposition, #3501). Deps
// are injected so the gate + `_streamed` strip + signature + token accounting are observable
// without the real cache backend. Locks: the 4-way gate (enabled + status 200 + body + cacheable),
// the `_streamed` strip, skip-on-too-large, `Number(...) || 0` tokens, and fail-open on throw.
import { test } from "node:test";
import assert from "node:assert/strict";

const { storeStreamingSemanticCacheResponse } = await import(
  "../../open-sse/handlers/chatCore/streamingSemanticCacheStore.ts"
);

type Stored = { sig: unknown; model: string; body: Record<string, unknown>; tokens: number };

function makeDeps(overrides: Record<string, unknown> = {}) {
  const stored: Stored[] = [];
  const deps = {
    isCacheableForWrite: () => true,
    isSmallEnoughForSemanticCache: () => true,
    generateSignature: (...a: unknown[]) => `sig:${JSON.stringify(a)}`,
    setCachedResponse: (sig: unknown, model: string, body: Record<string, unknown>, tokens: number) =>
      stored.push({ sig, model, body, tokens }),
    ...overrides,
  } as Parameters<typeof storeStreamingSemanticCacheResponse>[1];
  return { deps, stored };
}

function baseArgs(overrides: Record<string, unknown> = {}) {
  return {
    enabled: true,
    streamStatus: 200,
    streamResponseBody: { id: "resp-1", _streamed: true },
    body: { messages: [{ role: "user", content: "hi" }], temperature: 0, top_p: 1 },
    headers: undefined,
    model: "gpt-x",
    apiKeyId: "key-1",
    streamUsage: { prompt_tokens: 12, completion_tokens: 8 },
    log: undefined,
    ...overrides,
  } as Parameters<typeof storeStreamingSemanticCacheResponse>[0];
}

test("happy path → stores cleaned body (no _streamed), tokens = prompt + completion", () => {
  const { deps, stored } = makeDeps();
  storeStreamingSemanticCacheResponse(baseArgs(), deps);
  assert.equal(stored.length, 1);
  assert.equal(stored[0].model, "gpt-x");
  assert.equal(stored[0].tokens, 20);
  assert.equal("_streamed" in stored[0].body, false);
  assert.equal(stored[0].body.id, "resp-1");
});

test("non-200 stream status → no store", () => {
  const { deps, stored } = makeDeps();
  storeStreamingSemanticCacheResponse(baseArgs({ streamStatus: 500 }), deps);
  assert.equal(stored.length, 0);
});

test("disabled → no store", () => {
  const { deps, stored } = makeDeps();
  storeStreamingSemanticCacheResponse(baseArgs({ enabled: false }), deps);
  assert.equal(stored.length, 0);
});

test("missing response body → no store", () => {
  const { deps, stored } = makeDeps();
  storeStreamingSemanticCacheResponse(baseArgs({ streamResponseBody: null }), deps);
  assert.equal(stored.length, 0);
});

test("not cacheable-for-write → no store", () => {
  const { deps, stored } = makeDeps({ isCacheableForWrite: () => false });
  storeStreamingSemanticCacheResponse(baseArgs(), deps);
  assert.equal(stored.length, 0);
});

test("too large → no store (early return inside try)", () => {
  const { deps, stored } = makeDeps({ isSmallEnoughForSemanticCache: () => false });
  storeStreamingSemanticCacheResponse(baseArgs(), deps);
  assert.equal(stored.length, 0);
});

test("missing usage → tokens coerce to 0", () => {
  const { deps, stored } = makeDeps();
  storeStreamingSemanticCacheResponse(baseArgs({ streamUsage: null }), deps);
  assert.equal(stored[0].tokens, 0);
});

test("a throwing dep is swallowed (fail-open, non-critical)", () => {
  const { deps } = makeDeps({
    setCachedResponse: () => {
      throw new Error("cache write boom");
    },
  });
  assert.doesNotThrow(() => storeStreamingSemanticCacheResponse(baseArgs(), deps));
});
