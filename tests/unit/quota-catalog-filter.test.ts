/**
 * Tests for filterModelsToQuotaPools (quota/quotaCombos.ts).
 *
 * Updated in Task B5 to use the qtSd/<groupSlug>/<provider>/<model> naming
 * (introduced in B3). The function matches by groupSlug ∈ poolSlugs (which
 * now holds group slugs after B5).
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { filterModelsToQuotaPools } from "../../src/lib/quota/quotaCombos.js";

describe("filterModelsToQuotaPools", () => {
  const models = [
    { id: "qtSd/times/codex/gpt-5.5" },
    { id: "qtSd/times/codex/gpt-5.4" },
    { id: "cx/gpt-5.5" },
    { id: "qtSd/other/codex/m" },
  ];

  it("returns only qtSd/* entries whose groupSlug is in the given slugs", () => {
    const result = filterModelsToQuotaPools(models, ["times"]);
    assert.deepEqual(result, [
      { id: "qtSd/times/codex/gpt-5.5" },
      { id: "qtSd/times/codex/gpt-5.4" },
    ]);
  });

  it("returns empty array when poolSlugs is empty (fail-closed)", () => {
    const result = filterModelsToQuotaPools(models, []);
    assert.deepEqual(result, []);
  });

  it("returns empty array when no quota models are present in the list", () => {
    const plainModels = [{ id: "cx/gpt-5.5" }, { id: "openai/gpt-4o" }];
    const result = filterModelsToQuotaPools(plainModels, ["times"]);
    assert.deepEqual(result, []);
  });

  it("matches multiple group slugs simultaneously", () => {
    const result = filterModelsToQuotaPools(models, ["times", "other"]);
    assert.deepEqual(result, [
      { id: "qtSd/times/codex/gpt-5.5" },
      { id: "qtSd/times/codex/gpt-5.4" },
      { id: "qtSd/other/codex/m" },
    ]);
  });

  it("preserves extra fields on model entries (generic T extends { id })", () => {
    const richModels = [
      { id: "qtSd/times/cx/gpt-5.5", object: "model", owned_by: "combo" },
      { id: "cx/gpt-5.5", object: "model", owned_by: "cx" },
    ];
    const result = filterModelsToQuotaPools(richModels, ["times"]);
    assert.deepEqual(result, [
      { id: "qtSd/times/cx/gpt-5.5", object: "model", owned_by: "combo" },
    ]);
  });

  it("does not match a model from a different group when only one slug is provided", () => {
    const result = filterModelsToQuotaPools(models, ["other"]);
    assert.deepEqual(result, [{ id: "qtSd/other/codex/m" }]);
  });
});
