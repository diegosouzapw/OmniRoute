import test from "node:test";
import assert from "node:assert/strict";
import {
  getAllEmbeddingModels,
  getEmbeddingProvider,
  parseEmbeddingModel,
} from "../../open-sse/config/embeddingRegistry.ts";
import {
  getAllRerankModels,
  getRerankProvider,
  parseRerankModel,
} from "../../open-sse/config/rerankRegistry.ts";

test("voyage-ai embedding registry exposes current embedding models", () => {
  const provider = getEmbeddingProvider("voyage-ai");

  assert.ok(provider);
  assert.equal(provider.baseUrl, "https://api.voyageai.com/v1/embeddings");
  assert.ok(provider.models.some((model) => model.id === "voyage-4-large"));
  assert.ok(provider.models.some((model) => model.id === "voyage-code-3"));
  assert.ok(provider.models.some((model) => model.id === "voyage-3-large"));

  const parsed = parseEmbeddingModel("voyage-ai/voyage-4-large");
  assert.equal(parsed.provider, "voyage-ai");
  assert.equal(parsed.model, "voyage-4-large");

  const all = getAllEmbeddingModels().filter((model) => model.provider === "voyage-ai");
  assert.ok(all.length >= 3);
});

test("voyage-ai and jina-ai rerank registries expose supported models", () => {
  const voyage = getRerankProvider("voyage-ai");
  const jina = getRerankProvider("jina-ai");

  assert.ok(voyage);
  assert.equal(voyage.baseUrl, "https://api.voyageai.com/v1/rerank");
  assert.ok(voyage.models.some((model) => model.id === "rerank-2.5"));
  assert.ok(voyage.models.some((model) => model.id === "rerank-2.5-lite"));

  assert.ok(jina);
  assert.equal(jina.baseUrl, "https://api.jina.ai/v1/rerank");
  assert.ok(jina.models.some((model) => model.id === "jina-reranker-v3"));
  assert.ok(jina.models.some((model) => model.id === "jina-reranker-m0"));

  const parsedVoyage = parseRerankModel("voyage-ai/rerank-2.5");
  assert.equal(parsedVoyage.provider, "voyage-ai");
  assert.equal(parsedVoyage.model, "rerank-2.5");

  const parsedJina = parseRerankModel("jina-ai/jina-reranker-v3");
  assert.equal(parsedJina.provider, "jina-ai");
  assert.equal(parsedJina.model, "jina-reranker-v3");

  const parsedJinaAlias = parseRerankModel("jina/jina-reranker-v3");
  assert.equal(parsedJinaAlias.provider, "jina-ai");
  assert.equal(parsedJinaAlias.model, "jina-reranker-v3");

  const all = getAllRerankModels();
  assert.ok(all.some((model) => model.id === "voyage-ai/rerank-2.5"));
  assert.ok(all.some((model) => model.id === "jina-ai/jina-reranker-v3"));
});

test("upstage embedding registry exposes current embedding models", () => {
  const provider = getEmbeddingProvider("upstage");

  assert.ok(provider);
  assert.equal(provider.baseUrl, "https://api.upstage.ai/v1/embeddings");
  assert.ok(provider.models.some((model) => model.id === "embedding-query"));
  assert.ok(provider.models.some((model) => model.id === "embedding-passage"));

  const parsed = parseEmbeddingModel("upstage/embedding-query");
  assert.equal(parsed.provider, "upstage");
  assert.equal(parsed.model, "embedding-query");

  const all = getAllEmbeddingModels().filter((model) => model.provider === "upstage");
  assert.deepEqual(
    all.map((model) => model.id),
    ["upstage/embedding-query", "upstage/embedding-passage"]
  );
});

test("nvidia embedding and rerank parsing preserves provider-prefixed upstream model IDs", () => {
  const parsedEmbedding = parseEmbeddingModel("nvidia/nv-embedqa-e5-v5");
  assert.equal(parsedEmbedding.provider, "nvidia");
  assert.equal(parsedEmbedding.model, "nvidia/nv-embedqa-e5-v5");

  const parsedDoublePrefixedEmbedding = parseEmbeddingModel("nvidia/nvidia/nv-embedqa-e5-v5");
  assert.equal(parsedDoublePrefixedEmbedding.provider, "nvidia");
  assert.equal(parsedDoublePrefixedEmbedding.model, "nvidia/nv-embedqa-e5-v5");

  const parsedRerank = parseRerankModel("nvidia/nv-rerankqa-mistral-4b-v3");
  assert.equal(parsedRerank.provider, "nvidia");
  assert.equal(parsedRerank.model, "nvidia/nv-rerankqa-mistral-4b-v3");

  const parsedDoublePrefixedRerank = parseRerankModel("nvidia/nvidia/nv-rerankqa-mistral-4b-v3");
  assert.equal(parsedDoublePrefixedRerank.provider, "nvidia");
  assert.equal(parsedDoublePrefixedRerank.model, "nvidia/nv-rerankqa-mistral-4b-v3");
});
