import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";

// Selector switch on every set-aside kind: the synchronous 429 path and the
// transition subscriber share one throttle slot per (subscription, selector),
// so a 429 collapses to a single control call; transport and slow set-asides
// each drive their own switch with their own refusal kind.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-selector-trans-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
process.env.PROXY_HEALTH_TCP_TIMEOUT_MS = "50";
// Shrink only the quota curve so the member write below is kind-observable:
// a switch recorded under "transport" avoids the member for 60 s, while the
// hardcoded quota default would only avoid it for 1 s. Read at module load,
// hence set before the dynamic imports.
process.env.PROXY_QUOTA_429_BASE_MS = "1000";

const core = await import("../../src/lib/db/core.ts");
const proxyHealth = await import("../../src/lib/proxyHealth.ts");
proxyHealth.__setProxyHealthTcpCheckForTesting(async () => true);
const trigger = await import("../../src/lib/proxySubscription/selectorTrigger.ts");
const mem = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const listeners = await import("../../open-sse/utils/proxyTransitionListeners.ts");
const sub = await import("../../src/lib/proxySubscription/index.ts");

function reset() {
  core.resetDbInstance();
  mem.__resetProxyRefusalMemoryForTesting();
  listeners.__resetProxyTransitionListenersForTesting();
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

function startFakeCore(opts: { initial?: string } = {}): Promise<{
  base: string;
  state: { current: string; puts: number };
  close: () => Promise<void>;
}> {
  const state = { current: opts.initial ?? "node-1", puts: 0 };
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

async function seedSubscription(
  controlUrl: string
): Promise<{ id: string; feedClose: () => Promise<void> }> {
  const feedSrv = await startFeedServer();
  const created = await sub.createSubscription({
    name: "sel-trans",
    url: feedSrv.url,
    enabled: false,
    localCoreEndpoint: "socks5://127.0.0.1:1080 selector=group-a",
    controlUrl,
    controlSecret: "trans-secret",
  });
  await sub.syncSubscription(created.id);
  return { id: created.id, feedClose: () => feedSrv.close() };
}

test("429 sync path and transition subscriber collapse to one control call", async () => {
  reset();
  const { registerSelectorTransitionSubscriber } =
    await import("../../src/lib/proxySubscription/proxyTransitionSubscriber.ts");
  const { noteProxyOutcome } = await import("../../src/sse/handlers/proxyOutcomeMemory.ts");
  const fake = await startFakeCore();
  const { id, feedClose } = await seedSubscription(fake.base);
  try {
    trigger.__resetSelectorTriggerForTesting();
    registerSelectorTransitionSubscriber();
    const proxy = { type: "socks5", host: "127.0.0.1", port: 1080 };
    await Promise.all([
      (async () => {
        noteProxyOutcome("opencode", { proxy, upstreamStatus: 429 });
        // Let the fire-and-forget sync trigger run before the assertion.
        await new Promise((r) => setTimeout(r, 200));
      })(),
      (async () => {
        mem.noteProxyRefusal(KEY_NODE1, "transport");
        await new Promise((r) => setTimeout(r, 200));
      })(),
    ]);
    // Both paths share one throttle slot: exactly one control call lands.
    // (The loser reads the pre-await slot reservation and backs off.)
    await new Promise((r) => setTimeout(r, 300));
    assert.equal(fake.state.puts, 1, `one control call, got ${fake.state.puts}`);
    await sub.deleteSubscription(id);
  } finally {
    await feedClose();
    await fake.close();
  }
});

test("second switch inside the gap window reports throttled", async () => {
  reset();
  const fake = await startFakeCore();
  const { id, feedClose } = await seedSubscription(fake.base);
  try {
    trigger.__resetSelectorTriggerForTesting();
    const t0 = Date.now();
    const first = await trigger.maybeSwitchOnSetAside(KEY_NODE1, { nowMs: t0 });
    assert.equal(first.switched, true, JSON.stringify(first));
    const second = await trigger.maybeSwitchOnSetAside(KEY_NODE1, { nowMs: t0 + 30_000 });
    assert.equal(second.switched, false);
    assert.equal(second.reason, "throttled");
    await sub.deleteSubscription(id);
  } finally {
    await feedClose();
    await fake.close();
  }
});

test("transport then slow each drive a switch with their own kind", async () => {
  reset();
  const fake = await startFakeCore();
  const { id, feedClose } = await seedSubscription(fake.base);
  try {
    trigger.__resetSelectorTriggerForTesting();
    const t0 = Date.now();
    const viaTransport = await trigger.maybeSwitchOnSetAside(KEY_NODE1, {
      nowMs: t0,
      kind: "transport",
    });
    assert.equal(viaTransport.switched, true, JSON.stringify(viaTransport));
    // The throttle is per (subscription, selector), not per kind: space the
    // clocks past the gap so the second kind gets its own switch.
    const viaSlow = await trigger.maybeSwitchOnSetAside(KEY_NODE1, {
      nowMs: t0 + 61_000,
      kind: "slow",
    });
    assert.equal(viaSlow.switched, true, JSON.stringify(viaSlow));
    assert.deepEqual([viaTransport.reason, viaSlow.reason], ["ok", "ok"]);
    // Each switch records the live choice under its own refusal kind.
    // The quota curve is shrunk to 1 s above, so only a real "slow" write
    // (60 s base) still avoids node-2 ten seconds after the second switch;
    // a hardcoded quota write would already have expired.
    assert.equal(mem.isSelectorMemberAvoided(KEY_NODE1, "node-2", t0 + 61_000 + 10_000), true);
    assert.equal(fake.state.puts, 2);
    await sub.deleteSubscription(id);
  } finally {
    await feedClose();
    await fake.close();
  }
});

test("transition subscriber registers once and re-registers cleanly", async () => {
  reset();
  const { registerSelectorTransitionSubscriber, __resetSubscriberForTesting } =
    await import("../../src/lib/proxySubscription/proxyTransitionSubscriber.ts");
  __resetSubscriberForTesting();
  try {
    registerSelectorTransitionSubscriber();
    registerSelectorTransitionSubscriber();
    assert.equal(listeners.__listenerCountForTesting(), 1);
    __resetSubscriberForTesting();
    assert.equal(listeners.__listenerCountForTesting(), 0);
    registerSelectorTransitionSubscriber();
    assert.equal(listeners.__listenerCountForTesting(), 1);
  } finally {
    __resetSubscriberForTesting();
  }
});

test("a transport transition flips the selector end to end", async () => {
  reset();
  const { registerSelectorTransitionSubscriber, __resetSubscriberForTesting } =
    await import("../../src/lib/proxySubscription/proxyTransitionSubscriber.ts");
  const fake = await startFakeCore();
  const { id, feedClose } = await seedSubscription(fake.base);
  try {
    trigger.__resetSelectorTriggerForTesting();
    registerSelectorTransitionSubscriber();
    mem.noteProxyRefusal(KEY_NODE1, "transport");
    await new Promise((r) => setTimeout(r, 500));
    assert.equal(fake.state.puts, 1, `one PUT from the transition, got ${fake.state.puts}`);
    assert.equal(fake.state.current, "node-2");
    await sub.deleteSubscription(id);
  } finally {
    __resetSubscriberForTesting();
    await feedClose();
    await fake.close();
  }
});

test.after(() => {
  proxyHealth.__setProxyHealthTcpCheckForTesting(null);
  listeners.__resetProxyTransitionListenersForTesting();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
