import assert from "node:assert/strict";
import test from "node:test";

import type { ComboBuilderProviderOption } from "../../src/lib/combos/builderOptions.ts";
import type { MergedEntry } from "../../src/lib/radar/applyFeed.ts";
import { buildRadarComboSuggestions } from "../../src/lib/radar/comboSuggestions.ts";

function entry(
  overrides: Partial<MergedEntry> & Pick<MergedEntry, "provider" | "modelId">
): MergedEntry {
  return {
    provider: overrides.provider,
    modelId: overrides.modelId,
    displayName: overrides.displayName ?? overrides.modelId,
    monthlyTokens: overrides.monthlyTokens ?? 100,
    creditTokens: 0,
    freeType: "recurring-daily",
    poolKey: null,
    tos: "ok",
    enabled: true,
    origin: "radar",
    familyId: "shared-family",
    ...overrides,
  };
}

function provider(
  providerId: string,
  modelId: string,
  overrides: Partial<ComboBuilderProviderOption> = {}
): ComboBuilderProviderOption {
  return {
    providerId,
    providerType: providerId,
    displayName: providerId.toUpperCase(),
    alias: providerId,
    icon: "api",
    color: "#000000",
    source: "system",
    acceptsArbitraryModel: false,
    connectionCount: 1,
    activeConnectionCount: 1,
    modelCount: 1,
    connections: [],
    models: [
      {
        id: modelId,
        qualifiedModel: `${providerId}/${modelId}`,
        name: modelId,
        source: "system",
        sources: ["system"],
      },
    ],
    ...overrides,
  };
}

test("two active providers in one family create one deterministic priority suggestion", () => {
  const suggestions = buildRadarComboSuggestions({
    entries: [
      entry({ provider: "groq", modelId: "llama", monthlyTokens: 200 }),
      entry({ provider: "cerebras", modelId: "llama", monthlyTokens: 300 }),
    ],
    providers: [provider("groq", "llama"), provider("cerebras", "llama")],
    existingComboNames: [],
  });

  assert.equal(suggestions.length, 1);
  assert.equal(suggestions[0].familyId, "shared-family");
  assert.equal(suggestions[0].name, "radar-shared-family");
  assert.equal(suggestions[0].alreadyExists, false);
  assert.deepEqual(suggestions[0].payload, {
    name: "radar-shared-family",
    strategy: "priority",
    models: [
      { kind: "model", providerId: "cerebras", model: "cerebras/llama", weight: 0 },
      { kind: "model", providerId: "groq", model: "groq/llama", weight: 0 },
    ],
  });
});

test("ineligible entries fail closed while alias and prefix match exact provider models", () => {
  const suggestions = buildRadarComboSuggestions({
    entries: [
      entry({ provider: "gq", modelId: "llama", monthlyTokens: 500 }),
      entry({ provider: "cb", modelId: "llama", monthlyTokens: 400 }),
      entry({ provider: "inactive", modelId: "llama", monthlyTokens: 900 }),
      entry({ provider: "disabled", modelId: "llama", enabled: false }),
      entry({ provider: "missing-model", modelId: "other" }),
      entry({ provider: "singleton", modelId: "solo", familyId: "solo-family" }),
    ],
    providers: [
      provider("groq", "llama", { alias: "gq" }),
      provider("cerebras", "llama", { prefix: "cb" }),
      provider("inactive", "llama", { activeConnectionCount: 0 }),
      provider("disabled", "llama"),
      provider("missing-model", "llama"),
      provider("singleton", "solo"),
    ],
    existingComboNames: new Set(["RADAR-SHARED-FAMILY"]),
  });

  assert.equal(suggestions.length, 1);
  assert.equal(suggestions[0].alreadyExists, true);
  assert.deepEqual(
    suggestions[0].models.map((model) => model.providerId),
    ["groq", "cerebras"]
  );
});

test("ambiguous provider aliases, duplicate providers, empty families and unsafe names are closed", () => {
  const longFamily = `Family / ${"x".repeat(120)}`;
  const suggestions = buildRadarComboSuggestions({
    entries: [
      entry({ provider: "ambiguous", modelId: "m", familyId: "ambiguous-family" }),
      entry({ provider: "one", modelId: "m", familyId: longFamily, monthlyTokens: 200 }),
      entry({ provider: "two", modelId: "m", familyId: longFamily, monthlyTokens: 100 }),
      entry({ provider: "one", modelId: "m", familyId: longFamily, monthlyTokens: 50 }),
      entry({ provider: "one", modelId: "blank", familyId: "   " }),
    ],
    providers: [
      provider("ambiguous-a", "m", { alias: "ambiguous" }),
      provider("ambiguous-b", "m", { alias: "ambiguous" }),
      provider("one", "m"),
      provider("two", "m"),
    ],
    existingComboNames: [],
  });

  assert.equal(suggestions.length, 1);
  assert.ok(suggestions[0].name.length <= 100);
  assert.match(suggestions[0].name, /^[a-zA-Z0-9_/.\-\[\] ]+$/);
  assert.equal(new Set(suggestions[0].models.map((model) => model.providerId)).size, 2);
});
