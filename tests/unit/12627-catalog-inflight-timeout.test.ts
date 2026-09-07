/**
 * #12627 — a hung coalesced catalog rebuild must not pin later GET /v1/models clients.
 */
import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-12627-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const catalogCache = await import("../../src/app/api/v1/models/catalogCache.ts");

function request() {
  return new Request("http://localhost/v1/models");
}

function payload(body: string): catalogCache.CatalogPayload {
  return { body, headers: { "content-type": "application/json" }, status: 200, cacheTTL: 60_000 };
}

const neverResolves = () => new Promise(() => {});

test.beforeEach(() => {
  catalogCache.__resetCatalogBuilderRunsForTest();
  process.env.CATALOG_BUILD_TIMEOUT_MS = "40";
});

test.afterEach(() => {
  delete process.env.CATALOG_BUILD_TIMEOUT_MS;
});

test("#12627 cold hung rebuild times out instead of waiting forever", async () => {
  await assert.rejects(
    catalogCache.resolveCachedCatalogResponse(
      request(),
      { corsHeaders: {}, diagnosticHeaders: {} },
      neverResolves as (req: Request) => Promise<catalogCache.CatalogPayload>
    ),
    /catalog_build_timeout/
  );
});

test("#12627 timeout serves last-good 200 when a prior build succeeded", async () => {
  const first = await catalogCache.resolveCachedCatalogResponse(
    request(),
    { corsHeaders: {}, diagnosticHeaders: {} },
    async () => payload("good")
  );
  assert.equal(await first.text(), "good");
  catalogCache.__expireCatalogCacheForTest(60_000);

  const second = await catalogCache.resolveCachedCatalogResponse(
    request(),
    { corsHeaders: {}, diagnosticHeaders: {} },
    neverResolves as (req: Request) => Promise<catalogCache.CatalogPayload>
  );
  assert.equal(second.status, 200);
  assert.equal(await second.text(), "good");
  assert.equal(second.headers.get("x-omniroute-catalog"), "last-good");
});
