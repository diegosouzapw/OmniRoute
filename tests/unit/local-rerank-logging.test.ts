import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rerank-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { createProviderNode, createProviderConnection } =
  await import("../../src/lib/db/providers.ts");
const { getCallLogs, getCallLogById, waitForCallLogSaves } =
  await import("../../src/lib/usage/callLogs.ts");
const { POST } = await import("../../src/app/api/v1/rerank/route.ts");

interface RerankSuccessResponse {
  results: Array<{ index: number; relevance_score: number }>;
}

interface CallLogRow {
  id: string;
  model: string;
  provider: string;
  status: number;
  error?: string;
  connectionId?: string;
}

test.describe("Local rerank provider logging and fallback", () => {
  const originalFetch = globalThis.fetch;

  test.after(() => {
    globalThis.fetch = originalFetch;
    core.resetDbInstance();
    try {
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } catch {
      // ignore
    }
  });

  test("successfully logs local rerank calls and attaches metadata headers", async () => {
    const now = new Date().toISOString();
    await createProviderNode({
      id: "vram",
      name: "vram",
      type: "openai",
      prefix: "vram",
      baseUrl: "http://127.0.0.1:8000/v1",
      createdAt: now,
      updatedAt: now,
    });

    await createProviderConnection({
      id: "conn-vram-1",
      provider: "vram",
      authType: "apikey",
      name: "vram-local",
      apiKey: "test-token",
      createdAt: now,
      updatedAt: now,
    });

    invalidateDbCache("nodes");
    invalidateDbCache("connections");

    globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) => {
      assert.equal(String(url), "http://127.0.0.1:8000/v1/rerank");
      const parsedBody = JSON.parse(String(init?.body || "{}"));
      assert.equal(parsedBody.model, "BAAI/bge-reranker-v2-m3");
      assert.equal(parsedBody.query, "test query");
      assert.deepEqual(parsedBody.documents, ["doc1", "doc2"]);

      return new Response(
        JSON.stringify({
          results: [
            { index: 0, relevance_score: 0.95 },
            { index: 1, relevance_score: 0.2 },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    };

    const req = new Request("http://localhost:20128/api/v1/rerank", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "vram/BAAI/bge-reranker-v2-m3",
        query: "test query",
        documents: ["doc1", "doc2"],
      }),
    });

    const res = await POST(req, {} as Record<string, unknown>);
    assert.equal(res.status, 200);
    assert.equal(res.headers.get("x-omniroute-provider"), "vram");
    assert.equal(res.headers.get("x-omniroute-model"), "BAAI/bge-reranker-v2-m3");

    const json = (await res.json()) as RerankSuccessResponse;
    assert.equal(json.results.length, 2);

    await waitForCallLogSaves(15000);

    const logs = (await getCallLogs({ limit: 10 })) as unknown as CallLogRow[];
    const logEntry = logs.find((l) => l.model === "vram/BAAI/bge-reranker-v2-m3");
    assert.ok(logEntry, "Expected call log entry for local rerank");
    assert.equal(logEntry.provider, "vram");
    assert.equal(logEntry.status, 200);

    const detail = await getCallLogById(logEntry.id);
    assert.deepEqual(detail?.requestBody, {
      model: "vram/BAAI/bge-reranker-v2-m3",
      query: "test query",
      documents: ["doc1", "doc2"],
    });
    assert.deepEqual(detail?.responseBody, {
      results: [
        { index: 0, relevance_score: 0.95 },
        { index: 1, relevance_score: 0.2 },
      ],
    });
  });

  test("falls back from /v1/rerank to /rerank when local provider returns 404", async () => {
    const now = new Date().toISOString();
    await createProviderNode({
      id: "infinity",
      name: "infinity",
      type: "openai",
      prefix: "infinity",
      baseUrl: "http://127.0.0.1:7997",
      createdAt: now,
      updatedAt: now,
    });

    await createProviderConnection({
      id: "conn-infinity-1",
      provider: "infinity",
      authType: "apikey",
      name: "infinity-local",
      apiKey: "test-token",
      createdAt: now,
      updatedAt: now,
    });

    invalidateDbCache("nodes");
    invalidateDbCache("connections");

    const urlsAttempted: string[] = [];
    globalThis.fetch = async (url: string | URL | Request) => {
      urlsAttempted.push(String(url));
      if (String(url).endsWith("/v1/rerank")) {
        return new Response("Not Found", { status: 404 });
      }
      return new Response(
        JSON.stringify({
          results: [{ index: 0, relevance_score: 0.99 }],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    };

    const req = new Request("http://localhost:20128/api/v1/rerank", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "infinity/bge-reranker-large",
        query: "search",
        documents: ["doc1"],
      }),
    });

    const res = await POST(req, {} as Record<string, unknown>);
    assert.equal(res.status, 200);
    assert.deepEqual(urlsAttempted, [
      "http://127.0.0.1:7997/v1/rerank",
      "http://127.0.0.1:7997/rerank",
    ]);
  });

  test("records error call log when local provider returns 500", async () => {
    globalThis.fetch = async () => {
      return new Response(JSON.stringify({ detail: "Local backend failure" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    };

    const req = new Request("http://localhost:20128/api/v1/rerank", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "vram/BAAI/bge-reranker-v2-m3",
        query: "test query",
        documents: ["doc1"],
      }),
    });

    const res = await POST(req, {} as Record<string, unknown>);
    assert.equal(res.status, 500);

    await waitForCallLogSaves(15000);

    const logs = (await getCallLogs({ limit: 10 })) as unknown as CallLogRow[];
    const logEntry = logs.find(
      (l) => l.model === "vram/BAAI/bge-reranker-v2-m3" && l.status === 500
    );
    assert.ok(logEntry, "Expected 500 call log entry for local rerank failure");
    assert.equal(logEntry.provider, "vram");
    assert.equal(logEntry.error, "Local backend failure");
  });
});
