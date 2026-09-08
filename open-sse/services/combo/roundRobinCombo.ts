/** Round-robin combo dispatcher. Lift-as-is from combo.ts. @internal */
import {
  checkFallbackError,
  decayModelFailureCount,
  formatRetryAfter,
  getRuntimeProviderProfile,
  hasPerModelQuota,
  isModelLocked,
  recordProviderSuccess,
} from "../accountFallback.ts";
import {
  errorResponse,
  unavailableResponse,
  errorResponseWithComboDiagnostics,
} from "../../utils/error.ts";
import { buildRecoveryHint } from "./pinRecovery.ts";
import { formatExhaustedConnectionKey } from "./comboDiagFormat.ts";
import { recordComboRequest } from "../comboMetrics.ts";
import {
  expandComboSystemPromptIfPresent,
  resolveTargetFingerprint,
} from "../comboAgentMiddleware.ts";
import {
  resolveComboConfig,
  getDefaultComboConfig,
  resolveComboQueueDepth,
} from "../comboConfig.ts";
import { getHiddenModelsByProvider } from "@/models";
import * as semaphore from "../rateLimitSemaphore.ts";
import { getCircuitBreaker } from "../../../src/shared/utils/circuitBreaker";
import { parseModel } from "../model.ts";
import {
  applySessionStickiness,
  normalizeStickinessMessages,
  recordStickyBinding,
  clearStickyBindingsForCombo,
  resolveDisableSessionStickiness,
} from "./sessionStickiness.ts";
import { makeConnectionConcurrencyResolver } from "./concurrencyCaps.ts";
import { getCachedProviderConnectionById } from "../../../src/lib/db/readCache.ts";
import { orderTargetsByEvalScores } from "../evalRouting.ts";
import {
  applyPromptCacheAffinity,
  expandPromptCacheAffinityTargets,
  resolvePromptCacheAffinityKey,
} from "./promptCacheAffinity.ts";
import {
  classifyComboOutcome,
  formatComboOutcomes,
  redactConnectionLabel,
  resolveComboTerminalStatus,
  type ComboErrorEntry,
} from "./comboErrorAggregation.ts";
import { isProviderInCooldown, recordProviderCooldown } from "../providerCooldownTracker.ts";
import {
  resolveResilienceSettings,
  type ResilienceSettings,
} from "../../../src/lib/resilience/settings";
import { resolveReasoningBufferedMaxTokens, toPositiveInteger } from "../reasoningTokenBuffer.ts";
import type {
  ComboLike,
  ComboRetryAfter,
  ComboErrorBody,
  HandleRoundRobinOptions,
} from "./types.ts";
import {
  MAX_RR_COUNTERS,
  rrCounters,
  rrStickyTargets,
  getStickyRoundRobinStartIndex,
  recordStickyRoundRobinSuccess,
  resolveComboStickyRoundRobinLimit,
} from "./rrState.ts";
import { expandTargetsForAllStrategies } from "./connectionAwareExpansion.ts";
import {
  validateResponseQuality,
  releaseQualityClone,
  releaseRejectedQualityResponse,
  toRetryAfterDisplayValue,
} from "./validateQuality.ts";
import {
  TRANSIENT_FOR_SEMAPHORE,
  MAX_FALLBACK_WAIT_MS,
  COMBO_LOOP_SAFETY_TIMEOUT_MS,
  isAllAccountsRateLimitedResponse,
  clampComboDepth,
  clampGlobalAttempts,
  isComboRequestScopedFailure as isScopedFailure,
  resolveDelayMs,
  comboModelNotFoundResponse,
  isStreamReadinessFailureErrorBody,
  isTokenLimitBreachErrorBody,
  isLocalQueueCapacityErrorBody,
  toRecordedTarget,
  getExhaustedTargetSkipReason,
} from "./comboPredicates.ts";
import { applyComboTargetExhaustion } from "./targetExhaustion.ts";
import { isRetryAfterEligibleStatus } from "./unavailableRetryGate.ts";
import { isRecord } from "./comboData.ts";
import { attemptCompatRejectedFallback } from "./comboCompatFallback.ts";
import { applyRequestTagRouting } from "./autoStrategy.ts";
import {
  expandProviderWildcardsInCombo,
  expandProviderWildcardsInCollection,
} from "./providerWildcard.ts";
import { resolveShadowTargets, scheduleShadowRouting } from "./shadowRouting.ts";
import {
  computeCompatRejectedTargets,
  describeCapabilityFilterExhaustion,
  filterTargetsByRequestCompatibility,
  resolveComboTargets,
} from "./comboStructure.ts";
import { releaseStickyPinOnFailure, clearStaleLKGP } from "../combo.ts";

