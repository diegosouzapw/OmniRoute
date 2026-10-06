import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-jina-omni-"));

const { v1EmbeddingsSchema } = await import("../../src/shared/validation/schemas/apiV1.ts");
const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");

const PNG_B64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
const DATA_URL = `data:image/png;base64,${PNG_B64}`;
const IMAGE_URL = "https://example.com/bike.png";

const vectorResponse = () =>
  new Response(
    JSON.stringify({
      data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
      usage: { prompt_tokens: 3, total_tokens: 3 },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );

test("schema accepts Jina native text + image URL mixed batches", () => {
  const parsed = v1EmbeddingsSchema.safeParse({
    model: "jina-ai/jina-embeddings-v5-omni-small",
    task: "retrieval.query",
    normalized: true,
    input: [{ text: "a red bicycle" }, { image: IMAGE_URL }],
  });
  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.deepEqual(parsed.data.input, [{ text: "a red bicycle" }, { image: IMAGE_URL }]);
    assert.equal(parsed.data.task, "retrieval.query");
    assert.equal(parsed.data.normalized, true);
  }
});

test("schema accepts Jina native single ImageDoc, data URI, and fused content groups", () => {
  assert.equal(
    v1EmbeddingsSchema.safeParse({
      model: "jina-ai/jina-embeddings-v5-omni-nano",
      input: { image: DATA_URL },
    }).success,
    true
  );
  assert.equal(
    v1EmbeddingsSchema.safeParse({
      model: "jina-ai/jina-embeddings-v5-omni-small",
      input: {
        content: [{ text: "caption" }, { image: DATA_URL }],
      },
    }).success,
    true
  );
});

test("schema still rejects unsafe native image URLs", () => {
  for (const image of [
    "http://example.com/bike.png",
    "https://127.0.0.1/bike.png",
    "https://169.254.169.254/latest/meta-data/",
    "file:///etc/passwd",
  ]) {
    const parsed = v1EmbeddingsSchema.safeParse({
      model: "jina-ai/jina-embeddings-v5-omni-small",
      input: [{ image }],
    });
    assert.equal(parsed.success, false, `expected reject: ${image}`);
  }
});

test("handleEmbedding forwards Jina Omni native text+image URL intact and does not fetch the image", async () => {
  const originalFetch = globalThis.fetch;
  const seen: Array<{ url: string; body: Record<string, unknown> }> = [];
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);
    if (target === IMAGE_URL || target.includes("bike.png")) {
      throw new Error("OmniRoute must not fetch Jina-native image URLs");
    }
    seen.push({
      url: target,
      body: JSON.parse(String(init.body || "{}")) as Record<string, unknown>,
    });
    return vectorResponse();
  };

  try {
    const result = await handleEmbedding({
      body: {
        model: "jina-ai/jina-embeddings-v5-omni-small",
        task: "retrieval.query",
        normalized: true,
        input: [{ text: "a red bicycle" }, { image: IMAGE_URL }],
      },
      credentials: { apiKey: "test-jina-token", connectionId: "conn-jina-omni" },
      log: null,
    });
    assert.equal(result.success, true, result.error);
    assert.equal(seen.length, 1);
    assert.equal(seen[0].url, "https://api.jina.ai/v1/embeddings");
    assert.deepEqual(seen[0].body.input, [{ text: "a red bicycle" }, { image: IMAGE_URL }]);
    assert.equal(seen[0].body.model, "jina-embeddings-v5-omni-small");
    assert.equal(seen[0].body.task, "retrieval.query");
    assert.equal(seen[0].body.normalized, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleEmbedding family alias jina-embeddings-v5-omni sends omni-small upstream", async () => {
  const originalFetch = globalThis.fetch;
  let upstreamModel = "";
  globalThis.fetch = async (_url, init = {}) => {
    upstreamModel = JSON.parse(String(init.body || "{}")).model;
    return vectorResponse();
  };
  try {
    const result = await handleEmbedding({
      body: {
        model: "jina-ai/jina-embeddings-v5-omni",
        input: [{ text: "hello" }, { image: DATA_URL }],
      },
      credentials: { apiKey: "test-jina-token" },
      log: null,
    });
    assert.equal(result.success, true, result.error);
    assert.equal(upstreamModel, "jina-embeddings-v5-omni-small");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleEmbedding rejects native image docs on text-only Jina SKUs", async () => {
  const result = await handleEmbedding({
    body: {
      model: "jina-ai/jina-embeddings-v5-text-small",
      input: [{ image: IMAGE_URL }],
    },
    credentials: { apiKey: "test-jina-token" },
    log: null,
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /does not advertise structured embedding input/i);
});
