// Characterization tests — src/lib/oauth (rail 3.8.55, Task 12 "caracterização B").
//
// src/lib/oauth is the subsystem most coupled to open-sse (~20 of its files import it). This
// file pins its public facade (providers.ts), the provider registry (ids + flow types), the
// OAuth constants surface, the resolvePublicCred() wiring of the embedded public client ids
// (Hard Rule #11 — values are asserted by SHAPE and by identity with resolvePublicCred, never
// as literals), one provider's auth-url + code-exchange flow and the Kiro refresh flow with a
// fake fetch. No real network is touched. Current behavior that looks wrong is pinned under
// `characterization: … currently …`.
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import "../_setup/isolateDataDir.ts";

process.env.DISABLE_SQLITE_AUTO_BACKUP ||= "true";
for (const name of [
  "CLAUDE_OAUTH_CLIENT_ID",
  "CODEX_OAUTH_CLIENT_ID",
  "GITHUB_OAUTH_CLIENT_ID",
  "ANTIGRAVITY_OAUTH_CLIENT_ID",
  "ANTIGRAVITY_OAUTH_CLIENT_SECRET",
]) {
  delete process.env[name];
}

const core = await import("../../src/lib/db/core.ts");
const facade = await import("../../src/lib/oauth/providers.ts");
const registry = await import("../../src/lib/oauth/providers/index.ts");
const constants = await import("../../src/lib/oauth/constants/oauth.ts");
const oauthConfig = await import("../../src/lib/oauth/config/index.ts");
const { KiroService } = await import("../../src/lib/oauth/services/kiro.ts");
const { resolvePublicCred } = await import("../../open-sse/utils/publicCreds.ts");

type FetchCall = { url: string; init: RequestInit | undefined };

/** Install a scripted fetch; each call shifts the next response off the queue. */
function installFetch(responses: Array<() => Response>) {
  const calls: FetchCall[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({ url: String(input), init });
    const next = responses.shift();
    if (!next) throw new Error(`unexpected fetch: ${String(input)}`);
    return next();
  }) as typeof fetch;
  return {
    calls,
    restore: () => {
      globalThis.fetch = original;
    },
  };
}

const json =
  (body: unknown, status = 200) =>
  () =>
    new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
const text = (body: string, status: number) => () => new Response(body, { status });

test.after(() => {
  core.resetDbInstance();
});

// ─── (a) Public surface snapshot ─────────────────────────────────────────────

test("oauth facade (src/lib/oauth/providers.ts) exports exactly this surface", () => {
  assert.deepEqual(Object.keys(facade).sort(), [
    "exchangeTokens",
    "finalizeTokens",
    "generateAuthData",
    "getProvider",
    "pollForToken",
    "requestDeviceCode",
    "resolveBrowserOAuthRedirectUri",
  ]);
  assert.deepEqual(Object.keys(registry).sort(), ["PROVIDERS", "default"]);
  assert.equal(registry.default, registry.PROVIDERS);
  assert.deepEqual(Object.keys(oauthConfig).sort(), ["getServerCredentials"]);
});

test("oauth constants (src/lib/oauth/constants/oauth.ts) export exactly this surface", () => {
  assert.deepEqual(Object.keys(constants).sort(), [
    "AGY_CONFIG",
    "ANTIGRAVITY_CONFIG",
    "AWS_REGION_PATTERN",
    "CLAUDE_CONFIG",
    "CLINE_CONFIG",
    "CODEBUDDY_CN_CONFIG",
    "CODEBUDDY_CN_USER_AGENT",
    "CODEBUDDY_INTL_CONFIG",
    "CODEX_CONFIG",
    "CURSOR_CONFIG",
    "DEVIN_DESKTOP_CONFIG",
    "GHE_COPILOT_CONFIG",
    "GITHUB_CONFIG",
    "GITLAB_DUO_CONFIG",
    "GROK_BUILD_OAUTH_CONFIG",
    "GROK_CLI_CONFIG",
    "KILOCODE_CONFIG",
    "KIMI_CODING_CONFIG",
    "KIRO_CONFIG",
    "MUSE_CODE_CONFIG",
    "OAUTH_TIMEOUT",
    "OPENAI_CONFIG",
    "OPENFERENCE_CONFIG",
    "PROVIDERS",
    "QODER_CONFIG",
    "TRAE_CONFIG",
    "WORKBUDDY_CONFIG",
    "XAI_OAUTH_CONFIG",
    "ZED_CONFIG",
    "ZED_HOSTED_CONFIG",
    "assertValidAwsRegion",
  ]);
});

