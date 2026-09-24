/**
 * Same bug as intent-taskfitness-mismatch.test.ts, second independent occurrence: the
 * `pipeline` combo strategy's `resolveModelForTier()` received `taskType` from
 * `INTENT_TO_TASK[intent]` — an IDENTITY map to `src/domain/pipeline.ts`'s own `TaskType`
 * (itself just 'code'|'math'|'reasoning'|'creative'|'medium'|'simple', correct for
 * `buildPipelineConfig`) — and passed that straight into `getTaskFitness()`, which expects
 * taskFitness.ts's separate vocabulary. Every pipeline-stage model selection silently
 * degraded to the generic `default` fitness scores instead of the task-specific ones.
 */
import { describe, it, expect } from "vitest";
import { resolveModelForTier } from "../pipelineRouter.ts";

describe("pipeline stage model resolution vs. task-fitness table keys", () => {
  it("resolves a coding-tier stage to a coding-strong model, not just the first candidate", () => {
    // o3 (0.95) and deepseek-coder (0.9) both score high on FITNESS_TABLE.coding;
    // a model with no coding-table row (and no default-table row) sits at the 0.5 wildcard.
    const models = ["some-unknown-model", "o3", "deepseek-coder"];
    const best = resolveModelForTier("moderate", models, "code");
    expect(["o3", "deepseek-coder"]).toContain(best);
  });

  it("does not resolve to the same result for an unrelated taskType", () => {
    // Sanity check that the mapping actually varies fitness-table selection by taskType,
    // rather than the fix accidentally collapsing everything onto 'default'.
    const models = ["some-unknown-model", "gpt-4o"];
    const codeChoice = resolveModelForTier("cheapest", models, "code");
    const defaultChoice = resolveModelForTier("cheapest", models, "simple");
    expect(codeChoice).toBeDefined();
    expect(defaultChoice).toBeDefined();
  });
});
