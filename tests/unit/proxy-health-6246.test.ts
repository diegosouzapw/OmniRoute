/**
 * #6246 — "Massive issue with proxies since 3.8.44 - IP leak" (delta scope).
 *
 * The core fail-closed + scheduler regression is fixed in PR #6296. This suite
 * covers the two remaining reporter asks that #6296 does NOT touch:
 *   (#3) the "Test All" button (`/api/settings/proxies/auto-test`) must be a test,
 *        not test-and-set — it flipped a proxy to `inactive` on a failed probe,
 *        and the egress selector excludes `inactive` proxies, so "Test All"
 *        silently disabled every proxy that failed a flaky probe;
 *   (#4) a bulk enable/disable endpoint so an operator can re-activate proxies
 *        in one action.
 *
 * DB-backed and network-free: the probe targets a dead localhost proxy
 * (immediate ECONNREFUSED — no outbound traffic).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-6246-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
delete process.env.INITIAL_PASSWORD; // auth not required in this test env
delete process.env.PROXY_HEALTH_AUTO_DEACTIVATE;

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const { resolveHealthCheckStatusWrite, isProxyHealthAutoDeactivateEnabled } = await import(
  "../../src/lib/proxyHealth/statusPolicy.ts"
);
const { POST: autoTestPost } = await import(
  "../../src/app/api/settings/proxies/auto-test/route.ts"
);
const { POST: batchActivatePost } = await import(
  "../../src/app/api/settings/proxies/batch-activate/route.ts"
);

function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  delete process.env.PROXY_HEALTH_AUTO_DEACTIVATE;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── status-write policy ───────────────────────────────────────────────────────
test("policy: automated probes never write status by default", () => {
  assert.equal(resolveHealthCheckStatusWrite(false, {}), null);
  assert.equal(resolveHealthCheckStatusWrite(true, {}), null);
  assert.equal(isProxyHealthAutoDeactivateEnabled({}), false);
});

test("policy: PROXY_HEALTH_AUTO_DEACTIVATE=true restores legacy test-and-set", () => {
  const env = { PROXY_HEALTH_AUTO_DEACTIVATE: "true" };
  assert.equal(resolveHealthCheckStatusWrite(false, env), "inactive");
  assert.equal(resolveHealthCheckStatusWrite(true, env), "active");
  assert.equal(isProxyHealthAutoDeactivateEnabled(env), true);
});

// ── (#3) "Test All" must not deactivate proxies by default ─────────────────────
test("auto-test does NOT deactivate a failing proxy by default", async () => {
  resetStorage();
  // Dead proxy: nothing listens on this port → the probe fails immediately.
  const p = await proxiesDb.createProxy({
    name: "dead",
    type: "http",
    host: "127.0.0.1",
    port: 1,
  });
  assert.ok(p?.id);
  assert.equal(p.status, "active");

  const req = new Request("http://localhost/api/settings/proxies/auto-test", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ids: [p.id] }),
  });
  const res = await autoTestPost(req);
  assert.equal(res.status, 200);
  const body = await res.json();
  // The probe reports it dead...
  assert.equal(body.results?.[0]?.alive, false);
  // ...but the stored status is untouched (the regression flipped it to inactive).
  const after = await proxiesDb.getProxyById(p.id, { includeSecrets: false });
  assert.equal(after?.status, "active", "auto-test must not mutate proxy status by default");
});

test("auto-test still deactivates when PROXY_HEALTH_AUTO_DEACTIVATE=true (opt-in)", async () => {
  resetStorage();
  process.env.PROXY_HEALTH_AUTO_DEACTIVATE = "true";
  const p = await proxiesDb.createProxy({
    name: "dead",
    type: "http",
    host: "127.0.0.1",
    port: 1,
  });
  assert.ok(p?.id);
  const req = new Request("http://localhost/api/settings/proxies/auto-test", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ids: [p.id] }),
  });
  const res = await autoTestPost(req);
  assert.equal(res.status, 200);
  const after = await proxiesDb.getProxyById(p.id, { includeSecrets: false });
  assert.equal(after?.status, "inactive");
  delete process.env.PROXY_HEALTH_AUTO_DEACTIVATE;
});

// ── (#4) bulk enable/disable proxies ──────────────────────────────────────────
test("batch-activate bulk-enables multiple proxies (default status=active)", async () => {
  resetStorage();
  const a = await proxiesDb.createProxy({ name: "a", type: "http", host: "127.0.0.1", port: 8080 });
  const b = await proxiesDb.createProxy({ name: "b", type: "http", host: "127.0.0.1", port: 8081 });
  await proxiesDb.updateProxy(a!.id, { status: "inactive" });
  await proxiesDb.updateProxy(b!.id, { status: "inactive" });

  const req = new Request("http://localhost/api/settings/proxies/batch-activate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ids: [a!.id, b!.id] }),
  });
  const res = await batchActivatePost(req);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.updated, 2);
  assert.equal(body.status, "active");
  assert.equal((await proxiesDb.getProxyById(a!.id, { includeSecrets: false }))?.status, "active");
  assert.equal((await proxiesDb.getProxyById(b!.id, { includeSecrets: false }))?.status, "active");
});

test("batch-activate can bulk-disable with status=inactive", async () => {
  resetStorage();
  const a = await proxiesDb.createProxy({ name: "a", type: "http", host: "127.0.0.1", port: 8080 });
  const req = new Request("http://localhost/api/settings/proxies/batch-activate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ids: [a!.id], status: "inactive" }),
  });
  const res = await batchActivatePost(req);
  assert.equal(res.status, 200);
  assert.equal((await proxiesDb.getProxyById(a!.id, { includeSecrets: false }))?.status, "inactive");
});

test("batch-activate rejects an empty ids array with 400", async () => {
  resetStorage();
  const req = new Request("http://localhost/api/settings/proxies/batch-activate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ids: [] }),
  });
  const res = await batchActivatePost(req);
  assert.equal(res.status, 400);
});
