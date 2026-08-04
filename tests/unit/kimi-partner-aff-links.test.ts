// Kimi (Moonshot AI) official-partnership: display-name rebrand (moonshot ->
// "Kimi") and the aff-tracking links wired into the 3 visible Kimi provider
// cards' top-of-page header link (ProviderPageHeader.tsx renders
// `providerInfo.website` as the clickable title). Asserts the exact URLs —
// no trailing-slash drift, no leftover unattributed platform.moonshot.ai.
import test from "node:test";
import assert from "node:assert/strict";

const providers = await import("../../src/shared/constants/providers.ts");
const featuredProviders = await import(
  "../../src/app/(dashboard)/dashboard/providers/featuredProviders.ts"
);

const KIMI_CODING_AFF_URL = "https://www.kimi.com/code?aff=omniroute";
const KIMI_PLATFORM_AFF_URL = "https://platform.kimi.ai?aff=omniroute";

test("moonshot: id/alias/routing untouched, display name rebranded to 'Kimi'", () => {
  const moonshot = providers.APIKEY_PROVIDERS.moonshot;
  assert.ok(moonshot, "moonshot must still exist in the apikey catalog");
  assert.equal(moonshot.id, "moonshot", "id must never change — DB/routes/combos address it by id");
  assert.equal(moonshot.alias, "moonshot", "alias must never change");
  assert.equal(moonshot.name, "Kimi", "display name is the rebrand target");
});

test("moonshot top-of-page link: the Kimi API Platform aff link (was unattributed platform.moonshot.ai)", () => {
  assert.equal(providers.APIKEY_PROVIDERS.moonshot.website, KIMI_PLATFORM_AFF_URL);
});

test("kimi-coding (Kimi Code CLI) top-of-page link: the Kimi Coding Plan aff link (was missing)", () => {
  const kimiCoding = providers.OAUTH_PROVIDERS["kimi-coding"];
  assert.ok(kimiCoding, "kimi-coding must still exist in the oauth catalog");
  assert.equal(kimiCoding.name, "Kimi Code CLI", "display name is unchanged by the rename");
  assert.equal(kimiCoding.website, KIMI_CODING_AFF_URL);
});

test("kimi-web (Kimi Web) top-of-page link: the Kimi Coding Plan aff link (was the bare kimi.com domain)", () => {
  const kimiWeb = providers.WEB_COOKIE_PROVIDERS["kimi-web"];
  assert.ok(kimiWeb, "kimi-web must still exist in the web-cookie catalog");
  assert.equal(kimiWeb.name, "Kimi Web", "display name is unchanged by the rename");
  assert.equal(kimiWeb.website, KIMI_CODING_AFF_URL);
});

test("kimi-coding-apikey (hidden, folds into kimi-coding card) also carries the aff link", () => {
  assert.equal(providers.APIKEY_PROVIDERS["kimi-coding-apikey"].website, KIMI_CODING_AFF_URL);
});

test("legacy 'kimi' alias (hidden) is aligned to the platform aff link too", () => {
  assert.equal(providers.APIKEY_PROVIDERS.kimi.website, KIMI_PLATFORM_AFF_URL);
});

test("no visible Kimi provider website field still points at the unattributed platform.moonshot.ai domain", () => {
  for (const id of ["kimi", "kimi-coding", "kimi-coding-apikey", "kimi-web", "moonshot"]) {
    assert.ok(featuredProviders.isKimiPartnerProviderId(id), `${id} must be a Kimi partner id`);
  }
  const allApikey = Object.values(providers.APIKEY_PROVIDERS);
  const allOauth = Object.values(providers.OAUTH_PROVIDERS);
  const allWebCookie = Object.values(providers.WEB_COOKIE_PROVIDERS);
  for (const provider of [...allApikey, ...allOauth, ...allWebCookie]) {
    if (featuredProviders.isKimiPartnerProviderId(provider.id) && provider.website) {
      assert.doesNotMatch(
        provider.website,
        /^https:\/\/platform\.moonshot\.ai\/?$/,
        `${provider.id}.website must not be the unattributed legacy domain`
      );
    }
  }
});

test("runtime endpoints are untouched by the rename/aff-link changes (moonshot API base URL still api.moonshot.ai)", async () => {
  // Guard against the aff-link change ever leaking into a runtime executor
  // config — website is a UI navigation field only, never a fetch target.
  const registry = await import(
    "../../open-sse/config/providers/registry/moonshot/index.ts"
  );
  assert.equal(registry.moonshotProvider.baseUrl, "https://api.moonshot.ai/v1/chat/completions");
});
