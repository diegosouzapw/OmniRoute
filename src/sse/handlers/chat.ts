import { randomUUID } from "crypto";

import {
  getProviderCredentials,
  getProviderCredentialsWithQuotaPreflight,
  markAccountUnavailable,
  extractApiKey,
  isValidApiKey,
} from "../services/auth";

import {
  getRuntimeProviderProfile,
  shouldMarkAccountExhaustedFrom429,
  clearModelLock,
  recordModelLockoutFailure,
  isDailyQuotaExhausted,
} from "@omniroute/open-sse/services/accountFallback.ts";

import { getModelInfo, getComboForModel } from "../services/model";

import { errorResponse } from "@omniroute/open-sse/utils/error.ts";

import { handleComboChat } from "@omniroute/open-sse/services/combo.ts";

import { resolveComboConfig } from "@omniroute/open-sse/services/comboConfig.ts";

import { injectHandoffIntoBody } from "@omniroute/open-sse/services/contextHandoff.ts";

import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";

import { getTargetFormat } from "@omniroute/open-sse/services/provider.ts";

import {
  getModelTargetFormat,
  PROVIDER_MODELS,
  PROVIDER_ID_TO_ALIAS,
} from "@omniroute/open-sse/config/providerModels.ts";

import * as log from "../utils/logger";

import { checkAndRefreshToken } from "../services/tokenRefresh";

import { deleteHandoff, getHandoff } from "@/lib/db/contextHandoffs";

import {
  getCachedSettings,
  getSettings,
  getCombos,
  getProviderConnections,
  getAllCustomModels,
  updateSettings,
} from "@/lib/localDb";

import {
  ensureOpenAIStoreSessionFallback,
  isOpenAIResponsesStoreEnabled,
} from "@/lib/providers/requestDefaults";

import { sanitizeRequest } from "../../shared/utils/inputSanitizer";

import {
  resolveModelOrError,
  checkPipelineGates,
  executeChatWithBreaker,
  handleNoCredentials,
  safeResolveProxy,
  safeLogEvents,
  withSessionHeader,
} from "./chatHelpers";

// Pipeline integration — wired modules

import { getCircuitBreaker } from "../../shared/utils/circuitBreaker";

import { isModelAvailable } from "../../domain/modelAvailability";

import { markAccountExhaustedFrom429 } from "../../domain/quotaCache";

import { RequestTelemetry, recordTelemetry } from "../../shared/utils/requestTelemetry";

import { generateRequestId } from "../../shared/utils/requestId";

import { logAuditEvent } from "../../lib/compliance/index";

import { enforceApiKeyPolicy } from "../../shared/utils/apiKeyPolicy";

import { isDashboardSessionAuthenticated } from "../../shared/utils/apiAuth";

import { resolveFallbackChain } from "../../domain/fallbackPolicy";

import { cloneLogPayload } from "@/lib/logPayloads";

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
  getCooldownAwareRetryDecision,
  resolveCooldownAwareRetrySettings,
  waitForCooldownAwareRetry,
} from "../services/cooldownAwareRetry";

import {
  registerCodexQuotaFetcher,
  registerCodexConnection,
  fetchCodexQuota,
} from "@omniroute/open-sse/services/codexQuotaFetcher.ts";

// Register Codex quota fetcher at module load (once per server start).

// This hooks into the quotaPreflight + quotaMonitor systems so that combos

// can proactively switch accounts before the 5h or 7d quota is exhausted.

registerCodexQuotaFetcher();

function normalizePoolEntries(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  const deduped = new Set<string>();

  for (const entry of value) {
    if (typeof entry !== "string") continue;

    const trimmed = entry.trim();

    if (!trimmed) continue;

    deduped.add(trimmed);
  }

  return Array.from(deduped);
}

function normalizeProviderEntries(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  const deduped = new Set<string>();

  for (const entry of value) {
    if (typeof entry !== "string") continue;

    const trimmed = entry.trim();

    if (!trimmed) continue;

    deduped.add(trimmed);
  }

  return Array.from(deduped);
}

