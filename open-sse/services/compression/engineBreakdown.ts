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
