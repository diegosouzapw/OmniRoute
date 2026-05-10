/**
 * Embedding Handler
 *
 * Handles POST /v1/embeddings requests.
 * Proxies to upstream embedding providers using OpenAI-compatible format.
 *
 * Request format (OpenAI-compatible):
 * {
 *   "model": "nebius/Qwen/Qwen3-Embedding-8B",
 *   "input": "text" | ["text1", "text2"],
 *   "dimensions": 4096,       // optional
 *   "encoding_format": "float" // optional
 * }
 */

import {
  getEmbeddingProvider,
  parseEmbeddingModel,
  type EmbeddingProvider,
} from "../config/embeddingRegistry.ts";
import { saveCallLog } from "@/lib/usageDb";
import { createRequestLogger } from "../utils/requestLogger.ts";
import { isDetailedLoggingEnabled } from "@/lib/db/detailedLogs";
import { getCallLogPipelineCaptureStreamChunks } from "@/lib/logEnv";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";

interface ClientRawRequest {
  endpoint: string;
  body: Record<string, unknown>;
  headers: Record<string, string>;
}

/**
 * Handle embedding request.
 * Supports both hardcoded cloud providers and dynamic local provider_nodes.
 * When resolvedProvider is passed, uses it directly (injection pattern from route handler).
 * Falls back to hardcoded registry lookup for backward compatibility.
 */
