/**
 * The Cursor executor talks raw HTTP/2 (`http2.connect`), which is invisible to
 * both the undici proxy dispatcher and the global fetch proxy patch. So a
 * provider proxy configured in the dashboard (or HTTPS_PROXY in the
 * environment) was silently ignored and every Cursor request went out on the
 * host's own IP.
 *
 * These tests pin the tunnel helpers that make `openH2` proxy-aware:
 *   - the CONNECT request shape (incl. Proxy-Authorization),
 *   - CONNECT response parsing (success / failure / not-yet-complete),
 *   - end-to-end TCP tunnelling through a real local CONNECT proxy,
 *   - and that proxy resolution honours the request proxy context.
 */
import assert from "node:assert/strict";
import net from "node:net";
import test from "node:test";

import {
  buildConnectRequest,
  parseConnectResponse,
  createProxyTunnelSocket,
  isSocksProxyProtocol,
  resolveCursorH2ProxyUrl,
} from "../../open-sse/executors/cursor/h2ProxyConnect.ts";
import { runWithProxyContext } from "../../open-sse/utils/proxyFetch.ts";

test("buildConnectRequest targets host:port and omits auth when the proxy has no credentials", () => {
  const request = buildConnectRequest("api5.cursor.sh", 443, new URL("http://127.0.0.1:2080/"));
  const text = request.toString("utf8");

  assert.match(text, /^CONNECT api5\.cursor\.sh:443 HTTP\/1\.1\r\n/);
  assert.match(text, /\r\nHost: api5\.cursor\.sh:443\r\n/);
  assert.equal(text.includes("Proxy-Authorization"), false);
  assert.ok(text.endsWith("\r\n\r\n"), "request must terminate with a blank line");
});

test("buildConnectRequest sends Basic Proxy-Authorization when the proxy URL carries credentials", () => {
  const request = buildConnectRequest(
    "api5.cursor.sh",
    443,
    new URL("http://user%40x:p%3Ass@127.0.0.1:2080/")
  );
  const text = request.toString("utf8");
  const expected = Buffer.from("user@x:p:ss", "utf8").toString("base64");

  assert.match(text, new RegExp(`\\r\\nProxy-Authorization: Basic ${expected}\\r\\n`));
});

test("parseConnectResponse reports pending until the header block is complete", () => {
  assert.equal(parseConnectResponse(Buffer.from("HTTP/1.1 200 Conn")), null);
  assert.equal(parseConnectResponse(Buffer.from("HTTP/1.1 200 OK\r\n")), null);
});

test("parseConnectResponse extracts the status and the end of the header block", () => {
  const raw = Buffer.from("HTTP/1.1 200 Connection established\r\nX: y\r\n\r\nLEFTOVER");
  const parsed = parseConnectResponse(raw);

  assert.ok(parsed);
  assert.equal(parsed.status, 200);
  assert.equal(raw.subarray(parsed.headerEnd).toString("utf8"), "LEFTOVER");
});

test("parseConnectResponse surfaces a refusing proxy status such as 407", () => {
  const parsed = parseConnectResponse(
    Buffer.from("HTTP/1.1 407 Proxy Authentication Required\r\n\r\n")
  );
  assert.equal(parsed?.status, 407);
});

test("resolveCursorH2ProxyUrl returns null without a proxy and the context proxy with one", async () => {
  const target = "https://api5.cursor.sh/agent.v1.AgentService/Run";
  const previous = {
    HTTPS_PROXY: process.env.HTTPS_PROXY,
    HTTP_PROXY: process.env.HTTP_PROXY,
    ALL_PROXY: process.env.ALL_PROXY,
    https_proxy: process.env.https_proxy,
    http_proxy: process.env.http_proxy,
    all_proxy: process.env.all_proxy,
  };
  for (const key of Object.keys(previous)) delete process.env[key];

  try {
    assert.equal(resolveCursorH2ProxyUrl(target), null, "no proxy configured -> direct");

    const viaContext = await runWithProxyContext(
      { protocol: "http", host: "127.0.0.1", port: 2080 },
      async () => resolveCursorH2ProxyUrl(target)
    );
    assert.equal(viaContext, "http://127.0.0.1:2080");
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value !== undefined) process.env[key] = value;
    }
  }
});

