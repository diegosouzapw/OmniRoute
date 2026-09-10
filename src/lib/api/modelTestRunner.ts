import { randomUUID } from "node:crypto";
import { POST as postChatCompletion } from "@/app/api/v1/chat/completions/route";
import { POST as postAudioTranscription } from "@/app/api/v1/audio/transcriptions/route";
import { handleValidatedEmbeddingRequestBody } from "@/app/api/v1/embeddings/route";
import { POST as postRerank } from "@/app/api/v1/rerank/route";
import {
  buildComboTestRequestBody,
  extractComboTestResponseText,
  extractComboTestStreamResult,
} from "@/lib/combos/testHealth";
import { getCustomModels } from "@/lib/db/models";
import { getProviderNodeById } from "@/lib/db/providers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { withRateLimit } from "@omniroute/open-sse/services/rateLimitManager";
import {
  isCreditsExhausted,
  isDailyQuotaExhausted,
} from "@omniroute/open-sse/services/accountFallback";
import { looksLikeQuotaExhausted } from "@/shared/utils/classify429";
import { getTrustedLocalRateLimitError } from "@omniroute/open-sse/services/rateLimitManager/errors";
import { runAsProbe } from "@/shared/utils/probeOrigin";
import { isConnectionUnavailableToAuxiliaryActivity } from "@/lib/exclusiveLeaseIsolation";

const INTERNAL_ORIGIN = "http://omniroute.internal";
export const DEFAULT_MODEL_TEST_TIMEOUT_MS = 30_000;
const DOLA_PRO_TEST_TIMEOUT_MS = 90_000;
const DOUBAO_WEB_PROVIDER_ID = "doubao-web";
const ZAI_WEB_PROVIDER_ID = "zai-web";
const ZAI_WEB_TEST_TIMEOUT_MS = 60_000;
const SLOW_WEB_TEST_MODELS = new Set(["dola-pro"]);
const STREAMING_CHAT_TEST_MAX_TOKENS = 64;

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function getErrorMessage(error: unknown): string {
  return sanitizeErrorMessage(error) || "Unknown error";
}

function getErrorName(error: unknown): string {
  return error instanceof Error ? error.name : "";
}

export function createModelTestTimeoutError(timeoutMs: number): Error {
  const error = new Error(`Model test deadline exceeded after ${timeoutMs}ms`);
  error.name = "TimeoutError";
  return error;
}

function extractUpstreamDetailMessage(value: unknown): string | null {
  const record = asRecord(value);
  const message = record.message;
  if (typeof message === "string" && message.trim()) return message.trim();

  const error = record.error;
  if (typeof error === "string" && error.trim()) return error.trim();

  const errorRecord = asRecord(error);
  const nestedMessage = errorRecord.message;
  if (typeof nestedMessage === "string" && nestedMessage.trim()) return nestedMessage.trim();

  const body = record.body;
  if (typeof body === "string" && body.trim()) return body.trim();

  return null;
}

function isGenericHttpProviderError(message: string): boolean {
  return /\b(?:returned|provider returned)\s+HTTP\s+\d{3}\b/i.test(message);
}

export function extractProviderErrorMessage(body: unknown, fallback: string) {
  const record = asRecord(body);
  const error = record.error;
  if (typeof error === "string" && error.trim()) return error;

  const errorRecord = asRecord(error);
  const message = errorRecord.message;
  const baseMessage = typeof message === "string" && message.trim() ? message.trim() : fallback;
  const upstreamMessage = extractUpstreamDetailMessage(record.upstream_details);
  if (
    upstreamMessage &&
    upstreamMessage !== baseMessage &&
    (isGenericHttpProviderError(baseMessage) || baseMessage === fallback)
  ) {
    return `${baseMessage}: ${sanitizeErrorMessage(upstreamMessage)}`;
  }
  return baseMessage;
}

function stripFirstSegment(modelId: string): string | null {
  const slashIdx = modelId.indexOf("/");
  return slashIdx > 0 ? modelId.slice(slashIdx + 1) : null;
}

