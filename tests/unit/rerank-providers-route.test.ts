import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rerank-providers-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createProviderNode } = await import("../../src/lib/db/providers/nodes.ts");
const rerankProvidersRoute = await import("../../src/app/api/memory/rerank-providers/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("GET /api/memory/rerank-providers includes rerank-capable local provider nodes", async () => {
  await createProviderNode({
    id: "rerank-route-test-node",
    type: "openai-compatible",
    name: "Local reranker",
    prefix: "local-reranker",
    apiType: "rerank",
    baseUrl: "http://127.0.0.1:8099/v1",
  });

  const response = await rerankProvidersRoute.GET(
    new NextRequest("http://localhost/api/memory/rerank-providers")
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(
    body.providers.find(
      (provider: { provider?: string }) => provider.provider === "local-reranker"
    ),
    { provider: "local-reranker", hasKey: true, models: [] }
  );
});
