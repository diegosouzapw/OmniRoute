import { getCorsOrigin } from "../utils/cors.ts";
import { detectFormatFromEndpoint, getTargetFormat } from "../services/provider.ts";
import { translateRequest, needsTranslation } from "../translator/index.ts";
import { FORMATS } from "../translator/formats.ts";
import {
  createSSETransformStreamWithLogger,
  createPassthroughStreamWithLogger,
  COLORS,
} from "../utils/stream.ts";
import { createStreamController, pipeWithDisconnect } from "../utils/streamHandler.ts";
import { addBufferToUsage, filterUsageForFormat, estimateUsage } from "../utils/usageTracking.ts";
import { refreshWithRetry } from "../services/tokenRefresh.ts";
import { createRequestLogger } from "../utils/requestLogger.ts";
import { getModelTargetFormat, PROVIDER_ID_TO_ALIAS } from "../config/providerModels.ts";
import {
  getStripTypesForProviderModel,
  stripIncompatibleMessageContent,
} from "../services/modelStrip.ts";
import { resolveModelAlias } from "../services/modelDeprecation.ts";
import { getUnsupportedParams } from "../config/providerRegistry.ts";
import {
  buildErrorBody,
  createErrorResult,
  parseUpstreamError,
  formatProviderError,
} from "../utils/error.ts";
import { HTTP_STATUS, PROVIDER_MAX_TOKENS } from "../config/constants.ts";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
  isEmptyContentResponse,
} from "../services/errorClassifier.ts";
import { updateProviderConnection } from "@/lib/db/providers";
import { isDetailedLoggingEnabled } from "@/lib/db/detailedLogs";
import { logAuditEvent } from "@/lib/compliance";
import { extractProviderWarnings } from "@/lib/compliance/providerAudit";
import { handleBypassRequest } from "../utils/bypassHandler.ts";
import {
  saveRequestUsage,
  trackPendingRequest,
  updatePendingRequest,
  appendRequestLog,
  saveCallLog,
} from "@/lib/usageDb";
import {
  getLoggedInputTokens,
  getLoggedOutputTokens,
  formatUsageLog,
} from "@/lib/usage/tokenAccounting";
import { recordCost } from "@/domain/costRules";
import { calculateCost } from "@/lib/usage/costCalculator";
import { buildOmniRouteResponseMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { CLAUDE_OAUTH_TOOL_PREFIX } from "../translator/request/openai-to-claude.ts";
import {
  getModelNormalizeToolCallId,
  getModelPreserveOpenAIDeveloperRole,
  getModelUpstreamExtraHeaders,
  getUpstreamProxyConfig,
} from "@/lib/localDb";
import { getExecutor } from "../executors/index.ts";
import { getCacheControlSettings } from "@/lib/cacheControlSettings";
import { guardrailRegistry, resolveDisabledGuardrails } from "@/lib/guardrails";
import {
  applyConfiguredPayloadRules,
  resolvePayloadRuleProtocols,
} from "../services/payloadRules.ts";
import {
  shouldPreserveCacheControl,
  providerSupportsCaching,
} from "../utils/cacheControlPolicy.ts";
import { getCacheMetrics } from "@/lib/db/settings.ts";
import { getCachedSettings } from "@/lib/db/readCache";

import {
  parseCodexQuotaHeaders,
  getCodexModelScope,
  getCodexDualWindowCooldownMs,
} from "../executors/codex.ts";
import { invalidateCodexQuotaCache } from "../services/codexQuotaFetcher.ts";
import { translateNonStreamingResponse } from "./responseTranslator.ts";
import { extractUsageFromResponse } from "./usageExtractor.ts";
import {
  parseSSEToClaudeResponse,
  parseSSEToOpenAIResponse,
  parseSSEToResponsesOutput,
} from "./sseParser.ts";
import { sanitizeOpenAIResponse, sanitizeResponsesApiResponse } from "./responseSanitizer.ts";
import {
  withRateLimit,
  updateFromHeaders,
  updateFromResponseBody,
  initializeRateLimits,
} from "../services/rateLimitManager.ts";
import {
  acquire as acquireAccountSemaphore,
  buildAccountSemaphoreKey,
  markBlocked as markAccountSemaphoreBlocked,
} from "../services/accountSemaphore.ts";
import {
  generateSignature,
  getCachedResponse,
  setCachedResponse,
  isCacheableForRead,
  isCacheableForWrite,
} from "@/lib/semanticCache";
import { getIdempotencyKey, checkIdempotency, saveIdempotency } from "@/lib/idempotencyLayer";
import { createProgressTransform, wantsProgress } from "../utils/progressTracker.ts";
import {
  isModelUnavailableError,
  getNextFamilyFallback,
  isContextOverflowError,
  findLargerContextModel,
  getModelFamily,
} from "../services/modelFamilyFallback.ts";
import { computeRequestHash, deduplicate, shouldDeduplicate } from "../services/requestDedup.ts";
import { compressContext, estimateTokens, getTokenLimit } from "../services/contextManager.ts";
import {
  getBackgroundTaskReason,
  getDegradedModel,
  getBackgroundDegradationConfig,
} from "../services/backgroundTaskDetector.ts";
import {
  shouldUseFallback,
  isFallbackDecision,
  EMERGENCY_FALLBACK_CONFIG,
} from "../services/emergencyFallback.ts";
import { prepareWebSearchFallbackBody } from "../services/webSearchFallback.ts";
import {
  resolveExplicitStreamAlias,
  resolveStreamFlag,
  stripMarkdownCodeFence,
} from "../utils/aiSdkCompat.ts";
import { generateRequestId } from "@/shared/utils/requestId";
import { normalizePayloadForLog } from "@/lib/logPayloads";
import { extractFacts } from "@/lib/memory/extraction";
import { injectMemory, shouldInjectMemory } from "@/lib/memory/injection";
import { retrieveMemories } from "@/lib/memory/retrieval";
import {
  DEFAULT_MEMORY_SETTINGS,
  getMemorySettings,
  toMemoryRetrievalConfig,
} from "@/lib/memory/settings";
import { injectSkills } from "@/lib/skills/injection";
import { handleToolCallExecution } from "@/lib/skills/interception";
import { OMNIROUTE_RESPONSE_HEADERS } from "@/shared/constants/headers";
import {
  buildClaudeCodeCompatibleRequest,
  isClaudeCodeCompatibleProvider,
  resolveClaudeCodeCompatibleSessionId,
} from "../services/claudeCodeCompatible.ts";
import { setGeminiThoughtSignatureMode } from "../services/geminiThoughtSignatureStore.ts";
import { fetchLiveProviderLimits } from "@/lib/usage/providerLimits";
import { isClaudeExtraUsageBlockEnabled } from "@/lib/providers/claudeExtraUsage";

function extractMemoryTextFromResponse(
  response: Record<string, unknown> | null | undefined
): string {
  if (!response || typeof response !== "object") return "";

  const openAIText = response?.choices?.[0]?.message?.content;
  if (typeof openAIText === "string") {
    return openAIText.trim();
  }

  if (Array.isArray(response?.content)) {
    const contentText = response.content
      .filter(
        (part: Record<string, unknown>) => part?.type === "text" && typeof part?.text === "string"
      )
      .map((part: Record<string, unknown>) => String(part.text).trim())
      .filter(Boolean)
      .join("\n");
    if (contentText) return contentText;
  }

  if (typeof response?.output_text === "string") {
    return response.output_text.trim();
  }

  return "";
}

function extractMemoryTextFromRequestBody(
  body: Record<string, unknown> | null | undefined
): string {
  if (!body || typeof body !== "object") return "";

  const messages = Array.isArray(body.messages) ? body.messages : null;
  if (messages && messages.length > 0) {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      const msg = messages[i] as Record<string, unknown>;
      if (msg?.role !== "user") continue;

      if (typeof msg.content === "string" && msg.content.trim().length > 0) {
        return msg.content.trim();
      }

      if (Array.isArray(msg.content)) {
        const text = msg.content
          .map((part: Record<string, unknown>) => {
            if (typeof part?.text === "string") return part.text.trim();
            if (part?.type === "input_text" && typeof part?.text === "string")
              return part.text.trim();
            return "";
          })
          .filter(Boolean)
          .join("\n")
          .trim();
        if (text) return text;
      }
    }
  }

  const input = Array.isArray(body.input) ? body.input : null;
  if (input && input.length > 0) {
    const chunks = input
      .map((item: Record<string, unknown>) => {
        const role = typeof item?.role === "string" ? item.role.trim().toLowerCase() : "";
        const itemType = typeof item?.type === "string" ? item.type.trim().toLowerCase() : "";
        if (role && role !== "user") return "";
        if (itemType && itemType !== "message") return "";

        if (typeof item?.content === "string") return item.content.trim();
        if (Array.isArray(item?.content)) {
          return item.content
            .map((part: Record<string, unknown>) => {
              if (typeof part?.text === "string") return part.text.trim();
              if (part?.type === "input_text" && typeof part?.text === "string")
                return part.text.trim();
              return "";
            })
            .filter(Boolean)
            .join("\n")
            .trim();
        }
        return "";
      })
      .filter(Boolean)
      .join("\n")
      .trim();
    if (chunks) return chunks;
  }

  return "";
}

async function maybeSyncClaudeExtraUsageState({
  provider,
  connectionId,
  providerSpecificData,
  log,
}: {
  provider: string | null | undefined;
  connectionId: string | null | undefined;
  providerSpecificData: unknown;
  log?: { debug?: (...args: unknown[]) => void; warn?: (...args: unknown[]) => void } | null;
}) {
  if (!connectionId || !isClaudeExtraUsageBlockEnabled(provider, providerSpecificData)) {
    return;
  }

  try {
    await fetchLiveProviderLimits(connectionId);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log?.debug?.("CLAUDE_USAGE", `Failed to sync Claude extra-usage state: ${message}`);
  }
}

function resolveMemoryOwnerId(apiKeyInfo: Record<string, unknown> | null): string | null {
  const rawId = apiKeyInfo?.id;
  if (typeof rawId === "string" && rawId.trim().length > 0) {
    return rawId;
  }
  return null;
}

export function shouldUseNativeCodexPassthrough({
  provider,
  sourceFormat,
  endpointPath,
}: {
  provider?: string | null;
  sourceFormat?: string | null;
  endpointPath?: string | null;
}): boolean {
  if (provider !== "codex") return false;
  if (sourceFormat !== FORMATS.OPENAI_RESPONSES) return false;
  let normalizedEndpoint = String(endpointPath || "");
  while (normalizedEndpoint.endsWith("/")) normalizedEndpoint = normalizedEndpoint.slice(0, -1);
  const segments = normalizedEndpoint.split("/");
  return segments.includes("responses");
}

function buildClaudePassthroughToolNameMap(body: Record<string, unknown> | null | undefined) {
  if (!body || !Array.isArray(body.tools)) return null;

  const toolNameMap = new Map<string, string>();
  for (const tool of body.tools) {
    const toolRecord = tool as Record<string, unknown>;
    const toolData =
      toolRecord?.type === "function" &&
      toolRecord.function &&
      typeof toolRecord.function === "object"
        ? (toolRecord.function as Record<string, unknown>)
        : toolRecord;
    const originalName = typeof toolData?.name === "string" ? toolData.name.trim() : "";
    if (!originalName) continue;
    toolNameMap.set(`${CLAUDE_OAUTH_TOOL_PREFIX}${originalName}`, originalName);
  }

  return toolNameMap.size > 0 ? toolNameMap : null;
}

function restoreClaudePassthroughToolNames(
  responseBody: Record<string, unknown>,
  toolNameMap: Map<string, string> | null
) {
  if (!toolNameMap || !Array.isArray(responseBody?.content)) return responseBody;

  let changed = false;
  const content = responseBody.content.map((block: Record<string, unknown>) => {
    if (block?.type !== "tool_use" || typeof block?.name !== "string") return block;
    const restoredName = toolNameMap.get(block.name) ?? block.name;
    if (restoredName === block.name) return block;
    changed = true;
    return {
      ...block,
      name: restoredName,
    };
  });

  if (!changed) return responseBody;
  return {
    ...responseBody,
    content,
  };
}

function mergeResponseToolNameMap(
  baseToolNameMap: Map<string, string> | null,
  transformedBody: Record<string, unknown> | null | undefined
) {
  const executorToolNameMap =
    transformedBody && transformedBody._toolNameMap instanceof Map
      ? (transformedBody._toolNameMap as Map<string, string>)
      : null;

  if (!executorToolNameMap?.size) return baseToolNameMap;
  if (!baseToolNameMap?.size) return executorToolNameMap;

  const merged = new Map(baseToolNameMap);
  for (const [toolName, originalName] of executorToolNameMap.entries()) {
    merged.set(toolName, originalName);
  }
  return merged;
}

function materializeDeduplicatedExecutionResult<T extends Record<string, unknown>>(result: T): T {
  const snapshot =
    result && typeof result === "object"
      ? ((result as Record<string, unknown>)._dedupSnapshot as
          | {
              status: number;
              statusText: string;
              headers: [string, string][];
              payload: string;
            }
          | undefined)
      : undefined;

  if (!snapshot) return result;

  return {
    ...result,
    response: new Response(snapshot.payload, {
      status: snapshot.status,
      statusText: snapshot.statusText,
      headers: snapshot.headers,
    }),
  } as T;
}

function getSkillsProviderForFormat(format: string): "openai" | "anthropic" | "google" | "other" {
  switch (format) {
    case FORMATS.CLAUDE:
      return "anthropic";
    case FORMATS.GEMINI:
      return "google";
    default:
      return "openai";
  }
}

function getSkillsModelIdForFormat(format: string): string {
  switch (format) {
    case FORMATS.CLAUDE:
      return "claude";
    case FORMATS.GEMINI:
      return "gemini";
    default:
      return "openai";
  }
}

function parseNonStreamingSSEPayload(
  rawBody: string,
  preferredFormat: string,
  fallbackModel: string
): { body: Record<string, unknown>; format: string } | null {
  const formatsToTry: string[] = [];
  const seen = new Set<string>();
  const queueFormat = (format: string) => {
    if (!format || seen.has(format)) return;
    seen.add(format);
    formatsToTry.push(format);
  };

  queueFormat(preferredFormat);
  queueFormat(FORMATS.OPENAI_RESPONSES);
  queueFormat(FORMATS.CLAUDE);
  queueFormat(FORMATS.OPENAI);

  for (const format of formatsToTry) {
    const parsed =
      format === FORMATS.OPENAI_RESPONSES
        ? parseSSEToResponsesOutput(rawBody, fallbackModel)
        : format === FORMATS.CLAUDE
          ? parseSSEToClaudeResponse(rawBody, fallbackModel)
          : parseSSEToOpenAIResponse(rawBody, fallbackModel);
    if (parsed && typeof parsed === "object") {
      return {
        body: parsed as Record<string, unknown>,
        format,
      };
    }
  }

  return null;
}

