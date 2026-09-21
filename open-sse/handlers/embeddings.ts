/**
 * Embedding Handler
 *
 * Handles POST /v1/embeddings requests and normalizes provider responses to the
 * OpenAI embedding shape.
 */

import {
  getEmbeddingProvider,
  getEmbeddingModelDefaultParams,
  getEmbeddingModelModalities,
  parseEmbeddingModel,
  type EmbeddingModality,
  type EmbeddingProvider,
} from "../config/embeddingRegistry.ts";
import { saveCallLog } from "@/lib/usageDb";
import { createRequestLogger } from "../utils/requestLogger.ts";
import { isDetailedLoggingEnabled } from "@/lib/db/detailedLogs";
import { getCallLogPipelineCaptureStreamChunks } from "@/lib/logEnv";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";
import { stripStaleEncodingHeaders } from "../utils/upstreamResponseHeaders.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import { stripTrailingSlashes } from "../utils/urlSanitize.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { fetchRemoteImage } from "@/shared/network/remoteImageFetch";
import {
  hasStructuredEmbeddingInput,
  normalizeClovaEmbeddingV2Response,
  prepareJinaMixedEmbeddingInput,
  prepareStructuredEmbeddingRequest,
} from "./embeddingStructuredInput.ts";
import { MAX_EMBEDDING_INLINE_ITEM_BYTES } from "@/shared/validation/schemas/apiV1";
import { markAccountUnavailable } from "../../src/sse/services/auth.ts";
import {
  collectJinaNativeModalities,
  isJinaNativeEmbeddingInput,
} from "@/shared/validation/jinaNativeEmbeddingInput";
import {
  collectGeminiNativeModalities,
  isGeminiEmbedding2Family,
  isGeminiNativeEmbeddingInput,
} from "@/shared/validation/geminiNativeEmbeddingInput";

interface ClientRawRequest {
  endpoint: string;
  body: Record<string, unknown>;
  headers: Record<string, string>;
}

interface EmbeddingCredentials {
  apiKey?: string | null;
  accessToken?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
}

interface EmbeddingLog {
  info: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
}

interface HandleEmbeddingParams {
  body: Record<string, unknown>;
  credentials: EmbeddingCredentials | null;
  log?: EmbeddingLog;
  resolvedProvider?: EmbeddingProvider | null;
  resolvedModel?: string | null;
  clientRawRequest?: ClientRawRequest | null;
  apiKeyId?: string | null;
  apiKeyName?: string | null;
  connectionId?: string | null;
}

interface EmbeddingFailure {
  success: false;
  status: number;
  error: string;
  headers?: Headers;
  data?: never;
}

interface EmbeddingSuccess {
  success: true;
  data: Record<string, unknown>;
  headers: Headers;
  status?: never;
  error?: never;
}

type EmbeddingResult = EmbeddingSuccess | EmbeddingFailure;

interface ResolvedEmbedding {
  provider: string | null;
  model: string | null;
  providerConfig: EmbeddingProvider | null;
}

type RequestLogger = Awaited<ReturnType<typeof createRequestLogger>>;
type ProviderResponseNormalizer =
  ((data: Record<string, unknown>) => Record<string, unknown>) | null;

interface EmbeddingRuntime extends HandleEmbeddingParams {
  provider: string;
  model: string | null;
  providerConfig: EmbeddingProvider;
  startTime: number;
  detailedLoggingEnabled: boolean;
  reqLogger: RequestLogger;
  logRequestBody: Record<string, unknown>;
}

interface PreparedEmbeddingRequest {
  upstreamBody: Record<string, unknown>;
  upstreamUrl: string;
  headers: Record<string, string>;
  normalizeProviderResponse: ProviderResponseNormalizer;
}

interface ParsedEmbeddingResponse {
  data?: unknown[] | unknown;
  usage?: { prompt_tokens?: number; total_tokens?: number };
}

