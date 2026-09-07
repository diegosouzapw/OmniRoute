import { randomUUID } from "crypto";
import { resolveChatRequestBody } from "./requestBody";
import * as chatAdmission from "./chatAdmission.ts";
import { buildClientRawRequest, resolveDispatchClientRawRequest } from "./chat/clientRawRequest.ts";
export { buildClientRawRequest, resolveDispatchClientRawRequest };
import { normalizeReasoningRequest } from "@/shared/reasoning/effortStandardization";
import { isDetailedLoggingEnabled } from "@/lib/db/detailedLogs";
import { resolvePreviousResponseState } from "@/lib/db/responsesContinuationStore";
import { normalizeResponsesPreviousResponseIdMode } from "@omniroute/open-sse/utils/responsesStatePolicy.ts";
import { FORMATS } from "@omniroute/open-sse/translator/formats.ts";
import { resolveRoutingModel, RoutingModelOps } from "./resolveRoutingModel";
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
import { getCombo, getComboForModel, getModelInfo } from "../services/model";
import { stripContextWindowSuffix } from "@omniroute/open-sse/services/model.ts";
import { resolveBareModelToConnectionDefault } from "@omniroute/open-sse/services/model.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { getImageModelEntry } from "@omniroute/open-sse/config/imageRegistry.ts";
import { acceptHeaderForcesStream } from "@omniroute/open-sse/utils/aiSdkCompat.ts";
import { applyNoThinkingAlias } from "@omniroute/open-sse/utils/noThinkingAlias.ts";
import { resolveCcDiscoveryAliasStrip } from "@/lib/ccDiscoveryAliasResolve";
import {
  handleComboChat,
  resolveComboTargets,
  shouldSkipConnDisable,
} from "@omniroute/open-sse/services/combo.ts";
import type { ComboLike, SingleModelTarget } from "@omniroute/open-sse/services/combo/types.ts";
import { mergeAbortSignals } from "@omniroute/open-sse/executors/base.ts";
import { resolveRequestAutoControls } from "@omniroute/open-sse/services/autoCombo/requestControls.ts";
import { isVerifiedNativeCodexRequest } from "@omniroute/open-sse/config/codexIdentity.ts";
import { resolveCompressionSettings } from "@omniroute/open-sse/handlers/chatCore/compressionSettings.ts";
import type { CompressionExclusions } from "@omniroute/open-sse/services/compression/exclusions.ts";
import { resolveComboConfig } from "@omniroute/open-sse/services/comboConfig.ts";
import { injectHandoffIntoBody } from "@omniroute/open-sse/services/contextHandoff.ts";
import {
  HTTP_STATUS,
  ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE,
} from "@omniroute/open-sse/config/constants.ts";
import {
  getTargetFormat,
  detectFormatFromEndpoint,
  detectFormatFromUrl,
} from "@omniroute/open-sse/services/provider.ts";
import {
  getModelsByProviderId,
  getModelTargetFormat,
  PROVIDER_ID_TO_ALIAS,
} from "@omniroute/open-sse/config/providerModels.ts";
import { getPassthroughProviders } from "@omniroute/open-sse/config/providerRegistry.ts";
import * as log from "../utils/logger";
import { checkAndRefreshToken } from "../services/tokenRefresh";
import { createHookContext, runHooks, initPreRequestRegistry } from "@/lib/middleware/registry";
import { rejectPeerRequest } from "@/shared/resilience/peerRouting";
import { isRuntimeProviderRetirementError } from "@/shared/constants/providerRetirement";
import { isCommonChatGptWebRetirementError } from "@/shared/constants/chatgptWebRetirement";
import { isChatGptWebCodexModel } from "@/shared/constants/chatgptWebCodex";
import { deleteHandoff, getHandoff } from "@/lib/db/contextHandoffs";
import { getComboByName, updateCombo } from "@/lib/db/combos";
import { isModelAllowedForKey } from "@/lib/db/apiKeys";
import { promoteSuccessfulComboModel } from "@/lib/combos/autoPromote";
import {
  deleteSessionAccountAffinity,
  evictSessionAccountAffinityForConnection,
  getSessionAccountAffinity,
} from "@/lib/db/sessionAccountAffinity";
import { dispatchChatWithAffinityEviction } from "./chatDispatch";
import { getCachedSettings, getCombosCacheVersion } from "@/lib/db/readCache";
import { comboCheckProvider, ghComboGate } from "./chat/githubLiveCatalogFilter.ts";
import { getCombos } from "@/lib/db/combos";
import { resolveModelLockoutSettings } from "@/lib/resilience/modelLockoutSettings";
import {
  ensureOpenAIStoreSessionFallback,
  isOpenAIResponsesStoreEnabled,
} from "@/lib/providers/requestDefaults";
import { guardrailRegistry, resolveDisabledGuardrails } from "@/lib/guardrails";
import {
  resolveModelOrError,
  checkPipelineGates,
  checkResourcePressureBeforeProviderWork,
  executeChatWithBreaker,
  findShadowedCompatibleNode,
  handleNoCredentials,
  safeResolveProxy,
  safeLogEvents,
  applyExecutorProxyToInfo,
  shouldRetryStreamEarlyEof,
  withSessionHeader,
  withSelectedConnectionHeader,
  withCorrelationId,
  withModalityBridgeHeader,
  withConversationId,
} from "./chatHelpers";
import { buildModalityBridgeHeader } from "@/lib/guardrails/modalityBridge/bridgeStats";
import type { VideoBridgeLogRedactionEntry } from "@/lib/guardrails/videoBridge";
import { reanchorVideoBridgeRedaction } from "@/lib/guardrails/videoBridge";
import { resolveConversationId } from "@omniroute/open-sse/services/conversationTracker.ts";
import {
  classifyProviderBreakerResult,
  isAntigravityMissingProjectError,
  isProviderBreakerFailureStatus,
  resolveStreamReadinessClassificationError,
} from "./chatPredicates";
import { markAntigravityMissingCloudCodeProject } from "@omniroute/open-sse/services/antigravityProjectPersistence.ts";
import { connectionHasExtraKeys } from "@omniroute/open-sse/services/apiKeyRotator.ts";
import { wrapResponseWithOAuthSessionRelease } from "@omniroute/open-sse/services/oauthSessionOccupancy.ts";
import {
  extractReasoningIntent,
  type ExtractedReasoningIntent,
  type ReasoningRuleDecision,
} from "@/lib/reasoningRouting/policy";
import {
  applyConnectionReasoningRule,
  applyReasoningRouting,
  filterReasoningCombo,
} from "./reasoningRouting";
import { createVirtualAutoCombo, resolveAutoRoutingState } from "./autoRouting";
import { getComboFailureLogError } from "./comboFailureLogging";

// Pipeline integration — wired modules
import { classify429FromError, type FailureKind } from "@/shared/utils/classify429";
import { isSubscriptionQuotaText } from "@omniroute/open-sse/services/quotaTextCooldowns.ts";
import { resolveUseUpstream429BreakerHints } from "@/shared/utils/providerHints";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { shouldIsolateProbeFailures } from "@/shared/utils/probeOrigin";
import { getCircuitBreaker, isLocalStreamLifecycleError } from "../../shared/utils/circuitBreaker";
import { markAccountExhaustedFrom429 } from "../../domain/quotaCache";
import { resolveForcedConnectionForCredentialPool } from "../services/sessionAffinityPin.ts";
import { RequestTelemetry, recordTelemetry } from "../../shared/utils/requestTelemetry";
import { generateRequestId } from "../../shared/utils/requestId";
import { logAuditEvent } from "../../lib/compliance/index";
import { enforceApiKeyPolicy } from "../../shared/utils/apiKeyPolicy";
import { hasProviderQuotaBypassScope } from "../../shared/constants/apiKeyPolicyScopes";
import { isMicrosoftDesignerWebProviderRetiredError } from "../../shared/constants/designerWebRetirement";
import { cloneBoundedForLog } from "@omniroute/open-sse/utils/requestLogger.ts";
import { handleInternalUsageCommand } from "@/lib/usage/internalUsageCommand";
import {
  applyTaskAwareRouting,
  getTaskRoutingConfig,
} from "@omniroute/open-sse/services/taskAwareRouter.ts";
import {
  hasNativeWebSearchTool,
  resolveWebSearchRouteOverride,
} from "@omniroute/open-sse/services/webSearchRouting.ts";
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
import { registerQwenTokenPlanQuotaFetcher } from "@omniroute/open-sse/services/qwenTokenPlanQuotaFetcher.ts";
import { registerCrofUsageFetcher } from "@omniroute/open-sse/services/crofUsageFetcher.ts";
import { registerDeepseekQuotaFetcher } from "@omniroute/open-sse/services/deepseekQuotaFetcher.ts";
import { registerMoonshotQuotaFetcher, registerMoonshotFetchersForNodes } from "@omniroute/open-sse/services/moonshotQuotaFetcher.ts";
import { registerOpenrouterQuotaFetcher } from "@omniroute/open-sse/services/openrouterQuotaFetcher.ts";
import { registerOpencodeQuotaFetcher } from "@omniroute/open-sse/services/opencodeQuotaFetcher.ts";
import { registerGrokWebQuotaFetcher } from "@omniroute/open-sse/services/grokQuotaFetcher.ts";
import { registerGenericQuotaFetchers } from "@omniroute/open-sse/services/genericQuotaFetcher.ts";
import "@omniroute/open-sse/services/quotaTrackersBatch.ts";
import {
  disableCooldownAwareRetry,
  getCooldownAwareRetryDecision,
  resolveCooldownAwareRetrySettings,
  waitForCooldownAwareRetry,
} from "../services/cooldownAwareRetry";
import {
  shouldRetrySameAccountTransport,
  sameAccountTransportRetryDelayMs,
} from "../services/sameAccountTransportRetry";
import { constrainConnectionsToQuota, resolveQuotaKeyScope } from "../../lib/quota/quotaKey";
import { checkConnectionCapacity } from "../utils/backpressure";
import {
  buildManagedLeaseErrorResponse,
  buildManagedLeaseSelectionErrorResponse,
  credentialLease,
  isExclusiveLeaseManagedKey,
  LeaseContextError,
  parseManagedLeaseRequestContext,
  validateExclusiveLeaseKeyConfiguration,
  type ManagedLeaseDispatchContext,
} from "../services/leaseContext";

