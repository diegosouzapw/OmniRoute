import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { CodexExecutor } from "@omniroute/open-sse/executors/codex.ts";
import { getApiKeyMetadata } from "@/lib/db/apiKeys";
import { authorizeWebSocketHandshake, extractWsTokenFromRequest } from "@/lib/ws/handshake";
import { getModelInfo } from "@/sse/services/model";
import { getProviderCredentialsWithQuotaPreflight } from "@/sse/services/auth";
import { checkAndRefreshToken } from "@/sse/services/tokenRefresh";
import { resolveCodexWsModelInfo } from "./modelResolution";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { formatMemoryContext } from "@/lib/memory/injection";
import { retrieveMemories } from "@/lib/memory/retrieval";
import {
  DEFAULT_MEMORY_SETTINGS,
  getMemorySettings,
  toMemoryRetrievalConfig,
} from "@/lib/memory/settings";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { logger } from "@omniroute/open-sse/utils/logger.ts";

const CODEX_RESPONSES_WS_URL = "wss://chatgpt.com/backend-api/codex/responses";
const executor = new CodexExecutor();
const log = logger("RESPONSES_WS");

type JsonRecord = Record<string, unknown>;
type ApiKeyMetadata = Awaited<ReturnType<typeof getApiKeyMetadata>>;

const bridgePayloadSchema = z
  .object({
    action: z.string().optional(),
    requestUrl: z.string().optional(),
    headers: z.record(z.string(), z.unknown()).optional(),
    response: z.record(z.string(), z.unknown()).optional(),
  })
  .passthrough();

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

const RESPONSES_WS_MEMORY_CONTEXT_PREFIX = "Memory context:";
const RESPONSES_WS_MEMORY_TEXT_PART_TYPES = new Set(["text", "input_text", "output_text"]);
const RESPONSES_WS_MEMORY_SKIP_ITEM_TYPES = new Set([
  "function_call",
  "function_call_output",
  "tool_call",
  "tool_call_output",
  "reasoning",
  "computer_call",
  "computer_call_output",
  "web_search_call",
  "file_search_call",
]);

function compactText(parts: Array<string | null>): string | null {
  const text = parts
    .map((part) => (typeof part === "string" ? part.trim() : ""))
    .filter(Boolean)
    .join("\n");
  return text.length > 0 ? text : null;
}

function extractResponsesWsContentText(value: unknown): string | null {
  if (typeof value === "string") return toStringOrNull(value);

  if (Array.isArray(value)) {
    return compactText(
      value.map((part) => {
        if (typeof part === "string") return toStringOrNull(part);
        if (!isRecord(part)) return null;

        const type = typeof part.type === "string" ? part.type : "";
        if (type && !RESPONSES_WS_MEMORY_TEXT_PART_TYPES.has(type)) return null;

        return toStringOrNull(part.text) || toStringOrNull(part.input_text);
      })
    );
  }

  if (isRecord(value)) {
    const type = typeof value.type === "string" ? value.type : "";
    if (type && !RESPONSES_WS_MEMORY_TEXT_PART_TYPES.has(type)) return null;
    return toStringOrNull(value.text) || toStringOrNull(value.input_text);
  }

  return null;
}

function extractResponsesWsItemText(value: unknown): string | null {
  if (typeof value === "string") return toStringOrNull(value);
  if (!isRecord(value)) return null;

  return (
    extractResponsesWsContentText(value.content) ||
    extractResponsesWsContentText(value.text) ||
    extractResponsesWsContentText(value.input_text) ||
    extractResponsesWsContentText(value.output_text) ||
    extractResponsesWsContentText(value.output)
  );
}

function isResponsesWsMemoryCandidate(value: unknown): boolean {
  if (!isRecord(value)) return typeof value === "string";
  const type = typeof value.type === "string" ? value.type : "";
  return !RESPONSES_WS_MEMORY_SKIP_ITEM_TYPES.has(type);
}

function extractLatestResponsesWsInputText(input: unknown): string | null {
  if (typeof input === "string") return toStringOrNull(input);
  if (!Array.isArray(input)) return null;

  for (let index = input.length - 1; index >= 0; index -= 1) {
    const item = input[index];
    if (!isResponsesWsMemoryCandidate(item) || !isRecord(item) || item.role !== "user") continue;
    const text = extractResponsesWsItemText(item);
    if (text) return text;
  }

  for (let index = input.length - 1; index >= 0; index -= 1) {
    const item = input[index];
    if (!isResponsesWsMemoryCandidate(item)) continue;
    const text = extractResponsesWsItemText(item);
    if (text) return text;
  }

  return null;
}

