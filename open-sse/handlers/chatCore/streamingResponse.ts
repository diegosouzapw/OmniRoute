import { projectFailureUsageErrorCode } from "./failureUsage.ts";

export { extractSystemRoleMessages, relocateDirectiveOnlyMessages } from "./claudeSystemRole.ts";

export { clearCombosCache, clearUpstreamProxyConfigCache } from "./comboContextCache.ts";
import { buildClaudePromptCacheLogMeta } from "./executorHelpers.ts";
import {
  shouldUseNativeCodexPassthrough,
  shouldUseNativeXaiResponsesPassthrough,
  redactPassthroughThinkingSignatures,
  isClaudeCodeSemanticPassthroughRequest,
} from "./passthroughHelpers.ts";
import { recoverAnthropicThinkingSignature } from "../chatCore/thinkingSignatureRecovery.ts";
import { runProviderExecutionPipeline } from "../chatCore/providerExecutionPipeline.ts";
import { markCodexScopeRateLimited } from "../chatCore/codexFailover.ts";
import { deleteSessionAccountAffinity } from "@/lib/db/sessionAccountAffinity";
import { buildStreamingResponseHeaders, stripStaleForwardingHeaders } from "./responseHeaders.ts";

// Re-export the previously inline-defined helpers so existing importers of these
// symbols from chatCore.ts (tests, sibling modules) keep resolving after the split.
export {
  shouldUseNativeCodexPassthrough,
  shouldUseNativeXaiResponsesPassthrough,
  redactPassthroughThinkingSignatures,
  isClaudeCodeSemanticPassthroughRequest,
  buildStreamingResponseHeaders,
  stripStaleForwardingHeaders,
};

import { normalizeHeaders } from "../../utils/headers.ts";

import { FORMATS } from "../../translator/formats.ts";

import { COLORS } from "../../utils/stream.ts";

import {
  refreshWithRetry,
  isUnrecoverableRefreshError,
  runWithOnPersist,
  runWithCasGuard,
} from "../../services/tokenRefresh.ts";

import { runWithCapture } from "../../utils/providerRequestLogging.ts";

import { shouldSkipCredentialRefresh } from "../chatCore/skipCredentialRefresh.ts";

import {
  REASONING_BUFFER_MIN_TRIGGER,
  buildReasoningProbeTruncatedResponse,
  isEmptyContentUpstreamFailure,
  isTinyBudgetReasoningProbe,
  toPositiveInteger,
} from "../../services/reasoningTokenBuffer.ts";
import {
  buildErrorBody,
  createErrorResult,
  parseUpstreamError,
  formatProviderError,
  projectPublicErrorIdentifier,
  sanitizeErrorMessage,
  sanitizeUpstreamDetails,
} from "../../utils/error.ts";

import { HTTP_STATUS, ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE } from "../../config/constants.ts";
import { applyStatusRestatement } from "../../config/upstreamStatusRestatement.ts";

import { updateProviderConnection, getProviderConnectionById } from "@/lib/db/providers";
import { wasRefreshTokenRotated } from "@omniroute/open-sse/services/refreshSerializer.ts";

import {
  createSafeAbortError,
  createStreamingErrorResult,
  isSemaphoreCapacityError,
  getSafeErrorMetadata,
  getUpstreamErrorIdentifier,
} from "./streamErrorResult.ts";

import { getExecutionConnectionId } from "../chatCore/executionCredentials.ts";

import { prepareUpstreamBody } from "../chatCore/upstreamBody.ts";

import { logAuditEvent } from "@/lib/compliance";

import { trackPendingRequest, appendRequestLog } from "@/lib/usageDb";
import { updatePendingScope } from "@/lib/usage/pendingRequestScope";

import { normalizeExecutorResult } from "./upstreamTimeouts.ts";

import { getProviderCredentials, extractSessionAffinityKey } from "@/sse/services/auth";

import { updateFromHeaders, updateFromResponseBody } from "../../services/rateLimitManager.ts";
import * as localLimiterErrors from "../../services/rateLimitManager/errors.ts";
import { markBlocked as markAccountSemaphoreBlocked } from "../../services/accountSemaphore.ts";
import { lockModel, recordCoreOwnedAntigravityQuotaState } from "../../services/accountFallback.ts";

import {
  isModelUnavailableError,
  getNextFamilyFallback,
  isContextOverflowError,
  findLargerContextModel,
  getModelFamily,
} from "../../services/modelFamilyFallback.ts";

import { isLocalStreamLifecycleError } from "@/shared/utils/circuitBreaker";
import { shouldIsolateProbeFailures } from "@/shared/utils/probeOrigin";
import { writeTerminalStatus } from "@/shared/utils/terminalStatus";

