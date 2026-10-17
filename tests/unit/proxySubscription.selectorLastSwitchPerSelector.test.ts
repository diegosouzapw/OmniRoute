import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";

// Per-selector last-switch trace: two selectors of one subscription keep
// their own entry (member, time, cause) instead of overwriting a single
// subscription-wide row.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-selector-per-sel-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
process.env.PROXY_HEALTH_TCP_TIMEOUT_MS = "50";

const core = await import("../../src/lib/db/core.ts");
const proxyHealth = await import("../../src/lib/proxyHealth.ts");
proxyHealth.__setProxyHealthTcpCheckForTesting(async () => true);
const trigger = await import("../../src/lib/proxySubscription/selectorTrigger.ts");
const sub = await import("../../src/lib/proxySubscription/index.ts");
const service = await import("../../src/lib/proxySubscription/subscriptionService.ts");
const { parseSelectorTag } = await import("../../src/lib/proxySubscription/selectorEndpoint.ts");

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

function startFakeCore(groups: string[]): Promise<{
  base: string;
  state: { puts: Array<{ selector: string; name: string }> };
  close: () => Promise<void>;
}> {
  const state = { puts: [] as Array<{ selector: string; name: string }> };
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      const u = new URL(req.url ?? "/", "http://x");
      if (req.method === "GET" && u.pathname === "/proxies") {
        const proxies: Record<string, unknown> = {};
        for (const g of groups) {
          proxies[g] = { name: g, type: "Selector", now: "node-1", all: ["node-1", "node-2"] };
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ proxies }));
        return;
      }
      for (const g of groups) {
        if (req.method === "PUT" && u.pathname === `/proxies/${g}`) {
          let body = "";
          req.on("data", (c) => (body += c));
          req.on("end", () => {
            state.puts.push({ selector: g, name: (JSON.parse(body) as { name: string }).name });
            res.writeHead(204);
            res.end();
          });
          return;
        }
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

function registryKeyFor(host: string, port: number): string {
  return `socks5://@${host}:${port}`;
}

function rowById(id: string): Record<string, unknown> {
  return core
    .getDbInstance()
    .prepare("SELECT * FROM proxy_subscriptions WHERE id = ?")
    .get(id) as Record<string, unknown>;
}

function bySelectorOf(
  id: string
): Record<
  string,
  { at: string; result: string; member: string | null; kind: string | null } | null
> | null {
  const row = core
    .getDbInstance()
    .prepare("SELECT selector_last_switch_by_selector FROM proxy_subscriptions WHERE id = ?")
    .get(id) as { selector_last_switch_by_selector?: unknown } | undefined;
  const raw = row?.selector_last_switch_by_selector;
  if (typeof raw !== "string" || !raw) return null;
  return JSON.parse(raw) as Record<
    string,
    { at: string; result: string; member: string | null; kind: string | null } | null
  >;
}

test("two selectors of one subscription keep their own entry", async () => {
  reset();
  const fake = await startFakeCore(["group-a", "group-b"]);
  const feedSrv = await startFeedServer();
  const created = await sub.createSubscription({
    name: "sel-per-selector-two",
    url: feedSrv.url,
    enabled: false,
    localCoreEndpoint:
      "socks5://127.0.0.1:1080 selector=group-a\nsocks5://127.0.0.1:1081 selector=group-b",
    controlUrl: fake.base,
    controlSecret: "per-selector-secret",
  });
  await sub.syncSubscription(created.id);
  const id = created.id;
  try {
    trigger.__resetSelectorTriggerForTesting();
    const t0 = Date.now();
    const first = await trigger.maybeSwitchOnSetAside(registryKeyFor("127.0.0.1", 1080), {
      nowMs: t0,
      kind: "transport",
    });
    assert.equal(first.switched, true, JSON.stringify(first));
    const second = await trigger.maybeSwitchOnSetAside(registryKeyFor("127.0.0.1", 1081), {
      nowMs: t0 + 1000,
      kind: "slow",
    });
    assert.equal(second.switched, true, JSON.stringify(second));
    const stored = bySelectorOf(id);
    assert.ok(stored && typeof stored === "object", "per-selector column holds an object");
    assert.ok(stored["group-a"], "group-a keeps its entry");
    assert.ok(stored["group-b"], "group-b keeps its entry");
    assert.equal(stored["group-a"]?.member, "node-2");
    assert.equal(stored["group-b"]?.member, "node-2");
    assert.equal(stored["group-a"]?.kind, "transport");
    assert.equal(stored["group-b"]?.kind, "slow");
    assert.ok(stored["group-a"]?.at && stored["group-b"]?.at, "each entry has its own time");
    // The summary columns still carry the latest switch across selectors.
    const row = rowById(id);
    assert.equal(row.selector_last_switch_result, "ok");
    assert.equal(row.selector_last_switch_member, "node-2");
  } finally {
    await sub.deleteSubscription(id);
    await feedSrv.close();
    await fake.close();
  }
});

test("throttled repeat on one selector leaves the neighbor entry intact", async () => {
  reset();
  const fake = await startFakeCore(["group-a", "group-b"]);
  const feedSrv = await startFeedServer();
  const created = await sub.createSubscription({
    name: "sel-per-selector-throttled",
    url: feedSrv.url,
    enabled: false,
    localCoreEndpoint:
      "socks5://127.0.0.1:1080 selector=group-a\nsocks5://127.0.0.1:1081 selector=group-b",
    controlUrl: fake.base,
    controlSecret: "per-selector-secret",
  });
  await sub.syncSubscription(created.id);
  const id = created.id;
  try {
    trigger.__resetSelectorTriggerForTesting();
    const t0 = Date.now();
    const firstA = await trigger.maybeSwitchOnSetAside(registryKeyFor("127.0.0.1", 1080), {
      nowMs: t0,
      kind: "transport",
    });
    assert.equal(firstA.switched, true, JSON.stringify(firstA));
    const firstB = await trigger.maybeSwitchOnSetAside(registryKeyFor("127.0.0.1", 1081), {
      nowMs: t0 + 1000,
      kind: "slow",
    });
    assert.equal(firstB.switched, true, JSON.stringify(firstB));
    const throttled = await trigger.maybeSwitchOnSetAside(registryKeyFor("127.0.0.1", 1080), {
      nowMs: t0 + 2000,
    });
    assert.equal(throttled.switched, false);
    assert.equal(throttled.reason, "throttled");
    const stored = bySelectorOf(id);
    assert.equal(stored?.["group-a"]?.result, "throttled");
    assert.equal(stored?.["group-b"]?.result, "ok");
    assert.equal(stored?.["group-b"]?.member, "node-2");
    // The throttled entry keeps its own cause, not the neighbor's.
    assert.notEqual(stored?.["group-a"]?.kind, stored?.["group-b"]?.kind);
    assert.equal(stored?.["group-b"]?.kind, "slow");
  } finally {
    await sub.deleteSubscription(id);
    await feedSrv.close();
    await fake.close();
  }
});

test("selector removed from the lines disappears from the state", async () => {
  reset();
  const fake = await startFakeCore(["group-a", "group-b"]);
  const feedSrv = await startFeedServer();
  const created = await sub.createSubscription({
    name: "sel-per-selector-removed",
    url: feedSrv.url,
    enabled: false,
    localCoreEndpoint:
      "socks5://127.0.0.1:1080 selector=group-a\nsocks5://127.0.0.1:1081 selector=group-b",
    controlUrl: fake.base,
    controlSecret: "per-selector-secret",
  });
  await sub.syncSubscription(created.id);
  const id = created.id;
  try {
    trigger.__resetSelectorTriggerForTesting();
    const t0 = Date.now();
    await trigger.maybeSwitchOnSetAside(registryKeyFor("127.0.0.1", 1080), {
      nowMs: t0,
      kind: "transport",
    });
    await trigger.maybeSwitchOnSetAside(registryKeyFor("127.0.0.1", 1081), {
      nowMs: t0 + 1000,
      kind: "slow",
    });
    // Drop group-b from the lines, then record another outcome on group-a:
    // the stored map must no longer carry group-b.
    await sub.updateSubscription(id, {
      localCoreEndpoint: "socks5://127.0.0.1:1080 selector=group-a",
    });
    await service.recordSelectorSwitchOutcome({
      subscriptionId: id,
      selector: "group-a",
      result: "ok",
      member: "node-2",
      kind: "transport",
    });
    const record = await service.getSubscriptionById(id);
    assert.ok(record);
    const keys = record?.selectorLastSwitchBySelector
      ? Object.keys(record.selectorLastSwitchBySelector)
      : [];
    assert.deepEqual(keys, ["group-a"]);
  } finally {
    await sub.deleteSubscription(id);
    await feedSrv.close();
    await fake.close();
  }
});

test("single-selector subscription reads the same as the summary", async () => {
  reset();
  const fake = await startFakeCore(["group-a"]);
  const feedSrv = await startFeedServer();
  const created = await sub.createSubscription({
    name: "sel-per-selector-single",
    url: feedSrv.url,
    enabled: false,
    localCoreEndpoint: "socks5://127.0.0.1:1080 selector=group-a",
    controlUrl: fake.base,
    controlSecret: "per-selector-secret",
  });
  await sub.syncSubscription(created.id);
  const id = created.id;
  try {
    trigger.__resetSelectorTriggerForTesting();
    const res = await trigger.maybeSwitchOnSetAside(registryKeyFor("127.0.0.1", 1080), {
      nowMs: Date.now(),
      kind: "transport",
    });
    assert.equal(res.switched, true, JSON.stringify(res));
    const record = await service.getSubscriptionById(id);
    assert.ok(record);
    assert.equal(record?.selectorLastSwitchResult, "ok");
    const entry = record?.selectorLastSwitchBySelector?.["group-a"];
    assert.ok(entry, "single selector has its entry");
    assert.equal(entry?.result, record?.selectorLastSwitchResult);
    assert.equal(entry?.member, record?.selectorLastSwitchMember);
    assert.equal(entry?.kind, record?.selectorLastSwitchKind);
    assert.equal(entry?.at, record?.selectorLastSwitchAt);
  } finally {
    await sub.deleteSubscription(id);
    await feedSrv.close();
    await fake.close();
  }
});

test("two near-simultaneous switches on two selectors keep both keys", async () => {
  reset();
  const fake = await startFakeCore(["group-a", "group-b"]);
  const feedSrv = await startFeedServer();
  const created = await sub.createSubscription({
    name: "sel-per-selector-crossed",
    url: feedSrv.url,
    enabled: false,
    localCoreEndpoint:
      "socks5://127.0.0.1:1080 selector=group-a\nsocks5://127.0.0.1:1081 selector=group-b",
    controlUrl: fake.base,
    controlSecret: "per-selector-secret",
  });
  await sub.syncSubscription(created.id);
  const id = created.id;
  try {
    trigger.__resetSelectorTriggerForTesting();
    const t0 = Date.now();
    const [first, second] = await Promise.all([
      trigger.maybeSwitchOnSetAside(registryKeyFor("127.0.0.1", 1080), {
        nowMs: t0,
        kind: "transport",
      }),
      trigger.maybeSwitchOnSetAside(registryKeyFor("127.0.0.1", 1081), {
        nowMs: t0,
        kind: "slow",
      }),
    ]);
    assert.equal(first.switched, true, JSON.stringify(first));
    assert.equal(second.switched, true, JSON.stringify(second));
    const stored = bySelectorOf(id);
    assert.ok(stored?.["group-a"], "group-a keeps its entry");
    assert.ok(stored?.["group-b"], "group-b keeps its entry");
  } finally {
    await sub.deleteSubscription(id);
    await feedSrv.close();
    await fake.close();
  }
});

test("entries stay bounded to the current line tags", async () => {
  reset();
  const fake = await startFakeCore(["group-a"]);
  const feedSrv = await startFeedServer();
  const created = await sub.createSubscription({
    name: "sel-per-selector-bound",
    url: feedSrv.url,
    enabled: false,
    localCoreEndpoint: "socks5://127.0.0.1:1080 selector=group-a",
    controlUrl: fake.base,
    controlSecret: "per-selector-secret",
  });
  await sub.syncSubscription(created.id);
  const id = created.id;
  try {
    for (let i = 0; i < 5; i++) {
      await service.recordSelectorSwitchOutcome({
        subscriptionId: id,
        selector: "group-retired",
        result: "ok",
        member: "node-2",
        kind: "transport",
      });
    }
    const record = await service.getSubscriptionById(id);
    const keys = record?.selectorLastSwitchBySelector
      ? Object.keys(record.selectorLastSwitchBySelector)
      : [];
    assert.deepEqual(keys, ["group-retired"]);
    // Point the lines back at group-a and record once: the retired tag drops
    // out, so the size returns to the current tag count.
    await service.recordSelectorSwitchOutcome({
      subscriptionId: id,
      selector: "group-a",
      result: "ok",
      member: "node-2",
      kind: "transport",
    });
    const after = await service.getSubscriptionById(id);
    assert.deepEqual(Object.keys(after?.selectorLastSwitchBySelector ?? {}), ["group-a"]);
  } finally {
    await sub.deleteSubscription(id);
    await feedSrv.close();
    await fake.close();
  }
});

test("screen tag parsing matches the production line parser", () => {
  const lines = [
    "socks5://127.0.0.1:1080 selector=group-a",
    "socks5://127.0.0.1:1081 selector=group-b",
    "socks5://127.0.0.1:1082",
    "socks5://127.0.0.1:1083 selector=bad tag!",
  ];
  const fromProduction = lines
    .map((line) => parseSelectorTag(line))
    .filter((tag): tag is string => tag !== null);
  assert.deepEqual(fromProduction, ["group-a", "group-b"]);
});

test.after(() => {
  proxyHealth.__setProxyHealthTcpCheckForTesting(null);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