test("OAuth provider registry: ids and flow types", () => {
  const flows = Object.fromEntries(
    Object.entries(registry.PROVIDERS).map(([id, p]) => [id, (p as { flowType: string }).flowType])
  );
  assert.deepEqual(flows, {
    claude: "authorization_code_pkce",
    codex: "authorization_code_pkce",
    antigravity: "authorization_code",
    agy: "authorization_code",
    qoder: "authorization_code",
    "kimi-coding": "device_code",
    github: "device_code",
    "ghe-copilot": "device_code",
    "gitlab-duo": "authorization_code_pkce",
    kiro: "device_code",
    "amazon-q": "device_code",
    cursor: "import_token",
    trae: "import_token",
    kilocode: "device_code",
    cline: "authorization_code",
    clinepass: "authorization_code",
    "devin-desktop": "import_token",
    "devin-cli": "import_token",
    "grok-cli": "device_code",
    "xai-oauth": "authorization_code_pkce",
    openference: "authorization_code_pkce",
    "codebuddy-cn": "device_code",
    "codebuddy-intl": "device_code",
    workbuddy: "device_code",
    zed: "import_token",
    "zed-hosted": "authorization_code",
    "muse-code": "device_code",
  });
  // Aliases share the same module object.
  assert.equal(registry.PROVIDERS["amazon-q"], registry.PROVIDERS.kiro);
  assert.equal(registry.PROVIDERS.clinepass, registry.PROVIDERS.cline);
  assert.equal(registry.PROVIDERS["devin-cli"], registry.PROVIDERS["devin-desktop"]);
  // Every provider exposes config + mapTokens.
  for (const [id, p] of Object.entries(registry.PROVIDERS)) {
    const provider = p as { config: unknown; mapTokens: unknown };
    assert.ok(provider.config && typeof provider.config === "object", `${id}.config`);
    assert.equal(typeof provider.mapTokens, "function", `${id}.mapTokens`);
  }
});

// ─── (b) resolvePublicCred wiring + provider config ──────────────────────────

test("embedded public client ids are wired through resolvePublicCred (shape + identity)", () => {
  assert.equal(constants.CLAUDE_CONFIG.clientId, resolvePublicCred("claude_id"));
  assert.match(
    constants.CLAUDE_CONFIG.clientId,
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
  );
  assert.equal(constants.CODEX_CONFIG.clientId, resolvePublicCred("codex_id"));
  assert.match(constants.CODEX_CONFIG.clientId, /^app_[A-Za-z0-9]+$/);
  assert.equal(constants.GITHUB_CONFIG.clientId, resolvePublicCred("github_copilot_id"));
  assert.equal(constants.ANTIGRAVITY_CONFIG.clientId, resolvePublicCred("antigravity_id"));
  assert.match(constants.ANTIGRAVITY_CONFIG.clientId, /\.apps\.googleusercontent\.com$/);
  assert.equal(constants.ANTIGRAVITY_CONFIG.clientSecret, resolvePublicCred("antigravity_alt"));
  assert.match(constants.ANTIGRAVITY_CONFIG.clientSecret, /^GOCSPX-/);
});

test("resolvePublicCred: a non-empty env override wins over the embedded default", () => {
  process.env.CHAR_OAUTH_CLIENT_OVERRIDE = "  custom-client-id  ";
  try {
    assert.equal(resolvePublicCred("claude_id", "CHAR_OAUTH_CLIENT_OVERRIDE"), "custom-client-id");
  } finally {
    delete process.env.CHAR_OAUTH_CLIENT_OVERRIDE;
  }
  process.env.CHAR_OAUTH_CLIENT_OVERRIDE = "   ";
  try {
    assert.equal(
      resolvePublicCred("claude_id", "CHAR_OAUTH_CLIENT_OVERRIDE"),
      resolvePublicCred("claude_id")
    );
  } finally {
    delete process.env.CHAR_OAUTH_CLIENT_OVERRIDE;
  }
});

test("CLAUDE_CONFIG shape", () => {
  const cfg = constants.CLAUDE_CONFIG;
  assert.deepEqual(Object.keys(cfg).sort(), [
    "authorizeUrl",
    "clientId",
    "codeChallengeMethod",
    "redirectUri",
    "scopes",
    "tokenUrl",
  ]);
  assert.equal(cfg.authorizeUrl, "https://claude.ai/oauth/authorize");
  assert.equal(cfg.tokenUrl, "https://api.anthropic.com/v1/oauth/token");
  assert.equal(cfg.codeChallengeMethod, "S256");
  assert.ok(cfg.scopes.includes("user:inference"));
});

