import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolated DATA_DIR set BEFORE importing anything that touches the DB
// (handleChatCore -> checkSemanticCache -> getCachedResponse reads the semantic_cache SQLite table).
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sem-cache-callsite-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { generateSignature, setCachedResponse, clearCache } =
  await import("../../src/lib/semanticCache.ts");
const { OMNIROUTE_RESPONSE_HEADERS } = await import("../../src/shared/constants/headers.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

test("handleChatCore semantic cache HIT short-circuits with cache headers", async () => {
  clearCache();
  const model = "gpt-4o";
  const messages = [{ role: "user", content: "ping cache hit test" }];
  const temperature = 0;
  const signature = generateSignature(model, messages, temperature, undefined, undefined);
  const cachedPayload = {
    id: "chatcmpl-cached-t0",
    choices: [
      {
        index: 0,
        message: { role: "assistant", content: "pong cached" },
        finish_reason: "stop",
      },
    ],
    usage: { prompt_tokens: 8, completion_tokens: 4, total_tokens: 12 },
  };
  setCachedResponse(signature, model, cachedPayload);

  const originalFetch = globalThis.fetch;
  let fetchCalls = 0;
  globalThis.fetch = (async () => {
    fetchCalls += 1;
    throw new Error("upstream fetch must not run on semantic cache HIT");
  }) as typeof fetch;

  try {
    const result = await handleChatCore({
      body: { model, messages, temperature, stream: false },
      modelInfo: { provider: "openai", model, extendedContext: false },
      credentials: { apiKey: "sk-test", providerSpecificData: {} },
      log: noopLog(),
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        headers: new Headers({ accept: "application/json" }),
      },
      skipResourcePressureGuard: true,
    });
    assert.equal(result.success, true);
    assert.equal(fetchCalls, 0, "HIT must not call upstream");
    const res = (result as { response: Response }).response;
    assert.equal(res.headers.get(OMNIROUTE_RESPONSE_HEADERS.cache), "HIT");
    assert.equal(res.headers.get(OMNIROUTE_RESPONSE_HEADERS.cacheHit), "true");
    const json = await res.json();
    assert.equal(json.id, cachedPayload.id);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
