// Kimi (Moonshot AI) featured-first ordering — split out of
// providers-page-utils.test.ts (2026-07-21) to keep that frozen file under
// its size cap; same providerPageUtils/featuredProviders module under test,
// no assertions dropped or weakened in the split.
import test from "node:test";
import assert from "node:assert/strict";

const providerPageUtils =
  await import("../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts");
const providers = await import("../../src/shared/constants/providers.ts");
const featuredProviders =
  await import("../../src/app/(dashboard)/dashboard/providers/featuredProviders.ts");

// ── Kimi (Moonshot AI) official-partnership featured-first ordering (2026-07) ──
// UI-only pin: Kimi-family providers must render first within whichever
// category/group they appear in on the providers dashboard. This must never
// touch routing/fallback order (open-sse/config/providerRegistry.ts) — only how
// filterConfiguredProviderEntries sorts a category's card grid.

test("featuredProviders identifies every Kimi/Moonshot dashboard provider id", () => {
  const { isFeaturedProviderId, isKimiPartnerProviderId, KIMI_BRAND_COLOR } = featuredProviders;

  for (const id of ["kimi", "kimi-coding", "kimi-coding-apikey", "kimi-web", "moonshot"]) {
    assert.equal(isFeaturedProviderId(id), true, `${id} should be featured`);
    assert.equal(isKimiPartnerProviderId(id), true, `${id} should be a Kimi partner id`);
  }

  // Unrelated providers must not be swept in.
  for (const id of ["openai", "claude", "moonshot-labs", "kimichat", null, undefined, ""]) {
    assert.equal(isFeaturedProviderId(id), false, `${id} should not be featured`);
    assert.equal(isKimiPartnerProviderId(id), false, `${id} should not be a Kimi partner id`);
  }

  assert.equal(KIMI_BRAND_COLOR, "#1783FF");
});

test("sortProviderEntriesFeaturedFirst pins Kimi providers first, alphabetical otherwise", () => {
  const entry = (providerId: string, name: string) => ({
    providerId,
    provider: { id: providerId, name },
    stats: { total: 0 },
    displayAuthType: "apikey",
    toggleAuthType: "apikey",
  });

  // Deliberately alphabetically-earlier non-Kimi providers ("Acme", "Anthropic")
  // so the assertion actually proves the pin overrides pure alphabetical order,
  // not merely that Kimi happens to sort first on its own.
  const entries = [
    entry("zulu-provider", "Zulu Provider"),
    entry("moonshot", "Kimi"),
    entry("acme", "Acme"),
    entry("kimi-web", "Kimi Web"),
    entry("anthropic-clone", "Anthropic Clone"),
    entry("kimi-coding", "Kimi Code CLI"),
  ];

  const sorted = providerPageUtils.sortProviderEntriesFeaturedFirst(entries);

  // "Kimi" (moonshot's rebranded display name) alphabetically precedes "Kimi
  // Code CLI" and "Kimi Web" — a shorter string that is a prefix of a longer
  // one sorts first — so moonshot leads the featured group.
  assert.deepEqual(
    sorted.map((e) => e.providerId),
    ["moonshot", "kimi-coding", "kimi-web", "acme", "anthropic-clone", "zulu-provider"],
    "featured (Kimi) entries come first, each group alphabetical among itself"
  );
});

test("filterConfiguredProviderEntries surfaces Kimi first within a mixed category (oauth section shape)", () => {
  const entries = [
    { providerId: "claude", provider: { name: "Claude" }, stats: { total: 1 }, displayAuthType: "oauth", toggleAuthType: "oauth" },
    { providerId: "kimi-coding", provider: { name: "Kimi Code CLI" }, stats: { total: 0 }, displayAuthType: "oauth", toggleAuthType: "oauth" },
    { providerId: "amazon-q", provider: { name: "Amazon Q" }, stats: { total: 0 }, displayAuthType: "oauth", toggleAuthType: "oauth" },
  ];

  // No filters applied (showConfiguredOnly=false) — pure ordering behavior.
  const visible = providerPageUtils.filterConfiguredProviderEntries(entries, false);
  assert.deepEqual(
    visible.map((e) => e.providerId),
    ["kimi-coding", "amazon-q", "claude"],
    "kimi-coding is pinned first even though 'Amazon Q' and 'Claude' sort earlier alphabetically"
  );
});

test("sortProviderEntriesFeaturedFirst leaves a category with no featured providers alphabetical", () => {
  const entry = (providerId: string, name: string) => ({
    providerId,
    provider: { name },
    stats: { total: 0 },
    displayAuthType: "apikey",
    toggleAuthType: "apikey",
  });
  const entries = [entry("zulu", "Zulu"), entry("acme", "Acme"), entry("mid", "Mid")];

  const sorted = providerPageUtils.sortProviderEntriesFeaturedFirst(entries);
  assert.deepEqual(
    sorted.map((e) => e.providerId),
    ["acme", "mid", "zulu"]
  );
});

