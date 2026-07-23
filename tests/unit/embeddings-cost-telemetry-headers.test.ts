import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolate the DB to a temp dir BEFORE importing any module that opens it.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-embed-telemetry-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");
const { OMNIROUTE_RESPONSE_HEADERS } = await import("../../src/shared/constants/headers.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("createEmbeddingResponse emits X-OmniRoute-* cost telemetry headers on success", async () => {
  // Seed a credentialed apikey connection so getProviderCredentials resolves and
  // the success path runs (no real upstream is hit — fetch is mocked below).
  await providersDb.createProviderConnection({
    provider: "mistral",
    authType: "apikey",
    name: "Test Mistral",
    apiKey: "mistral-test-key",
  });

  const PROMPT_TOKENS = 7;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
        usage: { prompt_tokens: PROMPT_TOKENS, total_tokens: PROMPT_TOKENS },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  try {
    const res = await createEmbeddingResponse({
      model: "mistral/mistral-embed",
      input: "hello world",
    });

    assert.equal(res.status, 200, "embedding success path should return 200");

    const cost = res.headers.get(OMNIROUTE_RESPONSE_HEADERS.responseCost);
    assert.ok(cost, "X-OmniRoute-Response-Cost header must be present");
    assert.match(
      cost,
      /^\d+\.\d{10}$/,
      `X-OmniRoute-Response-Cost must be a 10-decimal cost string, got "${cost}"`
    );

    assert.equal(
      res.headers.get(OMNIROUTE_RESPONSE_HEADERS.tokensIn),
      String(PROMPT_TOKENS),
      "X-OmniRoute-Tokens-In must equal the upstream prompt_tokens"
    );

    const version = res.headers.get(OMNIROUTE_RESPONSE_HEADERS.version);
    assert.ok(
      version && version.length > 0,
      "X-OmniRoute-Version header must be present and non-empty"
    );

    // Sanity: the body is still the embeddings payload, unchanged.
    const body = await res.json();
    assert.deepEqual(body.usage, { prompt_tokens: PROMPT_TOKENS, total_tokens: PROMPT_TOKENS });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
