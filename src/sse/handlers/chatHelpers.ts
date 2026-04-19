import { getModelInfo } from "../services/model";
import { clearAccountError } from "../services/auth";
import * as log from "../utils/logger";
import { updateProviderCredentials } from "../services/tokenRefresh";
import {
  detectFormatFromEndpoint,
  getTargetFormat,
} from "@omniroute/open-sse/services/provider.ts";
import {
  getModelTargetFormat,
  PROVIDER_ID_TO_ALIAS,
} from "@omniroute/open-sse/config/providerModels.ts";
import { handleChatCore } from "@omniroute/open-sse/handlers/chatCore.ts";
import {
  errorResponse,
  modelCooldownResponse,
  unavailableResponse,
} from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import {
  runWithProxyContext,
  runWithTlsTracking,
  isTlsFingerprintActive,
} from "@omniroute/open-sse/utils/proxyFetch.ts";
import { resolveProxyForConnection } from "@/lib/localDb";
import { getCircuitBreaker, CircuitBreakerOpenError } from "../../shared/utils/circuitBreaker";
import { getModelCooldownInfo, isModelAvailable } from "../../domain/modelAvailability";
import { logProxyEvent } from "../../lib/proxyLogger";
import { logTranslationEvent } from "../../lib/translatorEvents";
import { getRuntimeProviderProfile } from "@omniroute/open-sse/services/accountFallback.ts";

export async function resolveModelOrError(modelStr: string, body: any, endpointPath: string = "") {
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

  const { provider, model, extendedContext } = modelInfo;
  const sourceFormat = detectFormatFromEndpoint(body, endpointPath);
  const providerAlias = PROVIDER_ID_TO_ALIAS[provider] || provider;
  let targetFormat = getModelTargetFormat(providerAlias, model) || getTargetFormat(provider);
  if ((modelInfo as any).apiFormat === "responses") {
    targetFormat = "openai-responses";
    log.info("ROUTING", `Custom model apiFormat=responses → targetFormat=openai-responses`);
  }

  const ctxTag = extendedContext && providerAlias === "claude" ? " [1m]" : "";
  if (modelStr !== `${provider}/${model}`) {
    log.info("ROUTING", `${modelStr} → ${provider}/${model}${ctxTag}`);
  } else {
    log.info("ROUTING", `Provider: ${provider}, Model: ${model}${ctxTag}`);
  }

  return { provider, model, sourceFormat, targetFormat, extendedContext };
}

export async function checkPipelineGates(
  provider: string,
  model: string,
  options: {
    ignoreCircuitBreaker?: boolean;
    ignoreModelCooldown?: boolean;
    bypassReason?: string;
    providerProfile?: {
      circuitBreakerThreshold?: number;
      circuitBreakerReset?: number;
    } | null;
  } = {}
) {
  const bypassReason = options.bypassReason || "pipeline override";
  const modelAvailable = isModelAvailable(provider, model);
  if (!modelAvailable && options.ignoreModelCooldown) {
    log.info("AVAILABILITY", `${provider}/${model} cooldown bypassed (${bypassReason})`);
  } else if (!modelAvailable) {
    const cooldownInfo = getModelCooldownInfo(provider, model);
    const retryAfterSec = cooldownInfo
      ? Math.max(Math.ceil(cooldownInfo.remainingMs / 1000), 1)
      : 1;
    log.warn("AVAILABILITY", `${provider}/${model} is in cooldown, rejecting request`);
    return unavailableResponse(
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      `Model ${provider}/${model} is temporarily unavailable (cooldown)`,
      retryAfterSec
    );
  }

  const providerProfile = options.providerProfile ?? (await getRuntimeProviderProfile(provider));
  const breaker = getCircuitBreaker(provider, {
    failureThreshold: providerProfile.circuitBreakerThreshold,
    resetTimeout: providerProfile.circuitBreakerReset,
    onStateChange: (name: string, from: string, to: string) =>
      log.info("CIRCUIT", `${name}: ${from} → ${to}`),
  });
  if (options.ignoreCircuitBreaker && !breaker.canExecute()) {
    log.info("CIRCUIT", `Bypassing OPEN circuit breaker for ${provider} (${bypassReason})`);
  } else if (!breaker.canExecute()) {
    const retryAfterMs = breaker.getRetryAfterMs();
    const retryAfterSec = Math.max(Math.ceil(retryAfterMs / 1000), 1);
    log.warn("CIRCUIT", `Circuit breaker OPEN for ${provider}, rejecting request`);
    return unavailableResponse(
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      `Provider ${provider} circuit breaker is open`,
      retryAfterSec
    );
  }

  return null;
}

