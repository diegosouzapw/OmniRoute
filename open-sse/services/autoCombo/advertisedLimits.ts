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
    const limit =
      candidate.resolvedContextLength !== undefined
        ? candidate.resolvedContextLength
        : getTokenLimit(candidate.provider, candidate.model);
    if (typeof limit === "number" && Number.isFinite(limit) && limit > 0) {
      contextLength = contextLength === null ? limit : Math.max(contextLength, limit);
    }
    const output =
      candidate.resolvedMaxOutputTokens !== undefined
        ? candidate.resolvedMaxOutputTokens
        : getResolvedModelCapabilities({
            provider: candidate.provider,
            model: candidate.model,
          }).maxOutputTokens;
    if (typeof output === "number" && Number.isFinite(output) && output > 0) {
      maxOutputTokens = maxOutputTokens === null ? output : Math.max(maxOutputTokens, output);
    }
  }
  if (maxOutputTokens === null) {
    maxOutputTokens = DEFAULT_ADVERTISED_MAX_OUTPUT_TOKENS;
  }
  return { contextLength, maxOutputTokens };
}
