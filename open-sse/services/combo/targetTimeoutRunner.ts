/**
 * Wrap a single-model dispatch with a per-target timeout that aborts and falls back.
 *
 * Verbatim extraction of handleComboChat's `handleSingleModelWithTimeout` closure
 * (combo.ts). Behavior is byte-identical; the only change is that the closed-over locals
 * (`handleSingleModel`, `comboTargetTimeoutMs`, `log`) became explicit factory params.
 * The per-model abort signal still comes from the target (`target.modelAbortSignal`), so
 * the outer request signal is intentionally NOT a dependency here.
 *
 * See _tasks/superpowers/plans/2026-07-03-blocoJ-combo-hotpath-decomposition.md (Task 1).
 */
import { errorResponse } from "../../utils/error.ts";
import type { HandleSingleModel, SingleModelTarget, ComboLogger } from "./types.ts";

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
        resolve(
          new Response(JSON.stringify({ error: { message: `Model ${modelStr} timed out` } }), {
            status: 524,
            headers: { "Content-Type": "application/json" },
          })
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
            // Inner call rejected because we aborted it. The synthetic 524 from
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
