import { getModelInfo, getComboForModel } from "../services/model";
import { clearAccountError, markAccountUnavailable } from "../services/auth";
import { connectionHasExtraKeys } from "@omniroute/open-sse/services/apiKeyRotator.ts";
import { createBuiltinAutoCombo } from "@omniroute/open-sse/services/autoCombo/builtinCatalog.ts";
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
  providerCircuitOpenResponse,
  unavailableResponse,
} from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import {
  runWithProxyContext,
  runWithTlsTracking,
  isTlsFingerprintActive,
} from "@omniroute/open-sse/utils/proxyFetch.ts";
import { resolveProxyForConnection } from "@/lib/localDb";
import { CircuitBreakerOpenError, getCircuitBreaker } from "../../shared/utils/circuitBreaker";
import { classify429FromError, type FailureKind } from "../../shared/utils/classify429";
import { resolveUseUpstream429BreakerHints } from "../../shared/utils/providerHints";

import { logProxyEvent } from "../../lib/proxyLogger";
import { logTranslationEvent } from "../../lib/translatorEvents";
import { getRuntimeProviderProfile } from "@omniroute/open-sse/services/accountFallback.ts";

// Models that explicitly cannot run on the codex/ChatGPT-Pro OAuth pool — when
// a caller writes `codex/deepseek-v4-pro` we transparently reroute to the
// canonical provider whose API key is configured. Saves callers from having
// to know about the OAuth-vs-API-key split.
const NON_OAUTH_MODEL_PREFIX = /^(deepseek|qwen|kimi|glm|minimax|mimo)/i;
const PREFERRED_BY_FAMILY: Record<string, string> = {
  deepseek: "deepseek",
  qwen: "bailian",
  kimi: "moonshot",
  glm: "zhipu",
  minimax: "minimax",
  mimo: "moonshot",
};

const CODEX_NATIVE_RESPONSES_MODELS = new Set(["gpt-5.5"]);

type TrafficType = "production" | "shadow";

type ExecuteChatWithBreakerOptions = {
  trafficType?: TrafficType;
  [key: string]: any;
};

function getHeaderValue(headers: Record<string, unknown> | null | undefined, name: string) {
  if (!headers || typeof headers !== "object") return "";
  const lowerName = name.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() !== lowerName) continue;
    return Array.isArray(value) ? value.join(",") : String(value ?? "");
  }
  return "";
}

function isCodexNativeResponsesRequest(
  body: any,
  endpointPath: string,
  headers: Record<string, unknown> | null | undefined
) {
  const normalizedEndpoint = String(endpointPath || "").replace(/\/+$/, "");
  if (!/(^|\/)responses(?=\/|$)/i.test(normalizedEndpoint)) return false;
  if (/\/responses\/compact$/i.test(normalizedEndpoint)) return true;

  const userAgent = getHeaderValue(headers, "user-agent").toLowerCase();
  if (userAgent.includes("codex")) return true;
  if (getHeaderValue(headers, "x-codex-session-id")) return true;
  if (getHeaderValue(headers, "x-codex-window-id")) return true;
  if (getHeaderValue(headers, "x-codex-turn-metadata")) return true;

  const metadataSource =
    body && typeof body === "object" && body.metadata && typeof body.metadata === "object"
      ? String(body.metadata.source || "")
      : "";
  return metadataSource.toLowerCase().includes("codex");
}

async function hasOnlyActiveCodexAccount() {
  try {
    const { getProviderConnections } = await import("@/lib/db/providers");
    const connections = await getProviderConnections({ isActive: true });
    const providers = new Set(
      connections
        .map((connection: any) => String(connection?.provider || "").trim())
        .filter(Boolean)
    );
    return providers.size === 1 && providers.has("codex");
  } catch {
    return false;
  }
}