const KNOWN_EMBEDDING_FIELDS = new Set(["model", "input", "dimensions", "encoding_format"]);

/** Unwrap one redundant row around an otherwise flat vector. */
function flattenSingleRowEmbedding(item: unknown): void {
  if (!item || typeof item !== "object" || !("embedding" in item)) return;
  const record = item as { embedding: unknown };
  const embedding = record.embedding;
  if (
    Array.isArray(embedding) &&
    embedding.length === 1 &&
    Array.isArray(embedding[0]) &&
    typeof embedding[0][0] === "number"
  ) {
    record.embedding = embedding[0];
  }
}

function failure(status: number, error: string, headers?: Headers): EmbeddingFailure {
  return { success: false, status, error, ...(headers ? { headers } : {}) };
}

function resolveEmbedding(params: HandleEmbeddingParams): ResolvedEmbedding {
  if (params.resolvedProvider) {
    return {
      provider: params.resolvedProvider.id,
      model: params.resolvedModel ?? null,
      providerConfig: params.resolvedProvider,
    };
  }
  const parsed = parseEmbeddingModel(params.body.model as string);
  return {
    provider: parsed.provider,
    model: parsed.model,
    providerConfig: parsed.provider ? getEmbeddingProvider(parsed.provider) : null,
  };
}

async function createEmbeddingRuntime(
  params: HandleEmbeddingParams,
  resolved: ResolvedEmbedding
): Promise<EmbeddingRuntime | EmbeddingFailure> {
  const detailedLoggingEnabled = await isDetailedLoggingEnabled();
  const reqLogger = await createRequestLogger(
    resolved.provider || "openai",
    "openai",
    params.body.model as string,
    {
      enabled: detailedLoggingEnabled,
      captureStreamChunks: getCallLogPipelineCaptureStreamChunks(),
      connectionId: params.connectionId || undefined,
      model: resolved.model || (params.body.model as string),
      provider: resolved.provider || undefined,
    }
  );

  if (params.clientRawRequest) {
    reqLogger.logClientRawRequest(
      params.clientRawRequest.endpoint,
      params.clientRawRequest.body,
      params.clientRawRequest.headers
    );
  }
  if (!resolved.provider) {
    return failure(
      400,
      `Invalid embedding model: ${params.body.model}. Use format: provider/model`
    );
  }
  if (!resolved.providerConfig) {
    return failure(400, `Unknown embedding provider: ${resolved.provider}`);
  }

  return {
    ...params,
    provider: resolved.provider,
    model: resolved.model,
    providerConfig: resolved.providerConfig,
    startTime: Date.now(),
    detailedLoggingEnabled,
    reqLogger,
    logRequestBody: {
      model: params.body.model,
      input_count: Array.isArray(params.body.input) ? params.body.input.length : 1,
      dimensions: params.body.dimensions || undefined,
    },
  };
}

function collectRequestedModalities(body: Record<string, unknown>): {
  structuredItems: Array<{ type: EmbeddingModality }>;
  nativeModalities: EmbeddingModality[];
} {
  const structuredItems = Array.isArray(body.input)
    ? body.input.filter(
        (item): item is { type: EmbeddingModality } =>
          typeof item === "object" && item !== null && "type" in item
      )
    : [];
  const nativeModalities = [
    ...(isJinaNativeEmbeddingInput(body.input) ? collectJinaNativeModalities(body.input) : []),
    ...(isGeminiNativeEmbeddingInput(body.input) ? collectGeminiNativeModalities(body.input) : []),
  ].filter((modality): modality is EmbeddingModality => modality !== "text");
  return { structuredItems, nativeModalities };
}

