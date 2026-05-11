import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-embeddings-"));

const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");

test("handleEmbedding routes prefixed models and forwards optional fields", async () => {
  const originalFetch = globalThis.fetch;
  const calls = [];

  globalThis.fetch = async (url, options = {}) => {
    calls.push({
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    });

    return new Response(
      JSON.stringify({
        data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
        usage: { prompt_tokens: 3, total_tokens: 3 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleEmbedding({
      body: {
        model: "openai/text-embedding-3-large",
        input: "hello world",
        dimensions: 512,
        encoding_format: "float",
        user: "user-123",
      },
      credentials: { apiKey: "openai-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "https://api.openai.com/v1/embeddings");
    assert.equal(calls[0].headers.Authorization, "Bearer openai-key");
    assert.deepEqual(calls[0].body, {
      model: "text-embedding-3-large",
      input: "hello world",
      dimensions: 512,
      encoding_format: "float",
      user: "user-123",
    });
    assert.equal(result.data.model, "openai/text-embedding-3-large");
    assert.deepEqual(result.data.usage, { prompt_tokens: 3, total_tokens: 3 });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleEmbedding supports resolved local providers without auth and preserves array input", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };

    return new Response(
      JSON.stringify({
        data: [
          { object: "embedding", embedding: [1, 2], index: 0 },
          { object: "embedding", embedding: [3, 4], index: 1 },
        ],
        usage: { total_tokens: 10 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleEmbedding({
      body: {
        model: "localembed/my-model",
        input: ["alpha", "beta"],
      },
      credentials: null,
      resolvedProvider: {
        id: "localembed",
        baseUrl: "http://localhost:11434/embeddings",
        authType: "none",
        authHeader: "none",
        models: [],
      },
      resolvedModel: "my-model",
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(captured.url, "http://localhost:11434/embeddings");
    assert.equal(captured.headers.Authorization, undefined);
    assert.deepEqual(captured.body, {
      model: "my-model",
      input: ["alpha", "beta"],
    });
    assert.equal(result.data.usage.total_tokens, 10);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleEmbedding routes Upstage embedding models through the embedding endpoint", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
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
        model: "upstage/embedding-query",
        input: "Solar embeddings are useful",
      },
      credentials: { apiKey: "upstage-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(captured.url, "https://api.upstage.ai/v1/embeddings");
    assert.equal(captured.headers.Authorization, "Bearer upstage-key");
    assert.deepEqual(captured.body, {
      model: "embedding-query",
      input: "Solar embeddings are useful",
    });
    assert.equal(result.data.model, "upstage/embedding-query");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleEmbedding rejects invalid model strings without provider prefix", async () => {
  const result = await handleEmbedding({
    body: { model: "not-a-known-embedding-model", input: "hello" },
    credentials: { apiKey: "x" },
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /Invalid embedding model/);
});

test("handleEmbedding rejects unknown providers", async () => {
  const result = await handleEmbedding({
    body: { model: "mystery/model-1", input: "hello" },
    credentials: { apiKey: "x" },
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /Unknown embedding provider: mystery/);
});

test("handleEmbedding requires credentials for authenticated providers", async () => {
  const result = await handleEmbedding({
    body: { model: "openai/text-embedding-3-small", input: "hello" },
    credentials: null,
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.match(result.error, /No valid authentication token/);
});

test("handleEmbedding surfaces upstream failures", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response("provider unavailable", {
      status: 503,
      headers: { "content-type": "text/plain" },
    });

  try {
    const result = await handleEmbedding({
      body: { model: "mistral/mistral-embed", input: "hello" },
      credentials: { apiKey: "mistral-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 503);
    assert.equal(result.error, "provider unavailable");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