registerCodexQuotaFetcher();

// Register Bailian Coding Plan quota fetcher at module load (once per server start).
// This hooks into the quotaPreflight + quotaMonitor systems so that combos
// can proactively switch accounts before quota is exhausted.
registerBailianCodingPlanQuotaFetcher();

// Register the Qwen Cloud / Model Studio personal Token Plan fetcher (#9603).
// Cookie-authenticated console gateway — 5-hour + weekly sliding windows.
// Runs before registerGenericQuotaFetchers so the bespoke fetcher wins.
registerQwenTokenPlanQuotaFetcher();

// Register CrofAI usage fetcher (subscription requests + credits balance).
// Surfaces usable_requests + credits in the monitor and only blocks (preflight
// opt-in) when the active bucket reaches zero.
registerCrofUsageFetcher();
// Register DeepSeek balance quota fetcher.
// Hooks into quotaPreflight + quotaMonitor so combos can switch accounts before balance is exhausted.
registerDeepseekQuotaFetcher();
registerMoonshotQuotaFetcher();
void import("@/lib/db/providers")
  .then(({ getProviderNodes }) => getProviderNodes())
  .then((nodes) => {
    registerMoonshotFetchersForNodes(
      (Array.isArray(nodes) ? nodes : []).map((node) => ({
        id: typeof node.id === "string" ? node.id : null,
        prefix: typeof node.prefix === "string" ? node.prefix : null,
        baseUrl: typeof node.baseUrl === "string" ? node.baseUrl : null,
      })),
    );
  })
  .catch((error) => {
    console.warn("[STARTUP] Moonshot custom-node fetcher scan skipped:", error);
  });
registerOpenrouterQuotaFetcher();

// Register OpenCode quota fetcher (opencode-go / opencode / opencode-zen).
// Surfaces the $12/5h, $30/wk, $60/mo windows in the limits page and enables
// quota-aware preflight switching between connections. (#2852)
registerOpencodeQuotaFetcher();

// Register Grok Web quota fetcher.
// Reads account-level OIDC tokens from ~/.grok/auth.json (the local Grok CLI
// login) to surface the weekly credit-usage percentage in the dashboard.
// This runs before registerGenericQuotaFetchers so the bespoke fetcher takes
// precedence over the generic path (which can't resolve grok OIDC auth from
// cookie-based connections).
registerGrokWebQuotaFetcher();

// Register the generic quota fetcher for every other provider that has a
// usage implementation in usage.ts but no bespoke preflight fetcher. This is
// what lets the per-window cutoff modal in Dashboard › Limits actually
// enforce thresholds for Claude / GLM / Cursor / etc., not just Codex.
registerGenericQuotaFetchers();
let combosCachePromise: Promise<ComboLike[]> | null = null;
let combosCacheTs = 0;
let combosCacheVersionSnapshot = -1;
const COMBOS_CACHE_TTL_MS = 10_000;

/**
 * #10225 — resolve whether this request's combo preflight should DEFER its hard
 * context-overflow rejection so chatCore's compression runs first.
 *
 * Mirrors handleChatCore's own enablement determination (chatCore.ts): defer only
 * when the global compression switch is ON and the API key has not opted out
 * (`apiKeyInfo.compressionEnabled !== false`). Per-target applicability (server-side
 * exclusions) is checked inside getKnownContextOverflow via the returned exclusions.
 * Fail closed (defer=false) on any lookup error — the existing hard preflight stays.
 */
async function resolveComboContextOverflowDeferral(
  logger: { warn?: (...args: unknown[]) => void } | null | undefined,
  apiKeyInfo: { compressionEnabled?: boolean } | null | undefined
): Promise<{ defer: boolean; exclusions: CompressionExclusions | undefined }> {
  try {
    const compression = await resolveCompressionSettings(logger);
    return {
      defer: compression.enabled && apiKeyInfo?.compressionEnabled !== false,
      exclusions: compression.settings?.exclusions,
    };
  } catch {
    return { defer: false, exclusions: undefined };
  }
}

