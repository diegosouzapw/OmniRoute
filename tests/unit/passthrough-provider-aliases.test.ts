import assert from "node:assert/strict";
import test from "node:test";

const { isValidModel } = await import("../../src/shared/constants/models.ts");

test("passthrough providers accept live model ids through both provider id and alias", () => {
  for (const [id, alias] of [
    ["zylo-api", "zylo"],
    ["llm-kiwi", "llmkiwi"],
    ["freetheai", "fta"],
  ] as const) {
    assert.equal(isValidModel(id, "future/live-catalog-model"), true);
    assert.equal(isValidModel(alias, "future/live-catalog-model"), true);
  }
});
