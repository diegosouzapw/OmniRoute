import type { CompressionConfig, CompressionPipelineStep } from "./types.ts";
import type { DerivedPlan } from "./deriveDefaultPlan.ts";
import { downgradeUnrequestedLossy } from "./lossyRequestPolicy.ts";
import { deriveDefaultPlanFromConfig } from "./planResolution.ts";

/** Named-combo map: combo id -> its stacked pipeline (operator-defined profiles). */
export type NamedCombos = Record<string, CompressionPipelineStep[]>;

/**
 * Derives the plan a live request would actually run, for STATIC preview surfaces (the
 * Settings-page "Effective pipeline" text — issue #12063). Mirrors resolveBasePlan's
 * precedence for the two layers that apply to an at-rest preview — the master switch, then an
 * explicit active profile — but skips the request-scoped layers that don't apply outside a
 * live call (request header, routing-combo override, auto-trigger): those need per-request
 * context this static preview does not have.
 *
 * Precedence (mirrors strategySelector.ts's resolveBasePlan):
 *   1. masterEnabled=false                  -> off
 *   2. activeComboId resolves in combos     -> that profile's stacked pipeline (an explicit
 *      operator choice, which resolveBasePlan gives precedence over the plain engines-derived
 *      default)
 *   3. otherwise                            -> deriveDefaultPlanFromConfig(config, null, combos)
 *      (the SAME default derivation resolveBasePlan uses — enginesExplicit panel config
 *      via resolveCompressionPlan, otherwise the legacy defaultMode — so the preview
 *      cannot disagree with a live request about the plain default either)
 *
 * The result then passes through downgradeUnrequestedLossy — resolveBasePlan ends with
 * applyLossyRequestPolicy(plan, header) and an at-rest preview has no request header,
 * so a header-less live call downgrades lossy steps to the safe dedup+whitespace
 * pipeline. Without this the Settings preview claims an active rtk/caveman profile is
 * what runs, while every header-less request actually runs the safe pipeline (the
 * preview-vs-runtime mismatch #12063 was about).
 */
export function deriveEffectivePreviewPlan(
  config: CompressionConfig,
  combos: NamedCombos = {}
): DerivedPlan {
  if (!config.enabled) return { mode: "off", stackedPipeline: [] };

  if (config.activeComboId && combos[config.activeComboId]) {
    return downgradeUnrequestedLossy({
      mode: "stacked",
      stackedPipeline: combos[config.activeComboId],
    });
  }

  return downgradeUnrequestedLossy(
    deriveDefaultPlanFromConfig(config, /* comboId */ null, combos)
  );
}
