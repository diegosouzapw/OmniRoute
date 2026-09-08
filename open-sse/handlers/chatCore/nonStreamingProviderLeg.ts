/**
 * Non-streaming provider leg - one round of provider execution.
 * Extracted from chatCore.ts (lines ~3804-5096) by symbol boundaries.
 *
 * Owns: expectedConnectionId, allowAccountRotation, allowModelFallback.
 * Does NOT write terminal side effects (usage_history, cost, memory extraction).
 * Returns usage in both ok and error results.
 */

import type {
  ProviderLegUsage,
  ProviderLegReceipt,
  ChatCoreErrorResult,
  NonStreamingProviderLegResult,
} from "@/lib/skills/toolLoopTypes.ts";
import type {
  ProviderExecutionOutcome,
  ProviderExecutionPolicy,
} from "./providerExecutionPipeline.ts";
import { translateNonStreamingClientResponse } from "./nonStreamingClientTranslate.ts";
import { parseNonStreamingResponseBody, isJsonRecord } from "./nonStreamingResponseParse.ts";
import { restoreNonStreamingToolNames } from "./passthroughToolNames.ts";
import { extractUsageFromResponse } from "../usageExtractor.ts";
import { sanitizeUsagePayloadForRequest } from "../../utils/usageTracking.ts";
import { createErrorResult, formatProviderError } from "../../utils/error.ts";
import { unwrapClinepassEnvelope } from "../../utils/clinepassEnvelope.ts";
import { unwrapClineNonStreamingEnvelope } from "./clineResponseEnvelope.ts";
import {
  isModelUnavailableError,
  getNextFamilyFallback,
  isContextOverflowError,
  findLargerContextModel,
  getModelFamily,
} from "../../services/modelFamilyFallback.ts";
import { isEmptyContentResponse } from "../../services/errorClassifier.ts";
import { FORMATS } from "../../translator/formats.ts";

/* -- exported types -------------------------------------------------------- */

export interface ChatCoreExecutorResult {
  response: Response;
  url: string;
  headers: Record<string, string>;
  transformedBody: unknown;
  transport?: string;
  _executionCredentials?: Record<string, unknown>;
  _accountSemaphoreRelease?: () => void;
}

export interface ProviderLegRotationPolicy {
  allowAccountRotation?: boolean;
}

export interface ProviderLegInput {
  phase: "initial" | "follow-up";
  sourceBody: Record<string, unknown>;
  expectedConnectionId?: string;
  allowAccountRotation: boolean;
  allowModelFallback: boolean;
  executeProviderRequest: (
    model: string,
    allowDedup: boolean,
    policy?: ProviderLegRotationPolicy
  ) => Promise<ChatCoreExecutorResult>;
  /**
   * Optional 6b seam. When set, the first send goes through the shared
   * pipeline (one wire send + account/model recovery). ClinePass empty
   * retry and empty-content fallback still use executeProviderRequest.
   */
  runProviderExecution?: (input: {
    policy: Readonly<ProviderExecutionPolicy>;
    model: string;
    translatedBody: Record<string, unknown>;
  }) => Promise<ProviderExecutionOutcome>;
  setRequestWireState: (state: {
    translatedBody: Record<string, unknown>;
    effectiveModel: string;
  }) => void;
  sourceFormat?: string;
  targetFormat?: string;
  clientResponseFormat?: string;
  provider?: string;
  model?: string;
  connectionId?: string;
  getCurrentConnectionId?: () => string;
  effectiveModel?: string;
  translatedBody?: Record<string, unknown>;
  toolNameMap?: Map<string, string> | null;
  requestToolIdentityMap?: Map<string, { namespace?: string; name: string }> | null;
  reasoningCacheScope?: string | null;
  clientHeaders?: Headers | Record<string, unknown> | null;
  isClaudeCodeCompatible?: boolean;
  sleep?: (ms: number) => Promise<void>;
  log?: {
    info?: (tag: string, msg: string) => void;
    warn?: (tag: string, msg: string) => void;
    error?: (tag: string, msg: string) => void;
  };
}

/* -- helpers --------------------------------------------------------------- */

function buildReceipt(
  input: ProviderLegInput,
  params: {
    httpStatus: number;
    errorType: string | null;
    usage: ProviderLegUsage | null;
    termination: string;
    latencyMs: number;
    startedAt: string;
    endedAt: string;
    connectionId: string;
    model: string;
  }
): ProviderLegReceipt {
  return {
    index: input.phase === "initial" ? 0 : 1,
    connectionId: params.connectionId,
    provider: input.provider ?? "unknown",
    model: params.model,
    startedAt: params.startedAt,
    endedAt: params.endedAt,
    latencyMs: params.latencyMs,
    httpStatus: params.httpStatus,
    errorType: params.errorType,
    usage: params.usage,
    serviceTier: null,
    computedCostUsd: null,
    toolCalls: [],
    termination: params.termination,
    clientVisible: true,
  };
}