export async function executeChatWithBreaker({
  bypassCircuitBreaker,
  breaker,
  body,
  provider,
  model,
  refreshedCredentials,
  proxyInfo,
  log: handlerLog,
  clientRawRequest,
  credentials,
  apiKeyInfo,
  userAgent,
  comboName,
  comboStrategy,
  isCombo,
  comboStepId,
  comboExecutionKey,
  extendedContext,
}: any): Promise<{ result: any; tlsFingerprintUsed: boolean }> {
  let tlsFingerprintUsed = false;

  try {
    const chatFn = () =>
      runWithProxyContext(proxyInfo?.proxy || null, () =>
        (handleChatCore as any)({
          body: { ...body, model: `${provider}/${model}` },
          modelInfo: { provider, model, extendedContext },
          credentials: refreshedCredentials,
          log: handlerLog,
          clientRawRequest,
          connectionId: credentials.connectionId,
          apiKeyInfo,
          userAgent,
          comboName,
          comboStrategy,
          isCombo,
          comboStepId,
          comboExecutionKey,
          onCredentialsRefreshed: async (newCreds: any) => {
            await updateProviderCredentials(credentials.connectionId, {
              accessToken: newCreds.accessToken,
              refreshToken: newCreds.refreshToken,
              expiresIn: newCreds.expiresIn,
              expiresAt: newCreds.expiresAt,
              providerSpecificData: newCreds.providerSpecificData,
              testStatus: "active",
            });
          },
          onRequestSuccess: async () => {
            await clearAccountError(credentials.connectionId, credentials);
          },
        })
      );

    if (bypassCircuitBreaker) {
      if (!proxyInfo?.proxy && isTlsFingerprintActive()) {
        const tracked = await runWithTlsTracking(chatFn);
        return { result: tracked.result, tlsFingerprintUsed: tracked.tlsFingerprintUsed };
      }

      const result = await chatFn();
      return { result, tlsFingerprintUsed: false };
    }

    if (!proxyInfo?.proxy && isTlsFingerprintActive()) {
      const tracked = await breaker.execute(async () => runWithTlsTracking(chatFn));
      return { result: tracked.result, tlsFingerprintUsed: tracked.tlsFingerprintUsed };
    }

    const result = await breaker.execute(chatFn);
    return { result, tlsFingerprintUsed: false };
  } catch (cbErr: any) {
    if (cbErr instanceof CircuitBreakerOpenError) {
      log.warn("CIRCUIT", `${provider} circuit open during retry: ${cbErr.message}`);
      return {
        result: {
          success: false,
          response: unavailableResponse(
            HTTP_STATUS.SERVICE_UNAVAILABLE,
            `Provider ${provider} circuit breaker is open`,
            Math.ceil(cbErr.retryAfterMs / 1000)
          ),
          status: HTTP_STATUS.SERVICE_UNAVAILABLE,
        },
        tlsFingerprintUsed: false,
      };
    }

    if (cbErr?.code === "PROXY_UNREACHABLE" || /proxy unreachable/i.test(cbErr?.message || "")) {
      const detail = cbErr?.message || "Proxy unreachable";
      log.warn("PROXY", detail);
      return {
        result: {
          success: false,
          response: unavailableResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, detail, 2),
          status: HTTP_STATUS.SERVICE_UNAVAILABLE,
          error: detail,
        },
        tlsFingerprintUsed: false,
      };
    }

    throw cbErr;
  }
}

export function handleNoCredentials(
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
    const cooldownModel =
      typeof credentials.cooldownModel === "string" && credentials.cooldownModel.trim().length > 0
        ? credentials.cooldownModel.trim()
        : model;

    if (credentials.cooldownScope === "model" && Number(status) === HTTP_STATUS.RATE_LIMITED) {
      log.warn(
        "CHAT",
        `[${provider}/${cooldownModel}] all credentials cooling down${
          credentials.retryAfterHuman ? ` (${credentials.retryAfterHuman})` : ""
        }`
      );
      return modelCooldownResponse({
        model: cooldownModel,
        retryAfter: credentials.retryAfter,
      });
    }

    log.warn("CHAT", `[${provider}/${model}] ${errorMsg} (${credentials.retryAfterHuman})`);
    return unavailableResponse(
      status,
      `[${provider}/${model}] ${errorMsg}`,
      credentials.retryAfter,
      credentials.retryAfterHuman
    );
  }
  if (lastError && lastStatus) {
    log.warn("CHAT", "Preserving last upstream error after credential exhaustion", {
      provider,
      model,
      lastStatus,
    });
    return errorResponse(lastStatus, lastError);
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

export async function safeResolveProxy(connectionId: string) {
  try {
    return await resolveProxyForConnection(connectionId);
  } catch (proxyErr: any) {
    log.debug("PROXY", `Failed to resolve proxy: ${proxyErr.message}`);
    return null;
  }
}

export function safeLogEvents({
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

export function withSessionHeader(response: Response, sessionId: string | null): Response {
  if (!response || !sessionId) return response;

  try {
    response.headers.set("X-OmniRoute-Session-Id", sessionId);
    return response;
  } catch {
    const cloned = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
    cloned.headers.set("X-OmniRoute-Session-Id", sessionId);
    return cloned;
  }
}
