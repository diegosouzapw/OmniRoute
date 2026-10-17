import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "bedrock-handler-"));
const { handleEmbedding, collectBedrockEmbeddingItems } =
  await import("../../open-sse/handlers/embeddings.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
test.after(() => resetDbInstance());

const CREDS = {
  apiKey: "synthetic-test-key",
  providerSpecificData: { region: "eu-west-1" },
};
const JPEG_ITEM = {
  type: "image",
  source: { type: "base64", data: "YWJj", media_type: "image/jpeg" },
};

/** Run handleEmbedding with fetch stubbed; returns the result plus captured upstream calls. */
async function withStubbedUpstream(
  body: Record<string, unknown>,
  responder: (call: number) => Response
) {
  const original = globalThis.fetch;
  const calls: { url: string; body: Record<string, unknown> }[] = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url: String(url), body: JSON.parse(String(options?.body)) });
    return responder(calls.length);
  };
  try {
    const result = (await handleEmbedding({ body, credentials: CREDS, log: null })) as {
      success: boolean;
      status?: number;
      error?: string;
      data?: { data: { index: number }[]; usage: { prompt_tokens: number } };
    };
    return { result, calls };
  } finally {
    globalThis.fetch = original;
  }
}

// Synthetic contract fixtures, not captured production responses.
// Titan takes BARE base64 in `inputImage`; Cohere takes a full data URL in `images[]`.
for (const [model, response, expectedImage] of [
  ["amazon.titan-embed-image-v1", { embedding: [0.1, 0.2] }, "YWJj"],
  ["cohere.embed-english-v3", { embeddings: [[0.1, 0.2]] }, "data:image/jpeg;base64,YWJj"],
  ["cohere.embed-v4:0", { embeddings: { float: [[0.1, 0.2]] } }, "data:image/jpeg;base64,YWJj"],
] as const) {
  test(`handler routes canonical JPEG through Bedrock ${model}`, async () => {
    const { result, calls } = await withStubbedUpstream(
      { model: `bedrock/${model}`, input: [JPEG_ITEM] },
      () => Response.json(response)
    );
    assert.equal(result.success, true);
    assert.equal(calls.length, 1);
    assert.equal(
      calls[0].url,
      `https://bedrock-runtime.eu-west-1.amazonaws.com/model/${encodeURIComponent(model)}/invoke`
    );
    if (model.startsWith("amazon")) assert.equal(calls[0].body.inputImage, expectedImage);
    else assert.deepEqual(calls[0].body.images, [expectedImage]);
  });
}

test("Titan text fans a batch out into one invoke per item and merges the vectors", async () => {
  const { result, calls } = await withStubbedUpstream(
    { model: "bedrock/amazon.titan-embed-text-v2:0", input: ["alpha", "beta", "gamma"] },
    (n) => Response.json({ embedding: [n, n], inputTextTokenCount: 2 })
  );
  assert.equal(result.success, true);
  assert.equal(calls.length, 3);
  assert.deepEqual(
    calls.map((c) => c.body.inputText),
    ["alpha", "beta", "gamma"]
  );
  assert.deepEqual(
    result.data?.data.map((d) => d.index),
    [0, 1, 2]
  );
  assert.equal(result.data?.usage.prompt_tokens, 6);
});

// ── client-caused failures must be 400, never 502 ───────────────────────────
// A 502 lands in HARD_ERROR_STATUSES (src/lib/embeddings/service.ts) and would
// put the whole Bedrock connection into cooldown over a bad client request.

