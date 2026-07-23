// Regression guard for #5083 (Bug 1): the dashboard, when reached from a LAN /
// Tailscale / non-loopback host, opens `ws://<that-host>:<port>` to its own Live WS
// server. The static Content-Security-Policy in next.config.mjs previously allowed
// `ws:` only for loopback origins (`ws://localhost:*`, `ws://127.0.0.1:*`) plus a bare
// `wss:` — so a plain-`ws:` connection to a non-loopback host was blocked by the
// browser. The fix permits the bare `ws:` scheme (symmetric with the bare `wss:` that
// was already allowed), without introducing any global Next.js middleware (the project
// intentionally has none — interception is route-specific; see CLAUDE.md / AGENTS.md).
//
// This test pins the connect-src directive in next.config.mjs so the LAN/Tailscale WS
// allowance cannot silently regress, while confirming the other security directives are
// left intact.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const nextConfig = readFileSync(resolve(here, "../../next.config.mjs"), "utf8");

// Extract the connect-src directive string literal from the CSP array.
function connectSrcDirective(): string {
  const match = nextConfig.match(/"(connect-src[^"]*)"/);
  assert.ok(match, "next.config.mjs must define a connect-src directive in the CSP array");
  return match![1];
}

test("#5083 connect-src permits the bare ws: scheme for non-loopback dashboards", () => {
  const connectSrc = connectSrcDirective();
  // Bare `ws:` must be present as its own token (not just `ws://localhost`).
  assert.match(
    connectSrc,
    /(^|\s)ws:(\s|$)/,
    `connect-src must allow the bare ws: scheme; got: ${connectSrc}`
  );
});

test("#5083 connect-src keeps the bare wss: scheme it mirrors", () => {
  const connectSrc = connectSrcDirective();
  assert.match(connectSrc, /(^|\s)wss:(\s|$)/, "connect-src must still allow bare wss:");
});

test("#5083 connect-src still scopes 'self' and explicit loopback origins", () => {
  const connectSrc = connectSrcDirective();
  assert.ok(connectSrc.includes("'self'"), "connect-src must still include 'self'");
  assert.ok(
    connectSrc.includes("ws://localhost:*") && connectSrc.includes("ws://127.0.0.1:*"),
    "explicit loopback ws origins must remain listed"
  );
});

test("#5083 fix does NOT introduce a global Next.js middleware", () => {
  // The project has no global middleware by design; the CSP fix must stay declarative.
  let exists = true;
  try {
    readFileSync(resolve(here, "../../src/middleware.ts"), "utf8");
  } catch {
    exists = false;
  }
  assert.equal(exists, false, "src/middleware.ts must not exist (no global middleware — see CLAUDE.md)");
});

test("#5083 baseline security directives remain intact in the CSP", () => {
  // frame-ancestors 'none' is the global default; object-src 'none' and base-uri 'self'
  // must not have been weakened by the connect-src change.
  assert.ok(nextConfig.includes("frame-ancestors 'none'"), "frame-ancestors 'none' must remain");
  assert.ok(nextConfig.includes("object-src 'none'"), "object-src 'none' must remain");
  assert.ok(nextConfig.includes("base-uri 'self'"), "base-uri 'self' must remain");
});
