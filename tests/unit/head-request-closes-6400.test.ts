import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { EventEmitter } from "node:events";
import { createRequire } from "node:module";
import type { AddressInfo } from "node:net";

const require = createRequire(import.meta.url);
const headResponseGuard = require("../../scripts/dev/head-response-guard.cjs") as {
  wrapRequestListenerWithHeadResponseGuard: (
    listener: (req: http.IncomingMessage, res: http.ServerResponse) => unknown
  ) => (req: http.IncomingMessage, res: http.ServerResponse) => unknown;
  suppressBodyAndForceClose: (res: http.ServerResponse) => void;
};

const { wrapRequestListenerWithHeadResponseGuard, suppressBodyAndForceClose } = headResponseGuard;

/**
 * Regression test for issue #6400 — "HEAD requests hang ~6s — response never
 * closes after headers", reported across EVERY route (valid, unknown, authed,
 * unauthed).
 *
 * Root cause: Next.js 16's App Router route-handler pipeline
 * (`next/dist/server/send-response.js`) correctly skips piping a `Response`
 * body for HEAD requests, but its *page*-rendering pipeline
 * (`next/dist/server/pipe-readable.js` -> `pipeToNodeResponse`, used for every
 * app-router page/layout render — including the `not-found` boundary that
 * unmatched paths fall through to) has NO such check: it always streams the
 * full rendered body to the HTTP response regardless of method. Combined with
 * Node's default keep-alive framing this leaves clients (observed on
 * Windows/curl) unsure whether the — implicitly bodyless — HEAD response has
 * actually finished.
 *
 * Fix: `scripts/dev/head-response-guard.cjs` wraps the Node request listener
 * (wired into both the dev/start custom server `scripts/dev/run-next.mjs` and
 * the packaged standalone server `scripts/dev/standalone-server-ws.mjs`) so
 * that, for every inbound HEAD request, any body bytes the inner handler
 * tries to write are discarded (never blocking on backpressure) and the
 * connection is force-closed (`Connection: close`) as soon as `.end()` is
 * called — independent of route existence or auth state.
 */
describe("issue #6400 — HEAD response guard (unit)", () => {
  function makeMockResponse() {
    const emitter = new EventEmitter() as EventEmitter & {
      headers: Record<string, string>;
      ended: boolean;
      writeCalls: unknown[][];
      endCalls: unknown[][];
      write: (...args: unknown[]) => boolean;
      end: (...args: unknown[]) => unknown;
      setHeader: (name: string, value: string) => void;
    };
    emitter.headers = {};
    emitter.ended = false;
    emitter.writeCalls = [];
    emitter.endCalls = [];
    emitter.setHeader = (name: string, value: string) => {
      emitter.headers[name.toLowerCase()] = value;
    };
    emitter.write = (...args: unknown[]) => {
      emitter.writeCalls.push(args);
      return true;
    };
    emitter.end = (...args: unknown[]) => {
      emitter.endCalls.push(args);
      emitter.ended = true;
      return emitter;
    };
    return emitter;
  }

  it("sets Connection: close on the response", () => {
    const res = makeMockResponse();
    suppressBodyAndForceClose(res as unknown as http.ServerResponse);
    assert.equal(res.headers.connection, "close");
  });

  it("discards any body written via res.write() but still reports success (no backpressure stall)", () => {
    const res = makeMockResponse();
    const originalWrite = res.write;
    suppressBodyAndForceClose(res as unknown as http.ServerResponse);

    const ok = res.write("this body must never reach the socket");
    assert.equal(ok, true, "write must report success so callers never block on a drain event");
    assert.equal(
      res.writeCalls.length,
      0,
      "the original write() must never be called — the body must be fully discarded"
    );
    assert.notEqual(res.write, originalWrite);
  });

  it("res.end() forwards to the original end with NO body argument, and is idempotent", () => {
    const res = makeMockResponse();
    suppressBodyAndForceClose(res as unknown as http.ServerResponse);

    res.end("<html>this must be dropped</html>");
    res.end("second call must be a no-op");

    assert.equal(res.endCalls.length, 1, "end() must only forward to the original once");
    assert.deepEqual(
      res.endCalls[0],
      [],
      "the discarded body must never be forwarded to the real end()"
    );
    assert.equal(res.ended, true);
  });

  it("wrapRequestListenerWithHeadResponseGuard only guards HEAD requests, GET/POST pass through untouched", () => {
    let receivedReq: { method?: string } | null = null;
    let receivedRes: unknown = null;
    const listener = (req: { method?: string }, res: unknown) => {
      receivedReq = req;
      receivedRes = res;
    };
    const guarded = wrapRequestListenerWithHeadResponseGuard(
      listener as unknown as (req: http.IncomingMessage, res: http.ServerResponse) => unknown
    );

    const getRes = makeMockResponse();
    guarded({ method: "GET" } as unknown as http.IncomingMessage, getRes as unknown as http.ServerResponse);
    assert.equal(getRes.headers.connection, undefined, "GET must not be forced to close");

    const headRes = makeMockResponse();
    guarded(
      { method: "HEAD" } as unknown as http.IncomingMessage,
      headRes as unknown as http.ServerResponse
    );
    assert.equal(headRes.headers.connection, "close", "HEAD must be force-closed");

    // Sanity: the inner listener was actually invoked in both cases (guard
    // must not swallow the request — routing/auth/status-code logic still
    // runs, only the body write path is intercepted).
    assert.ok(receivedReq);
    assert.ok(receivedRes);
  });
});