function validateRequestedModalities(runtime: EmbeddingRuntime): EmbeddingFailure | null {
  const { structuredItems, nativeModalities } = collectRequestedModalities(runtime.body);
  if (structuredItems.length === 0 && nativeModalities.length === 0) return null;

  const supported = getEmbeddingModelModalities(runtime.providerConfig, runtime.model);
  if (!supported) {
    return failure(
      400,
      `Embedding model ${runtime.body.model} does not advertise structured embedding input support`
    );
  }
  const unsupportedCanonical = structuredItems.find((item) => !supported.includes(item.type));
  if (unsupportedCanonical) {
    return failure(
      400,
      `Embedding model ${runtime.body.model} does not support ${unsupportedCanonical.type} input`
    );
  }
  const unsupportedNative = nativeModalities.find((modality) => !supported.includes(modality));
  return unsupportedNative
    ? failure(
        400,
        `Embedding model ${runtime.body.model} does not support ${unsupportedNative} input`
      )
    : null;
}

function buildUpstreamBody(runtime: EmbeddingRuntime): Record<string, unknown> {
  const upstreamBody: Record<string, unknown> = {
    model: runtime.model,
    input: runtime.body.input,
  };
  if (runtime.body.dimensions !== undefined) upstreamBody.dimensions = runtime.body.dimensions;
  if (runtime.body.encoding_format !== undefined) {
    upstreamBody.encoding_format = runtime.body.encoding_format;
  }
  for (const [key, value] of Object.entries(runtime.body)) {
    if (!KNOWN_EMBEDDING_FIELDS.has(key) && value !== undefined) upstreamBody[key] = value;
  }

  if (runtime.provider === "gemini" && upstreamBody.outputDimensionality === undefined) {
    const outputDimensionality = Number(runtime.body.dimensions);
    if (Number.isFinite(outputDimensionality) && outputDimensionality > 0) {
      upstreamBody.outputDimensionality = outputDimensionality;
    }
  }
  const defaultParams = getEmbeddingModelDefaultParams(runtime.providerConfig, runtime.model);
  for (const [key, value] of Object.entries(defaultParams ?? {})) {
    if (upstreamBody[key] === undefined) upstreamBody[key] = value;
  }
  return upstreamBody;
}

function resolveLocalEmbeddingUrl(runtime: EmbeddingRuntime): string {
  const configuredBaseUrl = runtime.credentials?.providerSpecificData?.baseUrl;
  const rawBaseUrl =
    typeof configuredBaseUrl === "string" && configuredBaseUrl.trim()
      ? configuredBaseUrl
      : runtime.providerConfig.baseUrl;
  const trimmed = stripTrailingSlashes(rawBaseUrl.trim());
  if (trimmed.toLowerCase().endsWith("/embeddings")) {
    return trimmed;
  }
  const localServerHost = trimmed
    .replace(/\/v1\/chat\/completions$/i, "")
    .replace(/\/chat\/completions$/i, "")
    .replace(/\/api\/chat$/i, "")
    .replace(/\/v1$/i, "");
  return `${localServerHost}/v1/embeddings`;
}

function isLocalEmbeddingProvider(provider: string): boolean {
  return (
    provider === "ollama-local" ||
    provider === "lmstudio" ||
    provider === "llama-cpp" ||
    provider === "llamacpp" ||
    provider === "lemonade"
  );
}

function resolveUpstreamUrl(runtime: EmbeddingRuntime): string {
  return isLocalEmbeddingProvider(runtime.provider)
    ? resolveLocalEmbeddingUrl(runtime)
    : runtime.providerConfig.baseUrl;
}

function buildAuth(
  runtime: EmbeddingRuntime
): { headers: Record<string, string>; token: string | null } | EmbeddingFailure {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const token = runtime.credentials?.apiKey || runtime.credentials?.accessToken || null;
  if (!token && runtime.providerConfig.authType !== "none") {
    return failure(
      401,
      `No valid authentication token for provider ${runtime.provider}. Check provider credentials.`
    );
  }
  if (token && runtime.providerConfig.authHeader === "bearer") {
    headers.Authorization = `Bearer ${token}`;
  } else if (token && runtime.providerConfig.authHeader === "x-api-key") {
    headers["x-api-key"] = token;
  }
  return { headers, token };
}

