import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { createGuardProxy } from "../../docker/devin-bridge/network-guard/proxy.mjs";
import {
  parseConnectAuthority,
  parseTlsClientHelloSni,
} from "../../docker/devin-bridge/network-guard/policy.mjs";

function listen(server: net.Server | http.Server): Promise<number> {
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") return reject(new Error("missing port"));
      resolve(address.port);
    });
  });
}

function close(server: net.Server | http.Server): Promise<void> {
  return new Promise((resolve) => server.close(() => resolve()));
}

function uint24(value: number) {
  return Buffer.from([(value >> 16) & 0xff, (value >> 8) & 0xff, value & 0xff]);
}

function clientHello(serverName?: string) {
  const extensions: Buffer[] = [];
  if (serverName) {
    const name = Buffer.from(serverName, "ascii");
    const entry = Buffer.concat([
      Buffer.from([0]),
      Buffer.from([name.length >> 8, name.length]),
      name,
    ]);
    const list = Buffer.concat([Buffer.from([entry.length >> 8, entry.length]), entry]);
    extensions.push(Buffer.concat([Buffer.from([0, 0, 0, list.length]), list]));
  }
  const extensionBytes = Buffer.concat(extensions);
  const body = Buffer.concat([
    Buffer.from([3, 3]),
    Buffer.alloc(32, 1),
    Buffer.from([0]),
    Buffer.from([0, 2, 0x13, 0x01]),
    Buffer.from([1, 0]),
    Buffer.from([extensionBytes.length >> 8, extensionBytes.length]),
    extensionBytes,
  ]);
  const handshake = Buffer.concat([Buffer.from([1]), uint24(body.length), body]);
  return Buffer.concat([
    Buffer.from([22, 3, 1, handshake.length >> 8, handshake.length]),
    handshake,
  ]);
}

test("CONNECT authority is fixed to port 443 and ClientHello SNI is bounded", () => {
  assert.deepEqual(parseConnectAuthority("api.devin.ai:443"), {
    hostname: "api.devin.ai",
    port: 443,
  });
  assert.equal(parseConnectAuthority("api.devin.ai:80"), null);
  assert.equal(parseConnectAuthority("api.devin.ai"), null);

  const hello = clientHello("api.devin.ai");
  assert.equal(parseTlsClientHelloSni(hello.subarray(0, 8)).status, "need-more");
  assert.deepEqual(parseTlsClientHelloSni(hello), {
    status: "ok",
    serverName: "api.devin.ai",
  });
  assert.deepEqual(parseTlsClientHelloSni(clientHello()), {
    status: "invalid",
    reason: "missing_sni",
  });
  assert.equal(parseTlsClientHelloSni(Buffer.from("not tls")).status, "invalid");
});

test("HTTP proxy overwrites Host and strips proxy and hop-by-hop credentials", async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "devin-guard-http-"));
  const logPath = path.join(tmp, "audit.jsonl");
  fs.writeFileSync(logPath, "");
  let receivedHeaders: http.IncomingHttpHeaders = {};
  const upstream = http.createServer((req, res) => {
    receivedHeaders = req.headers;
    res.end("forwarded");
  });
  const upstreamPort = await listen(upstream);
  const proxy = createGuardProxy({ logPath, allowHostname: () => true });
  const proxyPort = await listen(proxy);
  try {
    const body = await new Promise<string>((resolve, reject) => {
      const req = http.request(
        {
          host: "127.0.0.1",
          port: proxyPort,
          path: `http://127.0.0.1:${upstreamPort}/proof`,
          headers: {
            host: "attacker.example",
            "proxy-authorization": "Basic forged",
            "proxy-connection": "keep-alive",
            connection: "keep-alive, x-remove",
            "x-remove": "forged",
          },
        },
        (res) => {
          let text = "";
          res.on("data", (chunk) => (text += chunk));
          res.on("end", () => resolve(text));
        }
      );
      req.on("error", reject);
      req.end();
    });
    assert.equal(body, "forwarded");
    assert.equal(receivedHeaders.host, `127.0.0.1:${upstreamPort}`);
    assert.equal(receivedHeaders["proxy-authorization"], undefined);
    assert.equal(receivedHeaders["proxy-connection"], undefined);
    assert.equal(receivedHeaders["x-remove"], undefined);
  } finally {
    await close(proxy);
    await close(upstream);
    fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("CONNECT rejects mismatched SNI before opening an upstream socket", async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "devin-guard-sni-"));
  const logPath = path.join(tmp, "audit.jsonl");
  fs.writeFileSync(logPath, "");
  let upstreamConnections = 0;
  const proxy = createGuardProxy({
    logPath,
    allowHostname: () => true,
    connectSocket: () => {
      upstreamConnections += 1;
      throw new Error("must not connect");
    },
  });
  const proxyPort = await listen(proxy);
  try {
    await new Promise<void>((resolve, reject) => {
      const socket = net.connect(proxyPort, "127.0.0.1", () => {
        socket.write("CONNECT api.devin.ai:443 HTTP/1.1\r\nHost: api.devin.ai:443\r\n\r\n");
      });
      let sentHello = false;
      socket.on("data", (chunk) => {
        if (!sentHello && chunk.toString("latin1").includes("200 Connection Established")) {
          sentHello = true;
          socket.write(clientHello("claude.ai"));
        }
      });
      socket.on("close", () => resolve());
      socket.on("error", reject);
      setTimeout(() => reject(new Error("CONNECT mismatch test timed out")), 2000).unref();
    });
    assert.equal(upstreamConnections, 0);
    assert.match(fs.readFileSync(logPath, "utf8"), /"reason":"sni_mismatch"/);
  } finally {
    await close(proxy);
    fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("CONNECT forwards only after matching SNI is validated", async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "devin-guard-sni-ok-"));
  const logPath = path.join(tmp, "audit.jsonl");
  fs.writeFileSync(logPath, "");
  let forwardedBytes = 0;
  const upstream = net.createServer((socket) => {
    socket.once("data", (chunk) => {
      forwardedBytes += chunk.length;
      socket.write("UPSTREAM_OK");
    });
  });
  const upstreamPort = await listen(upstream);
  const proxy = createGuardProxy({
    logPath,
    allowHostname: () => true,
    connectSocket: (_port, _hostname, onConnect) =>
      net.connect(upstreamPort, "127.0.0.1", onConnect),
  });
  const proxyPort = await listen(proxy);
  try {
    await new Promise<void>((resolve, reject) => {
      const socket = net.connect(proxyPort, "127.0.0.1", () => {
        socket.write("CONNECT api.devin.ai:443 HTTP/1.1\r\nHost: api.devin.ai:443\r\n\r\n");
      });
      let sentHello = false;
      socket.on("data", (chunk) => {
        const text = chunk.toString("latin1");
        if (!sentHello && text.includes("200 Connection Established")) {
          sentHello = true;
          socket.write(clientHello("api.devin.ai"));
          return;
        }
        if (text.includes("UPSTREAM_OK")) {
          socket.destroy();
          resolve();
        }
      });
      socket.on("error", reject);
      setTimeout(() => reject(new Error("CONNECT forwarding test timed out")), 2000).unref();
    });
    assert.ok(forwardedBytes > 0);
    assert.match(fs.readFileSync(logPath, "utf8"), /"reason":"sni_match"/);
  } finally {
    await close(proxy);
    await close(upstream);
    fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
