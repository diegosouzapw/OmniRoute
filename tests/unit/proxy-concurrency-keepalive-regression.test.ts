import test from "node:test";
import assert from "node:assert/strict";
import net from "node:net";

import proxyFetch, {
  runWithProxyContext,
  __getRelayPoolAgentOptionsForTest,
} from "../../open-sse/utils/proxyFetch.ts";
import { clearDispatcherCache } from "../../open-sse/utils/proxyDispatcher.ts";
import { invalidateProxyHealth, isProxyReachable } from "../../src/lib/proxyHealth.ts";

// #9100 — proxy concurrency regression.
//
// Root cause: the proxy dispatcher forced keepAliveTimeout: 1 (1ms), destroying
// the pooled socket right after every response. Each request then paid a fresh
// TCP+TLS+CONNECT handshake, and a proxy that throttles connection churn
// serialized 5 concurrent requests behind ~30s stalls (1 fast + 4× ~29.5s).
// The fix restores keep-alive on the proxy path (default 30s keepAliveTimeout,
// keepAliveMaxTimeout 60s) so concurrent requests multiplex over ONE reused TCP
// connection per proxy host.
//
// This test proves the fix hermetically (loopback only, no real network):
//   1. 5 concurrent requests through a mocked HTTP proxy all resolve, and the
//      counting TCP listener saw exactly ONE connection to the proxy host
//      (keep-alive reuse — with the old 1ms TTL each queued request would have
//      opened a fresh socket, i.e. 5 connections).
//   2. 5 concurrent requests through a mocked Vercel-relay proxy all resolve
//      and all 5 share the SAME pooled dispatcher (one pool per relay host).
async function withEnv(overrides: Record<string, string | undefined>, fn: () => Promise<void>) {
  const previous = new Map<string, string | undefined>();
  for (const [key, value] of Object.entries(overrides)) {
    previous.set(key, process.env[key]);
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    await fn();
  } finally {
    for (const [key, value] of previous.entries()) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

/** Minimal HTTP-proxy TCP listener: CONNECT tunnel + short SSE upstream, keeps
 * the socket alive so keep-alive reuse can be observed. Counts TCP connections. */
function startCountingProxyServer(): Promise<{
  port: number;
  connectionCount: () => number;
  close: () => Promise<void>;
}> {
  let connectionCount = 0;
  const server = net.createServer((socket) => {
    connectionCount += 1;
    let buffer = Buffer.alloc(0);
    let tunnelEstablished = false;
    socket.on("data", (chunk: Buffer) => {
      buffer = Buffer.concat([buffer, chunk]);
      while (true) {
        const headerEnd = buffer.indexOf("\r\n\r\n");
        if (headerEnd === -1) break;
        const head = buffer.subarray(0, headerEnd).toString("latin1");
        buffer = buffer.subarray(headerEnd + 4);
        if (!tunnelEstablished && head.startsWith("CONNECT ")) {
          socket.write("HTTP/1.1 200 Connection Established\r\n\r\n");
          tunnelEstablished = true;
          continue;
        }
        // Short SSE upstream; keep-alive preserved so the next request reuses
        // this socket (the whole point of the #9100 fix).
        const body = 'data: {"ok":true}\n\n';
        socket.write(
          "HTTP/1.1 200 OK\r\nContent-Type: text/event-stream\r\nContent-Length: " +
            Buffer.byteLength(body) +
            "\r\nConnection: keep-alive\r\n\r\n" +
            body
        );
      }
    });
    socket.on("error", () => {});
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address() as net.AddressInfo;
      resolve({
        port: address.port,
        connectionCount: () => connectionCount,
        close: () =>
          new Promise<void>((res) => {
            server.close(() => res());
          }),
      });
    });
  });
}

test.afterEach(() => {
  clearDispatcherCache();
});

