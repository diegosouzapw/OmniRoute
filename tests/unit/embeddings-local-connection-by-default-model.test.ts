/**
 * Two connections of the same local embedding provider (here two llama-servers with
 * different loaded models) are not interchangeable: llama-server ignores the request's
 * `model` and embeds with whatever it loaded. Embedding requests must never be sent to a
 * connection whose configured default model names a different model — that silently
 * returns vectors from the wrong model (and dimension) into the caller's index.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-embed-local-by-model-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "embed-local-by-model-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function upstreamFor(model: string): Promise<string[]> {
  const originalFetch = globalThis.fetch;
  const urls: string[] = [];
  globalThis.fetch = async (url: string | URL | Request) => {
    urls.push(String(url));
    return new Response(
      JSON.stringify({
        object: "list",
        data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
        usage: { prompt_tokens: 2, total_tokens: 2 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
  try {
    for (let i = 0; i < 6; i++) {
      const res = await createEmbeddingResponse({ model, input: `hello ${i}` });
      assert.equal(res.status, 200, await res.clone().text());
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
  return [...new Set(urls)];
}

test("llama-cpp embeddings go to the connection whose default model matches", async () => {
  // Same priority on purpose: selection must not depend on ordering or rotation.
  await providersDb.createProviderConnection({
    provider: "llama-cpp",
    authType: "apikey",
    name: "qwen-cpu",
    isActive: true,
    priority: 1,
    providerSpecificData: { baseUrl: "http://qwen-cpu:5067/v1" },
  });
  await providersDb.createProviderConnection({
    provider: "llama-cpp",
    authType: "apikey",
    name: "embeddinggemma",
    isActive: true,
    priority: 1,
    defaultModel: "/models/embeddinggemma-2-F16.gguf",
    providerSpecificData: { baseUrl: "http://embeddinggemma:8080/v1" },
  });

  assert.deepEqual(await upstreamFor("llama-cpp//models/Qwen3-Embedding-0.6B-Q8_0.gguf"), [
    "http://qwen-cpu:5067/v1/embeddings",
  ]);
  assert.deepEqual(await upstreamFor("llama-cpp//models/embeddinggemma-2-F16.gguf"), [
    "http://embeddinggemma:8080/v1/embeddings",
  ]);
});
