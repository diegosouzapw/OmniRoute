import test from "node:test";
import assert from "node:assert/strict";

const { parseRerankModel, getRerankProvider, getAllRerankModels } = await import(
  "../../open-sse/config/rerankRegistry.ts"
);

// #6574 — OpenRouter now exposes a Cohere-compatible /api/v1/rerank endpoint
// (confirmed live: openrouter.ai/cohere/rerank-4-pro, model ids stay
// fully-qualified "cohere/rerank-4-pro"), but RERANK_PROVIDERS has no
// "openrouter" entry at all. Same failure class as #5332 (siliconflow/deepinfra):
// parseRerankModel() can't resolve a provider for a 3-segment id when the
// provider itself isn't registered, so /v1/rerank falls through straight to
// the generic "Invalid rerank model" 400 without ever calling upstream.
test("#6574 parseRerankModel resolves openrouter multi-slash rerank model id", () => {
  assert.deepEqual(parseRerankModel("openrouter/cohere/rerank-4-pro"), {
    provider: "openrouter",
    model: "cohere/rerank-4-pro",
  });
});

test("#6574 getRerankProvider('openrouter') returns a provider config", () => {
  assert.ok(getRerankProvider("openrouter"), "openrouter should be a registered rerank provider");
});

test("#6574 getAllRerankModels lists openrouter reranker models", () => {
  const ids = getAllRerankModels().map((m) => m.id);
  assert.ok(
    ids.includes("openrouter/cohere/rerank-4-pro"),
    `expected openrouter/cohere/rerank-4-pro in ${JSON.stringify(ids)}`
  );
});
