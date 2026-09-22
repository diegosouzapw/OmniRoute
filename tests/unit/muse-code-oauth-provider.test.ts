import test from "node:test";
import assert from "node:assert/strict";

import { getProvider } from "../../src/lib/oauth/providers.ts";
import { museCode } from "../../src/lib/oauth/providers/muse-code.ts";

const DEVICE_URL = "https://auth.meta.com/oidc/device/authorization/";
const TOKEN_URL = "https://auth.meta.com/oidc/device/token/";
const MINT_URL = "https://api.meta.ai/muse-code/key";

function withFetch(handler: (url: string, init?: RequestInit) => Response) {
  const original = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) =>
    handler(String(input), init)) as typeof fetch;
  return () => {
    globalThis.fetch = original;
  };
}

test('getProvider("muse-code-oauth") resolves the device-code provider', () => {
  const provider = getProvider("muse-code-oauth");
  assert.equal(provider, museCode);
  assert.equal(provider.flowType, "device_code");
  assert.equal(typeof provider.requestDeviceCode, "function");
  assert.equal(typeof provider.pollToken, "function");
  assert.equal(typeof provider.mapTokens, "function");
});

test("requestDeviceCode returns device_code, user_code and verification_uri", async () => {
  const seen: Array<{ url: string; body: string }> = [];
  const restore = withFetch((url, init) => {
    seen.push({ url, body: String(init?.body ?? "") });
    return new Response(
      JSON.stringify({
        device_code: "dev-abc",
        user_code: "WXYZ-9876",
        verification_uri: "https://auth.meta.com/oidc/device",
        verification_uri_complete: "https://auth.meta.com/oidc/device?user_code=WXYZ-9876",
        expires_in: 600,
        interval: 5,
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  });

  try {
    const result = await museCode.requestDeviceCode(museCode.config);
    assert.equal(seen[0].url, DEVICE_URL);
    assert.match(seen[0].body, /client_id=/);
    assert.equal(result.device_code, "dev-abc");
    assert.equal(result.user_code, "WXYZ-9876");
    assert.equal(result.verification_uri, "https://auth.meta.com/oidc/device");
    assert.equal(result.interval, 5);
    assert.equal(result.expires_in, 600);
  } finally {
    restore();
  }
});

test("pollToken returns success:false while authorization is pending", async () => {
  const seen: Array<{ url: string; body: string }> = [];
  const restore = withFetch((url, init) => {
    seen.push({ url, body: String(init?.body ?? "") });
    return new Response(JSON.stringify({ error: "authorization_pending" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  });

  try {
    const result = await museCode.pollToken(museCode.config, "dev-abc");
    assert.equal(result.ok, false);
    assert.equal(seen[0].url, TOKEN_URL);
    assert.match(seen[0].body, /device_code=dev-abc/);
    // No mint call should happen before the user approves.
    assert.equal(seen.length, 1);
  } finally {
    restore();
  }
});

test("pollToken mints the api key once the OIDC token is granted", async () => {
  const seen: Array<{ url: string; method?: string; auth?: string }> = [];
  const restore = withFetch((url, init) => {
    const headers = (init?.headers ?? {}) as Record<string, string>;
    seen.push({ url, method: init?.method, auth: headers.Authorization });
    if (url === TOKEN_URL) {
      return new Response(
        JSON.stringify({
          access_token: "oidc-access-1",
          refresh_token: "oidc-refresh-1",
          expires_in: 3600,
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({
        api_key: "mc_key_123",
        user_email: "user@example.com",
        user_id: "uid-1",
        subs_tier: "pro",
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  });

  try {
    const result = await museCode.pollToken(museCode.config, "dev-abc");
    assert.equal(result.ok, true);
    assert.equal(result.data.api_key, "mc_key_123");
    assert.equal(result.data.access_token, "oidc-access-1");
    assert.equal(result.data.refresh_token, "oidc-refresh-1");
    assert.equal(result.data.user_email, "user@example.com");
    assert.equal(seen[1].url, MINT_URL);
    assert.equal(seen[1].method, "POST");
    assert.equal(seen[1].auth, "Bearer oidc-access-1");
  } finally {
    restore();
  }
});

test("mapTokens maps api_key to accessToken and OIDC token to refreshToken", () => {
  const mapped = museCode.mapTokens({
    api_key: "mc_key_123",
    access_token: "oidc-access-1",
    expires_in: 3600,
    user_email: "user@example.com",
    user_id: "uid-1",
    subs_tier: "pro",
  });

  assert.equal(mapped.accessToken, "mc_key_123");
  assert.equal(mapped.refreshToken, "oidc-access-1");
  assert.equal(mapped.expiresIn, 3600);
  assert.equal(mapped.email, "user@example.com");
  assert.deepEqual(mapped.providerSpecificData, {
    user_email: "user@example.com",
    user_id: "uid-1",
    subs_tier: "pro",
    base_url: museCode.config.baseUrl,
  });
});
