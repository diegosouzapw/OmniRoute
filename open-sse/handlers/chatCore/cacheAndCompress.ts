/**
 * Context compression and semantic cache checking lifted out of handleChatCore.
 *
 * Orchestrates:
 * 1. Semantic cache check (temp=0, early return on hit)
 * 2. Reasoning input policy validation
 * 3. Body sanitization & memory/skills injection
 * 4. Proactive context compression & last-resort compaction
 * 5. Output token budget enforcement
 */

import { checkSemanticCache } from "./semanticCache.ts";
import { FORMATS } from "../../translator/formats.ts";
import {
  applyReasoningInputPolicy,
  resolveIncompatibleReasoningAction,
} from "../../services/reasoningInputPolicy.ts";
import { trackPendingRequest } from "@/lib/usageDb";
import { HTTP_STATUS, DEFAULT_MAX_TOKENS } from "../../config/constants.ts";
import { createErrorResult } from "../../utils/error.ts";
import { sanitizeChatRequestBody } from "./sanitization.ts";
import { isNoMemoryRequested } from "./headers.ts";
import { resolveMemoryOwnerId } from "./memoryExtraction.ts";
import { injectMemoryAndSkills, mergeInjectedFallbackOwnerNames } from "./memorySkillsInjection.ts";
import { adaptBodyForCompression } from "../../services/compression/bodyAdapter.ts";
import { applyContextCompression } from "./contextCompression.ts";
import { estimateFinalInputTokens } from "./contextEstimation.ts";
import { compressContext, estimateTokens, getTokenLimit } from "../../services/contextManager.ts";
import { toPositiveInteger } from "../../services/reasoningTokenBuffer.ts";
import { getExplicitModelOutputCap, resolveInputTokenCapForGate } from "@/lib/modelCapabilities";
import { areContextWindowChecksDisabled } from "@/shared/utils/featureFlags.ts";
import { enforceOutputTokenBudget } from "./outputTokenBudget.ts";
import type { CompressionResult } from "../../services/compression/types.ts";

export type CacheAndCompressDeps = {
  semanticCacheEnabled: boolean;
  body: Record<string, unknown> | null;
  clientRawRequest: Parameters<typeof checkSemanticCache>[0]["clientRawRequest"];
  model: string;
  provider: string;
  stream: boolean;
  reqLogger?: Parameters<typeof checkSemanticCache>[0]["reqLogger"];
  effectiveServiceTier?: string;
  pendingScope?: Parameters<typeof checkSemanticCache>[0]["pendingScope"];
  startTime: number;
  log?: {
    debug?: (...args: unknown[]) => void;
    info?: (...args: unknown[]) => void;
    warn?: (...args: unknown[]) => void;
    error?: (...args: unknown[]) => void;
  } | null;
  persistAttemptLogsPrelude?: Parameters<typeof checkSemanticCache>[0]["persistAttemptLogs"];
  apiKeyInfo?: Record<string, unknown> | null;
  sourceFormat: string;
  targetFormat: string;
  credentials?: {
    providerSpecificData?: { preserveEncryptedReasoning?: boolean } & Record<string, unknown>;
  } | null;
  reasoningTransportFallback?: string;
  isCombo: boolean;
  comboStepId?: string | null;
  comboExecutionKey?: string | null;
  connectionId?: string | null;
  effectiveModel: string;
  backgroundReason?: unknown;
  webSearchFallbackPlan?: {
    enabled?: boolean;
    convertedToolCount?: number;
    toolName?: string;
  } | null;
  webFetchFallbackPlan?: {
    enabled?: boolean;
    convertedToolCount?: number;
    toolName?: string;
  } | null;
  preConversionClientToolNames?: string[] | null;
  comboName?: string | null;
  getCurrentConnectionId?: () => string | null | undefined;
  routingComboId?: string | null;
  skillRequestId?: string | null;
  traceId?: string;
  nativeCodexPassthrough?: boolean;
  tokensCompressed: number;
  compressionAnalyticsWritePromise?: Promise<void> | null;
};

export type CacheAndCompressResult =
  | { kind: "return"; response: Response | Record<string, unknown> }
  | {
      kind: "continue";
      body: Record<string, unknown> | null;
      memoryOwnerId: string | null;
      memorySettings: unknown;
      injectionResult: unknown;
      compressionAnalyticsWritePromise: Promise<void> | null;
      compressionResponseMeta: string | null;
      contextEditingEnabled: boolean;
      preCompressionBody: Record<string, unknown> | null;
      runPostTranslationCompression:
        ((input: Record<string, unknown>) => Promise<CompressionResult>) | null;
      tokensCompressed: number;
      cavemanOutputModeApplied: boolean;
      cavemanOutputModeIntensity: string | null;
      contextLimit: number | null;
      reactiveContextCompactionEnabled: boolean;
    };

