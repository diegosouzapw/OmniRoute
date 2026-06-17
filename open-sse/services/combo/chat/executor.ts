import type {
  ExecutionContext,
  SingleModelTarget,
  ComboErrorBody,
  ComboRetryAfter,
} from "./types.ts";
import type { CompressionMode } from "../compression/types.ts";
import type { MessageLike, UniversalHandoffConfig, ContextRelayConfig } from "../contextHandoff.ts";

import {
  checkFallbackError,
  classifyErrorText,
  getRuntimeProviderProfile,
  recordProviderFailure,
  isProviderFailureCode,
  isProviderExhaustedReason,
} from "../accountFallback.ts";

import { RateLimitReason } from "../../config/constants.ts";
import { errorResponse } from "../../utils/error.ts";
import { getComboMetrics } from "../comboMetrics.ts";
import {
  maybeGenerateHandoff,
  maybeGenerateUniversalHandoff,
  injectUniversalHandoffBody,
  SKIP_UNIVERSAL_HANDOFF_FLAG,
} from "../contextHandoff.ts";
import {
  recordSessionModelUsage,
  getLastSessionModel,
  getHandoff,
} from "../../../src/lib/db/contextHandoffs.ts";
import { fetchCodexQuota } from "../codexQuotaFetcher.ts";
import { getCircuitBreaker } from "../../../src/shared/utils/circuitBreaker";
import { emit } from "../../../src/lib/events/eventBus";
import { notifyWebhookEvent } from "../../../src/lib/events/webhooks";
import { getSessionConnection } from "../sessionManager.ts";
import {
  recordProviderCooldown,
  recordProviderSuccess,
  isProviderInCooldown,
} from "../providerCooldownTracker.ts";
import { MAX_GLOBAL_ATTEMPTS, MAX_FALLBACK_WAIT_MS } from "./constants.ts";
import { supportsReasoning } from "../modelCapabilities.ts";
import {
  validateResponseQuality,
  toRecordedTarget,
  isStreamReadinessFailureErrorBody,
  isTokenLimitBreachErrorBody,
} from "./utils.ts";
import { recordComboRequest } from "../comboMetrics.ts";

/**
 * Factory for the executeTarget function.
 * Ported from services/combo/chat.ts (lines 804-1463).
 */
