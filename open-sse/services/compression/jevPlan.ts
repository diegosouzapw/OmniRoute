/**
 * Jev-aware compression plan refinement.
 *
 * Jev sits BELOW every operator layer and the lossy trust boundary:
 *   - only plans whose source is `default` or `auto-trigger` are candidates —
 *     a request header, routing-combo override or active named profile always
 *     wins untouched, and a plan that is `off` is never turned back on;
 *   - every lossy candidate (caveman/rtk/stacked) is re-run through
 *     `applyLossyRequestPolicy`, so a request that did not opt into lossy
 *     compression still ends up on the safe dedup+lite pipeline;
 *   - decisions fail open: no credential, an error, an unparsable answer or an
 *     engaged adaptive context-budget plan all leave the plan byte-identical.
 *
 * What Jev may do, per request:
 *   - skip compression when the content is judged low-benefit (prob >= 0.8);
 *   - prefer `lite` (or a lossy family the request opted into) when it judges
 *     the content strongly classifiable (confidence >= 0.7);
 *   - tune RTK aggressiveness (`minimal`/`standard`/`aggressive`) when the
 *     resolved plan actually runs the RTK engine.
 */
import { isJevFeatureEnabled } from "../jev/config.ts";
import { decideCompression, type CompressionDecision } from "../jev/decisions.ts";
import { normalizeConversationForEmbedding } from "../cache/embeddingClient.ts";
import { applyLossyRequestPolicy } from "./lossyRequestPolicy.ts";
import type { DerivedPlan } from "./deriveDefaultPlan.ts";
import { selectCompressionPlan } from "./strategySelector.ts";
import { getTokenLimit } from "../contextManager.ts";
import type { CachingDetectionContext } from "./cachingAware.ts";
import type { AdaptiveTelemetry } from "./adaptiveCompression/types.ts";
import {
  DEFAULT_RTK_CONFIG,
  type CompressionConfig,
  type CompressionPipelineStep,
  type RtkConfig,
} from "./types.ts";

export const JEV_LOW_BENEFIT_SKIP_THRESHOLD = 0.8;
export const JEV_PREFERRED_CONFIDENCE_MIN = 0.7;
export const JEV_INTENSITY_CONFIDENCE_MIN = 0.5;

export interface JevCompressionAdjustment {
  reason: "jev-low-benefit" | "jev-none" | "jev-preferred";
  preferred: CompressionDecision["preferred"];
  preferredConfidence: number;
  lowBenefit: number;
  intensity: CompressionDecision["intensity"] | null;
  modeBefore: string;
  modeAfter: string;
}

export interface AdjustCompressionPlanInput {
  plan: DerivedPlan;
  config: CompressionConfig;
  /** The compression input body (messages/input), used to sample content for Jev. */
  body: Record<string, unknown>;
  estimatedTokens: number;
  /** The x-omniroute-compression header, so the lossy policy is re-applied identically. */
  header?: string | null;
  /** True when the adaptive context-budget resolver engaged — never override a safety escalation. */
  adaptiveEngaged?: boolean;
  log?: {
    debug?: (tag: string, message: string, meta?: Record<string, unknown> | null) => void;
  } | null;
}

export interface AdjustCompressionPlanResult {
  plan: DerivedPlan;
  config: CompressionConfig;
  adjustment: JevCompressionAdjustment | null;
}

function planUsesRtk(plan: DerivedPlan): boolean {
  if (plan.mode === "rtk") return true;
  if (plan.mode !== "stacked") return false;
  return plan.stackedPipeline.some((step) => step.engine === "rtk");
}

/**
 * Build the candidate plan for a Jev preference. Lossy preferences still pass
 * through the lossy policy afterwards — this only shapes the candidate.
 */