/**
 * Core chat handler - shared between SSE and Worker
 * Returns { success, response, status, error } for caller to handle fallback
 * @param {object} options
 * @param {object} options.body - Request body
 * @param {object} options.modelInfo - { provider, model }
 * @param {object} options.credentials - Provider credentials
 * @param {object} options.log - Logger instance (optional)
 * @param {function} options.onCredentialsRefreshed - Callback when credentials are refreshed
 * @param {function} options.onRequestSuccess - Callback when request succeeds (to clear error status)
 * @param {function} options.onDisconnect - Callback when client disconnects
 * @param {string} options.connectionId - Connection ID for usage tracking
 * @param {object} options.apiKeyInfo - API key metadata for usage attribution
 * @param {string} options.userAgent - Client user agent for caching decisions
 * @param {string} options.comboName - Combo name if this is a combo request
 * @param {string} options.comboStrategy - Combo routing strategy (e.g., 'priority', 'cost-optimized')
 * @param {boolean} options.isCombo - Whether this request is from a combo
 * @param {string} options.connectionId - Connection ID for settings lookup
 */
// extractSystemRoleMessages extracted to chatCore/claudeSystemRole.ts (#3501); re-exported above so
// existing importers (e.g. tests/unit/system-role-extraction.test.ts) keep resolving it from here.

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- deps bag mirrors the barrel closure
type Loose = any;

export type StreamingDeps = Record<string, Loose>;

