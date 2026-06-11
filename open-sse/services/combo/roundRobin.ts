/**
 * Shared combo (model combo) handling with fallback support
 * Supports: priority, weighted, round-robin, random, least-used, cost-optimized,
 * reset-aware, reset-window, strict-random, auto, fill-first, p2c, lkgp,
 * context-optimized, and context-relay strategies
 */

import {
  checkFallbackError,
  classifyErrorText,
  formatRetryAfter,
  getRuntimeProviderProfile,
  recordProviderFailure,
  isProviderFailureCode,
  isProviderExhaustedReason,
  type ProviderProfile,
} from "../accountFallback.ts";

import { FETCH_TIMEOUT_MS, RateLimitReason } from "../../config/constants.ts";

import { errorResponse, unavailableResponse } from "../../utils/error.ts";

import { clamp01 } from "../../utils/number.ts";

import {
  recordComboIntent,
  recordComboRequest,
  recordComboShadowRequest,
  getComboMetrics,
} from "../comboMetrics.ts";

import {
  resolveComboConfig,
  getDefaultComboConfig,
  resolveComboTargetTimeoutMs,
  PRE_SCREEN_CONCURRENCY,
} from "../comboConfig.ts";

import {
  recordSessionModelUsage,
  getLastSessionModel,
  getHandoff,
} from "../../../src/lib/db/contextHandoffs.ts";

import * as semaphore from "../rateLimitSemaphore.ts";

import { getCircuitBreaker } from "../../../src/shared/utils/circuitBreaker";

import { fisherYatesShuffle, getNextFromDeck } from "../../../src/shared/utils/shuffleDeck";

import { parseModel } from "../model.ts";

import { emit } from "../../../src/lib/events/eventBus";

import { notifyWebhookEvent } from "../../../src/lib/webhookDispatcher";

import {
  getResolvedModelCapabilities,
  supportsReasoning,
  supportsToolCalling,
} from "../modelCapabilities.ts";

import { getReasoningTokens } from "../../../src/lib/usage/tokenAccounting.ts";

import { orderTargetsByEvalScores } from "../evalRouting.ts";

import { getModelContextLimit } from "../../../src/lib/modelCapabilities";

import { getProviderConnections } from "../../../src/lib/db/providers";

import { getProviderModels } from "../../config/providerModels.ts";

import {
  getComboModelString,
  getComboStepTarget,
  getComboStepWeight,
  normalizeComboStep,
} from "../../../src/lib/combos/steps.ts";

import {
  getConnectionRoutingTags,
  matchesRoutingTags,
  resolveRequestRoutingTags,
  type RoutingTagMatchMode,
} from "../../../src/domain/tagRouter.ts";

import { normalizeRoutingStrategy } from "../../../src/shared/constants/routingStrategies.ts";

import {
  isProviderInCooldown,
  recordProviderCooldown,
  recordProviderSuccess,
} from "../providerCooldownTracker.ts";

import {
  resolveResilienceSettings,
  type ResilienceSettings,
} from "../../../src/lib/resilience/settings";

import { HandleRoundRobinOptions, ComboRetryAfter, ComboErrorBody } from "./types.ts";
import { resolveDelayMs, comboModelNotFoundResponse, MAX_GLOBAL_ATTEMPTS, isAllAccountsRateLimitedResponse, TRANSIENT_FOR_SEMAPHORE, MAX_FALLBACK_WAIT_MS } from "./constants.ts";
import { resolveComboTargets, applyRequestTagRouting } from "./auto.ts";
import { filterTargetsByRequestCompatibility } from "./context.ts";
import { scheduleShadowRouting, resolveShadowTargets } from "./shadow.ts";
import { rrCounters, MAX_RR_COUNTERS } from "./state.ts";
import { isRecord, validateResponseQuality, toRecordedTarget, isStreamReadinessFailureErrorBody, isTokenLimitBreachErrorBody, toRetryAfterDisplayValue } from "./utils.ts";



