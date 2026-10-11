import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #9147: the catalog builder yields every N loop iterations, but the yield used to sit at
// the BOTTOM of each loop body, so entries skipped by an early `continue` never counted.
// A registry made mostly of skipped rows was then walked without a single yield. This
// counts the builder's `setImmediate` yields with and without a large block of rows that
// the custom-model loop skips (no string id), and requires the skipped rows to yield.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-9147-skip-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-9147-skip-secret";
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

const SKIPPED_ROWS = 2000;

function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

function seed(skippedRows: number) {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO provider_connections (id, provider, auth_type, name, priority, is_active, api_key, created_at, updated_at)
     VALUES ('skip-conn', 'openai', 'apikey', 'skip-connection', 1, 1, 'sk-skip', ?, ?)`
  ).run(now, now);
  const rows = Array.from({ length: skippedRows }, (_, i) => ({ name: `no-id-${i}` }));
  db.prepare(
    `INSERT INTO key_value (namespace, key, value) VALUES ('customModels', 'openai', ?)`
  ).run(JSON.stringify(rows));
}

async function countBuildYields(skippedRows: number): Promise<number> {
  resetStorage();
  seed(skippedRows);
  const original = globalThis.setImmediate;
  let yields = 0;
  globalThis.setImmediate = ((...args: Parameters<typeof setImmediate>) => {
    yields++;
    return original(...args);
  }) as typeof setImmediate;
  try {
    const res = await v1ModelsCatalog.getUnifiedModelsResponse(
      new Request("http://localhost/v1/models")
    );
    assert.equal(res.status, 200);
  } finally {
    globalThis.setImmediate = original;
  }
  return yields;
}

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#9147 — rows skipped by an early `continue` still count toward catalog yields", async () => {
  const baseline = await countBuildYields(0);
  const withSkipped = await countBuildYields(SKIPPED_ROWS);
  const extra = withSkipped - baseline;
  // One yield per 5 iterations → ~400 for 2000 skipped rows; allow slack for jitter.
  assert.ok(
    extra >= SKIPPED_ROWS / 5 - 5,
    `expected ~${SKIPPED_ROWS / 5} extra yields for ${SKIPPED_ROWS} skipped rows, got ${extra} ` +
      `(baseline ${baseline}, with skipped rows ${withSkipped})`
  );
});
