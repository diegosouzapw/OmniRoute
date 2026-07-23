import { NextResponse } from "next/server";
import { createHash, randomUUID, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { CodexExecutor } from "@omniroute/open-sse/executors/codex.ts";
import { getApiKeyMetadata } from "@/lib/db/apiKeys";
import { authorizeWebSocketHandshake, extractWsTokenFromRequest } from "@/lib/ws/handshake";
import { getModelInfo } from "@/sse/services/model";
import { getProviderCredentialsWithQuotaPreflight } from "@/sse/services/auth";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
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
import { resolveProxy } from "@omniroute/open-sse/utils/networkProxy.ts";
import { proxyConfigToUrl } from "@omniroute/open-sse/utils/proxyDispatcher.ts";
import {
  attachReasoningRuleDirective,
  applyReasoningRuleDirective,
  extractReasoningIntent,
  resolveReasoningSourceModels,
  resolveReasoningRoutingRule,
  validateCodexWsDecision,
} from "@/lib/reasoningRouting/policy";
import { resolveRequestRoutingTags } from "@/domain/tagRouter";
import { validateApiKeyRoutingTarget } from "@/shared/utils/apiKeyPolicy";
import { persistResponsesWsCallHistory } from "./history";
import { applyResponsesWsCompression } from "./compression";

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

/**
 * #6564: the WS bridge authenticates the API key (see `authenticate()`) but
 * historically never enforced the API-key model/combo policy the HTTP
 * `/v1/responses` path enforces via `enforceApiKeyPolicy()` — a key
 * restricted to `allowedModels`/`allowedCombos` could still reach a direct
 * Codex model through this transport. The bridge's token arrives via query
 * params, not a normal Authorization header, so this builds an equivalent
 * Request carrying the extracted bearer token and evaluates policy against
 * the CLIENT-requested model, before any Codex-specific remapping.
 */
async function enforceCodexWsApiKeyPolicy(
  authRequest: Request,
  apiKey: string | null,
  requestedModel: string
): Promise<{ rejection: Response | null; apiKeyInfo: ApiKeyMetadata | null }> {
  const policyHeaders = new Headers(authRequest.headers);
  if (apiKey) policyHeaders.set("Authorization", `Bearer ${apiKey}`);
  const policyRequest = new Request(authRequest.url, { headers: policyHeaders });
  const policy = await enforceApiKeyPolicy(policyRequest, requestedModel);
  return { rejection: policy.rejection, apiKeyInfo: policy.apiKeyInfo };
}

async function prepareReasoningRoute(
  authRequest: Request,
  apiKey: string | null,
  metadata: ApiKeyMetadata | null,
  requestedModel: string,
  responseBody: JsonRecord
) {
  const reasoningIntent = extractReasoningIntent(requestedModel, responseBody);
  const sourceModels = await resolveReasoningSourceModels(reasoningIntent.model, (model) =>
    resolveCodexWsModelInfo(model, getModelInfo)
  );
  reasoningIntent.model = sourceModels.normalized;
  const routingTags = resolveRequestRoutingTags(responseBody);
  const routeInput = {
    sourceModel: reasoningIntent.model,
    sourceModelAliases: sourceModels.aliases,
    sourceEffort: reasoningIntent.sourceEffort,
    hasReasoningSignal: reasoningIntent.hasReasoningSignal,
    hasThinkingBudget: reasoningIntent.hasThinkingBudget,
    apiKeyId: metadata?.id ?? null,
    requestTags: routingTags.tags,
  };
  let decision = await resolveReasoningRoutingRule(routeInput);
  if (decision) {
    const transportError = validateCodexWsDecision(decision);
    if (transportError)
      return { error: jsonError(400, "reasoning_route_transport", transportError) };
    if (decision.capability === "unsupported") {
      return {
        error: jsonError(
          400,
          "reasoning_effort_unsupported",
          "The configured reasoning effort is not supported by the target model"
        ),
      };
    }
    const rejection = await validateApiKeyRoutingTarget(
      authRequest,
      apiKey,
      metadata,
      decision.targetModel
    );
    if (rejection) return { error: rejection };
  }
  return { decision, intent: reasoningIntent, sourceModels, routingTags };
}

async function resolveCodexCredentials(
  provider: string,
  model: string,
  allowedConnections: string[] | null
) {
  const credentials = await getProviderCredentialsWithQuotaPreflight(
    provider,
    null,
    allowedConnections,
    model
  );
  if (!credentials || "allRateLimited" in credentials) {
    return {
      error: jsonError(
        503,
        "codex_credentials_unavailable",
        "No available Codex OAuth connection for Responses WebSocket"
      ),
    };
  }
  const refreshed = await checkAndRefreshToken(provider, credentials);
  if (!refreshed?.accessToken) {
    return {
      error: jsonError(401, "codex_oauth_token_missing", "Codex OAuth access token is missing"),
    };
  }
  return { credentials: refreshed };
}

async function resolveCodexRequestContext(body: JsonRecord) {
  if (!isFeatureFlagEnabled("OMNIROUTE_CODEX_WS_ENABLED")) {
    return {
      error: jsonError(503, "codex_ws_disabled", "Codex Responses WebSocket transport is disabled"),
    };
  }
  const authResponse = await authenticate(body);
  if (!authResponse.ok) return { error: authResponse };

  const authRequest = getAuthRequest(body);
  const apiKey = extractWsTokenFromRequest(authRequest);
  const responseBody = isRecord(body.response) ? body.response : {};
  const requestedModel =
    typeof responseBody.model === "string" && responseBody.model.trim()
      ? responseBody.model.trim()
      : "gpt-5.5";
  const policyResult = await enforceCodexWsApiKeyPolicy(authRequest, apiKey, requestedModel);
  if (policyResult.rejection) return { error: policyResult.rejection };
  const metadata =
    policyResult.apiKeyInfo ?? (apiKey ? await getApiKeyMetadata(apiKey).catch(() => null) : null);
  const allowedConnections =
    metadata && Array.isArray(metadata.allowedConnections) && metadata.allowedConnections.length > 0
      ? metadata.allowedConnections
      : null;
  const reasoningRoute = await prepareReasoningRoute(
    authRequest,
    apiKey,
    metadata,
    requestedModel,
    responseBody
  );
  if (reasoningRoute.error) return { error: reasoningRoute.error };
  return {
    authRequest,
    apiKey,
    responseBody,
    requestedModel,
    metadata,
    allowedConnections,
    ...reasoningRoute,
  };
}

async function resolveCodexUpstreamContext(
  context: Awaited<ReturnType<typeof resolveCodexRequestContext>>
) {
  if ("error" in context) return context;
  const routedModel = context.decision?.targetModel ?? context.requestedModel;
  const modelInfo = await resolveCodexWsModelInfo(routedModel, getModelInfo);
  const provider = modelInfo.provider;
  const model = modelInfo.model || context.requestedModel;
  if (provider !== "codex") {
    return {
      error: jsonError(
        400,
        "codex_ws_provider_required",
        `Responses WebSocket bridge only supports Codex models, got ${provider || "unknown"}`
      ),
    };
  }
  const credentialResult = await resolveCodexCredentials(
    provider,
    model,
    context.allowedConnections
  );
  if (credentialResult.error) return credentialResult;
  let reasoningDecision = context.decision;
  if (!reasoningDecision) {
    reasoningDecision = await resolveReasoningRoutingRule({
      sourceModel: context.intent.model,
      sourceModelAliases: context.sourceModels.aliases,
      sourceEffort: context.intent.sourceEffort,
      hasReasoningSignal: context.intent.hasReasoningSignal,
      hasThinkingBudget: context.intent.hasThinkingBudget,
      apiKeyId: context.metadata?.id ?? null,
      connectionId: credentialResult.credentials.connectionId,
      requestTags: context.routingTags.tags,
      connectionOnly: true,
      capabilityModel: `codex/${model}`,
    });
    if (reasoningDecision?.capability === "unsupported") {
      return {
        error: jsonError(
          400,
          "reasoning_effort_unsupported",
          "The configured reasoning effort is not supported by the selected Codex connection model"
        ),
      };
    }
  }
  return {
    ...context,
    provider,
    model,
    credentials: credentialResult.credentials,
    reasoningDecision,
  };
}

async function resolveCodexProxy(provider: string): Promise<string | undefined> {
  try {
    return proxyConfigToUrl(await resolveProxy(provider)) || undefined;
  } catch (err) {
    logger.warn(`[codex-responses-ws] proxy resolution failed: ${sanitizeErrorMessage(err)}`);
    return undefined;
  }
}

async function prepare(body: JsonRecord) {
  const context = await resolveCodexRequestContext(body);
  if ("error" in context) return context.error;
  const upstream = await resolveCodexUpstreamContext(context);
  if ("error" in upstream) return upstream.error;
  const { responseBody, metadata, provider, model, credentials: refreshedCredentials } = upstream;
  const reasoningDecision = upstream.reasoningDecision;

  let responseBodyWithMemory = await maybeInjectResponsesWsMemory(responseBody, metadata);
  let reasoningRouting: JsonRecord | null = null;
  if (reasoningDecision) {
    const withDirective = attachReasoningRuleDirective(responseBodyWithMemory, reasoningDecision);
    reasoningRouting = isRecord(withDirective._omnirouteReasoningRouteTrace)
      ? withDirective._omnirouteReasoningRouteTrace
      : null;
    responseBodyWithMemory = applyReasoningRuleDirective(withDirective) as JsonRecord;
    delete responseBodyWithMemory._omnirouteReasoningRouteTrace;
  }
  // #8052: the WS bridge previously skipped the whole prompt-compression pipeline that the
  // HTTP/SSE path (chatCore.ts) runs on every request — wire the same core pipeline in here,
  // per logical turn, before handing off to the executor.
  responseBodyWithMemory = await applyResponsesWsCompression(responseBodyWithMemory, {
    provider,
    model,
    requestId: randomUUID(),
  });
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

  // #5611: apply the configured Global/provider proxy to the upstream Codex
  // Responses WebSocket too. The downstream client→OmniRoute hop works, but the
  // upstream wreq-js.websocket() connect previously ignored the Proxy Registry,
  // so a no-direct-egress container failed with a DNS lookup error.
  const proxy = await resolveCodexProxy(provider);

  return NextResponse.json({
    ok: true,
    upstreamUrl: CODEX_RESPONSES_WS_URL,
    // #5591: chrome_149 does not exist in wreq-js 2.3.1 (max chrome_147) → the
    // native layer yields a degenerate TLS fingerprint and ChatGPT rejects the
    // upgrade ("Invalid JSON body"). chrome_142 is the profile that shipped in
    // v3.8.39 and is confirmed working against this upstream.
    browser: "chrome_142",
    os: "windows",
    connectionId: refreshedCredentials.connectionId,
    provider,
    account: refreshedCredentials.email || null,
    model,
    headers,
    proxy,
    reasoningRouting,
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