test("generateAuthData(claude): PKCE S256 auth URL against the provider's fixed redirect", () => {
  const data = facade.generateAuthData("claude", "http://localhost:20128/callback");
  const url = new URL(data.authUrl as string);
  const params = url.searchParams;

  assert.equal(`${url.origin}${url.pathname}`, constants.CLAUDE_CONFIG.authorizeUrl);
  assert.equal(params.get("client_id"), constants.CLAUDE_CONFIG.clientId);
  assert.equal(params.get("response_type"), "code");
  assert.equal(params.get("code_challenge_method"), "S256");
  assert.equal(params.get("prompt"), "login");
  assert.equal(params.get("state"), data.state);
  assert.equal(params.get("code_challenge"), data.codeChallenge);
  assert.equal(
    data.codeChallenge,
    createHash("sha256")
      .update(data.codeVerifier as string)
      .digest("base64url")
  );
  // Claude uses its own hosted callback in the URL; the caller's redirect is echoed back.
  assert.equal(params.get("redirect_uri"), constants.CLAUDE_CONFIG.redirectUri);
  assert.equal(data.redirectUri, "http://localhost:20128/callback");
  assert.equal(data.flowType, "authorization_code_pkce");
  assert.equal(data.callbackPath, "/callback");
  assert.equal(data.callbackHost, "localhost");
});

test("generateAuthData for an import-token provider reports supported:false without an auth URL", () => {
  const data = facade.generateAuthData("cursor", "http://localhost:20128/callback");
  assert.equal(data.supported, false);
  assert.equal(data.authUrl, undefined);
  assert.equal(data.flowType, "import_token");
  assert.equal(
    data.error,
    "Browser login is disabled for cursor. Use the import-token flow instead."
  );
});

test("exchangeTokens(claude): code#state split, token POST, bootstrap enrichment, mapped tokens", async () => {
  const fetchMock = installFetch([
    json({
      access_token: "at-1",
      refresh_token: "rt-1",
      expires_in: 3600,
      scope: "user:inference",
    }),
    json({
      oauth_account: {
        account_uuid: "acct-1",
        account_email: "dev@example.com",
        organization_uuid: "org-1",
        organization_name: "Org",
      },
    }),
  ]);
  try {
    const tokens = await facade.exchangeTokens(
      "claude",
      "the-code#code-state",
      "http://localhost:20128/callback",
      "verifier-1",
      "outer-state"
    );

    assert.equal(fetchMock.calls[0].url, constants.CLAUDE_CONFIG.tokenUrl);
    assert.equal(fetchMock.calls[0].init?.method, "POST");
    assert.deepEqual(JSON.parse(String(fetchMock.calls[0].init?.body)), {
      code: "the-code",
      state: "code-state",
      grant_type: "authorization_code",
      client_id: constants.CLAUDE_CONFIG.clientId,
      redirect_uri: constants.CLAUDE_CONFIG.redirectUri,
      code_verifier: "verifier-1",
    });
    assert.equal(fetchMock.calls[1].url, "https://api.anthropic.com/api/claude_cli/bootstrap");

    assert.equal(tokens.accessToken, "at-1");
    assert.equal(tokens.refreshToken, "rt-1");
    assert.equal(tokens.expiresIn, 3600);
    assert.equal(tokens.email, "dev@example.com");
    assert.equal(tokens.providerSpecificData.accountUUID, "acct-1");
    assert.equal(tokens.providerSpecificData.organizationUUID, "org-1");
    assert.equal(tokens.providerSpecificData.autoSync, true);
    assert.match(tokens.providerSpecificData.cliUserID, /^[0-9a-f]{64}$/);
  } finally {
    fetchMock.restore();
  }
});

test("Kiro refresh (social path): POST refreshToken, keeps the old refresh token when none is returned", async () => {
  const fetchMock = installFetch([
    json({ accessToken: "kiro-at", profileArn: "arn:aws:codewhisperer:x" }),
  ]);
  try {
    const result = await new KiroService().refreshToken("kiro-rt");
    assert.equal(fetchMock.calls[0].url, constants.KIRO_CONFIG.socialRefreshUrl);
    assert.deepEqual(JSON.parse(String(fetchMock.calls[0].init?.body)), {
      refreshToken: "kiro-rt",
    });
    assert.deepEqual(result, {
      accessToken: "kiro-at",
      refreshToken: "kiro-rt",
      profileArn: "arn:aws:codewhisperer:x",
      expiresIn: 3600,
    });
  } finally {
    fetchMock.restore();
  }
});

