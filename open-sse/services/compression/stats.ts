import {
  type CompressionMode,
  type CompressionStats,
  type CompressionConfig,
  DEFAULT_COMPRESSION_CONFIG,
  DEFAULT_CAVEMAN_CONFIG,
  DEFAULT_RTK_CONFIG,
  DEFAULT_COMPRESSION_LANGUAGE_CONFIG,
} from "./types.ts";

const CHARS_PER_TOKEN = 4;

export function estimateCompressionTokens(text: string | object | null | undefined): number {
  if (!text) return 0;
  const str = typeof text === "string" ? text : JSON.stringify(text);
  return Math.ceil(str.length / CHARS_PER_TOKEN);
}

/** @deprecated Use estimateCompressionTokens instead. */
export const estimateTokensForStats = estimateCompressionTokens;

export function createCompressionStats(
  originalBody: Record<string, unknown>,
  compressedBody: Record<string, unknown>,
  mode: CompressionMode,
  techniquesUsed: string[],
  rulesApplied?: string[],
  durationMs?: number
): CompressionStats {
  const originalTokens = estimateCompressionTokens(originalBody);
  const compressedTokens = estimateCompressionTokens(compressedBody);
  const savingsPercent =
    originalTokens > 0
      ? Math.round(((originalTokens - compressedTokens) / originalTokens) * 10000) / 100
      : 0;
  return {
    originalTokens,
    compressedTokens,
    savingsPercent,
    techniquesUsed,
    mode,
    timestamp: Date.now(),
    ...(rulesApplied && rulesApplied.length > 0 ? { rulesApplied } : {}),
    ...(durationMs !== undefined ? { durationMs } : {}),
  };
}

export function trackCompressionStats(stats: CompressionStats): void {
  if (stats.originalTokens <= 0) return;
  const rulesInfo = stats.rulesApplied?.length ? ` rules=${stats.rulesApplied.join(",")}` : "";
  const durationInfo = stats.durationMs !== undefined ? ` ${stats.durationMs}ms` : "";
  // Compression stats tracking — no-op in production (use structured logging if needed)
}

export function getDefaultCompressionConfig(): CompressionConfig {
  return {
    ...DEFAULT_COMPRESSION_CONFIG,
    cavemanConfig: { ...DEFAULT_CAVEMAN_CONFIG },
    rtkConfig: { ...DEFAULT_RTK_CONFIG },
    languageConfig: { ...DEFAULT_COMPRESSION_LANGUAGE_CONFIG },
  };
}
