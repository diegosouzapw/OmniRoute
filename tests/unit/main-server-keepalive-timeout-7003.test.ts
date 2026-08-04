import { describe, it } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import net from "node:net";
import { getMainServerTimeoutConfig } from "../../src/shared/utils/runtimeTimeouts.ts";

// #7003 — JetBrains AI Assistant ("Test Connection" / completions) reported
// "HTTP/1.1 header parser received no bytes". The main OmniRoute server
// (scripts/dev/run-next.mjs) boots a bare `http.createServer(...)` and never
// configures `keepAliveTimeout`/`headersTimeout`, leaving Node's http.Server
// default of keepAliveTimeout=5_000ms with no `Keep-Alive: timeout=N` response
// hint. JetBrains AI Assistant's JVM `java.net.http.HttpClient` connection pool
// can reuse a socket idle for longer than that window; the server has already
// torn the socket down, so the client gets 0 response bytes back instead of a
// fresh HTTP response.
//
// This spec proves both halves:
//   1. `getMainServerTimeoutConfig()` raises the defaults well above Node's
//      unconfigured 5_000ms window (the actual fix wired into run-next.mjs).
//   2. A bare http.Server left at Node's defaults drops a socket reused after
//      an idle gap past 5s, while the same server configured via
//      `getMainServerTimeoutConfig()` keeps serving the reused connection.

describe("#7003 getMainServerTimeoutConfig", () => {
  it("defaults keepAliveTimeout/headersTimeout well above Node's 5_000ms default", () => {
    const config = getMainServerTimeoutConfig({});
    assert.equal(config.keepAliveTimeoutMs, 65_000);
    assert.equal(config.headersTimeoutMs, 66_000);
    assert.ok(config.keepAliveTimeoutMs > 5_000, "must exceed Node's unconfigured default");
    assert.ok(
      config.headersTimeoutMs > config.keepAliveTimeoutMs,
      "headersTimeout must stay above keepAliveTimeout per Node's own requirement"
    );
  });

  it("honors env overrides and keeps headersTimeout coherent with a raised keepAliveTimeout", () => {
    const config = getMainServerTimeoutConfig({
      MAIN_SERVER_KEEPALIVE_TIMEOUT_MS: "120000",
      MAIN_SERVER_HEADERS_TIMEOUT_MS: "121000",
    });
    assert.equal(config.keepAliveTimeoutMs, 120_000);
    assert.equal(config.headersTimeoutMs, 121_000);
  });

  it("bumps an inconsistent explicit headersTimeout override above keepAliveTimeout", () => {
    const config = getMainServerTimeoutConfig({
      MAIN_SERVER_KEEPALIVE_TIMEOUT_MS: "120000",
      MAIN_SERVER_HEADERS_TIMEOUT_MS: "1000",
    });
    assert.equal(config.keepAliveTimeoutMs, 120_000);
    assert.equal(config.headersTimeoutMs, 121_000);
  });

  it("falls back to defaults on invalid env values", () => {
    const config = getMainServerTimeoutConfig({
      MAIN_SERVER_KEEPALIVE_TIMEOUT_MS: "not-a-number",
    });
    assert.equal(config.keepAliveTimeoutMs, 65_000);
  });
});

/**
 * Sends a raw HTTP/1.1 GET over an already-connected keep-alive socket and
 * resolves with whatever bytes arrive within a short settle window (empty
 * string if nothing comes back — the exact "0 bytes back" failure mode
 * JetBrains AI Assistant surfaces as "header parser received no bytes").
 *
 * The socket is opened with `allowHalfOpen: true` so it faithfully mimics a
 * JVM/OkHttp-style client: Node's default `allowHalfOpen: false` proactively
 * ends the writable side the instant it processes an incoming FIN, turning
 * the reused write into a synchronous "socket has been ended" error instead
 * of the real-world race — a write that is accepted locally (the server
 * already destroyed the connection, so it never arrives) whose response
 * settles as 0 bytes.
 */
