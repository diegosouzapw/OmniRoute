/**
 * Context-budget adaptive compression — shared types.
 *
 * Naming note: "adaptiveCompression"/"contextBudget" — NOT "headroom" (which is an
 * unrelated existing engine). "headroom" here = the budget signal (target − prompt tokens).
 */

/** Target-derivation policy (design D-C1). */
export type ContextBudgetPolicy = "reserve-output" | "percentage" | "absolute";

/**
 * Adaptive mode (design D-C3/C4):
 *  - "floor"               : guarantee fit; escalate BEYOND any base plan.
 *  - "replace-autotrigger" : only acts when the base plan is bare Default/off (an explicit
 *                            operator/client choice always wins, even if it overflows).
 *  - "off"                 : legacy binary auto-trigger (full backward-compat).
 */
export type ContextBudgetMode = "floor" | "replace-autotrigger" | "off";

/** One escalation stage = an engine id applied at an optional intensity. */
export interface LadderStage {
  engine: string;
  intensity?: string;
}

/** Persisted adaptive settings (design §4.4). All optional with safe defaults in computeTarget. */
export interface ContextBudgetConfig {
  mode: ContextBudgetMode;
  policy: ContextBudgetPolicy;
  /** reserve-output: tokens reserved for the model's output when request.max_tokens is absent. */
  outputReserve: number;
  /** reserve-output: extra tokens shaved off the limit as a safety buffer. */
  safetyMargin: number;
  /** percentage policy: fraction of the model context window to target (0 < pct <= 1). */
  pct: number;
  /** absolute policy: a model-independent token budget. */
  absoluteBudget: number;
  /** Operator override of the default escalation ladder (cheapest → most aggressive). */
  ladderOverride?: LadderStage[];
}

/** The `adaptive` block of the shared CompressionRunTelemetry contract (roadmap overview). */
export interface AdaptiveTelemetry {
  policy: ContextBudgetPolicy;
  target: number;
  headroomBefore: number;
  stagesApplied: string[];
  headroomAfter: number;
  /** false => budget-exceeded (best-effort plan sent as-is; content never dropped). */
  fit: boolean;
}

/** Safe defaults applied when a field is absent (design §4.4 / §6). */
export const DEFAULT_CONTEXT_BUDGET: ContextBudgetConfig = {
  mode: "off",
  policy: "reserve-output",
  outputReserve: 4096,
  safetyMargin: 1024,
  pct: 0.85,
  absoluteBudget: 0,
};
