import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sub-feedless-"));
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.INITIAL_PASSWORD;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "proxy-sub-feedless-test-secret";

const core = await import("../../src/lib/db/core.ts");
const sub = await import("../../src/lib/proxySubscription/index.ts");
const due = await import("../../src/lib/proxySubscription/due.ts");
const scopes = await import("../../src/lib/proxySubscription/scopes.ts");
const collectionRoute =
  await import("../../src/app/api/v1/management/proxy-subscriptions/route.ts");
const itemRoute = await import("../../src/app/api/v1/management/proxy-subscriptions/[id]/route.ts");

function reset() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function jsonRequest(url: string, body: unknown, method = "POST"): Request {
  return new Request(url, {
    method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
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

function startControlServer(): Promise<{
  port: number;
  seenPuts: string[];
  puts: Array<{ selector: string; name: string }>;
  close: () => Promise<void>;
}> {
  const seenPuts: string[] = [];
  const puts: Array<{ selector: string; name: string }> = [];
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
                now: "node-1",
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
          seenPuts.push(`${u.pathname}:${body}`);
          try {
            puts.push({ selector: "group-a", name: (JSON.parse(body) as { name: string }).name });
          } catch {
            // ignore malformed test body
          }
          res.writeHead(204);
          res.end();
        });
        return;
      }
      let body = "";
      req.on("data", (c) => (body += c));
      req.on("end", () => {
        if (req.method === "PUT") seenPuts.push(`${u.pathname}:${body}`);
        res.writeHead(204);
        res.end();
      });
    });
    srv.listen(0, "127.0.0.1", () => {
      const addr = srv.address();
      if (!addr || typeof addr === "string") throw new Error("no addr");
      resolve({
        port: addr.port,
        seenPuts,
        puts,
        close: () => new Promise((r) => srv.close(() => r())),
      });
    });
  });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("creates with no url and a control url, with no fetch", async () => {
  await reset();
  const ctl = await startControlServer();
  try {
    const created = await sub.createSubscription({
      name: "feedless-1",
      url: "",
      enabled: true,
      mode: "global",
      controlUrl: `http://127.0.0.1:${ctl.port}`,
    });
    try {
      assert.equal(created.url, "");
      assert.equal(created.status, "empty");
      assert.equal(created.lastFetchedAt, null);
      const rows = core
        .getDbInstance()
        .prepare("SELECT id FROM proxy_registry WHERE subscription_id = ?")
        .all(created.id) as Array<{ id: string }>;
      assert.equal(rows.length, 0);
    } finally {
      await sub.deleteSubscription(created.id);
    }
  } finally {
    await ctl.close();
  }
});

test("creating with no url and no control url is refused", async () => {
  await reset();
  const name = "feedless-no-control";
  const req = jsonRequest("http://localhost/api/v1/management/proxy-subscriptions", {
    name,
    url: "",
  });
  const res = await collectionRoute.POST(req);
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: string };
  assert.equal(body.error, "url is required");
  const rows = core
    .getDbInstance()
    .prepare("SELECT id FROM proxy_subscriptions WHERE name = ?")
    .all(name) as Array<{ id: string }>;
  assert.equal(rows.length, 0);
});

test("service call with no url and no control url leaves no row", async () => {
  await reset();
  const name = "feedless-service-direct";
  await assert.rejects(
    () =>
      sub.createSubscription({
        name,
        url: "",
        enabled: false,
        mode: "global",
      }),
    /url is required/
  );
  try {
    const rows = core
      .getDbInstance()
      .prepare("SELECT id FROM proxy_subscriptions WHERE name = ?")
      .all(name) as Array<{ id: string }>;
    assert.equal(rows.length, 0);
  } finally {
    const leftovers = core
      .getDbInstance()
      .prepare("SELECT id FROM proxy_subscriptions WHERE name = ?")
      .all(name) as Array<{ id: string }>;
    for (const row of leftovers) {
      await sub.deleteSubscription(row.id);
    }
  }
});

