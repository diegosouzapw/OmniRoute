import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-embeddings-9089-"));

const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");

const localProvider = {
  id: "localembed",
  baseUrl: "http://localhost:8080/embeddings",
  authType: "none" as const,
  authHeader: "none" as const,
  models: [],
};

function mockUpstream(payload: unknown): () => void {
  const original = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  return () => {
    globalThis.fetch = original;
  };
}

// #9089: a custom "OpenAI Compatible" (Embeddings) provider pointed at a llama.cpp
// `llama-server --embedding --pooling cls` backend returns each vector wrapped in one
// extra array level — `[[...floats]]` instead of `[...floats]`. The OpenAI spec requires a
// flat `number[]`; the extra level silently breaks any SDK consumer doing
// `response.data[0].embedding` (it gets a length-1 array holding the real vector).
test("handleEmbedding flattens a single-row 2D embedding vector (#9089)", async () => {
  const restore = mockUpstream({
    data: [{ object: "embedding", embedding: [[0.1, 0.2, 0.3]], index: 0 }],
    usage: { prompt_tokens: 2, total_tokens: 2 },
  });
  try {
    const result = await handleEmbedding({
      body: { model: "localembed/bge-m3", input: "test" },
      credentials: null,
      resolvedProvider: localProvider,
      resolvedModel: "bge-m3",
      log: null,
    });

    assert.equal(result.success, true);
    const rows = result.data.data as Array<{ embedding: number[] }>;
    assert.deepEqual(rows[0].embedding, [0.1, 0.2, 0.3]);
    assert.equal(rows[0].embedding.length, 3);
    assert.equal(typeof rows[0].embedding[0], "number");
  } finally {
    restore();
  }
});

test("handleEmbedding leaves an already-flat embedding untouched (#9089 regression guard)", async () => {
  const restore = mockUpstream({
    data: [{ object: "embedding", embedding: [0.1, 0.2, 0.3], index: 0 }],
    usage: { prompt_tokens: 2, total_tokens: 2 },
  });
  try {
    const result = await handleEmbedding({
      body: { model: "localembed/bge-m3", input: "test" },
      credentials: null,
      resolvedProvider: localProvider,
      resolvedModel: "bge-m3",
      log: null,
    });

    assert.equal(result.success, true);
    const rows = result.data.data as Array<{ embedding: number[] }>;
    assert.deepEqual(rows[0].embedding, [0.1, 0.2, 0.3]);
  } finally {
    restore();
  }
});

test("handleEmbedding flattens single-row vectors for every item in a batch (#9089)", async () => {
  const restore = mockUpstream({
    data: [
      { object: "embedding", embedding: [[1, 2]], index: 0 },
      { object: "embedding", embedding: [[3, 4]], index: 1 },
    ],
    usage: { total_tokens: 4 },
  });
  try {
    const result = await handleEmbedding({
      body: { model: "localembed/bge-m3", input: ["a", "b"] },
      credentials: null,
      resolvedProvider: localProvider,
      resolvedModel: "bge-m3",
      log: null,
    });

    assert.equal(result.success, true);
    const rows = result.data.data as Array<{ embedding: number[] }>;
    assert.deepEqual(rows[0].embedding, [1, 2]);
    assert.deepEqual(rows[1].embedding, [3, 4]);
  } finally {
    restore();
  }
});
