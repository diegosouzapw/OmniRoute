// Regression tests for the TEI / Infinity request+response shape adapters on the
// POST /v1/rerank provider-node path.
//
// The route fell back from <base>/v1/rerank to <base>/rerank on 404 "for Infinity /
// TEI", but still sent `documents` (TEI requires `texts` → HTTP 422) and returned the
// upstream body verbatim (TEI answers a bare `[{index, score, text}]`, some gateways
// `{results:[{index, score}]}`), so clients — and the memory engine, which reads
// `relevance_score` — got either an error or undefined scores.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rerank-shapes-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { buildLocalRerankRequestBody, documentText, normalizeLocalRerankResponse } =
  await import("../../src/app/api/v1/_shared/rerankLocalNodeShapes.ts");
const core = await import("../../src/lib/db/core.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { createProviderNode, createProviderConnection } =
  await import("../../src/lib/db/providers.ts");
const { POST } = await import("../../src/app/api/v1/rerank/route.ts");

const DOCS = ["a cat is a small animal", "the stock market fell", { text: "cats purr" }];

test.describe("buildLocalRerankRequestBody", () => {
  test("sends both the Cohere/OpenAI and the TEI spellings", () => {
    const body = buildLocalRerankRequestBody({
      model: "bge-reranker-v2-m3",
      query: "what is a cat",
      documents: DOCS,
      top_n: 2,
      return_documents: false,
    });
    assert.equal(body.model, "bge-reranker-v2-m3");
    assert.equal(body.query, "what is a cat");
    assert.deepEqual(body.documents, DOCS);
    assert.deepEqual(body.texts, ["a cat is a small animal", "the stock market fell", "cats purr"]);
    assert.equal(body.top_n, 2);
    assert.equal(body.return_documents, false);
    assert.equal(body.return_text, false);
  });

  test("defaults top_n to the document count and return_documents to false (Cohere default)", () => {
    // Clients that did not ask for documents must keep getting the bare
    // {index, relevance_score} rows the /v1/rerank contract always returned
    // (local-rerank-logging.test.ts); documents are echoed back only on request.
    const body = buildLocalRerankRequestBody({ model: "m", query: "q", documents: DOCS });
    assert.equal(body.top_n, 3);
    assert.equal(body.return_documents, false);
    assert.equal(body.return_text, false);
    const explicit = buildLocalRerankRequestBody({
      model: "m",
      query: "q",
      documents: DOCS,
      return_documents: true,
    });
    assert.equal(explicit.return_documents, true);
    assert.equal(explicit.return_text, true);
  });

  test("documentText flattens strings, {text} objects, and other values", () => {
    assert.equal(documentText("plain"), "plain");
    assert.equal(documentText({ text: "obj" }), "obj");
    assert.equal(documentText(42), "42");
    assert.equal(documentText(null), "");
  });
});

test.describe("normalizeLocalRerankResponse", () => {
  test("TEI bare array with `score` and `text` → Cohere envelope", () => {
    const out = normalizeLocalRerankResponse(
      [
        { index: 1, score: 0.01, text: "the stock market fell" },
        { index: 0, score: 0.98, text: "a cat is a small animal" },
      ],
      DOCS,
      { return_documents: true }
    );
    assert.deepEqual(out, {
      results: [
        { index: 0, relevance_score: 0.98, document: { text: "a cat is a small animal" } },
        { index: 1, relevance_score: 0.01, document: { text: "the stock market fell" } },
      ],
    });
  });

  test("gateway `{results:[{index, score}]}` gains relevance_score and keeps extras", () => {
    const out = normalizeLocalRerankResponse(
      {
        model: "bge-reranker-v2-m3",
        usage: { total_tokens: 12 },
        results: [
          { index: 0, score: 0.9 },
          { index: 2, score: 0.5 },
        ],
      },
      DOCS,
      { return_documents: false }
    );
    assert.deepEqual(out, {
      model: "bge-reranker-v2-m3",
      usage: { total_tokens: 12 },
      results: [
        { index: 0, relevance_score: 0.9 },
        { index: 2, relevance_score: 0.5 },
      ],
    });
  });

  test("already-Cohere responses pass through unchanged apart from ordering/top_n", () => {
    const out = normalizeLocalRerankResponse(
      {
        results: [
          { index: 1, relevance_score: 0.2, document: { text: "the stock market fell" } },
          { index: 0, relevance_score: 0.7, document: { text: "a cat is a small animal" } },
          { index: 2, relevance_score: 0.6, document: { text: "cats purr" } },
        ],
      },
      DOCS,
      { top_n: 2, return_documents: true }
    );
    assert.deepEqual(
      out.results.map((r) => [r.index, r.relevance_score]),
      [
        [0, 0.7],
        [2, 0.6],
      ]
    );
  });

  test("Voyage-style `{data:[...]}` is accepted", () => {
    const out = normalizeLocalRerankResponse(
      { data: [{ index: 0, relevance_score: 0.3 }], object: "list" },
      DOCS,
      { return_documents: false }
    );
    assert.deepEqual(out, { object: "list", results: [{ index: 0, relevance_score: 0.3 }] });
  });

  test("attaches document text from the request when the upstream did not echo it", () => {
    const out = normalizeLocalRerankResponse({ results: [{ index: 2, score: 1 }] }, DOCS, {
      return_documents: true,
    });
    assert.deepEqual(out.results[0].document, { text: "cats purr" });
  });

  test("drops malformed entries instead of forwarding them", () => {
    const out = normalizeLocalRerankResponse(
      [
        { index: 0, score: "0.5" }, // numeric string → accepted
        { index: 9, score: 0.9 }, // out of range → dropped
        { index: 1 }, // no score → dropped
        { score: 0.1 }, // no index → dropped
        "junk",
        null,
      ],
      DOCS,
      { return_documents: false }
    );
    assert.deepEqual(out, { results: [{ index: 0, relevance_score: 0.5 }] });
  });

  test("unrecognised payloads yield an empty results list rather than throwing", () => {
    assert.deepEqual(normalizeLocalRerankResponse({ ok: true }, DOCS), { ok: true, results: [] });
    assert.deepEqual(normalizeLocalRerankResponse("nope", DOCS), { results: [] });
    assert.deepEqual(normalizeLocalRerankResponse(null, DOCS), { results: [] });
  });
});

test.describe("POST /v1/rerank against a TEI-shaped local node", () => {
  const originalFetch = globalThis.fetch;

  test.before(async () => {
    const now = new Date().toISOString();
    await createProviderNode({
      id: "openai-compatible-rerank-tei",
      name: "tei",
      type: "openai",
      prefix: "tei",
      baseUrl: "http://127.0.0.1:8081/v1",
      apiType: "rerank",
      createdAt: now,
      updatedAt: now,
    });
    await createProviderConnection({
      id: "conn-tei-1",
      provider: "openai-compatible-rerank-tei",
      authType: "apikey",
      name: "tei",
      apiKey: "tei-token",
      createdAt: now,
      updatedAt: now,
    });
    invalidateDbCache("nodes");
    invalidateDbCache("connections");
  });

  test.afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test.after(() => {
    core.resetDbInstance();
    try {
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } catch {
      // ignore
    }
  });

  test("404 on /v1/rerank → /rerank with `texts`; bare TEI array is normalized", async () => {
    const calls: Array<{ url: string; body: Record<string, unknown> }> = [];
    globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body || "{}"));
      calls.push({ url: String(url), body });
      if (String(url).endsWith("/v1/rerank")) {
        return new Response("Not Found", { status: 404 });
      }
      // TEI: requires `texts`, answers a bare array sorted by score, `text` when asked.
      if (!Array.isArray(body.texts)) {
        return new Response(JSON.stringify({ error: "missing field `texts`" }), { status: 422 });
      }
      return new Response(
        JSON.stringify([
          { index: 0, score: 0.9875887, text: body.texts[0] },
          { index: 1, score: 0.000016, text: body.texts[1] },
        ]),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    };

    const res = await POST(
      new Request("http://localhost/v1/rerank", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          model: "tei/bge-reranker-v2-m3",
          query: "what is a cat",
          documents: ["a cat is a small animal", "the stock market fell"],
          top_n: 1,
        }),
      }),
      {}
    );

    assert.equal(res.status, 200);
    const data = (await res.json()) as {
      results: Array<{ index: number; relevance_score: number; document?: { text: string } }>;
    };
    // No return_documents in the request → Cohere default (false): bare rows only.
    assert.deepEqual(data, { results: [{ index: 0, relevance_score: 0.9875887 }] });
    assert.deepEqual(
      calls.map((c) => c.url),
      ["http://127.0.0.1:8081/v1/rerank", "http://127.0.0.1:8081/rerank"]
    );
    assert.deepEqual(calls[1].body.texts, ["a cat is a small animal", "the stock market fell"]);
    assert.deepEqual(calls[1].body.documents, ["a cat is a small animal", "the stock market fell"]);
    assert.equal(calls[1].body.return_text, false);
    assert.equal(calls[1].body.model, "bge-reranker-v2-m3");
  });

  test("a `score`-only gateway on /v1/rerank yields relevance_score for clients", async () => {
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({
          results: [
            { index: 0, score: 0.98, text: "a cat is a small animal" },
            { index: 1, score: 0.02, text: "the stock market fell" },
          ],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );

    const res = await POST(
      new Request("http://localhost/v1/rerank", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          model: "tei/bge-reranker-v2-m3",
          query: "what is a cat",
          documents: ["a cat is a small animal", "the stock market fell"],
          return_documents: false,
        }),
      }),
      {}
    );
    assert.equal(res.status, 200);
    const data = (await res.json()) as { results: Array<Record<string, unknown>> };
    assert.deepEqual(data.results, [
      { index: 0, relevance_score: 0.98 },
      { index: 1, relevance_score: 0.02 },
    ]);
  });
});