function isModelAllowedByPatterns(modelId: string, patterns: string[]): boolean {
  if (!patterns.length) return true;

  for (const pattern of patterns) {
    if (pattern === modelId) return true;

    if (pattern.endsWith("/*")) {
      const prefix = pattern.slice(0, -2);

      if (modelId.startsWith(`${prefix}/`)) return true;
    }
  }

  return false;
}

function shouldRetryGlobalRandomModel(status: number): boolean {
  return status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
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

async function shouldRetryGlobalRandomResponse(response: Response): Promise<boolean> {
  if (shouldRetryGlobalRandomModel(response.status)) return true;

  if (response.status !== 400) return false;

  // Some providers return 400 when a model is unsupported for that endpoint/account.

  // In global-random mode, this should fail over to the next candidate.

  try {
    const text = (await response.clone().text()).toLowerCase();

    return (
      text.includes("model is not supported") ||
      text.includes("unsupported model") ||
      text.includes("model not supported") ||
      text.includes("model_not_supported") ||
      text.includes("model not found")
    );
  } catch {
    return false;
  }
}

async function shouldAutoBlockGlobalRandomResponse(response: Response): Promise<boolean> {
  if (response.status !== 400) return false;

  try {
    const text = (await response.clone().text()).toLowerCase();

    return (
      text.includes("model is not supported") ||
      text.includes("unsupported model") ||
      text.includes("model not supported") ||
      text.includes("model_not_supported") ||
      text.includes("model not found")
    );
  } catch {
    return false;
  }
}

async function addModelToGlobalRandomBlocklist(
  modelId: string,

  settings: Record<string, unknown>
): Promise<void> {
  const current = normalizePoolEntries(settings.globalRandomRoutingBlockedModels);

  if (current.includes(modelId)) return;

  const next = [...current, modelId].slice(-2000);

  try {
    await updateSettings({ globalRandomRoutingBlockedModels: next });

    settings.globalRandomRoutingBlockedModels = next;

    log.warn("GLOBAL_RANDOM", `Model auto-blocked after incompatibility: ${modelId}`);
  } catch (err: any) {
    log.warn(
      "GLOBAL_RANDOM",

      `Failed to persist auto-blocklist for ${modelId}: ${err?.message || "unknown"}`
    );
  }
}

function pickRandomCandidate(
  candidates: string[],

  mode: string,

  rawWeights: unknown
): string | null {
  if (!Array.isArray(candidates) || candidates.length === 0) return null;

  const weights =
    rawWeights && typeof rawWeights === "object"
      ? (rawWeights as Record<string, unknown>)
      : ({} as Record<string, unknown>);

  if (mode === "weighted") {
    const weighted = candidates

      .map((model) => {
        const raw = weights[model];

        const parsed = Number(raw ?? 1);

        const weight = Number.isFinite(parsed) ? parsed : 1;

        return { model, weight: Math.max(0, weight) };
      })

      .filter((entry) => entry.weight > 0);

    const total = weighted.reduce((sum, item) => sum + item.weight, 0);

    if (total > 0) {
      let cursor = Math.random() * total;

      for (const item of weighted) {
        cursor -= item.weight;

        if (cursor <= 0) return item.model;
      }

      return weighted[weighted.length - 1]?.model || null;
    }
  }

  const idx = Math.floor(Math.random() * candidates.length);

  return candidates[idx] || null;
}

function sameProvider(
  candidateProvider: string | null | undefined,

  chainProvider: string
): boolean {
  if (!candidateProvider || !chainProvider) return false;

  const c = String(candidateProvider).trim();

  const p = String(chainProvider).trim();

  if (!c || !p) return false;

  const cAlias = PROVIDER_ID_TO_ALIAS[c] || c;

  const pAlias = PROVIDER_ID_TO_ALIAS[p] || p;

  return c === p || cAlias === p || c === pAlias || cAlias === pAlias;
}

function shuffleModels(models: string[]): string[] {
  const arr = [...models];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

async function buildGlobalRandomDynamicPool(
  includeCombos: boolean,

  apiKeyAllowedModels: string[],

  selectedProviders: string[]
): Promise<string[]> {
  const [connections, customModelsByProvider, combos] = await Promise.all([
    getProviderConnections().catch(() => []),

    getAllCustomModels().catch(() => ({})),

    getCombos().catch(() => []),
  ]);

  const activeProviders = new Set<string>();

  for (const conn of Array.isArray(connections) ? connections : []) {
    if (!conn || conn.isActive === false || typeof conn.provider !== "string") continue;

    const testStatus =
      typeof (conn as any).testStatus === "string"
        ? (conn as any).testStatus.trim().toLowerCase()
        : "";

    if (testStatus === "expired" || testStatus === "banned" || testStatus === "credits_exhausted") {
      continue;
    }

    const hasCredential = Boolean(
      (typeof (conn as any).apiKey === "string" && (conn as any).apiKey.trim()) ||
      (typeof (conn as any).accessToken === "string" && (conn as any).accessToken.trim()) ||
      (typeof (conn as any).refreshToken === "string" && (conn as any).refreshToken.trim())
    );

    if (!hasCredential) continue;

    activeProviders.add(conn.provider);
  }

  const selectedProviderSet = new Set(selectedProviders);

  const deduped = new Set<string>();

  for (const providerId of activeProviders) {
    if (
      selectedProviderSet.size > 0 &&
      !selectedProviderSet.has(providerId) &&
      !selectedProviderSet.has(PROVIDER_ID_TO_ALIAS[providerId] || providerId)
    ) {
      continue;
    }

    const alias = PROVIDER_ID_TO_ALIAS[providerId] || providerId;

    const providerModels = (PROVIDER_MODELS[alias] || PROVIDER_MODELS[providerId] || []) as Array<{
      id?: string;
    }>;

    for (const providerModel of providerModels) {
      const modelId = providerModel?.id;

      if (!modelId) continue;

      deduped.add(`${alias}/${modelId}`);

      deduped.add(`${providerId}/${modelId}`);
    }

    const customModels = Array.isArray((customModelsByProvider as any)?.[providerId])
      ? ((customModelsByProvider as any)[providerId] as Array<{ id?: string }>)
      : [];

    for (const customModel of customModels) {
      const modelId = typeof customModel?.id === "string" ? customModel.id.trim() : "";

      if (!modelId) continue;

      deduped.add(`${alias}/${modelId}`);

      deduped.add(`${providerId}/${modelId}`);
    }
  }

  if (includeCombos) {
    for (const combo of Array.isArray(combos) ? combos : []) {
      if (!combo || combo.isActive === false || combo.isHidden === true) continue;

      if (typeof combo.name !== "string" || !combo.name.trim()) continue;

      deduped.add(combo.name.trim());
    }
  }

  const candidates = Array.from(deduped);

  if (!apiKeyAllowedModels.length) return candidates;

  return candidates.filter((modelId) => isModelAllowedByPatterns(modelId, apiKeyAllowedModels));
}

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

  const rawClientBody = cloneLogPayload(body);

  // Build clientRawRequest for logging (if not provided)

  if (!clientRawRequest) {
    clientRawRequest = buildClientRawRequest(request, rawClientBody);
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

  // Optional strict API key mode for /v1 endpoints (require key on every request).

  const isComboLiveTest = request.headers?.get?.("x-internal-test") === "combo-health-check";

  const hasDashboardSession =
    !apiKey && !isComboLiveTest ? await isDashboardSessionAuthenticated(request) : false;

  if (process.env.REQUIRE_API_KEY === "true" && !isComboLiveTest && !hasDashboardSession) {
    if (!apiKey) {
      log.warn("AUTH", "Missing API key while REQUIRE_API_KEY=true");

      return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Missing API key");
    }

    const valid = await isValidApiKey(apiKey);

    if (!valid) {
      log.warn("AUTH", "Invalid API key while REQUIRE_API_KEY=true");

      return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Invalid API key");
    }
  } else if (apiKey && !isComboLiveTest) {
    // Client sent a Bearer key — it must exist in DB (otherwise reject to avoid "key ignored" confusion).

    const valid = await isValidApiKey(apiKey);

    if (!valid) {
      log.warn("AUTH", "API key not found or invalid (must be created in API Manager)");

      return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Invalid API key");
    }
  } else if (hasDashboardSession) {
    log.debug("AUTH", "Dashboard session authenticated internal chat request");
  }

  if (!modelStr) {
    log.warn("CHAT", "Missing model");

    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing model");
  }

  // T04: client-provided external session header has priority over generated fingerprint.

  const externalSessionId = extractExternalSessionId(request.headers);

  const sessionId = externalSessionId || generateStableSessionId(body);

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

  // Global random routing: applies before combo detection.

  // This enables per-request model/provider randomization without requiring combo activation.

  const settings = (await getSettings().catch(() => ({}))) as Record<string, unknown>;

  const globalRandomEnabled = settings.globalRandomRoutingEnabled === true;

  let globalRandomCandidates: string[] = [];

  if (globalRandomEnabled) {
    telemetry.startPhase("global-random-route");

    const mode =
      settings.globalRandomRoutingMode === "weighted"
        ? "weighted"
        : settings.globalRandomRoutingMode === "strict"
          ? "strict"
          : "strict";

    const excludeCombos = settings.globalRandomRoutingExcludeCombos !== false;

    const selectedProviders = normalizeProviderEntries(settings.globalRandomRoutingProviders);

    const blockedModels = new Set(normalizePoolEntries(settings.globalRandomRoutingBlockedModels));

    const allowedPatterns = Array.isArray(apiKeyInfo?.allowedModels)
      ? apiKeyInfo.allowedModels.filter((p: unknown) => typeof p === "string")
      : [];

    let candidatePool = normalizePoolEntries(settings.globalRandomRoutingPool);

    if (!candidatePool.length) {
      candidatePool = await buildGlobalRandomDynamicPool(
        !excludeCombos,

        allowedPatterns,

        selectedProviders
      );
    } else {
      if (excludeCombos) {
        const combos = await getCombos().catch(() => []);

        const comboNames = new Set(
          (Array.isArray(combos) ? combos : [])

            .map((combo: any) => (typeof combo?.name === "string" ? combo.name.trim() : ""))

            .filter(Boolean)
        );

        candidatePool = candidatePool.filter((candidate) => !comboNames.has(candidate));
      }

      if (allowedPatterns.length) {
        candidatePool = candidatePool.filter((candidate) =>
          isModelAllowedByPatterns(candidate, allowedPatterns)
        );
      }
    }

    if (blockedModels.size > 0) {
      candidatePool = candidatePool.filter((candidate) => !blockedModels.has(candidate));
    }

    let chosenModel: string | null = null;

    const fallbackChain = resolveFallbackChain(modelStr);

    if (fallbackChain.length > 0 && candidatePool.length > 0) {
      const providerByModel = new Map<string, string | null>();

      await Promise.all(
        candidatePool.map(async (candidate) => {
          try {
            const info = await getModelInfo(candidate);

            providerByModel.set(candidate, info?.provider || null);
          } catch {
            providerByModel.set(candidate, null);
          }
        })
      );

      const ordered: string[] = [];

      const used = new Set<string>();

      for (const entry of fallbackChain) {
        const chainProvider =
          typeof (entry as any)?.provider === "string" ? (entry as any).provider : "";

        if (!chainProvider) continue;

        const providerModels = candidatePool.filter(
          (candidate) =>
            !used.has(candidate) && sameProvider(providerByModel.get(candidate), chainProvider)
        );

        for (const model of shuffleModels(providerModels)) {
          ordered.push(model);

          used.add(model);
        }
      }

      for (const model of candidatePool) {
        if (!used.has(model)) {
          ordered.push(model);
        }
      }

      globalRandomCandidates = ordered;

      chosenModel = ordered[0] || null;

      if (chosenModel) {
        log.info(
          "GLOBAL_RANDOM",

          `Using provider fallback chain for ${modelStr}: ${fallbackChain

            .map((e: any) => e.provider)

            .join(" -> ")}`
        );
      }
    }

    if (!chosenModel) {
      chosenModel = pickRandomCandidate(candidatePool, mode, settings.globalRandomRoutingWeights);

      if (chosenModel) {
        globalRandomCandidates = [
          chosenModel,

          ...candidatePool.filter((candidate) => candidate !== chosenModel),
        ];
      }
    }

    if (chosenModel) {
      resolvedModelStr = chosenModel;

      body = { ...body, model: chosenModel };

      log.info(
        "GLOBAL_RANDOM",

        `Mode=${mode} | picked=${chosenModel} | requested=${modelStr} | pool=${candidatePool.length}`
      );
    } else {
      log.warn(
        "GLOBAL_RANDOM",

        `Enabled but no valid candidates. Keeping requested model: ${resolvedModelStr}`
      );
    }

    telemetry.endPhase();
  }

  // Check if model is a combo (has multiple models with fallback)

  telemetry.startPhase("resolve");

  const combo = await getComboForModel(resolvedModelStr);

  if (combo) {
    log.info(
      "CHAT",

      `Combo "${modelStr}" [${combo.strategy || "priority"}] with ${combo.models.length} models`
    );

    // Pre-check function used by combo routing. For explicit combo live tests,

    // avoid pre-skipping so each model gets a real execution attempt.

    const checkModelAvailable = async (modelString: string) => {
      if (isComboLiveTest) return true;

      // Use getModelInfo to properly resolve custom prefixes

      const modelInfo = await getModelInfo(modelString);

      const provider = modelInfo.provider;

      if (!provider) return true; // can't determine provider, let it try

      // Check domain-level availability (cooldown)

      if (!isModelAvailable(provider, modelInfo.model || modelString)) {
        log.debug("AVAILABILITY", `${provider}/${modelInfo.model} in cooldown, skipping`);

        return false;
      }

      const creds = await getProviderCredentials(
        provider,

        null,

        apiKeyInfo?.allowedConnections ?? null,

        modelInfo.model || modelString
      );

      if (!creds || creds.allRateLimited) return false;

      // ── Codex Quota Preflight (Item 1-2) ──────────────────────────────────

      // Proactively skip Codex accounts that have consumed >= 95% of either

      // their 5h or 7d quota window. This prevents requests from failing with

      // a 429 and then retrying — we switch accounts early instead.

      if (provider === "codex" && creds.connectionId) {
        // Register connection metadata so the fetcher can call the usage API

        if (creds.accessToken) {
          registerCodexConnection(creds.connectionId, {
            accessToken: creds.accessToken,

            workspaceId:
              typeof creds.providerSpecificData?.workspaceId === "string"
                ? creds.providerSpecificData.workspaceId
                : undefined,
          });
        }

        const quotaInfo = await fetchCodexQuota(creds.connectionId);

        if (quotaInfo && quotaInfo.percentUsed >= 0.95) {
          const pct = (quotaInfo.percentUsed * 100).toFixed(1);

          log.info(
            "QUOTA_PREFLIGHT",

            `Skipping Codex account ${creds.connectionId.slice(0, 8)}...: quota at ${pct}% (preflight)`
          );

          return false;
        }
      }

      // ──────────────────────────────────────────────────────────────────────

      return true;
    };

    // Fetch settings and all combos for config cascade and nested resolution

    const allCombos = await getCombos().catch(() => []);

    const relayConfig =
      combo.strategy === "context-relay" ? resolveComboConfig(combo, settings) : null;

    telemetry.endPhase();

    // Context-relay keeps generation in combo.ts, but handoff injection lives here

    // because only this layer knows which connectionId was actually selected.

    const response = await (handleComboChat as any)({
      body,

      combo,

      handleSingleModel: (b: any, m: string) =>
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

            forceLiveComboTest: isComboLiveTest,
          },

          combo.strategy,

          true
        ),

      isModelAvailable: checkModelAvailable,

      log,

      settings,

      allCombos,

      relayOptions:
        combo.strategy === "context-relay"
          ? {
              sessionId,

              config: relayConfig,
            }
          : undefined,
    });

    // ── Global Fallback Provider (#689) ────────────────────────────────────

    // If combo exhausted all models, try the global fallback before giving up.

    if (
      response &&
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

          { sessionId, emergencyFallbackTried: true, forceLiveComboTest: isComboLiveTest },

          combo.strategy,

          true
        );

        if (fallbackResponse?.ok) {
          log.info("GLOBAL_FALLBACK", `Global fallback ${fallbackModel} succeeded`);

          recordTelemetry(telemetry);

          return withSessionHeader(fallbackResponse, sessionId);
        }

        log.warn(
          "GLOBAL_FALLBACK",

          `Global fallback ${fallbackModel} also failed (${fallbackResponse?.status || "null"})`
        );
      } catch (err: any) {
        log.warn("GLOBAL_FALLBACK", `Global fallback error: ${err?.message || "unknown"}`);
      }
    }

    // ─────────────────────────────────────────────────────────────────────────

    // Record telemetry

    recordTelemetry(telemetry);

    if (!response) {
      return withSessionHeader(
        errorResponse(HTTP_STATUS.BAD_GATEWAY, "No upstream response from combo"),

        sessionId
      );
    }

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

    { sessionId, forceLiveComboTest: isComboLiveTest },

    null,

    false
  );

  if (!response) {
    log.warn("GLOBAL_RANDOM", `Primary model returned null response: ${resolvedModelStr}`);
  }

  if (
    globalRandomEnabled &&
    response &&
    !response.ok &&
    (await shouldAutoBlockGlobalRandomResponse(response))
  ) {
    await addModelToGlobalRandomBlocklist(resolvedModelStr, settings);
  }

  if (
    globalRandomEnabled &&
    globalRandomCandidates.length > 1 &&
    (!response || (!response.ok && (await shouldRetryGlobalRandomResponse(response))))
  ) {
    log.warn(
      "GLOBAL_RANDOM",

      `Primary model failed (${response?.status || "null"}). Trying fallback models from global pool.`
    );

    for (const fallbackModel of globalRandomCandidates.slice(1)) {
      try {
        const fallbackBody = { ...body, model: fallbackModel };

        const fallbackResponse = await handleSingleModelChat(
          fallbackBody,

          fallbackModel,

          clientRawRequest,

          request,

          null,

          apiKeyInfo,

          telemetry,

          { sessionId, forceLiveComboTest: isComboLiveTest },

          null,

          false
        );

        if (!fallbackResponse) {
          log.warn("GLOBAL_RANDOM", `Fallback model ${fallbackModel} returned null response.`);

          continue;
        }

        if (fallbackResponse.ok) {
          log.info("GLOBAL_RANDOM", `Fallback model succeeded: ${fallbackModel}`);

          recordTelemetry(telemetry);

          return withSessionHeader(fallbackResponse, sessionId);
        }

        if (await shouldAutoBlockGlobalRandomResponse(fallbackResponse)) {
          await addModelToGlobalRandomBlocklist(fallbackModel, settings);
        }

        if (!(await shouldRetryGlobalRandomResponse(fallbackResponse))) {
          log.warn(
            "GLOBAL_RANDOM",

            `Fallback model ${fallbackModel} failed with non-retriable status ${fallbackResponse.status}.`
          );

          recordTelemetry(telemetry);

          return withSessionHeader(fallbackResponse, sessionId);
        }
      } catch (err: any) {
        log.warn(
          "GLOBAL_RANDOM",

          `Error while trying fallback model ${fallbackModel}: ${err?.message || "unknown"}`
        );
      }
    }
  }

  recordTelemetry(telemetry);

  if (!response) {
    return withSessionHeader(
      errorResponse(HTTP_STATUS.BAD_GATEWAY, "No upstream response from selected model"),

      sessionId
    );
  }

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

    forcedConnectionId?: string | null;

    allowedConnectionIds?: string[] | null;

    comboStepId?: string | null;

    comboExecutionKey?: string | null;
  } = {},

  comboStrategy: string | null = null,

  isCombo: boolean = false
) {
  // 1. Resolve model → provider/model

  const resolved = await resolveModelOrError(modelStr, body, clientRawRequest?.endpoint);

  if (resolved.error) return resolved.error;

  const { provider, model, sourceFormat, targetFormat, extendedContext } = resolved;

  const forceLiveComboTest = runtimeOptions.forceLiveComboTest === true;

  const hasForcedConnection =
    typeof runtimeOptions.forcedConnectionId === "string" &&
    runtimeOptions.forcedConnectionId.trim().length > 0;

  const effectiveAllowedConnections = intersectAllowedConnectionIds(
    apiKeyInfo?.allowedConnections ?? null,

    runtimeOptions.allowedConnectionIds ?? null
  );

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

  const breaker = getCircuitBreaker(provider, {
    failureThreshold: providerProfile.failureThreshold,

    resetTimeout: providerProfile.resetTimeoutMs,

    onStateChange: (name: string, from: string, to: string) =>
      log.info("CIRCUIT", `${name}: ${from} → ${to}`),
  });

  const userAgent = request?.headers?.get("user-agent") || "";

  const baseRetrySettings = resolveCooldownAwareRetrySettings(
    await getCachedSettings().catch(() => ({}))
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

  requestAttemptLoop: while (true) {
    const excludedConnectionIds = new Set<string>();

    let lastError = requestRetryLastError;

    let lastStatus = requestRetryLastStatus;

    let lastCooldownMs = requestRetryLastCooldownMs;

    while (true) {
      const credentials = await getProviderCredentialsWithQuotaPreflight(
        provider,

        null,

        effectiveAllowedConnections,

        model,

        {
          excludeConnectionIds: Array.from(excludedConnectionIds),

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

      const proxyInfo = await safeResolveProxy(credentials.connectionId);

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

        providerProfile,
      });

      if (telemetry) telemetry.endPhase();

      const proxyLatency = Date.now() - proxyStartTime;

      const providerAlias = PROVIDER_ID_TO_ALIAS[provider] || provider;

      const effectiveTargetFormat =
        getModelTargetFormat(providerAlias, model) ||
        getTargetFormat(provider, credentials.providerSpecificData) ||
        targetFormat;

      // 5. Log proxy + translation events

      safeLogEvents({
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

      // Emergency fallback for budget exhaustion (402 / billing / quota keywords):

      // reroute to a free model (default provider/model: nvidia + openai/gpt-oss-120b) exactly once.

      if (!runtimeOptions.emergencyFallbackTried) {
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

      if (result.status === 429 && isDailyQuotaExhausted(errorStr)) {
        // Parse which model is quota-limited

        const match = errorStr.match(/today's quota for model ([^,]+)/);

        const limitedModel = match ? match[1].trim() : model;

        // Lock this model on this connection until tomorrow 00:00

        const lockResult = recordModelLockoutFailure(
          provider,

          credentials.connectionId,

          limitedModel,

          "quota_exhausted",

          result.status,

          0,

          providerProfile
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

        dailyQuotaExhausted = true;
      }

      // 7. Mark account as quota-exhausted on 429 response (non-daily-quota errors)

      // For providers that route quota/cooldown at model scope, a 429 on one model

      // does not mean the whole connection is exhausted.

      // Daily quota errors are handled above; only process regular rate_limit here

      if (!dailyQuotaExhausted) {
        const passthroughModels = credentials.providerSpecificData?.passthroughModels;

        if (
          result.status === 429 &&
          shouldMarkAccountExhaustedFrom429(provider, model, passthroughModels)
        ) {
          markAccountExhaustedFrom429(credentials.connectionId, provider);
        }
      }

      // 8. Fallback to next account

      const { shouldFallback, cooldownMs } = await markAccountUnavailable(
        credentials.connectionId,

        result.status,

        result.error,

        provider,

        model,

        providerProfile
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

      if (!forceLiveComboTest && PROVIDER_BREAKER_FAILURE_STATUSES.has(Number(result.status))) {
        breaker._onFailure();
      }

      return result.response;
    }
  }
}
