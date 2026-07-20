import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-proxy-7149-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");

type ProxyResolutionLike = {
  proxy?: { host?: string } | null;
  level?: string;
  levelId?: string | null;
} | null;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#7149: a proxy assigned to a Combo via the dashboard (registry scope='combo') is honored when resolving the proxy for a request routed through that combo", async () => {
  await resetStorage();

  const comboProxy = await proxiesDb.createProxy({
    name: "Combo-Assigned Proxy",
    type: "http",
    host: "10.20.30.40",
    port: 8888,
  });
  assert.ok(comboProxy?.id);

  const combo = await combosDb.createCombo({
    name: "diy_deepseek-v4-flash",
    strategy: "round-robin",
    models: ["openai/gpt-4"],
  });
  const comboRecord = combo as Record<string, unknown>;
  assert.ok(comboRecord?.id);
  const comboId = comboRecord.id as string;

  const assignment = await proxiesDb.assignProxyToScope("combo", comboId, comboProxy!.id);
  assert.ok(assignment, "assignProxyToScope('combo', ...) should persist the assignment");

  const directRegistryLookup = (await proxiesDb.resolveProxyForScopeFromRegistry(
    "combo",
    comboId
  )) as ProxyResolutionLike;
  assert.ok(
    directRegistryLookup?.proxy,
    "the registry must be able to answer a direct combo-scope lookup"
  );
  assert.equal(directRegistryLookup?.proxy?.host, "10.20.30.40");

  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-test-1234",
    name: "openai-account-1",
  });
  const connectionRecord = connection as Record<string, unknown> | null;
  const connectionId = connectionRecord?.id as string;
  assert.ok(connectionId, "test setup requires a real connection id");

  const resolved = (await settingsDb.resolveProxyForConnection(
    connectionId
  )) as ProxyResolutionLike;

  assert.equal(
    resolved?.level,
    "combo",
    `expected the combo-assigned proxy to be resolved (level="combo"), got level="${resolved?.level}" — the registry-based combo proxy assignment is never consulted by resolveProxyForConnection()`
  );
  assert.equal(resolved?.proxy?.host, "10.20.30.40");
});