export async function resolveModelOrError(
  modelStr: string,
  body: any,
  endpointPath: string = "",
  requestHeaders: Record<string, unknown> | null | undefined = null
) {
  const modelInfo = await getModelInfo(modelStr);
  const sourceFormat = detectFormatFromEndpoint(body, endpointPath);

  if (
    modelInfo.provider === "openai" &&
    typeof modelInfo.model === "string" &&
    CODEX_NATIVE_RESPONSES_MODELS.has(modelInfo.model) &&
    sourceFormat === "openai-responses" &&
    isCodexNativeResponsesRequest(body, endpointPath, requestHeaders)
  ) {
    log.info("ROUTING", `${modelStr} → codex/${modelInfo.model} (Codex native responses)`);
    modelInfo.provider = "codex";
  }

  if (
    modelInfo.provider === "openai" &&
    modelInfo.model === "gpt-5.5" &&
    sourceFormat === "openai-responses" &&
    !isCodexNativeResponsesRequest(body, endpointPath, requestHeaders) &&
    (await hasOnlyActiveCodexAccount())
  ) {
    // #2877: keep the bare model id (do NOT bake a `-medium` suffix). The Codex
    // executor reads a model-name suffix as an explicit `modelEffort` that (per
    // #2331) overrides the client's `reasoning.effort`, so injecting `-medium`
    // here silently demoted a genuine `reasoning.effort=xhigh`. The default
    // effort still comes from the connection fallback when the client sends none.
    log.info("ROUTING", `${modelStr} → codex/gpt-5.5 (Codex-only active account)`);
    modelInfo.provider = "codex";
    modelInfo.model = "gpt-5.5";
  }

  // Forced-rewrite: codex provider doesn't serve DeepSeek/Qwen/Kimi/etc. Reroute
  // these to their canonical native provider so the request lands on the right
  // upstream API key instead of failing with a 400 on the OAuth account.
  // Ambiguous candidates (e.g. deepseek-v4-pro lives on both ds + opencode-go)
  // resolve to the model-family's native provider via NON_OAUTH_PROVIDER_BY_FAMILY.
  if (
    modelInfo.provider === "codex" &&
    typeof modelInfo.model === "string" &&
    NON_OAUTH_MODEL_PREFIX.test(modelInfo.model)
  ) {
    log.info(
      "ROUTING",
      `codex/${modelInfo.model} → re-resolving via native provider (codex OAuth does not serve this model)`
    );
    const rerouted = await getModelInfo(modelInfo.model);
    if (rerouted.provider && rerouted.provider !== "codex") {
      log.info("ROUTING", `codex/${modelInfo.model} → ${rerouted.provider}/${rerouted.model}`);
      Object.assign(modelInfo, rerouted);
    } else if ((rerouted as any).errorType === "ambiguous_model") {
      const candidates: string[] = (rerouted as any).candidateProviders || [];
      const family = modelInfo.model.match(NON_OAUTH_MODEL_PREFIX)?.[1]?.toLowerCase();
      const pick = family && PREFERRED_BY_FAMILY[family];
      if (pick && candidates.includes(pick)) {
        log.info(
          "ROUTING",
          `codex/${modelInfo.model} → ${pick}/${modelInfo.model} (ambiguity resolved by family)`
        );
        modelInfo.provider = pick;
        modelInfo.model = (rerouted as any).model;
      }
    }
  }

  // "auto" is a built-in virtual combo prefix, not a provider. parseModel("auto/fast")
  // splits it into provider="auto" model="fast", so resolve it before credential lookup.
  if (modelInfo.provider === "auto") {
    const suffix = modelInfo.model || "";
    const fuzzyCandidates = [`auto/best-${suffix}`, `auto/${suffix}`];

    const exactCombo = await getComboForModel(modelStr);
    if (exactCombo) {
      log.info("ROUTING", `"auto" provider → combo "${modelStr}"`);
      return { combo: exactCombo, provider: "auto", model: suffix };
    }

    // Preserve persisted fuzzy combo behavior before falling back to built-in virtual catalog ids.
    for (const candidate of fuzzyCandidates) {
      const fuzzyCombo = await getComboForModel(candidate);
      if (fuzzyCombo) {
        log.info("ROUTING", `"auto/${suffix}" → combo "${candidate}" (fuzzy)`);
        return { combo: fuzzyCombo, provider: "auto", model: suffix };
      }
    }

    try {
      const virtualCombo = await createBuiltinAutoCombo(modelStr, suffix);
      log.info(
        "AUTO",
        `"auto" provider → built-in virtual combo "${modelStr}" (${virtualCombo.candidatePool?.length || 0} candidates)`
      );
      return { combo: virtualCombo, provider: "auto", model: suffix };
    } catch (err) {
      log.warn("CHAT", `Failed to create built-in auto combo "${modelStr}"`, { err });
    }

    // Fuzzy: "fast" → "auto/best-fast", "chat" → "auto/best-chat"
    for (const candidate of fuzzyCandidates) {
      try {
        const virtualCombo = await createBuiltinAutoCombo(
          candidate,
          candidate.replace(/^auto\/?/, "")
        );
        log.info(
          "AUTO",
          `"auto/${suffix}" → built-in virtual combo "${candidate}" (fuzzy, ${virtualCombo.candidatePool?.length || 0} candidates)`
        );
        return { combo: virtualCombo, provider: "auto", model: suffix };
      } catch {
        /* Try next fuzzy candidate */
      }
    }

    const message = `Model '${modelStr}' is not a valid combo or provider. Unknown built-in auto combo.`;
    log.warn("CHAT", message, { model: modelStr });
    return { error: errorResponse(HTTP_STATUS.BAD_REQUEST, message) };
  }

  if (!modelInfo.provider) {
    // model_not_found: raised by resolveModelByProviderInference when no
    // provider could be inferred — return a clear error instead of the
    // misleading "openai" default that the old code silently fell back to.
    if ((modelInfo as any).errorType === "model_not_found") {
      const message =
        (modelInfo as any).errorMessage ||
        `Model '${modelStr}' could not be resolved to a known provider.`;
      log.warn("CHAT", message, { model: modelStr });
      return { error: errorResponse(HTTP_STATUS.BAD_REQUEST, message) };
    }

    if ((modelInfo as any).errorType === "ambiguous_model") {
      // Family disambiguation: if the model name begins with a known
      // non-OAuth family prefix, auto-pick the family-native provider
      // from the candidate set instead of returning a 400. Saves callers
      // (codex CLI, hermes, etc.) from having to guess the right alias.
      const candidates: string[] = (modelInfo as any).candidateProviders || [];
      const modelLower = (modelInfo.model || modelStr).toLowerCase();
      const family = modelLower.match(NON_OAUTH_MODEL_PREFIX)?.[1];
      const pick = family && PREFERRED_BY_FAMILY[family];
      if (pick && candidates.includes(pick)) {
        log.info(
          "ROUTING",
          `${modelStr} → ${pick}/${modelInfo.model} (ambiguity auto-resolved by family)`
        );
        modelInfo.provider = pick;
      } else {
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
    } else {
      log.warn("CHAT", "Invalid model format", { model: modelStr });
      return { error: errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid model format") };
    }
  }

  const { provider, model, extendedContext } = modelInfo;
  // apiFormat: optional custom-model marker — see chatCore.ts for shape narrowing rationale.
  const apiFormat: string | undefined =
    modelInfo && typeof modelInfo === "object" && "apiFormat" in modelInfo
      ? typeof (modelInfo as { apiFormat?: unknown }).apiFormat === "string"
        ? ((modelInfo as { apiFormat?: string }).apiFormat as string)
        : undefined
      : undefined;
  const providerAlias = PROVIDER_ID_TO_ALIAS[provider] || provider;
  let targetFormat = getModelTargetFormat(providerAlias, model) || getTargetFormat(provider);
  if (apiFormat === "responses") {
    targetFormat = "openai-responses";
    log.info("ROUTING", `Custom model apiFormat=responses → targetFormat=openai-responses`);
  }

  const ctxTag = extendedContext && providerAlias === "claude" ? " [1m]" : "";
  if (modelStr !== `${provider}/${model}`) {
    log.info("ROUTING", `${modelStr} → ${provider}/${model}${ctxTag}`);
  } else {
    log.info("ROUTING", `Provider: ${provider}, Model: ${model}${ctxTag}`);
  }

  return { provider, model, sourceFormat, targetFormat, extendedContext, apiFormat };
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
      failureThreshold?: number;
      degradationThreshold?: number;
      resetTimeoutMs?: number;
    } | null;
  } = {}
) {
  const bypassReason = options.bypassReason || "pipeline override";
  const providerProfile = options.providerProfile ?? (await getRuntimeProviderProfile(provider));
  // Issue #2100 follow-up: opt-in upstream 429 hint trust per provider.
  const useHints429 = resolveUseUpstream429BreakerHints(
    provider,
    (providerProfile as { useUpstream429BreakerHints?: boolean }).useUpstream429BreakerHints
  );
  const breaker = getCircuitBreaker(provider, {
    failureThreshold: providerProfile.failureThreshold ?? providerProfile.circuitBreakerThreshold,
    degradationThreshold: providerProfile.degradationThreshold,
    resetTimeout: providerProfile.resetTimeoutMs ?? providerProfile.circuitBreakerReset,
    onStateChange: (name: string, from: string, to: string) =>
      log.info("CIRCUIT", `${name}: ${from} → ${to}`),
    ...(useHints429
      ? {
          cooldownByKind: {
            rate_limit: 60_000,
            quota_exhausted: 3_600_000,
          } satisfies Partial<Record<FailureKind, number>>,
          classifyError: classify429FromError,
        }
      : {}),
  });
  if (options.ignoreCircuitBreaker && !breaker.canExecute()) {
    log.info("CIRCUIT", `Bypassing OPEN circuit breaker for ${provider} (${bypassReason})`);
  } else if (!breaker.canExecute()) {
    const retryAfterMs = breaker.getRetryAfterMs();
    const retryAfterSec = Math.max(Math.ceil(retryAfterMs / 1000), 1);
    log.warn("CIRCUIT", `Circuit breaker OPEN for ${provider}, rejecting request`);
    return providerCircuitOpenResponse(provider, retryAfterSec);
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
  modelApiFormat,
  providerProfile,
  cachedSettings,
  skipUpstreamRetry = false,
  trafficType = "production",
}: ExecuteChatWithBreakerOptions): Promise<{ result: any; tlsFingerprintUsed: boolean }> {
  let tlsFingerprintUsed = false;
  const normalizedTrafficType: TrafficType =
    typeof trafficType === "string" && trafficType.trim().toLowerCase() === "shadow"
      ? "shadow"
      : "production";
  const isShadowTraffic = normalizedTrafficType === "shadow";

  try {
    const chatFn = () =>
      runWithProxyContext(proxyInfo?.proxy || null, () =>
        (handleChatCore as any)({
          body: { ...body, model: `${provider}/${model}` },
          modelInfo: { provider, model, extendedContext, apiFormat: modelApiFormat },
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
          cachedSettings,
          skipUpstreamRetry,
          trafficType: normalizedTrafficType,
          onCredentialsRefreshed: async (newCreds: any) => {
            await updateProviderCredentials(credentials.connectionId, {
              accessToken: newCreds.accessToken,
              refreshToken: newCreds.refreshToken,
              expiresIn: newCreds.expiresIn,
              expiresAt: newCreds.expiresAt,
              providerSpecificData: newCreds.providerSpecificData,
              // Cookie/session providers (chatgpt-web) rotate the stored
              // apiKey blob mid-request — forward it so the DB credential
              // doesn't go stale after Set-Cookie rotation.
              apiKey: newCreds.apiKey,
              testStatus: newCreds.testStatus ?? "active",
              isActive: newCreds.isActive,
            });
          },
          onRequestSuccess: async () => {
            if (isShadowTraffic) return;
            await clearAccountError(credentials.connectionId, credentials);
          },
          onStreamFailure: async (failure: any) => {
            if (isShadowTraffic) return;
            if (!credentials.connectionId) return;
            // A3 guard: if 401 and connection has extra keys, skip connection-level disable
            // (key-level failure already recorded in chatCore.ts via T07)
            // Check extra keys directly from credentials for reliability across restarts
            const extraKeys =
              (credentials.providerSpecificData?.extraApiKeys as string[] | undefined) ?? [];
            const hasExtraKeys =
              extraKeys.length > 0 || connectionHasExtraKeys(credentials.connectionId);
            const is401 = Number(failure?.status) === 401;
            if (is401 && hasExtraKeys) {
              log.debug(
                "AUTH",
                `A3 guard: skipping markAccountUnavailable for 401 with extra keys on ${credentials.connectionId.slice(0, 8)}`
              );
              return;
            }
            await markAccountUnavailable(
              credentials.connectionId,
              Number(failure?.status || HTTP_STATUS.BAD_GATEWAY),
              String(failure?.message || failure?.code || "stream failure"),
              provider,
              model,
              providerProfile,
              { isCombo }
            );
          },
        })
      );

    if (isShadowTraffic) {
      if (!bypassCircuitBreaker && breaker && !breaker.canExecute()) {
        const retryAfterMs = breaker.getRetryAfterMs();
        return {
          result: {
            success: false,
            response: providerCircuitOpenResponse(provider, Math.ceil(retryAfterMs / 1000)),
            status: HTTP_STATUS.SERVICE_UNAVAILABLE,
          },
          tlsFingerprintUsed: false,
        };
      }

      if (!proxyInfo?.proxy && isTlsFingerprintActive()) {
        const tracked = await runWithTlsTracking(chatFn);
        return { result: tracked.result, tlsFingerprintUsed: tracked.tlsFingerprintUsed };
      }

      const result = await chatFn();
      return { result, tlsFingerprintUsed: false };
    }

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
          response: providerCircuitOpenResponse(provider, Math.ceil(cbErr.retryAfterMs / 1000)),
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

  if (credentials?.allExpired) {
    // Every connection for this provider is in a terminal state (expired,
    // banned, or credits_exhausted). Surface as 401 with a re-auth hint
    // instead of the generic 400 "No credentials", so dashboards/CLIs can
    // distinguish "never configured" from "needs to reconnect".
    const status = credentials.expiredStatus || "expired";
    const count = credentials.expiredCount || 1;
    const reason =
      status === "credits_exhausted"
        ? "credits exhausted"
        : status === "banned"
          ? "banned by upstream"
          : "authentication expired";
    const message = `[${provider}] All ${count} connection(s) ${reason} — please reconnect in the dashboard`;
    log.warn("CHAT", message);
    return errorResponse(HTTP_STATUS.UNAUTHORIZED, message);
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
    // Ported from upstream decolua/9router#336 (Ibrahim Ryan): surface as 404
    // NOT_FOUND instead of 400 BAD_REQUEST so combo routing can fall through to
    // the next target. The combo target loop (open-sse/services/combo.ts) treats
    // 400 as a hard stop to break body-specific infinite fallback loops
    // (PR #4316 / issue #4279). 404 flows through checkFallbackError as
    // `shouldFallback: true` (generic-error catch-all path in
    // open-sse/services/accountFallback.ts), letting a combo like
    // `antigravity/opus → github/opus` skip a provider whose credentials are
    // all disabled. log level is `warn` rather than `error` because zero active
    // credentials is an expected operator-driven state, not a server fault.
    log.warn("AUTH", `No active credentials for provider: ${provider}`);
    return errorResponse(
      HTTP_STATUS.NOT_FOUND,
      `No active credentials for provider: ${provider}`
    );
  }
  log.warn("CHAT", "No more accounts available", { provider });
  return errorResponse(
    lastStatus || HTTP_STATUS.SERVICE_UNAVAILABLE,
    lastError || "All accounts unavailable"
  );
}

/**
 * Bug #3758 (Problem A): NVIDIA NIM (and other flaky OpenAI-compatible upstreams)
 * intermittently send HTTP 200, then close the SSE early with zero useful frames.
 * The readiness gate surfaces this as `STREAM_EARLY_EOF` / HTTP 502. On the
 * single-model (non-combo) path that 502 used to be returned immediately for every
 * provider except `antigravity`, so a transient upstream hang-up looked like a hard
 * failure to the caller (e.g. the test-chat scenario).
 *
 * This decides whether a single-model request should re-attempt after an early
 * close. It deliberately:
 *  - retries ONLY on `STREAM_EARLY_EOF` (the strong "upstream hung up after 200"
 *    signal) — NOT on `STREAM_READINESS_TIMEOUT` / `stream_timeout`, which is a
 *    slow-but-alive upstream where retrying would only double latency; and
 *  - is bounded to exactly ONE retry via the per-request `attempt` counter, so it
 *    can never loop (the second consecutive early close surfaces the 502).
 *
 * Pure function (no side effects): the caller performs a plain same-connection
 * re-attempt and must NOT mark the account unavailable for an early close — it is a
 * transient upstream glitch, not a bad key.
 */
export const STREAM_EARLY_EOF_MAX_RETRIES = 1;

export function shouldRetryStreamEarlyEof(
  errorCode: string | null | undefined,
  attempt: number
): boolean {
  return errorCode === "STREAM_EARLY_EOF" && attempt < STREAM_EARLY_EOF_MAX_RETRIES;
}

/**
 * Proxy-resolution failure policy. Default: fail-closed (rethrow) so a request
 * with an assigned-but-unresolvable proxy never silently egresses on the real IP.
 * Opt back into the legacy DIRECT fallback with PROXY_FAIL_OPEN=true.
 */
export function decideProxyResolutionFailure(
  err: unknown,
  env: { PROXY_FAIL_OPEN?: string } = process.env
): null {
  if ((env.PROXY_FAIL_OPEN ?? "").trim().toLowerCase() === "true") {
    log.warn(
      "PROXY",
      `Proxy resolution failed — PROXY_FAIL_OPEN=true, falling back to DIRECT: ${
        err instanceof Error ? err.message : String(err)
      }`
    );
    return null;
  }
  throw err instanceof Error ? err : new Error(String(err));
}

export async function safeResolveProxy(connectionId: string, apiKeyId?: string) {
  try {
    return await resolveProxyForConnection(connectionId, apiKeyId);
  } catch (proxyErr) {
    return decideProxyResolutionFailure(proxyErr);
  }
}

// Async because the egress-IP lookup lazy-imports proxyEgress; callers treat
// this as fire-and-forget logging (the internal try/catch swallows everything).
export async function safeLogEvents({
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
    const rawIp =
      clientRawRequest?.headers?.["x-forwarded-for"] ||
      clientRawRequest?.headers?.["x-real-ip"] ||
      clientRawRequest?.headers?.["cf-connecting-ip"] ||
      null;
    const rawIpValue = Array.isArray(rawIp) ? rawIp[0] : rawIp;
    const clientIp = typeof rawIpValue === "string" ? rawIpValue.split(",")[0].trim() : null;

    // Resolve the egress IP (the IP the upstream actually saw) from cache — never
    // blocking the request. Warm it in the background for next time. null until
    // the first warm completes; direct (no proxy) is also tracked.
    let egressIp: string | null = null;
    try {
      const { getCachedEgressIp, warmEgressIp } = await import("../../lib/proxyEgress");
      const { proxyConfigToUrl } = await import("@omniroute/open-sse/utils/proxyDispatcher.ts");
      const proxyUrl = proxyInfo?.proxy ? proxyConfigToUrl(proxyInfo.proxy) : null;
      egressIp = getCachedEgressIp(proxyUrl);
      warmEgressIp(proxyUrl);
    } catch {
      // egress visibility is best-effort; never break the request path
    }

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
      clientIp,
      egressIp,
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