function getModelLeafId(modelId: string): string {
  const segments = modelId.trim().toLowerCase().split("/").filter(Boolean);
  return segments[segments.length - 1] || "";
}

export function resolveModelTestTimeoutMs(
  providerId: string,
  modelId: string,
  requestedTimeoutMs: number = DEFAULT_MODEL_TEST_TIMEOUT_MS
) {
  const normalizedProviderId = providerId.trim().toLowerCase();
  const modelLeafId = getModelLeafId(modelId);

  if (normalizedProviderId === DOUBAO_WEB_PROVIDER_ID && SLOW_WEB_TEST_MODELS.has(modelLeafId)) {
    return Math.max(requestedTimeoutMs, DOLA_PRO_TEST_TIMEOUT_MS);
  }

  if (normalizedProviderId === ZAI_WEB_PROVIDER_ID) {
    return Math.max(requestedTimeoutMs, ZAI_WEB_TEST_TIMEOUT_MS);
  }

  return requestedTimeoutMs;
}

async function findCustomModelMetadata(providerId: string, modelId: string) {
  try {
    const customModels = await getCustomModels(providerId);
    if (!Array.isArray(customModels)) return null;

    const candidates = new Set([modelId]);
    const stripped = stripFirstSegment(modelId);
    if (stripped) candidates.add(stripped);
    if (modelId.startsWith(`${providerId}/`)) candidates.add(modelId.slice(providerId.length + 1));

    return (
      customModels.find(
        (model: any) => typeof model?.id === "string" && candidates.has(model.id)
      ) || null
    );
  } catch {
    return null;
  }
}

// The apiType configured on the provider node ("the account"), used as the fallback
// signal in detectTestKind. Non-node providers (e.g. "openai") simply have no row —
// resolve to undefined and let the model-level heuristics decide.
async function findProviderNodeApiType(providerId: string): Promise<string | undefined> {
  try {
    const node = (await getProviderNodeById(providerId)) as { apiType?: unknown } | null;
    return typeof node?.apiType === "string" ? node.apiType : undefined;
  } catch {
    return undefined;
  }
}

