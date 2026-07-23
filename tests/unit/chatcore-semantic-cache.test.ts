import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolated DATA_DIR set BEFORE importing anything that touches the DB
// (checkSemanticCache -> getCachedResponse reads the semantic_cache SQLite table).
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sem-cache-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { checkSemanticCache } = await import("../../open-sse/handlers/chatCore/semanticCache.ts");
const core = await import("../../src/lib/db/core.ts");
// Seeding the real cache (no mock.module under the Stryker tap-runner) lets us drive the
// HIT branch deterministically: setCachedResponse populates the in-memory cache that
// getCachedResponse checks first, so the signature checkSemanticCache rebuilds resolves.
const { generateSignature, setCachedResponse, clearCache } = await import(
  "../../src/lib/semanticCache.ts"
);
const { OMNIROUTE_RESPONSE_HEADERS } = await import("../../src/shared/constants/headers.ts");
const { calculateCost } = await import("../../src/lib/usage/costCalculator.ts");
const { formatOmniRouteCost } = await import("../../src/domain/omnirouteResponseMeta.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// A reusable persistAttemptLogs spy + base args. The functions below should NEVER be
// invoked on the guard-false / cache-miss paths (those only run on a HIT).
function makeBaseArgs(overrides: Record<string, unknown> = {}) {
  const persistCalls: unknown[] = [];
  const args = {
    semanticCacheEnabled: false,
    body: { model: "gpt-4o", messages: [{ role: "user", content: "hi" }], temperature: 0 },
    clientRawRequest: { headers: {} },
    model: "gpt-4o",
    provider: "openai",
    stream: false,
    reqLogger: {
      logConvertedResponse: () => {
        throw new Error("logConvertedResponse should not run on guard-false / miss paths");
      },
    },
    effectiveServiceTier: undefined,
    connectionId: null as string | null,
    startTime: Date.now(),
    log: {
      debug: () => {
        throw new Error("log.debug should only fire on a cache HIT");
      },
    },
    persistAttemptLogs: (a: unknown) => {
      persistCalls.push(a);
    },
    apiKeyId: null as string | null,
    ...overrides,
  };
  return { args, persistCalls };
}

// ─── checkSemanticCache ──────────────────────────────────────────────────────

test("checkSemanticCache returns null when semanticCacheEnabled is false (outer guard short-circuit)", async () => {
  const { args, persistCalls } = makeBaseArgs({ semanticCacheEnabled: false });

  const result = await checkSemanticCache(args as Parameters<typeof checkSemanticCache>[0]);

  assert.equal(result, null, "disabled cache -> no-op null result");
  assert.equal(persistCalls.length, 0, "no logging side effects when the guard is false");
});

test("checkSemanticCache returns null when enabled but the body is NOT cacheable (temperature != 0)", async () => {
  // isCacheableForRead requires temperature === 0. A non-zero temperature makes the guard
  // false even with semanticCacheEnabled=true, so it short-circuits to the null no-op.
  const { args, persistCalls } = makeBaseArgs({
    semanticCacheEnabled: true,
    body: { model: "gpt-4o", messages: [{ role: "user", content: "hi" }], temperature: 0.7 },
  });

  const result = await checkSemanticCache(args as Parameters<typeof checkSemanticCache>[0]);

  assert.equal(result, null, "non-cacheable body -> guard false -> null");
  assert.equal(persistCalls.length, 0);
});

test("checkSemanticCache returns null when the x-omniroute-no-cache header forces a bypass", async () => {
  // The no-cache header makes isCacheableForRead return false even with temperature:0.
  const { args } = makeBaseArgs({
    semanticCacheEnabled: true,
    body: { model: "gpt-4o", messages: [{ role: "user", content: "hi" }], temperature: 0 },
    clientRawRequest: { headers: { "x-omniroute-no-cache": "true" } },
  });

  const result = await checkSemanticCache(args as Parameters<typeof checkSemanticCache>[0]);

  assert.equal(result, null, "explicit no-cache header bypasses the cache read");
});

test("checkSemanticCache returns null on a cache MISS (enabled + cacheable body + empty cache)", async () => {
  // semanticCacheEnabled=true AND temperature:0 (cacheable) -> enters the guard -> builds a
  // signature -> getCachedResponse() finds nothing in the empty (fresh DATA_DIR) cache ->
  // the `if (cached)` block is skipped -> the function falls through to `return null`.
  const { args, persistCalls } = makeBaseArgs({
    semanticCacheEnabled: true,
    body: {
      model: "gpt-4o",
      messages: [{ role: "user", content: "a unique miss query " + Date.now() }],
      temperature: 0,
    },
  });

  const result = await checkSemanticCache(args as Parameters<typeof checkSemanticCache>[0]);

  assert.equal(result, null, "empty cache -> MISS -> null (no HIT-path side effects)");
  assert.equal(persistCalls.length, 0, "persistAttemptLogs only runs on a HIT");
});

test("checkSemanticCache MISS also works for the Responses-API `input` body shape", async () => {
  // generateSignature falls back to body.input when body.messages is absent; the empty cache
  // still yields a MISS, so the result is null.
  const { args, persistCalls } = makeBaseArgs({
    semanticCacheEnabled: true,
    body: {
      model: "gpt-4o",
      input: [{ role: "user", content: "responses api miss " + Date.now() }],
      temperature: 0,
    },
    stream: true,
  });

  const result = await checkSemanticCache(args as Parameters<typeof checkSemanticCache>[0]);

  assert.equal(result, null);
  assert.equal(persistCalls.length, 0);
});

// ─── HIT path ────────────────────────────────────────────────────────────────
// The guard-false / miss tests above only exercise the `return null` branches. These
// seed the real cache so the `if (cached)` block actually runs end-to-end, killing
// mutants in the HIT body (status 200 / "semantic" / "HIT" / the stream + content-type
// ternaries / the cost fallback / the side-effect calls).

// Recording (non-throwing) spies — the HIT path DOES invoke log.debug + logConvertedResponse.
function makeHitArgs(overrides: Record<string, unknown> = {}) {
  const persistCalls: Record<string, unknown>[] = [];
  const convertedCalls: unknown[] = [];
  const debugCalls: unknown[][] = [];
  const args = {
    semanticCacheEnabled: true,
    body: { model: "gpt-4o", messages: [{ role: "user", content: "cached query" }], temperature: 0 },
    clientRawRequest: { headers: {} },
    model: "gpt-4o",
    provider: "openai",
    stream: false,
    reqLogger: {
      logConvertedResponse: (r: unknown) => {
        convertedCalls.push(r);
      },
    },
    effectiveServiceTier: undefined,
    connectionId: null as string | null,
    startTime: Date.now() - 5,
    log: {
      debug: (...a: unknown[]) => {
        debugCalls.push(a);
      },
    },
    persistAttemptLogs: (a: unknown) => {
      persistCalls.push(a as Record<string, unknown>);
    },
    apiKeyId: null as string | null,
    ...overrides,
  };
  return { args, persistCalls, convertedCalls, debugCalls };
}

// Seed the cache under the EXACT signature checkSemanticCache rebuilds for `args`.
function seedHit(args: ReturnType<typeof makeHitArgs>["args"], response: unknown) {
  const signature = generateSignature(
    args.model,
    args.body.messages ?? (args.body as Record<string, unknown>).input,
    args.body.temperature,
    (args.body as Record<string, unknown>).top_p,
    args.apiKeyId ?? undefined
  );
  setCachedResponse(signature, args.model, response);
  return signature;
}

test("checkSemanticCache returns a non-streaming JSON HIT with cache headers + logging side effects", async () => {
  clearCache();
  const cached = {
    id: "chatcmpl-cached-1",
    choices: [
      { index: 0, message: { role: "assistant", content: "cached answer" }, finish_reason: "stop" },
    ],
    usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
  };
  const { args, persistCalls, convertedCalls, debugCalls } = makeHitArgs({
    body: { model: "gpt-4o", messages: [{ role: "user", content: "hit query one" }], temperature: 0 },
    stream: false,
  });
  seedHit(args, cached);

  const result = await checkSemanticCache(args as Parameters<typeof checkSemanticCache>[0]);

  assert.ok(result, "HIT -> non-null result");
  assert.equal(result.success, true, "HIT result.success is true");
  const res = result.response as Response;
  assert.equal(res.headers.get(OMNIROUTE_RESPONSE_HEADERS.cache), "HIT", "X-OmniRoute-Cache: HIT");
  assert.equal(
    res.headers.get(OMNIROUTE_RESPONSE_HEADERS.cacheHit),
    "true",
    "cacheHit meta header is true"
  );
  assert.equal(
    res.headers.get("Content-Type"),
    "application/json",
    "non-streaming HIT -> application/json"
  );
  const bodyText = await res.text();
  assert.equal(bodyText, JSON.stringify(cached), "non-streaming HIT body is the cached JSON");

  assert.equal(persistCalls.length, 1, "persistAttemptLogs runs exactly once on a HIT");
  const logged = persistCalls[0];
  assert.equal(logged.status, 200, "persisted status is 200");
  assert.equal(logged.cacheSource, "semantic", "persisted cacheSource is 'semantic'");
  assert.deepEqual(logged.responseBody, cached, "persisted responseBody is the cached object");
  assert.deepEqual(logged.clientResponse, cached, "persisted clientResponse is the cached object");
  assert.deepEqual(logged.tokens, cached.usage, "persisted tokens come from cached.usage");
  assert.equal(logged.providerRequest, null);
  assert.equal(logged.providerResponse, null);

  assert.equal(convertedCalls.length, 1, "logConvertedResponse called once with the cached body");
  assert.deepEqual(convertedCalls[0], cached);
  assert.equal(debugCalls.length, 1, "log.debug fires exactly once on a HIT");
});

test("checkSemanticCache returns a streaming SSE HIT (text/event-stream) when stream=true", async () => {
  clearCache();
  const cached = {
    id: "chatcmpl-cached-stream",
    choices: [
      {
        index: 0,
        message: { role: "assistant", content: "streamed cached answer" },
        finish_reason: "stop",
      },
    ],
    usage: { prompt_tokens: 3, completion_tokens: 4, total_tokens: 7 },
  };
  const { args, persistCalls } = makeHitArgs({
    body: { model: "gpt-4o", messages: [{ role: "user", content: "hit query stream" }], temperature: 0 },
    stream: true,
  });
  seedHit(args, cached);

  const result = await checkSemanticCache(args as Parameters<typeof checkSemanticCache>[0]);

  assert.ok(result, "streaming HIT -> non-null result");
  assert.equal(result.success, true);
  const res = result.response as Response;
  assert.equal(
    res.headers.get("Content-Type"),
    "text/event-stream",
    "streaming HIT -> text/event-stream"
  );
  assert.equal(res.headers.get(OMNIROUTE_RESPONSE_HEADERS.cache), "HIT");
  const bodyText = await res.text();
  assert.ok(bodyText.includes("data: "), "SSE body contains data frames");
  assert.ok(bodyText.includes("streamed cached answer"), "SSE body carries the cached content");
  assert.ok(bodyText.trimEnd().endsWith("data: [DONE]"), "SSE body terminates with [DONE]");
  assert.equal(persistCalls.length, 1, "persistAttemptLogs runs once on a streaming HIT too");
});

test("checkSemanticCache HITs even when the cached body has no usage (cost falls back to 0)", async () => {
  clearCache();
  const cached = {
    id: "chatcmpl-cached-no-usage",
    choices: [
      { index: 0, message: { role: "assistant", content: "no-usage answer" }, finish_reason: "stop" },
    ],
  };
  const { args, persistCalls } = makeHitArgs({
    body: {
      model: "gpt-4o",
      messages: [{ role: "user", content: "hit query no usage" }],
      temperature: 0,
    },
    stream: false,
  });
  seedHit(args, cached);

  const result = await checkSemanticCache(args as Parameters<typeof checkSemanticCache>[0]);

  assert.ok(result, "HIT with no usage -> non-null result");
  assert.equal(result.success, true);
  const res = result.response as Response;
  assert.equal(res.headers.get(OMNIROUTE_RESPONSE_HEADERS.cache), "HIT");
  // cachedUsage resolves to undefined -> cachedCost = 0 -> the zero-cost sentinel header.
  assert.equal(
    res.headers.get(OMNIROUTE_RESPONSE_HEADERS.responseCost),
    "0.0000000000",
    "no usage -> zero responseCost header"
  );
  assert.equal(persistCalls.length, 1);
  assert.equal(persistCalls[0].tokens, undefined, "no usage -> persisted tokens is undefined");
});

// ─── Cache-HIT cost reporting (PRD-2026-06-19-cache-hit-cost-reporting) ───────
// A HIT does NOT call upstream, so the INCREMENTAL cost of serving it is ≈0. The
// X-OmniRoute-Response-Cost must therefore be 0 (so billing consumers don't charge
// for cache hits), while the original cost is surfaced via X-OmniRoute-Cost-Saved.

test("checkSemanticCache HIT bills 0 incremental cost and reports the original cost in X-OmniRoute-Cost-Saved", async () => {
  clearCache();
  const usage = { prompt_tokens: 1000, completion_tokens: 1000, total_tokens: 2000 };
  const cached = {
    id: "chatcmpl-cached-cost-saved",
    choices: [
      { index: 0, message: { role: "assistant", content: "cached answer" }, finish_reason: "stop" },
    ],
    usage,
  };
  const { args } = makeHitArgs({
    body: {
      model: "gpt-4o",
      messages: [{ role: "user", content: "hit query cost-saved" }],
      temperature: 0,
    },
    stream: false,
  });
  seedHit(args, cached);

  // The original (would-have-been) cost — computed with the SAME calculator the handler
  // uses, against the same fresh DATA_DIR, so the values match deterministically.
  const expectedSaved = formatOmniRouteCost(
    await calculateCost(args.provider, args.model, usage as Record<string, number>)
  );
  assert.notEqual(
    expectedSaved,
    "0.0000000000",
    "sanity: gpt-4o must be priced for this regression to be meaningful"
  );

  const result = await checkSemanticCache(args as Parameters<typeof checkSemanticCache>[0]);
  assert.ok(result, "HIT -> non-null result");
  const res = result.response as Response;

  assert.equal(res.headers.get(OMNIROUTE_RESPONSE_HEADERS.cache), "HIT");
  // Incremental cost billed to the client on a HIT is 0 (no upstream call happened).
  assert.equal(
    res.headers.get(OMNIROUTE_RESPONSE_HEADERS.responseCost),
    "0.0000000000",
    "cache HIT must bill 0 incremental cost"
  );
  // The avoided cost is surfaced for cache analytics.
  assert.equal(
    res.headers.get(OMNIROUTE_RESPONSE_HEADERS.costSaved),
    expectedSaved,
    "X-OmniRoute-Cost-Saved reflects the original cost the cache avoided"
  );
});

test("checkSemanticCache isolates HITs per apiKeyId (no cross-key cache sharing) [#3740 edge]", async () => {
  clearCache();
  const cached = {
    id: "chatcmpl-cached-isolation",
    choices: [
      { index: 0, message: { role: "assistant", content: "key A answer" }, finish_reason: "stop" },
    ],
    usage: { prompt_tokens: 5, completion_tokens: 5, total_tokens: 10 },
  };
  const sharedBody = () => ({
    model: "gpt-4o",
    messages: [{ role: "user", content: "isolation probe" }],
    temperature: 0,
  });

  // Seed the cache under apiKeyId "keyA".
  const { args: argsA } = makeHitArgs({ body: sharedBody(), apiKeyId: "keyA" });
  seedHit(argsA, cached);

  // A different key with an IDENTICAL body must NOT see keyA's entry (namespaced signature).
  const { args: argsB } = makeHitArgs({ body: sharedBody(), apiKeyId: "keyB" });
  const missB = await checkSemanticCache(argsB as Parameters<typeof checkSemanticCache>[0]);
  assert.equal(missB, null, "keyB must NOT resolve keyA's cached entry (per-key isolation)");

  // keyA itself still gets a HIT.
  const { args: argsA2 } = makeHitArgs({ body: sharedBody(), apiKeyId: "keyA" });
  const hitA = await checkSemanticCache(argsA2 as Parameters<typeof checkSemanticCache>[0]);
  assert.ok(hitA, "keyA must resolve its own cached entry");
});
