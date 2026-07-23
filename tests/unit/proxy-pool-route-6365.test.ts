/**
 * Route coverage for #6365 proxy-pool + rotation-strategy endpoints:
 *   GET    /api/settings/proxies/pool?scope=&scopeId=  → { members, strategy }
 *   PUT    /api/settings/proxies/pool                  → add a member
 *   DELETE /api/settings/proxies/pool                  → remove a member
 *   PATCH  /api/settings/proxies/pool                  → set rotation strategy
 *
 * DB-backed and network-free: exercised end-to-end against a temp SQLite DB.
 * Per PII learning #3 the DB handle is reset + released in test.after so the
 * native runner does not hang.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-pool-route-6365-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
delete process.env.INITIAL_PASSWORD; // auth not required in this test env

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const { GET, PUT, DELETE, PATCH } = await import(
  "../../src/app/api/settings/proxies/pool/route.ts"
);

function jsonRequest(method: string, body: unknown): Request {
  return new Request("http://localhost/api/settings/proxies/pool", {
    method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function getRequest(query: Record<string, string>): Request {
  const params = new URLSearchParams(query);
  return new Request(`http://localhost/api/settings/proxies/pool?${params.toString()}`, {
    method: "GET",
  });
}

async function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

let seq = 0;
async function makeProxy() {
  seq++;
  const proxy = await proxiesDb.createProxy({
    name: `Pool proxy ${seq}`,
    type: "http",
    host: `10.0.0.${seq}`,
    port: 9000 + seq,
    status: "active",
  });
  assert.ok(proxy?.id);
  return proxy!.id;
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("add → list → remove round-trips a scope pool", async () => {
  await resetStorage();
  const a = await makeProxy();
  const b = await makeProxy();

  // Empty pool first.
  let res = await GET(getRequest({ scope: "provider", scopeId: "openai" }));
  assert.equal(res.status, 200);
  let body = (await res.json()) as {
    members: Array<{ proxyId: string }>;
    strategy: string;
    total: number;
  };
  assert.equal(body.total, 0);
  assert.equal(body.strategy, "round-robin");

  // Add two members.
  res = await PUT(jsonRequest("PUT", { scope: "provider", scopeId: "openai", proxyId: a }));
  assert.equal(res.status, 200);
  assert.equal(((await res.json()) as { success: boolean }).success, true);

  res = await PUT(jsonRequest("PUT", { scope: "provider", scopeId: "openai", proxyId: b }));
  assert.equal(res.status, 200);

  // List reflects both, in insertion (position) order.
  res = await GET(getRequest({ scope: "provider", scopeId: "openai" }));
  body = (await res.json()) as {
    members: Array<{ proxyId: string }>;
    strategy: string;
    total: number;
  };
  assert.equal(body.total, 2);
  assert.deepEqual(
    body.members.map((m) => m.proxyId),
    [a, b]
  );

  // Remove one.
  res = await DELETE(jsonRequest("DELETE", { scope: "provider", scopeId: "openai", proxyId: a }));
  assert.equal(res.status, 200);
  assert.equal(((await res.json()) as { removed: boolean }).removed, true);

  res = await GET(getRequest({ scope: "provider", scopeId: "openai" }));
  body = (await res.json()) as {
    members: Array<{ proxyId: string }>;
    strategy: string;
    total: number;
  };
  assert.equal(body.total, 1);
  assert.equal(body.members[0].proxyId, b);
});

test("PATCH sets and GET reads back the rotation strategy", async () => {
  await resetStorage();
  const a = await makeProxy();
  await PUT(jsonRequest("PUT", { scope: "global", proxyId: a }));

  let res = await PATCH(jsonRequest("PATCH", { scope: "global", strategy: "random" }));
  assert.equal(res.status, 200);
  assert.equal(((await res.json()) as { strategy: string }).strategy, "random");

  res = await GET(getRequest({ scope: "global" }));
  const body = (await res.json()) as { strategy: string };
  assert.equal(body.strategy, "random");
});

test("PATCH accepts sticky with a sticky window", async () => {
  await resetStorage();
  const res = await PATCH(
    jsonRequest("PATCH", { scope: "global", strategy: "sticky", stickyWindowMinutes: 15 })
  );
  assert.equal(res.status, 200);
  assert.equal(((await res.json()) as { strategy: string }).strategy, "sticky");
  assert.equal(await proxiesDb.getScopeRotationStrategy("global", null), "sticky");
});

test("GET without scope returns 400 with a sanitized (no stack) error body", async () => {
  await resetStorage();
  const res = await GET(getRequest({}));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: { message?: string } };
  assert.ok(body.error?.message);
  assert.ok(!body.error.message.includes("at /"));
});

test("PUT rejects a non-global scope without scopeId (Zod 400)", async () => {
  await resetStorage();
  const a = await makeProxy();
  const res = await PUT(jsonRequest("PUT", { scope: "provider", proxyId: a }));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: { message?: string } };
  assert.ok(body.error?.message);
  assert.ok(!body.error.message.includes("at /"));
});

test("PUT rejects a missing proxyId (Zod 400)", async () => {
  await resetStorage();
  const res = await PUT(jsonRequest("PUT", { scope: "global" }));
  assert.equal(res.status, 400);
});

test("key scope is aliased to account", async () => {
  await resetStorage();
  const a = await makeProxy();
  const res = await PUT(jsonRequest("PUT", { scope: "key", scopeId: "conn-1", proxyId: a }));
  assert.equal(res.status, 200);
  // Stored under the account scope, not "key".
  const pool = await proxiesDb.getScopeProxyPool("account", "conn-1");
  assert.equal(pool.length, 1);
  assert.equal(pool[0].proxyId, a);
});
