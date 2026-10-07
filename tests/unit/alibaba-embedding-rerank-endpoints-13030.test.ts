import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-issue-13030-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "issue-13030-test-secret";
process.env.REQUIRE_API_KEY = "false";

const WORKSPACE_BASE = "https://workspace-test.cn-beijing.maas.aliyuncs.com/compatible-mode/v1";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");
const { POST: postRerank } = await import("../../src/app/api/v1/rerank/route.ts");

function resetStorage(): void {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#13030 Alibaba embedding and rerank use the selected workspace connection", async () => {
  resetStorage();
  await providersDb.createProviderConnection({
    provider: "alibaba",
    authType: "apikey",
    apiKey: "sk-workspace-test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      region: "china-beijing",
      baseUrl: WORKSPACE_BASE,
    },
  });

  const calls: Array<{ url: string; body: Record<string, unknown>; authorization: string | null }> =
    [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input, init) => {
    const headers = new Headers(init?.headers);
    calls.push({
      url: String(input),
      body: JSON.parse(String(init?.body || "{}")) as Record<string, unknown>,
      authorization: headers.get("authorization"),
    });

    if (String(input).endsWith("/embeddings")) {
      return new Response(
        JSON.stringify({
          object: "list",
          data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
          model: "qwen3.7-text-embedding",
          usage: { prompt_tokens: 1, total_tokens: 1 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        object: "list",
        results: [{ index: 0, relevance_score: 0.95 }],
        model: "qwen3-rerank",
        id: "rerank-test",
        usage: { total_tokens: 3 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof globalThis.fetch;

  try {
    const embeddingResponse = await createEmbeddingResponse({
      model: "alibaba/qwen3.7-text-embedding",
      input: "hello",
      dimensions: 1024,
    });
    assert.equal(embeddingResponse.status, 200);

    const rerankResponse = await postRerank(
      new Request("http://localhost/v1/rerank", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "alibaba/qwen3-rerank",
          query: "hello",
          documents: [{ text: "hello world" }, "unrelated"],
          top_n: 1,
        }),
      })
    );
    assert.equal(rerankResponse.status, 200);
    const rerankBody = (await rerankResponse.json()) as {
      results: Array<{ document?: { text?: string } }>;
    };
    assert.equal(rerankBody.results[0].document?.text, "hello world");
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(calls.length, 2);
  assert.deepEqual(
    calls.map((call) => call.url),
    [
      `${WORKSPACE_BASE}/embeddings`,
      "https://workspace-test.cn-beijing.maas.aliyuncs.com/compatible-api/v1/reranks",
    ]
  );
  assert.equal(calls[0].body.model, "qwen3.7-text-embedding");
  assert.equal(calls[1].body.model, "qwen3-rerank");
  assert.deepEqual(calls[1].body.documents, ["hello world", "unrelated"]);
  assert.equal("return_documents" in calls[1].body, false);
  assert.deepEqual(
    calls.map((call) => call.authorization),
    ["Bearer sk-workspace-test", "Bearer sk-workspace-test"]
  );
});
