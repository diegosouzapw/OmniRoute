import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { render, screen } from "@testing-library/react";
import {
  StaleModelBadge,
  buildStaleModelSet,
  isStaleComboStep,
} from "@/app/(dashboard)/dashboard/combos/StaleModelBadge";

// #13505: the combo editor marks steps whose model left the live catalog.
describe("StaleModelBadge", () => {
  const stale = buildStaleModelSet([
    { comboId: "c1", comboName: "main", stepId: "s1", model: "openrouter/gone-model" },
    { model: 42 },
    null,
  ]);

  it("collects only valid model strings from staleComboRefs", () => {
    assert.deepEqual([...stale], ["openrouter/gone-model"]);
    assert.equal(buildStaleModelSet(undefined).size, 0);
  });

  it("matches explicit model steps in string and object form", () => {
    assert.equal(isStaleComboStep("openrouter/gone-model", stale), true);
    assert.equal(
      isStaleComboStep({ kind: "model", providerId: "openrouter", model: "gone-model" }, stale),
      true
    );
    assert.equal(isStaleComboStep({ model: "openrouter/live-model", weight: 0 }, stale), false);
  });

  it("ignores combo refs and provider wildcards", () => {
    assert.equal(
      isStaleComboStep({ kind: "combo-ref", comboName: "openrouter/gone-model" }, stale),
      false
    );
    assert.equal(
      isStaleComboStep(
        { kind: "provider-wildcard", providerId: "openrouter", model: "gone-model" },
        stale
      ),
      false
    );
  });

  it("renders the label with a matching tooltip", () => {
    render(<StaleModelBadge label="Not in live catalog" />);
    const badge = screen.getByTitle("Not in live catalog");
    assert.match(badge.textContent || "", /Not in live catalog/);
  });
});
