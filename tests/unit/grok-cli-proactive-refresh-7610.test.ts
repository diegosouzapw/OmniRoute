import { test } from "node:test";
import assert from "node:assert/strict";
import { GrokCliExecutor } from "../../open-sse/executors/grok-cli.ts";
import type { ExecuteInput, ProviderCredentials } from "../../open-sse/executors/base.ts";

test("GrokCliExecutor.execute() proactively refreshes an expired access token (#7610)", async () => {
  const executor = new GrokCliExecutor();

  // #7358 moved grok-cli off the raw https.request()/nativePost dispatch onto the
  // shared fetch-based BaseExecutor.execute() path (buildUrl/buildHeaders only) —
  // which already runs the same proactive-refresh gate generically (base.ts:600).
  // Stub refreshCredentials() (the network call to auth.x.ai) and global fetch (the
  // upstream Grok Build call) so only the wiring is under test: does execute() call
  // refreshCredentials() before dispatch, and does the refreshed token reach the
  // outgoing Authorization header.
  let refreshCalled = false;
  executor.refreshCredentials = async () => {
    refreshCalled = true;
    return {
      accessToken: "FRESH_ACCESS_TOKEN",
      refreshToken: "rotated-refresh-token",
      expiresAt: new Date(Date.now() + 3600_000).toISOString(),
    };
  };

  let capturedHeaders: Record<string, string> | null = null;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (_url: string, init: RequestInit = {}) => {
    capturedHeaders = Object.fromEntries(
      new Headers(init.headers as HeadersInit).entries()
    ) as Record<string, string>;
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }) as typeof fetch;

  try {
    const expiredAt = new Date(Date.now() - 60_000).toISOString();
    const credentials: ProviderCredentials = {
      accessToken: "STALE_ACCESS_TOKEN",
      refreshToken: "valid-refresh-token",
      expiresAt: expiredAt,
    };

    await executor.execute({
      model: "grok-composer-2.5-fast",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials,
    } as ExecuteInput);

    assert.equal(
      refreshCalled,
      true,
      "expected GrokCliExecutor.execute() to proactively call refreshCredentials()"
    );
    assert.notEqual(capturedHeaders?.["authorization"], "Bearer STALE_ACCESS_TOKEN");
    assert.equal(capturedHeaders?.["authorization"], "Bearer FRESH_ACCESS_TOKEN");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
