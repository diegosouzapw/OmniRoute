import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";

// A manual registry row can be attached to an existing subscription by update,
// and detached again with null. Sync leaves manual rows alone.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-attach-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxies = await import("../../src/lib/db/proxies.ts");
const schema = await import("../../src/shared/validation/schemas/proxy.ts");
const stale = await import("../../src/lib/proxySubscription/staleNodes.ts");
const sub = await import("../../src/lib/proxySubscription/index.ts");
const { handleProxyUpdate } = await import("../../src/lib/api/proxyRegistryRouteHandlers.ts");

function reset() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function insertSubscription(id: string, url: string) {
  const now = new Date().toISOString();
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO proxy_subscriptions
        (id, name, url, enabled, mode, rule_providers, update_interval_minutes, status, created_at, updated_at)
       VALUES (?, ?, ?, 1, 'global', NULL, 60, 'empty', ?, ?)`
    )
    .run(id, `sub-${id}`, url, now, now);
}

function startFeedServer(body: string): Promise<{ url: string; close: () => Promise<void> }> {
  return new Promise((resolve) => {
    const srv = http.createServer((_req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(body);
    });
    srv.listen(0, "127.0.0.1", () => {
      const addr = srv.address();
      if (!addr || typeof addr === "string") throw new Error("no addr");
      resolve({
        url: `http://127.0.0.1:${addr.port}/list`,
        close: () => new Promise((r) => srv.close(() => r())),
      });
    });
  });
}

let portSeq = 18301;
function nextPort() {
  portSeq += 1;
  return portSeq;
}

function feed(name: string, port: number) {
  return [
    "proxies:",
    `  - name: ${name}`,
    "    type: http",
    "    server: 127.0.0.1",
    `    port: ${port}`,
  ].join("\n");
}

async function attachProxy(proxyId: string, subscriptionId: string | null) {
  const parsed = schema.updateProxyRegistrySchema.parse({ id: proxyId, subscriptionId });
  const { id, ...changes } = parsed;
  return proxies.updateProxy(id, changes);
}

test("update schema accepts an existing subscription id and null detaches", () => {
  const attach = schema.updateProxyRegistrySchema.parse({ id: "p1", subscriptionId: "sub-1" });
  assert.equal(attach.subscriptionId, "sub-1");
  const detach = schema.updateProxyRegistrySchema.parse({ id: "p1", subscriptionId: null });
  assert.equal(detach.subscriptionId, null);
  const untouched = schema.updateProxyRegistrySchema.parse({ id: "p1" });
  assert.equal(untouched.subscriptionId, undefined);
  assert.throws(() => schema.updateProxyRegistrySchema.parse({ id: "p1", subscriptionId: "" }));
});

test("attaching a manual proxy keeps its identity and assignments", async () => {
  reset();
  const port = nextPort();
  const manual = await proxies.createProxy({
    name: "manual",
    type: "https",
    host: "127.0.0.1",
    port,
    username: "op",
    password: "secret",
  });
  await proxies.createProxyAndAssign(
    { name: "other", type: "http", host: "127.0.0.1", port: port + 1000 },
    { scope: "global", scopeId: null }
  );
  await proxies.updateProxyAndAssign(
    manual.id,
    { notes: "keep" },
    { scope: "global", scopeId: null }
  );
  const before = await proxies.getProxyById(manual.id, { includeSecrets: true });
  const server = await startFeedServer(feed("node", port + 2000));
  try {
    insertSubscription("sub-attach", server.url);
    const updated = await attachProxy(manual.id, "sub-attach");

    assert.equal(updated?.subscriptionId, "sub-attach");
    assert.equal(updated?.source, "manual");
    const reread = await proxies.getProxyById(manual.id, { includeSecrets: true });
    assert.equal(reread?.host, before?.host);
    assert.equal(reread?.port, before?.port);
    assert.equal(reread?.username, before?.username);
    assert.equal(reread?.password, before?.password);
    const assignments = await proxies.getProxyAssignments({ proxyId: manual.id });
    assert.equal(assignments.length, 1);

    const detached = await attachProxy(manual.id, null);
    assert.equal(detached?.subscriptionId, null);
    assert.equal(detached?.source, "manual");
    assert.equal((await proxies.getProxyAssignments({ proxyId: manual.id })).length, 1);
  } finally {
    await server.close();
  }
});