test("route creates with no url when a control url is present", async () => {
  await reset();
  const ctl = await startControlServer();
  try {
    const req = jsonRequest("http://localhost/api/v1/management/proxy-subscriptions", {
      name: "feedless-route",
      url: "",
      controlUrl: `http://127.0.0.1:${ctl.port}`,
    });
    const res = await collectionRoute.POST(req);
    assert.equal(res.status, 201);
    const body = (await res.json()) as { id: string };
    try {
      const row = await sub.getSubscriptionById(body.id);
      assert.ok(row);
      assert.equal(row!.url, "");
    } finally {
      await sub.deleteSubscription(body.id);
    }
  } finally {
    await ctl.close();
  }
});

test("refreshing a feedless row writes nothing and keeps status", async () => {
  await reset();
  const ctl = await startControlServer();
  try {
    const created = await sub.createSubscription({
      name: "feedless-refresh",
      url: "",
      enabled: true,
      mode: "global",
      controlUrl: `http://127.0.0.1:${ctl.port}`,
    });
    try {
      const before = await sub.getSubscriptionById(created.id);
      const result = await sub.syncSubscription(created.id);
      assert.equal(result.nodes, 0);
      assert.equal(result.applied, false);
      const after = await sub.getSubscriptionById(created.id);
      assert.equal(after!.status, before!.status);
      assert.equal(after!.updatedAt, before!.updatedAt);
      const registry = core
        .getDbInstance()
        .prepare("SELECT id FROM proxy_registry WHERE subscription_id = ?")
        .all(created.id) as Array<{ id: string }>;
      assert.equal(registry.length, 0);
    } finally {
      await sub.deleteSubscription(created.id);
    }
  } finally {
    await ctl.close();
  }
});

test("activating a feedless row binds no scope", async () => {
  await reset();
  const ctl = await startControlServer();
  try {
    const created = await sub.createSubscription({
      name: "feedless-scope",
      url: "",
      enabled: false,
      mode: "global",
      controlUrl: `http://127.0.0.1:${ctl.port}`,
    });
    try {
      await sub.applySubscription(created.id);
      const assignments = core
        .getDbInstance()
        .prepare("SELECT 1 FROM proxy_assignments LIMIT 1")
        .get();
      assert.equal(assignments, undefined);
      assert.deepEqual(scopes.resolveTargetScopes({ mode: "global", url: "" }), []);
    } finally {
      await sub.deleteSubscription(created.id);
    }
  } finally {
    await ctl.close();
  }
});

test("sets aside an attached output through the selector reader", async () => {
  await reset();
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
  const ctl = await startControlServer();
  const feed = await startFeedServer("ss://YWVzLTI1Ni1nY206cGFzcw@203.0.113.9:8388#ss-node");
  const trigger = await import("../../src/lib/proxySubscription/selectorTrigger.ts");
  const proxyHealth = await import("../../src/lib/proxyHealth.ts");
  proxyHealth.__setProxyHealthTcpCheckForTesting(async () => true);
  try {
    const created = await sub.createSubscription({
      name: "feedless-trigger",
      url: feed.url,
      enabled: false,
      mode: "global",
      localCoreEndpoint: "socks5://127.0.0.1:1080 selector=group-a",
      controlUrl: `http://127.0.0.1:${ctl.port}`,
      controlSecret: "feedless-secret",
    });
    try {
      const synced = await sub.syncSubscription(created.id);
      assert.equal(synced.status, "ok");
      const updated = await sub.updateSubscription(created.id, { url: "" });
      assert.ok(updated);
      assert.equal(updated!.url, "");
      trigger.__resetSelectorTriggerForTesting();
      const res = await trigger.maybeSwitchOnSetAside("socks5://@127.0.0.1:1080");
      assert.equal(res.switched, true, JSON.stringify(res));
      assert.ok(ctl.seenPuts.length >= 1, "expected a selector PUT call");
    } finally {
      await sub.deleteSubscription(created.id);
    }
  } finally {
    await feed.close();
    await ctl.close();
  }
});

