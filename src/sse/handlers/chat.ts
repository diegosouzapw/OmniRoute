import { randomUUID } from "crypto";
import { resolveChatRequestBody } from "./requestBody";
import {
  getProviderCredentialsWithQuotaPreflight,
  markAccountUnavailable,
  extractApiKey,
  isValidApiKey,
  extractSessionAffinityKey,
} from "../services/auth";
import {
  getRuntimeProviderProfile,
  shouldMarkAccountExhaustedFrom429,
  clearModelLock,
  lockModel,
  recordModelLockoutFailure,
  isDailyQuotaExhausted,
} from "@omniroute/open-sse/services/accountFallback.ts";
import { getModelInfo, getComboForModel } from "../services/model";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { applyNoThinkingAlias } from "@omniroute/open-sse/utils/noThinkingAlias.ts";
import { handleComboChat } from "@omniroute/open-sse/services/combo.ts";
import { resolveComboConfig } from "@omniroute/open-sse/services/comboConfig.ts";
import { injectHandoffIntoBody } from "@omniroute/open-sse/services/contextHandoff.ts";
import {
  HTTP_STATUS,
  ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE,
} from "@omniroute/open-sse/config/constants.ts";
import { getTargetFormat } from "@omniroute/open-sse/services/provider.ts";
import {
  getModelTargetFormat,
  PROVIDER_ID_TO_ALIAS,
} from "@omniroute/open-sse/config/providerModels.ts";
import type { AutoVariant } from "@omniroute/open-sse/services/autoCombo/autoPrefix.ts";
import {
  AUTO_TEMPLATE_VARIANTS,
  VALID_AUTO_VARIANTS,
} from "@omniroute/open-sse/services/autoCombo/builtinCatalog.ts";
import {
  parseAutoSuffix,
  type AutoCategory,
  type AutoTier,
} from "@omniroute/open-sse/services/autoCombo/suffixComposition.ts";
import * as log from "../utils/logger";
import { checkAndRefreshToken } from "../services/tokenRefresh";
import { createHookContext, runHooks, initPreRequestRegistry } from "@/lib/middleware/registry";
import { deleteHandoff, getHandoff } from "@/lib/db/contextHandoffs";
import {
  deleteSessionAccountAffinity,
  getCachedSettings,
  getCombos,
  getCombosCacheVersion,
  getSessionAccountAffinity,
} from "@/lib/localDb";
import { resolveModelLockoutSettings } from "@/lib/resilience/modelLockoutSettings";
import {
  ensureOpenAIStoreSessionFallback,
  isOpenAIResponsesStoreEnabled,
} from "@/lib/providers/requestDefaults";
import { guardrailRegistry, resolveDisabledGuardrails } from "@/lib/guardrails";
import {
  resolveModelOrError,
  checkPipelineGates,
  executeChatWithBreaker,
  handleNoCredentials,
  safeResolveProxy,
  safeLogEvents,
  shouldRetryStreamEarlyEof,
  withSessionHeader,
} from "./chatHelpers";
import { connectionHasExtraKeys } from "@omniroute/open-sse/services/apiKeyRotator.ts";

// Pipeline integration — wired modules
import { classify429FromError, type FailureKind } from "@/shared/utils/classify429";
import { resolveUseUpstream429BreakerHints } from "@/shared/utils/providerHints";
import { getCircuitBreaker } from "../../shared/utils/circuitBreaker";
import { markAccountExhaustedFrom429 } from "../../domain/quotaCache";
import { RequestTelemetry, recordTelemetry } from "../../shared/utils/requestTelemetry";
import { generateRequestId } from "../../shared/utils/requestId";
import { logAuditEvent } from "../../lib/compliance/index";
import { enforceApiKeyPolicy } from "../../shared/utils/apiKeyPolicy";
import { cloneLogPayload } from "@/lib/logPayloads";
import { handleInternalUsageCommand } from "@/lib/usage/internalUsageCommand";
import {
  applyTaskAwareRouting,
  getTaskRoutingConfig,
} from "@omniroute/open-sse/services/taskAwareRouter.ts";
import {
  generateSessionId as generateStableSessionId,
  touchSession,
  extractExternalSessionId,
  checkSessionLimit,
  registerKeySession,
  isSessionRegisteredForKey,
} from "@omniroute/open-sse/services/sessionManager.ts";
import { startQuotaMonitor } from "@omniroute/open-sse/services/quotaMonitor.ts";
import {
  isFallbackDecision,
  shouldUseFallback,
} from "@omniroute/open-sse/services/emergencyFallback.ts";
import {
  registerCodexConnection,
  registerCodexQuotaFetcher,
} from "@omniroute/open-sse/services/codexQuotaFetcher.ts";
import { registerBailianCodingPlanQuotaFetcher } from "@omniroute/open-sse/services/bailianQuotaFetcher.ts";
import { registerCrofUsageFetcher } from "@omniroute/open-sse/services/crofUsageFetcher.ts";
import { registerDeepseekQuotaFetcher } from "@omniroute/open-sse/services/deepseekQuotaFetcher.ts";
import { registerOpencodeQuotaFetcher } from "@omniroute/open-sse/services/opencodeQuotaFetcher.ts";
import { registerGenericQuotaFetchers } from "@omniroute/open-sse/services/genericQuotaFetcher.ts";
import {
  getCooldownAwareRetryDecision,
  resolveCooldownAwareRetrySettings,
  waitForCooldownAwareRetry,
} from "../services/cooldownAwareRetry";
import { constrainConnectionsToQuota, resolveQuotaKeyScope } from "../../lib/quota/quotaKey";

registerCodexQuotaFetcher();

// Register Bailian Coding Plan quota fetcher at module load (once per server start).
// This hooks into the quotaPreflight + quotaMonitor systems so that combos
// can proactively switch accounts before quota is exhausted.
registerBailianCodingPlanQuotaFetcher();

// Register CrofAI usage fetcher (subscription requests + credits balance).
// Surfaces usable_requests + credits in the monitor and only blocks (preflight
// opt-in) when the active bucket reaches zero.
registerCrofUsageFetcher();

// Register DeepSeek balance quota fetcher.
// Hooks into quotaPreflight + quotaMonitor so combos can switch accounts before balance is exhausted.
registerDeepseekQuotaFetcher();

// Register OpenCode quota fetcher (opencode-go / opencode / opencode-zen).
// Surfaces the $12/5h, $30/wk, $60/mo windows in the limits page and enables
// quota-aware preflight switching between connections. (#2852)
registerOpencodeQuotaFetcher();

// Register the generic quota fetcher for every other provider that has a
// usage implementation in usage.ts but no bespoke preflight fetcher. This is
// what lets the per-window cutoff modal in Dashboard › Limits actually
// enforce thresholds for Claude / GLM / Cursor / etc., not just Codex.
registerGenericQuotaFetchers();
let combosCachePromise: Promise<unknown[]> | null = null;
let combosCacheTs = 0;
let combosCacheVersionSnapshot = -1;
const COMBOS_CACHE_TTL_MS = 10_000;

