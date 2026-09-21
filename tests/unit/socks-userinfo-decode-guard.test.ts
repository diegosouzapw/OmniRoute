import { describe, it, before, after, afterEach } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import net from "node:net";
import { request } from "undici";
import { decodeUserinfo } from "../../src/shared/utils/decodeUserinfo.ts";
import {
  __getSocksOptionsForTest,
  clearDispatcherCache,
  createProxyDispatcher,
} from "../../open-sse/utils/proxyDispatcher.ts";
import { coerceProxyPayload } from "../../src/lib/db/proxies/mappers.ts";
import { parseSubscription } from "../../src/lib/proxySubscription/parse.ts";

// ── local fixtures ──────────────────────────────────────────────────────────

type Closeable = { port: number; close: () => Promise<void> };

function trackSockets(server: net.Server) {
  const sockets = new Set<net.Socket>();
  server.on("connection", (socket) => {
    sockets.add(socket);
    socket.on("close", () => sockets.delete(socket));
  });
  return () =>
    new Promise<void>((resolve) => {
      for (const socket of sockets) socket.destroy();
      server.close(() => resolve());
    });
}

function listen(server: net.Server): Promise<number> {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve((server.address() as net.AddressInfo).port));
  });
}

async function startTarget(): Promise<Closeable> {
  const server = http.createServer((_req, res) => {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("target-ok");
  });
  const close = trackSockets(server);
  return { port: await listen(server), close };
}

/** HTTP CONNECT proxy that records every Proxy-Authorization header it receives. */
async function startConnectProxy(seen: Array<string | undefined>): Promise<Closeable> {
  const server = http.createServer((_req, res) => {
    res.writeHead(405);
    res.end();
  });
  server.on("connect", (req, clientSocket: net.Socket, head: Buffer) => {
    seen.push(req.headers["proxy-authorization"]);
    const [host, port] = String(req.url).split(":");
    const upstream = net.connect(Number(port), host, () => {
      clientSocket.write("HTTP/1.1 200 Connection Established\r\n\r\n");
      if (head.length > 0) upstream.write(head);
      upstream.pipe(clientSocket);
      clientSocket.pipe(upstream);
    });
    upstream.on("error", () => clientSocket.destroy());
    clientSocket.on("error", () => upstream.destroy());
  });
  const close = trackSockets(server);
  return { port: await listen(server), close };
}

/** Minimal SOCKS5 server (RFC 1928 + RFC 1929 user/pass) that records the credentials. */
async function startSocks5Proxy(seen: Array<{ user: string; pass: string }>): Promise<Closeable> {
  const server = net.createServer((socket) => {
    let buffer = Buffer.alloc(0);
    let stage: "greeting" | "auth" | "request" | "piped" = "greeting";
    socket.on("error", () => socket.destroy());
    socket.on("data", (chunk: Buffer) => {
      if (stage === "piped") return;
      buffer = Buffer.concat([buffer, chunk]);
      if (stage === "greeting") {
        if (buffer.length < 2 || buffer.length < 2 + buffer[1]) return;
        buffer = buffer.subarray(2 + buffer[1]);
        socket.write(Buffer.from([0x05, 0x02])); // username/password
        stage = "auth";
      }
      if (stage === "auth") {
        if (buffer.length < 2) return;
        const ulen = buffer[1];
        if (buffer.length < 3 + ulen) return;
        const plen = buffer[2 + ulen];
        if (buffer.length < 3 + ulen + plen) return;
        seen.push({
          user: buffer.subarray(2, 2 + ulen).toString("utf8"),
          pass: buffer.subarray(3 + ulen, 3 + ulen + plen).toString("utf8"),
        });
        buffer = buffer.subarray(3 + ulen + plen);
        socket.write(Buffer.from([0x01, 0x00]));
        stage = "request";
      }
      if (stage === "request") {
        if (buffer.length < 5) return;
        const atyp = buffer[3];
        let host: string;
        let offset: number;
        if (atyp === 0x01) {
          if (buffer.length < 10) return;
          host = Array.from(buffer.subarray(4, 8)).join(".");
          offset = 8;
        } else if (atyp === 0x03) {
          const len = buffer[4];
          if (buffer.length < 7 + len) return;
          host = buffer.subarray(5, 5 + len).toString("utf8");
          offset = 5 + len;
        } else {
          socket.destroy();
          return;
        }
        const port = buffer.readUInt16BE(offset);
        const rest = buffer.subarray(offset + 2);
        stage = "piped";
        const upstream = net.connect(port, host, () => {
          socket.write(Buffer.from([0x05, 0x00, 0x00, 0x01, 0, 0, 0, 0, 0, 0]));
          if (rest.length > 0) upstream.write(rest);
          upstream.pipe(socket);
          socket.pipe(upstream);
        });
        upstream.on("error", () => socket.destroy());
      }
    });
  });
  const close = trackSockets(server);
  return { port: await listen(server), close };
}

function basic(user: string, pass: string) {
  return `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}`;
}

async function fetchThrough(proxyUrl: string, targetPort: number) {
  const dispatcher = createProxyDispatcher(proxyUrl);
  const response = await request(`http://127.0.0.1:${targetPort}/`, { dispatcher });
  const text = await response.body.text();
  return { status: response.statusCode, text };
}

// ── decodeUserinfo ──────────────────────────────────────────────────────────

