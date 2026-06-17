/**
 * Per-model timeout wrapper (split from combo/chat.ts).
 * Combo target timeouts inherit FETCH_TIMEOUT_MS by default. Operators can
 * configure targetTimeoutMs to shorten fallback latency, but never to extend
 * beyond the current upstream request timeout.
 */
import { errorResponse } from "../../utils/error.ts";
import type { SingleModelTarget } from "../types.ts";

export async function handleSingleModelWithTimeout(
  handleSingleModel: (
    b: Record<string, unknown>,
    modelStr: string,
    target?: SingleModelTarget
  ) => Promise<Response>,
  comboTargetTimeoutMs: number,
  log: { warn: (...args: unknown[]) => void; info?: (...args: unknown[]) => void },
  b: Record<string, unknown>,
  modelStr: string,
  target?: SingleModelTarget
): Promise<Response> {
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
  const abortListener = () => {
    timeoutController.abort(new Error("hedge-cancelled"));
  };
  if (target?.modelAbortSignal) {
    if (target.modelAbortSignal.aborted) {
      timeoutController.abort(new Error("hedge-cancelled"));
    } else {
      target.modelAbortSignal.addEventListener("abort", abortListener);
    }
  }
  try {
    return await Promise.race([
      handleSingleModel(b, modelStr, targetWithSignal).catch((err) => {
        if (timedOut) {
          return new Response(null, { status: 599 });
        }
        return errorResponse(502, err?.message ?? "Upstream model error");
      }),
      timeoutPromise,
    ]);
  } finally {
    clearTimeout(timeoutId);
    if (target?.modelAbortSignal) {
      target.modelAbortSignal.removeEventListener("abort", abortListener);
    }
  }
}
