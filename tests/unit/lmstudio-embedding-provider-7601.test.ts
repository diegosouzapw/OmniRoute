import test from "node:test";
import assert from "node:assert/strict";
import {
  getEmbeddingProvider,
  parseEmbeddingModel,
  getEmbeddingDimension,
} from "../../open-sse/config/embeddingRegistry.ts";

// Issue #7601: LM Studio was missing from EMBEDDING_PROVIDERS, so any
// "lmstudio/<model>" embedding request failed with "Unknown embedding
// provider: lmstudio" even though the model is listed fine elsewhere.

test("lmstudio embedding registry exposes the local no-auth endpoint", () => {
  const provider = getEmbeddingProvider("lmstudio");

  assert.ok(provider);
  assert.equal(provider.baseUrl, "http://localhost:1234/v1/embeddings");
  assert.equal(provider.authType, "none");
  assert.equal(provider.authHeader, "none");
  // LM Studio exposes its own model list dynamically, so the static
  // registry entry is passthrough (empty models array) by design — a
  // user-configured provider_node still takes priority over this entry.
  assert.deepEqual(provider.models, []);
});

test("lmstudio model strings resolve via parseEmbeddingModel (passthrough)", () => {
  const parsed = parseEmbeddingModel("lmstudio/text-embedding-qwen3-embedding-0.6b");
  assert.equal(parsed.provider, "lmstudio");
  assert.equal(parsed.model, "text-embedding-qwen3-embedding-0.6b");

  // Nested/namespaced model ids must not be mangled by passthrough parsing.
  const parsedNested = parseEmbeddingModel("lmstudio/nomic-ai/nomic-embed-text-v1.5");
  assert.equal(parsedNested.provider, "lmstudio");
  assert.equal(parsedNested.model, "nomic-ai/nomic-embed-text-v1.5");
});

test("lmstudio has no known static dimension (passthrough models aren't enumerated)", () => {
  // Callers must treat this as "can't assert", never "zero" — see
  // getEmbeddingDimension's own doc comment.
  assert.equal(getEmbeddingDimension("lmstudio/text-embedding-qwen3-embedding-0.6b"), undefined);
});
