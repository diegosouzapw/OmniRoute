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

test("search filter matches provider name and id case-insensitively", () => {
  const entries = [
    {
      providerId: "claude",
      provider: { id: "claude", name: "Claude" },
      stats: { total: 2 },
      displayAuthType: "oauth",
      toggleAuthType: "oauth",
    },
    {
      providerId: "openai",
      provider: { id: "openai", name: "OpenAI" },
      stats: { total: 1 },
      displayAuthType: "oauth",
      toggleAuthType: "oauth",
    },
    {
      providerId: "gemini",
      provider: { id: "gemini", name: "Google Gemini" },
      stats: { total: 1 },
      displayAuthType: "oauth",
      toggleAuthType: "oauth",
    },
  ];

  const byName = providerPageUtils.filterConfiguredProviderEntries(entries, false, "claude");
  assert.deepEqual(
    byName.map((e) => e.providerId),
    ["claude"]
  );

  const byNameCaseInsensitive = providerPageUtils.filterConfiguredProviderEntries(
    entries,
    false,
    "OPENAI"
  );
  assert.deepEqual(
    byNameCaseInsensitive.map((e) => e.providerId),
    ["openai"]
  );

  const byPartialName = providerPageUtils.filterConfiguredProviderEntries(entries, false, "google");
  assert.deepEqual(
    byPartialName.map((e) => e.providerId),
    ["gemini"]
  );

  const byId = providerPageUtils.filterConfiguredProviderEntries(entries, false, "gem");
  assert.deepEqual(
    byId.map((e) => e.providerId),
    ["gemini"]
  );

  const noMatch = providerPageUtils.filterConfiguredProviderEntries(entries, false, "xyz");
  assert.equal(noMatch.length, 0);

  const emptySearch = providerPageUtils.filterConfiguredProviderEntries(entries, false, "");
  assert.equal(emptySearch.length, 3);

  const whitespaceSearch = providerPageUtils.filterConfiguredProviderEntries(entries, false, "   ");
  assert.equal(whitespaceSearch.length, 3);
});

test("search and configured-only filters work together", () => {
  const entries = [
    {
      providerId: "claude",
      provider: { id: "claude", name: "Claude" },
      stats: { total: 2 },
      displayAuthType: "oauth",
      toggleAuthType: "oauth",
    },
    {
      providerId: "openai",
      provider: { id: "openai", name: "OpenAI" },
      stats: { total: 0 },
      displayAuthType: "oauth",
      toggleAuthType: "oauth",
    },
    {
      providerId: "gemini",
      provider: { id: "gemini", name: "Google Gemini" },
      stats: { total: 1 },
      displayAuthType: "oauth",
      toggleAuthType: "oauth",
    },
  ];

  const configuredAndSearched = providerPageUtils.filterConfiguredProviderEntries(
    entries,
    true,
    "claude"
  );
  assert.deepEqual(
    configuredAndSearched.map((e) => e.providerId),
    ["claude"]
  );

  const configuredButNoMatch = providerPageUtils.filterConfiguredProviderEntries(
    entries,
    true,
    "openai"
  );
  assert.equal(configuredButNoMatch.length, 0);
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
