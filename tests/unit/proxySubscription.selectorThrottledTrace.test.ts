import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";

// Throttled switch persistence: a second set-aside inside the throttle gap
// records "throttled" on the subscription row so the list shows why nothing
// moved, without raising a standing failure warning (a throttle is normal
// backoff, not a failure — neither the write path nor the next sync warns).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-selector-throt-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
process.env.PROXY_HEALTH_TCP_TIMEOUT_MS = "50";

const core = await import("../../src/lib/db/core.ts");
const proxyHealth = await import("../../src/lib/proxyHealth.ts");
proxyHealth.__setProxyHealthTcpCheckForTesting(async () => true);
const trigger = await import("../../src/lib/proxySubscription/selectorTrigger.ts");
const sub = await import("../../src/lib/proxySubscription/index.ts");
const { readStaleSwitchWarning } =
  await import("../../src/lib/proxySubscription/subscriptionService.ts");

function reset() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  trigger.__resetSelectorTriggerForTesting();
}

function startFeedServer(): Promise<{ url: string; close: () => Promise<void> }> {
  return new Promise((resolve) => {
    const srv = http.createServer((_req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(
        "http://user:pass@203.0.113.9:8080\nss://YWVzLTI1Ni1nY206cGFzcw@203.0.113.9:8388#ss-node"
      );
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

function startFakeCore(): Promise<{
  base: string;
  state: { current: string; puts: number };
  close: () => Promise<void>;
}> {
  const state = { current: "node-1", puts: 0 };
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

const KEY_NODE1 = "socks5://@127.0.0.1:1080";

function readSwitchRow(id: string): {
  selector_last_switch_result: string | null;
  selector_last_switch_kind: string | null;
  error: string | null;
} {
  return core
    .getDbInstance()
    .prepare(
      "SELECT selector_last_switch_result, selector_last_switch_kind, error FROM proxy_subscriptions WHERE id = ?"
    )
    .get(id) as {
    selector_last_switch_result: string | null;
    selector_last_switch_kind: string | null;
    error: string | null;
  };
}

test("second switch inside the gap window records throttled without a standing warning", async () => {
  reset();
  const fake = await startFakeCore();
  const feedSrv = await startFeedServer();
  const created = await sub.createSubscription({
    name: "sel-throttled-trace",
    url: feedSrv.url,
    enabled: false,
    localCoreEndpoint: "socks5://127.0.0.1:1080 selector=group-a",
    controlUrl: fake.base,
    controlSecret: "throttled-secret",
  });
  await sub.syncSubscription(created.id);
  const id = created.id;
  try {
    trigger.__resetSelectorTriggerForTesting();
    const t0 = Date.now();
    const first = await trigger.maybeSwitchOnSetAside(KEY_NODE1, {
      nowMs: t0,
      kind: "transport",
    });
    assert.equal(first.switched, true, JSON.stringify(first));
    const second = await trigger.maybeSwitchOnSetAside(KEY_NODE1, { nowMs: t0 + 30_000 });
    assert.equal(second.switched, false);
    assert.equal(second.reason, "throttled");
    let row = readSwitchRow(id);
    assert.equal(row.selector_last_switch_result, "throttled");
    // The throttled repeat keeps the propagated motive of the first outcome
    // instead of falling back to the live snapshot or the hard default.
    assert.equal(row.selector_last_switch_kind, "transport");
    assert.equal(readStaleSwitchWarning(id), null);
    assert.equal(row.error, null);
    await sub.syncSubscription(id);
    row = readSwitchRow(id);
    assert.equal(row.selector_last_switch_result, "throttled");
    assert.equal(row.selector_last_switch_kind, "transport");
    assert.equal(readStaleSwitchWarning(id), null);
    assert.equal(row.error, null);
  } finally {
    await sub.deleteSubscription(id);
    await feedSrv.close();
    await fake.close();
  }
});

test.after(() => {
  proxyHealth.__setProxyHealthTcpCheckForTesting(null);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
