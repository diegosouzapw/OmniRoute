import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";

// Switch outcome persistence: a refused switch writes a standing
// SELECTOR_SWITCH_FAILED warning on the subscription row that survives the
// next sync; a later successful switch clears it. Status stays "ok".

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-selector-warn-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
process.env.PROXY_HEALTH_TCP_TIMEOUT_MS = "50";

const core = await import("../../src/lib/db/core.ts");
const proxyHealth = await import("../../src/lib/proxyHealth.ts");
proxyHealth.__setProxyHealthTcpCheckForTesting(async () => true);
const trigger = await import("../../src/lib/proxySubscription/selectorTrigger.ts");
const sub = await import("../../src/lib/proxySubscription/index.ts");

function reset() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  trigger.__resetSelectorTriggerForTesting();
}

function startFeedServer(feedBody?: string): Promise<{ url: string; close: () => Promise<void> }> {
  const body = feedBody ?? "ss://YWVzLTI1Ni1nY206cGFzcw@203.0.113.9:8388#ss-node";
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

function startFakeCore(opts: { failPut: boolean; initial?: string }): Promise<{
  base: string;
  state: { current: string; puts: number; failPut: boolean };
  close: () => Promise<void>;
}> {
  const state = { current: opts.initial ?? "node-1", puts: 0, failPut: opts.failPut };
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      const u = new URL(req.url ?? "/", "http://x");
      if (req.method === "GET" && u.pathname === "/proxies") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            proxies: {
              "group-a": {
                name: "group-a",
                type: "Selector",
                now: state.current,
                all: ["node-1", "node-2"],
              },
            },
          })
        );
        return;
      }
      if (req.method === "PUT" && u.pathname === "/proxies/group-a") {
        let body = "";
        req.on("data", (c) => (body += c));
        req.on("end", () => {
          if (state.failPut) {
            res.writeHead(500);
            res.end("{}");
            return;
          }
          state.puts++;
          state.current = (JSON.parse(body) as { name: string }).name;
          res.writeHead(204);
          res.end();
        });
        return;
      }
      res.writeHead(404);
      res.end("{}");
    });
    srv.listen(0, "127.0.0.1", () => {
      const addr = srv.address();
      if (!addr || typeof addr === "string") throw new Error("no addr");
      resolve({
        base: `http://127.0.0.1:${addr.port}`,
        state,
        close: () => new Promise((r) => srv.close(() => r())),
      });
    });
  });
}

const DIRECT_FEED = "http://user:pass@203.0.113.9:8080";
const CORE_FEED = "ss://YWVzLTI1Ni1nY206cGFzcw@203.0.113.9:8388#ss-node";

const KEY_NODE1 = "socks5://@127.0.0.1:1080";

async function seedWarnSubscription(
  controlUrl: string
): Promise<{ id: string; feedClose: () => Promise<void> }> {
  const feedSrv = await startFeedServer(`${DIRECT_FEED}\n${CORE_FEED}`);
  const created = await sub.createSubscription({
    name: "sel-warn",
    url: feedSrv.url,
    enabled: false,
    localCoreEndpoint: "socks5://127.0.0.1:1080 selector=group-a",
    controlUrl,
    controlSecret: "warn-secret",
  });
  // createSubscription only syncs when enabled: run the first sync while the
  // feed server is still up so the pool rows exist before the trigger runs.
  await sub.syncSubscription(created.id);
  return { id: created.id, feedClose: () => feedSrv.close() };
}

// A direct http node keeps the subscription pool non-empty, so the sync
// resolves to "ok" and the standing switch warning rides on `error` while
// the status stays green.

function readWarning(id: string): { status: string; error: string | null } {
  const row = core
    .getDbInstance()
    .prepare("SELECT status, error FROM proxy_subscriptions WHERE id = ?")
    .get(id) as { status: string; error: string | null };
  return row;
}

test("refused switch writes a standing warning that survives the next sync", async () => {
  reset();
  const fake = await startFakeCore({ failPut: true });
  const { id, feedClose } = await seedWarnSubscription(fake.base);
  try {
    trigger.__resetSelectorTriggerForTesting();
    const res = await trigger.maybeSwitchOnSetAside(KEY_NODE1);
    assert.equal(res.switched, false);
    let row = readWarning(id);
    assert.equal(row.status, "ok");
    assert.ok(row.error, "error must carry the warning right after the failed switch");
    assert.ok(
      JSON.parse(row.error!).code === "SELECTOR_SWITCH_FAILED",
      `warning code, got ${row.error}`
    );
    await sub.syncSubscription(id);
    row = readWarning(id);
    assert.equal(row.status, "ok");
    assert.ok(
      row.error && JSON.parse(row.error).code === "SELECTOR_SWITCH_FAILED",
      `warning persists after sync, got ${row.error}`
    );
    await sub.deleteSubscription(id);
  } finally {
    await feedClose();
    await fake.close();
  }
});

test("successful switch clears the standing warning", async () => {
  reset();
  const failing = await startFakeCore({ failPut: true });
  const passing = await startFakeCore({ failPut: false });
  const { id, feedClose } = await seedWarnSubscription(failing.base);
  try {
    trigger.__resetSelectorTriggerForTesting();
    const bad = await trigger.maybeSwitchOnSetAside(KEY_NODE1);
    assert.equal(bad.switched, false);
    assert.ok(readWarning(id).error, "warning present after failure");
    await sub.updateSubscription(id, { controlUrl: passing.base });
    trigger.__resetSelectorTriggerForTesting();
    const good = await trigger.maybeSwitchOnSetAside(KEY_NODE1);
    assert.equal(good.switched, true, JSON.stringify(good));
    await sub.syncSubscription(id);
    const row = readWarning(id);
    assert.equal(row.error, null, `warning cleared after success, got ${row.error}`);
    await sub.deleteSubscription(id);
  } finally {
    await feedClose();
    await failing.close();
    await passing.close();
  }
});

test("concurrent triggers on one selector collapse to a single control call", async () => {
  reset();
  const fake = await startFakeCore({ failPut: false });
  const { id, feedClose } = await seedWarnSubscription(fake.base);
  try {
    trigger.__resetSelectorTriggerForTesting();
    const [a, b] = await Promise.all([
      trigger.maybeSwitchOnSetAside(KEY_NODE1),
      trigger.maybeSwitchOnSetAside(KEY_NODE1),
    ]);
    const switched = [a, b].filter((r) => r.switched).length;
    assert.equal(switched, 1, `exactly one switch, got ${JSON.stringify([a, b])}`);
    assert.equal(fake.state.puts, 1, `exactly one PUT, got ${fake.state.puts}`);
    await sub.deleteSubscription(id);
  } finally {
    await feedClose();
    await fake.close();
  }
});

test.after(() => {
  proxyHealth.__setProxyHealthTcpCheckForTesting(null);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
