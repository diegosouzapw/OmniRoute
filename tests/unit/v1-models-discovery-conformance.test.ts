// Task D1 — GET /v1/models conformance for Claude Code's gateway model discovery.
//
// With CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1, Claude Code issues
// `GET /v1/models?limit=1000` with a 3s timeout and `redirect: "fail"`, reading
// only `id` + `display_name` from each entry. Three failure modes empty the
// picker with no error surfaced to the user: the endpoint taking longer than
// 3s, redirecting, or returning an entry without a string `id`. This suite
// covers all three, plus the stale-while-revalidate cache behavior that makes
// the timeout fix possible and the error-sanitization fix for the builder's
// catch block (hard rule #12).
//
// Harness modeled on tests/unit/v1-models-concurrent-6408.test.ts: temp
// DATA_DIR, core.resetDbInstance()/apiKeysDb.resetApiKeyState() cleanup so the
// native test runner does not hang on an open SQLite handle.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-d1-discovery-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("1. GET /v1/models never returns a 3xx redirect status (regression guard)", async () => {
  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/v1/models")
  );
  assert.ok(
    res.status < 300 || res.status >= 400,
    `expected a non-redirect status, got ${res.status}`
  );
});

test("2. every catalog entry has a non-empty string id, and display_name (if present) is a string", async () => {
  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/v1/models")
  );
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body.data), "response must carry a data array");
  assert.ok(body.data.length > 0, "catalog must not be empty");
  for (const entry of body.data) {
    assert.equal(typeof entry.id, "string", `entry.id must be a string, got ${typeof entry.id}`);
    assert.ok(entry.id.length > 0, "entry.id must not be an empty string");
    if (Object.prototype.hasOwnProperty.call(entry, "display_name")) {
      assert.equal(
        typeof entry.display_name,
        "string",
        "display_name, when present, must be a string"
      );
    }
  }
});

test("3. stale-first: an expired 200 entry within the staleness window is served immediately, then refreshed in the background", async () => {
  const makeRequest = () => new Request("http://localhost/v1/models");

  const res1 = await v1ModelsCatalog.getUnifiedModelsResponse(makeRequest());
  assert.equal(res1.status, 200);
  const body1 = await res1.text();
  const runsAfterFirst = v1ModelsCatalog.__getCatalogBuilderRunsForTest();
  assert.equal(runsAfterFirst, 1, "the first request must have run the builder exactly once");

  // Deterministically expire the entry (just-expired — well inside the stale window)
  // instead of sleeping out the real TTL.
  v1ModelsCatalog.__expireCatalogCacheForTest();

  const res2 = await v1ModelsCatalog.getUnifiedModelsResponse(makeRequest());
  assert.equal(res2.status, 200);
  const body2 = await res2.text();
  assert.equal(body2, body1, "the stale response must be the cached body, served unchanged");
  assert.equal(
    v1ModelsCatalog.__getCatalogBuilderRunsForTest(),
    runsAfterFirst,
    "the builder must NOT have run yet at response time — the stale response must not wait for a rebuild"
  );

  await v1ModelsCatalog.__flushCatalogBackgroundRefreshForTest();
  assert.equal(
    v1ModelsCatalog.__getCatalogBuilderRunsForTest(),
    runsAfterFirst + 1,
    "the background refresh must have run once flushed"
  );
});

