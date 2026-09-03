import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { ensureCursorAutoCatalogEntry } from "@/lib/providerModels/cursorAutoCatalog";

describe("ensureCursorAutoCatalogEntry", () => {
  it("injects auto when only wire id default is present", () => {
    const models = ensureCursorAutoCatalogEntry([
      { id: "default", name: "Auto", owned_by: "cursor" },
      { id: "composer-2.5", name: "Composer 2.5", owned_by: "cursor" },
    ]);
    assert.ok(models.some((m) => m.id === "auto"));
    assert.ok(models.some((m) => m.id === "default"));
  });

  it("injects auto-cost / auto-balance / auto-intelligence", () => {
    const models = ensureCursorAutoCatalogEntry([{ id: "auto", name: "Auto", owned_by: "cursor" }]);
    const ids = models.map((m) => m.id);
    assert.ok(ids.includes("auto-cost"));
    assert.ok(ids.includes("auto-balance"));
    assert.ok(ids.includes("auto-intelligence"));
  });

  it("does not duplicate existing auto entries", () => {
    const models = ensureCursorAutoCatalogEntry([
      { id: "auto", name: "Auto", owned_by: "cursor" },
      { id: "auto-cost", name: "Auto (cost)", owned_by: "cursor" },
    ]);
    assert.equal(models.filter((m) => m.id === "auto").length, 1);
    assert.equal(models.filter((m) => m.id === "auto-cost").length, 1);
  });

  it("injects supported 1M context variants immediately before their base ids", () => {
    const models = ensureCursorAutoCatalogEntry([
      { id: "claude-opus-5-thinking-max-fast", name: "Claude Opus 5 Max Thinking Fast" },
      { id: "gpt-5.6-sol-max", name: "GPT-5.6 Sol Max" },
      { id: "gpt-5.6-sol-max-fast", name: "GPT-5.6 Sol Max Fast" },
    ]);
    const ids = models.map((model) => model.id);
    for (const baseId of ["claude-opus-5-thinking-max-fast", "gpt-5.6-sol-max"]) {
      const oneMillionPosition = ids.indexOf(`${baseId}-1m`);
      assert.ok(oneMillionPosition >= 0);
      assert.equal(ids[oneMillionPosition + 1], baseId);
      assert.equal(
        (models[oneMillionPosition] as { contextLength?: number }).contextLength,
        1_000_000
      );
    }
    assert.equal(ids.includes("gpt-5.6-sol-max-fast-1m"), false);
  });

  it("does not duplicate a discovered 1M context variant", () => {
    const models = ensureCursorAutoCatalogEntry([
      { id: "gpt-5.6-luna-max-1m", name: "GPT-5.6 Luna 1M Max" },
      { id: "gpt-5.6-luna-max", name: "GPT-5.6 Luna Max" },
    ]);
    assert.equal(models.filter((model) => model.id === "gpt-5.6-luna-max-1m").length, 1);
  });
});
