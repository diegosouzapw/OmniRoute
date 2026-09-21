import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isFreeModel, providerHasFreeModels } from "../../src/shared/utils/freeModels.ts";

describe("isFreeModel isFree opt-in", () => {
  it("isFree:true fetched → free only for a provider with a documented free tier", async () => {
    const { FREE_MODEL_BUDGETS } = await import("@omniroute/open-sse/config/freeModelCatalog");
    const freeProvider = FREE_MODEL_BUDGETS[0].provider;
    assert.equal(isFreeModel("any", { id: "x", isFree: true }), false);
    assert.equal(isFreeModel("local", { id: "my-model", isFree: true }), false);
    assert.equal(isFreeModel(freeProvider, { id: "x", isFree: true }), true);
  });
  it("isFree:false/null/undefined/1/'true' → not free (strict ===true)", () => {
    const junk: unknown[] = [false, null, undefined, 1, "true"];
    for (const v of junk) {
      assert.equal(
        isFreeModel("any", { id: "x", isFree: v as boolean }),
        false,
        `isFree=${String(v)} should be false`
      );
    }
  });
  it("providerHasFreeModels unchanged by custom isFree", () => {
    assert.equal(providerHasFreeModels("local"), false);
    assert.equal(providerHasFreeModels("openai"), providerHasFreeModels("openai"));
  });
  it(":free and pricing 0 still work when isFree absent — only for free-tier providers", async () => {
    const { FREE_MODEL_BUDGETS } = await import("@omniroute/open-sse/config/freeModelCatalog");
    const freeProvider = FREE_MODEL_BUDGETS[0].provider;
    assert.equal(isFreeModel("any", { id: "foo:free" }), false);
    assert.equal(isFreeModel("local", { id: "foo", pricing: { prompt: 0, completion: 0 } }), false);
    assert.equal(isFreeModel(freeProvider, { id: "foo:free" }), true);
    assert.equal(
      isFreeModel(freeProvider, { id: "foo", pricing: { prompt: 0, completion: 0 } }),
      true
    );
    assert.equal(isFreeModel("any", { id: "foo", pricing: { prompt: 0, completion: 1 } }), false);
  });
  it("selectModelsForImport matches isFreeForProvider on every catalogued free model", async () => {
    // FREE_MODEL_IDS_BY_PROVIDER is module-private, so rebuild (provider, id) pairs from the
    // exported FREE_MODEL_BUDGETS: every budgeted provider has a documented free tier.
    const { FREE_MODEL_BUDGETS } = await import("@omniroute/open-sse/config/freeModelCatalog");
    const { selectModelsForImport, isFreeForProvider } =
      await import("../../src/shared/utils/freeModels.ts");
    for (const { provider } of FREE_MODEL_BUDGETS) {
      const m = { id: `${provider}/probe-lock`, pricing: { prompt: 0, completion: 0 } };
      const expected = isFreeForProvider(provider, m);
      const { models } = selectModelsForImport(provider, [m], true);
      assert.equal(models.length, expected ? 1 : 0, `${provider}/probe-lock`);
    }
  });
  it("selectModelsForImport drops zero-price models on providers without documented free tier", async () => {
    // "local" has no documented free tier, so its zero-price model is not free.
    const { selectModelsForImport, providerHasFreeModels } =
      await import("../../src/shared/utils/freeModels.ts");
    assert.equal(providerHasFreeModels("local"), false);
    const { models, freeFilterEmpty } = selectModelsForImport(
      "local",
      [{ id: "local/x", pricing: { prompt: 0, completion: 0 } }],
      true
    );
    assert.deepEqual(models, []);
    assert.equal(freeFilterEmpty, true);
  });
});
