import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-embeddings-gemini-dim-"));

const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");

// Ported from upstream decolua/9router#1366 (author @nguyenha935).
// Gemini embedding models can return 3072 dimensions by default. OpenAI-compatible
// clients may request a smaller embedding (e.g. 1536 for pgvector schemas) via the
// `dimensions` field. The Gemini native API uses `outputDimensionality` instead;
// Google's OpenAI-compatibility shim does not document the `dimensions` translation,
// so OmniRoute must forward `outputDimensionality` alongside `dimensions` for Gemini
// embedding requests to guarantee the requested vector size lands at the model.

function captureFetch(captured: { body?: Record<string, unknown> }) {
  return async (_url: unknown, options: { headers?: unknown; body?: unknown } = {}) => {
    captured.body = JSON.parse(String(options.body || "{}"));
    return new Response(
      JSON.stringify({
        data: [{ object: "embedding", embedding: new Array(1536).fill(0.1), index: 0 }],
        usage: { prompt_tokens: 4, total_tokens: 4 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
}

test("handleEmbedding forwards Gemini dimensions as outputDimensionality (single input)", async () => {
  const originalFetch = globalThis.fetch;
  const captured: { body?: Record<string, unknown> } = {};
  globalThis.fetch = captureFetch(captured) as typeof fetch;

  try {
    const result = await handleEmbedding({
      body: {
        model: "gemini/text-embedding-004",
        input: "test",
        dimensions: 1536,
      },
      credentials: { apiKey: "gemini-key" },
      log: null,
    });

    assert.equal(result.success, true);
    // OpenAI-style `dimensions` must still be forwarded (back-compat).
    assert.equal(captured.body?.dimensions, 1536);
    // Gemini-native `outputDimensionality` must also be present so the upstream
    // returns the requested vector size regardless of the OpenAI-shim behavior.
    assert.equal(captured.body?.outputDimensionality, 1536);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleEmbedding forwards Gemini dimensions as outputDimensionality (batch input)", async () => {
  const originalFetch = globalThis.fetch;
  const captured: { body?: Record<string, unknown> } = {};
  globalThis.fetch = captureFetch(captured) as typeof fetch;

  try {
    const result = await handleEmbedding({
      body: {
        model: "gemini/text-embedding-004",
        input: ["hello", "world"],
        dimensions: 1536,
      },
      credentials: { apiKey: "gemini-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(captured.body?.dimensions, 1536);
    assert.equal(captured.body?.outputDimensionality, 1536);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleEmbedding does not inject outputDimensionality when dimensions is omitted (Gemini)", async () => {
  const originalFetch = globalThis.fetch;
  const captured: { body?: Record<string, unknown> } = {};
  globalThis.fetch = captureFetch(captured) as typeof fetch;

  try {
    const result = await handleEmbedding({
      body: {
        model: "gemini/text-embedding-004",
        input: "test",
      },
      credentials: { apiKey: "gemini-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(
      "outputDimensionality" in (captured.body || {}),
      false,
      "outputDimensionality must not be injected when the client did not request a specific size"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleEmbedding does not inject outputDimensionality for non-Gemini providers", async () => {
  const originalFetch = globalThis.fetch;
  const captured: { body?: Record<string, unknown> } = {};
  globalThis.fetch = captureFetch(captured) as typeof fetch;

  try {
    const result = await handleEmbedding({
      body: {
        model: "openai/text-embedding-3-small",
        input: "test",
        dimensions: 1536,
      },
      credentials: { apiKey: "openai-key" },
      log: null,
    });

    assert.equal(result.success, true);
    // OpenAI gets the standard `dimensions` field — not `outputDimensionality`.
    assert.equal(captured.body?.dimensions, 1536);
    assert.equal(
      "outputDimensionality" in (captured.body || {}),
      false,
      "outputDimensionality is Gemini-specific and must not leak into other providers"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleEmbedding ignores non-finite/non-positive dimensions for Gemini", async () => {
  const originalFetch = globalThis.fetch;
  const captured: { body?: Record<string, unknown> } = {};
  globalThis.fetch = captureFetch(captured) as typeof fetch;

  try {
    const result = await handleEmbedding({
      body: {
        model: "gemini/text-embedding-004",
        input: "test",
        dimensions: 0,
      },
      credentials: { apiKey: "gemini-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(
      "outputDimensionality" in (captured.body || {}),
      false,
      "0/NaN/negative dimensions must not map to outputDimensionality"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
