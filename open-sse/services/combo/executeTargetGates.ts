/**
 * Pre-dispatch skip gates for handleComboChat's executeTarget.
 * Order is locked (spec §4.1). Do not reorder.
 *
 * Extracted from combo.ts executeTarget entry through the retry loop.
 *
 * @internal — not part of the public combo.ts barrel.
 */
import {
  getRuntimeProviderProfile,
  isAccountSemaphoreFull,
  isModelLocked,
} from "../accountFallback.ts";
import { isProviderInCooldown } from "../providerCooldownTracker.ts";
import { checkCredentialGate, logCredentialSkip } from "../credentialGate.ts";
import { errorResponse } from "../../utils/error.ts";
import {
  getCircuitBreaker,
  type CircuitBreakerStatus,
} from "../../../src/shared/utils/circuitBreaker";
import { connectionCircuitBreakerName } from "../connectionCircuitBreaker.ts";
import { parseModel } from "../model.ts";
import { canAffordRequest } from "../../../src/lib/quota/quotaScheduler.ts";
import { getCachedProviderConnectionById } from "../../../src/lib/db/readCache.ts";
import { evaluateCliproxyPreflightGate } from "../../../src/lib/services/cliproxyManagementPreflight.ts";
import { lookupPositiveCap } from "./concurrencyCaps.ts";
import { recordComboDecision } from "./decisionTrace.ts";
import { recordPersistedSkipBypass } from "../comboMetrics.ts";
import {
  getExhaustedTargetSkipReason,
  resolvePersistedConnectionCooldownSkipReason,
} from "./comboPredicates.ts";
import { resolveQuotaExhaustionCutoffForTarget } from "./quotaExhaustionCutoff.ts";
import { protectedPriorityStopStatus } from "./protectedPriorityStopStatus.ts";
import type { ProtectedPriorityStopCause } from "./protectedPriorityStopStatus.ts";
import type { AttemptLoopDeps, AttemptLoopState, GateDecision } from "./attemptLoopTypes.ts";
import { modelAvailabilitySkipReason, type ResolvedComboTarget } from "./types.ts";
import type { PreDispatchExclusion } from "./pinRecovery.ts";

/**
 * The breaker that keeps a target from being dispatched: the provider-wide one
 * first, then the connection-scoped one. Null when neither is OPEN. Shared by the
 * pre-dispatch gate and by the terminal response, so both read the same rule.
 */
export function findOpenCircuitBreaker(
  provider: string,
  connectionId?: string | null
): { scope: "provider" | "connection"; status: CircuitBreakerStatus } | null {
  const providerStatus = getCircuitBreaker(provider).getStatus();
  if (providerStatus.state === "OPEN") return { scope: "provider", status: providerStatus };
  if (!connectionId) return null;
  const connectionStatus = getCircuitBreaker(
    connectionCircuitBreakerName(provider, connectionId)
  ).getStatus();
  return connectionStatus.state === "OPEN"
    ? { scope: "connection", status: connectionStatus }
    : null;
}

/**
 * When every target was skipped because its breaker is OPEN, describe each one
 * (provider, model, time until the next probe) so the terminal response can say
 * so instead of a generic pre-dispatch skip. Null as soon as one target is not
 * behind an open breaker: a mixed pool keeps the generic response.
 */
export function collectCircuitOpenExclusions(
  targets: readonly ResolvedComboTarget[]
): PreDispatchExclusion[] | null {
  if (targets.length === 0) return null;
  const exclusions: PreDispatchExclusion[] = [];
  for (const target of targets) {
    if (!target.provider) return null;
    const open = findOpenCircuitBreaker(target.provider, target.connectionId);
    if (!open) return null;
    exclusions.push({
      provider: target.provider,
      model: parseModel(target.modelStr).model || target.modelStr,
      reason: "circuit_open",
      retryAfterMs: open.status.retryAfterMs > 0 ? open.status.retryAfterMs : null,
    });
  }
  return exclusions;
}

/**
 * Cached vs fresh connection read for the persisted-cooldown gate.
 * `fresh: false` (first attempt) uses the 5s readCache. `fresh: true`
 * (every retry) goes straight to SQLite.
 *
 * Task 2 call sites pass `false` — same as combo.ts executeTarget today.
 * Retry-path `fresh: true` is Task 4 wiring, not this extract.
 */
export async function readConnectionForCooldownGate(
  connectionId: string,
  fresh: boolean
): Promise<Record<string, unknown> | null | undefined> {
  if (!fresh) return getCachedProviderConnectionById(connectionId);
  const { getProviderConnectionById } = await import("@/lib/db/providers");
  return (await getProviderConnectionById(connectionId)) as Record<string, unknown> | null;
}

