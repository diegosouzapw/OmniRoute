import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-ollama-embedding-2824-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { getEmbeddingProvider, parseEmbeddingModel } =
  await import("../../open-sse/config/embeddingRegistry.ts");
const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");
const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");

test.after(() => {
  core.resetDbInstance();
  rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("ollama-local exposes a static no-auth embedding registry entry", () => {
  const provider = getEmbeddingProvider("ollama-local");

  assert.ok(provider);
  assert.equal(provider.baseUrl, "http://localhost:11434/v1/embeddings");
  assert.equal(provider.authType, "none");
  assert.equal(provider.authHeader, "none");
  assert.deepEqual(
    provider.models.map((model) => model.id),
    ["embeddinggemma", "nomic-embed-text", "bge-m3"]
  );
});

test("ollama-local model names parse with the provider prefix", () => {
  assert.deepEqual(parseEmbeddingModel("ollama-local/nomic-embed-text"), {
    provider: "ollama-local",
    model: "nomic-embed-text",
  });
});

test("ollama-local routes the default host without credentials", async () => {
  const originalFetch = globalThis.fetch;
  let captured: { url: string; body: Record<string, unknown> } | null = null;
  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      body: JSON.parse(String(options.body || "{}")) as Record<string, unknown>,
    };
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
      body: {
        model: "ollama-local/nomic-embed-text",
        input: "hello world",
        encoding_format: "float",
      },
      credentials: null,
      log: null,
    });

    assert.equal(result.success, true);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.ok(captured);
  assert.equal(captured.url, "http://localhost:11434/v1/embeddings");
  assert.deepEqual(captured.body, {
    model: "nomic-embed-text",
    input: "hello world",
    encoding_format: "float",
  });
});

test("ollama-local preserves a custom resolved host and strips trailing slashes", async () => {
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
      body: { model: "ollama-local/bge-m3", input: "hello" },
      resolvedProvider: {
        id: "ollama-local",
        baseUrl: "http://localhost:11434/v1/embeddings",
        authType: "none",
        authHeader: "none",
        models: [],
      },
      resolvedModel: "bge-m3",
      credentials: {
        providerSpecificData: { baseUrl: "http://192.168.1.100:11434///" },
      },
      log: null,
    });

    assert.equal(result.success, true);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(capturedUrl, "http://192.168.1.100:11434/v1/embeddings");
});

test("ollama-local strips a pathological run of trailing slashes without ReDoS (CodeQL js/polynomial-redos #9225)", async () => {
  // Regression for a polynomial-time regex (`/\/+$/`) that shipped in the
  // initial ollama-local port: a long run of trailing slashes followed by a
  // non-slash tail forces O(n^2) backtracking in a naive backtracking regex
  // engine. handleEmbedding now normalizes via the shared, guaranteed-O(n)
  // `stripTrailingSlashes` helper (open-sse/utils/urlSanitize.ts) instead.
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

  const adversarialBaseUrl = `http://192.168.1.100:11434${"/".repeat(50_000)}`;

  try {
    const start = performance.now();
    const result = await handleEmbedding({
      body: { model: "ollama-local/bge-m3", input: "hello" },
      resolvedProvider: {
        id: "ollama-local",
        baseUrl: "http://localhost:11434/v1/embeddings",
        authType: "none",
        authHeader: "none",
        models: [],
      },
      resolvedModel: "bge-m3",
      credentials: {
        providerSpecificData: { baseUrl: adversarialBaseUrl },
      },
      log: null,
    });
    const elapsed = performance.now() - start;

    assert.equal(result.success, true);
    // Generous bound — a vulnerable O(n^2) regex over 50k trailing slashes
    // takes seconds to minutes; a correct O(n) trim finishes in low ms.
    assert.ok(elapsed < 500, `took ${elapsed}ms — expected < 500ms (ReDoS regression)`);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(capturedUrl, "http://192.168.1.100:11434/v1/embeddings");
});

test("ollama-local service hydrates the configured connection host without requiring a key", async () => {
  await createProviderConnection({
    provider: "ollama-local",
    authType: "none",
    name: "LAN Ollama",
    isActive: true,
    providerSpecificData: { baseUrl: "http://10.10.0.181:11434/v1///" },
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
      model: "ollama-local/embeddinggemma",
      input: "hello",
    });
    assert.equal(response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.ok(captured);
  assert.equal(captured.url, "http://10.10.0.181:11434/v1/embeddings");
  assert.equal(captured.headers.Authorization, undefined);
});
