/**
 * Wire send for one provider attempt. Lifted from handleChatCore so the
 * orchestrator no longer nests the sender.
 */

import type { ChatCoreExecutorResult as PipelineChatCoreExecutorResult } from "./providerExecutionPipeline.ts";
import type { AgentGoalPolicy } from "../../utils/agentGoalPolicy.ts";
import type { BaseExecutor } from "../../executors/base.ts";
import { prepareUpstreamBody } from "./upstreamBody.ts";
import { getExecutionConnectionId } from "./executionCredentials.ts";
import {
  resolveAccountSemaphoreKey,
  resolveAccountSemaphoreMaxConcurrency,
} from "./executorHelpers.ts";
import {
  materializeDeduplicatedExecutionResult,
  stripNextMiddlewareControlHeaders,
  stripStaleForwardingHeaders,
} from "./responseHeaders.ts";
import { readNonStreamingResponseBody } from "./nonStreamingResponseBody.ts";
import { wrapReadableStreamWithFinalize } from "./streamFinalize.ts";
import { buildExecutorClientHeaders } from "./executorClientHeaders.ts";
import {
  normalizeExecutorResult,
  executeWithUpstreamStartTimeout,
  resolveConnectionTimeoutMs,
} from "./upstreamTimeouts.ts";
import { getCodexClientSessionId } from "../../config/codexIdentity.ts";
import {
  noteCodexTurnStateProvenance,
  readCodexTurnStateHeader,
} from "../../config/codexTurnState.ts";
import { HTTP_STATUS, STREAM_RECOVERY } from "../../config/constants.ts";
import { createRecoverableStream, makeContinuationBody } from "../../services/streamRecovery.ts";
import { persistCodexChildQuotaResponse } from "../../services/codexAccount/index.ts";
import { invalidateCodexQuotaCache } from "../../services/codexQuotaFetcher.ts";
import { invalidateGenericQuotaCacheOnStatus } from "../../services/genericQuotaFetcher.ts";
import {
  withRateLimit,
  resolveRequestQueueMaxWaitMs,
} from "../../services/rateLimitManager.ts";
import { acquireMany as acquireConcurrencyGates } from "../../services/accountSemaphore.ts";
import {
  rethrowAdmissionError,
  remainingQueueBudgetMs,
} from "./queueBudget.ts";
import { deduplicate } from "../../services/requestDedup.ts";
import {
  classifyModelScope429,
  getModelScopeRetryDelayMs,
} from "../../services/modelscopePolicy.ts";
import { incrementRequestCount } from "../../services/geminiRateLimitTracker.ts";
import { normalizeHeaders } from "../../utils/headers.ts";
import { runWithCapture } from "../../utils/providerRequestLogging.ts";
import type { Capture } from "../../utils/providerRequestLogging.ts";
import {
  resolveResilienceSettings,
  isStreamRecoveryExplicitlyConfigured,
  type ResilienceSettings,
} from "@/lib/resilience/settings";
import { updatePendingScope, type PendingRequestScope } from "@/lib/usage/pendingRequestScope";
import { shouldIsolateProbeFailures } from "@/shared/utils/probeOrigin";
import { resolveProviderId } from "@/shared/constants/providers";

export type ChatCoreExecutorResult = PipelineChatCoreExecutorResult & {
  _dedupSnapshot?: {
    status: number;
    statusText: string;
    headers: [string, string][];
    payload: string;
  };
};

