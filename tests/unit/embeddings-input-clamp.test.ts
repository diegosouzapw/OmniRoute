import test from "node:test";
import assert from "node:assert/strict";

const { clampEmbeddingStringInput } = await import("../../open-sse/handlers/embeddings.ts");

const LIMIT = 20_000;

test("embeddings: over-limit string input is clamped to 20k chars", () => {
  const out = clampEmbeddingStringInput("x".repeat(LIMIT + 500)) as string;
  assert.equal(out.length, LIMIT);
});

test("embeddings: under-limit string input passes through untouched", () => {
  const text = "hello world";
  assert.equal(clampEmbeddingStringInput(text), text);
});

test("embeddings: array items are clamped individually, non-strings untouched", () => {
  const out = clampEmbeddingStringInput([
    "a".repeat(LIMIT + 1),
    "short",
    { type: "image_url", url: "https://example.com/x.png" },
  ]) as unknown[];
  assert.equal((out[0] as string).length, LIMIT);
  assert.equal(out[1], "short");
  assert.deepEqual(out[2], { type: "image_url", url: "https://example.com/x.png" });
});

test("embeddings: non-string scalar input passes through", () => {
  assert.equal(clampEmbeddingStringInput(42), 42);
  assert.equal(clampEmbeddingStringInput(null), null);
});
