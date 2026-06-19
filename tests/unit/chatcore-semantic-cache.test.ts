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