export type ExecuteProviderRequestDeps = {
  agentGoalPolicy: AgentGoalPolicy;
  assertManagedLeaseFence: (attemptConnectionId: string | null | undefined) => void;
  buildUpstreamHeadersForExecute: (modelToCall: string) => Record<string, string>;
  clientRawRequest: {
    headers?: Headers | Record<string, unknown> | null;
    signal?: AbortSignal | null | undefined;
  };
  clientResponseFormat: string | null | undefined;
  connectionId: string | null | undefined;
  correlationId: string | null | undefined;
  contextEditingEnabled?: boolean;
  credentials: Record<string, unknown> | null | undefined;
  dedupEnabled: boolean;
  dedupHash: string | null;
  effectiveModel: string;
  executor: Pick<BaseExecutor, "execute">;
  extendedContext?: boolean;
  getExecutionCredentials: () => Record<string, unknown>;
  isModelScope: boolean;
  isOpencodeClient: boolean;
  log:
    | {
        debug?: (...args: unknown[]) => void;
        info?: (...args: unknown[]) => void;
        warn?: (...args: unknown[]) => void;
        error?: (...args: unknown[]) => void;
      }
    | null
    | undefined;
  model: string;
  onCredentialsRefreshed:
    ((next: Record<string, unknown>) => void | Promise<void>) | null | undefined;
  pendingScope: PendingRequestScope;
  provider: string;
  providerRequestCapture: Capture;
  recordKeyHealthStatus: (...args: unknown[]) => void;
  requestedModel: string;
  resilienceSettings: ResilienceSettings;
  settings: Record<string, unknown> | null | undefined;
  skipUpstreamRetry: boolean;
  stream: boolean;
  streamController: { signal: AbortSignal };
  targetFormat: string;
  trace: (label: string, extra?: Record<string, unknown>) => void;
  traceId: string;
  translatedBody: Record<string, unknown>;
  upstreamStream: boolean;
  userAgent: string | undefined;
};

