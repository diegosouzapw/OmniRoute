import {
  getProviderCredentials,
  markAccountUnavailable,
  clearAccountError,
  extractApiKey,
  isValidApiKey,
} from "../services/auth";
import { getModelInfo, getCombo } from "../services/model";
import { parseModel } from "@omniroute/open-sse/services/model.ts";
import { detectFormat, getTargetFormat } from "@omniroute/open-sse/services/provider.ts";
import { handleChatCore } from "@omniroute/open-sse/handlers/chatCore.ts";
import { errorResponse, unavailableResponse } from "@omniroute/open-sse/utils/error.ts";
import { handleComboChat } from "@omniroute/open-sse/services/combo.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import {
  getModelTargetFormat,
  PROVIDER_ID_TO_ALIAS,
} from "@omniroute/open-sse/config/providerModels.ts";
import {
  runWithProxyContext,
  runWithTlsTracking,
  isTlsFingerprintActive,
} from "@omniroute/open-sse/utils/proxyFetch.ts";
import * as log from "../utils/logger";
import { updateProviderCredentials, checkAndRefreshToken } from "../services/tokenRefresh";
import { getSettings, getCombos } from "@/lib/localDb";
import { resolveProxyForConnection } from "@/lib/localDb";
import { logProxyEvent } from "../../lib/proxyLogger";
import { logTranslationEvent } from "../../lib/translatorEvents";
import { sanitizeRequest } from "../../shared/utils/inputSanitizer";

// Pipeline integration — wired modules
import { getCircuitBreaker, CircuitBreakerOpenError } from "../../shared/utils/circuitBreaker";
import { isModelAvailable, setModelUnavailable } from "../../domain/modelAvailability";
import { RequestTelemetry, recordTelemetry } from "../../shared/utils/requestTelemetry";
import { generateRequestId } from "../../shared/utils/requestId";
import { recordCost } from "../../domain/costRules";
import { logAuditEvent } from "../../lib/compliance/index";
import { enforceApiKeyPolicy } from "../../shared/utils/apiKeyPolicy";

/**
 * Handle chat completion request
 * Supports: OpenAI, Claude, Gemini, OpenAI Responses API formats
 * Format detection and translation handled by translator
 */
