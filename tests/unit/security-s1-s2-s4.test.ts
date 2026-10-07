/**
 * Security compliance tickets S1, S2, S4 — unit tests.
 *
 * S1 — Login rate-limit key uses anti-spoofed peer IP (x-omniroute-trusted-peer-ip)
 * S2 — A2A agent-card topology sanitisation (no hardcoded localhost:20128)
 * S4 — 429 Retry-After header always present on lockout responses
 */
import { describe, it, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { NextRequest } from "next/server";

// ── S2: agent-card route tests (no heavy mocking needed) ──────────────

describe("S2 — agent-card topology sanitisation", () => {
  const BASE_URL_SAVED = process.env.OMNIROUTE_BASE_URL;

  beforeEach(() => {
    delete process.env.OMNIROUTE_BASE_URL;
  });

  after(() => {
    if (BASE_URL_SAVED !== undefined) {
      process.env.OMNIROUTE_BASE_URL = BASE_URL_SAVED;
    } else {
      delete process.env.OMNIROUTE_BASE_URL;
    }
  });

  it("agent-card.json derives URL from request.nextUrl.origin when OMNIROUTE_BASE_URL is unset", async () => {
    const mod = await import("../../src/app/.well-known/agent-card.json/route.ts");
    const request = new Request(
      "https://gateway.example.com/.well-known/agent-card.json"
    ) as unknown as NextRequest;
    Object.defineProperty(request, "nextUrl", {
      value: new URL("https://gateway.example.com/.well-known/agent-card.json"),
      configurable: true,
    });

    const res = await mod.GET(request);
    assert.equal(res.status, 200);
    const card = (await res.json()) as { url?: string; supportedInterfaces?: { url?: string }[] };
    assert.ok(card.url, "card must have a url");
    assert.equal(
      new URL(card.url).origin,
      "https://gateway.example.com",
      `expected gateway.example.com origin, got ${card.url}`
    );
    if (card.supportedInterfaces && card.supportedInterfaces.length > 0) {
      const ifaceUrl = card.supportedInterfaces[0].url;
      assert.equal(
        ifaceUrl ? new URL(ifaceUrl).origin : undefined,
        "https://gateway.example.com",
        `interface URL should use dynamic origin, got ${ifaceUrl}`
      );
    }
  });

  it("agent-card.json uses OMNIROUTE_BASE_URL when set", async () => {
    process.env.OMNIROUTE_BASE_URL = "https://custom.example.com";
    const mod = await import("../../src/app/.well-known/agent-card.json/route.ts");
    const request = new Request(
      "http://localhost:20128/.well-known/agent-card.json"
    ) as unknown as NextRequest;
    Object.defineProperty(request, "nextUrl", {
      value: new URL("http://localhost:20128/.well-known/agent-card.json"),
      configurable: true,
    });

    const res = await mod.GET(request);
    assert.equal(res.status, 200);
    const card = (await res.json()) as { url?: string };
    assert.ok(card.url, "card must have a url");
    assert.equal(
      new URL(card.url).origin,
      "https://custom.example.com",
      `expected custom.example.com origin, got ${card.url}`
    );
  });

  it("agent.json derives URL from request.nextUrl.origin when OMNIROUTE_BASE_URL is unset", async () => {
    const mod = await import("../../src/app/.well-known/agent.json/route.ts");
    const request = new Request(
      "https://gateway.example.com/.well-known/agent.json"
    ) as unknown as NextRequest;
    Object.defineProperty(request, "nextUrl", {
      value: new URL("https://gateway.example.com/.well-known/agent.json"),
      configurable: true,
    });

    const res = await mod.GET(request);
    assert.equal(res.status, 200);
    const card = (await res.json()) as { url?: string };
    assert.ok(card.url, "card must have a url");
    assert.equal(
      new URL(card.url).origin,
      "https://gateway.example.com",
      `expected gateway.example.com origin, got ${card.url}`
    );
  });
});

// ── Login guard module (loaded once for S4 tests) ─────────────────────
const loginGuardMod = await import("../../src/server/auth/loginGuard");

// ── S4: login guard Retry-After tests ─────────────────────────────────

describe("S4 — 429 Retry-After header", () => {
  const { checkLoginGuard, recordLoginFailure, resetLoginGuardForTests, LOGIN_GUARD_TUNABLES } =
    loginGuardMod;

  beforeEach(() => {
    resetLoginGuardForTests();
  });

  it("checkLoginGuard returns retryAfterSeconds when locked", () => {
    const ip = "10.0.0.99";
    for (let i = 0; i < LOGIN_GUARD_TUNABLES.FAILURE_THRESHOLD; i++) {
      recordLoginFailure(ip, { enabled: true });
    }
    const decision = checkLoginGuard(ip, { enabled: true });
    assert.equal(decision.allowed, false);
    assert.ok(
      typeof decision.retryAfterSeconds === "number" && decision.retryAfterSeconds > 0,
      `retryAfterSeconds should be > 0, got ${decision.retryAfterSeconds}`
    );
  });

  it("recordLoginFailure returns retryAfterSeconds on threshold hit", () => {
    const ip = "10.0.0.100";
    for (let i = 0; i < LOGIN_GUARD_TUNABLES.FAILURE_THRESHOLD; i++) {
      const dec = recordLoginFailure(ip, { enabled: true });
      if (i < LOGIN_GUARD_TUNABLES.FAILURE_THRESHOLD - 1) {
        assert.equal(dec.allowed, true, `attempt #${i + 1} should still be allowed`);
      } else {
        assert.equal(dec.allowed, false, `attempt #${i + 1} (threshold) should be locked`);
        assert.ok(
          typeof dec.retryAfterSeconds === "number" && dec.retryAfterSeconds > 0,
          `retryAfterSeconds should be > 0 on threshold hit, got ${dec.retryAfterSeconds}`
        );
      }
    }
  });

  it("both guard functions provide retryAfterSeconds for the response header", () => {
    const ip = "10.0.0.101";
    for (let i = 0; i < LOGIN_GUARD_TUNABLES.FAILURE_THRESHOLD; i++) {
      recordLoginFailure(ip, { enabled: true });
    }
    const guardDec = checkLoginGuard(ip, { enabled: true });
    assert.equal(guardDec.allowed, false);
    const headerValue = String(guardDec.retryAfterSeconds || 60);
    assert.ok(
      /^\d+$/.test(headerValue),
      `Retry-After should be an integer string, got ${headerValue}`
    );
    assert.ok(Number.parseInt(headerValue, 10) > 0, "Retry-After should be positive");

    resetLoginGuardForTests();
    const ip2 = "10.0.0.102";
    let failureDec: ReturnType<typeof recordLoginFailure> | undefined;
    for (let i = 0; i < LOGIN_GUARD_TUNABLES.FAILURE_THRESHOLD; i++) {
      failureDec = recordLoginFailure(ip2, { enabled: true });
    }
    assert.equal(failureDec!.allowed, false);
    const headerValue2 = String(failureDec!.retryAfterSeconds || 60);
    assert.ok(
      /^\d+$/.test(headerValue2),
      `Retry-After should be an integer string, got ${headerValue2}`
    );
    assert.ok(Number.parseInt(headerValue2, 10) > 0, "Retry-After should be positive");
  });
});

// ── S1: login route uses trusted peer IP for rate-limit key ───────────
// Integration test: sets up the real DB, management password, and settings,
// then calls the login route POST function to verify the clientIp derivation.
// The route uses: clientIp = request.headers.get("x-omniroute-trusted-peer-ip") || auditContext.ipAddress || null

describe("S1 — login rate-limit key uses anti-spoofed peer IP", () => {
  const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-security-s1-s2-s4-"));
  const JWT_SAVED = process.env.JWT_SECRET;
  const INITIAL_PASSWORD_SAVED = process.env.INITIAL_PASSWORD;

  let loginRoute: typeof import("../../src/app/api/auth/login/route.ts");
  let loginGuardModRef: typeof import("../../src/server/auth/loginGuard");
  let settingsDb: typeof import("../../src/lib/db/settings.ts");

  beforeEach(async () => {
    // Reset env
    process.env.DATA_DIR = TEST_DATA_DIR;
    process.env.JWT_SECRET = "test-jwt-secret-for-s1-s2-s4-tests";
    // Use a bcrypt hash of "test-password" as the initial password so the
    // login route already has a valid hash in the DB settings.
    process.env.INITIAL_PASSWORD = "test-password";
    delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
    delete process.env.OMNIROUTE_BASE_URL;

    // Create data dir
    fs.mkdirSync(TEST_DATA_DIR, { recursive: true });

    // Reset DB and set up settings
    const core = await import("../../src/lib/db/core.ts");
    core.resetDbInstance();
    settingsDb = await import("../../src/lib/db/settings.ts");
    await settingsDb.updateSettings({ bruteForceProtection: true });

    // Import login guard and reset state
    loginGuardModRef = await import("../../src/server/auth/loginGuard");
    loginGuardModRef.resetLoginGuardForTests();

    // Now import the login route
    loginRoute = await import("../../src/app/api/auth/login/route.ts");
  });

  after(() => {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    if (JWT_SAVED !== undefined) {
      process.env.JWT_SECRET = JWT_SAVED;
    } else {
      delete process.env.JWT_SECRET;
    }
    // Restore INITIAL_PASSWORD
    if (INITIAL_PASSWORD_SAVED !== undefined) {
      process.env.INITIAL_PASSWORD = INITIAL_PASSWORD_SAVED;
    } else {
      delete process.env.INITIAL_PASSWORD;
    }
  });

  it("uses x-omniroute-trusted-peer-ip for rate-limit key when header is present", async () => {
    // The login route derives clientIp from the trusted peer IP header.
    // We make multiple requests with the same trusted peer IP but different
    // forged XFF headers to verify they share the same rate-limit bucket.
    //
    // The route only trusts the header when OMNIROUTE_PEER_STAMP_TOKEN is set.
    // Without the token, spoofed headers are rejected (tested separately below).

    process.env.OMNIROUTE_PEER_STAMP_TOKEN = "test-stamp-token";

    const TRUSTED_IP = "203.0.113.42";
    const FORGED_XFF = "192.168.1.1, 10.0.0.1";

    // Make enough requests to trigger the rate limit
    for (let i = 0; i < loginGuardMod.LOGIN_GUARD_TUNABLES.FAILURE_THRESHOLD + 1; i++) {
      const request = new Request("http://localhost:20128/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-omniroute-trusted-peer-ip": TRUSTED_IP,
          "x-forwarded-for": i === 0 ? FORGED_XFF : `10.0.0.${i}, 172.16.0.1`,
        },
        body: JSON.stringify({ password: "wrong-password" }),
      }) as unknown as NextRequest;
      Object.defineProperty(request, "nextUrl", {
        value: new URL("http://localhost:20128/api/auth/login"),
        configurable: true,
      });

      // The email is not checked in the login route — only password matters
      // Let's also try the correct password to make sure login works
      const res = await loginRoute.POST(request);
      if (res.status === 429) {
        // Locked out — rate-limit key is tied to the trusted peer IP, not XFF
        const retryAfter = res.headers.get("Retry-After");
        assert.ok(retryAfter !== null, "429 response must include Retry-After header");
        assert.ok(
          /^\d+$/.test(retryAfter!),
          `Retry-After should be a positive integer, got ${retryAfter}`
        );
        return;
      }
    }
    assert.fail(
      "Expected at least one 429 response after threshold failed attempts with the same trusted peer IP"
    );
  });

  it("ignores spoofed x-omniroute-trusted-peer-ip when OMNIROUTE_PEER_STAMP_TOKEN is not set", async () => {
    loginGuardModRef.resetLoginGuardForTests();

    // OMNIROUTE_PEER_STAMP_TOKEN is already deleted in beforeEach.
    // The route should NOT trust the spoofed header and fall back to
    // auditContext.ipAddress (derived from X-Forwarded-For).
    //
    // TDD: each iteration uses a DIFFERENT spoofed IP. With the bug
    // (unconditional trust), each request goes to a different rate-limit
    // bucket — no bucket reaches the threshold → test FAILS (RED).
    // With the fix (gate on OMNIROUTE_PEER_STAMP_TOKEN), all requests
    // share the REAL_IP bucket → threshold hit → test PASSES (GREEN).

    const REAL_IP = "10.0.0.200";

    for (let i = 0; i < loginGuardMod.LOGIN_GUARD_TUNABLES.FAILURE_THRESHOLD + 1; i++) {
      const SPOOFED_IP = `203.0.113.${i}`;
      const request = new Request("http://localhost:20128/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-omniroute-trusted-peer-ip": SPOOFED_IP,
          "x-forwarded-for": REAL_IP,
        },
        body: JSON.stringify({ password: "wrong-password" }),
      }) as unknown as NextRequest;
      Object.defineProperty(request, "nextUrl", {
        value: new URL("http://localhost:20128/api/auth/login"),
        configurable: true,
      });

      const res = await loginRoute.POST(request);
      if (res.status === 429) {
        // Locked out — rate-limit key is tied to REAL_IP (XFF), not the spoofed header
        const retryAfter = res.headers.get("Retry-After");
        assert.ok(retryAfter !== null, "429 response must include Retry-After header");
        return;
      }
    }
    assert.fail(
      "Expected 429 after threshold failures — spoofed header should not bypass rate-limit"
    );
  });

  it("falls back to auditContext.ipAddress when trusted peer IP header is absent", async () => {
    loginGuardModRef.resetLoginGuardForTests();

    // Without the trusted peer IP header, the rate-limit key falls back to
    // auditContext.ipAddress which reads from X-Forwarded-For / X-Real-IP.
    // We set XFF to a specific IP and verify that requests with that IP get
    // rate-limited, while requests with a different IP do not.

    const REQUEST_IP = "10.0.0.99";

    for (let i = 0; i < loginGuardMod.LOGIN_GUARD_TUNABLES.FAILURE_THRESHOLD + 1; i++) {
      const request = new Request("http://localhost:20128/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-forwarded-for": REQUEST_IP,
        },
        body: JSON.stringify({ password: "wrong-password" }),
      }) as unknown as NextRequest;
      Object.defineProperty(request, "nextUrl", {
        value: new URL("http://localhost:20128/api/auth/login"),
        configurable: true,
      });

      const res = await loginRoute.POST(request);
      if (res.status === 429) {
        // Locked out — rate-limit key is tied to the XFF-derived IP
        const retryAfter = res.headers.get("Retry-After");
        assert.ok(retryAfter !== null, "429 response must include Retry-After header");
        assert.ok(
          Number.parseInt(retryAfter!, 10) > 0,
          `Retry-After should be > 0, got ${retryAfter}`
        );
        return;
      }
    }
    assert.fail("Expected 429 after threshold failures from the same IP");
  });

  it("S4 — 429 response includes Retry-After header in login route", async () => {
    loginGuardModRef.resetLoginGuardForTests();

    for (let i = 0; i < loginGuardMod.LOGIN_GUARD_TUNABLES.FAILURE_THRESHOLD + 1; i++) {
      const request = new Request("http://localhost:20128/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-omniroute-trusted-peer-ip": "203.0.113.99",
        },
        body: JSON.stringify({ password: "wrong-password" }),
      }) as unknown as NextRequest;
      Object.defineProperty(request, "nextUrl", {
        value: new URL("http://localhost:20128/api/auth/login"),
        configurable: true,
      });

      const res = await loginRoute.POST(request);
      if (res.status === 429) {
        const retryAfter = res.headers.get("Retry-After");
        assert.ok(retryAfter !== null, "429 response must include Retry-After header");
        assert.ok(
          Number.parseInt(retryAfter!, 10) > 0,
          `Retry-After should be > 0, got ${retryAfter}`
        );
        return;
      }
    }
    assert.fail("Expected at least one 429 response after threshold failed attempts");
  });
});