function convertNDJSONToSSE(rawBody: string): string {
  const chunks = String(rawBody || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (chunks.length === 0) return rawBody;

  return `${chunks.map((chunk) => `data: ${chunk}\n`).join("\n")}\n`;
}

function normalizeNonStreamingEventPayload(rawBody: string, contentType: string): string {
  if (contentType.includes("application/x-ndjson")) {
    return convertNDJSONToSSE(rawBody);
  }
  return rawBody;
}

function getHeaderValueCaseInsensitive(
  headers: Record<string, unknown> | null | undefined,
  targetName: string
) {
  if (!headers || typeof headers !== "object") return null;
  const lowered = targetName.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === lowered && typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return null;
}

function toFiniteNumberOrNull(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function isSemaphoreTimeoutError(error: unknown): error is Error & { code: string } {
  return (
    !!error &&
    typeof error === "object" &&
    (error as { code?: unknown }).code === "SEMAPHORE_TIMEOUT"
  );
}

function resolveAccountSemaphoreAccountKey(
  connectionId: string | null | undefined,
  credentials: Record<string, unknown> | null | undefined
): string | null {
  if (typeof connectionId === "string" && connectionId.trim().length > 0) {
    return connectionId;
  }

  const candidateKeys = [
    credentials?.connectionId,
    credentials?.id,
    credentials?.email,
    credentials?.name,
    credentials?.displayName,
  ];

  for (const candidate of candidateKeys) {
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return candidate.trim();
    }
  }

  return null;
}

function resolveAccountSemaphoreMaxConcurrency(
  credentials: Record<string, unknown> | null | undefined
): number | null {
  return toFiniteNumberOrNull(credentials?.maxConcurrent);
}

function resolveAccountSemaphoreKey({
  provider,
  model,
  connectionId,
  credentials,
}: {
  provider: string | null | undefined;
  model: string;
  connectionId: string | null | undefined;
  credentials: Record<string, unknown> | null | undefined;
}): string | null {
  const accountKey = resolveAccountSemaphoreAccountKey(connectionId, credentials);
  if (!accountKey || !provider) return null;
  return buildAccountSemaphoreKey({ provider, accountKey });
}

function buildClaudePromptCacheLogMeta(
  targetFormat: string,
  finalBody: Record<string, unknown> | null | undefined,
  providerHeaders: Record<string, unknown> | null | undefined
) {
  if (targetFormat !== FORMATS.CLAUDE || !finalBody || typeof finalBody !== "object") return null;

  const describeCacheControl = (cacheControl: Record<string, unknown> | undefined, extra = {}) => ({
    type:
      cacheControl && typeof cacheControl.type === "string" && cacheControl.type.trim()
        ? cacheControl.type.trim()
        : "ephemeral",
    ttl:
      cacheControl && typeof cacheControl.ttl === "string" && cacheControl.ttl.trim()
        ? cacheControl.ttl.trim()
        : null,
    ...extra,
  });

  const systemBreakpoints = Array.isArray(finalBody.system)
    ? finalBody.system.flatMap((block, index) => {
        if (!block || typeof block !== "object") return [];
        const text =
          typeof block.text === "string" && block.text.trim().length > 0 ? block.text.trim() : "";
        if (text.startsWith("x-anthropic-billing-header:")) {
          return [];
        }
        const cacheControl =
          block.cache_control && typeof block.cache_control === "object"
            ? block.cache_control
            : null;
        return cacheControl ? [describeCacheControl(cacheControl, { index })] : [];
      })
    : [];

  const toolBreakpoints = Array.isArray(finalBody.tools)
    ? finalBody.tools.flatMap((tool, index) => {
        if (!tool || typeof tool !== "object") return [];
        const cacheControl =
          tool.cache_control && typeof tool.cache_control === "object" ? tool.cache_control : null;
        const name = typeof tool.name === "string" && tool.name.trim() ? tool.name.trim() : null;
        return cacheControl ? [describeCacheControl(cacheControl, { index, name })] : [];
      })
    : [];

  const messageBreakpoints = Array.isArray(finalBody.messages)
    ? finalBody.messages.flatMap((message, messageIndex) => {
        if (!message || typeof message !== "object" || !Array.isArray(message.content)) return [];
        const role =
          typeof message.role === "string" && message.role.trim() ? message.role.trim() : "unknown";
        return message.content.flatMap((block, contentIndex) => {
          if (!block || typeof block !== "object") return [];
          const cacheControl =
            block.cache_control && typeof block.cache_control === "object"
              ? block.cache_control
              : null;
          if (!cacheControl) return [];
          return [
            describeCacheControl(cacheControl, {
              messageIndex,
              contentIndex,
              role,
              blockType:
                typeof block.type === "string" && block.type.trim() ? block.type.trim() : "unknown",
            }),
          ];
        });
      })
    : [];

  const totalBreakpoints =
    systemBreakpoints.length + toolBreakpoints.length + messageBreakpoints.length;
  const anthropicBeta = getHeaderValueCaseInsensitive(providerHeaders, "Anthropic-Beta");

  if (totalBreakpoints === 0 && !anthropicBeta) return null;

  return {
    applied: totalBreakpoints > 0,
    totalBreakpoints,
    anthropicBeta,
    systemBreakpoints,
    toolBreakpoints,
    messageBreakpoints,
  };
}

function toPositiveNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;
}

function buildCacheUsageLogMeta(usage: Record<string, unknown> | null | undefined) {
  if (!usage || typeof usage !== "object") return null;
  const promptTokenDetails =
    usage.prompt_tokens_details && typeof usage.prompt_tokens_details === "object"
      ? (usage.prompt_tokens_details as Record<string, unknown>)
      : undefined;
  const hasCacheFields =
    "cache_read_input_tokens" in usage ||
    "cached_tokens" in usage ||
    "cache_creation_input_tokens" in usage ||
    (!!promptTokenDetails &&
      ("cached_tokens" in promptTokenDetails || "cache_creation_tokens" in promptTokenDetails));
  const cacheReadTokens = toPositiveNumber(
    usage.cache_read_input_tokens ?? usage.cached_tokens ?? promptTokenDetails?.cached_tokens
  );
  const cacheCreationTokens = toPositiveNumber(
    usage.cache_creation_input_tokens ?? promptTokenDetails?.cache_creation_tokens
  );
  if (!hasCacheFields) return null;
  return {
    cacheReadTokens,
    cacheCreationTokens,
  };
}

function attachLogMeta(
  payload: Record<string, unknown> | null | undefined,
  meta: Record<string, unknown> | null | undefined
) {
  if (!meta || typeof meta !== "object") return payload;
  const compactMeta = Object.fromEntries(
    Object.entries(meta).filter(([, value]) => value !== null && value !== undefined)
  );
  if (Object.keys(compactMeta).length === 0) return payload;
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { _omniroute: compactMeta, _payload: payload ?? null };
  }
  const existing =
    payload._omniroute &&
    typeof payload._omniroute === "object" &&
    !Array.isArray(payload._omniroute)
      ? payload._omniroute
      : {};
  return {
    ...payload,
    _omniroute: {
      ...existing,
      ...compactMeta,
    },
  };
}

/**
 * Core chat handler - shared between SSE and Worker
 * Returns { success, response, status, error } for caller to handle fallback
 * @param {object} options
 * @param {object} options.body - Request body
 * @param {object} options.modelInfo - { provider, model }
 * @param {object} options.credentials - Provider credentials
 * @param {object} options.log - Logger instance (optional)
 * @param {function} options.onCredentialsRefreshed - Callback when credentials are refreshed
 * @param {function} options.onRequestSuccess - Callback when request succeeds (to clear error status)
 * @param {function} options.onDisconnect - Callback when client disconnects
 * @param {string} options.connectionId - Connection ID for usage tracking
 * @param {object} options.apiKeyInfo - API key metadata for usage attribution
 * @param {string} options.userAgent - Client user agent for caching decisions
 * @param {string} options.comboName - Combo name if this is a combo request
 * @param {string} options.comboStrategy - Combo routing strategy (e.g., 'priority', 'cost-optimized')
 * @param {boolean} options.isCombo - Whether this request is from a combo
 * @param {string} options.connectionId - Connection ID for settings lookup
 */

/**
 * Module-level cache for upstream proxy config (shared across all requests).
 * 10s TTL prevents per-request DB lookups while staying fresh enough for setting changes.
 */
const _proxyConfigCache = new Map<string, { mode: string; enabled: boolean; ts: number }>();
const PROXY_CONFIG_CACHE_TTL = 10_000;

export function clearUpstreamProxyConfigCache(providerId?: string) {
  if (providerId) {
    _proxyConfigCache.delete(providerId);
    return;
  }
  _proxyConfigCache.clear();
}

async function getUpstreamProxyConfigCached(providerId: string) {
  const cached = _proxyConfigCache.get(providerId);
  if (cached && Date.now() - cached.ts < PROXY_CONFIG_CACHE_TTL) return cached;
  const cfg = await getUpstreamProxyConfig(providerId).catch(() => null);
  const result = cfg
    ? { mode: cfg.mode, enabled: cfg.enabled, ts: Date.now() }
    : { mode: "native" as const, enabled: false, ts: Date.now() };
  _proxyConfigCache.set(providerId, result);
  return result;
}

function buildExecutorClientHeaders(
  headers: Headers | Record<string, unknown> | null | undefined,
  userAgent?: string | null
) {
  const normalized: Record<string, string> = {};

  if (headers instanceof Headers) {
    headers.forEach((value, key) => {
      normalized[key] = value;
    });
  } else if (headers && typeof headers === "object") {
    for (const [key, value] of Object.entries(headers)) {
      if (typeof value === "string") {
        normalized[key] = value;
      }
    }
  }

  const normalizedUserAgent = typeof userAgent === "string" ? userAgent.trim() : "";
  if (normalizedUserAgent && !normalized["user-agent"] && !normalized["User-Agent"]) {
    normalized["user-agent"] = normalizedUserAgent;
    normalized["User-Agent"] = normalizedUserAgent;
  }

  return Object.keys(normalized).length > 0 ? normalized : null;
}

