import test from "node:test";
import assert from "node:assert/strict";

const { OAUTH_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { PROVIDERS: oauthFlows } = await import("../../src/lib/oauth/providers/index.ts");

test("ClinePass is registered as an OAuth provider with the canonical identity", () => {
  const clinepass = OAUTH_PROVIDERS.clinepass;
  assert.ok(clinepass, "OAUTH_PROVIDERS.clinepass must be defined");
  assert.equal(clinepass.id, "clinepass");
  assert.equal(clinepass.alias, "cp");
  assert.equal(clinepass.name, "ClinePass");
  assert.equal(clinepass.website, "https://cline.bot/clinepass");
});

test("ClinePass registry entry reuses the Cline OAuth wire image", () => {
  const entry = providerRegistry.clinepass;
  assert.ok(entry, "providerRegistry.clinepass must be defined");
  assert.equal(entry.id, "clinepass");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "openai");
  assert.equal(entry.authType, "oauth");
  assert.equal(entry.baseUrl, "https://api.cline.bot/api/v1/chat/completions");
  assert.ok(entry.oauth, "must carry the Cline OAuth urls");
  assert.equal(entry.oauth.authUrl, "https://api.cline.bot/api/v1/auth/authorize");
  assert.equal(entry.oauth.tokenUrl, "https://api.cline.bot/api/v1/auth/token");
  assert.equal(entry.oauth.refreshUrl, "https://api.cline.bot/api/v1/auth/refresh");
});

test("ClinePass reuses the Cline OAuth flow implementation (no new OAuth code)", () => {
  assert.ok(oauthFlows.clinepass, "clinepass must map to an OAuth flow");
  assert.equal(
    oauthFlows.clinepass,
    oauthFlows.cline,
    "clinepass must reuse the cline OAuth flow 1:1"
  );
});

test("ClinePass seed model list is the 10 cline-pass/* models from the docs", () => {
  const models = providerRegistry.clinepass.models;
  const ids = models.map((m: { id: string }) => m.id);
  assert.equal(ids.length, 10, "ClinePass bundles exactly 10 models");
  assert.equal(new Set(ids).size, ids.length, "model ids must be unique");
  for (const id of ids) {
    assert.ok(id.startsWith("cline-pass/"), `model id must use the cline-pass/ namespace: ${id}`);
  }
  for (const family of [
    "glm-5.2",
    "kimi-k2.7-code",
    "deepseek-v4-pro",
    "qwen3.7",
    "minimax-m3",
    "mimo-v2.5",
  ]) {
    assert.ok(
      ids.some((id: string) => id.includes(family)),
      `seed list must include ${family}`
    );
  }
});

test("ClinePass exposes the OpenAI-compatible chat completions URL", () => {
  assert.equal(PROVIDER_ENDPOINTS.clinepass, "https://api.cline.bot/api/v1/chat/completions");
});
