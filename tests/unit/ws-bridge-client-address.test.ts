/**
 * The WebSocket relays call the app over loopback on behalf of the client. The app tells a local
 * caller from a remote one, and applies the IP allow/deny list, from the socket peer plus the
 * forwarding headers on that call. A relay therefore has to report the client's real address,
 * and must not pass along a forwarding header the client wrote itself, or every WebSocket
 * client looks like the host and the IP filter never sees it.
 */

import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import WebSocket from "ws";

const { createOmnirouteWsBridge } = await import("../../scripts/dev/v1-ws-bridge.mjs");
const { createResponsesWsProxy } = await import("../../scripts/dev/responses-ws-proxy.mjs");
const { relayForwardingHeaders } = await import("../../scripts/dev/peer-stamp.mjs");

const ORIGINAL_TRUST_PROXY = process.env.OMNIROUTE_TRUST_PROXY;
test.beforeEach(() => {
  delete process.env.OMNIROUTE_TRUST_PROXY;
});
test.after(() => {
  if (ORIGINAL_TRUST_PROXY === undefined) delete process.env.OMNIROUTE_TRUST_PROXY;
  else process.env.OMNIROUTE_TRUST_PROXY = ORIGINAL_TRUST_PROXY;
});

const externalAddress = Object.values(os.networkInterfaces())
  .flat()
  .find((entry) => entry && entry.family === "IPv4" && !entry.internal)?.address;

function waitFor(predicate: () => unknown, timeoutMs = 5000) {
  const startedAt = Date.now();
  return new Promise<void>((resolve, reject) => {
    const timer = setInterval(() => {
      if (predicate()) {
        clearInterval(timer);
        resolve();
      } else if (Date.now() - startedAt > timeoutMs) {
        clearInterval(timer);
        reject(new Error("Timed out waiting for condition"));
      }
    }, 10);
  });
}

test("a remote client is reported by its own address and what it wrote is dropped", () => {
  for (const peer of ["203.0.113.9", "::ffff:203.0.113.9", "2001:db8::7"]) {
    const headers = relayForwardingHeaders(peer, {
      "x-forwarded-for": "127.0.0.1",
      "x-real-ip": "127.0.0.1",
      "cf-connecting-ip": "127.0.0.1",
    });
    assert.deepEqual(headers, { "x-forwarded-for": peer.replace(/^::ffff:/, "") }, peer);
  }
});

test("a call with no peer address is reported as unknown, never as a local client", () => {
  assert.deepEqual(relayForwardingHeaders(undefined, {}), { "x-forwarded-for": "unknown" });
  assert.deepEqual(relayForwardingHeaders("", { "x-forwarded-for": "127.0.0.1" }), {
    "x-forwarded-for": "unknown",
  });
});

test("a loopback peer keeps every forwarding header it sent, and only those", () => {
  const sent = {
    "x-forwarded-for": "198.51.100.4",
    "x-real-ip": "198.51.100.4",
    "cf-connecting-ip": "198.51.100.4",
    authorization: "Bearer key",
  };
  for (const peer of ["127.0.0.1", "::1", "::ffff:127.0.0.1"]) {
    assert.deepEqual(
      relayForwardingHeaders(peer, sent),
      {
        "x-forwarded-for": "198.51.100.4",
        "x-real-ip": "198.51.100.4",
        "cf-connecting-ip": "198.51.100.4",
      },
      peer
    );
  }
  assert.deepEqual(relayForwardingHeaders("127.0.0.1", {}), {});
  assert.deepEqual(relayForwardingHeaders("127.0.0.1", { "x-real-ip": "198.51.100.4" }), {
    "x-real-ip": "198.51.100.4",
  });
});

test("a private-network peer is only trusted to report its clients when the operator says so", () => {
  const sent = { "x-forwarded-for": "198.51.100.4", "x-real-ip": "198.51.100.4" };
  for (const peer of ["10.1.2.3", "172.18.0.5", "192.168.1.20", "100.64.0.9", "fd00::5"]) {
    assert.deepEqual(relayForwardingHeaders(peer, sent), { "x-forwarded-for": peer }, peer);
  }

  process.env.OMNIROUTE_TRUST_PROXY = "private";
  for (const peer of ["10.1.2.3", "172.18.0.5", "192.168.1.20", "100.64.0.9", "fd00::5"]) {
    assert.deepEqual(
      relayForwardingHeaders(peer, sent),
      { "x-forwarded-for": `198.51.100.4, ${peer}`, "x-real-ip": "198.51.100.4" },
      peer
    );
  }
  assert.deepEqual(relayForwardingHeaders("172.18.0.5", {}), { "x-forwarded-for": "172.18.0.5" });
  assert.deepEqual(relayForwardingHeaders("203.0.113.9", sent), {
    "x-forwarded-for": "203.0.113.9",
  });

  process.env.OMNIROUTE_TRUST_PROXY = "loopback";
  assert.deepEqual(relayForwardingHeaders("172.18.0.5", sent), { "x-forwarded-for": "172.18.0.5" });
});

