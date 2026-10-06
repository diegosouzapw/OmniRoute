import assert from "node:assert";
import { test } from "node:test";

// A Google refresh token is bound to the OAuth client that issued it. When an
// operator overrides ANTIGRAVITY_OAUTH_CLIENT_ID/SECRET with their own web
// client, existing connections (issued by the built-in desktop client) must
// keep refreshing against the built-in credentials, and only connections
// created under the custom client should refresh against the custom one.
// Regression: 2026-08-30, switching env credentials globally made every
// existing antigravity/agy refresh return 401 unauthorized_client.
import { getAccessToken } from "../../open-sse/services/tokenRefresh.ts";
import type { GoogleOauthClientMarker } from "../../open-sse/services/tokenRefresh/googleClientBinding.ts";

const CUSTOM_ID = "custom-client-id.apps.googleusercontent.com";

async function captureRefreshCall(
  providerOverridePsd?: { oauthClient?: GoogleOauthClientMarker } & Record<string, unknown>,
  provider = "antigravity"
) {
  const calls = [];
  // refreshGoogleToken reads PROVIDERS[provider].clientId from
  // ../config/constants.ts. The registry resolves the built-in desktop client
  // unless env overrides exist; point the env at the "custom" client so the
  // captured refresh reports which one the code actually used.
  const realId = process.env.ANTIGRAVITY_OAUTH_CLIENT_ID;
  const realSecret = process.env.ANTIGRAVITY_OAUTH_CLIENT_SECRET;
  process.env.ANTIGRAVITY_OAUTH_CLIENT_ID = CUSTOM_ID;
  process.env.ANTIGRAVITY_OAUTH_CLIENT_SECRET = "custom-secret";
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    if (String(url).includes("oauth2.googleapis.com/token")) {
      const body = new URLSearchParams(init.body);
      calls.push({ client_id: body.get("client_id"), client_secret: body.get("client_secret") });
    }
    return {
      ok: true,
      json: async () => ({ access_token: "at", expires_in: 3600, refresh_token: undefined }),
      text: async () => "{}",
    };
  };
  try {
    await getAccessToken(
      provider,
      {
        connectionId: "test-conn",
        refreshToken: "rt",
        accessToken: null,
        providerSpecificData: providerOverridePsd,
      },
      { warn() {}, info() {}, error() {} }
    );
  } finally {
    globalThis.fetch = realFetch;
    if (realId === undefined) delete process.env.ANTIGRAVITY_OAUTH_CLIENT_ID;
    else process.env.ANTIGRAVITY_OAUTH_CLIENT_ID = realId;
    if (realSecret === undefined) delete process.env.ANTIGRAVITY_OAUTH_CLIENT_SECRET;
    else process.env.ANTIGRAVITY_OAUTH_CLIENT_SECRET = realSecret;
  }
  return calls;
}

test("existing connection without oauthClient marker refreshes with the built-in client", async () => {
  const calls = await captureRefreshCall(undefined);
  assert.equal(calls.length, 1);
  // The built-in client is the masked constant decoded at runtime; asserting
  // it is NOT the env-configured custom client is the behavioral contract.
  assert.notEqual(calls[0].client_id, CUSTOM_ID);
  assert.ok(calls[0].client_id.endsWith(".apps.googleusercontent.com"));
});

test("connection marked oauthClient=builtin refreshes with the built-in client", async () => {
  const calls = await captureRefreshCall({ oauthClient: "builtin" });
  assert.equal(calls.length, 1);
  assert.notEqual(calls[0].client_id, CUSTOM_ID);
  assert.ok(calls[0].client_id.endsWith(".apps.googleusercontent.com"));
});

test("connection marked oauthClient=custom:<id> matching the configured client refreshes with it", async () => {
  const calls = await captureRefreshCall({ oauthClient: `custom:${CUSTOM_ID}` });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].client_id, CUSTOM_ID);
});

test("custom-marked connection falls back to builtin after the operator rotates the custom client", async () => {
  // The marker stores the LITERAL issuing client id. When the operator swaps
  // to a different custom client, the old connection's token belongs to a
  // client neither the env nor the embedded default can represent — the
  // builtin fallback is chosen (and the refresh will fail with 401, which is
  // the honest outcome: that connection needs re-authorization).
  const calls = await captureRefreshCall({ oauthClient: "custom:rotated-away-id.apps.googleusercontent.com" });
  assert.equal(calls.length, 1);
  assert.notEqual(calls[0].client_id, CUSTOM_ID);
  assert.ok(calls[0].client_id.endsWith(".apps.googleusercontent.com"));
});

test("gemini connection without a marker refreshes with the gemini builtin client", async () => {
  // gemini embeds a DIFFERENT desktop client than antigravity; the fallback
  // must be keyed by provider or every pre-existing gemini connection would
  // suddenly refresh against the antigravity client (401 unauthorized_client).
  // This also exercises the env-override interplay verified live: with
  // GEMINI_OAUTH_CLIENT_ID set to a custom client, an unmarked gemini
  // connection still refreshes against the gemini builtin.
  const realGeminiId = process.env.GEMINI_OAUTH_CLIENT_ID;
  const realGeminiSecret = process.env.GEMINI_OAUTH_CLIENT_SECRET;
  process.env.GEMINI_OAUTH_CLIENT_ID = "fake-custom-gemini-id.apps.googleusercontent.com";
  process.env.GEMINI_OAUTH_CLIENT_SECRET = "fake-secret";
  try {
    const calls = await captureRefreshCall(undefined, "gemini");
    assert.equal(calls.length, 1);
    assert.notEqual(calls[0].client_id, "fake-custom-gemini-id.apps.googleusercontent.com");
    assert.ok(calls[0].client_id.endsWith(".apps.googleusercontent.com"));
    const agyCalls = await captureRefreshCall(undefined, "antigravity");
    assert.notEqual(calls[0].client_id, agyCalls[0].client_id, "gemini and antigravity built-ins differ");
  } finally {
    if (realGeminiId === undefined) delete process.env.GEMINI_OAUTH_CLIENT_ID;
    else process.env.GEMINI_OAUTH_CLIENT_ID = realGeminiId;
    if (realGeminiSecret === undefined) delete process.env.GEMINI_OAUTH_CLIENT_SECRET;
    else process.env.GEMINI_OAUTH_CLIENT_SECRET = realGeminiSecret;
  }
});
