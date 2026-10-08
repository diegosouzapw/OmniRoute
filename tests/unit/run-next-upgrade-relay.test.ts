import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import type { AddressInfo } from "node:net";
import type { Duplex } from "node:stream";
import { fileURLToPath } from "node:url";
import next from "next";
import { WebSocket } from "ws";

// Under scripts/dev/run-next.mjs (`npm run dev` / `npm start`) every WebSocket on /v1/responses
// and /v1/ws was cut (socket hang up / close 1006) once the server had served any HTTP request.
// next() lazily attaches its router upgrade listener to `options.httpServer ||
// req.socket.server` on the first request it serves (NextCustomServer.setupWebSocketHandler).
// That listener runs alongside run-next's dispatcher and `socket.end()`s every upgrade whose
// path resolves to an app route (router-server.js: `if (matchedOutput) return socket.end()`);
// /v1/responses and /v1/ws are rewritten to /api/v1/... app routes, so the sockets the
// Responses WebSocket proxy and the /v1/ws bridge had already claimed were ended under them.

const { createNextUpgradeRelay } = await import("../../scripts/dev/next-upgrade-relay.mjs");
const { createResponsesWsProxy } = await import("../../scripts/dev/responses-ws-proxy.mjs");
const { createOmnirouteWsBridge } = await import("../../scripts/dev/v1-ws-bridge.mjs");

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");

type NextApp = ReturnType<typeof next> & {
  init?: unknown;
  getRequestHandler(): (req: http.IncomingMessage, res: http.ServerResponse) => Promise<void>;
};

/**
 * A real NextCustomServer (its own setupWebSocketHandler decides where the listener goes) with
 * prepare() replaced by a stand-in init, since unit tests have no `next build` output. The
 * stand-in upgrade handler does what router-server.js does for a matched app route (/v1/* is
 * rewritten to the /api/v1 routes): resolve the route asynchronously, then `socket.end()`.
 */
function createNextStandIn(httpServer?: unknown) {
  const app = next({ dev: false, dir: root, ...(httpServer ? { httpServer } : {}) } as never);
  const upgrades: string[] = [];
  (app as NextApp).init = {
    requestHandler: async (_req: http.IncomingMessage, res: http.ServerResponse) => {
      res.end("ok");
    },
    upgradeHandler: async (req: http.IncomingMessage, socket: Duplex) => {
      upgrades.push(req.url ?? "");
      await new Promise((r) => setTimeout(r, 5));
      // router-server.js ends matched app routes; the stand-in ends everything else too (it has
      // no HMR server to hand /_next/hmr to), which keeps the half-open socket from lingering.
      socket.end();
    },
  };
  return { app: app as NextApp, upgrades };
}

const okFetch = (async () =>
  new Response(JSON.stringify({ path: "/v1/ws" }), {
    status: 200,
    headers: { "content-type": "application/json" },
  })) as typeof fetch;

async function startServer(withRelay: boolean) {
  const baseUrl = "http://127.0.0.1:1";
  const responsesWsProxy = createResponsesWsProxy({
    baseUrl,
    bridgeSecret: "test-secret",
    fetchImpl: okFetch,
    wsFactory: () => {
      throw new Error("no upstream in this test");
    },
  });
  const wsBridge = createOmnirouteWsBridge({ baseUrl, fetchImpl: okFetch });
  const relay = withRelay ? createNextUpgradeRelay() : null;
  const { app, upgrades } = createNextStandIn(relay?.target);
  const requestHandler = app.getRequestHandler();
  const server = http.createServer((req, res) => void requestHandler(req, res));
  // Same dispatch order as scripts/dev/run-next.mjs.
  server.on("upgrade", async (req, socket, head) => {
    if (await responsesWsProxy.handleUpgrade(req, socket, head)) return;
    if (await wsBridge.handleUpgrade(req, socket, head)) return;
    if (relay?.forward(req, socket, head)) return;
    socket.destroy();
  });
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", () => r()));
  const port = (server.address() as AddressInfo).port;
  // Any HTTP request makes Next attach its upgrade listener (dashboard load, health check, …).
  const res = await fetch(`http://127.0.0.1:${port}/api/monitoring/health`);
  assert.equal(await res.text(), "ok");
  const stop = async () => {
    server.closeAllConnections();
    await new Promise((r) => server.close(r));
  };
  return { server, port, upgrades, stop };
}

type Held = { opened: boolean; code: number; closedBy: "client" | "server" };