async function getCombosCachedForChat(): Promise<unknown[]> {
  const now = Date.now();
  // Explicit non-null check: we intentionally cache and return the Promise
  // itself (to dedupe concurrent callers), so this is not a forgotten await.
  // The version check makes combo edits (create/update/delete/reorder) take
  // effect immediately instead of after the 10s TTL — otherwise a removed
  // target/model could keep being served as a "phantom" for up to 10s (#3147).
  if (
    combosCachePromise !== null &&
    now - combosCacheTs < COMBOS_CACHE_TTL_MS &&
    combosCacheVersionSnapshot === getCombosCacheVersion()
  ) {
    return combosCachePromise;
  }

  combosCacheTs = now;
  combosCacheVersionSnapshot = getCombosCacheVersion();
  combosCachePromise = getCombos().catch(() => []);
  return combosCachePromise;
}

function normalizeAllowedConnectionIds(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const ids = value.filter(
    (entry): entry is string => typeof entry === "string" && entry.trim().length > 0
  );
  return ids.length > 0 ? ids : null;
}

function intersectAllowedConnectionIds(primary: unknown, secondary: unknown): string[] | null {
  const first = normalizeAllowedConnectionIds(primary);
  const second = normalizeAllowedConnectionIds(secondary);

  if (first && second) {
    return first.filter((id) => second.includes(id));
  }

  return first || second || null;
}

const PROVIDER_BREAKER_FAILURE_STATUSES = new Set([408, 500, 502, 503, 504]);

/**
 * Handle chat completion request
 * Supports: OpenAI, Claude, Gemini, OpenAI Responses API formats
 * Format detection and translation handled by translator
 */
