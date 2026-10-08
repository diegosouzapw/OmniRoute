import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import https from "node:https";
import http2 from "node:http2";
import net from "node:net";
import tls from "node:tls";
import { once } from "node:events";
import selfsigned from "selfsigned";
import { fetch, type Dispatcher } from "undici";
import {
  clearDispatcherCache,
  createProxyDispatcher,
  getDefaultDispatcher,
  getRetryDispatcher,
  getProxyRetryDispatcher,
} from "../../open-sse/utils/proxyDispatcher.ts";

const flag = "OMNIROUTE_UPSTREAM_HTTP2_ENABLED";
const originalFlag = process.env[flag];
const originalCa = tls.getCACertificates("default");
const sockets = new Set<net.Socket>();
const sessions = new Set<http2.ServerHttp2Session>();
const dispatchers = new Set<Dispatcher>();
const proxyProtocols: string[] = [];
const proxyAuth = `Basic ${Buffer.from("test:password").toString("base64")}`;
let upstream: http2.Http2SecureServer;
let plainProxy: http.Server;
let secureProxy: https.Server;
let socksProxy: net.Server;
let upstreamUrl: string;

function trackSockets(server: net.Server): void {
  server.on("connection", (socket) => {
    sockets.add(socket);
    socket.once("close", () => sockets.delete(socket));
    socket.on("error", () => {});
  });
}

async function listen(server: net.Server): Promise<number> {
  trackSockets(server);
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  return (server.address() as net.AddressInfo).port;
}

function tunnel(server: http.Server | https.Server): void {
  server.on("connect", (req, socket, head) => {
    if (req.headers["proxy-authorization"] !== proxyAuth) {
      socket.end("HTTP/1.1 407 Proxy Authentication Required\r\n\r\n");
      return;
    }
    const target = net.connect((upstream.address() as net.AddressInfo).port, "127.0.0.1");
    sockets.add(target);
    target.once("close", () => sockets.delete(target));
    target.on("error", () => socket.destroy());
    socket.on("error", () => target.destroy());
    socket.once("close", () => target.destroy());
    target.once("connect", () => {
      socket.write("HTTP/1.1 200 Connection Established\r\n\r\n");
      if (head.length) target.write(head);
      socket.pipe(target).pipe(socket);
    });
  });
}

function createSocksProxy(): net.Server {
  return net.createServer((socket) => {
    let buffer = Buffer.alloc(0);
    let greeted = false;
    const onData = (chunk: Buffer) => {
      buffer = Buffer.concat([buffer, chunk]);
      if (!greeted) {
        if (buffer.length < 2 || buffer.length < 2 + buffer[1]) return;
        buffer = buffer.subarray(2 + buffer[1]);
        greeted = true;
        socket.write(Buffer.from([5, 0]));
      }
      if (buffer.length < 10) return;
      assert.deepEqual([...buffer.subarray(0, 4)], [5, 1, 0, 1]);
      const target = net.connect(buffer.readUInt16BE(8), "127.0.0.1");
      sockets.add(target);
      target.once("close", () => sockets.delete(target));
      target.on("error", () => socket.destroy());
      socket.once("close", () => target.destroy());
      socket.removeListener("data", onData);
      target.once("connect", () => {
        socket.write(Buffer.from([5, 0, 0, 1, 127, 0, 0, 1, 0, 0]));
        if (buffer.length > 10) target.write(buffer.subarray(10));
        socket.pipe(target).pipe(socket);
      });
    };
    socket.on("data", onData);
  });
}

test.before(async () => {
  const pems = await selfsigned.generate([{ name: "commonName", value: "localhost" }], {
    keySize: 2048,
    algorithm: "sha256",
    extensions: [{ name: "subjectAltName", altNames: [{ type: 7, ip: "127.0.0.1" }] }],
  });
  tls.setDefaultCACertificates([...originalCa, pems.cert]);
  upstream = http2.createSecureServer({ key: pems.private, cert: pems.cert, allowHTTP1: true });
  upstream.on("session", (session) => {
    sessions.add(session);
    session.once("close", () => sessions.delete(session));
    session.on("error", () => {});
  });
  upstream.on("request", (req, res) => {
    let bytes = 0;
    req.on("data", (chunk: Buffer) => {
      bytes += chunk.length;
    });
    req.on("end", () => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ protocol: req.httpVersion, bytes }));
    });
  });
  upstreamUrl = `https://127.0.0.1:${await listen(upstream)}/upload`;
  plainProxy = http.createServer();
  secureProxy = https.createServer({ key: pems.private, cert: pems.cert });
  secureProxy.on("secureConnection", (socket) => proxyProtocols.push(socket.alpnProtocol || ""));
  tunnel(plainProxy);
  tunnel(secureProxy);
  await listen(plainProxy);
  await listen(secureProxy);
  socksProxy = createSocksProxy();
  await listen(socksProxy);
  process.env[flag] = "false";
  clearDispatcherCache();
});

