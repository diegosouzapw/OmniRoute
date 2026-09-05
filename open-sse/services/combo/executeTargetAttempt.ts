/**
 * Retry loop for a combo target that already passed pre-dispatch gates.
 * Lift-as-is from combo.ts:1533–2616. Classify helpers live in
 * executeTargetClassify.ts. Pin/LKGP side effects go through deps.
 *
 * @internal — not part of the public combo.ts barrel.
 */
import {
  checkFallbackError,
  classifyLockoutReason,
  decayModelFailureCount,
  hasPerModelQuota,
  isModelLocked,
  lockModelIfPerModelQuota,
  recordModelLockoutFailure,
  recordProviderFailure,
  recordProviderSuccess,
  retryHintBypassesMaxCooldownMs,
  selectLockoutCooldownMs,
} from "../accountFallback.ts";
import { errorResponse, errorResponseWithComboDiagnostics } from "../../utils/error.ts";
import { recordComboFailure, clearComboFailureTracking } from "./failureTracker.ts";
import { buildRecoveryHint } from "./pinRecovery.ts";
import { formatExhaustedConnectionKey } from "./comboDiagFormat.ts";
import { recordComboRequest, getComboMetrics } from "../comboMetrics.ts";
import {
  expandComboSystemPromptIfPresent,
  resolveTargetFingerprint,
} from "../comboAgentMiddleware.ts";
import {
  maybeGenerateHandoff,
  maybeGenerateUniversalHandoff,
  injectUniversalHandoffBody,
  SKIP_UNIVERSAL_HANDOFF_FLAG,
  DEFAULT_UNIVERSAL_HANDOFF_CONFIG,
  type MessageLike,
} from "../contextHandoff.ts";
import {
  recordSessionModelUsage,
  getLastSessionModel,
  getHandoff,
} from "../../../src/lib/db/contextHandoffs.ts";
import { resolveModelLockoutSettings } from "../../../src/lib/resilience/modelLockoutSettings";
import { fetchCodexQuota } from "../codexQuotaFetcher.ts";
import { emit } from "../../../src/lib/events/eventBus";
import { notifyWebhookEvent } from "../../../src/lib/webhookDispatcher";
import { getSessionConnection } from "../sessionManager.ts";
import { recordStickyBinding } from "./sessionStickiness.ts";
import { recordStickyWeightedSuccess } from "./rrState.ts";
import { resolveReasoningBufferedMaxTokens, toPositiveInteger } from "../reasoningTokenBuffer.ts";
import { parseModel } from "../model.ts";
import type { ProviderProfile } from "../accountFallback.ts";
import {
  MAX_FALLBACK_WAIT_MS,
  clampGlobalAttempts,
  shouldSkipForPredictedTtft,
  shouldRecordProviderBreakerFailure,
  isComboRequestScopedFailure as isScopedFailure,
  isStreamReadinessFailureErrorBody,
  isStreamEarlyEofErrorBody,
  isTokenLimitBreachErrorBody,
  isLocalQueueCapacityErrorBody,
  toRecordedTarget,
  resolveDelayMs,
  resolvePersistedConnectionCooldownSkipReason,
  isModelScoped400,
} from "./comboPredicates.ts";
import { applyComboTargetExhaustion } from "./targetExhaustion.ts";
import { pinNativeCodexTurn } from "./nativeCodexTurnPin.ts";
import { recordComboDecision } from "./decisionTrace.ts";
import { recordProviderCooldown } from "../providerCooldownTracker.ts";
import {
  validateResponseQuality,
  releaseQualityClone,
  releaseRejectedQualityResponse,
} from "./validateQuality.ts";
import {
  isQuotaExhaustionResponse,
  recordQuotaExhaustionClassification,
} from "./quotaExhaustion.ts";
import { classifyComboOutcome, redactConnectionLabel } from "./comboErrorAggregation.ts";
import { readConnectionForCooldownGate } from "./executeTargetGates.ts";
import {
  remainderIsHomogeneous,
  shouldAbortOnInputBoundFailure,
  shouldSurfaceBodySpecific400,
} from "./executeTargetClassify.ts";
import type { CompressionMode } from "../compression/types.ts";
import type { AttemptLoopDeps, AttemptLoopState, ExecuteTargetResult } from "./attemptLoopTypes.ts";
import type { ComboDiagnostics } from "../../utils/error.ts";
import type { ComboErrorBody, ComboRetryAfter, ResolvedComboTarget } from "./types.ts";
import type { ResponseValidationConfig } from "./responseValidation.ts";

