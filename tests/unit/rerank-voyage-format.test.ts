import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolated DATA_DIR before any module that may open the SQLite singleton.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rerank-voyage-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "rerank-voyage-test-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const { getRerankProvider } = await import("../../open-sse/config/rerankRegistry.ts");
const rerankHandler = await import("../../open-sse/handlers/rerank.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// #7809 — Voyage is NOT Cohere-compatible: it hard-rejects `top_n` with 400
// ("Argument 'top_n' is not supported by our API") and responds with `data[]`
// instead of `results[]`. Without a `format: "voyage"` adapter the registry
// entry is dead weight: every call fails even with valid credentials.
// All upstream behaviors below were confirmed live against the real API
// (2026-07-19); see the issue for the raw curl evidence.

test("#7809 voyage-ai registry entry declares the voyage format adapter", () => {
  const provider = getRerankProvider("voyage-ai");
  assert.ok(provider, "voyage-ai should be a registered rerank provider");
  assert.equal(
    provider.format,
    "voyage",
    "voyage-ai must opt out of the Cohere-compatible passthrough"
  );
});

test("#7809 voyage request sends top_k (never top_n) and string documents", () => {
  const providerConfig = getRerankProvider("voyage-ai");
  const body = rerankHandler.transformRequestForProvider(providerConfig, {
    model: "rerank-2.5-lite",
    query: "which gateway routes AI?",
    documents: ["doc a", { text: "doc b" }],
    top_n: 2,
    return_documents: true,
  });
  assert.equal(body.top_k, 2, "Cohere top_n must be translated to Voyage top_k");
  assert.ok(!("top_n" in body), "top_n must not reach Voyage (400 'not supported')");
  assert.deepEqual(body.documents, ["doc a", "doc b"], "documents must be plain strings");
  assert.equal(
    body.return_documents,
    false,
    "document text is synthesized locally from the caller's originals"
  );
});

test("#7809 voyage request drops empty-string documents (Voyage 400s on them)", () => {
  const providerConfig = getRerankProvider("voyage-ai");
  const body = rerankHandler.transformRequestForProvider(providerConfig, {
    model: "rerank-2.5-lite",
    query: "q",
    documents: ["doc a", "", "doc b"],
    top_n: 3,
  });
  assert.deepEqual(
    body.documents,
    ["doc a", "doc b"],
    "empty strings must be filtered ('Input cannot contain empty strings')"
  );
});

test("#7809 voyage data[] response is normalized to Cohere results[] with original indices", () => {
  const providerConfig = getRerankProvider("voyage-ai");
  // Caller sent ["doc a", "", "doc b"]; Voyage saw ["doc a", "doc b"] and
  // ranked its index 1 ("doc b") first — which is the caller's index 2.
  const result = rerankHandler.transformResponseFromProvider(
    providerConfig,
    {
      object: "list",
      data: [
        { index: 1, relevance_score: 0.88 },
        { index: 0, relevance_score: 0.12 },
      ],
      model: "rerank-2.5-lite",
      usage: { total_tokens: 12 },
    },
    { documents: ["doc a", "", "doc b"], top_n: 3, return_documents: true }
  );
  assert.ok(Array.isArray(result.results), "response must be Cohere-shaped (results[])");
  assert.deepEqual(
    result.results.map((r) => [r.index, r.relevance_score]),
    [
      [2, 0.88],
      [0, 0.12],
    ],
    "indices must point at the caller's ORIGINAL document positions"
  );
  assert.equal(result.results[0].document.text, "doc b");
  assert.equal(
    result.meta.billed_units.search_units,
    1,
    "search unit synthesized for cost telemetry (parity with nvidia/deepinfra)"
  );
});

test("#7809 voyage response omits document text when return_documents=false", () => {
  const providerConfig = getRerankProvider("voyage-ai");
  const result = rerankHandler.transformResponseFromProvider(
    providerConfig,
    { object: "list", data: [{ index: 0, relevance_score: 0.5 }] },
    { documents: ["doc a"], top_n: 1, return_documents: false }
  );
  assert.equal(result.results[0].index, 0);
  assert.ok(!("document" in result.results[0]), "no document echo when not requested");
});

test("#7809 handleRerank end-to-end: voyage upstream body + normalized Response", async () => {
  let upstreamUrl = "";
  let upstreamBody: Record<string, unknown> = {};
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    upstreamUrl = String(url);
    upstreamBody = JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>;
    return new Response(
      JSON.stringify({
        object: "list",
        data: [
          { index: 1, relevance_score: 0.86 },
          { index: 0, relevance_score: 0.22 },
        ],
        model: "rerank-2.5-lite",
        usage: { total_tokens: 57 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  const response = (await rerankHandler.handleRerank({
    model: "voyage/rerank-2.5-lite",
    query: "which gateway routes AI?",
    documents: ["irrelevant doc", "the gateway doc"],
    top_n: 2,
    credentials: { apiKey: "test-key" },
  })) as Response;

  assert.equal(upstreamUrl, "https://api.voyageai.com/v1/rerank");
  assert.equal(upstreamBody.top_k, 2);
  assert.ok(!("top_n" in upstreamBody), "top_n must never reach Voyage");
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    results?: Array<{ index: number; relevance_score: number }>;
  };
  assert.ok(Array.isArray(body.results), "client must receive Cohere-shaped results[]");
  assert.deepEqual(
    body.results.map((r) => [r.index, r.relevance_score]),
    [
      [1, 0.86],
      [0, 0.22],
    ]
  );
});
