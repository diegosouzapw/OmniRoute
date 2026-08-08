import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-catalog-cache-8728-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const readCache = await import("../../src/lib/db/readCache.ts");
const catalogCache = await import("../../src/app/api/v1/models/catalogCache.ts");

type RefreshTask = () => Promise<void>;

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

function createPolicyQueue() {
  const tasks: RefreshTask[] = [];
  return {
    policy: {
      getStaleWhileRevalidateMs: () => Number.POSITIVE_INFINITY,
      scheduleBackgroundRefresh: (task: RefreshTask) => {
        tasks.push(task);
      },
    },
    tasks,
  };
}

async function resolve(
  build: (request: Request) => Promise<catalogCache.CatalogPayload>,
  policy = createPolicyQueue().policy
) {
  return catalogCache.resolveCachedCatalogResponse(
    request(),
    { corsHeaders: {}, diagnosticHeaders: {} },
    build,
    policy
  );
}

test.beforeEach(() => {
  catalogCache.__resetCatalogBuilderRunsForTest();
});

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("production SWR policy is unbounded and reset restores the default accessor", () => {
  assert.equal(catalogCache.CATALOG_STALE_WHILE_REVALIDATE_MS, Number.POSITIVE_INFINITY);
  assert.equal(catalogCache.getCatalogStaleWhileRevalidateMs(), Number.POSITIVE_INFINITY);

  catalogCache.__setCatalogStaleWhileRevalidateAccessorForTest(() => 0);
  assert.equal(catalogCache.getCatalogStaleWhileRevalidateMs(), 0);

  catalogCache.__resetCatalogBuilderRunsForTest();
  assert.equal(catalogCache.getCatalogStaleWhileRevalidateMs(), Number.POSITIVE_INFINITY);
});

test("reset detaches scheduled work before it can run", async () => {
  const { policy, tasks } = createPolicyQueue();
  await resolve(async () => payload("old"), policy);
  catalogCache.__expireCatalogCacheForTest();
  await resolve(async () => payload("detached"), policy);
  assert.equal(tasks.length, 1);

  catalogCache.__resetCatalogBuilderRunsForTest();
  await tasks[0]();

  assert.equal(catalogCache.__getCatalogBuilderRunsForTest(), 0);
});

test("ordinary TTL expiry serves the last success indefinitely and schedules one refresh per key", async () => {
  const { policy, tasks } = createPolicyQueue();
  const initial = await resolve(async () => payload("old"), policy);
  assert.equal(await initial.text(), "old");
  catalogCache.__expireCatalogCacheForTest(7 * 24 * 60 * 60 * 1000);

  const staleResponses = await Promise.all(
    Array.from({ length: 5 }, () => resolve(async () => payload("new"), policy))
  );

  assert.deepEqual(
    await Promise.all(staleResponses.map((response) => response.text())),
    Array(5).fill("old")
  );
  assert.equal(tasks.length, 1, "concurrent stale reads must schedule exactly one refresh");
  assert.equal(catalogCache.__getCatalogBuilderRunsForTest(), 1);

  await tasks[0]();

  const refreshed = await resolve(async () => payload("unexpected"), policy);
  assert.equal(await refreshed.text(), "new");
  assert.equal(catalogCache.__getCatalogBuilderRunsForTest(), 2);
});

test("unsuccessful cold payloads are returned but never cached", async () => {
  const first = await resolve(async () => payload("temporary failure", 503));
  assert.equal(first.status, 503);
  assert.equal(await first.text(), "temporary failure");

  const second = await resolve(async () => payload("recovered"));
  assert.equal(second.status, 200);
  assert.equal(await second.text(), "recovered");
  assert.equal(catalogCache.__getCatalogBuilderRunsForTest(), 2);
});

test("failed background refresh retains the prior successful snapshot and permits retry", async (t) => {
  t.mock.method(console, "error", () => {});
  const { policy, tasks } = createPolicyQueue();
  assert.equal(await (await resolve(async () => payload("old"), policy)).text(), "old");
  catalogCache.__expireCatalogCacheForTest();

  assert.equal(
    await (
      await resolve(async () => {
        throw new Error("temporary failure");
      }, policy)
    ).text(),
    "old"
  );
  await tasks.shift()!();

  assert.equal(
    await (await resolve(async () => payload("temporary failure", 503), policy)).text(),
    "old"
  );
  assert.equal(tasks.length, 1, "a failed refresh must release single-flight state for retry");
  await tasks.shift()!();

  assert.equal(await (await resolve(async () => payload("new"), policy)).text(), "old");
  assert.equal(tasks.length, 1, "an unsuccessful payload must also permit another refresh");
  await tasks.shift()!();

  assert.equal(await (await resolve(async () => payload("unused"), policy)).text(), "new");
});

test("hard invalidation drops snapshots, detaches old work, and guards old-generation writeback", async () => {
  let resolveOld!: (value: catalogCache.CatalogPayload) => void;
  const oldPayload = new Promise<catalogCache.CatalogPayload>((resolvePromise) => {
    resolveOld = resolvePromise;
  });
  let currentBuildStarted = false;
  let resolveCurrent!: (value: catalogCache.CatalogPayload) => void;
  const currentPayload = new Promise<catalogCache.CatalogPayload>((resolvePromise) => {
    resolveCurrent = resolvePromise;
  });

  const oldRequest = resolve(async () => oldPayload);
  await Promise.resolve();

  readCache.invalidateModelCatalogCache();
  const currentRequest = resolve(async () => {
    currentBuildStarted = true;
    return currentPayload;
  });
  await Promise.resolve();

  assert.equal(currentBuildStarted, true, "the first post-write read must start a current build");

  resolveCurrent(payload("current"));
  assert.equal(await (await currentRequest).text(), "current");

  resolveOld(payload("old"));
  assert.equal(await (await oldRequest).text(), "old");

  const cached = await resolve(async () => payload("unexpected"));
  assert.equal(await cached.text(), "current", "old completion must not overwrite current cache");
  assert.equal(catalogCache.__getCatalogBuilderRunsForTest(), 2);
});

test("hard invalidation clears a completed snapshot and makes the next read block", async () => {
  assert.equal(await (await resolve(async () => payload("old"))).text(), "old");
  readCache.invalidateModelCatalogCache();

  let resolveCurrent!: (value: catalogCache.CatalogPayload) => void;
  const currentPayload = new Promise<catalogCache.CatalogPayload>((resolvePromise) => {
    resolveCurrent = resolvePromise;
  });
  let settled = false;
  const next = resolve(async () => currentPayload).then((response) => {
    settled = true;
    return response;
  });

  await Promise.resolve();
  assert.equal(settled, false, "post-write reads may block and must not serve the old snapshot");

  resolveCurrent(payload("current"));
  assert.equal(await (await next).text(), "current");
});
