import { describe, it } from "node:test";
import assert from "node:assert/strict";
import * as mod from "../../../open-sse/executors/kimi-web.ts";

describe("Kimi Web Executor 401 Retry", () => {
  it("transparently attempts token refresh and retries once on 401 response", async () => {
    const executor = new mod.KimiWebExecutor();
    let callCount = 0;
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async (url: Parameters<typeof fetch>[0], init?: RequestInit) => {
        callCount++;
        if (callCount === 1) {
          // Upstream chat fails with 401 unauthenticated
          return new Response(JSON.stringify({ code: "unauthenticated" }), { status: 401 });
        }
        if (String(url).includes("/api/auth/token/refresh")) {
          // Refresh endpoint returns new access token
          return new Response(
            JSON.stringify({
              access_token: "new_refreshed_access_token",
              refresh_token: "new_refresh_token",
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }
        // Second chat attempt succeeds
        return new Response(new ReadableStream({ start: (c) => c.close() }), {
          status: 200,
          headers: { "content-type": "application/connect+json" },
        });
      }) as typeof fetch;

      const result = await executor.execute({
        model: "k2d6",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "old_expired_token", refreshToken: "sample_refresh" },
        signal: null,
      } as never);

      assert.ok(callCount >= 2, `Expected retry to occur after 401, but callCount was ${callCount}`);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
