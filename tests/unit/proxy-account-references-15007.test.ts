import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-refs-15007-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const { handleProxyDelete } = await import("../../src/lib/api/proxyRegistryRouteHandlers.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("account proxy references participate in where-used and default DELETE without leaking account data", async () => {
  const proxy = await proxiesDb.createProxy({
    name: "Shared account proxy",
    type: "http",
    host: "proxy.invalid",
    port: 8080,
  });
  assert.ok(proxy?.id);

  const first = await providersDb.createProviderConnection({
    provider: "opencode",
    authType: "no-auth",
    name: "first connection",
    providerSpecificData: {
      fingerprints: ["account-secret-a", "account-secret-b"],
      accountProxies: [
        { fingerprint: "account-secret-a", proxyId: proxy.id },
        { fingerprint: "account-secret-b", proxyId: proxy.id },
      ],
    },
  });
  const second = await providersDb.createProviderConnection({
    provider: "opencode-zen",
    authType: "apikey",
    name: "second connection",
    apiKey: "fixture-api-key-must-not-leak",
    providerSpecificData: {
      fingerprints: ["account-secret-c"],
      accountProxies: [{ fingerprint: "account-secret-c", proxyId: proxy.id }],
    },
  });
  await proxiesDb.assignProxyToScope("provider", "fixture-provider", proxy.id);

  const usage = await proxiesDb.getProxyWhereUsed(proxy.id);
  assert.equal(usage.count, 4);
  assert.equal(usage.assignmentCount, 1);
  assert.equal(usage.accountReferenceCount, 3);
  assert.deepEqual(usage.accountReferences, [
    { connectionId: first.id, provider: "opencode", accountCount: 2 },
    { connectionId: second.id, provider: "opencode-zen", accountCount: 1 },
  ]);

  const diagnostics = JSON.stringify(usage);
  assert.doesNotMatch(
    diagnostics,
    /account-secret|fixture-api-key|first connection|second connection/
  );

  const response = await handleProxyDelete(
    new Request(`http://localhost/api/settings/proxies?id=${proxy.id}`, { method: "DELETE" })
  );
  assert.equal(response.status, 409);
  const body = (await response.json()) as {
    error?: { details?: { accountReferenceCount?: number } };
  };
  assert.equal(body.error?.details?.accountReferenceCount, 3);
  assert.ok(await proxiesDb.getProxyById(proxy.id));
});

test("forced deletion preserves required account bindings until an explicit unbind", async () => {
  const proxy = await proxiesDb.createProxy({
    name: "Required account proxy",
    type: "http",
    host: "required.invalid",
    port: 8080,
  });
  const connection = await providersDb.createProviderConnection({
    provider: "opencode",
    authType: "no-auth",
    name: "forced deletion connection",
    providerSpecificData: {
      fingerprints: ["account-a"],
      accountProxies: [{ fingerprint: "account-a", proxyId: proxy.id }],
    },
  });

  assert.equal(await proxiesDb.deleteProxyById(proxy.id, { force: true }), true);
  assert.equal(await proxiesDb.getProxyById(proxy.id), null);

  const [afterForce] = await providersDb.getProviderConnections({ id: connection.id });
  assert.deepEqual(
    (afterForce.providerSpecificData as { accountProxies: unknown[] }).accountProxies,
    [{ fingerprint: "account-a", proxyId: proxy.id }],
    "force delete must leave an unresolved required-proxy binding"
  );
  assert.equal((await proxiesDb.getProxyWhereUsed(proxy.id)).accountReferenceCount, 1);

  await providersDb.updateProviderConnection(connection.id, {
    providerSpecificData: { fingerprints: ["account-a"], accountProxies: [] },
  });
  const [afterUnbind] = await providersDb.getProviderConnections({ id: connection.id });
  assert.deepEqual(
    (afterUnbind.providerSpecificData as { accountProxies: unknown[] }).accountProxies,
    [],
    "explicit unbind removes the required-proxy intent"
  );
  assert.equal((await proxiesDb.getProxyWhereUsed(proxy.id)).accountReferenceCount, 0);
});
