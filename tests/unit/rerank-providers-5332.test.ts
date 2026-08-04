import test from "node:test";
import assert from "node:assert/strict";

const { parseRerankModel, getAllRerankModels, getRerankProvider } = await import(
  "../../open-sse/config/rerankRegistry.ts"
);
const { transformResponseFromProvider, transformRequestForProvider } = await import(
  "../../open-sse/handlers/rerank.ts"
);

test("#5332 parseRerankModel resolves siliconflow multi-slash model id", () => {
  assert.deepEqual(parseRerankModel("siliconflow/Qwen/Qwen3-Reranker-8B"), {
    provider: "siliconflow",
    model: "Qwen/Qwen3-Reranker-8B",
  });
});

test("#5332 parseRerankModel resolves deepinfra multi-slash model id", () => {
  assert.deepEqual(parseRerankModel("deepinfra/Qwen/Qwen3-Reranker-0.6B"), {
    provider: "deepinfra",
    model: "Qwen/Qwen3-Reranker-0.6B",
  });
});

test("#5332 getAllRerankModels lists siliconflow + deepinfra reranker models", () => {
  const ids = getAllRerankModels().map((m) => m.id);
  assert.ok(ids.includes("siliconflow/Qwen/Qwen3-Reranker-8B"));
  assert.ok(ids.includes("deepinfra/Qwen/Qwen3-Reranker-8B"));
});

test("#5332 siliconflow is Cohere-compatible (passthrough body, no special format)", () => {
  const cfg = getRerankProvider("siliconflow");
  assert.equal(cfg.baseUrl, "https://api.siliconflow.com/v1/rerank");
  const body = { model: "Qwen/Qwen3-Reranker-8B", query: "q", documents: ["a", "b"], top_n: 2 };
  assert.deepEqual(transformRequestForProvider(cfg, body), body);
});

test("#5332 deepinfra request adapter → {queries,documents} (string + {text})", () => {
  const cfg = getRerankProvider("deepinfra");
  const out = transformRequestForProvider(cfg, {
    model: "Qwen/Qwen3-Reranker-8B",
    query: "capital of USA?",
    documents: ["Washington DC", { text: "Paris" }],
  });
  assert.deepEqual(out, { queries: ["capital of USA?"], documents: ["Washington DC", "Paris"] });
});

test("#5332 deepinfra response adapter → Cohere results sorted desc, honors top_n + documents", () => {
  const cfg = getRerankProvider("deepinfra");
  const out = transformResponseFromProvider(
    cfg,
    { scores: [0.1, 0.9, 0.5] },
    { documents: ["a", "b", "c"], top_n: 2, return_documents: true }
  );
  assert.equal(out.results.length, 2);
  assert.equal(out.results[0].index, 1); // 0.9 highest
  assert.equal(out.results[0].relevance_score, 0.9);
  assert.equal(out.results[0].document.text, "b");
  assert.equal(out.results[1].index, 2); // 0.5 next
});

test("#5332 deepinfra response omits document text when return_documents=false", () => {
  const cfg = getRerankProvider("deepinfra");
  const out = transformResponseFromProvider(
    cfg,
    { scores: [0.3, 0.7] },
    { documents: ["a", "b"], return_documents: false }
  );
  assert.equal(out.results[0].document, undefined);
  assert.equal(out.results[0].index, 1);
});
