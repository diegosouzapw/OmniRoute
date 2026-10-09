/**
 * Muse Code (Meta) device OAuth — CLIProxyAPI parity.
 *
 * Device grant at auth.meta.com, mint at api.meta.ai/muse-code/key,
 * persist dca + minted key, remint on 401 / DCA-only records.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { OAUTH_PROVIDERS, supportsDualAuthProvider } from "../../src/shared/constants/providers.ts";
import { MUSE_CODE_CONFIG } from "../../src/lib/oauth/constants/oauth.ts";
import { museCode } from "../../src/lib/oauth/providers/muse-code.ts";
import {
  MUSE_CODE_DEVICE_GRANT,
  MUSE_CODE_MINT_URL,
  MUSE_CODE_USER_AGENT,
  isMuseDcaToken,
  normalizeMuseBaseUrl,
} from "../../open-sse/config/museCode.ts";
import { mintMuseApiKey } from "../../open-sse/services/museCodeAuth.ts";
import { refreshMuseCodeToken } from "../../open-sse/services/tokenRefresh/providers/museCode.ts";
import { supportsTokenRefresh } from "../../open-sse/services/tokenRefresh.ts";
import { parseDetailedRetryHintFromJsonBody } from "../../open-sse/services/retryAfterJson.ts";
import { resolvePublicCred } from "../../open-sse/utils/publicCreds.ts";
import { CLIPROXY_TYPE_TO_PROVIDER } from "../../src/lib/oauth/utils/cliProxyAuthImport.ts";
import { muse_codeProvider } from "../../open-sse/config/providers/registry/muse-code/index.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("muse-code is a dual-auth OAuth catalog provider", () => {
  assert.equal(supportsDualAuthProvider("muse-code"), true);
  assert.equal(OAUTH_PROVIDERS["muse-code"]?.id, "muse-code");
  assert.equal(OAUTH_PROVIDERS["muse-code"]?.alias, "mc");
  assert.equal(museCode.flowType, "device_code");
  assert.equal(CLIPROXY_TYPE_TO_PROVIDER.meta, "muse-code");
});

test("public Muse CLI client id is resolved through resolvePublicCred", () => {
  const clientId = resolvePublicCred("muse_id", "MUSE_CODE_OAUTH_CLIENT_ID");
  assert.equal(clientId, MUSE_CODE_CONFIG.clientId);
  assert.match(clientId, /^\d+$/);
  assert.equal(clientId.length > 10, true);
});

test("isMuseDcaToken and normalizeMuseBaseUrl match CLIProxyAPI helpers", () => {
  assert.equal(isMuseDcaToken("dca:abc"), true);
  assert.equal(isMuseDcaToken("  dca:abc  "), true);
  assert.equal(isMuseDcaToken("LLM|key"), false);
  assert.equal(normalizeMuseBaseUrl(""), "https://api.meta.ai/v1");
  assert.equal(normalizeMuseBaseUrl("https://api.meta.ai/v1/"), "https://api.meta.ai/v1");
});

test("mintMuseApiKey posts dca_token with Bearer + muse-code UA", async () => {
  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), MUSE_CODE_MINT_URL);
    const headers = init.headers as Record<string, string>;
    assert.equal(headers.Authorization, "Bearer dca:login");
    assert.equal(headers["User-Agent"], MUSE_CODE_USER_AGENT);
    assert.deepEqual(JSON.parse(String(init.body)), { dca_token: "dca:login" });
    return new Response(
      JSON.stringify({
        api_key: "LLM|k",
        base_url: "https://api.meta.ai/v1/",
        user_email: "a@b.com",
        has_payment_method: true,
        require_payment: false,
        can_subscribe: true,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  const minted = await mintMuseApiKey("dca:login");
  assert.equal(minted.apiKey, "LLM|k");
  assert.equal(minted.baseUrl, "https://api.meta.ai/v1");
  assert.equal(minted.hasPaymentMethod, true);
  assert.equal(minted.requirePayment, false);
  assert.equal(minted.canSubscribe, true);
});

test("postExchange keeps the dca token when mint fails (CLIProxyAPI best-effort)", async () => {
  globalThis.fetch = async () =>
    new Response("nope", { status: 500, headers: { "Content-Type": "text/plain" } });

  const extra = await museCode.postExchange({ access_token: "dca:still-valid" });
  assert.equal(extra.dcaToken, "dca:still-valid");
  assert.equal(extra.minted, undefined);

  const mapped = museCode.mapTokens({ access_token: "dca:still-valid", expires_in: 60 }, extra);
  assert.equal(mapped.accessToken, "dca:still-valid");
  assert.equal(mapped.refreshToken, "dca:still-valid");
  assert.equal(mapped.expiresIn, 60);
});

test("mapTokens does not copy DCA expiry onto a minted inference key", () => {
  const mapped = museCode.mapTokens(
    { access_token: "dca:login", expires_in: 1800, token_type: "Bearer" },
    {
      dcaToken: "dca:login",
      minted: {
        apiKey: "LLM|k",
        baseUrl: "https://api.meta.ai/v1",
        email: "a@b.com",
        name: "A",
        isSubsActive: true,
      },
    }
  );
  assert.equal(mapped.accessToken, "LLM|k");
  assert.equal(mapped.refreshToken, "dca:login");
  assert.equal(mapped.expiresIn, undefined);
  assert.equal(mapped.providerSpecificData.dcaToken, "dca:login");
});

test("supportsTokenRefresh includes the muse-code remint path", () => {
  assert.equal(supportsTokenRefresh("muse-code"), true);
});

test("refreshMuseCodeToken remints from providerSpecificData.dcaToken", async () => {
  globalThis.fetch = async (_url, init = {}) => {
    assert.equal((init.headers as Record<string, string>).Authorization, "Bearer dca:from-data");
    return new Response(
      JSON.stringify({ api_key: "LLM|new", base_url: "https://api.meta.ai/v1" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  const result = await refreshMuseCodeToken("not-a-dca", { dcaToken: "dca:from-data" }, null);
  assert.equal(result?.accessToken, "LLM|new");
  assert.equal(result?.refreshToken, "dca:from-data");
});

test("429 subscription quota error.resets_at is parsed as a cooldown", () => {
  const resetEpoch = Math.floor(Date.now() / 1000) + 3600;
  const hint = parseDetailedRetryHintFromJsonBody(
    JSON.stringify({
      error: {
        code: "rate_limit_exceeded",
        message: "Subscription quota exhausted. Please try again later.",
        resets_at: resetEpoch,
        type: "rate_limit_error",
      },
    }),
    30 * 24 * 60 * 60 * 1000
  );
  assert.ok(hint);
  assert.ok(hint.retryAfterMs > 3_000_000);
  assert.ok(hint.retryAfterMs <= 3600_000);
});

test("curated catalog includes Muse Spark subscription models", () => {
  const ids = muse_codeProvider.models.map((model) => model.id);
  for (const id of [
    "muse-spark-1.3",
    "muse-spark-1.3-contributor",
    "muse-spark-1.2",
    "muse-spark-1.2-contributor",
    "muse-spark-1.1",
    "llama-4-maverick",
  ]) {
    assert.ok(ids.includes(id), `missing ${id}`);
  }
  assert.equal(museCode.config.mintUrl, MUSE_CODE_MINT_URL);
  assert.equal(MUSE_CODE_DEVICE_GRANT, "urn:ietf:params:oauth:grant-type:device_code");
});

// ── #14267: device-flow input sanitization ────────────────────────────────────

function mockDeviceGrant(payload: Record<string, unknown>, status = 200) {
  globalThis.fetch = async () =>
    new Response(JSON.stringify(payload), {
      status,
      headers: { "Content-Type": "application/json" },
    });
}

const VALID_GRANT = {
  device_code: "dev-1",
  user_code: "USER-1",
  verification_uri: "https://auth.meta.com/oauth/device/",
  verification_uri_complete: "https://auth.meta.com/oauth/device/?user_code=USER-1",
  expires_in: 600,
  interval: 5,
};

test("#14267 requestDeviceCode accepts a pinned auth.meta.com authorization URL", async () => {
  mockDeviceGrant(VALID_GRANT);
  const grant = await museCode.requestDeviceCode(MUSE_CODE_CONFIG);
  assert.equal(grant.device_code, "dev-1");
  assert.equal(grant.verification_uri_complete, VALID_GRANT.verification_uri_complete);
});

test("#14267 requestDeviceCode rejects an off-origin authorization URL", async () => {
  mockDeviceGrant({
    ...VALID_GRANT,
    verification_uri_complete: "https://evil.example.com/device/?user_code=USER-1",
  });
  // The device-response validation now lives in museCodeDeviceResponse.ts (#15869), which
  // reports every rejected authorization URL (off-origin or with credentials) as invalid.
  await assert.rejects(
    () => museCode.requestDeviceCode(MUSE_CODE_CONFIG),
    /invalid authorization URL/
  );
});

test("#14267 requestDeviceCode rejects embedded credentials in the authorization URL", async () => {
  mockDeviceGrant({
    ...VALID_GRANT,
    verification_uri_complete: "https://user:pass@auth.meta.com/oauth/device/",
  });
  // The device-response validation now lives in museCodeDeviceResponse.ts (#15869), which
  // reports every rejected authorization URL (off-origin or with credentials) as invalid.
  await assert.rejects(
    () => museCode.requestDeviceCode(MUSE_CODE_CONFIG),
    /invalid authorization URL/
  );
});

test("#14267 requestDeviceCode rejects a device code expiry beyond 24h", async () => {
  mockDeviceGrant({ ...VALID_GRANT, expires_in: 100000 });
  await assert.rejects(
    () => museCode.requestDeviceCode(MUSE_CODE_CONFIG),
    /invalid device code expiry/
  );
});

test("#14267 pollToken maps pending codes to fixed messages, discarding upstream text", async () => {
  mockDeviceGrant(
    { error: "authorization_pending", error_description: "free-text with dca:secret" },
    400
  );
  const pending = await museCode.pollToken(MUSE_CODE_CONFIG, "dev-1");
  assert.equal(pending.ok, false);
  assert.deepEqual(pending.data, {
    error: "authorization_pending",
    error_description: "Authorization pending.",
  });
});

test("#14267 pollToken maps unknown errors to invalid_response", async () => {
  mockDeviceGrant({ error: "weird_new_code", error_description: "upstream free text" }, 400);
  const result = await museCode.pollToken(MUSE_CODE_CONFIG, "dev-1");
  assert.deepEqual(result.data, { error: "invalid_response" });
});

test("#14267 pollToken allowlists success fields", async () => {
  mockDeviceGrant({
    access_token: "dca:abc",
    expires_in: 1800,
    token_type: "Bearer",
    scope: "should-drop",
    refresh_token: "should-drop",
  });
  const result = await museCode.pollToken(MUSE_CODE_CONFIG, "dev-1");
  assert.equal(result.ok, true);
  assert.deepEqual(result.data, {
    access_token: "dca:abc",
    expires_in: 1800,
    token_type: "Bearer",
  });
});

test("#14267 pollToken reports network_error on transport failure", async () => {
  globalThis.fetch = async () => {
    throw new TypeError("fetch failed");
  };
  const result = await museCode.pollToken(MUSE_CODE_CONFIG, "dev-1");
  assert.deepEqual(result, { ok: false, data: { error: "network_error" } });
});

// ── #14138: mint-failure contract ─────────────────────────────────────────────

test("#14138 refreshMuseCodeToken forces re-login on mint 401 (dead OIDC)", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  const result = await refreshMuseCodeToken("dca:dead", null, null);
  assert.deepEqual(result, { error: "unrecoverable_refresh_error", code: "invalid_oidc_token" });
});

test("#14138 refreshMuseCodeToken keeps the stored key on mint 429 (transient)", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "slow down" }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  const result = await refreshMuseCodeToken("dca:live", null, null);
  assert.equal(result, null);
});

test("#14138 refreshMuseCodeToken forces re-login when no DCA token is stored", async () => {
  const result = await refreshMuseCodeToken("not-a-dca", null, null);
  assert.deepEqual(result, { error: "unrecoverable_refresh_error", code: "no_refresh_token" });
});