test.after(async () => {
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  resetDbInstance();
  await Promise.all([...dispatchers].map((dispatcher) => dispatcher.destroy()));
  clearDispatcherCache();
  for (const session of sessions) session.destroy();
  for (const socket of sockets) socket.destroy();
  await Promise.all(
    [upstream, plainProxy, secureProxy, socksProxy]
      .filter(Boolean)
      .map((server) => new Promise<void>((resolve) => server.close(() => resolve())))
  );
  tls.setDefaultCACertificates(originalCa);
  if (originalFlag === undefined) delete process.env[flag];
  else process.env[flag] = originalFlag;
});

async function request(dispatcher: Dispatcher, size = 0): Promise<void> {
  dispatchers.add(dispatcher);
  const response = await fetch(upstreamUrl, {
    dispatcher,
    method: "POST",
    body: Buffer.alloc(size, "x"),
    signal: AbortSignal.timeout(10_000),
  });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { protocol: "1.1", bytes: size });
}

test("#15313: HTTP/1.1 is negotiated on direct, local-egress and retry paths", async () => {
  await request(getDefaultDispatcher(), 4 * 1024 * 1024);
  await request(getDefaultDispatcher("host.docker.internal"));
  await request(getRetryDispatcher());
  await request(getRetryDispatcher("host.docker.internal"));
});

test("HTTP and HTTPS proxies retain authentication and family pinning on initial and retry paths", async () => {
  for (const [scheme, server] of [
    ["http", plainProxy],
    ["https", secureProxy],
  ] as const) {
    const url = `${scheme}://test:password@127.0.0.1:${(server.address() as net.AddressInfo).port}?family=ipv4`;
    const dispatcher = createProxyDispatcher(url);
    await request(dispatcher, 4 * 1024 * 1024);
    await Promise.all(Array.from({ length: 5 }, () => request(dispatcher, 128 * 1024)));
    await request(getProxyRetryDispatcher(url));
  }
  assert.ok(proxyProtocols.length >= 2);
  assert.ok(proxyProtocols.every((protocol) => protocol === "http/1.1"));
});

test("relay pool and fresh-socket retry honor the startup opt-out", async () => {
  const { default: proxyFetch, runWithProxyContext } =
    await import("../../open-sse/utils/proxyFetch.ts");
  for (const retry of [false, true]) {
    let attempts = 0;
    const response = await runWithProxyContext(
      { type: "vercel", host: "relay.test", relayAuth: "test-only" },
      () =>
        proxyFetch(
          "https://upstream.test/upload",
          { method: "POST" },
          {
            undiciFetch: async (
              _input: unknown,
              init: RequestInit & { dispatcher: Dispatcher }
            ) => {
              dispatchers.add(init.dispatcher);
              if (retry && attempts++ === 0)
                throw Object.assign(new Error("test reset"), { code: "UND_ERR_SOCKET" });
              return fetch(upstreamUrl, { ...init, dispatcher: init.dispatcher });
            },
          }
        )
    );
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { protocol: "1.1", bytes: 0 });
    if (retry) assert.equal(attempts, 2);
  }
});

test("SOCKS5 initial and retry TLS connectors honor the opt-out", async () => {
  const url = `socks5://127.0.0.1:${(socksProxy.address() as net.AddressInfo).port}?family=ipv4`;
  await request(createProxyDispatcher(url));
  await request(getProxyRetryDispatcher(url));
});

test("default dispatchers still negotiate HTTP/2 when the flag is unset", async () => {
  delete process.env[flag];
  clearDispatcherCache();
  try {
    const proxyUrl = `http://test:password@127.0.0.1:${(plainProxy.address() as net.AddressInfo).port}`;
    for (const dispatcher of [getDefaultDispatcher(), createProxyDispatcher(proxyUrl)]) {
      dispatchers.add(dispatcher);
      const response = await fetch(upstreamUrl, { dispatcher, signal: AbortSignal.timeout(5000) });
      assert.deepEqual(await response.json(), { protocol: "2.0", bytes: 0 });
    }
  } finally {
    process.env[flag] = "false";
    clearDispatcherCache();
  }
});

test("opt-out does not disable TLS certificate validation", async () => {
  tls.setDefaultCACertificates(originalCa);
  clearDispatcherCache();
  try {
    for (const dispatcher of [
      getDefaultDispatcher(),
      createProxyDispatcher(
        `http://test:password@127.0.0.1:${(plainProxy.address() as net.AddressInfo).port}`
      ),
    ]) {
      dispatchers.add(dispatcher);
      await assert.rejects(
        fetch(upstreamUrl, { dispatcher, signal: AbortSignal.timeout(5000) }),
        (error: Error & { cause?: { code?: string } }) =>
          error.cause?.code === "DEPTH_ZERO_SELF_SIGNED_CERT"
      );
    }
  } finally {
    clearDispatcherCache();
  }
});