export async function runCacheAndCompress(
  deps: CacheAndCompressDeps
): Promise<CacheAndCompressResult> {
  const {
    semanticCacheEnabled,
    clientRawRequest,
    model,
    provider,
    stream,
    reqLogger,
    effectiveServiceTier,
    pendingScope,
    startTime,
    log,
    persistAttemptLogsPrelude,
    apiKeyInfo,
    sourceFormat,
    targetFormat,
    credentials,
    reasoningTransportFallback,
    isCombo,
    comboStepId,
    comboExecutionKey,
    connectionId,
    effectiveModel,
    backgroundReason,
    webSearchFallbackPlan,
    webFetchFallbackPlan,
    preConversionClientToolNames,
    comboName,
    getCurrentConnectionId,
    routingComboId,
    skillRequestId,
    traceId,
    nativeCodexPassthrough,
  } = deps;

  let body = deps.body;
  let tokensCompressed = deps.tokensCompressed;
  let compressionAnalyticsWritePromise = deps.compressionAnalyticsWritePromise ?? null;

  // -- Phase 9.1: Semantic cache check (temp=0, any streaming mode) --
  const cacheHit = await checkSemanticCache({
    semanticCacheEnabled,
    body,
    clientRawRequest,
    model,
    provider,
    stream: !!stream,
    reqLogger,
    effectiveServiceTier,
    pendingScope,
    startTime,
    log,
    persistAttemptLogs: persistAttemptLogsPrelude,
    apiKeyId: apiKeyInfo?.id ?? undefined,
    cacheDefaultMode: (apiKeyInfo as { cacheDefaultMode?: "legacy" | "bypass" } | null)
      ?.cacheDefaultMode,
  });
  if (cacheHit) {
    return { kind: "return", response: cacheHit as Response };
  }

  const reasoningInputFormat =
    sourceFormat === FORMATS.OPENAI_RESPONSES
      ? "responses"
      : sourceFormat === FORMATS.OPENAI
        ? "chat"
        : null;
  if (reasoningInputFormat && body && typeof body === "object") {
    const policy = applyReasoningInputPolicy(
      body as Record<string, unknown>,
      reasoningInputFormat,
      {
        provider,
        preserveEncryptedReasoning:
          credentials?.providerSpecificData?.preserveEncryptedReasoning === true,
        onIncompatibleReasoning: resolveIncompatibleReasoningAction({
          reasoningTransportFallback,
          // #11178 regressed combo steps whose combo record carries no explicit
          // stepId/executionKey (plain model-list combos): their explicit
          // `reasoningTransportFallback: "skip"` config was silently degraded to
          // "drop". `isCombo` is the combo marker; step ids are optional
          // finer-grained metadata that plain combos never set.
          isComboStep: Boolean(isCombo) || Boolean(comboStepId || comboExecutionKey),
          headers: clientRawRequest?.headers ?? null,
        }),
      }
    );
    if (policy.incompatibleReasoning) {
      trackPendingRequest(model, provider, connectionId, false);
      return {
        kind: "return",
        response: createErrorResult(
          HTTP_STATUS.BAD_REQUEST,
          "Reasoning continuation is not compatible with the selected target"
        ),
      };
    }
  }

  body = sanitizeChatRequestBody(body, sourceFormat, targetFormat);
  // Per-request opt-out: clients that manage their own context send
  // `x-omniroute-no-memory: true` to skip memory+skills injection (a null owner
  // disables both branches in injectMemoryAndSkills). See PRD-2026-06-19-no-memory-header.
  const memoryOwnerId = isNoMemoryRequested(clientRawRequest?.headers ?? null)
    ? null
    : resolveMemoryOwnerId(apiKeyInfo as Record<string, unknown> | null);
  const injectionResult = await injectMemoryAndSkills({
    body,
    memoryOwnerId,
    provider,
    effectiveModel,
    sourceFormat,
    targetFormat,
    backgroundReason,
    log,
  });
  body = injectionResult.body;
  const memorySettings = injectionResult.memorySettings;

  // Merge web-search/web-fetch fallback tool names into the builtin owner set.
  // injectMemoryAndSkills only tracks memory tools; the fallback names were
  // injected into body.tools by prepareWebSearchFallbackBody/prepareWebFetchFallbackBody
  // above, so they must be carried into the owner provenance chain here.
  const mergedOwnerNames = mergeInjectedFallbackOwnerNames(
    injectionResult,
    [webSearchFallbackPlan, webFetchFallbackPlan],
    preConversionClientToolNames
  );
  injectionResult.builtinToolNames = mergedOwnerNames.builtinToolNames;

  // Translate request (pass reqLogger for intermediate logging)
  // -- Proactive Context Compression (Phase 4) --
  // Check if context exceeds 70% of limit and compress proactively before sending to provider.
  // This prevents "prompt too long" errors for large-but-not-full contexts.
  const compressionBody = body
    ? adaptBodyForCompression(body as Record<string, unknown>).body
    : null;
  const allMessages = compressionBody?.messages || body?.contents || body?.request?.contents || [];
  let cavemanOutputModeApplied = false;
  let cavemanOutputModeIntensity: string | null = null;
  let preCompressionBody: typeof body | null = null;
  let compressionResponseMeta: string | null = null;
  // OmniGlyph 1.3.x has native OpenAI Chat/Responses transformers. When the
  // inbound protocol differs from the provider wire, defer only that engine to
  // the post-translation body; the text engines still run in their legacy lane.
  let runPostTranslationCompression:
    ((input: Record<string, unknown>) => Promise<CompressionResult>) | null = null;
  // Delegated Context Editing (Claude only): captured at the canonical compression
  // settings read below, then threaded to executor.execute() further down. Lives at
  // function scope because the read happens inside the per-message compression block.
  let contextEditingEnabled = false;
  // The dashboard's global compression switch must also control the built-in
  // reactive and last-resort compaction passes. Otherwise an operator selecting
  // "off" still has large histories rewritten by trim_tools/purify_history.
  let reactiveContextCompactionEnabled = false;
  // Hoisted to function scope (not just the compression-block scope below) so the
  // combo-resolved override survives to the final enforceOutputTokenBudget() call
  // further down -- see #8378 (context limit resolved by the combo was silently
  // discarded because it only existed inside this `if` block).
  let contextLimit = getTokenLimit(provider, effectiveModel);
  const compressionOutcome = await applyContextCompression({
    body,
    allMessages,
    apiKeyInfo,
    clientRawRequest,
    comboName,
    connectionId,
    credentials,
    effectiveModel,
    effectiveServiceTier,
    getCurrentConnectionId,
    isCombo,
    log,
    provider,
    routingComboId,
    skillRequestId,
    sourceFormat,
    targetFormat,
    traceId,
    cavemanOutputModeApplied,
    cavemanOutputModeIntensity,
    compressionAnalyticsWritePromise,
    compressionResponseMeta,
    contextEditingEnabled,
    contextLimit,
    nativeCodexPassthrough,
    preCompressionBody,
    reactiveContextCompactionEnabled,
    runPostTranslationCompression,
    tokensCompressed,
  });
  body = compressionOutcome.body;
  cavemanOutputModeApplied = compressionOutcome.cavemanOutputModeApplied;
  cavemanOutputModeIntensity = compressionOutcome.cavemanOutputModeIntensity;
  compressionAnalyticsWritePromise = compressionOutcome.compressionAnalyticsWritePromise;
  compressionResponseMeta = compressionOutcome.compressionResponseMeta;
  contextEditingEnabled = compressionOutcome.contextEditingEnabled;
  contextLimit = compressionOutcome.contextLimit;
  preCompressionBody = compressionOutcome.preCompressionBody;
  reactiveContextCompactionEnabled = compressionOutcome.reactiveContextCompactionEnabled;
  runPostTranslationCompression = compressionOutcome.runPostTranslationCompression;
  tokensCompressed = compressionOutcome.tokensCompressed;

  // Re-check the concrete target after all compression passes. Combo compatibility
  // filtering is advisory and may preserve an all-incompatible pool; this is the
  // hard boundary that prevents a too-large prompt (or a negative token budget)
  // from reaching an OpenAI-compatible upstream such as NVIDIA NIM.
  let finalEstimatedInputTokens = estimateFinalInputTokens(body as Record<string, unknown>);
  // Reuse the already-resolved `contextLimit` (may have been narrowed to the
  // per-target combo window above, resolveComboContextLimit) instead of a bare
  // getTokenLimit(provider, effectiveModel) re-fetch, which would silently
  // discard that combo-aware override and re-widen the last-resort budget.
  const finalContextLimit = contextLimit;
  const toolsReserve = Array.isArray(body?.tools) ? estimateTokens(body.tools) : 0;

  // Last-resort compaction against the concrete input budget (not the 70% threshold).
  // Covers cases where the proactive pass was skipped or still left the request oversized (#8560).
  if (
    reactiveContextCompactionEnabled &&
    !nativeCodexPassthrough &&
    finalEstimatedInputTokens >= finalContextLimit &&
    body
  ) {
    const lastResortTarget = Math.max(1, finalContextLimit - toolsReserve - 1);
    const lastResortAdapter = adaptBodyForCompression(body as Record<string, unknown>);
    const lastResortResult = compressContext(lastResortAdapter.body, {
      provider,
      model: effectiveModel,
      maxTokens: lastResortTarget,
      reserveTokens: 0,
    });
    if (lastResortResult.compressed && lastResortResult.body) {
      body = lastResortAdapter.adapted
        ? lastResortAdapter.restore(lastResortResult.body as Record<string, unknown>, {
            dropMissingMappedItems: true,
          })
        : lastResortResult.body;
      finalEstimatedInputTokens = estimateFinalInputTokens(body as Record<string, unknown>);
      if (log && typeof log.info === "function") {
        log.info(
          "CONTEXT",
          `Last-resort context compaction: ${lastResortResult.stats?.original} -> ${lastResortResult.stats?.final} tokens ` +
            `(re-estimated input ${finalEstimatedInputTokens}, limit ${finalContextLimit})`
        );
      }
    }
  }

  const modelOutputCap = toPositiveInteger(
    getExplicitModelOutputCap({ provider, model: effectiveModel })
  );
  const contextWindowChecksDisabled = areContextWindowChecksDisabled();
  const outputBudget = enforceOutputTokenBudget(
    body as Record<string, unknown>,
    finalEstimatedInputTokens,
    contextWindowChecksDisabled ? Number.MAX_SAFE_INTEGER : finalContextLimit,
    targetFormat === FORMATS.CLAUDE && sourceFormat !== FORMATS.CLAUDE ? DEFAULT_MAX_TOKENS : 0,
    modelOutputCap,
    contextWindowChecksDisabled
      ? null
      : toPositiveInteger(
          resolveInputTokenCapForGate({ provider, model: effectiveModel }, { isCombo })
        )
  );
  if (outputBudget.ok === false) {
    const exceededInputCap = outputBudget.maxInputTokens !== undefined;
    const message =
      `Input exceeds ${exceededInputCap ? "maximum input tokens" : "context window"} for ${provider}/${effectiveModel}: ` +
      `estimated ${outputBudget.estimatedInputTokens} input tokens, ${exceededInputCap ? `max input ${outputBudget.maxInputTokens}` : `limit ${outputBudget.contextLimit}`}. ` +
      `Reduce the prompt or route to a model with a larger ${exceededInputCap ? "input limit" : "context window"}.`;
    if (log && typeof log.warn === "function") {
      log.warn("CONTEXT", message);
    }
    trackPendingRequest(model, provider, connectionId, false);
    return {
      kind: "return",
      response: createErrorResult(
        HTTP_STATUS.BAD_REQUEST,
        message,
        null,
        "context_length_exceeded",
        "invalid_request_error"
      ),
    };
  }
  if (outputBudget.adjustedFields.length > 0) {
    // A field can also be adjusted by *removal* (invalid/non-positive value), which
    // the cap did not cause -- so state the ceiling in effect rather than claiming
    // the cap drove this particular adjustment.
    const modelCapIsBinding =
      modelOutputCap != null && modelOutputCap < outputBudget.availableOutputTokens;
    if (log && typeof log.info === "function") {
      log.info(
        "CONTEXT",
        `Adjusted invalid or oversized output token fields (${outputBudget.adjustedFields.join(", ")}); ` +
          `${outputBudget.availableOutputTokens} tokens remain for output` +
          (modelCapIsBinding
            ? ` (output ceiling in effect: ${modelOutputCap}, ${provider}/${effectiveModel}'s own cap)`
            : "")
      );
    }
  }
  body = outputBudget.body;

  return {
    kind: "continue",
    body: body as Record<string, unknown>,
    memoryOwnerId,
    memorySettings,
    injectionResult,
    compressionAnalyticsWritePromise,
    compressionResponseMeta,
    contextEditingEnabled,
    preCompressionBody,
    runPostTranslationCompression,
    tokensCompressed,
    cavemanOutputModeApplied,
    cavemanOutputModeIntensity,
    contextLimit,
    reactiveContextCompactionEnabled,
  };
}