test("attaching to an unknown subscription fails without writing", async () => {
  reset();
  const manual = await proxies.createProxy({
    name: "manual",
    type: "http",
    host: "127.0.0.1",
    port: nextPort(),
  });
  await assert.rejects(attachProxy(manual.id, "no-such-sub"), /Subscription not found/);
  assert.equal((await proxies.getProxyById(manual.id))?.subscriptionId, null);
});

test("sync import of a known subscription never fails the existence check", async () => {
  reset();
  const port = nextPort();
  const server = await startFeedServer(feed("node", port));
  try {
    insertSubscription("sub-sync", server.url);
    const created = await proxies.upsertProxy({
      name: "synced",
      type: "http",
      host: "127.0.0.1",
      port,
      subscriptionId: "sub-sync",
    });
    assert.equal(created.action, "created");

    const again = await proxies.upsertProxy(
      {
        name: "synced-v2",
        type: "http",
        host: "127.0.0.1",
        port,
        subscriptionId: "sub-sync",
      },
      { claimOwnership: false }
    );
    assert.equal(again.action, "updated");
    assert.equal(again.proxy?.name, "synced-v2");
  } finally {
    await server.close();
  }
});

test("a manual proxy with the same tuple is left alone by sync", async () => {
  reset();
  const port = nextPort();
  const manual = await proxies.createProxy({
    name: "manual",
    type: "https",
    host: "127.0.0.1",
    port,
    password: "manual-pass",
    status: "inactive",
  });
  const before = await proxies.getProxyById(manual.id, { includeSecrets: true });
  const server = await startFeedServer(feed("feed-node", port));
  try {
    insertSubscription("sub-skip", server.url);
    const result = await sub.syncSubscription("sub-skip");

    assert.deepEqual(await proxies.getProxyById(manual.id, { includeSecrets: true }), before);
    assert.equal(result.boundProxies, 0);
  } finally {
    await server.close();
  }
});

test("an assigned attach via the assign path fails closed on an unknown subscription", async () => {
  reset();
  const manual = await proxies.createProxy({
    name: "manual",
    type: "http",
    host: "127.0.0.1",
    port: nextPort(),
  });
  await assert.rejects(
    proxies.updateProxyAndAssign(
      manual.id,
      { subscriptionId: "no-such-sub" },
      { scope: "global", scopeId: null }
    ),
    /Subscription not found/
  );
});

test("an attached row joins the pool on the next apply", async () => {
  reset();
  const port = nextPort();
  const manual = await proxies.createProxy({
    name: "manual",
    type: "http",
    host: "127.0.0.1",
    port,
  });
  const server = await startFeedServer(feed("other", port + 5000));
  try {
    insertSubscription("sub-apply", server.url);
    await attachProxy(manual.id, "sub-apply");
    await sub.applySubscription("sub-apply");

    const pooled = core
      .getDbInstance()
      .prepare(
        "SELECT COUNT(*) AS n FROM proxy_assignments WHERE proxy_id = ? AND scope = 'global'"
      )
      .get(manual.id) as { n: number };
    assert.equal(pooled.n, 1);
  } finally {
    await server.close();
  }
});

