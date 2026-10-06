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

test("#12627 cold hung rebuild returns retryable 503", async () => {
  const res = await catalogCache.resolveCachedCatalogResponse(
    request(),
    { corsHeaders: {}, diagnosticHeaders: {} },
    neverResolves as (req: Request) => Promise<catalogCache.CatalogPayload>
  );
  assert.equal(res.status, 503);
  assert.equal(res.headers.get("Retry-After"), "1");
  assert.equal(res.headers.get("x-omniroute-catalog"), "build-timeout");
  const body = await res.json();
  assert.equal(body.error.message, "catalog_build_timeout");
  assert.equal(body.error.code, "service_unavailable");
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

test("cold real build error still rejects (never masked as 503)", async () => {
  const err = new Error("boom");
  catalogCache.__forceCatalogInFlightRejectionForTest(request(), err);
  await assert.rejects(
    catalogCache.resolveCachedCatalogResponse(
      request(),
      { corsHeaders: {}, diagnosticHeaders: {} },
      async () => payload("unused")
    ),
    /boom/
  );
});

test("rapid retry joins the orphaned build (one builder run, two 503s)", async () => {
  const p1 = catalogCache.resolveCachedCatalogResponse(
    request(),
    { corsHeaders: {}, diagnosticHeaders: {} },
    neverResolves as (req: Request) => Promise<catalogCache.CatalogPayload>
  );
  const p2 = catalogCache.resolveCachedCatalogResponse(
    request(),
    { corsHeaders: {}, diagnosticHeaders: {} },
    neverResolves as (req: Request) => Promise<catalogCache.CatalogPayload>
  );
  const [r1, r2] = await Promise.all([p1, p2]);
  assert.equal(r1.status, 503);
  assert.equal(r2.status, 503);
  assert.equal(catalogCache.__getCatalogBuilderRunsForTest(), 1);
});

test("diagnostic header merges without case duplicates", async () => {
  const res = await catalogCache.resolveCachedCatalogResponse(
    request(),
    { corsHeaders: { "X-Omniroute-Catalog": "stale-value" }, diagnosticHeaders: {} },
    neverResolves as (req: Request) => Promise<catalogCache.CatalogPayload>
  );
  assert.equal(res.status, 503);
  const raw = [...res.headers.entries()].filter(([k]) => k.toLowerCase() === "x-omniroute-catalog");
  assert.equal(raw.length, 1);
  assert.equal(raw[0][1], "build-timeout");
});

test("slow build converging after two timeouts serves 200 on next retry", async () => {
  const slowBuilder = async () => {
    await new Promise((r) => setTimeout(r, 120));
    return payload("late-good");
  };
  const first = await catalogCache.resolveCachedCatalogResponse(
    request(), { corsHeaders: {}, diagnosticHeaders: {} }, slowBuilder
  );
  assert.equal(first.status, 503);
  const second = await catalogCache.resolveCachedCatalogResponse(
    request(), { corsHeaders: {}, diagnosticHeaders: {} }, slowBuilder
  );
  assert.equal(second.status, 503);
  await new Promise((r) => setTimeout(r, 200));
  const third = await catalogCache.resolveCachedCatalogResponse(
    request(), { corsHeaders: {}, diagnosticHeaders: {} }, slowBuilder
  );
  assert.equal(third.status, 200);
  assert.equal(await third.text(), "late-good");
});

test("eternally hung build is replaced, never pinned", async () => {
  process.env.CATALOG_BUILD_TIMEOUT_MS = "20";
  try {
    const r1 = await catalogCache.resolveCachedCatalogResponse(
      request(), { corsHeaders: {}, diagnosticHeaders: {} },
      neverResolves as (req: Request) => Promise<catalogCache.CatalogPayload>
    );
    assert.equal(r1.status, 503);
    const r2 = await catalogCache.resolveCachedCatalogResponse(
      request(), { corsHeaders: {}, diagnosticHeaders: {} },
      neverResolves as (req: Request) => Promise<catalogCache.CatalogPayload>
    );
    assert.equal(r2.status, 503);
    const r3 = await catalogCache.resolveCachedCatalogResponse(
      request(), { corsHeaders: {}, diagnosticHeaders: {} },
      neverResolves as (req: Request) => Promise<catalogCache.CatalogPayload>
    );
    assert.equal(r3.status, 503);
    const r4 = await catalogCache.resolveCachedCatalogResponse(
      request(), { corsHeaders: {}, diagnosticHeaders: {} },
      async () => payload("fresh")
    );
    assert.equal(catalogCache.__getCatalogBuilderRunsForTest() >= 2, true);
    assert.equal([503, 200].includes(r4.status), true);
  } finally {
    process.env.CATALOG_BUILD_TIMEOUT_MS = "40";
  }
});
