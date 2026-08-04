import { NextResponse } from "next/server";
import { getApiKeyMetadata } from "@/lib/db/apiKeys";
import { extractWsTokenFromRequest } from "@/lib/ws/handshake";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const CODEX_RESPONSES_WS_URL = "wss://chatgpt.com/backend-api/codex/responses";
type JsonRecord = Record<string, unknown>;
type ApiKeyMetadata = Awaited<ReturnType<typeof getApiKeyMetadata>>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
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

function getAuthRequest(body: JsonRecord): Request {
  const requestUrl = typeof body.requestUrl === "string" ? body.requestUrl : "/api/v1/responses";
  const headers = isRecord(body.headers) ? body.headers : {};
  const url = new URL(requestUrl, "http://omniroute.local");
  const requestHeaders = new Headers();
  for (const [key, value] of Object.entries(headers)) {
    if (typeof value === "string") requestHeaders.set(key, value);
  }
  return new Request(url, { headers: requestHeaders });
}

async function getApiKeyMetadataFromBody(body: JsonRecord) {
  const apiKey = extractWsTokenFromRequest(getAuthRequest(body));
  return apiKey ? getApiKeyMetadata(apiKey).catch(() => null) : null;
}

type ResponsesWsHistoryContext = {
  metadata: ApiKeyMetadata | null;
  requestBody: JsonRecord;
  terminalMessage: JsonRecord | null;
  responseBody: JsonRecord | null;
  usage: JsonRecord;
  status: number;
  success: boolean;
  errorCode: string | null;
  errorMessage: string | null;
  timestamp: string;
  durationMs: number;
  provider: string;
  model: string;
  requestedModel: string | null;
  connectionId: string | null;
  apiKeyId: string | null;
  apiKeyName: string | null;
  noLog: boolean;
  path: string;
  sourceFormat: string;
  targetFormat: string;
  targetUrl: string;
  account: string | null;
};

function resolveOutcome(
  body: JsonRecord,
  errorRecord: JsonRecord | null
): Pick<ResponsesWsHistoryContext, "status" | "success" | "errorCode" | "errorMessage"> {
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
  return { status, success, errorCode, errorMessage };
}

async function buildHistoryContext(body: JsonRecord): Promise<ResponsesWsHistoryContext> {
  const metadata = await getApiKeyMetadataFromBody(body);
  const requestBody = getResponseCreateBody(body);
  const terminalMessage = getTerminalMessage(body);
  const responseBody = getTerminalResponseBody(body);
  const usage = isRecord(responseBody?.usage) ? responseBody.usage : {};
  const outcome = resolveOutcome(body, getErrorRecord(body, responseBody));
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
  const path = getRequestPath(body);
  return {
    metadata,
    requestBody,
    terminalMessage,
    responseBody,
    usage,
    ...outcome,
    timestamp,
    durationMs,
    provider,
    model,
    requestedModel,
    connectionId,
    apiKeyId: metadata?.id || null,
    apiKeyName: metadata?.name || null,
    noLog: metadata?.noLog === true,
    path,
    sourceFormat: toStringOrNull(body.sourceFormat) || "openai-responses",
    targetFormat: toStringOrNull(body.targetFormat) || "openai-responses",
    targetUrl: toStringOrNull(body.upstreamUrl) || CODEX_RESPONSES_WS_URL,
    account: toStringOrNull(body.account),
  };
}

function buildCallLogEntry(body: JsonRecord, context: ResponsesWsHistoryContext): JsonRecord {
  return {
    id: toStringOrNull(body.sessionId) || undefined,
    timestamp: context.timestamp,
    method: "WEBSOCKET",
    path: context.path,
    status: context.status,
    model: context.model,
    requestedModel: context.requestedModel,
    provider: context.provider,
    connectionId: context.connectionId,
    duration: context.durationMs,
    tokens: context.usage,
    requestType: "responses_websocket",
    sourceFormat: context.sourceFormat,
    targetFormat: context.targetFormat,
    apiKeyId: context.apiKeyId,
    apiKeyName: context.apiKeyName,
    noLog: context.noLog,
    requestBody: context.requestBody,
    responseBody: context.responseBody ?? context.terminalMessage,
    error: context.errorMessage ? { code: context.errorCode, message: context.errorMessage } : null,
    pipelinePayloads: {
      ...(isRecord(body.reasoningRouting) ? { routeDecision: body.reasoningRouting } : {}),
      clientRequest: context.requestBody,
      providerRequest: context.requestBody,
      providerResponse: context.responseBody,
      clientResponse: context.terminalMessage,
    },
  };
}

function buildUsageEntry(context: ResponsesWsHistoryContext): JsonRecord {
  return {
    timestamp: context.timestamp,
    provider: context.provider,
    model: context.model,
    connectionId: context.connectionId,
    apiKeyId: context.apiKeyId,
    apiKeyName: context.apiKeyName,
    tokens: context.usage,
    serviceTier: getServiceTier(context.requestBody),
    status: String(context.status),
    success: context.success,
    latencyMs: context.durationMs,
    timeToFirstTokenMs: context.durationMs,
    errorCode: context.errorCode,
    endpoint: "/v1/responses",
  };
}

export async function persistResponsesWsCallHistory(body: JsonRecord) {
  const [{ saveCallLog }, { saveRequestUsage }, { logProxyEvent }] = await Promise.all([
    import("@/lib/usage/callLogs"),
    import("@/lib/usage/usageHistory"),
    import("@/lib/proxyLogger"),
  ]);
  const context = await buildHistoryContext(body);
  await saveCallLog(buildCallLogEntry(body, context));
  await saveRequestUsage(buildUsageEntry(context));
  logProxyEvent({
    status: context.success ? "success" : "error",
    level: "direct",
    provider: context.provider,
    targetUrl: context.targetUrl,
    latencyMs: context.durationMs,
    error: context.errorMessage,
    connectionId: context.connectionId,
    account: context.account,
  });
  return NextResponse.json({ ok: true, logged: true });
}
