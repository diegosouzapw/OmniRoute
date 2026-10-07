import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-9232-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const TEST_PROVIDER = "__test_provider_9232__";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR))
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      break;
    } catch (error: unknown) {
      const code = (error as { code?: string } | undefined)?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else throw error;
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});
test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function setupConnectionWithAssignment() {
  const created = await providersDb.createProviderConnection({
    provider: TEST_PROVIDER,
    authType: "apikey",
    name: `Test conn ${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    apiKey: `sk-test-9232-${Math.random().toString(36).slice(2, 9)}`,
  });
  assert.ok(created?.id, "connection must be created");
  const proxy = await proxiesDb.createProxy({
    name: "Test proxy 9232",
    type: "http",
    host: "proxy.local",
    port: 8080,
  });
  assert.ok(proxy?.id, "proxy must be created");
  const assignment = await proxiesDb.assignProxyToScope("account", created.id, proxy.id);
  assert.ok(assignment, "assignment must be created");
  return created as { id: string };
}

async function getAccountAssignmentsFor(connectionId: string) {
  const all = await proxiesDb.getProxyAssignments({ scope: "account" });
  return all.filter((a) => a.scopeId === connectionId);
}

test("#9232: deleteProviderConnection purges account proxy_assignments for the deleted connection", async () => {
  const conn = await setupConnectionWithAssignment();
  const before = await getAccountAssignmentsFor(conn.id);
  assert.equal(before.length, 1, "sanity: assignment exists before delete");

  const deleted = await providersDb.deleteProviderConnection(conn.id);
  assert.equal(deleted, true, "connection row must be deleted");

  const after = await getAccountAssignmentsFor(conn.id);
  assert.equal(after.length, 0, "EXPECTED: proxy_assignments rows purged with the connection");
});

test("#9232: deleteProviderConnections purges account proxy_assignments for the whole batch", async () => {
  const connA = await setupConnectionWithAssignment();
  const connB = await setupConnectionWithAssignment();
  assert.equal((await getAccountAssignmentsFor(connA.id)).length, 1);
  assert.equal((await getAccountAssignmentsFor(connB.id)).length, 1);

  const deleted = await providersDb.deleteProviderConnections([connA.id, connB.id]);
  assert.equal(deleted, 2, "both connections deleted");

  assert.equal((await getAccountAssignmentsFor(connA.id)).length, 0);
  assert.equal((await getAccountAssignmentsFor(connB.id)).length, 0);
});

test("#9232: deleteProviderConnectionsByProvider purges account proxy_assignments for all provider connections", async () => {
  const connA = await setupConnectionWithAssignment();
  const connB = await setupConnectionWithAssignment();
  assert.equal((await getAccountAssignmentsFor(connA.id)).length, 1);
  assert.equal((await getAccountAssignmentsFor(connB.id)).length, 1);

  const deleted = await providersDb.deleteProviderConnectionsByProvider(TEST_PROVIDER);
  assert.equal(deleted, 2, "both provider connections deleted");

  assert.equal((await getAccountAssignmentsFor(connA.id)).length, 0);
  assert.equal((await getAccountAssignmentsFor(connB.id)).length, 0);
});

test("#9232: deleteProviderConnections with an empty batch is a no-op and stays valid SQL", async () => {
  const deleted = await providersDb.deleteProviderConnections([]);
  assert.equal(deleted, 0, "empty batch deletes nothing");
});

test("#9232: deleteProviderConnectionsByProvider with no matching connections purges nothing and returns 0", async () => {
  const deleted = await providersDb.deleteProviderConnectionsByProvider(
    "__no_such_provider_9232__"
  );
  assert.equal(deleted, 0, "no provider connections matched, nothing to delete");
});
