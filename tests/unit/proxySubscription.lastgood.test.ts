import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";

// A failed or invalid source must serve the persisted last_nodes instead of
// emptying the pool. Tests use real 127.0.0.1 servers; loopback fetch targets
// are allowed by the local-first policy.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sub-lastgood-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxies = await import("../../src/lib/db/proxies.ts");
const sub = await import("../../src/lib/proxySubscription/index.ts");

function reset() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const LAST_NODES = [
  {
    name: "good-node",
    type: "http",
    host: "10.9.9.9",
    port: 8080,
    rawProtocol: "http",
    hasAuth: false,
  },
];

function seedOkSubscription(id: string, url: string) {
  const now = new Date().toISOString();
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO proxy_subscriptions
        (id, name, url, enabled, mode, rule_providers, update_interval_minutes, status, error, last_nodes, last_error_at, consecutive_failures, created_at, updated_at)
       VALUES (?, ?, ?, 1, 'global', NULL, 60, 'ok', NULL, ?, NULL, 0, ?, ?)`
    )
    .run(id, `sub-${id}`, url, JSON.stringify(LAST_NODES), now, now);
}

async function seedPool(id: string) {
  await proxies.createProxy({
    name: "good-node",
    type: "http",
    host: "10.9.9.9",
    port: 8080,
    source: "subscription",
    subscriptionId: id,
    status: "active",
  });
}

function poolSize(id: string): number {
  const rows = core
    .getDbInstance()
    .prepare("SELECT id FROM proxy_registry WHERE subscription_id = ?")
    .all(id) as Array<{ id: string }>;
  return rows.length;
}

function startBodyServer(body: string): Promise<{ url: string; close: () => Promise<void> }> {
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

/** URL of a port nothing listens on (connection refused through the real fetch path). */
function deadUrl(): Promise<string> {
  return new Promise((resolve, reject) => {
    const srv = http.createServer(() => {});
    srv.listen(0, "127.0.0.1", () => {
      const addr = srv.address();
      if (!addr || typeof addr === "string") {
        reject(new Error("no addr"));
        return;
      }
      const port = addr.port;
      srv.close(() => resolve(`http://127.0.0.1:${port}/list`));
    });
  });
}

// ─────────────────── Predicate contract (pure, no DB) ───────────────────

test("unrecognized content is refused, every recognized format passes", async () => {
  const parse = await import("../../src/lib/proxySubscription/parse.ts");
  assert.equal(typeof parse.isUsableSubscriptionContent, "function");
  const { parseSubscription, isUsableSubscriptionContent } = parse;
  // Invalid prose -> format "unknown" -> refused.
  assert.equal(
    isUsableSubscriptionContent(
      parseSubscription("just some random text that is not a subscription")
    ),
    false
  );
  // Empty body -> format "empty" -> recognized, keeps the current path (M1).
  assert.equal(isUsableSubscriptionContent(parseSubscription("")), true);
  // Valid-but-nodeless feed -> recognized "clash-yaml", keeps the current path (R2).
  assert.equal(isUsableSubscriptionContent(parseSubscription("proxies: []\n")), true);
  // Valid feed with a node -> passes.
  assert.equal(
    isUsableSubscriptionContent(
      parseSubscription(
        "proxies:\n  - name: x\n    type: http\n    server: 1.2.3.4\n    port: 8080\n"
      )
    ),
    true
  );
});

// ─────────────────── Fetch failure serves last-good ───────────────────

test("fetch failure keeps status error, serves last_nodes, pool untouched", async () => {
  reset();
  const url = await deadUrl();
  seedOkSubscription("t1", url);
  await seedPool("t1");
  try {
    const res = await sub.syncSubscription("t1");
    assert.equal(res.status, "error");
    assert.equal(res.applied, false);
    assert.equal(res.nodes, 0);
    const row = await sub.getSubscriptionById("t1");
    assert.ok(row);
    assert.deepEqual(row.lastNodes, LAST_NODES);
    assert.equal(row.consecutiveFailures, 1);
    assert.equal(poolSize("t1"), 1);
  } finally {
    reset();
  }
});

// ─────────────────── Invalid content refused before sync ───────────────────

test("invalid content is refused before sync, pool and last_nodes intact", async () => {
  reset();
  const server = await startBodyServer("not a subscription at all !!!");
  try {
    seedOkSubscription("t2", server.url);
    await seedPool("t2");
    const res = await sub.syncSubscription("t2");
    assert.equal(res.status, "error");
    assert.equal(res.applied, false);
    assert.ok((res.error ?? "").includes("NO_USABLE_NODES"));
    const row = await sub.getSubscriptionById("t2");
    assert.ok(row);
    assert.ok((row.error ?? "").includes("NO_USABLE_NODES"));
    assert.deepEqual(row.lastNodes, LAST_NODES);
    assert.equal(poolSize("t2"), 1);
  } finally {
    await server.close();
    reset();
  }
});

// ─────────────────── Consecutive-failure counter, pool intact ───────────────────

test("repeated invalid syncs bump the counter, pool stays intact", async () => {
  reset();
  const server = await startBodyServer("still not a subscription !!!");
  try {
    seedOkSubscription("t3", server.url);
    await seedPool("t3");
    await sub.syncSubscription("t3");
    assert.equal((await sub.getSubscriptionById("t3"))?.consecutiveFailures, 1);
    assert.equal(poolSize("t3"), 1);
    await sub.syncSubscription("t3");
    assert.equal((await sub.getSubscriptionById("t3"))?.consecutiveFailures, 2);
    assert.equal(poolSize("t3"), 1);
    assert.deepEqual((await sub.getSubscriptionById("t3"))?.lastNodes, LAST_NODES);
  } finally {
    await server.close();
    reset();
  }
});
