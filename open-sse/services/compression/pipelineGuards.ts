/**
 * Aggregate guards for the stacked compression pipeline (T02 / Headroom H1).
 *
 * These operate on the WHOLE pipeline result, distinct from the opt-in per-step TV1 bail-out
 * (`decideStep` in `strategySelector.ts`): TV1 governs whether to ADVANCE between steps and is
 * default-off; the inflation guard here is an honest DEFAULT-ON check on the FINAL output.
 */

export interface PipelineInflationInput {
  /** The verbatim request body before any engine ran. */
  originalBody: Record<string, unknown>;
  /** The fully-stacked body after the pipeline ran. */
  compressedBody: Record<string, unknown>;
  /** Token count of `originalBody` (already measured by the stats pass). */
  originalTokens: number;
  /** Token count of `compressedBody` (already measured by the stats pass). */
  compressedTokens: number;
}

export interface PipelineInflationResult {
  /** The body to actually use: the original when the pipeline did not shrink it. */
  body: Record<string, unknown>;
  /** True when the stacked output did not shrink the input, so the original was kept. */
  inflated: boolean;
}

/**
 * Honest aggregate inflation guard. If the fully-stacked body did not actually shrink — its token
 * count is `>=` the original — the compressed body is discarded and the verbatim original is
 * returned.
 *
 * Safe by construction: the only alternative it ever returns is `originalBody`, the unmodified
 * request, which is always a valid payload. A (rare) false trigger therefore can never corrupt a
 * payload — it only forgoes a compression that saved nothing.
 *
 * `originalTokens === 0` (empty/degenerate input) is treated as "not inflated" so an empty body is
 * never spuriously flagged.
 */
export function guardPipelineInflation(input: PipelineInflationInput): PipelineInflationResult {
  const { originalTokens, compressedTokens } = input;
  if (originalTokens > 0 && compressedTokens >= originalTokens) {
    return { body: input.originalBody, inflated: true };
  }
  return { body: input.compressedBody, inflated: false };
}
