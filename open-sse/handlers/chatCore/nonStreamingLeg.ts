/**
 * The non-streaming leg of handleChatCore, lifted verbatim out of the barrel.
 *
 * Every path through this block terminates -- the try ends in a return, the
 * catch ends in a throw -- so nothing downstream observes what this code
 * assigns. The contract is therefore a plain return value with no carry-out,
 * unlike the compression leaf which hands eleven reassigned values back.
 */
import { buildPostCallGuardrailContext } from "./postCallGuardrailContext.ts";
import { storeSemanticCacheResponse } from "./semanticCacheStore.ts";
import { buildNonStreamingResponseHeaders } from "./nonStreamingResponseHeaders.ts";
import { maybeWrapForcedNonStreamingResponsesJson } from "./responsesJsonToSse.ts";
import { createRoutingEvent, emitRoutingEvent } from "../../services/routing/index.ts";
import { routingFinishReason } from "./routingFinishReason.ts";
import { buildClaudePromptCacheLogMeta } from "./executorHelpers.ts";
import { runProviderExecutionPipeline } from "./providerExecutionPipeline.ts";
import { runNonStreamingProviderLeg } from "./nonStreamingProviderLeg.ts";
import type { NonStreamingProviderLegResult } from "@/lib/skills/toolLoopTypes.ts";
import {
  applyServerOwnedToolLoopIfNeeded,
  derivePostInjectionRequestIdentity,
  followUpLegInput,
} from "./serverOwnedToolLoopWire.ts";
import { finalizeToolLoopError } from "./nonStreamingFinalization.ts";
import { markCodexScopeRateLimited } from "./codexFailover.ts";
import { deleteSessionAccountAffinity } from "@/lib/db/sessionAccountAffinity";
import { maybeSyncClaudeExtraUsageState } from "./telemetryHelpers.ts";
import { runMemoryExtractionGate } from "./memoryExtraction.ts";
import { normalizeHeaders } from "../../utils/headers.ts";
import { translateRequest } from "../../translator/index.ts";
import { normalizeUsage } from "../../utils/usageTracking.ts";
import { echoModelInObject } from "../../services/responseModelEcho.ts";
import { isServerOwnedToolLoopEnabled } from "@/shared/utils/featureFlags.ts";
import {
  buildErrorBody,
  createErrorResult,
  sanitizeErrorMessage,
  sanitizeUpstreamDetails,
} from "../../utils/error.ts";
import {
  reportMalformed200,
  detectMalformedNonStream,
  describeMalformedNonStream,
} from "../../utils/diagnostics.ts";
import { HTTP_STATUS } from "../../config/constants.ts";
import { updateProviderConnection } from "@/lib/db/providers";
import { getSkillsModelIdForFormat } from "./skillsFormat.ts";
import { isSemaphoreCapacityError, getSafeErrorMetadata } from "./streamErrorResult.ts";
import { buildCacheUsageLogMeta } from "./cacheUsageMeta.ts";
import { logAuditEvent } from "@/lib/compliance";
import { trackPendingRequest, appendRequestLog } from "@/lib/usageDb";
import { finalizePendingScope, updatePendingScope } from "@/lib/usage/pendingRequestScope";
import { recordCost } from "@/domain/costRules";
import { calculateCost } from "@/lib/usage/costCalculator";
import { recordContextEditingTelemetryHook } from "./contextEditingTelemetry.ts";
import { scheduleQuotaShareConsumption } from "./quotaShareConsumption.ts";
import { emitRequestGamificationEvent } from "./gamificationEvent.ts";
import { runPluginOnResponseHook } from "./pluginOnResponse.ts";
import { isJsonRecord } from "./nonStreamingResponseParse.ts";
import { recordNonStreamingUsageStats } from "./nonStreamingUsageStats.ts";
import { getModelNormalizeToolCallId, getModelPreserveOpenAIDeveloperRole } from "@/lib/db/models";
import { getProviderCredentials, extractSessionAffinityKey } from "@/sse/services/auth";
import { guardrailRegistry } from "@/lib/guardrails";
import { extractUsageFromResponse } from "../usageExtractor.ts";
import { updateFromHeaders, updateFromResponseBody } from "../../services/rateLimitManager.ts";
import { markBlocked as markAccountSemaphoreBlocked } from "../../services/accountSemaphore.ts";
import { lockModel, recordCoreOwnedAntigravityQuotaState } from "../../services/accountFallback.ts";
import { saveIdempotency } from "@/lib/idempotencyLayer";
import { isLocalStreamLifecycleError } from "@/shared/utils/circuitBreaker";
import { shouldIsolateProbeFailures } from "@/shared/utils/probeOrigin";
import { writeTerminalStatus } from "@/shared/utils/terminalStatus";
import { extractFacts } from "@/lib/memory/extraction";
import { handleToolCallExecution } from "@/lib/skills/interception";
import { MEMORY_BUILTIN_TOOL_NAMES } from "@/lib/skills/memoryBuiltins";
import { incrementTokenUsage } from "../../services/geminiRateLimitTracker.ts";

import type { PersistAttemptLogsArgs } from "./attemptLogging.ts";
import type { EffectiveServiceTier } from "./serviceTier.ts";
import type { ChatCoreExecutorResult } from "./executeProviderRequest.ts";
import type { MemorySkillsInjectionResult } from "./memorySkillsInjection.ts";
import type { WebFetchFallbackPlan } from "../../services/webFetchInterception.ts";
import type { WebSearchFallbackPlan } from "../../services/webSearchFallback.ts";
import type { createPreparedRequestLogger } from "../../utils/providerRequestLogging.ts";
import type { FailureUsageAggregate } from "./failureUsage.ts";