export async function evaluateExecuteTargetGates(opts: {
  index: number;
  state: AttemptLoopState;
  deps: AttemptLoopDeps;
}): Promise<GateDecision> {
  const { index: i, state, deps } = opts;
  const target = state.orderedTargets[i];
  const modelStr = target.modelStr;
  const rawModel = parseModel(modelStr).model || modelStr;
  const provider = target.provider;
  const protectedPriorityTarget =
    deps.strategy === "priority" && target.fallbackOnlyOnQuotaExhaustion === true;

  const stopProtectedPriorityTarget = (message: string, cause?: ProtectedPriorityStopCause) => {
    state.observeFailure(false, target.executionKey);
    deps.clearStaleLKGP(
      deps.combo.name,
      target.executionKey,
      deps.combo.id,
      deps.log,
      "COMBO",
      undefined,
      target
    );
    return protectedPriorityTarget
      ? { ok: false as const, response: errorResponse(protectedPriorityStopStatus(cause), message) }
      : null;
  };

  // Lift-as-is from combo.ts executeTarget: only count a fallback when
  // this is not the first ordered target. Do not change the condition.
  const bumpFallback = () => {
    if (i > 0) state.fallbackCount++;
  };

  const openBreaker = findOpenCircuitBreaker(provider, target.connectionId);
  if (openBreaker) {
    const providerOpen = openBreaker.scope === "provider";
    const scopedConnectionId = target.connectionId ?? undefined;
    const cbStatus = openBreaker.status;
    state.skippedForCircuitOpen = true;
    if (
      cbStatus.retryAfterMs > 0 &&
      (state.earliestCircuitOpenRetryMs === 0 ||
        cbStatus.retryAfterMs < state.earliestCircuitOpenRetryMs)
    ) {
      state.earliestCircuitOpenRetryMs = cbStatus.retryAfterMs;
    }
    deps.log.info(
      "COMBO",
      providerOpen
        ? `Skipping ${modelStr} — circuit breaker OPEN for ${provider}`
        : `Skipping ${modelStr} — circuit breaker OPEN for connection ${scopedConnectionId}`
    );
    recordComboDecision(deps.traceInvocationId, {
      step: target.executionKey,
      target: modelStr,
      decision: "skipped_before_dispatch",
      reason: "circuit_open",
    });
    bumpFallback();
    return {
      kind: "skip",
      result: stopProtectedPriorityTarget(
        `Provider ${provider} circuit breaker is open`,
        "circuit_open"
      ),
    };
  }

  if (
    deps.resilienceSettings.providerCooldown.enabled &&
    Boolean(provider && provider !== "unknown") &&
    (isProviderInCooldown(provider, target.connectionId ?? undefined, deps.resilienceSettings) ||
      isProviderInCooldown(provider, undefined, deps.resilienceSettings))
  ) {
    deps.log.info("COMBO", `Skipping ${modelStr} — provider ${provider} in global cooldown`);
    recordComboDecision(deps.traceInvocationId, {
      step: target.executionKey,
      target: modelStr,
      decision: "skipped_before_dispatch",
      reason: "provider_cooldown",
    });
    bumpFallback();
    return {
      kind: "skip",
      result: stopProtectedPriorityTarget(`Provider ${provider} is in cooldown`),
    };
  }

  const preScreenEntry = deps.preScreenMap.get(target.executionKey);
  const profile = preScreenEntry?.profile ?? (await getRuntimeProviderProfile(provider));

  const allowRateLimitedConnection =
    Boolean(provider && provider !== "unknown") &&
    state.transientRateLimitedProviders.has(provider);
  const abortSignal = state.abortControllers.get(i)?.signal;
  const targetForAttempt = allowRateLimitedConnection
    ? {
        ...target,
        allowRateLimitedConnection: true,
        modelAbortSignal: abortSignal,
        fallbackAttempts: i,
      }
    : { ...target, modelAbortSignal: abortSignal, fallbackAttempts: i };

  if (target.connectionId) {
    const persistedSkip = await resolvePersistedConnectionCooldownSkipReason(
      target,
      (id) => readConnectionForCooldownGate(id, false),
      allowRateLimitedConnection
    );
    if (persistedSkip) {
      // Lift-as-is: combo.ts skips without observeFailure / stopProtectedPriorityTarget.
      deps.log.info("COMBO", persistedSkip);
      // #12659: this branch used to be untraced, so an ALL_TARGETS_SKIPPED
      // caused purely by persisted cooldowns surfaced as an opaque
      // `attempted=0, excluded=[]` diagnostics body.
      recordComboDecision(deps.traceInvocationId, {
        step: target.executionKey,
        target: modelStr,
        decision: "skipped_before_dispatch",
        reason: "persisted_cooldown",
      });
      deps.clearStaleLKGP(
        deps.combo.name,
        target.executionKey,
        deps.combo.id,
        deps.log,
        "COMBO",
        undefined,
        target
      );
      bumpFallback();
      return { kind: "skip", result: null };
    } else if (allowRateLimitedConnection) {
      // The transient flag re-served a target with no future persisted
      // cooldown: count the bypass for operators.
      recordPersistedSkipBypass(deps.combo.name);
    }
  }

  const exhaustedSkip = getExhaustedTargetSkipReason(
    target,
    state.exhaustedProviders,
    state.exhaustedConnections
  );
  if (exhaustedSkip) {
    deps.log.info("COMBO", exhaustedSkip);
    recordComboDecision(deps.traceInvocationId, {
      step: target.executionKey,
      target: modelStr,
      decision: "skipped_before_dispatch",
      reason: "request_exhaustion",
    });
    bumpFallback();
    return {
      kind: "skip",
      result: stopProtectedPriorityTarget(`Target ${modelStr} is unavailable`),
    };
  }

  if (provider && rawModel && isModelLocked(provider, target.connectionId || "", rawModel)) {
    deps.log.info("COMBO", `Skipping ${modelStr} — model locked by resilience (cooldown active)`);
    recordComboDecision(deps.traceInvocationId, {
      step: target.executionKey,
      target: modelStr,
      decision: "skipped_before_dispatch",
      reason: "model_lockout",
    });
    bumpFallback();
    return {
      kind: "skip",
      result: stopProtectedPriorityTarget(`Model ${modelStr} is locked`),
    };
  }

  if (deps.strategy !== "auto" && provider && target.connectionId) {
    const quotaCutoff = await resolveQuotaExhaustionCutoffForTarget(
      provider,
      target.connectionId,
      deps.resilienceSettings,
      deps.quotaCutoffResetWindowConfig,
      deps.combo.name,
      deps.log,
      modelStr
    );
    if (quotaCutoff.blocked) {
      deps.log.info(
        "COMBO",
        `Skipping ${modelStr} — quota exhaustion cutoff (${quotaCutoff.reason || "quota_exhausted"})`
      );
      deps.clearStaleLKGP(
        deps.combo.name,
        target.executionKey,
        deps.combo.id,
        deps.log,
        "COMBO",
        undefined,
        target
      );
      recordComboDecision(deps.traceInvocationId, {
        step: target.executionKey,
        target: modelStr,
        decision: "skipped_before_dispatch",
        reason: "quota_cutoff",
      });
      bumpFallback();
      state.observeFailure(true, target.executionKey);
      if (protectedPriorityTarget) {
        const protectedTargetTrust = state.targetFailureTrust.get(target.executionKey);
        if (!protectedTargetTrust?.allObservedFailuresQuota) {
          return {
            kind: "skip",
            result: {
              ok: false,
              response: errorResponse(503, `Target ${modelStr} is unavailable`),
            },
          };
        }
      }
      return { kind: "skip", result: null };
    }
  }

  // Lift-as-is: combo.ts reads the env flag inline, not via AttemptLoopDeps.
  if (process.env.OMNIROUTE_QUOTA_AWARE_ROUTING === "1" && provider && target.connectionId) {
    const quotaDecision = canAffordRequest(
      target.connectionId,
      modelStr,
      deps.body as Record<string, unknown> | null | undefined
    );
    if (!quotaDecision.affordable) {
      deps.log.info(
        "COMBO",
        `Skipping ${modelStr} — quota budget ${quotaDecision.reason} (remaining ${quotaDecision.tokensRemaining ?? 0}, cost ${quotaDecision.estimatedCost ?? 0})`
      );
      deps.clearStaleLKGP(
        deps.combo.name,
        target.executionKey,
        deps.combo.id,
        deps.log,
        "COMBO",
        undefined,
        target
      );
      bumpFallback();
      return { kind: "skip", result: null };
    }
  }

  if (deps.isModelAvailable) {
    const available = await deps.isModelAvailable(modelStr, targetForAttempt);
    const skipReason = modelAvailabilitySkipReason(available);
    if (skipReason) {
      deps.log.debug?.(
        "COMBO",
        skipReason === "model_not_in_catalog"
          ? `Skipping ${modelStr} — model is not in the live catalog`
          : `Skipping ${modelStr} — no credentials available or model excluded`
      );
      deps.clearStaleLKGP(
        deps.combo.name,
        target.executionKey,
        deps.combo.id,
        deps.log,
        "COMBO",
        undefined,
        target
      );
      recordComboDecision(deps.traceInvocationId, {
        step: target.executionKey,
        target: modelStr,
        decision: "skipped_before_dispatch",
        reason: skipReason,
      });
      bumpFallback();
      return {
        kind: "skip",
        result: stopProtectedPriorityTarget(`Model ${modelStr} is unavailable`),
      };
    }
  }

  // Lift-as-is: combo.ts uses the same `as string | undefined` cast.
  const connectionId = target.connectionId as string | undefined;
  if (connectionId) {
    // CLIProxyAPI management-health preflight intentionally runs immediately
    // before the credential gate. It only recognizes explicitly CLIProxy-backed
    // connections and fails open for all management API failures or unknown
    // model/account states, so generic OpenAI-compatible targets are unaffected.
    const connection = await getCachedProviderConnectionById(connectionId);
    if (connection) {
      const managementHealth = await evaluateCliproxyPreflightGate({
        connection: {
          id: connectionId,
          provider,
          providerSpecificData:
            connection.providerSpecificData && typeof connection.providerSpecificData === "object"
              ? (connection.providerSpecificData as Record<string, unknown>)
              : null,
        },
        modelStr,
        healthCache: deps.cliproxyManagementHealthCache,
      });
      if (managementHealth.shouldSkip) {
        deps.log.info(
          "COMBO",
          `Skipping ${modelStr} — CLIProxyAPI management health: ${managementHealth.reason || "unavailable"}`
        );
        deps.clearStaleLKGP(
          deps.combo.name,
          target.executionKey,
          deps.combo.id,
          deps.log,
          "COMBO",
          undefined,
          target
        );
        recordComboDecision(deps.traceInvocationId, {
          step: target.executionKey,
          target: modelStr,
          decision: "skipped_before_dispatch",
          reason: "cliproxy_management_health",
        });
        bumpFallback();
        // Same skip contract as quota_cutoff: a cooldown/quota snapshot is not
        // proven infra, so protected-priority may fall through while mixed
        // non-quota trust still answers 503.
        state.observeFailure(true, target.executionKey);
        if (protectedPriorityTarget) {
          const protectedTargetTrust = state.targetFailureTrust.get(target.executionKey);
          if (!protectedTargetTrust?.allObservedFailuresQuota) {
            return {
              kind: "skip",
              result: {
                ok: false,
                response: errorResponse(503, `CLIProxyAPI target ${modelStr} is unavailable`),
              },
            };
          }
        }
        return { kind: "skip", result: null };
      }
    }

    const gateResult = checkCredentialGate(connectionId, provider, modelStr);
    if (gateResult.allowed === false) {
      logCredentialSkip(deps.log, modelStr, gateResult.reason || "Credential gate blocked");
      recordComboDecision(deps.traceInvocationId, {
        step: target.executionKey,
        target: modelStr,
        decision: "skipped_before_dispatch",
        reason: "credential_gate",
      });
      bumpFallback();
      return {
        kind: "skip",
        result: stopProtectedPriorityTarget(`Credential gate blocked ${modelStr}`),
      };
    }

    const maxConcurrentCap = await lookupPositiveCap(connectionId);
    if (maxConcurrentCap && isAccountSemaphoreFull(provider, connectionId, maxConcurrentCap)) {
      deps.log.info(
        "COMBO",
        `Skipping ${modelStr} — connection ${connectionId} is at max concurrency cap (${maxConcurrentCap})`
      );
      recordComboDecision(deps.traceInvocationId, {
        step: target.executionKey,
        target: modelStr,
        decision: "skipped_before_dispatch",
        reason: "concurrency_cap",
      });
      bumpFallback();
      return {
        kind: "skip",
        result: stopProtectedPriorityTarget(`Connection capacity reached for ${modelStr}`),
      };
    }
  }

  if (
    deps.perTargetAdmission &&
    !(await deps.perTargetAdmission({
      modelStr,
      executionKey: target.executionKey,
      body: deps.body,
    }))
  ) {
    deps.log.info("COMBO", `Skipping ${modelStr} — admission lane full (#9654)`);
    recordComboDecision(deps.traceInvocationId, {
      step: target.executionKey,
      target: modelStr,
      decision: "skipped_before_dispatch",
      reason: "admission_lane",
    });
    bumpFallback();
    return { kind: "skip", result: null };
  }

  return {
    kind: "proceed",
    targetForAttempt: targetForAttempt as ResolvedComboTarget,
    profile,
    protectedPriorityTarget,
  };
}
