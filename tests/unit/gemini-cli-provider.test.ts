import test from "node:test";
import assert from "node:assert/strict";

const tokenRefresh = await import("../../open-sse/services/tokenRefresh.ts");
const { PROVIDERS: LEGACY_PROVIDERS, OAUTH_ENDPOINTS } =
  await import("../../open-sse/config/constants.ts");
const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");

const { supportsTokenRefresh, REFRESH_LEAD_MS, getAccessToken } = tokenRefresh;

type TestFetch = typeof fetch;
type FetchCall = { url: string; options: RequestInit };

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function bodyToString(body: BodyInit | null | undefined) {
  if (typeof body === "string") return body;
  if (body instanceof URLSearchParams) return body.toString();
  return String(body ?? "");
}

async function withMockedFetch<TResult>(fetchImpl: TestFetch, fn: () => Promise<TResult>) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = fetchImpl;
  try {
    return await fn();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function createLog() {
  return {
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
  };
}

// ─── Regression tests for the two-gap gemini-cli refresh bug ────────────────
//
// Root cause (both gaps had to be fixed together):
//   1. supportsTokenRefresh() gated on a hardcoded id allow-set that had
//      "gemini" but not "gemini-cli" (the id actually stored on gemini-cli
//      OAuth connections), and its PROVIDERS[e].tokenUrl fallback also
//      failed because...
//   2. ...the OAuth PROVIDERS registry had NO entry at all for "gemini-cli"
//      — no clientId/clientSecret/tokenUrl/refreshUrl — so even a provider
//      that reached the generic refresh path had nothing to refresh with.
//
// Together this meant the proactive health-check scheduler permanently
// skipped gemini-cli connections ("[HealthCheck] Skipping gemini-cli/...
// (refresh unsupported)") until the access token expired and the account
// went dark, forcing a full re-authentication even though the stored
// refresh_token was perfectly valid.

test("gemini-cli is registered in the OAuth PROVIDERS registry with Google refresh credentials", () => {
  const entry = REGISTRY["gemini-cli"];
  assert.ok(entry, "REGISTRY['gemini-cli'] must exist");
  assert.equal(entry.authType, "oauth");

  const legacy = LEGACY_PROVIDERS["gemini-cli"];
  assert.ok(legacy, "LEGACY_PROVIDERS['gemini-cli'] must exist");
  assert.ok(legacy.clientId, "gemini-cli must have a clientId");
  assert.ok(legacy.clientSecret, "gemini-cli must have a clientSecret");
  assert.equal(legacy.tokenUrl, "https://oauth2.googleapis.com/token");
  assert.equal(legacy.refreshUrl, "https://oauth2.googleapis.com/token");

  // Same well-known public Gemini CLI OAuth client as the Gemini Studio
  // provider's own (previously unused-for-refresh) oauth block — not a new
  // embedded secret.
  assert.equal(legacy.clientId, LEGACY_PROVIDERS.gemini.clientId);
  assert.equal(legacy.clientSecret, LEGACY_PROVIDERS.gemini.clientSecret);
  assert.equal(
    legacy.clientId,
    "681255809395-oo8ft2oprdrnp9e3aqf6av3hmdib135j.apps.googleusercontent.com"
  );
});

test("supportsTokenRefresh('gemini-cli') is true (both the explicit allow-set and the PROVIDERS fallback)", () => {
  assert.equal(supportsTokenRefresh("gemini-cli"), true);
  // Sanity: still false for a random unregistered id.
  assert.equal(supportsTokenRefresh("gemini-cli-typo"), false);
});

test("gemini-cli gets the same 15-minute proactive refresh lead as antigravity/agy (non-rotating Google tokens)", () => {
  assert.equal(REFRESH_LEAD_MS["gemini-cli"], REFRESH_LEAD_MS.antigravity);
  assert.equal(REFRESH_LEAD_MS["gemini-cli"], REFRESH_LEAD_MS.agy);
});

test("getAccessToken('gemini-cli', ...) performs a real grant_type=refresh_token exchange against Google's token endpoint", async () => {
  const log = createLog();
  const calls: FetchCall[] = [];

  const result = await withMockedFetch(
    async (url, options: RequestInit = {}) => {
      calls.push({ url: String(url), options });
      return jsonResponse({
        access_token: "gemini-cli-access-new",
        refresh_token: "gemini-cli-refresh-new",
        expires_in: 3600,
      });
    },
    async () => getAccessToken("gemini-cli", { refreshToken: "gemini-cli-refresh-old" }, log)
  );

  assert.equal(calls.length, 1, "must hit the network exactly once");
  assert.equal(calls[0].url, OAUTH_ENDPOINTS.google.token);
  assert.equal(calls[0].url, "https://oauth2.googleapis.com/token");

  const sentBody = bodyToString(calls[0].options.body);
  assert.match(sentBody, /grant_type=refresh_token/);
  assert.match(sentBody, /refresh_token=gemini-cli-refresh-old/);
  assert.ok(
    sentBody.includes(`client_id=${encodeURIComponent(LEGACY_PROVIDERS["gemini-cli"].clientId)}`),
    "must send the gemini-cli client_id"
  );
  assert.ok(sentBody.includes("client_secret="), "must send client_secret");

  assert.deepEqual(result, {
    accessToken: "gemini-cli-access-new",
    refreshToken: "gemini-cli-refresh-new",
    expiresIn: 3600,
  });
});

test("getAccessToken('gemini-cli', ...) surfaces an unrecoverable error on invalid_grant (revoked/expired refresh token) instead of looping forever", async () => {
  const log = createLog();

  const result = await withMockedFetch(
    async () =>
      new Response(JSON.stringify({ error: "invalid_grant" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      }),
    async () => getAccessToken("gemini-cli", { refreshToken: "revoked-refresh-token" }, log)
  );

  assert.deepEqual(result, { error: "unrecoverable_refresh_error", code: "invalid_grant" });
});