test("a Cloudflare edge is trusted to report its clients", () => {
  assert.deepEqual(
    relayForwardingHeaders("172.71.150.1", {
      "x-forwarded-for": "198.51.100.4",
      "cf-connecting-ip": "198.51.100.4",
    }),
    { "x-forwarded-for": "198.51.100.4, 172.71.150.1", "cf-connecting-ip": "198.51.100.4" }
  );
});

async function withV1Bridge(
  run: (ctx: {
    port: number;
    received: Array<{ path: string; forwardedFor: string | undefined }>;
  }) => Promise<void>
) {
  const received: Array<{ path: string; forwardedFor: string | undefined }> = [];
  const dashboard = http.createServer((req, res) => {
    const url = new URL(req.url || "/", "http://dashboard.local");
    received.push({
      path: url.pathname,
      forwardedFor: (req.headers["x-forwarded-for"] as string | undefined) || undefined,
    });
    if (url.pathname === "/api/v1/ws") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ ok: true, path: "/v1/ws", wsAuth: false, authenticated: false }));
      return;
    }
    res.writeHead(200, { "content-type": "text/event-stream" });
    res.end("data: [DONE]\n\n");
  });
  await new Promise<void>((resolve) => dashboard.listen(0, "127.0.0.1", resolve));
  const dashboardPort = (dashboard.address() as net.AddressInfo).port;

  const bridge = createOmnirouteWsBridge({
    baseUrl: `http://127.0.0.1:${dashboardPort}`,
    pingIntervalMs: 1000,
    idleTimeoutMs: 10000,
  });
  const relay = http.createServer();
  relay.on("upgrade", async (req, socket, head) => {
    if (!(await bridge.handleUpgrade(req, socket, head)) && !socket.destroyed) socket.destroy();
  });
  await new Promise<void>((resolve) => relay.listen(0, "0.0.0.0", resolve));

  try {
    await run({ port: (relay.address() as net.AddressInfo).port, received });
  } finally {
    relay.close();
    relay.closeAllConnections();
    dashboard.close();
    dashboard.closeAllConnections();
  }
}

async function exchangeOneRequest(url: string, headers: Record<string, string>) {
  const ws = new WebSocket(url, { headers });
  const opened = new Promise<void>((resolve, reject) => {
    ws.on("message", (data) => {
      if (JSON.parse(String(data)).type === "session.ready") resolve();
    });
    ws.on("error", reject);
  });
  await opened;
  ws.send(
    JSON.stringify({
      type: "request",
      id: "req-1",
      payload: { model: "openai/gpt-4.1-mini", messages: [{ role: "user", content: "hi" }] },
    })
  );
  return ws;
}

test(
  "the /v1/ws relay reports a remote client's own address and drops a forged one",
  { skip: externalAddress ? false : "no non-loopback IPv4 interface" },
  async () => {
    await withV1Bridge(async ({ port, received }) => {
      const ws = await exchangeOneRequest(`ws://${externalAddress}:${port}/v1/ws`, {
        "x-forwarded-for": "198.51.100.77",
      });
      await waitFor(() => received.some((entry) => entry.path === "/v1/chat/completions"));
      ws.close();

      for (const entry of received) {
        assert.equal(entry.forwardedFor, externalAddress, entry.path);
      }
    });
  }
);

test("the /v1/ws relay leaves a local client's forwarding headers alone", async () => {
  await withV1Bridge(async ({ port, received }) => {
    const ws = await exchangeOneRequest(`ws://127.0.0.1:${port}/v1/ws`, {
      "x-forwarded-for": "198.51.100.4",
    });
    await waitFor(() => received.some((entry) => entry.path === "/v1/chat/completions"));
    ws.close();

    for (const entry of received) {
      assert.equal(entry.forwardedFor, "198.51.100.4", entry.path);
    }
  });
});

function upgradeRequest(remoteAddress: string, forwardedFor?: string) {
  return {
    url: "/v1/responses",
    headers: {
      upgrade: "websocket",
      authorization: "Bearer key",
      ...(forwardedFor ? { "x-forwarded-for": forwardedFor } : {}),
    },
    socket: { remoteAddress },
  };
}