/**
 * Handle round-robin combo: each request goes to the next model in circular order.
 * Uses semaphore-based concurrency control with queue + rate-limit awareness.
 *
 * Flow:
 * 1. Pick target model via atomic counter (counter % models.length)
 * 2. Acquire semaphore slot (may queue if at max concurrency)
 * 3. Send request to target model
 * 4. On 429 → mark model rate-limited, try next model in rotation
 * 5. On semaphore timeout → fallback to next available model
 */
export async function handleRoundRobinCombo({
  body,
  combo,
  handleSingleModel,
  isModelAvailable,
  log,
  settings,
  allCombos,
  signal,
}: HandleRoundRobinOptions): Promise<Response> {
  const config = settings
    ? resolveComboConfig(combo, settings)
    : { ...getDefaultComboConfig(), ...(combo.config || {}) };
  const concurrency = config.concurrencyPerModel ?? 3;
  const queueTimeout = config.queueTimeoutMs ?? 30000;
  const maxRetries = config.maxRetries ?? 1;
  const retryDelayMs = resolveDelayMs(config.retryDelayMs, 2000);
  const fallbackDelayMs = resolveDelayMs(config.fallbackDelayMs, 0);

  const resilienceSettings: ResilienceSettings = settings
    ? resolveResilienceSettings(settings)
    : resolveResilienceSettings(null);

  const orderedTargets = resolveComboTargets(combo, allCombos);
  const tagFilteredTargets = await applyRequestTagRouting(orderedTargets, body, log);
  const evalRankedTargets = orderTargetsByEvalScores(tagFilteredTargets, config.evalRouting, log);
  const filteredTargets = filterTargetsByRequestCompatibility(
    evalRankedTargets,
    body,
    log,
    "Context-aware round-robin fallback"
  );
  const modelCount = filteredTargets.length;
  if (modelCount === 0) {
    return comboModelNotFoundResponse("Round-robin combo has no executable targets");
  }

  scheduleShadowRouting(
    combo,
    config,
    body,
    resolveShadowTargets(combo, config, allCombos),
    handleSingleModel,
    isModelAvailable,
    "round-robin",
    log
  );

  // Get and increment atomic counter
  const counter = rrCounters.get(combo.name) || 0;
  if (!rrCounters.has(combo.name) && rrCounters.size >= MAX_RR_COUNTERS) {
    const oldest = rrCounters.keys().next().value;
    if (oldest !== undefined) rrCounters.delete(oldest);
  }
  rrCounters.set(combo.name, counter + 1);
  const startIndex = counter % modelCount;

  const clientRequestedStream = body?.stream === true;
  const startTime = Date.now();
  let lastError: string | null = null;
  let lastStatus: number | null = null;
  let earliestRetryAfter: ComboRetryAfter | null = null;
  let globalAttempts = 0;
  let fallbackCount = 0;
  let recordedAttempts = 0;

  // #1731: Per-request in-memory set of providers whose quota is fully exhausted.
  // When a target returns a quota-exhausted 429, remaining targets from the same
  // provider are skipped to avoid the cascade through N same-provider targets.
  const exhaustedProviders = new Set<string>();
  const transientRateLimitedProviders = new Set<string>();

  // Try each model starting from the round-robin target
  for (let offset = 0; offset < modelCount; offset++) {
    const modelIndex = (startIndex + offset) % modelCount;
    const target = filteredTargets[modelIndex];
    const modelStr = target.modelStr;
    const provider = target.provider;
    const profile = await getRuntimeProviderProfile(provider);
    const semaphoreKey = `combo:${combo.name}:${target.executionKey}`;
    const allowRateLimitedConnection =
      Boolean(provider && provider !== "unknown") && transientRateLimitedProviders.has(provider);
    const targetForAttempt = allowRateLimitedConnection
      ? { ...target, allowRateLimitedConnection: true }
      : target;

    // Pre-check availability
    if (isModelAvailable) {
      const available = await isModelAvailable(modelStr, targetForAttempt);
      if (!available) {
        log.debug?.(
          "COMBO-RR",
          `Skipping ${modelStr} — no credentials available or model excluded`
        );
        if (offset > 0) fallbackCount++;
        continue;
      }
    }

    if (
      resilienceSettings.providerCooldown.enabled &&
      Boolean(provider && provider !== "unknown") &&
      isProviderInCooldown(provider, target.connectionId as string | undefined, resilienceSettings)
    ) {
      log.info("COMBO-RR", `Skipping ${modelStr} — provider ${provider} in global cooldown`);
      if (offset > 0) fallbackCount++;
      continue;
    }

    // #1731: Skip targets from a provider that already signaled full quota exhaustion
    // this request.
    if (provider && exhaustedProviders.has(provider)) {
      log.info(
        "COMBO-RR",
        `Skipping ${modelStr} — provider ${provider} marked exhausted this request (#1731)`
      );
      if (offset > 0) fallbackCount++;
      continue;
    }

    // Acquire semaphore slot (may wait in queue)
    let release: () => void;
    try {
      release = await semaphore.acquire(semaphoreKey, {
        maxConcurrency: concurrency,
        timeoutMs: queueTimeout,
      });
    } catch (err) {
      const errCode = isRecord(err) && typeof err.code === "string" ? err.code : null;
      if (errCode === "SEMAPHORE_TIMEOUT" || errCode === "SEMAPHORE_QUEUE_FULL") {
        log.warn(
          "COMBO-RR",
          `Semaphore ${errCode === "SEMAPHORE_QUEUE_FULL" ? "queue full" : "timeout"} for ${modelStr}, trying next model`
        );
        if (offset > 0) fallbackCount++;
        continue;
      }
      throw err;
    }

    // Retry loop within this model
    try {
      for (let retry = 0; retry <= maxRetries; retry++) {
        globalAttempts++;
        if (globalAttempts > MAX_GLOBAL_ATTEMPTS) {
          log.warn(
            "COMBO-RR",
            `Maximum combo attempts (${MAX_GLOBAL_ATTEMPTS}) exceeded. Terminating loop to prevent runaway requests.`
          );
          return errorResponse(503, "Maximum combo retry limit reached");
        }
        if (retry > 0) {
          log.info(
            "COMBO-RR",
            `Retrying ${modelStr} in ${retryDelayMs}ms (attempt ${retry + 1}/${maxRetries + 1})`
          );
          await new Promise((r) => setTimeout(r, retryDelayMs));
        }

        log.info(
          "COMBO-RR",
          `[RR #${counter}] → ${modelStr}${offset > 0 ? ` (fallback +${offset})` : ""}${retry > 0 ? ` (retry ${retry})` : ""}`
        );

        // Issue #3587: Reasoning models consume ALL max_tokens for reasoning_tokens.
        // Add buffer to ensure reasoning + content both fit. Apply the buffer to a
        // per-attempt COPY — never mutate the shared `body` — so it does not compound
        // across round-robin iterations/retries (otherwise 4096 -> 6144 -> 9216 -> ...
        // as each reasoning model re-reads an already-buffered value and overshoots the
        // model's real limit, triggering 400s).
        let attemptBody = body;
        if (supportsReasoning(modelStr)) {
          const currentMaxTokens = Number((body as Record<string, unknown>).max_tokens) || 0;
          if (currentMaxTokens > 0) {
            const bufferedMaxTokens = Math.max(
              currentMaxTokens + 1000,
              Math.ceil(currentMaxTokens * 1.5)
            );
            attemptBody = {
              ...(body as Record<string, unknown>),
              max_tokens: bufferedMaxTokens,
            } as typeof body;
            log.info(
              "COMBO-RR",
              `Reasoning model ${modelStr}: buffered max_tokens ${currentMaxTokens} -> ${bufferedMaxTokens}`
            );
          }
        }

        const result = await handleSingleModel(attemptBody, modelStr, {
          ...targetForAttempt,
          failoverBeforeRetry: config.failoverBeforeRetry,
        });

        // Success — validate response quality before returning
        if (result.ok) {
          const quality = await validateResponseQuality(result, clientRequestedStream, log);
          if (!quality.valid) {
            log.warn(
              "COMBO-RR",
              `${modelStr} returned 200 but failed quality check: ${quality.reason}`
            );
            recordComboRequest(combo.name, modelStr, {
              success: false,
              latencyMs: Date.now() - startTime,
              fallbackCount,
              strategy: "round-robin",
              target: toRecordedTarget(target),
            });
            recordedAttempts++;
            // Fix #1707: Set terminal state so the fallback doesn't emit
            // misleading ALL_ACCOUNTS_INACTIVE when the real issue is quality.
            lastError = `Upstream response failed quality validation: ${quality.reason}`;
            if (!lastStatus) lastStatus = 502;
            if (offset > 0) fallbackCount++;
            break; // move to next model
          }
          const latencyMs = Date.now() - startTime;
          log.info(
            "COMBO-RR",
            `${modelStr} succeeded (${latencyMs}ms, ${fallbackCount} fallbacks)`
          );
          recordComboRequest(combo.name, modelStr, {
            success: true,
            latencyMs,
            fallbackCount,
            strategy: "round-robin",
            target: toRecordedTarget(target),
          });
          recordedAttempts++;

          if (provider && provider !== "unknown") {
            recordProviderSuccess(provider, target.connectionId ?? undefined);
          }

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
                log.warn(
                  "COMBO-RR",
                  "Failed to record Last Known Good Provider. This is non-fatal.",
                  {
                    err,
                  }
                );
              }
            })();
          }
          return result;
        }

        // Extract error info
        let errorText = result.statusText || "";
        let retryAfter: ComboRetryAfter | null = null;
        let errorBody: ComboErrorBody = null;
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
            /* Clone parse failed */
          }
        } catch {
          /* Clone failed */
        }

        if (result.status === 499) {
          log.info(
            "COMBO-RR",
            `Client disconnected (499) during ${modelStr} — stopping combo loop`
          );
          recordComboRequest(combo.name, modelStr, {
            success: false,
            latencyMs: Date.now() - startTime,
            fallbackCount,
            strategy: "round-robin",
            target: toRecordedTarget(target),
          });
          recordedAttempts++;
          return result;
        }

        if (
          retryAfter &&
          (!earliestRetryAfter || new Date(retryAfter) < new Date(earliestRetryAfter))
        ) {
          earliestRetryAfter = retryAfter;
        }

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

        // FIX 5: a local per-API-key token-limit 429 must not cool shared accounts.
        const isTokenLimitBreach = result.status === 429 && isTokenLimitBreachErrorBody(errorBody);

        // Round-robin uses the same target-level fallback rule as other combo
        // strategies: non-ok target responses fall through to the next target.
        // Classification stays here only to support cooldown/semaphore pacing,
        // not to decide whether fallback is allowed.
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

        const isAllAccountsRateLimited = isAllAccountsRateLimitedResponse(
          result.status,
          result.headers?.get("content-type") ?? null,
          errorText
        );

        // #1731: If the entire provider quota is exhausted, mark it so subsequent
        // same-provider targets are skipped immediately. API-key 429s still use
        // the short resilience cooldown, but explicit quota text should stop the
        // combo from trying another target for the same provider in this request.
        const providerExhausted =
          Boolean(provider && provider !== "unknown") &&
          (isProviderExhaustedReason(fallbackResult) ||
            classifyErrorText(errorText) === RateLimitReason.QUOTA_EXHAUSTED ||
            isAllAccountsRateLimited);
        if (providerExhausted) {
          exhaustedProviders.add(provider);
          log.debug?.(
            "COMBO-RR",
            `Provider ${provider} quota exhausted — marking for skip (#1731)`
          );
        } else if (
          result.status === 429 &&
          !isTokenLimitBreach &&
          provider &&
          provider !== "unknown"
        ) {
          transientRateLimitedProviders.add(provider);
        }

        // Transient errors → mark in semaphore so round-robin stops stampeding this target.
        if (
          !isStreamReadinessFailure &&
          !isTokenLimitBreach &&
          TRANSIENT_FOR_SEMAPHORE.includes(result.status) &&
          cooldownMs > 0
        ) {
          semaphore.markRateLimited(semaphoreKey, cooldownMs);
          log.warn("COMBO-RR", `${modelStr} error ${result.status}, cooldown ${cooldownMs}ms`);
        }

        if (isAllAccountsRateLimited) {
          log.info(
            "COMBO-RR",
            `All accounts rate-limited for ${modelStr}, falling back to next model`
          );
        }

        // Transient error → retry same model.
        // A token-limit 429 is terminal for the client — never retry it.
        const isTransient =
          !isStreamReadinessFailure &&
          !isTokenLimitBreach &&
          [408, 429, 500, 502, 503, 504].includes(result.status);
        if (retry < maxRetries && isTransient && !providerExhausted) {
          continue;
        }

        // Done with this model
        recordComboRequest(combo.name, modelStr, {
          success: false,
          latencyMs: Date.now() - startTime,
          fallbackCount,
          strategy: "round-robin",
          target: toRecordedTarget(target),
        });
        recordedAttempts++;
        lastError = errorText || String(result.status);
        if (!lastStatus) lastStatus = result.status;
        if (offset > 0) fallbackCount++;
        log.warn("COMBO-RR", `${modelStr} failed, trying next model`, { status: result.status });

        if (resilienceSettings.providerCooldown.enabled && provider && provider !== "unknown") {
          recordProviderCooldown(provider, target.connectionId ?? undefined, resilienceSettings);
        }

        const fallbackWaitMs =
          fallbackDelayMs > 0 && cooldownMs > 0 && cooldownMs <= MAX_FALLBACK_WAIT_MS
            ? Math.min(cooldownMs, fallbackDelayMs)
            : 0;
        if ([502, 503, 504].includes(result.status) && fallbackWaitMs > 0) {
          log.debug?.("COMBO-RR", `Waiting ${fallbackWaitMs}ms before fallback to next model`);
          await new Promise((resolve) => {
            const timer = setTimeout(resolve, fallbackWaitMs);
            signal?.addEventListener(
              "abort",
              () => {
                clearTimeout(timer);
                resolve(undefined);
              },
              { once: true }
            );
          });
          if (signal?.aborted) {
            log.info("COMBO-RR", `Client disconnected during fallback wait — aborting`);
            return errorResponse(499, "Client disconnected");
          }
        }

        break;
      }
    } finally {
      // ALWAYS release semaphore slot
      release();
    }
  }

  // All models exhausted
  const latencyMs = Date.now() - startTime;
  if (recordedAttempts === 0) {
    recordComboRequest(combo.name, null, {
      success: false,
      latencyMs,
      fallbackCount,
      strategy: "round-robin",
    });
  }

  if (!lastStatus) {
    return new Response(
      JSON.stringify({
        error: {
          message: "Service temporarily unavailable: all upstream accounts are inactive",
          type: "service_unavailable",
          code: "ALL_ACCOUNTS_INACTIVE",
        },
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const status = lastStatus;
  const msg = lastError || "All round-robin combo models unavailable";

  if (earliestRetryAfter) {
    const retryHuman = formatRetryAfter(toRetryAfterDisplayValue(earliestRetryAfter));
    log.warn("COMBO-RR", `All models failed | ${msg} (${retryHuman})`);
    return unavailableResponse(status, msg, earliestRetryAfter, retryHuman);
  }

  log.warn("COMBO-RR", `All models failed | ${msg}`);
  return new Response(JSON.stringify({ error: { message: msg } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

