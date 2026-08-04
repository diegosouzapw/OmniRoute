import test from "node:test";
import assert from "node:assert/strict";

const providerPageUtils =
  await import("../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts");

// #7250: the Providers page model-name filter only matched against the static
// curated model registry (getModelsByProviderId), never against a provider's
// live/synced catalog. Aggregator providers (openrouter, kilocode,
// theoldllm...) declare a single-entry static placeholder
// (`{ id: "auto", name: "Auto (Best Available)" }` for openrouter), so a
// search for any real upstream model name — e.g. "laguna" — could never
// match, and the whole provider silently disappeared from the list.

function makeOpenRouterEntry() {
  return {
    providerId: "openrouter",
    provider: { name: "OpenRouter" },
    stats: { total: 1 },
    displayAuthType: "apikey" as const,
    toggleAuthType: "apikey" as const,
  };
}

test("#7250: model filter still finds openrouter by its static 'auto' model id (non-regression)", () => {
  const entries = [makeOpenRouterEntry()];

  const filtered = providerPageUtils.filterConfiguredProviderEntries(
    entries,
    false,
    undefined,
    undefined,
    "auto"
  );

  assert.equal(
    filtered.length,
    1,
    "static registry match must keep working when no live catalog is supplied"
  );
});

test("#7250: model filter hides openrouter for a real upstream model name when only the static catalog is available (documents the bug's shape)", () => {
  const entries = [makeOpenRouterEntry()];

  const filtered = providerPageUtils.filterConfiguredProviderEntries(
    entries,
    false,
    undefined,
    undefined,
    "laguna"
  );

  assert.equal(
    filtered.length,
    0,
    "with no live catalog supplied, a real model name cannot match the single-entry static registry"
  );
});

test("#7250: model filter matches a real upstream model name when the live/synced catalog is supplied", () => {
  const entries = [makeOpenRouterEntry()];
  const liveModelsByProviderId = {
    openrouter: [
      { id: "meta-llama/llama-3.1-laguna", name: "Llama 3.1 Laguna" },
      { id: "anthropic/claude-3.5-sonnet", name: "Claude 3.5 Sonnet" },
    ],
  };

  const filtered = providerPageUtils.filterConfiguredProviderEntries(
    entries,
    false,
    undefined,
    undefined,
    "laguna",
    undefined,
    liveModelsByProviderId
  );

  assert.equal(
    filtered.length,
    1,
    "openrouter must be found once its live catalog is consulted, not just the static placeholder"
  );
  assert.equal(filtered[0].providerId, "openrouter");
});

test("#7250: an empty live catalog entry falls back to the static registry instead of excluding the provider", () => {
  const entries = [makeOpenRouterEntry()];
  const liveModelsByProviderId = { openrouter: [] };

  const filtered = providerPageUtils.filterConfiguredProviderEntries(
    entries,
    false,
    undefined,
    undefined,
    "auto",
    undefined,
    liveModelsByProviderId
  );

  assert.equal(
    filtered.length,
    1,
    "an empty/never-synced live catalog must not regress the static-only match"
  );
});

test("#7250: providers with a fully static catalog are unaffected by an unrelated live catalog map", () => {
  const entries = [
    {
      providerId: "minimax",
      provider: { name: "MiniMax" },
      stats: { total: 1 },
      displayAuthType: "apikey" as const,
      toggleAuthType: "apikey" as const,
    },
  ];
  const liveModelsByProviderId = {
    openrouter: [{ id: "meta-llama/llama-3.1-laguna", name: "Llama 3.1 Laguna" }],
  };

  const filtered = providerPageUtils.filterConfiguredProviderEntries(
    entries,
    false,
    undefined,
    undefined,
    "minimax-m3",
    undefined,
    liveModelsByProviderId
  );

  assert.equal(
    filtered.length,
    1,
    "minimax's own static-catalog match must be unaffected by an unrelated provider's live catalog"
  );
});