function planForPreference(
  preference: CompressionDecision["preferred"],
  current: DerivedPlan,
  config: CompressionConfig
): DerivedPlan | null {
  const source = current.source;
  switch (preference) {
    case "lite":
      return { mode: "lite", stackedPipeline: [], source };
    case "caveman":
      // `standard` is the single-mode name of the caveman engine.
      return { mode: "standard", stackedPipeline: [], source };
    case "rtk":
      return { mode: "rtk", stackedPipeline: [], source };
    case "stacked": {
      const configured = (config.stackedPipeline ?? []).map((step) =>
        typeof step === "string"
          ? { engine: step }
          : { engine: step.engine, ...(step.intensity ? { intensity: step.intensity } : {}) }
      );
      const pipeline =
        configured.length > 0
          ? configured
          : current.stackedPipeline.length > 0
            ? current.stackedPipeline
            : [
                { engine: "rtk" as const, intensity: "standard" },
                { engine: "caveman" as const, intensity: "full" },
              ];
      return { mode: "stacked", stackedPipeline: pipeline, source };
    }
    default:
      return null;
  }
}

/** Set the RTK aggressiveness on both the plan step (stacked) and config.rtkConfig (single mode). */
function withRtkIntensity(
  plan: DerivedPlan,
  config: CompressionConfig,
  intensity: CompressionDecision["intensity"]
): { plan: DerivedPlan; config: CompressionConfig } {
  const nextPlan =
    plan.mode === "stacked"
      ? {
          ...plan,
          stackedPipeline: plan.stackedPipeline.map((step) =>
            step.engine === "rtk" ? { ...step, intensity } : step
          ),
        }
      : plan;
  const rtkConfig: RtkConfig = { ...DEFAULT_RTK_CONFIG, ...(config.rtkConfig ?? {}), intensity };
  return { plan: nextPlan, config: { ...config, rtkConfig } };
}

/**
 * Refine a resolved compression plan with one Jev decision. Always resolves;
 * failures return the input unchanged with `adjustment: null`.
 */
export async function adjustCompressionPlanWithJev(
  input: AdjustCompressionPlanInput
): Promise<AdjustCompressionPlanResult> {
  const unchanged: AdjustCompressionPlanResult = {
    plan: input.plan,
    config: input.config,
    adjustment: null,
  };
  if (!isJevFeatureEnabled("compression")) return unchanged;
  if (input.adaptiveEngaged) return unchanged;
  if (!input.config.enabled || input.plan.mode === "off") return unchanged;
  const source = input.plan.source;
  if (source !== "default" && source !== "auto-trigger") return unchanged;

  // Sample the conversation tail (history depth 8): the compressible mass in a
  // long request is tool output / boilerplate, which lives in recent items.
  const bodyText = normalizeConversationForEmbedding(input.body.messages ?? input.body.input, {
    historyDepth: 8,
  });
  if (!bodyText.trim()) return unchanged;

  const decision = await decideCompression({
    bodyText,
    estimatedTokens: input.estimatedTokens,
    activeMode: input.plan.mode,
  });
  if (!decision) return unchanged;

  let plan = input.plan;
  let config = input.config;
  let adjustment: JevCompressionAdjustment | null = null;
  const modeBefore = input.plan.mode;

  if (decision.lowBenefit >= JEV_LOW_BENEFIT_SKIP_THRESHOLD) {
    plan = { mode: "off", stackedPipeline: [], source };
    adjustment = {
      reason: "jev-low-benefit",
      preferred: decision.preferred,
      preferredConfidence: decision.preferredConfidence,
      lowBenefit: decision.lowBenefit,
      intensity: null,
      modeBefore,
      modeAfter: plan.mode,
    };
  } else if (decision.preferredConfidence >= JEV_PREFERRED_CONFIDENCE_MIN) {
    if (decision.preferred === "none") {
      plan = { mode: "off", stackedPipeline: [], source };
      adjustment = {
        reason: "jev-none",
        preferred: decision.preferred,
        preferredConfidence: decision.preferredConfidence,
        lowBenefit: decision.lowBenefit,
        intensity: null,
        modeBefore,
        modeAfter: plan.mode,
      };
    } else {
      const candidate = planForPreference(decision.preferred, input.plan, input.config);
      if (candidate) {
        // Re-apply the lossy policy: Jev is never the opt-in for lossy engines.
        plan = applyLossyRequestPolicy(candidate, input.header ?? null);
        adjustment = {
          reason: "jev-preferred",
          preferred: decision.preferred,
          preferredConfidence: decision.preferredConfidence,
          lowBenefit: decision.lowBenefit,
          intensity: null,
          modeBefore,
          modeAfter: plan.mode,
        };
      }
    }
  }

  if (
    adjustment &&
    plan.mode !== "off" &&
    decision.intensityConfidence >= JEV_INTENSITY_CONFIDENCE_MIN &&
    planUsesRtk(plan)
  ) {
    const tuned = withRtkIntensity(plan, config, decision.intensity);
    plan = tuned.plan;
    config = tuned.config;
    adjustment.intensity = decision.intensity;
  }

  if (adjustment) {
    input.log?.debug?.(
      "COMPRESSION",
      `Jev plan adjustment: ${adjustment.reason} (${modeBefore} -> ${plan.mode}` +
        `${adjustment.intensity ? `, rtk=${adjustment.intensity}` : ""})`,
      {
        lowBenefit: decision.lowBenefit,
        preferred: decision.preferred,
        preferredConfidence: decision.preferredConfidence,
        model: decision.model,
        latencyMs: decision.latencyMs,
      }
    );
  }

  return { plan, config, adjustment };
}

