import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolated DATA_DIR before any module that may open the SQLite singleton
// (open-sse/handlers/rerank.ts pulls in @/lib/usageDb, which triggers
// migrations on import) — never touch the shared/real DB (#7809/#7811).
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rerank-voyage-7809-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { parseRerankModel, getRerankProvider } =
  await import("../../open-sse/config/rerankRegistry.ts");
const { transformRequestForProvider, transformResponseFromProvider } =
  await import("../../open-sse/handlers/rerank.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ─── Registry ──────────────────────────────────────────────────────────────

test("#7809 voyage-ai registry entry has format: 'voyage'", () => {
  const cfg = getRerankProvider("voyage-ai");
  assert.ok(cfg, "voyage-ai provider should exist");
  assert.equal(cfg.format, "voyage");
  assert.equal(cfg.baseUrl, "https://api.voyageai.com/v1/rerank");
});

test("#7809 parseRerankModel resolves voyage-ai/rerank-2.5", () => {
  assert.deepEqual(parseRerankModel("voyage-ai/rerank-2.5"), {
    provider: "voyage-ai",
    model: "rerank-2.5",
  });
});

test("#7809 parseRerankModel resolves voyage alias → voyage-ai", () => {
  assert.deepEqual(parseRerankModel("voyage/rerank-2.5-lite"), {
    provider: "voyage-ai",
    model: "rerank-2.5-lite",
  });
});

// ─── Request adapter ───────────────────────────────────────────────────────

test("#7809 voyage request adapter maps top_n → top_k and drops only exact empty strings", () => {
  const cfg = getRerankProvider("voyage-ai");
  const out = transformRequestForProvider(cfg, {
    model: "rerank-2.5-lite",
    query: "teste",
    documents: ["doc ok", "", "  ", "doc three"],
    top_n: 3,
    return_documents: true,
  });
  assert.equal(out.top_k, 3);
  assert.equal(out.top_n, undefined);
  // Whitespace-only "  " is preserved; only exact "" is dropped
  assert.deepEqual(out.documents, ["doc ok", "  ", "doc three"]);
  assert.equal(out.model, "rerank-2.5-lite");
  assert.equal(out.query, "teste");
});

test("#7809 voyage request adapter preserves whitespace-only document (Voyage accepts them)", () => {
  const cfg = getRerankProvider("voyage-ai");
  const out = transformRequestForProvider(cfg, {
    model: "rerank-2.5-lite",
    query: "teste",
    documents: ["doc ok", " "],
    top_n: 2,
  });
  // Whitespace-only " " must be sent upstream — Voyage ranks it
  assert.equal(out.documents.length, 2);
  assert.deepEqual(out.documents, ["doc ok", " "]);
});

test("#7809 voyage request adapter handles {text} object documents", () => {
  const cfg = getRerankProvider("voyage-ai");
  const out = transformRequestForProvider(cfg, {
    model: "rerank-2.5",
    query: "q",
    documents: [{ text: "hello" }, { text: "" }, "world"],
    top_n: 2,
  });
  assert.deepEqual(out.documents, ["hello", "world"]);
  assert.equal(out.top_k, 2);
});

test("#7809 voyage request adapter defaults top_k to filtered doc count when top_n omitted", () => {
  const cfg = getRerankProvider("voyage-ai");
  const out = transformRequestForProvider(cfg, {
    model: "rerank-2.5",
    query: "q",
    documents: ["a", "b", "c"],
    top_n: 0,
  });
  // top_n is 0 (falsy) so fallback to docTexts.length
  assert.equal(out.top_k, 3);
});

test("#7809 voyage request adapter does not include __voyageIndexMap in serialized body", () => {
  const cfg = getRerankProvider("voyage-ai");
  const out = transformRequestForProvider(cfg, {
    model: "rerank-2.5",
    query: "q",
    documents: ["a", "b"],
    top_n: 2,
  });
  const serialized = JSON.parse(JSON.stringify(out));
  assert.equal(serialized.__voyageIndexMap, undefined);
});

// ─── Response adapter ──────────────────────────────────────────────────────

test("#7809 voyage response adapter maps data[] → Cohere results[] sorted desc", () => {
  const cfg = getRerankProvider("voyage-ai");
  const out = transformResponseFromProvider(
    cfg,
    {
      object: "list",
      data: [
        { relevance_score: 0.3, index: 0 },
        { relevance_score: 0.9, index: 1 },
        { relevance_score: 0.6, index: 2 },
      ],
      model: "rerank-2.5-lite",
      usage: { total_tokens: 57 },
    },
    { documents: ["doc a", "doc b", "doc c"], top_n: 3, return_documents: true }
  );
  assert.equal(out.results.length, 3);
  assert.equal(out.results[0].index, 1); // 0.9 highest
  assert.equal(out.results[0].relevance_score, 0.9);
  assert.equal(out.results[0].document.text, "doc b");
  assert.equal(out.results[1].index, 2); // 0.6 next
  assert.equal(out.results[2].index, 0); // 0.3 lowest
});

test("#7809 voyage response adapter honors top_n", () => {
  const cfg = getRerankProvider("voyage-ai");
  const out = transformResponseFromProvider(
    cfg,
    {
      data: [
        { relevance_score: 0.1, index: 0 },
        { relevance_score: 0.8, index: 1 },
      ],
    },
    { documents: ["a", "b"], top_n: 1, return_documents: true }
  );
  assert.equal(out.results.length, 1);
  assert.equal(out.results[0].index, 1);
});

test("#7809 voyage response adapter omits document text when return_documents=false", () => {
  const cfg = getRerankProvider("voyage-ai");
  const out = transformResponseFromProvider(
    cfg,
    { data: [{ relevance_score: 0.5, index: 0 }] },
    { documents: ["a"], return_documents: false }
  );
  assert.equal(out.results[0].document, undefined);
});

test("#7809 voyage response adapter remaps indices when empty-string documents were filtered", () => {
  const cfg = getRerankProvider("voyage-ai");
  // Original docs: ["doc0", "", "doc2"] → filtered to ["doc0", "doc2"]
  // Voyage sees index 0 → original 0, index 1 → original 2
  const out = transformResponseFromProvider(
    cfg,
    {
      data: [
        { relevance_score: 0.95, index: 1 }, // "doc2" in filtered array
        { relevance_score: 0.4, index: 0 }, // "doc0" in filtered array
      ],
    },
    { documents: ["doc0", "", "doc2"], top_n: 2, return_documents: true }
  );
  assert.equal(out.results[0].index, 2); // remapped to original position
  assert.equal(out.results[0].document.text, "doc2");
  assert.equal(out.results[1].index, 0);
  assert.equal(out.results[1].document.text, "doc0");
});

test("#7809 voyage response adapter preserves whitespace-only in index map", () => {
  const cfg = getRerankProvider("voyage-ai");
  // Whitespace-only doc must pass through: ["a", " "] → 2 docs sent
  const out = transformResponseFromProvider(
    cfg,
    {
      data: [
        { relevance_score: 0.8, index: 0 },
        { relevance_score: 0.3, index: 1 },
      ],
    },
    { documents: ["a", " "], top_n: 2, return_documents: true }
  );
  assert.equal(out.results.length, 2);
  assert.equal(out.results[0].index, 0);
  assert.equal(out.results[0].document.text, "a");
  assert.equal(out.results[1].index, 1);
  assert.equal(out.results[1].document.text, " ");
});

test("#7809 voyage response adapter produces Cohere-shaped meta", () => {
  const cfg = getRerankProvider("voyage-ai");
  const out = transformResponseFromProvider(
    cfg,
    { data: [{ relevance_score: 0.5, index: 0 }] },
    { documents: ["a"] }
  );
  assert.ok(out.id.startsWith("rerank-"));
  assert.deepEqual(out.meta, {
    api_version: { version: "2" },
    billed_units: { search_units: 1 },
  });
});

test("#7809 voyage response adapter handles empty data array", () => {
  const cfg = getRerankProvider("voyage-ai");
  const out = transformResponseFromProvider(cfg, { data: [] }, { documents: ["a", "b"] });
  assert.deepEqual(out.results, []);
});