async function fetchEmbeddingMedia(
  url: string
): Promise<{ buffer: Buffer; contentType: string | null }> {
  const result = await fetchRemoteImage(url, {
    guard: "public-only",
    maxBytes: MAX_EMBEDDING_INLINE_ITEM_BYTES,
    pinDns: true,
  });
  return { buffer: result.buffer, contentType: result.contentType || null };
}

async function prepareMixedJinaInput(
  runtime: EmbeddingRuntime,
  prepared: PreparedEmbeddingRequest
): Promise<void> {
  const mixed = Array.isArray(runtime.body.input) ? runtime.body.input : [runtime.body.input];
  prepared.upstreamBody.input = await prepareJinaMixedEmbeddingInput(mixed, fetchEmbeddingMedia);
}

async function prepareNativeTransport(
  runtime: EmbeddingRuntime,
  prepared: PreparedEmbeddingRequest,
  token: string | null
): Promise<void> {
  if (!runtime.model) {
    throw new Error(`Invalid embedding model: ${runtime.body.model}. Use format: provider/model`);
  }
  const native = await prepareStructuredEmbeddingRequest(
    runtime.providerConfig,
    runtime.model,
    runtime.body,
    token ?? "",
    { fetchMedia: fetchEmbeddingMedia }
  );
  prepared.upstreamBody = native.body;
  prepared.upstreamUrl = native.url;
  prepared.normalizeProviderResponse = native.normalizeResponse ?? null;
  if (native.authHeader) {
    delete prepared.headers.Authorization;
    delete prepared.headers["x-api-key"];
    prepared.headers[native.authHeader.name] = native.authHeader.value;
  }
}

async function applyStructuredTransport(
  runtime: EmbeddingRuntime,
  prepared: PreparedEmbeddingRequest,
  token: string | null
): Promise<void> {
  const jinaNative = isJinaNativeEmbeddingInput(runtime.body.input);
  const geminiNative = isGeminiNativeEmbeddingInput(runtime.body.input);
  const canonical = hasStructuredEmbeddingInput(runtime.body.input);
  const isJinaProtocol = runtime.providerConfig.structuredInputProtocol === "jina-v1";
  const passThroughJina = isJinaProtocol && jinaNative && !canonical;
  const useGeminiNative =
    runtime.providerConfig.structuredInputProtocol === "gemini-embed-content" &&
    (isGeminiEmbedding2Family(runtime.model) || canonical || geminiNative || jinaNative);

  if (isJinaProtocol && jinaNative && canonical) {
    await prepareMixedJinaInput(runtime, prepared);
  } else if (useGeminiNative || (!passThroughJina && canonical)) {
    await prepareNativeTransport(runtime, prepared, token);
  }
}

async function prepareEmbeddingRequest(
  runtime: EmbeddingRuntime
): Promise<PreparedEmbeddingRequest | EmbeddingFailure> {
  const auth = buildAuth(runtime);
  if ("success" in auth) return auth;
  const prepared: PreparedEmbeddingRequest = {
    upstreamBody: buildUpstreamBody(runtime),
    upstreamUrl: resolveUpstreamUrl(runtime),
    headers: auth.headers,
    normalizeProviderResponse: null,
  };
  try {
    await applyStructuredTransport(runtime, prepared, auth.token);
    return prepared;
  } catch (error) {
    return failure(400, sanitizeErrorMessage(error));
  }
}

async function enforceEmbeddingQuota(runtime: EmbeddingRuntime): Promise<EmbeddingFailure | null> {
  if (!runtime.apiKeyId || !runtime.connectionId) return null;
  try {
    const { enforceQuotaShare } = await import("@/lib/quota/enforce");
    const decision = await enforceQuotaShare({
      apiKeyId: runtime.apiKeyId,
      connectionId: runtime.connectionId,
      provider: runtime.provider,
      model: runtime.model || undefined,
    });
    return decision.kind === "block"
      ? failure(decision.httpStatus ?? 429, decision.reason || "Quota share limit reached")
      : null;
  } catch {
    return null;
  }
}