/**
 * The block calls `log?.warn` directly and passes `log` on to helpers that
 * reach for debug/info/error, so the shape has to cover all four.
 */
type LoggerLike =
  | {
      warn?: (...args: unknown[]) => void;
      debug?: (...args: unknown[]) => void;
      info?: (...args: unknown[]) => void;
      error?: (...args: unknown[]) => void;
    }
  | null
  | undefined;

type RequestLogger = {
  logConvertedResponse?: (...args: unknown[]) => unknown;
  logError?: (...args: unknown[]) => unknown;
  logProviderResponse?: (...args: unknown[]) => unknown;
  logTargetRequest?: (...args: unknown[]) => unknown;
  logToolLoopReceipt?: (...args: unknown[]) => unknown;
};

export interface NonStreamingLegDeps {
  apiKeyInfo: ({ id?: string | null; name?: string } & Record<string, unknown>) | null;
  applyProviderFailureClassification: ({
    statusCode,
    message,
    headers,
    upstreamErrorBody,
    retryAfterMs,
    targetModel,
  }: {
    statusCode: number;
    message: string;
    headers?: Headers | null;
    upstreamErrorBody?: unknown;
    retryAfterMs?: number | null;
    targetModel: string;
  }) => Promise<void>;
  assertManagedLeaseFence: (attemptConnectionId: string | null | undefined) => void;
  attachCompressionUsageReceiptAfterAnalytics: (
    usage: Record<string, unknown>,
    source: "provider" | "estimated" | "stream"
  ) => void;
  body: Record<string, unknown>;
  bodyForCacheWrite: Record<string, unknown> | null | undefined;
  claudePromptCacheLogMeta: Record<string, unknown> | null | undefined;
  clientRawRequest:
    | {
        headers?: Record<string, string | string[]>;
        signal?: AbortSignal;
      }
    | null
    | undefined;
  clientRequestedResponsesStream: boolean;
  clientResponseFormat: string;
  comboStrategy: string | null | undefined;
  compressionResponseMeta: string;
  connectionId: string | null | undefined;
  contextEditingEnabled: boolean;
  copilotCompatibleReasoning: boolean;
  credentials: ({ connectionId?: string | null } & Record<string, unknown>) | null | undefined;
  currentModel: string;
  customToolNames: Set<string>;
  echoModel: string;
  effectiveModel: string;
  effectiveServiceTier: EffectiveServiceTier;
  endpointPath: string;
  executeProviderRequest: (
    modelToCall?: string,
    allowDedup?: boolean
  ) => Promise<ChatCoreExecutorResult>;
  executeRefreshCredentials: (
    currentCreds: Record<string, unknown>
  ) => Promise<Record<string, unknown> | null>;
  fallbackAttempts: number;
  // The barrel declares this as a bare `let`, i.e. implicit any: one branch
  // stores a captured request body, another an executor result, and the two
  // shapes do not unify. Any narrower annotation here would change behaviour,
  // so the original looseness is preserved deliberately.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  finalBody: any;
  getCurrentConnectionId: () => string | null | undefined;
  getManagedLeaseFenceErrorCode: (code: string | undefined) => string | undefined;
  handleCredentialsRefreshed: (refreshed: Record<string, unknown>) => Promise<void>;
  idempotencyKey: string;
  injectionResult: MemorySkillsInjectionResult;
  isClaudeCodeCompatible: boolean;
  isCombo: boolean;
  isResponsesEndpoint: boolean;
  log: LoggerLike | null | undefined;
  managedLease: { connectionId?: string | null } | null | undefined;
  managedLeaseFenceErrorResult: (code: string) => {
    errorType: string;
    errorCode: string;
    success: false;
    status: number;
    error: string;
    rawMessage: string;
    response: Response;
    retryAfterMs?: number;
  };
  memoryOwnerId: string;
  memorySettings: { enabled: boolean; skillsEnabled: boolean; maxTokens: number };
  model: string | null | undefined;
  onRequestSuccess: ((...args: never[]) => unknown) | null | undefined;
  pendingConnId: string | null | undefined;
  pendingRequestId: string;
  pendingScope: {
    id: string;
    model: string | null | undefined;
    provider: string | null | undefined;
    connectionId: string | null | undefined;
  };
  persistAttemptLogs: (args: PersistAttemptLogsArgs) => void;
  persistFailureUsage: (
    statusCode: number,
    errorCode?: string | null,
    aggregate?: FailureUsageAggregate | null
  ) => void;
  /**
   * Seed value for the recovery flag. The leg assigns to its local copy on the
   * recovery path, and nothing reads it afterwards -- every route out of here
   * returns or throws, so the assignment cannot escape. The reads that matter
   * live in the streaming leg, which never enters this function. Kept in the
   * contract so the lifted assignment stays verbatim.
   */
  pipelineRecovered: boolean;
  pipelineSessionId: string | null | undefined;
  preserveCacheControl: boolean;
  provider: string | null | undefined;
  providerHeaders: Record<string, unknown> | Headers | null | undefined;
  providerRequestCapture: ReturnType<typeof createPreparedRequestLogger>;
  providerResponse: (Response & { body?: unknown }) | null | undefined;
  reasoningCacheScope: string;
  reasoningReplayHistory: unknown[];
  reqLogger: RequestLogger;
  requestToolIdentityMap: Map<string, { namespace?: string; name: string }>;
  resolveReportedServiceTier: (responseBody?: unknown) => EffectiveServiceTier | null | undefined;
  semanticCacheEnabled: boolean;
  sessionAffinityKey: string | null | undefined;
  skillRequestId: `${string}-${string}-${string}-${string}-${string}`;
  sourceFormat: string;
  startTime: number;
  stream: boolean;
  targetFormat: string;
  toolNameMap: Map<string, string>;
  traceEnabled: boolean;
  traceId: string;
  translatedBody: Record<string, unknown>;
  triedModels: Set<string>;
  videoBridgeObserved: boolean;
  webFetchFallbackPlan: WebFetchFallbackPlan | null | undefined;
  webSearchFallbackPlan: WebSearchFallbackPlan | null | undefined;
}

