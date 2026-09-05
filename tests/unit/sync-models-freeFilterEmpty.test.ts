/**
 * When the free-only import filter matches nothing, the sync must surface an
 * empty model list — not silently fall back to the stale synced snapshot.
 * Exercises the real prod helper, not a local copy of the ternary.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { resolveEffectiveAvailableModels } from "../../src/shared/utils/modelListResolution.ts";
import { selectModelsForImport } from "../../src/shared/utils/freeModels.ts";

describe("sync-models freeFilterEmpty stale cut (prod code)", () => {
  it("freeFilterEmpty true → [] even with a stale synced snapshot", () => {
    assert.deepEqual(
      resolveEffectiveAvailableModels(true, [], [{ id: "old" }]),
      []
    );
  });
  it("freeFilterEmpty false → discovered, else synced (legacy paths intact)", () => {
    assert.deepEqual(resolveEffectiveAvailableModels(false, [{ id: "new" }], [{ id: "old" }]), [{ id: "new" }]);
    assert.deepEqual(resolveEffectiveAvailableModels(false, [], [{ id: "old" }]), [{ id: "old" }]);
  });
  it("end-to-end: selectModelsForImport empty → resolveEffective [] (no stale fallback)", () => {
    const { models, freeFilterEmpty } = selectModelsForImport("some-provider-without-free-tier", [{ id: "x/y" }] as any, true);
    assert.equal(freeFilterEmpty, true);
    assert.deepEqual(resolveEffectiveAvailableModels(freeFilterEmpty, models, [{ id: "old" }]), []);
  });
});
