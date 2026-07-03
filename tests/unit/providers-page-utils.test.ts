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

  const mockOauthProviders = { claude: { name: "Claude" } };
  const mockFreeProviders = { qoder: { name: "Qoder" } };

  const entries = providerPageUtils.buildMergedOAuthProviderEntries(
    mockOauthProviders,
    mockFreeProviders,
    getProviderStats
  );

  const oauthIds = Object.keys(mockOauthProviders);
  const freeIds = Object.keys(mockFreeProviders);

  assert.deepEqual(
    entries.slice(0, oauthIds.length).map((entry) => entry.providerId),
    oauthIds
  );
  assert.deepEqual(
    entries.slice(oauthIds.length).map((entry) => entry.providerId),
    freeIds
  );

  const freeEntry = entries.find((entry) => entry.providerId === freeIds[0]);
  assert.ok(freeEntry, "Should find the free entry");
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

test("configured-only filter keeps no-auth providers even without a saved connection (#3290)", () => {
  const entries = [
    {
      providerId: "claude",
      provider: { id: "claude" },
      stats: { total: 0 },
      displayAuthType: "oauth",
      toggleAuthType: "oauth",
    },
    {
      providerId: "opencode",
      provider: { id: "opencode" },
      stats: { total: 0 },
      displayAuthType: "no-auth",
      toggleAuthType: "no-auth",
    },
    {
      providerId: "duckduckgo-web",
      provider: { id: "duckduckgo-web" },
      stats: { total: 0 },
      displayAuthType: "no-auth",
      toggleAuthType: "no-auth",
    },
  ];

  // no-auth providers never create a DB connection row (total === 0) but are
  // always usable and appear in /v1/models — they must survive the filter.
  const visible = providerPageUtils.filterConfiguredProviderEntries(entries, true);
  assert.deepEqual(
    visible.map((entry) => entry.providerId),
    ["duckduckgo-web", "opencode"]
  );
});

test("compact provider entries dedupe providers and move no-auth entries to the end", () => {
  const openRouterFromFree = {
    providerId: "openrouter",
    provider: { id: "openrouter", name: "OpenRouter" },
    stats: { total: 1 },
    displayAuthType: "apikey",
    toggleAuthType: "apikey",
  };
  const openRouterFromAggregator = {
    providerId: "openrouter",
    provider: { id: "openrouter", name: "OpenRouter" },
    stats: { total: 1 },
    displayAuthType: "apikey",
    toggleAuthType: "apikey",
  };
  const claude = {
    providerId: "claude",
    provider: { id: "claude", name: "Claude" },
    stats: { total: 1 },
    displayAuthType: "oauth",
    toggleAuthType: "oauth",
  };
  const opencode = {
    providerId: "opencode",
    provider: { id: "opencode", name: "OpenCode" },
    stats: { total: 0 },
    displayAuthType: "no-auth",
    toggleAuthType: "no-auth",
  };

  const visible = providerPageUtils.buildCompactProviderEntries(
    [[opencode, openRouterFromFree], [claude, openRouterFromAggregator], [opencode]],
    { deferNoAuth: true }
  );

  assert.deepEqual(
    visible.map((entry) => entry.providerId),
    ["openrouter", "claude", "opencode"]
  );
  assert.equal(visible.filter((entry) => entry.providerId === "openrouter").length, 1);
});

