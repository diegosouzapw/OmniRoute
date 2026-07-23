/**
 * Integration tests — GET /api/memory/embedding-providers
 * Tests: 200 + providers array with hasKey boolean, 401 unauth.
 *
 * NOTE: listEmbeddingProviders() is a named ESM export that cannot be redefined via mock.method.
 * We test it with the real function (which returns an empty or populated list based on DB state).
 * The key assertions are structural (each provider has hasKey: boolean) not content-specific.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createManagementSessionHeaders } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-embedding-providers-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret-embedding-providers";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");

// Import route AFTER setting DATA_DIR
const embeddingProvidersRoute = await import(
  "../../src/app/api/memory/embedding-providers/route.ts"
);
const { GET } = embeddingProvidersRoute;

// ── Helpers ──

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

// ── Test lifecycle ──

test.beforeEach(async () => {
  await resetStorage();
  await localDb.updateSettings({ requireLogin: false });
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── Tests ──

test("GET /api/memory/embedding-providers — 200 + providers array with hasKey boolean", async () => {
  const headers = await createManagementSessionHeaders();
  const req = new Request("http://localhost/api/memory/embedding-providers", {
    method: "GET",
    headers: Object.fromEntries(headers.entries()),
  });

  const res = await GET(req);
  assert.strictEqual(res.status, 200);

  const body = await res.json();
  assert.ok(Array.isArray(body.providers), "should have providers array");

  // Each provider in the list must have required fields
  for (const provider of body.providers) {
    assert.ok(typeof provider.provider === "string", "provider should have name string");
    assert.strictEqual(typeof provider.hasKey, "boolean", "provider should have hasKey boolean");
    assert.ok(Array.isArray(provider.models), "provider should have models array");

    for (const model of provider.models) {
      assert.ok(typeof model.id === "string", "model should have id string");
      assert.ok(typeof model.name === "string", "model should have name string");
    }
  }

  // listEmbeddingProviders returns static providers from EMBEDDING_PROVIDERS registry
  // — should have at least one provider (openai is hardcoded)
  assert.ok(body.providers.length > 0, "should have at least one provider in the registry");
});

test("GET /api/memory/embedding-providers — 401 without auth when requireLogin=true", async () => {
  await localDb.updateSettings({ requireLogin: true, password: "hashed-pw" });

  const req = new Request("http://localhost/api/memory/embedding-providers", {
    method: "GET",
  });

  const res = await GET(req);
  assert.strictEqual(res.status, 401);
});
