import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sub-svc-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxies = await import("../../src/lib/db/proxies.ts");
const sub = await import("../../src/lib/proxySubscription/index.ts");

function reset() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function nowIso() {
  return new Date().toISOString();
}

function insertSubscription(
  db: ReturnType<typeof core.getDbInstance>,
  id: string,
  mode: "global" | "rule",
  opts: { enabled?: boolean; ruleProviders?: string[] } = {}
) {
  db.prepare(
    `INSERT INTO proxy_subscriptions
      (id, name, url, enabled, mode, rule_providers, update_interval_minutes, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'empty', ?, ?)`
  ).run(
    id,
    `sub-${id}`,
    `https://example.com/${id}`,
    opts.enabled === false ? 0 : 1,
    mode,
    opts.ruleProviders ? JSON.stringify(opts.ruleProviders) : null,
    60,
    nowIso(),
    nowIso()
  );
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("global subscription binds its pool to the global scope and is resolvable", async () => {
  await reset();
  const db = core.getDbInstance();
  insertSubscription(db, "s1", "global", { enabled: true });
  const created = await proxies.createProxy({
    name: "node1",
    type: "http",
    host: "10.0.0.1",
    port: 8080,
    source: "subscription",
    subscriptionId: "s1",
    status: "active",
  });

  await sub.applySubscription("s1");

  const resolved = await proxies.resolveProxyForConnectionFromRegistry("conn-xyz");
  assert.ok(resolved, "expected a global proxy to be resolved");
  assert.equal(resolved?.proxy.host, "10.0.0.1");

  const flag = db
    .prepare("SELECT value FROM key_value WHERE namespace='settings' AND key='proxyEnabled'")
    .get() as { value: string };
  assert.equal(JSON.parse(flag.value), true);

  // Unapply -> proxy removed from global scope, proxyEnabled recomputed to false.
  await sub.unapplySubscription("s1");
  const resolved2 = await proxies.resolveProxyForConnectionFromRegistry("conn-xyz");
  assert.equal(resolved2, null, "expected direct (no proxy) after unapply");

  const flag2 = db
    .prepare("SELECT value FROM key_value WHERE namespace='settings' AND key='proxyEnabled'")
    .get() as { value: string };
  assert.equal(JSON.parse(flag2.value), false);
});

test("rule subscription binds only the selected provider scope", async () => {
  await reset();
  const db = core.getDbInstance();
  insertSubscription(db, "s2", "rule", { enabled: true, ruleProviders: ["provA"] });
  const created = await proxies.createProxy({
    name: "node2",
    type: "http",
    host: "10.0.0.2",
    port: 8080,
    source: "subscription",
    subscriptionId: "s2",
    status: "active",
  });

  await sub.applySubscription("s2");

  db.prepare(
    "INSERT INTO provider_connections (id, provider, created_at, updated_at) VALUES (?,?,?,?)"
  ).run("connA", "provA", nowIso(), nowIso());
  db.prepare(
    "INSERT INTO provider_connections (id, provider, created_at, updated_at) VALUES (?,?,?,?)"
  ).run("connB", "provB", nowIso(), nowIso());

  const rA = await proxies.resolveProxyForConnectionFromRegistry("connA");
  assert.ok(rA, "provider A should resolve the rule proxy");
  assert.equal(rA?.proxy.host, "10.0.0.2");

  const rB = await proxies.resolveProxyForConnectionFromRegistry("connB");
  assert.equal(rB, null, "provider B is not in the rule set -> direct");
});

test("fail-closed: a dead subscription proxy blocks the connection instead of leaking", async () => {
  await reset();
  const db = core.getDbInstance();
  insertSubscription(db, "s3", "global", { enabled: true });
  await proxies.createProxy({
    name: "deadnode",
    type: "http",
    host: "10.0.0.9",
    port: 1,
    source: "subscription",
    subscriptionId: "s3",
    status: "dead",
  });

  await sub.applySubscription("s3");

  const flag = db
    .prepare("SELECT value FROM key_value WHERE namespace='settings' AND key='proxyEnabled'")
    .get() as { value: string };
  assert.equal(JSON.parse(flag.value), true);

  // Dead proxy is excluded from resolution -> request would go direct.
  const resolved = await proxies.resolveProxyForConnectionFromRegistry("connZ");
  assert.equal(resolved, null);

  // But the operator assigned a (now dead) proxy, so this must be blocked.
  const blocked = proxies.hasBlockingProxyAssignment("connZ");
  assert.equal(blocked, true);
});

test("deleteSubscription unbinds and removes its proxy rows", async () => {
  await reset();
  const db = core.getDbInstance();
  insertSubscription(db, "s4", "global", { enabled: true });
  await proxies.createProxy({
    name: "node4",
    type: "http",
    host: "10.0.0.4",
    port: 8080,
    source: "subscription",
    subscriptionId: "s4",
    status: "active",
  });
  await sub.applySubscription("s4");

  const ok = await sub.deleteSubscription("s4");
  assert.equal(ok, true);

  const rows = db
    .prepare("SELECT id FROM proxy_registry WHERE subscription_id = ?")
    .all("s4") as Array<{ id: string }>;
  assert.equal(rows.length, 0, "subscription proxy rows should be removed");

  const assignments = db
    .prepare("SELECT 1 FROM proxy_assignments a JOIN proxy_registry p ON p.id=a.proxy_id WHERE p.source='subscription' LIMIT 1")
    .get();
  assert.equal(assignments, undefined, "no subscription proxy should remain assigned");

  const subRow = db.prepare("SELECT 1 FROM proxy_subscriptions WHERE id='s4'").get();
  assert.equal(subRow, undefined);
});

test("global→rule switch re-evaluates binding: drops global, binds the selected provider scope", async () => {
  await reset();
  const db = core.getDbInstance();

  // Seed a proxy node directly (avoids a network fetch for this part).
  await proxies.createProxy({
    name: "node5",
    type: "http",
    host: "10.0.0.5",
    port: 8080,
    source: "subscription",
    subscriptionId: "s5",
    status: "active",
  });

  // Start in GLOBAL mode and bind the pool to the global scope.
  insertSubscription(db, "s5", "global", { enabled: true });
  await sub.applySubscription("s5");

  const before = await proxies.resolveProxyForConnectionFromRegistry("connAny");
  assert.ok(before, "global mode should resolve the node for any connection");
  assert.equal(before?.proxy.host, "10.0.0.5");

  // Switch to RULE mode targeting provider provA. updateSubscription must
  // detach the previous global binding (unapplySubscription) and re-bind the
  // pool to the selected provider scope. Stub fetch so syncSubscription's
  // re-fetch returns a body that keeps node5 around.
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async () => ({
    ok: true,
    text: async () =>
      "proxies:\n  - name: node5\n    type: http\n    server: 10.0.0.5\n    port: 8080\n",
  })) as unknown as typeof fetch;
  try {
    await sub.updateSubscription("s5", { mode: "rule", ruleProviders: ["provA"] });
  } finally {
    globalThis.fetch = realFetch;
  }

  // The global binding must be gone.
  const afterGlobal = await proxies.resolveProxyForConnectionFromRegistry("connAny");
  assert.equal(afterGlobal, null, "global binding should be dropped after switching to rule mode");

  // The provider-scope binding must now resolve the node.
  db.prepare(
    "INSERT INTO provider_connections (id, provider, created_at, updated_at) VALUES (?,?,?,?)"
  ).run("connA", "provA", nowIso(), nowIso());
  const afterRule = await proxies.resolveProxyForConnectionFromRegistry("connA");
  assert.ok(afterRule, "rule mode should bind the node to provider provA");
  assert.equal(afterRule?.proxy.host, "10.0.0.5");
});
