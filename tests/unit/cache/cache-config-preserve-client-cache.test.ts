import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression guard: PUT /api/settings/cache-config persisted
// `alwaysPreserveClientCache` into the databaseSettings "cache" section, but
// the runtime (getCacheControlSettings → getSettings) reads the FLAT general
// settings key — so the endpoint accepted the value, GET echoed it back, and
// the router never changed behavior. This test proves the value written
// through the route is the one the cache-control policy actually consumes.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cache-config-flat-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeJsonRequest(method: string, body?: unknown): Request {
  return new Request("http://localhost/api/settings/cache-config", {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  resetStorage();
});

test("alwaysPreserveClientCache set via cache-config reaches the runtime read path", async (t) => {
  const cacheConfigRoute = await import("../../../src/app/api/settings/cache-config/route.ts");
  const { getSettings } = await import("../../../src/lib/db/settings.ts");
  const { getCacheControlSettings, invalidateCacheControlSettingsCache } =
    await import("../../../src/lib/cacheControlSettings.ts");

  await t.test("PUT persists to the flat settings the runtime reads", async () => {
    const putResponse = await cacheConfigRoute.PUT(
      makeJsonRequest("PUT", { alwaysPreserveClientCache: "always" }) as never
    );
    assert.equal(putResponse.status, 200);

    // The runtime read path: getCacheControlSettings() → getSettings() (flat).
    // RED before the fix: the route wrote databaseSettings "cache" instead,
    // so both of these still reported the default "auto".
    const flatSettings = await getSettings();
    assert.equal(flatSettings.alwaysPreserveClientCache, "always");

    invalidateCacheControlSettingsCache();
    assert.equal(await getCacheControlSettings(), "always");
  });

  await t.test("GET reports the flat value, not the ignored cache-section copy", async () => {
    // Seed a stale value in the databaseSettings "cache" section — the store
    // the runtime never reads. GET must not surface it.
    const { updateDatabaseSettings } = await import("../../../src/lib/db/databaseSettings.ts");
    updateDatabaseSettings({
      cache: { alwaysPreserveClientCache: "never" },
    } as Parameters<typeof updateDatabaseSettings>[0]);

    const putResponse = await cacheConfigRoute.PUT(
      makeJsonRequest("PUT", { alwaysPreserveClientCache: "always" }) as never
    );
    assert.equal(putResponse.status, 200);

    const getResponse = await cacheConfigRoute.GET(makeJsonRequest("GET") as never);
    const body = await getResponse.json();
    assert.equal(getResponse.status, 200);
    assert.equal(body.alwaysPreserveClientCache, "always");
  });
});
