import { getTlsFirstByteWatchdogMs } from "@/shared/utils/runtimeTimeouts";

// #12656 — the wreq-js TLS-fingerprint transport resolves the Response as
// soon as upstream headers arrive, with zero protection around how long the
// caller then waits for the body's first byte. The only timing guard on that
// path, TlsClient's flat `timeout`, defaults to 600_000ms — matching the
// reported 90-600s stall window exactly. This module races the body's first
// `read()` against a short, env-overridable watchdog: a healthy body is
// completely unaffected (bytes already buffered are replayed through a
// passthrough stream, nothing is dropped), while a body that never yields
// within the deadline cancels the wreq reader and throws so the caller
// (proxyFetch's existing TLS-fallback catch blocks) can fall back to the
// direct/proxy dispatcher instead of hanging for minutes.

export const TLS_FIRST_BYTE_WATCHDOG_TIMEOUT_CODE = "TLS_FIRST_BYTE_WATCHDOG_TIMEOUT";

type BodyReader = ReadableStreamDefaultReader<Uint8Array>;
type FirstReadResult = ReadableStreamReadResult<Uint8Array>;

function createWatchdogTimeoutError(timeoutMs: number): Error & { code: string } {
  const err = new Error(
    `TLS fingerprint transport produced no first byte within ${timeoutMs}ms`
  ) as Error & { code: string };
  err.name = "TimeoutError";
  err.code = TLS_FIRST_BYTE_WATCHDOG_TIMEOUT_CODE;
  return err;
}

export function isTlsFirstByteWatchdogTimeout(err: unknown): boolean {
  return (
    !!err &&
    typeof err === "object" &&
    "code" in err &&
    (err as { code?: unknown }).code === TLS_FIRST_BYTE_WATCHDOG_TIMEOUT_CODE
  );
}

async function raceFirstChunk(reader: BodyReader, timeoutMs: number): Promise<FirstReadResult> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(createWatchdogTimeoutError(timeoutMs)), timeoutMs);
    timer.unref?.();
  });
  try {
    return await Promise.race([reader.read(), timeoutPromise]);
  } finally {
    clearTimeout(timer);
  }
}

async function pumpRemainingChunks(
  reader: BodyReader,
  controller: ReadableStreamDefaultController<Uint8Array>
): Promise<void> {
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      if (value) controller.enqueue(value);
    }
  } catch (error) {
    controller.error(error);
  }
}

function buildPassthroughStream(
  reader: BodyReader,
  firstChunk: FirstReadResult
): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      if (firstChunk.value) controller.enqueue(firstChunk.value);
      if (firstChunk.done) {
        controller.close();
        return;
      }
      void pumpRemainingChunks(reader, controller);
    },
    cancel(reason) {
      void reader.cancel(reason).catch(() => {});
    },
  });
}

/**
 * Guard a TLS-fingerprint Response's first body byte with a short watchdog.
 * Resolves with an equivalent Response (status/headers preserved) whose body
 * has already produced at least one byte, or throws
 * TLS_FIRST_BYTE_WATCHDOG_TIMEOUT after cancelling the reader so the caller
 * can fall back to another transport.
 */
export async function guardTlsFirstByte(
  response: Response,
  timeoutMs: number = getTlsFirstByteWatchdogMs()
): Promise<Response> {
  if (!timeoutMs || timeoutMs <= 0 || !response.body) return response;

  const reader = response.body.getReader();
  let firstChunk: FirstReadResult;
  try {
    firstChunk = await raceFirstChunk(reader, timeoutMs);
  } catch (error) {
    await reader.cancel(error).catch(() => {});
    throw error;
  }

  return new Response(buildPassthroughStream(reader, firstChunk), {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
