import test from "node:test";
import assert from "node:assert/strict";

const { parseRerankModel, getAllRerankModels, getRerankProvider } =
  await import("../../open-sse/config/rerankRegistry.ts");
const { transformResponseFromProvider, transformRequestForProvider } =
  await import("../../open-sse/handlers/rerank.ts");

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

// #7350: Voyage AI uses top_k instead of top_n — map top_n → top_k in the request adapter.
test("#7350 voyage-ai request adapter maps top_n → top_k (Voyage API uses top_k)", () => {
  const cfg = getRerankProvider("voyage-ai");
  assert.equal(cfg.format, "voyage");
  const out = transformRequestForProvider(cfg, {
    model: "rerank-2.5",
    query: "q",
    documents: ["a", "b"],
    top_n: 1,
    return_documents: false,
  });
  assert.equal("top_n" in out, false, "top_n must be stripped for voyage-ai");
  assert.equal(out.top_k, 1, "top_n must be mapped to top_k for voyage-ai");
  assert.equal(out.model, "rerank-2.5");
  assert.equal(out.query, "q");
  assert.deepEqual(out.documents, ["a", "b"]);
  assert.equal(out.return_documents, false);
});

test("#7350 voyage-ai request adapter preserves body when top_n is absent", () => {
  const cfg = getRerankProvider("voyage-ai");
  const out = transformRequestForProvider(cfg, {
    model: "rerank-2.5-lite",
    query: "q",
    documents: ["a"],
    return_documents: true,
  });
  assert.deepEqual(out, {
    model: "rerank-2.5-lite",
    query: "q",
    documents: ["a"],
    return_documents: true,
  });
});

// #7350: Voyage AI returns {data:[…]} with document as raw string — map to Cohere format.
test("#7350 voyage-ai response adapter maps data[] → results[] with document as {text}", () => {
  const cfg = getRerankProvider("voyage-ai");
  const out = transformResponseFromProvider(
    cfg,
    {
      object: "list",
      data: [
        { relevance_score: 0.765625, index: 0, document: "OmniRoute routes AI requests" },
        { relevance_score: 0.34765625, index: 1, document: "Unrelated text" },
      ],
      model: "rerank-2.5",
      usage: { total_tokens: 12 },
    },
    { return_documents: true }
  );
  assert.equal(out.results.length, 2);
  assert.equal(out.results[0].index, 0);
  assert.equal(out.results[0].relevance_score, 0.765625);
  assert.deepEqual(out.results[0].document, { text: "OmniRoute routes AI requests" });
  assert.equal(out.results[1].index, 1);
  assert.deepEqual(out.results[1].document, { text: "Unrelated text" });
  assert.ok(out.id, "response should have an id");
  assert.ok(out.meta?.billed_units?.search_units, "response should have Cohere-style meta");
});

test("#7350 voyage-ai response adapter omits document when return_documents=false", () => {
  const cfg = getRerankProvider("voyage-ai");
  const out = transformResponseFromProvider(
    cfg,
    {
      object: "list",
      data: [
        { relevance_score: 0.765625, index: 0 },
        { relevance_score: 0.34765625, index: 1 },
      ],
      model: "rerank-2.5",
      usage: { total_tokens: 12 },
    },
    { return_documents: false }
  );
  assert.equal(out.results[0].document, undefined);
  assert.equal(out.results[1].document, undefined);
  assert.equal(out.results[0].index, 0);
  assert.equal(out.results[0].relevance_score, 0.765625);
});

test("#7350 voyage-ai is registered with format=voyage", () => {
  const cfg = getRerankProvider("voyage-ai");
  assert.equal(cfg.format, "voyage");
  assert.equal(cfg.baseUrl, "https://api.voyageai.com/v1/rerank");
});

test("#7350 voyage alias resolves to voyage-ai with format=voyage", () => {
  const cfg = getRerankProvider("voyage");
  assert.equal(cfg?.format, "voyage");
});
