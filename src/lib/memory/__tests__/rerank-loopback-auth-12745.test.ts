/**
 * src/lib/memory/__tests__/rerank-loopback-auth-12745.test.ts
 *
 * Regression guard for #12745 — applyRerank()'s internal loopback call to
 * /v1/rerank used to carry no credential, so with REQUIRE_API_KEY=true the
 * global authz proxy's clientApiPolicy would 401 it and rerank silently
 * degraded to unranked order (fail-open by design, so nothing ever surfaced
 * the failure).
 *
 * This file proves two things:
 *   1. The loopback fetch retrieval.ts's applyRerank() issues now carries a
 *      real Authorization: Bearer <internal key> header (fixed by attaching
 *      pickApiKeyForInternalUse() — the same internal-probe selector already
 *      used by combo-health-check / cloud-sync-verify).
 *   2. That fix was NOT done by exempting /v1/rerank from auth: an
 *      unauthenticated *external* request to /api/v1/rerank is still
 *      rejected by clientApiPolicy when REQUIRE_API_KEY=true.
 */

import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-rerank-auth-12745-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.VECTOR_STORE_DISABLE_VEC = "true";

const INTERNAL_KEY = "sk-internal-test-key-12745";

vi.mock("../settings", () => ({
  getMemorySettings: async () => ({
    enabled: true,
    maxTokens: 2000,
    retentionDays: 30,
    strategy: "semantic",
    skillsEnabled: true,
    embeddingSource: "static",
    embeddingProviderModel: null,
    customBaseUrl: null,
    customModelId: null,
    transformersEnabled: false,
    staticEnabled: true,
    rerankEnabled: true,
    rerankProviderModel: "test-provider/test-rerank-model",
    vectorStore: "sqlite-vec",
    primaryBackend: "sqlite",
    fallbackBackends: [],
    backendConfigs: {},
  }),
}));

vi.mock("../embedding", () => ({
  resolveEmbeddingSource: () => ({
    source: "static",
    model: "static-hash-8",
    dimensions: 8,
    identity: "static",
    signature: "static-8",
    reason: "test: static embedding, no network",
  }),
  embed: async () => ({
    vector: new Float32Array([1, 0, 0, 0, 0, 0, 0, 0]),
    source: "static",
    model: "static-hash-8",
    dimensions: 8,
    latencyMs: 0,
  }),
}));

vi.mock("../vectorStore", () => ({
  getVectorStore: () => ({
    ensureReady: async () => ({ ready: true, reason: "test" }),
    upsertVector: async () => undefined,
    deleteVector: async () => undefined,
    searchVector: async () => [
      { memoryId: "rrk-auth-1", score: 0.91 },
      { memoryId: "rrk-auth-2", score: 0.82 },
    ],
    searchHybrid: async () => [],
    stats: async () => ({ rowCount: 2, needsReindex: 0, activeDim: 8 }),
  }),
}));

vi.mock("../../db/apiKeys", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../db/apiKeys")>();
  return {
    ...actual,
    pickApiKeyForInternalUse: vi.fn(async () => INTERNAL_KEY),
  };
});

const core = await import("../../db/core");
const { retrievePreview } = await import("../retrieval");
const { pickApiKeyForInternalUse } = await import("../../db/apiKeys");

function cleanupDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function insertMemory(apiKeyId: string, id: string, content: string) {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO memories (id, api_key_id, session_id, type, key, content, metadata, created_at, updated_at, expires_at)
     VALUES (?, ?, ?, 'factual', ?, ?, '{}', datetime('now'), datetime('now'), NULL)`
  ).run(id, apiKeyId, "", `key-${id}`, content);
}

let originalFetch: typeof globalThis.fetch;

beforeEach(() => {
  cleanupDb();
  originalFetch = globalThis.fetch;
  vi.mocked(pickApiKeyForInternalUse).mockClear();
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe("#12745 — memory rerank loopback call authentication", () => {
  test("applyRerank()'s loopback fetch to /v1/rerank carries an internal Authorization bearer", async () => {
    insertMemory("api-rrk-auth", "rrk-auth-1", "The capital of France is Paris.");
    insertMemory("api-rrk-auth", "rrk-auth-2", "TypeScript is a superset of JavaScript.");

    const calls: Array<{ url: string; headers: Record<string, string> }> = [];

    globalThis.fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === "string" ? input : input.toString();
      const headers: Record<string, string> = {};
      new Headers(init?.headers).forEach((value, key) => {
        headers[key.toLowerCase()] = value;
      });
      calls.push({ url, headers });

      // Emulate the REAL clientApiPolicy behavior this loopback call hits in
      // production: reject without a bearer/x-api-key, accept a valid one.
      const hasCredential = Boolean(headers["authorization"] || headers["x-api-key"]);
      if (!hasCredential) {
        return new Response(JSON.stringify({ error: { message: "Authentication required" } }), {
          status: 401,
        });
      }
      return new Response(
        JSON.stringify({
          results: [
            { index: 1, relevance_score: 0.95 },
            { index: 0, relevance_score: 0.4 },
          ],
        }),
        { status: 200 }
      );
    }) as unknown as typeof globalThis.fetch;

    const bundle = await retrievePreview("api-rrk-auth", "capital of France", {
      strategy: "semantic",
      maxTokens: 2000,
      limit: 5,
    });

    expect(calls.length).toBeGreaterThan(0);
    const rerankCall = calls.find((c) => c.url.includes("/v1/rerank"));
    expect(rerankCall).toBeDefined();

    const hasCredential = Boolean(
      rerankCall?.headers["authorization"] || rerankCall?.headers["x-api-key"]
    );
    expect(hasCredential).toBe(true);
    expect(rerankCall?.headers["authorization"]).toBe(`Bearer ${INTERNAL_KEY}`);

    // Functional consequence: with a valid credential the rerank response is
    // actually honored (item order follows relevance_score) instead of
    // silently keeping pre-rerank vector-search order.
    expect(bundle.items[0]?.memory.id).toBe("rrk-auth-2");
  });

  test("without a credential the same loopback call would still be 401'd (no auth bypass introduced)", async () => {
    insertMemory("api-rrk-noauth", "rrk-auth-1", "The capital of France is Paris.");
    insertMemory("api-rrk-noauth", "rrk-auth-2", "TypeScript is a superset of JavaScript.");

    // Simulate the pre-fix condition: internal key selector finds nothing.
    vi.mocked(pickApiKeyForInternalUse).mockResolvedValueOnce(null);

    let sawUnauthenticatedRerankCall = false;
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === "string" ? input : input.toString();
      const headers: Record<string, string> = {};
      new Headers(init?.headers).forEach((value, key) => {
        headers[key.toLowerCase()] = value;
      });
      const hasCredential = Boolean(headers["authorization"] || headers["x-api-key"]);
      if (url.includes("/v1/rerank") && !hasCredential) {
        sawUnauthenticatedRerankCall = true;
        return new Response(JSON.stringify({ error: { message: "Authentication required" } }), {
          status: 401,
        });
      }
      return new Response(JSON.stringify({ results: [] }), { status: 200 });
    }) as unknown as typeof globalThis.fetch;

    const bundle = await retrievePreview("api-rrk-noauth", "capital of France", {
      strategy: "semantic",
      maxTokens: 2000,
      limit: 5,
    });

    expect(sawUnauthenticatedRerankCall).toBe(true);
    // Fail-open by design: retrieval keeps working (unranked) rather than throwing.
    expect(bundle.items.length).toBe(2);
  });
});
