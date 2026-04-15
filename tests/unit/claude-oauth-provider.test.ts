import test from "node:test";
import assert from "node:assert/strict";

Object.assign(process.env, {
  CLAUDE_OAUTH_CLIENT_ID: "9d1c250a-e61b-44d9-88ed-5944d1962f5e",
  CODEX_OAUTH_CLIENT_ID: "app_EMoamEEZ73f0CkXaXp7hrann",
  GEMINI_OAUTH_CLIENT_ID:
    "681255809395-oo8ft2oprdrnp9e3aqf6av3hmdib135j.apps.googleusercontent.com",
  GEMINI_OAUTH_CLIENT_SECRET: "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",
  GEMINI_CLI_OAUTH_CLIENT_ID:
    "681255809395-oo8ft2oprdrnp9e3aqf6av3hmdib135j.apps.googleusercontent.com",
  GEMINI_CLI_OAUTH_CLIENT_SECRET: "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",
  QWEN_OAUTH_CLIENT_ID: "f0304373b74a44d2b584a3fb70ca9e56",
  KIMI_CODING_OAUTH_CLIENT_ID: "17e5f671-d194-4dfb-9706-5516cb48c098",
  ANTIGRAVITY_OAUTH_CLIENT_ID:
    "1071006060591-tmhssin2h21lcre235vtolojh4g403ep.apps.googleusercontent.com",
  ANTIGRAVITY_OAUTH_CLIENT_SECRET: "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",
  GITHUB_OAUTH_CLIENT_ID: "Iv1.b507a08c87ecfe98",
});

const { claude } = await import("../../src/lib/oauth/providers/claude.ts");
const { CLAUDE_CONFIG } = await import("../../src/lib/oauth/constants/oauth.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("Claude OAuth provider always uses the configured redirectUri when building the auth URL", () => {
  const runtimeRedirectUri = "http://localhost:43121/callback";
  const authUrl = claude.buildAuthUrl(
    CLAUDE_CONFIG,
    runtimeRedirectUri,
    "state-123",
    "challenge-456"
  );
  const parsed = new URL(authUrl);

  assert.equal(parsed.searchParams.get("redirect_uri"), CLAUDE_CONFIG.redirectUri);
  assert.equal(parsed.searchParams.get("state"), "state-123");
  assert.equal(parsed.searchParams.get("code_challenge"), "challenge-456");
});

test("Claude OAuth provider always uses the configured redirectUri during token exchange", async () => {
  let captured = null;

  globalThis.fetch = async (url, init = {}) => {
    captured = {
      url: String(url),
      method: init.method,
      headers: init.headers,
      body: JSON.parse(String(init.body)),
    };

    return new Response(JSON.stringify({ access_token: "token-1" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  const runtimeRedirectUri = "http://localhost:43121/callback";
  await claude.exchangeToken(
    CLAUDE_CONFIG,
    "auth-code#state-from-fragment",
    runtimeRedirectUri,
    "verifier-123",
    "state-from-request"
  );

  assert.equal(captured.url, CLAUDE_CONFIG.tokenUrl);
  assert.equal(captured.method, "POST");
  assert.equal(captured.body.redirect_uri, CLAUDE_CONFIG.redirectUri);
  assert.equal(captured.body.code, "auth-code");
  assert.equal(captured.body.state, "state-from-fragment");
  assert.equal(captured.body.code_verifier, "verifier-123");
});
