/**
 * TDD regression: `engine.ts::selectProvider` classifies the prompt with
 * `classifyPromptIntent()` (vocabulary: code | math | reasoning | creative | simple | medium)
 * and passed the raw result straight into `getTaskFitness()` as the task-fitness key. But
 * every layer of `getTaskFitnessWithSource`'s resolution chain (`FITNESS_TABLE`,
 * `TIER_TASK_FITNESS`, and the `model_intelligence` DB rows written by the Arena ELO /
 * models.dev sync jobs) is keyed by a DIFFERENT vocabulary: coding | review | planning |
 * analysis | debugging | documentation | default.
 *
 * None of `classifyPromptIntent`'s outputs match any of those keys, so
 * `getStaticFitnessTableScore(model, "code")` always fell back to `FITNESS_TABLE.default`
 * (`table = FITNESS_TABLE[normalizedTask] || FITNESS_TABLE.default`) instead of
 * `FITNESS_TABLE.coding` — meaning a coding-classified prompt never actually favored
 * coding-strong models over generically-scored ones. The classifier ran, but its output had
 * zero effect on routing.
 */
import { describe, it, expect } from "vitest";
import { classifyPromptIntent } from "../../intentClassifier";
import { getStaticFitnessTableScore } from "../taskFitness";
import { mapIntentToTaskFitnessKey } from "../intentTaskFitnessMap";

describe("intent classifier output vs. task-fitness table keys", () => {
  it("classifies an obvious coding prompt as 'code'", () => {
    expect(classifyPromptIntent("write a function to sort an array in typescript")).toBe("code");
  });

  it("BUG (pre-fix): the raw 'code' intent does not hit the coding fitness table", () => {
    // deepseek-coder scores 0.9 in FITNESS_TABLE.coding but has no row in FITNESS_TABLE.default,
    // so passing the raw intent string falls through to the wildcard baseline (0.5), not 0.9.
    expect(getStaticFitnessTableScore("deepseek-coder", "code")).toBeNull();
    expect(getStaticFitnessTableScore("deepseek-coder", "coding")).toBe(0.9);
  });

  it("FIX: mapIntentToTaskFitnessKey bridges the two vocabularies", () => {
    expect(mapIntentToTaskFitnessKey("code")).toBe("coding");
    const key = mapIntentToTaskFitnessKey(
      classifyPromptIntent("implement a REST endpoint in Python")
    );
    expect(getStaticFitnessTableScore("deepseek-coder", key)).toBe(0.9);
  });

  it("maps math/reasoning to 'analysis' (closest existing category) and creative/simple/medium to 'default'", () => {
    expect(mapIntentToTaskFitnessKey("math")).toBe("analysis");
    expect(mapIntentToTaskFitnessKey("reasoning")).toBe("analysis");
    expect(mapIntentToTaskFitnessKey("creative")).toBe("default");
    expect(mapIntentToTaskFitnessKey("simple")).toBe("default");
    expect(mapIntentToTaskFitnessKey("medium")).toBe("default");
  });
});
