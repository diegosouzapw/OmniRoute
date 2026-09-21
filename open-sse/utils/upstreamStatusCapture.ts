import { isProviderRequestCaptureActive, onDispatchStart } from "./providerRequestLogging.ts";

/**
 * Wrap the process-wide fetch so the HTTP status the provider actually returned lands on
 * the request's applied-proxy sink. Only calls that settle while a provider request is
 * being dispatched count: side fetches of the same request (usage sync, dashboard events)
 * and background calls an executor leaves running after it returns must not overwrite the
 * provider's status. A new dispatch invalidates the earlier status at entry, so a retry
 * that never reaches the network (local refusal, start timeout) leaves nothing stale
 * behind; within the dispatch the last response received wins, which follows an
 * executor's own retries. A background call keeps a settled dispatch token and never
 * writes, so clearing at entry cannot race with it. A call that throws clears the
 * status, so a network error on one proxy after a 429 on another leaves no stale 429
 * behind. The response and any exception pass through. In cloud mode the default export
 * is the unpatched fetch, so nothing is captured and the log keeps null.
 *
 * `isDispatching` is injectable for tests only.
 */
export function withUpstreamStatusCapture<A extends unknown[]>(
  inner: (...args: A) => Promise<Response>,
  getSink: () => { upstreamStatus?: number } | undefined,
  isDispatching: () => boolean = isProviderRequestCaptureActive
): (...args: A) => Promise<Response> {
  if (isDispatching === isProviderRequestCaptureActive) {
    onDispatchStart(() => {
      const sink = getSink();
      if (sink) delete sink.upstreamStatus;
    });
  }
  return async (...args: A) => {
    const sink = isDispatching() ? getSink() : undefined;
    if (!sink) return inner(...args);
    let response: Response;
    try {
      response = await inner(...args);
    } catch (error) {
      if (isDispatching()) sink.upstreamStatus = undefined;
      throw error;
    }
    if (isDispatching()) sink.upstreamStatus = response.status;
    return response;
  };
}
