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
  /** Send start -> response headers received; null when unknown (network throw). */
  headersMs?: number | null;
  /** Send start -> first useful body byte; null until the byte arrives. */
  firstChunkMs?: number | null;
  /**
   * Fired once when the first useful body byte is read downstream, or with
   * null when the body settles without one. Set by the capture wrapper when
   * it envelopes the raw upstream body; read by the journal layer.
   */
  onFirstChunk?: ((firstChunkMs: number | null) => void) | null;
  /** True once the envelope replaced the raw body (single-wrap guard). */
  bodyTracked?: boolean;
};

export type AttemptSink = {
  proxy?: unknown;
  rotationAccount?: string | null;
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
 * Non-negative integer durations only: clock skew or malformed values stay
 * null so partially migrated databases never corrupt a row.
 */
function sanitizeTimingMs(value: unknown): number | null {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : null;
}

function stampHeadersMs(record: AttemptRecord): void {
  record.headersMs = sanitizeTimingMs(Date.now() - (record.startedAt ?? Date.now()));
}

/**
 * Lazy first-byte envelope: wraps the raw upstream body in a passthrough
 * stream that stamps the first useful byte when the downstream reader pulls
 * it. Never reads by itself - the first downstream pull drives the first
 * upstream read, so an unconsumed body stays untouched and timing stays null.
 * Empty values pass through but never stamp; a body that settles without a
 * useful byte notifies with null exactly once.
 */
function trackFirstChunk(record: AttemptRecord, response: Response): Response {
  if (!response.body || record.bodyTracked) return response;
  record.bodyTracked = true;
  const startedAt = record.startedAt ?? Date.now();
  let settled = false;
  const notify = (firstChunkMs: number | null): void => {
    if (settled) return;
    settled = true;
    record.firstChunkMs = sanitizeTimingMs(firstChunkMs);
    try {
      record.onFirstChunk?.(record.firstChunkMs);
    } catch {
      // Timing listeners are best-effort; never break the stream.
    }
  };
  const stamp = (): void => notify(Date.now() - startedAt);
  const upstream = response.body.getReader();
  const wrapped = new ReadableStream<Uint8Array>({
    async pull(controller) {
      let result: ReadableStreamReadResult<Uint8Array>;
      try {
        result = await upstream.read();
      } catch (error) {
        notify(null);
        controller.error(error);
        return;
      }
      if (result.done) {
        notify(null);
        controller.close();
        return;
      }
      if (result.value && result.value.length > 0) stamp();
      if (result.value) controller.enqueue(result.value);
      else controller.enqueue(new Uint8Array(0));
    },
    async cancel(reason) {
      notify(null);
      await upstream.cancel(reason).catch(() => {});
    },
  });
  return new Response(wrapped, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
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
    const record = openAttemptRecord(sink);
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
    return settleAttemptResponse(sink, record, active, response, isDispatching);
  };
}

/**
 * Open or reuse the in-flight attempt record for one request actually sent:
 * snapshot the outlet at entry, complete the row when the send settles. A
 * stacked wrapper reuses the in-flight row instead of opening a second one.
 * Sends outside a dispatch (side calls, background work) leave no trace.
 */
function openAttemptRecord(sink: AttemptSink): AttemptRecord {
  const inFlight = readFlight(sink);
  if (inFlight) return inFlight;
  const record: AttemptRecord = {
    proxy: (sink as { proxy?: unknown }).proxy ?? null,
    rotationAccount: (sink as { rotationAccount?: string | null }).rotationAccount ?? null,
    startedAt: Date.now(),
  };
  (sink.attempts ??= []).push(record);
  writeFlight(sink, record);
  return record;
}

/**
 * Complete the attempt record once the send settles: stamp the headers timing
 * on the upstream response, clear the flight marker, publish the status, and
 * envelope the raw body for the lazy first-byte stamp.
 */
function settleAttemptResponse(
  sink: AttemptSink,
  record: AttemptRecord,
  active: boolean,
  response: Response,
  isDispatching: () => boolean
): Response {
  if (isDispatching() && active) {
    closeAttemptRecord(record, { upstreamStatus: response.status, error: null });
    stampHeadersMs(record);
    writeFlight(sink, undefined);
  }
  if (isDispatching()) sink.upstreamStatus = response.status;
  if (isDispatching() && active) return trackFirstChunk(record, response);
  return response;
}