export function extractResponsesWsMemoryQuery(body: JsonRecord): string {
  return (
    extractLatestResponsesWsInputText(body.input) ||
    extractLatestResponsesWsInputText(body.messages) ||
    toStringOrNull(body.prompt) ||
    toStringOrNull(body.instructions) ||
    ""
  );
}

export function injectResponsesWsMemoryInstructions(
  body: JsonRecord,
  memoryText: string
): JsonRecord {
  const memoryContext = toStringOrNull(memoryText);
  if (!memoryContext) return body;

  const existingInstructions = toStringOrNull(body.instructions);
  if (existingInstructions?.includes(RESPONSES_WS_MEMORY_CONTEXT_PREFIX)) return body;

  return {
    ...body,
    instructions: [memoryContext, existingInstructions].filter(Boolean).join("\n\n"),
  };
}

async function getMemorySettingsForResponsesWs() {
  try {
    return await getMemorySettings();
  } catch (error) {
    log.warn("memory.settings.defaulted", {
      error: sanitizeErrorMessage(error instanceof Error ? error.message : String(error)),
    });
    return DEFAULT_MEMORY_SETTINGS;
  }
}

async function maybeInjectResponsesWsMemory(
  responseBody: JsonRecord,
  metadata: ApiKeyMetadata | null
): Promise<JsonRecord> {
  if (!metadata?.id) return responseBody;

  const query = extractResponsesWsMemoryQuery(responseBody);
  if (!query) return responseBody;

  try {
    const memorySettings = await getMemorySettingsForResponsesWs();
    const memories = await retrieveMemories(
      metadata.id,
      toMemoryRetrievalConfig(memorySettings, { query })
    );
    const memoryText = formatMemoryContext(memories);
    return injectResponsesWsMemoryInstructions(responseBody, memoryText);
  } catch (error) {
    log.warn("memory.injection.skipped", {
      error: sanitizeErrorMessage(error instanceof Error ? error.message : String(error)),
    });
    return responseBody;
  }
}

