import { test } from "node:test";
import assert from "node:assert";
import { CLAUDE_CONFIG } from "@/lib/oauth/constants/oauth.ts";
import { OAUTH_ENDPOINTS } from "@omniroute/open-sse/config/constants.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";

test("CLAUDE_CONFIG.tokenUrl uses api.anthropic.com (not console.anthropic.com)", () => {
  assert.ok(
    CLAUDE_CONFIG.tokenUrl.includes("api.anthropic.com"),
    `Expected api.anthropic.com but got ${CLAUDE_CONFIG.tokenUrl}`
  );
  assert.equal(CLAUDE_CONFIG.tokenUrl, "https://api.anthropic.com/v1/oauth/token");
});

test("OAUTH_ENDPOINTS.anthropic uses api.anthropic.com for token and auth", () => {
  assert.ok(
    OAUTH_ENDPOINTS.anthropic.token.includes("api.anthropic.com"),
    `Expected api.anthropic.com but got ${OAUTH_ENDPOINTS.anthropic.token}`
  );
  assert.ok(
    OAUTH_ENDPOINTS.anthropic.auth.includes("api.anthropic.com"),
    `Expected api.anthropic.com but got ${OAUTH_ENDPOINTS.anthropic.auth}`
  );
  assert.equal(OAUTH_ENDPOINTS.anthropic.token, "https://api.anthropic.com/v1/oauth/token");
  assert.equal(OAUTH_ENDPOINTS.anthropic.auth, "https://api.anthropic.com/v1/oauth/authorize");
});

test("Provider registry claude oauth.tokenUrl uses api.anthropic.com", () => {
  const claude = REGISTRY.claude;
  assert.ok(claude, "claude provider should exist in registry");
  assert.ok(
    claude.oauth?.tokenUrl?.includes("api.anthropic.com"),
    `Expected api.anthropic.com but got ${claude.oauth?.tokenUrl}`
  );
  assert.equal(claude.oauth.tokenUrl, "https://api.anthropic.com/v1/oauth/token");
});

test("No console.anthropic.com remains in OAuth constants or registry", () => {
  const allUrls = [
    CLAUDE_CONFIG.tokenUrl,
    OAUTH_ENDPOINTS.anthropic.token,
    OAUTH_ENDPOINTS.anthropic.auth,
    REGISTRY.claude?.oauth?.tokenUrl,
  ].filter(Boolean);
  for (const url of allUrls) {
    assert.equal(
      url.includes("console.anthropic.com"),
      false,
      `Found console.anthropic.com in ${url}`
    );
  }
});
