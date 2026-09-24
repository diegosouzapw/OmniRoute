import { isProviderRequestCaptureActive, onDispatchStart } from "./providerRequestLogging.ts";
import { sanitizeErrorMessage } from "./errorSanitization.ts";

/** One request actually sent: the outlet snapshot plus what came back. */
export type AttemptRecord = {
  proxy: unknown;
  rotationAccount?: string | null;
  upstreamStatus?: number;
  error?: string | null;
  startedAt?: number;
  durationMs?: number | null;
};

export type AttemptSink = {
  upstreamStatus?: number;
  attempts?: AttemptRecord[];
};

/** Marker for the in-flight record, so two stacked wrappers complete one row, not two. */
const IN_FLIGHT = "omniroute.attempt.in-flight";

type FlightSink = AttemptSink & Record<string, AttemptRecord | undefined>;

function readFlight(sink: AttemptSink): AttemptRecord | undefined {
  return (sink as FlightSink)[IN_FLIGHT];
}

function writeFlight(sink: AttemptSink, record: AttemptRecord | undefined): void {
  if (record === undefined) delete (sink as FlightSink)[IN_FLIGHT];
  else (sink as FlightSink)[IN_FLIGHT] = record;
}

function closeAttemptRecord(
  record: AttemptRecord,
  patch: { upstreamStatus?: number; error?: string | null }
): void {
  if (patch.upstreamStatus === undefined) record.upstreamStatus = undefined;
  else record.upstreamStatus = patch.upstreamStatus;
  record.error = patch.error ?? null;
  record.durationMs = Date.now() - (record.startedAt ?? Date.now());
}

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
  getSink: () => AttemptSink | undefined,
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
    // One journal row per request actually sent: snapshot the outlet at entry,
    // complete the row when the send settles. A stacked wrapper reuses the
    // in-flight row instead of opening a second one. Sends outside a dispatch
    // (side calls, background work) leave no trace, as before.
    let record: AttemptRecord | undefined;
    const inFlight = readFlight(sink);
    if (inFlight) {
      record = inFlight;
    } else {
      record = {
        proxy: (sink as { proxy?: unknown }).proxy ?? null,
        rotationAccount: (sink as { rotationAccount?: string | null }).rotationAccount ?? null,
        startedAt: Date.now(),
      };
      (sink.attempts ??= []).push(record);
      writeFlight(sink, record);
    }
    const active = record === readFlight(sink);
    let response: Response;
    try {
      response = await inner(...args);
    } catch (error) {
      if (isDispatching() && active) {
        closeAttemptRecord(record, { error: sanitizeErrorMessage(error) || "Request failed" });
        writeFlight(sink, undefined);
      }
      if (isDispatching()) sink.upstreamStatus = undefined;
      throw error;
    }
    if (isDispatching() && active) {
      closeAttemptRecord(record, { upstreamStatus: response.status, error: null });
      writeFlight(sink, undefined);
    }
    if (isDispatching()) sink.upstreamStatus = response.status;
    return response;
  };
}
