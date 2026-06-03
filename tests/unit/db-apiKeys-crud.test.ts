/**
 * Tests for src/lib/db/apiKeys.ts — API key lifecycle, validation, caching, wildcard matching.
 *
 * Coverage targets:
 *   - createApiKey, getApiKeys, getApiKeyById
 *   - validateApiKey (env key, DB-backed, cache, banned/revoked/expired/inactive)
 *   - getApiKeyMetadata (env key, DB-backed, cache)
 *   - isModelAllowedForKey (no restrictions, exact, prefix, wildcard, group deny)
 *   - updateApiKeyPermissions (all field types, scopes with transaction)
 *   - deleteApiKey, revokeApiKey, setApiKeyExpiry, regenerateApiKey
 *   - clearApiKeyCaches, resetApiKeyState
 *   - matchesWildcardPattern (unit-level)
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-apikeys-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-for-crc-operations-do-not-use-in-prod";

const core = await import("../../src/lib/db/core.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");

async function resetStorage() {
  apiKeys.resetApiKeyState();
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 50 * (attempt + 1)));
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance();
}

await resetStorage();

// ──────────────── createApiKey ────────────────

test("createApiKey creates a key and returns it with id, key, name, machineId", async () => {
  await resetStorage();
  const key = await apiKeys.createApiKey("Test Key", "machine-001");
  assert.ok(key.id);
  assert.ok(key.key);
  assert.ok(key.key.startsWith("omni_") || key.key.length > 0);
  assert.equal(key.name, "Test Key");
  assert.equal(key.machineId, "machine-001");
});

test("createApiKey with scopes stores them", async () => {
  await resetStorage();
  const key = await apiKeys.createApiKey("Scoped Key", "machine-002", ["read", "write"]);
  assert.ok(key.id);
  assert.deepEqual(key.scopes, ["read", "write"]);
});

test("createApiKey rejects empty machineId", async () => {
  await resetStorage();
  await assert.rejects(
    () => apiKeys.createApiKey("Bad Key", ""),
    { message: /machineId is required/i }
  );
});

// ──────────────── getApiKeys ────────────────

test("getApiKeys returns empty array when no keys exist", async () => {
  await resetStorage();
  const keys = await apiKeys.getApiKeys();
  assert.deepEqual(keys, []);
});

test("getApiKeys returns all created keys", async () => {
  await resetStorage();
  await apiKeys.createApiKey("Key A", "ma-001");
  await apiKeys.createApiKey("Key B", "ma-002");
  const all = await apiKeys.getApiKeys();
  assert.equal(all.length, 2);
  const names = all.map((k) => k.name).sort();
  assert.deepEqual(names, ["Key A", "Key B"]);
});

// ──────────────── getApiKeyById ────────────────

test("getApiKeyById returns key by id", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Find Me", "ma-003");
  const loaded = await apiKeys.getApiKeyById(created.id);
  assert.ok(loaded !== null);
  assert.equal(loaded!.name, "Find Me");
  assert.equal(loaded!.id, created.id);
  assert.equal(loaded!.machineId, "ma-003");
});

test("getApiKeyById returns null for missing id", async () => {
  await resetStorage();
  const loaded = await apiKeys.getApiKeyById("no-such-id");
  assert.equal(loaded, null);
});

// ──────────────── validateApiKey ────────────────

test("validateApiKey returns false for null / undefined / empty", async () => {
  await resetStorage();
  assert.equal(await apiKeys.validateApiKey(null), false);
  assert.equal(await apiKeys.validateApiKey(undefined), false);
  assert.equal(await apiKeys.validateApiKey(""), false);
});

test("validateApiKey returns true for env key", async () => {
  await resetStorage();
  const prev = process.env.OMNIROUTE_API_KEY;
  process.env.OMNIROUTE_API_KEY = "env-key-test-abc123";
  try {
    assert.equal(await apiKeys.validateApiKey("env-key-test-abc123"), true);
  } finally {
    process.env.OMNIROUTE_API_KEY = prev;
  }
});

test("validateApiKey returns true for valid key", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Valid Key", "ma-004");
  assert.equal(await apiKeys.validateApiKey(created.key), true);
});

test("validateApiKey returns false for non-existent key", async () => {
  await resetStorage();
  assert.equal(await apiKeys.validateApiKey("omni_nonexistent_key_abc123"), false);
});

test("validateApiKey returns false for banned key", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Banned Soon", "ma-005");
  await apiKeys.updateApiKeyPermissions(created.id, { isBanned: true });

  // Caches may still hold the old valid state — validateApiKey should check DB
  // after cache miss; call resetApiKeyState() to clear caches for a fresh read.
  apiKeys.resetApiKeyState();
  assert.equal(await apiKeys.validateApiKey(created.key), false);
});

test("validateApiKey returns false for revoked key", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Revoked Soon", "ma-006");
  await apiKeys.revokeApiKey(created.id);
  apiKeys.resetApiKeyState();
  assert.equal(await apiKeys.validateApiKey(created.key), false);
});

test("validateApiKey returns false for expired key", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Expiring Soon", "ma-007");
  await apiKeys.setApiKeyExpiry(created.id, "2020-01-01T00:00:00Z");
  apiKeys.resetApiKeyState();
  assert.equal(await apiKeys.validateApiKey(created.key), false);
});

test("validateApiKey returns false for inactive key", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Inactive Soon", "ma-008");
  await apiKeys.updateApiKeyPermissions(created.id, { isActive: false });
  apiKeys.resetApiKeyState();
  assert.equal(await apiKeys.validateApiKey(created.key), false);
});

// ──────────────── getApiKeyMetadata ────────────────

test("getApiKeyMetadata returns null for null / undefined / empty", async () => {
  await resetStorage();
  assert.equal(await apiKeys.getApiKeyMetadata(null), null);
  assert.equal(await apiKeys.getApiKeyMetadata(undefined), null);
  assert.equal(await apiKeys.getApiKeyMetadata(""), null);
});

test("getApiKeyMetadata returns env-key record for env key", async () => {
  await resetStorage();
  const prev = process.env.OMNIROUTE_API_KEY;
  process.env.OMNIROUTE_API_KEY = "env-key-meta-001";
  try {
    const meta = await apiKeys.getApiKeyMetadata("env-key-meta-001");
    assert.ok(meta !== null);
    assert.equal(meta!.id, "env-key");
    assert.equal(meta!.name, "Environment Key");
    assert.ok(meta!.scopes.includes("manage"));
    assert.equal(meta!.isActive, true);
  } finally {
    process.env.OMNIROUTE_API_KEY = prev;
  }
});

test("getApiKeyMetadata returns metadata for valid key", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Meta Key", "ma-009");
  const meta = await apiKeys.getApiKeyMetadata(created.key);
  assert.ok(meta !== null);
  assert.equal(meta!.id, created.id);
  assert.equal(meta!.name, "Meta Key");
  assert.equal(meta!.machineId, "ma-009");
  assert.deepEqual(meta!.allowedModels, []);
  assert.equal(meta!.noLog, false);
  assert.equal(meta!.isActive, true);
});

test("getApiKeyMetadata returns null for non-existent key", async () => {
  await resetStorage();
  assert.equal(await apiKeys.getApiKeyMetadata("omni_meta_nonexistent"), null);
});

// ──────────────── isModelAllowedForKey ────────────────

test("isModelAllowedForKey returns true when no key provided", async () => {
  await resetStorage();
  assert.equal(await apiKeys.isModelAllowedForKey(null, "gpt-4"), true);
  assert.equal(await apiKeys.isModelAllowedForKey(undefined, "gpt-4"), true);
});

test("isModelAllowedForKey returns false when no modelId provided", async () => {
  await resetStorage();
  assert.equal(await apiKeys.isModelAllowedForKey("some-key", null), false);
  assert.equal(await apiKeys.isModelAllowedForKey("some-key", undefined), false);
});

test("isModelAllowedForKey returns false for non-existent key", async () => {
  await resetStorage();
  assert.equal(await apiKeys.isModelAllowedForKey("omni_bogus_key", "gpt-4"), false);
});

test("isModelAllowedForKey returns true when allowedModels is unrestricted (empty)", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Unrestricted", "ma-010");
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "gpt-4"), true);
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "claude-opus-4"), true);
});

test("isModelAllowedForKey exact match", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Exact", "ma-011");
  await apiKeys.updateApiKeyPermissions(created.id, { allowedModels: ["gpt-4", "claude-3"] });
  apiKeys.resetApiKeyState();
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "gpt-4"), true);
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "claude-3"), true);
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "gpt-5"), false);
});

test("isModelAllowedForKey prefix match (/*)", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Prefix", "ma-012");
  await apiKeys.updateApiKeyPermissions(created.id, { allowedModels: ["openai/*"] });
  apiKeys.resetApiKeyState();
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "openai/gpt-4"), true);
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "openai/gpt-5"), true);
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "anthropic/claude-3"), false);
});

test("isModelAllowedForKey wildcard match", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Wildcard", "ma-013");
  // Pattern "gpt-*-turbo" should match "gpt-4-turbo" but not "gpt-4"
  await apiKeys.updateApiKeyPermissions(created.id, { allowedModels: ["gpt-*-turbo"] });
  apiKeys.resetApiKeyState();
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "gpt-4-turbo"), true);
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "gpt-4"), false);
});

// ──────────────── updateApiKeyPermissions ────────────────

test("updateApiKeyPermissions updates name", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Old Name", "ma-020");
  const result = await apiKeys.updateApiKeyPermissions(created.id, { name: "New Name" });
  assert.equal(result, true);
  const loaded = await apiKeys.getApiKeyById(created.id);
  assert.equal(loaded!.name, "New Name");
});

test("updateApiKeyPermissions toggles isActive", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Toggle Key", "ma-021");
  assert.equal((await apiKeys.getApiKeyById(created.id))!.isActive, true);
  await apiKeys.updateApiKeyPermissions(created.id, { isActive: false });
  assert.equal((await apiKeys.getApiKeyById(created.id))!.isActive, false);
  await apiKeys.updateApiKeyPermissions(created.id, { isActive: true });
  assert.equal((await apiKeys.getApiKeyById(created.id))!.isActive, true);
});

test("updateApiKeyPermissions toggles noLog", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("NoLog Key", "ma-022");
  await apiKeys.updateApiKeyPermissions(created.id, { noLog: true });
  assert.equal((await apiKeys.getApiKeyById(created.id))!.noLog, true);
});

test("updateApiKeyPermissions sets isBanned", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Ban Key", "ma-023");
  await apiKeys.updateApiKeyPermissions(created.id, { isBanned: true });
  assert.equal((await apiKeys.getApiKeyById(created.id))!.isBanned, true);
  await apiKeys.updateApiKeyPermissions(created.id, { isBanned: false });
  assert.equal((await apiKeys.getApiKeyById(created.id))!.isBanned, false);
});

test("updateApiKeyPermissions sets accessSchedule", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Scheduled", "ma-024");
  const schedule = {
    enabled: true,
    from: "09:00",
    until: "17:00",
    days: [1, 2, 3, 4, 5],
    tz: "America/New_York",
  };
  await apiKeys.updateApiKeyPermissions(created.id, { accessSchedule: schedule });
  const loaded = await apiKeys.getApiKeyById(created.id);
  assert.deepEqual(loaded!.accessSchedule, schedule);
});

test("updateApiKeyPermissions clears accessSchedule with null", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Clear Schedule", "ma-025");
  await apiKeys.updateApiKeyPermissions(created.id, {
    accessSchedule: { enabled: true, from: "00:00", until: "23:59", days: [0], tz: "UTC" },
  });
  assert.ok((await apiKeys.getApiKeyById(created.id))!.accessSchedule !== null);
  await apiKeys.updateApiKeyPermissions(created.id, { accessSchedule: null });
  assert.equal((await apiKeys.getApiKeyById(created.id))!.accessSchedule, null);
});

test("updateApiKeyPermissions sets rateLimits", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Rate Limited", "ma-026");
  const limits = [{ limit: 100, window: 60 }, { limit: 1000, window: 3600 }];
  await apiKeys.updateApiKeyPermissions(created.id, { rateLimits: limits });
  const loaded = await apiKeys.getApiKeyById(created.id);
  assert.deepEqual(loaded!.rateLimits, limits);
});

test("updateApiKeyPermissions sets maxSessions", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Session Limit", "ma-027");
  await apiKeys.updateApiKeyPermissions(created.id, { maxSessions: 5 });
  // maxSessions is not exposed in the getApiKeyById return type directly,
  // but is part of metadata — verify via getApiKeyMetadata
  const meta = await apiKeys.getApiKeyMetadata(created.key);
  assert.ok(meta);
  assert.equal(meta!.maxSessions, 5);
});

test("updateApiKeyPermissions with legacy array format sets allowedModels", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Legacy Format", "ma-028");
  const result = await apiKeys.updateApiKeyPermissions(created.id, ["model-a", "model-b"]);
  assert.equal(result, true);
  const loaded = await apiKeys.getApiKeyById(created.id);
  assert.deepEqual(loaded!.allowedModels, ["model-a", "model-b"]);
});

test("updateApiKeyPermissions updates scopes", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Scopes Update", "ma-029");
  const result = await apiKeys.updateApiKeyPermissions(created.id, { scopes: ["read", "manage"] });
  assert.equal(result, true);
  const loaded = await apiKeys.getApiKeyById(created.id);
  assert.deepEqual(loaded!.scopes, ["read", "manage"]);
});

test("updateApiKeyPermissions empty update returns false", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("No Changes", "ma-030");
  const result = await apiKeys.updateApiKeyPermissions(created.id, {});
  assert.equal(result, false);
});

test("updateApiKeyPermissions non-existent id returns false", async () => {
  await resetStorage();
  const result = await apiKeys.updateApiKeyPermissions("no-such-key", {
    name: "Wont Work",
  });
  assert.equal(result, false);
});

// ──────────────── deleteApiKey ────────────────

test("deleteApiKey deletes existing key", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Delete Me", "ma-040");
  const result = await apiKeys.deleteApiKey(created.id);
  assert.equal(result, true);
  const loaded = await apiKeys.getApiKeyById(created.id);
  assert.equal(loaded, null);
});

test("deleteApiKey non-existent id returns false", async () => {
  await resetStorage();
  const result = await apiKeys.deleteApiKey("no-such-id");
  assert.equal(result, false);
});

// ──────────────── revokeApiKey ────────────────

test("revokeApiKey revokes existing key", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Revoke Me", "ma-050");
  const result = await apiKeys.revokeApiKey(created.id);
  assert.equal(result, true);
  const loaded = await apiKeys.getApiKeyById(created.id);
  assert.ok(loaded !== null);
  assert.equal(loaded!.isActive, false);
  assert.ok(loaded!.revokedAt);
});

test("revokeApiKey non-existent id returns false", async () => {
  await resetStorage();
  assert.equal(await apiKeys.revokeApiKey("no-such-id"), false);
});

test("revokeApiKey double revoke is idempotent", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Double Revoke", "ma-051");
  assert.equal(await apiKeys.revokeApiKey(created.id), true);
  assert.equal(await apiKeys.revokeApiKey(created.id), true);
});

// ──────────────── setApiKeyExpiry ────────────────

test("setApiKeyExpiry sets expiry on existing key", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Expiry Test", "ma-060");
  const result = await apiKeys.setApiKeyExpiry(created.id, "2030-12-31T23:59:59Z");
  assert.equal(result, true);
  const meta = await apiKeys.getApiKeyMetadata(created.key);
  assert.ok(meta);
  assert.equal(meta!.expiresAt, "2030-12-31T23:59:59Z");
});

test("setApiKeyExpiry clears expiry with null", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Clear Expiry", "ma-061");
  await apiKeys.setApiKeyExpiry(created.id, "2030-01-01T00:00:00Z");
  await apiKeys.setApiKeyExpiry(created.id, null);
  const meta = await apiKeys.getApiKeyMetadata(created.key);
  assert.ok(meta);
  assert.equal(meta!.expiresAt, null);
});

test("setApiKeyExpiry non-existent id returns false", async () => {
  await resetStorage();
  assert.equal(await apiKeys.setApiKeyExpiry("no-such-id", "2030-01-01T00:00:00Z"), false);
});

// ──────────────── regenerateApiKey ────────────────

test("regenerateApiKey regenerates key", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Regen Key", "ma-070");
  const oldKey = created.key;
  const result = await apiKeys.regenerateApiKey(created.id);
  assert.ok(result !== null);
  assert.equal(result!.id, created.id);
  assert.ok(result!.key);
  assert.notEqual(result!.key, oldKey);
});

test("regenerateApiKey non-existent id returns null", async () => {
  await resetStorage();
  assert.equal(await apiKeys.regenerateApiKey("no-such-id"), null);
});

// ──────────────── clearApiKeyCaches / resetApiKeyState ────────────────

test("clearApiKeyCaches and resetApiKeyState do not throw", async () => {
  await resetStorage();
  // Fill caches with some activity
  const created = await apiKeys.createApiKey("Cache Test", "ma-080");
  await apiKeys.validateApiKey(created.key);
  await apiKeys.getApiKeyMetadata(created.key);

  // Should not throw
  apiKeys.clearApiKeyCaches();
  apiKeys.resetApiKeyState();
  assert.ok(true);
});

// ──────────────── matchesWildcardPattern (unit-level) ────────────────

test("matchesWildcardPattern exact match", async () => {
  // Directly test the underlying function logic via isModelAllowedForKey
  await resetStorage();
  const created = await apiKeys.createApiKey("Wild Exact", "ma-090");
  await apiKeys.updateApiKeyPermissions(created.id, { allowedModels: ["openai/gpt-4"] });
  apiKeys.resetApiKeyState();
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "openai/gpt-4"), true);
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "openai/claude"), false);
});

test("isModelAllowedForKey segment count mismatch via matchesWildcardPattern", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Wild Segments", "ma-091");
  await apiKeys.updateApiKeyPermissions(created.id, { allowedModels: ["openai/gpt-*"] });
  apiKeys.resetApiKeyState();
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "openai/gpt-4"), true);
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "openai/gpt-4/sub"), false);
});

test("matchesWildcardPattern wildcard within segment", async () => {
  // Pattern "gpt-*-turbo" should match "gpt-4-turbo" but not "gpt-4"
  await resetStorage();
  const created = await apiKeys.createApiKey("Wild Within", "ma-092");
  await apiKeys.updateApiKeyPermissions(created.id, { allowedModels: ["gpt-*-turbo"] });
  apiKeys.resetApiKeyState();
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "gpt-4-turbo"), true);
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "gpt-5-turbo"), true);
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "gpt-4"), false);
});

test("matchesWildcardPattern pattern with only *", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Wild Star", "ma-093");
  await apiKeys.updateApiKeyPermissions(created.id, { allowedModels: ["openai/*"] });
  apiKeys.resetApiKeyState();
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "openai/anything"), true);
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "openai/"), true);
});

test("matchesWildcardPattern multiple segments with wildcards", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Wild Multi", "ma-094");
  await apiKeys.updateApiKeyPermissions(created.id, { allowedModels: ["openai/*/turbo"] });
  apiKeys.resetApiKeyState();
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "openai/gpt-4/turbo"), true);
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "openai/gpt-5/turbo"), true);
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "openai/gpt-4"), false);
});