function sendKeepAliveRequest(socket: net.Socket, port: number): Promise<string> {
  return new Promise((resolve) => {
    let received = "";
    let settleTimer: NodeJS.Timeout;
    const finish = () => {
      socket.off("data", onData);
      clearTimeout(settleTimer);
      resolve(received);
    };
    // A short settle window once the full chunked response has arrived (fast
    // path); a generous cap in case nothing ever comes back — the torn-down
    // connection case this test proves, and a safety margin against first-run
    // JIT/module-load jitter under the test runner.
    const onData = (chunk: Buffer) => {
      received += chunk.toString("utf8");
      if (received.endsWith("0\r\n\r\n")) {
        clearTimeout(settleTimer);
        settleTimer = setTimeout(finish, 50);
      }
    };
    socket.on("data", onData);
    socket.write(`GET / HTTP/1.1\r\nHost: 127.0.0.1:${port}\r\nConnection: keep-alive\r\n\r\n`);
    settleTimer = setTimeout(finish, 3_000);
  });
}

function startEchoServer(configure: (server: http.Server) => void): Promise<http.Server> {
  return new Promise((resolve) => {
    const server = http.createServer((_req, res) => {
      res.writeHead(200, { "content-type": "text/plain" });
      res.end("ok");
    });
    configure(server);
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

async function withServer(
  configure: (server: http.Server) => void,
  run: (port: number) => Promise<void>
): Promise<void> {
  const server = await startEchoServer(configure);
  try {
    const address = server.address();
    if (typeof address !== "object" || address === null) {
      throw new Error("expected server to bind a TCP address");
    }
    await run(address.port);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

// Node's default keepAliveTimeout is 5_000ms, but the server only starts that
// timer once the response has fully flushed and there is a small amount of
// internal scheduling overhead before the socket is actually torn down —
// empirically ~5.8-6s end-to-end on loopback. 6.5s reliably clears that
// window without relying on a hair-trigger race.
const IDLE_GAP_MS = 6_500;

describe("#7003 keep-alive socket reuse across an idle gap", () => {
  it(
    "current Node defaults (keepAliveTimeout=5000ms): a pooled socket reused after 6.5s idle gets 0 bytes back",
    { timeout: 30_000 },
    async () => {
      await withServer(
        () => {
          /* leave Node's http.Server defaults untouched (keepAliveTimeout=5000ms) */
        },
        async (port) => {
          const socket = net.connect({ port, host: "127.0.0.1", allowHalfOpen: true });
          await new Promise<void>((resolve, reject) => {
            socket.once("connect", () => resolve());
            socket.once("error", reject);
          });

          const first = await sendKeepAliveRequest(socket, port);
          assert.match(first, /200/, "first request on a fresh socket must succeed");

          await new Promise((resolve) => setTimeout(resolve, IDLE_GAP_MS));

          const second = await sendKeepAliveRequest(socket, port);
          assert.equal(
            second,
            "",
            "reusing the idle-torn-down socket must get exactly 0 bytes back (the reported bug)"
          );
          socket.destroy();
        }
      );
    }
  );

  it(
    "fixed config (getMainServerTimeoutConfig): the same reused connection stays alive past 6.5s idle",
    { timeout: 30_000 },
    async () => {
      const fixedTimeouts = getMainServerTimeoutConfig({});
      await withServer(
        (server) => {
          server.keepAliveTimeout = fixedTimeouts.keepAliveTimeoutMs;
          server.headersTimeout = fixedTimeouts.headersTimeoutMs;
        },
        async (port) => {
          const socket = net.connect({ port, host: "127.0.0.1", allowHalfOpen: true });
          await new Promise<void>((resolve, reject) => {
            socket.once("connect", () => resolve());
            socket.once("error", reject);
          });

          const first = await sendKeepAliveRequest(socket, port);
          assert.match(first, /200/, "first request on a fresh socket must succeed");

          await new Promise((resolve) => setTimeout(resolve, IDLE_GAP_MS));

          const second = await sendKeepAliveRequest(socket, port);
          assert.match(
            second,
            /200/,
            "the reused connection must still get a valid response after the fix"
          );
          socket.destroy();
        }
      );
    }
  );
});
