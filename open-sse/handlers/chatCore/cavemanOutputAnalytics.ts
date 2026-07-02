/**
 * chatCore caveman-output compression analytics (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's request-setup compression path: when only the caveman output
 * mode was applied (no upstream compression run recorded a row), persist a single analytics row so
 * output-caveman runs still surface in compression analytics. Best-effort — returns the write
 * promise (the caller assigns it to compressionAnalyticsWritePromise) and swallows its own errors.
 * Behaviour is byte-identical to the previous inline block.
 */

type LoggerLike = { debug?: (...args: unknown[]) => void } | null | undefined;

export function writeCavemanOutputAnalytics(args: {
  comboName: string | null | undefined;
  provider: string | null | undefined;
  compressionComboId: string | null | undefined;
  estimatedTokens: number;
  skillRequestId: string;
  cavemanOutputModeIntensity: string | null | undefined;
  log?: LoggerLike;
}): Promise<void> {
  return (async () => {
    try {
      const { insertCompressionAnalyticsRow } = await import("@/lib/db/compressionAnalytics");
      insertCompressionAnalyticsRow({
        timestamp: new Date().toISOString(),
        combo_id: args.comboName ?? null,
        provider: args.provider ?? null,
        mode: "output-caveman",
        engine: "caveman-output",
        compression_combo_id: args.compressionComboId ?? null,
        original_tokens: args.estimatedTokens,
        compressed_tokens: args.estimatedTokens,
        tokens_saved: 0,
        request_id: args.skillRequestId,
        output_mode: args.cavemanOutputModeIntensity,
      });
    } catch (err) {
      args.log?.debug?.(
        "COMPRESSION",
        "Caveman output analytics write skipped: " +
          (err instanceof Error ? err.message : String(err))
      );
    }
  })();
}
