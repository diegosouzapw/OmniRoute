import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { comboRuntimeConfigSchema, updateComboSchema } from "@/shared/validation/schemas/combo";

describe("comboRuntimeConfigSchema.modelSort", () => {
  it("accepts a valid modelSort method", () => {
    const parsed = comboRuntimeConfigSchema.parse({ modelSort: { method: "provider" } });
    assert.deepEqual(parsed.modelSort, { method: "provider" });
  });

  it("rejects an invalid method", () => {
    assert.throws(() => comboRuntimeConfigSchema.parse({ modelSort: { method: "bogus" } }));
  });

  it("allows extra keys on the modelSort sub-object (passthrough)", () => {
    const parsed = comboRuntimeConfigSchema.parse({ modelSort: { method: "name", future: 1 } });
    assert.equal(parsed.modelSort?.method, "name");
  });

  it("is optional", () => {
    const parsed = comboRuntimeConfigSchema.parse({});
    assert.equal(parsed.modelSort, undefined);
  });
});

describe("modelSort persistence", () => {
  it("round-trips through updateComboSchema (models + config)", () => {
    const parsed = updateComboSchema.parse({
      models: [{ id: "m1", kind: "model", model: "openai/gpt", providerId: "openai", weight: 0 }],
      config: { modelSort: { method: "score" } },
    });
    assert.equal(parsed.config?.modelSort?.method, "score");
  });

  it("passes through comboRuntimeConfigSchema", () => {
    const parsed = comboRuntimeConfigSchema.parse({ modelSort: { method: "provider" } });
    assert.equal(parsed.modelSort?.method, "provider");
  });
});
