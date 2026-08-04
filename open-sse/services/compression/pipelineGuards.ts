/**
 * Aggregate guards for the stacked compression pipeline (T02 / Headroom H1).
 *
 * These operate on the WHOLE pipeline result, distinct from the opt-in per-step TV1 bail-out
 * (`decideStep` in `strategySelector.ts`): TV1 governs whether to ADVANCE between steps and is
 * default-off; the inflation guard here is an honest DEFAULT-ON check on the FINAL output.
 */

import type { CompressionResult, CompressionStats } from "./types.ts";

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
 * Honest aggregate inflation guard. Only genuine INFLATION — the fully-stacked body is strictly
 * LARGER than the original (`compressedTokens > originalTokens`) — discards the compressed body and
 * returns the verbatim original.
 *
 * A net-zero result (`compressedTokens === originalTokens`) is a NO-OP, not inflation: a structural
 * engine (e.g. `ccr`, `session-dedup`) that found no candidate returns the body unchanged, so its
 * token count equals the original. That is zero savings, not a revert — flagging it as inflation
 * would emit a misleading "did not shrink; reverted to original" warning for an engine that never
 * touched the payload. Equality therefore must NOT trip the guard.
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
  if (originalTokens > 0 && compressedTokens > originalTokens) {
    return { body: input.originalBody, inflated: true };
  }
  return { body: input.compressedBody, inflated: false };
}

/**
 * Applies the aggregate inflation guard to a finalized stacked-pipeline `stats` object, honoring
 * the `compressed` loop-level flag (#6480). If the fully-stacked body did not actually shrink
 * (its token count is >= the original), discards it and returns the verbatim original — safe by
 * construction, since the original request body is always a valid payload.
 *
 * Only meaningful when some step actually advanced `currentBody` (`compressed === true`). When
 * no step in the pipeline ever produced/advanced a candidate (e.g. a single no-op engine on an
 * out-of-charter payload), `currentBody` is still reference-identical to `originalBody`, so
 * tokens are trivially equal — running the guard in that case would mislabel a genuine no-op as
 * a "reverted" fallback (`fallbackApplied: true` + a misleading warning) even though nothing was
 * ever computed to revert.
 */
export function applyStackedInflationGuard(
  originalBody: Record<string, unknown>,
  currentBody: Record<string, unknown>,
  compressed: boolean,
  stats: CompressionStats
): CompressionResult {
  if (!compressed) return { body: currentBody, compressed, stats };

  const inflation = guardPipelineInflation({
    originalBody,
    compressedBody: currentBody,
    originalTokens: stats.originalTokens,
    compressedTokens: stats.compressedTokens,
  });
  if (!inflation.inflated) return { body: currentBody, compressed, stats };

  const inflatedTokens = stats.compressedTokens;
  const warnings = new Set(stats.validationWarnings ?? []);
  warnings.add(
    `pipeline-inflation-guard: stacked output (${inflatedTokens} tok) did not shrink input ` +
      `(${stats.originalTokens} tok); reverted to original`
  );
  stats.validationWarnings = Array.from(warnings);
  stats.fallbackApplied = true;
  stats.compressedTokens = stats.originalTokens;
  stats.savingsPercent = 0;
  return { body: inflation.body, compressed: false, stats };
}
