/**
 * Wrap a single-model dispatch with a per-target timeout that aborts and falls back.
 *
 * Extracted from handleComboChat's `handleSingleModelWithTimeout` closure (combo.ts).
 * A locally expired timer aborts that target and returns a typed 504 response so the Combo
 * can fall back without treating OmniRoute's own deadline as a provider-connection failure.
 * The per-model abort signal still comes from the target (`target.modelAbortSignal`), so
 * the outer request signal is intentionally NOT a dependency here.
 *
 * See _tasks/superpowers/plans/2026-07-03-blocoJ-combo-hotpath-decomposition.md (Task 1).
 */
import { buildErrorBody, errorResponse, sanitizeErrorMessage } from "../../utils/error.ts";
import type { HandleSingleModel, SingleModelTarget, ComboLogger } from "./types.ts";

/** Stable internal classification for OmniRoute's own combo per-target timer. */
export const COMBO_TARGET_TIMEOUT_CODE = "combo_target_timeout";

export function buildTargetTimeoutRunner(deps: {
  handleSingleModel: HandleSingleModel;
  comboTargetTimeoutMs: number;
  log: ComboLogger;
}): (
  b: Record<string, unknown>,
  modelStr: string,
  target?: SingleModelTarget
) => Promise<Response> {
  const { handleSingleModel, comboTargetTimeoutMs, log } = deps;
  return async (
    b: Record<string, unknown>,
    modelStr: string,
    target?: SingleModelTarget
  ): Promise<Response> => {
    if (comboTargetTimeoutMs <= 0) {
      return handleSingleModel(b, modelStr, target).catch((err) =>
        errorResponse(502, err?.message ?? "Upstream model error")
      );
    }

    const timeoutController = new AbortController();
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let timedOut = false;
    const timeoutPromise = new Promise<Response>((resolve) => {
      timeoutId = setTimeout(() => {
        timedOut = true;
        log.warn(
          "COMBO",
          `Model ${modelStr} exceeded ${comboTargetTimeoutMs}ms timeout — falling back`
        );
        timeoutController.abort(new Error("combo-per-model-timeout"));
        // HTTP 504 (not proprietary 524): this is OmniRoute's own per-target timer.
        // Typed as combo_target_timeout so request-scoped classification can keep the
        // connection eligible for fallback instead of treating it like Cloudflare 524
        // or a genuine upstream gateway timeout.
        resolve(
          new Response(
            JSON.stringify(
              buildErrorBody(504, sanitizeErrorMessage(`Model ${modelStr} timed out`), undefined, {
                type: COMBO_TARGET_TIMEOUT_CODE,
                code: COMBO_TARGET_TIMEOUT_CODE,
              })
            ),
            {
              status: 504,
              headers: { "Content-Type": "application/json" },
            }
          )
        );
      }, comboTargetTimeoutMs);
    });
    const targetWithSignal = {
      ...(target ?? {}),
      modelAbortSignal: timeoutController.signal,
    };
    const parentHedgeSignal = target?.modelAbortSignal ?? null;
    let onParentHedgeAbort: (() => void) | null = null;
    if (parentHedgeSignal) {
      if (parentHedgeSignal.aborted) {
        timeoutController.abort(new Error("hedge-cancelled"));
      } else {
        onParentHedgeAbort = () => {
          timeoutController.abort(new Error("hedge-cancelled"));
        };
        parentHedgeSignal.addEventListener("abort", onParentHedgeAbort, { once: true });
      }
    }
    try {
      return await Promise.race([
        handleSingleModel(b, modelStr, targetWithSignal).catch((err) => {
          if (timedOut) {
            // Inner call rejected because we aborted it. The synthetic 504 from
            // timeoutPromise already wins the race; return an empty response so
            // the loser branch resolves cleanly without leaking err.message.
            return new Response(null, { status: 599 });
          }
          return errorResponse(502, err?.message ?? "Upstream model error");
        }),
        timeoutPromise,
      ]);
    } finally {
      clearTimeout(timeoutId);
      if (parentHedgeSignal && onParentHedgeAbort) {
        parentHedgeSignal.removeEventListener("abort", onParentHedgeAbort);
      }
    }
  };
}
