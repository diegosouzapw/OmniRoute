import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Naver CLOVA Studio embedding v2.
//
// The endpoint embeds exactly ONE text per request (`{"text": …}` → one vector)
// and answers `{status, result:{embedding:[…1024 floats], inputTokens}}`, so a
// batched `/v1/embeddings` call has to be fanned out into N upstream calls and
// merged back into OpenAI's list shape.
//
// Live-verified against the API on 2026-09-01: 1024 dimensions, ~100ms per call,
// and an empty string is rejected with `40004 Text empty`.

const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-clova-embeddings-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.SQLITE_FILE = join(TEST_DATA_DIR, "storage.sqlite");

const registry = await import("../../open-sse/config/embeddingRegistry.ts");
const { normalizeClovaEmbeddingV2Response } =
  await import("../../open-sse/handlers/embeddingStructuredInput.ts");
const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(async () => {
  // handleEmbedding records call logs asynchronously; let those writes settle
  // before closing the singleton so a late write cannot reopen the test DB.
  await new Promise((resolve) => setTimeout(resolve, 50));
  resetDbInstance();
});

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

test("clova embedding v2 is registered with the single-text protocol", () => {
  const provider = registry.getEmbeddingProvider("clova-studio");
  assert.ok(provider, "clova-studio must be an embedding provider");
  assert.equal(provider.baseUrl, "https://clovastudio.stream.ntruss.com/v1/api-tools/embedding/v2");
  assert.equal(provider.singleTextProtocol, "clova-v2");
  assert.equal(provider.authType, "apikey");
  assert.equal(provider.authHeader, "bearer");
  assert.deepEqual(provider.models, [
    { id: "clova-embedding-v2", name: "CLOVA Embedding v2", dimensions: 1024 },
  ]);
});

test("clova embedding v2 resolves its model and dimension", () => {
  assert.deepEqual(registry.parseEmbeddingModel("clova-studio/clova-embedding-v2"), {
    provider: "clova-studio",
    model: "clova-embedding-v2",
  });
  assert.equal(registry.getEmbeddingDimension("clova-studio/clova-embedding-v2"), 1024);
});

// ---------------------------------------------------------------------------
// Response normalisation
// ---------------------------------------------------------------------------

test("a success envelope is normalised into OpenAI list shape", () => {
  const normalized = normalizeClovaEmbeddingV2Response({
    status: { code: "20000", message: "OK" },
    result: { embedding: [0.1, -0.2, 0.3], inputTokens: 4 },
  });
  assert.deepEqual(normalized, {
    data: [{ object: "embedding", index: 0, embedding: [0.1, -0.2, 0.3] }],
    usage: { prompt_tokens: 4, total_tokens: 4 },
  });
});

test("a failure envelope is rejected instead of becoming an empty success", () => {
  assert.throws(
    () =>
      normalizeClovaEmbeddingV2Response({
        status: { code: "40004", message: "Text empty" },
      }),
    /unsuccessful status/
  );
});

test("a payload without an embedding vector is rejected", () => {
  assert.throws(
    () =>
      normalizeClovaEmbeddingV2Response({
        status: { code: "20000" },
        result: { inputTokens: 0 },
      }),
    /missing an embedding vector/
  );
});

// ---------------------------------------------------------------------------
// Batch fan-out through the real handler
// ---------------------------------------------------------------------------

const originalFetch = globalThis.fetch;

