import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import net from "node:net";
import { startHttpProxyServer } from "../../src/mitm/inspector/httpProxyServer.ts";
import { globalTrafficBuffer } from "../../src/mitm/inspector/buffer.ts";

async function withUpstream(
  handler: (req: http.IncomingMessage, res: http.ServerResponse) => void
): Promise<{ port: number; close: () => Promise<void> }> {
  const server = http.createServer(handler);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const addr = server.address();
  const port = typeof addr === "object" && addr ? addr.port : 0;
  return {
    port,
    close: () => new Promise<void>((res) => server.close(() => res())),
  };
}

async function withTcpServer(): Promise<{ port: number; close: () => Promise<void> }> {
  const server = net.createServer((socket) => {
    socket.on("data", () => {
      socket.end("ok");
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const addr = server.address();
  const port = typeof addr === "object" && addr ? addr.port : 0;
  return {
    port,
    close: () => new Promise<void>((res) => server.close(() => res())),
  };
}

function sendThroughProxy(
  proxyPort: number,
  upstreamPort: number,
  method = "GET"
): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: "127.0.0.1",
        port: proxyPort,
        method,
        path: `http://127.0.0.1:${upstreamPort}/test`,
        headers: { host: `127.0.0.1:${upstreamPort}` },
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () =>
          resolve({ status: res.statusCode ?? 0, body: Buffer.concat(chunks).toString("utf8") })
        );
      }
    );
    req.once("error", reject);
    req.end();
  });
}

function sendConnect(proxyPort: number, target: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const socket = net.connect(proxyPort, "127.0.0.1");
    socket.once("error", reject);
    socket.once("connect", () => {
      socket.write(`CONNECT ${target} HTTP/1.1\r\nHost: ${target}\r\n\r\n`);
    });
    socket.once("data", (chunk) => {
      const line = chunk.toString("utf8").split("\r\n")[0];
      const m = line.match(/HTTP\/1\.1\s+(\d+)/);
      socket.end();
      resolve(m ? Number(m[1]) : 0);
    });
  });
}

test("HTTP direct passes through and records buffer entry", async () => {
  globalTrafficBuffer.clear();
  const upstream = await withUpstream((_req, res) => {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("hello");
  });
  const proxy = await startHttpProxyServer(0);
  try {
    const sizeBefore = globalTrafficBuffer.size();
    const { status, body } = await sendThroughProxy(proxy.port, upstream.port);
    assert.equal(status, 200);
    assert.equal(body, "hello");
    // give buffer.update a tick (it runs inside async path)
    await new Promise((r) => setTimeout(r, 30));
    assert.ok(globalTrafficBuffer.size() > sizeBefore);
    const entry = globalTrafficBuffer.list().at(-1);
    assert.ok(entry);
    assert.equal(entry.source, "http-proxy");
    assert.equal(entry.method, "GET");
    assert.equal(entry.status, 200);
    assert.match(entry.responseBody ?? "", /hello/);
  } finally {
    await proxy.stop();
    await upstream.close();
  }
});

test("CONNECT tunnel returns 200 and records metadata-only entry", async () => {
  globalTrafficBuffer.clear();
  const tcp = await withTcpServer();
  const proxy = await startHttpProxyServer(0);
  try {
    const sizeBefore = globalTrafficBuffer.size();
    const status = await sendConnect(proxy.port, `127.0.0.1:${tcp.port}`);
    assert.equal(status, 200);
    await new Promise((r) => setTimeout(r, 30));
    assert.ok(globalTrafficBuffer.size() > sizeBefore);
    const entry = globalTrafficBuffer.list().at(-1);
    assert.ok(entry);
    assert.equal(entry.method, "CONNECT");
    assert.equal(entry.source, "http-proxy");
    assert.equal(entry.responseBody, null);
    assert.match(entry.note ?? "", /TLS tunnel/);
  } finally {
    await proxy.stop();
    await tcp.close();
  }
});

test("EADDRINUSE rejects with code", async () => {
  const first = await startHttpProxyServer(0);
  try {
    await assert.rejects(
      () => startHttpProxyServer(first.port),
      (err: NodeJS.ErrnoException) => {
        assert.ok(err);
        assert.equal(err.code, "EADDRINUSE");
        return true;
      }
    );
  } finally {
    await first.stop();
  }
});
