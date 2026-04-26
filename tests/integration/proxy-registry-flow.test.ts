import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-registry-flow-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// Disable dashboard auth for direct route handler calls in CI
// (CI sets JWT_SECRET + INITIAL_PASSWORD, causing isAuthRequired() → true)
process.env.DASHBOARD_PASSWORD = "";
process.env.INITIAL_PASSWORD = "";
delete process.env.JWT_SECRET;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const proxySettingsRoute = await import("../../src/app/api/settings/proxies/route.ts");
const proxyAssignmentsRoute =
  await import("../../src/app/api/settings/proxies/assignments/route.ts");
const proxyBulkRoute = await import("../../src/app/api/settings/proxies/bulk-assign/route.ts");
const proxyHealthRoute = await import("../../src/app/api/settings/proxies/health/route.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("integration: proxy registry full flow works and enforces safe delete", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "proxy-flow-account",
    apiKey: "sk-flow-test",
  });

  const createRes = await proxySettingsRoute.POST(
    new Request("http://localhost/api/settings/proxies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Flow Proxy",
        type: "http",
        host: "flow.local",
        port: 8080,
      }),
    })
  );
  assert.equal(createRes.status, 201);
  const createdProxy = (await createRes.json()) as any;
  assert.ok(createdProxy.id);

  const assignRes = await proxyAssignmentsRoute.PUT(
    new Request("http://localhost/api/settings/proxies/assignments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scope: "account",
        scopeId: connection.id,
        proxyId: createdProxy.id,
      }),
    })
  );
  assert.equal(assignRes.status, 200);

  const resolveRes = await proxyAssignmentsRoute.GET(
    new Request(
      `http://localhost/api/settings/proxies/assignments?resolveConnectionId=${connection.id}`
    )
  );
  assert.equal(resolveRes.status, 200);
  const resolved = (await resolveRes.json()) as any;
  assert.equal(resolved.level, "account");
  assert.equal(resolved.source, "registry");
  assert.equal(resolved.proxy.host, "flow.local");

  const bulkRes = await proxyBulkRoute.PUT(
    new Request("http://localhost/api/settings/proxies/bulk-assign", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scope: "provider",
        scopeIds: ["openai", "anthropic"],
        proxyId: createdProxy.id,
      }),
    })
  );
  assert.equal(bulkRes.status, 200);
  const bulkPayload = (await bulkRes.json()) as any;
  assert.equal(bulkPayload.updated, 2);
  assert.equal(bulkPayload.failed.length, 0);

  proxyLogger.logProxyEvent({
    status: "success",
    proxy: { type: "http", host: "flow.local", port: 8080 },
    latencyMs: 90,
    level: "provider",
    levelId: "openai",
    provider: "openai",
  });
  proxyLogger.logProxyEvent({
    status: "error",
    proxy: { type: "http", host: "flow.local", port: 8080 },
    latencyMs: 240,
    level: "provider",
    levelId: "openai",
    provider: "openai",
  });

  const healthRes = await proxyHealthRoute.GET(
    new Request("http://localhost/api/settings/proxies/health?hours=24")
  );
  assert.equal(healthRes.status, 200);
  const healthPayload = (await healthRes.json()) as any;
  const row = healthPayload.items.find((item) => item.proxyId === createdProxy.id);
  assert.ok(row);
  assert.equal(row.totalRequests >= 2, true);
  assert.equal(row.errorCount >= 1, true);

  const deleteConflictRes = await proxySettingsRoute.DELETE(
    new Request(`http://localhost/api/settings/proxies?id=${createdProxy.id}`, {
      method: "DELETE",
    })
  );
  assert.equal(deleteConflictRes.status, 409);
  const deleteConflict = (await deleteConflictRes.json()) as any;
  assert.equal(deleteConflict.error.type, "conflict");
  assert.equal(typeof deleteConflict.requestId, "string");
  assert.equal(deleteConflict.requestId.length > 0, true);

  const clearAccountAssignment = await proxyAssignmentsRoute.PUT(
    new Request("http://localhost/api/settings/proxies/assignments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scope: "account",
        scopeId: connection.id,
        proxyId: null,
      }),
    })
  );
  assert.equal(clearAccountAssignment.status, 200);

  const clearProviderBulk = await proxyBulkRoute.PUT(
    new Request("http://localhost/api/settings/proxies/bulk-assign", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scope: "provider",
        scopeIds: ["openai", "anthropic"],
        proxyId: null,
      }),
    })
  );
  assert.equal(clearProviderBulk.status, 200);

  const deleteOkRes = await proxySettingsRoute.DELETE(
    new Request(`http://localhost/api/settings/proxies?id=${createdProxy.id}`, {
      method: "DELETE",
    })
  );
  assert.equal(deleteOkRes.status, 200);
  const deleteOkPayload = (await deleteOkRes.json()) as any;
  assert.equal(deleteOkPayload.success, true);
});
