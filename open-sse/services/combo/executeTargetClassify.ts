/**
 * Pure classify helpers for executeTarget's retry loop.
 * Lift-as-is from combo.ts #8375 / #2101 / #4279. No I/O.
 *
 * @internal — not part of the public combo.ts barrel.
 */
import {
  isContextOverflow400,
  isInputBoundRequestFailure,
  isModelScoped400,
  isParamValidation400,
} from "./comboPredicates.ts";
import { errorResponse } from "../../utils/error.ts";

export function remainderIsHomogeneous(
  orderedTargets: { modelStr: string }[],
  index: number,
  modelStr: string
): boolean {
  return orderedTargets.slice(index + 1).every((nextInPool) => nextInPool.modelStr === modelStr);
}

/**
 * Handle a pre-content streaming upstream error: nothing reached the client
 * yet, so re-dispatching the same target cannot duplicate output. Logs and
 * returns true when the caller should retry, false to fall through.
 */
export function handlePreContentStreamRetry(
  quality: { reason?: string | null },
  retry: number,
  deps: {
    maxRetries: number;
    signal?: { aborted?: boolean } | null;
    log: { info: (tag: string, msg: string) => void };
  },
  modelStr: string
): boolean {
  if (
    quality.reason !== "streaming upstream error" ||
    retry >= deps.maxRetries ||
    deps.signal?.aborted
  ) {
    return false;
  }
  deps.log.info(
    "COMBO",
    `Retrying ${modelStr} after pre-content streaming upstream error ` +
      `(attempt ${retry + 2}/${deps.maxRetries + 1})`
  );
  return true;
}

/** Protected-priority target whose upstream body failed quality validation. */
export function qualityValidationFailure(): { ok: false; response: Response } {
  return { ok: false, response: errorResponse(502, "Upstream response failed quality validation") };
}

export function shouldAbortOnInputBoundFailure(opts: {
  structuredError: unknown;
  remainderIsHomogeneous: boolean;
}): boolean {
  const structured = opts.structuredError as
    { code?: string | null; type?: string | null } | undefined;
  return isInputBoundRequestFailure(structured) && opts.remainderIsHomogeneous;
}

/**
 * #2101 / #4279: body-specific 400 must surface via {ok,response}, not null.
 * Same predicate chain as combo.ts (overflow / param / model-scoped excluded).
 */
export function shouldSurfaceBodySpecific400(opts: {
  status: number;
  errorText: string;
  shouldFallback: boolean;
}): boolean {
  const errorText = opts.errorText;
  return (
    opts.status === 400 &&
    opts.shouldFallback &&
    !isContextOverflow400(errorText) &&
    !isParamValidation400(errorText) &&
    !isModelScoped400(errorText) &&
    (errorText.toLowerCase().includes("context") ||
      errorText.toLowerCase().includes("prompt") ||
      errorText.toLowerCase().includes("token") ||
      errorText.toLowerCase().includes("malformed") ||
      errorText.toLowerCase().includes("invalid") ||
      errorText.toLowerCase().includes("bad request"))
  );
}
