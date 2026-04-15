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

const { OAUTH_ENDPOINTS } = await import("../../open-sse/config/constants.ts");
const { qoder } = await import("../../src/lib/oauth/providers/qoder.ts");
const { QODER_CONFIG } = await import("../../src/lib/oauth/constants/oauth.ts");

test("Qoder OAuth defaults no longer point to qoder.cn", () => {
  assert.doesNotMatch(QODER_CONFIG.authorizeUrl || "", /qoder\.cn/i);
  assert.doesNotMatch(QODER_CONFIG.tokenUrl || "", /qoder\.cn/i);
  assert.doesNotMatch(QODER_CONFIG.userInfoUrl || "", /qoder\.cn/i);
  assert.doesNotMatch(OAUTH_ENDPOINTS.qoder.auth || "", /qoder\.cn/i);
  assert.doesNotMatch(OAUTH_ENDPOINTS.qoder.token || "", /qoder\.cn/i);
});

test("Qoder OAuth provider returns null when browser auth is not configured", () => {
  if (!QODER_CONFIG.enabled) {
    assert.equal(qoder.buildAuthUrl(QODER_CONFIG, "http://localhost:8080/callback", "state"), null);
    return;
  }

  const authUrl = qoder.buildAuthUrl(QODER_CONFIG, "http://localhost:8080/callback", "state");
  assert.equal(typeof authUrl, "string");
  assert.doesNotMatch(authUrl || "", /qoder\.cn/i);
});