test("Cohere rejects a mixed text+image batch with 400 before any upstream call", async () => {
  const { result, calls } = await withStubbedUpstream(
    { model: "bedrock/cohere.embed-v4:0", input: ["alpha", JPEG_ITEM] },
    () => Response.json({ embeddings: { float: [[0.1]] } })
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.equal(calls.length, 0);
});

test("token array input is rejected with 400 and a specific message", async () => {
  const { result, calls } = await withStubbedUpstream(
    { model: "bedrock/amazon.titan-embed-text-v2:0", input: [[1, 2, 3]] },
    () => Response.json({ embedding: [0.1] })
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(String(result.error), /token arrays/);
  assert.equal(calls.length, 0);
});

test("encoding_format base64 is rejected with 400 instead of silently returning floats", async () => {
  const { result, calls } = await withStubbedUpstream(
    {
      model: "bedrock/amazon.titan-embed-text-v2:0",
      input: "hello",
      encoding_format: "base64",
    },
    () => Response.json({ embedding: [0.1] })
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(String(result.error), /float encoding only/);
  assert.equal(calls.length, 0);
});

test("a non-image media type is rejected with 400", async () => {
  const { result, calls } = await withStubbedUpstream(
    {
      model: "bedrock/cohere.embed-v4:0",
      input: [{ type: "image", source: { type: "base64", data: "YWJj", media_type: "text/html" } }],
    },
    () => Response.json({ embeddings: { float: [[0.1]] } })
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.equal(calls.length, 0);
});

test("Titan in-band failureCount becomes 400, not a provider error", async () => {
  // HTTP 200 with failureCount>0 means the client's item was rejected.
  const { result } = await withStubbedUpstream(
    { model: "bedrock/amazon.titan-embed-image-v1", input: [JPEG_ITEM] },
    () => Response.json({ embedding: [0.1], failureCount: 1, message: "image too large" })
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(String(result.error), /failed item/);
});

test("media_type parameters are stripped so Bedrock gets a clean MIME type", async () => {
  const { calls } = await withStubbedUpstream(
    {
      model: "bedrock/cohere.embed-v4:0",
      input: [
        {
          type: "image",
          source: { type: "base64", data: "YWJj", media_type: "image/jpeg; charset=binary" },
        },
      ],
    },
    () => Response.json({ embeddings: { float: [[0.1]] } })
  );
  assert.deepEqual(calls[0].body.images, ["data:image/jpeg;base64,YWJj"]);
});

// Every input entry must yield exactly one item — skipping one would shift the
// `index` of every later vector against the caller's input.
for (const [label, input] of [
  ["blank text item", [{ type: "text", text: "a" }, { type: "text", text: "  " }, "c"]],
  ["nested content item", ["a", { content: [{ text: "b" }] }, "c"]],
  ["nested parts item", ["a", { parts: [{ text: "b" }] }, "c"]],
  ["blank string", ["a", "", "c"]],
] as const) {
  test(`an unconvertible ${label} is rejected with 400, not silently dropped`, async () => {
    const { result, calls } = await withStubbedUpstream(
      { model: "bedrock/cohere.embed-english-v3", input },
      () => Response.json({ embeddings: [[0.1], [0.2]] })
    );
    assert.equal(result.success, false);
    assert.equal(result.status, 400);
    assert.match(String(result.error), /input item 1/);
    assert.equal(calls.length, 0);
  });
}

test("a data: URL that is not a base64 image is rejected with 400", async () => {
  const { result, calls } = await withStubbedUpstream(
    { model: "bedrock/cohere.embed-v4:0", input: [{ image: "data:text/plain,hi" }] },
    () => Response.json({ embeddings: { float: [[0.1]] } })
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.equal(calls.length, 0);
});

test("source.data already carrying a data: prefix is not double-prefixed", async () => {
  const { calls } = await withStubbedUpstream(
    {
      model: "bedrock/amazon.titan-embed-image-v1",
      input: [{ type: "image", source: { type: "base64", data: "data:image/jpeg;base64,YWJj" } }],
    },
    () => Response.json({ embedding: [0.1] })
  );
  assert.equal(calls[0].body.inputImage, "YWJj");
});

// ── provider-caused failures stay 5xx ───────────────────────────────────────

test("a vector-count mismatch fails loudly instead of misaligning indexes", async () => {
  // Two inputs, one vector back: silently returning it would mislabel index 0.
  const { result } = await withStubbedUpstream(
    { model: "bedrock/cohere.embed-english-v3", input: ["alpha", "beta"] },
    () => Response.json({ embeddings: [[0.1, 0.2]] })
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.match(String(result.error), /1 embedding\(s\) for 2 input item\(s\)/);
});

test("upstream Bedrock errors are relayed with their own status", async () => {
  const { result } = await withStubbedUpstream(
    { model: "bedrock/cohere.embed-v4:0", input: "hello" },
    () =>
      new Response(JSON.stringify({ message: "on-demand throughput isn't supported" }), {
        status: 400,
      })
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
});

test("Bedrock canonical remote media rejects loopback using the shared SSRF guard", async () => {
  await assert.rejects(() =>
    collectBedrockEmbeddingItems([
      { type: "image", source: { type: "url", url: "http://127.0.0.1/private" } },
    ])
  );
});

test("Jina-native shorthand pointing at a private host is refused too", async () => {
  await assert.rejects(() =>
    collectBedrockEmbeddingItems([{ image: "http://169.254.169.254/latest/meta-data/" }])
  );
});
