/**
 * chatCore output-style run-telemetry hook (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's request-setup compression path: when the unified output styles
 * ran, emit the per-run telemetry record so output-style usage surfaces in compression analytics.
 * Best-effort, fire-and-forget — an un-awaited IIFE that swallows its own errors and never affects
 * the request. Behaviour is byte-identical to the previous inline block.
 */

import { type OutputStylesResult } from "../../services/compression/outputStyles/apply.ts";

type LoggerLike = { debug?: (...args: unknown[]) => void } | null | undefined;

export function emitOutputStyleTelemetry(args: {
  outputStyleResult: OutputStylesResult | null | undefined;
  skillRequestId: string | null | undefined;
  traceId: string | null | undefined;
  effectiveModel: string | null | undefined;
  provider: string | null | undefined;
  compressionComboId: string | null | undefined;
  estimatedTokens: number;
  log?: LoggerLike;
}): void {
  const result = args.outputStyleResult;
  if (!result) return;

  void (async () => {
    try {
      const { buildOutputStyleTelemetry } = await import(
        "../../services/compression/outputStyles/telemetry.ts"
      );
      const { insertCompressionRunTelemetryRow } = await import("@/lib/db/compressionRunTelemetry");
      const record = buildOutputStyleTelemetry({
        requestId: args.skillRequestId ?? args.traceId ?? "",
        model: args.effectiveModel ?? "",
        provider: args.provider ?? "",
        source: args.compressionComboId ? "active-profile" : "default",
        tokensBefore: args.estimatedTokens,
        tokensAfter: args.estimatedTokens,
        applied: result.applied,
        appliedStyles: result.appliedStyles,
        skippedReason: result.skippedReason,
      });
      insertCompressionRunTelemetryRow(record);
    } catch (err) {
      args.log?.debug?.(
        "COMPRESSION",
        "Run-telemetry emit skipped: " + (err instanceof Error ? err.message : String(err))
      );
    }
  })();
}
