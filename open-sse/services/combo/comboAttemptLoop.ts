/**
 * Set-try + speculative dispatch loop for handleComboChatInner.
 * Extracted from combo.ts dispatchWithCooldownRetry (#11804 finally lives here).
 *
 * @internal — not part of the public combo.ts barrel.
 */
import { formatRetryAfter, getModelLockoutInfo } from "../accountFallback.ts";
import {
  errorResponse,
  errorResponseWithComboDiagnostics,
  unavailableResponse,
} from "../../utils/error.ts";
import type { ComboDiagnostics } from "../../utils/error.ts";
import { COMBO_FAILURE_THRESHOLD, recordComboFailure } from "./failureTracker.ts";
import { buildNoUpstreamResponseDiagnostics, buildRecoveryHint } from "./pinRecovery.ts";
import { formatExhaustedConnectionKey } from "./comboDiagFormat.ts";
import { recordComboRequest } from "../comboMetrics.ts";
import { notifyWebhookEvent } from "../../../src/lib/webhookDispatcher.ts";
import { parseModel } from "../model.ts";
import {
  formatComboOutcomes,
  buildRedactedSummary,
  resolveComboTerminalStatus,
} from "./comboErrorAggregation.ts";
import {
  resolveComboCooldownWaitDecision,
  resolveCircuitOpenWaitDecision,
  type ResolveComboCooldownDecisionResult,
} from "./comboCooldownRetry.ts";
import {
  computeClosestRetryAfter,
  waitForCooldownAwareRetry,
} from "../../../src/sse/services/cooldownAwareRetry.ts";
import { toRetryAfterDisplayValue } from "./validateQuality.ts";
import { finalizeComboTrace, finishComboTrace } from "./decisionTrace.ts";
import { isRetryAfterEligibleStatus } from "./unavailableRetryGate.ts";
import { withQuotaExhaustionClassification } from "./quotaExhaustion.ts";
import {
  COMBO_LOOP_SAFETY_TIMEOUT_MS,
  COMBO_SAFETY_DRAIN_MS,
  resolveDelayMs,
} from "./comboPredicates.ts";
import { evaluateExecuteTargetGates } from "./executeTargetGates.ts";
import { executeTargetAttempt } from "./executeTargetAttempt.ts";
import type { AttemptLoopDeps, AttemptLoopState, ExecuteTargetResult } from "./attemptLoopTypes.ts";

export type DispatchWithCooldownRetryExtra = {
  maxSetRetries: number;
  setRetryDelayMs: number;
  comboTimeoutMs: number;
  comboStartTime: number;
  comboCooldownWaitEnabled: boolean;
  comboCooldownAttempt: { current: number };
  comboCooldownBudgetLeftMs: { current: number };
  evaluateGates: typeof evaluateExecuteTargetGates;
  executeAttempt: typeof executeTargetAttempt;
};