function resolveSingleTexts(runtime: EmbeddingRuntime): string[] | EmbeddingFailure | null {
  if (runtime.providerConfig.singleTextProtocol !== "clova-v2") return null;
  const input = Array.isArray(runtime.body.input) ? runtime.body.input : [runtime.body.input];
  if (
    input.length === 0 ||
    input.some((item) => typeof item !== "string" || item.trim().length === 0)
  ) {
    return failure(400, "CLOVA Studio embedding v2 accepts non-empty text strings only");
  }
  if (runtime.body.encoding_format === "base64") {
    return failure(400, "CLOVA Studio embedding v2 supports float encoding only");
  }
  if (runtime.body.dimensions !== undefined && Number(runtime.body.dimensions) !== 1024) {
    return failure(400, "CLOVA Studio embedding v2 has a fixed dimension of 1024");
  }
  return input as string[];
}

function appendClovaEmbedding(
  parsed: ParsedEmbeddingResponse,
  embeddings: Array<Record<string, unknown>>,
  usage: { prompt_tokens: number; total_tokens: number }
): void {
  if (!Array.isArray(parsed.data)) {
    throw new Error("CLOVA Studio embedding v2 returned an invalid data list");
  }
  for (const item of parsed.data) {
    flattenSingleRowEmbedding(item);
    if (!item || typeof item !== "object") {
      throw new Error("CLOVA Studio embedding v2 returned an invalid embedding item");
    }
    (item as { index?: number }).index = embeddings.length;
    embeddings.push(item as Record<string, unknown>);
  }
  usage.prompt_tokens += parsed.usage?.prompt_tokens || parsed.usage?.total_tokens || 0;
  usage.total_tokens += parsed.usage?.total_tokens || parsed.usage?.prompt_tokens || 0;
}

