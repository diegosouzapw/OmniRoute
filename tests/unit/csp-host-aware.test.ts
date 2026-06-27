/**
 * TDD regression guard for #5083 — Bug 1:
 * CSP connect-src is a static string that only covers loopback origins.
 * When the dashboard is accessed from a LAN or Tailscale IP the browser
 * blocks WebSocket connections because ws://<lan-host>:* is absent.
 *
 * Fix: build the CSP per-request; validate the Host header and append
 * ws://<host>:* / http://<host>:* to connect-src when the host is a
 * valid non-loopback hostname or IPv4 address.
 *
 * Security invariant: a Host header containing injection characters
 * (semicolon, space, quotes, …) must NEVER be interpolated into the CSP.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  sanitizeHostForCsp,
  buildCspForHost,
  CSP_BASELINE_PARTS,
} from "../../src/server/csp.ts";

describe("sanitizeHostForCsp — host validation", () => {
  it("returns null for null input", () => {
    assert.equal(sanitizeHostForCsp(null), null);
  });

  it("returns null for empty string", () => {
    assert.equal(sanitizeHostForCsp(""), null);
  });

  it("returns null for localhost (already in baseline)", () => {
    assert.equal(sanitizeHostForCsp("localhost"), null);
    assert.equal(sanitizeHostForCsp("localhost:20128"), null);
  });

  it("returns null for 127.0.0.1 (loopback)", () => {
    assert.equal(sanitizeHostForCsp("127.0.0.1"), null);
    assert.equal(sanitizeHostForCsp("127.0.0.1:3000"), null);
  });

  it("returns null for [::1] IPv6 loopback", () => {
    assert.equal(sanitizeHostForCsp("[::1]"), null);
  });

  it("returns the host for a private LAN IPv4 (192.168.x.x)", () => {
    assert.equal(sanitizeHostForCsp("192.168.1.100"), "192.168.1.100");
    assert.equal(sanitizeHostForCsp("192.168.1.100:20128"), "192.168.1.100");
  });

  it("returns the host for a Tailscale CGNAT IP (100.64.x.x)", () => {
    assert.equal(sanitizeHostForCsp("100.64.0.1"), "100.64.0.1");
    assert.equal(sanitizeHostForCsp("100.64.0.1:20128"), "100.64.0.1");
  });

  it("returns lower-cased hostname for a valid domain", () => {
    assert.equal(sanitizeHostForCsp("my-server.local"), "my-server.local");
    assert.equal(sanitizeHostForCsp("MY-SERVER.LOCAL:20128"), "my-server.local");
  });

  it("strips the port before validation", () => {
    assert.equal(sanitizeHostForCsp("192.168.0.15:20128"), "192.168.0.15");
  });

  // ── SECURITY: injection / malicious inputs must be rejected ───────────────

  it("rejects a Host with semicolons (CSP delimiter injection attempt)", () => {
    assert.equal(sanitizeHostForCsp("evil.com ; script-src *"), null);
  });

  it("rejects a Host with spaces", () => {
    assert.equal(sanitizeHostForCsp("evil host"), null);
  });

  it("rejects a Host with single quotes", () => {
    assert.equal(sanitizeHostForCsp("evil.com' script-src *"), null);
  });

  it("rejects a Host with wildcard characters", () => {
    assert.equal(sanitizeHostForCsp("*.evil.com"), null);
  });

  it("rejects a bare IPv6 address (unbracketed, multiple colons)", () => {
    // e.g. "fe80::1" — multiple colons with no brackets
    assert.equal(sanitizeHostForCsp("fe80::1"), null);
  });

  it("rejects a bracketed non-loopback IPv6 (not yet supported)", () => {
    assert.equal(sanitizeHostForCsp("[fe80::1]"), null);
  });
});

describe("buildCspForHost — per-request CSP", () => {
  it("returns baseline CSP when host is null", () => {
    const csp = buildCspForHost(null);
    assert.ok(csp.includes("connect-src 'self' http://localhost:*"));
    assert.ok(csp.includes("wss:"));
    assert.ok(!csp.includes("ws://192"));
  });

  it("returns baseline CSP for loopback host", () => {
    const csp = buildCspForHost("localhost:20128");
    assert.ok(csp.includes("connect-src 'self' http://localhost:*"));
    // Loopback should not be ADDED a second time
    const connectSrc = csp.split(";").find((p) => p.trim().startsWith("connect-src"));
    assert.ok(connectSrc);
    // Count occurrences of "localhost" — should be exactly 2 (http + ws)
    const localhostCount = (connectSrc.match(/localhost/g) ?? []).length;
    assert.equal(localhostCount, 2);
  });

  it("appends ws://<host>:* and http://<host>:* for a valid LAN IPv4", () => {
    const csp = buildCspForHost("100.64.0.1");
    assert.ok(csp.includes("ws://100.64.0.1:*"), "should contain ws:// for LAN host");
    assert.ok(csp.includes("http://100.64.0.1:*"), "should contain http:// for LAN host");
    // baseline loopback origins must still be present
    assert.ok(csp.includes("ws://localhost:*"), "loopback ws still present");
    assert.ok(csp.includes("http://localhost:*"), "loopback http still present");
  });

  it("appends host entries for a valid domain (e.g. my-server.local)", () => {
    const csp = buildCspForHost("my-server.local:20128");
    assert.ok(csp.includes("ws://my-server.local:*"));
    assert.ok(csp.includes("http://my-server.local:*"));
  });

  it("does NOT inject a malicious Host header into CSP", () => {
    // The attacker-controlled Host header value contains CSP metacharacters.
    const maliciousHost = "evil.com ; script-src *";
    const csp = buildCspForHost(maliciousHost);
    // The CSP must NOT contain the raw injection string
    assert.ok(!csp.includes("evil.com"), "raw evil.com must not appear in CSP");
    assert.ok(!csp.includes("; script-src *"), "injected directive must not appear");
    // It should be identical to the baseline (malicious host rejected)
    assert.equal(csp, buildCspForHost(null));
  });

  it("host additions appear ONLY in connect-src, not other directives", () => {
    const csp = buildCspForHost("192.168.1.100");
    const directives = csp.split(";").map((d) => d.trim());
    for (const d of directives) {
      if (d.startsWith("connect-src")) continue; // connect-src is expected to have the host
      assert.ok(
        !d.includes("192.168.1.100"),
        `host must not appear in directive: ${d}`
      );
    }
  });

  it("baseline CSP parts are all present in output", () => {
    const csp = buildCspForHost(null);
    // Check a representative sample of baseline directives
    assert.ok(csp.includes("default-src 'self'"));
    assert.ok(csp.includes("frame-ancestors 'none'"));
    assert.ok(csp.includes("object-src 'none'"));
    assert.ok(csp.includes("script-src 'self' 'unsafe-inline'"));
  });

  it("CSP_BASELINE_PARTS array has a connect-src entry", () => {
    const hasConnectSrc = CSP_BASELINE_PARTS.some((p) => p.startsWith("connect-src "));
    assert.ok(hasConnectSrc);
  });
});
