export interface PostTranslationCompressionInput {
  runPostTranslationCompression?: (body: Record<string, unknown>) => Promise<{ compressed?: boolean; body?: unknown; stats?: (Record<string, unknown> & { originalTokens?: number; compressedTokens?: number }) | null }>;
  translatedBody: Record<string, unknown> | null | undefined;
  tokensCompressed: number;
  compressionResponseMeta: string | null;
  provider: string;
  connectionId?: string | null;
  effectiveModel: string;
  effectiveServiceTier?: string | null;
  comboName?: string | null;
  skillRequestId?: string | null;
  sourceFormat?: string | null;
  targetFormat?: string | null;
  log?: { warn?: (...args: unknown[]) => void; info?: (...args: unknown[]) => void };
  trace?: (...args: unknown[]) => void;
  writeCompressionAnalytics: (payload: Record<string, unknown>) => Promise<void>;
}

export async function applyPostTranslationCompression(input: PostTranslationCompressionInput) {
  let { translatedBody, tokensCompressed, compressionResponseMeta } = input;
  const { runPostTranslationCompression, provider, effectiveModel, effectiveServiceTier, comboName, skillRequestId, sourceFormat, targetFormat, log, trace, writeCompressionAnalytics } = input;
  let compressionAnalyticsWritePromise: Promise<void> | null = null;
  if (runPostTranslationCompression && translatedBody && typeof translatedBody === "object") {
    const transientFields = new Map<string, unknown>();
    const postInput = { ...(translatedBody as Record<string, unknown>) };
    for (const [key, value] of Object.entries(postInput)) {
      // Translators keep response-side aliases in Maps under private keys. They
      // are not JSON request fields and would otherwise be stringified to `{}`
      // by the OmniGlyph library wrapper; restore them after the wire transform.
      if (key.startsWith("_") && value instanceof Map) {
        transientFields.set(key, value);
        delete postInput[key];
      }
    }
    try {
      const [{ formatCompressionAnnotation }, { trackCompressionStats }] = await Promise.all([
        import("../services/compression/strategySelector.ts"),
        import("../services/compression/stats.ts"),
      ]);
      const postResult = await runPostTranslationCompression(postInput);
      if (postResult.compressed) {
        translatedBody = {
          ...(postResult.body as typeof translatedBody),
          ...Object.fromEntries(transientFields),
        };
        tokensCompressed += Math.max(
          0,
          (postResult.stats?.originalTokens ?? 0) - (postResult.stats?.compressedTokens ?? 0)
        );
        if (postResult.stats) {
          const annotation = formatCompressionAnnotation(postResult.stats);
          if (annotation) {
            compressionResponseMeta = compressionResponseMeta
              ? `${compressionResponseMeta}; ${annotation}`
              : annotation;
          }
          trackCompressionStats(postResult.stats);
          compressionAnalyticsWritePromise = writeCompressionAnalytics({
            stats: postResult.stats,
            provider,
            effectiveModel,
            effectiveServiceTier,
            comboName,
            mode: postResult.stats.mode,
            compressionComboId: postResult.stats.compressionComboId ?? null,
            skillRequestId,
            cavemanOutputModeApplied: false,
            cavemanOutputModeIntensity: null,
            log,
          });
          await compressionAnalyticsWritePromise;
        }
        log?.info?.(
          "COMPRESSION",
          `Post-translation OmniGlyph applied (${sourceFormat} → ${targetFormat})`
        );
      }
    } catch (error) {
      // Compression is deliberately fail-open. A provider-shaped transform
      // must never turn an otherwise valid translated request into a 500.
      log?.warn?.(
        "COMPRESSION",
        "Post-translation OmniGlyph skipped: " +
          (error instanceof Error ? error.message : String(error))
      );
    }
  }

  trace?.("post_translation");

  // Keep the request translator's namespace identities separate from toolNameMap:
  // the latter is a Kiro/Claude passthrough alias channel with string values,
  // while namespace identities carry `{namespace, name}` for the #7936 response
  // seam. Capture both before stripping their side channels: a Responses ->
  // Gemini/Antigravity pivot carries both maps, not one recoverable ledger.

  return { translatedBody, tokensCompressed, compressionResponseMeta, compressionAnalyticsWritePromise };
}
