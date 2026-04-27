import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { CodexExecutor } from "@omniroute/open-sse/executors/codex.ts";
import { getApiKeyMetadata } from "@/lib/db/apiKeys";
import { authorizeWebSocketHandshake, extractWsTokenFromRequest } from "@/lib/ws/handshake";
import { getModelInfo } from "@/sse/services/model";
import { getProviderCredentialsWithQuotaPreflight } from "@/sse/services/auth";
import { checkAndRefreshToken } from "@/sse/services/tokenRefresh";

const CODEX_RESPONSES_WS_URL = "wss://chatgpt.com/backend-api/codex/responses";
const executor = new CodexExecutor();

type JsonRecord = Record<string, unknown>;

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
  const modelInfo = await getModelInfo(requestedModel);
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

  const transformed = (await executor.transformRequest(
    model,
    responseBody,
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
    model,
    headers,
    response: transformed,
  });
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

  return jsonError(400, "invalid_action", "Unsupported bridge action");
}
