// Characterization of storeSemanticCacheResponse — the Phase 9.1 non-streaming semantic-cache
// store extracted from handleChatCore (chatCore god-file decomposition, #3501). Deps are injected
// so the gating logic + signature derivation are observable without the real cache backend.
// Locks: the 3-way gate (enabled + cacheable-for-write + small-enough), the signature args
// (messages ?? input, temperature, top_p, apiKeyId), and the `prompt + completion || 0` token count.
import { test } from "node:test";
import assert from "node:assert/strict";

const { storeSemanticCacheResponse } = await import(
  "../../open-sse/handlers/chatCore/semanticCacheStore.ts"
);

type Stored = { sig: unknown; model: string; response: unknown; tokens: number };

function makeDeps(overrides: Record<string, unknown> = {}) {
  const stored: Stored[] = [];
  const calls = { cacheable: 0, small: 0, signature: 0 };
  const deps = {
    isCacheableForWrite: (..._a: unknown[]) => {
      calls.cacheable++;
      return true;
    },
    isSmallEnoughForSemanticCache: (..._a: unknown[]) => {
      calls.small++;
      return true;
    },
    generateSignature: (...a: unknown[]) => {
      calls.signature++;
      return `sig:${JSON.stringify(a)}`;
    },
    setCachedResponse: (sig: unknown, model: string, response: unknown, tokens: number) => {
      stored.push({ sig, model, response, tokens });
    },
    ...overrides,
  } as Parameters<typeof storeSemanticCacheResponse>[1];
  return { deps, stored, calls };
}

function baseArgs(overrides: Record<string, unknown> = {}) {
  return {
    enabled: true,
    body: { messages: [{ role: "user", content: "hi" }], temperature: 0, top_p: 1 },
    headers: undefined,
    translatedResponse: { id: "resp-1" },
    model: "gpt-x",
    apiKeyId: "key-1",
    usage: { prompt_tokens: 10, completion_tokens: 5 },
    log: undefined,
    ...overrides,
  } as Parameters<typeof storeSemanticCacheResponse>[0];
}

test("happy path → stores under a signature, tokensSaved = prompt + completion", () => {
  const { deps, stored } = makeDeps();
  storeSemanticCacheResponse(baseArgs(), deps);
  assert.equal(stored.length, 1);
  assert.equal(stored[0].model, "gpt-x");
  assert.deepEqual(stored[0].response, { id: "resp-1" });
  assert.equal(stored[0].tokens, 15);
});

test("disabled → no store, no gate calls past enabled", () => {
  const { deps, stored, calls } = makeDeps();
  storeSemanticCacheResponse(baseArgs({ enabled: false }), deps);
  assert.equal(stored.length, 0);
  assert.equal(calls.cacheable, 0);
});

test("not cacheable-for-write → no store", () => {
  const { deps, stored } = makeDeps({ isCacheableForWrite: () => false });
  storeSemanticCacheResponse(baseArgs(), deps);
  assert.equal(stored.length, 0);
});

test("too large → no store", () => {
  const { deps, stored } = makeDeps({ isSmallEnoughForSemanticCache: () => false });
  storeSemanticCacheResponse(baseArgs(), deps);
  assert.equal(stored.length, 0);
});

test("signature uses messages when present, with model/temperature/top_p/apiKeyId", () => {
  const { deps, stored } = makeDeps();
  storeSemanticCacheResponse(baseArgs(), deps);
  const sig = stored[0].sig as string;
  assert.ok(sig.includes("gpt-x"));
  assert.ok(sig.includes("key-1"));
});

test("falls back to body.input when messages absent", () => {
  let captured: unknown[] = [];
  const { deps } = makeDeps({
    generateSignature: (...a: unknown[]) => {
      captured = a;
      return "sig";
    },
  });
  storeSemanticCacheResponse(
    baseArgs({ body: { input: "the-input", temperature: 0, top_p: 1 } }),
    deps
  );
  // args: (model, messages ?? input, temperature, top_p, apiKeyId)
  assert.equal(captured[1], "the-input");
});

test("missing usage → tokensSaved coerces to 0 (NaN || 0)", () => {
  const { deps, stored } = makeDeps();
  storeSemanticCacheResponse(baseArgs({ usage: undefined }), deps);
  assert.equal(stored[0].tokens, 0);
});
