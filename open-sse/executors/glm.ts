import { randomUUID } from "node:crypto";

import { DefaultExecutor } from "./default.ts";
import {
  applyConfiguredUserAgent,
  mergeAbortSignals,
  mergeUpstreamExtraHeaders,
  type CountTokensInput,
  type ExecuteInput,
  type ProviderCredentials,
} from "./base.ts";
import {
  buildGlmBaseHeaders,
  buildGlmChatUrl,
  buildGlmCodingHeaders,
  buildGlmCountTokensUrl,
  GLM_COUNT_TOKENS_TIMEOUT_MS,
  type GlmTransport,
  getGlmTransport,
} from "../config/glmProvider.ts";
import { applyProviderRequestDefaults } from "../services/providerRequestDefaults.ts";
import { getRotatingApiKey } from "../services/apiKeyRotator.ts";
import { CLAUDE_CLI_STAINLESS_PACKAGE_VERSION } from "../config/anthropicHeaders.ts";
import {
  getRuntimeVersion,
  normalizeStainlessArch,
  normalizeStainlessPlatform,
} from "../config/providerHeaderProfiles.ts";
import { translateNonStreamingResponse } from "../handlers/responseTranslator.ts";
import { translateRequest } from "../translator/index.ts";
import { FORMATS } from "../translator/formats.ts";
import { createSSETransformStreamWithLogger } from "../utils/stream.ts";
import { ensureStreamReadiness } from "../utils/streamReadiness.ts";
import { STREAM_IDLE_TIMEOUT_MS } from "../config/constants.ts";

type JsonRecord = Record<string, unknown>;
type GlmExecuteResult = Awaited<ReturnType<DefaultExecutor["execute"]>> & {
  targetFormat?: string;
};

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function getEffectiveKey(credentials: ProviderCredentials): string {
  const extraKeys = (credentials.providerSpecificData?.extraApiKeys as string[] | undefined) ?? [];
  if (credentials.apiKey && credentials.connectionId && extraKeys.length > 0) {
    return getRotatingApiKey(credentials.connectionId, credentials.apiKey, extraKeys);
  }
  return credentials.apiKey || credentials.accessToken || "";
}

function applyGlmRequestDefaults(body: unknown, defaults?: JsonRecord | null): unknown {
  const record = asRecord(body);
  if (!record || !defaults) return body;

  const next = { ...(applyProviderRequestDefaults(record, defaults) as JsonRecord) };
  const thinkingType = typeof defaults.thinkingType === "string" ? defaults.thinkingType : null;

  if (thinkingType && next.thinking === undefined) {
    next.thinking = { type: thinkingType };
  } else if (thinkingType && asRecord(next.thinking)?.type === "enabled") {
    next.thinking = { ...asRecord(next.thinking), type: thinkingType };
  }

  return next;
}

function hasTools(body: unknown): boolean {
  const record = asRecord(body);
  return Array.isArray(record?.tools) && record.tools.length > 0;
}

function isRetryableGlmFallbackStatus(status: number): boolean {
  return status === 404 || status === 408 || status === 409 || status === 429 || status >= 500;
}

function isRetryableGlmFallbackError(error: unknown): boolean {
  if (!error) return false;
  const err = error instanceof Error ? error : new Error(String(error));
  if (err.name === "AbortError") return false;
  return true;
}

function cloneHeaders(headers: Headers): Headers {
  const next = new Headers();
  headers.forEach((value, key) => next.set(key, value));
  return next;
}

function isJsonResponse(response: Response): boolean {
  return (response.headers.get("content-type") || "").toLowerCase().includes("application/json");
}