export async function dispatchWithCooldownRetry(opts: {
  state: AttemptLoopState;
  deps: AttemptLoopDeps;
  extra: DispatchWithCooldownRetryExtra;
}): Promise<Response> {
  const { state, deps, extra } = opts;
  // #7360: persist lastStatus/earliestRetryAfter across set retries; reset
  // only on a fresh dispatch (including cooldown-aware re-dispatch).
  state.lastError = null;
  state.earliestRetryAfter = null;
  state.lastStatus = null;
  state.skippedForCircuitOpen = false;
  state.earliestCircuitOpenRetryMs = 0;
  // #11804: the loop-safety timer is armed per setTry iteration but must be
  // cleared on EVERY exit path, not just the happy one. Hoisted to function
  // scope so the `finally` at the end of this function always reaches it.
  let activeLoopSafetyTimer: ReturnType<typeof setTimeout> | null = null;

  try {
    for (let setTry = 0; setTry <= extra.maxSetRetries; setTry++) {
      // #1731: Per-set-iteration set of providers whose quota is fully exhausted.
      // Reset each retry so providers excluded in a previous attempt get another chance.
      state.exhaustedProviders = new Set<string>();
      state.exhaustedConnections = new Set<string>();
      state.transientRateLimitedProviders = new Set<string>();
      state.skippedForCircuitOpen = false;
      state.earliestCircuitOpenRetryMs = 0;
      if (setTry > 0) {
        deps.log.info(
          "COMBO",
          `All targets failed — retrying set (${setTry}/${extra.maxSetRetries})`
        );
        await new Promise((resolve) => {
          const timer = setTimeout(resolve, extra.setRetryDelayMs);
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
          deps.log.info("COMBO", "Client disconnected during set retry delay — aborting");
          return errorResponse(499, "Client disconnected");
        }
      }

      deps.startTime = Date.now();
      state.fallbackCount = 0;
      state.recordedAttempts = 0;
      state.comboErrors = [];

      // QA P0: assemble a sanitized diagnostic trace from the state already in scope
      // (pool size + this set-try's exhausted providers/connections + attempt order +
      // a terminal-reason code). Never touches keys/tokens — provider/model ids only.
      // Silent-stop fix: include a `recovery` hint (action verb + human next-step) so the
      // OC plugin + non-header-aware clients can render an actionable error instead of an
      // opaque 5xx. The optional `retryAfterSeconds` carries the upstream Retry-After hint.
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

      let globalResolve: ((res: Response) => void) | null = null;
      const globalPromise = new Promise<Response>((res) => {
        globalResolve = res;
      });

      // G1 (silent-stop fix): the speculative loop's `Promise.race` waits on
      // `globalPromise`, which is ONLY resolved from inside a task (success or
      // fatal error). If a target hangs — e.g. the operator disabled the per-model
      // timeout (`targetTimeoutMs: 0`) and the upstream never settles — the race
      // never resolves and the request hangs forever with no response. This safety
      // promise force-resolves after the combo budget (extra.comboTimeoutMs when set,
      // otherwise a hard ceiling) so the request ALWAYS terminates with an
      // actionable 504 instead of dying silently. `state.comboExpired` is flipped so the
      // target loop stops launching new work; the existing state.comboExpired branch
      // returns the aggregated 504.
      const loopSafetyMs =
        extra.comboTimeoutMs > 0 ? extra.comboTimeoutMs : COMBO_LOOP_SAFETY_TIMEOUT_MS;
      let loopSafetyFired = false;
      let loopSafetyTimer: ReturnType<typeof setTimeout> | null = null;
      const loopSafetyPromise = new Promise<Response>((resolve) => {
        loopSafetyTimer = setTimeout(() => {
          loopSafetyFired = true;
          deps.log.warn(
            "COMBO",
            `Combo loop safety timeout (${loopSafetyMs}ms) reached without a terminal response — force-terminating`
          );
          resolve(
            errorResponseWithComboDiagnostics(
              504,
              `Combo global timeout (${loopSafetyMs}ms) without a terminal response`,
              buildComboDiag("combo_timeout"),
              { code: "COMBO_TIMEOUT", type: "server_error" }
            )
          );
        }, loopSafetyMs);
        loopSafetyTimer.unref?.();
        activeLoopSafetyTimer = loopSafetyTimer;
      });
      const runningTasks = new Set<Promise<void>>();
      let anySuccess = false;
      // #10681: steps already recorded as dispatched (so per-target retries do not
      // duplicate the decision).
      state.dispatchedTargets = new Set<string>();
      // G1: flip state.comboExpired as soon as the safety timer fires so the next loop
      // iteration breaks instead of launching more targets after the budget, and
      // abort every in-flight target so a hung upstream actually gets cancelled
      // (not just "response stops").
      const markLoopExpiredIfSafetyFired = () => {
        if (loopSafetyFired) {
          state.comboExpired = true;
          for (const [, ac] of state.abortControllers.entries()) ac.abort();
        }
      };
      state.abortControllers = new Map<number, AbortController>();
      const zeroLatencyOptimizationsEnabled = deps.config.zeroLatencyOptimizationsEnabled === true;
      const hasProtectedPriorityTarget =
        deps.strategy === "priority" &&
        state.orderedTargets.some((target) => target.fallbackOnlyOnQuotaExhaustion === true);

      const executeTarget = async (i: number): Promise<ExecuteTargetResult> => {
        const gate = await extra.evaluateGates({ index: i, state, deps });
        if (gate.kind === "skip") return gate.result;
        return extra.executeAttempt({
          index: i,
          state,
          deps,
          targetForAttempt: gate.targetForAttempt,
          profile: gate.profile,
          protectedPriorityTarget: gate.protectedPriorityTarget,
        });
      };

      for (let i = 0; i < state.orderedTargets.length; i++) {
        if (anySuccess || state.comboExpired) break;

        const abortController = new AbortController();
        state.abortControllers.set(i, abortController);
        const onClientAbort = () => abortController.abort();
        deps.signal?.addEventListener("abort", onClientAbort);

        const task = (async () => {
          try {
            const res = await executeTarget(i);
            if (res && !anySuccess) {
              if (res.ok) {
                anySuccess = true;
                globalResolve!(res.response!);
                for (const [idx, ac] of state.abortControllers.entries()) {
                  if (idx !== i) ac.abort();
                }
              } else if (res.response) {
                // Fatal error, abort combo
                anySuccess = true;
                globalResolve!(res.response);
              }
            }
          } finally {
            deps.signal?.removeEventListener("abort", onClientAbort);
          }
        })().catch((err) => {
          const logError = deps.log.error ?? deps.log.warn;
          logError("COMBO", `Speculative task error for target ${i}`, err);
          // G2 (silent-stop fix): never leave the speculative loop waiting on an
          // unresolved globalPromise. If a task throws unexpectedly (outside
          // executeTarget's error handling) and no other task succeeds, the post-loop
          // `Promise.race([globalPromise, ...])` would hang forever. Resolve with a
          // 502 so the request terminates with an actionable error.
          if (!anySuccess && globalResolve) {
            anySuccess = true;
            globalResolve(errorResponse(502, `Combo target ${i} failed with an unexpected error`));
          }
        });

        runningTasks.add(task);
        task.finally(() => runningTasks.delete(task));

        if (
          zeroLatencyOptimizationsEnabled &&
          deps.config.hedging &&
          !hasProtectedPriorityTarget &&
          i + 1 < state.orderedTargets.length
        ) {
          const hedgeDelay = resolveDelayMs(deps.config.hedgeDelayMs, 500);
          const timeoutPromise = new Promise<void>((r) => {
            setTimeout(r, hedgeDelay);
          });
          await Promise.race([task, globalPromise, timeoutPromise, loopSafetyPromise]);
        } else {
          await Promise.race([task, globalPromise, loopSafetyPromise]);
        }
        markLoopExpiredIfSafetyFired();

        // Global combo timeout check: after each target completes, stop trying
        // further targets if the total elapsed time exceeds extra.comboTimeoutMs.
        if (
          !anySuccess &&
          extra.comboTimeoutMs > 0 &&
          Date.now() - extra.comboStartTime >= extra.comboTimeoutMs
        ) {
          state.comboExpired = true;
          deps.log.info(
            "COMBO",
            `Combo global timeout (${extra.comboTimeoutMs}ms) reached after ` +
              `${i + 1}/${state.orderedTargets.length} targets (${state.recordedAttempts} attempted) — stopping`
          );
        }
      }

      if (!anySuccess && runningTasks.size > 0) {
        // G1: include loopSafetyPromise so a hung last task (per-model timeout
        // disabled) cannot freeze this post-loop race forever.
        await Promise.race([globalPromise, Promise.all([...runningTasks]), loopSafetyPromise]);
        markLoopExpiredIfSafetyFired();
      }

      // G1: if the safety timer won the race (request would otherwise hang), give
      // in-flight tasks a short drain window to land their per-model errors into
      // state.comboErrors so the 504 carries the same "tried: a (500)" summary the
      // regular state.comboExpired branch produces — then return the safety 504.
      if (loopSafetyFired && !anySuccess) {
        if (runningTasks.size > 0) {
          await Promise.race([
            Promise.allSettled([...runningTasks]),
            new Promise((resolve) => setTimeout(resolve, COMBO_SAFETY_DRAIN_MS)),
          ]);
        }
        const summary = state.comboErrors
          .slice(0, 5)
          .map((e) => `${e.model} (${e.status})`)
          .join(", ");
        const msg =
          `Combo global timeout (${loopSafetyMs}ms) after ${state.recordedAttempts}/${state.orderedTargets.length} targets` +
          (state.comboErrors.length > 0
            ? ` | tried: ${summary}${state.comboErrors.length > 5 ? `... (+${state.comboErrors.length - 5})` : ""}`
            : "") +
          " without a terminal response";
        return errorResponseWithComboDiagnostics(504, msg, buildComboDiag("combo_timeout"), {
          code: "COMBO_TIMEOUT",
          type: "server_error",
        });
      }

      // #10681: finalize the decision trace (success).
      finalizeComboTrace(deps.traceInvocationId, state.orderedTargets);
      finishComboTrace(deps.traceInvocationId, { status: 200 });
      if (anySuccess) {
        // G1: clear the safety timer on the happy path so a successful combo does
        // not leave a 10-minute timer alive per request.
        if (loopSafetyTimer) {
          clearTimeout(loopSafetyTimer);
          loopSafetyTimer = null;
        }
        return await globalPromise;
      }

      // #10681: finalize the decision trace (global timeout).
      finalizeComboTrace(deps.traceInvocationId, state.orderedTargets);
      finishComboTrace(deps.traceInvocationId, { status: 504 });
      // Global combo timeout: return aggregated error immediately, skipping set retries.
      if (state.comboExpired) {
        const summary = buildRedactedSummary(state.comboErrors);
        const msg =
          `Combo global timeout (${extra.comboTimeoutMs}ms) after ${state.recordedAttempts}/${state.orderedTargets.length} targets` +
          (state.comboErrors.length > 0 ? ` | tried: ${summary}` : "");
        const latencyMs = Date.now() - deps.startTime;
        if (state.recordedAttempts === 0) {
          recordComboRequest(deps.combo.name, null, {
            success: false,
            latencyMs,
            fallbackCount: state.fallbackCount,
            strategy: deps.strategy,
          });
        }
        notifyWebhookEvent("request.failed", {
          combo: deps.combo.name,
          reason: "COMBO_TIMEOUT",
          latencyMs,
          fallbackCount: state.fallbackCount,
        });
        return errorResponseWithComboDiagnostics(504, msg, buildComboDiag("combo_timeout"), {
          code: "COMBO_TIMEOUT",
          type: "server_error",
        });
      }

      // All models failed in this set try
      const latencyMs = Date.now() - deps.startTime;
      if (state.recordedAttempts === 0) {
        recordComboRequest(deps.combo.name, null, {
          success: false,
          latencyMs,
          fallbackCount: state.fallbackCount,
          strategy: deps.strategy,
        });
      }

      // Retry the entire set if more attempts remain
      if (setTry < extra.maxSetRetries) continue;

      if (!state.lastStatus && state.recordedAttempts === 0 && extra.comboCooldownWaitEnabled) {
        const circuitOpenWait = resolveCircuitOpenWaitDecision({
          skippedForCircuitOpen: state.skippedForCircuitOpen,
          retryAfterMs: state.earliestCircuitOpenRetryMs,
          attempt: extra.comboCooldownAttempt.current,
          budgetLeftMs: extra.comboCooldownBudgetLeftMs.current,
          settings: deps.resilienceSettings.comboCooldownWait,
        });
        if (circuitOpenWait.wait) {
          deps.log.info(
            "COMBO",
            `${deps.strategy} circuit-open wait: waiting ${Math.ceil(circuitOpenWait.waitMs / 1000)}s (reason=${circuitOpenWait.reason ?? "circuit_open"}) then retrying (attempt ${extra.comboCooldownAttempt.current + 1}/${deps.resilienceSettings.comboCooldownWait.maxAttempts})`
          );
          const completed = await waitForCooldownAwareRetry(circuitOpenWait.waitMs, deps.signal);
          if (!completed) {
            return errorResponse(499, "Request aborted");
          }
          extra.comboCooldownAttempt.current += 1;
          extra.comboCooldownBudgetLeftMs.current = Math.max(
            0,
            extra.comboCooldownBudgetLeftMs.current - circuitOpenWait.waitMs
          );
          return dispatchWithCooldownRetry({ state, deps, extra });
        }
      }

      // All set retries exhausted — return the final error
      // #10681: finalize the decision trace (all targets failed or skipped).
      finalizeComboTrace(deps.traceInvocationId, state.orderedTargets);
      finishComboTrace(deps.traceInvocationId, { status: 503 });
      if (!state.lastStatus) {
        if (state.recordedAttempts === 0) {
          notifyWebhookEvent("request.failed", {
            combo: deps.combo.name,
            reason: "ALL_TARGETS_SKIPPED",
            latencyMs,
            fallbackCount: state.fallbackCount,
          });
          return withQuotaExhaustionClassification(
            errorResponseWithComboDiagnostics(
              503,
              "Service temporarily unavailable: all targets were skipped by pre-dispatch filters",
              buildComboDiag("all_targets_skipped"),
              { code: "ALL_TARGETS_SKIPPED", type: "service_unavailable" }
            ),
            state.observedFailure ? state.allObservedFailuresQuota : null
          );
        }
        notifyWebhookEvent("request.failed", {
          combo: deps.combo.name,
          reason: "ALL_ACCOUNTS_INACTIVE",
          latencyMs,
          fallbackCount: state.fallbackCount,
        });
        recordComboFailure(deps.effectiveSessionId, deps.combo.name);
        return errorResponseWithComboDiagnostics(
          503,
          "Service temporarily unavailable: all upstream accounts are inactive",
          buildComboDiag("all_accounts_inactive"),
          { code: "ALL_ACCOUNTS_INACTIVE", type: "service_unavailable" }
        );
      }

      // #10501: derive the terminal HTTP status from the structured per-target
      // outcomes instead of `state.lastStatus` (whichever target happened to fail
      // LAST). A 4xx is preserved only when the request itself is genuinely
      // invalid across every eligible target; a heterogeneous mix of failure
      // classes (e.g. a quality failure + a sibling's 401) normalizes to a
      // 5xx-class status reflecting an infra/provider problem, not a client
      // error. See comboErrorAggregation.ts::resolveComboTerminalStatus.
      const status = resolveComboTerminalStatus(state.comboErrors, state.lastStatus);
      // #10314: build the terminal message from the structured per-target
      // outcomes (each distinct class+reason listed separately) instead of
      // mashing a single state.lastError with raw `[model (status)]` markers. Connection
      // identifiers are redacted. Falls back to state.lastError when no target recorded
      // a structured outcome.
      const msg =
        formatComboOutcomes(state.comboErrors) || state.lastError || "All combo models unavailable";

      // Cooldown-aware retry: instead of crystallizing a transient failure, wait
      // out a SHORT cooldown and re-run the whole set loop. Guarded by the helper
      // (quota_exhausted/auth/not-found excluded, ceiling, attempts, budget).
      // MAX_GLOBAL_ATTEMPTS still bounds total dispatches. Available to ALL combo
      // strategies when enabled — entry is driven by earliestRetryAfter + the
      // real model-lockout reason, NOT by whichever target last overwrote
      // `status` (a later 403 must not skip the allow-list check for an earlier
      // 429's retry-after hint). SECURITY (see comboCooldownRetry.ts header): the
      // allow-list is the PRIMARY barrier and `maxWaitMs` only the SECOND one.
      // Hardcoding reason:"rate_limit" would drop the primary barrier and leave
      // only the ceiling — which does NOT cover a quota_exhausted lock carrying a
      // SHORT upstream retry-after. Model lockouts are recorded for all strategies,
      // so the real reason is always available.
      if (extra.comboCooldownWaitEnabled && state.earliestRetryAfter) {
        const decision: ResolveComboCooldownDecisionResult = resolveComboCooldownWaitDecision({
          targets: state.orderedTargets,
          earliestRetryAfter: state.earliestRetryAfter,
          attempt: extra.comboCooldownAttempt.current,
          budgetLeftMs: extra.comboCooldownBudgetLeftMs.current,
          settings: deps.resilienceSettings.comboCooldownWait,
          // Key each lookup on the TARGET's own model: quota-share combos are
          // single-model/multi-account (so this is identical to the previous
          // state.orderedTargets[0] behavior), but heterogeneous combos carry a
          // different model per target.
          lookupLock: (provider, connectionId, target) => {
            const rawModel = parseModel(target?.modelStr ?? "").model || "";
            if (!rawModel) return null;
            return getModelLockoutInfo(provider, connectionId, rawModel);
          },
          computeWaitMs: (retryAfter) => computeClosestRetryAfter(retryAfter).waitMs,
        });

        if (decision.wait) {
          deps.log.info(
            "COMBO",
            `${deps.strategy} cooldown wait: ${msg} — waiting ${Math.ceil(
              decision.waitMs / 1000
            )}s (reason=${decision.reason ?? "?"}) then retrying (attempt ${
              extra.comboCooldownAttempt.current + 1
            }/${deps.resilienceSettings.comboCooldownWait.maxAttempts})`
          );
          const completed = await waitForCooldownAwareRetry(decision.waitMs, deps.signal);
          if (!completed) {
            deps.log.info("COMBO", `${deps.strategy} cooldown wait aborted by client disconnect`);
            return errorResponse(499, "Request aborted");
          }
          extra.comboCooldownAttempt.current += 1;
          extra.comboCooldownBudgetLeftMs.current = Math.max(
            0,
            extra.comboCooldownBudgetLeftMs.current - decision.waitMs
          );
          return dispatchWithCooldownRetry({ state, deps, extra });
        }
      }

      // #10681: finalize the decision trace with the aggregated terminal status.
      finalizeComboTrace(deps.traceInvocationId, state.orderedTargets);
      finishComboTrace(deps.traceInvocationId, { status });
      // Retry-after decoration is separate from the wait decision above: only
      // rate-limit-class final statuses may carry a `(reset after ...)` suffix
      // (see unavailableRetryGate.ts — do not stitch a peer target's window onto
      // a config-class status like 403/422).
      if (state.earliestRetryAfter && isRetryAfterEligibleStatus(status)) {
        const retryHuman = formatRetryAfter(toRetryAfterDisplayValue(state.earliestRetryAfter));
        deps.log.warn("COMBO", `All models failed | ${msg} (${retryHuman})`);
        return withQuotaExhaustionClassification(
          unavailableResponse(status, msg, state.earliestRetryAfter, retryHuman),
          state.observedFailure ? state.allObservedFailuresQuota : null
        );
      }

      // Silent-stop fix: bump the failure counter (pin clears on 3rd consecutive) and emit
      // `try-auto` recovery action via buildRecoveryHint so the OC plugin can show "→ Try
      // model: auto" instead of an opaque 5xx. We pass the upstream retry-after seconds to
      // the hint so the client can render a precise "wait Ns and retry" message.
      deps.log.warn("COMBO", `All models failed | ${msg}`);
      const { pinClearedNow } = recordComboFailure(deps.effectiveSessionId, deps.combo.name);
      if (pinClearedNow) {
        deps.log.info(
          "COMBO",
          `Auto-cleared session_model_history pin for combo "${deps.combo.name}" after ${COMBO_FAILURE_THRESHOLD} consecutive failures to break the silent-stop loop`
        );
      }
      const retryAfterSeconds = undefined;
      // #10966: when every observed failure was independently classified as quota/
      // balance exhaustion (isQuotaExhaustionResponse, tracked via state.observeFailure's
      // state.allObservedFailuresQuota accumulator), stamp a stable `quota_exhausted`
      // terminalReason instead of forwarding the raw upstream error string. The raw
      // string falls through buildRecoveryHint's default branch ("retry" / "failed
      // transiently"), which is actively misleading for a durable wallet/quota
      // exhaustion — retrying the same combo will never refill it.
      const terminalReason =
        state.observedFailure && state.allObservedFailuresQuota
          ? "quota_exhausted"
          : (state.lastError ?? "all_models_failed");
      return withQuotaExhaustionClassification(
        errorResponseWithComboDiagnostics(
          status,
          msg,
          buildComboDiag(terminalReason, retryAfterSeconds)
        ),
        state.observedFailure ? state.allObservedFailuresQuota : null
      );
    }

    // Final fallback — when the dispatch returned without crystallizing a status (rare).
    // Surface the recovery hint with a generic retry recommendation so the client at least
    // gets a non-opaque message instead of "Combo routing completed without an upstream response".
    recordComboFailure(deps.effectiveSessionId, deps.combo.name);
    return errorResponseWithComboDiagnostics(
      503,
      "Combo routing completed without an upstream response",
      buildNoUpstreamResponseDiagnostics(state.orderedTargets.length)
    );
  } finally {
    // #11804: always release the loop-safety timer. Covering every exit path by
    // construction here means a future `return` added to this function cannot
    // silently reintroduce the leak.
    if (activeLoopSafetyTimer) {
      clearTimeout(activeLoopSafetyTimer);
      activeLoopSafetyTimer = null;
    }
  }
}