// ── Section-scoped proof against the REAL catalog (not synthetic mocks) ───────
// page.tsx builds each dashboard section as
// buildStaticProviderEntries(category) -> filterConfiguredProviderEntries(...).
// These tests replicate that exact call chain per real section to prove where
// each real Kimi/Moonshot card actually lands — the 3 sections that render a
// Kimi-family card today: OAuth (kimi-coding), Web Cookie (kimi-web), and the
// "LLM providers" subsection of API Key (moonshot). kimi-coding-apikey and kimi
// are both hiddenFromDashboard and never render their own card in ANY section
// (kimi-coding-apikey folds into the kimi-coding card's own connection flow —
// see KimiCodeAuthMethodModal.tsx; verified below).

test("real OAuth section pins kimi-coding first (page.tsx's oauthProviderEntries shape)", () => {
  const getProviderStats = () => ({ total: 0 });
  const oauthEntriesAll = providerPageUtils.buildStaticProviderEntries("oauth", getProviderStats);
  const oauthEntries = providerPageUtils.filterConfiguredProviderEntries(oauthEntriesAll, false);

  assert.ok(oauthEntries.length > 5, "sanity: the real OAuth section has many providers");
  assert.equal(
    oauthEntries[0].providerId,
    "kimi-coding",
    "kimi-coding (Kimi Code CLI) must be the first card in the real OAuth section"
  );
});

test("real Web Cookie section pins kimi-web first (page.tsx's webCookieProviderEntries shape)", () => {
  const getProviderStats = () => ({ total: 0 });
  const webCookieEntriesAll = providerPageUtils.buildStaticProviderEntries(
    "web-cookie",
    getProviderStats
  );
  const webCookieEntries = providerPageUtils.filterConfiguredProviderEntries(
    webCookieEntriesAll,
    false
  );

  assert.ok(webCookieEntries.length > 5, "sanity: the real Web Cookie section has many providers");
  assert.equal(
    webCookieEntries[0].providerId,
    "kimi-web",
    "kimi-web (Kimi Web) must be the first card in the real Web Cookie section"
  );
});

test("real API Key -> LLM subsection pins moonshot first (page.tsx's llmProviderEntries shape)", () => {
  const getProviderStats = () => ({ total: 0 });
  const apiKeyEntriesAll = providerPageUtils.buildStaticProviderEntries("apikey", getProviderStats);
  // Mirrors page.tsx's llmProviderEntriesAll filter exactly (moonshot is not an
  // image/aggregator/enterprise-cloud/video/embedding-rerank provider).
  const llmEntriesAll = apiKeyEntriesAll.filter(
    (entry) =>
      !providers.IMAGE_ONLY_PROVIDER_IDS.has(entry.providerId) &&
      !providers.AGGREGATOR_PROVIDER_IDS.has(entry.providerId) &&
      !providers.ENTERPRISE_CLOUD_PROVIDER_IDS.has(entry.providerId) &&
      !providers.VIDEO_PROVIDER_IDS.has(entry.providerId) &&
      !providers.EMBEDDING_RERANK_PROVIDER_IDS.has(entry.providerId)
  );
  const llmEntries = providerPageUtils.filterConfiguredProviderEntries(llmEntriesAll, false);

  assert.ok(llmEntries.length > 5, "sanity: the real API Key -> LLM subsection has many providers");
  assert.equal(
    llmEntries[0].providerId,
    "moonshot",
    "moonshot (displayed as 'Kimi', where kimi-k3 lives) must be the first card in the real API Key -> LLM subsection"
  );

  // kimi-coding-apikey and kimi (both hiddenFromDashboard) never surface as
  // their own card here or in any other section — see the dedicated test below.
  assert.equal(llmEntries.some((e) => e.providerId === "kimi-coding-apikey"), false);
  assert.equal(llmEntries.some((e) => e.providerId === "kimi"), false);
});

test("kimi-coding-apikey and kimi never render as their own dashboard card in ANY section (hiddenFromDashboard)", () => {
  const getProviderStats = () => ({ total: 0 });
  const categories = [
    "no-auth",
    "oauth",
    "web-cookie",
    "local",
    "search",
    "audio",
    "upstream-proxy",
    "apikey",
    "cloud-agent",
  ] as const;

  for (const category of categories) {
    const entries = providerPageUtils.buildStaticProviderEntries(category, getProviderStats);
    assert.equal(
      entries.some((e) => e.providerId === "kimi-coding-apikey"),
      false,
      `kimi-coding-apikey must not appear as its own card in the "${category}" category`
    );
    assert.equal(
      entries.some((e) => e.providerId === "kimi"),
      false,
      `kimi (legacy alias) must not appear as its own card in the "${category}" category`
    );
  }
});
