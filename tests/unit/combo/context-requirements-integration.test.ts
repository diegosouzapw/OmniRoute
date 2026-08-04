import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { applyContextRequirements } from "../../../open-sse/services/combo/contextRequirements";
import type { ResolvedComboTarget } from "../../../open-sse/services/combo/types";

// Mock logger
const mockLog = {
  info: () => {},
  debug: () => {},
  warn: () => {},
  error: () => {},
};

describe("Context Requirements Integration", () => {
  it("should filter and sort targets with full context requirements", () => {
    // Mix a catalog-known model (gpt-4o ~128k) with unknowns so strict mode has
    // at least one known-good survivor and does not fail-open to the unknowns.
    const targets = [
      { modelStr: "gpt-4o", provider: "openai", weight: 1 },
      { modelStr: "unknown-small-8786", provider: "custom", weight: 1 },
      { modelStr: "another-unknown-8786", provider: "custom", weight: 1 },
    ];

    const requirements = {
      minContextWindow: 32000,
      preferLargeContext: true,
      contextFilterMode: "strict" as const,
    };

    const result = applyContextRequirements(targets, requirements, mockLog);
    assert.ok(result.length < targets.length);
    assert.ok(
      result.every((target) => targets.some((original) => original.modelStr === target.modelStr)),
      "Filtered targets should be a subset of the original list"
    );
    assert.ok(
      result.some((t) => t.modelStr === "gpt-4o"),
      "Known-good gpt-4o should survive minContextWindow=32k"
    );
    assert.ok(
      !result.some((t) => t.modelStr.includes("unknown")),
      "Unknowns stay excluded when a known-good target remains"
    );
  });

  it("should not filter when no requirements specified", () => {
    const targets = [
      { modelStr: "gpt-3.5-turbo", provider: "openai", weight: 1 },
      { modelStr: "gpt-4", provider: "openai", weight: 1 },
    ];

    const result = applyContextRequirements(targets, undefined, mockLog);
    assert.equal(result.length, targets.length);
    assert.equal(result, targets); // Same reference
  });

  it("should handle empty targets array", () => {
    const targets: ResolvedComboTarget[] = [];
    const requirements = {
      minContextWindow: 32000,
      preferLargeContext: true,
    };

    const result = applyContextRequirements(targets, requirements, mockLog);
    assert.equal(result.length, 0);
  });

  it("should handle lenient mode with unknown context models", () => {
    const targets = [
      { modelStr: "gpt-4o", provider: "openai", weight: 1 },
      { modelStr: "unknown-model", provider: "custom", weight: 1 },
    ];

    const requirements = {
      minContextWindow: 32000,
      contextFilterMode: "lenient" as const,
    };

    const result = applyContextRequirements(targets, requirements, mockLog);

    // Should include unknown-model in lenient mode
    assert.ok(
      result.some((t) => t.modelStr === "unknown-model"),
      "Should include unknown model in lenient mode"
    );
  });

  it("should handle strict mode with unknown context models", () => {
    // Known-good survivor required — otherwise #8786 fail-open would restore unknowns.
    const targets = [
      { modelStr: "gpt-4o", provider: "openai", weight: 1 },
      { modelStr: "unknown-model", provider: "custom", weight: 1 },
    ];

    const requirements = {
      minContextWindow: 32000,
      contextFilterMode: "strict" as const,
    };

    const result = applyContextRequirements(targets, requirements, mockLog);

    assert.ok(
      !result.some((t) => t.modelStr === "unknown-model"),
      "Should exclude unknown model in strict mode when a known-good target remains"
    );
    assert.ok(result.some((t) => t.modelStr === "gpt-4o"));
  });
});