export function buildInternalChatRequest(
  testBody: Record<string, unknown>,
  signal: AbortSignal,
  connectionId?: string
) {
  return new Request(`${INTERNAL_ORIGIN}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Reuse the existing strict-mode internal bypass for live health checks.
      "X-Internal-Test": "combo-health-check",
      "X-OmniRoute-No-Cache": "true",
      // #6240: a connection test must be clean — never let the operator's globally-enabled
      // Output Styles (e.g. "Ultra terse") leak a system prompt into a test-model call.
      "X-OmniRoute-Compression": "off",
      "X-Request-Id": `model-test-${randomUUID()}`,
      ...(connectionId ? { "X-OmniRoute-Connection": connectionId } : {}),
    },
    body: JSON.stringify(testBody),
    signal,
  });
}

export function buildInternalRerankRequest(
  testBody: Record<string, unknown>,
  signal: AbortSignal,
  connectionId?: string
) {
  return new Request(`${INTERNAL_ORIGIN}/v1/rerank`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Internal-Test": "combo-health-check",
      "X-OmniRoute-No-Cache": "true",
      "X-OmniRoute-Compression": "off",
      "X-Request-Id": `model-test-${randomUUID()}`,
      ...(connectionId ? { "X-OmniRoute-Connection": connectionId } : {}),
    },
    body: JSON.stringify(testBody),
    signal,
  });
}

function buildTinyWavFile(): File {
  return new File(
    [
      new Uint8Array([
        0x52, 0x49, 0x46, 0x46, 0x24, 0x00, 0x00, 0x00, 0x57, 0x41, 0x56, 0x45, 0x66, 0x6d, 0x74,
        0x20, 0x10, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x40, 0x1f, 0x00, 0x00, 0x80, 0x3e,
        0x00, 0x00, 0x02, 0x00, 0x10, 0x00, 0x64, 0x61, 0x74, 0x61, 0x00, 0x00, 0x00, 0x00,
      ]),
    ],
    "omniroute-model-test.wav",
    { type: "audio/wav" }
  );
}

export function buildInternalAudioTranscriptionRequest(
  model: string,
  signal: AbortSignal,
  connectionId?: string
) {
  const formData = new FormData();
  formData.set("model", model);
  formData.set("file", buildTinyWavFile());

  return new Request(`${INTERNAL_ORIGIN}/v1/audio/transcriptions`, {
    method: "POST",
    headers: {
      "X-Internal-Test": "combo-health-check",
      "X-OmniRoute-No-Cache": "true",
      "X-OmniRoute-Compression": "off",
      "X-Request-Id": `model-test-${randomUUID()}`,
      ...(connectionId ? { "X-OmniRoute-Connection": connectionId } : {}),
    },
    body: formData,
    signal,
  });
}

export function detectTestKind(modelStr: string, customModel: any, nodeApiType?: string) {
  const supportedEndpoints = Array.isArray(customModel?.supportedEndpoints)
    ? customModel.supportedEndpoints
    : [];
  const apiFormat = typeof customModel?.apiFormat === "string" ? customModel.apiFormat : "";
  // Imported/synced models carry no per-model metadata — they come straight from the
  // upstream /models list and are often opaque ids. The provider node's configured
  // apiType is then the only signal for which endpoint may be probed; without it an
  // audio-only node gets tested against /chat/completions and fails with
  // "All AI backends exhausted for chat".
  const nodeType = typeof nodeApiType === "string" ? nodeApiType : "";
  const lowerModel = modelStr.toLowerCase();
  const isAudioTranscription =
    apiFormat === "audio-transcriptions" ||
    nodeType === "audio-transcriptions" ||
    supportedEndpoints.includes("audio-transcriptions");
  const isRerank =
    !isAudioTranscription &&
    (apiFormat === "rerank" ||
      nodeType === "rerank" ||
      supportedEndpoints.includes("rerank") ||
      lowerModel.includes("rerank"));
  const isEmbedding =
    !isAudioTranscription &&
    !isRerank &&
    (apiFormat === "embeddings" ||
      nodeType === "embeddings" ||
      customModel?.modelType === "embedding" ||
      supportedEndpoints.includes("embeddings") ||
      lowerModel.includes("embedding") ||
      lowerModel.includes("bge-") ||
      lowerModel.includes("text-embed") ||
      lowerModel.includes("jina-clip") ||
      lowerModel.includes("colbert") ||
      lowerModel.includes("harrier-") ||
      lowerModel.includes("nomic-embed"));
  return { isRerank, isEmbedding, isAudioTranscription };
}

/**
 * Parse a Retry-After header value (seconds-as-number or HTTP-date) into seconds.
 * Returns undefined if the value is missing or unparseable.
 */
export function parseRetryAfterHeader(value: string | null | undefined): number | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  const num = Number(trimmed);
  if (Number.isFinite(num) && num >= 0) {
    return Math.ceil(num);
  }

  const ms = Date.parse(trimmed);
  if (Number.isFinite(ms)) {
    return Math.max(0, Math.ceil((ms - Date.now()) / 1000));
  }

  return undefined;
}

export interface RunSingleModelTestOptions {
  providerId: string;
  modelId: string;
  connectionId?: string;
  timeoutMs?: number;
  streamChat?: boolean;
}

export interface SingleModelTestResult {
  modelId: string;
  status: "ok" | "error" | "rate_limited" | "slow";
  latencyMs: number;
  responseText?: string;
  statusCode?: number;
  httpStatus: number;
  error?: string;
  rateLimited?: boolean;
  isTransient?: boolean;
  isQuota?: boolean;
  isTimeout?: boolean;
  retryAfter?: number;
}

export type ModelTestResponseText = {
  text: string;
  error?: { message: string; statusCode?: number };
};

export function classifyModelTestOutput(
  timedOut: boolean,
  responseText: string,
  allowsEmptyOutput: boolean
): "ok" | "empty" | "timeout" {
  if (timedOut) return "timeout";
  if (!responseText && !allowsEmptyOutput) return "empty";
  return "ok";
}

export async function extractModelTestResponseText(
  response: Response,
  streamChat: boolean
): Promise<ModelTestResponseText> {
  const contentType = (response.headers.get("content-type") || "").toLowerCase();
  if (streamChat && !contentType.includes("application/json")) {
    return extractComboTestStreamResult(await response.text());
  }
  return { text: extractComboTestResponseText(await response.json()) };
}

function isRateLimitMessage(message: string): boolean {
  return /rate[ -]?limit|too many requests|quota exceeded/i.test(message);
}

function isBotBlockMessage(message: string): boolean {
  return /cloudflare|bot management|recaptcha|cf-chl|just a moment/i.test(message);
}

/**
 * Classify an error message for quota signals (#9511).
 *
 * Distinguishes three outcomes:
 * 1. Daily-quota exhausted → isQuota + isTransient (resets tomorrow)
 * 2. Credits/balance exhausted → isQuota only (needs top-up, not transient)
 * 3. Other errors → no quota flags (still auto-hidable)
 *
 * Reuses the routing path's existing quota vocabulary from accountFallback.ts
 * and classify429.ts instead of inventing a new vocabulary.
 */
export function classifyTestErrorQuota(errorText: string): {
  isQuota?: boolean;
  isTransient?: boolean;
} {
  const trimmed = typeof errorText === "string" ? errorText.trim() : "";
  if (!trimmed) return {};

  // Check daily-quota FIRST — it's the more specific (transient) classification
  // and should win over credits-exhausted if both match.
  if (isDailyQuotaExhausted(trimmed)) {
    return { isQuota: true, isTransient: true };
  }

  // Credits-exhausted is terminal — isQuota but NOT isTransient.
  if (isCreditsExhausted(trimmed)) {
    return { isQuota: true };
  }

  // Broad quota wording from classify429 (catches patterns not in the
  // accountFallback signals, e.g. "quota exceeded", "billing cap").
  if (looksLikeQuotaExhausted(trimmed)) {
    return { isQuota: true };
  }

  return {};
}

/**
 * Run a single model test. When `connectionId` is provided, wraps the
 * upstream call with `withRateLimit` (Bottleneck). Returns a plain
 * `SingleModelTestResult` (not an HTTP Response) so the single-test and
 * batch-test endpoints can format it differently.
 */
export async function runSingleModelTest(
  options: RunSingleModelTestOptions
): Promise<SingleModelTestResult> {
  const {
    providerId,
    modelId,
    connectionId,
    timeoutMs = DEFAULT_MODEL_TEST_TIMEOUT_MS,
    streamChat = true,
  } = options;

  if (connectionId && (await isConnectionUnavailableToAuxiliaryActivity(connectionId))) {
    const fullModelId = modelId.includes("/") ? modelId : `${providerId}/${modelId}`;
    return {
      modelId: fullModelId,
      status: "error",
      latencyMs: 0,
      httpStatus: 409,
      error: "Model tests are unavailable for managed lease connections",
    };
  }

  let fullModelStr = modelId;
  if (!fullModelStr.includes("/")) {
    fullModelStr = `${providerId}/${modelId}`;
  }
  const effectiveTimeoutMs = resolveModelTestTimeoutMs(providerId, fullModelStr, timeoutMs);

  const startTime = Date.now();
  const [customModel, nodeApiType] = await Promise.all([
    findCustomModelMetadata(providerId, fullModelStr),
    findProviderNodeApiType(providerId),
  ]);
  const { isRerank, isEmbedding, isAudioTranscription } = detectTestKind(
    fullModelStr,
    customModel,
    nodeApiType
  );

  const testBody = isRerank
    ? {
        model: fullModelStr,
        query: "What is OmniRoute?",
        documents: [
          "OmniRoute routes AI requests across configured providers.",
          "This document is unrelated to the test query.",
        ],
        top_n: 1,
        return_documents: false,
      }
    : isAudioTranscription
      ? { model: fullModelStr }
      : buildComboTestRequestBody(fullModelStr, isEmbedding, {
          stream: !isEmbedding && streamChat,
          maxTokens: !isEmbedding && streamChat ? STREAMING_CHAT_TEST_MAX_TOKENS : undefined,
        });

  // Per-model AbortController. We track whether the timeout fired so we can
  // distinguish "rate-limit queue aborted" (withRateLimit threw AbortError
  // with no timeout) from "timeout fired and aborted withRateLimit".
  const controller = new AbortController();
  let timedOut = false;
  const timeoutHandle = setTimeout(() => {
    timedOut = true;
    controller.abort(createModelTestTimeoutError(effectiveTimeoutMs));
  }, effectiveTimeoutMs);

  const runInner = async (signal: AbortSignal): Promise<Response> => {
    if (isEmbedding) {
      return handleValidatedEmbeddingRequestBody(
        testBody as Record<string, unknown> & { model: string },
        { connectionId: connectionId || undefined }
      );
    }
    if (isRerank) {
      return postRerank(buildInternalRerankRequest(testBody, signal, connectionId));
    }
    if (isAudioTranscription) {
      return postAudioTranscription(
        buildInternalAudioTranscriptionRequest(fullModelStr, signal, connectionId)
      );
    }
    return postChatCompletion(buildInternalChatRequest(testBody, signal, connectionId));
  };

  let res: Response;
  try {
    if (connectionId) {
      res = await withRateLimit(
        providerId,
        connectionId,
        fullModelStr,
        // T-PROBE: wrap the scheduled fn, not the withRateLimit call — a
        // queued Bottleneck job executes from its own async resource and
        // would otherwise run outside the probe context below.
        (signal) => runAsProbe(() => runInner(signal)),
        controller.signal
      );
    } else {
      res = await runAsProbe(() => runInner(controller.signal));
    }
  } catch (error: unknown) {
    clearTimeout(timeoutHandle);
    const latencyMs = Date.now() - startTime;
    const errorName = getErrorName(error);
    if (timedOut) {
      return {
        modelId: fullModelStr,
        status: "slow",
        latencyMs,
        httpStatus: 504,
        error: `No model output within ${Math.round(effectiveTimeoutMs / 1000)}s`,
        isTimeout: true,
      };
    }
    if (errorName === "AbortError") {
      // AbortError without timeout = withRateLimit queue rejection / abort.
      // Surface as rate_limited so the batch endpoint can stop the loop.
      return {
        modelId: fullModelStr,
        status: "rate_limited",
        latencyMs,
        httpStatus: 429,
        error: "Rate limited (queue aborted)",
        rateLimited: true,
      };
    }
    const localRateLimitFailure = getTrustedLocalRateLimitError(error);
    return {
      modelId: fullModelStr,
      status: localRateLimitFailure?.status === 429 ? "rate_limited" : "error",
      latencyMs,
      httpStatus: localRateLimitFailure?.status ?? 500,
      error: getErrorMessage(error),
      ...(localRateLimitFailure?.status === 429 ? { rateLimited: true } : {}),
    };
  }
  let latencyMs = Date.now() - startTime;

  if (timedOut) {
    clearTimeout(timeoutHandle);
    return {
      modelId: fullModelStr,
      status: "slow",
      latencyMs,
      httpStatus: 504,
      error: `No model output within ${Math.round(effectiveTimeoutMs / 1000)}s`,
      isTimeout: true,
    };
  }

  if (res.status === 429) {
    const retryAfter = parseRetryAfterHeader(res.headers.get("retry-after"));

    let errorMsg = "Rate limited";
    try {
      const errBody = await res.json();
      errorMsg = extractProviderErrorMessage(errBody, res.statusText || errorMsg);
    } catch {
      errorMsg = res.statusText || errorMsg;
    }
    const result: SingleModelTestResult = {
      modelId: fullModelStr,
      status: "rate_limited",
      latencyMs,
      statusCode: res.status,
      httpStatus: res.status,
      error: errorMsg,
      rateLimited: true,
      ...(retryAfter !== undefined ? { retryAfter } : {}),
    };
    clearTimeout(timeoutHandle);
    return result;
  }

  if (res.ok) {
    let responseText = "";
    let streamError: ModelTestResponseText["error"];
    try {
      // T-PROBE: consume the stream inside the probe context too — the SSE
      // body is transformed by chatCore/chatHelpers generator code that
      // resumes in the CONSUMER's async context. Without this wrapper, an
      // error frame inside a 200 stream (Sentinel blocks, "account
      // deactivated") would run outside runAsProbe and could still reach
      // markAccountUnavailable (#9817).
      const parsedResponse = await runAsProbe(() =>
        extractModelTestResponseText(res, !isEmbedding && !isRerank && streamChat)
      );
      responseText = parsedResponse.text;
      streamError = parsedResponse.error;
    } catch {
      responseText = "";
    } finally {
      clearTimeout(timeoutHandle);
    }
    latencyMs = Date.now() - startTime;
    if (streamError) {
      const error = sanitizeErrorMessage(streamError.message) || "Upstream stream failed";
      const rateLimited = streamError.statusCode === 429 || isRateLimitMessage(error);
      // #9511: Check quota BEFORE bot-block — 403 with quota wording is a quota
      // error, not a bot-block. A bare 403 status without quota/bot wording still
      // falls through to the generic error branch.
      const quotaFlags = classifyTestErrorQuota(error);
      const isBotBlock =
        !quotaFlags.isQuota && (streamError.statusCode === 403 || isBotBlockMessage(error));
      return {
        modelId: fullModelStr,
        status: rateLimited ? "rate_limited" : "error",
        latencyMs,
        ...(streamError.statusCode !== undefined ? { statusCode: streamError.statusCode } : {}),
        httpStatus: streamError.statusCode ?? 502,
        error,
        ...(rateLimited ? { rateLimited: true } : {}),
        ...(rateLimited || isBotBlock || quotaFlags.isTransient ? { isTransient: true } : {}),
        ...(quotaFlags.isQuota ? { isQuota: true } : {}),
      };
    }
    const outputState = classifyModelTestOutput(timedOut, responseText, isEmbedding || isRerank);
    // A streaming response can yield partial text just as the test timeout
    // aborts the underlying request. Partial output does not make an aborted
    // request healthy: the call log correctly records that race as 499, so
    // the model-test result must remain a timeout instead of turning green.
    if (outputState === "timeout") {
      return {
        modelId: fullModelStr,
        status: "slow",
        latencyMs,
        httpStatus: 504,
        error: `No model output within ${Math.round(effectiveTimeoutMs / 1000)}s`,
        isTimeout: true,
      };
    }
    if (isRerank) {
      return {
        modelId: fullModelStr,
        status: "ok",
        latencyMs,
        httpStatus: 200,
        responseText: "[Rerank completed successfully]",
      };
    }
    if (outputState === "empty") {
      return {
        modelId: fullModelStr,
        status: "error",
        latencyMs,
        statusCode: res.status,
        httpStatus: 400,
        error: "Provider returned HTTP 200 but no text content.",
      };
    }
    return {
      modelId: fullModelStr,
      status: "ok",
      latencyMs,
      httpStatus: 200,
      responseText,
    };
  }

  let errorMsg = "";
  try {
    const errBody = await res.json();
    errorMsg = extractProviderErrorMessage(errBody, res.statusText);
  } catch {
    errorMsg = res.statusText;
  } finally {
    clearTimeout(timeoutHandle);
  }
  // #9511: classify quota signals on the generic error branch so that
  // 401/402/403 "insufficient balance" / "quota exhausted" errors are
  // NOT auto-hidden by Test All.
  const quotaFlags = classifyTestErrorQuota(errorMsg);
  return {
    modelId: fullModelStr,
    status: "error",
    latencyMs,
    statusCode: res.status,
    httpStatus: res.status,
    error: errorMsg,
    ...(quotaFlags.isTransient ? { isTransient: true } : {}),
    ...(quotaFlags.isQuota ? { isQuota: true } : {}),
  };
}
