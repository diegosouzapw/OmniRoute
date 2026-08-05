/**
 * Regression #8697: cold GET /v1/models must never block on a catalog rebuild
 * when a last-successful snapshot exists for that cache key.
 *
 * Before: SWR window was 30s and invalidateDbCache() cleared the memo map, so
 * every distinct API key paid a synchronous ~15s rebuild once the short TTL
 * (or a settings write) elapsed.
 *
 * After: expired / invalidated 200 snapshots are served immediately while a
 * single-flight background refresh rebuilds; only a true cold miss waits.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-8697-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-8697-secret";

const core = await import("../../src/lib/db/core.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

test.beforeEach(async () => {
  await resetStorage();
  // Opt into the production (unbounded) SWR window — under node:test the
  // module defaults to 0 so unrelated suites do not freeze between cases.
  v1ModelsCatalog.__setCatalogStaleWhileRevalidateMsForTest(
    v1ModelsCatalog.CATALOG_STALE_WHILE_REVALIDATE_MS
  );
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#8697 — expired snapshot far past the old 30s window is still served without waiting", async () => {
  const makeRequest = () => new Request("http://localhost/v1/models");

  const res1 = await v1ModelsCatalog.getUnifiedModelsResponse(makeRequest());
  assert.equal(res1.status, 200);
  const body1 = await res1.text();
  const runsAfterFirst = v1ModelsCatalog.__getCatalogBuilderRunsForTest();
  assert.equal(runsAfterFirst, 1);

  // Simulate an entry that previously fell past CATALOG_STALE_WHILE_REVALIDATE_MS
  // (was 30s) and forced a synchronous cold rebuild.
  v1ModelsCatalog.__expireCatalogCacheForTest(60_000);

  const res2 = await v1ModelsCatalog.getUnifiedModelsResponse(makeRequest());
  assert.equal(res2.status, 200);
  assert.equal(await res2.text(), body1);
  assert.equal(
    v1ModelsCatalog.__getCatalogBuilderRunsForTest(),
    runsAfterFirst,
    "response must not wait on a rebuild — builder runs stay at the first count until flush"
  );

  await v1ModelsCatalog.__flushCatalogBackgroundRefreshForTest();
  assert.equal(
    v1ModelsCatalog.__getCatalogBuilderRunsForTest(),
    runsAfterFirst + 1,
    "background refresh must still rebuild once"
  );
});

test("#8697 — invalidateDbCache serves last snapshot immediately (no cold wait)", async () => {
  const makeRequest = () => new Request("http://localhost/v1/models");

  const res1 = await v1ModelsCatalog.getUnifiedModelsResponse(makeRequest());
  assert.equal(res1.status, 200);
  const body1 = await res1.text();
  const runsAfterFirst = v1ModelsCatalog.__getCatalogBuilderRunsForTest();

  readCache.invalidateDbCache();

  const res2 = await v1ModelsCatalog.getUnifiedModelsResponse(makeRequest());
  assert.equal(res2.status, 200);
  assert.equal(
    await res2.text(),
    body1,
    "invalidation must stale-serve the previous 200, not block for a fresh build"
  );
  assert.equal(
    v1ModelsCatalog.__getCatalogBuilderRunsForTest(),
    runsAfterFirst,
    "builder must not have run yet at response time after invalidateDbCache"
  );

  await v1ModelsCatalog.__flushCatalogBackgroundRefreshForTest();
  assert.equal(
    v1ModelsCatalog.__getCatalogBuilderRunsForTest(),
    runsAfterFirst + 1,
    "background refresh must rebuild against the new DB state"
  );
});
