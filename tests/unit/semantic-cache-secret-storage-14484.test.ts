import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omni-cache-secrets-14484-"));
process.env.STORAGE_ENCRYPTION_KEY = randomBytes(32).toString("hex");
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const db = await import("../../src/lib/db/databaseSettings.ts");
const core = await import("../../src/lib/db/core.ts");
const cacheRoute = await import("../../src/app/api/settings/cache-config/route.ts");
const databaseRoute = await import("../../src/app/api/settings/database/route.ts");
const KEY = "fixture-only-cache-key";
const REDIS = "redis://fixture:fixture-only-password@127.0.0.1:6379";
test.after(() => core.resetDbInstance());

function request(method: string, body?: unknown) {
  return new Request("http://localhost/api/settings/cache-config", {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

test("embedding key and Redis credentials are encrypted at rest and usable internally", () => {
  db.updateDatabaseSettings({
    cache: { semanticCacheEmbeddingApiKey: KEY, semanticCacheRedisUrl: REDIS },
  });
  const rows = core
    .getDbInstance()
    .prepare(
      "SELECT key, value FROM key_value WHERE namespace = 'databaseSettings' AND key IN ('cache.semanticCacheEmbeddingApiKey', 'cache.semanticCacheRedisUrl')"
    )
    .all() as Array<{ key: string; value: string }>;
  assert.equal(rows.length, 2);
  for (const row of rows) {
    assert.ok(JSON.parse(row.value).startsWith("enc:v1:"), row.key);
    assert.ok(!row.value.includes("fixture-only"));
  }
  assert.equal(db.getUserDatabaseSettings().cache.semanticCacheEmbeddingApiKey, KEY);
  assert.equal(db.getUserDatabaseSettings().cache.semanticCacheRedisUrl, REDIS);
});

test("both settings APIs redact secrets and masked round-trip preserves them", async () => {
  db.updateDatabaseSettings({
    cache: { semanticCacheEmbeddingApiKey: KEY, semanticCacheRedisUrl: REDIS },
  });
  const response = await cacheRoute.GET(request("GET") as never);
  const config = await response.json();
  assert.equal(config.semanticCacheEmbeddingApiKey, "********");
  assert.equal(config.semanticCacheRedisUrl, "********");
  const database = await (await databaseRoute.GET(request("GET") as never)).json();
  assert.equal(database.cache.semanticCacheEmbeddingApiKey, "********");
  assert.equal(database.cache.semanticCacheRedisUrl, "********");
  assert.equal(
    (
      await cacheRoute.PUT(
        request("PUT", {
          semanticCacheEmbeddingApiKey: config.semanticCacheEmbeddingApiKey,
          semanticCacheRedisUrl: config.semanticCacheRedisUrl,
        }) as never
      )
    ).status,
    200
  );
  assert.equal(db.getUserDatabaseSettings().cache.semanticCacheEmbeddingApiKey, KEY);
  assert.equal(db.getUserDatabaseSettings().cache.semanticCacheRedisUrl, REDIS);
});

test("legacy plaintext remains readable and is encrypted on the next write", () => {
  core
    .getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO key_value(namespace,key,value) VALUES ('databaseSettings','cache.semanticCacheEmbeddingApiKey',?)"
    )
    .run(JSON.stringify(KEY));
  assert.equal(db.getUserDatabaseSettings().cache.semanticCacheEmbeddingApiKey, KEY);
  db.updateDatabaseSettings({ cache: { semanticCacheTTL: 1000 } });
  const row = core
    .getDbInstance()
    .prepare(
      "SELECT value FROM key_value WHERE namespace='databaseSettings' AND key='cache.semanticCacheEmbeddingApiKey'"
    )
    .get() as { value: string };
  assert.ok(JSON.parse(row.value).startsWith("enc:v1:"));
});

test("saving another setting also encrypts legacy flat secret copies", () => {
  core
    .getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO key_value(namespace,key,value) VALUES ('settings','semanticCacheEmbeddingApiKey',?)"
    )
    .run(JSON.stringify(KEY));
  db.updateDatabaseSettings({ cache: { semanticCacheTTL: 1500 } });
  const row = core
    .getDbInstance()
    .prepare(
      "SELECT value FROM key_value WHERE namespace='settings' AND key='semanticCacheEmbeddingApiKey'"
    )
    .get() as { value: string };
  assert.ok(JSON.parse(row.value).startsWith("enc:v1:"));
});

test("masked secrets cannot silently follow a changed embedding endpoint", async () => {
  db.updateDatabaseSettings({
    cache: {
      semanticCacheEmbeddingApiKey: KEY,
      semanticCacheEmbeddingBaseUrl: "http://127.0.0.1:12345/v1",
    },
  });
  const response = await cacheRoute.PUT(
    request("PUT", {
      semanticCacheEmbeddingBaseUrl: "http://127.0.0.2:12345/v1",
      semanticCacheEmbeddingApiKey: "********",
    }) as never
  );
  assert.equal(response.status, 400);
  assert.equal(
    db.getUserDatabaseSettings().cache.semanticCacheEmbeddingBaseUrl,
    "http://127.0.0.1:12345/v1"
  );
});

test("an explicit null clears a stored cache credential", async () => {
  db.updateDatabaseSettings({
    cache: { semanticCacheEmbeddingApiKey: KEY, semanticCacheRedisUrl: REDIS },
  });
  assert.equal(
    (
      await cacheRoute.PUT(
        request("PUT", { semanticCacheEmbeddingApiKey: null, semanticCacheRedisUrl: null }) as never
      )
    ).status,
    200
  );
  assert.equal(db.getUserDatabaseSettings().cache.semanticCacheEmbeddingApiKey, "");
  assert.equal(db.getUserDatabaseSettings().cache.semanticCacheRedisUrl, "");
});
