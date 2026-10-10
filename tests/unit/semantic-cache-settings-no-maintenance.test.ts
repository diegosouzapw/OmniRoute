import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cache-settings-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.OMNIROUTE_SEMANTIC_CACHE_ENABLED;

const core = await import("../../src/lib/db/core.ts");
const { getUserDatabaseSettings, updateDatabaseSettings } =
  await import("../../src/lib/db/databaseSettings.ts");
const { ensureSemanticCacheDbBridge } =
  await import("../../src/lib/cache/semanticCacheDbBridge.ts");
const { resolveSemanticCacheConfig } = await import("../../open-sse/config/semanticCacheConfig.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const [master, vector, expected] of [
  [true, false, false],
  [true, true, true],
  [false, true, false],
] as const) {
  test(`cache config master=${master} vector=${vector} reads settings without maintenance`, () => {
    const current = updateDatabaseSettings({
      cache: {
        ...getUserDatabaseSettings().cache,
        semanticCacheEnabled: master,
        semanticCacheVectorEnabled: vector,
        semanticCacheTTL: 12345,
        semanticCacheMaxSize: 42,
        semanticCacheThreshold: 0.91,
      },
    });
    const db = core.getDbInstance();
    const originalPrepare = db.prepare;
    const originalPragma = db.pragma;
    const maintenance: string[] = [];
    db.prepare = (sql) => {
      if (/\bdbstat\b|SELECT COUNT\(\*\) as count FROM/i.test(sql)) maintenance.push(sql);
      return originalPrepare.call(db, sql);
    };
    db.pragma = (sql, options) => {
      maintenance.push(`PRAGMA ${sql}`);
      return originalPragma.call(db, sql, options);
    };
    try {
      ensureSemanticCacheDbBridge();
      const config = resolveSemanticCacheConfig();
      assert.equal(config.enabled, expected);
      assert.equal(config.ttlMs, current.cache.semanticCacheTTL);
      assert.equal(config.maxEntries, current.cache.semanticCacheMaxSize);
      assert.equal(config.similarityThreshold, current.cache.semanticCacheThreshold);
      assert.deepEqual(maintenance, [], "configuration lookup must not inspect the whole database");
    } finally {
      db.prepare = originalPrepare;
      db.pragma = originalPragma;
    }
  });
}
