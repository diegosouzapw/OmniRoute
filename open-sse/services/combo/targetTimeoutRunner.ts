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
import {
  COMBO_HEDGE_CANCELLED_REASON,
  COMBO_PER_MODEL_TIMEOUT_REASON,
} from "./comboAbortReasons.ts";
import type { HandleSingleModel, SingleModelTarget, ComboLogger } from "./types.ts";

/** Stable internal classification for OmniRoute's own combo per-target timer. */
export const COMBO_TARGET_TIMEOUT_CODE = "combo_target_timeout";

/**
 * Diagnostic: track recent combo-per-model-timeout abort errors so an
 * unhandledRejection handler can attribute the stack trace to a specific model
 * and timeout value. Ring buffer of 4 — concurrent per-model timeouts are rare
 * but possible (e.g. hedge + per-target timeout on different targets).
 */
const CONTEXT_RING_SIZE = 4;
const lastTimeoutContexts: Array<{
  modelStr: string;
  timeoutMs: number;
  abortError: Error;
  timestamp: number;
}> = [];
let contextRingIndex = 0;

function recordTimeoutContext(ctx: {
  modelStr: string;
  timeoutMs: number;
  abortError: Error;
  timestamp: number;
}): void {
  if (lastTimeoutContexts.length < CONTEXT_RING_SIZE) {
    lastTimeoutContexts.push(ctx);
  } else {
    lastTimeoutContexts[contextRingIndex] = ctx;
    contextRingIndex = (contextRingIndex + 1) % CONTEXT_RING_SIZE;
  }
}

/** Retrieve (and clear) all pending combo-per-model-timeout diagnostic contexts. */
export function drainLastTimeoutContexts(): typeof lastTimeoutContexts {
  const out = lastTimeoutContexts.splice(0);
  contextRingIndex = 0;
  return out;
}

/**
 * Install a persistent unhandledRejection listener that logs combo-per-model-timeout
 * diagnostics. Call once at module load. The listener stays installed permanently —
 * it only acts on combo-per-model-timeout rejections and returns early for everything
 * else, so there is no handler leak and no remove/re-install race window.
 */
let diagnosticInstalled = false;
function ensureDiagnosticListener(): void {
  if (diagnosticInstalled) return;
  diagnosticInstalled = true;
  process.on("unhandledRejection", (reason: unknown) => {
    try {
      const isComboTimeout =
        reason instanceof Error && reason.message === COMBO_PER_MODEL_TIMEOUT_REASON;
      if (!isComboTimeout) return;
      const contexts = drainLastTimeoutContexts();
      // Log the full stack trace so the next production incident is diagnosable.
      // Without this, Node's default unhandledRejection warning shows only
      // "Error: combo-per-model-timeout" with no caller context.
      const summary =
        contexts.length > 0
          ? contexts.map((c) => `  model=${c.modelStr} timeout=${c.timeoutMs}ms`).join("\n")
          : "  (no context recorded)";
      console.error(
        "[COMBO-TIMEOUT-DIAGNOSTIC] unhandledRejection from combo per-model timeout.\n" +
          `${summary}\n` +
          `  abortError stack:\n${reason.stack ?? reason}`
      );
    } catch {
      // Diagnostic logging failed — never let this break the process.
    }
  });
}

export function buildTargetTimeoutRunner(deps: {
  handleSingleModel: HandleSingleModel;
  comboTargetTimeoutMs: number;
  log: ComboLogger;
  resolveTargetTimeoutMs?: (
    target?: SingleModelTarget
  ) => Promise<number | undefined> | number | undefined;
}): (
  b: Record<string, unknown>,
  modelStr: string,
  target?: SingleModelTarget
) => Promise<Response> {
  const { handleSingleModel, comboTargetTimeoutMs, log, resolveTargetTimeoutMs } = deps;
  ensureDiagnosticListener();
  return async (
    b: Record<string, unknown>,
    modelStr: string,
    target?: SingleModelTarget
  ): Promise<Response> => {
    const resolvedTimeoutMs = await resolveTargetTimeoutMs?.(target);
    const effectiveTimeoutMs =
      typeof resolvedTimeoutMs === "number" && Number.isFinite(resolvedTimeoutMs)
        ? resolvedTimeoutMs
        : comboTargetTimeoutMs;
    if (effectiveTimeoutMs <= 0) {
      // G3 (silent-stop fix): a disabled per-model timeout means a hung upstream
      // stalls the target until the combo loop safety timer (COMBO_LOOP_SAFETY_TIMEOUT_MS)
      // force-terminates — surface that dependency instead of silently running bare.
      log.warn(
        "COMBO",
        `Per-model combo timeout is DISABLED (effectiveTimeoutMs=${effectiveTimeoutMs}) for ${modelStr} — a hung upstream will hang this target until the combo loop safety timeout`
      );
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
        const abortErr = new Error(COMBO_PER_MODEL_TIMEOUT_REASON);
        recordTimeoutContext({
          modelStr,
          timeoutMs: effectiveTimeoutMs,
          abortError: abortErr,
          timestamp: Date.now(),
        });
        log.warn(
          "COMBO",
          `Model ${modelStr} exceeded ${effectiveTimeoutMs}ms timeout — falling back`
        );
        timeoutController.abort(abortErr);
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
      }, effectiveTimeoutMs);
    });
    const targetWithSignal = {
      ...(target ?? {}),
      modelAbortSignal: timeoutController.signal,
    };
    const parentHedgeSignal = target?.modelAbortSignal ?? null;
    let onParentHedgeAbort: (() => void) | null = null;
    if (parentHedgeSignal) {
      if (parentHedgeSignal.aborted) {
        timeoutController.abort(new Error(COMBO_HEDGE_CANCELLED_REASON));
      } else {
        onParentHedgeAbort = () => {
          timeoutController.abort(new Error(COMBO_HEDGE_CANCELLED_REASON));
        };
        parentHedgeSignal.addEventListener("abort", onParentHedgeAbort, { once: true });
      }
    }
    try {
      // Both branches of the race resolve (never reject): the inner
      // handleSingleModel call has a .catch() that converts rejections into
      // responses, and timeoutPromise always resolves. A defensive outer
      // .catch() guards against unexpected throws in the .catch() handler
      // itself (e.g. a broken Error.prototype.message getter) — without
      // this, such a throw would surface as an unhandledRejection tagged
      // "combo-per-model-timeout" in production logs.
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
      ]).catch((raceErr) => {
        // Defensive: should never fire — both race branches always resolve.
        // Include the error message so the root cause is not masked.
        const detail = raceErr instanceof Error ? raceErr.message : String(raceErr);
        log.error?.("COMBO", `Unexpected rejection in combo timeout race for ${modelStr}: ${detail}`);
        return errorResponse(502, `Combo timeout dispatch error: ${detail}`);
      });
    } finally {
      clearTimeout(timeoutId);
      if (parentHedgeSignal && onParentHedgeAbort) {
        parentHedgeSignal.removeEventListener("abort", onParentHedgeAbort);
      }
    }
  };
}