export async function executeProviderRequest(
  deps: ExecuteProviderRequestDeps,
  modelToCall: string = deps.effectiveModel,
  allowDedup: boolean = false
): Promise<ChatCoreExecutorResult> {
  const {
    agentGoalPolicy,
    assertManagedLeaseFence,
    buildUpstreamHeadersForExecute,
    clientRawRequest,
    clientResponseFormat,
    connectionId,
    correlationId,
    contextEditingEnabled,
    credentials,
    dedupEnabled,
    dedupHash,
    executor,
    extendedContext,
    getExecutionCredentials,
    isModelScope,
    isOpencodeClient,
    log,
    model,
    onCredentialsRefreshed,
    pendingScope,
    provider,
    providerRequestCapture,
    recordKeyHealthStatus,
    requestedModel,
    resilienceSettings,
    settings,
    skipUpstreamRetry,
    stream,
    streamController,
    targetFormat,
    trace,
    traceId,
    translatedBody,
    upstreamStream,
    userAgent,
  } = deps;
  const execute = async () => {
    // Upstream body preparation extracted to chatCore/upstreamBody.ts (#3501 -- first internal
    // sub-slice of executeProviderRequest); produces the body sent upstream (payload rules +
    // tool-limit truncation + prompt_cache_key injection).
    let bodyToSend = await prepareUpstreamBody({
      translatedBody,
      modelToCall,
      provider,
      targetFormat,
      credentials,
      log,
      bypassDefaultToolLimit: isOpencodeClient,
      isOpencodeClient,
    });

    updatePendingScope(pendingScope, {
      providerRequest: bodyToSend,
      stage: "payload_prepared",
    });

    let releaseRawResultAccountSemaphore = () => {};
    try {
      const rawResult: ChatCoreExecutorResult = await (async () => {
        let attempts = 0;
        const isModelScopeForRequest = isModelScope;
        const maxAttempts = isModelScopeForRequest ? 3 : provider === "codex" ? 3 : 1;

        while (attempts < maxAttempts) {
          trace("pre_executor", { attempt: attempts });
          updatePendingScope(pendingScope, {
            stage: "sending_to_provider",
          });
          const execCreds = getExecutionCredentials();
          const executionConnectionId = getExecutionConnectionId(execCreds);
          const attemptConnectionId = executionConnectionId || connectionId;
          const accountSemaphoreMaxConcurrency = resolveAccountSemaphoreMaxConcurrency(execCreds);
          const accountSemaphoreKey = resolveAccountSemaphoreKey({
            provider,
            model: modelToCall,
            connectionId: attemptConnectionId,
            credentials: execCreds,
          });
          const canonicalProviderKey = resolveProviderId(String(provider).trim().toLowerCase());
          const providerConcurrency =
            resilienceSettings.providerQuotaOverrides[canonicalProviderKey]?.providerConcurrency ??
            0;

          trace("pre_semaphore", {
            semaphoreKey: accountSemaphoreKey,
            max: accountSemaphoreMaxConcurrency,
          });
          if (accountSemaphoreKey && accountSemaphoreMaxConcurrency != null) {
            updatePendingScope(pendingScope, {
              stage: "waiting_account_slot",
            });
          }
          const maxWaitMs = resolveRequestQueueMaxWaitMs(
      provider,
      undefined,
      attemptConnectionId ?? undefined
    );
    const gateStartedAt = Date.now();
    const releaseAccountSemaphore = await acquireConcurrencyGates(
      [
        {
          key: "global",
          maxConcurrency: resilienceSettings.requestQueue.globalConcurrentRequests,
        },
        {
          key: `provider:${canonicalProviderKey}`,
          maxConcurrency: providerConcurrency,
        },
        {
          key: accountSemaphoreKey || "",
          maxConcurrency: accountSemaphoreKey ? accountSemaphoreMaxConcurrency : null,
        },
      ],
      {
        timeoutMs: maxWaitMs,
        maxQueueSize: resilienceSettings.requestQueue.maxQueueDepth,
        signal: streamController.signal,
      }
    ).catch(rethrowAdmissionError);
    const remainingAfterGate = remainingQueueBudgetMs(maxWaitMs, gateStartedAt);
    trace("post_semaphore", { maxWaitMs, remainingAfterGate });
          updatePendingScope(pendingScope, {
            stage: "waiting_rate_limit",
          });

          try {
            trace("pre_rate_limit", { connectionId: attemptConnectionId });
            const rawExecutorResult = await withRateLimit(
              provider,
              attemptConnectionId,
              modelToCall,
              async () => {
                trace("inside_rate_limit", { connectionId: attemptConnectionId });
                updatePendingScope(pendingScope, {
                  stage: "rate_limit_slot_acquired",
                });
                assertManagedLeaseFence(attemptConnectionId);
                return executeWithUpstreamStartTimeout({
                  executor,
                  provider,
                  model: modelToCall,
                  connectionTimeoutMs: resolveConnectionTimeoutMs(execCreds?.providerSpecificData),
                  signal: streamController.signal,
                  log,
                  execute: (signal) =>
                    runWithCapture(providerRequestCapture, () =>
                      executor.execute({
                        model: modelToCall,
                        body: bodyToSend,
                        stream: upstreamStream,
                        credentials: execCreds,
                        signal,
                        log,
                        extendedContext,
                        upstreamExtraHeaders: buildUpstreamHeadersForExecute(modelToCall),
                        clientHeaders: buildExecutorClientHeaders(
                          clientRawRequest?.headers,
                          userAgent
                        ),
                        clientResponseFormat,
                        onCredentialsRefreshed,
                        skipUpstreamRetry,
                        contextEditing: { enabled: contextEditingEnabled },
                      })
                    ),
                });
              },
              streamController.signal,
              remainingAfterGate,
              correlationId ?? undefined,
              {
                executor: executor as { getTimeoutMs?: () => unknown },
                providerSpecificData: execCreds?.providerSpecificData,
              }
            );
            const res = normalizeExecutorResult(rawExecutorResult);
            trace("post_executor", { status: res?.response?.status });

            if (
              provider === "codex" &&
              attemptConnectionId &&
              !(await shouldIsolateProbeFailures())
            ) {
              try {
                const persistedQuota = await persistCodexChildQuotaResponse({
                  connectionId: String(attemptConnectionId),
                  model: modelToCall || model || requestedModel || "",
                  headers: normalizeHeaders(res.response.headers),
                  status: res.response.status,
                });
                if (persistedQuota) {
                  execCreds.providerSpecificData = persistedQuota.providerSpecificData;
                  if (persistedQuota.exhaustionLog) {
                    log?.debug?.("CODEX", persistedQuota.exhaustionLog);
                  }
                }
                if (res.response.status === 429) {
                  invalidateCodexQuotaCache(String(attemptConnectionId));
                }
              } catch (err) {
                const errMessage = err instanceof Error ? err.message : String(err);
                log?.debug?.("CODEX", `Failed to persist codex quota state: ${errMessage}`);
              }
            } else if (attemptConnectionId && res.response.status === 429) {
              // Dropped generic quota cache after 429
              invalidateGenericQuotaCacheOnStatus({
                provider,
                connectionId: String(attemptConnectionId),
                status: res.response.status,
                isolateProbe: await shouldIsolateProbeFailures(),
              });
            }

            // Track Gemini RPM + RPD request counts for 429 classification
            if (provider === "gemini") {
              incrementRequestCount(modelToCall);
            }

            updatePendingScope(pendingScope, {
              stage: "provider_response_started",
            });

            if (
              stream &&
              (res.response.ok ||
                res.response.status === HTTP_STATUS.UNAUTHORIZED ||
                res.response.status === HTTP_STATUS.FORBIDDEN) &&
              executionConnectionId &&
              !(await shouldIsolateProbeFailures())
            ) {
              const failureDetail = res.response.ok
                ? ""
                : await res.response
                    .clone()
                    .text()
                    .catch(() => "");
              recordKeyHealthStatus(res.response.status, execCreds, res.transport, failureDetail);
            }

            if (isModelScope && res.response.status === 429 && attempts < maxAttempts - 1) {
              const bodyPeek = await res.response
                .clone()
                .text()
                .catch(() => "");
              const normalizedHeaders = normalizeHeaders(res.response.headers);
              const decision = classifyModelScope429(bodyPeek, normalizedHeaders);
              if (decision.retryable) {
                const delay = getModelScopeRetryDelayMs(normalizedHeaders, attempts);
                log?.warn?.(
                  "MODELSCOPE_RETRY",
                  `429 ${decision.kind}; retrying in ${delay}ms (model remaining: ${decision.snapshot.modelRemaining ?? "unknown"})`
                );
                releaseAccountSemaphore();
                await new Promise((r) => setTimeout(r, delay));
                attempts++;
                continue;
              }
            }

            // For streaming: release the semaphore when the client drains or cancels the stream.
            // Non-2xx streams must drop the slot before returning so the pipeline can rotate
            // accounts without holding the failed connection's concurrency gate. Do NOT
            // cancel() the body here -- the pipeline clones it (BYOP 422 / toOutcome).
            if (stream) {
              const originalBody = res.response.body;
              const okStatus = res.response.status >= 200 && res.response.status < 300;
              if (!originalBody || !okStatus) {
                releaseAccountSemaphore();
                return {
                  ...res,
                  _executionCredentials: execCreds,
                };
              }

              // Opt-in transparent stream recovery (free-claude-code port, default OFF).
              // Only engages for a successful (2xx) stream -- an error body must never be
              // held or replayed. Setting is read once here from the cached resolved
              // resilience settings; the default path is byte-for-byte unchanged.
              let streamRecoveryEnabled = false;
              let continueMidStreamEnabled = false;
              let throughputWatchdog =
                resolveResilienceSettings(null).streamRecovery.throughputWatchdog;
              if (okStatus) {
                try {
                  // Reuse the request-consolidated settings read (see line ~2076) -- no
                  // second DB/cache hit. Default OFF when the setting is absent.
                  const sr = resolveResilienceSettings(settings).streamRecovery;
                  // Fail-closed: the agent-goal-policy heuristic may only ADD recovery
                  // when the operator has no explicit configuration. If the operator
                  // explicitly configured stream recovery (env var or DB/settings
                  // override), that value always wins -- the goal policy must never
                  // re-enable recovery the operator explicitly turned off.
                  const operatorExplicit = isStreamRecoveryExplicitlyConfigured(settings);
                  const goalOverride = !operatorExplicit && agentGoalPolicy.streamRecoveryEnabled;
                  streamRecoveryEnabled = sr.enabled || goalOverride;
                  continueMidStreamEnabled = sr.continueMidStream === true;
                  throughputWatchdog = sr.throughputWatchdog;
                  if (goalOverride && !sr.enabled) {
                    log?.info?.(
                      "AGENT_GOAL",
                      `agentGoalPolicy override: stream recovery enabled for goal request requestId=${traceId} model=${modelToCall || model || requestedModel || "unknown"}`
                    );
                  }
                } catch {
                  streamRecoveryEnabled = false;
                  continueMidStreamEnabled = false;
                  throughputWatchdog =
                    resolveResilienceSettings(null).streamRecovery.throughputWatchdog;
                }
              }

              let clientBody: ReadableStream<Uint8Array>;
              if (streamRecoveryEnabled || throughputWatchdog.enabled) {
                // Run the SAME upstream (same account/creds) with a given body and return
                // its 2xx stream, or null. Used both by the early-retry re-open (same body)
                // and the mid-stream continuation (assistant-prefilled body).
                const runUpstreamStream = async (
                  body: unknown
                ): Promise<ReadableStream<Uint8Array> | null> => {
                  try {
                    assertManagedLeaseFence(attemptConnectionId);
                    const retryRaw = await executeWithUpstreamStartTimeout({
                      executor,
                      provider,
                      model: modelToCall,
                      connectionTimeoutMs: resolveConnectionTimeoutMs(
                        execCreds?.providerSpecificData
                      ),
                      signal: streamController.signal,
                      log,
                      execute: (signal) =>
                        runWithCapture(providerRequestCapture, () =>
                          executor.execute({
                            model: modelToCall,
                            body,
                            stream: upstreamStream,
                            credentials: execCreds,
                            signal,
                            log,
                            extendedContext,
                            upstreamExtraHeaders: buildUpstreamHeadersForExecute(modelToCall),
                            clientHeaders: buildExecutorClientHeaders(
                              clientRawRequest?.headers,
                              userAgent
                            ),
                            clientResponseFormat,
                            onCredentialsRefreshed,
                            skipUpstreamRetry,
                            contextEditing: { enabled: contextEditingEnabled },
                          })
                        ),
                    });
                    const retryRes = normalizeExecutorResult(retryRaw);
                    const retryOk =
                      retryRes.response.status >= 200 && retryRes.response.status < 300;
                    if (retryOk && retryRes.response.body) {
                      return retryRes.response.body as ReadableStream<Uint8Array>;
                    }
                    await retryRes.response.body?.cancel().catch(() => {});
                    return null;
                  } catch {
                    return null;
                  }
                };

                // Mid-stream continuation (Fase 4.4): re-request with the partial text as an
                // assistant prefill. Gated by its own setting and only for OpenAI-compatible
                // bodies (makeContinuationBody returns null otherwise).
                const continueStream = continueMidStreamEnabled
                  ? (assistantSoFar: string) => {
                      const continuationBody = makeContinuationBody(
                        bodyToSend as Record<string, unknown>,
                        assistantSoFar
                      );
                      return continuationBody
                        ? runUpstreamStream(continuationBody)
                        : Promise.resolve(null);
                    }
                  : undefined;

                clientBody = createRecoverableStream(
                  originalBody as ReadableStream<Uint8Array>,
                  () => runUpstreamStream(bodyToSend),
                  {
                    finalize: releaseAccountSemaphore,
                    onRetry: (attempt, err) =>
                      log?.warn?.(
                        "STREAM_RECOVERY",
                        `transparent early-retry ${attempt}/${STREAM_RECOVERY.EARLY_RETRY_MAX} after ${
                          (err as { name?: string })?.name || "truncation"
                        }`
                      ),
                    continueStream,
                    onContinue: (attempt) =>
                      log?.warn?.(
                        "STREAM_RECOVERY",
                        `mid-stream continuation attempt ${attempt}/${STREAM_RECOVERY.EARLY_RETRY_MAX}`
                      ),
                    throughputWatchdog,
                    onWatchdogAbort: () =>
                      log?.warn?.(
                        "STREAM_WATCHDOG",
                        "active upstream stream stayed below the configured useful-output rate"
                      ),
                  }
                );
              } else {
                clientBody = wrapReadableStreamWithFinalize(originalBody, releaseAccountSemaphore);
              }

              return {
                ...res,
                _executionCredentials: execCreds,
                response: new Response(clientBody, {
                  status: res.response.status,
                  statusText: res.response.statusText,
                  headers: new Headers(normalizeHeaders(res.response.headers)),
                }),
              };
            }

            return {
              ...res,
              _executionCredentials: execCreds,
              _accountSemaphoreRelease: releaseAccountSemaphore,
            };
          } catch (error) {
            releaseAccountSemaphore();
            throw error;
          }
        }
      })();

      if (stream) {
        return rawResult;
      }

      // Non-stream: release semaphore immediately after reading full response body.
      const status = rawResult.response.status;

      releaseRawResultAccountSemaphore =
        typeof rawResult._accountSemaphoreRelease === "function"
          ? rawResult._accountSemaphoreRelease
          : () => {};

      const statusText = rawResult.response.statusText;
      const headersObj = normalizeHeaders(rawResult.response.headers);
      const responseHeaders = new Headers(headersObj);
      stripStaleForwardingHeaders(responseHeaders);
      stripNextMiddlewareControlHeaders(responseHeaders);
      // The upstream headers (turn-state included) are about to be committed
      // to the client -- record which connection minted the blob so a later
      // cross-account echo can be stripped (Codex failover guard).
      if (provider === "codex" && readCodexTurnStateHeader(responseHeaders)) {
        noteCodexTurnStateProvenance(
          getCodexClientSessionId(clientRawRequest?.headers),
          rawResult._executionCredentials?.connectionId ?? credentials?.connectionId
        );
      }
      const contentType = (responseHeaders.get("content-type") || "").toLowerCase();
      const payload = await readNonStreamingResponseBody(
        rawResult.response,
        contentType,
        upstreamStream
      );
      // Use the exact execution credential selected for this request. Model capability
      // failures stay in routing telemetry; authoritative success only recovers this key.
      if (
        rawResult._executionCredentials?.connectionId &&
        (rawResult._executionCredentials.apiKey || rawResult._executionCredentials.accessToken)
      ) {
        recordKeyHealthStatus(
          status,
          rawResult._executionCredentials,
          rawResult.transport,
          status >= 400 ? payload : ""
        );
      }
      releaseRawResultAccountSemaphore();
      releaseRawResultAccountSemaphore = () => {};

      return {
        ...rawResult,
        response: new Response(payload, { status, statusText, headers: responseHeaders }),
        _dedupSnapshot: {
          status,
          statusText,
          headers: (() => {
            const arr: [string, string][] = [];
            responseHeaders.forEach((v, k) => arr.push([k, v]));
            return arr;
          })(),
          payload,
        },
      };
    } catch (error) {
      releaseRawResultAccountSemaphore();
      throw error;
    }
  };

  if (allowDedup && dedupEnabled && dedupHash) {
    const dedupResult = await deduplicate(dedupHash, execute);
    if (dedupResult.wasDeduplicated) {
      log?.debug?.("DEDUP", `Joined in-flight request hash=${dedupHash}`);
    }
    return materializeDeduplicatedExecutionResult(
      dedupResult.result as unknown as Record<string, unknown>
    ) as unknown as ChatCoreExecutorResult;
  }

  return execute();
}