export async function runNonStreamingLeg(deps: NonStreamingLegDeps) {
  // Nine of these are reassigned inside the block. Those writes stay local:
  // every path returns or throws, so the barrel never reads them back.
  let {
    apiKeyInfo,
    applyProviderFailureClassification,
    assertManagedLeaseFence,
    attachCompressionUsageReceiptAfterAnalytics,
    body,
    bodyForCacheWrite,
    claudePromptCacheLogMeta,
    clientRawRequest,
    clientRequestedResponsesStream,
    clientResponseFormat,
    comboStrategy,
    compressionResponseMeta,
    connectionId,
    contextEditingEnabled,
    copilotCompatibleReasoning,
    credentials,
    currentModel,
    customToolNames,
    echoModel,
    effectiveModel,
    effectiveServiceTier,
    endpointPath,
    executeProviderRequest,
    executeRefreshCredentials,
    fallbackAttempts,
    finalBody,
    getCurrentConnectionId,
    getManagedLeaseFenceErrorCode,
    handleCredentialsRefreshed,
    idempotencyKey,
    injectionResult,
    isClaudeCodeCompatible,
    isCombo,
    isResponsesEndpoint,
    log,
    managedLease,
    managedLeaseFenceErrorResult,
    memoryOwnerId,
    memorySettings,
    model,
    onRequestSuccess,
    pendingConnId,
    pendingRequestId,
    pendingScope,
    persistAttemptLogs,
    persistFailureUsage,
    pipelineRecovered: _pipelineRecovered,
    pipelineSessionId,
    preserveCacheControl,
    provider,
    providerHeaders,
    providerRequestCapture,
    providerResponse,
    reasoningCacheScope,
    reasoningReplayHistory,
    reqLogger,
    requestToolIdentityMap,
    resolveReportedServiceTier,
    semanticCacheEnabled,
    sessionAffinityKey,
    skillRequestId,
    sourceFormat,
    startTime,
    stream,
    targetFormat,
    toolNameMap,
    traceEnabled,
    traceId,
    translatedBody,
    triedModels,
    videoBridgeObserved,
    webFetchFallbackPlan,
    webSearchFallbackPlan,
  } = deps;

  try {
    const runNonStreamingPipeline = async ({
      policy,
      model: pipelineModel,
      translatedBody: wireBody,
    }) => {
      translatedBody = wireBody as typeof translatedBody;
      currentModel = pipelineModel;
      triedModels.add(pipelineModel);
      return runProviderExecutionPipeline({
        policy,
        target: {
          provider,
          requestedModel: pipelineModel,
          sourceFormat,
          targetFormat,
          stream: false,
        },
        connection: {
          initialConnectionId: String(getCurrentConnectionId() || connectionId || ""),
          getCurrentConnectionId: () => getCurrentConnectionId() || undefined,
          getCredentials: () => (credentials || {}) as Record<string, unknown>,
          replaceCredentials: (next) => {
            Object.assign(credentials, next);
          },
          onCredentialsRefreshed: handleCredentialsRefreshed,
          refreshCredentials: executeRefreshCredentials,
          assertManagedLeaseFence: (id) => {
            assertManagedLeaseFence(id);
          },
          getProviderCredentials,
        },
        wire: {
          body: translatedBody as Record<string, unknown>,
          currentModel,
          triedModels,
          setBodyAndModel: (nextBody, nextModel) => {
            translatedBody = nextBody as typeof translatedBody;
            currentModel = nextModel;
            triedModels.add(nextModel);
          },
        },
        state: {
          updatePendingStage: (stage, data) => {
            updatePendingScope(pendingScope, { stage, ...(data || {}) });
          },
          recordRateLimitHeaders: updateFromHeaders,
          recordRateLimitBody: updateFromResponseBody,
          writeTerminalStatus,
          persistConnectionPatch: updateProviderConnection,
          setConnectionRateLimitedUntil: async (id, untilMs) => {
            const { setConnectionRateLimitUntil } = await import("@/lib/db/providers");
            setConnectionRateLimitUntil(id, untilMs);
          },
          lockModel,
          recordAntigravityQuotaState: recordCoreOwnedAntigravityQuotaState,
          markAccountSemaphoreBlocked: (key) => {
            markAccountSemaphoreBlocked(key, Date.now() + 60_000);
          },
          isolateProbeFailures: () => shouldIsolateProbeFailures(),
          onCodexScopeRateLimited: async (params) => {
            await markCodexScopeRateLimited({
              failedConnectionId: params.failedConnectionId,
              model: params.model,
              rateLimitedUntil: params.rateLimitedUntil,
              credentials: (params.credentials || credentials) as {
                connectionId?: string | null;
                providerSpecificData?: unknown;
              },
            });
          },
          onClearSessionAffinity: () => {
            const key =
              sessionAffinityKey ||
              extractSessionAffinityKey(body, clientRawRequest?.headers) ||
              null;
            if (!key) return;
            try {
              deleteSessionAccountAffinity(key, "codex");
            } catch {
              // best-effort
            }
          },
          onAuditAccountRotation: (params) => {
            logAuditEvent({
              action: params.action,
              actor: apiKeyInfo?.name || "system",
              target: params.newConnectionId,
              details: {
                failed_connection_id: params.failedConnectionId,
                new_connection_id: params.newConnectionId,
                attempt: params.attempt,
                retry_after_ms: params.retryAfterMs,
              },
            });
          },
        },
        sendProviderAttempt: (modelToCall, allowDedup) =>
          executeProviderRequest(modelToCall, allowDedup),
      });
    };

    let toolLoopRan = false;
    let toolLoopUsage = null;
    let legResult = await runNonStreamingProviderLeg({
      phase: "initial",
      sourceBody: (body || {}) as Record<string, unknown>,
      expectedConnectionId: managedLease
        ? String(getCurrentConnectionId() || connectionId || "") || undefined
        : undefined,
      allowAccountRotation: !managedLease && comboStrategy !== "context-relay",
      allowModelFallback: true,
      executeProviderRequest: (modelToCall, allowDedup) =>
        executeProviderRequest(modelToCall, allowDedup),
      runProviderExecution: runNonStreamingPipeline,
      setRequestWireState: ({ translatedBody: nextBody, effectiveModel: nextModel }) => {
        translatedBody = nextBody as typeof translatedBody;
        currentModel = nextModel;
        triedModels.add(nextModel);
      },
      sourceFormat,
      targetFormat,
      clientResponseFormat,
      provider,
      model: effectiveModel,
      connectionId: String(getCurrentConnectionId() || connectionId || ""),
      getCurrentConnectionId: () => getCurrentConnectionId() || undefined,
      effectiveModel: currentModel,
      translatedBody: translatedBody as Record<string, unknown>,
      toolNameMap,
      customToolNames,
      requestToolIdentityMap,
      reasoningCacheScope,
      reasoningReplayHistory,
      clientHeaders: clientRawRequest?.headers ?? null,
      isClaudeCodeCompatible,
      log,
    });

    if (legResult.kind === "error") {
      const err = legResult.result;
      const errMessage =
        err?.rawMessage ||
        (err?.originalError instanceof Error ? err.originalError.message : err?.error) ||
        "";
      const errHeaders = err?.upstreamHeaders || err?.response?.headers;
      const errUpstreamBody = err?.upstreamErrorBody;
      if (err) {
        await applyProviderFailureClassification({
          statusCode: err.status,
          message: errMessage,
          headers: errHeaders,
          upstreamErrorBody: errUpstreamBody,
          retryAfterMs: err.retryAfterMs ?? null,
          targetModel: currentModel,
        });
      }

      const captured = providerRequestCapture.latest?.() ?? null;
      finalBody = captured?.body ?? finalBody ?? translatedBody;
      if (captured) {
        reqLogger.logTargetRequest(captured.url, captured.headers, captured.body);
      }
      reqLogger.logError(new Error(err.error || "Provider request failed"), finalBody);
      const isNetworkThrow = Boolean(err.originalError);
      if (err.response && !isNetworkThrow) {
        reqLogger.logProviderResponse(
          err.status,
          err.response.statusText || "Error",
          err.response.headers,
          err.response
        );
      }
      appendRequestLog({
        model,
        provider,
        connectionId,
        status: `FAILED ${err.status}`,
      }).catch(() => {});
      persistAttemptLogs({
        status: err.status,
        error: err.error || "Provider request failed",
        providerRequest: finalBody || translatedBody,
        providerResponse: isNetworkThrow ? undefined : err.response,
        // On a client abort the client already disconnected before we got here, so this
        // body is what we WOULD have sent, not what was delivered. The dashboard reads
        // `clientResponse` as "what the client received", so logging it misleads —
        // `error` above already records the reason. The pre-#12867 path omitted it here;
        // the leg-based path must keep doing so.
        clientResponse: isLocalStreamLifecycleError(err.originalError)
          ? undefined
          : buildErrorBody(err.status, err.error || "Provider request failed"),
        cacheSource: "upstream",
      });
      persistFailureUsage(err.status, err.errorCode || `upstream_${err.status}`);
      trackPendingRequest(model, provider, connectionId, false);
      return err;
    }

    _pipelineRecovered = true;
    const expectedConn = managedLease
      ? String(getCurrentConnectionId() || connectionId || "") || undefined
      : undefined;
    // The identity is the tool loop's execution fence key, and deriveToolRequestIdentity
    // canonicalizes the body — which by design rejects Dates, Maps and class instances.
    // It was computed eagerly, so a body carrying any of those threw on EVERY
    // non-streaming request even with SERVER_OWNED_TOOL_LOOP_ENABLED off (the default).
    // Derive it only when the loop can run, and fail closed rather than crash: no
    // identity means no fence, and without a fence the loop must not run.
    let toolLoopEnabled = isServerOwnedToolLoopEnabled();
    let postInjectionRequestIdentity = "";
    if (toolLoopEnabled) {
      try {
        postInjectionRequestIdentity = derivePostInjectionRequestIdentity({
          apiKeyId: memoryOwnerId || "local",
          headers: clientRawRequest?.headers ?? null,
          skillRequestId,
          postInjectionBody: (body || {}) as Record<string, unknown>,
        });
      } catch (identityError) {
        log?.warn?.(
          "SERVER_OWNED_TOOL_LOOP",
          `request body is not canonicalizable, skipping the loop: ${
            identityError instanceof Error ? identityError.message : "unknown"
          }`
        );
        toolLoopEnabled = false;
      }
    }
    const loopApply = await applyServerOwnedToolLoopIfNeeded({
      enabled: toolLoopEnabled,
      stream,
      isResponsesEndpoint,
      sourceFormat,
      initialLeg: legResult,
      sourceBody: (body || {}) as Record<string, unknown>,
      skillsModelId: getSkillsModelIdForFormat(sourceFormat),
      executionContext: {
        apiKeyId: memoryOwnerId || "local",
        sessionId: pipelineSessionId,
        requestId: skillRequestId,
        requestIdentity: postInjectionRequestIdentity,
        builtinToolNames: injectionResult.builtinToolNames,
        injectedCustomSkillNames: injectionResult.injectedCustomSkillNames,
        customSkillExecutionEnabled:
          Boolean(memoryOwnerId) && memorySettings?.skillsEnabled === true,
        executionFenceEnabled: true,
        provider,
        model: effectiveModel,
      },
      abortSignal: clientRawRequest?.signal,
      expectedConnectionId: expectedConn,
      followUpLeg: async (nextSourceBody) => {
        translatedBody = translateRequest(
          sourceFormat,
          targetFormat,
          model,
          { ...nextSourceBody },
          false,
          credentials,
          provider,
          reqLogger,
          {
            normalizeToolCallId: getModelNormalizeToolCallId(
              provider || "",
              model || "",
              sourceFormat
            ),
            preserveDeveloperRole: getModelPreserveOpenAIDeveloperRole(
              provider || "",
              model || "",
              sourceFormat
            ),
            preserveCacheControl,
            signatureNamespace: connectionId,
            copilotClient: copilotCompatibleReasoning,
            reasoningCacheScope,
            onReasoningReplayHistory: (messages) => {
              reasoningReplayHistory = messages;
            },
          }
        );
        return runNonStreamingProviderLeg(
          followUpLegInput(
            {
              executeProviderRequest: (modelToCall, allowDedup) =>
                executeProviderRequest(modelToCall, allowDedup),
              runProviderExecution: runNonStreamingPipeline,
              setRequestWireState: ({ translatedBody: nextBody, effectiveModel: nextModel }) => {
                translatedBody = nextBody as typeof translatedBody;
                currentModel = nextModel;
                triedModels.add(nextModel);
              },
              sourceFormat,
              targetFormat,
              clientResponseFormat,
              provider,
              model: effectiveModel,
              connectionId: String(getCurrentConnectionId() || connectionId || ""),
              getCurrentConnectionId: () => getCurrentConnectionId() || undefined,
              effectiveModel: currentModel,
              translatedBody: translatedBody as Record<string, unknown>,
              toolNameMap,
              customToolNames,
              requestToolIdentityMap,
              reasoningCacheScope,
              reasoningReplayHistory,
              clientHeaders: clientRawRequest?.headers ?? null,
              isClaudeCodeCompatible,
              log,
            },
            nextSourceBody,
            expectedConn
          )
        );
      },
      logReceipt: (receipt) => reqLogger.logToolLoopReceipt(receipt),
    });
    if (loopApply.kind === "error") {
      return await finalizeToolLoopError({
        loop: loopApply.loop,
        model,
        provider,
        connectionId,
        providerRequest: loopApply.loop.finalProviderRequest || finalBody || translatedBody,
        persistFailureUsage,
        persistAttemptLogs,
        trackPendingRequest,
      });
    }
    // `legResult` is declared as the full NonStreamingProviderLegResult union. The
    // `kind === "error"` guard above narrows it to the ok variant, but the conditional
    // reassignment below widens it back to the declared type, so every field read past
    // this point lost the narrowing — 13 TS2339 diagnostics under
    // tsconfig.typecheck-api.json, which pulls chatCore.ts in through the route while
    // tsconfig.typecheck-core.json does not. Pin the ok variant in its own binding:
    // `loopApply.leg` is already `NonStreamingProviderLegResult & { kind: "ok" }`,
    // so no cast is involved.
    let okLeg: NonStreamingProviderLegResult & { kind: "ok" } = legResult;
    if (loopApply.kind === "ok") {
      toolLoopRan = true;
      toolLoopUsage = loopApply.usage;
      okLeg = loopApply.leg;
    }

    if (okLeg.upstreamResponse) {
      providerResponse = okLeg.upstreamResponse;
      providerHeaders = normalizeHeaders(okLeg.upstreamResponse.headers);
    } else {
      providerResponse = new Response(null, {
        status: 200,
        headers: okLeg.headers,
      });
      providerHeaders = normalizeHeaders(okLeg.headers);
    }
    finalBody = providerRequestCapture.body(okLeg.providerRequest || translatedBody);
    // Built inside executeProviderRequest on the pre-#12867 path. The leg now owns the
    // first non-streaming send, so that assignment never runs here and the meta stayed
    // null — `_omniroute.claudePromptCache` silently vanished from every call log on
    // this path. Same inputs, same helper, at the point where they are available.
    claudePromptCacheLogMeta = buildClaudePromptCacheLogMeta(
      targetFormat,
      finalBody,
      providerHeaders,
      clientRawRequest?.headers
    );
    const capturedOk = providerRequestCapture.latest?.();
    reqLogger.logTargetRequest(
      okLeg.requestUrl || capturedOk?.url || "",
      okLeg.requestHeaders || capturedOk?.headers || {},
      capturedOk?.body ?? finalBody
    );
    const responseBody = okLeg.providerBody;
    const responsePayloadFormat = okLeg.responsePayloadFormat;
    const looksLikeSSE = okLeg.looksLikeSSE;
    let translatedResponse = okLeg.response;
    const memoryExtractionResponse = okLeg.responseForMemoryExtraction;
    reqLogger.logProviderResponse(
      200,
      "OK",
      providerResponse.headers,
      looksLikeSSE ? { _streamed: true, _format: "sse-json", summary: responseBody } : responseBody
    );
    effectiveServiceTier = resolveReportedServiceTier(responseBody) ?? effectiveServiceTier;
    if (onRequestSuccess) {
      await onRequestSuccess();
    }
    const successConnectionId = getCurrentConnectionId();
    await maybeSyncClaudeExtraUsageState({
      provider,
      connectionId: successConnectionId,
      providerSpecificData: credentials?.providerSpecificData,
      log,
    });
    const usage = toolLoopUsage ?? extractUsageFromResponse(responseBody, provider);
    const cacheUsageLogMeta = buildCacheUsageLogMeta(usage);
    if (usage && typeof usage === "object") {
      attachCompressionUsageReceiptAfterAnalytics(usage as Record<string, unknown>, "provider");
      if (provider === "gemini") {
        const promptTokens =
          typeof (usage as Record<string, unknown>).prompt_tokens === "number"
            ? ((usage as Record<string, unknown>).prompt_tokens as number)
            : 0;
        if (promptTokens > 0) incrementTokenUsage(model, promptTokens);
      }
    }
    recordContextEditingTelemetryHook({
      contextEditingEnabled,
      provider,
      responseBody,
      skillRequestId,
      log,
    });
    appendRequestLog({
      model,
      provider,
      connectionId: successConnectionId,
      tokens: usage,
      status: "200 OK",
    }).catch(() => {});
    recordNonStreamingUsageStats(usage, {
      traceEnabled,
      provider,
      connectionId: successConnectionId,
      model,
      startTime,
      apiKeyInfo,
      effectiveServiceTier,
      isCombo,
      comboStrategy,
      endpoint: endpointPath,
    });

    // #12150 P1b surface 3 (fix round 1): a video-bridge-observed request's
    // request- AND response-derived text both carry the full transcript (the
    // flattened description on the request side, the model's own reply on
    // the response side) — neither may populate durable Memory. See
    // runMemoryExtractionGate for the shared gate + extraction wiring, unit
    // tested directly in tests/unit/video-bridge-memory-suppression.test.ts.
    runMemoryExtractionGate({
      memoryOwnerId,
      memorySettings,
      videoBridgeObserved,
      pipelineSessionId,
      requestBody: body as Record<string, unknown>,
      responseBody: memoryExtractionResponse as Record<string, unknown> | null,
      extractFacts,
      log,
    });

    const customSkillExecutionEnabled =
      Boolean(memoryOwnerId) && memorySettings?.skillsEnabled === true;
    const builtinToolNames = [
      webSearchFallbackPlan.toolName,
      webFetchFallbackPlan.toolName,
      ...(memoryOwnerId && memorySettings?.enabled ? MEMORY_BUILTIN_TOOL_NAMES : []),
    ].filter((name): name is string => Boolean(name));
    if (!toolLoopRan && (customSkillExecutionEnabled || builtinToolNames.length > 0)) {
      const skillSessionId = pipelineSessionId;

      translatedResponse = await handleToolCallExecution(
        translatedResponse,
        getSkillsModelIdForFormat(sourceFormat),
        {
          apiKeyId: memoryOwnerId || "local",
          sessionId: skillSessionId,
          requestId: skillRequestId,
          builtinToolNames,
          customSkillExecutionEnabled,
          provider,
          model: effectiveModel,
        }
      );
    }

    const guardrailContext = buildPostCallGuardrailContext({
      apiKeyInfo,
      body,
      clientRawRequest,
      log,
      model,
      provider,
      responsePayloadFormat,
      clientResponseFormat,
    });
    const postCallGuardrails = await guardrailRegistry.runPostCallHooks(
      translatedResponse,
      guardrailContext
    );
    translatedResponse = postCallGuardrails.response;

    const responseUsage = isJsonRecord(usage)
      ? usage
      : isJsonRecord(translatedResponse.usage)
        ? translatedResponse.usage
        : null;
    const costUsage = normalizeUsage(responseUsage);
    const estimatedCost = costUsage
      ? await calculateCost(provider, model, costUsage, { serviceTier: effectiveServiceTier })
      : 0;

    if (postCallGuardrails.blocked) {
      const guardrailMessage = postCallGuardrails.message || "Response blocked by guardrail";
      persistAttemptLogs({
        status: HTTP_STATUS.BAD_REQUEST,
        tokens: usage,
        responseBody,
        providerRequest: finalBody || translatedBody,
        providerResponse: looksLikeSSE
          ? {
              _streamed: true,
              _format: "sse-json",
              summary: responseBody,
            }
          : responseBody,
        clientResponse: buildErrorBody(HTTP_STATUS.BAD_REQUEST, guardrailMessage),
        claudeCacheMeta: claudePromptCacheLogMeta,
        claudeCacheUsageMeta: cacheUsageLogMeta,
        cacheSource: "upstream",
      });
      if (apiKeyInfo?.id && estimatedCost > 0) {
        recordCost(apiKeyInfo.id, estimatedCost);
      }
      log?.warn?.(
        "GUARDRAIL",
        `Response blocked by ${postCallGuardrails.guardrail || "guardrail"}: ${guardrailMessage}`
      );
      finalizePendingScope(pendingScope, {
        providerResponse: responseBody,
        clientResponse: translatedResponse,
      });
      return createErrorResult(HTTP_STATUS.BAD_REQUEST, guardrailMessage);
    }

    // Validate the *translated* response actually carries client-usable output.
    // isEmptyContentResponse (above) runs on the raw responseBody before translation;
    // this check runs after translation + sanitization + tool-call execution to catch
    // cases where a provider returns a structurally valid raw body that translates into
    // choices:[] or output:[] with no usable content (Responses API shape included).
    const malformedTranslatedReason = detectMalformedNonStream(translatedResponse, provider);
    if (malformedTranslatedReason) {
      const totalLatency = Date.now() - startTime;
      const rawBytes = (() => {
        try {
          return JSON.stringify(responseBody || {}).length;
        } catch {
          return -1;
        }
      })();
      reportMalformed200({
        mode: "nonstream",
        provider,
        model,
        connectionId,
        reason: malformedTranslatedReason,
        recvBytes: rawBytes,
        recvLines: -1,
        emitted: -1,
        events: {},
        ttftMs: totalLatency,
        elapsedMs: totalLatency,
      });
      appendRequestLog({
        model,
        provider,
        connectionId,
        status: `FAILED ${HTTP_STATUS.BAD_GATEWAY}`,
      }).catch(() => {});
      const malformed = describeMalformedNonStream(translatedResponse, malformedTranslatedReason);
      const malformedMessage = `[${provider}/${model}] ${malformed.message}`;
      const malformedClientBody = buildErrorBody(
        HTTP_STATUS.BAD_GATEWAY,
        malformedMessage,
        undefined,
        { code: malformed.code, type: malformed.type }
      );
      const sanitizedMalformedResponse = sanitizeUpstreamDetails(responseBody);
      const sanitizedMalformedProviderResponse = looksLikeSSE
        ? { _streamed: true, _format: "sse-json", summary: sanitizedMalformedResponse }
        : sanitizedMalformedResponse;
      persistAttemptLogs({
        status: HTTP_STATUS.BAD_GATEWAY,
        tokens: usage,
        responseBody: sanitizedMalformedResponse,
        providerRequest: finalBody || translatedBody,
        providerResponse: sanitizedMalformedProviderResponse,
        clientResponse: malformedClientBody,
        claudeCacheMeta: claudePromptCacheLogMeta,
        claudeCacheUsageMeta: cacheUsageLogMeta,
        cacheSource: "upstream",
      });
      persistFailureUsage(HTTP_STATUS.BAD_GATEWAY, "malformed_translated_response");
      trackPendingRequest(model, provider, pendingConnId, false);
      // Routing event (feedback foundation) — record the malformed outcome so
      // the quality tracker de-prioritizes this model over time.
      void emitRoutingEvent(
        createRoutingEvent({
          requestId: traceId || pendingRequestId || "unknown",
          provider: provider || "unknown",
          model: model || "unknown",
          strategy: isCombo ? (comboStrategy ?? "combo") : "direct",
          latencyMs: Date.now() - startTime,
          ttftMs: null,
          inputTokens: null,
          outputTokens: null,
          cost: null,
          retries: 0,
          fallbackUsed: false, // combo-level fallback tracked by decisionTrace
          outcome: "malformed",
          status: HTTP_STATUS.BAD_GATEWAY,
          finishReason: routingFinishReason(translatedResponse),
          connectionId: credentials?.connectionId ?? null,
        })
      );
      return createErrorResult(
        HTTP_STATUS.BAD_GATEWAY,
        malformedMessage,
        null,
        malformed.code,
        malformed.type
      );
    }

    // ── Phase 9.1: Cache store (non-streaming, temp=0) ──
    storeSemanticCacheResponse({
      enabled: semanticCacheEnabled,
      body: bodyForCacheWrite,
      headers: clientRawRequest?.headers,
      translatedResponse,
      model,
      provider,
      apiKeyId: apiKeyInfo?.id ?? undefined,
      usage,
      log,
    });

    // ── Phase 9.2: Save for idempotency ──
    // Reuse the key resolved by checkIdempotencyCache() above (single derivation per
    // request). (#3821-review LEDGER-6)
    saveIdempotency(idempotencyKey, translatedResponse, 200);
    reqLogger.logConvertedResponse(translatedResponse);
    persistAttemptLogs({
      status: 200,
      tokens: usage,
      responseBody,
      providerRequest: finalBody || translatedBody,
      providerResponse: looksLikeSSE
        ? {
            _streamed: true,
            _format: "sse-json",
            summary: responseBody,
          }
        : responseBody,
      clientResponse: translatedResponse,
      claudeCacheMeta: claudePromptCacheLogMeta,
      claudeCacheUsageMeta: cacheUsageLogMeta,
      cacheSource: "upstream",
    });
    if (apiKeyInfo?.id && estimatedCost > 0) {
      recordCost(apiKeyInfo.id, estimatedCost);
    }

    // === Quota Share POST-hook (B/F7) — fire-and-forget, fail-open ===
    await scheduleQuotaShareConsumption({
      apiKeyId: apiKeyInfo?.id,
      connectionId: credentials?.connectionId,
      provider,
      model,
      usage,
      estimatedCost,
      log,
    });
    // === /Quota Share POST-hook ===

    // ── Gamification event (fire-and-forget) ──
    await emitRequestGamificationEvent({ apiKeyId: apiKeyInfo?.id, model, provider });

    finalizePendingScope(pendingScope, {
      providerResponse: responseBody,
      clientResponse: translatedResponse,
    });
    const responseHeaders = buildNonStreamingResponseHeaders({
      provider,
      model,
      startTime,
      responseUsage,
      estimatedCost,
      requestId: skillRequestId,
      compressionResponseMeta,
      comboStrategy,
      fallbackAttempts,
    });
    // #6426: align response body `model` with the `X-OmniRoute-Model` header
    // (both must be the resolved backend model). Some upstreams (notably legacy
    // /v1/completions text-completion path) return a body `model` field that
    // differs from the resolved backend id we advertised in the header, leaving
    // strict clients unable to reconcile the two. Rewrite body.model to `model`
    // FIRST, then let #1311 echo override it when the opt-in setting is on.
    if (typeof model === "string" && model) echoModelInObject(translatedResponse, model);
    // #1311: echo the requested alias/combo name in the non-streaming response model.
    if (echoModel) echoModelInObject(translatedResponse, echoModel);

    // ── Plugin onResponse hook (fire-and-forget) ──
    // #8395: the streaming branch below already calls this; the non-streaming
    // (stream:false) branch returned without it, so onResponse never fired for
    // non-streaming requests at all.
    await runPluginOnResponseHook({
      requestId: traceId,
      body,
      model,
      provider,
      apiKeyInfo,
      headers: clientRawRequest?.headers,
      response: { status: 200, data: translatedResponse },
    });

    // Routing event (feedback foundation) — fire-and-forget, cheap.
    void emitRoutingEvent(
      createRoutingEvent({
        requestId: traceId || pendingRequestId || "unknown",
        provider: provider || "unknown",
        model: model || "unknown",
        strategy: isCombo ? (comboStrategy ?? "combo") : "direct",
        latencyMs: Date.now() - startTime,
        ttftMs: null,
        inputTokens:
          usage && typeof usage === "object"
            ? (() => {
                const promptTokens = (usage as Record<string, unknown>).prompt_tokens;
                return typeof promptTokens === "number" && Number.isFinite(promptTokens)
                  ? promptTokens
                  : null;
              })()
            : null,
        outputTokens:
          usage && typeof usage === "object"
            ? (() => {
                const completionTokens = (usage as Record<string, unknown>).completion_tokens;
                return typeof completionTokens === "number" && Number.isFinite(completionTokens)
                  ? completionTokens
                  : null;
              })()
            : null,
        cost: Number.isFinite(estimatedCost) ? estimatedCost : null,
        retries: 0,
        fallbackUsed: false, // combo-level fallback tracked by decisionTrace
        outcome: "success",
        status: 200,
        finishReason: routingFinishReason(translatedResponse),
        connectionId: credentials?.connectionId ?? null,
      })
    );

    return {
      success: true,
      response: maybeWrapForcedNonStreamingResponsesJson({
        clientRequestedResponsesStream,
        body: translatedResponse,
        headers: responseHeaders,
      }),
    };
  } catch (error) {
    trackPendingRequest(model, provider, connectionId, false);
    const errorMetadata = getSafeErrorMetadata(error);
    const managedLeaseFenceCode = getManagedLeaseFenceErrorCode(errorMetadata.code);
    if (managedLeaseFenceCode) return managedLeaseFenceErrorResult(managedLeaseFenceCode);
    // isSemaphoreCapacityError already reads the code through getSafeErrorMetadata,
    // so a hostile rejection cannot escape this classification.
    if (isSemaphoreCapacityError(error)) {
      const semaphoreCode = errorMetadata.code as string;
      appendRequestLog({
        model,
        provider,
        connectionId,
        status: `FAILED ${semaphoreCode}`,
      }).catch(() => {});
      const failureMessage = sanitizeErrorMessage(errorMetadata.message) || "Semaphore timeout";
      persistAttemptLogs({
        status: HTTP_STATUS.RATE_LIMITED,
        error: failureMessage,
        providerRequest: finalBody || translatedBody,
        clientResponse: buildErrorBody(HTTP_STATUS.RATE_LIMITED, failureMessage),
        claudeCacheMeta: claudePromptCacheLogMeta,
        cacheSource: "upstream",
      });
      persistFailureUsage(HTTP_STATUS.RATE_LIMITED, semaphoreCode);
      const result = createErrorResult(HTTP_STATUS.RATE_LIMITED, failureMessage);
      return {
        ...result,
        errorType: "account_semaphore_capacity",
        errorCode: semaphoreCode,
      };
    }
    throw error;
  }
}
