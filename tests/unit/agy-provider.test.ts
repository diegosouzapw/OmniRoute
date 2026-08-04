import test from "node:test";
import assert from "node:assert/strict";

import { AI_PROVIDERS, USAGE_SUPPORTED_PROVIDERS } from "../../src/shared/constants/providers.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { PROVIDERS as LEGACY_PROVIDERS } from "../../open-sse/config/constants.ts";
import {
  PROVIDERS as OAUTH_PROVIDER_IDS,
  AGY_CONFIG,
} from "../../src/lib/oauth/constants/oauth.ts";
import { supportsTokenRefresh, REFRESH_LEAD_MS } from "../../open-sse/services/tokenRefresh.ts";
import {
  AGY_PUBLIC_MODELS,
  isDiscoverableAgyModelId,
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

test("agy ships its own live callable model catalog", () => {
  const ids = REGISTRY.agy.models.map((m) => m.id);
  assert.ok(ids.includes("claude-opus-4-6-thinking"), "must expose Claude Opus 4.6 Thinking");
  assert.ok(ids.includes("claude-sonnet-4-6"), "must expose Claude Sonnet 4.6");
  assert.ok(ids.includes("gemini-3.6-flash-low"), "must expose Gemini 3.6 Flash Low");
  assert.ok(ids.includes("gemini-3.6-flash-medium"), "must expose Gemini 3.6 Flash Medium");
  assert.ok(ids.includes("gemini-3.6-flash-high"), "must expose Gemini 3.6 Flash High");
  assert.ok(ids.includes("gemini-3.5-flash-extra-low"), "must expose upstream Flash Low tier");
  assert.ok(ids.includes("gemini-3.5-flash-low"), "must expose upstream Flash Medium tier");
  assert.ok(ids.includes("gemini-3-flash-agent"), "must expose upstream Flash High tier");
  assert.ok(!ids.includes("gemini-3.5-flash-medium"));
  assert.ok(!ids.includes("gemini-3.5-flash-high"));
  assert.ok(!ids.includes("gemini-3.5-flash-preview"));
  assert.ok(!ids.includes("gemini-3-flash"));
  assert.ok(!ids.includes("gemini-3.1-pro-high"), "must not expose rejected Pro High id");
  assert.ok(ids.includes("gemini-pro-agent"), "must expose callable Pro High id");
  assert.ok(!ids.includes("gemini-2.5-pro"), "must not expose unavailable Gemini 2.5 Pro");
  assert.ok(ids.includes("gemini-2.5-flash"), "must retain working Gemini 2.5 Flash");
  assert.ok(ids.includes("gemini-2.5-flash-lite"), "must retain working Gemini 2.5 Flash Lite");
  // Tab-completion models are not chat-callable and must be excluded.
  assert.ok(!ids.includes("tab_flash_lite_preview"));
  assert.ok(!ids.includes("tab_jump_flash_lite_preview"));
  assert.equal(ids.length, AGY_PUBLIC_MODELS.length);
});

test("agy model helpers resolve catalog ids and display names", () => {
  assert.equal(isUserCallableAgyModelId("claude-opus-4-6-thinking"), true);
  assert.equal(isUserCallableAgyModelId("gemini-2.5-pro"), false);
  assert.equal(isUserCallableAgyModelId("gemini-2.5-flash"), true);
  assert.equal(isUserCallableAgyModelId("gemini-3.1-pro-high"), false);
  assert.equal(isUserCallableAgyModelId("gemini-pro-agent"), true);
  assert.equal(isUserCallableAgyModelId("gemini-3.6-flash-low"), true);
  assert.equal(isUserCallableAgyModelId("gemini-3.6-flash-medium"), true);
  assert.equal(isUserCallableAgyModelId("gemini-3.6-flash-high"), true);
  assert.equal(isUserCallableAgyModelId("gemini-3.5-flash-extra-low"), true);
  assert.equal(isUserCallableAgyModelId("gemini-3.5-flash-low"), true);
  assert.equal(isUserCallableAgyModelId("gemini-3-flash-agent"), true);
  assert.equal(isUserCallableAgyModelId("gemini-3.5-flash-medium"), false);
  assert.equal(isUserCallableAgyModelId("gemini-3.5-flash-high"), false);
  assert.equal(isUserCallableAgyModelId("gemini-3.5-flash-preview"), false);
  assert.equal(isUserCallableAgyModelId("tab_flash_lite_preview"), false);
  assert.equal(isUserCallableAgyModelId(""), false);
  assert.equal(
    getClientVisibleAgyModelName("claude-opus-4-6-thinking"),
    "Claude Opus 4.6 (Thinking)"
  );
  assert.equal(getClientVisibleAgyModelName("gemini-pro-agent"), "Gemini 3.1 Pro (High)");
  assert.equal(
    getClientVisibleAgyModelName("gemini-3.5-flash-extra-low"),
    "Gemini 3.5 Flash (Low)"
  );
  assert.equal(getClientVisibleAgyModelName("gemini-3.6-flash-low"), "Gemini 3.6 Flash (Low)");
  assert.equal(
    getClientVisibleAgyModelName("gemini-3.6-flash-medium"),
    "Gemini 3.6 Flash (Medium)"
  );
  assert.equal(getClientVisibleAgyModelName("gemini-3.6-flash-high"), "Gemini 3.6 Flash (High)");
  assert.equal(getClientVisibleAgyModelName("gemini-3.5-flash-low"), "Gemini 3.5 Flash (Medium)");
  assert.equal(getClientVisibleAgyModelName("gemini-3-flash-agent"), "Gemini 3.5 Flash (High)");
  assert.equal(getClientVisibleAgyModelName("unknown-model", "Fallback"), "Fallback");
});

test("agy live discovery accepts new chat models while excluding tab-completion models", () => {
  assert.equal(isDiscoverableAgyModelId("gemini-new-live-tier"), true);
  assert.equal(isDiscoverableAgyModelId("tab_flash_lite_preview"), false);
  assert.equal(isDiscoverableAgyModelId("tab_jump_flash_lite_preview"), false);
  assert.equal(isDiscoverableAgyModelId(""), false);
});

test("agy token refresh is wired on the Google (non-rotating) refresh path", () => {
  assert.equal(supportsTokenRefresh("agy"), true);
  // Same 15-minute proactive lead as antigravity (Google refresh tokens are permanent).
  assert.equal(REFRESH_LEAD_MS.agy, REFRESH_LEAD_MS.antigravity);
});
