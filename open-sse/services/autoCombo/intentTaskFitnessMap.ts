import type { IntentType } from "../intentClassifier";

/**
 * Maps the multilingual intent classifier's vocabulary (`IntentType`, in
 * `intentClassifier.ts`) onto the task-fitness system's vocabulary (the keys used by
 * `FITNESS_TABLE` / `TIER_TASK_FITNESS` in `taskFitness.ts`, and by the `model_intelligence`
 * DB rows the Arena ELO / models.dev sync jobs write).
 *
 * These are two vocabularies that grew independently and never matched:
 * `IntentType` is `code | math | reasoning | creative | simple | medium`, while every layer
 * of `getTaskFitnessWithSource`'s resolution chain is keyed by
 * `coding | review | planning | analysis | debugging | documentation | default`. Passing an
 * `IntentType` straight into `getTaskFitness` (as `engine.ts::selectProvider` used to) never
 * matches any table row, so it silently falls through to the generic `default` scores —
 * the classified intent had zero effect on task-fitness weighting for every prompt, in every
 * language, the whole time this "intent classification" feature has existed.
 *
 * `math` and `reasoning` both map to `analysis`: there's no dedicated math/reasoning row in
 * `FITNESS_TABLE`, and `analysis` is the closest existing category — it's dominated by the
 * same deep-reasoning models (o3, gemini-2.5-pro, deepseek-r1) that are actually strong at
 * math and multi-step reasoning. `creative` has no matching category at all, so it maps to
 * `default` rather than borrowing a mismatched one.
 */
const INTENT_TO_TASK_FITNESS_KEY: Record<IntentType, string> = {
  code: "coding",
  math: "analysis",
  reasoning: "analysis",
  creative: "default",
  simple: "default",
  medium: "default",
};

export function mapIntentToTaskFitnessKey(intent: IntentType): string {
  return INTENT_TO_TASK_FITNESS_KEY[intent] ?? "default";
}
