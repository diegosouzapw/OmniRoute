import type { CompressionConfig, CompressionPipelineStep } from "./types.ts";
import { deriveDefaultPlan, type DerivedPlan } from "./deriveDefaultPlan.ts";

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
 *   3. otherwise                            -> deriveDefaultPlan(engines, enabled)
 */
export function deriveEffectivePreviewPlan(
  config: Pick<CompressionConfig, "engines" | "enabled" | "activeComboId">,
  combos: NamedCombos = {}
): DerivedPlan {
  if (!config.enabled) return { mode: "off", stackedPipeline: [] };

  if (config.activeComboId && combos[config.activeComboId]) {
    return { mode: "stacked", stackedPipeline: combos[config.activeComboId] };
  }

  return deriveDefaultPlan(config.engines, config.enabled);
}
