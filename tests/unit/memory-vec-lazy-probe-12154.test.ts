/**
 * #12154 — a self-hosted embedding endpoint never got `vec_memories` created,
 * so memories were stored but never vectorized while health stayed green.
 *
 * `resolveEmbeddingSource` returns `dimensions: null` for any source the
 * hard-coded registry does not describe, and a self-hosted endpoint is by
 * definition absent from it. Both write paths then deadlocked: the vector store
 * refuses to create the table without a width, and the width can only come from
 * an embedding that has actually come back.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { withMeasuredDimensions } = await import("../../src/lib/memory/embedding/index.ts");

function resolution(overrides = {}) {
  return {
    source: "remote",
    model: "memory-custom/Qwen3-Embedding-0.6B",
    dimensions: null,
    identity: "http://tei.internal:8080|Qwen3-Embedding-0.6B",
    signature: "remote:http://tei.internal:8080|Qwen3-Embedding-0.6B:null",
    reason: "custom remote provider configured (dim=unknown, will probe at embed time)",
    ...overrides,
  };
}

test("a measured width fills in the pending lazy probe", () => {
  const filled = withMeasuredDimensions(resolution(), 1024);
  assert.equal(filled.dimensions, 1024);
  assert.match(filled.reason, /dim=1024 measured/);
});

test("the signature keeps its identity and gains the width", () => {
  const filled = withMeasuredDimensions(resolution(), 1024);
  // Identity, not model: the same model id can exist at several custom endpoints,
  // and the resolution built its signature that way too.
  assert.equal(filled.signature, "remote:http://tei.internal:8080|Qwen3-Embedding-0.6B:1024");
});

test("a resolution with no identity signs by model", () => {
  const filled = withMeasuredDimensions(
    resolution({
      identity: undefined,
      model: "openai/text-embedding-3-small",
      signature: "remote:openai/text-embedding-3-small:null",
    }),
    1536
  );
  assert.equal(filled.signature, "remote:openai/text-embedding-3-small:1536");
});

test("a width the registry already knows is never overwritten", () => {
  const known = resolution({ dimensions: 1536, signature: "remote:openai/x:1536" });
  assert.equal(withMeasuredDimensions(known, 1024), known);
});

test("a nonsense measurement is ignored rather than written into the signature", () => {
  const pending = resolution();
  for (const bad of [0, -1, 1.5, Number.NaN]) {
    assert.equal(withMeasuredDimensions(pending, bad), pending, `width ${bad}`);
  }
});

test("a resolution with no source stays unusable", () => {
  const none = resolution({ source: null, model: null, signature: "null:null:null" });
  assert.equal(withMeasuredDimensions(none, 1024), none);
});

test("two endpoints serving the same model id do not share a signature", () => {
  const a = withMeasuredDimensions(resolution(), 1024);
  const b = withMeasuredDimensions(
    resolution({ identity: "http://other.internal:8080|Qwen3-Embedding-0.6B" }),
    1024
  );
  assert.notEqual(a.signature, b.signature);
});