test("compact provider entries prefer non-no-auth duplicates over deferred no-auth entries", () => {
  const noAuthEntry = {
    providerId: "opencode",
    provider: { id: "opencode", name: "OpenCode" },
    stats: { total: 0 },
    displayAuthType: "no-auth",
    toggleAuthType: "no-auth",
  };
  const configuredEntry = {
    providerId: "opencode",
    provider: { id: "opencode", name: "OpenCode" },
    stats: { total: 1 },
    displayAuthType: "apikey",
    toggleAuthType: "apikey",
  };

  const visible = providerPageUtils.buildCompactProviderEntries(
    [[noAuthEntry], [configuredEntry]],
    { deferNoAuth: true }
  );

  assert.equal(visible.length, 1);
  assert.equal(visible[0].providerId, "opencode");
  assert.equal(visible[0].displayAuthType, "apikey");
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

test("provider display mode preference parser accepts only known modes", () => {
  assert.equal(providerPageStorage.parseProviderDisplayModePreference("all"), "all");
  assert.equal(providerPageStorage.parseProviderDisplayModePreference("configured"), "configured");
  assert.equal(providerPageStorage.parseProviderDisplayModePreference("compact"), "compact");
  assert.equal(providerPageStorage.parseProviderDisplayModePreference("true"), null);
  assert.equal(providerPageStorage.parseProviderDisplayModePreference(null), null);
});

test("configured-only filter is ignored before the first provider is connected", () => {
  assert.equal(providerPageUtils.shouldApplyConfiguredOnlyFilter(true, 0), false);
  assert.equal(providerPageUtils.shouldApplyConfiguredOnlyFilter(false, 0), false);
  assert.equal(providerPageUtils.shouldApplyConfiguredOnlyFilter(true, 1), true);
});

test("compact display mode always uses the configured provider set", () => {
  assert.equal(providerPageUtils.shouldFilterProviderEntriesForDisplayMode("all", 0), false);
  assert.equal(providerPageUtils.shouldFilterProviderEntriesForDisplayMode("all", 2), false);
  assert.equal(providerPageUtils.shouldFilterProviderEntriesForDisplayMode("configured", 0), false);
  assert.equal(providerPageUtils.shouldFilterProviderEntriesForDisplayMode("configured", 2), true);
  assert.equal(providerPageUtils.shouldFilterProviderEntriesForDisplayMode("compact", 0), true);
  assert.equal(providerPageUtils.shouldFilterProviderEntriesForDisplayMode("compact", 2), true);
});

test("first-provider hint is shown only when no providers are connected and search is empty", () => {
  assert.equal(providerPageUtils.shouldShowFirstProviderHint(0, ""), true);
  assert.equal(providerPageUtils.shouldShowFirstProviderHint(0, "   "), true);
  assert.equal(providerPageUtils.shouldShowFirstProviderHint(0, "codex"), false);
  assert.equal(providerPageUtils.shouldShowFirstProviderHint(1, ""), false);
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

test("provider display mode storage round-trips and migrates the old configured-only key", () => {
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

  assert.equal(providerPageStorage.readProviderDisplayModePreference(mockStorage), "all");

  storage.set(providerPageStorage.SHOW_CONFIGURED_ONLY_STORAGE_KEY, "true");
  assert.equal(providerPageStorage.readProviderDisplayModePreference(mockStorage), "configured");
  assert.equal(storage.get(providerPageStorage.PROVIDER_DISPLAY_MODE_STORAGE_KEY), "configured");
  assert.equal(storage.has(providerPageStorage.SHOW_CONFIGURED_ONLY_STORAGE_KEY), false);

  providerPageStorage.writeProviderDisplayModePreference("compact", mockStorage);
  assert.equal(storage.get(providerPageStorage.PROVIDER_DISPLAY_MODE_STORAGE_KEY), "compact");
  assert.equal(storage.has(providerPageStorage.SHOW_CONFIGURED_ONLY_STORAGE_KEY), false);
  assert.equal(providerPageStorage.readProviderDisplayModePreference(mockStorage), "compact");

  providerPageStorage.writeProviderDisplayModePreference("all", mockStorage);
  assert.equal(storage.has(providerPageStorage.PROVIDER_DISPLAY_MODE_STORAGE_KEY), false);
  assert.equal(providerPageStorage.readProviderDisplayModePreference(mockStorage), "all");
});

test("static catalog entries resolve local, search, audio, web-cookie and upstream providers", () => {
  const freeProvider = providerPageUtils.resolveDashboardProviderInfo("amazon-q");
  const localProvider = providerPageUtils.resolveDashboardProviderInfo("sdwebui");
  const localChatProvider = providerPageUtils.resolveDashboardProviderInfo("lm-studio");
  const lemonadeProvider = providerPageUtils.resolveDashboardProviderInfo("lemonade");
  const searchProvider = providerPageUtils.resolveDashboardProviderInfo("brave-search");
  const youcomSearchProvider = providerPageUtils.resolveDashboardProviderInfo("youcom-search");
  const audioProvider = providerPageUtils.resolveDashboardProviderInfo("assemblyai");
  const awsPollyProvider = providerPageUtils.resolveDashboardProviderInfo("aws-polly");
  const webCookieProvider = providerPageUtils.resolveDashboardProviderInfo("grok-web");
  const apiKeyProvider = providerPageUtils.resolveDashboardProviderInfo("glhf");
  const gitlabProvider = providerPageUtils.resolveDashboardProviderInfo("gitlab");
  const gitlabDuoProvider = providerPageUtils.resolveDashboardProviderInfo("gitlab-duo");
  const chutesProvider = providerPageUtils.resolveDashboardProviderInfo("chutes");
  const datarobotProvider = providerPageUtils.resolveDashboardProviderInfo("datarobot");
  const clarifaiProvider = providerPageUtils.resolveDashboardProviderInfo("clarifai");
  const empowerProvider = providerPageUtils.resolveDashboardProviderInfo("empower");
  const nousProvider = providerPageUtils.resolveDashboardProviderInfo("nous-research");
  const poeProvider = providerPageUtils.resolveDashboardProviderInfo("poe");
  const azureOpenAiProvider = providerPageUtils.resolveDashboardProviderInfo("azure-openai");
  const azureAiProvider = providerPageUtils.resolveDashboardProviderInfo("azure-ai");
  const watsonxProvider = providerPageUtils.resolveDashboardProviderInfo("watsonx");
  const ociProvider = providerPageUtils.resolveDashboardProviderInfo("oci");
  const sapProvider = providerPageUtils.resolveDashboardProviderInfo("sap");
  const modalProvider = providerPageUtils.resolveDashboardProviderInfo("modal");
  const rekaProvider = providerPageUtils.resolveDashboardProviderInfo("reka");
  const nlpCloudProvider = providerPageUtils.resolveDashboardProviderInfo("nlpcloud");
  const runwayProvider = providerPageUtils.resolveDashboardProviderInfo("runwayml");
  const embeddingProvider = providerPageUtils.resolveDashboardProviderInfo("voyage-ai");
  const rerankProvider = providerPageUtils.resolveDashboardProviderInfo("jina-ai");
  const perplexityWebProvider = providerPageUtils.resolveDashboardProviderInfo("perplexity-web");
  const blackboxWebProvider = providerPageUtils.resolveDashboardProviderInfo("blackbox-web");
  const museSparkWebProvider = providerPageUtils.resolveDashboardProviderInfo("muse-spark-web");
  const upstreamProvider = providerPageUtils.resolveDashboardProviderInfo("cliproxyapi");

  assert.equal(freeProvider?.category, "oauth");
  assert.equal(freeProvider?.name, providers.OAUTH_PROVIDERS["amazon-q"].name);

  assert.equal(localProvider?.category, "local");
  assert.equal(localProvider?.name, providers.LOCAL_PROVIDERS.sdwebui.name);
  assert.equal(localChatProvider?.category, "local");
  assert.equal(localChatProvider?.name, providers.LOCAL_PROVIDERS["lm-studio"].name);
  assert.equal(lemonadeProvider?.category, "local");
  assert.equal(lemonadeProvider?.name, providers.LOCAL_PROVIDERS.lemonade.name);

  assert.equal(searchProvider?.category, "search");
  assert.equal(searchProvider?.name, providers.SEARCH_PROVIDERS["brave-search"].name);
  assert.equal(youcomSearchProvider?.category, "search");
  assert.equal(youcomSearchProvider?.name, providers.SEARCH_PROVIDERS["youcom-search"].name);

  assert.equal(audioProvider?.category, "audio");
  assert.equal(audioProvider?.name, providers.AUDIO_ONLY_PROVIDERS.assemblyai.name);
  assert.equal(awsPollyProvider?.category, "audio");
  assert.equal(awsPollyProvider?.name, providers.AUDIO_ONLY_PROVIDERS["aws-polly"].name);

  assert.equal(apiKeyProvider?.category, "apikey");
  assert.equal(apiKeyProvider?.name, providers.APIKEY_PROVIDERS.glhf.name);
  assert.equal(gitlabProvider?.category, "apikey");
  assert.equal(gitlabProvider?.name, providers.APIKEY_PROVIDERS.gitlab.name);
  assert.equal(gitlabDuoProvider?.category, "oauth");
  assert.equal(gitlabDuoProvider?.name, providers.OAUTH_PROVIDERS["gitlab-duo"].name);
  assert.equal(chutesProvider?.category, "apikey");
  assert.equal(chutesProvider?.name, providers.APIKEY_PROVIDERS.chutes.name);
  assert.equal(datarobotProvider?.category, "apikey");
  assert.equal(datarobotProvider?.name, providers.APIKEY_PROVIDERS.datarobot.name);
  assert.equal(clarifaiProvider?.category, "apikey");
  assert.equal(clarifaiProvider?.name, providers.APIKEY_PROVIDERS.clarifai.name);
  assert.equal(empowerProvider?.category, "apikey");
  assert.equal(empowerProvider?.name, providers.APIKEY_PROVIDERS.empower.name);
  assert.equal(nousProvider?.category, "apikey");
  assert.equal(nousProvider?.name, providers.APIKEY_PROVIDERS["nous-research"].name);
  assert.equal(poeProvider?.category, "apikey");
  assert.equal(poeProvider?.name, providers.APIKEY_PROVIDERS.poe.name);
  assert.equal(azureOpenAiProvider?.category, "apikey");
  assert.equal(azureOpenAiProvider?.name, providers.APIKEY_PROVIDERS["azure-openai"].name);
  assert.equal(azureAiProvider?.category, "apikey");
  assert.equal(azureAiProvider?.name, providers.APIKEY_PROVIDERS["azure-ai"].name);
  assert.equal(watsonxProvider?.category, "apikey");
  assert.equal(watsonxProvider?.name, providers.APIKEY_PROVIDERS.watsonx.name);
  assert.equal(ociProvider?.category, "apikey");
  assert.equal(ociProvider?.name, providers.APIKEY_PROVIDERS.oci.name);
  assert.equal(sapProvider?.category, "apikey");
  assert.equal(sapProvider?.name, providers.APIKEY_PROVIDERS.sap.name);
  assert.equal(modalProvider?.category, "apikey");
  assert.equal(modalProvider?.name, providers.APIKEY_PROVIDERS.modal.name);
  assert.equal(rekaProvider?.category, "apikey");
  assert.equal(rekaProvider?.name, providers.APIKEY_PROVIDERS.reka.name);
  assert.equal(nlpCloudProvider?.category, "apikey");
  assert.equal(nlpCloudProvider?.name, providers.APIKEY_PROVIDERS.nlpcloud.name);
  assert.equal(runwayProvider?.category, "apikey");
  assert.equal(runwayProvider?.name, providers.APIKEY_PROVIDERS.runwayml.name);

  assert.equal(embeddingProvider?.category, "apikey");
  assert.equal(embeddingProvider?.name, providers.APIKEY_PROVIDERS["voyage-ai"].name);

  assert.equal(rerankProvider?.category, "apikey");
  assert.equal(rerankProvider?.name, providers.APIKEY_PROVIDERS["jina-ai"].name);

  assert.equal(webCookieProvider?.category, "web-cookie");
  assert.equal(webCookieProvider?.name, providers.WEB_COOKIE_PROVIDERS["grok-web"].name);

  assert.equal(perplexityWebProvider?.category, "web-cookie");
  assert.equal(perplexityWebProvider?.name, providers.WEB_COOKIE_PROVIDERS["perplexity-web"].name);

  assert.equal(blackboxWebProvider?.category, "web-cookie");
  assert.equal(blackboxWebProvider?.name, providers.WEB_COOKIE_PROVIDERS["blackbox-web"].name);

  assert.equal(museSparkWebProvider?.category, "web-cookie");
  assert.equal(museSparkWebProvider?.name, providers.WEB_COOKIE_PROVIDERS["muse-spark-web"].name);

  assert.equal(upstreamProvider?.category, "upstream-proxy");
  assert.equal(
    upstreamProvider?.name,
    providerCatalog.STATIC_PROVIDER_CATALOG_GROUPS["upstream-proxy"].providers.cliproxyapi.name
  );
});

test("managed provider connection ids include supported static categories and exclude upstream proxy", () => {
  assert.equal(providerCatalog.isManagedProviderConnectionId("qoder"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("glhf"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("gitlab"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("cablyai"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("thebai"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("fenayai"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("chutes"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("datarobot"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("clarifai"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("empower"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("nous-research"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("poe"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("azure-openai"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("azure-ai"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("bedrock"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("watsonx"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("oci"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("sap"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("modal"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("reka"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("nlpcloud"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("runwayml"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("voyage-ai"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("jina-ai"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("sdwebui"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("lm-studio"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("vllm"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("lemonade"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("assemblyai"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("aws-polly"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("grok-web"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("perplexity-web"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("blackbox-web"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("muse-spark-web"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("brave-search"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("youcom-search"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("cliproxyapi"), false);
  assert.equal(providerCatalog.isManagedProviderConnectionId("claude"), false);
  assert.equal(providerCatalog.isManagedProviderConnectionId("jules"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("devin"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("codex-cloud"), true);
});

test("grok-web taxonomy stays web-cookie only and does not leak into api-key entries", () => {
  assert.equal("grok-web" in providers.APIKEY_PROVIDERS, false);
  assert.equal("grok-web" in providers.WEB_COOKIE_PROVIDERS, true);
  assert.equal("sdwebui" in providers.APIKEY_PROVIDERS, false);
  assert.equal("sdwebui" in providers.LOCAL_PROVIDERS, true);
  assert.equal("lm-studio" in providers.APIKEY_PROVIDERS, false);
  assert.equal("lm-studio" in providers.LOCAL_PROVIDERS, true);
  assert.equal("vllm" in providers.APIKEY_PROVIDERS, false);
  assert.equal("vllm" in providers.LOCAL_PROVIDERS, true);
  assert.equal("lemonade" in providers.APIKEY_PROVIDERS, false);
  assert.equal("lemonade" in providers.LOCAL_PROVIDERS, true);
  assert.equal("comfyui" in providers.APIKEY_PROVIDERS, false);
  assert.equal("comfyui" in providers.LOCAL_PROVIDERS, true);
  assert.equal("blackbox-web" in providers.APIKEY_PROVIDERS, false);
  assert.equal("blackbox-web" in providers.WEB_COOKIE_PROVIDERS, true);
  assert.equal("muse-spark-web" in providers.APIKEY_PROVIDERS, false);
  assert.equal("muse-spark-web" in providers.WEB_COOKIE_PROVIDERS, true);
  assert.equal("glhf" in providers.APIKEY_PROVIDERS, true);
  assert.equal("gitlab" in providers.APIKEY_PROVIDERS, true);
  assert.equal("gitlab-duo" in providers.OAUTH_PROVIDERS, true);
  assert.equal("cablyai" in providers.APIKEY_PROVIDERS, true);
  assert.equal("thebai" in providers.APIKEY_PROVIDERS, true);
  assert.equal("fenayai" in providers.APIKEY_PROVIDERS, true);
  assert.equal("chutes" in providers.APIKEY_PROVIDERS, true);
  assert.equal("datarobot" in providers.APIKEY_PROVIDERS, true);
  assert.equal("clarifai" in providers.APIKEY_PROVIDERS, true);
  assert.equal("empower" in providers.APIKEY_PROVIDERS, true);
  assert.equal("nous-research" in providers.APIKEY_PROVIDERS, true);
  assert.equal("poe" in providers.APIKEY_PROVIDERS, true);
  assert.equal("azure-ai" in providers.APIKEY_PROVIDERS, true);
  assert.equal("bedrock" in providers.APIKEY_PROVIDERS, true);
  assert.equal("watsonx" in providers.APIKEY_PROVIDERS, true);
  assert.equal("oci" in providers.APIKEY_PROVIDERS, true);
  assert.equal("sap" in providers.APIKEY_PROVIDERS, true);
  assert.equal("modal" in providers.APIKEY_PROVIDERS, true);
  assert.equal("reka" in providers.APIKEY_PROVIDERS, true);
  assert.equal("nlpcloud" in providers.APIKEY_PROVIDERS, true);
  assert.equal("runwayml" in providers.APIKEY_PROVIDERS, true);
  assert.equal("voyage-ai" in providers.APIKEY_PROVIDERS, true);
  assert.equal("jina-ai" in providers.APIKEY_PROVIDERS, true);

  const apiKeyEntries = providerPageUtils.buildStaticProviderEntries("apikey", () => ({
    total: 0,
  }));
  const localEntries = providerPageUtils.buildStaticProviderEntries("local", () => ({
    total: 0,
  }));
  const webCookieEntries = providerPageUtils.buildStaticProviderEntries("web-cookie", () => ({
    total: 0,
  }));

  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "sdwebui"),
    false
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "comfyui"),
    false
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "lm-studio"),
    false
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "vllm"),
    false
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "lemonade"),
    false
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "grok-web"),
    false
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "glhf"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "gitlab"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "cablyai"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "thebai"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "fenayai"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "chutes"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "datarobot"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "clarifai"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "empower"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "nous-research"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "poe"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "azure-ai"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "bedrock"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "watsonx"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "oci"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "sap"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "modal"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "reka"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "nlpcloud"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "runwayml"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "voyage-ai"),
    true
  );
  assert.equal(
    apiKeyEntries.some((entry) => entry.providerId === "jina-ai"),
    true
  );
  assert.equal(
    localEntries.some((entry) => entry.providerId === "sdwebui"),
    true
  );
  assert.equal(
    localEntries.some((entry) => entry.providerId === "comfyui"),
    true
  );
  assert.equal(
    localEntries.some((entry) => entry.providerId === "lm-studio"),
    true
  );
  assert.equal(
    localEntries.some((entry) => entry.providerId === "vllm"),
    true
  );
  assert.equal(
    localEntries.some((entry) => entry.providerId === "lemonade"),
    true
  );
  assert.equal(
    webCookieEntries.some((entry) => entry.providerId === "grok-web"),
    true
  );
  assert.equal(
    webCookieEntries.some((entry) => entry.providerId === "blackbox-web"),
    true
  );
  assert.equal(
    webCookieEntries.some((entry) => entry.providerId === "muse-spark-web"),
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

test("model search filter matches providers by model id", async () => {
  const { getModelsByProviderId } = await import("../../src/shared/constants/models.ts");

  const entries = [
    {
      providerId: "trae",
      provider: { name: "Trae" },
      stats: { total: 0 },
      displayAuthType: "oauth" as const,
      toggleAuthType: "oauth" as const,
    },
    {
      providerId: "openai",
      provider: { name: "OpenAI" },
      stats: { total: 1 },
      displayAuthType: "apikey" as const,
      toggleAuthType: "apikey" as const,
    },
    {
      providerId: "minimax",
      provider: { name: "MiniMax" },
      stats: { total: 1 },
      displayAuthType: "apikey" as const,
      toggleAuthType: "apikey" as const,
    },
    {
      providerId: "nonexistent-provider-xyz",
      provider: { name: "No Models" },
      stats: { total: 0 },
      displayAuthType: "apikey" as const,
      toggleAuthType: "apikey" as const,
    },
  ];

  // "minimax-m3" model id exists in trae, opencode, bazaarlink, cerebras
  const byModelId = providerPageUtils.filterConfiguredProviderEntries(
    entries,
    false,
    undefined,
    undefined,
    "minimax-m3"
  );
  const matchedIds = byModelId.map((e) => e.providerId);
  assert.ok(matchedIds.includes("trae"), "trae should match minimax-m3 by model id");
  assert.ok(!matchedIds.includes("openai"), "openai should not match minimax-m3");

  // "MiniMax-M3" model id exists in minimax provider itself (different casing)
  // getModelsByProviderId("minimax") should include MiniMax-M3
  const minimaxModels = getModelsByProviderId("minimax");
  const hasMinimaxM3 = minimaxModels.some((m) => m.id === "MiniMax-M3");
  if (hasMinimaxM3) {
    const byMinimaxM3 = providerPageUtils.filterConfiguredProviderEntries(
      entries,
      false,
      undefined,
      undefined,
      "MiniMax-M3"
    );
    assert.ok(
      byMinimaxM3.map((e) => e.providerId).includes("minimax"),
      "minimax should match MiniMax-M3 by model id"
    );
  }

  // Provider with no models shouldn't match
  const byNonexistentModel = providerPageUtils.filterConfiguredProviderEntries(
    entries,
    false,
    undefined,
    undefined,
    "model-that-does-not-exist"
  );
  assert.equal(byNonexistentModel.length, 0);

  // Empty model search returns all
  const byEmptyModel = providerPageUtils.filterConfiguredProviderEntries(
    entries,
    false,
    undefined,
    undefined,
    ""
  );
  assert.equal(byEmptyModel.length, entries.length);

  // Whitespace-only model search returns all
  const byWhitespaceModel = providerPageUtils.filterConfiguredProviderEntries(
    entries,
    false,
    undefined,
    undefined,
    "   "
  );
  assert.equal(byWhitespaceModel.length, entries.length);
});

test("model search filter matches by model name", () => {
  const entries = [
    {
      providerId: "minimax",
      provider: { name: "MiniMax" },
      stats: { total: 0 },
      displayAuthType: "apikey" as const,
      toggleAuthType: "apikey" as const,
    },
    {
      providerId: "openai",
      provider: { name: "OpenAI" },
      stats: { total: 1 },
      displayAuthType: "apikey" as const,
      toggleAuthType: "apikey" as const,
    },
  ];

  // "MiniMax M3" is the model name for the MiniMax provider's MiniMax-M3 model
  const byName = providerPageUtils.filterConfiguredProviderEntries(
    entries,
    false,
    undefined,
    undefined,
    "MiniMax M3"
  );
  assert.ok(
    byName.map((e) => e.providerId).includes("minimax"),
    "minimax should match by model name 'MiniMax M3'"
  );
  assert.ok(
    !byName.map((e) => e.providerId).includes("openai"),
    "openai should not match 'MiniMax M3'"
  );
});

test("model search filter combines with configured-only and text search", () => {
  const entries = [
    {
      providerId: "trae",
      provider: { name: "Trae" },
      stats: { total: 1 },
      displayAuthType: "oauth" as const,
      toggleAuthType: "oauth" as const,
    },
    {
      providerId: "opencode",
      provider: { name: "OpenCode" },
      stats: { total: 0 },
      displayAuthType: "no-auth" as const,
      toggleAuthType: "no-auth" as const,
    },
    {
      providerId: "minimax",
      provider: { name: "MiniMax" },
      stats: { total: 0 },
      displayAuthType: "apikey" as const,
      toggleAuthType: "apikey" as const,
    },
    {
      providerId: "openai",
      provider: { name: "OpenAI" },
      stats: { total: 1 },
      displayAuthType: "apikey" as const,
      toggleAuthType: "apikey" as const,
    },
  ];

  // Model filter + configured-only: only configured providers with minimax-m3
  const modelAndConfigured = providerPageUtils.filterConfiguredProviderEntries(
    entries,
    true,
    undefined,
    undefined,
    "minimax-m3"
  );
  const modelAndConfigIds = modelAndConfigured.map((e) => e.providerId);
  // trae has minimax-m3 AND is configured (total > 0)
  assert.ok(modelAndConfigIds.includes("trae"), "configured trae should match minimax-m3");
  // opencode has minimax-m3 but is no-auth (always visible regardless of configured filter)
  // bazaarlink is not in our test entries
  assert.ok(
    !modelAndConfigIds.includes("openai"),
    "openai should not match minimax-m3 model filter"
  );

  // Model filter + text search: both must match (AND logic)
  const modelAndSearch = providerPageUtils.filterConfiguredProviderEntries(
    entries,
    false,
    "Trae",
    undefined,
    "minimax-m3"
  );
  assert.deepEqual(
    modelAndSearch.map((e) => e.providerId),
    ["trae"],
    "only trae matches both search 'Trae' AND model 'minimax-m3'"
  );

  // Model filter that matches nothing with valid text search
  const noModelMatch = providerPageUtils.filterConfiguredProviderEntries(
    entries,
    false,
    undefined,
    undefined,
    "nonexistent-model-xyz"
  );
  assert.equal(noModelMatch.length, 0);
});

test("model search filter is case-insensitive and partial-match", () => {
  const entries = [
    {
      providerId: "trae",
      provider: { name: "Trae" },
      stats: { total: 0 },
      displayAuthType: "oauth" as const,
      toggleAuthType: "oauth" as const,
    },
  ];

  // Case insensitive
  const byUppercase = providerPageUtils.filterConfiguredProviderEntries(
    entries,
    false,
    undefined,
    undefined,
    "MINIMAX-M3"
  );
  assert.equal(byUppercase.length, 1, "model search should be case-insensitive");

  // Partial match
  const byPartial = providerPageUtils.filterConfiguredProviderEntries(
    entries,
    false,
    undefined,
    undefined,
    "minimax"
  );
  assert.equal(byPartial.length, 1, "partial model id 'minimax' should match 'minimax-m3'");
});

// #4613: buildCompatibleProviderGroups partitions provider nodes into the
// openai-compatible / anthropic-compatible / claude-code-compatible buckets the
// providers page renders. The memoization in page.tsx wraps this pure helper, so
// guarding the partition logic here is the regression that matters (Rule #18).
test("buildCompatibleProviderGroups partitions nodes by type + claude-code prefix", () => {
  const labels = {
    openaiCompatibleName: "OpenAI-compatible",
    anthropicCompatibleName: "Anthropic-compatible",
    claudeCodeCompatibleName: "Claude Code-compatible",
  };

  const groups = providerPageUtils.buildCompatibleProviderGroups(
    [
      { id: "my-oai", name: "My OAI", type: "openai-compatible", apiType: "responses" },
      { id: "my-anthropic", name: "My Claude", type: "anthropic-compatible" },
      { id: "anthropic-compatible-cc-acme", name: "Acme CC", type: "anthropic-compatible" },
      { id: "ignored-node", name: "Ignored", type: "unsupported-provider" },
      // name omitted → falls back to the provided label
      { id: "anon-oai", type: "openai-compatible" },
    ],
    labels
  );

  assert.deepEqual(
    groups.openai.map((p) => p.id),
    ["my-oai", "anon-oai"],
    "openai-compatible nodes land in the openai bucket"
  );
  assert.equal(groups.openai[0].apiType, "responses", "apiType is preserved");
  assert.equal(
    groups.openai[1].name,
    labels.openaiCompatibleName,
    "missing name falls back to the openai-compatible label"
  );

  assert.deepEqual(
    groups.anthropic.map((p) => p.id),
    ["my-anthropic"],
    "plain anthropic-compatible nodes land in the anthropic bucket"
  );

  assert.deepEqual(
    groups.claudeCode.map((p) => p.id),
    ["anthropic-compatible-cc-acme"],
    "anthropic-compatible nodes with the cc- prefix land in the claudeCode bucket"
  );
});

test("connectionMatchesProviderCard counts a dual-auth provider's PAT (apikey) connection on its OAuth card", () => {
  const { connectionMatchesProviderCard } = providerPageUtils;

  // qoder is OAuth-categorized but its working auth is a PAT (authType "apikey").
  // Regression: the OAuth card must count the PAT connection, else the dashboard
  // shows a connected qoder as "not connected".
  assert.equal(
    connectionMatchesProviderCard({ provider: "qoder", authType: "apikey" }, "qoder", "oauth"),
    true
  );
  assert.equal(
    connectionMatchesProviderCard({ provider: "qoder", authType: "oauth" }, "qoder", "oauth"),
    true
  );

  // A normal OAuth-only provider must NOT count an apikey connection on its OAuth card.
  assert.equal(
    connectionMatchesProviderCard({ provider: "claude", authType: "apikey" }, "claude", "oauth"),
    false
  );
  assert.equal(
    connectionMatchesProviderCard({ provider: "claude", authType: "oauth" }, "claude", "oauth"),
    true
  );

  // Provider mismatch and the "free" card (counts everything) behave as expected.
  assert.equal(
    connectionMatchesProviderCard({ provider: "openai", authType: "apikey" }, "qoder", "oauth"),
    false
  );
  assert.equal(
    connectionMatchesProviderCard({ provider: "qoder", authType: "apikey" }, "qoder", "free"),
    true
  );

  // Defensive: a null/undefined connection must not throw (gemini-code-assist).
  assert.equal(connectionMatchesProviderCard(null, "qoder", "oauth"), false);
  assert.equal(connectionMatchesProviderCard(undefined, "qoder", "oauth"), false);
});
