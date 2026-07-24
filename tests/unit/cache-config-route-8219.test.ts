import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression guard for #8219: the cache-config route imported
// `updateSettings`/`getDatabaseSettings`/`updateDatabaseSettings` from a
// non-existent module (`@/lib/localDb/databaseSettings`) and called an
// undefined `updateSettings` in PUT. Any request crashed the route with a
// ReferenceError before this fix. This test proves:
//   1. The route module resolves without throwing on import.
//   2. GET/PUT resolve without crashing.
//   3. `modelCatalogCacheTtlMs` round-trips through PUT then GET.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cache-config-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
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

test("cache-config route resolves and modelCatalogCacheTtlMs round-trips", async (t) => {
  // Importing the route module must not throw (RED before the fix: the
  // module-level import of a nonexistent path crashed at import time).
  const cacheConfigRoute = await import("../../src/app/api/settings/cache-config/route.ts");

  await t.test("GET resolves without crashing and returns defaults", async () => {
    const response = await cacheConfigRoute.GET(makeJsonRequest("GET") as never);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(typeof body.modelCatalogCacheTtlMs, "number");
  });

  await t.test("PUT resolves without crashing and persists the new TTL", async () => {
    const putResponse = await cacheConfigRoute.PUT(
      makeJsonRequest("PUT", { modelCatalogCacheTtlMs: 4242 }) as never
    );
    const putBody = await putResponse.json();

    assert.equal(putResponse.status, 200);
    assert.equal(putBody.ok, true);

    const getResponse = await cacheConfigRoute.GET(makeJsonRequest("GET") as never);
    const getBody = await getResponse.json();

    assert.equal(getResponse.status, 200);
    assert.equal(getBody.modelCatalogCacheTtlMs, 4242, "modelCatalogCacheTtlMs must round-trip");
  });

  await t.test("PUT persists idempotencyWindowMs via the flat settings module", async () => {
    const putResponse = await cacheConfigRoute.PUT(
      makeJsonRequest("PUT", { idempotencyWindowMs: 9000 }) as never
    );
    assert.equal(putResponse.status, 200);

    const getResponse = await cacheConfigRoute.GET(makeJsonRequest("GET") as never);
    const getBody = await getResponse.json();
    assert.equal(getBody.idempotencyWindowMs, 9000);
  });
});
