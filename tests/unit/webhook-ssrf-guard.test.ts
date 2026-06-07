/**
 * Webhook SSRF guard coverage.
 *
 * These tests exercise the URL validation paths that the deliver / create /
 * test endpoints rely on. They run against the shared outbound URL guard so a
 * regression that bypasses `parseAndValidatePublicUrl` at any layer is caught
 * here without requiring a running Next.js server.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/webhook-ssrf-guard.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  parseAndValidatePublicUrl,
  OutboundUrlGuardError,
  isPrivateHost,
} from "../../src/shared/network/outboundUrlGuard.ts";
import { deliverWebhook } from "../../src/lib/webhookDispatcher.ts";

const BLOCKED_URLS = [
  "http://127.0.0.1/internal",
  "http://localhost:20128/api/admin",
  "http://0.0.0.0:8080/",
  "http://[::1]/v1/admin",
  "http://169.254.169.254/latest/meta-data/", // AWS IMDS
  "http://metadata.google.internal/computeMetadata/v1/", // GCP metadata
  "http://10.0.0.1/internal",
  "http://192.168.1.1/admin",
  "http://172.16.0.1/admin",
  "http://172.31.255.255/admin", // RFC 1918 upper bound
  "http://100.64.0.1/", // CGNAT
  "http://[fe80::1]/", // link-local IPv6
  "http://[fc00::1]/", // ULA IPv6
  "http://user:pass@example.com/", // embedded credentials
  "ftp://example.com/path", // forbidden scheme
  "file:///etc/passwd", // forbidden scheme
];

const ALLOWED_URLS = [
  "https://example.com/hooks/abc",
  "https://hooks.slack.com/services/T000/B000/XXXX",
  "https://discord.com/api/webhooks/123/abc",
  "https://api.telegram.org/bot12345:ABCDEF/sendMessage",
];

describe("isPrivateHost — RFC1918, loopback, link-local, IMDS coverage", () => {
  it("blocks loopback addresses", () => {
    assert.equal(isPrivateHost("127.0.0.1"), true);
    assert.equal(isPrivateHost("localhost"), true);
    assert.equal(isPrivateHost("::1"), true);
    assert.equal(isPrivateHost("0.0.0.0"), true);
  });

  it("blocks RFC 1918 ranges", () => {
    assert.equal(isPrivateHost("10.0.0.1"), true);
    assert.equal(isPrivateHost("192.168.1.1"), true);
    assert.equal(isPrivateHost("172.16.0.1"), true);
    assert.equal(isPrivateHost("172.31.255.255"), true);
  });

  it("blocks 169.254.x.x link-local (AWS / Azure IMDS)", () => {
    assert.equal(isPrivateHost("169.254.169.254"), true);
    assert.equal(isPrivateHost("169.254.0.1"), true);
  });

  it("blocks CGNAT 100.64.0.0/10", () => {
    assert.equal(isPrivateHost("100.64.0.1"), true);
    assert.equal(isPrivateHost("100.127.255.254"), true);
  });

  it("blocks IPv6 ULA + link-local", () => {
    assert.equal(isPrivateHost("fc00::1"), true);
    assert.equal(isPrivateHost("fd12:3456:789a::1"), true);
    assert.equal(isPrivateHost("fe80::1"), true);
  });

  it("blocks .localhost and .local suffix hostnames", () => {
    assert.equal(isPrivateHost("svc.localhost"), true);
    assert.equal(isPrivateHost("printer.local"), true);
  });

  it("permits public hostnames and IPs", () => {
    assert.equal(isPrivateHost("example.com"), false);
    assert.equal(isPrivateHost("api.openai.com"), false);
    assert.equal(isPrivateHost("8.8.8.8"), false);
    assert.equal(isPrivateHost("1.1.1.1"), false);
  });
});

describe("parseAndValidatePublicUrl — webhook SSRF surface", () => {
  for (const url of BLOCKED_URLS) {
    it(`rejects ${url}`, () => {
      assert.throws(() => parseAndValidatePublicUrl(url), OutboundUrlGuardError);
    });
  }

  for (const url of ALLOWED_URLS) {
    it(`permits ${url}`, () => {
      assert.doesNotThrow(() => parseAndValidatePublicUrl(url));
    });
  }
});

describe("deliverWebhook — runtime SSRF guard returns error without firing fetch", () => {
  it("returns blocked-URL error for private targets, never opens a socket", async () => {
    const res = await deliverWebhook(
      "http://169.254.169.254/latest/meta-data/",
      { event: "test.ping", timestamp: new Date().toISOString(), data: {} },
      "secret"
    );
    assert.equal(res.success, false);
    assert.equal(res.status, 0);
    assert.ok(
      typeof res.error === "string" && /private|blocked|local/i.test(res.error),
      `expected guard error, got: ${res.error}`
    );
  });

  it("returns blocked-URL error for loopback even with valid HMAC secret", async () => {
    const res = await deliverWebhook(
      "http://127.0.0.1:8080/admin",
      { event: "request.failed", timestamp: new Date().toISOString(), data: {} },
      "supersecret"
    );
    assert.equal(res.success, false);
    assert.equal(res.status, 0);
    assert.ok(typeof res.error === "string" && /private|blocked|local/i.test(res.error));
  });
});