function extractUsage(
  responseBody: Record<string, unknown>,
  provider: string
): ProviderLegUsage | null {
  const raw = extractUsageFromResponse(responseBody, provider);
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const pt = typeof r.prompt_tokens === "number" ? r.prompt_tokens : 0;
  const ct = typeof r.completion_tokens === "number" ? r.completion_tokens : 0;
  return {
    prompt_tokens: pt,
    completion_tokens: ct,
    total_tokens: typeof r.total_tokens === "number" ? r.total_tokens : pt + ct,
    cached_tokens: typeof r.cached_tokens === "number" ? r.cached_tokens : undefined,
    cache_read_input_tokens:
      typeof r.cache_read_input_tokens === "number" ? r.cache_read_input_tokens : undefined,
    cache_creation_input_tokens:
      typeof r.cache_creation_input_tokens === "number" ? r.cache_creation_input_tokens : undefined,
    reasoning_tokens: typeof r.reasoning_tokens === "number" ? r.reasoning_tokens : undefined,
  };
}

function legError(
  status: number,
  message: string,
  originalError?: unknown,
  retryAfterMs?: number | null,
  errorCode?: string,
  errorType?: string,
  opts?: { passthrough?: boolean }
): ChatCoreErrorResult {
  // createErrorResult(..., errorCode, errorType, upstreamDetails, opts)
  // - opts is the 7th arg, not the 6th.
  const result = createErrorResult(
    status,
    message,
    retryAfterMs ?? null,
    errorCode,
    errorType,
    undefined,
    opts
  );
  (result as ChatCoreErrorResult).originalError = originalError;
  return result as ChatCoreErrorResult;
}

function checkConnectionIdentity(
  input: ProviderLegInput,
  startMs: number,
  startedAt: string,
  currentModel: string,
  context: string
): NonStreamingProviderLegResult | null {
  if (!input.expectedConnectionId || !input.getCurrentConnectionId) return null;
  const currentConnId = input.getCurrentConnectionId();
  if (currentConnId !== input.expectedConnectionId) {
    const receipt = buildReceipt(input, {
      httpStatus: 409,
      errorType: "lease_error",
      usage: null,
      termination: "connection_mismatch",
      latencyMs: Date.now() - startMs,
      startedAt,
      endedAt: new Date().toISOString(),
      connectionId: currentConnId,
      model: currentModel,
    });
    const errorResult = legError(
      409,
      `Follow-up connection does not match initial connection (${context})`,
      new Error("connection_mismatch"),
      null,
      "LEASE_CONNECTION_MISMATCH",
      "lease_error"
    );
    return {
      kind: "error",
      result: errorResult as ChatCoreErrorResult,
      receipt,
      usage: null,
    };
  }
  return null;
}

function parseRetryAfterMs(response: Response): number | null {
  const retryAfterHeader = response.headers?.get?.("retry-after");
  if (!retryAfterHeader) return null;
  const retryAfterSec = Number.parseInt(retryAfterHeader, 10);
  if (Number.isFinite(retryAfterSec) && retryAfterSec > 0) {
    return retryAfterSec * 1000;
  }
  const retryAfterDate = new Date(retryAfterHeader).getTime();
  if (Number.isFinite(retryAfterDate) && retryAfterDate > Date.now()) {
    return retryAfterDate - Date.now();
  }
  return null;
}


