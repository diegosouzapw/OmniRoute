import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-issue-13234-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createProviderNode } = await import("../../src/lib/db/providers/nodes.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const embeddingsRoute = await import("../../src/app/api/v1/embeddings/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("custom OpenAI-compatible embeddings forward the configured bearer key", async () => {
  const providerNode = await createProviderNode({
    type: "openai-compatible",
    name: "Custom embeddings provider",
    prefix: "customembed13234",
    apiType: "embeddings",
    baseUrl: "https://embedding-provider.example/v1",
  });

  await providersDb.createProviderConnection({
    provider: providerNode.id,
    authType: "apikey",
    name: "custom-embedding-key",
    apiKey: "issue-13234-test-key",
    testStatus: "active",
    rateLimitedUntil: null,
  });

  const originalFetch = globalThis.fetch;
  let capturedHeaders: Headers | null = null;
  globalThis.fetch = async (_url: RequestInfo | URL, init: RequestInit = {}) => {
    capturedHeaders = new Headers(init?.headers);
    if (capturedHeaders.get("Authorization") !== "Bearer issue-13234-test-key") {
      return Response.json({ error: { message: "authentication required" } }, { status: 401 });
    }
    return Response.json({
      data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
      usage: { prompt_tokens: 1, total_tokens: 1 },
    });
  };

  try {
    const response = await embeddingsRoute.POST(
      new Request("http://localhost/v1/embeddings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "customembed13234/test-model", input: "hello" }),
      })
    );
    assert.equal(response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.ok(capturedHeaders, "the upstream request should be issued");
  assert.equal(capturedHeaders.get("Authorization"), "Bearer issue-13234-test-key");
});
