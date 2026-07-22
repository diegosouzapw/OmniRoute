import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-embeddings-multimodal-"));

const { v1EmbeddingsSchema } = await import("../../src/shared/validation/schemas/apiV1.ts");
const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");

const vectorResponse = () =>
  new Response(
    JSON.stringify({
      data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
      usage: { prompt_tokens: 3, total_tokens: 3 },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );

test("embedding schema preserves legacy inputs and accepts bounded canonical multimodal items", () => {
  for (const input of ["hello", ["hello", "world"], [101, 102], [[101], [102]]]) {
    assert.equal(
      v1EmbeddingsSchema.safeParse({ model: "openai/text-embedding-3-small", input }).success,
      true
    );
  }

  const input = [
    { type: "text", text: "caption" },
    { type: "image", source: { type: "url", url: "https://example.com/image.png" } },
    {
      type: "audio",
      source: { type: "base64", data: "YXVkaW8=", media_type: "audio/wav" },
    },
    { type: "video", source: { type: "url", url: "https://example.com/video.mp4" } },
    {
      type: "document",
      source: { type: "base64", data: "cGRm", media_type: "application/pdf" },
    },
  ];
  const parsed = v1EmbeddingsSchema.safeParse({
    model: "jina-ai/jina-embeddings-v5-omni-small",
    input,
  });
  assert.equal(parsed.success, true);
  if (parsed.success) assert.deepEqual(parsed.data.input, input);
});

test("embedding schema bounds item count and decoded inline payload sizes", () => {
  const textItems = Array.from({ length: 33 }, (_, index) => ({ type: "text", text: `${index}` }));
  assert.equal(
    v1EmbeddingsSchema.safeParse({
      model: "jina-ai/jina-embeddings-v5-omni-small",
      input: textItems,
    }).success,
    false
  );

  const overEightMiB = Buffer.alloc(8 * 1024 * 1024 + 1).toString("base64");
  assert.equal(
    v1EmbeddingsSchema.safeParse({
      model: "jina-ai/jina-embeddings-v5-omni-small",
      input: [
        {
          type: "image",
          source: { type: "base64", data: overEightMiB, media_type: "image/png" },
        },
      ],
    }).success,
    false
  );

  const sixMiB = Buffer.alloc(6 * 1024 * 1024).toString("base64");
  assert.equal(
    v1EmbeddingsSchema.safeParse({
      model: "jina-ai/jina-embeddings-v5-omni-small",
      input: ["image", "audio", "document"].map((type) => ({
        type,
        source: { type: "base64", data: sixMiB, media_type: "application/octet-stream" },
      })),
    }).success,
    false
  );
});

test("embedding schema rejects unsafe remote media URLs", () => {
  for (const url of [
    "http://example.com/image.png",
    "file:///etc/passwd",
    "https://127.0.0.1/image.png",
    "https://169.254.169.254/latest/meta-data/",
    "https://metadata.google.internal/computeMetadata/v1/",
  ]) {
    const parsed = v1EmbeddingsSchema.safeParse({
      model: "jina-ai/jina-embeddings-v5-omni-small",
      input: [{ type: "image", source: { type: "url", url } }],
    });
    assert.equal(parsed.success, false, `expected URL to be rejected: ${url}`);
  }
});

test("translates canonical items to Jina's modality-keyed request contract", async () => {
  const { prepareStructuredEmbeddingRequest } =
    await import("../../open-sse/handlers/embeddingStructuredInput.ts");
  const provider = {
    id: "jina-ai",
    baseUrl: "https://api.jina.ai/v1/embeddings",
    authType: "apikey",
    authHeader: "bearer",
    structuredInputProtocol: "jina-v1" as const,
    models: [],
  };
  const input = [
    { type: "text" as const, text: "caption" },
    { type: "image" as const, source: { type: "url" as const, url: "https://example.com/i.png" } },
    {
      type: "audio" as const,
      source: { type: "base64" as const, data: "YQ==", media_type: "audio/wav" },
    },
    {
      type: "video" as const,
      source: { type: "base64" as const, data: "dg==", media_type: "video/mp4" },
    },
    {
      type: "document" as const,
      source: { type: "base64" as const, data: "cA==", media_type: "application/pdf" },
    },
  ];
  const prepared = await prepareStructuredEmbeddingRequest(
    provider,
    "jina-embeddings-v5-omni-small",
    { input, dimensions: 512, task: "retrieval.query" },
    "token",
    { fetchMedia: async () => ({ buffer: Buffer.from("img"), contentType: "image/png" }) }
  );
  assert.equal(prepared.url, "https://api.jina.ai/v1/embeddings");
  assert.deepEqual(prepared.body, {
    input: [
      { text: "caption" },
      { image: "data:image/png;base64,aW1n" },
      { audio: "data:audio/wav;base64,YQ==" },
      { video: "data:video/mp4;base64,dg==" },
      { pdf: "data:application/pdf;base64,cA==" },
    ],
    dimensions: 512,
    task: "retrieval.query",
    model: "jina-embeddings-v5-omni-small",
  });
});

test("translates one canonical array to Gemini native embedContent parts", async () => {
  const { prepareStructuredEmbeddingRequest } =
    await import("../../open-sse/handlers/embeddingStructuredInput.ts");
  const provider = {
    id: "gemini",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai/embeddings",
    authType: "apikey",
    authHeader: "bearer",
    structuredInputProtocol: "gemini-embed-content" as const,
    models: [],
  };
  const prepared = await prepareStructuredEmbeddingRequest(
    provider,
    "gemini-embedding-2",
    {
      input: [
        { type: "text", text: "caption" },
        { type: "image", source: { type: "base64", data: "aQ==", media_type: "image/png" } },
        { type: "audio", source: { type: "base64", data: "YQ==", media_type: "audio/mpeg" } },
        { type: "video", source: { type: "base64", data: "dg==", media_type: "video/mp4" } },
        {
          type: "document",
          source: { type: "base64", data: "cA==", media_type: "application/pdf" },
        },
      ],
      dimensions: 1536,
      task: "retrieval.query",
    },
    "gemini-key",
    {
      fetchMedia: async () => {
        throw new Error("unexpected URL");
      },
    }
  );
  assert.equal(
    prepared.url,
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent"
  );
  assert.deepEqual(prepared.authHeader, { name: "x-goog-api-key", value: "gemini-key" });
  assert.deepEqual(prepared.body, {
    content: {
      parts: [
        { text: "caption" },
        { inline_data: { mime_type: "image/png", data: "aQ==" } },
        { inline_data: { mime_type: "audio/mpeg", data: "YQ==" } },
        { inline_data: { mime_type: "video/mp4", data: "dg==" } },
        { inline_data: { mime_type: "application/pdf", data: "cA==" } },
      ],
    },
    output_dimensionality: 1536,
    task_type: "RETRIEVAL_QUERY",
  });
  assert.deepEqual(prepared.normalizeResponse?.({ embedding: { values: [0.1, 0.2] } }), {
    object: "list",
    data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
    usage: { prompt_tokens: 0, total_tokens: 0 },
  });
});

test("prepareStructuredEmbeddingRequest bounds aggregate fetched bytes across URL-sourced items and fetches them sequentially", async () => {
  // #7978 fix-in-place item 2: the documented "16 MiB decoded per request"
  // cap is enforced by the Zod schema only for base64-sourced items (see the
  // "bounds item count and decoded inline payload sizes" test above) — URL
  // items are excluded there. Each URL item is individually capped at 8 MiB
  // via fetchRemoteImage's maxBytes, but nothing previously stopped up to 32
  // of them from being fetched concurrently, pulling up to ~256 MiB into
  // memory at once. This proves the handler-level aggregate cap: URL items
  // are fetched one at a time, and no further fetch is started once the
  // running total already exhausts the 16 MiB budget.
  const { prepareStructuredEmbeddingRequest } =
    await import("../../open-sse/handlers/embeddingStructuredInput.ts");
  const provider = {
    id: "jina-ai",
    baseUrl: "https://api.jina.ai/v1/embeddings",
    authType: "apikey",
    authHeader: "bearer",
    structuredInputProtocol: "jina-v1" as const,
    models: [],
  };

  const EIGHT_MIB = 8 * 1024 * 1024; // exactly the per-item cap
  const items = Array.from({ length: 5 }, (_, index) => ({
    type: "image" as const,
    source: { type: "url" as const, url: `https://example.com/${index}.png` },
  }));

  let concurrentFetches = 0;
  let maxConcurrentFetches = 0;
  let fetchCount = 0;
  const fetchMedia = async () => {
    fetchCount += 1;
    concurrentFetches += 1;
    maxConcurrentFetches = Math.max(maxConcurrentFetches, concurrentFetches);
    // Yield so a broken (Promise.all-style concurrent) implementation would
    // visibly overlap fetches instead of running them one at a time.
    await new Promise((resolve) => setTimeout(resolve, 5));
    concurrentFetches -= 1;
    return { buffer: Buffer.alloc(EIGHT_MIB, 1), contentType: "image/png" };
  };

  await assert.rejects(
    () =>
      prepareStructuredEmbeddingRequest(
        provider,
        "jina-embeddings-v5-omni-small",
        { input: items },
        "token",
        { fetchMedia }
      ),
    /16 MiB per request/
  );

  assert.equal(maxConcurrentFetches, 1, "URL media fetches must be sequential, not concurrent");
  // Two 8 MiB items exactly exhaust the 16 MiB budget; a third must never be
  // fetched at all (fails fast on the running total, not after over-fetching).
  assert.equal(
    fetchCount,
    2,
    "no further URL fetch should start once the aggregate 16 MiB budget is already exhausted"
  );
});

test("handleEmbedding clearly rejects modalities not advertised by the resolved model", async () => {
  const originalFetch = globalThis.fetch;
  let fetched = false;
  globalThis.fetch = async () => {
    fetched = true;
    return vectorResponse();
  };

  try {
    const unsupported = await handleEmbedding({
      body: {
        model: "jina-ai/jina-clip-v2",
        input: [{ type: "audio", source: { type: "url", url: "https://example.com/audio.wav" } }],
      },
      credentials: { apiKey: "test-key" },
      log: null,
    });
    assert.equal(unsupported.success, false);
    assert.equal(unsupported.status, 400);
    assert.match(unsupported.error, /does not support.*audio/i);

    const unknown = await handleEmbedding({
      body: {
        model: "jina-ai/not-in-registry",
        input: [{ type: "text", text: "hello" }],
      },
      credentials: { apiKey: "test-key" },
      log: null,
    });
    assert.equal(unknown.success, false);
    assert.equal(unknown.status, 400);
    assert.match(unknown.error, /does not advertise structured embedding input/i);
    assert.equal(fetched, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