test("a row with a url keeps its sync, due and scope behavior", async () => {
  await reset();
  const feed = await startFeedServer(
    [
      "proxies:",
      "  - name: node-1",
      "    type: http",
      "    server: 127.0.0.1",
      "    port: 8080",
    ].join("\n")
  );
  try {
    const created = await sub.createSubscription({
      name: "with-url",
      url: feed.url,
      enabled: true,
      mode: "global",
    });
    try {
      assert.equal(created.status, "ok");
      assert.deepEqual(scopes.resolveTargetScopes({ mode: "global", url: feed.url }), [
        { scope: "global", scopeId: null },
      ]);
      const last = new Date("2026-01-01T00:00:00.000Z").getTime();
      const lastIso = new Date(last).toISOString();
      assert.equal(
        due.isSubscriptionDue(
          { enabled: true, lastFetchedAt: lastIso, updateIntervalMinutes: 60, url: feed.url },
          last + 61 * 60_000
        ),
        true
      );
    } finally {
      await sub.deleteSubscription(created.id);
    }
  } finally {
    await feed.close();
  }
});

test("due and scope readers treat a blank url as feedless", () => {
  assert.equal(
    due.isSubscriptionDue({
      enabled: true,
      lastFetchedAt: null,
      updateIntervalMinutes: 60,
      url: "",
    }),
    false
  );
  assert.equal(
    due.isSubscriptionDue(
      { enabled: true, lastFetchedAt: null, updateIntervalMinutes: 60, url: "   " },
      Date.now()
    ),
    false
  );
  assert.equal(
    due.isSubscriptionDue({ enabled: true, lastFetchedAt: null, updateIntervalMinutes: 60 }),
    true
  );
  assert.equal(due.isFeedlessSubscription(""), true);
  assert.equal(due.isFeedlessSubscription("   "), true);
  assert.equal(due.isFeedlessSubscription("https://example.com/x"), false);
  assert.equal(due.isFeedlessSubscription(undefined), false);
  assert.equal(due.isFeedlessSubscription(42), false);
  assert.deepEqual(scopes.resolveTargetScopes({ mode: "rule", ruleProviders: ["p"], url: "" }), []);
});

test("patch that empties the url with no control url is refused with the object envelope", async () => {
  await reset();
  const feed = await startFeedServer(
    [
      "proxies:",
      "  - name: node-1",
      "    type: http",
      "    server: 127.0.0.1",
      "    port: 8080",
    ].join("\n")
  );
  try {
    const created = await sub.createSubscription({
      name: "patch-empty",
      url: feed.url,
      enabled: false,
      mode: "global",
    });
    try {
      const req = jsonRequest(
        `http://localhost/api/v1/management/proxy-subscriptions/${created.id}`,
        { url: "" },
        "PATCH"
      );
      const res = await itemRoute.PATCH(req, { params: Promise.resolve({ id: created.id }) });
      assert.equal(res.status, 400);
      const body = (await res.json()) as {
        error?: { message?: string; type?: string };
        requestId?: string;
      };
      assert.equal(body.error?.message, "url is required");
      assert.equal(body.error?.type, "invalid_request");
      assert.ok(typeof body.requestId === "string");
    } finally {
      await sub.deleteSubscription(created.id);
    }
  } finally {
    await feed.close();
  }
});

test("patch that empties the url with a control url stays allowed", async () => {
  await reset();
  const ctl = await startControlServer();
  const feed = await startFeedServer(
    [
      "proxies:",
      "  - name: node-1",
      "    type: http",
      "    server: 127.0.0.1",
      "    port: 8080",
    ].join("\n")
  );
  try {
    const created = await sub.createSubscription({
      name: "patch-allowed",
      url: feed.url,
      enabled: false,
      mode: "global",
      controlUrl: `http://127.0.0.1:${ctl.port}`,
    });
    try {
      const req = jsonRequest(
        `http://localhost/api/v1/management/proxy-subscriptions/${created.id}`,
        { url: "" },
        "PATCH"
      );
      const res = await itemRoute.PATCH(req, { params: Promise.resolve({ id: created.id }) });
      assert.equal(res.status, 200);
    } finally {
      await sub.deleteSubscription(created.id);
    }
  } finally {
    await feed.close();
    await ctl.close();
  }
});
