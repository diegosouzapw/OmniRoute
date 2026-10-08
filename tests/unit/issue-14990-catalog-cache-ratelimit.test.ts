/**
 * #14990 — Hot-path rate-limit/cooldown writes must not bust the `/v1/models`
 * catalog cache.
 *
 * Follow-up to #13389: `invalidateDbCache(scope, id, { skipModelCatalog })` was
 * applied to `resetConnectionBackoff` but the same class of routing/health-only
 * writes in `src/lib/db/providers/rateLimit.ts` and
 * `src/lib/db/providers/codexAccountState.ts` still called
 * `invalidateDbCache("connections")` without the flag. Every provider
 * 429/cooldown mark therefore bumped `modelCatalogCacheVersion`, forcing
 * `dropCatalogCacheIfStateChanged()` to drop every cached catalog payload and
 * the next `/v1/models` request to run the expensive synchronous catalog
 * rebuild (~50s on production-class hosts) — stalling every route on the
 * shared event loop.
 *
 * The catalog builder only reads structural connection fields (`id`,
 * `provider`, `isActive`, `providerSpecificData.excludedModels`) — never
 * `rate_limited_until`, `test_status`, `backoff_level`, `last_error*`,
 * `error_code`, or the codex-scope quota/cooldown keys inside
 * `provider_specific_data`.
 *
 * This regression test asserts those hot-path writes do NOT bump
 * `getModelCatalogCacheVersion()` while still invalidating the connections
 * read cache, and that a genuinely structural write still busts the catalog.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-14990-cache-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-14990-catalog-cache-ratelimit-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const rateLimitDb = await import("../../src/lib/db/providers/rateLimit.ts");
const codexStateDb = await import("../../src/lib/db/providers/codexAccountState.ts");
const readCache = await import("../../src/lib/db/readCache.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function createConnection(provider = "glm", providerSpecificData?: Record<string, unknown>) {
  const created = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider} 14990 ${Date.now()}-${Math.random()}`,
    apiKey: `${provider}-test-key`,
    ...(providerSpecificData ? { providerSpecificData } : {}),
  });
  return (created as { id: string }).id;
}

test("#14990 setConnectionRateLimitUntil does NOT bust the model catalog cache", async () => {
  const connectionId = await createConnection();
  // Warm the by-id cache so the write's invalidation is observable.
  await readCache.getCachedProviderConnectionById(connectionId);

  const versionBefore = readCache.getModelCatalogCacheVersion();

  rateLimitDb.setConnectionRateLimitUntil(connectionId, Date.now() + 60_000);

  assert.equal(
    readCache.getModelCatalogCacheVersion(),
    versionBefore,
    "a rate_limited_until write must not invalidate the model catalog cache — " +
      "the catalog builder never reads cooldown state"
  );

  // The connections read cache must still be invalidated (behavior preserved).
  const after = await readCache.getCachedProviderConnectionById(connectionId);
  assert.ok(after, "connection must still be readable after the write");
  assert.ok(
    after.rateLimitedUntil !== null && after.rateLimitedUntil !== undefined,
    "the connections read cache must reflect the new cooldown, not a stale row"
  );
});

test("#14990 clearing a rate limit (codex child-cooldown strip) does NOT bust the catalog cache", async () => {
  const connectionId = await createConnection("codex", {
    codexScopeRateLimitedUntil: { codex: new Date(Date.now() + 60_000).toISOString() },
  });
  rateLimitDb.setConnectionRateLimitUntil(connectionId, Date.now() + 60_000);

  const versionBefore = readCache.getModelCatalogCacheVersion();

  // null → stripCodexChildCooldownsFromConnection(alsoClearTopLevel) writes
  // provider_specific_data + rate_limited_until — still routing-only fields.
  rateLimitDb.setConnectionRateLimitUntil(connectionId, null);

  assert.equal(readCache.getModelCatalogCacheVersion(), versionBefore);
});

test("#14990 clearStaleCrashCooldowns does NOT bust the model catalog cache", async () => {
  const connectionId = await createConnection();
  // Plant a stale (already-past) cooldown directly — the public writer guards
  // against past timestamps, which is what this startup sweeper cleans up.
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => { run: (...p: unknown[]) => unknown };
  };
  db.prepare(
    "UPDATE provider_connections SET rate_limited_until = ?, test_status = ?, updated_at = ? WHERE id = ?"
  ).run(Date.now() - 60_000, "unavailable", new Date().toISOString(), connectionId);

  const versionBefore = readCache.getModelCatalogCacheVersion();

  const result = rateLimitDb.clearStaleCrashCooldowns();

  assert.equal(result.cleared, 1, "the stale cooldown must be swept");
  assert.equal(
    readCache.getModelCatalogCacheVersion(),
    versionBefore,
    "the startup cooldown sweep must not invalidate the model catalog cache"
  );
});

test("#14990 clearConnectionErrorIfUnchanged does NOT bust the model catalog cache", async () => {
  const connectionId = await createConnection();
  await providersDb.updateProviderConnection(connectionId, {
    testStatus: "unavailable",
    lastError: "rate limit exceeded",
    lastErrorType: "rate_limited",
    lastErrorSource: "executor",
    errorCode: 429,
    backoffLevel: 2,
  });

  const before = await providersDb.getProviderConnectionById(connectionId);
  assert.ok(before, "connection must exist");

  const versionBefore = readCache.getModelCatalogCacheVersion();

  const applied = await rateLimitDb.clearConnectionErrorIfUnchanged(connectionId, {
    testStatus: before.testStatus as string | null,
    lastErrorAt: before.lastErrorAt as string | null,
    rateLimitedUntil: before.rateLimitedUntil as string | null,
  });

  assert.equal(applied, true, "the CAS clear must apply on an unchanged row");
  assert.equal(
    readCache.getModelCatalogCacheVersion(),
    versionBefore,
    "an error-state clear must not invalidate the model catalog cache"
  );
});

test("#14990 codex scoped quota/cooldown writes do NOT bust the model catalog cache", async () => {
  const connectionId = await createConnection("codex");

  const versionBefore = readCache.getModelCatalogCacheVersion();

  const persisted = await codexStateDb.updateCodexScopedQuotaState(connectionId, "codex", {
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
    rateLimitSource: "fallback",
  });
  assert.ok(persisted, "codex scoped state must persist");

  assert.equal(
    readCache.getModelCatalogCacheVersion(),
    versionBefore,
    "codex-scope cooldown keys are routing metadata — the catalog never reads them"
  );

  const lifted = codexStateDb.liftCodexScopeCooldownOnHeadroom(connectionId, "codex");
  assert.equal(lifted, true, "the fallback-sourced cooldown must lift");

  assert.equal(
    readCache.getModelCatalogCacheVersion(),
    versionBefore,
    "lifting a codex scope cooldown must not invalidate the model catalog cache"
  );
});

test("#14990 a structural connection write still busts the model catalog cache", async () => {
  const connectionId = await createConnection();

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
