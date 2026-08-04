import { describe, expect, it } from "vitest";
import { getTaskFitnessWithSource } from "../../../open-sse/services/autoCombo/taskFitness.js";

describe("lookupStaticFitnessTable longest-match (#8603)", () => {
  it("should match gpt-4o-mini to its specific score (0.8) rather than gpt-4o (0.9)", () => {
    // Using a model name that falls through to static table (e.g. unknown-provider/gpt-4o-mini)
    const result = getTaskFitnessWithSource("unknown-provider-xyz/gpt-4o-mini", "coding");
    expect(result.source).toBe("fitness_table");
    expect(result.score).toBe(0.8);
  });

  it("should match gpt-4o to gpt-4o score (0.9)", () => {
    const result = getTaskFitnessWithSource("unknown-provider-xyz/gpt-4o", "coding");
    expect(result.source).toBe("fitness_table");
    expect(result.score).toBe(0.9);
  });
});
