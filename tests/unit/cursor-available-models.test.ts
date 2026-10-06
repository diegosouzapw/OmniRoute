import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  ensureCursorAutoCatalogEntry,
  normalizeCursorAvailableModelsPayload,
} from "../../src/lib/providerModels/cursorAvailableModels.ts";
import { resolveRequestedModel } from "../../open-sse/utils/cursorAgentProtobuf.ts";
import { normalizeDiscoveredModels } from "../../src/lib/providerModels/modelDiscovery.ts";

describe("normalizeCursorAvailableModelsPayload", () => {
  it("extracts models from models[] with name ids", () => {
    const models = normalizeCursorAvailableModelsPayload({
      models: [
        { name: "claude-opus-5-high", displayName: "Opus 5" },
        { name: "gpt-5.6-sol-high", displayName: "GPT-5.6 Sol" },
        { name: "disabled-model", disabled: true },
      ],
    });
    assert.equal(models[0].id, "auto");
    assert.ok(models.some((m) => m.id === "claude-opus-5-high"));
    assert.ok(models.some((m) => m.id === "claude-opus-5-high-1m"));
    assert.ok(models.some((m) => m.id === "gpt-5.6-sol-high"));
    assert.ok(models.some((m) => m.id === "gpt-5.6-sol-high-1m"));
    assert.ok(models.some((m) => m.id === "auto-cost"));
    assert.equal(models.find((m) => m.id === "claude-opus-5-high")?.name, "Opus 5");
    assert.equal(models.find((m) => m.id === "claude-opus-5-high")?.owned_by, "cursor");
    assert.equal(
      models.some((m) => m.id === "disabled-model"),
      false
    );
  });

  it("accepts string arrays and skips empties", () => {
    const models = normalizeCursorAvailableModelsPayload({
      availableModels: ["auto", "composer-2.5", "auto", ""],
    });
    assert.equal(models[0].id, "auto");
    assert.ok(models.some((m) => m.id === "composer-2.5"));
    assert.ok(models.some((m) => m.id === "auto-balance"));
    // Only one auto entry despite duplicate in payload
    assert.equal(models.filter((m) => m.id === "auto").length, 1);
  });

  it("aliases default to auto and keeps default", () => {
    const models = normalizeCursorAvailableModelsPayload({
      models: [{ name: "default", displayName: "Auto" }, { name: "composer-2.5" }],
    });
    assert.equal(models[0].id, "auto");
    assert.equal(models[0].name, "Auto");
    assert.ok(models.some((m) => m.id === "default"));
    assert.ok(models.some((m) => m.id === "composer-2.5"));
  });

  it("injects auto when payload has neither auto nor default", () => {
    const models = normalizeCursorAvailableModelsPayload({
      models: [{ name: "composer-2.5" }],
    });
    assert.equal(models[0].id, "auto");
    assert.match(models[0].name, /Auto/i);
  });

  it("injects auto into an empty usable list", () => {
    const models = normalizeCursorAvailableModelsPayload({ models: [] });
    assert.deepEqual(
      models.map((m) => m.id),
      ["auto", "auto-cost", "auto-balance", "auto-intelligence"]
    );
  });

  it("injects auto router variants alongside existing models", () => {
    const models = normalizeCursorAvailableModelsPayload({
      models: [{ name: "composer-2.5" }],
    });
    for (const id of ["auto", "auto-cost", "auto-balance", "auto-intelligence", "composer-2.5"]) {
      assert.ok(
        models.some((m) => m.id === id),
        `missing ${id}`
      );
    }
  });

  it("keeps CLI context_token_limit and declared effort values through discovery", () => {
    const models = normalizeCursorAvailableModelsPayload({
      models: [
        {
          name: "grok-4.7",
          contextTokenLimit: 262_144,
          parameterDefinitions: [
            {
              id: "effort",
              parameterType: {
                enumParameter: {
                  values: [{ value: "low" }, { value: "medium" }, { value: "high" }],
                },
              },
            },
          ],
        },
        { name: "claude-opus-5-high", contextTokenLimit: 300_000 },
        { name: "unknown-cap", contextTokenLimit: -1 },
      ],
    });
    const grok = models.find((model) => model.id === "grok-4.7");
    assert.equal(grok?.contextLength, 262_144);
    assert.deepEqual(grok?.supportedThinkingEfforts, ["low", "medium", "high"]);
    assert.equal(models.find((model) => model.id === "unknown-cap")?.contextLength, undefined);
    assert.equal(
      models.find((model) => model.id === "claude-opus-5-high-1m")?.contextLength,
      1_000_000
    );

    const stored = normalizeDiscoveredModels(models, "cursor");
    assert.equal(stored.find((model) => model.id === "grok-4.7")?.inputTokenLimit, 262_144);
    assert.deepEqual(stored.find((model) => model.id === "grok-4.7")?.supportedThinkingEfforts, [
      "low",
      "medium",
      "high",
    ]);
    assert.equal(
      stored.find((model) => model.id === "claude-opus-5-high-1m")?.inputTokenLimit,
      1_000_000
    );
  });

  it("accepts protobuf-json snake_case limits and excludes admin-blocked effort tiers", () => {
    const models = normalizeCursorAvailableModelsPayload({
      models: [
        {
          name: "grok-4.7",
          context_token_limit: 131_072,
          parameter_definitions: [
            {
              id: "effort",
              parameter_type: {
                enum_parameter: {
                  values: [{ value: "low" }, { value: "max", blocked_by_admin_allowlist: true }],
                },
              },
            },
          ],
        },
      ],
    });
    const model = models.find((item) => item.id === "grok-4.7");
    assert.equal(model?.contextLength, 131_072);
    assert.deepEqual(model?.supportedThinkingEfforts, ["low"]);
  });
});

describe("ensureCursorAutoCatalogEntry + resolveRequestedModel", () => {
  it("catalog auto stays aligned with wire default", () => {
    const models = ensureCursorAutoCatalogEntry([]);
    assert.equal(models[0].id, "auto");
    assert.deepEqual(resolveRequestedModel("auto"), { modelId: "default", parameters: [] });
  });

  it("auto-cost/balance/intelligence map to default + optimization parameter", () => {
    assert.deepEqual(resolveRequestedModel("auto-cost"), {
      modelId: "default",
      parameters: [{ id: "optimization", value: "cost" }],
    });
    assert.deepEqual(resolveRequestedModel("auto-balance"), {
      modelId: "default",
      parameters: [{ id: "optimization", value: "balance" }],
    });
    assert.deepEqual(resolveRequestedModel("auto-intelligence"), {
      modelId: "default",
      parameters: [{ id: "optimization", value: "intelligence" }],
    });
  });
});
