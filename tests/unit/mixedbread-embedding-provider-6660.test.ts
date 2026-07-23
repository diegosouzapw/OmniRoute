import test from "node:test";
import assert from "node:assert/strict";
import {
  getAllEmbeddingModels,
  getEmbeddingProvider,
  parseEmbeddingModel,
  getEmbeddingDimension,
} from "../../open-sse/config/embeddingRegistry.ts";

// Issue #6660: Mixedbread AI embeddings provider.

test("mixedbread embedding registry exposes mxbai-embed models", () => {
  const provider = getEmbeddingProvider("mixedbread");

  assert.ok(provider);
  assert.equal(provider.baseUrl, "https://api.mixedbread.com/v1/embeddings");
  assert.equal(provider.authType, "apikey");
  assert.equal(provider.authHeader, "bearer");
  assert.ok(provider.models.some((model) => model.id === "mixedbread-ai/mxbai-embed-large-v1"));
  assert.ok(provider.models.some((model) => model.id === "mixedbread-ai/mxbai-embed-2d-large-v1"));
});

test("mixedbread model strings resolve via parseEmbeddingModel", () => {
  const parsed = parseEmbeddingModel("mixedbread/mixedbread-ai/mxbai-embed-large-v1");
  assert.equal(parsed.provider, "mixedbread");
  assert.equal(parsed.model, "mixedbread-ai/mxbai-embed-large-v1");

  const parsed2d = parseEmbeddingModel("mixedbread/mixedbread-ai/mxbai-embed-2d-large-v1");
  assert.equal(parsed2d.provider, "mixedbread");
  assert.equal(parsed2d.model, "mixedbread-ai/mxbai-embed-2d-large-v1");
});

test("mixedbread models report the correct known dimensionality (1024d)", () => {
  assert.equal(
    getEmbeddingDimension("mixedbread/mixedbread-ai/mxbai-embed-large-v1"),
    1024
  );
  assert.equal(
    getEmbeddingDimension("mixedbread/mixedbread-ai/mxbai-embed-2d-large-v1"),
    1024
  );
});

test("getAllEmbeddingModels includes both mixedbread models with provider-scoped ids", () => {
  const all = getAllEmbeddingModels().filter((model) => model.provider === "mixedbread");
  assert.deepEqual(
    all.map((model) => model.id).sort(),
    [
      "mixedbread/mixedbread-ai/mxbai-embed-2d-large-v1",
      "mixedbread/mixedbread-ai/mxbai-embed-large-v1",
    ]
  );
  assert.ok(all.every((model) => model.dimensions === 1024));
});
