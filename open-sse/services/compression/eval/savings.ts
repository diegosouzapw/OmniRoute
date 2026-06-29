import { estimateCompressionTokens } from "../stats.ts";

export interface SavingsResult {
  tokensBefore: number;
  tokensAfter: number;
  ratio: number; // tokensAfter / tokensBefore (1 = no savings)
  costDelta?: number; // USD saved on input tokens, when a price is supplied
}

/**
 * Mechanical savings for a full-vs-compressed body pair. Reuses the production
 * token estimator so the eval reports the same numbers the pipeline reports.
 * `costPerKTokenIn` (USD per 1000 input tokens) is optional — when supplied, the
 * positive cost saved on the input side is reported (the eval does not model output cost).
 */
export function computeSavings(
  fullBody: Record<string, unknown>,
  compressedBody: Record<string, unknown>,
  costPerKTokenIn?: number
): SavingsResult {
  const tokensBefore = estimateCompressionTokens(fullBody);
  const tokensAfter = estimateCompressionTokens(compressedBody);
  const ratio = tokensBefore > 0 ? Math.round((tokensAfter / tokensBefore) * 10000) / 10000 : 1;
  const result: SavingsResult = { tokensBefore, tokensAfter, ratio };
  if (typeof costPerKTokenIn === "number" && costPerKTokenIn > 0) {
    const saved = ((tokensBefore - tokensAfter) / 1000) * costPerKTokenIn;
    result.costDelta = Math.round(saved * 1e6) / 1e6;
  }
  return result;
}
