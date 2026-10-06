import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-repro-8995-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");

async function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#8995: resolveProxyForConnection surfaces the proxy NAME for an account-level assignment", async () => {
  await resetStorage();

  // Create a named proxy
  const created = await proxiesDb.createProxy({
    name: "My US Proxy",
    type: "http",
    host: "203.0.113.10",
    port: 3128,
    username: "user1",
    password: "pass1",
  });
  assert.ok(created?.id, "proxy must be created");

  // Assign at account (connection) scope
  await proxiesDb.assignProxyToScope("account", "conn-8995", created.id);

  // Resolve — this is what the dashboard calls via /api/settings/proxy?resolve=conn-8995
  const result = await settingsDb.resolveProxyForConnection("conn-8995");

  assert.ok(result, "resolveProxyForConnection must return a result");
  assert.ok(result.proxy, "result must have a proxy object");
  assert.equal(
    result.proxy.name,
    "My US Proxy",
    "resolveProxyForConnection must include the proxy name so the dashboard badge can show it"
  );
});
