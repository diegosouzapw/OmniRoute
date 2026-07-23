import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-embeddings-nvidia-"));

const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");

// Issue #1378: NVIDIA NIM asymmetric embedding models (e.g. nvidia/nv-embedqa-e5-v5)
// require an `input_type` parameter ("query" | "passage"); without it the upstream
// returns 400 "'input_type' parameter is required". OmniRoute must inject the
// registered model-level default when the client omits input_type, and must respect
// a client-supplied input_type when present.

function captureFetch(captured: { body?: Record<string, unknown> }) {
  return async (url: unknown, options: { headers?: unknown; body?: unknown } = {}) => {
    captured.body = JSON.parse(String(options.body || "{}"));
    return new Response(
      JSON.stringify({
        data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
        usage: { prompt_tokens: 4, total_tokens: 4 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
}

test("handleEmbedding injects NVIDIA asymmetric default input_type when client omits it", async () => {
  const originalFetch = globalThis.fetch;
  const captured: { body?: Record<string, unknown> } = {};
  globalThis.fetch = captureFetch(captured) as typeof fetch;

  try {
    const result = await handleEmbedding({
      body: {
        model: "nvidia/nvidia/nv-embedqa-e5-v5",
        input: "What is the capital of France?",
      },
      credentials: { apiKey: "nvidia-key" },
      log: null,
    });

    assert.equal(result.success, true);
    // The model-level default input_type must be forwarded to the upstream body.
    assert.equal(
      captured.body?.input_type,
      "query",
      "expected NVIDIA asymmetric model default input_type to be injected"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleEmbedding respects a client-supplied input_type (does not overwrite)", async () => {
  const originalFetch = globalThis.fetch;
  const captured: { body?: Record<string, unknown> } = {};
  globalThis.fetch = captureFetch(captured) as typeof fetch;

  try {
    const result = await handleEmbedding({
      body: {
        model: "nvidia/nvidia/nv-embedqa-e5-v5",
        input: "Paris is the capital of France.",
        input_type: "passage",
      },
      credentials: { apiKey: "nvidia-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(
      captured.body?.input_type,
      "passage",
      "expected client-supplied input_type to be respected, not overwritten by the default"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleEmbedding does not inject input_type for symmetric models without a default", async () => {
  const originalFetch = globalThis.fetch;
  const captured: { body?: Record<string, unknown> } = {};
  globalThis.fetch = captureFetch(captured) as typeof fetch;

  try {
    const result = await handleEmbedding({
      body: {
        model: "openai/text-embedding-3-small",
        input: "hello world",
      },
      credentials: { apiKey: "openai-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(
      "input_type" in (captured.body || {}),
      false,
      "symmetric models without a default must not receive an injected input_type"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
