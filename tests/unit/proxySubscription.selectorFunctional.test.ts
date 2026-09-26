import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";

// Functional: ephemeral DB + fake Clash core. 429 through a tagged member
// flips the selector; a failing PUT / flag OFF / blocked target leaves the
// in-flight flow intact and switches nothing.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-selector-func-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
process.env.PROXY_HEALTH_TCP_TIMEOUT_MS = "50";

const core = await import("../../src/lib/db/core.ts");
const proxyHealth = await import("../../src/lib/proxyHealth.ts");
// Probes dial TCP per core entry: stub to reachable so the sync path never
// waits on real sockets (functional focus is the selector switch, not TCP).
proxyHealth.__setProxyHealthTcpCheckForTesting(async () => true);
const trigger = await import("../../src/lib/proxySubscription/selectorTrigger.ts");
const sub = await import("../../src/lib/proxySubscription/index.ts");

function reset() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  trigger.__resetSelectorTriggerForTesting();
}

function feed() {
  // needsCore protocol (ss, SIP002) so the sync binds the operator-supplied
  // local core endpoint into proxy_registry (direct http nodes never touch it).
  return "ss://YWVzLTI1Ni1nY206cGFzcw@203.0.113.9:8388#ss-node";
}

function startFeedServer(): Promise<{ url: string; close: () => Promise<void> }> {
  return new Promise((resolve) => {
    const srv = http.createServer((_req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(feed(18080));
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

type CoreState = {
  current: string;
  puts: Array<{ selector: string; name: string }>;
  failPut: boolean;
  requests: number;
};

function startFakeCore(initial = "node-1"): Promise<{
  base: string;
  state: CoreState;
  close: () => Promise<void>;
}> {
  const state: CoreState = { current: initial, puts: [], failPut: false, requests: 0 };
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      state.requests++;
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
          const name = (JSON.parse(body) as { name: string }).name;
          state.puts.push({ selector: "group-a", name });
          state.current = name;
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

async function seedSubscription(controlUrl: string | null, tag: string | null) {
  const feedSrv = await startFeedServer();
  let id: string;
  try {
    const created = await sub.createSubscription({
      name: "sel-func",
      url: feedSrv.url,
      enabled: false,
      localCoreEndpoint: tag
        ? `socks5://127.0.0.1:1080 selector=${tag}`
        : "socks5://127.0.0.1:1080",
      controlUrl,
      controlSecret: controlUrl ? "func-secret" : null,
    });
    id = created.id;
    // createSubscription syncs only when enabled; run it while the feed
    // server is still up (disabled: no bind, rows still synced).
    await sub.syncSubscription(created.id);
  } finally {
    await feedSrv.close();
  }
  return id;
}

test("429 through a tagged member flips the selector", async () => {
  reset();
  const fake = await startFakeCore("node-1");
  try {
    const id = await seedSubscription(fake.base, "group-a");
    trigger.__resetSelectorTriggerForTesting();
    const res = await trigger.maybeSwitchOnSetAside(KEY_NODE1);
    assert.equal(res.switched, true, JSON.stringify(res));
    assert.equal(res.reason, "ok");
    assert.deepEqual(
      fake.state.puts.map((p) => p.name),
      ["node-2"]
    );
    assert.equal(fake.state.current, "node-2");
    await sub.deleteSubscription(id);
  } finally {
    await fake.close();
  }
});

test("failing PUT leaves the flow intact (warn, no switch)", async () => {
  reset();
  const fake = await startFakeCore("node-1");
  fake.state.failPut = true;
  try {
    const id = await seedSubscription(fake.base, "group-a");
    trigger.__resetSelectorTriggerForTesting();
    const res = await trigger.maybeSwitchOnSetAside(KEY_NODE1);
    assert.equal(res.switched, false);
    assert.equal(fake.state.current, "node-1");
    await sub.deleteSubscription(id);
  } finally {
    await fake.close();
  }
});

test("flag OFF switches nothing and touches no DB", async () => {
  reset();
  const fake = await startFakeCore("node-1");
  const prev = process.env.PROXY_SKIP_RECENTLY_FAILED;
  process.env.PROXY_SKIP_RECENTLY_FAILED = "false";
  try {
    trigger.__resetSelectorTriggerForTesting();
    trigger.__setAnyControlUrlConfiguredForTesting(true);
    const res = await trigger.maybeSwitchOnSetAside(KEY_NODE1);
    assert.equal(res.switched, false);
    assert.equal(res.reason, "flag-off");
    assert.equal(fake.state.requests, 0);
  } finally {
    if (prev === undefined) delete process.env.PROXY_SKIP_RECENTLY_FAILED;
    else process.env.PROXY_SKIP_RECENTLY_FAILED = prev;
    await fake.close();
  }
});

test("blocked fetch-time target refuses the switch", async () => {
  reset();
  const fake = await startFakeCore("node-1");
  try {
    // 169.254.169.254 is always-blocked: structural guard rejects before fetch.
    const id = await seedSubscription("http://169.254.169.254:9090", "group-a");
    trigger.__resetSelectorTriggerForTesting();
    const res = await trigger.maybeSwitchOnSetAside(KEY_NODE1);
    assert.equal(res.switched, false);
    assert.equal(res.reason, "blocked");
    assert.equal(fake.state.requests, 0);
    await sub.deleteSubscription(id);
  } finally {
    await fake.close();
  }
});

test("throttle: second event in the gap window is silent", async () => {
  reset();
  const fake = await startFakeCore("node-1");
  try {
    const id = await seedSubscription(fake.base, "group-a");
    trigger.__resetSelectorTriggerForTesting();
    const first = await trigger.maybeSwitchOnSetAside(KEY_NODE1);
    assert.equal(first.switched, true);
    const puts = fake.state.puts.length;
    const second = await trigger.maybeSwitchOnSetAside(KEY_NODE1);
    assert.equal(second.switched, false);
    assert.equal(second.reason, "throttled");
    assert.equal(fake.state.puts.length, puts);
    await sub.deleteSubscription(id);
  } finally {
    await fake.close();
  }
});

test.after(() => {
  proxyHealth.__setProxyHealthTcpCheckForTesting(null);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
