import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";

// A manual refresh of a disabled subscription keeps a preview sync but must
// never drop attached rows that are missing from the feed.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sub-disabled-refresh-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
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

function feed(entries: Array<{ name: string; port: number }>) {
  const lines = ["proxies:"];
  for (const e of entries) {
    lines.push(
      `  - name: ${e.name}`,
      "    type: http",
      "    server: 127.0.0.1",
      `    port: ${e.port}`
    );
  }
  return lines.join("\n");
}

function startFeedServer(initialBody: string): Promise<{
  url: string;
  setBody: (body: string) => void;
  close: () => Promise<void>;
}> {
  let body = initialBody;
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
        setBody: (next) => {
          body = next;
        },
        close: () => new Promise((r) => srv.close(() => r())),
      });
    });
  });
}

function insertSubscription(id: string, url: string, enabled: number) {
  const now = new Date().toISOString();
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO proxy_subscriptions
        (id, name, url, enabled, mode, rule_providers, update_interval_minutes, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'global', NULL, 60, 'empty', ?, ?)`
    )
    .run(id, `sub-${id}`, url, enabled, now, now);
}

function rowsFor(subscriptionId: string) {
  return core
    .getDbInstance()
    .prepare(
      "SELECT id, name, host, port, status FROM proxy_registry WHERE subscription_id = ? ORDER BY port"
    )
    .all(subscriptionId) as Array<{
    id: string;
    name: string;
    host: string;
    port: number;
    status: string;
  }>;
}

test("a refresh of a disabled subscription keeps rows missing from the feed", async () => {
  reset();
  const server = await startFeedServer(
    feed([
      { name: "node-a", port: 18211 },
      { name: "node-b", port: 18212 },
    ])
  );
  try {
    insertSubscription("s1", server.url, 0);
    await sub.syncSubscription("s1");
    const before = rowsFor("s1");
    assert.equal(before.length, 2);

    server.setBody(feed([{ name: "node-a", port: 18211 }]));
    const result = await sub.syncSubscription("s1");

    assert.deepEqual(rowsFor("s1"), before);
    assert.equal(result.applied, false);
    assert.equal(result.boundProxies, 0);
  } finally {
    await server.close();
  }
});

test("a refresh of an enabled subscription still removes rows missing from the feed", async () => {
  reset();
  const server = await startFeedServer(
    feed([
      { name: "node-a", port: 18221 },
      { name: "node-b", port: 18222 },
    ])
  );
  try {
    insertSubscription("s1", server.url, 1);
    await sub.syncSubscription("s1");
    assert.equal(rowsFor("s1").length, 2);

    server.setBody(feed([{ name: "node-a", port: 18221 }]));
    const result = await sub.syncSubscription("s1");

    const after = rowsFor("s1");
    assert.equal(after.length, 1);
    assert.equal(after[0].port, 18221);
    assert.equal(result.applied, true);
    assert.equal(result.boundProxies, 1);
  } finally {
    await server.close();
  }
});

test("a refresh of a disabled subscription with a nodeless usable feed removes nothing", async () => {
  reset();
  const server = await startFeedServer(
    feed([
      { name: "node-a", port: 18231 },
      { name: "node-b", port: 18232 },
    ])
  );
  try {
    insertSubscription("s1", server.url, 0);
    await sub.syncSubscription("s1");
    const before = rowsFor("s1");
    assert.equal(before.length, 2);

    server.setBody("proxies: []");
    const result = await sub.syncSubscription("s1");

    assert.deepEqual(rowsFor("s1"), before);
    assert.equal(result.applied, false);
    assert.equal(result.boundProxies, 0);
  } finally {
    await server.close();
  }
});