export async function handleEmbedding({
  body,
  credentials,
  log,
  resolvedProvider = null,
  resolvedModel = null,
  clientRawRequest = null,
  apiKeyId = null,
  apiKeyName = null,
  connectionId = null,
}: {
  body: Record<string, unknown>;
  credentials: { apiKey?: string; accessToken?: string } | null;
  log?: { info: (...args: unknown[]) => void; error: (...args: unknown[]) => void };
  resolvedProvider?: EmbeddingProvider | null;
  resolvedModel?: string | null;
  clientRawRequest?: ClientRawRequest | null;
  apiKeyId?: string | null;
  apiKeyName?: string | null;
  connectionId?: string | null;
}) {
  // Use pre-resolved provider/model from route handler if available (supports dynamic provider_nodes).
  let provider: string | null;
  let model: string | null;
  let providerConfig: EmbeddingProvider | null;

  if (resolvedProvider) {
    provider = resolvedProvider.id;
    model = resolvedModel;
    providerConfig = resolvedProvider;
  } else {
    const parsed = parseEmbeddingModel(body.model as string);
    provider = parsed.provider;
    model = parsed.model;
    providerConfig = provider ? getEmbeddingProvider(provider) : null;
  }

  const startTime = Date.now();

  // Set up request logger for pipeline artifact capture
  const detailedLoggingEnabled = await isDetailedLoggingEnabled();
  const captureStreamChunks = await getCallLogPipelineCaptureStreamChunks();
  const reqLogger = await createRequestLogger(
    provider || "openai",
    "openai",
    body.model as string,
    {
      enabled: detailedLoggingEnabled,
      captureStreamChunks,
    }
  );

  // Log client raw request
  if (clientRawRequest) {
    reqLogger.logClientRawRequest(
      clientRawRequest.endpoint,
      clientRawRequest.body,
      clientRawRequest.headers
    );
  }

  // Summarized request body for call log (avoid storing large embedding input arrays)
  const logRequestBody = {
    model: body.model,
    input_count: Array.isArray(body.input) ? body.input.length : 1,
    dimensions: body.dimensions || undefined,
  };

  if (!provider) {
    return {
      success: false,
      status: 400,
      error: `Invalid embedding model: ${body.model}. Use format: provider/model`,
    };
  }

  if (!providerConfig) {
    return {
      success: false,
      status: 400,
      error: `Unknown embedding provider: ${provider}`,
    };
  }

  // Build upstream request — start with standard fields, then forward extra fields
  // the client sent (e.g. input_type, user, truncate for NVIDIA NIM asymmetric models).
  const KNOWN_FIELDS = new Set(["model", "input", "dimensions", "encoding_format"]);

  const upstreamBody: Record<string, unknown> = {
    model: model,
    input: body.input,
  };

  if (body.dimensions !== undefined) upstreamBody.dimensions = body.dimensions;
  if (body.encoding_format !== undefined) upstreamBody.encoding_format = body.encoding_format;

  for (const [key, value] of Object.entries(body)) {
    if (!KNOWN_FIELDS.has(key) && value !== undefined) {
      upstreamBody[key] = value;
    }
  }

  // Build headers
  const headers = {
    "Content-Type": "application/json",
  };

  // Skip credential injection for local providers (authType: "none")
  const token =
    providerConfig.authType === "none" ? null : credentials?.apiKey || credentials?.accessToken;
  if (token) {
    if (providerConfig.authHeader === "bearer") {
      headers["Authorization"] = `Bearer ${token}`;
    } else if (providerConfig.authHeader === "x-api-key") {
      headers["x-api-key"] = token;
    }
  } else if (providerConfig.authType !== "none") {
    return {
      success: false,
      status: 401,
      error: `No valid authentication token for provider ${provider}. Check provider credentials.`,
    };
  }

  if (log) {
    log.info(
      "EMBED",
      `${provider}/${model} | input: ${Array.isArray(body.input) ? body.input.length + " items" : "1 item"}`
    );
  }

  try {
    // Log provider request
    reqLogger.logTargetRequest(providerConfig.baseUrl, headers, upstreamBody);

    const response = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(upstreamBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (log) {
        log.error("EMBED", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);
      }

      // Log provider response
      reqLogger.logProviderResponse(response.status, "", response.headers, errorText.slice(0, 500));

      // Build client error response
      const clientErrorBody = toJsonErrorPayload(
        errorText.slice(0, 500),
        "Embedding provider error"
      );
      reqLogger.logConvertedResponse(clientErrorBody);

      const pipelinePayloads = detailedLoggingEnabled ? reqLogger.getPipelinePayloads() : null;

      // Save error call log for Logger panel
      saveCallLog({
        method: "POST",
        path: "/v1/embeddings",
        status: response.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText.slice(0, 500),
        requestBody: logRequestBody,
        pipelinePayloads,
        apiKeyId,
        apiKeyName,
        connectionId,
      }).catch(() => {});

      return {
        success: false,
        status: response.status,
        error: errorText,
        headers: response.headers,
      };
    }

    const data = await response.json();

    // Log provider response
    reqLogger.logProviderResponse(response.status, "", response.headers, data);

    // Normalize response to OpenAI format
    const normalizedResponse = {
      object: "list",
      data: data.data || data,
      model: `${provider}/${model}`,
      usage: data.usage || { prompt_tokens: 0, total_tokens: 0 },
    };

    // Log client response
    reqLogger.logConvertedResponse(normalizedResponse);

    const pipelinePayloads = detailedLoggingEnabled ? reqLogger.getPipelinePayloads() : null;

    // Save success call log for Logger panel
    // Embeddings only have input tokens (prompt_tokens + total_tokens), no output/completion tokens
    saveCallLog({
      method: "POST",
      path: "/v1/embeddings",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      tokens: {
        prompt_tokens: data.usage?.prompt_tokens || data.usage?.total_tokens || 0,
        completion_tokens: 0,
      },
      requestBody: logRequestBody,
      responseBody: {
        usage: data.usage || null,
        object: "list",
        data_count: data.data?.length || 0,
      },
      pipelinePayloads,
      apiKeyId,
      apiKeyName,
      connectionId,
    }).catch(() => {});

    // Normalize response to OpenAI format
    return {
      success: true,
      data: normalizedResponse,
      headers: response.headers,
    };
  } catch (err) {
    if (log) {
      log.error("EMBED", `${provider} fetch error: ${err.message}`);
    }

    // Log error
    reqLogger.logError(err, upstreamBody);

    const pipelinePayloads = detailedLoggingEnabled ? reqLogger.getPipelinePayloads() : null;

    // Save exception call log for Logger panel
    saveCallLog({
      method: "POST",
      path: "/v1/embeddings",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: err.message,
      requestBody: logRequestBody,
      pipelinePayloads,
      apiKeyId,
      apiKeyName,
      connectionId,
    }).catch(() => {});

    return {
      success: false,
      status: 502,
      error: `Embedding provider error: ${err.message}`,
    };
  }
}