function finishOk(
  input: ProviderLegInput,
  params: {
    responseBody: Record<string, unknown>;
    responsePayloadFormat: string;
    looksLikeSSE: boolean;
    requestBody: Record<string, unknown>;
    transformedBody: unknown;
    model: string;
    connectionId: string;
    headers: Headers;
    startMs: number;
    startedAt: string;
    sourceFormat: string;
    targetFormat: string;
    clientResponseFormat: string;
    provider: string;
    upstreamResponse?: Response;
    requestHeaders?: Record<string, string>;
    requestUrl?: string;
  }
): NonStreamingProviderLegResult {
  // F-02: restore + sanitize + translate is the only success tail.
  // Fallback/retry must not skip this with responseToolNameMap: null.
  const restoreClaudeNames = params.sourceFormat === "claude" && params.targetFormat === "claude";
  let body = params.responseBody;
  let responseToolNameMap: Map<string, string> | null;
  [body, responseToolNameMap] = restoreNonStreamingToolNames(
    body,
    input.toolNameMap ?? null,
    params.transformedBody,
    restoreClaudeNames
  );
  sanitizeUsagePayloadForRequest(
    body,
    params.transformedBody || params.requestBody,
    params.responsePayloadFormat
  );
  const usage = extractUsage(body, params.provider);
  const clientTranslate = translateNonStreamingClientResponse({
    responseBody: body,
    responsePayloadFormat: params.responsePayloadFormat,
    clientResponseFormat: params.clientResponseFormat,
    sourceFormat: params.sourceFormat,
    provider: params.provider,
    model: params.model,
    requestBody: params.requestBody,
    historyMessages: (input.translatedBody as { messages?: unknown[] } | null | undefined)
      ?.messages,
    responseToolNameMap,
    requestToolIdentityMap: input.requestToolIdentityMap ?? null,
    reasoningCacheScope: input.reasoningCacheScope ?? null,
    clientHeaders: input.clientHeaders ?? null,
    isClaudeCodeCompatible: input.isClaudeCodeCompatible ?? false,
    phase: input.phase === "initial" ? "final" : "intermediate",
  });
  const receipt = buildReceipt(input, {
    httpStatus: 200,
    errorType: null,
    usage,
    termination: "completed",
    latencyMs: Date.now() - params.startMs,
    startedAt: params.startedAt,
    endedAt: new Date().toISOString(),
    connectionId: params.connectionId,
    model: params.model,
  });
  return {
    kind: "ok",
    response: clientTranslate.response,
    responseForMemoryExtraction: clientTranslate.responseForMemoryExtraction,
    providerBody: body,
    providerRequest: input.translatedBody ?? {},
    usage,
    responsePayloadFormat: params.responsePayloadFormat,
    looksLikeSSE: params.looksLikeSSE,
    connectionId: params.connectionId,
    headers: params.headers,
    upstreamResponse: params.upstreamResponse,
    requestHeaders: params.requestHeaders,
    requestUrl: params.requestUrl,
    receipt,
  };
}

const DEFAULT_CLINEPASS_sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/* -- main leg function ----------------------------------------------------- */

