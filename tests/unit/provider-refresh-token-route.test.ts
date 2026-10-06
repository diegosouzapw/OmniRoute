import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { POST } from "../../src/app/api/providers/[id]/refresh-token/route.ts";
import { createProviderConnection } from "../../src/lib/db/providers.ts";

describe("POST /api/providers/[id]/refresh-token", () => {
  it("returns 404 for nonexistent connection", async () => {
    const req = new Request("http://localhost/api/providers/nonexistent/refresh-token", {
      method: "POST",
    });
    const res = await POST(req, { params: Promise.resolve({ id: "nonexistent" }) });
    assert.equal(res.status, 404);
  });

  it("refreshes active kimi-web connection", async () => {
    const originalFetch = globalThis.fetch;
    const now = Math.floor(Date.now() / 1000);
    const mockAccessToken =
      "eyJhbGciOiJIUzUxMiJ9." +
      Buffer.from(JSON.stringify({ sub: "user_test_99", exp: now + 3600, iat: now })).toString("base64url") +
      ".sig";
    const mockRefreshToken =
      "eyJhbGciOiJIUzUxMiJ9." +
      Buffer.from(JSON.stringify({ exp: now + 86400 * 90, iat: now })).toString("base64url") +
      ".sig";

    try {
      globalThis.fetch = (async (url: Parameters<typeof fetch>[0]) => {
        if (String(url).includes("/api/auth/token/refresh")) {
          return new Response(
            JSON.stringify({ access_token: mockAccessToken, refresh_token: mockRefreshToken }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }
        return new Response("Not found", { status: 404 });
      }) as typeof fetch;

      const conn = await createProviderConnection({
        provider: "kimi-web",
        name: "Test Kimi Connection",
        apiKey: "old_access_token",
        refreshToken: "valid_refresh_token",
      });

      const req = new Request(`http://localhost/api/providers/${conn.id}/refresh-token`, {
        method: "POST",
      });
      const res = await POST(req, { params: Promise.resolve({ id: conn.id }) });
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.user.userId, "user_test_99");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
