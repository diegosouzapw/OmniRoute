import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-lmstudio-embedding-11233-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { parseEmbeddingModel } = await import("../../open-sse/config/embeddingRegistry.ts");
const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");
const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");

test.after(() => {
  core.resetDbInstance();
  rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// Issue #11233: the dashboard stores LM Studio connections under the provider
// id "lm-studio" (hyphenated), but the embedding registry keys the provider as
// "lmstudio" with no alias. Two symptoms resulted:
//   1. "lm-studio/<model>" embedding requests failed with 400 unknown provider.
//   2. "lmstudio/<model>" requests always hit the hardcoded localhost:1234
//      endpoint, ignoring the baseUrl of the configured connection.
// The fix mirrors the ollama-local pattern from #2824/#9225: an embedding
// provider alias plus optional (non-auth) connection hydration and the same
// baseUrl normalization in the handler.

test("lm-studio model strings resolve to the lmstudio embedding provider", () => {
  assert.deepEqual(parseEmbeddingModel("lm-studio/nomic-embed-text"), {
    provider: "lmstudio",
    model: "nomic-embed-text",
  });
});

test("lmstudio routes to the configured connection baseUrl", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl: string | null = null;
  globalThis.fetch = async (url) => {
    capturedUrl = String(url);
    return new Response(
      JSON.stringify({
        data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
        usage: { prompt_tokens: 2, total_tokens: 2 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleEmbedding({
      body: { model: "lmstudio/nomic-embed-text", input: "hello" },
      resolvedProvider: {
        id: "lmstudio",
        baseUrl: "http://localhost:1234/v1/embeddings",
        authType: "none",
        authHeader: "none",
        models: [],
      },
      resolvedModel: "nomic-embed-text",
      credentials: {
        providerSpecificData: { baseUrl: "http://192.168.1.50:1234/v1" },
      },
      log: null,
    });

    assert.equal(result.success, true);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(capturedUrl, "http://192.168.1.50:1234/v1/embeddings");
});

test("lmstudio keeps the static localhost default without credentials", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl: string | null = null;
  globalThis.fetch = async (url) => {
    capturedUrl = String(url);
    return new Response(
      JSON.stringify({
        data: [{ object: "embedding", embedding: [0.3, 0.4], index: 0 }],
        usage: { prompt_tokens: 2, total_tokens: 2 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleEmbedding({
      body: { model: "lmstudio/nomic-embed-text", input: "hello" },
      credentials: null,
      log: null,
    });

    assert.equal(result.success, true);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(capturedUrl, "http://localhost:1234/v1/embeddings");
});

test("lmstudio service hydrates the lm-studio connection host without requiring a key", async () => {
  await createProviderConnection({
    provider: "lm-studio",
    authType: "none",
    name: "LAN LM Studio",
    isActive: true,
    providerSpecificData: { baseUrl: "http://10.20.0.60:1234/v1/" },
  });

  const originalFetch = globalThis.fetch;
  let captured: { url: string; headers: Record<string, string> } | null = null;
  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: (options.headers as Record<string, string>) || {},
    };
    return new Response(
      JSON.stringify({
        data: [{ object: "embedding", embedding: [0.5, 0.6], index: 0 }],
        usage: { prompt_tokens: 2, total_tokens: 2 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const response = await createEmbeddingResponse({
      model: "lm-studio/nomic-embed-text",
      input: "hello",
    });
    assert.equal(response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.ok(captured);
  assert.equal(captured.url, "http://10.20.0.60:1234/v1/embeddings");
  assert.equal(captured.headers.Authorization, undefined);
});
