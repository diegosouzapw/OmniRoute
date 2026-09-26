import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";

// Memory-aware switch: after a refusal lands on the current member, the next
// switch steers to a fresh member; when every member is set aside the switch
// reuses the least recently set-aside one. Cause of every stub logged inline.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-selector-mem-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
process.env.PROXY_HEALTH_TCP_TIMEOUT_MS = "50";

const core = await import("../../src/lib/db/core.ts");
const proxyHealth = await import("../../src/lib/proxyHealth.ts");
// Probes dial TCP per core entry: stub to reachable (cause: functional focus
// is the member-memory switch, not TCP).
proxyHealth.__setProxyHealthTcpCheckForTesting(async () => true);
const trigger = await import("../../src/lib/proxySubscription/selectorTrigger.ts");
const mem = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const sub = await import("../../src/lib/proxySubscription/index.ts");

function reset() {
  core.resetDbInstance();
  mem.__resetProxyRefusalMemoryForTesting();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  trigger.__resetSelectorTriggerForTesting();
}

type CoreState = { current: string; puts: string[] };
function startFakeCore(
  initial: string,
  members: string[]
): Promise<{
  base: string;
  state: CoreState;
  close: () => Promise<void>;
}> {
  const state: CoreState = { current: initial, puts: [] };
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      const u = new URL(req.url ?? "/", "http://x");
      if (req.method === "GET" && u.pathname === "/proxies") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            proxies: {
              "group-m": { name: "group-m", type: "Selector", now: state.current, all: members },
            },
          })
        );
        return;
      }
      if (req.method === "PUT" && u.pathname === "/proxies/group-m") {
        let body = "";
        req.on("data", (c) => (body += c));
        req.on("end", () => {
          const name = (JSON.parse(body) as { name: string }).name;
          state.puts.push(name);
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

function startFeedServer(): Promise<{ url: string; close: () => Promise<void> }> {
  return new Promise((resolve) => {
    const srv = http.createServer((_req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      // Cause of stub: needsCore protocol so the sync binds the operator
      // local-core endpoint into proxy_registry.
      res.end("ss://YWVzLTI1Ni1nY206cGFzcw@203.0.113.9:8388#ss-node");
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

const KEY = "socks5://@127.0.0.1:1080";

test("second refusal steers to the member the first switch did not pick", async () => {
  reset();
  const fake = await startFakeCore("node-1", ["node-1", "node-2", "node-3"]);
  const feedSrv = await startFeedServer();
  try {
    const created = await sub.createSubscription({
      name: "sel-mem",
      url: feedSrv.url,
      enabled: false,
      localCoreEndpoint: "socks5://127.0.0.1:1080 selector=group-m",
      controlUrl: fake.base,
      controlSecret: "mem-secret",
    });
    await sub.syncSubscription(created.id);
    // Freeze the throttle clock so both switches run in one test.
    const t0 = Date.now();
    const first = await trigger.maybeSwitchOnSetAside(KEY, { nowMs: t0 });
    assert.equal(first.switched, true, JSON.stringify(first));
    assert.deepEqual(fake.state.puts, ["node-2"]);
    // Second refusal now lands on node-2 (it is current); the switch must
    // skip both set-aside members and land on node-3 — never back on node-1.
    const second = await trigger.maybeSwitchOnSetAside(KEY, { nowMs: t0 + 61_000 });
    assert.equal(second.switched, true, JSON.stringify(second));
    assert.deepEqual(fake.state.puts, ["node-2", "node-3"]);
    await sub.deleteSubscription(created.id);
  } finally {
    await feedSrv.close();
    await fake.close();
  }
});

test("all members set aside reuses the least recent instead of refusing", () => {
  const now = Date.now();
  mem.__resetProxyRefusalMemoryForTesting();
  // Distinct set-aside times: node-2 refused later, so node-1 (older seq)
  // is the least recently set aside and wins the fallback.
  mem.noteProxyMemberRefusal(KEY, "node-2", "ip_quota_429", now + 10);
  mem.noteProxyMemberRefusal(KEY, "node-1", "ip_quota_429", now);
  const pick = trigger.pickLiveMember(KEY, ["node-1", "node-2"], new Set(), now + 20);
  assert.equal(pick, "node-2");
  mem.__resetProxyRefusalMemoryForTesting();
});

test("shared frozen clock drives record and pick without drift", async () => {
  reset();
  const fake = await startFakeCore("node-1", ["node-1", "node-2"]);
  const feedSrv = await startFeedServer();
  try {
    const created = await sub.createSubscription({
      name: "sel-mem-clock",
      url: feedSrv.url,
      enabled: false,
      localCoreEndpoint: "socks5://127.0.0.1:1080 selector=group-m",
      controlUrl: fake.base,
      controlSecret: "mem-secret",
    });
    await sub.syncSubscription(created.id);
    const t0 = Date.now();
    const res = await trigger.maybeSwitchOnSetAside(KEY, { nowMs: t0 });
    assert.equal(res.switched, true, JSON.stringify(res));
    assert.equal(mem.isSelectorMemberAvoided(KEY, "node-1", t0 + 1), true);
    await sub.deleteSubscription(created.id);
  } finally {
    await feedSrv.close();
    await fake.close();
  }
});

test.after(() => {
  proxyHealth.__setProxyHealthTcpCheckForTesting(null);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