async function fetchClovaEmbeddingBatch(
  prepared: PreparedEmbeddingRequest,
  texts: string[],
  reqLogger: RequestLogger
): Promise<Response> {
  const embeddings: Array<Record<string, unknown>> = [];
  const usage = { prompt_tokens: 0, total_tokens: 0 };
  let lastHeaders = new Headers();
  for (const text of texts) {
    const requestBody = { text };
    reqLogger.logTargetRequest(prepared.upstreamUrl, prepared.headers, requestBody);
    const response = await fetch(prepared.upstreamUrl, {
      method: "POST",
      headers: prepared.headers,
      body: JSON.stringify(requestBody),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    lastHeaders = response.headers;
    if (!response.ok) return response;
    const rawData = (await response.json()) as Record<string, unknown>;
    appendClovaEmbedding(normalizeClovaEmbeddingV2Response(rawData), embeddings, usage);
  }
  return new Response(JSON.stringify({ data: embeddings, usage }), {
    status: 200,
    headers: lastHeaders,
  });
}

async function dispatchEmbeddingRequest(
  prepared: PreparedEmbeddingRequest,
  singleTexts: string[] | null,
  reqLogger: RequestLogger
): Promise<Response> {
  if (singleTexts) return fetchClovaEmbeddingBatch(prepared, singleTexts, reqLogger);
  reqLogger.logTargetRequest(prepared.upstreamUrl, prepared.headers, prepared.upstreamBody);
  return fetch(prepared.upstreamUrl, {
    method: "POST",
    headers: prepared.headers,
    body: JSON.stringify(prepared.upstreamBody),
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
}

function pipelinePayloads(
  runtime: EmbeddingRuntime
): ReturnType<RequestLogger["getPipelinePayloads"]> | null {
  return runtime.detailedLoggingEnabled ? runtime.reqLogger.getPipelinePayloads() : null;
}

async function handleUpstreamFailure(
  runtime: EmbeddingRuntime,
  response: Response
): Promise<EmbeddingFailure> {
  const errorText = await response.text();
  runtime.log?.error(
    "EMBED",
    `${runtime.provider} error ${response.status}: ${errorText.slice(0, 200)}`
  );
  runtime.reqLogger.logProviderResponse(
    response.status,
    "",
    response.headers,
    errorText.slice(0, 500)
  );
  runtime.reqLogger.logConvertedResponse(
    toJsonErrorPayload(errorText.slice(0, 500), "Embedding provider error")
  );
  saveCallLog({
    method: "POST",
    path: "/v1/embeddings",
    status: response.status,
    model: `${runtime.provider}/${runtime.model}`,
    provider: runtime.provider,
    duration: Date.now() - runtime.startTime,
    error: errorText.slice(0, 500),
    requestBody: runtime.logRequestBody,
    pipelinePayloads: pipelinePayloads(runtime),
    apiKeyId: runtime.apiKeyId,
    apiKeyName: runtime.apiKeyName,
    connectionId: runtime.connectionId,
  }).catch(() => {});
  if (runtime.connectionId) {
    try {
      await markAccountUnavailable(
        runtime.connectionId,
        response.status,
        errorText,
        runtime.provider,
        runtime.model
      );
    } catch {
      // The upstream response has priority over a best-effort cooldown write.
    }
  }
  return failure(response.status, errorText, stripStaleEncodingHeaders(response.headers));
}

function normalizeEmbeddingData(
  runtime: EmbeddingRuntime,
  response: Response,
  rawData: Record<string, unknown>,
  normalizer: ProviderResponseNormalizer
): { data: ParsedEmbeddingResponse; normalizedResponse: Record<string, unknown> } {
  const data = (normalizer ? normalizer(rawData) : rawData) as ParsedEmbeddingResponse;
  runtime.reqLogger.logProviderResponse(response.status, "", response.headers, data);
  const responseItems = data.data || data;
  if (Array.isArray(responseItems)) responseItems.forEach(flattenSingleRowEmbedding);
  return {
    data,
    normalizedResponse: {
      object: "list",
      data: data.data || data,
      model:
        typeof runtime.body.model === "string" && !runtime.body.model.includes("/")
          ? runtime.body.model
          : `${runtime.provider}/${runtime.model}`,
      usage: data.usage || { prompt_tokens: 0, total_tokens: 0 },
    },
  };
}

function recordEmbeddingSuccess(
  runtime: EmbeddingRuntime,
  data: ParsedEmbeddingResponse,
  normalizedResponse: Record<string, unknown>
): void {
  runtime.reqLogger.logConvertedResponse(normalizedResponse);
  saveCallLog({
    method: "POST",
    path: "/v1/embeddings",
    status: 200,
    model: `${runtime.provider}/${runtime.model}`,
    provider: runtime.provider,
    duration: Date.now() - runtime.startTime,
    tokens: {
      prompt_tokens: data.usage?.prompt_tokens || data.usage?.total_tokens || 0,
      completion_tokens: 0,
    },
    requestBody: runtime.logRequestBody,
    responseBody: {
      usage: data.usage || null,
      object: "list",
      data_count: Array.isArray(data.data) ? data.data.length : 0,
    },
    pipelinePayloads: pipelinePayloads(runtime),
    apiKeyId: runtime.apiKeyId,
    apiKeyName: runtime.apiKeyName,
    connectionId: runtime.connectionId,
  }).catch(() => {});
}

async function recordEmbeddingConsumption(
  runtime: EmbeddingRuntime,
  data: ParsedEmbeddingResponse,
  requestCount: number
): Promise<void> {
  if (!runtime.apiKeyId || !runtime.connectionId) return;
  try {
    const { scheduleRecordConsumption } = await import("@/lib/quota/spendRecorder");
    scheduleRecordConsumption({
      apiKeyId: runtime.apiKeyId,
      connectionId: runtime.connectionId,
      provider: runtime.provider,
      model: runtime.model || undefined,
      cost: {
        tokens: data.usage?.prompt_tokens || data.usage?.total_tokens || 0,
        requests: requestCount,
      },
    });
  } catch {
    // Quota accounting is fail-open.
  }
}

async function handleUpstreamSuccess(
  runtime: EmbeddingRuntime,
  prepared: PreparedEmbeddingRequest,
  response: Response,
  requestCount: number
): Promise<EmbeddingSuccess> {
  const rawData = (await response.json()) as Record<string, unknown>;
  const { data, normalizedResponse } = normalizeEmbeddingData(
    runtime,
    response,
    rawData,
    prepared.normalizeProviderResponse
  );
  recordEmbeddingSuccess(runtime, data, normalizedResponse);
  await recordEmbeddingConsumption(runtime, data, requestCount);
  return {
    success: true,
    data: normalizedResponse,
    headers: stripStaleEncodingHeaders(response.headers),
  };
}

function handleEmbeddingException(
  runtime: EmbeddingRuntime,
  prepared: PreparedEmbeddingRequest,
  error: unknown
): EmbeddingFailure {
  const message = error instanceof Error ? error.message : String(error);
  const isTimeout =
    error instanceof Error &&
    (error.name === "TimeoutError" ||
      error.name === "AbortError" ||
      message.toLowerCase().includes("timeout"));
  const status = isTimeout ? 504 : 502;
  runtime.log?.error("EMBED", `${runtime.provider} fetch error: ${message}`);
  runtime.reqLogger.logError(error, prepared.upstreamBody);
  saveCallLog({
    method: "POST",
    path: "/v1/embeddings",
    status,
    model: `${runtime.provider}/${runtime.model}`,
    provider: runtime.provider,
    duration: Date.now() - runtime.startTime,
    error: message,
    requestBody: runtime.logRequestBody,
    pipelinePayloads: pipelinePayloads(runtime),
    apiKeyId: runtime.apiKeyId,
    apiKeyName: runtime.apiKeyName,
    connectionId: runtime.connectionId,
  }).catch(() => {});
  return failure(status, `Embedding provider error: ${sanitizeErrorMessage(message)}`);
}

async function executeEmbedding(
  runtime: EmbeddingRuntime,
  prepared: PreparedEmbeddingRequest
): Promise<EmbeddingResult> {
  const quotaFailure = await enforceEmbeddingQuota(runtime);
  if (quotaFailure) return quotaFailure;
  const singleTextsOrFailure = resolveSingleTexts(runtime);
  if (singleTextsOrFailure && !Array.isArray(singleTextsOrFailure)) return singleTextsOrFailure;
  const singleTexts = Array.isArray(singleTextsOrFailure) ? singleTextsOrFailure : null;
  try {
    const response = await dispatchEmbeddingRequest(prepared, singleTexts, runtime.reqLogger);
    return response.ok
      ? handleUpstreamSuccess(runtime, prepared, response, singleTexts?.length ?? 1)
      : handleUpstreamFailure(runtime, response);
  } catch (error) {
    return handleEmbeddingException(runtime, prepared, error);
  }
}

/** Handle one OpenAI-compatible embedding request. */
export async function handleEmbedding(params: HandleEmbeddingParams): Promise<EmbeddingResult> {
  const resolved = resolveEmbedding(params);
  const runtime = await createEmbeddingRuntime(params, resolved);
  if ("success" in runtime) return runtime;
  const modalityFailure = validateRequestedModalities(runtime);
  if (modalityFailure) return modalityFailure;
  const prepared = await prepareEmbeddingRequest(runtime);
  if ("success" in prepared) return prepared;
  runtime.log?.info(
    "EMBED",
    `${runtime.provider}/${runtime.model} | input: ${
      Array.isArray(runtime.body.input) ? `${runtime.body.input.length} items` : "1 item"
    }`
  );
  return executeEmbedding(runtime, prepared);
}