test("4. an ordinary TTL expiry inside the SWR window remains stale-first", async () => {
  const makeRequest = () => new Request("http://localhost/v1/models");

  const res1 = await v1ModelsCatalog.getUnifiedModelsResponse(makeRequest());
  assert.equal(res1.status, 200);
  const body1 = await res1.text();
  const runsAfterFirst = v1ModelsCatalog.__getCatalogBuilderRunsForTest();
  assert.equal(runsAfterFirst, 1);

  // #9199/#10198 bounded the stale window (CATALOG_STALE_WHILE_REVALIDATE_MS = 30s)
  // so a refresh that keeps failing cannot pin an old catalog forever — the old
  // "stale-first regardless of snapshot age" contract is gone (the past-the-window
  // rebuild path is pinned by model-catalog-cache-swr-8728.test.ts). Inside the
  // window, expiry must stay stale-first and never impose a cold-build wait.
  v1ModelsCatalog.__expireCatalogCacheForTest();

  const res2 = await v1ModelsCatalog.getUnifiedModelsResponse(makeRequest());
  assert.equal(res2.status, 200);
  assert.equal(await res2.text(), body1);
  assert.equal(
    v1ModelsCatalog.__getCatalogBuilderRunsForTest(),
    runsAfterFirst,
    "ordinary TTL expiry must return the last successful snapshot before refreshing"
  );
  await v1ModelsCatalog.__flushCatalogBackgroundRefreshForTest();
  assert.equal(v1ModelsCatalog.__getCatalogBuilderRunsForTest(), runsAfterFirst + 1);
});

test("5. a cached non-200 entry is never served as stale", async () => {
  const request = new Request("http://localhost/v1/models");
  v1ModelsCatalog.__setCatalogCacheEntryForTest(request, {
    body: JSON.stringify({ error: { message: "boom", type: "server_error", code: "X" } }),
    headers: {},
    status: 500,
    // "Just expired" — this age would be well within the stale window if the
    // cached status were 200.
    expiresAt: Date.now() - 1,
  });
  const runsBefore = v1ModelsCatalog.__getCatalogBuilderRunsForTest();
  assert.equal(runsBefore, 0);

  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/v1/models")
  );

  assert.equal(
    v1ModelsCatalog.__getCatalogBuilderRunsForTest(),
    runsBefore + 1,
    "a cached error entry must never be served as stale — the builder must run instead"
  );
  assert.equal(res.status, 200, "the fresh rebuild replaces the cached error response");
});

test("6. a DB-state change drops the cache outright — the next response is a fresh build, never the stale pre-change body", async () => {
  const makeRequest = () => new Request("http://localhost/v1/models");

  const res1 = await v1ModelsCatalog.getUnifiedModelsResponse(makeRequest());
  assert.equal(res1.status, 200);
  const runsAfterFirst = v1ModelsCatalog.__getCatalogBuilderRunsForTest();
  assert.equal(runsAfterFirst, 1);

  // Any settings/connections/combos/pricing write bumps this version; catalog.ts
  // drops its entire cache map the next time it is read, independent of TTL/staleness.
  readCache.invalidateDbCache();

  const res2 = await v1ModelsCatalog.getUnifiedModelsResponse(makeRequest());
  assert.equal(res2.status, 200);
  assert.equal(
    v1ModelsCatalog.__getCatalogBuilderRunsForTest(),
    runsAfterFirst + 1,
    "a state change must force a fresh build — the (now-superseded) cached entry must never be " +
      "served, stale or otherwise"
  );
});

test("7. the 500 error path is sanitized — no stack trace or absolute source path leaks into the body", async () => {
  const request = new Request("http://localhost/v1/models?prefix=alias&__d1_err_test=1");
  const rawMessage =
    "Query failed at /home/diegosouzapw/dev/proxys/OmniRoute-Enterprise/secret/catalog.ts:42:1";
  const err = new Error(rawMessage);
  v1ModelsCatalog.__forceCatalogInFlightRejectionForTest(request, err);

  const res = await v1ModelsCatalog.getUnifiedModelsResponse(request);
  assert.equal(res.status, 500);
  const body = await res.json();

  assert.ok(
    !body.error.message.includes("at /"),
    "error body must not leak a stack-trace-like path"
  );
  assert.ok(
    !body.error.message.includes("catalog.ts"),
    "error body must not leak the source file name"
  );
  assert.ok(
    !body.error.message.includes("diegosouzapw"),
    "error body must not leak the local username/path"
  );
  assert.equal(body.error.type, "server_error");
  assert.ok(typeof body.error.code === "string" && body.error.code.length > 0);
});