export async function handleChat(request: any, clientRawRequest: any = null) {
  // Pipeline: Start request telemetry
  const reqId = generateRequestId();
  const telemetry = new RequestTelemetry(reqId);

  let body;
  try {
    telemetry.startPhase("parse");
    body = await request.json();
    telemetry.endPhase();
  } catch {
    log.warn("CHAT", "Invalid JSON body");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  // FASE-01: Input sanitization — prompt injection detection & PII redaction
  telemetry.startPhase("validate");
  const sanitizeResult = sanitizeRequest(body, log as any);
  if (sanitizeResult.blocked) {
    log.warn("SANITIZER", "Request blocked due to prompt injection", {
      detections: sanitizeResult.detections,
    });
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Request rejected: suspicious content detected");
  }
  if (sanitizeResult.modified && sanitizeResult.sanitizedBody) {
    body = sanitizeResult.sanitizedBody;
  }
  telemetry.endPhase();

  // Build clientRawRequest for logging (if not provided)
  if (!clientRawRequest) {
    const url = new URL(request.url);
    clientRawRequest = {
      endpoint: url.pathname,
      body,
      headers: Object.fromEntries(request.headers.entries()),
    };
  }

  // Log request endpoint and model
  const url = new URL(request.url);
  const modelStr = body.model;

  // Count messages (support both messages[] and input[] formats)
  const msgCount = body.messages?.length || body.input?.length || 0;
  const toolCount = body.tools?.length || 0;
  const effort = body.reasoning_effort || body.reasoning?.effort || null;
  log.request(
    "POST",
    `${url.pathname} | ${modelStr} | ${msgCount} msgs${toolCount ? ` | ${toolCount} tools` : ""}${effort ? ` | effort=${effort}` : ""}`
  );

  // Log API key (masked)
  const authHeader = request.headers.get("Authorization");
  const apiKey = extractApiKey(request);
  if (authHeader && apiKey) {
    log.debug("AUTH", `API Key: ${log.maskKey(apiKey)}`);
  } else {
    log.debug("AUTH", "No API key provided (local mode)");
  }

  // Optional strict API key mode for /v1 endpoints.
  // Keep disabled by default to preserve local-mode compatibility.
  if (process.env.REQUIRE_API_KEY === "true") {
    if (!apiKey) {
      log.warn("AUTH", "Missing API key while REQUIRE_API_KEY=true");
      return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Missing API key");
    }
    const valid = await isValidApiKey(apiKey);
    if (!valid) {
      log.warn("AUTH", "Invalid API key while REQUIRE_API_KEY=true");
      return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Invalid API key");
    }
  }

  if (!modelStr) {
    log.warn("CHAT", "Missing model");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing model");
  }

  // Pipeline: API key policy enforcement (model restrictions + budget limits)
  telemetry.startPhase("policy");
  const policy = await enforceApiKeyPolicy(request, modelStr);
  if (policy.rejection) {
    log.warn("POLICY", `API key policy rejected: ${modelStr} (key=${policy.apiKeyInfo?.id || "unknown"})`);
    return policy.rejection;
  }
  const apiKeyInfo = policy.apiKeyInfo;
  telemetry.endPhase();

  // Check if model is a combo (has multiple models with fallback)
  telemetry.startPhase("resolve");
  const combo = await getCombo(modelStr);
  if (combo) {
    log.info(
      "CHAT",
      `Combo "${modelStr}" [${combo.strategy || "priority"}] with ${combo.models.length} models`
    );

    // Pre-check function: skip models where all accounts are in cooldown
    // Uses modelAvailability module for TTL-based cooldowns
    const checkModelAvailable = async (modelString: string) => {
      // Use getModelInfo to properly resolve custom prefixes
      const modelInfo = await getModelInfo(modelString);
      const provider = modelInfo.provider;
      if (!provider) return true; // can't determine provider, let it try

      // Check domain-level availability (cooldown)
      if (!isModelAvailable(provider, modelInfo.model || modelString)) {
        log.debug("AVAILABILITY", `${provider}/${modelInfo.model} in cooldown, skipping`);
        return false;
      }

      const creds = await getProviderCredentials(provider);
      if (!creds || creds.allRateLimited) return false;
      return true;
    };

    // Fetch settings and all combos for config cascade and nested resolution
    const [settings, allCombos] = await Promise.all([
      getSettings().catch(() => ({})),
      getCombos().catch(() => []),
    ]);
    telemetry.endPhase();

    const response = await (handleComboChat as any)({
      body,
      combo,
      handleSingleModel: (b: any, m: string) =>
        handleSingleModelChat(b, m, clientRawRequest, request, combo.name, apiKeyInfo, telemetry),
      isModelAvailable: checkModelAvailable,
      log,
      settings,
      allCombos,
    });

    // Record telemetry
    recordTelemetry(telemetry);
    return response;
  }
  telemetry.endPhase();

  // Single model request
  const response = await handleSingleModelChat(
    body,
    modelStr,
    clientRawRequest,
    request,
    null,
    apiKeyInfo,
    telemetry
  );
  recordTelemetry(telemetry);
  return response;
}

/**
 * Handle single model chat request
 *
 * Refactored: model resolution, logging, pipeline gates, and chat execution
 * extracted to focused helpers. This function orchestrates the credential
 * retry loop.
 */
async function handleSingleModelChat(
  body: any,
  modelStr: string,
  clientRawRequest: any = null,
  request: any = null,
  comboName: string | null = null,
  apiKeyInfo: any = null,
  telemetry: any = null
) {
  // 1. Resolve model → provider/model
  const resolved = await resolveModelOrError(modelStr, body);
  if (resolved.error) return resolved.error;

  const { provider, model, sourceFormat, targetFormat } = resolved;

  // 2. Pipeline gates (availability + circuit breaker)
  const gate = checkPipelineGates(provider, model);
  if (gate) return gate;

  const breaker = getCircuitBreaker(provider, {
    failureThreshold: 5,
    resetTimeout: 30000,
    onStateChange: (name: string, from: string, to: string) =>
      log.info("CIRCUIT", `${name}: ${from} → ${to}`),
  });

  const userAgent = request?.headers?.get("user-agent") || "";

  // 3. Credential retry loop
  let excludeConnectionId = null;
  let lastError = null;
  let lastStatus = null;

  while (true) {
    const credentials = await getProviderCredentials(provider, excludeConnectionId);

    if (!credentials || credentials.allRateLimited) {
      return handleNoCredentials(
        credentials,
        excludeConnectionId,
        provider,
        model,
        lastError,
        lastStatus
      );
    }

    const accountId = credentials.connectionId.slice(0, 8);
    log.info("AUTH", `Using ${provider} account: ${accountId}...`);

    const refreshedCredentials = await checkAndRefreshToken(provider, credentials);
    const proxyInfo = await safeResolveProxy(credentials.connectionId);
    const proxyStartTime = Date.now();

    // 4. Execute chat via core (with circuit breaker + optional TLS)
    if (telemetry) telemetry.startPhase("connect");
    const { result, tlsFingerprintUsed } = await executeChatWithBreaker({
      breaker,
      body,
      provider,
      model,
      refreshedCredentials,
      proxyInfo,
      log,
      clientRawRequest,
      credentials,
      apiKeyInfo,
      userAgent,
      comboName,
    });
    if (telemetry) telemetry.endPhase();

    const proxyLatency = Date.now() - proxyStartTime;

    // 5. Log proxy + translation events
    safeLogEvents({
      result,
      proxyInfo,
      proxyLatency,
      provider,
      model,
      sourceFormat,
      targetFormat,
      credentials,
      comboName,
      clientRawRequest,
      tlsFingerprintUsed,
    });

    if (result.success) {
      recordCostIfNeeded(apiKeyInfo, result);
      if (telemetry) telemetry.startPhase("finalize");
      if (telemetry) telemetry.endPhase();
      return result.response;
    }

    // Pipeline: Mark model unavailable on repeated failures
    if (result.status === 429 || result.status === 503) {
      setModelUnavailable(provider, model, 60000, `HTTP ${result.status}`);
      log.info(
        "AVAILABILITY",
        `${provider}/${model} marked unavailable for 60s (HTTP ${result.status})`
      );
    }

    // 6. Fallback to next account
    const { shouldFallback } = await markAccountUnavailable(
      credentials.connectionId,
      result.status,
      result.error,
      provider
    );

    if (shouldFallback) {
      log.warn("AUTH", `Account ${accountId}... unavailable (${result.status}), trying fallback`);
      excludeConnectionId = credentials.connectionId;
      lastError = result.error;
      lastStatus = result.status;
      continue;
    }

    return result.response;
  }
}

// ──── Pipeline gate checks ────

/**
 * Resolve model string to provider/model info, or return an error response.
 */
async function resolveModelOrError(modelStr: string, body: any) {
  const modelInfo = await getModelInfo(modelStr);
  if (!modelInfo.provider) {
    if ((modelInfo as any).errorType === "ambiguous_model") {
      const message =
        (modelInfo as any).errorMessage ||
        `Ambiguous model '${modelStr}'. Use provider/model prefix (ex: gh/${modelStr} or cc/${modelStr}).`;
      log.warn("CHAT", message, {
        model: modelStr,
        candidates:
          (modelInfo as any).candidateAliases || (modelInfo as any).candidateProviders || [],
      });
      return { error: errorResponse(HTTP_STATUS.BAD_REQUEST, message) };
    }
    log.warn("CHAT", "Invalid model format", { model: modelStr });
    return { error: errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid model format") };
  }

  const { provider, model } = modelInfo;
  const sourceFormat = detectFormat(body);
  const providerAlias = PROVIDER_ID_TO_ALIAS[provider] || provider;
  const targetFormat = getModelTargetFormat(providerAlias, model) || getTargetFormat(provider);

  if (modelStr !== `${provider}/${model}`) {
    log.info("ROUTING", `${modelStr} → ${provider}/${model}`);
  } else {
    log.info("ROUTING", `Provider: ${provider}, Model: ${model}`);
  }

  return { provider, model, sourceFormat, targetFormat };
}

/**
 * Check pipeline gates: model availability + circuit breaker state.
 * Returns an error Response if blocked, or null if OK to proceed.
 */
function checkPipelineGates(provider: string, model: string) {
  if (!isModelAvailable(provider, model)) {
    log.warn("AVAILABILITY", `${provider}/${model} is in cooldown, rejecting request`);
    return (unavailableResponse as any)(
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      `Model ${provider}/${model} is temporarily unavailable (cooldown)`,
      30
    );
  }

  const breaker = getCircuitBreaker(provider, {
    failureThreshold: 5,
    resetTimeout: 30000,
    onStateChange: (name: string, from: string, to: string) =>
      log.info("CIRCUIT", `${name}: ${from} → ${to}`),
  });
  if (!breaker.canExecute()) {
    log.warn("CIRCUIT", `Circuit breaker OPEN for ${provider}, rejecting request`);
    return (unavailableResponse as any)(
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      `Provider ${provider} circuit breaker is open`,
      30
    );
  }

  return null;
}

// ──── Chat execution with circuit breaker ────

/**
 * Execute chat core wrapped in circuit breaker + optional TLS tracking.
 */
async function executeChatWithBreaker({
  breaker,
  body,
  provider,
  model,
  refreshedCredentials,
  proxyInfo,
  log: logger,
  clientRawRequest,
  credentials,
  apiKeyInfo,
  userAgent,
  comboName,
}: any): Promise<{ result: any; tlsFingerprintUsed: boolean }> {
  let tlsFingerprintUsed = false;

  try {
    const chatFn = () =>
      runWithProxyContext(proxyInfo?.proxy || null, () =>
        (handleChatCore as any)({
          body: { ...body, model: `${provider}/${model}` },
          modelInfo: { provider, model },
          credentials: refreshedCredentials,
          log: logger,
          clientRawRequest,
          connectionId: credentials.connectionId,
          apiKeyInfo,
          userAgent,
          comboName,
          onCredentialsRefreshed: async (newCreds: any) => {
            await updateProviderCredentials(credentials.connectionId, {
              accessToken: newCreds.accessToken,
              refreshToken: newCreds.refreshToken,
              providerSpecificData: newCreds.providerSpecificData,
              testStatus: "active",
            });
          },
          onRequestSuccess: async () => {
            await clearAccountError(credentials.connectionId, credentials);
          },
        })
      );

    if (!proxyInfo?.proxy && isTlsFingerprintActive()) {
      const tracked = await breaker.execute(async () => runWithTlsTracking(chatFn));
      return { result: tracked.result, tlsFingerprintUsed: tracked.tlsFingerprintUsed };
    }

    const result = await breaker.execute(chatFn);
    return { result, tlsFingerprintUsed: false };
  } catch (cbErr) {
    if (cbErr instanceof CircuitBreakerOpenError) {
      log.warn("CIRCUIT", `${provider} circuit open during retry: ${cbErr.message}`);
      return {
        result: {
          success: false,
          response: (unavailableResponse as any)(
            HTTP_STATUS.SERVICE_UNAVAILABLE,
            `Provider ${provider} circuit breaker is open`,
            Math.ceil(cbErr.retryAfterMs / 1000)
          ),
          status: HTTP_STATUS.SERVICE_UNAVAILABLE,
        },
        tlsFingerprintUsed: false,
      };
    }
    throw cbErr;
  }
}

/**
 * Record cost if API key has budget tracking enabled.
 */
function recordCostIfNeeded(apiKeyInfo: any, result: any) {
  if (!apiKeyInfo?.id) return;
  try {
    const usage = result.usage || {};
    const estimatedCost = ((usage.prompt_tokens || 0) + (usage.completion_tokens || 0)) * 0.000001;
    if (estimatedCost > 0) recordCost(apiKeyInfo.id, estimatedCost);
  } catch {}
}

// ──── Extracted helpers (T-28) ────

function handleNoCredentials(
  credentials: any,
  excludeConnectionId: string | null,
  provider: string,
  model: string,
  lastError: string | null,
  lastStatus: number | null
) {
  if (credentials?.allRateLimited) {
    const errorMsg = lastError || credentials.lastError || "Unavailable";
    const status =
      lastStatus || Number(credentials.lastErrorCode) || HTTP_STATUS.SERVICE_UNAVAILABLE;
    log.warn("CHAT", `[${provider}/${model}] ${errorMsg} (${credentials.retryAfterHuman})`);
    return unavailableResponse(
      status,
      `[${provider}/${model}] ${errorMsg}`,
      credentials.retryAfter,
      credentials.retryAfterHuman
    );
  }
  if (!excludeConnectionId) {
    log.error("AUTH", `No credentials for provider: ${provider}`);
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `No credentials for provider: ${provider}`);
  }
  log.warn("CHAT", "No more accounts available", { provider });
  return errorResponse(
    lastStatus || HTTP_STATUS.SERVICE_UNAVAILABLE,
    lastError || "All accounts unavailable"
  );
}

async function safeResolveProxy(connectionId: string) {
  try {
    return await resolveProxyForConnection(connectionId);
  } catch (proxyErr: any) {
    log.debug("PROXY", `Failed to resolve proxy: ${proxyErr.message}`);
    return null;
  }
}

function safeLogEvents({
  result,
  proxyInfo,
  proxyLatency,
  provider,
  model,
  sourceFormat,
  targetFormat,
  credentials,
  comboName,
  clientRawRequest,
  tlsFingerprintUsed = false,
}) {
  try {
    logProxyEvent({
      status: result.success
        ? "success"
        : result.status === 408 || result.status === 504
          ? "timeout"
          : "error",
      proxy: proxyInfo?.proxy || null,
      level: proxyInfo?.level || "direct",
      levelId: proxyInfo?.levelId || null,
      provider,
      targetUrl: `${provider}/${model}`,
      latencyMs: proxyLatency,
      error: result.success ? null : result.error || null,
      connectionId: credentials.connectionId,
      comboId: comboName || null,
      account: credentials.connectionId?.slice(0, 8) || null,
      tlsFingerprint: tlsFingerprintUsed,
    });
  } catch {}
  try {
    logTranslationEvent({
      provider,
      model,
      sourceFormat,
      targetFormat,
      status: result.success ? "success" : "error",
      statusCode: result.success ? 200 : result.status || 500,
      latency: proxyLatency,
      endpoint: clientRawRequest?.endpoint || "/v1/chat/completions",
      connectionId: credentials.connectionId || null,
      comboName: comboName || null,
    });
  } catch {}
}
