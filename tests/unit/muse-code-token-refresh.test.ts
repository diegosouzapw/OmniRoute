import test from "node:test";
import assert from "node:assert/strict";

import { refreshMuseCodeToken } from "../../open-sse/services/tokenRefresh/providers/museCode.ts";
import {
  getAccessToken,
  refreshMuseCodeToken as reexported,
  supportsTokenRefresh,
} from "../../open-sse/services/tokenRefresh.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("muse-code provider module is exported through the tokenRefresh surface", () => {
  assert.equal(typeof reexported, "function");
  assert.equal(typeof refreshMuseCodeToken, "function");
});

test("supportsTokenRefresh advertises muse-code-oauth but not muse-code", () => {
  assert.equal(supportsTokenRefresh("muse-code-oauth"), true);
  assert.equal(supportsTokenRefresh("muse-code"), false);
});

test("refreshMuseCodeToken re-mints the api key with the OIDC bearer token", async () => {
  let seenUrl: string | undefined;
  let seenInit: RequestInit | undefined;
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    seenUrl = String(url);
    seenInit = init;
    return new Response(
      JSON.stringify({
        api_key: "mc_api_key_123",
        user_email: "user@example.com",
        user_id: "uid-1",
        subs_tier: "pro",
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  const result = await refreshMuseCodeToken("oidc-token-abc", null, null);

  assert.equal(seenUrl, "https://api.meta.ai/muse-code/key");
  assert.equal(seenInit?.method, "POST");
  const headers = seenInit?.headers as Record<string, string>;
  assert.equal(headers.Authorization, "Bearer oidc-token-abc");
  assert.equal(headers["x-api-version"], "1.0.0");
  assert.deepEqual(JSON.parse(String(seenInit?.body)), { show_subs_upsell: false });

  assert.equal(result?.accessToken, "mc_api_key_123");
  assert.equal(result?.refreshToken, "oidc-token-abc");
  assert.equal(result?.providerSpecificData?.user_email, "user@example.com");
  assert.equal(result?.providerSpecificData?.user_id, "uid-1");
  assert.equal(result?.providerSpecificData?.subs_tier, "pro");
});

test("refreshMuseCodeToken returns unrecoverable error on 401 (OIDC dead)", async () => {
  globalThis.fetch = (async () => new Response("unauthorized", { status: 401 })) as typeof fetch;

  const result = await refreshMuseCodeToken("stale-oidc", null, null);

  assert.equal(result?.error, "unrecoverable_refresh_error");
  assert.equal(result?.code, "invalid_oidc_token");
});

test("refreshMuseCodeToken returns null on 429 so the stored api_key is kept", async () => {
  globalThis.fetch = (async () =>
    new Response("rate limited", {
      status: 429,
      headers: { "retry-after": "30" },
    })) as typeof fetch;

  const result = await refreshMuseCodeToken("oidc", null, null);

  assert.equal(result, null);
});

test("dispatch reaches the muse-code refresh by provider id", async () => {
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ api_key: "dispatched_key" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  const result = await getAccessToken("muse-code-oauth", { refreshToken: "oidc", connectionId: null }, null);

  assert.equal(result?.accessToken, "dispatched_key");
  assert.equal(result?.refreshToken, "oidc");
});
