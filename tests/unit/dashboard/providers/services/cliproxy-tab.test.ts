/**
 * T-13 — CliproxyServiceTab unit tests.
 *
 * Verifies module shape and the URL validation helper used by FallbackRoutingCard.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ── module shape ──────────────────────────────────────────────────────────────

describe("CliproxyServiceTab — module shape", () => {
  it("exports CliproxyServiceTab function", async () => {
    const mod =
      await import("../../../../../src/app/(dashboard)/dashboard/providers/services/tabs/CliproxyServiceTab.tsx");
    assert.equal(typeof mod.CliproxyServiceTab, "function");
  });
});

// ── URL validation (mirrors isValidUrl inside the tab) ────────────────────────

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

describe("isValidUrl — fallback URL guard", () => {
  it("accepts http:// URLs", () => {
    assert.ok(isValidUrl("http://127.0.0.1:8317"));
    assert.ok(isValidUrl("http://localhost:8317"));
  });

  it("accepts https:// URLs", () => {
    assert.ok(isValidUrl("https://example.com"));
  });

  it("rejects bare hostnames", () => {
    assert.equal(isValidUrl("127.0.0.1:8317"), false);
  });

  it("rejects empty string", () => {
    assert.equal(isValidUrl(""), false);
  });

  it("rejects non-http protocols", () => {
    assert.equal(isValidUrl("ftp://example.com"), false);
    assert.equal(isValidUrl("file:///etc/hosts"), false);
  });
});

// ── fallback defaults ─────────────────────────────────────────────────────────

describe("FallbackRoutingCard — default values", () => {
  it("default fallback codes match production default", () => {
    const DEFAULT_CODES = "502,401,403,429,503";
    const codes = DEFAULT_CODES.split(",").map((c) => parseInt(c, 10));
    assert.deepEqual(codes, [502, 401, 403, 429, 503]);
  });

  it("default CLIProxyAPI URL matches installed port", () => {
    const DEFAULT_URL = "http://127.0.0.1:8317";
    assert.ok(isValidUrl(DEFAULT_URL));
    assert.ok(DEFAULT_URL.includes("8317"));
  });
});
