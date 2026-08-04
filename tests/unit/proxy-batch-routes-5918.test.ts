/**
 * Route coverage for #5918 proxy management endpoints:
 *   POST /api/settings/proxies/batch-delete
 *   POST /api/settings/proxies/auto-test
 *
 * DB-backed and network-free: batch-delete is exercised end-to-end against a
 * temp SQLite DB; auto-test is exercised only on its no-proxy early-return path
 * (which returns before any outbound probe), so no real network is touched.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-batch-5918-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
delete process.env.INITIAL_PASSWORD; // auth not required in this test env

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const { POST: batchDeletePost } = await import(
  "../../src/app/api/settings/proxies/batch-delete/route.ts"
);
const { POST: autoTestPost } = await import(
  "../../src/app/api/settings/proxies/auto-test/route.ts"
);

function jsonRequest(body: unknown): Request {
  return new Request("http://localhost/api/settings/proxies/batch-delete", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("batch-delete removes multiple existing proxies in one request", async () => {
  await resetStorage();
  const a = await proxiesDb.createProxy({ name: "A", type: "http", host: "127.0.0.1", port: 8080 });
  const b = await proxiesDb.createProxy({ name: "B", type: "http", host: "127.0.0.1", port: 8081 });
  assert.ok(a?.id && b?.id);

  const res = await batchDeletePost(jsonRequest({ ids: [a.id, b.id] }));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.deleted, 2);
  assert.equal(body.failed, 0);
  // Both are actually gone from the store.
  const { items: remaining } = await proxiesDb.listProxies({ includeSecrets: false });
  assert.equal(remaining.filter((p) => p.id === a.id || p.id === b.id).length, 0);
});

test("batch-delete reports non-existent ids as failed without throwing", async () => {
  await resetStorage();
  const res = await batchDeletePost(jsonRequest({ ids: ["does-not-exist"] }));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.deleted, 0);
  assert.equal(body.failed, 1);
});

test("batch-delete rejects an empty ids array with 400 (validation, pre-DB)", async () => {
  await resetStorage();
  const res = await batchDeletePost(jsonRequest({ ids: [] }));
  assert.equal(res.status, 400);
});

test("batch-delete rejects invalid JSON with 400", async () => {
  await resetStorage();
  const bad = new Request("http://localhost/x", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{ not json",
  });
  const res = await batchDeletePost(bad);
  assert.equal(res.status, 400);
});

test("auto-test returns an empty result set when there are no proxies (no network probe)", async () => {
  await resetStorage();
  const req = new Request("http://localhost/api/settings/proxies/auto-test", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  });
  const res = await autoTestPost(req);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.deepEqual(body.results, []);
});