export async function handleChat(
  request: any,
  clientRawRequest: any = null,
  preParsedBody: any = null
) {
  // Pipeline: Start request telemetry
  const reqId = generateRequestId();
  const telemetry = new RequestTelemetry(reqId);

  let body;
  try {
    telemetry.startPhase("parse");
    body = await resolveChatRequestBody(request, preParsedBody);
    telemetry.endPhase();
  } catch {
    log.warn("CHAT", "Invalid JSON body");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  const rawClientBody = cloneLogPayload(body);

  // Build clientRawRequest for logging (if not provided)
  if (!clientRawRequest) {
    clientRawRequest = buildClientRawRequest(request, rawClientBody);
  }

  // T01 — Accept header negotiation
  // If client asks for text/event-stream via the Accept header AND the JSON body
  // does not explicitly set stream=false, treat it as stream=true.
  // This ensures compatibility with curl/httpx and similar non-OpenAI clients.
  //
  // FIX #302: OpenAI Python SDK sends Accept: application/json, text/event-stream
  // in every request — even when called with stream=False. We must NOT override
  // an explicit stream=false body field, as that silently breaks tool_calls and
  // structured completions for SDK users who rely on non-streaming mode.
  const acceptHeader = request.headers.get("accept") || "";
  if (acceptHeader.includes("text/event-stream") && body.stream === undefined) {
    body = { ...body, stream: true };
    log.debug(
      "STREAM",
      "Accept: text/event-stream header → overriding stream=true (body had no stream field)"
    );
  }

  // Log request endpoint and model
  const url = new URL(request.url);

  // No-thinking gateway alias (Fase 8.1): `claude-3-omniroute-no-thinking/<provider>/<model>`
  // resolves back to the real model with reasoning suppressed in place, before any
  // model resolution / combo routing sees it. Claude/Messages path forces
  // `thinking:{type:"disabled"}`; OpenAI path drops the reasoning fields.
  const noThinking = applyNoThinkingAlias(body, {
    claudeFormat: url.pathname.includes("/messages"),
  });
  if (noThinking.applied) {
    log.debug("NO_THINKING", `Resolved no-thinking alias → ${noThinking.realModel}`);
  }

  let modelStr = body.model;

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

  const internalUsageCommandResponse = await handleInternalUsageCommand(request, body);
  if (internalUsageCommandResponse) {
    recordTelemetry(telemetry);
    return internalUsageCommandResponse;
  }

  const isComboLiveTest = request.headers?.get?.("x-internal-test") === "combo-health-check";

  if (!modelStr) {
    log.warn("CHAT", "Missing model");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing model");
  }

  // T04: client-provided external session header has priority over generated fingerprint.
  const externalSessionId = extractExternalSessionId(request.headers);
  const sessionId = externalSessionId || generateStableSessionId(body);
  const sessionAffinityKey = extractSessionAffinityKey(body, request.headers) || sessionId;
  const requestedConnectionId = request.headers.get("x-omniroute-connection")?.trim() || null;
  if (sessionId) {
    touchSession(sessionId);
  }

  // Pipeline: API key policy enforcement (model restrictions + budget limits)
  telemetry.startPhase("policy");
  const policy = await enforceApiKeyPolicy(request, modelStr);
  if (policy.rejection) {
    log.warn(
      "POLICY",
      `API key policy rejected: ${modelStr} (key=${policy.apiKeyInfo?.id || "unknown"})`
    );
    return policy.rejection;
  }
  const apiKeyInfo = policy.apiKeyInfo;
  telemetry.endPhase();

  // Guardrail pre-call pipeline — prompt injection, PII masking, and future custom rules.
  telemetry.startPhase("validate");
  const preCallGuardrails = await guardrailRegistry.runPreCallHooks(body, {
    apiKeyInfo: apiKeyInfo as any,
    disabledGuardrails: resolveDisabledGuardrails({
      apiKeyInfo: (apiKeyInfo ?? null) as any,
      body,
      headers: request.headers,
    }),
    endpoint: new URL(request.url).pathname,
    headers: request.headers,
    log,
    method: request.method,
    model: modelStr,
    stream: body?.stream === true,
  });
  if (preCallGuardrails.blocked) {
    log.warn("GUARDRAIL", "Request blocked during pre-call guardrails", {
      guardrail: preCallGuardrails.guardrail,
      message: preCallGuardrails.message,
    });
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      preCallGuardrails.message || "Request rejected: suspicious content detected"
    );
  }
  body = preCallGuardrails.payload;
  telemetry.endPhase();

  // T08: per-key active session limit (0 = unlimited).
  if (apiKeyInfo?.id && sessionId) {
    const maxSessions =
      typeof apiKeyInfo.maxSessions === "number" && apiKeyInfo.maxSessions > 0
        ? apiKeyInfo.maxSessions
        : 0;

    if (maxSessions > 0 && !isSessionRegisteredForKey(apiKeyInfo.id, sessionId)) {
      const sessionViolation = checkSessionLimit(apiKeyInfo.id, maxSessions);
      if (sessionViolation) {
        return withSessionHeader(
          errorResponse(HTTP_STATUS.RATE_LIMITED, sessionViolation.message),
          sessionId
        );
      }
      registerKeySession(apiKeyInfo.id, sessionId);
    }
  }

  // T09 — Pre-request Middleware Hooks
  // Execute user-defined hooks BEFORE task-aware routing and combo selection
  initPreRequestRegistry();
  const hookContext = createHookContext({
    body: body as Record<string, unknown>,
    headers: Object.fromEntries(request?.headers?.entries() || []) as Record<
      string,
      string | string[] | undefined
    >,
    model: modelStr,
    combo: undefined,
    apiKeyInfo: apiKeyInfo as Record<string, unknown> | undefined,
    log,
  });

  const { context: hookCtx, response: hookResponse } = await runHooks(hookContext);

  // Apply hook mutations
  body = hookCtx.body as any;
  if (hookCtx.model && hookCtx.model !== modelStr) {
    modelStr = hookCtx.model;
  }

  // Short-circuit if a hook returned a direct response
  if (hookResponse) {
    return errorResponse(hookResponse.status, hookResponse.body as any);
  }

  // T05 — Task-Aware Smart Routing
  // Detect the semantic task type and optionally route to the optimal model
  let resolvedModelStr = modelStr;
  let taskRouteInfo: { taskType: string; wasRouted: boolean } | null = null;
  if (getTaskRoutingConfig().enabled) {
    telemetry.startPhase("task-route");
    const tr = applyTaskAwareRouting(modelStr, body);
    if (tr.wasRouted) {
      resolvedModelStr = tr.model;
      body = { ...body, model: tr.model };
      log.info(
        "T05",
        `Task-Aware: detected="${tr.taskType}" → model override: ${modelStr} → ${tr.model}`
      );
    } else if (tr.taskType !== "chat") {
      log.debug("T05", `Task-Aware: detected="${tr.taskType}" (no override configured)`);
    }
    taskRouteInfo = { taskType: tr.taskType, wasRouted: tr.wasRouted };
    telemetry.endPhase();
  }

  // ── Zero-Config Auto-Routing (auto and auto/ prefix) ────────────────────────
  // If the model ID is "auto" or starts with "auto/", bypass DB combo lookup
  // entirely and generate a virtual auto-combo on-the-fly from connected providers.
  let autoVariant: AutoVariant | undefined;
  // #4235 Phase B: `auto/<category>:<tier>` overlay (e.g. auto/coding:fast, auto/vision).
  let autoSpec: { category?: AutoCategory; tier?: AutoTier } | undefined;
  let isAutoRouting = resolvedModelStr === "auto" || resolvedModelStr.startsWith("auto/");
  let recognizedBuiltInAuto = resolvedModelStr === "auto";
  if (Object.prototype.hasOwnProperty.call(AUTO_TEMPLATE_VARIANTS, resolvedModelStr)) {
    recognizedBuiltInAuto = true;
    autoVariant = AUTO_TEMPLATE_VARIANTS[resolvedModelStr];
  } else if (resolvedModelStr.startsWith("auto/")) {
    const suffix = resolvedModelStr.slice(5);
    if (VALID_AUTO_VARIANTS.has(suffix as AutoVariant)) {
      recognizedBuiltInAuto = true;
    } else {
      const parsedSuffix = parseAutoSuffix(suffix);
      if (parsedSuffix.valid) {
        recognizedBuiltInAuto = true;
        autoSpec = { category: parsedSuffix.category, tier: parsedSuffix.tier };
      }
    }
  }

  if (isAutoRouting) {
    // C2: Enforce autoRoutingEnabled setting.
    // Issue #2346: `getSettings` was never imported in this module; only
    // `getCachedSettings` is. Calling the bare name caused a ReferenceError
    // on every auto-routed request. The cached variant has the same shape
    // and benefits the auto-routing hot path.
    const settings = await getCachedSettings().catch(() => ({}) as Record<string, unknown>);
    if (settings?.autoRoutingEnabled === false) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        "Auto routing is disabled. Enable it in Settings > Routing."
      );
    }

    try {
      const { parseAutoPrefix } =
        await import("@omniroute/open-sse/services/autoCombo/autoPrefix.ts");
      const parsed = parseAutoPrefix(resolvedModelStr);
      if (parsed.valid) {
        if (!Object.prototype.hasOwnProperty.call(AUTO_TEMPLATE_VARIANTS, resolvedModelStr)) {
          autoVariant = parsed.variant;
        }
        // C3: Apply autoRoutingDefaultVariant from settings when bare "auto" is used
        if (
          resolvedModelStr === "auto" &&
          autoVariant === undefined &&
          settings?.autoRoutingDefaultVariant
        ) {
          autoVariant = settings.autoRoutingDefaultVariant as AutoVariant;
        }
        log.info(
          "AUTO",
          `Zero-config routing variant: ${autoVariant || "default"} (model=${resolvedModelStr})`
        );
      } else if (!autoSpec) {
        log.warn("AUTO", `Invalid auto prefix format: ${resolvedModelStr}`);
      }
    } catch (err) {
      log.error("AUTO", "Failed to load auto-prefix parser", { err });
    }
  }
  // ────────────────────────────────────────────────────────────────────────────

  // Check if model is a combo (has multiple models with fallback)
  telemetry.startPhase("resolve");
  let combo: any = await getComboForModel(resolvedModelStr);

  // "auto" prefix fuzzy matching: "auto/fast" → "auto/best-fast", etc.
  // parseModel splits "auto/fast" into provider="auto" which isn't a real provider.
  if (!combo && resolvedModelStr.startsWith("auto/")) {
    const suffix = resolvedModelStr.slice(5);
    for (const candidate of [`auto/best-${suffix}`, `auto/${suffix}`]) {
      combo = await getComboForModel(candidate);
      if (combo) {
        log.info("ROUTING", `"${resolvedModelStr}" → combo "${candidate}" (auto fuzzy)`);
        break;
      }
    }
  }

  // Auto-prefix short-circuit: if a recognized auto/ prefix was detected, replace combo with virtual one
  if (isAutoRouting && combo === null) {
    if (!recognizedBuiltInAuto) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `Model '${resolvedModelStr}' is not a valid combo or provider. Unknown built-in auto combo.`
      );
    }

    try {
      const { createVirtualAutoCombo } =
        await import("@omniroute/open-sse/services/autoCombo/virtualFactory.ts");
      const virtualCombo = await createVirtualAutoCombo(autoVariant, autoSpec);
      virtualCombo.name = resolvedModelStr;
      virtualCombo.id = resolvedModelStr;
      combo = virtualCombo;
      log.info(
        "AUTO",
        `Virtual auto-combo created: ${combo.name} (${virtualCombo.candidatePool?.length || 0} candidates)`
      );
    } catch (err) {
      log.error("AUTO", "Failed to create virtual auto-combo", { err });
    }
  }
  if (combo) {
    log.info(
      "CHAT",
      `Combo "${modelStr}" [${combo.strategy || "priority"}] with ${combo.models.length} models`
    );

    // Pre-check function used by combo routing. For explicit combo live tests,
    // avoid pre-skipping so each model gets a real execution attempt.
    const comboPreselectedCredentials = new Map<string, any>();
    const getComboCredentialCacheKey = (
      modelString: string,
      target?: { connectionId?: string | null; executionKey?: string | null }
    ) => `${target?.executionKey || target?.connectionId || ""}:${modelString}`;
    const checkModelAvailable = async (
      modelString: string,
      target?: {
        allowRateLimitedConnection?: boolean;
        connectionId?: string | null;
        allowedConnectionIds?: string[] | null;
        executionKey?: string | null;
        providerId?: string | null;
      }
    ) => {
      if (isComboLiveTest) return true;

      // Use getModelInfo to resolve custom prefixes, but prefer the combo
      // target's providerId when available — the model string's provider
      // prefix may differ from the credential provider ID (e.g. model
      // "xiaomi/mimo-v2-flash" resolves to provider "xiaomi" but the combo
      // target specifies providerId: "opengate" for credential lookup).
      const modelInfo = await getModelInfo(modelString);
      // Apply the same prefix-override guard as handleSingleModelChat:
      // if providerId is just the prefix already in the model string, use
      // the fully-resolved modelInfo.provider for a precise credential check.
      const provider = (() => {
        if (!target?.providerId) return modelInfo.provider;
        if (target.providerId === modelInfo.provider) return modelInfo.provider;
        if (modelString.startsWith(target.providerId + "/")) return modelInfo.provider;
        return target.providerId;
      })();
      if (!provider) return true; // can't determine provider, let it try

      const resolvedModel = modelInfo.model || modelString;
      const hasForcedConnection =
        typeof target?.connectionId === "string" && target.connectionId.trim().length > 0;
      let allowedConnections = intersectAllowedConnectionIds(
        apiKeyInfo?.allowedConnections ?? null,
        target?.allowedConnectionIds ?? null
      );

      // A4: quota-exclusive keys must only use the pool's connection(s).
      if (apiKeyInfo?.allowedQuotas && apiKeyInfo.allowedQuotas.length > 0) {
        const quotaScope = await resolveQuotaKeyScope(apiKeyInfo.allowedQuotas);
        allowedConnections = constrainConnectionsToQuota(
          allowedConnections ?? [],
          quotaScope.connectionIds
        );
      }

      if (Array.isArray(allowedConnections) && allowedConnections.length === 0) {
        return false;
      }

      const creds = await getProviderCredentialsWithQuotaPreflight(
        provider,
        null,
        allowedConnections,
        resolvedModel,
        {
          sessionKey: sessionAffinityKey,
          ...(target?.allowRateLimitedConnection ? { allowRateLimitedConnections: true } : {}),
          ...(target?.connectionId ? { forcedConnectionId: target.connectionId } : {}),
        }
      );
      if (!creds || creds.allRateLimited) return false;

      comboPreselectedCredentials.set(getComboCredentialCacheKey(modelString, target), creds);
      return true;
    };

    // Fetch settings and all combos for config cascade and nested resolution
    const [settings, allCombos] = await Promise.all([
      getCachedSettings().catch(() => ({})),
      getCombosCachedForChat(),
    ]);
    const relayConfig =
      combo.strategy === "context-relay" ? resolveComboConfig(combo, settings) : null;
    telemetry.endPhase();

    // Context-relay keeps generation in combo.ts, but handoff injection lives here
    // because only this layer knows which connectionId was actually selected.
    const response = await (handleComboChat as any)({
      body,
      combo,
      handleSingleModel: (
        b: any,
        m: string,
        target?: {
          allowRateLimitedConnection?: boolean;
          connectionId?: string | null;
          executionKey?: string | null;
          stepId?: string | null;
          allowedConnectionIds?: string[] | null;
          failoverBeforeRetry?: boolean;
          providerId?: string | null;
          effectiveComboStrategy?: string | null;
        }
      ) =>
        handleSingleModelChat(
          b,
          m,
          clientRawRequest,
          request,
          combo.name,
          apiKeyInfo,
          telemetry,
          {
            sessionId,
            sessionAffinityKey,
            forceLiveComboTest: isComboLiveTest,
            forcedConnectionId: target?.connectionId ?? null,
            allowedConnectionIds: target?.allowedConnectionIds ?? null,
            comboStepId: target?.stepId || null,
            comboExecutionKey: target?.executionKey || target?.stepId || null,
            skipUpstreamRetry: target?.failoverBeforeRetry ?? false,
            allowRateLimitedConnection: target?.allowRateLimitedConnection === true,
            preselectedCredentials: comboPreselectedCredentials.get(
              getComboCredentialCacheKey(m, target)
            ),
            cachedSettings: settings,
            providerId: target?.providerId ?? null,
          },
          target?.effectiveComboStrategy ?? combo.strategy,
          true
        ),
      isModelAvailable: checkModelAvailable,
      log,
      settings,
      allCombos,
      apiKeyAllowedConnections: apiKeyInfo?.allowedConnections ?? null,
      relayOptions:
        combo.strategy === "context-relay"
          ? {
              sessionId,
              config: relayConfig,
            }
          : undefined,
      signal: request?.signal ?? null,
    });

    // ── Global Fallback Provider (#689) ────────────────────────────────────
    // If combo exhausted all models, try the global fallback before giving up.
    if (
      !response.ok &&
      [502, 503].includes(response.status) &&
      typeof (settings as any)?.globalFallbackModel === "string" &&
      (settings as any).globalFallbackModel.trim()
    ) {
      const fallbackModel = (settings as any).globalFallbackModel.trim();
      log.info(
        "GLOBAL_FALLBACK",
        `Combo "${combo.name}" exhausted — attempting global fallback: ${fallbackModel}`
      );
      try {
        const fallbackResponse = await handleSingleModelChat(
          body,
          fallbackModel,
          clientRawRequest,
          request,
          combo.name,
          apiKeyInfo,
          telemetry,
          {
            sessionId,
            sessionAffinityKey,
            emergencyFallbackTried: true,
            forceLiveComboTest: isComboLiveTest,
          },
          combo.strategy,
          true
        );
        if (fallbackResponse.ok) {
          log.info("GLOBAL_FALLBACK", `Global fallback ${fallbackModel} succeeded`);
          recordTelemetry(telemetry);
          return withSessionHeader(fallbackResponse, sessionId);
        }
        log.warn(
          "GLOBAL_FALLBACK",
          `Global fallback ${fallbackModel} also failed (${fallbackResponse.status})`
        );
      } catch (err: any) {
        log.warn("GLOBAL_FALLBACK", `Global fallback error: ${err?.message || "unknown"}`);
      }
    }
    // ─────────────────────────────────────────────────────────────────────────

    // Record telemetry
    recordTelemetry(telemetry);
    return withSessionHeader(response, sessionId);
  }
  telemetry.endPhase();

  // Single model request
  const response = await handleSingleModelChat(
    body,
    resolvedModelStr,
    clientRawRequest,
    request,
    null,
    apiKeyInfo,
    telemetry,
    {
      sessionId,
      sessionAffinityKey,
      forceLiveComboTest: isComboLiveTest,
      forcedConnectionId: requestedConnectionId,
    },
    null,
    false
  );
  recordTelemetry(telemetry);
  return withSessionHeader(response, sessionId);
}

