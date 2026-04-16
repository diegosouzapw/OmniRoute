import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-proxies-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("proxy CRUD redacts secrets by default and preserves stored credentials on blank update", async () => {
  const created = await proxiesDb.createProxy({
    name: "Primary Proxy",
    type: "http",
    host: "proxy.local",
    port: 8080,
    username: "user-a",
    password: "pass-a",
    region: "sa-east-1",
  });

  assert.equal(created.username, "***");
  assert.equal(created.password, "***");

  const withSecrets = await proxiesDb.getProxyById(created.id, { includeSecrets: true });
  const updated = await proxiesDb.updateProxy(created.id, {
    host: "proxy-updated.local",
    username: "",
    password: "",
    notes: "updated",
  });
  const updatedWithSecrets = await proxiesDb.getProxyById(created.id, { includeSecrets: true });
  const listed = await proxiesDb.listProxies();

  assert.equal(withSecrets.username, "user-a");
  assert.equal(withSecrets.password, "pass-a");
  assert.equal(updated.host, "proxy-updated.local");
  assert.equal(updated.notes, "updated");
  assert.equal(updatedWithSecrets.username, "user-a");
  assert.equal(updatedWithSecrets.password, "pass-a");
  assert.equal(listed.length, 1);
  assert.equal(listed[0].username, "***");
  assert.equal(listed[0].password, "***");
});

test("proxy assignments resolve by account, provider and global scope", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Proxy Target",
    apiKey: "sk-proxy",
  });
  const globalProxy = await proxiesDb.createProxy({
    name: "Global",
    type: "http",
    host: "global.local",
    port: 8080,
  });
  const providerProxy = await proxiesDb.createProxy({
    name: "Provider",
    type: "https",
    host: "provider.local",
    port: 443,
  });
  const accountProxy = await proxiesDb.createProxy({
    name: "Account",
    type: "socks5",
    host: "account.local",
    port: 1080,
  });

  await proxiesDb.assignProxyToScope("global", null, globalProxy.id);
  await proxiesDb.assignProxyToScope("provider", "openai", providerProxy.id);

  const providerResolved = await proxiesDb.resolveProxyForProvider("openai");
  const beforeAccount = await proxiesDb.resolveProxyForConnectionFromRegistry(connection.id);

  await proxiesDb.assignProxyToScope("key", connection.id, accountProxy.id);

  const assignmentsForAccountProxy = await proxiesDb.getProxyAssignments({
    proxyId: accountProxy.id,
  });
  const accountResolved = await proxiesDb.resolveProxyForConnectionFromRegistry(connection.id);
  const usage = await proxiesDb.getProxyWhereUsed(accountProxy.id);

  assert.equal(providerResolved.host, "provider.local");
  assert.equal(beforeAccount.level, "provider");
  assert.equal(assignmentsForAccountProxy.length, 1);
  assert.equal(assignmentsForAccountProxy[0].scope, "account");
  assert.equal(accountResolved.level, "account");
  assert.equal(accountResolved.proxy.host, "account.local");
  assert.equal(usage.count, 1);
});

test("bulk assignment deduplicates scope ids and reports failures for missing proxies", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Bulk One",
    apiKey: "sk-bulk-1",
  });
  const second = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Bulk Two",
    apiKey: "sk-bulk-2",
  });
  const proxy = await proxiesDb.createProxy({
    name: "Bulk Proxy",
    type: "http",
    host: "bulk.local",
    port: 8080,
  });

  const success = await proxiesDb.bulkAssignProxyToScope(
    "account",
    [first.id, second.id, first.id, " "],
    proxy.id
  );
  const failure = await proxiesDb.bulkAssignProxyToScope(
    "account",
    [first.id, second.id],
    "missing-proxy"
  );

  assert.equal(success.updated, 2);
  assert.deepEqual(success.failed, []);
  assert.equal(failure.updated, 0);
  assert.equal(failure.failed.length, 2);
  assert.match(failure.failed[0].reason, /Proxy not found/);
});

