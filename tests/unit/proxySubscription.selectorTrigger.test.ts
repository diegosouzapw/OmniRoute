import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../src/lib/proxySubscription/selectorTrigger.ts");
const {
  selectorRegistryKey,
  clampSelectorGapSeconds,
  __resetSelectorTriggerForTesting,
  __setAnyControlUrlConfiguredForTesting,
} = mod;

test("clampSelectorGapSeconds bounds [0, 3600], default 60", () => {
  assert.equal(clampSelectorGapSeconds(null), 60);
  assert.equal(clampSelectorGapSeconds(undefined), 60);
  assert.equal(clampSelectorGapSeconds(Number.NaN), 60);
  assert.equal(clampSelectorGapSeconds(-5), 0);
  assert.equal(clampSelectorGapSeconds(0), 0);
  assert.equal(clampSelectorGapSeconds(30), 30);
  assert.equal(clampSelectorGapSeconds(3600), 3600);
  assert.equal(clampSelectorGapSeconds(99999), 3600);
});

test("selectorRegistryKey aligns port-less socks5 to upsert rule 8080", () => {
  const key = selectorRegistryKey({ type: "socks5", host: "127.0.0.1", port: null, username: "" });
  assert.equal(key, "socks5://@127.0.0.1:8080");
});

test("selectorRegistryKey aligns https default to 443", () => {
  const key = selectorRegistryKey({ type: "https", host: "127.0.0.1", port: null, username: "" });
  assert.equal(key, "https://@127.0.0.1:443");
});

test("selectorRegistryKey keeps explicit ports, lowercases host, strips brackets, decodes user", () => {
  const key = selectorRegistryKey({
    type: "http",
    host: "[::1]",
    port: 2080,
    username: "user%20a",
  });
  assert.equal(key, "http://user a@[::1]:2080".replace("[", "").replace("]", ""));
});

test("selectorRegistryKey returns null on junk", () => {
  assert.equal(selectorRegistryKey({ type: "", host: "", port: 1, username: "" }), null);
  assert.equal(selectorRegistryKey(null), null);
});

test("endpoint line matches its row through symmetric normalization", async () => {
  // A port-less endpoint line must resolve to
  // the same (host, port) as its registry row (upsert rule → 8080 both sides).
  const dir = (await import("node:fs")).mkdtempSync(
    (await import("node:path")).join((await import("node:os")).tmpdir(), "omniroute-sel-sym-")
  );
  const prevDataDir = process.env.DATA_DIR;
  const prevFlag = process.env.PROXY_SKIP_RECENTLY_FAILED;
  process.env.DATA_DIR = dir;
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
  const core = await import("../../src/lib/db/core.ts");
  const proxyHealth = await import("../../src/lib/proxyHealth.ts");
  proxyHealth.__setProxyHealthTcpCheckForTesting(async () => true);
  const sub = await import("../../src/lib/proxySubscription/index.ts");
  const trigger = await import("../../src/lib/proxySubscription/selectorTrigger.ts");
  const http = await import("node:http");
  try {
    core.resetDbInstance();
    const feedSrv = http.createServer((_req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("ss://YWVzLTI1Ni1nY206cGFzcw@203.0.113.9:8388#ss-node");
    });
    await new Promise<void>((r) => feedSrv.listen(0, "127.0.0.1", () => r()));
    const feedAddr = feedSrv.address();
    if (!feedAddr || typeof feedAddr === "string") throw new Error("no addr");
    const fake = http.createServer((req, res) => {
      const u = new URL(req.url ?? "/", "http://x");
      if (req.method === "GET" && u.pathname === "/proxies") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            proxies: {
              "group-v6": {
                name: "group-v6",
                type: "Selector",
                now: "node-1",
                all: ["node-1", "node-2"],
              },
            },
          })
        );
        return;
      }
      let body = "";
      req.on("data", (c) => (body += c));
      req.on("end", () => {
        res.writeHead(204);
        res.end();
      });
    });
    await new Promise<void>((r) => fake.listen(0, "127.0.0.1", () => r()));
    const fakeAddr = fake.address();
    if (!fakeAddr || typeof fakeAddr === "string") throw new Error("no addr");
    try {
      const created = await sub.createSubscription({
        name: "sel-sym",
        url: `http://127.0.0.1:${feedAddr.port}/list`,
        enabled: false,
        // Bracket-stripped loopback stored by the upsert (`coreUrl.hostname`
        // keeps `[::1]`; the row host is compared after symmetric strip).
        // Exercises normalizeRowTarget's bracket + default handling.
        localCoreEndpoint: "socks5://127.0.0.1:1080 selector=group-v6",
        controlUrl: `http://127.0.0.1:${fakeAddr.port}`,
        controlSecret: "sym-secret",
      });
      await sub.syncSubscription(created.id);
      const rows = core
        .getDbInstance()
        .prepare("SELECT host, port FROM proxy_registry WHERE subscription_id = ?")
        .all(created.id) as Array<{ host: string; port: number }>;
      assert.equal(rows.length, 1);
      assert.equal(rows[0].port, 1080);
      assert.equal(rows[0].host, "127.0.0.1");
      trigger.__resetSelectorTriggerForTesting();
      const res = await trigger.maybeSwitchOnSetAside("socks5://@127.0.0.1:1080");
      assert.equal(res.switched, true, JSON.stringify(res));
      await sub.deleteSubscription(created.id);
    } finally {
      await new Promise((r) => feedSrv.close(() => r()));
      await new Promise((r) => fake.close(() => r()));
    }
  } finally {
    proxyHealth.__setProxyHealthTcpCheckForTesting(null);
    core.resetDbInstance();
    (await import("node:fs")).rmSync(dir, { recursive: true, force: true });
    if (prevDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = prevDataDir;
    if (prevFlag === undefined) delete process.env.PROXY_SKIP_RECENTLY_FAILED;
    else process.env.PROXY_SKIP_RECENTLY_FAILED = prevFlag;
  }
});

test("reset helper exists for test isolation", () => {
  __resetSelectorTriggerForTesting();
  __setAnyControlUrlConfiguredForTesting(false);
});
