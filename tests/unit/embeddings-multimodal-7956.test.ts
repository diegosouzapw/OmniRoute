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

test("handleEmbedding forwards canonical multimodal items and extension fields losslessly", async () => {
  const originalFetch = globalThis.fetch;
  const calls: Array<Record<string, unknown>> = [];
  globalThis.fetch = async (_url, options = {}) => {
    calls.push(JSON.parse(String(options.body)));
    return vectorResponse();
  };

  const input = [
    { type: "text", text: "caption" },
    { type: "image", source: { type: "url", url: "https://example.com/image.png" } },
  ];
  try {
    const result = await handleEmbedding({
      body: {
        model: "jina-ai/jina-embeddings-v5-omni-small",
        input,
        dimensions: 512,
        encoding_format: "float",
        task: "retrieval",
      },
      credentials: { apiKey: "test-key" },
      log: null,
    });
    assert.equal(result.success, true);
    assert.deepEqual(calls[0], {
      model: "jina-embeddings-v5-omni-small",
      input,
      dimensions: 512,
      encoding_format: "float",
      task: "retrieval",
    });
    assert.deepEqual(result.data.usage, { prompt_tokens: 3, total_tokens: 3 });
  } finally {
    globalThis.fetch = originalFetch;
  }
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