export function createExecuteTarget(ctx: ExecutionContext) {
  const {
    orderedTargets,
    log,
    fallbackCount,
    resilienceSettings,
    preScreenMap,
    transientRateLimitedProviders,
    abortControllers,
    exhaustedProviders,
    zeroLatencyOptimizationsEnabled,
    config,
    combo,
    body,
    strategy,
    recordedAttempts,
    maxRetries,
    signal,
    handleSingleModelWithTimeout,
    isModelAvailable,
    relayOptions,
    clientRequestedStream,
    startTime,
    earliestRetryAfter,
  } = ctx;

  // Cast context configs to their real types for internal logic
  const universalHandoffConfig = ctx.universalHandoffConfig as UniversalHandoffConfig;
  const relayConfig = ctx.relayConfig as ContextRelayConfig;

  return async (i: number): Promise<{ ok: boolean; response?: Response } | null> => {
    const target = orderedTargets[i];
    const modelStr = target.modelStr;
    const provider = target.provider;

    const cb = getCircuitBreaker(provider);
    if (cb.getStatus().state === "OPEN") {
      log.info("COMBO", `Skipping ${modelStr} — circuit breaker OPEN for ${provider}`);
      if (i > 0) fallbackCount.value++;
      return null;
    }

    if (
      resilienceSettings.providerCooldown.enabled &&
      Boolean(provider && provider !== "unknown") &&
      isProviderInCooldown(provider, target.connectionId ?? undefined, resilienceSettings)
    ) {
      log.info("COMBO", `Skipping ${modelStr} — provider ${provider} in global cooldown`);
      if (i > 0) fallbackCount.value++;
      return null;
    }

    // Use pre-screened profile if available, otherwise fetch on demand
    const preScreenEntry = preScreenMap.get(target.executionKey);
    const profile = preScreenEntry?.profile ?? (await getRuntimeProviderProfile(provider));

    const allowRateLimitedConnection =
      Boolean(provider && provider !== "unknown") && transientRateLimitedProviders.has(provider);
    const targetForAttempt: SingleModelTarget = allowRateLimitedConnection
      ? {
          ...target,
          allowRateLimitedConnection: true,
          modelAbortSignal: abortControllers.get(i)!.signal,
        }
      : { ...target, modelAbortSignal: abortControllers.get(i)!.signal };

    // #1731: Skip targets from a provider that already signaled full quota exhaustion this request.
    if (provider && exhaustedProviders.has(provider)) {
      log.info(
        "COMBO",
        `Skipping ${modelStr} — provider ${provider} marked exhausted this request (#1731)`
      );
      if (i > 0) fallbackCount.value++;
      return null;
    }

    // Pre-screen may have already determined this target unavailable (e.g.
    // circuit-breaker OPEN at resolve time).  Skip immediately in that case.
    const preCheckedAvailable = preScreenEntry?.available ?? null;
    if (preCheckedAvailable === false) {
      log.info("COMBO", `Skipping ${modelStr} — pre-screen marked unavailable`);
      if (i > 0) fallbackCount.value++;
      return null;
    }
    if (isModelAvailable) {
      const available = await isModelAvailable(modelStr, targetForAttempt);
      if (!available) {
        log.debug?.("COMBO", `Skipping ${modelStr} — no credentials or provider unavailable`);
        if (i > 0) fallbackCount.value++;
        return null;
      }
    }

    const connectionId = target.connectionId;
    if (connectionId) {
      const { checkCredentialGate, logCredentialSkip } = await import("../credentialGate.ts");
      const gateResult = checkCredentialGate(connectionId, provider, modelStr);
      if (gateResult.allowed === false) {
        logCredentialSkip(log, modelStr, gateResult.reason || "Credential gate blocked");
        if (i > 0) fallbackCount.value++;
        return null;
      }
    }

    // Retry loop for transient errors
    const retryDelayMs = typeof config.retryDelayMs === "number" ? config.retryDelayMs : 2000;
    for (let retry = 0; retry <= maxRetries; retry++) {
      // Fix #1681: Bail out immediately if the client has disconnected
      if (signal?.aborted) {
        log.info("COMBO", `Client disconnected — aborting combo loop before model ${modelStr}`);
        return { ok: false, response: errorResponse(499, "Client disconnected") };
      }

      // Mutate globalAttempts on context
      ctx.globalAttempts++;
      if (ctx.globalAttempts > MAX_GLOBAL_ATTEMPTS) {
        log.warn(
          "COMBO",
          `Maximum combo attempts (${MAX_GLOBAL_ATTEMPTS}) exceeded across all targets and fallbacks. Terminating loop to prevent runaway background requests.`
        );
        return { ok: false, response: errorResponse(503, "Maximum combo retry limit reached") };
      }

      // Predictive TTFT Circuit Breaker (skip slow models)
      if (
        zeroLatencyOptimizationsEnabled &&
        config.predictiveTtftMs &&
        config.predictiveTtftMs > 0 &&
        retry === 0
      ) {
        const cMetrics = getComboMetrics(combo.name);
        if (cMetrics) {
          const targetKey = target.executionKey || modelStr;
          const m = cMetrics.byTarget[targetKey] || cMetrics.byModel[modelStr];
          if (m && m.requests >= 5 && m.avgLatencyMs > (config.predictiveTtftMs as number)) {
            log.warn(
              "COMBO",
              `Predictive TTFT Circuit Breaker: skipping ${modelStr} (avg ${m.avgLatencyMs}ms > max ${config.predictiveTtftMs}ms)`
            );
            return null;
          }
        }
      }

      if (retry > 0) {
        log.info(
          "COMBO",
          `Retrying ${modelStr} in ${retryDelayMs}ms (attempt ${retry + 1}/${maxRetries + 1})`
        );
        const { promise, resolve } = Promise.withResolvers<void>();
        const timer = setTimeout(resolve, retryDelayMs);
        const onAbort = () => {
          clearTimeout(timer);
          resolve();
        };
        signal?.addEventListener("abort", onAbort, { once: true });
        await promise;
        signal?.removeEventListener("abort", onAbort);

        if (signal?.aborted) {
          log.info("COMBO", `Client disconnected during retry delay — aborting`);
          return { ok: false, response: errorResponse(499, "Client disconnected") };
        }
      }

      log.info(
        "COMBO",
        `Trying model ${i + 1}/${orderedTargets.length}: ${modelStr} (${provider}${connectionId ? `:${connectionId.substring(0, 8)}` : ""})${retry > 0 ? ` (retry ${retry}/${maxRetries})` : ""}`
      );

      // Deep clone the body to ensure context preservation and prevent mutations
      let attemptBody = JSON.parse(JSON.stringify(body));

      // Proactive Context Compression for fallbacks (Zero-Latency optimization)
      if (
        zeroLatencyOptimizationsEnabled &&
        i > 0 &&
        config.fallbackCompressionMode &&
        config.fallbackCompressionMode !== "off"
      ) {
        const { estimateTokens } = await import("../contextManager.ts");
        const estimatedTokens = estimateTokens(JSON.stringify(attemptBody));
        if (estimatedTokens > ((config.fallbackCompressionThreshold as number) ?? 1000)) {
          const { applyCompression } = await import("../compression/strategySelector.ts");
          const compressionResult = applyCompression(
            attemptBody,
            config.fallbackCompressionMode as CompressionMode,
            { model: modelStr }
          );
          if (compressionResult.compressed) {
            log.info(
              "COMBO",
              `Proactive fallback compression applied (${config.fallbackCompressionMode}): ${estimatedTokens} -> ${compressionResult.stats?.compressedTokens} tokens`
            );
            attemptBody = compressionResult.body;
          }
        }
      }

      // Universal handoff: inject existing handoff if model changed
      if (
        universalHandoffConfig?.enabled &&
        relayOptions?.sessionId &&
        !(body as Record<string, unknown>)?.[SKIP_UNIVERSAL_HANDOFF_FLAG]
      ) {
        const lastModel = getLastSessionModel(relayOptions.sessionId, combo.name);
        if (lastModel && lastModel !== modelStr) {
          const existingHandoff = getHandoff(relayOptions.sessionId, combo.name);
          attemptBody = injectUniversalHandoffBody(
            attemptBody,
            lastModel,
            modelStr,
            `Model routing: ${lastModel} → ${modelStr}`,
            existingHandoff
          );
        }
      }

      // Issue #3587: Reasoning models (deepseek-v4-flash, nemotron, etc.) consume
      // ALL max_tokens for reasoning_tokens, leaving content empty.
      if (supportsReasoning(modelStr)) {
        const currentMaxTokens = Number((attemptBody as Record<string, unknown>).max_tokens) || 0;
        if (currentMaxTokens > 0) {
          const bufferedMaxTokens = Math.max(
            currentMaxTokens + 1000,
            Math.ceil(currentMaxTokens * 1.5)
          );
          attemptBody = {
            ...(attemptBody as Record<string, unknown>),
            max_tokens: bufferedMaxTokens,
          } as typeof attemptBody;
          log.info(
            "COMBO",
            `Reasoning model ${modelStr}: buffered max_tokens ${currentMaxTokens} -> ${bufferedMaxTokens}`
          );
        }
      }
      const result = await handleSingleModelWithTimeout(attemptBody, modelStr, {
        ...targetForAttempt,
        failoverBeforeRetry: config.failoverBeforeRetry as boolean,
      });

      // Success — validate response quality before returning
      if (result.ok) {
        const quality = await validateResponseQuality(result, clientRequestedStream, log);
        if (!quality.valid) {
          log.warn(
            "COMBO",
            `Model ${modelStr} returned 200 but failed quality check: ${quality.reason}`
          );
          recordComboRequest(combo.name, modelStr, {
            success: false,
            latencyMs: Date.now() - startTime,
            fallbackCount: fallbackCount.value,
            strategy,
            target: toRecordedTarget(target),
          });
          recordedAttempts.value++;
          ctx.lastError.value = `Upstream response failed quality validation: ${quality.reason}`;
          if (!ctx.lastStatus.value) ctx.lastStatus.value = 502;
          if (i > 0) fallbackCount.value++;
          emit("combo.target.failed", {
            comboName: combo.name,
            targetIndex: i,
            provider,
            model: modelStr,
            error: `Quality: ${quality.reason}`,
            latencyMs: Date.now() - startTime,
          });
          return null;
        }
        const latencyMs = Date.now() - startTime;
        emit("combo.target.succeeded", {
          comboName: combo.name,
          targetIndex: i,
          provider,
          model: modelStr,
          latencyMs,
        });
        log.info(
          "COMBO",
          `Model ${modelStr} succeeded (${latencyMs}ms, ${fallbackCount.value} fallbacks)`
        );
        recordComboRequest(combo.name, modelStr, {
          success: true,
          latencyMs,
          fallbackCount: fallbackCount.value,
          strategy,
          target: toRecordedTarget(target),
        });
        recordedAttempts.value++;

        // Reset cooldown on success
        if (provider && provider !== "unknown") {
          recordProviderSuccess(provider, target.connectionId ?? undefined);
        }
        // Webhook fan-out
        notifyWebhookEvent("request.completed", {
          combo: combo.name,
          provider,
          model: modelStr,
          latencyMs,
          fallbackCount: fallbackCount.value,
        });

        // Context cache pinning: record model usage
        if (
          combo.context_cache_protection &&
          relayOptions?.sessionId &&
          !(body as Record<string, unknown>)?.[SKIP_UNIVERSAL_HANDOFF_FLAG]
        ) {
          recordSessionModelUsage(
            relayOptions.sessionId,
            combo.name,
            modelStr,
            provider,
            target.connectionId ?? undefined
          );
        }

        // Universal handoff: record model usage for session
        if (
          universalHandoffConfig?.enabled &&
          relayOptions?.sessionId &&
          !(body as Record<string, unknown>)?.[SKIP_UNIVERSAL_HANDOFF_FLAG]
        ) {
          const prevModel = getLastSessionModel(relayOptions.sessionId, combo.name);
          recordSessionModelUsage(
            relayOptions.sessionId,
            combo.name,
            modelStr,
            provider,
            target.connectionId ?? undefined
          );
          if (prevModel && prevModel !== modelStr) {
            const handoffSourceMessages =
              Array.isArray(body?.messages) && body.messages.length > 0
                ? body.messages
                : Array.isArray(body?.input)
                  ? body.input
                  : [];

            maybeGenerateUniversalHandoff({
              sessionId: relayOptions.sessionId,
              comboName: combo.name,
              messages: handoffSourceMessages as MessageLike[],
              prevModel,
              currModel: modelStr,
              universalConfig: universalHandoffConfig,
              handleSingleModel: handleSingleModelWithTimeout,
            });
          }
        }
        // Context-relay
        if (
          strategy === "context-relay" &&
          relayOptions?.sessionId &&
          relayConfig &&
          relayConfig.handoffProviders?.includes(provider) &&
          provider === "codex"
        ) {
          const connectionId = getSessionConnection(relayOptions.sessionId);
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
                Array.isArray(body?.messages) && body.messages.length > 0
                  ? body.messages
                  : Array.isArray(body?.input)
                    ? body.input
                    : [];

              maybeGenerateHandoff({
                sessionId: relayOptions.sessionId,
                comboName: combo.name,
                connectionId,
                percentUsed: quotaInfo.percentUsed,
                messages: handoffSourceMessages,
                model: modelStr,
                expiresAt: resetCandidates[0] || null,
                config: relayConfig,
                handleSingleModel: handleSingleModelWithTimeout,
              });
            }
          }
        }

        // Record last known good provider (LKGP) (#919)
        if (provider) {
          const connId = target.connectionId || undefined;
          void (async () => {
            try {
              const { setLKGP } = await import("../../../src/lib/localDb");
              await Promise.all([
                setLKGP(combo.name, target.executionKey, provider, connId),
                setLKGP(combo.name, combo.id || combo.name, provider, connId),
              ]);
            } catch (err) {
              log.warn("COMBO", "Failed to record Last Known Good Provider. This is non-fatal.", {
                err,
              });
            }
          })();
        }

        return { ok: true, response: quality.clonedResponse ?? result };
      }

      // Error handling
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
            retryAfter = errorBody?.retryAfter || null;
          }
        } catch {
          /* parse fail */
        }
      } catch {
        /* clone fail */
      }

      if (
        retryAfter &&
        (!earliestRetryAfter.value || new Date(retryAfter) < new Date(earliestRetryAfter.value))
      ) {
        earliestRetryAfter.value = retryAfter;
      }

      errorText = errorText || String(result.status);
      const isStreamReadinessFailure =
        (result.status === 502 || result.status === 504) &&
        isStreamReadinessFailureErrorBody(errorBody);
      const isTokenLimitBreach = result.status === 429 && isTokenLimitBreachErrorBody(errorBody);

      if (result.status === 499) {
        log.info("COMBO", `Client disconnected (499) during ${modelStr} — stopping combo loop`);
        recordComboRequest(combo.name, modelStr, {
          success: false,
          latencyMs: Date.now() - startTime,
          fallbackCount: fallbackCount.value,
          strategy,
          target: toRecordedTarget(target),
        });
        recordedAttempts.value++;
        return { ok: false, response: result };
      }

      const rawError = errorBody?.error;
      const structuredError =
        rawError && typeof rawError === "object"
          ? {
              code:
                (rawError as Record<string, unknown>).code !== undefined
                  ? String((rawError as Record<string, unknown>).code)
                  : undefined,
              type:
                (rawError as Record<string, unknown>).type !== undefined
                  ? String((rawError as Record<string, unknown>).type)
                  : undefined,
            }
          : undefined;

      const fallbackResult = checkFallbackError(
        result.status,
        errorText,
        0,
        null,
        provider,
        result.headers,
        profile,
        structuredError
      );
      const { cooldownMs } = fallbackResult;

      const providerExhausted =
        Boolean(provider && provider !== "unknown") &&
        (isProviderExhaustedReason(fallbackResult) ||
          classifyErrorText(errorText) === RateLimitReason.QUOTA_EXHAUSTED);

      if (providerExhausted && provider) exhaustedProviders.add(provider);

      if (
        !isStreamReadinessFailure &&
        isProviderFailureCode(result.status) &&
        !fallbackResult.skipProviderBreaker
      ) {
        recordProviderFailure(provider, log, target.connectionId, profile);
      }

      const isTransient =
        !isStreamReadinessFailure &&
        !isTokenLimitBreach &&
        [408, 429, 500, 502, 503, 504].includes(result.status);
      if (retry < maxRetries && isTransient && !providerExhausted) continue;

      recordComboRequest(combo.name, modelStr, {
        success: false,
        latencyMs: Date.now() - startTime,
        fallbackCount: fallbackCount.value,
        strategy,
        target: toRecordedTarget(target),
      });
      recordedAttempts.value++;
      ctx.lastError.value = errorText || String(result.status);
      if (!ctx.lastStatus.value) ctx.lastStatus.value = result.status;
      if (i > 0) fallbackCount.value++;
      log.warn("COMBO", `Model ${modelStr} failed, trying next`, { status: result.status });

      if (resilienceSettings.providerCooldown.enabled && provider && provider !== "unknown") {
        recordProviderCooldown(provider, target.connectionId ?? undefined, resilienceSettings);
      }

      const fallbackWaitMs =
        fallbackDelayMs > 0 && cooldownMs > 0 && cooldownMs <= MAX_FALLBACK_WAIT_MS
          ? Math.min(cooldownMs, fallbackDelayMs)
          : 0;
      if ([502, 503, 504].includes(result.status) && fallbackWaitMs > 0) {
        log.debug?.("COMBO", `Waiting ${fallbackWaitMs}ms before fallback to next model`);
        const { promise, resolve } = Promise.withResolvers<void>();
        const timer = setTimeout(resolve, fallbackWaitMs);
        const onAbort = () => {
          clearTimeout(timer);
          resolve();
        };
        signal?.addEventListener("abort", onAbort, { once: true });
        await promise;
        signal?.removeEventListener("abort", onAbort);
        if (signal?.aborted) {
          log.info("COMBO", `Client disconnected during fallback wait — aborting`);
          return { ok: false, response: errorResponse(499, "Client disconnected") };
        }
      }
      return null;
    }
    return null;
  };
}
