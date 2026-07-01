/**
 * Integration tests — Qdrant settings routes:
 *   GET/PUT /api/settings/qdrant
 *   GET     /api/settings/qdrant/health
 *   POST    /api/settings/qdrant/search
 *   POST    /api/settings/qdrant/cleanup
 *   GET     /api/settings/qdrant/embedding-models
 *
 * NOTE: Qdrant module functions are named ESM exports that cannot be mocked via mock.method.
 * Health/search/cleanup return "not_configured" when qdrant is disabled — which is the safe
 * default. We test the route layer (auth, validation, response shape) not the qdrant logic itself.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  makeManagementSessionRequest,
  createManagementSessionHeaders,
} from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-qdrant-routes-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret-qdrant-routes";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const memorySettings = await import("../../src/lib/memory/settings.ts");

// ── Route imports ──
const qdrantSettingsRoute = await import("../../src/app/api/settings/qdrant/route.ts");
const qdrantHealthRoute = await import(
  "../../src/app/api/settings/qdrant/health/route.ts"
);
const qdrantSearchRoute = await import(
  "../../src/app/api/settings/qdrant/search/route.ts"
);
const qdrantCleanupRoute = await import(
  "../../src/app/api/settings/qdrant/cleanup/route.ts"
);
const qdrantEmbeddingModelsRoute = await import(
  "../../src/app/api/settings/qdrant/embedding-models/route.ts"
);

// ── Helpers ──

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  // #5597 follow-up: the memory-settings cache is a module-level singleton that
  // survives per-test DB resets — bust it so each test starts from a clean read.
  memorySettings.invalidateMemorySettingsCache();
}

async function makeAuthRequest(
  method: "GET" | "POST" | "PUT",
  url: string,
  body?: unknown
) {
  return makeManagementSessionRequest(url, { method, body });
}

function makeUnauthRequest(method: "GET" | "POST" | "PUT", url: string, body?: unknown) {
  return new Request(url, {
    method,
    headers: body !== undefined ? { "Content-Type": "application/json" } : {},
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

async function setRequireLogin(enabled: boolean) {
  if (enabled) {
    await localDb.updateSettings({ requireLogin: true, password: "hashed-pw" });
  } else {
    await localDb.updateSettings({ requireLogin: false });
  }
}

// ── Test lifecycle ──

test.beforeEach(async () => {
  await resetStorage();
  await localDb.updateSettings({
    requireLogin: false,
    qdrantEnabled: false,
    qdrantHost: "",
    qdrantPort: 6333,
    qdrantCollection: "omniroute_memory",
    qdrantEmbeddingModel: "openai/text-embedding-3-small",
  });
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── Settings GET ──

test("GET /api/settings/qdrant — returns settings with masked API key shape", async () => {
  const req = await makeAuthRequest("GET", "http://localhost/api/settings/qdrant");
  const res = await qdrantSettingsRoute.GET(req as any);

  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(typeof body.enabled, "boolean", "enabled should be boolean");
  assert.strictEqual(typeof body.host, "string", "host should be string");
  assert.strictEqual(typeof body.port, "number", "port should be number");
  assert.strictEqual(typeof body.collection, "string", "collection should be string");
  assert.strictEqual(typeof body.embeddingModel, "string", "embeddingModel should be string");
  assert.strictEqual(typeof body.hasApiKey, "boolean", "hasApiKey should be boolean");
  // No raw apiKey field in response
  assert.strictEqual(body.apiKey, undefined, "raw apiKey must not be in response");
  // apiKeyMasked should be null when no key configured
  assert.strictEqual(body.apiKeyMasked, null, "apiKeyMasked should be null when no key set");
});

test("GET /api/settings/qdrant — 401 without auth", async () => {
  await setRequireLogin(true);
  const req = makeUnauthRequest("GET", "http://localhost/api/settings/qdrant");
  const res = await qdrantSettingsRoute.GET(req as any);
  assert.strictEqual(res.status, 401);
  await setRequireLogin(false);
});

// ── Settings PUT ──

test("PUT /api/settings/qdrant — updates settings and returns new masked shape", async () => {
  const req = await makeAuthRequest("PUT", "http://localhost/api/settings/qdrant", {
    enabled: true,
    host: "qdrant-server",
    port: 6333,
    collection: "test-collection",
    embeddingModel: "openai/text-embedding-3-small",
  });

  const res = await qdrantSettingsRoute.PUT(req as any);
  assert.strictEqual(res.status, 200);

  const body = await res.json();
  assert.strictEqual(body.enabled, true, "enabled should be true");
  assert.strictEqual(body.host, "qdrant-server", "host should be updated");
  assert.strictEqual(body.collection, "test-collection", "collection should be updated");
  assert.strictEqual(body.apiKey, undefined, "raw apiKey must not be in response");
});

// ── #5597: enabling Qdrant must also activate it as the engine ──
// Regression: retrieval only routes to Qdrant when memoryVectorStore === "qdrant"
// (retrieval.ts:342/470/694). The card only wrote `qdrantEnabled` and never the
// engine selector, so enabling Qdrant was inert — it stayed on the default "auto"
// (which never selects Qdrant). Enabling now also sets memoryVectorStore=qdrant.

test("PUT enabled=true also activates Qdrant as the engine (memoryVectorStore=qdrant)", async () => {
  const req = await makeAuthRequest("PUT", "http://localhost/api/settings/qdrant", {
    enabled: true,
    host: "qdrant-server",
    collection: "c",
  });
  const res = await qdrantSettingsRoute.PUT(req as any);
  assert.strictEqual(res.status, 200);

  const s = (await localDb.getSettings()) as Record<string, unknown>;
  assert.strictEqual(
    s.memoryVectorStore,
    "qdrant",
    "enabling Qdrant must select it as the active vector store, else it stays inert"
  );
});

test("PUT enabled=false resets the engine back to auto (sqlite-vec)", async () => {
  await qdrantSettingsRoute.PUT(
    (await makeAuthRequest("PUT", "http://localhost/api/settings/qdrant", {
      enabled: true,
      host: "qdrant-server",
      collection: "c",
    })) as any
  );
  await qdrantSettingsRoute.PUT(
    (await makeAuthRequest("PUT", "http://localhost/api/settings/qdrant", {
      enabled: false,
    })) as any
  );

  const s = (await localDb.getSettings()) as Record<string, unknown>;
  assert.strictEqual(
    s.memoryVectorStore,
    "auto",
    "disabling Qdrant must fall back to auto (sqlite-vec), not stay on qdrant"
  );
});

test("PUT without the enabled field must not change memoryVectorStore", async () => {
  // User already on qdrant; editing only the collection must not reset the engine.
  await localDb.updateSettings({ memoryVectorStore: "qdrant", qdrantEnabled: true });
  await qdrantSettingsRoute.PUT(
    (await makeAuthRequest("PUT", "http://localhost/api/settings/qdrant", {
      collection: "renamed",
    })) as any
  );

  const s = (await localDb.getSettings()) as Record<string, unknown>;
  assert.strictEqual(
    s.memoryVectorStore,
    "qdrant",
    "editing other fields must leave the engine selection untouched"
  );
});

// #5597 follow-up: writing memoryVectorStore to the DB is not enough — retrieval reads
// through getMemorySettings(), a module-level cache. The PUT handler must invalidate it
// so the engine switch takes effect without a process restart.
test("PUT enabled=true invalidates the memory-settings cache (retrieval sees qdrant, no restart)", async () => {
  // Warm the cache with the pre-toggle value (default auto → not qdrant).
  const before = await memorySettings.getMemorySettings();
  assert.notStrictEqual(
    before.vectorStore,
    "qdrant",
    "precondition: cache warmed with a non-qdrant vectorStore"
  );

  const res = await qdrantSettingsRoute.PUT(
    (await makeAuthRequest("PUT", "http://localhost/api/settings/qdrant", {
      enabled: true,
      host: "qdrant-server",
      collection: "c",
    })) as any
  );
  assert.strictEqual(res.status, 200);

  // Without the cache invalidation, getMemorySettings() would still return the stale
  // "auto" value and retrieval would keep routing to sqlite-vec until a restart.
  const after = await memorySettings.getMemorySettings();
  assert.strictEqual(
    after.vectorStore,
    "qdrant",
    "PUT must invalidate the memory-settings cache so retrieval routes to Qdrant without a restart"
  );
});

test("PUT /api/settings/qdrant — 400 invalid settings (invalid port type in strict schema)", async () => {
  const req = await makeAuthRequest("PUT", "http://localhost/api/settings/qdrant", {
    port: "not-a-number",
  });

  const res = await qdrantSettingsRoute.PUT(req as any);
  assert.strictEqual(res.status, 400);
  const body = await res.json();
  assert.ok(body.message || body.error, "should return error");
});

test("PUT /api/settings/qdrant — 401 without auth", async () => {
  await setRequireLogin(true);
  const req = makeUnauthRequest("PUT", "http://localhost/api/settings/qdrant", { enabled: true });
  const res = await qdrantSettingsRoute.PUT(req as any);
  assert.strictEqual(res.status, 401);
  await setRequireLogin(false);
});

// ── Health ──

test("GET /api/settings/qdrant/health — returns health result shape (qdrant disabled = not_configured)", async () => {
  const headers = await createManagementSessionHeaders();
  const req = new Request("http://localhost/api/settings/qdrant/health", {
    method: "GET",
    headers: Object.fromEntries(headers.entries()),
  });

  const res = await qdrantHealthRoute.GET(req as any);
  assert.strictEqual(res.status, 200);

  const body = await res.json();
  assert.strictEqual(typeof body.ok, "boolean", "ok should be boolean");
  assert.strictEqual(typeof body.latencyMs, "number", "latencyMs should be number");
  // When qdrant is disabled/unconfigured, ok=false with error "not_configured"
  assert.strictEqual(body.ok, false, "ok should be false when qdrant not configured");
});

test("GET /api/settings/qdrant/health — 401 without auth", async () => {
  await setRequireLogin(true);
  const req = makeUnauthRequest("GET", "http://localhost/api/settings/qdrant/health");
  const res = await qdrantHealthRoute.GET(req as any);
  assert.strictEqual(res.status, 401);
  await setRequireLogin(false);
});

// ── Search ──

test("POST /api/settings/qdrant/search — returns ok + results array", async () => {
  const req = await makeAuthRequest("POST", "http://localhost/api/settings/qdrant/search", {
    query: "test query",
    topK: 5,
  });

  const res = await qdrantSearchRoute.POST(req as any);
  assert.strictEqual(res.status, 200);

  const body = await res.json();
  assert.strictEqual(typeof body.ok, "boolean", "ok should be boolean");
  assert.ok(Array.isArray(body.results), "results should be an array");
});

test("POST /api/settings/qdrant/search — 400 invalid body (empty query)", async () => {
  const req = await makeAuthRequest("POST", "http://localhost/api/settings/qdrant/search", {
    query: "",
    topK: 5,
  });

  const res = await qdrantSearchRoute.POST(req as any);
  assert.strictEqual(res.status, 400);
  const body = await res.json();
  assert.ok(body.message || body.error, "should return error");
});

// ── Cleanup ──

test("POST /api/settings/qdrant/cleanup — returns ok + deletedCount + retentionDays", async () => {
  const req = await makeAuthRequest("POST", "http://localhost/api/settings/qdrant/cleanup");
  const res = await qdrantCleanupRoute.POST(req as any);

  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(typeof body.ok, "boolean", "ok should be boolean");
  assert.strictEqual(typeof body.deletedCount, "number", "deletedCount should be number");
  assert.strictEqual(typeof body.retentionDays, "number", "retentionDays should be number");
  assert.ok(body.retentionDays > 0, "retentionDays should be positive");
});

// ── Embedding models ──

test("GET /api/settings/qdrant/embedding-models — returns models array", async () => {
  const headers = await createManagementSessionHeaders();
  const req = new Request("http://localhost/api/settings/qdrant/embedding-models", {
    method: "GET",
    headers: Object.fromEntries(headers.entries()),
  });

  const res = await qdrantEmbeddingModelsRoute.GET(req as any);
  // 200 expected; verify shape
  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body.models), "should have models array");
  // Should have at least the default fallback model
  assert.ok(body.models.length > 0, "should have at least one model");
  const defaultModel = body.models.find((m: any) => m.value === "openai/text-embedding-3-small");
  assert.ok(defaultModel, "should include openai/text-embedding-3-small as default");
});

test("GET /api/settings/qdrant/embedding-models — 401 without auth", async () => {
  await setRequireLogin(true);
  const req = makeUnauthRequest("GET", "http://localhost/api/settings/qdrant/embedding-models");
  const res = await qdrantEmbeddingModelsRoute.GET(req as any);
  assert.strictEqual(res.status, 401);
  await setRequireLogin(false);
});

// ── Error sanitization ──

test("Qdrant routes — error response has no stack trace in body", async () => {
  // Test by sending malformed JSON to PUT settings — should return 400 without stack trace
  const headers = await createManagementSessionHeaders();
  const req = new Request("http://localhost/api/settings/qdrant", {
    method: "PUT",
    headers: Object.fromEntries(headers.entries()),
    body: "not-valid-json{{{",
  });

  const res = await qdrantSettingsRoute.PUT(req as any);
  assert.ok(res.status >= 400, "should return error status");

  const body = await res.json();
  const bodyStr = JSON.stringify(body);
  // Hard Rule #12: no stack trace in response body
  assert.ok(!bodyStr.match(/\sat\s\//), "response must not contain stack trace");
});
