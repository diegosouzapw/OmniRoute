import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-specialty-logs-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "specialty-log-test-secret";

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");
const { handleValidatedRerankRequestBody } = await import(
  "../../src/app/api/v1/rerank/route.ts"
);

const originalFetch = globalThis.fetch;

type AttributionRow = {
  status: number;
  model: string;
  requested_model: string | null;
  combo_name: string | null;
};

function latestAttribution(pathname: string): AttributionRow {
  const row = core
    .getDbInstance()
    .prepare(
      `SELECT status, model, requested_model, combo_name
       FROM call_logs
       WHERE path = ?
       ORDER BY timestamp DESC, rowid DESC
       LIMIT 1`
    )
    .get(pathname) as AttributionRow | undefined;
  assert.ok(row, `expected a persisted ${pathname} call log`);
  return row;
}

async function flushLogs(): Promise<void> {
  assert.equal(await callLogs.waitForCallLogSaves(5_000), true, "call log writes should settle");
}

test.before(async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "embedding telemetry",
    apiKey: "sk-embedding-test",
    testStatus: "active",
  });
  await providersDb.createProviderConnection({
    provider: "cohere",
    authType: "apikey",
    name: "rerank telemetry",
    apiKey: "cohere-rerank-test",
    testStatus: "active",
  });
  await combosDb.createCombo({
    name: "memory-embeddings",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["openai/text-embedding-3-small"],
  });
  await combosDb.createCombo({
    name: "memory-rerank",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["cohere/rerank-v3.5"],
  });

  globalThis.fetch = async (_url, init) => {
    const body = JSON.parse(String(init?.body || "{}")) as Record<string, unknown>;
    const shouldFail = body.input === "fail" || body.query === "fail";
    if (shouldFail) {
      return new Response(JSON.stringify({ message: "synthetic upstream failure" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
    }
    if ("query" in body) {
      return new Response(
        JSON.stringify({
          id: "rerank-test",
          results: [{ index: 0, relevance_score: 0.99 }],
          meta: { billed_units: { search_units: 1 } },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({
        object: "list",
        data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
        usage: { prompt_tokens: 2, total_tokens: 2 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("embeddings logs direct, bare-combo, and canonical-combo request identity", async () => {
  let response = await createEmbeddingResponse({
    model: "openai/text-embedding-3-small",
    input: "direct",
  });
  assert.equal(response.status, 200);
  await flushLogs();
  assert.deepEqual(latestAttribution("/v1/embeddings"), {
    status: 200,
    model: "openai/text-embedding-3-small",
    requested_model: "openai/text-embedding-3-small",
    combo_name: null,
  });

  response = await createEmbeddingResponse({ model: "memory-embeddings", input: "bare" });
  assert.equal(response.status, 200);
  await flushLogs();
  assert.deepEqual(latestAttribution("/v1/embeddings"), {
    status: 200,
    model: "openai/text-embedding-3-small",
    requested_model: "memory-embeddings",
    combo_name: "memory-embeddings",
  });

  response = await createEmbeddingResponse({
    model: "combo/memory-embeddings",
    input: "canonical",
  });
  assert.equal(response.status, 200);
  await flushLogs();
  assert.deepEqual(latestAttribution("/v1/embeddings"), {
    status: 200,
    model: "openai/text-embedding-3-small",
    requested_model: "combo/memory-embeddings",
    combo_name: "memory-embeddings",
  });

  response = await createEmbeddingResponse({ model: "memory-embeddings", input: "fail" });
  assert.equal(response.status, 503);
  await flushLogs();
  assert.deepEqual(latestAttribution("/v1/embeddings"), {
    status: 503,
    model: "openai/text-embedding-3-small",
    requested_model: "memory-embeddings",
    combo_name: "memory-embeddings",
  });
});

test("rerank logs direct and bare-combo request identity on success and failure", async () => {
  let response = await handleValidatedRerankRequestBody({
    model: "cohere/rerank-v3.5",
    query: "direct",
    documents: ["one"],
  });
  assert.equal(response.status, 200);
  await flushLogs();
  assert.deepEqual(latestAttribution("/v1/rerank"), {
    status: 200,
    model: "cohere/rerank-v3.5",
    requested_model: "cohere/rerank-v3.5",
    combo_name: null,
  });

  response = await handleValidatedRerankRequestBody({
    model: "memory-rerank",
    query: "combo",
    documents: ["one"],
  });
  assert.equal(response.status, 200);
  await flushLogs();
  assert.deepEqual(latestAttribution("/v1/rerank"), {
    status: 200,
    model: "cohere/rerank-v3.5",
    requested_model: "memory-rerank",
    combo_name: "memory-rerank",
  });

  response = await handleValidatedRerankRequestBody({
    model: "memory-rerank",
    query: "fail",
    documents: ["one"],
  });
  assert.equal(response.status, 503);
  await flushLogs();
  assert.deepEqual(latestAttribution("/v1/rerank"), {
    status: 503,
    model: "cohere/rerank-v3.5",
    requested_model: "memory-rerank",
    combo_name: "memory-rerank",
  });
});
