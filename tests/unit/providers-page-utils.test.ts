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

test("static catalog entries resolve local, search, audio, web-cookie and upstream providers", () => {
  const freeProvider = providerPageUtils.resolveDashboardProviderInfo("amazon-q");
  const localProvider = providerPageUtils.resolveDashboardProviderInfo("sdwebui");
  const localChatProvider = providerPageUtils.resolveDashboardProviderInfo("lm-studio");
  const searchProvider = providerPageUtils.resolveDashboardProviderInfo("brave-search");
  const youcomSearchProvider = providerPageUtils.resolveDashboardProviderInfo("youcom-search");
  const audioProvider = providerPageUtils.resolveDashboardProviderInfo("assemblyai");
  const webCookieProvider = providerPageUtils.resolveDashboardProviderInfo("grok-web");
  const apiKeyProvider = providerPageUtils.resolveDashboardProviderInfo("glhf");
  const gitlabProvider = providerPageUtils.resolveDashboardProviderInfo("gitlab");
  const gitlabDuoProvider = providerPageUtils.resolveDashboardProviderInfo("gitlab-duo");
  const chutesProvider = providerPageUtils.resolveDashboardProviderInfo("chutes");
  const datarobotProvider = providerPageUtils.resolveDashboardProviderInfo("datarobot");
  const clarifaiProvider = providerPageUtils.resolveDashboardProviderInfo("clarifai");
  const empowerProvider = providerPageUtils.resolveDashboardProviderInfo("empower");
  const nousProvider = providerPageUtils.resolveDashboardProviderInfo("nous-research");
  const petalsProvider = providerPageUtils.resolveDashboardProviderInfo("petals");
  const poeProvider = providerPageUtils.resolveDashboardProviderInfo("poe");
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

  assert.equal(freeProvider?.category, "free");
  assert.equal(freeProvider?.name, providers.FREE_PROVIDERS["amazon-q"].name);

  assert.equal(localProvider?.category, "local");
  assert.equal(localProvider?.name, providers.LOCAL_PROVIDERS.sdwebui.name);
  assert.equal(localChatProvider?.category, "local");
  assert.equal(localChatProvider?.name, providers.LOCAL_PROVIDERS["lm-studio"].name);

  assert.equal(searchProvider?.category, "search");
  assert.equal(searchProvider?.name, providers.SEARCH_PROVIDERS["brave-search"].name);
  assert.equal(youcomSearchProvider?.category, "search");
  assert.equal(youcomSearchProvider?.name, providers.SEARCH_PROVIDERS["youcom-search"].name);

  assert.equal(audioProvider?.category, "audio");
  assert.equal(audioProvider?.name, providers.AUDIO_ONLY_PROVIDERS.assemblyai.name);

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
  assert.equal(petalsProvider?.category, "apikey");
  assert.equal(petalsProvider?.name, providers.APIKEY_PROVIDERS.petals.name);
  assert.equal(poeProvider?.category, "apikey");
  assert.equal(poeProvider?.name, providers.APIKEY_PROVIDERS.poe.name);
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
  assert.equal(providerCatalog.isManagedProviderConnectionId("petals"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("poe"), true);
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
  assert.equal(providerCatalog.isManagedProviderConnectionId("assemblyai"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("grok-web"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("perplexity-web"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("blackbox-web"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("muse-spark-web"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("brave-search"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("youcom-search"), true);
  assert.equal(providerCatalog.isManagedProviderConnectionId("cliproxyapi"), false);
  assert.equal(providerCatalog.isManagedProviderConnectionId("claude"), false);
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
  assert.equal("petals" in providers.APIKEY_PROVIDERS, true);
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
    apiKeyEntries.some((entry) => entry.providerId === "petals"),
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
