import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-obsidian-config-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const { getApiKeyContextSource, setApiKeyContextSource, deleteApiKeyContextSource, listApiKeyContextSources } = await import("../../src/lib/db/apiKeyContextSources.ts");
const { getObsidianConfigForApiKey, setObsidianToken, setObsidianBaseUrl } = await import("../../src/lib/db/obsidian.ts");

async function resetStorage() {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function createTestApiKey(id: string, name: string) {
  const db = coreDb.getDbInstance();
  db.prepare(
    "INSERT OR IGNORE INTO api_keys (id, name, key, machine_id, scopes, created_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(id, name, `sk-test-${id}`, "test-machine", "[]", new Date().toISOString());
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("apiKeyContextSources: returns null for unknown apiKeyId", () => {
  const result = getApiKeyContextSource("unknown-id", "obsidian");
  assert.equal(result, null);
});

test("apiKeyContextSources: stores and retrieves per-key config", () => {
  createTestApiKey("key-1", "Test Key 1");
  setApiKeyContextSource("key-1", "obsidian", {
    baseUrl: "http://10.0.0.1:27123",
    token: "test-token-123",
    vaultPath: "/test/path",
    enabled: true,
  });
  const result = getApiKeyContextSource("key-1", "obsidian");
  assert.ok(result);
  assert.equal(result.baseUrl, "http://10.0.0.1:27123");
  assert.equal(result.token, "test-token-123");
  assert.equal(result.vaultPath, "/test/path");
  assert.equal(result.enabled, true);
  assert.equal(result.sourceType, "obsidian");
});

test("apiKeyContextSources: upsert updates existing config", () => {
  createTestApiKey("key-2", "Test Key 2");
  setApiKeyContextSource("key-2", "obsidian", { token: "v1", enabled: true });
  const first = getApiKeyContextSource("key-2", "obsidian");
  assert.equal(first?.token, "v1");

  setApiKeyContextSource("key-2", "obsidian", { token: "v2", baseUrl: "http://new:27123" });
  const second = getApiKeyContextSource("key-2", "obsidian");
  assert.equal(second?.token, "v2");
  assert.equal(second?.baseUrl, "http://new:27123");
});

test("apiKeyContextSources: returns null when disabled", () => {
  createTestApiKey("key-3", "Test Key 3");
  setApiKeyContextSource("key-3", "obsidian", { token: "tok", enabled: false });
  const result = getApiKeyContextSource("key-3", "obsidian");
  assert.equal(result, null);
});

test("apiKeyContextSources: delete removes config", () => {
  createTestApiKey("key-4", "Test Key 4");
  setApiKeyContextSource("key-4", "obsidian", { token: "tok", enabled: true });
  deleteApiKeyContextSource("key-4", "obsidian");
  const result = getApiKeyContextSource("key-4", "obsidian");
  assert.equal(result, null);
});

test("apiKeyContextSources: list returns all sources for a key", () => {
  createTestApiKey("key-5", "Test Key 5");
  setApiKeyContextSource("key-5", "obsidian", { token: "obs", enabled: true });
  setApiKeyContextSource("key-5", "notion", { token: "not", enabled: true });
  const results = listApiKeyContextSources("key-5");
  assert.equal(results.length, 2);
  const types = results.map(r => r.sourceType).sort();
  assert.deepEqual(types, ["notion", "obsidian"]);
});

test("getObsidianConfigForApiKey: falls back to global when no per-key config", () => {
  setObsidianToken("global-token-123");
  setObsidianBaseUrl("http://127.0.0.1:27123");

  const config = getObsidianConfigForApiKey("nonexistent-key");
  assert.equal(config.source, "global");
  assert.equal(config.token, "global-token-123");
  assert.equal(config.baseUrl, "http://127.0.0.1:27123");
});

test("getObsidianConfigForApiKey: falls back to global for null/undefined keyId", () => {
  setObsidianToken("global-token-456");
  setObsidianBaseUrl("http://127.0.0.1:27123");

  const c1 = getObsidianConfigForApiKey(null);
  assert.equal(c1.source, "global");
  assert.equal(c1.token, "global-token-456");

  const c2 = getObsidianConfigForApiKey(undefined);
  assert.equal(c2.source, "global");
});

test("getObsidianConfigForApiKey: uses per-key config when available", () => {
  createTestApiKey("key-perkey", "Per-Key Test");
  setObsidianToken("global-token-789");
  setObsidianBaseUrl("http://127.0.0.1:27123");

  setApiKeyContextSource("key-perkey", "obsidian", {
    baseUrl: "http://10.0.0.1:27123",
    token: "per-key-token",
    vaultPath: "/custom/path",
    enabled: true,
  });

  const config = getObsidianConfigForApiKey("key-perkey");
  assert.equal(config.source, "api_key");
  assert.equal(config.token, "per-key-token");
  assert.equal(config.baseUrl, "http://10.0.0.1:27123");
  assert.equal(config.vaultPath, "/custom/path");
});

test("getObsidianConfigForApiKey: per-key without baseUrl falls back to global baseUrl", () => {
  createTestApiKey("key-nobase", "No BaseUrl Test");
  setObsidianToken("global-token-abc");
  setObsidianBaseUrl("http://global:27123");

  setApiKeyContextSource("key-nobase", "obsidian", {
    token: "per-key-only",
    enabled: true,
  });

  const config = getObsidianConfigForApiKey("key-nobase");
  assert.equal(config.source, "api_key");
  assert.equal(config.token, "per-key-only");
  assert.equal(config.baseUrl, "http://global:27123");
});

test("getObsidianConfigForApiKey: disabled per-key falls back to global", () => {
  createTestApiKey("key-disabled", "Disabled Test");
  setObsidianToken("global-token-def");
  setObsidianBaseUrl("http://127.0.0.1:27123");

  setApiKeyContextSource("key-disabled", "obsidian", {
    token: "disabled-token",
    enabled: false,
  });

  const config = getObsidianConfigForApiKey("key-disabled");
  assert.equal(config.source, "global");
  assert.equal(config.token, "global-token-def");
});
