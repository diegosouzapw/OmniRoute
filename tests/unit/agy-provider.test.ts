import test from "node:test";
import assert from "node:assert/strict";

import { AI_PROVIDERS, USAGE_SUPPORTED_PROVIDERS } from "../../src/shared/constants/providers.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { PROVIDERS as LEGACY_PROVIDERS } from "../../open-sse/config/constants.ts";
import { PROVIDERS as OAUTH_PROVIDER_IDS, AGY_CONFIG } from "../../src/lib/oauth/constants/oauth.ts";
import { supportsTokenRefresh, REFRESH_LEAD_MS } from "../../open-sse/services/tokenRefresh.ts";
import {
  AGY_PUBLIC_MODELS,
  isUserCallableAgyModelId,
  getClientVisibleAgyModelName,
} from "../../open-sse/config/agyModels.ts";

test("agy is registered as an OAuth provider in the UI catalog", () => {
  const agy = AI_PROVIDERS.agy;
  assert.ok(agy, "AI_PROVIDERS.agy must exist");
  assert.equal(agy.id, "agy");
  assert.equal(agy.name, "Antigravity CLI");
  assert.equal(agy.riskNoticeVariant, "oauth");
  assert.equal(agy.subscriptionRisk, true);
});

test("agy supports the usage/quota API", () => {
  assert.ok(USAGE_SUPPORTED_PROVIDERS.includes("agy"));
});

test("agy registry entry reuses the antigravity backend (no duplicate executor/format)", () => {
  const agy = REGISTRY.agy;
  assert.ok(agy, "REGISTRY.agy must exist");
  assert.equal(agy.format, "antigravity");
  assert.equal(agy.executor, "antigravity");
  assert.equal(agy.authType, "oauth");
  assert.equal(agy.authHeader, "bearer");
  assert.equal(agy.passthroughModels, true);
});

test("agy reuses the identical antigravity Google OAuth credentials (no new embedded secret)", () => {
  // The agy client_id was verified byte-for-byte identical to antigravity's.
  assert.equal(LEGACY_PROVIDERS.agy.clientId, LEGACY_PROVIDERS.antigravity.clientId);
  assert.equal(LEGACY_PROVIDERS.agy.clientSecret, LEGACY_PROVIDERS.antigravity.clientSecret);
  assert.equal(AGY_CONFIG.clientId, LEGACY_PROVIDERS.antigravity.clientId);
  assert.equal(OAUTH_PROVIDER_IDS.AGY, "agy");
});

test("agy ships its own catalog including the Claude models antigravity omits", () => {
  const ids = REGISTRY.agy.models.map((m) => m.id);
  assert.ok(ids.includes("claude-opus-4-6-thinking"), "must expose Claude Opus 4.6 Thinking");
  assert.ok(ids.includes("claude-sonnet-4-6"), "must expose Claude Sonnet 4.6");
  // Tab-completion models are not chat-callable and must be excluded.
  assert.ok(!ids.includes("tab_flash_lite_preview"));
  assert.ok(!ids.includes("tab_jump_flash_lite_preview"));
  assert.equal(ids.length, AGY_PUBLIC_MODELS.length);
});

test("agy model helpers resolve catalog ids and display names", () => {
  assert.equal(isUserCallableAgyModelId("claude-opus-4-6-thinking"), true);
  assert.equal(isUserCallableAgyModelId("tab_flash_lite_preview"), false);
  assert.equal(isUserCallableAgyModelId(""), false);
  assert.equal(
    getClientVisibleAgyModelName("claude-opus-4-6-thinking"),
    "Claude Opus 4.6 (Thinking)"
  );
  assert.equal(getClientVisibleAgyModelName("unknown-model", "Fallback"), "Fallback");
});

test("agy token refresh is wired on the Google (non-rotating) refresh path", () => {
  assert.equal(supportsTokenRefresh("agy"), true);
  // Same 15-minute proactive lead as antigravity (Google refresh tokens are permanent).
  assert.equal(REFRESH_LEAD_MS.agy, REFRESH_LEAD_MS.antigravity);
});