test("createProxyTunnelSocket tunnels TCP through a real CONNECT proxy", async () => {
  // Target: an echo server standing in for the Cursor agent host.
  const echo = net.createServer((socket) => socket.pipe(socket));
  await new Promise<void>((resolve) => echo.listen(0, "127.0.0.1", resolve));
  const echoPort = (echo.address() as net.AddressInfo).port;

  // A minimal CONNECT proxy: accepts the tunnel, then splices both directions.
  const seenRequests: string[] = [];
  const proxy = net.createServer((client) => {
    client.once("data", (chunk) => {
      seenRequests.push(chunk.toString("utf8"));
      const upstream = net.connect(echoPort, "127.0.0.1", () => {
        client.write("HTTP/1.1 200 Connection established\r\n\r\n");
        client.pipe(upstream);
        upstream.pipe(client);
      });
      upstream.on("error", () => client.destroy());
    });
    client.on("error", () => {});
  });
  await new Promise<void>((resolve) => proxy.listen(0, "127.0.0.1", resolve));
  const proxyPort = (proxy.address() as net.AddressInfo).port;

  try {
    const socket = await createProxyTunnelSocket({
      targetHost: "api5.cursor.sh",
      targetPort: 443,
      proxyUrl: `http://127.0.0.1:${proxyPort}`,
      timeoutMs: 5_000,
    });

    const echoed = await new Promise<string>((resolve, reject) => {
      socket.once("data", (chunk) => resolve(chunk.toString("utf8")));
      socket.once("error", reject);
      socket.write("ping-through-tunnel");
    });

    assert.equal(echoed, "ping-through-tunnel");
    assert.equal(seenRequests.length, 1);
    assert.match(seenRequests[0], /^CONNECT api5\.cursor\.sh:443 HTTP\/1\.1\r\n/);
    socket.destroy();
  } finally {
    await new Promise<void>((resolve) => proxy.close(() => resolve()));
    await new Promise<void>((resolve) => echo.close(() => resolve()));
  }
});

test("createProxyTunnelSocket rejects when the proxy refuses the tunnel", async () => {
  const proxy = net.createServer((client) => {
    client.once("data", () => {
      client.write("HTTP/1.1 407 Proxy Authentication Required\r\n\r\n");
      client.end();
    });
    client.on("error", () => {});
  });
  await new Promise<void>((resolve) => proxy.listen(0, "127.0.0.1", resolve));
  const proxyPort = (proxy.address() as net.AddressInfo).port;

  try {
    await assert.rejects(
      createProxyTunnelSocket({
        targetHost: "api5.cursor.sh",
        targetPort: 443,
        proxyUrl: `http://127.0.0.1:${proxyPort}`,
        timeoutMs: 5_000,
      }),
      /407/
    );
  } finally {
    await new Promise<void>((resolve) => proxy.close(() => resolve()));
  }
});

test("isSocksProxyProtocol recognises every SOCKS spelling the proxy settings accept", () => {
  for (const protocol of ["socks:", "socks4:", "socks4a:", "socks5:", "socks5h:"]) {
    assert.equal(isSocksProxyProtocol(protocol), true, `${protocol} must take the SOCKS path`);
  }
  for (const protocol of ["http:", "https:"]) {
    assert.equal(isSocksProxyProtocol(protocol), false, `${protocol} must take the CONNECT path`);
  }
});

/**
 * An `https://` proxy expects TLS before the CONNECT request. Writing the
 * CONNECT in cleartext makes the proxy drop the connection — and would put
 * Proxy-Authorization on the wire unencrypted.
 */
test("an https:// proxy receives a TLS ClientHello before any CONNECT bytes", async () => {
  let firstBytes: Buffer | null = null;
  const proxy = net.createServer((client) => {
    client.once("data", (chunk) => {
      firstBytes = chunk;
      client.destroy();
    });
    client.on("error", () => {});
  });
  await new Promise<void>((resolve) => proxy.listen(0, "127.0.0.1", resolve));
  const proxyPort = (proxy.address() as net.AddressInfo).port;

  try {
    await assert.rejects(
      createProxyTunnelSocket({
        targetHost: "api5.cursor.sh",
        targetPort: 443,
        proxyUrl: `https://127.0.0.1:${proxyPort}`,
        timeoutMs: 5_000,
      })
    );
    assert.ok(firstBytes, "the proxy must have received something");
    assert.equal(
      (firstBytes as Buffer)[0],
      0x16,
      "first byte must be a TLS handshake record (0x16), not the ASCII 'C' of CONNECT"
    );
  } finally {
    await new Promise<void>((resolve) => proxy.close(() => resolve()));
  }
});