/** Opens a WebSocket, holds it `holdMs`, then closes with 1000; reports who ended it. */
function holdSession(port: number, wsPath: string, holdMs = 300): Promise<Held> {
  return new Promise((resolve) => {
    const ws = new WebSocket(`ws://127.0.0.1:${port}${wsPath}`);
    let opened = false;
    let clientClosed = false;
    ws.on("open", () => {
      opened = true;
      setTimeout(() => {
        if (ws.readyState !== WebSocket.OPEN) return;
        clientClosed = true;
        ws.close(1000);
      }, holdMs);
    });
    ws.on("close", (code) =>
      resolve({ opened, code, closedBy: clientClosed ? "client" : "server" })
    );
    ws.on("error", () => {}); // "socket hang up" when ended before the 101; close follows
  });
}

test("control: Next's auto-attached upgrade listener ends claimed /v1/responses and /v1/ws sockets", async () => {
  const { server, port, upgrades, stop } = await startServer(false);
  try {
    assert.equal(server.listenerCount("upgrade"), 2, "next() attached a second upgrade listener");
    for (const wsPath of ["/v1/responses", "/v1/ws"]) {
      const r = await holdSession(port, wsPath);
      assert.equal(r.closedBy, "server", `${wsPath} was cut before the client closed it`);
      assert.equal(r.code, 1006, `${wsPath}: abnormal closure, no close frame`);
    }
    assert.deepEqual(upgrades, ["/v1/responses", "/v1/ws"], "Next saw the claimed upgrades");
  } finally {
    await stop();
  }
});

test("with the relay, claimed sockets live until the client closes them", async () => {
  const { server, port, upgrades, stop } = await startServer(true);
  try {
    assert.equal(server.listenerCount("upgrade"), 1, "the dispatcher is the only upgrade listener");
    const responses = await holdSession(port, "/v1/responses");
    assert.deepEqual(responses, { opened: true, code: 1000, closedBy: "client" });
    const bridge = await holdSession(port, "/v1/ws");
    assert.equal(bridge.opened, true);
    assert.equal(bridge.closedBy, "client", "the /v1/ws session was not cut by Next");
    assert.deepEqual(upgrades, [], "Next never saw the claimed upgrades");
  } finally {
    await stop();
  }
});

test("the relay still forwards upgrades nobody claimed to Next (dev HMR)", async () => {
  const { port, upgrades, stop } = await startServer(true);
  try {
    await new Promise<void>((resolve) => {
      const ws = new WebSocket(`ws://127.0.0.1:${port}/_next/hmr`);
      ws.on("error", () => {});
      ws.on("close", () => resolve());
    });
    assert.deepEqual(upgrades, ["/_next/hmr"]);
  } finally {
    await stop();
  }
});

test("relay.forward reports false before Next attached its listener", () => {
  const relay = createNextUpgradeRelay();
  assert.equal(relay.forward({}, {}, Buffer.alloc(0)), false);
});

test("run-next.mjs hands next() the relay and forwards only unclaimed upgrades through it", () => {
  const src = fs.readFileSync(path.join(root, "scripts/dev/run-next.mjs"), "utf8");
  const createApp = src.slice(src.indexOf("function createNextApp()"));
  assert.match(
    createApp.slice(0, createApp.indexOf("\n}")),
    /httpServer: nextUpgradeRelay\.target/
  );
  const bridge = src.indexOf("await wsBridge.handleUpgrade(req, socket, head)");
  const forward = src.indexOf("if (nextUpgradeRelay.forward(req, socket, head)) return;");
  assert.ok(bridge > 0 && forward > bridge, "Next only gets upgrades after the dispatchers");
});

const MOVED =
  "Next's upgrade handling changed — re-check that next() still attaches its upgrade listener to options.httpServer || req.socket.server and that router-server still ends app-route upgrades";

test("Next still attaches to httpServer || req.socket.server and ends app-route upgrades", () => {
  const nextSrc = fs.readFileSync(path.join(root, "node_modules/next/dist/server/next.js"), "utf8");
  assert.match(
    nextSrc,
    /customServer = customServer \|\| \(_req == null \? void 0 : \(_req_socket = _req\.socket\) == null \? void 0 : _req_socket\.server\);/,
    MOVED
  );
  assert.match(nextSrc, /this\.setupWebSocketHandler\(this\.options\.httpServer, req\);/, MOVED);
  const routerSrc = fs.readFileSync(
    path.join(root, "node_modules/next/dist/server/lib/router-server.js"),
    "utf8"
  );
  assert.match(routerSrc, /if \(matchedOutput\) \{\s*return socket\.end\(\);\s*\}/, MOVED);
});
