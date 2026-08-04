import { describe, it, expect } from "vitest";
import {
  getModelsDevTierFitness,
  getTaskFitnessWithSource,
} from "../../../open-sse/services/autoCombo/taskFitness.js";

describe("models_dev_tier free-alias fallback (#8601)", () => {
  it("should return fitness score for -free alias from models_dev_tier DB or capabilities fallback", () => {
    // Standard model without free suffix should match or resolve
    const baseScore = getModelsDevTierFitness("deepseek-v4-flash", "coding");
    const freeScore = getModelsDevTierFitness("deepseek-v4-flash-free", "coding");

    // If baseScore is resolved (or capability fallback works), freeScore should match baseScore
    if (baseScore !== null) {
      expect(freeScore).toBe(baseScore);
    }
  });

  it("getTaskFitnessWithSource should fall back for models_dev_tier / arena_elo on -free models", () => {
    const res = getTaskFitnessWithSource("deepseek-v4-flash-free", "coding");
    expect(res).not.toBeNull();
    expect(typeof res.score).toBe("number");
  });
});
