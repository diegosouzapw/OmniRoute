import { test } from "node:test";
import assert from "node:assert/strict";
import { GrokCliExecutor } from "../../open-sse/executors/grok-cli.ts";
import type { ExecuteInput, ExecutorLog, ProviderCredentials } from "../../open-sse/executors/base.ts";

type TestableGrokCliExecutor = {
  execute: (input: ExecuteInput) => Promise<{ response: Response }>;
  refreshCredentials: (
    credentials: ProviderCredentials,
    log?: ExecutorLog | null
  ) => Promise<Partial<ProviderCredentials> | null>;
  nativePost: (
    url: string,
    headers: Record<string, string>,
    bodyStr: string,
    signal?: AbortSignal | null
  ) => Promise<Response>;
};

test("GrokCliExecutor.execute() proactively refreshes an expired access token (#7610)", async () => {
  const executor = new GrokCliExecutor() as unknown as TestableGrokCliExecutor;

  // Stub the real network call (nativeHttpsPost → auth.x.ai) so the test never
  // touches the network — only the wiring (does execute() call
  // refreshCredentials() at all, and does the refreshed token reach the
  // outgoing Authorization header) is under test here.
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
  executor.nativePost = async (_url, headers) => {
    capturedHeaders = headers;
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  };

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
  assert.notEqual(capturedHeaders?.["Authorization"], "Bearer STALE_ACCESS_TOKEN");
  assert.equal(capturedHeaders?.["Authorization"], "Bearer FRESH_ACCESS_TOKEN");
});
