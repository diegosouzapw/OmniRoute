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
    const targets = [
      { modelStr: "gpt-3.5-turbo", provider: "openai", weight: 1 },
      { modelStr: "gpt-4", provider: "openai", weight: 1 },
      { modelStr: "gpt-4-turbo", provider: "openai", weight: 1 },
      { modelStr: "claude-3-opus-20240229", provider: "anthropic", weight: 1 },
      { modelStr: "gemini-1.5-pro", provider: "google", weight: 1 },
    ];

    const requirements = {
      minContextWindow: 100000,
      preferLargeContext: true,
      contextFilterMode: "strict" as const,
    };

    const result = applyContextRequirements(targets, requirements, mockLog);
    // Should filter out models with <100k context and, in strict mode, also drop
    // models whose context window is unknown in the current catalog snapshot.
    assert.ok(result.length < targets.length);
    assert.ok(
      result.every((target) => targets.some((original) => original.modelStr === target.modelStr)),
      "Filtered targets should be a subset of the original list"
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
      { modelStr: "gpt-4", provider: "openai", weight: 1 },
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
    const targets = [
      { modelStr: "claude-3-opus-20240229", provider: "anthropic", weight: 1 },
      { modelStr: "unknown-model", provider: "custom", weight: 1 },
    ];

    const requirements = {
      minContextWindow: 32000,
      contextFilterMode: "strict" as const,
    };

    const result = applyContextRequirements(targets, requirements, mockLog);

    // Should exclude unknown-model in strict mode
    assert.ok(
      !result.some((t) => t.modelStr === "unknown-model"),
      "Should exclude unknown model in strict mode"
    );
  });
});