/**
 * End-to-end confirmation over a real TCP socket: a HEAD request through the
 * guarded listener gets an empty body and a closed connection even when the
 * underlying handler writes a large body synchronously (the shape that, on
 * an un-guarded pipe, streams the full page/RSC payload for HEAD exactly as
 * Next's `pipeToNodeResponse` does today).
 */
describe("issue #6400 — HEAD response guard (integration, real socket)", () => {
  const servers: http.Server[] = [];

  after(() => {
    for (const server of servers) server.close();
  });

  function startGuardedServer(
    handler: (req: http.IncomingMessage, res: http.ServerResponse) => void
  ): Promise<{ port: number }> {
    const server = http.createServer(wrapRequestListenerWithHeadResponseGuard(handler));
    servers.push(server);
    return new Promise((resolve) => {
      server.listen(0, "127.0.0.1", () => resolve({ port: (server.address() as AddressInfo).port }));
    });
  }

  function rawRequest(
    port: number,
    method: string
  ): Promise<{ statusCode: number; headers: Record<string, string>; body: string }> {
    return new Promise((resolvePromise, reject) => {
      const req = http.request(
        { host: "127.0.0.1", port, method, path: "/", headers: { Connection: "keep-alive" } },
        (res) => {
          const chunks: Buffer[] = [];
          res.on("data", (chunk) => chunks.push(chunk));
          res.on("end", () => {
            resolvePromise({
              statusCode: res.statusCode ?? 0,
              headers: Object.fromEntries(
                Object.entries(res.headers).map(([k, v]) => [k, String(v)])
              ),
              body: Buffer.concat(chunks).toString("utf8"),
            });
          });
        }
      );
      req.on("error", reject);
      req.end();
    });
  }

  it("HEAD to a handler that writes a large body synchronously still returns an empty body + Connection: close", async () => {
    const largeBody = "x".repeat(1_000_000);
    const { port } = await startGuardedServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(largeBody);
      res.end();
    });

    const result = await rawRequest(port, "HEAD");

    assert.equal(result.statusCode, 200);
    assert.equal(result.body, "", "HEAD body must be empty per RFC 9110 §9.3.2");
    assert.equal(
      result.headers.connection,
      "close",
      "HEAD response must force Connection: close so the client never has to guess"
    );
  });

  it("GET through the SAME guarded listener is unaffected (still streams the full body)", async () => {
    const { port } = await startGuardedServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("hello world");
    });

    const result = await rawRequest(port, "GET");

    assert.equal(result.statusCode, 200);
    assert.equal(result.body, "hello world");
    assert.notEqual(
      result.headers.connection,
      "close",
      "GET requests must not be forced to close — only HEAD is guarded"
    );
  });

  it("HEAD to a 404/unknown-route-shaped handler also closes immediately with an empty body", async () => {
    const { port } = await startGuardedServer((req, res) => {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<html>not found</html>");
    });

    const result = await rawRequest(port, "HEAD");

    assert.equal(result.statusCode, 404);
    assert.equal(result.body, "");
    assert.equal(result.headers.connection, "close");
  });
});
