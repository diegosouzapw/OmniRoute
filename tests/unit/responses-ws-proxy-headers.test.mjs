/**
 * tests/unit/responses-ws-proxy-headers.test.mjs
 *
 * Regression for the codex Responses-over-WebSocket upgrade bug:
 * writeHttpError used to spread the internal fetch's response headers onto the
 * raw upgrade socket. Those headers include a chunked `transfer-encoding` (the
 * internal 401 has no Content-Length) plus Next security headers, which collide
 * with writeHttpError's own `Content-Length` framing → the client's HTTP parser
 * fails with "Transfer-Encoding can't be present with Content-Length".
 *
 * writeHttpError must now strip framing / duplicate-prone headers (case-insensitive)
 * so its Content-Length/Connection/Content-Type defaults always win.
 */

import test from "node:test";
import assert from "node:assert/strict";

const { writeHttpError } = await import("../../scripts/dev/responses-ws-proxy.mjs");

function fakeSocket() {
  return {
    writable: true,
    destroyed: false,
    _head: "",
    _body: null,
    write(chunk) {
      this._head += String(chunk);
    },
    end(chunk) {
      if (chunk !== undefined) this._body = chunk;
    },
  };
}

test("writeHttpError strips chunked transfer-encoding + leaked pipeline headers from the caller", () => {
  const sock = fakeSocket();
  // Simulate the exact offending input: undici Object.fromEntries of a chunked
  // Next 401 (no content-length) with security + pipeline headers.
  writeHttpError(sock, 401, JSON.stringify({ error: { message: "ws_auth_required" } }), {
    "transfer-encoding": "chunked",
    connection: "keep-alive",
    "content-type": "application/json",
    "content-security-policy": "default-src 'self'",
    "x-frame-options": "DENY",
    "x-omniroute-route-class": "MANAGEMENT",
    "x-request-id": "abc",
  });

  const head = sock._head;
  const lower = head.toLowerCase();

  // The single most important invariant: never both framing headers.
  assert.ok(lower.includes("content-length:"), "must emit Content-Length");
  assert.ok(!lower.includes("transfer-encoding"), "must NOT emit Transfer-Encoding alongside Content-Length");
  assert.ok(!lower.includes("keep-alive"), "must not forward the upstream keep-alive Connection");
  // Exactly one Content-Type (no duplicate from a case-mismatched spread).
  assert.equal((lower.match(/content-type:/g) || []).length, 1, "exactly one Content-Type header");
  // Pipeline / security headers must not leak onto the raw upgrade socket.
  assert.ok(!lower.includes("content-security-policy"), "must not leak CSP");
  assert.ok(!lower.includes("x-omniroute-route-class"), "must not leak route-class");
  // Our own framing defaults win.
  assert.ok(head.startsWith("HTTP/1.1 401 "), "status line preserved");
  assert.ok(lower.includes("connection: close"), "Connection: close default wins");
});

test("writeHttpError still forwards safe non-framing headers (e.g. retry-after)", () => {
  const sock = fakeSocket();
  writeHttpError(sock, 429, "{}", { "retry-after": "5", "transfer-encoding": "chunked" });
  const lower = sock._head.toLowerCase();
  assert.ok(lower.includes("retry-after: 5"), "safe header forwarded");
  assert.ok(!lower.includes("transfer-encoding"), "framing header still stripped");
});
