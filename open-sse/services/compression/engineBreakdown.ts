import type { CompressionStats } from "./types.ts";

export type EngineBreakdownEntry = NonNullable<CompressionStats["engineBreakdown"]>[number];

/**
 * Return a non-empty per-engine breakdown for the live `compression.completed` event.
 *
 * Only the stacked pipeline fills `stats.engineBreakdown`; single-engine modes
 * (rtk/lite/standard/aggressive/ultra) leave it empty, which makes the dashboard studio render
 * an empty Input→Output pipeline (no engine node, inert replay) for the most common case. When
 * the breakdown is empty we synthesize a single entry from the overall stats so the studio
 * always shows at least one real engine node. Mirrors `seedLatestCompressionRunFromDb`.
 */
export function ensureEngineBreakdown(stats: CompressionStats): EngineBreakdownEntry[] {
  if (stats.engineBreakdown && stats.engineBreakdown.length > 0) {
    return stats.engineBreakdown;
  }
  return [
    {
      engine: stats.engine || stats.mode || "compression",
      originalTokens: stats.originalTokens,
      compressedTokens: stats.compressedTokens,
      savingsPercent: stats.savingsPercent,
      techniquesUsed: stats.techniquesUsed ?? [],
      ...(stats.rulesApplied ? { rulesApplied: stats.rulesApplied } : {}),
      ...(stats.durationMs !== undefined ? { durationMs: stats.durationMs } : {}),
    },
  ];
}

/**
 * #6488 — Reconcile the single-engine breakdown entry's token counts with the response's
 * authoritative outer counts.
 *
 * The outer `originalTokens`/`compressedTokens` fields (computed by the API route with a real
 * tiktoken-based counter over the extracted message text) and each `engineBreakdown[]` entry's
 * `originalTokens`/`compressedTokens` (computed internally by `estimateCompressionTokens`, a
 * crude `JSON.stringify(requestBody).length / 4` estimate over the whole request-body object)
 * use two different, unreconciled token-counting methodologies. They diverge most on
 * small/degenerate inputs where JSON structural overhead (braces, quotes, `role`/`content`
 * keys) dominates the char count.
 *
 * When the breakdown has exactly one entry, that entry represents the *same* before/after
 * transformation as the overall response (single-engine dispatch, or a 1-step pipeline) — so
 * its counts are safe to overwrite with the outer, more accurate figures. Multi-step
 * breakdowns are left untouched: each intermediate step legitimately operates on the previous
 * step's (already-compressed) output, so its "before" state is not the overall original input
 * and reconciling it against the overall counts would be incorrect.
 */
export function reconcileSingleEngineTokens(
  breakdown: EngineBreakdownEntry[],
  outerOriginalTokens: number,
  outerCompressedTokens: number,
  outerSavingsPercent: number
): EngineBreakdownEntry[] {
  if (breakdown.length !== 1) return breakdown;
  const [entry] = breakdown;
  return [
    {
      ...entry,
      originalTokens: outerOriginalTokens,
      compressedTokens: outerCompressedTokens,
      savingsPercent: outerSavingsPercent,
    },
  ];
}
