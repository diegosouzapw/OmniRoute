import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  __resetBrowserPoolModOverrideForTesting,
  __resetHttpBackedChatOverrideForTesting,
  __setBrowserPoolModOverrideForTesting,
  __setHttpBackedChatOverrideForTesting,
  tryBackedChat,
} from "../../open-sse/services/browserBackedChat.ts";

// Regression test for the "optional @omniroute/browser-pool package absent"
// path in tryBackedChat(). Before the fix, when the upstream returned a
// challenge response (e.g. 403) and the optional browser-pool package was
// not installed (getMod() resolves to null — the same shape a real failed
// `import("@omniroute/browser-pool")` produces), tryBackedChat() silently
// returned the stale challenge result instead of surfacing a clear error —
// callers (claude-web, duckduckgo-web) would then treat the unsolved
// challenge as a definitive upstream response.
//
// __setBrowserPoolModOverrideForTesting(null) simulates the module-absent
// case deterministically (same as getMod() catching a failed dynamic
// import), without depending on a real failing dynamic import of a
// nonexistent package.
describe("tryBackedChat — optional @omniroute/browser-pool package absent", () => {
  it("throws a descriptive error instead of silently returning the stale challenge response", async () => {
    __setBrowserPoolModOverrideForTesting(null);
    __setHttpBackedChatOverrideForTesting(async () => ({
      status: 403,
      contentType: "text/html",
      body: Buffer.from("<html>Just a moment...</html>"),
      isStealth: true,
      timing: {
        acquireContextMs: 0,
        navigateMs: 0,
        submitMs: 0,
        captureResponseMs: 0,
        totalMs: 0,
      },
    }));

    try {
      await assert.rejects(
        () =>
          tryBackedChat({
            poolKey: "duckduckgo-web",
            chatUrl: "https://duck.ai/duckchat/v1/chat",
            userMessage: "hello",
          }),
        (err: unknown) => {
          assert.ok(err instanceof Error);
          // Must NOT resolve with the stale challenge body — must throw with
          // enough context to diagnose (challenge status + missing package).
          assert.match(err.message, /challenge/i);
          assert.match(err.message, /@omniroute\/browser-pool/);
          assert.match(err.message, /403/);
          return true;
        }
      );
    } finally {
      __resetHttpBackedChatOverrideForTesting();
      __resetBrowserPoolModOverrideForTesting();
    }
  });

  it("returns the httpResult directly when it is not a challenge response (2xx path unaffected)", async () => {
    __setHttpBackedChatOverrideForTesting(async () => ({
      status: 200,
      contentType: "application/json",
      body: Buffer.from(JSON.stringify({ ok: true })),
      isStealth: true,
      timing: {
        acquireContextMs: 0,
        navigateMs: 0,
        submitMs: 0,
        captureResponseMs: 0,
        totalMs: 0,
      },
    }));

    try {
      const result = await tryBackedChat({
        poolKey: "duckduckgo-web",
        chatUrl: "https://duck.ai/duckchat/v1/chat",
        userMessage: "hello",
      });
      assert.equal(result.status, 200);
    } finally {
      __resetHttpBackedChatOverrideForTesting();
    }
  });
});
