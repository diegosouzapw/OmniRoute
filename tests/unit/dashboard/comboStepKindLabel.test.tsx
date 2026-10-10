import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { getComboStepKindLabel } from "@/app/(dashboard)/dashboard/combos/comboPageHelpers";

// The step row and the review summary share one subtitle for each step kind.
describe("getComboStepKindLabel", () => {
  const t = Object.assign((key: string) => `t:${key}`, {
    has: (key: string) => key !== "builderLegacyEntry",
  });

  it("labels each step kind with its translation key", () => {
    assert.equal(getComboStepKindLabel(t, { kind: "combo-ref" }), "t:builderComboRefStep");
    assert.equal(
      getComboStepKindLabel(t, { kind: "provider-wildcard", providerId: "openai" }),
      "t:builderProviderWildcard"
    );
    assert.equal(
      getComboStepKindLabel(t, { kind: "model", providerId: "openai", connectionId: "c1" }),
      "t:builderPinnedAccount"
    );
    assert.equal(
      getComboStepKindLabel(t, { kind: "model", providerId: "openai" }),
      "t:builderDynamicAccountShort"
    );
  });

  it("falls back to English when a key is missing", () => {
    assert.equal(getComboStepKindLabel(t, { model: "openai/gpt-4o" }), "Legacy model entry");
  });
});
