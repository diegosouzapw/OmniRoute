import test from "node:test";
import assert from "node:assert/strict";

const providerPageUtils =
  await import("../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts");
const providerPageStorage =
  await import("../../src/app/(dashboard)/dashboard/providers/providerPageStorage.ts");
const providers = await import("../../src/shared/constants/providers.ts");
const providerCatalog = await import("../../src/lib/providers/catalog.ts");

test("merged OAuth providers keep free-tier providers in the OAuth section", () => {
  const statsCalls = [];
  const getProviderStats = (providerId, authType) => {
    statsCalls.push({ providerId, authType });
    return { total: authType === "free" ? 1 : 0 };
  };

  const entries = providerPageUtils.buildMergedOAuthProviderEntries(
    providers.OAUTH_PROVIDERS,
    providers.FREE_PROVIDERS,
    getProviderStats
  );

  const oauthIds = Object.keys(providers.OAUTH_PROVIDERS);
  const freeIds = Object.keys(providers.FREE_PROVIDERS);

  assert.deepEqual(
    entries.slice(0, oauthIds.length).map((entry) => entry.providerId),
    oauthIds
  );
  assert.deepEqual(
    entries.slice(oauthIds.length).map((entry) => entry.providerId),
    freeIds
  );

  const freeEntry = entries.find((entry) => entry.providerId === freeIds[0]);
  assert.equal(freeEntry.displayAuthType, "oauth");
  assert.equal(freeEntry.toggleAuthType, "free");
  assert.equal(
    statsCalls.some((call) => call.providerId === freeIds[0] && call.authType === "free"),
    true
  );
});

test("free providers can explicitly opt into API key flows", () => {
  assert.equal(providers.supportsApiKeyOnFreeProvider("qoder"), true);
  assert.equal(providers.supportsApiKeyOnFreeProvider("gradient"), true);
  assert.equal(providers.supportsApiKeyOnFreeProvider("kiro"), false);
});

test("configured-only filter keeps only providers with saved connections", () => {
  const entries = [
    {
      providerId: "claude",
      provider: { id: "claude" },
      stats: { total: 2 },
      displayAuthType: "oauth",
      toggleAuthType: "oauth",
    },
    {
      providerId: "codex",
      provider: { id: "codex" },
      stats: { total: 0 },
      displayAuthType: "oauth",
      toggleAuthType: "oauth",
    },
    {
      providerId: "cursor",
      provider: { id: "cursor" },
      stats: { total: 1 },
      displayAuthType: "oauth",
      toggleAuthType: "oauth",
    },
  ];

  const visible = providerPageUtils.filterConfiguredProviderEntries(entries, true);

  assert.deepEqual(
    visible.map((entry) => entry.providerId),
    ["claude", "cursor"]
  );
  assert.equal(providerPageUtils.filterConfiguredProviderEntries(entries, false).length, 3);
});

test("configured-only preference parser only enables explicit true values", () => {
  assert.equal(providerPageStorage.parseConfiguredOnlyPreference("true"), true);
  assert.equal(providerPageStorage.parseConfiguredOnlyPreference("false"), false);
  assert.equal(providerPageStorage.parseConfiguredOnlyPreference(null), false);
  assert.equal(providerPageStorage.parseConfiguredOnlyPreference(undefined), false);
});

test("configured-only preference storage round-trips correctly", () => {
  const storage = new Map();
  const mockStorage = {
    getItem(key) {
      return storage.has(key) ? storage.get(key) : null;
    },
    setItem(key, value) {
      storage.set(key, value);
    },
    removeItem(key) {
      storage.delete(key);
    },
  };

  assert.equal(providerPageStorage.readConfiguredOnlyPreference(mockStorage), false);

  providerPageStorage.writeConfiguredOnlyPreference(true, mockStorage);
  assert.equal(storage.get(providerPageStorage.SHOW_CONFIGURED_ONLY_STORAGE_KEY), "true");
  assert.equal(providerPageStorage.readConfiguredOnlyPreference(mockStorage), true);

  providerPageStorage.writeConfiguredOnlyPreference(false, mockStorage);
  assert.equal(storage.has(providerPageStorage.SHOW_CONFIGURED_ONLY_STORAGE_KEY), false);
  assert.equal(providerPageStorage.readConfiguredOnlyPreference(mockStorage), false);
});

