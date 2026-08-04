import test from "node:test";
import assert from "node:assert/strict";

// xai-oauth was grandfathered without OAUTH_TEST_CONFIG (#8408), so dashboard
// "Test Connection" always returned "Provider test not supported" and stored
// testStatus=error on a working OAuth account. Mirror grok-cli #7610 coverage.
const { testOAuthConnection } = await import("../../src/app/api/providers/[id]/test/route.ts");
const { OAUTH_TEST_CONFIG } =
  await import("../../src/app/api/providers/[id]/test/oauthTestConfig.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("OAUTH_TEST_CONFIG covers xai-oauth and alias xao", () => {
  assert.ok((OAUTH_TEST_CONFIG as Record<string, unknown>)["xai-oauth"]);
  assert.ok((OAUTH_TEST_CONFIG as Record<string, unknown>).xao);
});

test("xai-oauth Test Connection is no longer unsupported", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  const result = await testOAuthConnection({
    provider: "xai-oauth",
    accessToken: "healthy-access-token",
    refreshToken: "healthy-refresh-token",
    tokenExpiresAt: new Date(Date.now() + 3600_000).toISOString(),
  });

  assert.notEqual(result.diagnosis?.type, "unsupported");
  assert.notEqual(result.error, "Provider test not supported");
  assert.equal(result.valid, true);
});

test("xao alias Test Connection uses the same probe", async () => {
  let calledUrl = "";
  globalThis.fetch = async (url) => {
    calledUrl = String(url);
    return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
  };

  const result = await testOAuthConnection({
    provider: "xao",
    accessToken: "healthy-access-token",
    tokenExpiresAt: new Date(Date.now() + 3600_000).toISOString(),
  });

  assert.equal(result.valid, true);
  assert.equal(calledUrl, "https://api.x.ai/v1/chat/completions");
});