async function translateJsonResponse(response: Response): Promise<Response> {
  const parsed = await response.json().catch(() => null);
  const translated = translateNonStreamingResponse(parsed, FORMATS.CLAUDE, FORMATS.OPENAI);
  const headers = cloneHeaders(response.headers);
  headers.set("content-type", "application/json");
  headers.delete("content-length");
  return new Response(JSON.stringify(translated), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function translateAnthropicJsonResponse(response: Response): Promise<Response> {
  const parsed = await response.json().catch(() => null);
  const translated = response.ok
    ? translateNonStreamingResponse(parsed, FORMATS.CLAUDE, FORMATS.OPENAI)
    : translateAnthropicJsonError(parsed);
  const headers = cloneHeaders(response.headers);
  headers.set("content-type", "application/json");
  headers.delete("content-length");
  return new Response(JSON.stringify(translated), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function translateAnthropicJsonError(parsed: unknown): JsonRecord {
  const root = asRecord(parsed) || {};
  const error = asRecord(root.error) || root;
  const message =
    typeof error.message === "string" && error.message.trim()
      ? error.message
      : typeof root.message === "string" && root.message.trim()
        ? root.message
        : "GLM Anthropic transport error";
  const type =
    typeof error.type === "string" && error.type.trim()
      ? error.type
      : typeof root.type === "string" && root.type.trim()
        ? root.type
        : "upstream_error";

  return {
    error: {
      message,
      type,
    },
  };
}

function translateSseResponse(response: Response, provider: string, model: string): Response {
  if (!response.body) return response;
  const transform = createSSETransformStreamWithLogger(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    provider,
    null,
    null,
    model
  );
  const headers = cloneHeaders(response.headers);
  headers.set("content-type", "text/event-stream");
  headers.delete("content-length");
  return new Response(response.body.pipeThrough(transform), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export class GlmExecutor extends DefaultExecutor {
  constructor(provider = "glm") {
    super(provider);
  }

  buildUrl(
    _model: string,
    _stream: boolean,
    _urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ) {
    const primaryTransport = getGlmTransport(credentials?.providerSpecificData);
    const transport =
      _urlIndex === 1 ? (primaryTransport === "openai" ? "anthropic" : "openai") : primaryTransport;
    return buildGlmChatUrl(credentials?.providerSpecificData, transport, this.config.baseUrl);
  }

  buildCountTokensUrl(_model: string, credentials: ProviderCredentials | null = null) {
    return buildGlmCountTokensUrl(credentials?.providerSpecificData, this.config.baseUrl);
  }

  getCountTokensTimeoutMs() {
    return GLM_COUNT_TOKENS_TIMEOUT_MS;
  }

  buildHeaders(
    credentials: ProviderCredentials,
    stream = true,
    _clientHeaders?: Record<string, string> | null,
    _model?: string,
    transport: GlmTransport = getGlmTransport(credentials.providerSpecificData)
  ): Record<string, string> {
    if (transport === "openai") {
      return buildGlmCodingHeaders(getEffectiveKey(credentials), stream);
    }

    return {
      ...buildGlmBaseHeaders(getEffectiveKey(credentials), stream),
      "X-Stainless-Arch": normalizeStainlessArch(),
      "X-Stainless-OS": normalizeStainlessPlatform(),
      "X-Stainless-Runtime-Version": getRuntimeVersion(),
      "X-Stainless-Package-Version": CLAUDE_CLI_STAINLESS_PACKAGE_VERSION,
      "X-Claude-Code-Session-Id": randomUUID(),
      "x-client-request-id": randomUUID(),
    };
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ) {
    const cleanedBody = super.transformRequest(model, body, stream, credentials);
    return applyGlmRequestDefaults(cleanedBody, this.config.requestDefaults as JsonRecord | null);
  }

  transformForTransport(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials,
    transport: GlmTransport
  ) {
    const transformed = this.transformRequest(model, body, stream, credentials);

    if (transport === "openai") {
      const record = asRecord(transformed);
      if (record && stream && hasTools(record) && record.tool_stream === undefined) {
        return { ...record, tool_stream: true };
      }
      return transformed;
    }

    return translateRequest(
      FORMATS.OPENAI,
      FORMATS.CLAUDE,
      model,
      { ...(transformed as JsonRecord), _disableToolPrefix: true },
      stream,
      credentials,
      this.provider,
      null,
      { preserveCacheControl: false }
    );
  }

  private async executeTransport(
    input: ExecuteInput,
    transport: GlmTransport
  ): Promise<GlmExecuteResult> {
    const credentials = input.credentials;
    const url = buildGlmChatUrl(credentials?.providerSpecificData, transport, this.config.baseUrl);
    const headers = this.buildHeaders(
      credentials,
      input.stream,
      input.clientHeaders,
      input.model,
      transport
    );
    applyConfiguredUserAgent(headers, credentials.providerSpecificData);
    mergeUpstreamExtraHeaders(headers, input.upstreamExtraHeaders);

    const transformedBody = this.transformForTransport(
      input.model,
      input.body,
      input.stream,
      credentials,
      transport
    );

    const fetchStartTimeoutMs = this.getTimeoutMs();
    const timeoutController = fetchStartTimeoutMs > 0 ? new AbortController() : null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    if (timeoutController) {
      timeoutId = setTimeout(() => {
        const timeoutError = new Error(`Fetch timeout after ${fetchStartTimeoutMs}ms on ${url}`);
        timeoutError.name = "TimeoutError";
        timeoutController.abort(timeoutError);
      }, fetchStartTimeoutMs);
    }

    const timeoutSignal = timeoutController?.signal ?? null;
    const combinedSignal =
      input.signal && timeoutSignal
        ? mergeAbortSignals(input.signal, timeoutSignal)
        : input.signal || timeoutSignal;

    let response: Response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(transformedBody),
        signal: combinedSignal || undefined,
      });
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }

    if (input.stream && response.ok) {
      const readiness = await ensureStreamReadiness(response, {
        timeoutMs: STREAM_IDLE_TIMEOUT_MS,
        provider: this.provider,
        model: input.model,
        log: input.log,
      });
      response = readiness.response;
    }

    const result = { response, url, headers, transformedBody };

    if (transport === "anthropic") {
      const translatedResponse =
        input.stream && result.response.ok
          ? translateSseResponse(result.response, this.provider, input.model)
          : isJsonResponse(result.response)
            ? await translateAnthropicJsonResponse(result.response)
            : result.response;
      return {
        ...result,
        response: translatedResponse,
        url,
        headers,
        transformedBody,
        targetFormat: FORMATS.OPENAI,
      };
    }

    return {
      ...result,
      url,
      headers,
      transformedBody,
      targetFormat: FORMATS.OPENAI,
    };
  }

  async execute(input: ExecuteInput): Promise<GlmExecuteResult> {
    const primaryTransport = getGlmTransport(
      input.credentials.providerSpecificData,
      this.config.baseUrl
    );
    const fallbackTransport: GlmTransport = primaryTransport === "openai" ? "anthropic" : "openai";

    let primaryResult: GlmExecuteResult | null = null;
    try {
      primaryResult = await this.executeTransport(input, primaryTransport);
      if (!isRetryableGlmFallbackStatus(primaryResult.response.status)) {
        return primaryResult;
      }
      input.log?.debug?.(
        "GLM_FALLBACK",
        `${primaryTransport} returned ${primaryResult.response.status}; trying ${fallbackTransport}`
      );
    } catch (error) {
      if (!isRetryableGlmFallbackError(error)) throw error;
      input.log?.debug?.(
        "GLM_FALLBACK",
        `${primaryTransport} error (${error instanceof Error ? error.message : String(error)}); trying ${fallbackTransport}`
      );
    }

    try {
      const fallbackResult = await this.executeTransport(input, fallbackTransport);
      if (fallbackResult.response.ok || !primaryResult) {
        return fallbackResult;
      }
    } catch (error) {
      if (!primaryResult) throw error;
      input.log?.debug?.(
        "GLM_FALLBACK",
        `${fallbackTransport} fallback failed (${error instanceof Error ? error.message : String(error)}); returning primary response`
      );
    }

    return primaryResult;
  }

  async countTokens(input: CountTokensInput) {
    return super.countTokens({
      ...input,
      credentials: {
        ...input.credentials,
        providerSpecificData: {
          ...(input.credentials.providerSpecificData || {}),
          primaryTransport: "anthropic",
        },
      },
    });
  }
}

export default GlmExecutor;