test("static catalog entries resolve search, audio, web-cookie and upstream providers", () => {
  const searchProvider = providerPageUtils.resolveDashboardProviderInfo("brave-search");
  const audioProvider = providerPageUtils.resolveDashboardProviderInfo("assemblyai");
  const webCookieProvider = providerPageUtils.resolveDashboardProviderInfo("grok-web");
  const perplexityWebProvider = providerPageUtils.resolveDashboardProviderInfo("perplexity-web");
  const upstreamProvider = providerPageUtils.resolveDashboardProviderInfo("cliproxyapi");

  assert.equal(searchProvider?.category, "search");
  assert.equal(searchProvider?.name, providers.SEARCH_PROVIDERS["brave-search"].name);

  assert.equal(audioProvider?.category, "audio");
  assert.equal(audioProvider?.name, providers.AUDIO_ONLY_PROVIDERS.assemblyai.name);

  assert.equal(webCookieProvider?.category, "web-cookie");
  assert.equal(webCookieProvider?.name, providers.WEB_COOKIE_PROVIDERS["grok-web"].name);

  assert.equal(perplexityWebProvider?.category, "web-cookie");
  assert.equal(perplexityWebProvider?.name, providers.WEB_COOKIE_PROVIDERS["perplexity-web"].name);

  assert.equal(upstreamProvider?.category, "upstream-proxy");
  assert.equal(
    upstreamProvider?.name,
    providerCatalog.STATIC_PROVIDER_CATALOG_GROUPS["upstream-proxy"].providers.cliproxyapi.name
  );
});

test("managed provider connection ids include supported static categories and exclude upstream proxy", () => {
  assert.equal(providerCatalog.isManagedProviderConnectionId("qoder"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("assemblyai"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("grok-web"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("perplexity-web"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("brave-search"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("cliproxyapi"), false);
  assert.equal(providerCatalog.isManagedProviderConnectionId("claude"), false);
});

test("grok-web taxonomy stays web-cookie only and does not leak into api-key entries", () => {
  assert.equal("grok-web" in providers.APIKEY_PROVIDERS, false);
  assert.equal("grok-web" in providers.WEB_COOKIE_PROVIDERS, true);

  const apiKeyEntries = providerPageUtils.buildStaticProviderEntries("apikey", () => ({
    total: 0,
  }));
  const webCookieEntries = providerPageUtils.buildStaticProviderEntries("web-cookie", () => ({
    total: 0,
  }));

  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "grok-web"),
    false
  );
  assert.equal(
    webCookieEntries.some((entry) => entry.providerId === "grok-web"),
    true
  );
});

test("amp taxonomy stays API key only and resolves as a managed provider entry", () => {
  assert.equal("amp" in providers.APIKEY_PROVIDERS, true);
  assert.equal("amp" in providers.OAUTH_PROVIDERS, false);

  const ampProvider = providerPageUtils.resolveDashboardProviderInfo("amp");

  assert.equal(ampProvider?.category, "apikey");
  assert.equal(ampProvider?.displayAuthType, "apikey");
  assert.equal(ampProvider?.toggleAuthType, "apikey");
});

test("zed and trae stay in the OAuth taxonomy with dashboard metadata", () => {
  assert.equal("zed" in providers.OAUTH_PROVIDERS, true);
  assert.equal("trae" in providers.OAUTH_PROVIDERS, true);
  assert.equal("zed" in providers.APIKEY_PROVIDERS, false);
  assert.equal("trae" in providers.APIKEY_PROVIDERS, false);

  const zedProvider = providerPageUtils.resolveDashboardProviderInfo("zed");
  const traeProvider = providerPageUtils.resolveDashboardProviderInfo("trae");

  assert.equal(zedProvider?.category, "oauth");
  assert.equal(zedProvider?.displayAuthType, "oauth");
  assert.equal(traeProvider?.category, "oauth");
  assert.equal(traeProvider?.displayAuthType, "oauth");
});

test("zed quota summary keeps billing data compact for the dashboard row", () => {
  const summary = providerPageUtils.summarizeZedQuota({
    zedQuota: {
      planRaw: "token_based_zed_student",
      tokenSpendUsedCents: 1000,
      tokenSpendLimitCents: 2500,
      editPredictionsUsed: 26,
      billingPortalUrl: "https://portal.withorb.com/view?token=zed",
    },
  });

  assert.deepEqual(summary, {
    planLabel: "token based zed student",
    spendLabel: "Spend $10.00 / $25.00",
    editPredictionsLabel: "Edits 26 used",
    isAccountTooYoung: false,
    billingPortalUrl: "https://portal.withorb.com/view?token=zed",
  });
});

test("compatible catalog entries keep dynamic compatible metadata", () => {
  const compatibleProvider = providerPageUtils.resolveDashboardProviderInfo(
    "openai-compatible-lab",
    {
      providerNode: {
        id: "openai-compatible-lab",
        type: "openai-compatible",
        apiType: "responses",
        baseUrl: "https://example.test",
      },
      compatibleLabels: {
        ccCompatibleName: "CC Compatible",
        anthropicCompatibleName: "Anthropic Compatible",
        openAiCompatibleName: "OpenAI Compatible",
      },
    }
  );

  assert.equal(compatibleProvider?.category, "compatible");
  assert.equal(compatibleProvider?.displayAuthType, "compatible");
  assert.equal(compatibleProvider?.toggleAuthType, "apikey");
  assert.equal(compatibleProvider?.apiType, "responses");
  assert.equal(compatibleProvider?.baseUrl, "https://example.test");
});
