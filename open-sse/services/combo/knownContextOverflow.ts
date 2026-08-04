/**
 * Known context-overflow rejection, extracted from comboStructure.ts to keep
 * that file under the file-size cap (#7177).
 *
 * Fixes: routing a request to a combo whose targets all have a KNOWN (not
 * unknown/fail-open) context window too small for the request used to be
 * discovered only after every target was tried and failed upstream — burning
 * retries/cooldowns on a request that could never succeed. This lets the
 * combo dispatcher reject it up front, before exhausting providers.
 *
 * getKnownContextLimit/hasEstimableContent also
 * live here (moved from comboStructure.ts, same file-size-cap motivation):
 * they are the "how big is a target's known context window" primitives, so
 * they belong next to the overflow check that is their main consumer.
 * comboStructure.ts's own compatibility filter now decides fit via its
 * evaluateContextLimit (#7052); only hasEstimableContent is imported back.
 */

import { getResolvedModelCapabilities } from "../modelCapabilities.ts";
import { deriveRequestCompatibilityRequirements } from "./comboStructure.ts";
import type { ResolvedComboTarget } from "./types.ts";

export type KnownContextOverflow = {
  estimatedInputTokens: number;
  requestedOutputTokens: number;
  requiredContextTokens: number;
  maxKnownContextTokens: number;
  targetCount: number;
};

// #7177: an empty array/object (e.g. a default `messages: []` some combo entrypoints inject
// when the caller sent none) has no real content — counting it would charge a few phantom
// "structural" tokens (JSON.stringify braces/brackets) toward the estimate, which is enough
// to falsely trip the exact-boundary known-context-overflow check for a request that has no
// actual input at all.
export function hasEstimableContent(value: unknown): boolean {
  if (value === undefined || value === null) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return true;
}

// #7177: known context limit that accounts for the request's own requested
// output tokens — a target whose input+output would together exceed
// maxInputTokens is exactly as incompatible as one whose contextWindow is too
// small, so both bounds go through the same min() so far the tightest wins.
export function getKnownContextLimit(
  capabilities: {
    maxInputTokens?: number | null;
    contextWindow?: number | null;
  },
  requestedOutputTokens = 0
): number | null {
  const limits: number[] = [];
  if (capabilities.maxInputTokens != null) {
    limits.push(capabilities.maxInputTokens + requestedOutputTokens);
  }
  if (capabilities.contextWindow != null) {
    limits.push(capabilities.contextWindow);
  }
  return limits.length > 0 ? Math.min(...limits) : null;
}


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