export async function runNonStreamingProviderLeg(
  input: ProviderLegInput
): Promise<NonStreamingProviderLegResult> {
  const startedAt = new Date().toISOString();
  const startMs = Date.now();
  const effectiveModel = input.effectiveModel ?? input.model ?? "unknown";
  const currentModel = effectiveModel;
  const provider = input.provider ?? "unknown";
  const sourceFormat = input.sourceFormat ?? "openai";
  const targetFormat = input.targetFormat ?? "openai";
  const clientResponseFormat = input.clientResponseFormat ?? "openai";
  const connectionId = input.connectionId ?? "unknown";
  const log = input.log;

  // -- Phase policy: follow-up blocks rotation and fallback -------------------
  const allowAccountRotation = input.phase === "follow-up" ? false : input.allowAccountRotation;
  const allowModelFallback = input.phase === "follow-up" ? false : input.allowModelFallback;

  // -- Rotation policy for executor ------------------------------------------
  const rotationPolicy: ProviderLegRotationPolicy = {
    allowAccountRotation,
  };

  // F-01: lease identity is checked BEFORE any wire send. A follow-up whose
  // lease already rotated must not spend an upstream round then 409.
  const mismatchAtEntry = checkConnectionIdentity(
    input,
    startMs,
    startedAt,
    currentModel,
    "before_executor"
  );
  if (mismatchAtEntry) return mismatchAtEntry;

  // -- Execute request --------------------------------------------------------
  // Update wire state before every executor call
  input.setRequestWireState({
    translatedBody: (input.translatedBody ?? input.sourceBody) as Record<string, unknown>,
    effectiveModel: currentModel,
  });

  const policy: Readonly<ProviderExecutionPolicy> = {
    allowAccountRotation,
    allowModelFallback,
    expectedConnectionId: input.expectedConnectionId,
  };

  let executorResult: ChatCoreExecutorResult;
  try {
    if (input.runProviderExecution) {
      const outcome = await input.runProviderExecution({
        policy,
        model: currentModel,
        translatedBody: (input.translatedBody ?? input.sourceBody) as Record<string, unknown>,
      });
      if (outcome.kind === "error") {
        if (
          outcome.result.status === 409 &&
          outcome.result.errorCode === "LEASE_CONNECTION_MISMATCH"
        ) {
          const receipt = buildReceipt(input, {
            httpStatus: 409,
            errorType: "lease_error",
            usage: null,
            termination: "connection_mismatch",
            latencyMs: Date.now() - startMs,
            startedAt,
            endedAt: new Date().toISOString(),
            connectionId: outcome.connectionId || connectionId,
            model: outcome.model || currentModel,
          });
          return {
            kind: "error",
            result: outcome.result,
            receipt,
            usage: null,
          };
        }
        const raw = outcome.result.error || "Provider request failed";
        const alreadyPrefixed = /^\[[^\]]+\]:/.test(raw);
        const formatted = alreadyPrefixed
          ? raw
          : formatProviderError(
              new Error(raw),
              provider,
              outcome.model || currentModel,
              outcome.result.status
            );
        const receipt = buildReceipt(input, {
          httpStatus: outcome.result.status,
          errorType: outcome.result.errorType ?? null,
          usage: outcome.providerUsage,
          termination: "provider_error",
          latencyMs: Date.now() - startMs,
          startedAt,
          endedAt: new Date().toISOString(),
          connectionId: outcome.connectionId || connectionId,
          model: outcome.model || currentModel,
        });
        return {
          kind: "error",
          result: {
            ...legError(
              outcome.result.status,
              formatted,
              undefined,
              null,
              outcome.result.errorCode,
              outcome.result.errorType,
              { passthrough: input.sourceFormat === "claude" }
            ),
            response: outcome.result.response,
          },
          receipt,
          usage: outcome.providerUsage,
        };
      }
      executorResult = {
        response: outcome.response,
        url: outcome.url,
        headers: outcome.headers,
        transformedBody: outcome.transformedBody,
      };
    } else {
      executorResult = await input.executeProviderRequest(
        currentModel,
        input.phase === "initial",
        rotationPolicy
      );
    }
  } catch (error) {
    if (
      !!error &&
      typeof error === "object" &&
      ((error as { code?: unknown }).code === "SEMAPHORE_TIMEOUT" ||
        (error as { code?: unknown }).code === "SEMAPHORE_QUEUE_FULL")
    ) {
      throw error;
    }
    const failureStatus =
      error instanceof Error && error.name === "AbortError"
        ? 499
        : error instanceof Error && error.name === "TimeoutError"
          ? 504
          : 502;
    const failureMessage =
      error instanceof Error
        ? formatProviderError(error, provider, currentModel, failureStatus)
        : "Provider request failed";
    const receipt = buildReceipt(input, {
      httpStatus: failureStatus,
      errorType: null,
      usage: null,
      termination: "provider_error",
      latencyMs: Date.now() - startMs,
      startedAt,
      endedAt: new Date().toISOString(),
      connectionId,
      model: currentModel,
    });
    const errorResult = legError(failureStatus, failureMessage, error);
    return {
      kind: "error",
      result: errorResult as ChatCoreErrorResult,
      receipt,
      usage: null,
    };
  }

  const providerResponse = executorResult.response;
  const finalBody = executorResult.transformedBody as Record<string, unknown> | null;

  // -- Connection mismatch check ----------------------------------------------
  if (input.expectedConnectionId && input.getCurrentConnectionId) {
    const currentConnId = input.getCurrentConnectionId();
    if (currentConnId !== input.expectedConnectionId) {
      const receipt = buildReceipt(input, {
        httpStatus: 409,
        errorType: "lease_error",
        usage: null,
        termination: "connection_mismatch",
        latencyMs: Date.now() - startMs,
        startedAt,
        endedAt: new Date().toISOString(),
        connectionId: currentConnId,
        model: currentModel,
      });
      const errorResult = legError(
        409,
        "Follow-up connection does not match initial connection",
        new Error("connection_mismatch"),
        null,
        "LEASE_CONNECTION_MISMATCH",
        "lease_error"
      );
      return {
        kind: "error",
        result: errorResult as ChatCoreErrorResult,
        receipt,
        usage: null,
      };
    }
  }

  // -- Provider HTTP error classification -------------------------------------
  if (!providerResponse.ok) {
    let statusCode = providerResponse.status;
    let message = "";
    let retryAfterMs: number | null = null;
    let upstreamErrorCode: string | undefined;
    let upstreamErrorType: string | undefined;
    let parsedErrorBody: Record<string, unknown> = {};

    try {
      const errorBodyText = await providerResponse.text();
      try {
        parsedErrorBody = JSON.parse(errorBodyText) as Record<string, unknown>;
      } catch {
        // non-JSON error body
      }
      const errObj = (parsedErrorBody.error ?? parsedErrorBody) as
        Record<string, unknown> | undefined;
      message =
        (typeof errObj?.message === "string" ? errObj.message : null) ??
        errorBodyText.slice(0, 200) ??
        "Provider request failed";
      upstreamErrorCode = typeof errObj?.code === "string" ? errObj.code : undefined;
      upstreamErrorType = typeof errObj?.type === "string" ? errObj.type : undefined;
    } catch {
      message = "Provider request failed";
    }

    // Parse Retry-After from upstream response headers
    retryAfterMs = parseRetryAfterMs(providerResponse);

    // -- Model-unavailable -> family fallback (initial only) --------------------
    if (allowModelFallback && isModelUnavailableError(statusCode, message, provider)) {
      const triedModels = new Set<string>([currentModel]);
      const nextModel = getNextFamilyFallback(currentModel, triedModels, provider);
      if (nextModel) {
        triedModels.add(nextModel);
        input.setRequestWireState({
          translatedBody: { ...input.translatedBody, model: nextModel } as Record<string, unknown>,
          effectiveModel: nextModel,
        });
        log?.info?.("MODEL_FALLBACK", `${currentModel} unavailable -> trying ${nextModel}`);
        try {
          // Connection check before fallback executor
          const mismatchBefore = checkConnectionIdentity(
            input,
            startMs,
            startedAt,
            nextModel,
            "before_fallback"
          );
          if (mismatchBefore) return mismatchBefore;

          const fallbackResult = await input.executeProviderRequest(nextModel, false);

          // Connection check after fallback executor
          const mismatchAfter = checkConnectionIdentity(
            input,
            startMs,
            startedAt,
            nextModel,
            "after_fallback"
          );
          if (mismatchAfter) return mismatchAfter;

          if (fallbackResult.response.ok) {
            const fallbackParsed = await parseNonStreamingResponseBody({
              providerResponse: fallbackResult.response,
              upstreamStream: false,
              providerHeaders: new Headers(fallbackResult.headers),
              finalBody: fallbackResult.transformedBody as Record<string, unknown> | null,
              targetFormat,
              model: nextModel,
              log,
            });
            if (fallbackParsed.kind !== "invalid_sse" && fallbackParsed.kind !== "invalid_json") {
              return finishOk(input, {
                responseBody: fallbackParsed.responseBody,
                responsePayloadFormat: fallbackParsed.responsePayloadFormat,
                looksLikeSSE: fallbackParsed.looksLikeSSE,
                requestBody: (fallbackResult.transformedBody ||
                  input.translatedBody ||
                  input.sourceBody) as Record<string, unknown>,
                transformedBody: fallbackResult.transformedBody,
                model: nextModel,
                connectionId: input.getCurrentConnectionId?.() ?? connectionId,
                headers: new Headers(fallbackResult.headers),
                startMs,
                startedAt,
                sourceFormat,
                targetFormat,
                clientResponseFormat,
                provider,
                upstreamResponse: fallbackResult.response,
                requestHeaders: fallbackResult.headers,
                requestUrl: fallbackResult.url,
              });
            }
          }
        } catch {
          // fallback also failed - fall through to standard error
        }
      }
    }

    // -- Context overflow -> family fallback (initial only) ---------------------
    if (allowModelFallback && isContextOverflowError(statusCode, message)) {
      const triedModels = new Set<string>([currentModel]);
      const familyCandidates = getModelFamily(currentModel, provider).filter(
        (m) => m !== currentModel && !triedModels.has(m)
      );
      const nextModel =
        findLargerContextModel(currentModel, familyCandidates, provider) ??
        getNextFamilyFallback(currentModel, triedModels, provider);
      if (nextModel) {
        triedModels.add(nextModel);
        input.setRequestWireState({
          translatedBody: { ...input.translatedBody, model: nextModel } as Record<string, unknown>,
          effectiveModel: nextModel,
        });
        log?.info?.("CONTEXT_OVERFLOW_FALLBACK", `${currentModel} overflow -> trying ${nextModel}`);
        try {
          // Connection check before fallback executor
          const mismatchBefore = checkConnectionIdentity(
            input,
            startMs,
            startedAt,
            nextModel,
            "before_fallback"
          );
          if (mismatchBefore) return mismatchBefore;

          const fallbackResult = await input.executeProviderRequest(nextModel, false);

          // Connection check after fallback executor
          const mismatchAfter = checkConnectionIdentity(
            input,
            startMs,
            startedAt,
            nextModel,
            "after_fallback"
          );
          if (mismatchAfter) return mismatchAfter;

          if (fallbackResult.response.ok) {
            const fallbackParsed = await parseNonStreamingResponseBody({
              providerResponse: fallbackResult.response,
              upstreamStream: false,
              providerHeaders: new Headers(fallbackResult.headers),
              finalBody: fallbackResult.transformedBody as Record<string, unknown> | null,
              targetFormat,
              model: nextModel,
              log,
            });
            if (fallbackParsed.kind !== "invalid_sse" && fallbackParsed.kind !== "invalid_json") {
              return finishOk(input, {
                responseBody: fallbackParsed.responseBody,
                responsePayloadFormat: fallbackParsed.responsePayloadFormat,
                looksLikeSSE: fallbackParsed.looksLikeSSE,
                requestBody: (fallbackResult.transformedBody ||
                  input.translatedBody ||
                  input.sourceBody) as Record<string, unknown>,
                transformedBody: fallbackResult.transformedBody,
                model: nextModel,
                connectionId: input.getCurrentConnectionId?.() ?? connectionId,
                headers: new Headers(fallbackResult.headers),
                startMs,
                startedAt,
                sourceFormat,
                targetFormat,
                clientResponseFormat,
                provider,
                upstreamResponse: fallbackResult.response,
                requestHeaders: fallbackResult.headers,
                requestUrl: fallbackResult.url,
              });
            }
          }
        } catch {
          // fallback also failed - fall through to standard error
        }
      }
    }

    // -- Standard error return -------------------------------------------------
    const errMsg = formatProviderError(new Error(message), provider, currentModel, statusCode);
    // Extract usage from error body if present (some providers include usage in error responses)
    let usage: ProviderLegUsage | null = null;
    try {
      const rawUsage = extractUsageFromResponse(parsedErrorBody, provider);
      if (rawUsage && typeof rawUsage === "object") {
        const r = rawUsage as Record<string, unknown>;
        const pt = typeof r.prompt_tokens === "number" ? r.prompt_tokens : 0;
        const ct = typeof r.completion_tokens === "number" ? r.completion_tokens : 0;
        usage = {
          prompt_tokens: pt,
          completion_tokens: ct,
          total_tokens: typeof r.total_tokens === "number" ? r.total_tokens : pt + ct,
        };
      }
    } catch {
      // usage extraction from error body is best-effort
    }
    const receipt = buildReceipt(input, {
      httpStatus: statusCode,
      errorType: upstreamErrorCode ?? null,
      usage,
      termination: "provider_error",
      latencyMs: Date.now() - startMs,
      startedAt,
      endedAt: new Date().toISOString(),
      connectionId,
      model: currentModel,
    });
    const errorResult = legError(
      statusCode,
      errMsg,
      new Error(message),
      retryAfterMs,
      upstreamErrorCode,
      upstreamErrorType,
      { passthrough: sourceFormat === FORMATS.CLAUDE }
    );
    return {
      kind: "error",
      result: errorResult as ChatCoreErrorResult,
      receipt,
      usage,
    };
  }

  // -- Non-streaming response parsing (body read exactly once) ----------------
  const parsed = await parseNonStreamingResponseBody({
    providerResponse,
    upstreamStream: false,
    providerHeaders: new Headers(executorResult.headers),
    finalBody,
    targetFormat,
    model: currentModel,
    log,
  });

  if (parsed.kind === "invalid_sse") {
    const receipt = buildReceipt(input, {
      httpStatus: 502,
      errorType: "invalid_sse_payload",
      usage: null,
      termination: "provider_error",
      latencyMs: Date.now() - startMs,
      startedAt,
      endedAt: new Date().toISOString(),
      connectionId,
      model: currentModel,
    });
    const errorResult = legError(
      502,
      parsed.message,
      new Error(parsed.message),
      null,
      "invalid_sse_payload",
      "invalid_sse_payload"
    );
    return {
      kind: "error",
      result: errorResult as ChatCoreErrorResult,
      receipt,
      usage: null,
    };
  }

  if (parsed.kind === "invalid_json") {
    const receipt = buildReceipt(input, {
      httpStatus: 502,
      errorType: "invalid_json_payload",
      usage: null,
      termination: "provider_error",
      latencyMs: Date.now() - startMs,
      startedAt,
      endedAt: new Date().toISOString(),
      connectionId,
      model: currentModel,
    });
    const errorResult = legError(
      502,
      parsed.message,
      new Error(parsed.message),
      null,
      "invalid_json_payload",
      "invalid_json_payload"
    );
    return {
      kind: "error",
      result: errorResult as ChatCoreErrorResult,
      receipt,
      usage: null,
    };
  }

  let responseBody = parsed.responseBody;
  const responsePayloadFormat = parsed.responsePayloadFormat;
  const looksLikeSSE = parsed.looksLikeSSE;

  // -- ClinePass envelope unwrap + retry --------------------------------------
  if (provider === "clinepass") {
    let { body: unwrapped, error: envError } = unwrapClinepassEnvelope(responseBody, provider);
    if (envError && /empty/i.test(envError.message || "")) {
      log?.warn?.("RETRY", "clinepass returned empty content, retrying once after 2s");
      const sleepFn = input.sleep ?? DEFAULT_CLINEPASS_sleep;
      await sleepFn(2000);
      try {
        // Connection check before retry executor
        const mismatchBefore = checkConnectionIdentity(
          input,
          startMs,
          startedAt,
          currentModel,
          "before_clinepass_retry"
        );
        if (mismatchBefore) return mismatchBefore;

        const retryResult = await input.executeProviderRequest(currentModel, false);

        // Connection check after retry executor
        const mismatchAfter = checkConnectionIdentity(
          input,
          startMs,
          startedAt,
          currentModel,
          "after_clinepass_retry"
        );
        if (mismatchAfter) return mismatchAfter;

        if (retryResult?.response?.ok) {
          const retryParsed = await parseNonStreamingResponseBody({
            providerResponse: retryResult.response,
            upstreamStream: undefined,
            providerHeaders: new Headers(retryResult.headers),
            finalBody: retryResult.transformedBody as Record<string, unknown> | null,
            targetFormat,
            model: currentModel,
            log,
          });
          if (retryParsed.kind !== "invalid_sse" && retryParsed.kind !== "invalid_json") {
            ({ body: unwrapped, error: envError } = unwrapClinepassEnvelope(
              retryParsed.responseBody,
              provider
            ));
            if (!envError && isJsonRecord(unwrapped)) {
              responseBody = unwrapped as Record<string, unknown>;
            }
            // If retry succeeded and no envelope error, continue with retry parsed body
            if (!envError) {
              return finishOk(input, {
                responseBody,
                responsePayloadFormat: retryParsed.responsePayloadFormat,
                looksLikeSSE: retryParsed.looksLikeSSE,
                requestBody: (retryResult.transformedBody ||
                  input.translatedBody ||
                  input.sourceBody) as Record<string, unknown>,
                transformedBody: retryResult.transformedBody,
                model: currentModel,
                connectionId: input.getCurrentConnectionId?.() ?? connectionId,
                headers: new Headers(retryResult.headers),
                startMs,
                startedAt,
                sourceFormat,
                targetFormat,
                clientResponseFormat,
                provider,
                upstreamResponse: retryResult.response,
                requestHeaders: retryResult.headers,
                requestUrl: retryResult.url,
              });
            }
          }
        }
      } catch {
        // retry failed, fall through
      }
    }
    if (envError) {
      const receipt = buildReceipt(input, {
        httpStatus: 502,
        errorType: "clinepass_envelope_error",
        usage: null,
        termination: "provider_error",
        latencyMs: Date.now() - startMs,
        startedAt,
        endedAt: new Date().toISOString(),
        connectionId,
        model: currentModel,
      });
      const errorResult = legError(
        502,
        envError.message,
        envError,
        null,
        "clinepass_envelope_error",
        "clinepass_envelope_error"
      );
      return {
        kind: "error",
        result: errorResult as ChatCoreErrorResult,
        receipt,
        usage: null,
      };
    }
    if (isJsonRecord(unwrapped)) {
      responseBody = unwrapped as Record<string, unknown>;
    }
  }
  responseBody = unwrapClineNonStreamingEnvelope(provider, responseBody) as typeof responseBody;

  // -- Empty content -> family fallback (initial only) -------------------------
  if (isEmptyContentResponse(responseBody)) {
    const errMsg = "Provider returned empty content";
    if (allowModelFallback) {
      const triedModels = new Set<string>([currentModel]);
      const nextModel = getNextFamilyFallback(currentModel, triedModels, provider);
      if (nextModel) {
        triedModels.add(nextModel);
        input.setRequestWireState({
          translatedBody: { ...input.translatedBody, model: nextModel } as Record<string, unknown>,
          effectiveModel: nextModel,
        });
        log?.info?.("EMPTY_CONTENT_FALLBACK", `${currentModel} empty -> trying ${nextModel}`);
        try {
          // Connection check before fallback executor
          const mismatchBefore = checkConnectionIdentity(
            input,
            startMs,
            startedAt,
            nextModel,
            "before_fallback"
          );
          if (mismatchBefore) return mismatchBefore;

          const fallbackResult = await input.executeProviderRequest(nextModel, false);

          // Connection check after fallback executor
          const mismatchAfter = checkConnectionIdentity(
            input,
            startMs,
            startedAt,
            nextModel,
            "after_fallback"
          );
          if (mismatchAfter) return mismatchAfter;

          if (fallbackResult.response.ok) {
            const fallbackParsed = await parseNonStreamingResponseBody({
              providerResponse: fallbackResult.response,
              upstreamStream: false,
              providerHeaders: new Headers(fallbackResult.headers),
              finalBody: fallbackResult.transformedBody as Record<string, unknown> | null,
              targetFormat,
              model: nextModel,
              log,
            });
            if (fallbackParsed.kind !== "invalid_sse" && fallbackParsed.kind !== "invalid_json") {
              responseBody = fallbackParsed.responseBody;
              return finishOk(input, {
                responseBody,
                responsePayloadFormat: fallbackParsed.responsePayloadFormat,
                looksLikeSSE: fallbackParsed.looksLikeSSE,
                requestBody: (fallbackResult.transformedBody ||
                  input.translatedBody ||
                  input.sourceBody) as Record<string, unknown>,
                transformedBody: fallbackResult.transformedBody,
                model: nextModel,
                connectionId: input.getCurrentConnectionId?.() ?? connectionId,
                headers: new Headers(fallbackResult.headers),
                startMs,
                startedAt,
                sourceFormat,
                targetFormat,
                clientResponseFormat,
                provider,
                upstreamResponse: fallbackResult.response,
                requestHeaders: fallbackResult.headers,
                requestUrl: fallbackResult.url,
              });
            }
            const parseCode =
              fallbackParsed.kind === "invalid_sse"
                ? "invalid_sse_payload"
                : "invalid_json_payload";
            const parseMessage = fallbackParsed.message;
            const receipt = buildReceipt(input, {
              httpStatus: 502,
              errorType: parseCode,
              usage: null,
              termination: "provider_error",
              latencyMs: Date.now() - startMs,
              startedAt,
              endedAt: new Date().toISOString(),
              connectionId: input.getCurrentConnectionId?.() ?? connectionId,
              model: nextModel,
            });
            const errorResult = legError(
              502,
              parseMessage,
              new Error(parseMessage),
              null,
              parseCode,
              parseCode
            );
            return {
              kind: "error",
              result: errorResult as ChatCoreErrorResult,
              receipt,
              usage: null,
            };
          } else {
            const receipt = buildReceipt(input, {
              httpStatus: 502,
              errorType: "empty_content",
              usage: null,
              termination: "provider_error",
              latencyMs: Date.now() - startMs,
              startedAt,
              endedAt: new Date().toISOString(),
              connectionId: input.getCurrentConnectionId?.() ?? connectionId,
              model: nextModel,
            });
            const errorResult = legError(502, errMsg, new Error(errMsg));
            return {
              kind: "error",
              result: errorResult as ChatCoreErrorResult,
              receipt,
              usage: null,
            };
          }
        } catch {
          const receipt = buildReceipt(input, {
            httpStatus: 502,
            errorType: "empty_content",
            usage: null,
            termination: "provider_error",
            latencyMs: Date.now() - startMs,
            startedAt,
            endedAt: new Date().toISOString(),
            connectionId,
            model: currentModel,
          });
          const errorResult = legError(502, errMsg, new Error(errMsg));
          return {
            kind: "error",
            result: errorResult as ChatCoreErrorResult,
            receipt,
            usage: null,
          };
        }
      } else {
        const receipt = buildReceipt(input, {
          httpStatus: 502,
          errorType: "empty_content",
          usage: null,
          termination: "provider_error",
          latencyMs: Date.now() - startMs,
          startedAt,
          endedAt: new Date().toISOString(),
          connectionId,
          model: currentModel,
        });
        const errorResult = legError(502, errMsg, new Error(errMsg));
        return {
          kind: "error",
          result: errorResult as ChatCoreErrorResult,
          receipt,
          usage: null,
        };
      }
    } else {
      const receipt = buildReceipt(input, {
        httpStatus: 502,
        errorType: "empty_content",
        usage: null,
        termination: "provider_error",
        latencyMs: Date.now() - startMs,
        startedAt,
        endedAt: new Date().toISOString(),
        connectionId,
        model: currentModel,
      });
      const errorResult = legError(502, errMsg, new Error(errMsg));
      return {
        kind: "error",
        result: errorResult as ChatCoreErrorResult,
        receipt,
        usage: null,
      };
    }
  }

  return finishOk(input, {
    responseBody,
    responsePayloadFormat,
    looksLikeSSE,
    requestBody: (finalBody || input.translatedBody || input.sourceBody) as Record<string, unknown>,
    transformedBody: finalBody,
    model: currentModel,
    connectionId,
    headers: new Headers(executorResult.headers),
    startMs,
    startedAt,
    sourceFormat,
    targetFormat,
    clientResponseFormat,
    provider,
    upstreamResponse: executorResult.response,
    requestHeaders: executorResult.headers,
    requestUrl: executorResult.url,
  });
}