test("Kiro refresh (AWS SSO OIDC path): regional token endpoint with the registered client", async () => {
  const fetchMock = installFetch([
    json({ accessToken: "oidc-at", refreshToken: "oidc-rt-2", expiresIn: 900 }),
  ]);
  try {
    const result = await new KiroService().refreshToken("oidc-rt", {
      clientId: "cid",
      clientSecret: "csecret",
      region: "eu-west-1",
    });
    assert.equal(fetchMock.calls[0].url, "https://oidc.eu-west-1.amazonaws.com/token");
    assert.deepEqual(JSON.parse(String(fetchMock.calls[0].init?.body)), {
      clientId: "cid",
      clientSecret: "csecret",
      refreshToken: "oidc-rt",
      grantType: "refresh_token",
    });
    assert.deepEqual(result, { accessToken: "oidc-at", refreshToken: "oidc-rt-2", expiresIn: 900 });
  } finally {
    fetchMock.restore();
  }
});

test("getServerCredentials falls back to the local dashboard and the cli user", () => {
  for (const name of [
    "OMNIROUTE_SERVER",
    "SERVER_URL",
    "OMNIROUTE_TOKEN",
    "CLI_TOKEN",
    "OMNIROUTE_USER_ID",
    "CLI_USER_ID",
  ]) {
    delete process.env[name];
  }
  const creds = oauthConfig.getServerCredentials();
  assert.match(creds.server, /^http:\/\/localhost:\d+$/);
  assert.equal(creds.token, "");
  assert.equal(creds.userId, "cli");
});

// ─── (c) Invalid input — current behavior ────────────────────────────────────

test("unknown provider ids throw from every facade entry point", async () => {
  assert.throws(() => facade.getProvider("nope"), /Unknown provider: nope/);
  assert.throws(() => facade.generateAuthData("nope", "http://x"), /Unknown provider: nope/);
  await assert.rejects(facade.exchangeTokens("nope", "c", "r", "v", "s"), /Unknown provider: nope/);
});

test("device-code entry points reject non device-code providers", async () => {
  await assert.rejects(
    facade.requestDeviceCode("claude", "challenge"),
    /Provider claude does not support device code flow/
  );
  await assert.rejects(
    facade.pollForToken("claude", "device-code", "verifier", null),
    /Provider claude does not support device code flow/
  );
});

test("assertValidAwsRegion rejects anything outside the AWS region pattern before any fetch", async () => {
  assert.equal(constants.assertValidAwsRegion("us-east-1"), "us-east-1");
  for (const bad of ["", "US-EAST-1", "us-east-1.evil.com", "../token", "us-east"]) {
    assert.throws(() => constants.assertValidAwsRegion(bad), /Invalid region/);
  }
  const fetchMock = installFetch([]);
  try {
    await assert.rejects(
      new KiroService().refreshToken("rt", {
        clientId: "c",
        clientSecret: "s",
        region: "evil.host/x",
      }),
      /Invalid region/
    );
    assert.equal(fetchMock.calls.length, 0);
  } finally {
    fetchMock.restore();
  }
});

test("token exchange/refresh failures embed the raw upstream body in the error message (routes sanitize)", async () => {
  // The message carries whatever the IdP returned; src/app/api/oauth/[provider]/[action]
  // routes it through sanitizeErrorMessage() before it reaches a response body.
  const exchange = installFetch([text("invalid_grant: code expired <html>", 400)]);
  try {
    await assert.rejects(
      facade.exchangeTokens("claude", "c", "r", "v", "s"),
      (err: Error) => err.message === "Token exchange failed: invalid_grant: code expired <html>"
    );
  } finally {
    exchange.restore();
  }

  const refresh = installFetch([text("refresh revoked", 401)]);
  try {
    await assert.rejects(
      new KiroService().refreshToken("rt"),
      (err: Error) => err.message === "Token refresh failed: refresh revoked"
    );
  } finally {
    refresh.restore();
  }
});

test("Kiro OIDC refresh failure: re-registers once, then fails with the ORIGINAL upstream body", async () => {
  const originalWarn = console.warn;
  console.warn = () => {};
  const fetchMock = installFetch([
    text("expired client", 400), // refresh with stored client
    text("register denied", 403), // re-registration attempt
  ]);
  try {
    await assert.rejects(
      new KiroService().refreshToken("rt", { clientId: "c", clientSecret: "s" }),
      (err: Error) => err.message === "Token refresh failed: expired client"
    );
    assert.deepEqual(
      fetchMock.calls.map((c) => c.url),
      [
        "https://oidc.us-east-1.amazonaws.com/token",
        "https://oidc.us-east-1.amazonaws.com/client/register",
      ]
    );
  } finally {
    fetchMock.restore();
    console.warn = originalWarn;
  }
});
