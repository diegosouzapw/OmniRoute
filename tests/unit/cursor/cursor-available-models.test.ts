import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  ensureCursorAutoCatalogEntry,
  normalizeCursorAvailableModelsPayload,
} from "../../../src/lib/providerModels/cursorAvailableModels.ts";
import { resolveRequestedModel } from "../../../open-sse/utils/cursorAgentProtobuf.ts";

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
