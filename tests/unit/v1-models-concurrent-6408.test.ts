// Regression guard for #6408 — GET /v1/models serializes concurrent requests
// (~1.2 s per request under any concurrency).
//
// The catalog builder walks 8 model registries + hits SQLite for connections,
// combos, custom models, and aliases on every call. Under Next.js App Router
// (single-threaded per-instance), N concurrent GETs run back-to-back so the
// 10th request completes ~12 s after the 1st (linear staircase reproduced in
// the issue).
//
// Fix: coalesce identical concurrent requests onto a single in-flight promise
// and memoize the serialized JSON body for ~1.5 s. This test uses the
// __getCatalogBuilderRunsForTest hook to assert that N concurrent GETs
// collapse to exactly ONE builder execution (not N).

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-6408-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#6408 — 10 concurrent identical GET /v1/models calls collapse to ONE builder run", async () => {
  const N = 10;
  const requests = Array.from({ length: N }, () => new Request("http://localhost/v1/models"));
  const responses = await Promise.all(
    requests.map((req) => v1ModelsCatalog.getUnifiedModelsResponse(req))
  );

  for (const res of responses) assert.equal(res.status, 200);
  const bodies = await Promise.all(responses.map((r) => r.text()));
  for (let i = 1; i < bodies.length; i++) {
    assert.equal(bodies[i], bodies[0], "concurrent responses must be byte-identical");
  }

  const runs = v1ModelsCatalog.__getCatalogBuilderRunsForTest();
  assert.equal(
    runs,
    1,
    `builder ran ${runs} times for ${N} concurrent requests — expected exactly 1 (in-flight coalescing)`
  );
});

test("#6408 — a second call within the TTL window is served from cache without re-running the builder", async () => {
  const res1 = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/v1/models")
  );
  assert.equal(res1.status, 200);
  assert.equal(v1ModelsCatalog.__getCatalogBuilderRunsForTest(), 1);

  const res2 = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/v1/models")
  );
  assert.equal(res2.status, 200);
  assert.equal(
    v1ModelsCatalog.__getCatalogBuilderRunsForTest(),
    1,
    "second call within TTL should reuse cache — builder must not run again"
  );

  assert.equal(await res2.text(), await res1.text());
});

test("#6408 — requests with different cache keys (prefix param) run the builder independently", async () => {
  const resAlias = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/v1/models?prefix=alias")
  );
  const resCanon = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/v1/models?prefix=canonical")
  );
  assert.equal(resAlias.status, 200);
  assert.equal(resCanon.status, 200);
  assert.equal(
    v1ModelsCatalog.__getCatalogBuilderRunsForTest(),
    2,
    "distinct cache keys must not collapse into each other"
  );
});
