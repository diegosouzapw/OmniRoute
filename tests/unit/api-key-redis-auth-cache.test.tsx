import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterAll, describe, expect, it, vi } from "vitest";

// A Redis that always claims the credential is valid, and whose DEL fails.
const store = new Map<string, string>();
vi.mock("@/shared/utils/rateLimiter", () => ({
  isRedisConfigured: () => true,
  getRedisClient: async () => ({
    get: async (k: string) => store.get(k) ?? null,
    set: async (k: string, v: string) => {
      store.set(k, v);
    },
    del: async () => {
      throw new Error("redis down");
    },
  }),
}));

let apiKeys: typeof import("@/lib/db/apiKeys");
let core: typeof import("@/lib/db/core") | undefined;
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-redis-auth-"));

// The DB captures DATA_DIR at import time. Isolate it before collection-time imports,
// and restore every environment override even if compilation or initialization fails.
vi.stubEnv("DATA_DIR", dataDir);
vi.stubEnv("API_KEY_SECRET", "test-api-key-secret-0123456789abcdef");
vi.stubEnv("NODE_ENV", "production");
vi.stubEnv("OMNIROUTE_DISABLE_REDIS_AUTH_CACHE", undefined);

function cleanupFixture() {
  try {
    core?.resetDbInstance();
  } finally {
    try {
      fs.rmSync(dataDir, { recursive: true, force: true });
    } finally {
      vi.unstubAllEnvs();
    }
  }
}

// Cold Vite transforms belong to collection, not the beforeAll hook's runtime budget.
// The existing security assertions and per-test/job timeouts remain unchanged.
try {
  core = await import("@/lib/db/core");
  expect(core.DATA_DIR).toBe(dataDir);
  apiKeys = await import("@/lib/db/apiKeys");
} catch (error) {
  cleanupFixture();
  throw error;
}

afterAll(cleanupFixture);

describe("API-key validation with the Redis auth cache (GHSA-66vh-35g3-78qv)", () => {
  it("rejects a revoked key even when Redis still holds a positive entry and DEL fails", async () => {
    const created = await apiKeys.createApiKey("redis-revoke", "machine-1");
    expect(await apiKeys.validateApiKey(created.key)).toBe(true);
    expect(store.size).toBeGreaterThan(0);

    await apiKeys.revokeApiKey(created.id);
    // The stale positive entry is still there; the process-local cache is cleared by revoke.
    expect(store.size).toBeGreaterThan(0);
    expect(await apiKeys.validateApiKey(created.key)).toBe(false);
  });

  it("rejects the old credential after regeneration when the Redis entry survives", async () => {
    const created = await apiKeys.createApiKey("redis-regen", "machine-1");
    expect(await apiKeys.validateApiKey(created.key)).toBe(true);

    await apiKeys.regenerateApiKey(created.id);
    expect(await apiKeys.validateApiKey(created.key)).toBe(false);
  });
});