export async function handleChatCore({
  body,
  modelInfo,
  credentials,
  log,
  onCredentialsRefreshed,
  onRequestSuccess,
  onDisconnect,
  clientRawRequest,
  connectionId,
  apiKeyInfo = null,
  userAgent,
  comboName,
  comboStrategy = null,
  isCombo = false,
  comboStepId = null,
  comboExecutionKey = null,
  disableEmergencyFallback = false,
}) {
  let { provider, model, extendedContext } = modelInfo;
  const requestedModel =
    typeof body?.model === "string" && body.model.trim().length > 0 ? body.model : model;
  const startTime = Date.now();
  const persistFailureUsage = (statusCode: number, errorCode?: string | null) => {
    saveRequestUsage({
      provider: provider || "unknown",
      model: model || "unknown",
      tokens: { input: 0, output: 0, cacheRead: 0, cacheCreation: 0, reasoning: 0 },
      status: String(statusCode),
      success: false,
      latencyMs: Date.now() - startTime,
      timeToFirstTokenMs: 0,
      errorCode: errorCode || String(statusCode),
      timestamp: new Date().toISOString(),
      connectionId: connectionId || undefined,
      apiKeyId: apiKeyInfo?.id || undefined,
      apiKeyName: apiKeyInfo?.name || undefined,
    }).catch(() => {});
  };

  const persistCodexQuotaState = async (
    headers: Headers | Record<string, string> | null,
    status = 0
  ) => {
    if (provider !== "codex" || !connectionId || !headers) return;

    try {
      const quota = parseCodexQuotaHeaders(headers as Headers);
      if (!quota) return;

      const existingProviderData =
        credentials?.providerSpecificData && typeof credentials.providerSpecificData === "object"
          ? credentials.providerSpecificData
          : {};
      const scope = getCodexModelScope(model || requestedModel || "");
      const quotaState = {
        usage5h: quota.usage5h,
        limit5h: quota.limit5h,
        resetAt5h: quota.resetAt5h,
        usage7d: quota.usage7d,
        limit7d: quota.limit7d,
        resetAt7d: quota.resetAt7d,
        scope,
        updatedAt: new Date().toISOString(),
      };

      const nextProviderData: Record<string, unknown> = {
        ...existingProviderData,
        codexQuotaState: quotaState,
      };

      // T03/T09: on 429, persist exact reset time per scope to avoid global over-blocking.
      // Use dual-window cooldown to distinguish short-term and weekly Codex exhaustion.
      if (status === 429) {
        const { cooldownMs, window: exhaustedWindow } = getCodexDualWindowCooldownMs(quota);
        if (cooldownMs > 0) {
          const scopeUntil = new Date(Date.now() + cooldownMs).toISOString();
          const scopeMapRaw =
            existingProviderData &&
            typeof existingProviderData === "object" &&
            existingProviderData.codexScopeRateLimitedUntil &&
            typeof existingProviderData.codexScopeRateLimitedUntil === "object"
              ? existingProviderData.codexScopeRateLimitedUntil
              : {};

          nextProviderData.codexScopeRateLimitedUntil = {
            ...(scopeMapRaw as Record<string, unknown>),
            [scope]: scopeUntil,
          };
          nextProviderData.codexExhaustedWindow = exhaustedWindow;
          log?.debug?.(
            "CODEX",
            `Quota exhaustion on ${exhaustedWindow} window, cooldown until ${scopeUntil}`
          );
        }

        // Invalidate the preflight cache for this connection so the next
        // isModelAvailable check fetches fresh quota data.
        if (connectionId) {
          invalidateCodexQuotaCache(connectionId);
        }
      }

      await updateProviderConnection(connectionId, {
        providerSpecificData: nextProviderData,
      });

      credentials.providerSpecificData = nextProviderData;
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : String(err);
      log?.debug?.("CODEX", `Failed to persist codex quota state: ${errMessage}`);
    }
  };

  // ── Phase 9.2: Idempotency check ──
  const idempotencyKey = getIdempotencyKey(clientRawRequest?.headers);
  const cachedIdemp = checkIdempotency(idempotencyKey);
  if (cachedIdemp) {
    log?.debug?.("IDEMPOTENCY", `Hit for key=${idempotencyKey?.slice(0, 12)}...`);
    const idempotentUsage =
      cachedIdemp.response && typeof cachedIdemp.response === "object"
        ? ((cachedIdemp.response as Record<string, unknown>).usage as
            | Record<string, unknown>
            | undefined)
        : undefined;
    const idempotentCost = idempotentUsage
      ? await calculateCost(provider, model, idempotentUsage)
      : 0;
    return {
      success: true,
      response: new Response(JSON.stringify(cachedIdemp.response), {
        status: cachedIdemp.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": getCorsOrigin(),
          "X-OmniRoute-Idempotent": "true",
          ...buildOmniRouteResponseMetaHeaders({
            provider,
            model,
            cacheHit: false,
            latencyMs: Date.now() - startTime,
            usage: idempotentUsage,
            costUsd: idempotentCost,
          }),
        },
      }),
    };
  }

  // Initialize rate limit settings from persisted DB (once, lazy)
  await initializeRateLimits();

  // T07: Inject connectionId into credentials so executors can rotate API keys
  // using providerSpecificData.extraApiKeys (API Key Round-Robin feature)
  if (connectionId && credentials && !credentials.connectionId) {
    credentials.connectionId = connectionId;
  }

  const endpointPath = String(clientRawRequest?.endpoint || "");
  const sourceFormat = detectFormatFromEndpoint(body, endpointPath);
  const isResponsesEndpoint =
    /\/responses(?=\/|$)/i.test(endpointPath) || /^responses(?=\/|$)/i.test(endpointPath);
  const nativeCodexPassthrough = shouldUseNativeCodexPassthrough({
    provider,
    sourceFormat,
    endpointPath,
  });
  const isDroidCLI =
    userAgent?.toLowerCase().includes("droid") || userAgent?.toLowerCase().includes("codex-cli");
  const clientResponseFormat =
    sourceFormat === FORMATS.OPENAI_RESPONSES && !isResponsesEndpoint && !isDroidCLI
      ? FORMATS.OPENAI
      : sourceFormat;

  // Check for bypass patterns (warmup, skip) - return fake response
  const bypassResponse = handleBypassRequest(body, model, userAgent);
  if (bypassResponse) {
    return bypassResponse;
  }

  // Detect source format and get target format
  // Model-specific targetFormat takes priority over provider default

  // ── Background Task Redirection (T41) ──
  const bgConfig = getBackgroundDegradationConfig();
  const backgroundReason = bgConfig.enabled
    ? getBackgroundTaskReason(body, clientRawRequest?.headers)
    : null;
  if (backgroundReason) {
    const degradedModel = getDegradedModel(model);
    if (degradedModel !== model) {
      const originalModel = model;
      log?.info?.(
        "BACKGROUND",
        `Background task redirect (${backgroundReason}): ${originalModel} → ${degradedModel}`
      );
      model = degradedModel;
      if (body && typeof body === "object") {
        body.model = model;
      }

      logAuditEvent({
        action: "routing.background_task_redirect",
        actor: apiKeyInfo?.name || "system",
        target: connectionId || provider || "chat",
        details: {
          original_model: originalModel,
          redirected_to: degradedModel,
          reason: backgroundReason,
        },
      });
    }
  }

  // Apply custom model aliases (Settings → Model Aliases → Pattern→Target) before routing (#315, #472)
  // Custom aliases take priority over built-in and must be resolved here so the
  // downstream getModelTargetFormat() lookup AND the actual provider request use
  // the correct, aliased model ID. Without this, aliases only affect format detection.
  const resolvedModel = resolveModelAlias(model);
  // Use resolvedModel for all downstream operations (routing, provider requests, logging)
  const effectiveModel = resolvedModel !== model ? resolvedModel : model;
  if (resolvedModel !== model) {
    log?.info?.("ALIAS", `Model alias applied: ${model} → ${resolvedModel}`);
  }

  const alias = PROVIDER_ID_TO_ALIAS[provider] || provider;
  const modelTargetFormat = getModelTargetFormat(alias, resolvedModel);
  const targetFormat =
    modelTargetFormat || getTargetFormat(provider, credentials?.providerSpecificData);
  const { body: bodyWithWebSearchFallback, fallback: webSearchFallbackPlan } =
    prepareWebSearchFallbackBody(body as Record<string, unknown>, {
      provider,
      sourceFormat,
      targetFormat,
      nativeCodexPassthrough,
    });
  if (webSearchFallbackPlan.enabled) {
    body = bodyWithWebSearchFallback as typeof body;
    log?.info?.(
      "TOOLS",
      `Converted ${webSearchFallbackPlan.convertedToolCount} web_search tool(s) to OmniRoute fallback for ${provider}`
    );
  }
  const noLogEnabled = apiKeyInfo?.noLog === true;
  const detailedLoggingEnabled = !noLogEnabled && (await isDetailedLoggingEnabled());
  const skillRequestId = generateRequestId();
  const pipelineSessionId =
    (clientRawRequest?.headers && typeof clientRawRequest.headers.get === "function"
      ? clientRawRequest.headers.get("x-omniroute-session-id")
      : getHeaderValueCaseInsensitive(
          clientRawRequest?.headers ?? null,
          "x-omniroute-session-id"
        )) || skillRequestId;
  const persistAttemptLogs = ({
    status,
    tokens,
    responseBody,
    error,
    providerRequest,
    providerResponse,
    clientResponse,
    claudeCacheMeta,
    claudeCacheUsageMeta,
    cacheSource,
  }: {
    status: number;
    tokens?: unknown;
    responseBody?: unknown;
    error?: string | null;
    providerRequest?: unknown;
    providerResponse?: unknown;
    clientResponse?: unknown;
    claudeCacheMeta?: Record<string, unknown>;
    claudeCacheUsageMeta?: Record<string, unknown>;
    cacheSource?: "upstream" | "semantic";
  }) => {
    const providerWarnings = extractProviderWarnings(
      providerResponse,
      clientResponse,
      responseBody
    );
    if (providerWarnings.length > 0) {
      logAuditEvent({
        action: "provider.warning",
        actor: "system",
        target: [provider, connectionId].filter(Boolean).join(":") || provider || model,
        resourceType: "provider_warning",
        status: "warning",
        requestId: skillRequestId,
        details: {
          provider,
          model,
          connectionId,
          httpStatus: status,
          warnings: providerWarnings,
        },
      });
    }

    const callLogId = generateRequestId();
    const pipelinePayloads = detailedLoggingEnabled ? reqLogger?.getPipelinePayloads?.() : null;

    if (pipelinePayloads) {
      if (providerResponse !== undefined) {
        pipelinePayloads.providerResponse = providerResponse as Record<string, unknown>;
      }
      if (clientResponse !== undefined) {
        pipelinePayloads.clientResponse = clientResponse as Record<string, unknown>;
      }
      if (error) {
        pipelinePayloads.error = {
          ...(typeof pipelinePayloads.error === "object" && pipelinePayloads.error
            ? (pipelinePayloads.error as Record<string, unknown>)
            : {}),
          message: error,
        };
      }
    }

    saveCallLog({
      id: callLogId,
      method: "POST",
      path: clientRawRequest?.endpoint || "/v1/chat/completions",
      status,
      model,
      requestedModel,
      provider,
      connectionId,
      duration: Date.now() - startTime,
      tokens: tokens || {},
      requestBody: attachLogMeta((body as Record<string, unknown>) ?? undefined, {
        claudePromptCache: claudeCacheMeta,
      }),
      responseBody: attachLogMeta((responseBody as Record<string, unknown>) ?? undefined, {
        claudePromptCache: claudeCacheMeta
          ? {
              applied: claudeCacheMeta.applied,
              totalBreakpoints: claudeCacheMeta.totalBreakpoints,
              anthropicBeta: claudeCacheMeta.anthropicBeta,
            }
          : null,
        claudePromptCacheUsage: claudeCacheUsageMeta,
      }),
      error: error || null,
      sourceFormat,
      targetFormat,
      comboName,
      comboStepId,
      comboExecutionKey,
      cacheSource: cacheSource === "semantic" ? "semantic" : "upstream",
      apiKeyId: apiKeyInfo?.id || null,
      apiKeyName: apiKeyInfo?.name || null,
      noLog: noLogEnabled,
      pipelinePayloads,
    }).catch(() => {});
  };

  // Primary path: merge client model id + alias target so config on either key applies; resolved
  // id wins on same header name. T5 family fallback uses only (nextModel, resolveModelAlias(next))
  // so A-model headers are not sent to B — see buildUpstreamHeadersForExecute.
  const connectionCustomUserAgent =
    credentials?.providerSpecificData &&
    typeof credentials.providerSpecificData === "object" &&
    typeof credentials.providerSpecificData.customUserAgent === "string"
      ? credentials.providerSpecificData.customUserAgent.trim()
      : "";

  const buildUpstreamHeadersForExecute = (modelToCall: string): Record<string, string> => {
    const upstreamHeaders =
      modelToCall === effectiveModel
        ? {
            ...getModelUpstreamExtraHeaders(provider || "", model || "", sourceFormat),
            ...getModelUpstreamExtraHeaders(provider || "", resolvedModel || "", sourceFormat),
          }
        : (() => {
            const r = resolveModelAlias(modelToCall);
            return {
              ...getModelUpstreamExtraHeaders(provider || "", modelToCall || "", sourceFormat),
              ...getModelUpstreamExtraHeaders(provider || "", r || "", sourceFormat),
            };
          })();

    if (connectionCustomUserAgent) {
      upstreamHeaders["User-Agent"] = connectionCustomUserAgent;
      if ("user-agent" in upstreamHeaders) {
        upstreamHeaders["user-agent"] = connectionCustomUserAgent;
      }
    }

    return upstreamHeaders;
  };

  // Default to false unless client explicitly sets stream: true (OpenAI spec compliant)
  const acceptHeader =
    clientRawRequest?.headers && typeof clientRawRequest.headers.get === "function"
      ? clientRawRequest.headers.get("accept") || clientRawRequest.headers.get("Accept")
      : (clientRawRequest?.headers || {})["accept"] || (clientRawRequest?.headers || {})["Accept"];

  const explicitStreamAlias = resolveExplicitStreamAlias(body);

  // Remove non-standard non-stream aliases before provider translation/execution.
  // They are accepted for compatibility at the OmniRoute API boundary only.
  if (body && typeof body === "object") {
    const b = body as Record<string, unknown>;
    if (explicitStreamAlias !== undefined) {
      b.stream = explicitStreamAlias;
    }

    delete b.non_stream;
    delete b.disable_stream;
    delete b.disable_streaming;
    delete b.streaming;
  }

  const stream = resolveStreamFlag(body?.stream, acceptHeader);
  const settings = await getCachedSettings();
  setGeminiThoughtSignatureMode(settings.antigravitySignatureCacheMode);
  const semanticCacheEnabled = settings.semanticCacheEnabled !== false;

  // Create request logger for this session: sourceFormat_targetFormat_model
  const reqLogger = await createRequestLogger(sourceFormat, targetFormat, model);

  // 0. Log client raw request (before format conversion)
  if (clientRawRequest) {
    reqLogger.logClientRawRequest(
      clientRawRequest.endpoint,
      clientRawRequest.body,
      clientRawRequest.headers
    );
  }

  log?.debug?.("FORMAT", `${sourceFormat} → ${targetFormat} | stream=${stream}`);

  // ── Phase 9.1: Semantic cache check (temp=0, any streaming mode) ──
  // Streaming responses are cached after assembly; cache hits return JSON regardless of stream flag.
  if (semanticCacheEnabled && isCacheableForRead(body, clientRawRequest?.headers)) {
    const signature = generateSignature(
      model,
      body.messages ?? body.input,
      body.temperature,
      body.top_p
    );
    const cached = getCachedResponse(signature);
    if (cached) {
      log?.debug?.("CACHE", `Semantic cache HIT for ${model} (stream=${stream})`);
      reqLogger.logConvertedResponse(cached as Record<string, unknown>);
      const cachedUsage =
        extractUsageFromResponse(cached as Record<string, unknown>, provider) ||
        ((cached as Record<string, unknown>)?.usage as Record<string, unknown> | undefined);
      const cachedCost = cachedUsage ? await calculateCost(provider, model, cachedUsage) : 0;
      persistAttemptLogs({
        status: 200,
        tokens: (cached as Record<string, unknown>)?.usage,
        responseBody: cached,
        providerRequest: null,
        providerResponse: null,
        clientResponse: cached,
        cacheSource: "semantic",
      });
      return {
        success: true,
        response: new Response(JSON.stringify(cached), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": getCorsOrigin(),
            [OMNIROUTE_RESPONSE_HEADERS.cache]: "HIT",
            ...buildOmniRouteResponseMetaHeaders({
              provider,
              model,
              cacheHit: true,
              latencyMs: Date.now() - startTime,
              usage: cachedUsage,
              costUsd: cachedCost,
            }),
          },
        }),
      };
    }
  }

  // ── Common input sanitization (runs for ALL paths including passthrough) ──
  // #994: Normalize between max_output_tokens and max_tokens for universal compatibility.
  // For Responses API targets, max_output_tokens is the canonical field. For others,
  // max_tokens is preferred. We handle normalization here to support passthrough
  // paths where the translator is skipped.
  const prefersResponsesTokenField =
    sourceFormat === FORMATS.OPENAI_RESPONSES || targetFormat === FORMATS.OPENAI_RESPONSES;

  if (prefersResponsesTokenField) {
    if (body.max_output_tokens === undefined) {
      if (body.max_completion_tokens !== undefined) {
        body.max_output_tokens = body.max_completion_tokens;
        delete body.max_completion_tokens;
      } else if (body.max_tokens !== undefined) {
        body.max_output_tokens = body.max_tokens;
        delete body.max_tokens;
      }
    }
  } else if (body.max_output_tokens !== undefined) {
    if (body.max_tokens === undefined) {
      body.max_tokens = body.max_output_tokens;
    }
    delete body.max_output_tokens;
  }

  // #291: Strip empty name fields from messages/input items
  // Upstream providers (OpenAI, Codex) reject name:"" with 400 errors.
  if (Array.isArray(body.messages)) {
    body.messages = body.messages.map((msg: Record<string, unknown>) => {
      if (msg.name === "") {
        const { name: _n, ...rest } = msg;
        return rest;
      }
      return msg;
    });
  }
  if (Array.isArray(body.input)) {
    body.input = body.input.map((item: Record<string, unknown>) => {
      if (item.name === "") {
        const { name: _n, ...rest } = item;
        return rest;
      }
      return item;
    });
  }
  // #346/#637: Strip tools with empty name
  // Clients sometimes forward tool definitions with empty names, causing
  // upstream providers to reject with 400 "Invalid 'tools[0].name': empty string."
  if (Array.isArray(body.tools)) {
    body.tools = body.tools.filter((tool: Record<string, unknown>) => {
      // Built-in Responses API tool types (web_search, file_search, computer, etc.)
      // are identified solely by their `type` field and carry no name — preserve them.
      const toolType = typeof tool.type === "string" ? tool.type : "";
      if (toolType && toolType !== "function" && !tool.function && tool.name === undefined) {
        return true;
      }
      const fn = tool.function as Record<string, unknown> | undefined;
      const name = fn?.name ?? tool.name;
      return name && String(name).trim().length > 0;
    });
  }

  const memoryOwnerId = resolveMemoryOwnerId(apiKeyInfo as Record<string, unknown> | null);
  const memorySettings = memoryOwnerId
    ? await getMemorySettings().catch(() => DEFAULT_MEMORY_SETTINGS)
    : null;

  if (
    memoryOwnerId &&
    memorySettings &&
    shouldInjectMemory(body as Parameters<typeof shouldInjectMemory>[0], {
      enabled: memorySettings.enabled && memorySettings.maxTokens > 0,
    })
  ) {
    try {
      const memories = await retrieveMemories(
        memoryOwnerId,
        toMemoryRetrievalConfig(memorySettings)
      );
      if (memories.length > 0) {
        const injected = injectMemory(
          body as Parameters<typeof injectMemory>[0],
          memories,
          provider
        );
        body = injected as typeof body;
        log?.debug?.("MEMORY", `Injected ${memories.length} memories for key=${memoryOwnerId}`);
      }
    } catch (memErr) {
      log?.debug?.(
        "MEMORY",
        `Memory injection skipped: ${memErr instanceof Error ? memErr.message : String(memErr)}`
      );
    }
  }

  if (memoryOwnerId && memorySettings?.skillsEnabled) {
    const existingTools = Array.isArray(body.tools) ? body.tools : [];
    const mergedTools = injectSkills({
      provider: getSkillsProviderForFormat(sourceFormat),
      existingTools,
      apiKeyId: memoryOwnerId,
      model: typeof effectiveModel === "string" ? effectiveModel : undefined,
      sourceFormat,
      targetFormat,
      backgroundReason,
      messages: Array.isArray(body.messages)
        ? body.messages
        : Array.isArray(body.input)
          ? body.input
          : undefined,
    });

    if (mergedTools.length > existingTools.length) {
      body = {
        ...body,
        tools: mergedTools,
      };
      log?.debug?.("SKILLS", `Injected ${mergedTools.length - existingTools.length} skills`);
    }
  }

  // Translate request (pass reqLogger for intermediate logging)
  // ── Proactive Context Compression (Phase 4) ──
  // Check if context exceeds 70% of limit and compress proactively before sending to provider.
  // This prevents "prompt too long" errors for large-but-not-full contexts.
  const allMessages =
    body?.messages || body?.input || body?.contents || body?.request?.contents || [];
  if (body && Array.isArray(allMessages) && allMessages.length > 0) {
    const estimatedTokens = estimateTokens(JSON.stringify(allMessages));
    let contextLimit = getTokenLimit(provider, effectiveModel);

    if (isCombo && comboName) {
      log?.info?.("CONTEXT", `Attempting to resolve combo limits for comboName=${comboName}`);
      try {
        const { getComboByName } = await import("../../src/lib/localDb");
        const { parseModel } = await import("../services/model.ts");
        const { resolveComboTargets } = await import("../services/combo.ts");
        let comboConfig = await getComboByName(comboName);
        if (!comboConfig && comboName.startsWith("combo/")) {
          comboConfig = await getComboByName(comboName.substring(6));
        }
        if (comboConfig) {
          const targets = await resolveComboTargets(comboConfig, null);
          const limits = targets.map((t: { modelStr?: string }) => {
            const parsed = parseModel(t.modelStr);
            return getTokenLimit(parsed.provider, parsed.model);
          });
          if (limits.length > 0) {
            contextLimit = Math.min(...limits);
            log?.info?.("CONTEXT", `Combo min limit: ${contextLimit}`);
          }
        }
      } catch (err) {
        log?.warn?.("CONTEXT", "Failed to resolve combo limits for compression: " + err);
      }
    }

    const COMPRESSION_THRESHOLD = 0.7;
    let reservedTokens = 0;
    if (Array.isArray(body.tools)) {
      reservedTokens = estimateTokens(JSON.stringify(body.tools));
    }
    const threshold = Math.max(
      1,
      Math.floor((Math.max(1, contextLimit) - reservedTokens) * COMPRESSION_THRESHOLD)
    );

    log?.debug?.(
      "CONTEXT",
      `Checking compression: ${estimatedTokens} tokens vs ${threshold} threshold (${contextLimit} limit, ${reservedTokens} reserved)`
    );

    if (estimatedTokens > threshold) {
      log?.info?.(
        "CONTEXT",
        `Proactive compression triggered: ${estimatedTokens} tokens > ${threshold} threshold (${contextLimit} limit)`
      );

      const compressionResult = compressContext(body, {
        provider,
        model: effectiveModel,
        maxTokens: threshold,
        reserveTokens: 0,
      });

      if (compressionResult.compressed) {
        body = compressionResult.body;
        const stats = compressionResult.stats;
        const layersInfo =
          stats && "layers" in stats && Array.isArray(stats.layers)
            ? ` (layers: ${stats.layers.map((l: { name: string }) => l.name).join(", ")})`
            : "";

        log?.info?.(
          "CONTEXT",
          `Context compressed: ${stats.original} → ${stats.final} tokens${layersInfo}`
        );

        logAuditEvent({
          action: "context.proactive_compression",
          actor: apiKeyInfo?.name || "system",
          target: connectionId || provider || "chat",
          details: {
            provider,
            model: effectiveModel,
            original_tokens: stats.original,
            final_tokens: stats.final,
            layers: "layers" in stats ? stats.layers : undefined,
          },
        });
      } else {
        log?.debug?.("CONTEXT", `Compression not applied: context already fits within target`);
      }
    }
  } else {
    log?.debug?.(
      "CONTEXT",
      `Skipping compression check: body=${!!body}, hasMessages=${Array.isArray(allMessages)}`
    );
  }

  let translatedBody = body;
  const isClaudePassthrough = sourceFormat === FORMATS.CLAUDE && targetFormat === FORMATS.CLAUDE;
  const isClaudeCodeCompatible = isClaudeCodeCompatibleProvider(provider);
  const upstreamStream = stream || isClaudeCodeCompatible;
  let ccSessionId: string | null = null;
  const stripTypes = getStripTypesForProviderModel(provider || "", model || "");

  if (Array.isArray(translatedBody?.messages) && stripTypes.length > 0) {
    const stripResult = stripIncompatibleMessageContent(translatedBody.messages, stripTypes);
    if (stripResult.removedParts > 0) {
      translatedBody = {
        ...translatedBody,
        messages: stripResult.messages,
      };
      log?.warn?.(
        "CONTENT",
        `Stripped ${stripResult.removedParts} incompatible content part(s) for ${provider}/${model}`
      );
    }
  }

  // Determine if we should preserve client-side cache_control headers
  // Fetch settings from DB to get user preference
  const cacheControlMode = await getCacheControlSettings().catch(() => "auto" as const);
  const preserveCacheControl = shouldPreserveCacheControl({
    userAgent,
    isCombo,
    comboStrategy,
    targetProvider: provider,
    targetFormat,
    settings: { alwaysPreserveClientCache: cacheControlMode },
  });

  if (preserveCacheControl) {
    log?.debug?.(
      "CACHE",
      `Preserving client cache_control (client=${userAgent?.substring(0, 20)}, combo=${isCombo}, strategy=${comboStrategy}, provider=${provider})`
    );
  }

  type ClaudeContentBlock = Record<string, unknown>;
  type ClaudeMessage = {
    role?: unknown;
    content?: unknown;
  };

  const normalizeClaudeUpstreamMessages = (
    payload: Record<string, unknown>,
    options?: { preserveToolResultBlocks?: boolean }
  ) => {
    const preserveToolResultBlocks = options?.preserveToolResultBlocks === true;
    if (!Array.isArray(payload.messages)) return;
    const messages = payload.messages as ClaudeMessage[];

    // Anthropic rejects empty text blocks in native Messages payloads.
    for (const msg of messages) {
      if (Array.isArray(msg.content)) {
        msg.content = msg.content.filter(
          (block: ClaudeContentBlock) =>
            block.type !== "text" || (typeof block.text === "string" && block.text.length > 0)
        );
      }
    }

    // Normalize unsupported content types without reintroducing the Claude -> OpenAI round-trip.
    for (const msg of messages) {
      if (msg.role !== "user" || !Array.isArray(msg.content)) continue;
      msg.content = (msg.content as ClaudeContentBlock[]).flatMap((block: ClaudeContentBlock) => {
        if (
          block.type === "text" ||
          block.type === "image_url" ||
          block.type === "image" ||
          block.type === "file_url" ||
          block.type === "file" ||
          block.type === "document"
        ) {
          const fileData = (block.file_url ?? block.file ?? block.document) as
            | Record<string, unknown>
            | undefined;
          if (
            (block.type === "file" || block.type === "document") &&
            !fileData?.url &&
            !fileData?.data
          ) {
            const fileContent =
              (block.file as ClaudeContentBlock)?.content ??
              (block.file as ClaudeContentBlock)?.text ??
              block.content ??
              block.text;
            const fileName =
              (block.file as Record<string, unknown>)?.name ?? block.name ?? "attachment";
            if (typeof fileContent === "string" && fileContent.length > 0) {
              return [{ type: "text", text: `[${fileName}]\n${fileContent}` }];
            }
          }
          return [block];
        }

        if (block.type === "tool_result") {
          if (preserveToolResultBlocks) {
            return [block];
          }
          const toolId = block.tool_use_id ?? block.id ?? "unknown";
          const resultContent = block.content ?? block.text ?? block.output ?? "";
          const resultText =
            typeof resultContent === "string"
              ? resultContent
              : Array.isArray(resultContent)
                ? resultContent
                    .filter((c: Record<string, unknown>) => c.type === "text")
                    .map((c: Record<string, unknown>) => c.text)
                    .join("\n")
                : JSON.stringify(resultContent);
          if (resultText.length > 0) {
            return [{ type: "text", text: `[Tool Result: ${toolId}]\n${resultText}` }];
          }
          return [];
        }

        log?.debug?.("CONTENT", `Dropped unsupported content part type="${block.type}"`);
        return [];
      });
    }
  };

  try {
    if (nativeCodexPassthrough) {
      translatedBody = { ...body, _nativeCodexPassthrough: true };
      log?.debug?.("FORMAT", "native codex passthrough enabled");
    } else if (isClaudeCodeCompatible) {
      let normalizedForCc = { ...body };

      // Claude Code-compatible providers expect Anthropic Messages-shaped payloads,
      // but we extract only role/text/max_tokens/effort from an OpenAI-like view first.
      if (sourceFormat !== FORMATS.OPENAI) {
        const normalizeToolCallId = getModelNormalizeToolCallId(
          provider || "",
          model || "",
          sourceFormat
        );
        const preserveDeveloperRole = getModelPreserveOpenAIDeveloperRole(
          provider || "",
          model || "",
          sourceFormat
        );
        normalizedForCc = translateRequest(
          sourceFormat,
          FORMATS.OPENAI,
          model,
          { ...body },
          stream,
          credentials,
          provider,
          reqLogger,
          { normalizeToolCallId, preserveDeveloperRole, preserveCacheControl }
        );
      }

      ccSessionId = resolveClaudeCodeCompatibleSessionId(clientRawRequest?.headers);
      translatedBody = buildClaudeCodeCompatibleRequest({
        sourceBody: body,
        normalizedBody: normalizedForCc,
        claudeBody: sourceFormat === FORMATS.CLAUDE ? body : null,
        model,
        stream: upstreamStream,
        sessionId: ccSessionId,
        cwd: process.cwd(),
        now: new Date(),
        preserveCacheControl,
      });
      log?.debug?.("FORMAT", "claude-code-compatible bridge enabled");
    } else if (isClaudePassthrough) {
      // Pure passthrough: forward the body as-is without OpenAI round-trip.
      // The Claude→OpenAI→Claude double translation was lossy and corrupted
      // payloads at high context (150+ msgs, 100+ tools). Fix: #1359.
      // Claude Code sends well-formed Messages API payloads — trust them
      // regardless of combo strategy or cache_control settings.
      translatedBody = { ...body };
      translatedBody._disableToolPrefix = true;
      normalizeClaudeUpstreamMessages(translatedBody, { preserveToolResultBlocks: true });

      log?.debug?.("FORMAT", `claude passthrough (preserveCache=${preserveCacheControl})`);
    } else {
      translatedBody = { ...body };

      // Issue #199 + #618: Always disable tool name prefix in Claude passthrough.
      // The proxy_ prefix was designed for OpenAI→Claude translation to avoid
      // conflicts with Claude OAuth tools, but in the passthrough path the tools
      // are already in Claude format. Applying the prefix turns "Bash" into
      // "proxy_Bash", which Claude rejects ("No such tool available: proxy_Bash").
      if (targetFormat === FORMATS.CLAUDE) {
        translatedBody._disableToolPrefix = true;
        normalizeClaudeUpstreamMessages(translatedBody);
      }

      // OpenAI-compatible providers only support function tools.
      // Non-function tool types (computer, mcp, web_search, custom, etc.) are handled:
      //   - tools with a name → converted to function format in-place before translation
      //   - tools without a name AND without .function → dropped (unconvertible)
      // This must happen before translateRequest, which validates and throws on unknown types.
      if (provider?.startsWith("openai-compatible-") && Array.isArray(translatedBody.tools)) {
        const before = (translatedBody.tools as unknown[]).length;
        translatedBody.tools = (translatedBody.tools as Record<string, unknown>[])
          .filter((t) => !t.type || t.type === "function" || !!t.function || !!t.name)
          .map((t) => {
            if (!t.type || t.type === "function" || t.function) return t;
            // Named non-function tool: normalise to function format so the translator
            // does not throw on the unknown type.
            return {
              type: "function",
              function: {
                name: t.name,
                ...(t.description !== undefined ? { description: t.description } : {}),
                ...(t.parameters !== undefined || t.input_schema !== undefined
                  ? { parameters: t.parameters ?? t.input_schema ?? {} }
                  : {}),
                ...(t.strict !== undefined ? { strict: t.strict } : {}),
              },
            };
          });
        const dropped = before - (translatedBody.tools as unknown[]).length;
        if (dropped > 0) {
          log?.debug?.(
            "TOOLS",
            `Dropped ${dropped} unconvertible tool(s) for openai-compatible provider`
          );
        }
      }

      const normalizeToolCallId = getModelNormalizeToolCallId(
        provider || "",
        model || "",
        sourceFormat
      );
      const preserveDeveloperRole = getModelPreserveOpenAIDeveloperRole(
        provider || "",
        model || "",
        sourceFormat
      );
      translatedBody = translateRequest(
        sourceFormat,
        targetFormat,
        model,
        translatedBody,
        stream,
        credentials,
        provider,
        reqLogger,
        { normalizeToolCallId, preserveDeveloperRole, preserveCacheControl }
      );
    }
  } catch (error) {
    const parsedStatus = Number(error?.statusCode);
    const statusCode =
      Number.isInteger(parsedStatus) && parsedStatus >= 400 && parsedStatus <= 599
        ? parsedStatus
        : HTTP_STATUS.SERVER_ERROR;
    const message = error?.message || "Invalid request";
    const errorType = typeof error?.errorType === "string" ? error.errorType : null;

    log?.warn?.("TRANSLATE", `Request translation failed: ${message}`);

    if (errorType) {
      return {
        success: false,
        status: statusCode,
        error: message,
        response: new Response(
          JSON.stringify({
            error: {
              message,
              type: errorType,
              code: errorType,
            },
          }),
          {
            status: statusCode,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": getCorsOrigin(),
            },
          }
        ),
      };
    }

    return createErrorResult(statusCode, message);
  }

  // Extract toolNameMap for response translation (Claude OAuth)
  const translatedToolNameMap = translatedBody._toolNameMap;
  const nativeClaudeToolNameMap = isClaudePassthrough
    ? buildClaudePassthroughToolNameMap(body)
    : null;
  const toolNameMap =
    translatedToolNameMap instanceof Map && translatedToolNameMap.size > 0
      ? translatedToolNameMap
      : nativeClaudeToolNameMap;
  delete translatedBody._toolNameMap;
  delete translatedBody._disableToolPrefix;

  // Update model in body — use resolved alias so the provider gets the correct model ID (#472)
  // Strip provider/alias prefix if it exactly matches the routing prefix so upstream receives the raw model name (#1261)
  let finalModelToUpstream = effectiveModel;
  if (finalModelToUpstream.startsWith(`${provider}/`)) {
    finalModelToUpstream = finalModelToUpstream.slice(provider.length + 1);
  } else if (alias && finalModelToUpstream.startsWith(`${alias}/`)) {
    finalModelToUpstream = finalModelToUpstream.slice(alias.length + 1);
  }
  translatedBody.model = finalModelToUpstream;

  // Strip unsupported parameters for reasoning models (o1, o3, etc.)
  const unsupported = getUnsupportedParams(provider, model);
  if (unsupported.length > 0) {
    const stripped: string[] = [];
    for (const param of unsupported) {
      if (Object.hasOwn(translatedBody, param)) {
        stripped.push(param);
        delete translatedBody[param];
      }
    }
    if (stripped.length > 0) {
      log?.warn?.("PARAMS", `Stripped unsupported params for ${model}: ${stripped.join(", ")}`);
    }
  }

  // Provider-specific max_tokens caps (#711)
  // Some providers reject requests when max_tokens exceeds their API limit.
  // Cap before sending to avoid upstream HTTP 400 errors.
  const providerCap = PROVIDER_MAX_TOKENS[provider];
  if (providerCap) {
    for (const field of ["max_tokens", "max_completion_tokens"] as const) {
      if (typeof translatedBody[field] === "number" && translatedBody[field] > providerCap) {
        log?.debug?.(
          "PARAMS",
          `Capping ${field} from ${translatedBody[field]} to ${providerCap} for ${provider}`
        );
        translatedBody[field] = providerCap;
      }
    }
  }

  // Resolve executor with optional upstream proxy (CLIProxyAPI) routing.
  // mode="native" (default): returns the native executor unchanged.
  // mode="cliproxyapi": returns the CLIProxyAPI executor instead.
  // mode="fallback": returns a wrapper that tries native first, falls back to CLIProxyAPI on 5xx/network errors.

  const resolveExecutorWithProxy = async (prov: string) => {
    const cfg = await getUpstreamProxyConfigCached(prov);
    if (!cfg.enabled || cfg.mode === "native") return getExecutor(prov);

    if (cfg.mode === "cliproxyapi") {
      log?.info?.("UPSTREAM_PROXY", `${prov} routed through CLIProxyAPI (passthrough)`);
      return getExecutor("cliproxyapi");
    }

    // mode === "fallback": try native first, retry via CLIProxyAPI on specific failures
    const nativeExec = getExecutor(prov);
    const proxyExec = getExecutor("cliproxyapi");
    const isRetryableStatus = (s: number) => s >= 500 || s === 429 || s === 0;

    const wrapper = Object.create(nativeExec);
    wrapper.execute = async (input: {
      model: string;
      body: unknown;
      stream: boolean;
      credentials: unknown;
      signal?: AbortSignal | null;
      log?: unknown;
      upstreamExtraHeaders?: Record<string, string> | null;
    }) => {
      let result;
      try {
        result = await nativeExec.execute(input);
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        log?.info?.("UPSTREAM_PROXY", `${prov} native error (${errMsg}), retrying via CLIProxyAPI`);
        try {
          return await proxyExec.execute(input);
        } catch (proxyErr) {
          const proxyMsg = proxyErr instanceof Error ? proxyErr.message : String(proxyErr);
          log?.error?.("UPSTREAM_PROXY", `${prov} CLIProxyAPI fallback also failed: ${proxyMsg}`);
          throw proxyErr;
        }
      }

      if (!isRetryableStatus(result.response.status)) {
        return result;
      }
      log?.info?.(
        "UPSTREAM_PROXY",
        `${prov} native failed (${result.response.status}), retrying via CLIProxyAPI`
      );
      try {
        return await proxyExec.execute(input);
      } catch (proxyErr) {
        const proxyMsg = proxyErr instanceof Error ? proxyErr.message : String(proxyErr);
        log?.error?.("UPSTREAM_PROXY", `${prov} CLIProxyAPI fallback also failed: ${proxyMsg}`);
        throw proxyErr;
      }
    };
    return wrapper;
  };

  // Get executor for this provider (with optional upstream proxy routing)
  const executor = await resolveExecutorWithProxy(provider);
  const getExecutionCredentials = () => {
    const nextCredentials = nativeCodexPassthrough
      ? { ...credentials, requestEndpointPath: endpointPath }
      : credentials;

    if (!ccSessionId) return nextCredentials;

    return {
      ...nextCredentials,
      providerSpecificData: {
        ...(nextCredentials?.providerSpecificData || {}),
        ccSessionId,
      },
    };
  };

  // Create stream controller for disconnect detection
  const streamController = createStreamController({ onDisconnect, log, provider, model });

  const dedupRequestBody = { ...translatedBody, model: `${provider}/${model}`, stream };
  const dedupEnabled = shouldDeduplicate(dedupRequestBody);
  const dedupHash = dedupEnabled ? computeRequestHash(dedupRequestBody) : null;

  const executeProviderRequest = async (modelToCall = effectiveModel, allowDedup = false) => {
    const execute = async () => {
      const executionCredentials = getExecutionCredentials();
      const accountSemaphoreMaxConcurrency =
        resolveAccountSemaphoreMaxConcurrency(executionCredentials);
      const accountSemaphoreKey = resolveAccountSemaphoreKey({
        provider,
        model: modelToCall,
        connectionId,
        credentials: executionCredentials,
      });
      let bodyToSend =
        translatedBody.model === modelToCall
          ? translatedBody
          : { ...translatedBody, model: modelToCall };
      const payloadRuleModel =
        typeof bodyToSend.model === "string" && bodyToSend.model.length > 0
          ? bodyToSend.model
          : modelToCall;
      const payloadRuleProtocols = resolvePayloadRuleProtocols({
        provider,
        targetFormat,
      });
      const payloadRuleResult = await applyConfiguredPayloadRules(
        bodyToSend,
        payloadRuleModel,
        payloadRuleProtocols
      );
      bodyToSend = payloadRuleResult.payload;

      if (payloadRuleResult.applied.length > 0) {
        const appliedSummary = payloadRuleResult.applied
          .map((rule) => {
            if (rule.type === "filter") return `${rule.type}:${rule.path}`;
            const serializedValue = JSON.stringify(rule.value);
            const safeValue =
              typeof serializedValue === "string" && serializedValue.length > 80
                ? `${serializedValue.slice(0, 77)}...`
                : serializedValue;
            return `${rule.type}:${rule.path}=${safeValue}`;
          })
          .join(", ");
        log?.debug?.(
          "PAYLOAD_RULES",
          `Applied ${payloadRuleResult.applied.length} rule(s) for ${payloadRuleModel} (${payloadRuleProtocols.join(", ")}): ${appliedSummary}`
        );
      }

      // Qwen OAuth rejects requests without a non-empty `user` field.
      // Some minimal OpenAI-compatible clients omit it, so we backfill a
      // stable default only for OAuth mode (API key mode is unaffected).
      const hasValidQwenUser =
        typeof bodyToSend.user === "string" && bodyToSend.user.trim().length > 0;
      const isQwenOAuthRequest =
        provider === "qwen" &&
        !credentials?.apiKey &&
        typeof credentials?.accessToken === "string" &&
        credentials.accessToken.trim().length > 0;
      if (isQwenOAuthRequest && !hasValidQwenUser) {
        bodyToSend = { ...bodyToSend, user: "omniroute-qwen-oauth" };
        log?.debug?.("QWEN", "Injected fallback user for OAuth request");
      }

      // Inject prompt_cache_key only for providers that support it
      if (
        targetFormat === FORMATS.OPENAI &&
        providerSupportsCaching(provider) &&
        !bodyToSend.prompt_cache_key &&
        Array.isArray(bodyToSend.messages) &&
        !["nvidia", "codex", "xai"].includes(provider)
      ) {
        const { generatePromptCacheKey } = await import("@/lib/promptCache");
        const cacheKey = generatePromptCacheKey(bodyToSend.messages);
        if (cacheKey) {
          bodyToSend = { ...bodyToSend, prompt_cache_key: cacheKey };
        }
      }

      const acquireAccountSemaphoreRelease =
        accountSemaphoreKey && accountSemaphoreMaxConcurrency != null
          ? await acquireAccountSemaphore(accountSemaphoreKey, {
              maxConcurrency: accountSemaphoreMaxConcurrency,
            })
          : () => {};

      const rawResult = await withRateLimit(provider, connectionId, modelToCall, async () => {
        let attempts = 0;
        const maxAttempts = provider === "qwen" ? 3 : 1;

        while (attempts < maxAttempts) {
          const res = await executor.execute({
            model: modelToCall,
            body: bodyToSend,
            stream: upstreamStream,
            credentials: executionCredentials,
            signal: streamController.signal,
            log,
            extendedContext,
            upstreamExtraHeaders: buildUpstreamHeadersForExecute(modelToCall),
            clientHeaders: buildExecutorClientHeaders(clientRawRequest?.headers, userAgent),
            onCredentialsRefreshed,
          });

          // Qwen 429 strict quota backoff (wait 1.5s, 3s and retry)
          if (provider === "qwen" && res.response.status === 429 && attempts < maxAttempts - 1) {
            const bodyPeek = await res.response
              .clone()
              .text()
              .catch(() => "");
            if (bodyPeek.toLowerCase().includes("exceeded your current quota")) {
              const delay = 1500 * (attempts + 1);
              log?.warn?.("QWEN_RETRY", `Quota 429 hit. Retrying in ${delay}ms...`);
              await new Promise((r) => setTimeout(r, delay));
              attempts++;
              continue;
            }
          }

          // For streaming: wrap response body to release semaphore only when stream is fully consumed
          if (stream) {
            const originalBody = res.response.body;
            const wrappedBody = originalBody
              ? originalBody.pipeThrough(
                  new TransformStream({
                    flush: () => {
                      acquireAccountSemaphoreRelease();
                    },
                  })
                )
              : null;
            return {
              ...res,
              response: new Response(wrappedBody, {
                status: res.response.status,
                statusText: res.response.statusText,
                headers: res.response.headers,
              }),
            };
          }

          return res;
        }
      });

      // Non-stream: release semaphore immediately after reading full response body
      const status = rawResult.response.status;
      const statusText = rawResult.response.statusText;
      const headers = Array.from(rawResult.response.headers.entries()) as [string, string][];
      const payload = await rawResult.response.text();
      acquireAccountSemaphoreRelease();

      return {
        ...rawResult,
        response: new Response(payload, { status, statusText, headers }),
        _dedupSnapshot: {
          status,
          statusText,
          headers,
          payload,
        },
      };
    };

    if (allowDedup && dedupEnabled && dedupHash) {
      const dedupResult = await deduplicate(dedupHash, execute);
      if (dedupResult.wasDeduplicated) {
        log?.debug?.("DEDUP", `Joined in-flight request hash=${dedupHash}`);
      }
      return materializeDeduplicatedExecutionResult(dedupResult.result);
    }

    return execute();
  };

  // Track pending request
  trackPendingRequest(model, provider, connectionId, true, {
    clientEndpoint: clientRawRequest?.endpoint || "/v1/chat/completions",
    clientRequest: clientRawRequest?.body ?? body,
  });

  // T5: track which models we've tried for intra-family fallback
  const triedModels = new Set<string>([effectiveModel]);
  let currentModel = effectiveModel;

  // Log start
  appendRequestLog({ model, provider, connectionId, status: "PENDING" }).catch(() => {});

  const msgCount =
    translatedBody.messages?.length ||
    translatedBody.contents?.length ||
    translatedBody.request?.contents?.length ||
    0;
  log?.debug?.("REQUEST", `${provider.toUpperCase()} | ${model} | ${msgCount} msgs`);

  // Execute request using executor (handles URL building, headers, fallback, transform)
  let providerResponse;
  let providerUrl;
  let providerHeaders;
  let finalBody;
  let claudePromptCacheLogMeta = null;

  try {
    const result = await executeProviderRequest(effectiveModel, true);

    providerResponse = result.response;
    providerUrl = result.url;
    providerHeaders = result.headers;
    finalBody = result.transformedBody;
    claudePromptCacheLogMeta = buildClaudePromptCacheLogMeta(
      targetFormat,
      finalBody,
      providerHeaders
    );

    // Log target request (final request to provider)
    reqLogger.logTargetRequest(providerUrl, providerHeaders, finalBody);
    updatePendingRequest(model, provider, connectionId, {
      providerRequest: finalBody,
      providerUrl,
    });

    // Update rate limiter from response headers (learn limits dynamically)
    updateFromHeaders(
      provider,
      connectionId,
      providerResponse.headers,
      providerResponse.status,
      model
    );
  } catch (error) {
    trackPendingRequest(model, provider, connectionId, false);
    if (isSemaphoreTimeoutError(error)) {
      appendRequestLog({
        model,
        provider,
        connectionId,
        status: `FAILED ${error.code}`,
      }).catch(() => {});
      if (isCombo) {
        throw error;
      }
      const failureMessage = error.message || "Semaphore timeout";
      persistAttemptLogs({
        status: HTTP_STATUS.RATE_LIMITED,
        error: failureMessage,
        providerRequest: finalBody || translatedBody,
        clientResponse: buildErrorBody(HTTP_STATUS.RATE_LIMITED, failureMessage),
        claudeCacheMeta: claudePromptCacheLogMeta,
        cacheSource: "upstream",
      });
      persistFailureUsage(HTTP_STATUS.RATE_LIMITED, error.code);
      return createErrorResult(HTTP_STATUS.RATE_LIMITED, failureMessage);
    }
    const failureStatus =
      error.name === "AbortError"
        ? 499
        : error.name === "TimeoutError"
          ? HTTP_STATUS.GATEWAY_TIMEOUT
          : HTTP_STATUS.BAD_GATEWAY;
    const failureMessage =
      error.name === "AbortError"
        ? "Request aborted"
        : formatProviderError(error, provider, model, failureStatus);
    appendRequestLog({
      model,
      provider,
      connectionId,
      status: `FAILED ${failureStatus}`,
    }).catch(() => {});
    persistAttemptLogs({
      status: failureStatus,
      error: failureMessage,
      providerRequest: finalBody || translatedBody,
      clientResponse: buildErrorBody(failureStatus, failureMessage),
      claudeCacheMeta: claudePromptCacheLogMeta,
      cacheSource: "upstream",
    });
    if (error.name === "AbortError") {
      streamController.handleError(error);
      return createErrorResult(499, "Request aborted");
    }
    persistFailureUsage(
      failureStatus,
      error instanceof Error && error.name ? error.name : "upstream_error"
    );
    console.log(`${COLORS.red}[ERROR] ${failureMessage}${COLORS.reset}`);
    return createErrorResult(failureStatus, failureMessage);
  }
  // We need to peek at the error text if it's 400 for Qwen
  let upstreamErrorParsed = false;
  let parsedStatusCode = providerResponse.status;
  let parsedMessage = "";
  let parsedRetryAfterMs: number | null = null;
  let upstreamErrorBody: unknown = null;

  if (provider === "qwen" && providerResponse.status === HTTP_STATUS.BAD_REQUEST) {
    const errorDetails = await parseUpstreamError(providerResponse, provider);
    parsedStatusCode = errorDetails.statusCode;
    parsedMessage = errorDetails.message;
    parsedRetryAfterMs = errorDetails.retryAfterMs;
    upstreamErrorBody = errorDetails.responseBody;
    upstreamErrorParsed = true;
  }

  const isQwenExpiredError =
    provider === "qwen" &&
    parsedStatusCode === HTTP_STATUS.BAD_REQUEST &&
    parsedMessage &&
    parsedMessage.toLowerCase().includes("session has expired");

  const streamOptionsOnlyFailed = false; // TODO: properly track stream options failure? (placeholder from existing logic)

  // Handle 401/403 (and Qwen explicit expiration) - try token refresh using executor
  if (
    (providerResponse.status === HTTP_STATUS.UNAUTHORIZED ||
      providerResponse.status === HTTP_STATUS.FORBIDDEN ||
      isQwenExpiredError) &&
    !streamOptionsOnlyFailed // Keep constraint if stream options failed originally
  ) {
    const newCredentials = (await refreshWithRetry(
      () => executor.refreshCredentials(credentials, log),
      3,
      log,
      provider // Explicitly pass the provider to avoid universally tripping the "unknown" circuit breaker
    )) as null | {
      accessToken?: string;
      copilotToken?: string;
    };

    if (newCredentials?.accessToken || newCredentials?.copilotToken) {
      log?.info?.("TOKEN", `${provider.toUpperCase()} | refreshed`);

      // Update credentials
      Object.assign(credentials, newCredentials);

      // Notify caller about refreshed credentials
      if (onCredentialsRefreshed && newCredentials) {
        await onCredentialsRefreshed(newCredentials);
      }

      // Retry with new credentials — model + extra headers follow translatedBody.model so they
      // stay aligned if this block ever runs after a path that mutates body.model (e.g. fallback).
      try {
        const retryModelId = String(translatedBody.model || effectiveModel);
        const retryResult = await executor.execute({
          model: retryModelId,
          body: translatedBody,
          stream: upstreamStream,
          credentials: getExecutionCredentials(),
          signal: streamController.signal,
          log,
          extendedContext,
          upstreamExtraHeaders: buildUpstreamHeadersForExecute(retryModelId),
          clientHeaders: buildExecutorClientHeaders(clientRawRequest?.headers, userAgent),
          onCredentialsRefreshed,
        });

        if (retryResult.response.ok) {
          providerResponse = retryResult.response;
          providerUrl = retryResult.url;
          providerHeaders = retryResult.headers;
          finalBody = retryResult.transformedBody;
          reqLogger.logTargetRequest(providerUrl, providerHeaders, finalBody);
          updatePendingRequest(model, provider, connectionId, {
            providerRequest: finalBody,
            providerUrl,
          });
          upstreamErrorParsed = false; // Reset since new response is OK
        } else {
          providerResponse = retryResult.response;
          upstreamErrorParsed = false; // Let it be parsed downstream
        }
      } catch {
        log?.warn?.("TOKEN", `${provider.toUpperCase()} | retry after refresh failed`);
      }
    } else {
      log?.warn?.("TOKEN", `${provider.toUpperCase()} | refresh failed`);
    }
  }

  await persistCodexQuotaState(providerResponse.headers, providerResponse.status);

  // Check provider response - return error info for fallback handling
  if (!providerResponse.ok) {
    trackPendingRequest(model, provider, connectionId, false);

    let statusCode = providerResponse.status;
    let message = "";
    let retryAfterMs: number | null = null;

    if (upstreamErrorParsed) {
      statusCode = parsedStatusCode;
      message = parsedMessage;
      retryAfterMs = parsedRetryAfterMs;
    } else {
      const details = await parseUpstreamError(providerResponse, provider);
      statusCode = details.statusCode;
      message = details.message;
      retryAfterMs = details.retryAfterMs;
      upstreamErrorBody = details.responseBody;
    }

    // T06/T10/T36: classify provider errors and persist terminal account states.
    const errorType = classifyProviderError(statusCode, message, provider);
    if (connectionId && errorType) {
      try {
        if (errorType === PROVIDER_ERROR_TYPES.FORBIDDEN) {
          await updateProviderConnection(connectionId, {
            isActive: false,
            testStatus: "banned",
            lastErrorType: errorType,
            lastError: message,
            errorCode: statusCode,
          });
          console.warn(
            `[provider] Node ${connectionId} banned (${statusCode}) — disabling permanently`
          );
        } else if (errorType === PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED) {
          await updateProviderConnection(connectionId, {
            isActive: false,
            testStatus: "deactivated",
            lastErrorType: errorType,
            lastError: message,
            errorCode: statusCode,
          });
          console.warn(
            `[provider] Node ${connectionId} account deactivated (${statusCode}) — disabling permanently`
          );
        } else if (errorType === PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED) {
          // Providers with per-model quotas — lock the model only, not the connection
          const quotaCooldownMs = retryAfterMs || COOLDOWN_MS.rateLimit;
          const accountSemaphoreKey = resolveAccountSemaphoreKey({
            provider,
            model: currentModel,
            connectionId,
            credentials,
          });
          if (accountSemaphoreKey) {
            markAccountSemaphoreBlocked(accountSemaphoreKey, quotaCooldownMs);
          }
          if (
            lockModelIfPerModelQuota(
              provider,
              connectionId,
              model,
              "quota_exhausted",
              quotaCooldownMs
            )
          ) {
            console.warn(
              `[provider] Node ${connectionId} model-only quota exhausted (${statusCode}) for ${model} - ${Math.ceil(quotaCooldownMs / 1000)}s (connection stays active)`
            );
          } else {
            await updateProviderConnection(connectionId, {
              testStatus: "credits_exhausted",
              lastErrorType: errorType,
              lastError: message,
              errorCode: statusCode,
            });
            console.warn(`[provider] Node ${connectionId} exhausted quota (${statusCode})`);
          }
        } else if (errorType === PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED) {
          await updateProviderConnection(connectionId, {
            isActive: false,
            testStatus: "expired",
            lastErrorType: errorType,
            lastError: message,
            errorCode: statusCode,
          });
          console.warn(
            `[provider] Node ${connectionId} account deactivated (${statusCode}) — marked expired`
          );
        } else if (errorType === PROVIDER_ERROR_TYPES.UNAUTHORIZED) {
          // Normal 401 (token/session auth issue): keep account active for refresh/re-auth.
          await updateProviderConnection(connectionId, {
            lastErrorType: errorType,
            lastError: message,
            errorCode: statusCode,
          });
        } else if (errorType === PROVIDER_ERROR_TYPES.OAUTH_INVALID_TOKEN) {
          // OAuth 401 with invalid credentials - token refresh can recover
          await updateProviderConnection(connectionId, {
            lastErrorType: errorType,
            lastError: message,
            errorCode: statusCode,
          });
          console.warn(
            `[provider] Node ${connectionId} OAuth token invalid (${statusCode}) — token refresh available`
          );
        } else if (errorType === PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR) {
          // Cloud Code 403 with stale project: not a ban, keep account active.
          await updateProviderConnection(connectionId, {
            lastErrorType: errorType,
            lastError: message,
            errorCode: statusCode,
          });
          console.warn(
            `[provider] Node ${connectionId} project routing error (${statusCode}) — not banning`
          );
        }
      } catch {
        // Best-effort state update; request flow should continue with fallback handling.
      }
    }

    appendRequestLog({ model, provider, connectionId, status: `FAILED ${statusCode}` }).catch(
      () => {}
    );

    const errMsg = formatProviderError(new Error(message), provider, model, statusCode);
    console.log(`${COLORS.red}[ERROR] ${errMsg}${COLORS.reset}`);

    // Log Antigravity retry time if available
    if (retryAfterMs && provider === "antigravity") {
      const retrySeconds = Math.ceil(retryAfterMs / 1000);
      log?.debug?.("RETRY", `Antigravity quota reset in ${retrySeconds}s (${retryAfterMs}ms)`);
    }

    // Log error with full request body for debugging
    reqLogger.logError(new Error(message), finalBody || translatedBody);
    reqLogger.logProviderResponse(
      providerResponse.status,
      providerResponse.statusText,
      providerResponse.headers,
      upstreamErrorBody
    );

    // Update rate limiter from error response headers
    updateFromHeaders(provider, connectionId, providerResponse.headers, statusCode, model);
    if (connectionId && upstreamErrorBody !== null && upstreamErrorBody !== undefined) {
      updateFromResponseBody(provider, connectionId, upstreamErrorBody, statusCode, model);
    }

    // ── T5: Intra-family model fallback ──────────────────────────────────────
    // Before returning a model-unavailable error upstream, try sibling models
    // from the same family. This keeps the request alive on the same account
    // instead of failing the entire combo.
    if (isModelUnavailableError(statusCode, message)) {
      const nextModel = getNextFamilyFallback(currentModel, triedModels);
      if (nextModel) {
        triedModels.add(nextModel);
        currentModel = nextModel;
        translatedBody.model = nextModel;
        log?.info?.("MODEL_FALLBACK", `${model} unavailable (${statusCode}) → trying ${nextModel}`);
        // Re-execute with the fallback model
        try {
          const fallbackResult = await executeProviderRequest(nextModel, false);
          if (fallbackResult.response.ok) {
            providerResponse = fallbackResult.response;
            providerUrl = fallbackResult.url;
            providerHeaders = fallbackResult.headers;
            finalBody = fallbackResult.transformedBody;
            reqLogger.logTargetRequest(providerUrl, providerHeaders, finalBody);
            // Continue processing with the fallback response — skip error return
            log?.info?.("MODEL_FALLBACK", `Serving ${nextModel} as fallback for ${model}`);
            // Jump to streaming/non-streaming handling below
            // We fall through by NOT returning here
          } else {
            // Fallback also failed — return original error
            persistAttemptLogs({
              status: statusCode,
              error: errMsg,
              providerRequest: finalBody || translatedBody,
              providerResponse: upstreamErrorBody,
              clientResponse: buildErrorBody(statusCode, errMsg),
              cacheSource: "upstream",
            });
            persistFailureUsage(statusCode, "model_unavailable");
            return createErrorResult(statusCode, errMsg, retryAfterMs);
          }
        } catch {
          persistAttemptLogs({
            status: statusCode,
            error: errMsg,
            providerRequest: finalBody || translatedBody,
            providerResponse: upstreamErrorBody,
            clientResponse: buildErrorBody(statusCode, errMsg),
            cacheSource: "upstream",
          });
          persistFailureUsage(statusCode, "model_unavailable");
          return createErrorResult(statusCode, errMsg, retryAfterMs);
        }
      } else {
        persistAttemptLogs({
          status: statusCode,
          error: errMsg,
          providerRequest: finalBody || translatedBody,
          providerResponse: upstreamErrorBody,
          clientResponse: buildErrorBody(statusCode, errMsg),
          cacheSource: "upstream",
        });
        persistFailureUsage(statusCode, "model_unavailable");
        return createErrorResult(statusCode, errMsg, retryAfterMs);
      }
    } else if (isContextOverflowError(statusCode, message)) {
      const familyCandidates = getModelFamily(currentModel).filter(
        (m) => m !== currentModel && !triedModels.has(m)
      );
      const nextModel =
        findLargerContextModel(currentModel, familyCandidates) ??
        getNextFamilyFallback(currentModel, triedModels);
      if (nextModel) {
        triedModels.add(nextModel);
        currentModel = nextModel;
        translatedBody.model = nextModel;
        log?.info?.("CONTEXT_OVERFLOW_FALLBACK", `${model} context overflow → trying ${nextModel}`);
        try {
          const fallbackResult = await executeProviderRequest(nextModel, false);
          if (fallbackResult.response.ok) {
            providerResponse = fallbackResult.response;
            providerUrl = fallbackResult.url;
            providerHeaders = fallbackResult.headers;
            finalBody = fallbackResult.transformedBody;
            reqLogger.logTargetRequest(providerUrl, providerHeaders, finalBody);
            log?.info?.(
              "CONTEXT_OVERFLOW_FALLBACK",
              `Serving ${nextModel} as fallback for ${model}`
            );
          } else {
            persistAttemptLogs({
              status: statusCode,
              error: errMsg,
              providerRequest: finalBody || translatedBody,
              providerResponse: upstreamErrorBody,
              clientResponse: buildErrorBody(statusCode, errMsg),
              cacheSource: "upstream",
            });
            persistFailureUsage(statusCode, "context_overflow");
            return createErrorResult(statusCode, errMsg, retryAfterMs);
          }
        } catch {
          persistAttemptLogs({
            status: statusCode,
            error: errMsg,
            providerRequest: finalBody || translatedBody,
            providerResponse: upstreamErrorBody,
            clientResponse: buildErrorBody(statusCode, errMsg),
            cacheSource: "upstream",
          });
          persistFailureUsage(statusCode, "context_overflow");
          return createErrorResult(statusCode, errMsg, retryAfterMs);
        }
      } else {
        persistAttemptLogs({
          status: statusCode,
          error: errMsg,
          providerRequest: finalBody || translatedBody,
          providerResponse: upstreamErrorBody,
          clientResponse: buildErrorBody(statusCode, errMsg),
          cacheSource: "upstream",
        });
        persistFailureUsage(statusCode, "context_overflow");
        return createErrorResult(statusCode, errMsg, retryAfterMs);
      }
    } else {
      persistAttemptLogs({
        status: statusCode,
        error: errMsg,
        providerRequest: finalBody || translatedBody,
        providerResponse: upstreamErrorBody,
        clientResponse: buildErrorBody(statusCode, errMsg),
        cacheSource: "upstream",
      });
      persistFailureUsage(statusCode, `upstream_${statusCode}`);

      const requestHasTools =
        Array.isArray(translatedBody.tools) && translatedBody.tools.length > 0;
      let emergencyFallbackServed = false;

      if (!disableEmergencyFallback && !stream) {
        const fbDecision = shouldUseFallback(
          statusCode,
          message,
          requestHasTools,
          EMERGENCY_FALLBACK_CONFIG
        );
        if (isFallbackDecision(fbDecision)) {
          log?.info?.("EMERGENCY_FALLBACK", fbDecision.reason);
          try {
            const originalProvider = provider;
            const fbExecutor = getExecutor(fbDecision.provider);
            const fbResult = await fbExecutor.execute({
              model: fbDecision.model,
              body: {
                ...translatedBody,
                model: fbDecision.model,
                max_tokens: Math.min(
                  typeof translatedBody.max_tokens === "number"
                    ? translatedBody.max_tokens
                    : fbDecision.maxOutputTokens,
                  fbDecision.maxOutputTokens
                ),
                max_completion_tokens: Math.min(
                  typeof translatedBody.max_completion_tokens === "number"
                    ? translatedBody.max_completion_tokens
                    : typeof translatedBody.max_tokens === "number"
                      ? translatedBody.max_tokens
                      : fbDecision.maxOutputTokens,
                  fbDecision.maxOutputTokens
                ),
              },
              stream: false,
              credentials: credentials,
              signal: streamController.signal,
              log,
              extendedContext,
            });
            if (fbResult.response.ok) {
              provider = fbDecision.provider;
              model = fbDecision.model;
              translatedBody.model = fbDecision.model;
              providerResponse = fbResult.response;
              providerUrl = fbResult.url;
              providerHeaders = fbResult.headers;
              finalBody = fbResult.transformedBody;
              reqLogger.logTargetRequest(providerUrl, providerHeaders, finalBody);
              log?.info?.(
                "EMERGENCY_FALLBACK",
                `Serving ${fbDecision.provider}/${fbDecision.model} as budget fallback for ${originalProvider}/${requestedModel}`
              );
              emergencyFallbackServed = true;
            } else {
              log?.warn?.(
                "EMERGENCY_FALLBACK",
                `Emergency fallback also failed (${fbResult.response.status})`
              );
            }
          } catch (fbErr) {
            const errMessage = fbErr instanceof Error ? fbErr.message : String(fbErr);
            log?.warn?.("EMERGENCY_FALLBACK", `Emergency fallback error: ${errMessage}`);
          }
        }
      }

      if (!emergencyFallbackServed) {
        return createErrorResult(statusCode, errMsg, retryAfterMs);
      }
    }
    // ── End T5 ───────────────────────────────────────────────────────────────
  }

  // Non-streaming response
  if (!stream) {
    trackPendingRequest(model, provider, connectionId, false);
    const contentType = (providerResponse.headers.get("content-type") || "").toLowerCase();
    let responseBody;
    let responsePayloadFormat = targetFormat;
    const rawBody = await providerResponse.text();
    const normalizedProviderPayload = normalizePayloadForLog(rawBody);
    const looksLikeSSE =
      contentType.includes("text/event-stream") ||
      contentType.includes("application/x-ndjson") ||
      /(^|\n)\s*(event|data):/m.test(rawBody);

    if (looksLikeSSE) {
      const streamPayload = normalizeNonStreamingEventPayload(rawBody, contentType);
      const streamKind = contentType.includes("application/x-ndjson") ? "NDJSON" : "SSE";
      log?.warn?.(
        "STREAM",
        `Unexpected ${streamKind} response for non-streaming request — buffering`
      );
      // Upstream returned SSE even though stream=false; convert best-effort to JSON.
      const parsedFromSSE = parseNonStreamingSSEPayload(streamPayload, targetFormat, model);

      if (!parsedFromSSE) {
        appendRequestLog({
          model,
          provider,
          connectionId,
          status: `FAILED ${HTTP_STATUS.BAD_GATEWAY}`,
        }).catch(() => {});
        const invalidSseMessage = "Invalid SSE response for non-streaming request";
        persistAttemptLogs({
          status: HTTP_STATUS.BAD_GATEWAY,
          error: invalidSseMessage,
          providerRequest: finalBody || translatedBody,
          providerResponse: normalizedProviderPayload,
          clientResponse: buildErrorBody(HTTP_STATUS.BAD_GATEWAY, invalidSseMessage),
          cacheSource: "upstream",
        });
        persistFailureUsage(HTTP_STATUS.BAD_GATEWAY, "invalid_sse_payload");
        return createErrorResult(HTTP_STATUS.BAD_GATEWAY, invalidSseMessage);
      }

      responseBody = parsedFromSSE.body;
      responsePayloadFormat = parsedFromSSE.format;
    } else {
      try {
        responseBody = rawBody ? JSON.parse(rawBody) : {};
      } catch {
        appendRequestLog({
          model,
          provider,
          connectionId,
          status: `FAILED ${HTTP_STATUS.BAD_GATEWAY}`,
        }).catch(() => {});
        const invalidJsonMessage = "Invalid JSON response from provider";
        persistAttemptLogs({
          status: HTTP_STATUS.BAD_GATEWAY,
          error: invalidJsonMessage,
          providerRequest: finalBody || translatedBody,
          providerResponse: normalizedProviderPayload,
          clientResponse: buildErrorBody(HTTP_STATUS.BAD_GATEWAY, invalidJsonMessage),
          cacheSource: "upstream",
        });
        persistFailureUsage(HTTP_STATUS.BAD_GATEWAY, "invalid_json_payload");
        return createErrorResult(HTTP_STATUS.BAD_GATEWAY, invalidJsonMessage);
      }
    }

    // Check for empty content response (fake success) - trigger fallback
    if (isEmptyContentResponse(responseBody)) {
      appendRequestLog({
        model,
        provider,
        connectionId,
        status: `FAILED ${HTTP_STATUS.BAD_GATEWAY}`,
      }).catch(() => {});
      const emptyContentMessage = "Provider returned empty content";
      persistAttemptLogs({
        status: HTTP_STATUS.BAD_GATEWAY,
        error: emptyContentMessage,
        providerRequest: finalBody || translatedBody,
        providerResponse: normalizedProviderPayload,
        clientResponse: buildErrorBody(HTTP_STATUS.BAD_GATEWAY, emptyContentMessage),
        cacheSource: "upstream",
      });
      persistFailureUsage(HTTP_STATUS.BAD_GATEWAY, "empty_content");

      // Trigger non-recursive fallback for empty content
      const nextModel = getNextFamilyFallback(currentModel, triedModels);
      if (nextModel) {
        triedModels.add(nextModel);
        currentModel = nextModel;
        translatedBody.model = nextModel;
        log?.info?.(
          "EMPTY_CONTENT_FALLBACK",
          `${model} returned empty content → trying ${nextModel}`
        );
        try {
          const fallbackResult = await executeProviderRequest(nextModel, false);
          if (fallbackResult.response.ok) {
            const fallbackRaw = await fallbackResult.response.text();
            try {
              responseBody = fallbackRaw ? JSON.parse(fallbackRaw) : {};
              providerUrl = fallbackResult.url;
              providerHeaders = fallbackResult.headers;
              finalBody = fallbackResult.transformedBody;
              reqLogger.logTargetRequest(providerUrl, providerHeaders, finalBody);
              log?.info?.(
                "EMPTY_CONTENT_FALLBACK",
                `Serving ${nextModel} as fallback for ${model}`
              );
              // Fall through — continue processing with the new responseBody
            } catch {
              return createErrorResult(HTTP_STATUS.BAD_GATEWAY, emptyContentMessage);
            }
          } else {
            return createErrorResult(HTTP_STATUS.BAD_GATEWAY, emptyContentMessage);
          }
        } catch {
          return createErrorResult(HTTP_STATUS.BAD_GATEWAY, emptyContentMessage);
        }
      } else {
        return createErrorResult(HTTP_STATUS.BAD_GATEWAY, emptyContentMessage);
      }
    }

    const responseToolNameMap = mergeResponseToolNameMap(
      toolNameMap,
      (finalBody as Record<string, unknown> | null | undefined) ?? null
    );

    if (sourceFormat === FORMATS.CLAUDE && targetFormat === FORMATS.CLAUDE) {
      responseBody = restoreClaudePassthroughToolNames(responseBody, responseToolNameMap);
    }
    reqLogger.logProviderResponse(
      providerResponse.status,
      providerResponse.statusText,
      providerResponse.headers,
      looksLikeSSE
        ? {
            _streamed: true,
            _format: "sse-json",
            summary: responseBody,
          }
        : responseBody
    );

    // Notify success - caller can clear error status if needed
    if (onRequestSuccess) {
      await onRequestSuccess();
    }
    await maybeSyncClaudeExtraUsageState({
      provider,
      connectionId,
      providerSpecificData: credentials?.providerSpecificData,
      log,
    });

    // Log usage for non-streaming responses
    const usage = extractUsageFromResponse(responseBody, provider);
    appendRequestLog({ model, provider, connectionId, tokens: usage, status: "200 OK" }).catch(
      () => {}
    );

    // Save structured call log with full payloads
    const cacheUsageLogMeta = buildCacheUsageLogMeta(usage);
    if (usage && typeof usage === "object") {
      const msg = `[${new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })}] 📊 [USAGE] ${provider.toUpperCase()} | ${formatUsageLog(usage)}${connectionId ? ` | account=${connectionId.slice(0, 8)}...` : ""}`;
      console.log(`${COLORS.green}${msg}${COLORS.reset}`);

      // Track cache token metrics
      const inputTokens = usage.prompt_tokens || 0;
      const cachedTokens = toPositiveNumber(
        usage.cache_read_input_tokens ??
          usage.cached_tokens ??
          (
            (usage as Record<string, unknown>).prompt_tokens_details as
              | Record<string, unknown>
              | undefined
          )?.cached_tokens
      );
      const cacheCreationTokens = toPositiveNumber(
        usage.cache_creation_input_tokens ??
          (
            (usage as Record<string, unknown>).prompt_tokens_details as
              | Record<string, unknown>
              | undefined
          )?.cache_creation_tokens
      );

      saveRequestUsage({
        provider: provider || "unknown",
        model: model || "unknown",
        tokens: usage,
        status: "200",
        success: true,
        latencyMs: Date.now() - startTime,
        timeToFirstTokenMs: Date.now() - startTime,
        errorCode: null,
        timestamp: new Date().toISOString(),
        connectionId: connectionId || undefined,
        apiKeyId: apiKeyInfo?.id || undefined,
        apiKeyName: apiKeyInfo?.name || undefined,
      }).catch((err) => {
        console.error("Failed to save usage stats:", err.message);
      });
    }

    // Translate response to client's expected format (usually OpenAI)
    // Pass toolNameMap so Claude OAuth proxy_ prefix is stripped in tool_use blocks (#605)
    let translatedResponse = needsTranslation(responsePayloadFormat, clientResponseFormat)
      ? translateNonStreamingResponse(
          responseBody,
          responsePayloadFormat,
          clientResponseFormat,
          responseToolNameMap as Map<string, string> | null
        )
      : responseBody;
    const memoryExtractionResponse = translatedResponse;

    // T26: Strip markdown code blocks if provider format is Claude
    if (sourceFormat === "claude" && !stream) {
      if (typeof translatedResponse?.choices?.[0]?.message?.content === "string") {
        translatedResponse.choices[0].message.content = stripMarkdownCodeFence(
          translatedResponse.choices[0].message.content
        ) as string;
      }
    }

    // T18: Normalize finish_reason to 'tool_calls' if tool calls are present
    if (translatedResponse?.choices) {
      for (const choice of translatedResponse.choices) {
        if (
          choice.message?.tool_calls &&
          choice.message.tool_calls.length > 0 &&
          choice.finish_reason !== "tool_calls"
        ) {
          choice.finish_reason = "tool_calls";
        }
      }
    }

    // Sanitize response for OpenAI SDK compatibility
    // Strips non-standard fields (x_groq, usage_breakdown, service_tier, etc.)
    // Extracts <think> and <thinking> tags into reasoning_content
    // Source format determines output shape. If we are outputting OpenAI shape or pseudo-OpenAI shape, sanitize.
    if (clientResponseFormat === FORMATS.OPENAI_RESPONSES) {
      translatedResponse = sanitizeResponsesApiResponse(translatedResponse);
    } else if (clientResponseFormat === FORMATS.OPENAI) {
      translatedResponse = sanitizeOpenAIResponse(translatedResponse);
    }

    // Add buffer and filter usage for client (to prevent CLI context errors)
    if (translatedResponse?.usage) {
      const buffered = addBufferToUsage(translatedResponse.usage);
      translatedResponse.usage = filterUsageForFormat(buffered, clientResponseFormat);
    } else {
      // Fallback: estimate usage when provider returned no usage block
      const contentLength = JSON.stringify(
        translatedResponse?.choices?.[0]?.message?.content || ""
      ).length;
      if (contentLength > 0) {
        const estimated = estimateUsage(body, contentLength, clientResponseFormat);
        translatedResponse.usage = filterUsageForFormat(estimated, clientResponseFormat);
      }
    }

    if (memoryOwnerId && memorySettings?.enabled && memorySettings.maxTokens > 0) {
      const requestMemoryText = extractMemoryTextFromRequestBody(body as Record<string, unknown>);
      if (requestMemoryText) {
        extractFacts(requestMemoryText, memoryOwnerId, pipelineSessionId);
      }

      const memoryText = extractMemoryTextFromResponse(memoryExtractionResponse);
      if (memoryText) {
        extractFacts(memoryText, memoryOwnerId, pipelineSessionId);
      }
    }

    const customSkillExecutionEnabled =
      Boolean(memoryOwnerId) && memorySettings?.skillsEnabled === true;
    const builtinToolNames = webSearchFallbackPlan.toolName ? [webSearchFallbackPlan.toolName] : [];
    if (customSkillExecutionEnabled || builtinToolNames.length > 0) {
      const skillSessionId = pipelineSessionId;

      translatedResponse = await handleToolCallExecution(
        translatedResponse,
        getSkillsModelIdForFormat(sourceFormat),
        {
          apiKeyId: memoryOwnerId || "local",
          sessionId: skillSessionId,
          requestId: skillRequestId,
          builtinToolNames,
          customSkillExecutionEnabled,
        }
      );
    }

    const guardrailContext = {
      apiKeyInfo,
      disabledGuardrails: resolveDisabledGuardrails({
        apiKeyInfo: (apiKeyInfo as Record<string, unknown> | null) ?? null,
        body,
        headers: (clientRawRequest?.headers as Headers | Record<string, unknown> | null) ?? null,
      }),
      endpoint: clientRawRequest?.endpoint || null,
      headers: (clientRawRequest?.headers as Headers | Record<string, unknown> | null) ?? null,
      log,
      method: "POST",
      model,
      provider,
      sourceFormat: responsePayloadFormat,
      stream: false,
      targetFormat: clientResponseFormat,
    } as const;
    const postCallGuardrails = await guardrailRegistry.runPostCallHooks(
      translatedResponse,
      guardrailContext
    );
    translatedResponse = postCallGuardrails.response;

    const responseUsage =
      (usage && typeof usage === "object" ? usage : null) ||
      (translatedResponse?.usage && typeof translatedResponse.usage === "object"
        ? translatedResponse.usage
        : null);
    const estimatedCost = responseUsage ? await calculateCost(provider, model, responseUsage) : 0;

    if (postCallGuardrails.blocked) {
      const guardrailMessage = postCallGuardrails.message || "Response blocked by guardrail";
      persistAttemptLogs({
        status: HTTP_STATUS.BAD_REQUEST,
        tokens: usage,
        responseBody,
        providerRequest: finalBody || translatedBody,
        providerResponse: looksLikeSSE
          ? {
              _streamed: true,
              _format: "sse-json",
              summary: responseBody,
            }
          : responseBody,
        clientResponse: buildErrorBody(HTTP_STATUS.BAD_REQUEST, guardrailMessage),
        claudeCacheMeta: claudePromptCacheLogMeta,
        claudeCacheUsageMeta: cacheUsageLogMeta,
        cacheSource: "upstream",
      });
      if (apiKeyInfo?.id && estimatedCost > 0) {
        recordCost(apiKeyInfo.id, estimatedCost);
      }
      log?.warn?.(
        "GUARDRAIL",
        `Response blocked by ${postCallGuardrails.guardrail || "guardrail"}: ${guardrailMessage}`
      );
      return createErrorResult(HTTP_STATUS.BAD_REQUEST, guardrailMessage);
    }

    // ── Phase 9.1: Cache store (non-streaming, temp=0) ──
    if (semanticCacheEnabled && isCacheableForWrite(body, clientRawRequest?.headers)) {
      const signature = generateSignature(
        model,
        body.messages ?? body.input,
        body.temperature,
        body.top_p
      );
      const tokensSaved = usage?.prompt_tokens + usage?.completion_tokens || 0;
      setCachedResponse(signature, model, translatedResponse, tokensSaved);
      log?.debug?.("CACHE", `Stored response for ${model} (${tokensSaved} tokens)`);
    }

    // ── Phase 9.2: Save for idempotency ──
    saveIdempotency(idempotencyKey, translatedResponse, 200);
    reqLogger.logConvertedResponse(translatedResponse);
    persistAttemptLogs({
      status: 200,
      tokens: usage,
      responseBody,
      providerRequest: finalBody || translatedBody,
      providerResponse: looksLikeSSE
        ? {
            _streamed: true,
            _format: "sse-json",
            summary: responseBody,
          }
        : responseBody,
      clientResponse: translatedResponse,
      claudeCacheMeta: claudePromptCacheLogMeta,
      claudeCacheUsageMeta: cacheUsageLogMeta,
      cacheSource: "upstream",
    });
    if (apiKeyInfo?.id && estimatedCost > 0) {
      recordCost(apiKeyInfo.id, estimatedCost);
    }

    return {
      success: true,
      response: new Response(JSON.stringify(translatedResponse), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": getCorsOrigin(),
          [OMNIROUTE_RESPONSE_HEADERS.cache]: "MISS",
          ...buildOmniRouteResponseMetaHeaders({
            provider,
            model,
            cacheHit: false,
            latencyMs: Date.now() - startTime,
            usage: responseUsage,
            costUsd: estimatedCost,
          }),
        },
      }),
    };
  }

  // Streaming response

  // Notify success - caller can clear error status if needed
  if (onRequestSuccess) {
    await onRequestSuccess();
  }

  const responseHeaders = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": getCorsOrigin(),
    [OMNIROUTE_RESPONSE_HEADERS.cache]: "MISS",
    ...buildOmniRouteResponseMetaHeaders({
      provider,
      model,
      cacheHit: false,
      latencyMs: 0,
      usage: null,
      costUsd: 0,
    }),
  };

  // Create transform stream with logger for streaming response
  let transformStream;
  const responseToolNameMap = mergeResponseToolNameMap(
    toolNameMap,
    (finalBody as Record<string, unknown> | null | undefined) ?? null
  );

  // Callback to save call log when stream completes (include responseBody when provided by stream)
  const onStreamComplete = ({
    status: streamStatus,
    usage: streamUsage,
    responseBody: streamResponseBody,
    providerPayload,
    clientPayload,
    ttft,
  }) => {
    const cacheUsageLogMeta = buildCacheUsageLogMeta(streamUsage);

    if (streamStatus === 200) {
      void maybeSyncClaudeExtraUsageState({
        provider,
        connectionId,
        providerSpecificData: credentials?.providerSpecificData,
        log,
      });
    }

    // Track cache token metrics for streaming responses
    if (streamUsage && typeof streamUsage === "object") {
      const inputTokens = streamUsage.prompt_tokens || 0;
      const cachedTokens = toPositiveNumber(
        streamUsage.cache_read_input_tokens ??
          streamUsage.cached_tokens ??
          (
            (streamUsage as Record<string, unknown>).prompt_tokens_details as
              | Record<string, unknown>
              | undefined
          )?.cached_tokens
      );
      const cacheCreationTokens = toPositiveNumber(
        streamUsage.cache_creation_input_tokens ??
          (
            (streamUsage as Record<string, unknown>).prompt_tokens_details as
              | Record<string, unknown>
              | undefined
          )?.cache_creation_tokens
      );

      saveRequestUsage({
        provider: provider || "unknown",
        model: model || "unknown",
        tokens: streamUsage,
        status: String(streamStatus || 200),
        success: streamStatus === 200,
        latencyMs: Date.now() - startTime,
        timeToFirstTokenMs: ttft,
        errorCode: null,
        timestamp: new Date().toISOString(),
        connectionId: connectionId || undefined,
        apiKeyId: apiKeyInfo?.id || undefined,
        apiKeyName: apiKeyInfo?.name || undefined,
      }).catch((err) => {
        console.error("Failed to save usage stats:", err.message);
      });
    }

    persistAttemptLogs({
      status: streamStatus || 200,
      tokens: streamUsage || {},
      responseBody: streamResponseBody ?? undefined,
      providerRequest: finalBody || translatedBody,
      providerResponse: providerPayload,
      clientResponse: clientPayload ?? streamResponseBody ?? undefined,
      claudeCacheMeta: claudePromptCacheLogMeta,
      claudeCacheUsageMeta: cacheUsageLogMeta,
      cacheSource: "upstream",
    });

    if (apiKeyInfo?.id && streamUsage) {
      calculateCost(provider, model, streamUsage)
        .then((estimatedCost) => {
          if (estimatedCost > 0) recordCost(apiKeyInfo.id, estimatedCost);
        })
        .catch(() => {});
    }

    if (
      memoryOwnerId &&
      memorySettings?.enabled &&
      memorySettings.maxTokens > 0 &&
      streamStatus === 200
    ) {
      const requestMemoryText = extractMemoryTextFromRequestBody(body as Record<string, unknown>);
      if (requestMemoryText) {
        extractFacts(requestMemoryText, memoryOwnerId, pipelineSessionId);
      }

      const streamedMemoryText = extractMemoryTextFromResponse(
        (streamResponseBody ?? null) as Record<string, unknown> | null
      );
      if (streamedMemoryText) {
        extractFacts(streamedMemoryText, memoryOwnerId, pipelineSessionId);
      }
    }

    // Semantic cache: store assembled streaming response for future cache hits
    if (
      semanticCacheEnabled &&
      streamStatus === 200 &&
      streamResponseBody &&
      isCacheableForWrite(body, clientRawRequest?.headers)
    ) {
      try {
        const cleanBody = { ...streamResponseBody };
        delete cleanBody._streamed;
        const sig = generateSignature(
          model,
          body.messages ?? body.input,
          body.temperature,
          body.top_p
        );
        const u = streamUsage as Record<string, unknown> | null;
        const tokensSaved =
          (Number(u?.prompt_tokens ?? 0) || 0) + (Number(u?.completion_tokens ?? 0) || 0);
        setCachedResponse(sig, model, cleanBody, tokensSaved);
        log?.debug?.("CACHE", `Stored streaming response for ${model} (${tokensSaved} tokens)`);
      } catch {
        // Cache write failed — non-critical
      }
    }
  };

  // For providers using Responses API format, translate stream back to openai (Chat Completions) format
  // UNLESS client is Droid CLI which expects openai-responses format back
  const needsResponsesTranslation =
    targetFormat === FORMATS.OPENAI_RESPONSES &&
    clientResponseFormat === FORMATS.OPENAI &&
    !isResponsesEndpoint &&
    !isDroidCLI;

  if (needsResponsesTranslation) {
    // Provider returns openai-responses, translate to openai (Chat Completions) that clients expect
    log?.debug?.("STREAM", `Responses translation mode: openai-responses → openai`);
    transformStream = createSSETransformStreamWithLogger(
      "openai-responses",
      "openai",
      provider,
      reqLogger,
      responseToolNameMap,
      model,
      connectionId,
      body,
      onStreamComplete,
      apiKeyInfo
    );
  } else if (needsTranslation(targetFormat, clientResponseFormat)) {
    // Standard translation for other providers
    log?.debug?.("STREAM", `Translation mode: ${targetFormat} → ${clientResponseFormat}`);
    transformStream = createSSETransformStreamWithLogger(
      targetFormat,
      clientResponseFormat,
      provider,
      reqLogger,
      responseToolNameMap,
      model,
      connectionId,
      body,
      onStreamComplete,
      apiKeyInfo
    );
  } else {
    log?.debug?.("STREAM", `Standard passthrough mode`);
    transformStream = createPassthroughStreamWithLogger(
      provider,
      reqLogger,
      responseToolNameMap,
      model,
      connectionId,
      body,
      onStreamComplete,
      apiKeyInfo
    );
  }

  // ── Phase 9.3: Progress tracking (opt-in) ──
  const progressEnabled = wantsProgress(clientRawRequest?.headers);
  let finalStream;
  if (progressEnabled) {
    const progressTransform = createProgressTransform({ signal: streamController.signal });
    // Chain: provider → transform → progress → client
    const transformedBody = pipeWithDisconnect(providerResponse, transformStream, streamController);
    finalStream = transformedBody.pipeThrough(progressTransform);
    responseHeaders[OMNIROUTE_RESPONSE_HEADERS.progress] = "enabled";
  } else {
    finalStream = pipeWithDisconnect(providerResponse, transformStream, streamController);
  }

  return {
    success: true,
    response: new Response(finalStream, {
      headers: responseHeaders,
    }),
  };
}

/**
 * Check if token is expired or about to expire
 */
export function isTokenExpiringSoon(expiresAt, bufferMs = 5 * 60 * 1000) {
  if (!expiresAt) return false;
  const expiresAtMs = new Date(expiresAt).getTime();
  return expiresAtMs - Date.now() < bufferMs;
}
