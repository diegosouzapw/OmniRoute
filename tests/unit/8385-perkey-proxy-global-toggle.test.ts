import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-8385-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");

interface ConnectionRef {
  id: string;
}

interface ProxyResolution {
  level: string | null;
  proxy: unknown;
}

async function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("issue #8385: global perKeyProxyEnabled=false must override a connection's per_key_proxy_enabled=1", async () => {
  await resetStorage();

  core
    .getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'perKeyProxyEnabled', 'false')"
    )
    .run();

  const conn = (await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "conn-8385",
    apiKey: "sk-8385",
  })) as unknown as ConnectionRef;
  await providersDb.updateProviderConnection(conn.id, { perKeyProxyEnabled: true });

  const proxy = await proxiesDb.createProxy({
    name: "Per-Key Proxy 8385",
    type: "http",
    host: "perkey.8385.local",
    port: 8080,
  });

  const key = await apiKeysDb.createApiKey("probe-8385-key", "machine-8385");
  await apiKeysDb.updateApiKeyPermissions(key.id, { proxyId: proxy.id });

  const resolved = (await settingsDb.resolveProxyForConnection(
    conn.id,
    key.id
  )) as unknown as ProxyResolution;

  assert.notEqual(
    resolved?.level,
    "apiKey",
    `expected global-off to override per-key assignment, but got level=${resolved?.level} proxy=${JSON.stringify(resolved?.proxy)}`
  );
});

test("issue #8385: global perKeyProxyEnabled=true still allows the per-key assignment to apply", async () => {
  await resetStorage();

  core
    .getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'perKeyProxyEnabled', 'true')"
    )
    .run();

  const conn = (await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "conn-8385-on",
    apiKey: "sk-8385-on",
  })) as unknown as ConnectionRef;
  await providersDb.updateProviderConnection(conn.id, { perKeyProxyEnabled: true });

  const proxy = await proxiesDb.createProxy({
    name: "Per-Key Proxy 8385 On",
    type: "http",
    host: "perkey-on.8385.local",
    port: 8081,
  });

  const key = await apiKeysDb.createApiKey("probe-8385-key-on", "machine-8385-on");
  await apiKeysDb.updateApiKeyPermissions(key.id, { proxyId: proxy.id });

  const resolved = (await settingsDb.resolveProxyForConnection(
    conn.id,
    key.id
  )) as unknown as ProxyResolution;

  assert.equal(
    resolved?.level,
    "apiKey",
    `expected global-on to allow the per-key assignment, but got level=${resolved?.level}`
  );
});
