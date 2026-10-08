/**
 * Streaming lifecycle deadline signal.
 *
 * Keeps the slow-stream deadline separate from the framework Request object:
 * callers pass the returned signal explicitly through admission/handler/lease
 * cleanup instead of rebuilding a NextRequest/Request just to replace .signal.
 */
export type StreamDeadlineSignal = {
  signal: AbortSignal;
  deadlineController: AbortController;
};

export function createStreamDeadlineSignal(
  clientSignal?: AbortSignal | null
): StreamDeadlineSignal {
  const deadlineController = new AbortController();
  const signal = clientSignal
    ? AbortSignal.any([clientSignal, deadlineController.signal])
    : deadlineController.signal;
  return { signal, deadlineController };
}