function toFiniteNumber(value: unknown, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toHttpStatus(value: unknown, fallback: number): number {
  const status = Number(value);
  return Number.isInteger(status) && status >= 100 && status <= 599 ? status : fallback;
}

function getResponseCreateBody(body: JsonRecord): JsonRecord {
  if (isRecord(body.clientRequest)) return body.clientRequest;
  if (isRecord(body.response)) return body.response;
  return {};
}

function getTerminalMessage(body: JsonRecord): JsonRecord | null {
  return isRecord(body.terminalMessage) ? body.terminalMessage : null;
}

function getTerminalResponseBody(body: JsonRecord): JsonRecord | null {
  if (isRecord(body.responseBody)) return body.responseBody;
  const terminalMessage = getTerminalMessage(body);
  if (isRecord(terminalMessage?.response)) return terminalMessage.response;
  return terminalMessage;
}

function getErrorRecord(body: JsonRecord, responseBody: JsonRecord | null): JsonRecord | null {
  if (isRecord(body.error)) return body.error;
  if (isRecord(responseBody?.error)) return responseBody.error;
  const terminalMessage = getTerminalMessage(body);
  if (isRecord(terminalMessage?.error)) return terminalMessage.error;
  return null;
}

function getTimestamp(value: unknown): string {
  const raw = toStringOrNull(value);
  if (!raw) return new Date().toISOString();
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

function getRequestPath(body: JsonRecord): string {
  const explicitPath = toStringOrNull(body.path);
  if (explicitPath) return explicitPath;

  try {
    const requestUrl = toStringOrNull(body.requestUrl) || "/v1/responses";
    return new URL(requestUrl, "http://omniroute.local").pathname;
  } catch {
    return "/v1/responses";
  }
}

function getServiceTier(requestBody: JsonRecord): string | null {
  return toStringOrNull(requestBody.service_tier) || toStringOrNull(requestBody.serviceTier);
}

async function getApiKeyMetadataFromBody(body: JsonRecord) {
  const authRequest = getAuthRequest(body);
  const apiKey = extractWsTokenFromRequest(authRequest);
  return apiKey ? getApiKeyMetadata(apiKey).catch(() => null) : null;
}

function getBridgeSecret(): string {
  return process.env.OMNIROUTE_WS_BRIDGE_SECRET || "";
}

function hashBridgeSecret(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

export function bridgeSecretMatches(expectedSecret: string, receivedSecret: string): boolean {
  if (!expectedSecret || !receivedSecret) return false;
  const expectedHash = hashBridgeSecret(expectedSecret);
  const receivedHash = hashBridgeSecret(receivedSecret);
  return timingSafeEqual(expectedHash, receivedHash);
}

function getAuthRequest(body: JsonRecord): Request {
  const requestUrl = typeof body.requestUrl === "string" ? body.requestUrl : "/api/v1/responses";
  const headers = isRecord(body.headers) ? body.headers : {};
  const url = new URL(requestUrl, "http://omniroute.local");
  const requestHeaders = new Headers();

  for (const [key, value] of Object.entries(headers)) {
    if (typeof value === "string") {
      requestHeaders.set(key, value);
    }
  }

  return new Request(url, { headers: requestHeaders });
}

function jsonError(status: number, code: string, message: string) {
  return NextResponse.json(
    {
      error: {
        code,
        message,
      },
    },
    { status }
  );
}

function normalizeUpstreamHeaders(headers: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    const lower = key.toLowerCase();
    if (
      lower === "host" ||
      lower === "connection" ||
      lower === "upgrade" ||
      lower === "sec-websocket-key" ||
      lower === "sec-websocket-version" ||
      lower === "sec-websocket-extensions"
    ) {
      continue;
    }
    result[key] = value;
  }
  result.Origin = "https://chatgpt.com";
  return result;
}

async function authenticate(body: JsonRecord) {
  const authRequest = getAuthRequest(body);
  const auth = await authorizeWebSocketHandshake(authRequest);
  if (!auth.authorized) {
    return jsonError(
      auth.hasCredential ? 403 : 401,
      auth.hasCredential ? "ws_auth_invalid" : "ws_auth_required",
      auth.hasCredential ? "Invalid WebSocket credential" : "WebSocket auth required"
    );
  }

  return NextResponse.json({
    ok: true,
    authenticated: auth.authenticated,
    authType: auth.authType,
    wsAuth: auth.wsAuth,
  });
}

async function prepare(body: JsonRecord) {
  // Global kill-switch (feature flag OMNIROUTE_CODEX_WS_ENABLED, default ON).
  // When disabled, the public Responses-over-WebSocket endpoint is unavailable.
  if (!isFeatureFlagEnabled("OMNIROUTE_CODEX_WS_ENABLED")) {
    return jsonError(503, "codex_ws_disabled", "Codex Responses WebSocket transport is disabled");
  }

  const authResponse = await authenticate(body);
  if (!authResponse.ok) return authResponse;

  const authRequest = getAuthRequest(body);
  const apiKey = extractWsTokenFromRequest(authRequest);
  const metadata = apiKey ? await getApiKeyMetadata(apiKey).catch(() => null) : null;
  const allowedConnections =
    metadata && Array.isArray(metadata.allowedConnections) && metadata.allowedConnections.length > 0
      ? metadata.allowedConnections
      : null;

  const responseBody = isRecord(body.response) ? body.response : {};
  const requestedModel =
    typeof responseBody.model === "string" && responseBody.model.trim()
      ? responseBody.model.trim()
      : "gpt-5.5";
  // codex-only bridge: re-resolve bare ChatGPT model ids (the Codex CLI rejects
  // provider-prefixed ids client-side over WebSocket) as codex models.
  const modelInfo = await resolveCodexWsModelInfo(requestedModel, getModelInfo);
  const provider = modelInfo.provider;
  const model = modelInfo.model || requestedModel;

  if (provider !== "codex") {
    return jsonError(
      400,
      "codex_ws_provider_required",
      `Responses WebSocket bridge only supports Codex models, got ${provider || "unknown"}`
    );
  }

  const credentials = await getProviderCredentialsWithQuotaPreflight(
    provider,
    null,
    allowedConnections,
    model
  );

  if (!credentials || "allRateLimited" in credentials) {
    return jsonError(
      503,
      "codex_credentials_unavailable",
      "No available Codex OAuth connection for Responses WebSocket"
    );
  }

  const refreshedCredentials = await checkAndRefreshToken(provider, credentials);
  if (!refreshedCredentials?.accessToken) {
    return jsonError(401, "codex_oauth_token_missing", "Codex OAuth access token is missing");
  }

  const responseBodyWithMemory = await maybeInjectResponsesWsMemory(responseBody, metadata);
  const transformed = (await executor.transformRequest(
    model,
    responseBodyWithMemory,
    true,
    refreshedCredentials
  )) as JsonRecord;
  transformed.model = model;
  delete transformed.stream;
  delete transformed.stream_options;

  const headers = normalizeUpstreamHeaders(executor.buildHeaders(refreshedCredentials, true));

  return NextResponse.json({
    ok: true,
    upstreamUrl: CODEX_RESPONSES_WS_URL,
    browser: "chrome_142",
    os: "windows",
    connectionId: refreshedCredentials.connectionId,
    provider,
    account: refreshedCredentials.email || null,
    model,
    headers,
    response: transformed,
  });
}

async function persistResponsesWsCallHistory(body: JsonRecord) {
  const [{ saveCallLog }, { saveRequestUsage }, { logProxyEvent }] = await Promise.all([
    import("@/lib/usage/callLogs"),
    import("@/lib/usage/usageHistory"),
    import("@/lib/proxyLogger"),
  ]);

  const metadata = await getApiKeyMetadataFromBody(body);
  const requestBody = getResponseCreateBody(body);
  const terminalMessage = getTerminalMessage(body);
  const responseBody = getTerminalResponseBody(body);
  const usage = isRecord(responseBody?.usage) ? responseBody.usage : {};
  const errorRecord = getErrorRecord(body, responseBody);
  const status = toHttpStatus(
    body.status ?? errorRecord?.status_code ?? errorRecord?.status,
    body.success === false ? 500 : 200
  );
  const success = typeof body.success === "boolean" ? body.success : status < 400;
  const errorCode =
    toStringOrNull(body.errorCode) ||
    toStringOrNull(errorRecord?.code) ||
    (success ? null : "responses_websocket_failed");
  const errorMessage = success
    ? null
    : sanitizeErrorMessage(
        toStringOrNull(body.errorMessage) ||
          toStringOrNull(errorRecord?.message) ||
          "Responses WebSocket request failed"
      );
  const timestamp = getTimestamp(body.startedAt);
  const durationMs = Math.max(0, Math.round(toFiniteNumber(body.durationMs, 0)));
  const provider = toStringOrNull(body.provider) || "codex";
  const model =
    toStringOrNull(body.model) ||
    toStringOrNull(responseBody?.model) ||
    toStringOrNull(requestBody.model) ||
    "-";
  const requestedModel = toStringOrNull(body.requestedModel) || toStringOrNull(requestBody.model);
  const connectionId = toStringOrNull(body.connectionId);
  const apiKeyId = metadata?.id || null;
  const apiKeyName = metadata?.name || null;
  const noLog = metadata?.noLog === true;
  const path = getRequestPath(body);
  const sourceFormat = toStringOrNull(body.sourceFormat) || "openai-responses";
  const targetFormat = toStringOrNull(body.targetFormat) || "openai-responses";
  const targetUrl = toStringOrNull(body.upstreamUrl) || CODEX_RESPONSES_WS_URL;
  const account = toStringOrNull(body.account);

  await saveCallLog({
    id: toStringOrNull(body.sessionId) || undefined,
    timestamp,
    method: "WEBSOCKET",
    path,
    status,
    model,
    requestedModel,
    provider,
    connectionId,
    duration: durationMs,
    tokens: usage,
    requestType: "responses_websocket",
    sourceFormat,
    targetFormat,
    apiKeyId,
    apiKeyName,
    noLog,
    requestBody,
    responseBody: responseBody ?? terminalMessage,
    error: errorMessage ? { code: errorCode, message: errorMessage } : null,
    pipelinePayloads: {
      clientRequest: requestBody,
      providerRequest: requestBody,
      providerResponse: responseBody,
      clientResponse: terminalMessage,
    },
  });

  await saveRequestUsage({
    timestamp,
    provider,
    model,
    connectionId,
    apiKeyId,
    apiKeyName,
    tokens: usage,
    serviceTier: getServiceTier(requestBody),
    status: String(status),
    success,
    latencyMs: durationMs,
    timeToFirstTokenMs: durationMs,
    errorCode,
    endpoint: "/v1/responses",
  });

  logProxyEvent({
    status: success ? "success" : "error",
    level: "direct",
    provider,
    targetUrl,
    latencyMs: durationMs,
    error: errorMessage,
    connectionId,
    account,
  });

  return NextResponse.json({ ok: true, logged: true });
}

export async function POST(request: Request) {
  const expectedSecret = getBridgeSecret();
  const receivedSecret = request.headers.get("x-omniroute-ws-bridge-secret") || "";
  if (!bridgeSecretMatches(expectedSecret, receivedSecret)) {
    return jsonError(403, "internal_bridge_forbidden", "Forbidden");
  }

  let body: JsonRecord;
  try {
    const parsed = bridgePayloadSchema.safeParse(await request.json());
    if (!parsed.success) {
      return jsonError(400, "invalid_json", "Request body must be a JSON object");
    }
    body = parsed.data as JsonRecord;
  } catch {
    return jsonError(400, "invalid_json", "Request body must be JSON");
  }

  const action = typeof body.action === "string" ? body.action : "";
  if (action === "authenticate") {
    return authenticate(body);
  }
  if (action === "prepare") {
    return prepare(body);
  }
  if (action === "log") {
    try {
      return await persistResponsesWsCallHistory(body);
    } catch (error) {
      return jsonError(
        500,
        "responses_ws_history_log_failed",
        sanitizeErrorMessage(error instanceof Error ? error.message : String(error))
      );
    }
  }

  return jsonError(400, "invalid_action", "Unsupported bridge action");
}
