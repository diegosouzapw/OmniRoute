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

test("Voyage embeddings are registered in the specialized embedding registry", () => {
  const provider = getEmbeddingProvider("voyage");
  assert.ok(provider);
  assert.equal(provider.baseUrl, "https://api.voyageai.com/v1/embeddings");
  assert.ok(provider.models.some((model) => model.id === "voyage-3-large"));
  assert.ok(provider.models.some((model) => model.id === "voyage-code-3"));

  const parsed = parseEmbeddingModel("voyage/voyage-code-3");
  assert.equal(parsed.provider, "voyage");
  assert.equal(parsed.model, "voyage-code-3");

  const all = getAllEmbeddingModels();
  assert.ok(all.some((model) => model.id === "voyage/voyage-3-large"));
});

test("Voyage and Jina rerank models are registered in the specialized rerank registry", () => {
  const voyage = getRerankProvider("voyage");
  const jina = getRerankProvider("jina");

  assert.ok(voyage);
  assert.equal(voyage.baseUrl, "https://api.voyageai.com/v1/rerank");
  assert.ok(voyage.models.some((model) => model.id === "rerank-2.5"));
  assert.ok(voyage.models.some((model) => model.id === "rerank-2.5-lite"));

  assert.ok(jina);
  assert.equal(jina.baseUrl, "https://api.jina.ai/v1/rerank");
  assert.ok(jina.models.some((model) => model.id === "jina-reranker-v2-base-multilingual"));

  const voyageParsed = parseRerankModel("voyage/rerank-2.5");
  assert.equal(voyageParsed.provider, "voyage");
  assert.equal(voyageParsed.model, "rerank-2.5");

  const jinaParsed = parseRerankModel("jina/jina-reranker-v2-base-multilingual");
  assert.equal(jinaParsed.provider, "jina");
  assert.equal(jinaParsed.model, "jina-reranker-v2-base-multilingual");

  const all = getAllRerankModels();
  assert.ok(all.some((model) => model.id === "voyage/rerank-2.5"));
  assert.ok(all.some((model) => model.id === "jina/jina-reranker-v2-base-multilingual"));
});
