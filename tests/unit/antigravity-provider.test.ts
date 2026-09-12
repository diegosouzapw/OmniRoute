import test from "node:test";
import assert from "node:assert/strict";

import { AI_PROVIDERS, USAGE_SUPPORTED_PROVIDERS } from "../../src/shared/constants/providers.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { PROVIDERS as LEGACY_PROVIDERS } from "../../open-sse/config/constants.ts";
import {
  PROVIDERS as OAUTH_PROVIDER_IDS,
  ANTIGRAVITY_CONFIG,
} from "../../src/lib/oauth/constants/oauth.ts";
import {
  supportsTokenRefresh,
  REFRESH_LEAD_MS,
  isDeprecatedProvider,
  getDeprecationNotice,
} from "../../open-sse/services/tokenRefresh.ts";
import {
  ANTIGRAVITY_PUBLIC_MODELS,
  isDiscoverableAntigravityModelId,
  isUserCallableAntigravityModelId,
  getClientVisibleAntigravityModelName,
} from "../../open-sse/config/antigravityModelAliases.ts";

// The `agy` provider was consolidated into `antigravity`: a single provider
// entry now presents the official Antigravity CLI identity, and `agy` survives
// only as the display alias plus the `agy/model` prefix alias.

test("antigravity is the single registered OAuth provider in the UI catalog", () => {
  const antigravity = AI_PROVIDERS.antigravity;
  assert.ok(antigravity, "AI_PROVIDERS.antigravity must exist");
  assert.equal(antigravity.id, "antigravity");
  assert.equal(antigravity.name, "Antigravity");
  assert.equal(antigravity.alias, "agy");
  assert.equal(antigravity.riskNoticeVariant, "oauth");
  assert.equal(antigravity.subscriptionRisk, true);
  assert.equal(AI_PROVIDERS.agy, undefined, "the agy provider entry must be gone");
});

test("antigravity supports the usage/quota API", () => {
  assert.ok(USAGE_SUPPORTED_PROVIDERS.includes("antigravity"));
  assert.equal(USAGE_SUPPORTED_PROVIDERS.includes("agy"), false);
});

test("antigravity registry entry owns the backend, format and executor", () => {
  const antigravity = REGISTRY.antigravity;
  assert.ok(antigravity, "REGISTRY.antigravity must exist");
  assert.equal(antigravity.alias, "agy", "registry keeps agy as the display/prefix alias");
  assert.equal(antigravity.format, "antigravity");
  assert.equal(antigravity.executor, "antigravity");
  assert.equal(antigravity.authType, "oauth");
  assert.equal(antigravity.authHeader, "bearer");
  assert.equal(antigravity.passthroughModels, true);
  assert.equal(REGISTRY.agy, undefined, "the agy registry entry must be gone");
});

test("antigravity reuses the Google OAuth credentials embedded for the official client", () => {
  assert.equal(LEGACY_PROVIDERS.antigravity.clientId, ANTIGRAVITY_CONFIG.clientId);
  assert.equal(LEGACY_PROVIDERS.antigravity.clientSecret, ANTIGRAVITY_CONFIG.clientSecret);
  assert.equal(OAUTH_PROVIDER_IDS.ANTIGRAVITY, "antigravity");
  assert.equal("AGY" in OAUTH_PROVIDER_IDS, false, "no separate AGY OAuth provider id");
});

test("antigravity ships the shared live callable model catalog", () => {
  const ids = REGISTRY.antigravity.models.map((m) => m.id);
  assert.ok(ids.includes("claude-opus-4-6-thinking"), "must expose Claude Opus 4.6 Thinking");
  assert.ok(ids.includes("claude-sonnet-4-6"), "must expose Claude Sonnet 4.6");
  assert.ok(ids.includes("gemini-3.8-flash-low"), "must expose Gemini 3.8 Flash Low");
  assert.ok(ids.includes("gemini-3.8-flash-medium"), "must expose Gemini 3.8 Flash Medium");
  assert.ok(ids.includes("gemini-3.8-flash-high"), "must expose Gemini 3.8 Flash High");
  assert.ok(!ids.includes("gemini-3.7-flash-tiered"));
  assert.ok(!ids.includes("gemini-3.6-flash-low"));
  assert.ok(!ids.includes("gemini-3.6-flash-medium"));
  assert.ok(!ids.includes("gemini-3.6-flash-high"));
  assert.ok(!ids.includes("gemini-3.5-flash"));
  assert.ok(!ids.includes("gemini-3.5-flash-extra-low"));
  assert.ok(!ids.includes("gemini-3.5-flash-low"));
  assert.ok(!ids.includes("gemini-3-flash-agent"));
  assert.ok(!ids.includes("gemini-3.5-flash-medium"));
  assert.ok(!ids.includes("gemini-3.5-flash-high"));
  assert.ok(!ids.includes("gemini-3.5-flash-preview"));
  assert.ok(!ids.includes("gemini-3-flash"));
  assert.ok(!ids.includes("gemini-3.1-pro-high"), "must not expose rejected Pro High id");
  assert.ok(ids.includes("gemini-pro-agent"), "must expose callable Pro High id");
  assert.ok(!ids.includes("gemini-2.5-pro"), "must not expose unavailable Gemini 2.5 Pro");
  assert.ok(!ids.includes("gemini-2.5-flash"));
  assert.ok(!ids.includes("gemini-2.5-flash-lite"));
  // Tab-completion models are not chat-callable and must be excluded.
  assert.ok(!ids.includes("tab_flash_lite_preview"));
  assert.ok(!ids.includes("tab_jump_flash_lite_preview"));
  assert.equal(ids.length, ANTIGRAVITY_PUBLIC_MODELS.length);
});