describe("decodeUserinfo", () => {
  it("decodes correctly encoded values as before", () => {
    assert.equal(decodeUserinfo("user%40name"), "user@name");
    assert.equal(decodeUserinfo("p%3Ass"), "p:ss");
  });

  it("falls back to the raw value when the value holds a literal percent", () => {
    assert.equal(decodeUserinfo("user%name"), "user%name");
    assert.equal(decodeUserinfo("pa%ss"), "pa%ss");
    assert.equal(decodeUserinfo("100%"), "100%");
  });
});

// ── real dispatchers against local proxies ──────────────────────────────────

describe("HTTP proxy dispatcher credentials (real ProxyAgent + local CONNECT proxy)", () => {
  const seen: Array<string | undefined> = [];
  let target: Closeable;
  let proxy: Closeable;

  before(async () => {
    target = await startTarget();
    proxy = await startConnectProxy(seen);
  });
  afterEach(() => {
    seen.length = 0;
    clearDispatcherCache();
  });
  after(async () => {
    clearDispatcherCache();
    await proxy.close();
    await target.close();
  });

  it("a literal percent in the password reaches the proxy verbatim", async () => {
    const result = await fetchThrough(`http://user:pa%ss@127.0.0.1:${proxy.port}`, target.port);
    assert.deepEqual(result, { status: 200, text: "target-ok" });
    assert.deepEqual(seen, [basic("user", "pa%ss")]);
  });

  it("a literal percent in the username reaches the proxy verbatim", async () => {
    const result = await fetchThrough(`http://us%er:secret@127.0.0.1:${proxy.port}`, target.port);
    assert.equal(result.status, 200);
    assert.deepEqual(seen, [basic("us%er", "secret")]);
  });

  it("correctly encoded credentials are decoded exactly as undici did before", async () => {
    const result = await fetchThrough(
      `http://user%40corp:p%3Ass@127.0.0.1:${proxy.port}`,
      target.port
    );
    assert.equal(result.status, 200);
    assert.deepEqual(seen, [basic("user@corp", "p:ss")]);
  });

  it("username without password keeps undici's `user:` shape", async () => {
    const result = await fetchThrough(`http://onlyuser@127.0.0.1:${proxy.port}`, target.port);
    assert.equal(result.status, 200);
    assert.deepEqual(seen, [basic("onlyuser", "")]);
  });

  it("no userinfo sends no Proxy-Authorization header", async () => {
    const result = await fetchThrough(`http://127.0.0.1:${proxy.port}`, target.port);
    assert.equal(result.status, 200);
    assert.deepEqual(seen, [undefined]);
  });
});

describe("SOCKS5 proxy dispatcher credentials (real socks dispatcher + local SOCKS5 server)", () => {
  const seen: Array<{ user: string; pass: string }> = [];
  let target: Closeable;
  let proxy: Closeable;

  before(async () => {
    target = await startTarget();
    proxy = await startSocks5Proxy(seen);
  });
  afterEach(() => {
    seen.length = 0;
    clearDispatcherCache();
  });
  after(async () => {
    clearDispatcherCache();
    await proxy.close();
    await target.close();
  });

  it("a literal percent in SOCKS5 credentials reaches the proxy verbatim", async () => {
    const result = await fetchThrough(
      `socks5://user%name:pa%ss@127.0.0.1:${proxy.port}`,
      target.port
    );
    assert.deepEqual(result, { status: 200, text: "target-ok" });
    assert.deepEqual(seen, [{ user: "user%name", pass: "pa%ss" }]);
  });

  it("correctly encoded SOCKS5 credentials are decoded as before", async () => {
    const result = await fetchThrough(
      `socks5://user%40corp:p%3Ass@127.0.0.1:${proxy.port}`,
      target.port
    );
    assert.equal(result.status, 200);
    assert.deepEqual(seen, [{ user: "user@corp", pass: "p:ss" }]);
  });

  it("the test accessor mirrors the dispatcher", () => {
    const opts = __getSocksOptionsForTest("socks5://user%name:pa%ss@host:1080");
    assert.equal(opts.userId, "user%name");
    assert.equal(opts.password, "pa%ss");
  });
});

// ── other userinfo parse sites ──────────────────────────────────────────────

describe("other proxy URL parse sites keep a literal percent", () => {
  it("coerceProxyPayload (proxy registry mapper)", () => {
    const payload = coerceProxyPayload("http://user:pa%ss@proxy.local:3128", "legacy");
    assert.ok(payload, "a literal percent must not drop the whole proxy entry");
    assert.equal(payload.username, "user");
    assert.equal(payload.password, "pa%ss");
    const encoded = coerceProxyPayload("http://user%40corp:p%3Ass@proxy.local:3128", "legacy");
    assert.equal(encoded?.username, "user@corp");
    assert.equal(encoded?.password, "p:ss");
  });

  it("parseSubscription (proxy subscription URI list)", () => {
    const parsed = parseSubscription(
      ["http://user:pa%ss@proxy-a.example:3128#a", "socks5://us%er:x@proxy-b.example:1080#b"].join(
        "\n"
      )
    );
    const byName = Object.fromEntries(parsed.nodes.map((node) => [node.name, node]));
    assert.equal(byName.a?.password, "pa%ss");
    assert.equal(byName.b?.username, "us%er");
  });
});
