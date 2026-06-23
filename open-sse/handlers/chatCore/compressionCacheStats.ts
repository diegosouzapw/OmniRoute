/**
 * chatCore compression cache-stats hook (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's request-setup compression path: when a prompt was compressed,
 * record the caching-context cache-stats receipt (estimated cache hit + tokens saved). Best-effort,
 * fire-and-forget — the inner work is an un-awaited IIFE that swallows its own errors and never
 * affects the request. Behaviour is byte-identical to the previous inline block.
 */

type LoggerLike = { debug?: (...args: unknown[]) => void } | null | undefined;

export function recordCompressionCacheStats(args: {
  compressionInputBody: unknown;
  provider: string | null | undefined;
  targetFormat: string | null | undefined;
  effectiveModel: string | null | undefined;
  mode: string;
  stats: { originalTokens: number; compressedTokens: number };
  log?: LoggerLike;
}): void {
  void (async () => {
    try {
      const { detectCachingContext } = await import("../../services/compression/cachingAware.ts");
      const { recordCacheStats } = await import("@/lib/db/compressionCacheStats");
      const cacheContext = detectCachingContext(args.compressionInputBody, {
        provider: args.provider,
        targetFormat: args.targetFormat,
        model: args.effectiveModel,
      });
      const tokensSavedCompression = Math.max(
        0,
        args.stats.originalTokens - args.stats.compressedTokens
      );
      recordCacheStats({
        provider: cacheContext.provider ?? args.provider ?? "unknown",
        model: args.effectiveModel ?? "",
        compressionMode: args.mode,
        cacheControlPresent: cacheContext.hasCacheControl,
        estimatedCacheHit: cacheContext.hasCacheControl && cacheContext.isCachingProvider,
        tokensSavedCompression,
        tokensSavedCaching: 0,
        netSavings: tokensSavedCompression,
      });
    } catch (err) {
      args.log?.debug?.(
        "COMPRESSION",
        "Compression cache stats write skipped: " +
          (err instanceof Error ? err.message : String(err))
      );
    }
  })();
}
