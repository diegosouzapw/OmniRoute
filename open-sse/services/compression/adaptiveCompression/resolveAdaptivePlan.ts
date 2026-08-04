import type { DerivedPlan } from "../deriveDefaultPlan.ts";
import type { AdaptiveTelemetry, ContextBudgetConfig, LadderStage } from "./types.ts";
import { DEFAULT_LADDER, aggressivenessOf, expectedReductionFactor } from "./ladder.ts";
import { computeTarget } from "./computeTarget.ts";

export interface ResolveAdaptiveInput {
  basePlan: DerivedPlan;
  estimatedTokens: number;
  modelContextLimit: number | null;
  requestMaxTokens: number | null;
  config: ContextBudgetConfig;
  /**
   * Injected per-stage estimator (design §4.1/§9). Returns the NEW token estimate after a
   * stage is applied to a prompt of `priorTokens`. Default models it with the cheap
   * per-engine expected-reduction factor (no dry-run, no real tokenizer).
   */
  estimate?: (priorTokens: number, stage: LadderStage) => number;
}

export interface ResolveAdaptiveResult {
  plan: DerivedPlan;
  telemetry: AdaptiveTelemetry | null;
}

const defaultEstimate = (prior: number, stage: LadderStage): number =>
  Math.round(prior * expectedReductionFactor(stage.engine));

/**
 * Pure adaptive resolver (design §4.2). Floors/escalates a base plan so the (estimated)
 * compressed prompt fits the context budget. Never drops content: if the ladder is
 * exhausted while still over target, returns the best-effort plan with fit=false.
 *
 * Returns telemetry=null only when there is no usable target (unknown model limit) — the
 * caller then skips adaptive entirely (design §6: skip, never throw).
 */
export function resolveAdaptivePlan(input: ResolveAdaptiveInput): ResolveAdaptiveResult {
  const { basePlan, estimatedTokens, modelContextLimit, requestMaxTokens, config } = input;
  const estimate = input.estimate ?? defaultEstimate;

  if (config.mode === "off") return { plan: basePlan, telemetry: null };
  if (!modelContextLimit || modelContextLimit <= 0) {
    return { plan: basePlan, telemetry: null }; // unknown limit → skip (D-C / §6)
  }

  const target = computeTarget(config.policy, modelContextLimit, requestMaxTokens, config);
  const headroomBefore = target - estimatedTokens;

  // replace-autotrigger only acts on a bare Default/off base plan; an explicit choice wins.
  const baseRank = aggressivenessOf(basePlan.mode);
  if (config.mode === "replace-autotrigger" && baseRank > aggressivenessOf("off")) {
    return {
      plan: basePlan,
      telemetry: { policy: config.policy, target, headroomBefore, stagesApplied: [], headroomAfter: headroomBefore, fit: headroomBefore >= 0 },
    };
  }

  // Already fits → never over-compress (D-C2).
  if (headroomBefore >= 0) {
    return {
      plan: basePlan,
      telemetry: { policy: config.policy, target, headroomBefore, stagesApplied: [], headroomAfter: headroomBefore, fit: true },
    };
  }

  // Escalation: start just ABOVE the base plan's aggressiveness (floor escalates beyond it).
  const ladder = config.ladderOverride && config.ladderOverride.length > 0 ? config.ladderOverride : DEFAULT_LADDER;
  const startTier = config.mode === "floor" ? baseRank : aggressivenessOf("off");
  const stages = ladder.filter((s) => aggressivenessOf(s.engine) > startTier);

  let current = estimatedTokens;
  const applied: LadderStage[] = [];
  for (const stage of stages) {
    current = estimate(current, stage);
    applied.push(stage);
    if (current <= target) break;
  }

  const headroomAfter = target - current;
  const fit = headroomAfter >= 0;
  return {
    plan: planFromStages(basePlan, applied),
    telemetry: {
      policy: config.policy,
      target,
      headroomBefore,
      stagesApplied: applied.map((s) => s.engine),
      headroomAfter,
      fit,
    },
  };
}

/**
 * Turn the applied ladder stages into a DerivedPlan. A single applied stage that is a
 * single-mode engine collapses to that engine's mode; otherwise a stacked pipeline.
 * The base plan's own pipeline is preserved as the prefix (floor escalates AFTER the base).
 */
function planFromStages(basePlan: DerivedPlan, applied: LadderStage[]): DerivedPlan {
  if (applied.length === 0) return basePlan;
  const basePipeline =
    basePlan.mode === "stacked" ? basePlan.stackedPipeline : [];
  const stackedPipeline = [...basePipeline, ...applied];
  return { mode: "stacked", stackedPipeline };
}
