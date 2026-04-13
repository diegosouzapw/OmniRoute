import { describe, it, before } from "node:test";
import assert from "node:assert/strict";

/**
 * Tests for src/middleware.ts auth guard behavior.
 * These are unit-level tests using mocked Next.js request/response objects.
 */

// Helper: create a minimal mock NextRequest
function mockRequest(pathname, { cookie = null, authHeader = null } = {}) {
  const headers = new Headers();
  if (authHeader) headers.set("authorization", authHeader);
  if (cookie) headers.set("cookie", `omniroute-session=${cookie}`);
  return {
    nextUrl: { pathname },
    cookies: {
      get: (name) => (name === "omniroute-session" && cookie ? { value: cookie } : undefined),
    },
    headers,
  };
}

describe("isPublicApiRoute", () => {
  // Dynamically import the Edge-safe module
  let isPublicApiRoute;
  before(async () => {
    // Import the pure constants module (no DB, no next/headers)
    const mod = await import("../../src/shared/constants/publicApiRoutes.js");
    isPublicApiRoute = mod.isPublicApiRoute;
  });

  it("allows /api/auth/login (exact match)", () => {
    assert.ok(isPublicApiRoute("/api/auth/login"));
  });

  it("blocks /api/auth/login/reset (no prefix match for leaf routes)", () => {
    assert.ok(!isPublicApiRoute("/api/auth/login/reset"));
  });

  it("allows /api/v1/chat/completions (prefix match)", () => {
    assert.ok(isPublicApiRoute("/api/v1/chat/completions"));
  });

  it("blocks /api/settings (management route)", () => {
    assert.ok(!isPublicApiRoute("/api/settings"));
  });

  it("blocks /api/init-anything (exact /api/init should not prefix-match)", () => {
    assert.ok(!isPublicApiRoute("/api/init-anything"));
  });

  it("allows /api/init exactly", () => {
    assert.ok(isPublicApiRoute("/api/init"));
  });

  it("allows /api/oauth/callback/github (prefix match)", () => {
    assert.ok(isPublicApiRoute("/api/oauth/callback/github"));
  });
});
