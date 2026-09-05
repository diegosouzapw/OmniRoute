import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isFreeModel, providerHasFreeModels } from "../../../src/shared/utils/freeModels.ts";

describe("isFreeModel isFree opt-in", () => {
  it("isFree:true → free even without :free/pricing/catalog", () => {
    assert.equal(isFreeModel("any", { id: "x", isFree: true }), true);
    assert.equal(isFreeModel("openai", { id: "gpt-4o", isFree: true }), true);
    assert.equal(isFreeModel("local", { id: "my-model", isFree: true }), true);
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
  it(":free and pricing 0 still work when isFree absent", () => {
    assert.equal(isFreeModel("any", { id: "foo:free" }), true);
    assert.equal(isFreeModel("any", { id: "foo", pricing: { prompt: 0, completion: 0 } }), true);
    assert.equal(isFreeModel("any", { id: "foo", pricing: { prompt: 0, completion: 1 } }), false);
  });
});