async function getCombosCachedForChat(): Promise<ComboLike[]> {
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
  combosCachePromise = getCombos().catch(() => []) as Promise<ComboLike[]>;
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

/** Shape of the videoBridgeLog param threaded to executeChatWithBreaker -> handleChatCore (#12150 P1b). */
type VideoBridgeLog = { observed: boolean; redaction: VideoBridgeLogRedactionEntry[] };

/**
 * #12150 P1b: derive the video-bridge log/Memory shadow from
 * preCallGuardrails.results. Returns undefined only when the video-bridge
 * guardrail did not run (disabled, no video parts, or the request was
 * blocked/failed before meta was set); a replaced ordinary video returns
 * `{ observed: false, redaction: [] }`. So every non-video request threads
 * `undefined` through the dispatch chain, byte-identical to before this param
 * existed.
 *
 * `finalBody` is the payload AFTER the whole pre-call chain
 * (`preCallGuardrails.payload`): #12150 P1 final-review fix re-anchors each
 * redaction entry's `fullText` from it so the log sink's content-match still
 * finds the part after the PII/credential maskers (priorities 10/95) rewrote
 * the description text in place.
 *
 * `results` is typed as a structural subset of GuardrailExecutionResult
 * (src/lib/guardrails/base.ts), the same "no type dependency on the
 * guardrail core" pattern already used by buildModalityBridgeHeader
 * (modalityBridge/bridgeStats.ts).
 */
function deriveVideoBridgeLog(
  results: Array<{ guardrail: string; meta?: Record<string, unknown> | null }>,
  finalBody: unknown
): VideoBridgeLog | undefined {
  const entry = results.find((r) => r.guardrail === "video-bridge");
  const meta = entry?.meta;
  if (!meta || typeof meta.videoBridgeObserved !== "boolean") return undefined;
  const rawRedaction = Array.isArray(meta.videoBridgeLogRedaction)
    ? (meta.videoBridgeLogRedaction as VideoBridgeLogRedactionEntry[])
    : [];
  const redaction = reanchorVideoBridgeRedaction(rawRedaction, finalBody);
  return { observed: meta.videoBridgeObserved, redaction };
}

function isManagedComboUnsupported(
  combo: ComboLike,
  settings: Record<string, unknown>,
  allCombos: ComboLike[],
  visited = new Set<string>()
): boolean {
  if (visited.has(combo.name)) return false;
  visited.add(combo.name);
  const strategy = combo.strategy ?? "priority";
  const config = resolveComboConfig(combo, settings) as Record<string, unknown>;
  const resolvedTargets = resolveComboTargets(combo, allCombos);
  const pipeline =
    strategy === "pipeline" ||
    (strategy === "auto" && (config.pipeline_enabled === true || combo.name === "auto/smart"));
  const nestedUnsafe = (combo.models as Array<{ kind?: string; comboName?: string }>).some(
    (step) => {
      if (step?.kind !== "combo-ref" || !step.comboName) return false;
      const nested = allCombos.find((candidate) => candidate.name === step.comboName);
      return Boolean(nested && isManagedComboUnsupported(nested, settings, allCombos, visited));
    }
  );
  return (
    strategy === "fusion" ||
    strategy === "context-relay" ||
    (config.chaos as { enabled?: boolean } | undefined)?.enabled === true ||
    (config.shadowRouting as { enabled?: boolean } | undefined)?.enabled === true ||
    (config.zeroLatencyOptimizationsEnabled === true && config.hedging === true) ||
    (resolvedTargets.length > 1 &&
      (pipeline || resolvedTargets.some((target) => Boolean(target.connectionId?.trim())))) ||
    nestedUnsafe
  );
}

const managedComboRejection = () =>
  buildManagedLeaseErrorResponse(
    new LeaseContextError(
      409,
      "LEASE_UNSUPPORTED_ROUTE",
      "Managed leases do not support this route"
    )
  );

const comboPromoteDeps = { updateCombo, info: log.info, warn: log.warn };

export { shouldTripProviderBreakerForResult } from "./chatPredicates";

async function handleChatImplementation(
  request: any,
  clientRawRequest: any = null,
  preParsedBody: any = null,
  correlationId: string | undefined,
  admissionContext: chatAdmission.ChatAdmissionContext
) {
  const peerRejection = rejectPeerRequest(request?.headers, log.warn, errorResponse);
  if (peerRejection) return peerRejection;

  // Pipeline: Start request telemetry
  const reqId = correlationId || generateRequestId();
  const telemetry = new RequestTelemetry(reqId);

  const backpressure = checkConnectionCapacity();
  if (backpressure.shouldReject) {
    log.warn("BACKPRESSURE", "Rejecting request: at connection limit");
    return backpressure.response;
  }

  let body;
  try {
    telemetry.startPhase("parse");
    body = await resolveChatRequestBody(request, preParsedBody);
    telemetry.endPhase();
  } catch {
    log.warn("CHAT", "Invalid JSON body");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  // Feature #6241: fold the canonical `effort` / `thinking` request params onto the
  // per-provider reasoning fields (reasoning_effort / reasoning.effort / thinking) that the
  // existing translators already consume. Done here — right after the body is first
  // resolved, before any reasoning field is read below — so it flows uniformly into every
  // downstream mapper (Anthropic / Gemini / xAI / Responses). An explicit client
  // reasoning_effort / reasoning / object-shaped thinking always wins (backward compatible).
  body = normalizeReasoningRequest(body);

  const sourceFormat = detectFormatFromUrl(body, request.url);

  // Early guard: an invalid `messages` field is rejected here with a clear
  // OmniRoute-level 400 before any routing or upstream call (#5110, #6402).
  // Without this guard, schema-invalid bodies fell through to model resolution
  // and surfaced as a misleading 404 `model_not_found` from chatHelpers.ts (#6402).
  // Cases covered:
  //   - present-but-non-array (null, number, string, object) → 400 (#6402)
  //   - empty array → 400 ("at least one message is required") (#5110)
  //   - missing entirely, when the Responses-API `input` discriminator is also
  //     absent → 400 (#6402). Responses-API requests use `input` (not `messages`),
  //     and Antigravity requests use a cloudcode `request` envelope.
  const msgBody = body as { messages?: unknown; input?: unknown };
  if ("messages" in msgBody && !Array.isArray(msgBody.messages)) {
    log.warn("CHAT", "Rejecting request with non-array messages");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "messages: Expected array");
  }
  if (Array.isArray(msgBody.messages) && msgBody.messages.length === 0) {
    log.warn("CHAT", "Rejecting request with empty messages array");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "messages: at least one message is required");
  }
  if (!("messages" in msgBody) && !("input" in msgBody) && sourceFormat !== "antigravity") {
    log.warn("CHAT", "Rejecting request with missing messages");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "messages: Expected array, received undefined");
  }

  // Reject non-string `model` before it reaches downstream code that calls
  // `.toLowerCase()` / `.split()` / `.startsWith()` on it (crash-then-500 with an
  // empty body, escaping the error sanitizer — #6407). An explicit `null`/`undefined`
  // stays permitted here because the existing `Missing model` guard below returns a
  // clean 400 for those; anything else that is not a string is a client type error.
  const rawModel = (body as { model?: unknown }).model;
  if (rawModel !== undefined && rawModel !== null && typeof rawModel !== "string") {
    log.warn("CHAT", `Rejecting non-string model (typeof=${typeof rawModel})`);
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `model: Expected string, received ${Array.isArray(rawModel) ? "array" : typeof rawModel}`
    );
  }

  // Early schema validation for scalar params BEFORE provider/model resolution (#6412).
  // Previously, a bad `temperature: "not-a-number"` on an unknown provider returned
  // 404 "model_not_found" — hiding the real schema error. Validate the param shape
  // first so the client gets a 400 with the field name. Kept narrow to widely-supported
  // OpenAI-spec params (temperature 0..2, top_p 0..1, max_tokens int >=1) so we don't
  // reject legitimate provider-specific fields.
  {
    const b = body as {
      temperature?: unknown;
      top_p?: unknown;
      max_tokens?: unknown;
      n?: unknown;
    };
    const badParam = (name: string, msg: string) =>
      errorResponse(HTTP_STATUS.BAD_REQUEST, `${name}: ${msg}`);
    if (b.temperature !== undefined) {
      if (typeof b.temperature !== "number" || Number.isNaN(b.temperature)) {
        return badParam("temperature", "must be a number");
      }
      if (b.temperature < 0 || b.temperature > 2) {
        return badParam("temperature", "must be between 0 and 2");
      }
    }
    if (b.top_p !== undefined) {
      if (typeof b.top_p !== "number" || Number.isNaN(b.top_p)) {
        return badParam("top_p", "must be a number");
      }
      if (b.top_p < 0 || b.top_p > 1) {
        return badParam("top_p", "must be between 0 and 1");
      }
    }
    if (b.max_tokens !== undefined) {
      if (typeof b.max_tokens !== "number" || !Number.isInteger(b.max_tokens) || b.max_tokens < 1) {
        return badParam("max_tokens", "must be a positive integer");
      }
    }
    if (b.n !== undefined) {
      if (typeof b.n !== "number" || !Number.isInteger(b.n) || b.n < 1) {
        return badParam("n", "must be a positive integer");
      }
    }
  }

  const deferredClientRawBody = chatAdmission.captureDeferredClientRawBody(body);

  // T01 — Accept-header streaming opt-in (#302 / #5305). A bare `Accept:
  // text/event-stream` with `stream` omitted opts a curl/httpx-style client into
  // SSE; a client that ALSO lists application/json (OpenAI / Vercel AI SDK
  // non-stream signature) does NOT — it expects a JSON object. An explicit body
  // `stream` value (true or false) always wins. See acceptHeaderForcesStream.
  const acceptHeader = request.headers.get("accept") || "";
  if (acceptHeaderForcesStream(acceptHeader, body.stream)) {
    body = { ...body, stream: true };
    log.debug(
      "STREAM",
      "Accept: text/event-stream header → overriding stream=true (body had no stream field)"
    );
  }

  // Log request endpoint and model
  const url = new URL(request.url);

  // No-thinking gateway alias (Fase 8.1): `no-think/<provider>/<model>`
  // resolves back to the real model with reasoning suppressed in place, before any
  // model resolution / combo routing sees it. Claude/Messages path forces
  // `thinking:{type:"disabled"}`; OpenAI path drops the reasoning fields.
  const noThinking = applyNoThinkingAlias(body, {
    claudeFormat: url.pathname.includes("/messages"),
  });
  if (noThinking.applied) {
    log.debug("NO_THINKING", `Resolved no-thinking alias → ${noThinking.realModel}`);
  }

  // X-Route-Model header overrides body.model for routing purposes (see
  // resolveRoutingModel). The resolved model still passes through
  // enforceApiKeyPolicy below, so it cannot bypass per-key allowlists.
  let modelStr = resolveRoutingModel(request, body);
  if (typeof modelStr === "string") {
    // Preserve literal combo names such as "Claude [1m]". Context tags are
    // stripped only when the exact request does not identify a combo.
    const exactCombo = await getCombo(modelStr);
    if (!exactCombo) {
      modelStr = stripContextWindowSuffix(modelStr) || modelStr;
      if (body?.model !== modelStr) {
        body = { ...body, model: modelStr };
      }
    }
  }

  // cc discovery alias (`claude/<provider>/<model>`, `claude/combo/<name>`):
  // resolve back to the real id before any combo lookup / resolveModelOrError()
  // sees it — see resolveCcDiscoveryAliasStrip. A genuine claude/ model id (the
  // real Claude OAuth provider namespace) is always left untouched.
  const ccAliasStrip = await resolveCcDiscoveryAliasStrip(modelStr);
  if (ccAliasStrip.stripped) {
    log.debug("CC_DISCOVERY", `Resolved cc discovery alias: ${modelStr} → ${ccAliasStrip.model}`);
    modelStr = ccAliasStrip.model;
  }

  // Freeze the client-facing model and reasoning intent before automatic routers
  // mutate the working request. Reasoning policies always match this stable input.
  const reasoningIntent = extractReasoningIntent(modelStr, body);

  // Align body.model with the routing model immediately (see applyRoutingModelAlignment).
  body = RoutingModelOps.align(body, modelStr, log);

  // Count messages (support both messages[] and input[] formats)
  const msgCount = body.messages?.length || body.input?.length || 0;
  const toolCount = body.tools?.length || 0;
  const effort = body.reasoning_effort || body.reasoning?.effort || null;
  log.request(
    "POST",
    `${url.pathname} | ${modelStr} | ${msgCount} msgs${toolCount ? ` | ${toolCount} tools` : ""}${effort ? ` | effort=${effort}` : ""}`
  );

  // Log only that an API key was provided — never the key itself, not even a
  // masked prefix/last4. These debug lines get copied verbatim into bug reports
  // and support tickets, so any key fragment is sensitive.
  const authHeader = request.headers.get("Authorization");
  const apiKey = extractApiKey(request);
  if (authHeader && apiKey) {
    log.debug("AUTH", "API key provided");
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

  // Reject image-generation models routed to /v1/chat/completions (#6457).
  // Image-only models live in IMAGE_PROVIDERS (open-sse/config/imageRegistry.ts)
  // and are served by /v1/images/generations. Forwarding them to a chat upstream
  // yielded confusing raw provider 400s (e.g. HuggingFace: "not a chat model").
  // Models such as Codex GPT-5.5 support both chat and image generation, so an
  // image-registry match is only image-only when the same provider/model pair is
  // absent from the chat catalog.
  const imageModel = getImageModelEntry(modelStr);
  // Exact stored combo names take precedence over colliding bare image aliases.
  // Keep this narrower than getComboForModel() so mappings and synthetic aliases
  // retain their existing resolution order.
  const isExactStoredCombo = imageModel ? Boolean(await getComboByName(modelStr)) : false;
  const isChatCatalogModel = imageModel
    ? getModelsByProviderId(imageModel.provider).some((model) => model.id === imageModel.model)
    : false;
  if (imageModel && !isExactStoredCombo && !isChatCatalogModel) {
    log.warn("CHAT", `Rejecting image-generation model on chat endpoint: ${modelStr}`);
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Model '${modelStr}' is an image-generation model and cannot be used on /v1/chat/completions. Use POST /v1/images/generations instead.`
    );
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
  let managedLease: ManagedLeaseDispatchContext | null = null;
  if (isExclusiveLeaseManagedKey(apiKeyInfo)) {
    try {
      validateExclusiveLeaseKeyConfiguration(apiKeyInfo);
      managedLease = {
        apiKeyId: apiKeyInfo!.id,
        context: parseManagedLeaseRequestContext(request.headers),
      };
    } catch (error) {
      if (error instanceof LeaseContextError) return buildManagedLeaseErrorResponse(error);
      throw error;
    }
  }
  const bypassProviderQuotaPolicy = hasProviderQuotaBypassScope(apiKeyInfo?.scopes);
  telemetry.endPhase();

  // OmniRoute-native `previous_response_id` continuation: reconstruct the
  // full input server-side before ANY downstream validation/translation
  // sees this request, so everything after this point (message-shape
  // guards, token-budget checks, provider translation) treats it exactly
  // like an ordinary full-history request. This works regardless of
  // whether the eventually-selected upstream provider itself understands
  // Responses-API state -- OmniRoute always forwards the full reconstructed
  // history upstream, exactly as it does today for a non-continued request.
  // Client<->OmniRoute traffic shrinks to the new delta; OmniRoute<->
  // provider traffic is unchanged. See src/lib/db/responsesContinuationStore.ts.
  //
  // Skipped entirely when the operator has set responsesPreviousResponseIdMode
  // to "preserve": that mode is the explicit, connection-independent contract
  // for "never touch previous_response_id, let the upstream resolve it
  // natively" (see applyResponsesPreviousResponseIdPolicy in chatCore.ts,
  // which enforces it per-target once a connection is selected). Codex's own
  // executor relies on an untouched previous_response_id to delegate history
  // resolution upstream (stripOrphanedCodexFunctionCallOutputs in codex.ts);
  // reconstructing and deleting the field here would make that downstream
  // "preserve" enforcement a no-op since the field would already be gone.
  const settingsForContinuation = await getCachedSettings().catch(
    () => ({}) as Record<string, unknown>
  );
  const previousResponseIdMode = normalizeResponsesPreviousResponseIdMode(
    (settingsForContinuation as { responsesPreviousResponseIdMode?: unknown })
      .responsesPreviousResponseIdMode
  );
  if (
    previousResponseIdMode !== "preserve" &&
    !isChatGptWebCodexModel(modelStr) &&
    sourceFormat === FORMATS.OPENAI_RESPONSES &&
    typeof (body as { previous_response_id?: unknown }).previous_response_id === "string"
  ) {
    const previousResponseId = (body as { previous_response_id: string }).previous_response_id;
    const detailedLoggingEnabled = await isDetailedLoggingEnabled();
    const stored = detailedLoggingEnabled
      ? resolvePreviousResponseState(previousResponseId, apiKeyInfo?.id ?? null)
      : null;
    if (!stored) {
      // Matches OpenAI's own `previous_response_not_found` contract (missing
      // or expired server-side state) so a client with the matching retry
      // behavior -- resend the full request, same turn -- recovers exactly
      // as it would against the real OpenAI backend.
      return new Response(
        JSON.stringify({
          error: {
            message: "Previous response not found.",
            type: "invalid_request_error",
            code: "previous_response_not_found",
          },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const deltaInput = Array.isArray((body as { input?: unknown }).input)
      ? (body as { input: unknown[] }).input
      : [];
    body = { ...body, input: [...stored.input, ...stored.output, ...deltaInput] };
    delete (body as { previous_response_id?: unknown }).previous_response_id;
  }

  const admissionRejection = await admissionContext.acquire(apiKeyInfo?.id, request, body);
  if (admissionRejection) return admissionRejection;
  clientRawRequest = chatAdmission.resolveClientRawAfterAdmission(clientRawRequest, () =>
    deferredClientRawBody.withClientBody((clientBody) => buildClientRawRequest(request, clientBody))
  );
  // Sibling of clientRawRequest.body, not a replacement: .body stays the raw
  // pre-reconstruction client bytes (see captureDeferredClientRawBody), while
  // this is the `input` actually dispatched with -- after the
  // previous_response_id reconstruction above ran, when it applies. A future
  // continuation lookup against THIS response must resolve from this field,
  // not the raw one. See the logClientRawRequest doc comment in requestLogger.ts.
  if (clientRawRequest && Array.isArray((body as { input?: unknown }).input)) {
    (clientRawRequest as { effectiveInput?: unknown }).effectiveInput = (
      body as { input: unknown[] }
    ).input;
  }

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
    signal: request.signal,
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
  // Snapshot model BEFORE the guardrail payload (see reconcileGuardrailReroute).
  const modelBeforeGuardrails =
    typeof body?.model === "string" && body.model.length > 0 ? body.model : modelStr;
  body = preCallGuardrails.payload;
  ({ body, modelStr } = await RoutingModelOps.reconcileGuardrailReroute({
    body,
    modelBeforeGuardrails,
    modelStr,
    apiKey,
    apiKeyId: apiKeyInfo?.id,
    isModelAllowedForKey,
    log,
  }));
  // Modality Bridge transparency (Task 9): non-null only when a pre-call bridge
  // guardrail transformed the payload (describe path) — stamped on the main
  // success exits below via withModalityBridgeHeader().
  const modalityBridgeHeader = buildModalityBridgeHeader(preCallGuardrails.results);
  // #12150 P1b: video-bridge log/Memory shadow — undefined on every
  // non-video request. Threaded through handleSingleModelChat's
  // runtimeOptions -> executeChatWithBreaker -> handleChatCore.
  const videoBridgeLog = deriveVideoBridgeLog(preCallGuardrails.results, body);
  telemetry.endPhase();

  // Agentic conversation tracking (X-ConversationId): resolved once per
  // incoming HTTP request, before combo dispatch / credential retries, so
  // every attempt for this request shares the same id and the
  // agentic_conversations row is only touched once.
  const clientConversationHeader = request.headers.get("x-omniroute-session-id")?.trim() || null;
  let conversationId: string | null = null;
  try {
    ({ conversationId } = await resolveConversationId({
      body: body as Record<string, unknown>,
      model: modelStr,
      apiKeyId: apiKeyInfo?.id ?? null,
      clientSessionIdHeader: clientConversationHeader,
      correlationId: reqId,
    }));
  } catch (error) {
    // Best-effort tracking: a DB hiccup here must not turn an otherwise-working
    // chat request into a hard failure. Downstream conversationId consumers
    // already treat null/undefined as "untracked" (see withConversationId).
    log.warn("CHAT", "resolveConversationId failed, continuing without conversation tracking", {
      correlationId: reqId,
      error: error instanceof Error ? error.message : String(error),
    });
  }

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
    apiKeyInfo: apiKeyInfo ? { ...apiKeyInfo } : undefined,
    log,
  });

  const { context: hookCtx, response: hookResponse } = await runHooks(hookContext);

  // Apply hook mutations
  body = hookCtx.body as any;
  ({ body, modelStr } = RoutingModelOps.reconcileModelOverride({
    body,
    modelStr,
    overrideModel: hookCtx.model,
    logTag: "Hook model override",
    log,
  }));

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

  // #4481 layer 2 — Web-Search Routing (CCR-style Router.webSearch): a native web_search
  // server tool + a configured `webSearchRouteModel` routes the whole request to that
  // model (some providers don't implement Anthropic's web_search_20250305 server tool).
  // Settings are read only when a web-search tool is present; the override lands before
  // auto/combo resolution and the layer-1 fallback so the target's own handling applies.
  if (hasNativeWebSearchTool(body)) {
    const wsSettings = await getCachedSettings().catch(() => ({}) as Record<string, unknown>);
    const wsRoute = resolveWebSearchRouteOverride(resolvedModelStr, body, wsSettings);
    if (wsRoute.wasRouted) {
      log.info(
        "WEBSEARCH-ROUTE",
        `web_search tool → model override: ${resolvedModelStr} → ${wsRoute.model}`
      );
      resolvedModelStr = wsRoute.model;
      body = { ...body, model: wsRoute.model };
    }
  }

  // Explicit reasoning-routing policies are the final model-routing layer before
  // combo/provider resolution. Existing behavior is untouched when no rule matches.
  let reasoningDecision: ReasoningRuleDecision | null = null;
  let requestRoutingTags: { tags: string[] } = { tags: [] };
  const reasoningRouting = await applyReasoningRouting({
    request,
    body,
    modelStr: resolvedModelStr,
    policy,
    apiKeyInfo,
    reasoningIntent,
  });
  if (reasoningRouting.response) return reasoningRouting.response;
  body = reasoningRouting.body;
  resolvedModelStr = reasoningRouting.modelStr;
  reasoningDecision = reasoningRouting.reasoningDecision;
  requestRoutingTags = reasoningRouting.requestRoutingTags;

  const autoRouting = await resolveAutoRoutingState(resolvedModelStr);
  if (autoRouting.response) return autoRouting.response;

  // Check if model is a combo (has multiple models with fallback)
  telemetry.startPhase("resolve");
  let combo: any = await getComboForModel(resolvedModelStr);
  if (reasoningDecision?.targetCombo) combo = reasoningDecision.targetCombo;

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

  const virtualCombo = await createVirtualAutoCombo(autoRouting, combo, apiKeyInfo?.id);
  if (virtualCombo instanceof Response) return virtualCombo;
  combo = virtualCombo;
  if (combo) {
    if (reasoningDecision) {
      const filtered = filterReasoningCombo(combo, reasoningDecision);
      if (filtered instanceof Response) return filtered;
      combo = filtered;
    }
    const [settings, allCombos] = await Promise.all([
      getCachedSettings().catch(() => ({})),
      getCombosCachedForChat(),
    ]);
    if (managedLease && isManagedComboUnsupported(combo, settings, allCombos))
      return managedComboRejection();
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

      // #9057: for keys with model restrictions (allowedModels or disableNonPublicModels),
      // run isModelAllowedForKey even for auto/* models. The API-key policy gate
      // (validateModelAccess in apiKeyPolicy.ts) treats auto/* as a virtual combo and
      // skips isModelAllowedForKey, so the per-candidate check here is the only
      // enforcement point during combo routing. Without it, a key with
      // disableNonPublicModels=true can reach free/prohibited models through auto/*.
      const hasModelRestrictions =
        apiKeyInfo &&
        (Boolean(apiKeyInfo.allowedModels?.length) || apiKeyInfo.disableNonPublicModels === true);
      if (hasModelRestrictions && apiKey) {
        const modelAllowed = await isModelAllowedForKey(apiKey, modelString);
        if (!modelAllowed) return false;
      }

      // Use getModelInfo to resolve custom prefixes, but prefer the combo
      // target's providerId when available — the model string's provider
      // prefix may differ from the credential provider ID (e.g. model
      // "xiaomi/mimo-v2-flash" resolves to provider "xiaomi" but the combo
      // target specifies providerId: "opengate" for credential lookup).
      let modelInfo;
      try {
        modelInfo = await getModelInfo(modelString);
      } catch (error) {
        // Persisted explicit combos may still reference the retired provider. Treat
        // that target as unavailable so priority/fallback strategies can continue.
        if (isMicrosoftDesignerWebProviderRetiredError(error)) return false;
        if (isRuntimeProviderRetirementError(error)) return false;
        if (isCommonChatGptWebRetirementError(error)) return false;
        throw error;
      }
      const provider = comboCheckProvider(modelString, modelInfo, target?.providerId);
      const resolvedModel = modelInfo.model || modelString;
      const githubGate = await ghComboGate(comboPreselectedCredentials, provider, resolvedModel);
      if (githubGate !== null) return githubGate;
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
          ...(bypassProviderQuotaPolicy ? { bypassQuotaPolicy: true } : {}),
          ...(managedLease ? { lease: credentialLease(managedLease) } : {}),
        }
      );
      if (
        !creds ||
        ("allRateLimited" in creds && creds.allRateLimited) ||
        ("waitingForCapacity" in creds && creds.waitingForCapacity)
      )
        return false;

      // OAuth selection must happen atomically with occupancy reservation in the
      // actual dispatch. Availability preflight may finish well before a combo
      // target runs, so caching OAuth credentials here would reintroduce a race.
      if ("authType" in creds && creds.authType !== "oauth") {
        comboPreselectedCredentials.set(getComboCredentialCacheKey(modelString, target), creds);
      }
      return true;
    };

    const relayConfig =
      combo.strategy === "context-relay" ? resolveComboConfig(combo, settings) : null;
    const reasoningTransportFallback =
      combo.config?.reasoningTransportFallback === "skip" ? "skip" : "drop";
    // Per-request Auto-Combo controls (#6023 / #6024 / #6025 / #3470): steer an
    // `auto` combo on this single request without mutating its stored config.
    const perRequestAutoControls = resolveRequestAutoControls(request.headers);
    const relayOptions = {
      sessionId,
      ...(combo.strategy === "context-relay" ? { config: relayConfig } : {}),
      ...(bypassProviderQuotaPolicy ? { bypassProviderQuotaPolicy: true } : {}),
      ...perRequestAutoControls,
    };
    telemetry.endPhase();

    // Context-relay keeps generation in combo.ts, but handoff injection lives here
    // because only this layer knows which connectionId was actually selected.
    const { defer: deferContextOverflowWhenCompressible, exclusions: compressionExclusions } =
      await resolveComboContextOverflowDeferral(log, apiKeyInfo);
    const response = await (handleComboChat as any)({
      body,
      combo,
      deferContextOverflowWhenCompressible,
      compressionExclusions,
      // #10503: same request-shape facts chatCore.ts resolves for itself
      // (resolveChatCoreRequestFormat), so getKnownContextOverflow's target-aware
      // deferral check can never drift from chatCore's own native-codex-passthrough
      // decision. See knownContextOverflow.ts::KnownContextOverflowOptions.
      sourceFormat,
      endpointPath: new URL(request.url).pathname,
      requestHeaders: request.headers,
      clientManagedResponsesContext:
        sourceFormat === "openai-responses" &&
        new URL(request.url).pathname.split("/").includes("responses") &&
        isVerifiedNativeCodexRequest(body, request.headers),
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
          modelAbortSignal?: AbortSignal | null;
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
            preselectedCredentials: (() => {
              const key = getComboCredentialCacheKey(m, target);
              const credentials = comboPreselectedCredentials.get(key);
              comboPreselectedCredentials.delete(key);
              return credentials;
            })(),
            cachedSettings: settings,
            providerId: target?.providerId ?? (target as any)?.provider ?? null,
            correlationId: reqId,
            conversationId,
            modelPinned: (target as any)?.modelPinned ?? false,
            reasoningTransportFallback,
            reasoningDecision,
            reasoningIntent,
            reasoningRequestTags: requestRoutingTags.tags,
            managedLease,
            videoBridgeLog,
            // #7360 follow-up: without this, a target dispatch abandoned by
            // targetTimeoutRunner.ts's per-target timeout (comboTargetTimeoutMs)
            // never learns it was abandoned — it only watches the ORIGINAL
            // client's request.signal (see clientRawRequest below), which stays
            // open for as long as the overall combo keeps retrying elsewhere.
            // The abandoned dispatch then hangs forever inside withRateLimit/
            // acquireAccountSemaphore, leaking a permanent "pending" dashboard
            // entry (trackPendingRequest(false) never runs) — live incident,
            // log id 1784418258231-14961a.
            modelAbortSignal: target?.modelAbortSignal ?? null,
          },
          target?.effectiveComboStrategy ?? combo.strategy,
          true
        ).then(async (res: Response) => {
          // Auto-promote the winning combo model to position #1 (opt-in flag).
          if (res?.ok)
            await promoteSuccessfulComboModel(
              combo,
              m,
              settings as Record<string, unknown>,
              comboPromoteDeps
            );
          return res;
        }),
      isModelAvailable: checkModelAvailable,
      log,
      settings,
      allCombos,
      apiKeyAllowedConnections: apiKeyInfo?.allowedConnections ?? null,
      relayOptions,
      signal: request?.signal ?? null,
      correlationId: reqId,
      // #9654 Wave 2: per-target lane-aware admission probe for combo fan-out.
      perTargetAdmission: admissionContext.createPerTargetAdmissionHook(apiKeyInfo?.id, request),
    });

    for (const credentials of comboPreselectedCredentials.values()) {
      credentials.releaseOAuthSession?.();
    }
    comboPreselectedCredentials.clear();

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
            conversationId,
            managedLease,
            videoBridgeLog,
          },
          combo.strategy,
          true
        );
        if (fallbackResponse.ok) {
          log.info("GLOBAL_FALLBACK", `Global fallback ${fallbackModel} succeeded`);
          recordTelemetry(telemetry);
          return withModalityBridgeHeader(
            withConversationId(withSessionHeader(fallbackResponse, sessionId), conversationId),
            modalityBridgeHeader
          );
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
    // Log combo failures that bypassed handleChatCore (e.g. all targets skipped by circuit breaker).
    // Records BOTH a call_logs row (dashboard/logs) AND a usage_history row attributed to the api key
    // (success:false) so gate/breaker-rejected traffic is counted per key — support-mesh 2026-07-08.
    if (!response.ok) {
      try {
        const { recordRejectedRequestUsage, resolveRejectedComboProvider } =
          await import("./rejectedRequestUsage");
        await recordRejectedRequestUsage({
          status: response.status,
          model: body?.model || resolvedModelStr,
          requestedModel: body?.model || resolvedModelStr,
          provider: resolveRejectedComboProvider(body?.model || resolvedModelStr, combo.name),
          endpoint: clientRawRequest?.endpoint,
          error: await getComboFailureLogError(response, combo.name),
          comboName: combo.name,
          apiKeyId: apiKeyInfo?.id ?? null,
          apiKeyName: apiKeyInfo?.name ?? null,
          correlationId: reqId,
          sessionTag: conversationId,
          startTime: telemetry?.startTime,
          requestBody: clientRawRequest?.body ?? null,
        });
      } catch {}
    }
    return withModalityBridgeHeader(
      withConversationId(
        withCorrelationId(withSessionHeader(response, sessionId), reqId),
        conversationId
      ),
      modalityBridgeHeader
    );
  }
  telemetry.endPhase();

  // Single model request
  // Try to resolve routing combo from model prefix for compression combo lookup
  let routingComboId: string | null = null;
  if (!combo) {
    const providerPrefix = resolvedModelStr.split("/")[0];
    if (providerPrefix) {
      try {
        const { getComboByName } = await import("@/lib/db/combos");
        const routingCombo = await getComboByName(providerPrefix);
        if (typeof routingCombo?.id === "string") {
          routingComboId = routingCombo.id;
        }
      } catch {}
    }
  }
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
      correlationId: reqId,
      conversationId,
      routingComboId,
      reasoningDecision,
      reasoningIntent,
      reasoningRequestTags: requestRoutingTags.tags,
      managedLease,
      videoBridgeLog,
    },
    null,
    false
  );
  recordTelemetry(telemetry);
  return withModalityBridgeHeader(
    withConversationId(
      withCorrelationId(withSessionHeader(response, sessionId), reqId),
      conversationId
    ),
    modalityBridgeHeader
  );
}

export const handleChat = chatAdmission.withChatAdmission(handleChatImplementation);

/** Handle one resolved model through gates, credentials, and retry/fallback. */
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
    correlationId?: string | null;
    conversationId?: string | null;
    routingComboId?: string | null;
    modelPinned?: boolean;
    reasoningDecision?: ReasoningRuleDecision | null;
    reasoningIntent?: ExtractedReasoningIntent | null;
    reasoningRequestTags?: string[];
    reasoningTransportFallback?: "skip" | "drop";
    managedLease?: ManagedLeaseDispatchContext | null;
    /** #12150 P1b: video-bridge log/Memory shadow — undefined on every non-video request. */
    videoBridgeLog?: VideoBridgeLog;
    /**
     * Per-target abort signal from combo.ts's targetTimeoutRunner
     * (comboTargetTimeoutMs) — see the #7360 follow-up comment at the
     * handleSingleModel call site above for why this must be merged into
     * the signal used for the actual dispatch, not left unused.
     */
    modelAbortSignal?: AbortSignal | null;
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
    if (runtimeOptions.managedLease) return managedComboRejection();
    log.info(
      "ROUTING",
      `Safety-net combo redirect for "${modelStr}" → combo="${redirectCombo.name}"`
    );
    log.info("ROUTING", `Auto-combo redirect from handleSingleModelChat for "${modelStr}"`);
    log.info("ROUTING", `Auto-combo redirect to combo flow for "${modelStr}"`);
    const { defer: sNetDefer, exclusions: sNetExclusions } =
      await resolveComboContextOverflowDeferral(log, apiKeyInfo);
    // #10503: same request-shape facts chatCore.ts resolves for itself — threaded
    // down so getKnownContextOverflow's target-aware deferral check can never drift
    // from chatCore's own native-codex-passthrough decision.
    const sNetSourceFormat = detectFormatFromEndpoint(body, clientRawRequest?.endpoint || "");
    return handleComboChat({
      body,
      combo: redirectCombo,
      deferContextOverflowWhenCompressible: sNetDefer,
      compressionExclusions: sNetExclusions,
      sourceFormat: sNetSourceFormat,
      endpointPath: clientRawRequest?.endpoint || "",
      requestHeaders: clientRawRequest?.headers,
      clientManagedResponsesContext:
        sNetSourceFormat === "openai-responses" &&
        String(clientRawRequest?.endpoint || "")
          .split("/")
          .includes("responses") &&
        isVerifiedNativeCodexRequest(body, clientRawRequest?.headers),
      handleSingleModel: (b: Record<string, unknown>, m: string, target?: SingleModelTarget) => {
        const resolvedTarget = target && "kind" in target ? target : null;
        return handleSingleModelChat(
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
            skipUpstreamRetry: resolvedTarget?.failoverBeforeRetry === true,
            allowRateLimitedConnection: resolvedTarget?.allowRateLimitedConnection === true,
            providerId: resolvedTarget?.providerId ?? (resolvedTarget as any)?.provider ?? null,
            correlationId: runtimeOptions?.correlationId ?? null,
            reasoningTransportFallback:
              redirectCombo.config?.reasoningTransportFallback === "skip" ? "skip" : "drop",
            conversationId: runtimeOptions?.conversationId ?? null,
            managedLease: runtimeOptions.managedLease ?? null,
            videoBridgeLog: runtimeOptions.videoBridgeLog,
            // #7360 follow-up — see the primary handleSingleModel closure above.
            modelAbortSignal: target?.modelAbortSignal ?? null,
          },
          resolvedTarget?.effectiveComboStrategy ?? redirectCombo.strategy ?? "priority",
          false
        );
      },
      isModelAvailable: async () => true,
      log,
      settings: {},
      allCombos: [],
      relayOptions: undefined,
      signal: request?.signal ?? null,
      // #9654 Wave 2: safety-net redirect — same per-target probe as the primary path.
      perTargetAdmission: chatAdmission.createPerTargetAdmissionHookForRequest(
        apiKeyInfo?.id,
        request
      ),
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
  const bypassProviderQuotaPolicy = hasProviderQuotaBypassScope(apiKeyInfo?.scopes);
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

  // 2. Local pressure precedes availability/breaker gates and account selection.
  const pressureGuard = checkResourcePressureBeforeProviderWork();
  if (pressureGuard) return pressureGuard.response;
  const providerProfile = await getRuntimeProviderProfile(provider);
  const gate = await checkPipelineGates(provider, model, {
    ignoreCircuitBreaker: forceLiveComboTest || hasForcedConnection,
    ignoreModelCooldown: forceLiveComboTest || hasForcedConnection,
    providerProfile,
    ...(bypassReason ? { bypassReason } : {}),
  });
  if (gate) {
    // Log the rejected request so it appears in /dashboard/logs AND is counted in the
    // per-api-key usage analytics (usage_history, success:false) — otherwise a key whose
    // traffic is entirely gate/breaker-rejected shows "zero requests" (support-mesh 2026-07-08).
    try {
      const { recordRejectedRequestUsage } = await import("./rejectedRequestUsage");
      await recordRejectedRequestUsage({
        status: gate.status,
        model,
        requestedModel: body?.model || modelStr,
        provider,
        endpoint: clientRawRequest?.endpoint,
        error: `[${gate.status}] Pipeline gate rejected`,
        comboName: isCombo ? comboName : null,
        comboStepId: isCombo ? (runtimeOptions?.comboStepId ?? null) : null,
        comboExecutionKey: isCombo ? (runtimeOptions?.comboExecutionKey ?? null) : null,
        apiKeyId: apiKeyInfo?.id ?? null,
        apiKeyName: apiKeyInfo?.name ?? null,
        correlationId: runtimeOptions?.correlationId ?? null,
        sessionTag: runtimeOptions?.conversationId ?? null,
        startTime: telemetry?.startTime,
      });
    } catch {}
    return gate;
  }

  // Issue #2100 follow-up: opt-in upstream 429 hint trust per provider.
  const useHints429 = resolveUseUpstream429BreakerHints(
    provider,
    (providerProfile as { useUpstream429BreakerHints?: boolean }).useUpstream429BreakerHints
  );
  const breaker = getCircuitBreaker(provider, {
    failureThreshold: providerProfile.failureThreshold,
    resetTimeout: providerProfile.resetTimeoutMs,
    // #4602: a local WS-bridge "Controller is already closed" throw is not an
    // upstream outage — keep it from tripping the whole-provider breaker.
    isFailure: (e) => !isLocalStreamLifecycleError(e),
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
  const retrySettings = disableCooldownAwareRetry(
    baseRetrySettings,
    provider === "claude-web" ||
      isCombo ||
      forceLiveComboTest ||
      runtimeOptions.emergencyFallbackTried === true
  );
  const requestSignal = request?.signal ?? null;
  // Cumulative cap across all waits for this request (#7360 follow-up) — mirrors
  // combo.ts's comboCooldownBudgetLeftMs. Declared outside requestAttemptLoop so
  // it persists (and only decreases) across `continue requestAttemptLoop` retries.
  let requestRetryBudgetLeftMs = retrySettings.budgetMs;

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
  const sameAccountTransportRetries = new Map<string, number>();
  const occupancySessionKey =
    runtimeOptions.sessionAffinityKey ?? runtimeOptions.sessionId ?? `request:${randomUUID()}`;
  let initialPreselectedCredentials = runtimeOptions.preselectedCredentials;

  requestAttemptLoop: while (true) {
    const excludedConnectionIds = new Set<string>();
    let lastError = requestRetryLastError;
    let lastStatus = requestRetryLastStatus;
    let lastCooldownMs = requestRetryLastCooldownMs;
    let preselectedCredentials = initialPreselectedCredentials;
    initialPreselectedCredentials = null;

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
                sessionKey: occupancySessionKey,
                reserveOAuthSession: true,
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
                ...(!forceLiveComboTest && bypassProviderQuotaPolicy
                  ? { bypassQuotaPolicy: true }
                  : {}),
                ...(runtimeOptions.managedLease
                  ? { lease: credentialLease(runtimeOptions.managedLease) }
                  : {}),
                ...(() => {
                  const effectiveForcedId = resolveForcedConnectionForCredentialPool({
                    forcedConnectionId: runtimeOptions.forcedConnectionId ?? null,
                    excludedConnectionIds,
                    connections: [],
                    allowRateLimitedConnections:
                      runtimeOptions.allowRateLimitedConnection === true || forceLiveComboTest,
                    bypassQuotaPolicy: forceLiveComboTest || bypassProviderQuotaPolicy,
                    isQuotaExhausted: () => false,
                    isQuotaPolicyBlocked: () => false,
                  });
                  return effectiveForcedId ? { forcedConnectionId: effectiveForcedId } : {};
                })(),
              }
            );
      preselectedCredentials = null;

      if (runtimeOptions.managedLease && credentials) {
        const leaseError = buildManagedLeaseSelectionErrorResponse(credentials);
        if (leaseError) return leaseError;
      }

      // #9467: also treat the auth layer's allExpired verdict as a no-credentials
      // outcome (auth.ts produces it; without this check an all-expired pool fell
      // through to a connectionless dispatch).
      if (
        !credentials ||
        "allRateLimited" in credentials ||
        "allExpired" in credentials ||
        !credentials.connectionId
      ) {
        if (credentials?.allRateLimited) {
          const retryDecision = getCooldownAwareRetryDecision({
            retryAfter: credentials.retryAfter,
            settings: retrySettings,
            attempt: requestRetryAttempt,
            budgetLeftMs: requestRetryBudgetLeftMs,
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
            requestRetryBudgetLeftMs = Math.max(0, requestRetryBudgetLeftMs - retryDecision.waitMs);
            log.info(
              "COOLDOWN_RETRY",
              `${provider}/${model} cooldown elapsed — restarting request attempt ${requestRetryAttempt + 1}/${retrySettings.maxRetries}`
            );
            continue requestAttemptLoop;
          }
        }

        const breakerFailureStatus = Number(lastStatus ?? credentials?.lastErrorCode);
        // lastError is a string here — check for the proxy_unreachable tag embedded by
        // tagProxyUnreachable (proxyFetch.ts) and OmniRoute's own queue timeouts. Both mean
        // we never reached the provider, so they must not trip the provider breaker.
        const isNetworkError =
          typeof lastError === "string" &&
          (lastError.includes("proxy_unreachable") || lastError.includes("PROXY_UNREACHABLE"));
        const isQueueTimeout =
          typeof lastError === "string" &&
          (lastError.includes("RATE_LIMIT_QUEUE_TIMEOUT") ||
            lastError.includes("RATE_LIMIT_QUEUE_WEDGED"));
        if (
          !forceLiveComboTest &&
          credentials?.allRateLimited &&
          isProviderBreakerFailureStatus(breakerFailureStatus) &&
          !isNetworkError &&
          !isQueueTimeout &&
          // Probe-origin dispatches must not degrade the provider breaker —
          // routing state untouched (#9817).
          !(await shouldIsolateProbeFailures())
        ) {
          breaker._onFailure();
        }

        const candidateAliases =
          "candidateAliases" in resolved && Array.isArray(resolved.candidateAliases)
            ? resolved.candidateAliases.filter(
                (candidate): candidate is string => typeof candidate === "string"
              )
            : undefined;
        // #11943: only when no connection was ever tried — a built-in provider
        // whose id/alias is also a configured compatible-node prefix means the
        // operator's node was shadowed by the reserved-prefix guard, not broken.
        const shadowedNode =
          excludedConnectionIds.size === 0 ? await findShadowedCompatibleNode(provider) : null;
        const noCredsRes = handleNoCredentials(
          credentials,
          excludedConnectionIds.size > 0 ? Array.from(excludedConnectionIds)[0] : null,
          provider,
          model,
          lastError,
          lastStatus,
          candidateAliases,
          isCombo,
          shadowedNode
        );
        const lastFailedConnectionId =
          excludedConnectionIds.size > 0
            ? Array.from(excludedConnectionIds)[excludedConnectionIds.size - 1]
            : null;
        return withSelectedConnectionHeader(noCredsRes, lastFailedConnectionId);
      }

      const accountId = credentials.connectionId.slice(0, 8);
      const releaseOAuthSession = credentials.releaseOAuthSession ?? (() => {});
      // #10348: redact the account prefix by default. Gated on the narrow
      // AUTH_LOG_INCLUDE_ACCOUNT_ID flag (default off) rather than the broad
      // `debugMode` setting — `debugMode` is a general dashboard-visibility
      // toggle unrelated to log privacy (its own default has changed
      // independently for unrelated reasons, see #10312/#10372), so deriving
      // redaction from it would make log leakage depend on an unrelated
      // setting. resolveFeatureFlag() reads straight from SQLite on every
      // call (no stale cache to invalidate) and fails safe (redacted) if the
      // lookup throws.
      let includeAccountId = false;
      try {
        includeAccountId = isFeatureFlagEnabled("AUTH_LOG_INCLUDE_ACCOUNT_ID");
      } catch {
        includeAccountId = false;
      }
      log.info("AUTH", `Using ${provider} account: ${includeAccountId ? accountId : "***"}...`);
      // #474: when the request used a bare model name (no "/" — e.g. an alias
      // that resolved to "auto") and the selected connection declares a
      // defaultModel, resolve the bare name to that real model ID before the
      // upstream call so the provider receives a concrete model rather than the
      // placeholder. A "/"-qualified model name is always left untouched.
      let effectiveModel =
        resolveBareModelToConnectionDefault(modelStr, model, credentials.defaultModel) ?? model;
      let requestBody =
        effectiveModel !== model ? { ...body, model: `${provider}/${effectiveModel}` } : body;

      // If the combo explicitly overrode the provider to a passthrough provider, we
      // must preserve the original unstripped modelStr so that proxy providers
      // (e.g., cline, kilocode) get the exact string they expect.
      if (provider !== resolvedProvider && getPassthroughProviders().has(provider)) {
        effectiveModel = modelStr;
        requestBody = { ...body, model: modelStr };
      }
      if (!runtimeOptions.reasoningDecision && runtimeOptions.reasoningIntent) {
        const connectionRouting = await applyConnectionReasoningRule({
          requestBody,
          provider,
          effectiveModel,
          credentials,
          apiKeyInfo,
          reasoningIntent: runtimeOptions.reasoningIntent,
          reasoningDecision: runtimeOptions.reasoningDecision,
          requestRoutingTags: runtimeOptions.reasoningRequestTags,
        });
        if (connectionRouting.response) {
          releaseOAuthSession();
          return connectionRouting.response;
        }
        requestBody = connectionRouting.body;
      }
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
          requestBody = injectHandoffIntoBody(requestBody, handoff);
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
      let refreshedCredentials;
      try {
        refreshedCredentials = await checkAndRefreshToken(provider, credentials);
      } catch (error) {
        releaseOAuthSession();
        throw error;
      }
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
      let proxyInfo;
      try {
        proxyInfo = await safeResolveProxy(credentials.connectionId, apiKeyInfo?.id, provider);
      } catch (error) {
        releaseOAuthSession();
        throw error;
      }
      // #5217: sink for the proxy the executor pins internally (e.g. OpencodeExecutor
      // rotation) so the egress log below reflects the real egress, not "direct".
      const appliedProxySink: { proxy: unknown } = { proxy: null };
      const proxyStartTime = Date.now();
      // 4. Execute chat via core after breaker gate checks (with optional TLS tracking)
      if (telemetry) telemetry.startPhase("connect");
      let execution: Awaited<ReturnType<typeof dispatchChatWithAffinityEviction>>;
      try {
        execution = await dispatchChatWithAffinityEviction(
          {
            bypassCircuitBreaker: forceLiveComboTest || hasForcedConnection,
            breaker,
            body: requestBody,
            provider,
            model: effectiveModel,
            refreshedCredentials,
            proxyInfo,
            appliedProxySink,
            log,
            clientRawRequest,
            credentials,
            apiKeyInfo,
            userAgent,
            comboName,
            comboStrategy,
            isCombo,
            comboStepId: runtimeOptions.comboStepId ?? null,
            comboExecutionKey:
              runtimeOptions.comboExecutionKey ?? runtimeOptions.comboStepId ?? null,
            extendedContext,
            modelApiFormat: apiFormat,
            modelTargetFormat: targetFormat,
            providerProfile,
            cachedSettings: runtimeOptions.cachedSettings,
            skipUpstreamRetry: runtimeOptions.skipUpstreamRetry ?? false,
            correlationId: runtimeOptions?.correlationId ?? null,
            conversationId: runtimeOptions?.conversationId ?? null,
            modelPinned: runtimeOptions?.modelPinned ?? false,
            routingComboId: runtimeOptions?.routingComboId ?? null,
            sessionAffinityKey: runtimeOptions.sessionAffinityKey ?? null,
            reasoningTransportFallback: runtimeOptions.reasoningTransportFallback ?? "drop",
            managedLease: runtimeOptions.managedLease ?? null,
            videoBridgeLog: runtimeOptions.videoBridgeLog,
          },
          runtimeOptions
        );
      } catch (error) {
        releaseOAuthSession();
        throw error;
      }
      if (telemetry) telemetry.endPhase();
      if ("localResourcePressureResult" in execution) {
        return execution.localResourcePressureResult.response;
      }
      const { result, tlsFingerprintUsed } = execution;
      if (!result.success) releaseOAuthSession();

      const proxyLatency = Date.now() - proxyStartTime;
      const providerAlias = PROVIDER_ID_TO_ALIAS[provider] || provider;
      const effectiveTargetFormat =
        getModelTargetFormat(providerAlias, model) ||
        getTargetFormat(provider, credentials.providerSpecificData) ||
        targetFormat;

      // 5. Log proxy + translation events (fire-and-forget; never blocks the response)
      // #5217: reflect the proxy the executor actually applied (per-account rotation).
      void safeLogEvents({
        result,
        proxyInfo: applyExecutorProxyToInfo(proxyInfo, appliedProxySink.proxy),
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
        // #12254: exactly-once breaker accounting — combo successes are recorded by
        // combo.ts (recordProviderSuccess); live combo tests never touch the breaker.
        if (classifyProviderBreakerResult(result, isCombo, forceLiveComboTest) === "success") {
          breaker._onSuccess();
        }
        if (injectedHandoff && runtimeOptions.sessionId && comboName) {
          deleteHandoff(runtimeOptions.sessionId, comboName);
        }
        if (telemetry) telemetry.startPhase("finalize");
        if (telemetry) telemetry.endPhase();
        const successResponse = withSelectedConnectionHeader(
          result.response,
          credentials?.connectionId
        );
        if (requestBody.stream === true) {
          return wrapResponseWithOAuthSessionRelease(successResponse, releaseOAuthSession);
        }
        releaseOAuthSession();
        return successResponse;
      }

      // A final hard-lease fence rejection is authoritative. It must never mutate
      // connection health/cooldown state or fall through to ordinary account/model
      // fallback, which could turn a stale lifecycle into unmanaged dispatch.
      if (
        runtimeOptions.managedLease &&
        (result.errorType === "lease_error" || String(result.errorCode || "").startsWith("LEASE_"))
      ) {
        return result.response;
      }

      // Missing Cloud Code project assignment is configuration, not a transient failure.
      // Preserve the typed fail-closed 422; marking it unavailable would trigger cooldown
      // redispatch and repeat bootstrap within the same logical request.
      if (isAntigravityMissingProjectError(provider, result)) {
        markAntigravityMissingCloudCodeProject(credentials.connectionId);
        return withSelectedConnectionHeader(result.response, credentials.connectionId);
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

        // #8928: once the bounded same-connection retry is unavailable or exhausted,
        // remove only the affinity pin that still points at this failed connection. This lets
        // the next client retry select another eligible account without deleting a
        // pin that may already have moved to a healthy connection.
        const isTerminalStreamEarlyEof =
          result.errorCode === "STREAM_EARLY_EOF" || result.errorType === "stream_early_eof";

        if (isTerminalStreamEarlyEof && runtimeOptions.sessionAffinityKey) {
          try {
            evictSessionAccountAffinityForConnection(
              runtimeOptions.sessionAffinityKey,
              provider,
              credentials.connectionId
            );
          } catch {
            // Best-effort: the current response still surfaces the original 502.
          }
        }

        // Stream readiness timeout is an upstream stall after an HTTP response was received,
        // not an account/quota failure. Do NOT mark the account unavailable here.
        return withSelectedConnectionHeader(result.response, credentials?.connectionId);
      }

      if (isAntigravityStreamReadinessFailure) {
        const classificationError = resolveStreamReadinessClassificationError(result);
        const { shouldFallback, cooldownMs } = await markAccountUnavailable(
          credentials.connectionId,
          result.status || HTTP_STATUS.BAD_GATEWAY,
          classificationError,
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
          lastError = classificationError;
          lastStatus = result.status;
          requestRetryLastError = classificationError;
          requestRetryLastStatus = result.status;
          continue;
        }
        return withSelectedConnectionHeader(result.response, credentials?.connectionId);
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

        return withSelectedConnectionHeader(result.response, credentials?.connectionId);
      }

      if (result.errorType === "account_semaphore_capacity") {
        // Local concurrency pressure is not an upstream quota failure. Prefer another
        // account when possible; pinned combo steps fall through to combo orchestration.
        if (hasForcedConnection) {
          return withSelectedConnectionHeader(result.response, credentials?.connectionId);
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
      // #7360: prefer the full un-sanitized upstream text over result.error
      // (truncated to its first line for the client response body) — Gemini's
      // TPM/RPD metric name and retry hint live on lines 2-3, after the
      // generic "quota exceeded" preamble on line 1.
      const errorStr = String(result.rawMessage ?? result.error ?? "");
      const failureKind =
        result.status === 429
          ? isSubscriptionQuotaText(errorStr.toLowerCase(), provider)
            ? "quota_exhausted"
            : classify429FromError({ status: result.status, message: errorStr })
          : undefined;
      if (result.status === 429 && isDailyQuotaExhausted(errorStr)) {
        // Parse which model is quota-limited
        const match = errorStr.match(/today's quota for model ([^,]+)/);
        const limitedModel = match ? match[1].trim() : model;

        const mlSettings = resolveModelLockoutSettings(runtimeOptions.cachedSettings);
        if (mlSettings.enabled && mlSettings.errorCodes.includes(result.status)) {
          // Lock until tomorrow 00:00. Antigravity meters per exact model (#8630).
          const lockScope = provider === "antigravity" ? "exact" : undefined;
          const lockResult = recordModelLockoutFailure(
            provider,
            credentials.connectionId,
            limitedModel,
            "quota_exhausted",
            result.status,
            0,
            providerProfile,
            { maxCooldownMs: mlSettings.maxCooldownMs, scope: lockScope }
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
          shouldMarkAccountExhaustedFrom429(provider, model, passthroughModels, failureKind) &&
          // T-PROBE: a probe must not poison the 5min quotaCache for real
          // traffic (#9817).
          !(await shouldIsolateProbeFailures())
        ) {
          markAccountExhaustedFrom429(credentials.connectionId, provider);
        }
      }

      // #9708: retry a retryable pre-output transport failure once on the same
      // account (jittered 2-3s) before cooling the connection. A first 503/507
      // must not rotate away from a still-healthy Codex prompt-cache partition.
      // Skipped inside an emergency-fallback hop: that path guarantees exactly one
      // upstream call against the free fallback model (#1731) — an extra retry there
      // burns a second call against a provider we're already treating as a last resort.
      // Skipped for combo targets too: combo routing owns its own target-level
      // fallback/retry policy (per-target error handling in handleSingleModel,
      // then the next combo target) — a same-account retry here just delays that
      // policy and can surface the wrong terminal status when a later hop throws.
      const transportAttempts = sameAccountTransportRetries.get(credentials.connectionId) || 0;
      if (
        !runtimeOptions.emergencyFallbackTried &&
        !comboName &&
        !forceLiveComboTest &&
        shouldRetrySameAccountTransport({
          status: result.status,
          errorText: errorStr,
          errorCode: result.errorCode,
          errorType: result.errorType,
          attempt: transportAttempts,
          hasForcedConnection,
        })
      ) {
        sameAccountTransportRetries.set(credentials.connectionId, transportAttempts + 1);
        const waitMs = sameAccountTransportRetryDelayMs();
        log.warn(
          "RETRY",
          `${provider}/${model} retryable pre-output ${result.status} — retrying same account once after ${waitMs}ms`
        );
        const completed = await waitForCooldownAwareRetry(waitMs, requestSignal);
        if (!completed) {
          releaseOAuthSession();
          return errorResponse(499, "Request aborted");
        }
        preselectedCredentials = credentials;
        continue;
      }

      // 8. Fallback to next account
      // A3 guard: if 401 and connection has extra keys, skip connection-level disable
      // (key-level failure already recorded in chatCore.ts via T07)
      // Check extra keys directly from credentials for reliability across restarts
      const hasExtraKeys =
        ((credentials.providerSpecificData?.extraApiKeys as string[] | undefined) ?? []).length >
          0 || connectionHasExtraKeys(credentials.connectionId);
      const is401 = result.status === 401;
      const skipConnectionDisable = shouldSkipConnDisable(result, is401, hasExtraKeys, provider);

      const { shouldFallback, cooldownMs } = skipConnectionDisable
        ? { shouldFallback: false, cooldownMs: 0 }
        : await markAccountUnavailable(
            credentials.connectionId,
            result.status,
            errorStr,
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
              headers: result.response.headers,
            }
          );

      // An explicit pin (combo step `connectionId` / `x-omniroute-connection`) is an
      // operator instruction, not a suggestion: the account cooldown above is still
      // recorded, but selection must NOT silently rotate to a sibling account of the
      // same provider. Pinned steps fall through to combo orchestration, which moves
      // to the next target — with ITS own pin. Same rule the antigravity
      // stream-readiness / pre-response-timeout and account-semaphore paths above
      // already apply.
      if (shouldFallback && !hasForcedConnection) {
        if (Number.isFinite(cooldownMs) && cooldownMs > 0) {
          lastCooldownMs = cooldownMs;
          requestRetryLastCooldownMs = cooldownMs;
        }
        log.warn("AUTH", `Account ${accountId}... unavailable (${result.status}), trying fallback`);
        // #6219: evict the sticky session pin when the pinned account fails over,
        // otherwise the next request re-pins the same throttled account until
        // restart. Guarded by connection match so a pin for a different (healthy)
        // account is left intact.
        if (runtimeOptions.sessionAffinityKey) {
          try {
            evictSessionAccountAffinityForConnection(
              runtimeOptions.sessionAffinityKey,
              provider,
              credentials.connectionId
            );
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

      // T-PROBE: a probe failure must not degrade the provider-wide circuit
      // breaker for real traffic (#9817).
      if (
        !(await shouldIsolateProbeFailures()) &&
        classifyProviderBreakerResult(result, isCombo, forceLiveComboTest) === "failure"
      ) {
        breaker._onFailure();
      }

      return withSelectedConnectionHeader(result.response, credentials?.connectionId);
    }
  }
}
