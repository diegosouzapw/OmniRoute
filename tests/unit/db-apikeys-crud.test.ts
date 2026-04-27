import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-apikeys-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "task-303-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("createApiKey requires machineId and returns a persisted key with defaults", async () => {
  await assert.rejects(
    () => apiKeysDb.createApiKey("missing-machine", ""),
    /machineId is required/
  );

  const created = await apiKeysDb.createApiKey("Primary Key", "machine-303");
  const allKeys = await apiKeysDb.getApiKeys();
  const byId = await apiKeysDb.getApiKeyById(created.id);

  assert.match(created.key, /^sk-machine-303-/);
  assert.equal(allKeys.length, 1);
  assert.equal(allKeys[0].name, "Primary Key");
  assert.deepEqual(allKeys[0].allowedModels, []);
  assert.deepEqual(byId.allowedConnections, []);
  assert.equal(byId.noLog, false);
  assert.equal(byId.autoResolve, false);
  assert.equal(byId.isActive, true);
  assert.equal(byId.maxSessions, 0);
});

test("updateApiKeyPermissions persists settings, schedule and rate limits", async () => {
  const created = await apiKeysDb.createApiKey("Scoped Key", "machine-303");
  const schedule = {
    enabled: true,
    from: "09:00",
    until: "18:00",
    days: [1, 2, 3, 4, 5],
    tz: "America/Sao_Paulo",
  };

  const updated = await apiKeysDb.updateApiKeyPermissions(created.id, {
    name: "Scoped Key v2",
    allowedModels: ["openai/*", "anthropic/claude-*"],
    allowedConnections: ["550e8400-e29b-41d4-a716-446655440000"],
    noLog: true,
    autoResolve: true,
    isActive: false,
    accessSchedule: schedule,
    maxRequestsPerDay: 1000,
    maxRequestsPerMinute: 15,
    maxSessions: -3,
  });
  const row = await apiKeysDb.getApiKeyById(created.id);
  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);

  assert.equal(updated, true);
  assert.equal(row.name, "Scoped Key v2");
  assert.deepEqual(row.allowedModels, ["openai/*", "anthropic/claude-*"]);
  assert.deepEqual(row.allowedConnections, ["550e8400-e29b-41d4-a716-446655440000"]);
  assert.equal(row.noLog, true);
  assert.equal(row.autoResolve, true);
  assert.equal(row.isActive, false);
  assert.deepEqual(row.accessSchedule, schedule);
  assert.equal(metadata.maxRequestsPerDay, 1000);
  assert.equal(metadata.maxRequestsPerMinute, 15);
  assert.equal(metadata.maxSessions, 0);
});

test("validateApiKey and deleteApiKey stay consistent after cache invalidation", async () => {
  const created = await apiKeysDb.createApiKey("Delete Me", "machine-303");

  assert.equal(await apiKeysDb.validateApiKey(created.key), true);
  assert.equal(await apiKeysDb.deleteApiKey("missing-id"), false);
  assert.equal(await apiKeysDb.deleteApiKey(created.id), true);
  assert.equal(await apiKeysDb.validateApiKey(created.key), false);
  assert.equal(await apiKeysDb.getApiKeyById(created.id), null);
  assert.equal(await apiKeysDb.getApiKeyMetadata(created.key), null);
});

test("isModelAllowedForKey supports exact, prefix and wildcard rules", async () => {
  const unrestricted = await apiKeysDb.createApiKey("Unrestricted", "machine-303");
  const restricted = await apiKeysDb.createApiKey("Restricted", "machine-303");

  await apiKeysDb.updateApiKeyPermissions(restricted.id, {
    allowedModels: ["openai/*", "anthropic/claude-*", "o*-mini"],
  });

  assert.equal(await apiKeysDb.isModelAllowedForKey(null, "any/model"), true);
  assert.equal(await apiKeysDb.isModelAllowedForKey(restricted.key, null), false);
  assert.equal(await apiKeysDb.isModelAllowedForKey("sk-invalid", "openai/gpt-4.1"), false);
  assert.equal(await apiKeysDb.isModelAllowedForKey(unrestricted.key, "provider/any-model"), true);
  assert.equal(await apiKeysDb.isModelAllowedForKey(restricted.key, "openai/gpt-4.1"), true);
  assert.equal(
    await apiKeysDb.isModelAllowedForKey(restricted.key, "anthropic/claude-3-7-sonnet"),
    true
  );
  assert.equal(await apiKeysDb.isModelAllowedForKey(restricted.key, "o3-mini"), true);
  assert.equal(
    await apiKeysDb.isModelAllowedForKey(restricted.key, "gemini/gemini-2.5-pro"),
    false
  );
});

test("getApiKeyMetadata ignores malformed stored schedule payloads", async () => {
  const created = await apiKeysDb.createApiKey("Malformed Schedule", "machine-303");
  const db = core.getDbInstance();

  db.prepare("UPDATE api_keys SET access_schedule = ? WHERE id = ?").run("not-json", created.id);
  apiKeysDb.clearApiKeyCaches();

  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);

  assert.equal(metadata.accessSchedule, null);
});