/** Per-connection TPM budget for quota reservation. Undefined = store keeps prior limit. */
async function resolveTargetTokenLimit(target: {
  connectionId?: string | null;
}): Promise<number | undefined> {
  const connectionId = target?.connectionId;
  if (!connectionId) return undefined;
  try {
    const connection = await getCachedProviderConnectionById(connectionId);
    const overrides = (connection as { rateLimitOverrides?: Record<string, number> | null } | null)
      ?.rateLimitOverrides;
    const tpm = overrides?.tpm;
    return typeof tpm === "number" && tpm > 0 ? tpm : undefined;
  } catch {
    return undefined;
  }
}

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
  apiKeyAllowedConnections = null,
  nesting: _nesting = null,
  hiddenModelsByProvider = getHiddenModelsByProvider(),
  clientManagedResponsesContext: _clientManagedResponsesContext,
  deferContextOverflowWhenCompressible: _deferContextOverflowWhenCompressible = false,
  compressionExclusions: _compressionExclusions,
  sourceFormat: _sourceFormat = null,
  endpointPath: _endpointPath = null,
  requestHeaders: _requestHeaders = null,
  relayOptions,
  perTargetAdmission = null,
}: HandleRoundRobinOptions): Promise<Response> {
  const config = settings
    ? resolveComboConfig(combo, settings)
    : {
        ...getDefaultComboConfig(),
        ...(combo.config || {}),
        // See resolveComboConfig's failoverBeforeRetryExplicit comment in
        // comboConfig.ts (no `settings` here, so only the combo's own config
        // can opt in).
        failoverBeforeRetryExplicit:
          (combo.config as Record<string, unknown> | undefined)?.failoverBeforeRetry === true,
      };
  // #9158: clamp combo-level concurrency to a sane bound — a config carrying a
  // huge or negative value would otherwise open an unbounded semaphore and
  // flood targets (or deadlock at 0).
  const concurrency = Math.min(Math.max(config.concurrencyPerModel ?? 3, 1), 32);
  // Honor each target connection's own maxConcurrent ceiling (cached per dispatch)
  // so a low-concurrency subscription account is not flooded; falls back to the
  // combo-level concurrency when the connection has no positive cap.
  const resolveTargetConcurrency = makeConnectionConcurrencyResolver(concurrency);
  const queueTimeout = config.queueTimeoutMs ?? 30000;
  // #3872: pre-cascade queue depth — lower values fail over to the next combo member
  // sooner under concurrency saturation (0 = never queue). Default 20 (backward-compat).
  const queueDepth = resolveComboQueueDepth(config);
  const maxRetries = config.maxRetries ?? 1;
  const retryDelayMs = resolveDelayMs(config.retryDelayMs, 2000);
  const fallbackDelayMs = resolveDelayMs(config.fallbackDelayMs, 0);
  const reasoningTokenBufferEnabled = config.reasoningTokenBufferEnabled !== false;

  const resilienceSettings: ResilienceSettings = settings
    ? resolveResilienceSettings(settings)
    : resolveResilienceSettings(null);

  // #2562: Expand provider-wildcard steps before resolving targets.
  const rrExpandedCombo = await expandProviderWildcardsInCombo(combo);
  const rrExpandedAllCombos = allCombos
    ? Array.isArray(allCombos)
      ? await expandProviderWildcardsInCollection(allCombos as ComboLike[])
      : {
          ...allCombos,
          combos: await expandProviderWildcardsInCollection(
            ((allCombos as { combos?: ComboLike[] }).combos || []) as ComboLike[]
          ),
        }
    : allCombos;

  let orderedTargets = resolveComboTargets(
    rrExpandedCombo,
    rrExpandedAllCombos,
    clampComboDepth(config.maxComboDepth),
    hiddenModelsByProvider
  );
  // Connection-aware expansion is opt-in. RR runs outside
  // resolveComboTargetPipeline, so it wires the same stage here. Rotation
  // granularity becomes model x connection: rrStartIndex takes mod over the
  // expanded list, so each account occupies its own rotation slot.
  orderedTargets = await expandTargetsForAllStrategies({
    strategy: "round-robin",
    targets: orderedTargets,
    comboName: combo.name,
    config: combo.config,
    settings: settings as Record<string, unknown> | null | undefined,
    log,
    apiKeyAllowedConnectionIds: apiKeyAllowedConnections,
  });
  const tagFilteredTargets = await applyRequestTagRouting(orderedTargets, body, log);
  const evalRankedTargets = orderTargetsByEvalScores(tagFilteredTargets, config.evalRouting, log);
  // Align with the main/auto paths: combo config OR top-level settings (#8488 / #8494).
  const rrCompatFailOpen =
    (config as { compatFilterFailOpen?: unknown }).compatFilterFailOpen === true ||
    (settings as { compatFilterFailOpen?: unknown } | null | undefined)?.compatFilterFailOpen ===
      true;
  let filteredTargets = filterTargetsByRequestCompatibility(
    evalRankedTargets,
    body,
    log,
    "Context-aware round-robin fallback",
    { failOpen: rrCompatFailOpen }
  );
  // #6238: keep the targets the compat pre-filter rejected so they can serve as a
  // last-resort fallback tier. The pre-filter drops request-incompatible targets
  // BEFORE availability is known; if every compat-kept target then turns out to be
  // runtime-unavailable, we must reconsider these before returning 503, instead of
  // permanently dropping a compat-rejected-but-healthy provider.
  const compatRejectedTargets = computeCompatRejectedTargets(
    evalRankedTargets,
    filteredTargets,
    body
  );
  let modelCount = filteredTargets.length;
  if (modelCount === 0) {
    const exhaustion = describeCapabilityFilterExhaustion(
      evalRankedTargets,
      body,
      rrExpandedCombo?.name || combo?.name
    );
    if (exhaustion) {
      return errorResponseWithComboDiagnostics(
        400,
        exhaustion.message,
        {
          poolSize: evalRankedTargets.length,
          attempted: 0,
          excluded: exhaustion.excluded,
          attemptOrder: [],
          terminalReason: exhaustion.terminalReason,
        },
        { code: "capability_mismatch", type: "invalid_request_error" }
      );
    }
    return comboModelNotFoundResponse("Round-robin combo has no executable targets");
  }

  scheduleShadowRouting(
    combo,
    config,
    body,
    resolveShadowTargets(combo, config, allCombos, hiddenModelsByProvider),
    handleSingleModel,
    isModelAvailable,
    "round-robin",
    log
  );

  // Sticky batch size at the combo level. A per-combo `stickyRoundRobinLimit` (in
  // combo.config, resolved through the cascade) overrides the global setting so one
  // combo can batch differently from the default. When the per-combo value is unset,
  // fall back to the global `stickyRoundRobinLimit` so the existing knob still controls
  // sticky batching for both account fallback and combo targets. Values <= 1 preserve
  // the historical one-request-per-target rotation.
  const perComboStickyLimit = (config as Record<string, unknown>).stickyRoundRobinLimit;
  const stickyLimit = resolveComboStickyRoundRobinLimit(
    perComboStickyLimit,
    settings as Record<string, unknown> | null
  );
  const stickyRoundRobinEnabled = stickyLimit > 1;
  // Exhaustion-aware sticky: if the currently sticky target is no longer
  // available (circuit breaker OPEN, provider cooldown, model lockout, or
  // isModelAvailable returns false), clear the sticky record so the rotation
  // starts at the counter position instead of probing a dead target.
  if (stickyRoundRobinEnabled) {
    const sticky = rrStickyTargets.get(combo.name);
    if (sticky) {
      const stickyTarget = filteredTargets.find(
        (target) => target.executionKey === sticky.executionKey
      );
      if (stickyTarget) {
        const rawModel = parseModel(stickyTarget.modelStr).model || stickyTarget.modelStr;
        const stickyAvailable =
          (!stickyTarget.provider ||
            getCircuitBreaker(stickyTarget.provider).getStatus().state !== "OPEN") &&
          !(
            resilienceSettings.providerCooldown.enabled &&
            Boolean(stickyTarget.provider && stickyTarget.provider !== "unknown") &&
            isProviderInCooldown(
              stickyTarget.provider,
              stickyTarget.connectionId ?? undefined,
              resilienceSettings
            )
          ) &&
          !(
            stickyTarget.provider &&
            rawModel &&
            isModelLocked(stickyTarget.provider, stickyTarget.connectionId || "", rawModel)
          ) &&
          (isModelAvailable ? await isModelAvailable(stickyTarget.modelStr, stickyTarget) : true);
        if (!stickyAvailable) {
          log.info(
            "COMBO-RR",
            `Clearing stale sticky target ${stickyTarget.modelStr} — unavailable`
          );
          rrStickyTargets.delete(combo.name);
        }
      }
    }
  }
  if (
    !rrCounters.has(combo.name) &&
    !rrStickyTargets.has(combo.name) &&
    rrCounters.size >= MAX_RR_COUNTERS
  ) {
    const oldest = rrCounters.keys().next().value;
    if (oldest !== undefined) {
      rrCounters.delete(oldest);
      rrStickyTargets.delete(oldest);
    }
  }
  // Ensure rrCounters has an entry for this combo so the eviction logic above
  // applies to both maps even when sticky round-robin is enabled (in which
  // case rrCounters isn't incremented per request).
  if (!rrCounters.has(combo.name)) {
    rrCounters.set(combo.name, 0);
  }
  const { startIndex, counter } = getStickyRoundRobinStartIndex(
    combo.name,
    filteredTargets,
    stickyLimit
  );
  if (!stickyRoundRobinEnabled) {
    rrCounters.set(combo.name, counter + 1);
  }

  // #3825: per-conversation session stickiness for round-robin. weighted/priority honor a
  // sticky connection via applySessionStickiness, but this RR handler returns before that
  // call — so sessionless RR combos rotated every turn, busting the upstream prompt-cache.
  // Reuse the SAME mechanism: start the rotation at the conversation's sticky connection
  // (the loop still falls through to the other targets on failure → failover preserved).
  // #6168: honor the session-stickiness opt-out here too, otherwise round-robin would
  // still pin the conversation even when the flag is set. Per-combo `config` overrides
  // the global `settings.disableSessionStickiness` fallback (default false).
  const disableSessionStickiness = resolveDisableSessionStickiness(
    config as Record<string, unknown> | null | undefined,
    settings as Record<string, unknown> | null | undefined
  );
  const rrAffinityEnabled = settings?.promptCacheAffinityEnabled !== false;
  if (rrAffinityEnabled && resolvePromptCacheAffinityKey(body)) {
    filteredTargets = await expandPromptCacheAffinityTargets(filteredTargets);
    modelCount = filteredTargets.length;
  }
  if (disableSessionStickiness) {
    clearStickyBindingsForCombo(combo.name);
  }
  const _rrSessionSticky = disableSessionStickiness
    ? ({ targets: filteredTargets, messageHash: null, stuck: false } as const)
    : await applySessionStickiness(
        filteredTargets,
        // #7270: normalize both wire shapes (.messages / Responses-API .input) so RR
        // stickiness engages on the /v1/responses surface, not just Chat Completions.
        normalizeStickinessMessages(body as { messages?: unknown; input?: unknown }),
        combo.name
      );
  const rrAffinity = applyPromptCacheAffinity(
    filteredTargets,
    body,
    rrAffinityEnabled,
    "global",
    relayOptions?.sessionId
  );
  if (rrAffinity.applied) {
    const stickyFirst = _rrSessionSticky.stuck ? _rrSessionSticky.targets[0] : null;
    filteredTargets = stickyFirst
      ? [stickyFirst, ...rrAffinity.targets.filter((target) => target !== stickyFirst)]
      : rrAffinity.targets;
    log.debug?.("COMBO-RR", "Prompt-cache affinity applied", {
      source: rrAffinity.source,
      fingerprint: rrAffinity.fingerprint,
      targetCount: filteredTargets.length,
    });
  }
  let rrStartIndex = startIndex;
  if (rrAffinity.applied) {
    rrStartIndex = 0;
  }
  if (_rrSessionSticky.stuck) {
    const stickyIdx = filteredTargets.findIndex(
      (t) => t.connectionId === _rrSessionSticky.targets[0]?.connectionId
    );
    if (stickyIdx >= 0) rrStartIndex = stickyIdx;
  }

  const clientRequestedStream = body?.stream === true;
  const startTime = Date.now();
  let lastError: string | null = null;
  let lastStatus: number | null = null;
  let earliestRetryAfter: ComboRetryAfter | null = null;
  let globalAttempts = 0;
  let fallbackCount = 0;
  let recordedAttempts = 0;
  // #11134: operator-configurable shared attempt budget (clamped to the hard
  // cap). Defaults to MAX_GLOBAL_ATTEMPTS when unset.
  const maxGlobalAttempts = clampGlobalAttempts(config.maxGlobalAttempts);
  // #10314: per-target outcome accumulator for the round-robin twin so the
  // terminal message lists each distinct reason separately (see the quality path
  // and the "Done with this model" path below), mirroring handleComboChat.
  const rrOutcomes: Array<ComboErrorEntry> = [];

  // G4 (silent-stop fix): round-robin has NO global timeout — a hung model
  // (per-model timeout disabled via targetTimeoutMs: 0) would freeze the request
  // forever with no response. Safety promise + timer bound the whole loop; when
  // it fires, rrExpired flips and every subsequent model attempt short-circuits
  // to the 504. Cleaned up in the loop's finally.
  const rrConfiguredTimeoutMs = (config as { comboTimeoutMs?: number }).comboTimeoutMs ?? 0;
  const rrLoopSafetyMs =
    rrConfiguredTimeoutMs > 0 ? rrConfiguredTimeoutMs : COMBO_LOOP_SAFETY_TIMEOUT_MS;
  let rrExpired = false;
  let rrLoopSafetyTimer: ReturnType<typeof setTimeout> | null = null;
  let rrResolveSafety: ((res: Response) => void) | null = null;
  const rrSafetyPromise = new Promise<Response>((resolve) => {
    rrResolveSafety = resolve;
  });
  rrLoopSafetyTimer = setTimeout(() => {
    rrExpired = true;
    log.warn(
      "COMBO-RR",
      `Round-robin loop exceeded ${rrLoopSafetyMs}ms without a terminal response — force-terminating`
    );
    rrResolveSafety?.(
      errorResponse(
        504,
        `Round-robin combo exceeded ${rrLoopSafetyMs}ms without a terminal response`
      )
    );
  }, rrLoopSafetyMs);
  rrLoopSafetyTimer.unref?.();

  // #1731: Per-request in-memory set of providers whose quota is fully exhausted.
  // When a target returns a quota-exhausted 429, remaining targets from the same
  // provider are skipped to avoid the cascade through N same-provider targets.
  const exhaustedProviders = new Set<string>();
  const exhaustedConnections = new Set<string>();
  const transientRateLimitedProviders = new Set<string>();

  // Try each model starting from the round-robin target
  try {
    for (let offset = 0; offset < modelCount; offset++) {
      // G4: stop launching new work once the safety timer fired.
      if (rrExpired) break;
      const modelIndex = (rrStartIndex + offset) % modelCount;
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
          clearStaleLKGP(combo.name, target.executionKey, combo.id, log, "COMBO-RR");
          if (offset > 0) fallbackCount++;
          continue;
        }
      }

      if (
        resilienceSettings.providerCooldown.enabled &&
        Boolean(provider && provider !== "unknown") &&
        isProviderInCooldown(
          provider,
          target.connectionId as string | undefined,
          resilienceSettings
        )
      ) {
        log.info("COMBO-RR", `Skipping ${modelStr} — provider ${provider} in global cooldown`);
        clearStaleLKGP(combo.name, target.executionKey, combo.id, log, "COMBO-RR");
        if (offset > 0) fallbackCount++;
        continue;
      }

      // #1731 / #1731v2: skip targets already known-exhausted this request (shared predicate).
      const exhaustedSkip = getExhaustedTargetSkipReason(
        target,
        exhaustedProviders,
        exhaustedConnections
      );
      if (exhaustedSkip) {
        log.info("COMBO-RR", exhaustedSkip);
        clearStaleLKGP(combo.name, target.executionKey, combo.id, log, "COMBO-RR");
        if (offset > 0) fallbackCount++;
        continue;
      }

      // #9654 Wave 2: per-target lane-aware admission probe (see executeTarget
      // for the full contract — strictly non-blocking, lanes-off no-op).
      if (
        perTargetAdmission &&
        !(await perTargetAdmission({ modelStr, executionKey: target.executionKey, body }))
      ) {
        log.info("COMBO-RR", `Skipping ${modelStr} — admission lane full (#9654)`);
        if (offset > 0) fallbackCount++;
        continue;
      }

      // Acquire semaphore slot (may wait in queue). Honor the connection's own
      // maxConcurrent cap when set; else fall back to the combo-level concurrency.
      const targetConcurrency = await resolveTargetConcurrency(target.connectionId);
      let release: () => void;
      try {
        release = await semaphore.acquire(semaphoreKey, {
          maxConcurrency: targetConcurrency,
          timeoutMs: queueTimeout,
          maxQueueSize: queueDepth,
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
          if (globalAttempts > maxGlobalAttempts) {
            log.warn(
              "COMBO-RR",
              `Maximum combo attempts (${maxGlobalAttempts}) exceeded. Terminating loop to prevent runaway requests.`
            );
            return errorResponseWithComboDiagnostics(503, "Maximum combo retry limit reached", {
              poolSize: modelCount,
              attempted: globalAttempts,
              excluded: [
                ...[...exhaustedProviders].map((p) => ({ provider: p, reason: "exhausted" })),
                ...[...exhaustedConnections].map((c) => formatExhaustedConnectionKey(String(c))),
              ],
              attemptOrder: rrOutcomes.map((o) => ({
                provider: o.model.split("/")[0] || "unknown",
                model: o.model,
              })),
              terminalReason: "max_attempts_exceeded",
              recovery: buildRecoveryHint("max_attempts_exceeded"),
            });
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

          // Issue #3587: Reasoning models can spend the whole output budget on
          // reasoning. Apply any safe buffer to a per-attempt copy so round-robin
          // retries never compound across models.
          // #7847: UNCONDITIONAL — copying only when the buffer changed max_tokens left every
          // other attempt sharing the caller's object, leaking chatCore's `body.model` forward.
          let attemptBody = { ...(body as Record<string, unknown>) } as typeof body;
          {
            const bodyRecord = attemptBody as Record<string, unknown>;
            const currentMaxTokens = toPositiveInteger(bodyRecord.max_tokens);
            const bufferedMaxTokens = resolveReasoningBufferedMaxTokens(
              modelStr,
              bodyRecord.max_tokens,
              { enabled: reasoningTokenBufferEnabled }
            );
            if (
              currentMaxTokens !== null &&
              bufferedMaxTokens !== null &&
              bufferedMaxTokens !== currentMaxTokens
            ) {
              // Safe to write in place: bodyRecord is the per-attempt copy above, not the caller's.
              bodyRecord.max_tokens = bufferedMaxTokens;
              log.info(
                "COMBO-RR",
                `Reasoning model ${modelStr}: adjusted max_tokens ${currentMaxTokens} -> ${bufferedMaxTokens}`
              );
            }
          }

          // #5501: combo system_message template expansion per target (same gate
          // as the main iteration loop — round-robin branches here, not executeTarget).
          attemptBody = expandComboSystemPromptIfPresent(attemptBody, combo, {
            modelId: modelStr,
            providerId: provider !== "unknown" ? provider : "",
            account:
              typeof target.label === "string" && target.label.trim().length > 0
                ? target.label.trim()
                : "",
            fingerprint: resolveTargetFingerprint(target) ?? "",
          });

          const result = await Promise.race([
            handleSingleModel(attemptBody, modelStr, {
              ...targetForAttempt,
              effectiveComboStrategy: "round-robin",
              failoverBeforeRetry: config.failoverBeforeRetry,
            }),
            rrSafetyPromise,
          ]);
          if (rrExpired) return result; // G4: safety timer won — stop everything

          // Quota-aware scheduling: reserve the estimated budget for this
          // dispatch (opt-in, same env gate as the pre-request check). Best-effort
          // and non-blocking — recording must never break the request path.
          if (
            process.env.OMNIROUTE_QUOTA_AWARE_ROUTING === "1" &&
            target.connectionId &&
            attemptBody &&
            typeof attemptBody === "object"
          ) {
            try {
              const { reserveQuota } = await import("../../../src/lib/quota/quotaScheduler.ts");
              reserveQuota(target.connectionId, modelStr, attemptBody as Record<string, unknown>, {
                tokenLimit: await resolveTargetTokenLimit(target),
              });
            } catch {
              // best-effort only
            }
          }

          // Success — validate response quality before returning
          if (result.ok) {
            let rrClone: Response;
            try {
              rrClone = result.clone();
            } catch {
              rrClone = result;
            }
            const quality = await validateResponseQuality(
              rrClone,
              clientRequestedStream,
              log,
              config.responseValidation
            );
            releaseQualityClone(rrClone, result, quality);
            if (!quality.valid) {
              releaseRejectedQualityResponse(rrClone, result);
              log.warn(
                "COMBO-RR",
                `${modelStr} returned 200 but failed quality check: ${quality.reason}`
              );
              // #6692: same rationale as handleComboChat's quality-fail branch —
              // a quality-rejected 200 never marks the connection row unhealthy,
              // so release the sticky pin here rather than on the next turn.
              {
                const rrSelectedConnectionId =
                  result.headers?.get("X-OmniRoute-Selected-Connection-Id") ||
                  result.headers?.get("x-omniroute-selected-connection-id") ||
                  undefined;
                releaseStickyPinOnFailure(
                  _rrSessionSticky.messageHash,
                  rrSelectedConnectionId || target.connectionId
                );
              }
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
              lastStatus = 502;
              rrOutcomes.push({
                model: modelStr,
                status: 502,
                error: quality.reason || "upstream response failed quality validation",
                kind: "quality",
              });
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

            const selectedConnectionId =
              result.headers?.get("X-OmniRoute-Selected-Connection-Id") ||
              result.headers?.get("x-omniroute-selected-connection-id") ||
              undefined;
            const effectiveConnectionId = selectedConnectionId || target.connectionId || "";

            const rawModel = parseModel(modelStr).model || modelStr;
            if (provider && rawModel) {
              const dcResult = decayModelFailureCount(provider, effectiveConnectionId, rawModel);
              if (dcResult.cleared) {
                log.info("COMBO-RR", `Model ${modelStr} fully recovered — lockout cleared`);
              } else if (dcResult.newFailureCount > 0) {
                log.debug?.(
                  "COMBO-RR",
                  `Model ${modelStr} decayed to failureCount=${dcResult.newFailureCount}`
                );
              }
            }

            if (provider && provider !== "unknown") {
              recordProviderSuccess(provider, effectiveConnectionId || undefined);
            }

            if (stickyRoundRobinEnabled) {
              recordStickyRoundRobinSuccess(combo.name, target, stickyLimit, filteredTargets);
            } else {
              // #948: true round-robin (stickyLimit <= 1). The counter was advanced
              // eagerly (+1 from the scheduled start index) before this loop ran, so
              // when the scheduled model failed and a *different* model served via
              // fallback, the next request reused the fallback-served model. Advance
              // the pointer past the model that ACTUALLY served (modelIndex) instead,
              // mirroring recordStickyRoundRobinSuccess's served-index logic. Read
              // side applies `% modelCount`, so storing modelIndex + 1 is correct.
              rrCounters.set(combo.name, modelIndex + 1);
            }

            // #3825: (re)record the sticky binding so the next turn re-pins (prompt-cache).
            if (_rrSessionSticky.messageHash) {
              const stickyConn = effectiveConnectionId || target.connectionId;
              if (stickyConn) recordStickyBinding(_rrSessionSticky.messageHash, stickyConn);
            }

            if (provider) {
              const connId = effectiveConnectionId || undefined;
              void (async () => {
                try {
                  const { setLKGP } = await import("@/lib/db/settings");
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
            // Clone is consumed by quality check; original stays unlocked.
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
          const isTokenLimitBreach =
            result.status === 429 && isTokenLimitBreachErrorBody(errorBody);
          const isLocalQueueCapacity = isLocalQueueCapacityErrorBody(errorBody);

          if (isLocalQueueCapacity) {
            log.info(
              "COMBO-RR",
              `Local rate-limit queue capacity reached for ${modelStr} — returning without upstream fallback`
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
          const scopedFailure = isScopedFailure(result, errorText, structuredError);
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
          const selectedConnectionId =
            result.headers?.get("X-OmniRoute-Selected-Connection-Id") ||
            result.headers?.get("x-omniroute-selected-connection-id") ||
            undefined;
          const targetWithConnection = selectedConnectionId
            ? { ...target, connectionId: selectedConnectionId }
            : target;

          const isAllAccountsRateLimited = isAllAccountsRateLimitedResponse(
            result.status,
            result.headers?.get("content-type") ?? null,
            errorText
          );

          // #1731: If the entire provider quota is exhausted, mark it so subsequent
          // same-provider targets are skipped immediately. API-key 429s still use
          // the short resilience cooldown, but explicit quota text should stop the
          // combo from trying another target for the same provider in this request.
          // #1731 / #1731v2: classify the upstream error and update the exhaustion sets
          // (shared with handleComboChat). Returns whether the provider is fully exhausted.
          const providerExhausted = applyComboTargetExhaustion(targetWithConnection, {
            result,
            fallbackResult,
            errorText,
            rawModel: parseModel(modelStr).model || modelStr,
            isTokenLimitBreach,
            allAccountsRateLimited: isAllAccountsRateLimited,
            requestScopedFailure: scopedFailure,
            sets: { exhaustedProviders, exhaustedConnections, transientRateLimitedProviders },
            log,
            tag: "COMBO-RR",
            exhaustedLogLevel: "debug",
            structuredError,
          });
          // #6692: mirrors handleComboChat's exhaustion-point release above.
          releaseStickyPinOnFailure(
            _rrSessionSticky.messageHash,
            targetWithConnection.connectionId
          );
          if (
            providerExhausted ||
            exhaustedConnections.has(`${provider}:${targetWithConnection.connectionId}`) ||
            (provider && exhaustedProviders.has(provider))
          ) {
            clearStaleLKGP(combo.name, target.executionKey, combo.id, log, "COMBO-RR");
          }

          // Transient errors → mark in semaphore so round-robin stops stampeding this target.
          if (
            !isStreamReadinessFailure &&
            !isTokenLimitBreach &&
            !scopedFailure &&
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
            !scopedFailure &&
            [408, 429, 500, 502, 503, 504].includes(result.status);
          // See the same guard's comment in the "auto" strategy loop above —
          // failoverBeforeRetry must prevent this same-model retry too, not
          // just the lower-level skipUpstreamRetry mechanism. Only skip when
          // `offset + 1 < modelCount` means a sibling target is actually left
          // in this rotation; with none left, skipping just wastes the attempt.
          // #10217 round-4 fix: opt-in only — read failoverBeforeRetryExplicit,
          // not config.failoverBeforeRetry (see comboConfig.ts comment).
          const hasNextRrTarget = offset + 1 < modelCount;
          if (
            retry < maxRetries &&
            isTransient &&
            !providerExhausted &&
            (!config.failoverBeforeRetryExplicit || !hasNextRrTarget)
          ) {
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
          // LKGP (#919) mirror of handleComboChat's failure-path clear above — see
          // that comment for why this must happen (nothing else clears a pin left
          // by a request-scoped failure class like a stream-readiness timeout).
          clearStaleLKGP(combo.name, target.executionKey, combo.id, log, "COMBO-RR");
          recordedAttempts++;
          lastError = errorText || String(result.status);
          lastStatus = result.status;
          rrOutcomes.push({
            model: modelStr,
            status: result.status,
            error: errorText || String(result.status),
            kind: classifyComboOutcome(result.status, errorText),
          });
          if (offset > 0) fallbackCount++;
          log.warn("COMBO-RR", `${modelStr} failed, trying next model`, {
            status: result.status,
            errorBody: redactConnectionLabel(errorText),
          });

          if (
            resilienceSettings.providerCooldown.enabled &&
            provider &&
            provider !== "unknown" &&
            !scopedFailure &&
            !(
              (result.status === 500 || result.status === 429) &&
              hasPerModelQuota(provider, parseModel(modelStr).model || modelStr)
            )
          ) {
            recordProviderCooldown(
              provider,
              targetWithConnection.connectionId ?? undefined,
              resilienceSettings
            );
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
  } catch (err) {
    // G4: unexpected exception in the round-robin loop must never crash the
    // request silently — surface a 500 instead of hanging the client.
    log.error?.("COMBO-RR", "Unexpected error in round-robin loop", err);
    return errorResponse(500, "Unexpected error in round-robin combo");
  } finally {
    if (rrLoopSafetyTimer) {
      clearTimeout(rrLoopSafetyTimer);
      rrLoopSafetyTimer = null;
    }
  }

  // G4: if the safety timer fired between iterations (no race captured it),
  // terminate with the actionable 504 instead of the generic exhaustion path.
  if (rrExpired) {
    return errorResponse(
      504,
      `Round-robin combo exceeded ${rrLoopSafetyMs}ms without a terminal response`
    );
  }

  // All models exhausted
  const latencyMs = Date.now() - startTime;

  // #6238: every compat-kept target was skipped as unavailable and NONE was ever
  // attempted (recordedAttempts === 0). Before crystallizing 503, probe the targets
  // the compat pre-filter rejected — a compat-rejected-but-healthy provider is a
  // valid last-resort fallback tier, not a permanently dropped target.
  if (recordedAttempts === 0 && compatRejectedTargets.length > 0) {
    const compatFallbackResult = await attemptCompatRejectedFallback(compatRejectedTargets, body, {
      handleSingleModel,
      isModelAvailable,
      isProviderInCooldown: (target) =>
        resilienceSettings.providerCooldown.enabled &&
        Boolean(target.provider && target.provider !== "unknown") &&
        isProviderInCooldown(
          target.provider as string,
          target.connectionId as string | undefined,
          resilienceSettings
        ),
      log,
      strategy: "round-robin",
    });
    if (compatFallbackResult) {
      recordComboRequest(combo.name, null, {
        success: true,
        latencyMs: Date.now() - startTime,
        fallbackCount,
        strategy: "round-robin",
      });
      return compatFallbackResult;
    }
  }

  if (recordedAttempts === 0) {
    recordComboRequest(combo.name, null, {
      success: false,
      latencyMs,
      fallbackCount,
      strategy: "round-robin",
    });
  }

  if (!lastStatus) {
    if (recordedAttempts === 0) {
      return new Response(
        JSON.stringify({
          error: {
            message:
              "Service temporarily unavailable: all targets were skipped by pre-dispatch filters",
            type: "service_unavailable",
            code: "ALL_TARGETS_SKIPPED",
          },
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }
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

  // #10501: same terminal-status policy as handleComboChat — see
  // comboErrorAggregation.ts::resolveComboTerminalStatus.
  const status = resolveComboTerminalStatus(rrOutcomes, lastStatus);
  // #10314: same structured per-target aggregation as handleComboChat — list each
  // distinct reason separately (redacted), fall back to lastError when no outcome.
  const msg =
    formatComboOutcomes(rrOutcomes) || lastError || "All round-robin combo models unavailable";

  if (earliestRetryAfter && isRetryAfterEligibleStatus(status)) {
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
