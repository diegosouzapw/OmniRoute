/**
 * TDD — proxy resolution must not hand out a proxy that has been explicitly
 * marked dead (status inactive/error/disabled). Today the resolution queries
 * JOIN proxy_registry without any status filter, so an operator (or a health
 * check) marking a proxy dead has no effect — it keeps being assigned, every
 * request pays the timeout, and accounts fail. Part of the codex-invalidation
 * proxy hardening.
 *
 * Conservative: only EXCLUDE explicit dead states; active/null/unknown stay
 * usable so we never strand a working proxy.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-status-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("resolution SKIPS an account proxy marked inactive", async () => {
  await resetStorage();
  const proxy = await proxiesDb.createProxy({
    name: "Dead Account Proxy",
    type: "http",
    host: "127.0.0.1",
    port: 9991,
  });
  await proxiesDb.updateProxy(proxy!.id, { status: "inactive" });
  await proxiesDb.assignProxyToScope("account", "conn-dead", proxy!.id);

  const resolved = await proxiesDb.resolveProxyForConnectionFromRegistry("conn-dead");
  assert.equal(resolved, null, "a dead account proxy must not be resolved");
});

test("resolution STILL returns an active account proxy", async () => {
  await resetStorage();
  const proxy = await proxiesDb.createProxy({
    name: "Live Account Proxy",
    type: "http",
    host: "127.0.0.1",
    port: 8081,
  });
  await proxiesDb.assignProxyToScope("account", "conn-live", proxy!.id);

  const resolved = await proxiesDb.resolveProxyForConnectionFromRegistry("conn-live");
  assert.ok(resolved, "active proxy must resolve");
  assert.equal((resolved as any).proxy.host, "127.0.0.1");
  assert.equal((resolved as any).level, "account");
});

test("scope resolver skips a dead provider proxy (status=error)", async () => {
  await resetStorage();
  const provProxy = await proxiesDb.createProxy({
    name: "Dead Provider Proxy",
    type: "http",
    host: "10.0.0.1",
    port: 9992,
  });
  await proxiesDb.updateProxy(provProxy!.id, { status: "error" });
  await proxiesDb.assignProxyToScope("provider", "codex", provProxy!.id);

  const resolved = await proxiesDb.resolveProxyForScopeFromRegistry("provider", "codex");
  assert.equal(resolved, null, "a dead provider proxy must not be resolved");
});

test("scope resolver still returns a live global proxy", async () => {
  await resetStorage();
  const globalProxy = await proxiesDb.createProxy({
    name: "Live Global Proxy",
    type: "http",
    host: "10.0.0.2",
    port: 8082,
  });
  await proxiesDb.assignProxyToScope("global", null, globalProxy!.id);

  const resolved = await proxiesDb.resolveProxyForScopeFromRegistry("global");
  assert.ok(resolved, "live global proxy must resolve");
  assert.equal((resolved as any).proxy.host, "10.0.0.2");
});
