/**
 * Capability requirements filtering for combo targets.
 *
 * Filters combo targets by minimum model capabilities (vision, tool calling,
 * reasoning, structured output) configured in the combo's `config`.
 * Unlike request-based compatibility checking (which is per-request), these
 * are hard minimums that apply regardless of the current request body.
 *
 * For example, a combo with `requireVision: true` will never route to a
 * text-only model, even if the current request has no images.
 */

import { getResolvedModelCapabilities } from "../modelCapabilities.ts";
import type { ComboLogger, ResolvedComboTarget } from "./types.ts";

export interface CapabilityRequirements {
  requireVision?: boolean;
  requireToolCalling?: boolean;
  requireReasoning?: boolean;
  requireStructuredOutput?: boolean;
}

/**
 * Filter combo targets by capability requirements from the combo config.
 *
 * @param targets - Array of resolved combo targets
 * @param requirements - Capability requirements from combo config (may be empty)
 * @param log - Combo logger for debug output
 * @returns Filtered targets array (only targets meeting all requirements)
 */
export function applyCapabilityRequirements(
  targets: ResolvedComboTarget[],
  requirements: CapabilityRequirements | undefined,
  log: ComboLogger
): ResolvedComboTarget[] {
  if (!requirements || targets.length === 0) return targets;

  const hasRequirements =
    requirements.requireVision === true ||
    requirements.requireToolCalling === true ||
    requirements.requireReasoning === true ||
    requirements.requireStructuredOutput === true;

  if (!hasRequirements) return targets;

  const filtered = targets.filter((t) => {
    if (t.kind !== "model") return true;
    const caps = getResolvedModelCapabilities({
      provider: t.provider,
      model: t.modelStr,
    });
    if (requirements.requireVision && caps.supportsVision !== true) return false;
    if (requirements.requireToolCalling && caps.toolCalling !== true) return false;
    if (requirements.requireReasoning && caps.reasoning !== true) return false;
    if (requirements.requireStructuredOutput && caps.structuredOutput !== true) return false;
    return true;
  });

  const dropped = targets.length - filtered.length;
  if (dropped > 0) {
    log.info(
      "COMBO",
      `Capability requirements dropped ${dropped}/${targets.length} targets ` +
        `(vision:${!!requirements.requireVision} ` +
        `tools:${!!requirements.requireToolCalling} ` +
        `reasoning:${!!requirements.requireReasoning} ` +
        `structured:${!!requirements.requireStructuredOutput})`
    );
  }

  return filtered;
}