async function authenticateCall(remoteAddress: string, forwardedFor?: string) {
  const calls: Array<{
    headers: Record<string, string>;
    body: { action: string; headers: Record<string, string | undefined> };
  }> = [];
  const proxy = createResponsesWsProxy({
    baseUrl: "http://127.0.0.1:9",
    bridgeSecret: "bridge-secret",
    wsFactory: () => ({}),
    fetchImpl: (async (_url: string, init: { headers: Record<string, string>; body: string }) => {
      calls.push({ headers: init.headers, body: JSON.parse(init.body) });
      return new Response("{}", { status: 401 });
    }) as never,
  });
  const socket = {
    writable: true,
    destroyed: false,
    write() {},
    end() {},
    destroy() {},
  };
  await proxy.handleUpgrade(upgradeRequest(remoteAddress, forwardedFor), socket, Buffer.alloc(0));
  return calls;
}

test("the Responses relay reports a remote client's own address and drops a forged one", async () => {
  const [call] = await authenticateCall("203.0.113.9", "198.51.100.77");
  assert.equal(call.body.action, "authenticate");
  assert.equal(call.headers["x-forwarded-for"], "203.0.113.9");
  assert.equal(call.body.headers["x-forwarded-for"], "203.0.113.9");
});

test("the Responses relay leaves a local client's forwarding header alone", async () => {
  const [forwarded] = await authenticateCall("127.0.0.1", "198.51.100.4");
  assert.equal(forwarded.body.headers["x-forwarded-for"], "198.51.100.4");

  const [plain] = await authenticateCall("::ffff:127.0.0.1");
  assert.equal(plain.headers["x-forwarded-for"], undefined);
  assert.equal(plain.body.headers["x-forwarded-for"], undefined);
});

// A whole Responses session, so every call the relay makes for it is seen, not only the first.
async function runResponsesSession(
  wsUrl: (relayPort: number) => string,
  headers: Record<string, string>
) {
  const internal: Array<{
    action: string;
    forwardedFor: string | undefined;
    bodyForwardedFor?: string;
  }> = [];
  const dashboard = http.createServer(async (req, res) => {
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(chunk as Buffer);
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
    internal.push({
      action: body.action,
      forwardedFor: req.headers["x-forwarded-for"] as string | undefined,
      bodyForwardedFor: body.headers?.["x-forwarded-for"],
    });
    res.writeHead(200, { "content-type": "application/json" });
    if (body.action === "authenticate") res.end(JSON.stringify({ ok: true, authenticated: true }));
    else if (body.action === "prepare") {
      res.end(
        JSON.stringify({
          ok: true,
          upstreamUrl: "wss://upstream.example/responses",
          headers: {},
          connectionId: "conn_1",
          provider: "codex",
          account: "acct",
          model: "gpt-5.4-mini",
          leaseId: "lease-1",
          response: { ...body.response, model: "gpt-5.4-mini" },
        })
      );
    } else res.end(JSON.stringify({ ok: true }));
  });
  await new Promise<void>((resolve) => dashboard.listen(0, "127.0.0.1", resolve));
  const dashboardPort = (dashboard.address() as net.AddressInfo).port;

  const fakeUpstream = {
    send(data: string) {
      if (JSON.parse(data).type !== "response.create") return;
      setTimeout(
        () =>
          fakeUpstream.onmessage?.({
            data: JSON.stringify({
              type: "response.completed",
              response: { id: "resp_1", model: "gpt-5.4-mini", status: "completed", usage: {} },
            }),
          }),
        10
      );
    },
    close() {},
    onmessage: null as ((event: { data: string }) => void) | null,
    onerror: null,
    onclose: null,
  };
  const proxy = createResponsesWsProxy({
    baseUrl: `http://127.0.0.1:${dashboardPort}`,
    bridgeSecret: "bridge-secret",
    pingIntervalMs: 1000,
    idleTimeoutMs: 10000,
    wsFactory: async () => fakeUpstream,
  });
  const relay = http.createServer();
  relay.on("upgrade", async (req, socket, head) => {
    if (!(await proxy.handleUpgrade(req, socket, head)) && !socket.destroyed) socket.destroy();
  });
  await new Promise<void>((resolve) => relay.listen(0, "0.0.0.0", resolve));
  const relayPort = (relay.address() as net.AddressInfo).port;

  const ws = new WebSocket(wsUrl(relayPort), { headers });
  try {
    const completed = new Promise<void>((resolve, reject) => {
      ws.on("message", (data) => {
        if (JSON.parse(String(data)).type === "response.completed") resolve();
      });
      ws.on("error", reject);
    });
    await new Promise<void>((resolve, reject) => {
      ws.on("open", () => resolve());
      ws.on("error", reject);
    });
    ws.send(
      JSON.stringify({
        type: "response.create",
        model: "gpt-5.4-mini",
        input: [{ role: "user", content: "hi" }],
        stream: true,
      })
    );
    await completed;
    ws.close();
    await waitFor(() => internal.some((call) => call.action === "release"));
    await waitFor(() => internal.some((call) => call.action === "log"));
  } finally {
    ws.terminate();
    relay.close();
    relay.closeAllConnections();
    dashboard.close();
    dashboard.closeAllConnections();
  }
  return internal;
}

