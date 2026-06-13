import test, { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { proxyConfigToUrl } from "../../open-sse/utils/proxyDispatcher.ts";

describe("resolved proxy config → URL family encoding", () => {
  it("encodes ipv6 family resolved from a connection's proxy", () => {
    const resolved = { type: "socks5", host: "proxy.example.com", port: 1080, family: "ipv6" };
    const url = proxyConfigToUrl(resolved);
    assert.ok(url!.endsWith("?family=ipv6"), url!);
  });
  it("omits family marker when auto", () => {
    const url = proxyConfigToUrl({ type: "http", host: "p.example.com", port: 8080, family: "auto" });
    assert.ok(!url!.includes("family="), url!);
  });
});

// ──────────────── Integration: family survives the resolveProxyForConnection cascade ──
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-resolve-family-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");

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

test("account-level registry proxy carries family=ipv6 through resolveProxyForConnection", async () => {
  await resetStorage();
  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "acct-ipv6",
    apiKey: "sk-acct-ipv6",
  });
  const proxy = await proxiesDb.createProxy({
    name: "IPv6 Account Proxy",
    type: "socks5",
    host: "acct.ipv6.local",
    port: 1080,
    family: "ipv6",
  });
  await proxiesDb.assignProxyToScope("account", (conn as any).id, proxy.id);

  const resolved = await settingsDb.resolveProxyForConnection((conn as any).id);
  assert.ok(resolved);
  assert.equal((resolved as any).proxy.family, "ipv6");
});

test("provider-level registry proxy carries family=ipv6", async () => {
  await resetStorage();
  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "prov-ipv6",
    apiKey: "sk-prov-ipv6",
  });
  const proxy = await proxiesDb.createProxy({
    name: "IPv6 Provider Proxy",
    type: "http",
    host: "prov.ipv6.local",
    port: 8080,
    family: "ipv6",
  });
  await proxiesDb.assignProxyToScope("provider", "openai", proxy.id);

  const resolved = await settingsDb.resolveProxyForConnection((conn as any).id);
  assert.ok(resolved);
  assert.equal((resolved as any).proxy.family, "ipv6");
});

test("global registry proxy carries family=ipv6", async () => {
  await resetStorage();
  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "glob-ipv6",
    apiKey: "sk-glob-ipv6",
  });
  const proxy = await proxiesDb.createProxy({
    name: "IPv6 Global Proxy",
    type: "http",
    host: "glob.ipv6.local",
    port: 8080,
    family: "ipv6",
  });
  await proxiesDb.assignProxyToScope("global", null, proxy.id);

  const resolved = await settingsDb.resolveProxyForConnection((conn as any).id);
  assert.ok(resolved);
  assert.equal((resolved as any).proxy.family, "ipv6");
});

test("api-key-level proxy carries family=ipv6 (Step 2 object literal)", async () => {
  await resetStorage();
  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "key-ipv6",
    apiKey: "sk-key-ipv6",
  });
  core
    .getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'perKeyProxyEnabled', 'true')"
    )
    .run();
  const proxy = await proxiesDb.createProxy({
    name: "IPv6 API Key Proxy",
    type: "https",
    host: "key.ipv6.local",
    port: 8443,
    family: "ipv6",
  });
  const key = await apiKeysDb.createApiKey("family-key", "machine-f1");
  await apiKeysDb.updateApiKeyPermissions(key.id, { proxyId: proxy.id });

  const resolved = await settingsDb.resolveProxyForConnection((conn as any).id, key.id);
  assert.ok(resolved);
  assert.equal((resolved as any).level, "apiKey");
  assert.equal((resolved as any).proxy.family, "ipv6");
});
