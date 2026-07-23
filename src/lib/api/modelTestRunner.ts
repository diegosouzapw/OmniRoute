import { randomUUID } from "node:crypto";
import { POST as postChatCompletion } from "@/app/api/v1/chat/completions/route";
import { handleValidatedEmbeddingRequestBody } from "@/app/api/v1/embeddings/route";
import { POST as postRerank } from "@/app/api/v1/rerank/route";
import {
  buildComboTestRequestBody,
  extractComboTestResponseText,
  extractComboTestStreamResult,
} from "@/lib/combos/testHealth";
import { getCustomModels } from "@/lib/localDb";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { withRateLimit } from "@omniroute/open-sse/services/rateLimitManager";

const INTERNAL_ORIGIN = "http://omniroute.internal";
export const DEFAULT_MODEL_TEST_TIMEOUT_MS = 30_000;
const DOLA_PRO_TEST_TIMEOUT_MS = 90_000;
const GITHUB_PHI_REASONING_TEST_TIMEOUT_MS = 60_000;
const DOUBAO_WEB_PROVIDER_ID = "doubao-web";
const GITHUB_MODELS_PROVIDER_ID = "github-models";
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

  if (normalizedProviderId === GITHUB_MODELS_PROVIDER_ID && modelLeafId === "phi-4-reasoning") {
    return Math.max(requestedTimeoutMs, GITHUB_PHI_REASONING_TEST_TIMEOUT_MS);
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

export function buildInternalChatRequest(testBody: Record<string, unknown>, signal: AbortSignal) {
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
    },
    body: JSON.stringify(testBody),
    signal,
  });
}

export function buildInternalRerankRequest(testBody: Record<string, unknown>, signal: AbortSignal) {
  return new Request(`${INTERNAL_ORIGIN}/v1/rerank`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Internal-Test": "combo-health-check",
      "X-OmniRoute-No-Cache": "true",
      "X-OmniRoute-Compression": "off",
      "X-Request-Id": `model-test-${randomUUID()}`,
    },
    body: JSON.stringify(testBody),
    signal,
  });
}

export function detectTestKind(modelStr: string, customModel: any) {
  const supportedEndpoints = Array.isArray(customModel?.supportedEndpoints)
    ? customModel.supportedEndpoints
    : [];
  const apiFormat = typeof customModel?.apiFormat === "string" ? customModel.apiFormat : "";
  const lowerModel = modelStr.toLowerCase();
  const isRerank =
    apiFormat === "rerank" ||
    supportedEndpoints.includes("rerank") ||
    lowerModel.includes("rerank");
  const isEmbedding =
    !isRerank &&
    (apiFormat === "embeddings" ||
      supportedEndpoints.includes("embeddings") ||
      lowerModel.includes("embedding") ||
      lowerModel.includes("bge-") ||
      lowerModel.includes("text-embed") ||
      lowerModel.includes("jina-clip") ||
      lowerModel.includes("colbert"));
  return { isRerank, isEmbedding };
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
  isTimeout?: boolean;
  retryAfter?: number;
}

export type ModelTestResponseText = {
  text: string;
  error?: { message: string; statusCode?: number };
};

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

  let fullModelStr = modelId;
  if (!fullModelStr.includes("/")) {
    fullModelStr = `${providerId}/${modelId}`;
  }
  const effectiveTimeoutMs = resolveModelTestTimeoutMs(providerId, fullModelStr, timeoutMs);

  const startTime = Date.now();
  const customModel = await findCustomModelMetadata(providerId, fullModelStr);
  const { isRerank, isEmbedding } = detectTestKind(fullModelStr, customModel);

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
    controller.abort();
  }, effectiveTimeoutMs);

  const runInner = async (signal: AbortSignal): Promise<Response> => {
    if (isEmbedding) {
      return handleValidatedEmbeddingRequestBody(
        testBody as Record<string, unknown> & { model: string },
        { connectionId: connectionId || undefined }
      );
    }
    if (isRerank) {
      return postRerank(buildInternalRerankRequest(testBody, signal));
    }
    return postChatCompletion(buildInternalChatRequest(testBody, signal));
  };

  let res: Response;
  try {
    if (connectionId) {
      res = await withRateLimit(
        providerId,
        connectionId,
        fullModelStr,
        (signal) => runInner(signal),
        controller.signal
      );
    } else {
      res = await runInner(controller.signal);
    }
  } catch (error: unknown) {
    clearTimeout(timeoutHandle);
    const latencyMs = Date.now() - startTime;
    const errorName = getErrorName(error);
    if (errorName === "AbortError") {
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
    return {
      modelId: fullModelStr,
      status: "error",
      latencyMs,
      httpStatus: 500,
      error: getErrorMessage(error),
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
      const parsedResponse = await extractModelTestResponseText(
        res,
        !isEmbedding && !isRerank && streamChat
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
      const isBotBlock = streamError.statusCode === 403 || isBotBlockMessage(error);
      return {
        modelId: fullModelStr,
        status: rateLimited ? "rate_limited" : "error",
        latencyMs,
        ...(streamError.statusCode !== undefined ? { statusCode: streamError.statusCode } : {}),
        httpStatus: streamError.statusCode ?? 502,
        error,
        ...(rateLimited ? { rateLimited: true } : {}),
        ...(rateLimited || isBotBlock ? { isTransient: true } : {}),
      };
    }
    if (timedOut && !responseText) {
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
    if (!responseText && !isEmbedding) {
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
  return {
    modelId: fullModelStr,
    status: "error",
    latencyMs,
    statusCode: res.status,
    httpStatus: res.status,
    error: errorMsg,
  };
}
