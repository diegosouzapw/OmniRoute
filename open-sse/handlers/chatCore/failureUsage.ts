/**
 * chatCore failed-request usage record builder (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Pure core of handleChatCore's persistFailureUsage closure: builds the usage-history entry for a
 * failed request (zeroed tokens/timing, success:false, the unknown/undefined fallbacks, and the
 * combo-strategy gate). The handler keeps the impure parts byte-identically: it computes
 * `latencyMs` (Date.now() - startTime) and fires the fire-and-forget saveRequestUsage(...).catch().
 */

import { buildErrorBody } from "../../utils/error.ts";

export function projectFailureUsageErrorCode(opts: {
  statusCode: number;
  message: string;
  errorCode?: string | null;
  errorType?: string | null;
}): string {
  const errorBody = buildErrorBody(opts.statusCode, opts.message, undefined, {
    code: opts.errorCode || undefined,
    type: opts.errorType || undefined,
  });
  return errorBody.error.code || String(opts.statusCode);
}

export interface FailureUsageAggregate {
  prompt_tokens?: number;
  completion_tokens?: number;
  cache_read_input_tokens?: number;
  cache_creation_input_tokens?: number;
  reasoning_tokens?: number;
}

export function toFailureUsageAggregate(
  usage:
    | {
        prompt_tokens?: number;
        completion_tokens?: number;
        cache_read_input_tokens?: number;
        cache_creation_input_tokens?: number;
        reasoning_tokens?: number;
      }
    | null
    | undefined
): FailureUsageAggregate | undefined {
  if (!usage) return undefined;
  return {
    prompt_tokens: usage.prompt_tokens,
    completion_tokens: usage.completion_tokens,
    cache_read_input_tokens: usage.cache_read_input_tokens,
    cache_creation_input_tokens: usage.cache_creation_input_tokens,
    reasoning_tokens: usage.reasoning_tokens,
  };
}

export function buildFailureUsageRecord(opts: {
  provider: string | null | undefined;
  model: string | null | undefined;
  connectionId: string | null | undefined;
  apiKeyInfo: { id?: string; name?: string } | null | undefined;
  effectiveServiceTier: string;
  isCombo: boolean;
  comboStrategy: string | null | undefined;
  statusCode: number;
  errorCode: string | null | undefined;
  latencyMs: number;
  endpoint?: string | null | undefined;
  aggregate?: FailureUsageAggregate | null;
}) {
  return {
    provider: opts.provider || "unknown",
    model: opts.model || "unknown",
    tokens: {
      input: opts.aggregate?.prompt_tokens ?? 0,
      output: opts.aggregate?.completion_tokens ?? 0,
      cacheRead: opts.aggregate?.cache_read_input_tokens ?? 0,
      cacheCreation: opts.aggregate?.cache_creation_input_tokens ?? 0,
      reasoning: opts.aggregate?.reasoning_tokens ?? 0,
    },
    status: String(opts.statusCode),
    success: false,
    latencyMs: opts.latencyMs,
    timeToFirstTokenMs: 0,
    errorCode: opts.errorCode || String(opts.statusCode),
    timestamp: new Date().toISOString(),
    connectionId: opts.connectionId || undefined,
    apiKeyId: opts.apiKeyInfo?.id || undefined,
    apiKeyName: opts.apiKeyInfo?.name || undefined,
    serviceTier: opts.effectiveServiceTier,
    comboStrategy: opts.isCombo ? opts.comboStrategy || undefined : undefined,
    endpoint: opts.endpoint || undefined,
  };
}