export async function runStreamingResponse(deps: StreamingDeps) {
  const {
    apiKeyInfo,
    persistAttemptLogs,
    buildUpstreamHeadersForExecute,
    resolveEffectiveServiceTier,
    clientResponseFormat,
    correlationId,
    extendedContext,
    executeProviderRequest,
    applyProviderFailureClassification,
    assertManagedLeaseFence,
    body,
    clientRawRequest,
    comboStrategy,
    connectionId,
    contextEditingEnabled,
    credentials,
    effectiveModel,
    executeRefreshCredentials,
    executor,
    getCurrentConnectionId,
    getExecutionCredentials,
    getExecutorClientHeaders,
    getManagedLeaseFenceErrorCode,
    handleCredentialsRefreshed,
    isCombo,
    isOpencodeClient,
    log,
    managedLease,
    managedLeaseFenceErrorResult,
    model,
    onCredentialsRefreshed,
    pendingConnId,
    pendingRequestId,
    pendingScope,
    persistFailureUsage,
    provider,
    providerRequestCapture,
    reqLogger,
    sessionAffinityKey,
    skillRequestId,
    sourceFormat,
    stream,
    streamController,
    syncExecuteTranslatedBody,
    targetFormat,
    triedModels,
    trustedEffortContext,
    upstreamStream,
    userAgent,
  } = deps;

  let claudePromptCacheLogMeta,
    currentModel,
    effectiveServiceTier,
    finalBody,
    pipelineRecovered,
    providerHeaders,
    providerResponse,
    providerUrl,
    translatedBody;

  claudePromptCacheLogMeta = deps.claudePromptCacheLogMeta;
  currentModel = deps.currentModel;
  effectiveServiceTier = deps.effectiveServiceTier;
  finalBody = deps.finalBody;
  pipelineRecovered = deps.pipelineRecovered;
  void effectiveServiceTier;
  providerHeaders = deps.providerHeaders;
  providerResponse = deps.providerResponse;
  providerUrl = deps.providerUrl;
  translatedBody = deps.translatedBody;
  try {
    const pipelineOutcome = await runProviderExecutionPipeline({
      policy: {
        allowAccountRotation: !managedLease && comboStrategy !== "context-relay",
        allowModelFallback: true,
        expectedConnectionId: managedLease
          ? String(getCurrentConnectionId() || connectionId || "") || undefined
          : undefined,
      },
      target: {
        provider,
        requestedModel: effectiveModel,
        sourceFormat,
        targetFormat,
        stream,
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
        setBodyAndModel: (body, model) => {
          translatedBody = body as typeof translatedBody;
          syncExecuteTranslatedBody(translatedBody);
          currentModel = model;
          triedModels.add(model);
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

    pipelineRecovered = true;
    currentModel = pipelineOutcome.model;
    if (pipelineOutcome.kind === "error") {
      providerResponse = pipelineOutcome.result.response;
      providerUrl = "";
      providerHeaders = normalizeHeaders(pipelineOutcome.result.response.headers);
      finalBody = translatedBody;
    } else {
      const result = {
        response: pipelineOutcome.response,
        url: pipelineOutcome.url,
        headers: pipelineOutcome.headers,
        transformedBody: pipelineOutcome.transformedBody,
      };
      providerResponse = result.response;
      providerUrl = result.url;
      providerHeaders = result.headers;
      finalBody = providerRequestCapture.body(result.transformedBody);
    }
    const responseConnectionId = getCurrentConnectionId();
    effectiveServiceTier = resolveEffectiveServiceTier(finalBody);
    claudePromptCacheLogMeta = buildClaudePromptCacheLogMeta(
      targetFormat,
      finalBody,
      providerHeaders,
      clientRawRequest?.headers
    );

    // Log target request (final request to provider)
    reqLogger.logTargetRequest(providerUrl, providerHeaders, finalBody);
    updatePendingScope(pendingScope, {
      providerRequest: finalBody,
      providerUrl,
      stage: "provider_response_started",
    });
    // Update rate limiter from response headers (learn limits dynamically)
    updateFromHeaders(
      provider,
      responseConnectionId,
      providerResponse.headers,
      providerResponse.status,
      model
    );

    // Store rate-limit headers for quota saturation signals
    try {
      const { storeRateLimitHeaders } = await import("@/lib/quota/saturationSignals");
      storeRateLimitHeaders(
        responseConnectionId,
        provider,
        providerResponse.headers as Record<string, string>
      );
    } catch {
      // fail-open: saturation signal is best-effort
    }
  } catch (error) {
    trackPendingRequest(model, provider, pendingConnId, false, undefined, pendingRequestId);
    const errorMetadata = getSafeErrorMetadata(error);
    const managedLeaseFenceCode = getManagedLeaseFenceErrorCode(errorMetadata.code);
    if (managedLeaseFenceCode)
      return {
        response: managedLeaseFenceErrorResult(managedLeaseFenceCode),
        carry: {
          translatedBody,
          currentModel,
          effectiveServiceTier,
          finalBody,
          pipelineRecovered,
          providerHeaders,
          providerResponse,
          providerUrl,
        },
      };
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
      const result = stream
        ? createStreamingErrorResult(HTTP_STATUS.RATE_LIMITED, failureMessage, semaphoreCode)
        : createErrorResult(HTTP_STATUS.RATE_LIMITED, failureMessage);
      return {
        response: {
          ...result,
          errorType: "account_semaphore_capacity",
          errorCode: semaphoreCode,
        },
        carry: {
          translatedBody,
          currentModel,
          effectiveServiceTier,
          finalBody,
          pipelineRecovered,
          providerHeaders,
          providerResponse,
          providerUrl,
        },
      };
    }
    // abort(reason) can reject with a raw string lacking `name`/`status`; classify
    // it through isLocalStreamLifecycleError so it maps to 499 rather than the
    // 502 provider-failure default.
    let isRequestAborted = errorMetadata.name === "AbortError";
    if (!isRequestAborted) {
      try {
        isRequestAborted = isLocalStreamLifecycleError(error);
      } catch {
        // A hostile Proxy must not escape the provider-error boundary during classification.
      }
    }
    // #8376: proxyFetch tags unreachable transport failures so they remain
    // distinguishable from ordinary provider 5xx responses.
    const isProxyUnreachableFailure =
      !isRequestAborted && errorMetadata.errorCode === "proxy_unreachable";
    const errorCode = errorMetadata.code;
    const localRateLimitFailure = localLimiterErrors.getClientSafeLocalRateLimitError(error);
    const failureStatus = isRequestAborted
      ? 499
      : isProxyUnreachableFailure
        ? HTTP_STATUS.BAD_GATEWAY
        : localRateLimitFailure
          ? localRateLimitFailure.status
          : errorMetadata.name === "TimeoutError" || errorMetadata.name === "BodyTimeoutError"
            ? HTTP_STATUS.GATEWAY_TIMEOUT
            : errorMetadata.status
              ? errorMetadata.status
              : HTTP_STATUS.BAD_GATEWAY;
    const failureMessage = isRequestAborted
      ? "Request aborted"
      : (() => {
          try {
            return formatProviderError(
              localRateLimitFailure ?? error,
              provider,
              model,
              failureStatus
            );
          } catch {
            // Formatting is diagnostic only; hostile rejection metadata falls back safely.
            return errorMetadata.message || "Upstream provider error";
          }
        })();
    const safeFailureMessage = sanitizeErrorMessage(failureMessage) || "Upstream provider error";
    const upstreamErrorCode =
      localRateLimitFailure?.code ?? (isProxyUnreachableFailure ? "proxy_unreachable" : errorCode);
    // Tag our own deadline timeouts (fetch-start TimeoutError / body BodyTimeoutError,
    // both surfaced as a 504) as "upstream_timeout" so the cooldown layer can tell a
    // slow-but-not-failed request apart from a real provider 5xx. (Antigravity already
    // tags its pre-response timeout via the code below.)
    const isOwnDeadlineTimeout =
      failureStatus === HTTP_STATUS.GATEWAY_TIMEOUT &&
      (errorMetadata.name === "TimeoutError" || errorMetadata.name === "BodyTimeoutError");
    const upstreamErrorType =
      upstreamErrorCode === ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE || isOwnDeadlineTimeout
        ? "upstream_timeout"
        : failureStatus === 401
          ? "authentication_error"
          : undefined;
    appendRequestLog({
      model,
      provider,
      connectionId,
      status: `FAILED ${failureStatus}`,
    }).catch(() => {});
    persistAttemptLogs({
      status: failureStatus,
      error: safeFailureMessage,
      providerRequest: finalBody || translatedBody,
      // On a client-abort (AbortError), the client already disconnected before
      // we ever got here — this body is what we WOULD have sent, not what was
      // actually delivered. Logging it as `clientResponse` is misleading (the
      // dashboard reads that field as "what the client received"), so omit it
      // for this case; `error` above already records the failure reason.
      clientResponse:
        errorMetadata.name === "AbortError"
          ? undefined
          : buildErrorBody(failureStatus, failureMessage),
      claudeCacheMeta: claudePromptCacheLogMeta,
      cacheSource: "upstream",
    });
    if (isRequestAborted) {
      streamController.handleError(createSafeAbortError());
      return {
        response: createErrorResult(499, "Request aborted"),
        carry: {
          translatedBody,
          currentModel,
          effectiveServiceTier,
          finalBody,
          pipelineRecovered,
          providerHeaders,
          providerResponse,
          providerUrl,
        },
      };
    }
    const persistentErrorCode = projectFailureUsageErrorCode({
      statusCode: failureStatus,
      message: failureMessage,
      errorCode: projectPublicErrorIdentifier(
        upstreamErrorCode || errorMetadata.name,
        "upstream_error"
      ),
      errorType: upstreamErrorType,
    });
    persistFailureUsage(failureStatus, persistentErrorCode);
    console.log(`${COLORS.red}[ERROR] ${safeFailureMessage}${COLORS.reset}`);
    if (stream && upstreamErrorCode) {
      const result = createStreamingErrorResult(
        failureStatus,
        failureMessage,
        upstreamErrorCode,
        upstreamErrorType
      );
      localLimiterErrors.markTrustedLocalRateLimitResponse(result.response, error);
      return {
        response: {
          ...result,
          errorType: upstreamErrorType,
          errorCode: upstreamErrorCode,
        },
        carry: {
          translatedBody,
          currentModel,
          effectiveServiceTier,
          finalBody,
          pipelineRecovered,
          providerHeaders,
          providerResponse,
          providerUrl,
        },
      };
    }
    const result = createErrorResult(
      failureStatus,
      failureMessage,
      null,
      upstreamErrorCode,
      upstreamErrorType
    );
    localLimiterErrors.markTrustedLocalRateLimitResponse(result.response, error);
    return {
      response: result,
      carry: {
        translatedBody,
        currentModel,
        effectiveServiceTier,
        finalBody,
        pipelineRecovered,
        providerHeaders,
        providerResponse,
        providerUrl,
      },
    };
  }
  let upstreamErrorParsed = false;
  let parsedStatusCode = providerResponse.status;
  let parsedMessage = "";
  let parsedRetryAfterMs: number | null = null;
  let upstreamErrorBody: unknown = null;

  // Track whether stream_options was present and stripped — if so, 401/403 after
  // that may be from the modification rather than a genuine auth failure, so we
  // skip the credential refresh attempt in that case.
  const hadStreamOptions =
    targetFormat === FORMATS.OPENAI_RESPONSES && "stream_options" in translatedBody;
  if (hadStreamOptions) {
    delete translatedBody.stream_options;
  }

  // Handle 401/403 - try token refresh using executor
  // T-PROBE: probe-origin failures never attempt the refresh — a probe must
  // not consume a rotating refresh token nor persist an "expired"
  // deactivation on refresh failure (#9817). The 401/403 then flows into
  // the normal providerFailure classification (record-only in probe mode).
  if (
    (providerResponse.status === HTTP_STATUS.UNAUTHORIZED ||
      providerResponse.status === HTTP_STATUS.FORBIDDEN) &&
    !hadStreamOptions && // Skip refresh if failure may be from stream_options removal, not auth
    !(await shouldIsolateProbeFailures()) &&
    !(await shouldSkipCredentialRefresh(provider, providerResponse))
  ) {
    // Fix A: wrap refreshCredentials in runWithOnPersist so the persist callback
    // executes INSIDE the per-connection mutex held by getAccessToken. This makes
    // [network refresh + DB write + outer-state mutation] one atomic step and
    // prevents concurrent requests from reading a stale refreshToken before the
    // DB has been updated (refresh_token_reused on Codex/OpenAI).
    //
    // Not every executor routes refresh through getAccessToken (e.g. github.ts
    // calls refreshCopilotToken directly). When the persistFn doesn't fire from
    // inside getAccessToken, we still need to do the credentials mutation + user
    // callback after refreshCredentials returns. The `persistFnRan` flag tracks
    // which path executed so we don't double-fire (race-prone) or skip (regression).
    // Front 3: remember the refresh_token we are about to present so that, if the
    // refresh fails as unrecoverable, we can tell a genuine death apart from a
    // stale-token reuse that a concurrent/sibling refresh already rotated past.
    const attemptedRefreshToken =
      typeof credentials?.refreshToken === "string" ? credentials.refreshToken : null;
    let persistFnRan = false;
    const persistFn = onCredentialsRefreshed
      ? async (refreshResult: Record<string, unknown>) => {
          persistFnRan = true;
          // Mutate the shared credentials object so subsequent executor calls
          // in this request see the new tokens. Runs INSIDE the mutex.
          Object.assign(credentials, refreshResult);
          await onCredentialsRefreshed(refreshResult);
        }
      : undefined;

    // #4038: build a compare-and-swap reread so getAccessToken can skip the persist if a
    // concurrent writer (sibling request / HealthCheck / replica) already rotated this
    // connection's refresh_token past the one we presented — overwriting would revert it
    // and revoke the token family. No connectionId ⇒ no guard (behavior unchanged).
    const casConnectionId =
      typeof credentials?.connectionId === "string" ? credentials.connectionId.trim() : "";
    const casReread = casConnectionId
      ? async () => {
          const latest = await getProviderConnectionById(casConnectionId);
          return typeof latest?.refreshToken === "string" ? latest.refreshToken : null;
        }
      : null;

    const newCredentials = (await refreshWithRetry(
      () =>
        runWithCasGuard(
          casReread ? { expectedRefreshToken: attemptedRefreshToken, reread: casReread } : null,
          () => runWithOnPersist(persistFn, () => executor.refreshCredentials(credentials, log))
        ),
      3,
      log,
      provider // Explicitly pass the provider to avoid universally tripping the "unknown" circuit breaker
    )) as null | {
      accessToken?: string;
      copilotToken?: string;
    };

    if (newCredentials?.accessToken || newCredentials?.copilotToken) {
      log?.info?.("TOKEN", `${provider?.toUpperCase()} | refreshed`);

      // Fall back to post-mutex mutation only for executors that don't route
      // through getAccessToken (and therefore never fire onPersist). For
      // executors that DO route through it (Codex, Claude, Gemini, etc.) the
      // mutation already happened atomically inside the mutex.
      if (!persistFnRan) {
        Object.assign(credentials, newCredentials);
        if (onCredentialsRefreshed) {
          await onCredentialsRefreshed(newCredentials);
        }
      }

      // Retry with new credentials — model + extra headers follow translatedBody.model so they
      // stay aligned if this block ever runs after a path that mutates body.model (e.g. fallback).
      try {
        const retryModelId = String(translatedBody.model || effectiveModel);
        const retryBody = await prepareUpstreamBody({
          translatedBody,
          modelToCall: retryModelId,
          ...trustedEffortContext,
          provider,
          targetFormat,
          credentials: getExecutionCredentials(),
          log,
          bypassDefaultToolLimit: isOpencodeClient,
          isOpencodeClient,
          rawBody: body,
          clientRawRequest,
        });
        assertManagedLeaseFence(getExecutionConnectionId(getExecutionCredentials()));
        const retryResult = normalizeExecutorResult(
          await runWithCapture(providerRequestCapture, () =>
            executor.execute({
              model: retryModelId,
              body: retryBody,
              stream: upstreamStream,
              credentials: getExecutionCredentials(),
              signal: streamController.signal,
              log,
              extendedContext,
              upstreamExtraHeaders: buildUpstreamHeadersForExecute(retryModelId),
              clientHeaders: getExecutorClientHeaders(),
              clientResponseFormat,
              onCredentialsRefreshed,
              skipUpstreamRetry: isCombo,
              contextEditing: { enabled: contextEditingEnabled },
              correlationId,
            })
          )
        );

        if (retryResult.response.ok) {
          providerResponse = retryResult.response;
          providerUrl = retryResult.url;
          providerHeaders = new Headers(retryResult.headers || {});
          finalBody = providerRequestCapture.body(retryResult.transformedBody);
          reqLogger.logTargetRequest(providerUrl, providerHeaders, finalBody);
          updatePendingScope(pendingScope, {
            providerRequest: finalBody,
            providerUrl,
            stage: "provider_response_started",
          });
          upstreamErrorParsed = false; // Reset since new response is OK
        } else {
          providerResponse = retryResult.response;
          upstreamErrorParsed = false; // Let it be parsed downstream
        }
      } catch (retryErr) {
        const retryLeaseFenceCode = getManagedLeaseFenceErrorCode(
          getUpstreamErrorIdentifier(retryErr)
        );
        if (retryLeaseFenceCode)
          return {
            response: managedLeaseFenceErrorResult(retryLeaseFenceCode),
            carry: {
              translatedBody,
              currentModel,
              effectiveServiceTier,
              finalBody,
              pipelineRecovered,
              providerHeaders,
              providerResponse,
              providerUrl,
            },
          };
        // Refresh succeeded but the retry leg failed (network blip, AbortError,
        // executor throw). Don't swallow — the operator-visible signal "the user
        // saw 401 even though auth was actually fixed" is much more confusing
        // than the original 401 alone. Surface at error level with sanitization.
        log?.error?.(
          "TOKEN",
          `${provider?.toUpperCase()} | retry after refresh failed: ${sanitizeErrorMessage(retryErr)}`
        );
      }
    } else {
      log?.warn?.("TOKEN", `${provider?.toUpperCase()} | refresh failed`);
      if (isUnrecoverableRefreshError(newCredentials) && onCredentialsRefreshed) {
        // Front 3 (reuse-race tolerance): before deactivating, re-read the DB.
        // If a sibling/concurrent refresh already rotated this connection's
        // refresh_token (common for Codex/OpenAI under one shared Auth0 client),
        // the failure we saw was a stale-token reuse — the account is healthy
        // with the newer token, so keep it active instead of killing it.
        let alreadyRotated = false;
        if (typeof connectionId === "string" && connectionId && attemptedRefreshToken) {
          try {
            const latest = await getProviderConnectionById(connectionId);
            if (wasRefreshTokenRotated(attemptedRefreshToken, latest?.refreshToken)) {
              alreadyRotated = true;
              log?.warn?.(
                "TOKEN",
                `${provider.toUpperCase()} | refresh_token already rotated by a concurrent refresh — keeping connection active`
              );
            }
          } catch {
            // DB read failed — fall through to the safe default (deactivate).
          }
        }
        if (!alreadyRotated) {
          await onCredentialsRefreshed({ testStatus: "expired", isActive: false });
        }
      }
    }
  }

  // Check provider response - return error info for fallback handling
  providerFailure: if (!providerResponse.ok) {
    trackPendingRequest(model, provider, pendingConnId, false, undefined, pendingRequestId);

    let statusCode = providerResponse.status;
    let message = "";
    let retryAfterMs: number | null = null;
    let upstreamErrorCode: string | undefined;
    let upstreamErrorType: string | undefined;

    if (upstreamErrorParsed) {
      statusCode = parsedStatusCode;
      message = parsedMessage;
      retryAfterMs = parsedRetryAfterMs;
    } else {
      const details = await parseUpstreamError(providerResponse, provider);
      statusCode = details.statusCode;
      message = details.message;
      retryAfterMs = details.retryAfterMs;
      upstreamErrorBody = details.responseBody;
      upstreamErrorCode = typeof details.errorCode === "string" ? details.errorCode : undefined;
      upstreamErrorType = typeof details.errorType === "string" ? details.errorType : undefined;
    }

    // Gateways like agentrouter misstate temporary quota exhaustion as 403/400,
    // which downstream classification treats as AUTH_ERROR and clients like
    // Claude Code treat as permanent. Restate to 429 (+ synthetic Retry-After)
    // BEFORE any classification so both the fallback engine and the surfaced
    // client status see a retryable error. Registry-scoped per provider.
    const restatement = applyStatusRestatement({
      provider,
      status: statusCode,
      message,
      body: upstreamErrorBody,
      retryAfterMs,
    });
    if (restatement.ruleId) {
      statusCode = restatement.status;
      retryAfterMs = restatement.retryAfterMs;
      log?.info?.(
        "STATUS_RESTATE",
        `${provider} ${restatement.fromStatus}→${statusCode} (${restatement.ruleId})`
      );
    }

    const signatureRecovery = pipelineRecovered
      ? { attempted: false, succeeded: false, execution: null, error: null, recoveryBody: null }
      : await recoverAnthropicThinkingSignature({
          provider,
          statusCode,
          message,
          body: translatedBody,
          execute: async (recoveryBody) => {
            translatedBody = recoveryBody as typeof translatedBody;
            syncExecuteTranslatedBody(translatedBody);
            return executeProviderRequest(currentModel, false);
          },
          parseError: (response) => parseUpstreamError(response, provider),
        });
    if (!pipelineRecovered && signatureRecovery.attempted && signatureRecovery.execution) {
      providerResponse = signatureRecovery.execution.response;
      if (signatureRecovery.succeeded) {
        providerUrl = signatureRecovery.execution.url;
        providerHeaders = signatureRecovery.execution.headers;
        finalBody = providerRequestCapture.body(signatureRecovery.execution.transformedBody);
        reqLogger.logTargetRequest(providerUrl, providerHeaders, finalBody);
        updatePendingScope(pendingScope, {
          providerRequest: finalBody,
          providerUrl,
          stage: "provider_response_started",
        });
        log?.info?.(
          "THINKING_SIGNATURE",
          `Recovered ${provider}/${currentModel} after one historical-thinking retry`
        );
      } else if (signatureRecovery.error) {
        statusCode = signatureRecovery.error.statusCode;
        message = signatureRecovery.error.message;
        retryAfterMs = signatureRecovery.error.retryAfterMs;
        upstreamErrorBody = signatureRecovery.error.responseBody;
        upstreamErrorCode =
          typeof signatureRecovery.error.errorCode === "string"
            ? signatureRecovery.error.errorCode
            : undefined;
        upstreamErrorType =
          typeof signatureRecovery.error.errorType === "string"
            ? signatureRecovery.error.errorType
            : undefined;
      }
    }

    if (signatureRecovery.succeeded) break providerFailure;

    // #10281 — tiny-budget reasoning probes (e.g. Claude Code's `/model` check
    // sends `max_tokens: 1`): the model burns the whole budget on thinking, and
    // some upstreams (e.g. api.cline.bot for deepseek-v4-flash) answer the empty
    // outcome with a 5xx ("empty response content") instead of a truncated 200.
    // Answer such probes with a valid truncated response rather than relaying the
    // upstream failure — which would also mark the connection unavailable and
    // poison fallback/cooldown bookkeeping for a request that is only a probe.
    if (
      !stream &&
      isTinyBudgetReasoningProbe({ model: currentModel, body: finalBody || translatedBody }) &&
      isEmptyContentUpstreamFailure(statusCode, message)
    ) {
      providerResponse = buildReasoningProbeTruncatedResponse({
        model: currentModel,
        maxTokens: toPositiveInteger(
          (finalBody || translatedBody)?.max_tokens ??
            (finalBody || translatedBody)?.max_completion_tokens
        ),
        requestId: skillRequestId,
      });
      log?.warn?.(
        "PROBE",
        `Reasoning probe (max_tokens < ${REASONING_BUFFER_MIN_TRIGGER}) answered with truncated 200 — upstream reported "${message}"`
      );
      break providerFailure;
    }

    const errorConnectionId = getCurrentConnectionId() || connectionId;
    await applyProviderFailureClassification({
      statusCode,
      message,
      headers: providerResponse.headers,
      upstreamErrorBody,
      retryAfterMs,
      targetModel: currentModel,
    });

    appendRequestLog({
      model,
      provider,
      connectionId: errorConnectionId,
      status: `FAILED ${statusCode}`,
    }).catch(() => {});

    const errMsg = formatProviderError(new Error(message), provider, model, statusCode);
    const safeErrMsg = sanitizeErrorMessage(errMsg) || "Upstream provider error";
    const safeUpstreamErrorBody = sanitizeUpstreamDetails(upstreamErrorBody);
    console.log(`${COLORS.red}[ERROR] ${safeErrMsg}${COLORS.reset}`);

    // Log Antigravity retry time if available
    if (retryAfterMs && provider === "antigravity") {
      const retrySeconds = Math.ceil(retryAfterMs / 1000);
      log?.debug?.("RETRY", `Antigravity quota reset in ${retrySeconds}s (${retryAfterMs}ms)`);
    }

    // Log error with full request body for debugging
    reqLogger.logError(new Error(message), finalBody || translatedBody);
    reqLogger.logProviderResponse(
      providerResponse.status,
      providerResponse.statusText,
      providerResponse.headers,
      safeUpstreamErrorBody
    );

    // Rate limiter updated in applyProviderFailureClassification

    // ── T5: Intra-family model fallback ──────────────────────────────────────
    // Before returning a model-unavailable error upstream, try sibling models
    // from the same family. This keeps the request alive on the same account
    // instead of failing the entire combo.
    if (!pipelineRecovered && isModelUnavailableError(statusCode, message, provider)) {
      const nextModel = getNextFamilyFallback(currentModel, triedModels, provider);
      if (nextModel) {
        triedModels.add(nextModel);
        currentModel = nextModel;
        translatedBody.model = nextModel;
        log?.info?.("MODEL_FALLBACK", `${model} unavailable (${statusCode}) → trying ${nextModel}`);
        // Re-execute with the fallback model
        try {
          const fallbackResult = await executeProviderRequest(nextModel, false);
          if (fallbackResult.response.ok) {
            providerResponse = fallbackResult.response;
            providerUrl = fallbackResult.url;
            providerHeaders = fallbackResult.headers;
            finalBody = providerRequestCapture.body(fallbackResult.transformedBody);
            reqLogger.logTargetRequest(providerUrl, providerHeaders, finalBody);
            updatePendingScope(pendingScope, {
              providerRequest: finalBody,
              providerUrl,
              stage: "provider_response_started",
            });
            // Continue processing with the fallback response — skip error return
            log?.info?.("MODEL_FALLBACK", `Serving ${nextModel} as fallback for ${model}`);
            // Jump to streaming/non-streaming handling below
            // We fall through by NOT returning here
          } else {
            // Fallback also failed — return original error
            persistAttemptLogs({
              status: statusCode,
              error: safeErrMsg,
              providerRequest: finalBody || translatedBody,
              providerResponse: safeUpstreamErrorBody,
              clientResponse: buildErrorBody(statusCode, errMsg),
              cacheSource: "upstream",
            });
            persistFailureUsage(statusCode, "model_unavailable");
            return {
              response: createErrorResult(
                statusCode,
                errMsg,
                retryAfterMs,
                upstreamErrorCode,
                upstreamErrorType,
                upstreamErrorBody,
                { passthrough: sourceFormat === FORMATS.CLAUDE }
              ),
              carry: {
                translatedBody,
                currentModel,
                effectiveServiceTier,
                finalBody,
                pipelineRecovered,
                providerHeaders,
                providerResponse,
                providerUrl,
              },
            };
          }
        } catch {
          persistAttemptLogs({
            status: statusCode,
            error: safeErrMsg,
            providerRequest: finalBody || translatedBody,
            providerResponse: safeUpstreamErrorBody,
            clientResponse: buildErrorBody(statusCode, errMsg),
            cacheSource: "upstream",
          });
          persistFailureUsage(statusCode, "model_unavailable");
          return {
            response: createErrorResult(
              statusCode,
              errMsg,
              retryAfterMs,
              upstreamErrorCode,
              upstreamErrorType,
              upstreamErrorBody,
              { passthrough: sourceFormat === FORMATS.CLAUDE }
            ),
            carry: {
              translatedBody,
              currentModel,
              effectiveServiceTier,
              finalBody,
              pipelineRecovered,
              providerHeaders,
              providerResponse,
              providerUrl,
            },
          };
        }
      } else {
        persistAttemptLogs({
          status: statusCode,
          error: safeErrMsg,
          providerRequest: finalBody || translatedBody,
          providerResponse: safeUpstreamErrorBody,
          clientResponse: buildErrorBody(statusCode, errMsg),
          cacheSource: "upstream",
        });
        persistFailureUsage(statusCode, "model_unavailable");
        return {
          response: createErrorResult(
            statusCode,
            errMsg,
            retryAfterMs,
            upstreamErrorCode,
            upstreamErrorType,
            upstreamErrorBody,
            { passthrough: sourceFormat === FORMATS.CLAUDE }
          ),
          carry: {
            translatedBody,
            currentModel,
            effectiveServiceTier,
            finalBody,
            pipelineRecovered,
            providerHeaders,
            providerResponse,
            providerUrl,
          },
        };
      }
    } else if (isContextOverflowError(statusCode, message)) {
      const familyCandidates = getModelFamily(currentModel, provider).filter(
        (m) => m !== currentModel && !triedModels.has(m)
      );
      const nextModel =
        findLargerContextModel(currentModel, familyCandidates, provider) ??
        getNextFamilyFallback(currentModel, triedModels, provider);
      if (nextModel) {
        triedModels.add(nextModel);
        currentModel = nextModel;
        translatedBody.model = nextModel;
        log?.info?.("CONTEXT_OVERFLOW_FALLBACK", `${model} context overflow → trying ${nextModel}`);
        try {
          const fallbackResult = await executeProviderRequest(nextModel, false);
          if (fallbackResult.response.ok) {
            providerResponse = fallbackResult.response;
            providerUrl = fallbackResult.url;
            providerHeaders = fallbackResult.headers;
            finalBody = providerRequestCapture.body(fallbackResult.transformedBody);
            reqLogger.logTargetRequest(providerUrl, providerHeaders, finalBody);
            updatePendingScope(pendingScope, {
              providerRequest: finalBody,
              providerUrl,
              stage: "provider_response_started",
            });
            log?.info?.(
              "CONTEXT_OVERFLOW_FALLBACK",
              `Serving ${nextModel} as fallback for ${model}`
            );
          } else {
            persistAttemptLogs({
              status: statusCode,
              error: safeErrMsg,
              providerRequest: finalBody || translatedBody,
              providerResponse: safeUpstreamErrorBody,
              clientResponse: buildErrorBody(statusCode, errMsg),
              cacheSource: "upstream",
            });
            persistFailureUsage(statusCode, "context_overflow");
            return {
              response: createErrorResult(
                statusCode,
                errMsg,
                retryAfterMs,
                upstreamErrorCode,
                upstreamErrorType,
                upstreamErrorBody,
                { passthrough: sourceFormat === FORMATS.CLAUDE }
              ),
              carry: {
                translatedBody,
                currentModel,
                effectiveServiceTier,
                finalBody,
                pipelineRecovered,
                providerHeaders,
                providerResponse,
                providerUrl,
              },
            };
          }
        } catch {
          persistAttemptLogs({
            status: statusCode,
            error: safeErrMsg,
            providerRequest: finalBody || translatedBody,
            providerResponse: safeUpstreamErrorBody,
            clientResponse: buildErrorBody(statusCode, errMsg),
            cacheSource: "upstream",
          });
          persistFailureUsage(statusCode, "context_overflow");
          return {
            response: createErrorResult(
              statusCode,
              errMsg,
              retryAfterMs,
              upstreamErrorCode,
              upstreamErrorType,
              upstreamErrorBody,
              { passthrough: sourceFormat === FORMATS.CLAUDE }
            ),
            carry: {
              translatedBody,
              currentModel,
              effectiveServiceTier,
              finalBody,
              pipelineRecovered,
              providerHeaders,
              providerResponse,
              providerUrl,
            },
          };
        }
      } else {
        persistAttemptLogs({
          status: statusCode,
          error: safeErrMsg,
          providerRequest: finalBody || translatedBody,
          providerResponse: safeUpstreamErrorBody,
          clientResponse: buildErrorBody(statusCode, errMsg),
          cacheSource: "upstream",
        });
        persistFailureUsage(statusCode, "context_overflow");
        return {
          response: createErrorResult(
            statusCode,
            errMsg,
            retryAfterMs,
            upstreamErrorCode,
            upstreamErrorType,
            upstreamErrorBody,
            { passthrough: sourceFormat === FORMATS.CLAUDE }
          ),
          carry: {
            translatedBody,
            currentModel,
            effectiveServiceTier,
            finalBody,
            pipelineRecovered,
            providerHeaders,
            providerResponse,
            providerUrl,
          },
        };
      }
    } else {
      persistAttemptLogs({
        status: statusCode,
        error: safeErrMsg,
        providerRequest: finalBody || translatedBody,
        providerResponse: safeUpstreamErrorBody,
        clientResponse: buildErrorBody(statusCode, errMsg),
        cacheSource: "upstream",
      });
      persistFailureUsage(statusCode, `upstream_${statusCode}`);

      // Emergency budget fallback is orchestrated exclusively by the routing layer
      // (src/sse/handlers/chat.ts), which resolves credentials FOR the emergency
      // provider through account selection. The executor-level hop that used to
      // live here re-sent the FAILING provider's credentials to the emergency
      // provider's endpoint (e.g. the OpenAI API key to integrate.api.nvidia.com)
      // — a cross-provider credential leak that also never succeeded upstream.
      return {
        response: createErrorResult(
          statusCode,
          errMsg,
          retryAfterMs,
          upstreamErrorCode,
          upstreamErrorType,
          upstreamErrorBody,
          { passthrough: sourceFormat === FORMATS.CLAUDE }
        ),
        carry: {
          translatedBody,
          currentModel,
          effectiveServiceTier,
          finalBody,
          pipelineRecovered,
          providerHeaders,
          providerResponse,
          providerUrl,
        },
      };
    }
    // ── End T5 ───────────────────────────────────────────────────────────────
  }
  return {
    carry: {
      translatedBody,
      currentModel,
      effectiveServiceTier,
      finalBody,
      pipelineRecovered,
      providerHeaders,
      providerResponse,
      providerUrl,
    },
  };
}