test("#9100: 5 concurrent requests through a mocked HTTP proxy all resolve over ONE reused TCP connection", async () => {
  const proxy = await startCountingProxyServer();
  try {
    const proxyUrl = `http://127.0.0.1:${proxy.port}`;
    // Warm the health cache BEFORE counting: the T14 probe (isProxyReachable)
    // would otherwise open its own throwaway socket during the burst and pollute
    // the connection count. With a healthy cached entry the burst reuses it.
    invalidateProxyHealth(proxyUrl);
    assert.equal(await isProxyReachable(proxyUrl, 120, 2_000), true);
    const before = proxy.connectionCount();

    // connections: 1 forces undici to QUEUE the 5 concurrent requests on a
    // single pooled socket instead of fanning out one socket per request.
    // With the old keepAliveTimeout: 1 the socket died after the first response
    // and each queued request opened a fresh connection (count would be 5);
    // with keep-alive restored all 5 reuse the same socket (count stays 1).
    await withEnv({ OMNIROUTE_PROXY_DISPATCHER_CONNECTIONS: "1" }, async () => {
      clearDispatcherCache();
      const results = await Promise.all(
        Array.from({ length: 5 }, (_, i) =>
          runWithProxyContext({ type: "http", host: "127.0.0.1", port: String(proxy.port) }, () =>
            proxyFetch(`http://proxy-target.invalid/v1/chat/completions?i=${i}`, {
              signal: AbortSignal.timeout(10_000),
            })
          ).then((r) => r.text())
        )
      );

      for (const body of results) {
        assert.ok(body.includes('"ok":true'), `expected SSE payload, got: ${body}`);
      }
    });

    assert.equal(
      proxy.connectionCount() - before,
      1,
      "5 concurrent proxied requests must reuse exactly ONE TCP connection to the proxy host"
    );

    // Release the pooled keep-alive sockets BEFORE closing the listener —
    // otherwise server.close() waits ~keepAliveTimeout (30s) for them to idle out.
    clearDispatcherCache();
  } finally {
    await proxy.close();
  }
});

test("#9100: 5 concurrent requests through a mocked Vercel-relay proxy all resolve via ONE shared pooled dispatcher", async () => {
  const relayCalls: Array<{ input: unknown; init: RequestInit & { dispatcher?: unknown } }> = [];
  const relaySink = (async (input: unknown, init: RequestInit = {}) => {
    relayCalls.push({ input, init });
    // Short SSE upstream, mirroring what the edge relay would return.
    return new Response('data: {"ok":true}\n\n', {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  }) as never;

  const VERCEL_CTX = {
    type: "vercel" as const,
    host: "omniroute-relay-abc123.vercel.app",
    relayAuth: "live-relay-secret",
  };

  const results = await Promise.all(
    Array.from({ length: 5 }, (_, i) =>
      runWithProxyContext(VERCEL_CTX, () =>
        proxyFetch(
          `https://api.anthropic.com/v1/messages?x=${i}`,
          { method: "POST", headers: { "x-existing": "keep-me" } },
          { undiciFetch: relaySink }
        )
      ).then((r) => r.text())
    )
  );

  for (const body of results) {
    assert.ok(body.includes('"ok":true'), `expected SSE payload, got: ${body}`);
  }
  assert.equal(relayCalls.length, 5, "all 5 requests must reach the relay");
  const dispatchers = new Set(relayCalls.map((c) => c.init.dispatcher));
  assert.equal(
    dispatchers.size,
    1,
    "all 5 relay requests must share the SAME pooled dispatcher (one TCP connection per relay host)"
  );
  // #9158: the relay Agent pools FOUR connections per host and multiplexes
  // concurrent requests over them (h2). Pooling 4 sockets removes the
  // head-of-line blocking a single connection caused for parallel SSE streams,
  // while `allowH2: true` keeps queued requests running in parallel as h2
  // streams across the pool.
  const relayAgentOptions = __getRelayPoolAgentOptionsForTest();
  assert.equal(relayAgentOptions.connections, 4, "relay agent must pool four connections per host");
  assert.equal(
    relayAgentOptions.allowH2,
    true,
    "relay agent must multiplex concurrent requests over h2"
  );
});