export async function executeTargetAttempt(opts: {
  index: number;
  state: AttemptLoopState;
  deps: AttemptLoopDeps;
  targetForAttempt: ResolvedComboTarget;
  profile: unknown;
  protectedPriorityTarget: boolean;
}): Promise<ExecuteTargetResult> {
  const { index: i, state, deps, targetForAttempt, protectedPriorityTarget } = opts;
  const profile = opts.profile as ProviderProfile | undefined;
  const target = state.orderedTargets[i];
  const modelStr = target.modelStr;
  const rawModel = parseModel(modelStr).model || modelStr;
  const provider = target.provider;
  const allowRateLimitedConnection =
    Boolean(provider && provider !== "unknown") &&
    state.transientRateLimitedProviders.has(provider);
  const maxGlobalAttempts = clampGlobalAttempts(deps.config.maxGlobalAttempts);
  const retryDelayMs = resolveDelayMs(deps.config.retryDelayMs, 2000);
  const fallbackDelayMs = resolveDelayMs(deps.config.fallbackDelayMs, 0);
  const universalHandoffConfig = deps.universalHandoffConfig ?? DEFAULT_UNIVERSAL_HANDOFF_CONFIG;

  const stopProtectedPriorityTarget = (message: string) => {
    state.observeFailure(false, target.executionKey);
    deps.clearStaleLKGP(deps.combo.name, target.executionKey, deps.combo.id, deps.log, "COMBO");
    return protectedPriorityTarget
      ? { ok: false as const, response: errorResponse(503, message) }
      : null;
  };

  const buildComboDiag = (
    terminalReason: string,
    retryAfterSeconds?: number
  ): ComboDiagnostics => ({
    poolSize: state.orderedTargets.length,
    attempted: state.recordedAttempts,
    excluded: [
      ...[...state.exhaustedProviders].map((p) => ({ provider: p, reason: "exhausted" })),
      ...[...state.exhaustedConnections].map((c) => formatExhaustedConnectionKey(String(c))),
    ],
    attemptOrder: state.comboAttemptOrder,
    terminalReason,
    recovery: buildRecoveryHint(terminalReason, retryAfterSeconds),
  });

  // Retry loop for transient errors
  for (let retry = 0; retry <= deps.maxRetries; retry++) {
    // Fix #1681: Bail out immediately if the client has disconnected
    if (deps.signal?.aborted) {
      deps.log.info("COMBO", `Client disconnected — aborting combo loop before model ${modelStr}`);
      return { ok: false, response: errorResponse(499, "Client disconnected") };
    }
    state.globalAttempts++;
    if (state.globalAttempts > maxGlobalAttempts) {
      deps.log.warn(
        "COMBO",
        `Maximum combo attempts (${maxGlobalAttempts}) exceeded across all targets and fallbacks. Terminating loop to prevent runaway background requests.`
      );
      // Actionable failure instead of an opaque 503 when every candidate
      // failed the same recoverable way. If the dominant cause was reasoning
      // models exhausting a too-small max_tokens budget (no content output),
      // retrying other models can't help — tell the caller to raise max_tokens.
      // Silent-stop fix: bump the consecutive-failure counter for this session-combo pair
      // so the pin gets cleared on the 3rd attempt (recovery.next_step tells the client).
      const reasoningExhausted = /reasoning consumed \d+\/\d+ tokens/.test(state.lastError || "");
      const failureReason = reasoningExhausted
        ? "reasoning_budget_exhausted"
        : "max_attempts_exceeded";
      recordComboFailure(deps.effectiveSessionId, deps.combo.name);
      return {
        ok: false,
        response: errorResponseWithComboDiagnostics(
          503,
          reasoningExhausted
            ? "All combo candidates exhausted their token budget on reasoning without producing content. Increase max_tokens — reasoning models need a larger budget to emit content."
            : "Maximum combo retry limit reached",
          buildComboDiag(failureReason)
        ),
      };
    }
    // Predictive TTFT Circuit Breaker (skip slow models)
    if (
      deps.config.zeroLatencyOptimizationsEnabled === true &&
      deps.config.predictiveTtftMs &&
      deps.config.predictiveTtftMs > 0 &&
      retry === 0
    ) {
      const cMetrics = getComboMetrics(deps.combo.name);
      if (cMetrics) {
        const targetKey = state.orderedTargets[i].executionKey || modelStr;
        const m = cMetrics.byTarget[targetKey] || cMetrics.byModel[modelStr];
        if (shouldSkipForPredictedTtft(m, deps.config.predictiveTtftMs)) {
          deps.log.warn(
            "COMBO",
            `Predictive TTFT Circuit Breaker: skipping ${modelStr} (avg ${m.avgLatencyMs}ms > max ${deps.config.predictiveTtftMs}ms)`
          );
          recordComboDecision(deps.traceInvocationId, {
            step: target.executionKey,
            target: modelStr,
            decision: "skipped_before_dispatch",
            reason: "predictive_ttft",
          });
          return stopProtectedPriorityTarget(`Predictive latency check rejected ${modelStr}`);
        }
      }
    }

    if (retry > 0) {
      deps.log.info(
        "COMBO",
        `Retrying ${modelStr} in ${retryDelayMs}ms (attempt ${retry + 1}/${deps.maxRetries + 1})`
      );
      await new Promise((resolve) => {
        const timer = setTimeout(resolve, retryDelayMs);
        deps.signal?.addEventListener(
          "abort",
          () => {
            clearTimeout(timer);
            resolve(undefined);
          },
          { once: true }
        );
      });
      if (deps.signal?.aborted) {
        deps.log.info("COMBO", `Client disconnected during retry delay — aborting`);
        return { ok: false, response: errorResponse(499, "Client disconnected") };
      }

      // Retry re-check: a sibling attempt (or attempt 1) may have persisted
      // a quota cooldown while this attempt was sleeping out its retry delay
      // ("Trying model 1/7: zai/glm-5.3 (retry 1)" after "already marked
      // unavailable until …"). Reads fresh, not cached: see readConnectionForCooldownGate.
      const persistedRetrySkip = await resolvePersistedConnectionCooldownSkipReason(
        target,
        (id) => readConnectionForCooldownGate(id, true),
        allowRateLimitedConnection
      );
      if (persistedRetrySkip) {
        deps.log.info("COMBO", persistedRetrySkip);
        if (i > 0) state.fallbackCount++;
        return null;
      }
    }

    deps.log.info(
      "COMBO",
      `Trying model ${i + 1}/${state.orderedTargets.length}: ${modelStr}${retry > 0 ? ` (retry ${retry})` : ""}`
    );
    emit("combo.target.attempt", {
      comboName: deps.combo.name,
      targetIndex: i,
      provider,
      model: modelStr,
      timestamp: Date.now(),
      strategy: deps.strategy,
    });
    // QA P0 diagnostics: capture the attempt order (provider/model ids only).
    state.comboAttemptOrder.push({ provider: provider ?? "unknown", model: modelStr });

    // Copy-on-write, not a deep clone (#7847 — 9.53 MiB at 3 targets). Writes here are
    // top-level scalars. Invariant: tests/unit/combo-attempt-body-isolation-7847.test.ts.
    let attemptBody = { ...(deps.body as Record<string, unknown>) } as typeof deps.body;

    // Proactive Context Compression for fallbacks (Zero-Latency optimization)
    if (
      deps.config.zeroLatencyOptimizationsEnabled === true &&
      i > 0 &&
      deps.config.fallbackCompressionMode &&
      deps.config.fallbackCompressionMode !== "off"
    ) {
      const { estimateTokens } = await import("../contextManager.ts");
      // #7847: object, not JSON.stringify — the string branch mis-counts inline images.
      const estimatedTokens = estimateTokens(attemptBody);
      if (estimatedTokens > (deps.config.fallbackCompressionThreshold ?? 1000)) {
        const { applyCompression } = await import("../compression/strategySelector.ts");
        const compressionResult = applyCompression(
          attemptBody,
          deps.config.fallbackCompressionMode as CompressionMode,
          // Opt into the TV1 bail-out so a throwing fallback engine is SKIPPED rather than
          // propagating out of executeTarget and being swallowed as a "Speculative task
          // error" (which silently drops this combo target). minGainPercent:0 keeps the
          // advance behavior identical to the default path — this only adds skip-on-throw.
          { model: modelStr, bailout: { enabled: true, minGainPercent: 0 } }
        );
        if (compressionResult.compressed) {
          deps.log.info(
            "COMBO",
            `Proactive fallback compression applied (${deps.config.fallbackCompressionMode}): ${estimatedTokens} -> ${compressionResult.stats?.compressedTokens} tokens`
          );
          attemptBody = compressionResult.body;
        }
      }
    }

    // Universal handoff: inject existing handoff if model changed. i === 0
    // only: a fallback target (i > 0) serves the SAME client request the
    // failed primary target would have served, with the original messages
    // already intact -- there's nothing to hand off, since the client never
    // saw the earlier target fail. Injecting a handoff note there replaces
    // real context with a context-free note, which weaker fallback models
    // have been observed treating as license to fabricate content instead
    // of just answering the actual request (#12227 follow-up).
    if (
      i === 0 &&
      universalHandoffConfig.enabled &&
      deps.relayOptions?.sessionId &&
      !(deps.body as Record<string, unknown>)?.[SKIP_UNIVERSAL_HANDOFF_FLAG]
    ) {
      const lastModel = getLastSessionModel(deps.relayOptions.sessionId, deps.combo.name);
      if (lastModel && lastModel !== modelStr) {
        const existingHandoff = getHandoff(deps.relayOptions.sessionId, deps.combo.name);
        attemptBody = injectUniversalHandoffBody(
          attemptBody, // Use the cloned body to maintain isolation
          lastModel,
          modelStr,
          `Model routing: ${lastModel} → ${modelStr}`,
          existingHandoff,
          universalHandoffConfig.relayMode
        );
      }
    }

    // Issue #3587: Reasoning models can spend the whole output budget on
    // reasoning. Only add headroom when the complete buffer fits inside the
    // model's known output cap; otherwise preserve the client's explicit limit.
    {
      const bodyRecord = attemptBody as Record<string, unknown>;
      const currentMaxTokens = toPositiveInteger(bodyRecord.max_tokens);
      const bufferedMaxTokens = resolveReasoningBufferedMaxTokens(modelStr, bodyRecord.max_tokens, {
        enabled: deps.reasoningTokenBufferEnabled !== false,
      });
      if (currentMaxTokens !== null && bufferedMaxTokens !== null) {
        bodyRecord.max_tokens = bufferedMaxTokens;
        if (bufferedMaxTokens !== currentMaxTokens) {
          deps.log.info(
            "COMBO",
            `Reasoning model ${modelStr}: adjusted max_tokens ${currentMaxTokens} -> ${bufferedMaxTokens}`
          );
        }
      }
    }
    // #5501: server-side template expansion for the combo system_message —
    // resolved per-target, scoped to combo-injected content only (never
    // client-owned system messages). Gate: a non-empty combo system_message.
    attemptBody = expandComboSystemPromptIfPresent(attemptBody, deps.combo, {
      modelId: modelStr,
      providerId: provider !== "unknown" ? provider : "",
      account:
        typeof target.label === "string" && target.label.trim().length > 0
          ? target.label.trim()
          : "",
      fingerprint: resolveTargetFingerprint(target) ?? "",
    });
    // #10681: record dispatch once per target (retries keep the first decision).
    if (!state.dispatchedTargets.has(target.executionKey)) {
      state.dispatchedTargets.add(target.executionKey);
      recordComboDecision(deps.traceInvocationId, {
        step: target.executionKey,
        target: modelStr,
        decision: "dispatched",
      });
    }
    const result = await deps.handleSingleModelWithTimeout(attemptBody, modelStr, {
      ...targetForAttempt,
      effectiveComboStrategy: deps.strategy,
      failoverBeforeRetry: deps.config.failoverBeforeRetry,
    });

    // Success — validate response quality before returning
    if (result.ok) {
      const selectedConnectionId =
        result.headers?.get("X-OmniRoute-Selected-Connection-Id") ||
        result.headers?.get("x-omniroute-selected-connection-id") ||
        undefined;
      const effectiveConnectionId = selectedConnectionId || target.connectionId || "";

      // Clone BEFORE quality check — validateResponseQuality reads the body
      // via getReader() which locks the stream. The clone's body is consumed
      // by the quality check; the original stays unlocked for piping.
      let qualityClone: Response;
      try {
        qualityClone = result.clone();
      } catch {
        qualityClone = result;
      }
      const quality = await validateResponseQuality(
        qualityClone,
        deps.clientRequestedStream,
        deps.log,
        deps.config.responseValidation as ResponseValidationConfig | null | undefined
      );
      releaseQualityClone(qualityClone, result, quality);
      if (!quality.valid) {
        releaseRejectedQualityResponse(qualityClone, result);
        deps.log.warn(
          "COMBO",
          `Model ${modelStr} returned 200 but failed quality check: ${quality.reason}`
        );
        // #6692: a quality-rejected 200 never marks the connection row
        // unhealthy, so the sticky pin's lazy headroom recheck would never
        // catch it either — release it here, on the failing response.
        deps.releaseStickyPinOnFailure(deps.sticky.messageHash, effectiveConnectionId);
        recordComboRequest(deps.combo.name, modelStr, {
          success: false,
          latencyMs: Date.now() - deps.startTime,
          fallbackCount: state.fallbackCount,
          strategy: deps.strategy,
          target: toRecordedTarget(target),
        });
        state.recordedAttempts++;
        // Fix #1707: Set terminal state so the fallback doesn't emit
        // misleading ALL_ACCOUNTS_INACTIVE when the real issue is quality.
        state.lastError = `Upstream response failed quality validation: ${quality.reason}`;
        state.lastStatus = 502;
        // #10314: record quality failures as a FIRST-CLASS per-target outcome
        // so a quality reason is never silently dropped from the aggregated
        // terminal message when a later sibling overwrites lastError.
        state.comboErrors.push({
          model: modelStr,
          status: 502,
          error: quality.reason || "upstream response failed quality validation",
          kind: "quality",
        });
        if (i > 0) state.fallbackCount++;
        if (provider && rawModel) {
          const mlSettings = resolveModelLockoutSettings(deps.settings);
          if (mlSettings.enabled && mlSettings.errorCodes.includes(502)) {
            recordModelLockoutFailure(
              provider,
              target.connectionId || "",
              rawModel,
              "quality_failure",
              502,
              mlSettings.baseCooldownMs,
              profile,
              {
                exactCooldownMs: mlSettings.useExponentialBackoff ? 0 : mlSettings.baseCooldownMs,
                maxCooldownMs: mlSettings.maxCooldownMs,
              }
            );
          }
        }
        emit("combo.target.failed", {
          comboName: deps.combo.name,
          targetIndex: i,
          provider,
          model: modelStr,
          error: `Quality: ${quality.reason}`,
          latencyMs: Date.now() - deps.startTime,
        });
        state.observeFailure(false, target.executionKey);
        return protectedPriorityTarget
          ? {
              ok: false,
              response: errorResponse(502, "Upstream response failed quality validation"),
            }
          : null;
      }

      if (Boolean(deps.clientManagedResponsesContext) && effectiveConnectionId) {
        pinNativeCodexTurn({
          body: deps.body,
          comboName: deps.combo.name,
          target,
          connectionId: effectiveConnectionId,
        });
      }

      // Success decay: a healthy response walks the model's lockout failure
      // count back down (and eventually clears an expired lockout entirely).
      if (provider && rawModel) {
        const dcResult = decayModelFailureCount(provider, effectiveConnectionId, rawModel);
        if (dcResult.cleared) {
          deps.log.info("COMBO", `Model ${modelStr} fully recovered — lockout cleared`);
        } else if (dcResult.newFailureCount > 0) {
          deps.log.debug(
            "COMBO",
            `Model ${modelStr} decayed to failureCount=${dcResult.newFailureCount}`
          );
        }
      }

      const latencyMs = Date.now() - deps.startTime;
      emit("combo.target.succeeded", {
        comboName: deps.combo.name,
        targetIndex: i,
        provider,
        model: modelStr,
        latencyMs,
      });
      deps.log.info(
        "COMBO",
        `Model ${modelStr} succeeded (${latencyMs}ms, ${state.fallbackCount} fallbacks)`
      );
      recordComboRequest(deps.combo.name, modelStr, {
        success: true,
        latencyMs,
        fallbackCount: state.fallbackCount,
        strategy: deps.strategy,
        target: toRecordedTarget(target),
      });
      state.recordedAttempts++;

      // Reset cooldown on success
      if (provider && provider !== "unknown") {
        recordProviderSuccess(provider, effectiveConnectionId || undefined);
      }
      if (deps.strategy === "weighted" && (deps.stickyWeightedLimit ?? 0) > 1) {
        const stickySuccessKey = deps.getWeightedStepKeyForTarget?.(target);
        if (stickySuccessKey) {
          recordStickyWeightedSuccess(
            deps.combo.name,
            stickySuccessKey,
            deps.stickyWeightedLimit ?? 0
          );
        }
      }
      // Webhook fan-out: best-effort, never blocks the response stream.
      notifyWebhookEvent("request.completed", {
        combo: deps.combo.name,
        provider,
        model: modelStr,
        account:
          typeof target.label === "string" && target.label.trim().length > 0
            ? target.label.trim()
            : "",
        accountId: effectiveConnectionId ?? "",
        latencyMs,
        fallbackCount: state.fallbackCount,
      });

      // Silent-stop fix: reset the consecutive-failure counter for this session-combo pair
      // on every successful dispatch so a transient recovery doesn't get "credited" against
      // the threshold the user already paid through to clear the stale pin.
      if (deps.effectiveSessionId) {
        clearComboFailureTracking(deps.effectiveSessionId, deps.combo.name);
      }
      // Context cache pinning: record model usage for session-based pinning
      // (independent of universal handoff — always fires when context_cache_protection is on)
      // #3825: write under the SAME effectiveSessionId used by the read site so a
      // sessionless conversation re-pins to this model on its next turn.
      if (
        deps.combo.context_cache_protection &&
        deps.effectiveSessionId &&
        !(deps.body as Record<string, unknown>)?.[SKIP_UNIVERSAL_HANDOFF_FLAG]
      ) {
        recordSessionModelUsage(
          deps.effectiveSessionId,
          deps.combo.name,
          modelStr,
          provider,
          target.connectionId ?? undefined
        );
      }

      // Universal handoff: record model usage for session
      if (
        universalHandoffConfig.enabled &&
        deps.relayOptions?.sessionId &&
        !(deps.body as Record<string, unknown>)?.[SKIP_UNIVERSAL_HANDOFF_FLAG]
      ) {
        const prevModel = getLastSessionModel(deps.relayOptions.sessionId, deps.combo.name);
        recordSessionModelUsage(
          deps.relayOptions.sessionId,
          deps.combo.name,
          modelStr,
          provider,
          target.connectionId ?? undefined
        );
        // i === 0 only: a same-request fallback target (i > 0) never
        // needs a summary generated for it -- see the injection-site
        // comment above. recordSessionModelUsage above stays
        // unconditional regardless of i: it must reflect whichever
        // model actually served THIS response, since the next
        // request's i === 0 comparison depends on that being
        // accurate even when this response came from a fallback.
        if (i === 0 && prevModel && prevModel !== modelStr) {
          const handoffSourceMessages =
            Array.isArray(deps.body?.messages) && deps.body.messages.length > 0
              ? deps.body.messages
              : Array.isArray(deps.body?.input)
                ? deps.body.input
                : [];

          maybeGenerateUniversalHandoff({
            sessionId: deps.relayOptions.sessionId,
            comboName: deps.combo.name,
            messages: handoffSourceMessages as MessageLike[],
            prevModel,
            currModel: modelStr,
            universalConfig: universalHandoffConfig,
            handleSingleModel: deps.handleSingleModelWithTimeout,
          });
        }

        recordSessionModelUsage(
          deps.relayOptions.sessionId,
          deps.combo.name,
          modelStr,
          provider,
          target.connectionId ?? undefined
        );
      }
      // Context-relay intentionally splits responsibilities:
      // combo.ts decides whether a successful turn should generate a handoff,
      // while chat.ts injects the handoff after the real connectionId is resolved.
      if (
        deps.strategy === "context-relay" &&
        deps.relayOptions?.sessionId &&
        deps.relayConfig &&
        (deps.relayConfig.handoffProviders ?? []).includes(provider) &&
        provider === "codex"
      ) {
        const connectionId = getSessionConnection(deps.relayOptions.sessionId);
        if (connectionId) {
          const quotaInfo = await fetchCodexQuota(connectionId).catch(() => null);
          if (quotaInfo) {
            const resetCandidates = [
              quotaInfo.windows?.session?.resetAt,
              quotaInfo.windows?.weekly?.resetAt,
              quotaInfo.resetAt,
            ]
              .filter((value): value is string => typeof value === "string" && value.length > 0)
              .sort((a, b) => a.localeCompare(b));
            const handoffSourceMessages =
              Array.isArray(deps.body?.messages) && deps.body.messages.length > 0
                ? deps.body.messages
                : Array.isArray(deps.body?.input)
                  ? deps.body.input
                  : [];

            maybeGenerateHandoff({
              sessionId: deps.relayOptions.sessionId,
              comboName: deps.combo.name,
              connectionId,
              percentUsed: quotaInfo.percentUsed,
              messages: handoffSourceMessages,
              model: modelStr,
              expiresAt: resetCandidates[0] || null,
              config: deps.relayConfig,
              handleSingleModel: deps.handleSingleModelWithTimeout,
            });
          }
        }
      }
      if (deps.sticky.messageHash && target.connectionId)
        recordStickyBinding(deps.sticky.messageHash, target.connectionId); // LKGP (#919):
      if (provider) {
        const connId = effectiveConnectionId || undefined;
        void (async () => {
          try {
            const { setLKGP } = await import("@/lib/db/settings");
            await Promise.all([
              setLKGP(deps.combo.name, target.executionKey, provider, connId),
              setLKGP(deps.combo.name, deps.combo.id || deps.combo.name, provider, connId),
            ]);
          } catch (err) {
            deps.log.warn(
              "COMBO",
              "Failed to record Last Known Good Provider. This is non-fatal.",
              {
                err,
              }
            );
          }
        })();
      }

      return { ok: true, response: result };
    }

    // Extract error info from response
    let errorText = result.statusText || "";
    let errorBody: ComboErrorBody = null;
    let retryAfter: ComboRetryAfter | null = null;
    try {
      const cloned = result.clone();
      try {
        const text = await cloned.text();
        if (text) {
          errorText = text.substring(0, 500);
          errorBody = JSON.parse(text);
          const parsedError = errorBody?.error;
          errorText =
            (typeof parsedError === "object" && parsedError?.message) ||
            (typeof parsedError === "string" ? parsedError : null) ||
            errorBody?.message ||
            errorText;
          // Live incident (log id 1784457764961-73 follow-up): the pre-dispatch
          // "all credentials cooling down" rejection (buildModelCooldownBody /
          // handleNoCredentials in src/sse/handlers/chatHelpers.ts) nests its
          // retry hint as error.retry_after (ISO string) / error.reset_seconds
          // (seconds), not the top-level `retryAfter` every other 429 shape
          // uses. Without this fallback, lastStatus gets recorded (fixed above)
          // but earliestRetryAfter stays null, so the final check falls through
          // to the generic "all combo models unavailable" error instead of ever
          // reaching the cooldown-wait decision — same class of bug, different
          // response shape.
          const nestedRetryAfter =
            typeof parsedError === "object" ? (parsedError?.retry_after ?? null) : null;
          const nestedResetSeconds =
            typeof parsedError === "object" ? (parsedError?.reset_seconds ?? null) : null;
          retryAfter =
            errorBody?.retryAfter ||
            nestedRetryAfter ||
            (typeof nestedResetSeconds === "number" && nestedResetSeconds > 0
              ? new Date(Date.now() + nestedResetSeconds * 1000).toISOString()
              : null);
        }
      } catch {
        /* Clone parse failed */
      }
    } catch {
      /* Clone failed */
    }

    // Track earliest retryAfter
    if (
      retryAfter &&
      (!state.earliestRetryAfter || new Date(retryAfter) < new Date(state.earliestRetryAfter))
    ) {
      state.earliestRetryAfter = retryAfter;
    }

    // Normalize error text
    if (typeof errorText !== "string") {
      try {
        errorText = JSON.stringify(errorText);
      } catch {
        errorText = String(errorText);
      }
    }

    const isStreamReadinessFailure =
      (result.status === 502 || result.status === 504) &&
      isStreamReadinessFailureErrorBody(errorBody);
    // An early EOF is an upstream failure, not a readiness probe — the breaker must
    // see it even though the transient-retry path below treats both codes alike.
    const isStreamEarlyEof =
      (result.status === 502 || result.status === 504) && isStreamEarlyEofErrorBody(errorBody);

    // FIX 5: a local per-API-key token-limit 429 must not cool shared accounts.
    const isTokenLimitBreach = result.status === 429 && isTokenLimitBreachErrorBody(errorBody);
    const isLocalQueueCapacity = isLocalQueueCapacityErrorBody(errorBody);

    // Fix #1681: Status 499 means client disconnected — stop combo loop immediately.
    // There is no point trying fallback models when nobody is listening.
    if (result.status === 499) {
      deps.log.info("COMBO", `Client disconnected (499) during ${modelStr} — stopping combo loop`);
      recordComboRequest(deps.combo.name, modelStr, {
        success: false,
        latencyMs: Date.now() - deps.startTime,
        fallbackCount: state.fallbackCount,
        strategy: deps.strategy,
        target: toRecordedTarget(target),
      });
      state.recordedAttempts++;
      // executeTarget must return the {ok,response} contract — a raw Response
      // here makes the speculative loop's res.ok/res.response checks both miss,
      // so the combo would wrongly fall through to the next model after a 499.
      return { ok: false, response: result };
    }
    if (isLocalQueueCapacity) {
      deps.log.info(
        "COMBO",
        `Local rate-limit queue capacity reached for ${modelStr} — returning without upstream fallback`
      );
      recordComboRequest(deps.combo.name, modelStr, {
        success: false,
        latencyMs: Date.now() - deps.startTime,
        fallbackCount: state.fallbackCount,
        strategy: deps.strategy,
        target: toRecordedTarget(target),
      });
      state.recordedAttempts++;
      if (i > 0) state.fallbackCount++;
      return { ok: false, response: result };
    }

    // Combo fallback is target-level orchestration: a non-ok target response is
    // treated as local to that target and the combo continues to the next target.
    // Error classification is retained only for retry/cooldown pacing; it must
    // not decide whether fallback happens, including for generic 400 responses.
    const rawError = errorBody?.error;
    const structuredError =
      rawError && typeof rawError === "object"
        ? {
            // Upstream JSON may carry a numeric `code`/`type` (e.g. {"code":40001}).
            // Coerce to string if present instead of discarding, so downstream string
            // ops (.toLowerCase, .startsWith) can run safely without type crashes.
            code:
              (rawError as Record<string, unknown>).code !== undefined &&
              (rawError as Record<string, unknown>).code !== null
                ? String((rawError as Record<string, unknown>).code)
                : undefined,
            type:
              (rawError as Record<string, unknown>).type !== undefined &&
              (rawError as Record<string, unknown>).type !== null
                ? String((rawError as Record<string, unknown>).type)
                : undefined,
          }
        : undefined;
    const scopedFailure = isScopedFailure(result, errorText, structuredError);

    // #8375: input-bound request-scoped failures (context_length_exceeded) are
    // deterministic for the same input — retrying on other accounts of the same
    // model will fail identically. Short-circuit the combo immediately with the
    // original error instead of burning MAX_GLOBAL_ATTEMPTS.
    // Scoped to homogeneous remainders only: a heterogeneous combo (#6637) may
    // have a later target with a different, larger context window that would
    // NOT reject the same input — isContextOverflow400 below exists precisely to
    // let that case fall through, so only short-circuit when every remaining
    // target is the same model (the "retrying will fail identically" premise
    // only holds within a homogeneous same-model pool).
    const remainderHomogeneous = remainderIsHomogeneous(state.orderedTargets, i, modelStr);
    const isInputBoundFailure = shouldAbortOnInputBoundFailure({
      structuredError,
      remainderIsHomogeneous: remainderHomogeneous,
    });
    if (isInputBoundFailure) {
      deps.log.warn(
        "COMBO",
        `Input-bound request failure from ${modelStr} — aborting combo (same input will fail identically on every account)`
      );
      recordComboRequest(deps.combo.name, modelStr, {
        success: false,
        latencyMs: Date.now() - deps.startTime,
        fallbackCount: state.fallbackCount,
        strategy: deps.strategy,
        target: toRecordedTarget(target),
      });
      state.recordedAttempts++;
      if (i > 0) state.fallbackCount++;
      return { ok: false, response: result };
    }
    const fallbackResult = checkFallbackError(
      result.status,
      errorText,
      0,
      protectedPriorityTarget ? rawModel : null,
      provider,
      result.headers,
      profile,
      structuredError
    );
    const { cooldownMs } = fallbackResult;
    // #6863: a parsed upstream quota reset (e.g. Antigravity "Resets in 92h27m28s")
    // arrives in `quotaResetHintMs` — it bypasses the operator-gated
    // `useUpstreamRetryHints` connection-cooldown setting. Mirror the
    // single-model path (src/sse/services/auth.ts): when the retry hint was
    // already honored, `cooldownMs` IS the upstream value; otherwise prefer the
    // parsed quota reset — even when it is SHORTER than the fallback cooldown
    // (e.g. subscription-quota 1h default vs a real "resets in 10m").
    // `selectLockoutCooldownMs` still ignores hints at/below the base cooldown,
    // so absent/tiny hints keep the #1308 exponential-backoff behavior.
    const lockoutHintMs =
      fallbackResult.usedUpstreamRetryHint === true
        ? cooldownMs
        : (fallbackResult.quotaResetHintMs ?? 0);
    // Only a transport header or google.rpc.RetryInfo is authoritative enough
    // to bypass maxCooldownMs. Prose and generic JSON remain useful exact hints,
    // but the operator cap still bounds them.
    const lockoutHintVerified = retryHintBypassesMaxCooldownMs(fallbackResult.retryHintSource);
    const selectedConnectionId =
      result.headers?.get("X-OmniRoute-Selected-Connection-Id") ||
      result.headers?.get("x-omniroute-selected-connection-id") ||
      undefined;
    const targetWithConnection = selectedConnectionId
      ? { ...target, connectionId: selectedConnectionId }
      : target;

    // #1731 / #1731v2: classify the upstream error and update the exhaustion sets
    // (shared with handleRoundRobinCombo). Returns whether the provider is fully exhausted.
    const providerExhausted = applyComboTargetExhaustion(targetWithConnection, {
      result,
      fallbackResult,
      errorText,
      rawModel,
      isTokenLimitBreach,
      allAccountsRateLimited: false,
      requestScopedFailure: scopedFailure,
      sets: {
        exhaustedProviders: state.exhaustedProviders,
        exhaustedConnections: state.exhaustedConnections,
        transientRateLimitedProviders: state.transientRateLimitedProviders,
      },
      log: deps.log,
      tag: "COMBO",
      exhaustedLogLevel: "info",
      structuredError,
    });
    // #6692: this connection was just classified as provider/connection-level
    // exhausted — if it's the currently sticky-bound one, release the pin now
    // rather than waiting for the next turn's lazy headroom/status recheck.
    deps.releaseStickyPinOnFailure(deps.sticky.messageHash, targetWithConnection.connectionId);
    if (
      providerExhausted ||
      state.exhaustedConnections.has(`${provider}:${targetWithConnection.connectionId}`) ||
      (provider && state.exhaustedProviders.has(provider))
    ) {
      deps.clearStaleLKGP(deps.combo.name, target.executionKey, deps.combo.id, deps.log, "COMBO");
    }

    // #2101: Prevent infinite fallback loops with 400 Bad Request errors that are genuinely
    // body-specific (malformed JSON, bad format, missing required fields).
    // These should NOT stop the combo:
    // - Context overflow: different models have different context windows
    // - Max_tokens / param errors: different models have different output limits
    // - Model access denied / "not supported": different providers serve different
    //   model sets — keep the model in the combo and try the next target (#5249).
    // Wrapper words like "invalid" / "bad request" still stop only when the text is
    // NOT model-scoped (e.g. "invalid message format").
    if (
      shouldSurfaceBodySpecific400({
        status: result.status,
        errorText,
        shouldFallback: fallbackResult.shouldFallback,
      })
    ) {
      deps.log.warn(
        "COMBO",
        `400 Bad Request with body-specific error detected on ${modelStr} — skipping fallback to other targets to prevent infinite loop`
      );
      // Record the failure and break to avoid trying other targets with the same bad request
      recordComboRequest(deps.combo.name, modelStr, {
        success: false,
        latencyMs: Date.now() - deps.startTime,
        fallbackCount: state.fallbackCount,
        strategy: deps.strategy,
        target: toRecordedTarget(target),
      });
      state.recordedAttempts++;
      state.lastError = errorText || String(result.status);
      state.comboErrors.push({
        model: modelStr,
        status: result.status,
        error: errorText || String(result.status),
        kind: classifyComboOutcome(result.status, errorText),
      });
      state.lastStatus = result.status;
      if (i > 0) state.fallbackCount++;
      deps.log.warn("COMBO", `Model ${modelStr} failed with body-specific error, stopping combo`);
      deps.clearStaleLKGP(deps.combo.name, target.executionKey, deps.combo.id, deps.log, "COMBO");
      // #4279: surface the 400 via the {ok,response} contract so the OUTER
      // target loop resolves the combo and stops. A bare `break` here only
      // exits the inner retry loop; executeTarget then returns null, which
      // the outer loop treats as "this target produced nothing" and advances
      // to the next model — so the guard failed to stop fallback and a combo
      // of N body-rejecting targets tried all N. Mirrors the 499 path above.
      return { ok: false, response: result };
    }

    // A model-scoped 400 ("The requested model is not supported" / "not
    // available for integrator") is permanent for THIS connection — the
    // account/integration will not gain support for the model mid-session.
    // Combo still advances to the next target immediately (unchanged,
    // preserves #5249's cross-provider fallback), but without a lockout
    // here the SAME dead model gets retried on every future, separate
    // request forever (observed: every auto-combo request wasted several
    // upstream 400s on the same GitHub models, all day). isModelLocked()
    // is checked before dispatch (see the pre-check above this loop), so
    // this lockout is honored on the next request.
    if (result.status === 400 && isModelScoped400(errorText) && provider && rawModel) {
      lockModelIfPerModelQuota(
        provider,
        targetWithConnection.connectionId || "",
        rawModel,
        "model_capacity",
        60 * 60 * 1000 // 1h
      );
    }

    // Trigger shared provider circuit breaker for 5xx errors and connection failures. If the
    // next target is on the same provider, don't mark it failed (a different model may still
    // succeed) — #8376: EXCEPT a proxy-unreachable failure, which poisons every model alike.
    // G-02: when fallbackResult.skipProviderBreaker is set (embedded service supervisor outage
    // signalled via X-Omni-Fallback-Hint: connection_cooldown) apply cooldown only — never trip.
    const nextTarget = state.orderedTargets[i + 1];
    const sameProviderNext =
      typeof nextTarget?.provider === "string" && nextTarget.provider === provider;
    if (
      shouldRecordProviderBreakerFailure({
        isStreamReadinessFailure,
        isStreamEarlyEof,
        status: result.status,
        sameProviderNext,
        skipProviderBreaker: fallbackResult.skipProviderBreaker,
        requestScopedFailure: scopedFailure,
        error: errorText,
        isProxyUnreachable: structuredError?.code === "proxy_unreachable",
      })
    ) {
      const isQueueTimeout =
        errorText.includes("RATE_LIMIT_QUEUE_TIMEOUT") ||
        errorText.includes("RATE_LIMIT_QUEUE_WEDGED");
      recordProviderFailure(provider, deps.log, targetWithConnection.connectionId, profile, {
        isQueueTimeout,
        isNetworkError: structuredError?.code === "proxy_unreachable",
      });
    }

    const quotaExhausted = await isQuotaExhaustionResponse(result, provider, rawModel, profile);
    recordQuotaExhaustionClassification(result, quotaExhausted);
    state.observeFailure(quotaExhausted, target.executionKey);

    // Check if this is a transient error worth retrying on same model.
    // A token-limit 429 is terminal for the client — never retry it.
    const isTransient =
      !isStreamReadinessFailure &&
      !isTokenLimitBreach &&
      !scopedFailure &&
      [408, 429, 500, 502, 503, 504].includes(result.status);
    // failoverBeforeRetry means what it says: prefer the next sibling
    // target over hammering this one again. Without this check, a
    // transient error always re-hit the SAME model up to maxRetries
    // times regardless of the setting — config.failoverBeforeRetry was
    // threaded through to skipUpstreamRetry (a different, lower-level
    // retry mechanism) but never consulted here, so a rate-limited
    // model got maxRetries+1 back-to-back attempts on itself before
    // this loop's own fallback-to-next-target ever ran (#2417). Only
    // skip the same-model retry when `nextTarget` (computed above)
    // actually gives us somewhere to fail over to — with no sibling
    // left, skipping just burns the last attempt for nothing.
    //
    // #10217 round-4 fix: this guard reads `failoverBeforeRetryExplicit`
    // (opt-in only), NOT `config.failoverBeforeRetry` — that field
    // defaults to true for the separate skipUpstreamRetry mechanism
    // (see DEFAULT_COMBO_CONFIG comment in comboConfig.ts) and reading
    // it here would silently skip the same-model retry for every combo,
    // not just ones that explicitly opted in.
    if (
      retry < deps.maxRetries &&
      isTransient &&
      !providerExhausted &&
      (!deps.config.failoverBeforeRetryExplicit || !nextTarget)
    ) {
      if (
        !protectedPriorityTarget &&
        provider &&
        rawModel &&
        isModelLocked(provider, targetWithConnection.connectionId || "", rawModel)
      ) {
        deps.log.info("COMBO", `Skipping retry for ${modelStr} — model lockout active`);
        // Live incident (log id 1784457764961-73): earliestRetryAfter is already
        // captured above from THIS dispatch's own response, but lastStatus was
        // never recorded on this bail-out path — so once every target in the set
        // hit an existing lockout, lastStatus stayed null and the final `if
        // (!lastStatus)` check crystallized an immediate ALL_ACCOUNTS_INACTIVE 503
        // instead of ever reaching the `if (earliestRetryAfter)` cooldown-wait
        // decision below, even though a real 429 with a short (~1min) retry-after
        // was just observed. Recording it here mirrors the "done retrying" path.
        state.lastError = errorText || String(result.status);
        state.lastStatus = result.status;
        if (i > 0) state.fallbackCount++;
        return null;
      }
      // Record model lockout immediately on the first transient failure —
      // once the model is cooling down, retrying it would waste an upstream
      // call and extend the cooldown via exponential backoff.
      let lockoutRecorded = false;
      if (!protectedPriorityTarget && provider && rawModel && retry === 0 && !scopedFailure) {
        const mlSettings = resolveModelLockoutSettings(deps.settings);
        if (mlSettings.enabled && mlSettings.errorCodes.includes(result.status)) {
          recordModelLockoutFailure(
            provider,
            targetWithConnection.connectionId || "",
            rawModel,
            classifyLockoutReason(result.status),
            result.status,
            mlSettings.baseCooldownMs,
            profile,
            {
              // #1308/#6863: honor a long upstream reset (e.g. "Resets in 160h") over
              // the short base cooldown / exponential backoff when present. #7940's
              // maxCooldownMs cap only applies to synthetic values — a verified
              // upstream reset (lockoutHintVerified) bypasses it.
              exactCooldownMs: selectLockoutCooldownMs(lockoutHintMs, mlSettings),
              maxCooldownMs: mlSettings.maxCooldownMs,
              // Preserve authoritative structured/header resets; clamp body prose.
              exactCooldownIsUpstreamReset: lockoutHintVerified,
            }
          );
          lockoutRecorded = true;
        }
      }
      if (lockoutRecorded) {
        deps.log.info("COMBO", `Skipping retry for ${modelStr} — model lockout active`);
        // Same fix as the already-locked branch above — this is the
        // first-failure lockout path, so lastStatus needs recording here too.
        state.lastError = errorText || String(result.status);
        state.lastStatus = result.status;
        if (i > 0) state.fallbackCount++;
        return null;
      }
      continue; // Retry same model (transient error, no lockout recorded)
    }

    // Done retrying this model
    const protectedTargetTrust = state.targetFailureTrust.get(target.executionKey);
    if (
      protectedPriorityTarget &&
      (!protectedTargetTrust?.observedFailure || !protectedTargetTrust.allObservedFailuresQuota)
    ) {
      recordComboRequest(deps.combo.name, modelStr, {
        success: false,
        latencyMs: Date.now() - deps.startTime,
        fallbackCount: state.fallbackCount,
        strategy: deps.strategy,
        target: toRecordedTarget(target),
      });
      state.recordedAttempts++;
      return { ok: false, response: result };
    }
    recordComboRequest(deps.combo.name, modelStr, {
      success: false,
      latencyMs: Date.now() - deps.startTime,
      fallbackCount: state.fallbackCount,
      strategy: deps.strategy,
      target: toRecordedTarget(target),
    });
    // LKGP (#919) mirror of the success-path set below: a just-failed target
    // must not keep re-pinning itself as the "last known good" choice for the
    // *next* separate request. Circuit breaker / model lockout deliberately
    // don't react to request-scoped failure classes (see scopedFailure below),
    // so nothing else clears this stale pin.
    deps.clearStaleLKGP(deps.combo.name, target.executionKey, deps.combo.id, deps.log, "COMBO");
    state.recordedAttempts++;
    state.lastError = errorText || String(result.status);
    state.comboErrors.push({
      model: modelStr,
      status: result.status,
      error: errorText || String(result.status),
      kind: classifyComboOutcome(result.status, errorText),
    });
    state.lastStatus = result.status;
    if (i > 0) state.fallbackCount++;
    // Wire combo failures into the resilience dashboard (model-level lockout)
    // alongside the provider-level cooldown below — they govern different scopes.
    if (provider && rawModel && !scopedFailure) {
      const mlSettings = resolveModelLockoutSettings(deps.settings);
      if (mlSettings.enabled && mlSettings.errorCodes.includes(result.status)) {
        recordModelLockoutFailure(
          provider,
          targetWithConnection.connectionId || "",
          rawModel,
          classifyLockoutReason(result.status),
          result.status,
          mlSettings.baseCooldownMs,
          profile,
          {
            // #1308/#6863: honor a long upstream reset over base/exponential cooldown.
            // #7940's maxCooldownMs cap only applies to synthetic values — a verified
            // upstream reset (lockoutHintVerified) bypasses it.
            exactCooldownMs: selectLockoutCooldownMs(lockoutHintMs, mlSettings),
            maxCooldownMs: mlSettings.maxCooldownMs,
            // Preserve authoritative structured/header resets; clamp body prose.
            exactCooldownIsUpstreamReset: lockoutHintVerified,
          }
        );
      }
    }
    deps.log.warn("COMBO", `Model ${modelStr} failed, trying next`, {
      status: result.status,
      errorBody: redactConnectionLabel(errorText),
    });

    // #5976: per-model-quota providers (Gemini, GitHub, etc.) multiplex models
    // behind one connection. A model-level 500 or 429 (RPM) must NOT cool down
    // the entire provider — sibling models may still succeed. Skip cooldown
    // recording for these providers on 500/429 errors so the next target can try.
    if (
      deps.resilienceSettings.providerCooldown.enabled &&
      provider &&
      provider !== "unknown" &&
      !scopedFailure &&
      !((result.status === 500 || result.status === 429) && hasPerModelQuota(provider, rawModel))
    ) {
      recordProviderCooldown(
        provider,
        targetWithConnection.connectionId ?? undefined,
        deps.resilienceSettings
      );
    }

    const fallbackWaitMs =
      fallbackDelayMs > 0 && cooldownMs > 0 && cooldownMs <= MAX_FALLBACK_WAIT_MS
        ? Math.min(cooldownMs, fallbackDelayMs)
        : 0;
    if ([502, 503, 504].includes(result.status) && fallbackWaitMs > 0) {
      deps.log.debug?.("COMBO", `Waiting ${fallbackWaitMs}ms before fallback to next model`);
      await new Promise((resolve) => {
        const timer = setTimeout(resolve, fallbackWaitMs);
        deps.signal?.addEventListener(
          "abort",
          () => {
            clearTimeout(timer);
            resolve(undefined);
          },
          { once: true }
        );
      });
      if (deps.signal?.aborted) {
        deps.log.info("COMBO", `Client disconnected during fallback wait — aborting`);
        return { ok: false, response: errorResponse(499, "Client disconnected") };
      }
    }

    return null;
  }
  return null;
}