test("antigravity model helpers resolve catalog ids and display names", () => {
  assert.equal(isUserCallableAntigravityModelId("claude-opus-4-6-thinking"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-2.5-pro"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-2.5-flash"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.1-pro-high"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-pro-agent"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.8-flash-low"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.8-flash-medium"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.8-flash-high"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.6-flash-low"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.6-flash-medium"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.6-flash-high"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.5-flash"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.5-flash-extra-low"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.5-flash-low"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-3-flash-agent"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.5-flash-medium"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.5-flash-high"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.5-flash-preview"), false);
  assert.equal(isUserCallableAntigravityModelId("tab_flash_lite_preview"), false);
  assert.equal(isUserCallableAntigravityModelId(""), false);
  assert.equal(
    getClientVisibleAntigravityModelName("claude-opus-4-6-thinking"),
    "Claude Opus 4.6 (Thinking)"
  );
  assert.equal(getClientVisibleAntigravityModelName("gemini-pro-agent"), "Gemini 3.1 Pro (High)");
  assert.equal(
    getClientVisibleAntigravityModelName("gemini-3.8-flash-low"),
    "Gemini 3.8 Flash (Low)"
  );
  assert.equal(
    getClientVisibleAntigravityModelName("gemini-3.8-flash-medium"),
    "Gemini 3.8 Flash (Medium)"
  );
  assert.equal(
    getClientVisibleAntigravityModelName("gemini-3.8-flash-high"),
    "Gemini 3.8 Flash (High)"
  );
  assert.equal(getClientVisibleAntigravityModelName("unknown-model", "Fallback"), "Fallback");
});

test("antigravity live discovery only accepts the explicit shared catalog", () => {
  assert.equal(isDiscoverableAntigravityModelId("gemini-3.8-flash-high"), true);
  assert.equal(isDiscoverableAntigravityModelId("gemini-new-live-tier"), false);
  assert.equal(isDiscoverableAntigravityModelId("gemini-3.7-flash-tiered"), false);
  assert.equal(isDiscoverableAntigravityModelId("gemini-3.7-flash-high"), false);
  assert.equal(isDiscoverableAntigravityModelId("gemini-3.6-flash-high"), false);
  assert.equal(isDiscoverableAntigravityModelId("gemini-3-flash-agent"), false);
  assert.equal(isDiscoverableAntigravityModelId("gemini-2.5-flash"), false);
  assert.equal(isDiscoverableAntigravityModelId("gemini-3.1-flash-image"), false);
  assert.equal(isDiscoverableAntigravityModelId("tab_flash_lite_preview"), false);
  assert.equal(isDiscoverableAntigravityModelId("tab_jump_flash_lite_preview"), false);
  assert.equal(isDiscoverableAntigravityModelId(""), false);
});

const quotaNormalize = await import("../../src/lib/usage/providerLimits/quotaNormalize.ts");

test("test 9: live catalogs stay authoritative within the shared public model allowlist", () => {
  assert.equal(REGISTRY.antigravity.liveCatalogAuthoritative, true);
  const { isUsageQuotaKeyAllowed } = quotaNormalize;
  assert.equal(isDiscoverableAntigravityModelId("gemini-new-live-tier"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-new-live-tier"), false);
  assert.equal(isUsageQuotaKeyAllowed("antigravity", "gemini-3.8-flash-high"), true);
  assert.equal(isUsageQuotaKeyAllowed("antigravity", "gemini-new-live-tier"), false);
  assert.equal(isUsageQuotaKeyAllowed("antigravity", "tab_flash_lite_preview"), false);
  assert.equal(isUsageQuotaKeyAllowed("antigravity", "credits"), true);
});

test("antigravity token refresh is wired on the Google (non-rotating) refresh path", () => {
  assert.equal(supportsTokenRefresh("antigravity"), true);
  // Legacy persisted `agy` connections are deprecated and point at antigravity.
  assert.equal(supportsTokenRefresh("agy"), false);
  assert.equal(isDeprecatedProvider("agy"), true);
  assert.equal(getDeprecationNotice("agy")?.migrateTo, "antigravity");
  // Same 15-minute proactive lead as the consolidated provider (Google refresh tokens are permanent).
  assert.equal(REFRESH_LEAD_MS.agy, REFRESH_LEAD_MS.antigravity);
});
