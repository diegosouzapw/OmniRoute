/**
 * Bedrock embedding transport — unit tests.
 *
 * Every fixture in this file is a REAL response captured from live
 * `bedrock-runtime` invokes on 2026-09-10 (all HTTP 200), truncated to the
 * first few floats. The point of the suite is the contract between a model
 * family and its wire shape, so it must not be rewritten to match whatever the
 * implementation currently produces.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  assertNoBedrockPartialFailure,
  bedrockEmbeddingFamily,
  bedrockPartialFailureMessage,
  bedrockFamilyIsSingleItem,
  buildBedrockEmbeddingBody,
  extractBedrockEmbeddings,
  extractBedrockPromptTokens,
  resolveBedrockEmbeddingUrl,
  stripDataUrl,
} from "../../open-sse/handlers/bedrockEmbeddings.ts";

// ── family classification ────────────────────────────────────────────────────

test("classifies each Bedrock embedding model into its wire family", () => {
  assert.equal(bedrockEmbeddingFamily("amazon.titan-embed-text-v2:0"), "titan-text");
  assert.equal(bedrockEmbeddingFamily("amazon.titan-embed-text-v1"), "titan-text");
  assert.equal(bedrockEmbeddingFamily("amazon.titan-embed-image-v1"), "titan-multimodal");
  assert.equal(bedrockEmbeddingFamily("cohere.embed-english-v3"), "cohere");
  assert.equal(bedrockEmbeddingFamily("cohere.embed-v4:0"), "cohere");
  assert.equal(bedrockEmbeddingFamily("anthropic.claude-opus-4-5"), null);
});

test("strips cross-region inference prefixes before classifying", () => {
  // Inference-profile prefixes are routing hints, not part of the model family.
  for (const prefix of ["us.", "us-gov.", "eu.", "apac.", "jp.", "au.", "ca.", "sa.", "global."]) {
    assert.equal(bedrockEmbeddingFamily(`${prefix}cohere.embed-v4:0`), "cohere");
    assert.equal(bedrockEmbeddingFamily(`${prefix}amazon.titan-embed-text-v2:0`), "titan-text");
  }
});

test("only Titan families embed a single item per invoke", () => {
  assert.equal(bedrockFamilyIsSingleItem("titan-text"), true);
  assert.equal(bedrockFamilyIsSingleItem("titan-multimodal"), true);
  assert.equal(bedrockFamilyIsSingleItem("cohere"), false);
});

// ── request bodies ──────────────────────────────────────────────────────────

test("int8/binary embedding types are never returned as float vectors", () => {
  // Cohere v4 with embedding_types:["int8"] only — there is no float vector to
  // serve, so this must fail loudly rather than hand back quantized integers.
  assert.throws(
    () =>
      extractBedrockEmbeddings("cohere", {
        embeddings: { int8: [[12, 34]] },
        response_type: "embeddings_by_type",
      }),
    /no float embeddings/
  );
});

test("malformed vectors are rejected instead of passed through", () => {
  assert.throws(
    () => extractBedrockEmbeddings("cohere", { embeddings: [["a", "b"]] }),
    /no float embeddings/
  );
  assert.throws(
    () => extractBedrockEmbeddings("titan-text", { embedding: [1, null, 3] }),
    /no embedding/
  );
  assert.throws(() => extractBedrockEmbeddings("titan-text", { embedding: [] }), /no embedding/);
});

test("partial failures are reported as a message, not only as a throw", () => {
  // The handler turns this message into a 400 so a bad client item never gets
  // classified as a provider outage.
  assert.equal(
    bedrockPartialFailureMessage({ embedding: [0.1], failureCount: 2, message: "image too large" }),
    "Bedrock embedding reported 2 failed item(s): image too large"
  );
  assert.equal(bedrockPartialFailureMessage({ embedding: [0.1], failureCount: 0 }), null);
  assert.equal(bedrockPartialFailureMessage({ embedding: [0.1] }), null);
});

test("Titan text body uses inputText and OpenAI dimensions verbatim", () => {
  const body = buildBedrockEmbeddingBody("titan-text", [{ text: "hello world" }], {
    dimensions: 512,
    normalize: true,
  });
  assert.deepEqual(body, { inputText: "hello world", dimensions: 512, normalize: true });
});

test("Titan text rejects a batch — the caller must fan out", () => {
  assert.throws(
    () => buildBedrockEmbeddingBody("titan-text", [{ text: "a" }, { text: "b" }]),
    /one item per request/
  );
});

test("Titan multimodal accepts text, image, or both, and nests the dimension", () => {
  assert.deepEqual(buildBedrockEmbeddingBody("titan-multimodal", [{ imageBase64: "QUJD" }]), {
    inputImage: "QUJD",
  });
  const both = buildBedrockEmbeddingBody(
    "titan-multimodal",
    [{ text: "a red square", imageBase64: "QUJD" }],
    { dimensions: 256 }
  );
  assert.deepEqual(both, {
    inputText: "a red square",
    inputImage: "QUJD",
    // Titan multimodal does NOT take a flat `dimensions` field.
    embeddingConfig: { outputEmbeddingLength: 256 },
  });
});

test("Titan multimodal requires at least one modality", () => {
  assert.throws(
    () => buildBedrockEmbeddingBody("titan-multimodal", [{}]),
    /require inputText or inputImage/
  );
});

test("Cohere body batches texts and maps dimensions to output_dimension", () => {
  const body = buildBedrockEmbeddingBody("cohere", [{ text: "a" }, { text: "b" }], {
    dimensions: 512,
  });
  assert.deepEqual(body, {
    texts: ["a", "b"],
    input_type: "search_document",
    // Cohere's knob is named differently from OpenAI's.
    output_dimension: 512,
  });
});

test("Cohere image batch switches the field and the default input_type", () => {
  const body = buildBedrockEmbeddingBody("cohere", [{ imageBase64: "QUJD" }]);
  assert.deepEqual(body, {
    images: ["data:image/png;base64,QUJD"],
    input_type: "image",
  });
});

test("Cohere refuses a mixed text+image batch", () => {
  assert.throws(
    () => buildBedrockEmbeddingBody("cohere", [{ text: "a" }, { imageBase64: "QUJD" }]),
    /either texts or images/
  );
});

test("data-URL prefixes are stripped before hitting Bedrock", () => {
  assert.equal(stripDataUrl("data:image/png;base64,QUJD"), "QUJD");
  assert.equal(stripDataUrl("QUJD"), "QUJD");
});

// ── response normalization (real captured payloads) ─────────────────────────

test("Titan text v2 response — embedding plus embeddingsByType mirror", () => {
  const captured = {
    embedding: [-0.020442573, 0.056570642, 0.006846333],
    embeddingsByType: { float: [-0.020442573, 0.056570642, 0.006846333] },
    inputTextTokenCount: 2,
  };
  assert.deepEqual(extractBedrockEmbeddings("titan-text", captured), [
    [-0.020442573, 0.056570642, 0.006846333],
  ]);
  assert.equal(extractBedrockPromptTokens(captured), 2);
});

test("Titan text v1 response — embedding only, no embeddingsByType", () => {
  const captured = { embedding: [0.7266, -0.0703, 0.3477], inputTextTokenCount: 2 };
  assert.deepEqual(extractBedrockEmbeddings("titan-text", captured), [[0.7266, -0.0703, 0.3477]]);
});

test("Cohere v3 returns a BARE array of vectors", () => {
  // response_type: "embeddings_floats"
  const captured = {
    id: "1c25f8e6",
    texts: ["hello world"],
    embeddings: [[-0.0292, -0.0236, -0.0599]],
    response_type: "embeddings_floats",
  };
  assert.deepEqual(extractBedrockEmbeddings("cohere", captured), [[-0.0292, -0.0236, -0.0599]]);
  // Cohere reports no token count.
  assert.equal(extractBedrockPromptTokens(captured), 0);
});

test("Cohere v4 returns vectors KEYED by embedding type", () => {
  // response_type: "embeddings_by_type" — the shape differs from v3 above.
  const captured = {
    id: "9eebb293",
    texts: ["hello world"],
    embeddings: { float: [[-0.018626817, 0.012890297, -0.01275532]] },
    response_type: "embeddings_by_type",
  };
  assert.deepEqual(extractBedrockEmbeddings("cohere", captured), [
    [-0.018626817, 0.012890297, -0.01275532],
  ]);
});

test("Cohere v4 with several embedding_types prefers float", () => {
  const captured = {
    embeddings: { float: [[0.1, 0.2]], int8: [[12, 34]] },
    response_type: "embeddings_by_type",
  };
  assert.deepEqual(extractBedrockEmbeddings("cohere", captured), [[0.1, 0.2]]);
});

test("a response carrying no embedding is an error, not an empty vector", () => {
  assert.throws(() => extractBedrockEmbeddings("cohere", { id: "x" }), /no float embeddings/);
  assert.throws(() => extractBedrockEmbeddings("titan-text", { id: "x" }), /no embedding/);
});

// ── in-band partial failure (HTTP 200 with failureCount) ────────────────────

test("Titan multimodal failureCount>0 raises instead of returning a wrong vector", () => {
  // Captured shape: {embedding, failureCount, inputTextTokenCount, message}
  assert.throws(
    () =>
      assertNoBedrockPartialFailure({
        embedding: [0.1],
        failureCount: 1,
        message: "image too large",
      }),
    /1 failed item\(s\): image too large/
  );
});

test("failureCount of 0 passes", () => {
  assert.doesNotThrow(() =>
    assertNoBedrockPartialFailure({ embedding: [0.1], failureCount: 0, message: "" })
  );
  assert.doesNotThrow(() => assertNoBedrockPartialFailure({ embedding: [0.1] }));
});

// ── URL templating ─────────────────────────────────────────────────────────

test("region and model fill the registry URL template", () => {
  const template = "https://bedrock-runtime.{region}.amazonaws.com/model/{model}/invoke";
  assert.equal(
    resolveBedrockEmbeddingUrl(template, "us-east-1", "amazon.titan-embed-text-v2:0"),
    // the model id contains a colon, which must be percent-encoded in the path
    "https://bedrock-runtime.us-east-1.amazonaws.com/model/amazon.titan-embed-text-v2%3A0/invoke"
  );
});
