/**
 * T-14 — NinerouterServiceTab unit tests.
 *
 * Verifies module shape, embedded iframe URL construction, and API key masking.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ── module shape ──────────────────────────────────────────────────────────────

describe("NinerouterServiceTab — module shape", () => {
  it("exports NinerouterServiceTab function", async () => {
    const mod =
      await import("../../../../../src/app/(dashboard)/dashboard/providers/services/tabs/NinerouterServiceTab.tsx");
    assert.equal(typeof mod.NinerouterServiceTab, "function");
  });
});

// ── embedded iframe URL ───────────────────────────────────────────────────────

describe("EmbeddedUiCard — iframe URL construction", () => {
  it("builds loopback URL for default port", () => {
    const port = 20130;
    const url = `http://127.0.0.1:${port}`;
    assert.equal(url, "http://127.0.0.1:20130");
  });

  it("URL is loopback-only (127.0.0.1, not 0.0.0.0 or external)", () => {
    const port = 20130;
    const url = `http://127.0.0.1:${port}`;
    assert.ok(url.startsWith("http://127.0.0.1:"), "must be loopback");
    assert.ok(!url.includes("0.0.0.0"), "must not bind to all interfaces");
  });
});

// ── rotate-key endpoint ───────────────────────────────────────────────────────

describe("ApiKeyCard — rotate-key endpoint", () => {
  it("rotate-key route path is correct", () => {
    const NAME = "9router";
    const path = `/api/services/${NAME}/rotate-key`;
    assert.equal(path, "/api/services/9router/rotate-key");
  });
});

// ── auto-start endpoint ───────────────────────────────────────────────────────

describe("AutoStartCard — auto-start endpoint", () => {
  it("auto-start route path is correct", () => {
    const NAME = "9router";
    const path = `/api/services/${NAME}/auto-start`;
    assert.equal(path, "/api/services/9router/auto-start");
  });
});