test(
  "every call the Responses relay makes for a remote client reports its own address",
  { skip: externalAddress ? false : "no non-loopback IPv4 interface" },
  async () => {
    const calls = await runResponsesSession(
      (port) => `ws://${externalAddress}:${port}/v1/responses`,
      {
        authorization: "Bearer key",
        "x-forwarded-for": "198.51.100.77",
        "x-real-ip": "198.51.100.77",
      }
    );
    const actions = new Set(calls.map((call) => call.action));
    for (const action of ["authenticate", "prepare", "log", "release"]) {
      assert.ok(actions.has(action), `no ${action} call was made`);
    }
    for (const call of calls) {
      assert.equal(call.forwardedFor, externalAddress, call.action);
    }
    for (const call of calls.filter((entry) => entry.action !== "release")) {
      assert.equal(
        call.bodyForwardedFor === undefined || call.bodyForwardedFor === externalAddress,
        true,
        call.action
      );
    }
  }
);

test("every call the Responses relay makes for a local client keeps its own headers", async () => {
  const calls = await runResponsesSession((port) => `ws://127.0.0.1:${port}/v1/responses`, {
    authorization: "Bearer key",
    "x-real-ip": "198.51.100.4",
  });
  const actions = new Set(calls.map((call) => call.action));
  for (const action of ["authenticate", "prepare", "log", "release"]) {
    assert.ok(actions.has(action), `no ${action} call was made`);
  }
  for (const call of calls) {
    assert.equal(call.forwardedFor, undefined, call.action);
  }
});

test("a denied /v1/ws handshake gets a well-formed HTTP error, not the upstream framing headers", async () => {
  const dashboard = http.createServer((_req, res) => {
    // No Content-Length: Node answers with Transfer-Encoding: chunked.
    res.writeHead(403, { "content-type": "application/json" });
    res.write('{"error":"IP not in whitelist"}');
    res.end();
  });
  await new Promise<void>((resolve) => dashboard.listen(0, "127.0.0.1", resolve));
  const dashboardPort = (dashboard.address() as net.AddressInfo).port;
  const bridge = createOmnirouteWsBridge({
    baseUrl: `http://127.0.0.1:${dashboardPort}`,
    pingIntervalMs: 1000,
    idleTimeoutMs: 10000,
  });
  const relay = http.createServer();
  relay.on("upgrade", async (req, socket, head) => {
    if (!(await bridge.handleUpgrade(req, socket, head)) && !socket.destroyed) socket.destroy();
  });
  await new Promise<void>((resolve) => relay.listen(0, "127.0.0.1", resolve));
  const relayPort = (relay.address() as net.AddressInfo).port;

  try {
    const raw = await new Promise<string>((resolve, reject) => {
      const client = net.connect(relayPort, "127.0.0.1");
      let received = "";
      client.on("data", (chunk) => (received += chunk.toString("utf8")));
      client.on("close", () => resolve(received));
      client.on("error", reject);
      client.on("connect", () =>
        client.write(
          [
            "GET /v1/ws HTTP/1.1",
            `Host: 127.0.0.1:${relayPort}`,
            "Connection: Upgrade",
            "Upgrade: websocket",
            "Sec-WebSocket-Version: 13",
            "Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==",
            "",
            "",
          ].join("\r\n")
        )
      );
    });
    const head = raw.split("\r\n\r\n")[0];
    assert.match(head, /^HTTP\/1\.1 403 Forbidden/);
    assert.equal(/transfer-encoding/i.test(head), false, head);
    assert.equal((head.match(/content-length/gi) || []).length, 1, head);
    assert.equal((head.match(/content-type/gi) || []).length, 1, head);
    assert.equal((head.match(/connection:/gi) || []).length, 1, head);
    assert.match(raw, /IP not in whitelist/);
  } finally {
    relay.close();
    relay.closeAllConnections();
    dashboard.close();
    dashboard.closeAllConnections();
  }
});
