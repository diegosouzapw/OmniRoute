/**
 * Known context-overflow rejection, extracted from comboStructure.ts to keep
 * that file under the file-size cap (#7177).
 *
 * Fixes: routing a request to a combo whose targets all have a KNOWN (not
 * unknown/fail-open) context window too small for the request used to be
 * discovered only after every target was tried and failed upstream — burning
 * retries/cooldowns on a request that could never succeed. This lets the
 * combo dispatcher reject it up front, before exhausting providers.
 */

import { getResolvedModelCapabilities } from "../modelCapabilities.ts";
import {
  deriveRequestCompatibilityRequirements,
  getKnownContextLimit,
} from "./comboStructure.ts";
import type { ResolvedComboTarget } from "./types.ts";

export type KnownContextOverflow = {
  estimatedInputTokens: number;
  requestedOutputTokens: number;
  requiredContextTokens: number;
  maxKnownContextTokens: number;
  targetCount: number;
};

/**
 * Return a hard context-overflow decision only when every target has a known
 * context limit and every one of those limits is too small for the request.
 * Unknown metadata deliberately keeps the legacy fail-open behavior.
 */
export function getKnownContextOverflow(
  targets: ResolvedComboTarget[],
  body: Record<string, unknown>
): KnownContextOverflow | null {
  if (targets.length === 0) return null;
  const requirements = deriveRequestCompatibilityRequirements(body);
  if (requirements.requiredContextTokens <= 0) return null;

  const limits = targets.map((target) =>
    getKnownContextLimit(
      getResolvedModelCapabilities(target.modelStr),
      requirements.requestedOutputTokens
    )
  );
  if (limits.some((limit) => limit === null)) return null;

  const knownLimits = limits as number[];
  const maxKnownContextTokens = Math.max(...knownLimits);
  if (maxKnownContextTokens >= requirements.requiredContextTokens) return null;

  return {
    estimatedInputTokens: requirements.estimatedInputTokens,
    requestedOutputTokens: requirements.requestedOutputTokens,
    requiredContextTokens: requirements.requiredContextTokens,
    maxKnownContextTokens,
    targetCount: targets.length,
  };
}
