import { errorResponse, unavailableResponse } from "../../../utils/error";
import { recordComboRequest } from "../../comboMetrics";
import { emit } from "../../../../src/lib/events/eventBus";
import { notifyWebhookEvent } from "../../../../src/lib/webhookDispatcher";
import { formatRetryAfter } from "../../accountFallback";
import { toRetryAfterDisplayValue } from "../../utils";
import { _unregisterExecutionCandidates } from "../../state";
import { resolveDelayMs } from "../../constants";
import { createExecuteTarget, type ExecutionContext } from "./executor";

/**
 * Main execution loop for combo chat with fallback and speculative execution support.
 * Refactored from handleComboChat (lines 763-1574).
 */
export async function runExecutionLoop(ctx: ExecutionContext): Promise<Response> {
  const {
    combo,
    body,
    log,
    signal,
    strategy,
    maxSetRetries,
    setRetryDelayMs,
    config,
    orderedTargets,
    zeroLatencyOptimizationsEnabled,
  } = ctx;

  const registeredExecutionKeys = orderedTargets.map((t) => t.executionKey).filter(Boolean);

  try {
    for (let setTry = 0; setTry <= maxSetRetries; setTry++) {
      // #1731: Per-set-iteration set of providers whose quota is fully exhausted.
      ctx.exhaustedProviders.clear();
      ctx.transientRateLimitedProviders.clear();

      if (setTry > 0) {
        log.info("COMBO", `All targets failed — retrying set (${setTry}/${maxSetRetries})`);

        const { promise, resolve } = Promise.withResolvers<void>();
        const timer = setTimeout(resolve, setRetryDelayMs);
        const onAbort = () => {
          clearTimeout(timer);
          resolve();
        };
        signal?.addEventListener("abort", onAbort, { once: true });

        await promise;

        signal?.removeEventListener("abort", onAbort);

        if (signal?.aborted) {
          log.info("COMBO", "Client disconnected during set retry delay — aborting");
          return errorResponse(499, "Client disconnected");
        }
      }

      // Reset mutable loop state for this set
      ctx.lastError.value = null;
      ctx.earliestRetryAfter.value = null;
      ctx.lastStatus.value = null;
      ctx.startTime = Date.now();
      ctx.fallbackCount.value = 0;
      ctx.recordedAttempts.value = 0;

      const { promise: globalPromise, resolve: globalResolve } = Promise.withResolvers<Response>();
      const runningTasks = new Set<Promise<void>>();
      let anySuccess = false;
      ctx.abortControllers.clear();

      const executeTarget = createExecuteTarget(ctx);

      for (let i = 0; i < orderedTargets.length; i++) {
        if (anySuccess) break;

        const abortController = new AbortController();
        ctx.abortControllers.set(i, abortController);
        const onClientAbort = () => abortController.abort();
        signal?.addEventListener("abort", onClientAbort);

        const task = (async () => {
          try {
            const res = await executeTarget(i);
            if (res && !anySuccess) {
              if (res.ok) {
                anySuccess = true;
                globalResolve(res.response!);
                for (const [idx, ac] of ctx.abortControllers.entries()) {
                  if (idx !== i) ac.abort();
                }
              } else if (res.response) {
                // Fatal error, abort combo
                anySuccess = true;
                globalResolve(res.response);
              }
            }
          } finally {
            signal?.removeEventListener("abort", onClientAbort);
          }
        })().catch((err) => {
          const logError = log.error ?? log.warn;
          logError("COMBO", `Speculative task error for target ${i}`, err);
        });

        runningTasks.add(task);
        task.finally(() => runningTasks.delete(task));

        if (zeroLatencyOptimizationsEnabled && config.hedging && i + 1 < orderedTargets.length) {
          const hedgeDelay = resolveDelayMs(config.hedgeDelayMs as number, 500);

          const { promise: hedgePromise, resolve: hedgeResolve } = Promise.withResolvers<void>();
          const timer = setTimeout(hedgeResolve, hedgeDelay);
          const onHedgeAbort = () => {
            clearTimeout(timer);
            hedgeResolve();
          };
          signal?.addEventListener("abort", onHedgeAbort, { once: true });

          await Promise.race([globalPromise, hedgePromise]);

          signal?.removeEventListener("abort", onHedgeAbort);
        } else if (!anySuccess) {
          // Serial mode: wait for current task before trying next target
          await Promise.race([globalPromise, task]);
        }
      }

      if (!anySuccess && runningTasks.size > 0) {
        await Promise.race([globalPromise, Promise.all([...runningTasks])]);
      }

      if (anySuccess) {
        return await globalPromise;
      }

      // All models failed in this set try
      const latencyMs = Date.now() - ctx.startTime;
      if (ctx.recordedAttempts.value === 0) {
        recordComboRequest(combo.name, null, {
          success: false,
          latencyMs,
          fallbackCount: ctx.fallbackCount.value,
          strategy,
        });
      }

      // Retry the entire set if more attempts remain
      if (setTry < maxSetRetries) continue;

      // All set retries exhausted — return the final error
      if (!ctx.lastStatus.value) {
        notifyWebhookEvent("request.failed", {
          combo: combo.name,
          reason: "ALL_ACCOUNTS_INACTIVE",
          latencyMs,
          fallbackCount: ctx.fallbackCount.value,
        });
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

      const status = ctx.lastStatus.value;
      const msg = ctx.lastError.value || "All combo models unavailable";

      if (ctx.earliestRetryAfter.value) {
        const retryHuman = formatRetryAfter(toRetryAfterDisplayValue(ctx.earliestRetryAfter.value));
        log.warn("COMBO", `All models failed | ${msg} (${retryHuman})`);
        return unavailableResponse(status, msg, ctx.earliestRetryAfter.value, retryHuman);
      }

      log.warn("COMBO", `All models failed | ${msg}`);
      return new Response(JSON.stringify({ error: { message: msg } }), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return errorResponse(503, "Combo routing completed without an upstream response");
  } finally {
    _unregisterExecutionCandidates(registeredExecutionKeys);
  }
}