function mockClova(calls: Array<Record<string, unknown>>): void {
  globalThis.fetch = (async (_url: string, init: RequestInit) => {
    calls.push(JSON.parse(String(init.body)));
    const text = String((calls[calls.length - 1] as { text?: string }).text ?? "");
    return new Response(
      JSON.stringify({
        status: { code: "20000", message: "OK" },
        result: { embedding: [text.length, 1, 2], inputTokens: text.length },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;
}

function mockClovaEnvelope(
  calls: Array<Record<string, unknown>>,
  envelope: Record<string, unknown>
): void {
  globalThis.fetch = (async (_url: string, init: RequestInit) => {
    calls.push(JSON.parse(String(init.body)));
    return new Response(JSON.stringify(envelope), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
}

test("a batched input is fanned out into one upstream call per text", async () => {
  const calls: Array<Record<string, unknown>> = [];
  mockClova(calls);
  try {
    const result = await handleEmbedding({
      body: { model: "clova-studio/clova-embedding-v2", input: ["alpha", "beta", "gamma"] },
      credentials: { apiKey: "test-key" },
    });

    assert.equal(result.success, true, JSON.stringify(result));
    // One request per text — the endpoint cannot batch.
    assert.deepEqual(
      calls.map((c) => c.text),
      ["alpha", "beta", "gamma"]
    );

    const data = (result as { data: Record<string, unknown> }).data;
    assert.equal(data.object, "list");
    assert.equal(data.model, "clova-studio/clova-embedding-v2");
    assert.equal((data.data as unknown[]).length, 3);
    // Indexes must reflect the caller's positions, not each upstream call's 0.
    assert.deepEqual(
      (data.data as Array<{ index: number }>).map((d) => d.index),
      [0, 1, 2]
    );
    // Token usage is summed across the fan-out.
    assert.equal((data.usage as { prompt_tokens: number }).prompt_tokens, 5 + 4 + 5);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("an empty text rejects the batch without changing response indexes", async () => {
  const calls: Array<Record<string, unknown>> = [];
  mockClova(calls);
  try {
    const result = await handleEmbedding({
      body: { model: "clova-studio/clova-embedding-v2", input: ["", "  ", "real"] },
      credentials: { apiKey: "test-key" },
    });
    assert.equal(result.success, false);
    assert.equal((result as { status: number }).status, 400);
    assert.equal(calls.length, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("an all-empty input fails without calling upstream", async () => {
  const calls: Array<Record<string, unknown>> = [];
  mockClova(calls);
  try {
    const result = await handleEmbedding({
      body: { model: "clova-studio/clova-embedding-v2", input: ["", ""] },
      credentials: { apiKey: "test-key" },
    });
    assert.equal(result.success, false);
    assert.equal((result as { status: number }).status, 400);
    assert.equal(calls.length, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("a single string input takes the fan-out path too", async () => {
  const calls: Array<Record<string, unknown>> = [];
  mockClova(calls);
  try {
    const result = await handleEmbedding({
      body: { model: "clova-studio/clova-embedding-v2", input: "solo" },
      credentials: { apiKey: "test-key" },
    });
    assert.equal(result.success, true, JSON.stringify(result));
    assert.deepEqual(
      calls.map((c) => c.text),
      ["solo"]
    );
    assert.equal(((result as { data: Record<string, unknown> }).data.data as unknown[]).length, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("an HTTP-200 CLOVA error envelope becomes a provider failure", async () => {
  const calls: Array<Record<string, unknown>> = [];
  mockClovaEnvelope(calls, { status: { code: "40004", message: "Text empty" } });
  try {
    const result = await handleEmbedding({
      body: { model: "clova-studio/clova-embedding-v2", input: "text" },
      credentials: { apiKey: "test-key" },
    });
    assert.equal(result.success, false);
    assert.equal((result as { status: number }).status, 502);
    assert.equal(calls.length, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("token-array input is rejected instead of being silently dropped", async () => {
  const calls: Array<Record<string, unknown>> = [];
  mockClova(calls);
  try {
    const result = await handleEmbedding({
      body: { model: "clova-studio/clova-embedding-v2", input: [101, 202] },
      credentials: { apiKey: "test-key" },
    });
    assert.equal(result.success, false);
    assert.equal((result as { status: number }).status, 400);
    assert.equal(calls.length, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("unsupported output options are rejected instead of ignored", async () => {
  for (const extra of [{ encoding_format: "base64" }, { dimensions: 1536 }]) {
    const calls: Array<Record<string, unknown>> = [];
    mockClova(calls);
    try {
      const result = await handleEmbedding({
        body: { model: "clova-studio/clova-embedding-v2", input: "text", ...extra },
        credentials: { apiKey: "test-key" },
      });
      assert.equal(result.success, false);
      assert.equal((result as { status: number }).status, 400);
      assert.equal(calls.length, 0);
    } finally {
      globalThis.fetch = originalFetch;
    }
  }
});