test("stale cleanup detaches a manual row and deletes a subscription row", async () => {
  reset();
  const manual = await proxies.createProxy({
    name: "manual",
    type: "http",
    host: "127.0.0.1",
    port: nextPort(),
  });
  const server = await startFeedServer(feed("node", nextPort()));
  try {
    insertSubscription("sub-stale", server.url);
    await attachProxy(manual.id, "sub-stale");
    await sub.syncSubscription("sub-stale");
    const kept = await proxies.getProxyById(manual.id);
    assert.equal(kept?.subscriptionId, null);
    assert.equal(kept?.source, "manual");

    const synced = await proxies.createProxy({
      name: "synced",
      type: "http",
      host: "127.0.0.1",
      port: nextPort(),
      subscriptionId: "sub-stale",
      source: "subscription",
    });
    await stale.removeStaleSubscriptionNodes(core.getDbInstance(), "sub-stale", []);
    assert.equal(await proxies.getProxyById(synced.id), null);
  } finally {
    await server.close();
  }
});

test("deleting a subscription detaches a manual row and deletes a subscription row", async () => {
  reset();
  const port = nextPort();
  const manual = await proxies.createProxy({
    name: "manual",
    type: "http",
    host: "127.0.0.1",
    port,
  });
  await proxies.updateProxyAndAssign(
    manual.id,
    { notes: "keep" },
    { scope: "global", scopeId: null }
  );
  const server = await startFeedServer(feed("node", nextPort()));
  try {
    insertSubscription("sub-delete", server.url);
    await attachProxy(manual.id, "sub-delete");
    const synced = await proxies.createProxy({
      name: "synced",
      type: "http",
      host: "127.0.0.1",
      port: nextPort(),
      subscriptionId: "sub-delete",
      source: "subscription",
    });
    await sub.applySubscription("sub-delete");

    const ok = await sub.deleteSubscription("sub-delete");
    assert.equal(ok, true);

    const kept = await proxies.getProxyById(manual.id);
    assert.equal(kept?.subscriptionId, null);
    assert.equal(kept?.source, "manual");
    assert.equal((await proxies.getProxyAssignments({ proxyId: manual.id })).length, 1);
    assert.equal(await proxies.getProxyById(synced.id), null);
  } finally {
    await server.close();
  }
});

test("unapply keeps the assignments of an attached manual row", async () => {
  reset();
  const manual = await proxies.createProxy({
    name: "manual",
    type: "http",
    host: "127.0.0.1",
    port: nextPort(),
  });
  await proxies.updateProxyAndAssign(
    manual.id,
    { notes: "keep" },
    { scope: "global", scopeId: null }
  );
  const server = await startFeedServer(feed("node", nextPort()));
  try {
    insertSubscription("sub-unapply", server.url);
    await attachProxy(manual.id, "sub-unapply");
    await sub.applySubscription("sub-unapply");
    await sub.unapplySubscription("sub-unapply");

    assert.equal((await proxies.getProxyById(manual.id))?.subscriptionId, "sub-unapply");
    assert.equal((await proxies.getProxyAssignments({ proxyId: manual.id })).length, 1);
  } finally {
    await server.close();
  }
});

test("adopting a row through the update route survives a subscription delete", async () => {
  reset();
  const manual = await proxies.createProxy({
    name: "manual",
    type: "http",
    host: "127.0.0.1",
    port: nextPort(),
  });
  await proxies.updateProxyAndAssign(
    manual.id,
    { notes: "keep" },
    { scope: "global", scopeId: null }
  );
  const server = await startFeedServer(feed("node", nextPort()));
  try {
    insertSubscription("sub-route", server.url);
    const response = await handleProxyUpdate(
      new Request("http://localhost/api/v1/management/proxies", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: manual.id, subscriptionId: "sub-route" }),
      })
    );
    assert.equal(response.status, 200);
    assert.equal((await proxies.getProxyById(manual.id))?.subscriptionId, "sub-route");

    const ok = await sub.deleteSubscription("sub-route");
    assert.equal(ok, true);
    const kept = await proxies.getProxyById(manual.id);
    assert.equal(kept?.subscriptionId, null);
    assert.equal(kept?.source, "manual");
    assert.equal((await proxies.getProxyAssignments({ proxyId: manual.id })).length, 1);
  } finally {
    await server.close();
  }
});
