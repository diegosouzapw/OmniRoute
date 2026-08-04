/**
 * Codex Responses-over-WebSocket prompt-compression parity (#8052).
 *
 * The HTTP/SSE chat pipeline (open-sse/handlers/chatCore.ts) runs every request through the
 * modular compression pipeline (settings → strategy selection → applyCompressionAsync →
 * compression_analytics/compression_engine_breakdown writes) before dispatching upstream. The
 * Codex Responses WebSocket bridge (`prepare()` in ./route.ts) never called any of that — it
 * authenticated, injected memory, applied reasoning-routing, then went straight to
 * `executor.transformRequest()`.
 *
 * This module wires the same core pipeline (settings resolution, mode selection via
 * `selectCompressionStrategy`, `applyCompressionAsync`, analytics persistence) into the WS
 * bridge's per-turn `prepare()` call, using `adaptBodyForCompression`'s existing Responses-API
 * (`input[]`) adapter so the same engines that already understand chat `messages[]` bodies work
 * unmodified here too. Deliberately scoped to the core pipeline (settings → mode → engines →
 * analytics) — combo/output-style/live-zone/adaptive-budget refinements stay chatCore-only for
 * now; the WS bridge previously had *zero* compression coverage, so this closes the primary gap.
 */

import { logger } from "@omniroute/open-sse/utils/logger.ts";
import { estimateTokens } from "@omniroute/open-sse/services/contextManager.ts";
import { adaptBodyForCompression } from "@omniroute/open-sse/services/compression/bodyAdapter.ts";
import type {
  CompressionConfig,
  CompressionResult,
} from "@omniroute/open-sse/services/compression/types.ts";
import { resolveCompressionSettings } from "@omniroute/open-sse/handlers/chatCore/compressionSettings.ts";
import {
  writeCompressionAnalytics,
  writeCompressionSkip,
} from "@omniroute/open-sse/handlers/chatCore/compressionAnalyticsWrite.ts";

const log = logger("RESPONSES_WS_COMPRESSION");

type JsonRecord = Record<string, unknown>;

export type ResponsesWsCompressionContext = {
  provider: string;
  model: string;
  /** Distinct per logical turn — feeds the compression_analytics.request_id column. */
  requestId: string;
};

/**
 * Runs the core compression pipeline against a Codex Responses `response` body and returns the
 * (possibly rewritten) body. Best-effort: any resolution/engine failure logs and returns the
 * original body untouched — a broken compression path must never break the WS turn.
 */
export async function applyResponsesWsCompression(
  responseBody: JsonRecord,
  ctx: ResponsesWsCompressionContext
): Promise<JsonRecord> {
  try {
    const { settings, enabled } = await resolveCompressionSettings(log);
    if (!enabled || !settings) return responseBody;

    const adapter = adaptBodyForCompression(responseBody);
    if (!adapter.adapted || !Array.isArray(adapter.body.messages) || adapter.body.messages.length === 0) {
      return responseBody;
    }

    const { selectCompressionStrategy, applyCompressionAsync } = await import(
      "@omniroute/open-sse/services/compression/strategySelector.ts"
    );

    const estimatedTokens = estimateTokens(adapter.body.messages);
    const cachingContext = {
      provider: ctx.provider,
      targetFormat: "openai-responses",
      model: ctx.model,
      connectionCacheOverride: null,
    };
    const mode = selectCompressionStrategy(
      settings,
      null,
      estimatedTokens,
      adapter.body,
      cachingContext,
      {},
      null
    );
    if (mode === "off") return responseBody;

    const result = await applyCompressionAsync(adapter.body, mode, {
      model: ctx.model,
      providerTransport:
        ctx.provider === "anthropic" || ctx.provider === "claude" ? "direct" : "aggregator",
      config: settings as CompressionConfig,
      cachingContext,
    });

    return await persistAndRestore(result, adapter, responseBody, mode, settings, ctx);
  } catch (err) {
    log.warn(
      `[codex-responses-ws] compression skipped: ${err instanceof Error ? err.message : String(err)}`
    );
    return responseBody;
  }
}

async function persistAndRestore(
  result: CompressionResult,
  adapter: ReturnType<typeof adaptBodyForCompression>,
  responseBody: JsonRecord,
  mode: string,
  settings: CompressionConfig,
  ctx: ResponsesWsCompressionContext
): Promise<JsonRecord> {
  if (!result.stats) return responseBody;

  const writeOpts = {
    stats: result.stats,
    provider: ctx.provider,
    effectiveModel: ctx.model,
    effectiveServiceTier: undefined,
    comboName: null,
    mode,
    compressionComboId: settings.compressionComboId,
    skillRequestId: ctx.requestId,
    cavemanOutputModeApplied: false,
    cavemanOutputModeIntensity: null,
    log,
  };

  if (!result.compressed) {
    void writeCompressionSkip(writeOpts, "no_savings");
    return responseBody;
  }

  void writeCompressionAnalytics(writeOpts);
  return adapter.restore(result.body) as JsonRecord;
}
