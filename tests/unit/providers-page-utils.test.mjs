import test from "node:test";
import assert from "node:assert/strict";

const providerPageUtils =
  await import("../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts");
const providers = await import("../../src/shared/constants/providers.ts");

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
