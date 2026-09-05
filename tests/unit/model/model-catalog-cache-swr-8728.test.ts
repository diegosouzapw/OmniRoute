/**
 * Stale-while-revalidate for the /v1/models catalog cache (#8728).
 *
 * Contract note: #8728 originally shipped an injectable `CatalogCachePolicy`
 * (a per-call SWR accessor + refresh scheduler) and an unbounded
 * `CATALOG_STALE_WHILE_REVALIDATE_MS = Number.POSITIVE_INFINITY`. #9199 landed
 * afterwards and deliberately replaced both: the window is now a fixed 30 s
 * constant and the refresh is scheduled internally via `setTimeout(…, 0)`.
 * See catalogCache.ts — an unbounded window let a refresh that kept failing pin
 * an ancient catalog forever.
 *
 * These tests were left asserting the removed API, which is what broke the
 * production build (catalog.ts re-exported three symbols that no longer exist).
 * They are realigned here to the shipped contract: the BEHAVIOR #8728 added —
 * an expired-but-recent successful entry is served immediately while a refresh
 * runs behind it — is still fully covered.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-catalog-cache-8728-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const readCache = await import("../../../src/lib/db/readCache.ts");
const catalogCache = await import("../../../src/app/api/v1/models/catalogCache.ts");

function request() {
  return new Request("http://localhost/v1/models");
}

function payload(body: string, status = 200): catalogCache.CatalogPayload {
  return {
    body,
    headers: { "content-type": "application/json" },
    status,
    cacheTTL: 60_000,
  };
}

async function resolve(build: (request: Request) => Promise<catalogCache.CatalogPayload>) {
  return catalogCache.resolveCachedCatalogResponse(
    request(),
    { corsHeaders: {}, diagnosticHeaders: {} },
    build
  );
}

test.beforeEach(() => {
  catalogCache.__resetCatalogBuilderRunsForTest();
});

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the SWR window is a bounded constant, not an unbounded accessor", () => {
  // #9199 replaced the injectable POSITIVE_INFINITY accessor with this bound so a
  // refresh that keeps failing cannot pin an old catalog forever.
  assert.equal(catalogCache.CATALOG_STALE_WHILE_REVALIDATE_MS, 30_000);
  assert.ok(Number.isFinite(catalogCache.CATALOG_STALE_WHILE_REVALIDATE_MS));
});

test("a fresh entry is replayed without running the builder again", async () => {
  const first = await resolve(async () => payload("fresh"));
  assert.equal(await first.text(), "fresh");
  assert.equal(catalogCache.__getCatalogBuilderRunsForTest(), 1);

  const second = await resolve(async () => payload("SHOULD NOT BUILD"));
  assert.equal(await second.text(), "fresh");
  assert.equal(catalogCache.__getCatalogBuilderRunsForTest(), 1);
});

test("an expired successful entry is served immediately while a refresh runs behind it", async () => {
  await resolve(async () => payload("old"));
  catalogCache.__expireCatalogCacheForTest();

  // The stale body comes back on THIS call — the caller never waits for the rebuild.
  const stale = await resolve(async () => payload("new"));
  assert.equal(await stale.text(), "old", "the expired-but-recent entry must be served as-is");

  await catalogCache.__flushCatalogBackgroundRefreshForTest();

  const refreshed = await resolve(async () => payload("SHOULD NOT BUILD"));
  assert.equal(await refreshed.text(), "new", "the background refresh must replace the snapshot");
});

test("an entry aged past the SWR window is not served stale", async () => {
  await resolve(async () => payload("ancient"));
  catalogCache.__expireCatalogCacheForTest(catalogCache.CATALOG_STALE_WHILE_REVALIDATE_MS + 1_000);

  const rebuilt = await resolve(async () => payload("rebuilt"));
  assert.equal(await rebuilt.text(), "rebuilt", "past the window the caller must wait for a build");
});

test("a cached non-200 is never replayed as stale", async () => {
  // Replaying a cached error as "stale" would mask an intermittent failure behind
  // a fake success forever.
  catalogCache.__setCatalogCacheEntryForTest(request(), {
    body: "boom",
    headers: {},
    status: 500,
    expiresAt: Date.now() - 1,
  });

  const res = await resolve(async () => payload("recovered"));
  assert.equal(res.status, 200);
  assert.equal(await res.text(), "recovered");
});

test("concurrent cold requests share a single builder run", async () => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });

  const build = async () => {
    await gate;
    return payload("coalesced");
  };

  const inFlight = [resolve(build), resolve(build), resolve(build)];
  release();
  const bodies = await Promise.all((await Promise.all(inFlight)).map((r) => r.text()));

  assert.deepEqual(bodies, ["coalesced", "coalesced", "coalesced"]);
  assert.equal(
    catalogCache.__getCatalogBuilderRunsForTest(),
    1,
    "identical concurrent requests must coalesce onto one in-flight build (#6408)"
  );
});

test("a state change invalidates the cache so the next read rebuilds", async () => {
  await resolve(async () => payload("before"));

  readCache.invalidateDbCache();

  const after = await resolve(async () => payload("after"));
  assert.equal(await after.text(), "after", "a write must be reflected on the very next read");
});
