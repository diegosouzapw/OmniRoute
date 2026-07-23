/**
 * Regression test for #3606 — MITM startup failure message is misleading.
 *
 * `startMitm()` used to always throw "port 443 may be in use" regardless of the
 * real cause, because the stderr parser only matched EADDRINUSE. `server.cjs`
 * already distinguishes EADDRINUSE / EACCES / missing-ROUTER_API_KEY / other on
 * stderr (each prefixed with "❌"). `interpretMitmStartupError()` now maps the
 * captured stderr to the actual cause so the user is not sent debugging port 443
 * when the real problem is a missing API key or a permission error.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { interpretMitmStartupError } from "../../src/mitm/manager.ts";

test("EADDRINUSE stderr still reports the port-in-use cause", () => {
  const msg = interpretMitmStartupError("❌ Port 443 already in use", 443);
  assert.match(msg, /443/);
  assert.match(msg, /in use/i);
});

test("EACCES stderr reports a permission cause, not port-in-use", () => {
  const msg = interpretMitmStartupError("❌ Permission denied for port 443", 443);
  assert.match(msg, /permission/i);
  assert.doesNotMatch(msg, /in use/i);
});

test("missing ROUTER_API_KEY stderr reports the API-key cause, not port-in-use", () => {
  const msg = interpretMitmStartupError("❌ ROUTER_API_KEY required", 443);
  assert.match(msg, /ROUTER_API_KEY|API key/i);
  assert.doesNotMatch(msg, /in use/i);
});

test("an arbitrary ❌ error line is surfaced verbatim (without the marker)", () => {
  const msg = interpretMitmStartupError("some log\n❌ ENOENT: server.cjs missing\nmore log", 8443);
  assert.match(msg, /ENOENT: server\.cjs missing/);
  assert.doesNotMatch(msg, /❌/);
});

test("respects a non-default port in the port-in-use message", () => {
  const msg = interpretMitmStartupError("❌ Port 8443 already in use", 8443);
  assert.match(msg, /8443/);
});

test("with no captured stderr, falls back to a generic (non-misleading) message", () => {
  const msg = interpretMitmStartupError("", 443);
  // Must NOT assert it is specifically a port-443 problem when nothing was captured.
  assert.doesNotMatch(msg, /port 443 may be in use/i);
  assert.match(msg, /failed to start/i);
});