test("proxy health stats aggregate proxy_logs and force delete removes assignments", async () => {
  const proxy = await proxiesDb.createProxy({
    name: "Stats Proxy",
    type: "http",
    host: "stats.local",
    port: 8080,
  });

  await proxiesDb.assignProxyToScope("global", null, proxy.id);

  const db = core.getDbInstance();
  const now = new Date().toISOString();
  const insertLog = db.prepare(`
    INSERT INTO proxy_logs (
      id, timestamp, status, proxy_type, proxy_host, proxy_port, latency_ms
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  insertLog.run("proxy-log-1", now, "success", "http", "stats.local", 8080, 100);
  insertLog.run("proxy-log-2", now, "error", "http", "stats.local", 8080, 250);
  insertLog.run("proxy-log-3", now, "timeout", "http", "stats.local", 8080, 400);

  const stats = await proxiesDb.getProxyHealthStats({ hours: 2 });

  assert.deepEqual(stats[0], {
    proxyId: proxy.id,
    name: "Stats Proxy",
    type: "http",
    host: "stats.local",
    port: 8080,
    totalRequests: 3,
    successCount: 1,
    errorCount: 1,
    timeoutCount: 1,
    successRate: 33.33,
    avgLatencyMs: 250,
    lastSeenAt: now,
  });

  assert.equal(await proxiesDb.deleteProxyById(proxy.id, { force: true }), true);
  assert.equal((await proxiesDb.getProxyAssignments()).length, 0);
  assert.equal(await proxiesDb.getProxyById(proxy.id), null);
});

test("assignProxyToScope normalizes key scope, supports removal, and blocks deleting in-use proxies", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Assigned Account",
    apiKey: "sk-assigned",
  });
  const proxy = await proxiesDb.createProxy({
    name: "Assigned Proxy",
    type: "http",
    host: "assigned.local",
    port: 8080,
  });

  const assignment = await proxiesDb.assignProxyToScope("key", connection.id, proxy.id);

  assert.equal(assignment.scope, "account");
  assert.equal((await proxiesDb.getProxyAssignments({ scope: "key" })).length, 1);

  await assert.rejects(
    () => proxiesDb.deleteProxyById(proxy.id),
    /Remove assignments first or use force=true/
  );

  const removed = await proxiesDb.assignProxyToScope("key", connection.id, null);

  assert.equal(removed, null);
  assert.equal((await proxiesDb.getProxyAssignments({ scope: "account" })).length, 0);
  assert.equal(await proxiesDb.deleteProxyById(proxy.id), true);
});

test("legacy proxy config migrates into the registry and subsequent runs can be skipped", async () => {
  const db = core.getDbInstance();

  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "proxyConfig",
    "global",
    JSON.stringify("http://global-user:global-pass@global.local:8080")
  );
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "proxyConfig",
    "providers",
    JSON.stringify({
      openai: "https://provider.local:8443",
      broken: "not a proxy url",
    })
  );
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "proxyConfig",
    "combos",
    JSON.stringify({
      "combo-1": {
        type: "socks5",
        host: "combo.local",
        port: 1080,
      },
    })
  );
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "proxyConfig",
    "keys",
    JSON.stringify({
      "conn-1": {
        type: "http",
        host: "account.local",
        port: 9000,
      },
    })
  );

  const migrated = await proxiesDb.migrateLegacyProxyConfigToRegistry();
  const assignments = await proxiesDb.getProxyAssignments();
  const proxies = await proxiesDb.listProxies({ includeSecrets: true });
  const skipped = await proxiesDb.migrateLegacyProxyConfigToRegistry();

  assert.equal(migrated.skipped, false);
  assert.equal(migrated.migrated, 4);
  assert.equal(proxies.length, 4);
  assert.equal(assignments.length, 4);
  assert.equal(skipped.skipped, true);
  assert.equal(skipped.reason, "registry_not_empty");
});

test("provider resolution falls back to the global assignment and health stats stay nullable without logs", async () => {
  const globalProxy = await proxiesDb.createProxy({
    name: "Global Only",
    type: "http",
    host: "fallback.local",
    port: 8080,
  });

  await proxiesDb.assignProxyToScope("global", null, globalProxy.id);

  const resolved = await proxiesDb.resolveProxyForProvider("missing-provider");
  const stats = await proxiesDb.getProxyHealthStats({ hours: 24 * 400 });

  assert.equal(resolved.host, "fallback.local");
  assert.equal(stats[0].proxyId, globalProxy.id);
  assert.equal(stats[0].totalRequests, 0);
  assert.equal(stats[0].successRate, null);
  assert.equal(stats[0].avgLatencyMs, null);
  assert.equal((await proxiesDb.resolveProxyForProvider("openai")).host, "fallback.local");
});
