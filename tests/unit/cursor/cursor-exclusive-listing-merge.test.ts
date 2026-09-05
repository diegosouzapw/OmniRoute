/**
 * Cursor exclusive live-catalog listing: when synced AvailableModels exists,
 * dashboard / Test All must list synced + injected auto* + custom only —
 * never the static registry effort/premium rows.
 */
import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { mergeProviderModelListing } from "@/lib/providers/mergeProviderModelListing";

describe("mergeProviderModelListing (cursor exclusive)", () => {
  const registry = [
    { id: "auto", name: "Auto (Server Picks)" },
    { id: "claude-4.6-sonnet-high", name: "Claude Sonnet High" },
    { id: "gpt-5.5-high", name: "GPT 5.5 High" },
    { id: "composer-2.5", name: "Composer 2.5" },
  ];

  it("exclusive + synced: drops static-only ids and injects auto*", () => {
    const models = mergeProviderModelListing({
      providerId: "cursor",
      registryModels: registry,
      syncedModels: [
        { id: "composer-2.5", name: "Composer 2.5" },
        { id: "claude-4.6-sonnet", name: "Claude 4.6 Sonnet" },
      ],
      customModels: [],
      usesCuratedModelsOnly: false,
    });

    const ids = models.map((m) => m.id);
    assert.ok(ids.includes("composer-2.5"));
    assert.ok(ids.includes("claude-4.6-sonnet"));
    assert.ok(ids.includes("auto"));
    assert.ok(ids.includes("auto-cost"));
    assert.ok(ids.includes("auto-balance"));
    assert.ok(ids.includes("auto-intelligence"));
    assert.equal(ids.includes("claude-4.6-sonnet-high"), false);
    assert.equal(ids.includes("gpt-5.5-high"), false);
    assert.ok(models.every((m) => m.source === "imported" || m.id.startsWith("auto")));
  });

  it("exclusive + synced: keeps operator custom models", () => {
    const models = mergeProviderModelListing({
      providerId: "cursor",
      registryModels: registry,
      syncedModels: [{ id: "composer-2.5", name: "Composer 2.5" }],
      customModels: [{ id: "my-custom", name: "My Custom", source: "custom" }],
      usesCuratedModelsOnly: false,
    });
    const custom = models.find((m) => m.id === "my-custom");
    assert.ok(custom);
    assert.equal(custom.source, "custom");
  });

  it("exclusive + empty synced: falls back to registry ∪ custom", () => {
    const models = mergeProviderModelListing({
      providerId: "cursor",
      registryModels: registry,
      syncedModels: [],
      customModels: [{ id: "my-custom", name: "My Custom" }],
      usesCuratedModelsOnly: false,
    });
    const ids = models.map((m) => m.id);
    assert.ok(ids.includes("claude-4.6-sonnet-high"));
    assert.ok(ids.includes("my-custom"));
  });

  it("non-exclusive providers keep registry-first merge", () => {
    const models = mergeProviderModelListing({
      providerId: "openai",
      registryModels: [{ id: "gpt-4o", name: "GPT-4o" }],
      syncedModels: [{ id: "gpt-4o-mini", name: "GPT-4o mini" }],
      customModels: [],
      usesCuratedModelsOnly: false,
    });
    const ids = models.map((m) => m.id);
    assert.deepEqual(ids, ["gpt-4o", "gpt-4o-mini"]);
  });

  it("overlays same-id custom metadata without erasing discovered fields", () => {
    const models = mergeProviderModelListing({
      providerId: "openai-compatible-chat-test",
      registryModels: [],
      syncedModels: [
        {
          id: "shared",
          name: "Discovered name",
          supportsVision: true,
          contextLength: 128000,
        },
      ],
      customModels: [{ id: "shared", name: "Operator name", supportsVision: false }],
      usesCuratedModelsOnly: false,
    });

    assert.deepEqual(models, [
      {
        id: "shared",
        name: "Operator name",
        source: "custom",
        supportsVision: false,
        contextLength: 128000,
      },
    ]);
  });
});
