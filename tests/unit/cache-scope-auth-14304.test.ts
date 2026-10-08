/**
 * #14304 — a key scoped to read:cache must reach GET /api/cache, and a key
 * scoped to write:cache must reach DELETE /api/cache. Neither scope opens any
 * other management route, and a key with no cache scope still gets 401.
 * manage and admin keep working for both methods.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-cache-scope-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret-cache-scope";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const cacheRoute = await import("../../src/app/api/cache/route.ts");

async function seedAuthRequired() {
  process.env.JWT_SECRET = "test-jwt-secret-cache-scope";
  process.env.INITIAL_PASSWORD = "initial-pass";
  await settingsDb.updateSettings({ requireLogin: true });
}

function bearerRequest(method: string, key: string) {
  return new Request("http://localhost/api/cache", {
    method,
    headers: { authorization: `Bearer ${key}` },
  });
}

test.before(async () => {
  await seedAuthRequired();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("a read:cache key can GET /api/cache but cannot DELETE it", async () => {
  const created = await apiKeysDb.createApiKey("cache-reader", "machine-cache-read", [
    "read:cache",
  ]);

  const read = await cacheRoute.GET(bearerRequest("GET", created.key) as never);
  assert.equal(read.status, 200, "read:cache must reach the cache stats");

  const write = await cacheRoute.DELETE(bearerRequest("DELETE", created.key) as never);
  assert.equal(write.status, 401, "read:cache must not flush the cache");
});

test("a write:cache key can DELETE /api/cache but cannot GET it", async () => {
  const created = await apiKeysDb.createApiKey("cache-writer", "machine-cache-write", [
    "write:cache",
  ]);

  const write = await cacheRoute.DELETE(bearerRequest("DELETE", created.key) as never);
  assert.equal(write.status, 200, "write:cache must flush the cache");

  const read = await cacheRoute.GET(bearerRequest("GET", created.key) as never);
  assert.equal(read.status, 401, "write:cache must not read the cache stats");
});

test("a key with no cache scope is rejected for both methods", async () => {
  const created = await apiKeysDb.createApiKey("chat-only", "machine-chat-only", ["chat"]);

  const read = await cacheRoute.GET(bearerRequest("GET", created.key) as never);
  assert.equal(read.status, 401);

  const write = await cacheRoute.DELETE(bearerRequest("DELETE", created.key) as never);
  assert.equal(write.status, 401);
});

test("a manage key can both read and flush the cache", async () => {
  const created = await apiKeysDb.createApiKey("manager", "machine-manager", ["manage"]);

  const read = await cacheRoute.GET(bearerRequest("GET", created.key) as never);
  assert.equal(read.status, 200);

  const write = await cacheRoute.DELETE(bearerRequest("DELETE", created.key) as never);
  assert.equal(write.status, 200);
});
