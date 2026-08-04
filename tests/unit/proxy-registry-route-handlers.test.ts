import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression coverage for the shared proxy-route handlers extracted in #5472.
// resolveProxyLookupResponse is the single point of truth for the GET branch of
// both /api/settings/proxies (whereUsed param: "whereUsed") and
// /api/v1/management/proxies (whereUsed param: "where_used"), so its three
// branches — id+whereUsed, id-only, list (no id) — must stay equivalent across
// the parameterized callers.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-route-handlers-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const { resolveProxyLookupResponse } = await import(
  "../../src/lib/api/proxyRegistryRouteHandlers.ts"
);

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

test("resolveProxyLookupResponse returns null for the list path (no id)", async () => {
  await resetStorage();
  const result = await resolveProxyLookupResponse(new URLSearchParams(), "whereUsed");
  assert.equal(result, null);
});

test("resolveProxyLookupResponse returns the proxy when id matches", async () => {
  await resetStorage();
  const created = await proxiesDb.createProxy({
    name: "Lookup Proxy",
    type: "http",
    host: "127.0.0.1",
    port: 8080,
  });
  assert.ok(created?.id);

  const result = await resolveProxyLookupResponse(
    new URLSearchParams({ id: created.id }),
    "whereUsed"
  );
  assert.ok(result instanceof Response);
  assert.equal(result.status, 200);
  const body = (await result.json()) as Record<string, unknown>;
  assert.equal(body.id, created.id);
  assert.equal(body.name, "Lookup Proxy");
});

test("resolveProxyLookupResponse returns 404 for an unknown id", async () => {
  await resetStorage();
  const result = await resolveProxyLookupResponse(
    new URLSearchParams({ id: "does-not-exist" }),
    "whereUsed"
  );
  assert.ok(result instanceof Response);
  assert.equal(result.status, 404);
});

test("resolveProxyLookupResponse honors the caller's whereUsed param name (where_used)", async () => {
  await resetStorage();
  const created = await proxiesDb.createProxy({
    name: "Usage Proxy",
    type: "http",
    host: "127.0.0.1",
    port: 9090,
  });
  assert.ok(created?.id);

  // management route uses the snake_case param name; the usage branch must fire.
  const result = await resolveProxyLookupResponse(
    new URLSearchParams({ id: created.id, where_used: "1" }),
    "where_used"
  );
  assert.ok(result instanceof Response);
  assert.equal(result.status, 200);
  // getProxyWhereUsed returns a usage payload (array/object), not the proxy row.
  const body = await result.json();
  assert.notEqual((body as Record<string, unknown>)?.name, "Usage Proxy");
});