export function buildClientRawRequest(request: Request, body: unknown) {
  const url = new URL(request.url);
  return {
    endpoint: url.pathname,
    body: cloneLogPayload(body),
    headers: Object.fromEntries(request.headers.entries()),
  };
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
  telemetry: any = null,
  runtimeOptions: {
    emergencyFallbackTried?: boolean;
    forceLiveComboTest?: boolean;
    sessionId?: string | null;
    sessionAffinityKey?: string | null;
    forcedConnectionId?: string | null;
    allowedConnectionIds?: string[] | null;
    comboStepId?: string | null;
    comboExecutionKey?: string | null;
    skipUpstreamRetry?: boolean;
    allowRateLimitedConnection?: boolean;
    preselectedCredentials?: any;
    cachedSettings?: any;
    providerId?: string | null;
  } = {},
  comboStrategy: string | null = null,
  isCombo: boolean = false
) {
  // 1. Resolve model → provider/model
  const resolved = await resolveModelOrError(
    modelStr,
    body,
    clientRawRequest?.endpoint,
    clientRawRequest?.headers
  );
  if (resolved.error) return resolved.error;

  // Safety net: if auto-combo resolution returned a combo object, redirect
  // to combo flow. This handles the case where the auto-fuzzy match in
  // resolveModelOrError found a combo but the main handler's combo lookup missed it.
  if ((resolved as any).combo) {
    const redirectCombo = (resolved as any).combo;
    log.info("ROUTING", `Auto-combo redirect from handleSingleModelChat for "${modelStr}"`);
    log.info("ROUTING", `Auto-combo redirect to combo flow for "${modelStr}"`);
    return handleComboChat({
      body,
      combo: redirectCombo,
      handleSingleModel: (
        b: any,
        m: string,
        target?: {
          connectionId?: string | null;
          executionKey?: string | null;
          stepId?: string | null;
          failoverBeforeRetry?: boolean;
          allowRateLimitedConnection?: boolean;
          providerId?: string | null;
          effectiveComboStrategy?: string | null;
        }
      ) =>
        handleSingleModelChat(
          b,
          m,
          clientRawRequest,
          request,
          redirectCombo.name ?? modelStr,
          apiKeyInfo,
          telemetry,
          {
            sessionId: "", // safety-net redirect doesn't have session context
            forceLiveComboTest: false,
            forcedConnectionId: null,
            allowedConnectionIds: null,
            comboStepId: null,
            comboExecutionKey: null,
            skipUpstreamRetry: target?.failoverBeforeRetry ?? false,
            allowRateLimitedConnection: target?.allowRateLimitedConnection === true,
            providerId: target?.providerId ?? null,
          },
          target?.effectiveComboStrategy ?? redirectCombo.strategy ?? "priority",
          false
        ),
      isModelAvailable: async () => true,
      log,
      settings: {},
      allCombos: [],
      relayOptions: undefined,
      signal: request?.signal ?? null,
    });
  }

  const {
    provider: resolvedProvider,
    model,
    sourceFormat,
    targetFormat,
    extendedContext,
    apiFormat,
  } = resolved;
  // Prefer the combo target's providerId when available — the model string's
  // provider prefix may differ from the credential provider ID (e.g. model
  // "xiaomi/mimo-v2-flash" resolves to provider "xiaomi" but the combo target
  // may specify providerId: "opengate" for credential lookup).
  // Guard: if runtimeOptions.providerId is merely the prefix already encoded in
  // the model string (e.g. "p2" from "p2/test-model"), and resolveModelOrError
  // expanded it to a full custom-node ID (e.g. "openai-compatible-chat-e2e-p2"),
  // trust resolvedProvider so the executor receives the full node ID and can
  // correctly resolve the custom baseUrl. (#3058 follow-up)
  const provider = (() => {
    if (!runtimeOptions.providerId) return resolvedProvider;
    // If the override is identical to resolvedProvider, no-op.
    if (runtimeOptions.providerId === resolvedProvider) return resolvedProvider;
    // If the model string already encodes runtimeOptions.providerId as its prefix,
    // the override is implicit (not an intentional redirect) — use resolvedProvider.
    if (modelStr.startsWith(runtimeOptions.providerId + "/")) return resolvedProvider;
    // Intentional override (e.g. providerId points to a different credential pool).
    return runtimeOptions.providerId;
  })();
  const forceLiveComboTest = runtimeOptions.forceLiveComboTest === true;
  const hasForcedConnection =
    typeof runtimeOptions.forcedConnectionId === "string" &&
    runtimeOptions.forcedConnectionId.trim().length > 0;
  let effectiveAllowedConnections = intersectAllowedConnectionIds(
    apiKeyInfo?.allowedConnections ?? null,
    runtimeOptions.allowedConnectionIds ?? null
  );

  // A4: quota-exclusive keys must only use the pool's connection(s).
  if (apiKeyInfo?.allowedQuotas && apiKeyInfo.allowedQuotas.length > 0) {
    const quotaScope = await resolveQuotaKeyScope(apiKeyInfo.allowedQuotas);
    effectiveAllowedConnections = constrainConnectionsToQuota(
      effectiveAllowedConnections ?? [],
      quotaScope.connectionIds
    );
  }

  const bypassReason = forceLiveComboTest
    ? "combo live test"
    : hasForcedConnection
      ? "fixed combo step connection"
      : undefined;

  // 2. Pipeline gates (availability + provider circuit breaker)
  const providerProfile = await getRuntimeProviderProfile(provider);
  const gate = await checkPipelineGates(provider, model, {
    ignoreCircuitBreaker: forceLiveComboTest || hasForcedConnection,
    ignoreModelCooldown: forceLiveComboTest || hasForcedConnection,
    providerProfile,
    ...(bypassReason ? { bypassReason } : {}),
  });
  if (gate) return gate;

  // Issue #2100 follow-up: opt-in upstream 429 hint trust per provider.
  const useHints429 = resolveUseUpstream429BreakerHints(
    provider,
    (providerProfile as { useUpstream429BreakerHints?: boolean }).useUpstream429BreakerHints
  );
  const breaker = getCircuitBreaker(provider, {
    failureThreshold: providerProfile.failureThreshold,
    resetTimeout: providerProfile.resetTimeoutMs,
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

  const userAgent = request?.headers?.get("user-agent") || "";
  const baseRetrySettings = resolveCooldownAwareRetrySettings(
    runtimeOptions.cachedSettings ?? (await getCachedSettings().catch(() => ({})))
  );
  const disableCooldownAwareRetry =
    isCombo || forceLiveComboTest || runtimeOptions.emergencyFallbackTried === true;
  const retrySettings = disableCooldownAwareRetry
    ? {
        ...baseRetrySettings,
        enabled: false,
        maxRetries: 0,
        maxRetryWaitSec: 0,
        maxRetryWaitMs: 0,
      }
    : baseRetrySettings;
  const requestSignal = request?.signal ?? null;

  if (Array.isArray(effectiveAllowedConnections) && effectiveAllowedConnections.length === 0) {
    log.debug("AUTH", `${provider}/${model} filtered out by connection-level routing constraints`);
    return errorResponse(
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      "No eligible connections matched the requested routing constraints"
    );
  }

  // 3. Credential retry loop
  let requestRetryAttempt = 0;
  let requestRetryLastError = null;
  let requestRetryLastStatus = null;
  let requestRetryLastCooldownMs = 0;
  // Bug #3758: per-request counter bounding the early-close (STREAM_EARLY_EOF)
  // re-attempt to exactly one for the whole request. Declared outside both retry
  // loops so it can never reset and loop.
  let streamEarlyEofRetries = 0;

  requestAttemptLoop: while (true) {
    const excludedConnectionIds = new Set<string>();
    let lastError = requestRetryLastError;
    let lastStatus = requestRetryLastStatus;
    let lastCooldownMs = requestRetryLastCooldownMs;
    let preselectedCredentials = runtimeOptions.preselectedCredentials;

    while (true) {
      const credentials =
        preselectedCredentials && excludedConnectionIds.size === 0
          ? preselectedCredentials
          : await getProviderCredentialsWithQuotaPreflight(
              provider,
              null,
              effectiveAllowedConnections,
              model,
              {
                sessionKey: runtimeOptions.sessionAffinityKey ?? runtimeOptions.sessionId ?? null,
                excludeConnectionIds: Array.from(excludedConnectionIds),
                ...(runtimeOptions.allowRateLimitedConnection
                  ? { allowRateLimitedConnections: true }
                  : {}),
                ...(forceLiveComboTest
                  ? {
                      allowSuppressedConnections: true,
                      bypassQuotaPolicy: true,
                    }
                  : {}),
                ...(runtimeOptions.forcedConnectionId
                  ? { forcedConnectionId: runtimeOptions.forcedConnectionId }
                  : {}),
              }
            );
      preselectedCredentials = null;

      if (!credentials || "allRateLimited" in credentials) {
        if (credentials?.allRateLimited) {
          const retryDecision = getCooldownAwareRetryDecision({
            retryAfter: credentials.retryAfter,
            settings: retrySettings,
            attempt: requestRetryAttempt,
          });

          if (retryDecision.shouldRetry) {
            const waitSec = Math.max(Math.ceil(retryDecision.waitMs / 1000), 0);
            log.info(
              "COOLDOWN_RETRY",
              `${provider}/${model} all connections cooling down (${retryDecision.retryAfterHuman || `retry in ${waitSec}s`}) — waiting ${waitSec}s before retry ${requestRetryAttempt + 1}/${retrySettings.maxRetries}`
            );

            const completed = await waitForCooldownAwareRetry(retryDecision.waitMs, requestSignal);
            if (!completed) {
              log.info(
                "COOLDOWN_RETRY",
                `${provider}/${model} retry wait aborted by client disconnect`
              );
              return errorResponse(499, "Request aborted");
            }

            requestRetryAttempt += 1;
            log.info(
              "COOLDOWN_RETRY",
              `${provider}/${model} cooldown elapsed — restarting request attempt ${requestRetryAttempt}/${retrySettings.maxRetries}`
            );
            continue requestAttemptLoop;
          }
        }

        const breakerFailureStatus = Number(lastStatus ?? credentials?.lastErrorCode);
        if (
          !forceLiveComboTest &&
          credentials?.allRateLimited &&
          PROVIDER_BREAKER_FAILURE_STATUSES.has(breakerFailureStatus)
        ) {
          breaker._onFailure();
        }

        return handleNoCredentials(
          credentials,
          excludedConnectionIds.size > 0 ? Array.from(excludedConnectionIds)[0] : null,
          provider,
          model,
          lastError,
          lastStatus
        );
      }

      const accountId = credentials.connectionId.slice(0, 8);
      log.info("AUTH", `Using ${provider} account: ${accountId}...`);
      let requestBody = body;
      let injectedHandoff = null;
      if (
        comboStrategy === "context-relay" &&
        comboName &&
        runtimeOptions.sessionId &&
        body?._omnirouteSkipContextRelay !== true
      ) {
        const handoff = getHandoff(runtimeOptions.sessionId, comboName);
        if (handoff && handoff.fromAccount !== credentials.connectionId) {
          // Inject only after a real account switch. The combo loop itself cannot
          // reliably detect this because account selection happens inside auth.
          requestBody = injectHandoffIntoBody(body, handoff);
          injectedHandoff = handoff;
          log.info(
            "CONTEXT_RELAY",
            `Injecting handoff for session ${runtimeOptions.sessionId}: ${handoff.fromAccount.slice(
              0,
              8
            )} -> ${credentials.connectionId.slice(0, 8)}`
          );
        }
      }
      const refreshedCredentials = await checkAndRefreshToken(provider, credentials);
      const storeEnabled = isOpenAIResponsesStoreEnabled(
        refreshedCredentials?.providerSpecificData ?? credentials?.providerSpecificData
      );
      if (provider === "codex" && storeEnabled && runtimeOptions.sessionId) {
        requestBody = ensureOpenAIStoreSessionFallback(requestBody, runtimeOptions.sessionId);
      }
      if (provider === "codex" && refreshedCredentials?.accessToken && credentials.connectionId) {
        const workspaceId =
          typeof refreshedCredentials?.providerSpecificData?.workspaceId === "string" &&
          refreshedCredentials.providerSpecificData.workspaceId.trim().length > 0
            ? refreshedCredentials.providerSpecificData.workspaceId
            : typeof credentials?.providerSpecificData?.workspaceId === "string" &&
                credentials.providerSpecificData.workspaceId.trim().length > 0
              ? credentials.providerSpecificData.workspaceId
              : undefined;
        registerCodexConnection(credentials.connectionId, {
          accessToken: refreshedCredentials.accessToken,
          ...(workspaceId ? { workspaceId } : {}),
        });
      }
      if (runtimeOptions.sessionId && body?._omnirouteInternalRequest !== "context-handoff") {
        touchSession(runtimeOptions.sessionId, credentials.connectionId);
        startQuotaMonitor(
          runtimeOptions.sessionId,
          provider,
          credentials.connectionId,
          refreshedCredentials
        );
      }
      const proxyInfo = await safeResolveProxy(credentials.connectionId, apiKeyInfo?.id);
      const proxyStartTime = Date.now();

      // 4. Execute chat via core after breaker gate checks (with optional TLS tracking)
      if (telemetry) telemetry.startPhase("connect");
      const { result, tlsFingerprintUsed } = await executeChatWithBreaker({
        bypassCircuitBreaker: forceLiveComboTest || hasForcedConnection,
        breaker,
        body: requestBody,
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
        comboStrategy,
        isCombo,
        comboStepId: runtimeOptions.comboStepId ?? null,
        comboExecutionKey: runtimeOptions.comboExecutionKey ?? runtimeOptions.comboStepId ?? null,
        extendedContext,
        modelApiFormat: apiFormat,
        providerProfile,
        cachedSettings: runtimeOptions.cachedSettings,
        skipUpstreamRetry: runtimeOptions.skipUpstreamRetry ?? false,
      });
      if (telemetry) telemetry.endPhase();

      const proxyLatency = Date.now() - proxyStartTime;
      const providerAlias = PROVIDER_ID_TO_ALIAS[provider] || provider;
      const effectiveTargetFormat =
        getModelTargetFormat(providerAlias, model) ||
        getTargetFormat(provider, credentials.providerSpecificData) ||
        targetFormat;

      // 5. Log proxy + translation events (fire-and-forget; never blocks the response)
      void safeLogEvents({
        result,
        proxyInfo,
        proxyLatency,
        provider,
        model,
        sourceFormat,
        targetFormat: effectiveTargetFormat,
        credentials,
        comboName,
        clientRawRequest,
        tlsFingerprintUsed,
      });

      if (result.success) {
        clearModelLock(provider, credentials.connectionId, model);
        if (!forceLiveComboTest) {
          breaker._onSuccess();
        }
        if (injectedHandoff && runtimeOptions.sessionId && comboName) {
          deleteHandoff(runtimeOptions.sessionId, comboName);
        }
        if (telemetry) telemetry.startPhase("finalize");
        if (telemetry) telemetry.endPhase();
        return result.response;
      }

      const isAntigravityStreamReadinessFailure =
        provider === "antigravity" &&
        (result.errorCode === "STREAM_READINESS_TIMEOUT" ||
          result.errorCode === "STREAM_EARLY_EOF" ||
          result.errorType === "stream_timeout" ||
          result.errorType === "stream_early_eof");

      if (
        (result.errorType === "stream_timeout" || result.errorType === "stream_early_eof") &&
        !isAntigravityStreamReadinessFailure
      ) {
        // Bug #3758: flaky OpenAI-compatible upstreams (e.g. NVIDIA NIM) sometimes
        // send HTTP 200 then close the SSE early with zero useful frames
        // (STREAM_EARLY_EOF). That is a transient upstream glitch, not a bad key — so
        // allow exactly ONE bounded same-connection re-attempt before surfacing the
        // 502. Do NOT retry STREAM_READINESS_TIMEOUT (a slow-but-alive upstream;
        // retrying would only double latency) and do NOT mark the account unavailable
        // for the early close.
        if (
          shouldRetryStreamEarlyEof(result.errorCode, streamEarlyEofRetries) &&
          !hasForcedConnection
        ) {
          streamEarlyEofRetries += 1;
          log.warn(
            "STREAM",
            `${provider}/${model} closed the stream early before useful content — retrying once (attempt ${streamEarlyEofRetries})`
          );
          // Plain re-attempt of the same request: no markAccountUnavailable, no
          // excludedConnectionIds mutation (an early close is not a bad connection).
          continue;
        }

        // Stream readiness timeout is an upstream stall after an HTTP response was received,
        // not an account/quota failure. Do NOT mark the account unavailable here.
        return result.response;
      }

      if (isAntigravityStreamReadinessFailure) {
        const { shouldFallback, cooldownMs } = await markAccountUnavailable(
          credentials.connectionId,
          result.status || HTTP_STATUS.BAD_GATEWAY,
          result.error || result.errorCode || "Antigravity stream ended before useful content",
          provider,
          model,
          providerProfile,
          { isCombo }
        );

        if (shouldFallback && !hasForcedConnection) {
          log.warn(
            "AUTH",
            `Antigravity connection ${accountId}... produced no useful stream content, trying fallback connection`
          );
          if (Number.isFinite(cooldownMs) && cooldownMs > 0) {
            lastCooldownMs = cooldownMs;
            requestRetryLastCooldownMs = cooldownMs;
          }
          if (runtimeOptions.sessionAffinityKey) {
            try {
              const affinity = getSessionAccountAffinity(
                runtimeOptions.sessionAffinityKey,
                provider
              );
              if (affinity?.connectionId === credentials.connectionId) {
                deleteSessionAccountAffinity(runtimeOptions.sessionAffinityKey, provider);
              }
            } catch {
              // best-effort: selection also excludes this connection for the current retry.
            }
          }
          excludedConnectionIds.add(credentials.connectionId);
          lastError = result.error;
          lastStatus = result.status;
          requestRetryLastError = result.error;
          requestRetryLastStatus = result.status;
          continue;
        }

        return result.response;
      }

      const isAntigravityPreResponseTimeout =
        provider === "antigravity" &&
        result.status === HTTP_STATUS.GATEWAY_TIMEOUT &&
        (result.errorType === "upstream_timeout" ||
          result.errorCode === ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE);

      if (isAntigravityPreResponseTimeout) {
        const { shouldFallback, cooldownMs } = await markAccountUnavailable(
          credentials.connectionId,
          result.status,
          result.error || ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE,
          provider,
          model,
          providerProfile,
          { isCombo }
        );

        if (shouldFallback && !hasForcedConnection) {
          log.warn(
            "AUTH",
            `Antigravity connection ${accountId}... timed out before response headers, trying fallback connection`
          );
          if (Number.isFinite(cooldownMs) && cooldownMs > 0) {
            lastCooldownMs = cooldownMs;
            requestRetryLastCooldownMs = cooldownMs;
          }
          if (runtimeOptions.sessionAffinityKey) {
            try {
              const affinity = getSessionAccountAffinity(
                runtimeOptions.sessionAffinityKey,
                provider
              );
              if (affinity?.connectionId === credentials.connectionId) {
                deleteSessionAccountAffinity(runtimeOptions.sessionAffinityKey, provider);
              }
            } catch {
              // best-effort: selection also excludes this connection for the current retry.
            }
          }
          excludedConnectionIds.add(credentials.connectionId);
          lastError = result.error;
          lastStatus = result.status;
          requestRetryLastError = result.error;
          requestRetryLastStatus = result.status;
          continue;
        }

        return result.response;
      }

      if (result.errorType === "account_semaphore_capacity") {
        // Local concurrency pressure is not an upstream quota failure. Prefer another
        // account when possible; pinned combo steps fall through to combo orchestration.
        if (hasForcedConnection) {
          return result.response;
        }

        log.warn(
          "AUTH",
          `Account ${accountId}... at local concurrency cap, trying fallback account`
        );
        excludedConnectionIds.add(credentials.connectionId);
        lastError = result.error;
        lastStatus = result.status;
        requestRetryLastError = result.error;
        requestRetryLastStatus = result.status;
        continue;
      }

      // Emergency fallback for budget exhaustion (402 / billing / quota keywords):
      // reroute to a free model (default provider/model: nvidia + openai/gpt-oss-120b) exactly once.
      // Combo targets never emergency-hop: the combo is the operator's fallback policy
      // (target-level orchestration plus the global fallback #689 after it), and a
      // per-target hop burns extra upstream calls against exhausted providers (#1731).
      if (!runtimeOptions.emergencyFallbackTried && !comboName) {
        const fallbackDecision = shouldUseFallback(
          Number(result.status || 0),
          String(result.error || ""),
          Array.isArray(body?.tools) && body.tools.length > 0
        );

        if (isFallbackDecision(fallbackDecision)) {
          const fallbackModelStr = `${fallbackDecision.provider}/${fallbackDecision.model}`;
          const currentModelStr = `${provider}/${model}`;

          if (fallbackModelStr !== currentModelStr) {
            const fallbackBody = { ...body, model: fallbackModelStr };

            // Cap output on emergency fallback to avoid unexpected long responses.
            const maxTokens = Math.min(
              Number(
                fallbackBody.max_tokens ??
                  fallbackBody.max_completion_tokens ??
                  fallbackDecision.maxOutputTokens
              ) || fallbackDecision.maxOutputTokens,
              fallbackDecision.maxOutputTokens
            );
            fallbackBody.max_tokens = maxTokens;
            fallbackBody.max_completion_tokens = maxTokens;

            log.warn(
              "EMERGENCY_FALLBACK",
              `${currentModelStr} -> ${fallbackModelStr} | reason=${fallbackDecision.reason}`
            );

            const fallbackResponse = await handleSingleModelChat(
              fallbackBody,
              fallbackModelStr,
              clientRawRequest,
              request,
              comboName,
              apiKeyInfo,
              telemetry,
              {
                ...runtimeOptions,
                emergencyFallbackTried: true,
                forcedConnectionId: null,
                comboStepId: null,
                comboExecutionKey: null,
              },
              null, // no strategy for emergency fallback
              Boolean(comboName) // isCombo if comboName exists
            );

            if (fallbackResponse.ok) {
              return fallbackResponse;
            }

            log.warn(
              "EMERGENCY_FALLBACK",
              `Emergency fallback to ${fallbackModelStr} failed with status ${fallbackResponse.status}. Resuming original provider account fallback.`
            );
          }
        }
      }

      // 6. Daily quota error check - must be executed before markAccountUnavailable
      // Check if it's a daily quota exhausted error (e.g., ModelScope/Kimi "today's quota for model")
      // Daily quota lockout overrides subsequent rate_limited lockout, ensuring lockout until tomorrow 0:00
      let dailyQuotaExhausted = false;
      const errorStr = String(result.error || "");
      const failureKind =
        result.status === 429
          ? classify429FromError({ status: result.status, message: errorStr })
          : undefined;
      if (result.status === 429 && isDailyQuotaExhausted(errorStr)) {
        // Parse which model is quota-limited
        const match = errorStr.match(/today's quota for model ([^,]+)/);
        const limitedModel = match ? match[1].trim() : model;

        const mlSettings = resolveModelLockoutSettings(runtimeOptions.cachedSettings);
        if (mlSettings.enabled && mlSettings.errorCodes.includes(result.status)) {
          // Lock this model on this connection until tomorrow 00:00
          const lockResult = recordModelLockoutFailure(
            provider,
            credentials.connectionId,
            limitedModel,
            "quota_exhausted",
            result.status,
            0,
            providerProfile,
            { maxCooldownMs: mlSettings.maxCooldownMs }
          );

          log.info(
            "MODEL_DAILY_QUOTA",
            JSON.stringify({
              connection: credentials.connectionId.slice(0, 8),
              model: limitedModel,
              cooldownMs: lockResult.cooldownMs,
              failureCount: lockResult.failureCount,
            })
          );
        }

        dailyQuotaExhausted = true;
      }

      // 7. Mark account as quota-exhausted only for explicit long-window quota signals.
      // A plain 429/high-traffic response should trigger fallback/cooldown, not poison
      // quotaCache as exhausted for 5 minutes while usage quota may still be available.
      if (!dailyQuotaExhausted) {
        const passthroughModels = credentials.providerSpecificData?.passthroughModels;
        if (
          result.status === 429 &&
          shouldMarkAccountExhaustedFrom429(provider, model, passthroughModels, failureKind)
        ) {
          markAccountExhaustedFrom429(credentials.connectionId, provider);
        }
      }

      // 8. Fallback to next account
      // A3 guard: if 401 and connection has extra keys, skip connection-level disable
      // (key-level failure already recorded in chatCore.ts via T07)
      // Check extra keys directly from credentials for reliability across restarts
      const extraKeys =
        (credentials.providerSpecificData?.extraApiKeys as string[] | undefined) ?? [];
      const hasExtraKeys = extraKeys.length > 0 || connectionHasExtraKeys(credentials.connectionId);
      const is401 = result.status === 401;
      const skipConnectionDisable = is401 && hasExtraKeys;

      const { shouldFallback, cooldownMs } = skipConnectionDisable
        ? { shouldFallback: false, cooldownMs: 0 }
        : await markAccountUnavailable(
            credentials.connectionId,
            result.status,
            result.error,
            provider,
            model,
            providerProfile,
            {
              persistUnavailableState: !(
                isCombo &&
                result.status === 429 &&
                (failureKind === "rate_limit" || failureKind === "transient")
              ),
              isCombo,
            }
          );

      if (shouldFallback) {
        if (Number.isFinite(cooldownMs) && cooldownMs > 0) {
          lastCooldownMs = cooldownMs;
          requestRetryLastCooldownMs = cooldownMs;
        }
        log.warn("AUTH", `Account ${accountId}... unavailable (${result.status}), trying fallback`);
        excludedConnectionIds.add(credentials.connectionId);
        lastError = result.error;
        lastStatus = result.status;
        requestRetryLastError = result.error;
        requestRetryLastStatus = result.status;
        continue;
      }

      if (
        !forceLiveComboTest &&
        !isCombo &&
        PROVIDER_BREAKER_FAILURE_STATUSES.has(Number(result.status))
      ) {
        breaker._onFailure();
      }

      return result.response;
    }
  }
}
