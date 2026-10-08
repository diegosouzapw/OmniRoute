import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";
import { getTokenLimit } from "../contextManager";

/**
 * Aggregate the context window / max output to ADVERTISE for an auto combo.
 *
 * MAX across candidates (not min): the auto-combo context pre-filter
 * (combo.ts::filterTargetsByRequestCompatibility + the estimated-tokens
 * pre-filter) already routes oversized requests away from small-window
 * candidates, so advertising the largest window lets clients (e.g. opencode)
 * keep their smart auto-compaction calibrated to the best candidate instead
 * of compacting prematurely — or, worse, receiving 0 and disabling
 * compaction entirely (the "agent keeps forgetting things" bug).
 *
 * Unknown candidates resolve through getTokenLimit()'s fallback chain, so a
 * non-empty pool always yields a positive contextLength.
 *
 * maxOutputTokens has no such guaranteed fallback in getResolvedModelCapabilities()
 * — registry entries and models.dev sync data are both optional per model, so a
 * candidate pool whose members all lack that specific field (e.g. #6453's
 * provider-family combos, `auto/llama` and friends, over no-auth/free-tier
 * registry entries that were never annotated with maxOutputTokens) would
 * otherwise advertise `null`, which mirrors the `context: 0` bug this module's
 * docstring describes for contextLength (opencode disables smart auto-compaction
 * entirely when a limit is falsy). Fall back to a conservative generic default so
 * a non-empty pool always yields a positive maxOutputTokens too.
 */
const DEFAULT_ADVERTISED_MAX_OUTPUT_TOKENS = 8192;

type AdvertisedLimitCandidate = {
  provider: string;
  model: string;
  resolvedContextLength?: number | null;
  resolvedMaxOutputTokens?: number | null;
};

/** True for a value that is safe to advertise as a positive token limit. */
function isPositiveFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

/** Resolved context-length limit for one candidate, before the positivity check. */
function resolveCandidateContextLength(
  candidate: AdvertisedLimitCandidate
): number | null | undefined {
  return candidate.resolvedContextLength !== undefined
    ? candidate.resolvedContextLength
    : getTokenLimit(candidate.provider, candidate.model);
}

/** Resolved max-output-tokens limit for one candidate, before the positivity check. */
function resolveCandidateMaxOutputTokens(
  candidate: AdvertisedLimitCandidate
): number | null | undefined {
  return candidate.resolvedMaxOutputTokens !== undefined
    ? candidate.resolvedMaxOutputTokens
    : getResolvedModelCapabilities({
        provider: candidate.provider,
        model: candidate.model,
      }).maxOutputTokens;
}

/** Folds one candidate's resolved value into the running MAX-across-candidates. */
function foldIntoMax(runningMax: number | null, resolved: unknown): number | null {
  if (!isPositiveFiniteNumber(resolved)) {
    return runningMax;
  }
  return runningMax === null ? resolved : Math.max(runningMax, resolved);
}

export function computeAdvertisedLimits(candidates: AdvertisedLimitCandidate[]): {
  contextLength: number | null;
  maxOutputTokens: number | null;
} {
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return { contextLength: null, maxOutputTokens: null };
  }

  let contextLength: number | null = null;
  let maxOutputTokens: number | null = null;
  for (const candidate of candidates) {
    contextLength = foldIntoMax(contextLength, resolveCandidateContextLength(candidate));
    maxOutputTokens = foldIntoMax(maxOutputTokens, resolveCandidateMaxOutputTokens(candidate));
  }
  return {
    contextLength,
    maxOutputTokens:
      maxOutputTokens === null ? DEFAULT_ADVERTISED_MAX_OUTPUT_TOKENS : maxOutputTokens,
  };
}
