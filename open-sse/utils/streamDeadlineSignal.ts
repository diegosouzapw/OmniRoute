/**
 * Streaming lifecycle deadline signal.
 *
 * Keeps the slow-stream deadline separate from the framework Request object:
 * callers pass the returned signal explicitly through admission/handler/lease
 * cleanup instead of rebuilding a NextRequest/Request just to replace .signal.
 */
import { mergeAbortSignals } from "../executors/base/mergeAbortSignals.ts";

export type StreamDeadlineSignal = {
  signal: AbortSignal;
  deadlineController: AbortController;
};

export function createStreamDeadlineSignal(
  clientSignal?: AbortSignal | null
): StreamDeadlineSignal {
  const deadlineController = new AbortController();
  // Not `AbortSignal.any()`: Node pins every composite that has an abort listener in a
  // module-level set until it aborts or its sources are collected. Downstream listeners
  // capture the request (and so the client signal), so a request that completes without
  // aborting stayed reachable forever together with its wire body. The plain merged
  // controller is an ordinary object and is collected with the request.
  const signal = clientSignal
    ? mergeAbortSignals(clientSignal, deadlineController.signal)
    : deadlineController.signal;
  return { signal, deadlineController };
}
