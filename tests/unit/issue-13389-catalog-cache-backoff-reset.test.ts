/**
 * #13389 — GET /v1/models intermittently takes 75-120s or returns 502.
 *
 * Must-fix half of the issue: `resetConnectionBackoff()` (`src/lib/db/providers.ts`)
 * fires automatically whenever a previously-cooled-down connection is
 * auto-recovered during normal request routing (`src/sse/services/auth.ts`), and
 * previously busted the *entire* `/v1/models` response cache as a side effect —
 * even though the catalog builder (`src/app/api/v1/models/catalog.ts`) never reads
 * backoff/cooldown/error state at all (only structural fields like
 * `excludedModels` or enabled/disabled). On a deployment routing many providers,
 * this invalidated the catalog cache far more often than its 60s TTL / 30s
 * stale-while-revalidate window intends, purely as a side effect of unrelated
 * chat traffic, forcing frequent expensive cold rebuilds.
 *
 * This regression test asserts a `resetConnectionBackoff()` call does NOT bump
 * `getModelCatalogCacheVersion()`, while a genuinely structural connection write
 * (`updateProviderConnection`) still does.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13389-cache-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-13389-catalog-cache-backoff-reset-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const readCache = await import("../../src/lib/db/readCache.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function createBackedOffConnection() {
  const created = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: `GLM Backoff 13389 ${Date.now()}-${Math.random()}`,
    apiKey: "glm-test-key",
  });
  const connectionId = (created as { id: string }).id;
  await providersDb.updateProviderConnection(connectionId, {
    testStatus: "unavailable",
    lastError: "rate limit exceeded",
    lastErrorType: "rate_limited",
    lastErrorSource: "executor",
    errorCode: 429,
    backoffLevel: 3,
  });
  return connectionId;
}

test("#13389 resetConnectionBackoff does NOT bust the model catalog cache", async () => {
  const connectionId = await createBackedOffConnection();

  const versionBeforeReset = readCache.getModelCatalogCacheVersion();

  await providersDb.resetConnectionBackoff(connectionId);

  assert.equal(
    readCache.getModelCatalogCacheVersion(),
    versionBeforeReset,
    "a pure backoff/error-state reset must not invalidate the model catalog cache — " +
      "the catalog builder never reads backoffLevel/testStatus/rateLimitedUntil"
  );
});

test("#13389 a structural connection write still busts the model catalog cache", async () => {
  const connectionId = await createBackedOffConnection();

  const versionBeforeUpdate = readCache.getModelCatalogCacheVersion();

  // excludedModels is catalog-relevant (structural) — must still invalidate.
  await providersDb.updateProviderConnection(connectionId, {
    excludedModels: ["some-model-id"],
  });

  assert.ok(
    readCache.getModelCatalogCacheVersion() > versionBeforeUpdate,
    "a structural connection write (e.g. excludedModels) must still invalidate the model catalog cache"
  );
});