export interface ResolveCompressionPlanWithJevInput {
  config: CompressionConfig;
  comboId: string | null;
  estimatedTokens: number;
  body: Record<string, unknown>;
  context?: CachingDetectionContext;
  combos?: Record<string, CompressionPipelineStep[]>;
  header: string | null;
  /** Provider/model used to resolve the model context limit for adaptive planning. */
  provider?: string | null;
  model?: string | null;
  /** True for a classifier call itself: the decision layer must never refine it. */
  suppressDecisionLayer?: boolean;
  log?: AdjustCompressionPlanInput["log"];
}

export interface ResolveCompressionPlanWithJevResult {
  plan: DerivedPlan;
  config: CompressionConfig;
  adjustment: JevCompressionAdjustment | null;
  /** Adaptive context-budget telemetry, for the caller's budget warning. */
  telemetry: AdaptiveTelemetry | null;
}

/**
 * Resolve the effective compression plan and, when the Jev lane applies, refine
 * it — the chatCore entry point. Owns the adaptive context-budget inputs
 * (model context window, request max_tokens) and observes its telemetry: any
 * adaptive engagement suppresses the Jev adjustment, so a safety escalation is
 * never overridden. Fail-open at every step.
 */
export async function resolveCompressionPlanWithJev(
  input: ResolveCompressionPlanWithJevInput
): Promise<ResolveCompressionPlanWithJevResult> {
  const requestMaxTokens =
    typeof input.body?.max_tokens === "number" ? (input.body.max_tokens as number) : null;
  const modelContextLimit =
    input.provider && input.model ? getTokenLimit(input.provider, input.model) : null;
  let telemetry: AdaptiveTelemetry | null = null;
  const plan = selectCompressionPlan(
    input.config,
    input.comboId,
    input.estimatedTokens,
    input.body,
    input.context,
    input.combos,
    input.header,
    {
      modelContextLimit,
      requestMaxTokens,
      onAdaptive: (t) => {
        telemetry = t;
      },
    }
  );
  const adjusted = await adjustCompressionPlanWithJev({
    plan,
    config: input.config,
    body: input.body,
    estimatedTokens: input.estimatedTokens,
    header: input.header,
    adaptiveEngaged: telemetry != null || input.suppressDecisionLayer === true,
    log: input.log,
  });
  return {
    plan: adjusted.plan,
    config: adjusted.config,
    adjustment: adjusted.adjustment,
    telemetry,
  };
}
