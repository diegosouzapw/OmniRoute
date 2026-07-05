/**
 * TDD — #6246 IP leak (part 1, fail-closed).
 *
 * When a proxy is ASSIGNED to a connection (account/provider/global scope) but is
 * dead/inactive, `resolveProxyForConnection` returns a direct result (no alive
 * proxy resolved). The chat path used to egress DIRECTLY in that case, leaking
 * the operator's real IP. The fix is a fail-closed guard: if the only reason a
 * connection resolves to direct is that its ASSIGNED proxy is dead, block instead
 * of leaking. Explicit "proxy off" toggles are a deliberate direct choice and must
 * NOT be treated as a leak.
 *
 * This test exercises the pure DB predicate `hasBlockingProxyAssignment`, which
 * encodes exactly that decision (honoring the global + connection proxy toggles).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-6246-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function setGlobalProxyEnabled(enabled: boolean) {
  const db = core.getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'proxyEnabled', ?)"
  ).run(JSON.stringify(enabled));
}

async function makeConnection(): Promise<string> {
  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apiKey",
    name: `Conn ${Date.now()} ${Math.random()}`,
    apiKey: "sk-test",
  });
  return (conn as { id: string }).id;
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("BLOCKS: an account proxy assigned but marked inactive (the IP-leak case)", async () => {
  await resetStorage();
  const connId = await makeConnection();
  const proxy = await proxiesDb.createProxy({
    name: "Dead paid proxy",
    type: "http",
    host: "127.0.0.1",
    port: 9001,
  });
  await proxiesDb.updateProxy(proxy!.id, { status: "inactive" });
  await proxiesDb.assignProxyToScope("account", connId, proxy!.id);

  assert.equal(
    proxiesDb.hasBlockingProxyAssignment(connId),
    true,
    "a dead assigned proxy must block, not fall back to a direct egress"
  );
});

test("ALLOWS DIRECT: a connection with no proxy assignment at all", async () => {
  await resetStorage();
  const connId = await makeConnection();
  assert.equal(
    proxiesDb.hasBlockingProxyAssignment(connId),
    false,
    "no assignment = user never configured a proxy = direct is legitimate"
  );
});

test("NOT BLOCKING: an assigned proxy that is still ALIVE", async () => {
  await resetStorage();
  const connId = await makeConnection();
  const proxy = await proxiesDb.createProxy({
    name: "Live proxy",
    type: "http",
    host: "127.0.0.1",
    port: 9002,
  });
  await proxiesDb.assignProxyToScope("account", connId, proxy!.id);

  assert.equal(
    proxiesDb.hasBlockingProxyAssignment(connId),
    false,
    "an alive assigned proxy resolves normally; nothing to block"
  );
});

test("EXPLICIT DIRECT: global proxyEnabled=false is a deliberate choice, not a leak", async () => {
  await resetStorage();
  const connId = await makeConnection();
  const proxy = await proxiesDb.createProxy({
    name: "Dead proxy",
    type: "http",
    host: "127.0.0.1",
    port: 9003,
  });
  await proxiesDb.updateProxy(proxy!.id, { status: "inactive" });
  await proxiesDb.assignProxyToScope("account", connId, proxy!.id);
  setGlobalProxyEnabled(false);

  assert.equal(
    proxiesDb.hasBlockingProxyAssignment(connId),
    false,
    "operator turned proxying off globally — direct is intended, do not block"
  );
});

test("BLOCKS: a dead GLOBAL proxy assignment blocks any connection", async () => {
  await resetStorage();
  const connId = await makeConnection();
  const proxy = await proxiesDb.createProxy({
    name: "Dead global proxy",
    type: "http",
    host: "127.0.0.1",
    port: 9004,
  });
  await proxiesDb.updateProxy(proxy!.id, { status: "error" });
  await proxiesDb.assignProxyToScope("global", null, proxy!.id);

  assert.equal(
    proxiesDb.hasBlockingProxyAssignment(connId),
    true,
    "a dead global proxy assignment must block, not leak direct"
  );
});
