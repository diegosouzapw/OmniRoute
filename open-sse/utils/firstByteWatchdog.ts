// Races a streamed body's first read() against a short deadline. A healthy body is untouched:
// the first chunk is replayed and the rest is relayed on demand, so a slow consumer never makes
// us buffer upstream bytes. A body that stays silent is cancelled and the caller gets a
// TimeoutError carrying its own code (callers pick the code so logs say which guard fired).

export const RESPONSES_FIRST_BYTE_TIMEOUT_CODE = "RESPONSES_FIRST_BYTE_TIMEOUT";

export type FirstByteGuardOptions = {
  timeoutMs: number;
  signal?: AbortSignal | null;
  code: string;
  message: (timeoutMs: number) => string;
};

type BodyReader = ReadableStreamDefaultReader<Uint8Array>;
type FirstReadResult = ReadableStreamReadResult<Uint8Array>;

function createTimeoutError(options: FirstByteGuardOptions): Error & { code: string } {
  const err = new Error(options.message(options.timeoutMs)) as Error & {
    code: string;
  };
  err.name = "TimeoutError";
  err.code = options.code;
  return err;
}

function createAbortError(signal: AbortSignal): Error {
  if (signal.reason instanceof Error) return signal.reason;
  const err = new Error("The operation was aborted");
  err.name = "AbortError";
  return err;
}

async function raceFirstChunk(
  reader: BodyReader,
  options: FirstByteGuardOptions
): Promise<FirstReadResult> {
  const { signal } = options;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let onAbort: (() => void) | undefined;
  const guards = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(createTimeoutError(options)), options.timeoutMs);
    // The timer stays referenced: the race can be the only live handle
    // (direct callers, unit tests), where an unref'd timer would let the
    // event loop drain before it fires. Request paths always have other
    // handles, so this changes nothing there; cleared on every settle.
    if (!signal) return;
    if (signal.aborted) {
      reject(createAbortError(signal));
      return;
    }
    onAbort = () => reject(createAbortError(signal));
    signal.addEventListener("abort", onAbort, { once: true });
  });
  try {
    return await Promise.race([reader.read(), guards]);
  } finally {
    clearTimeout(timer);
    if (onAbort) signal?.removeEventListener("abort", onAbort);
  }
}

function buildOnDemandStream(
  reader: BodyReader,
  first: FirstReadResult
): ReadableStream<Uint8Array> {
  let replayFirst = true;
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (replayFirst) {
        replayFirst = false;
        if (first.value) controller.enqueue(first.value);
        if (first.done) controller.close();
        return;
      }
      try {
        const { done, value } = await reader.read();
        if (done) controller.close();
        else if (value) controller.enqueue(value);
      } catch (error) {
        controller.error(error);
      }
    },
    cancel(reason) {
      void reader.cancel(reason).catch(() => {});
    },
  });
}

export async function guardFirstByte(
  response: Response,
  options: FirstByteGuardOptions
): Promise<Response> {
  if (!options.timeoutMs || options.timeoutMs <= 0 || !response.body) return response;

  const reader = response.body.getReader();
  let first: FirstReadResult;
  try {
    first = await raceFirstChunk(reader, options);
  } catch (error) {
    // A wedged upstream may never settle its cancel; never reintroduce the wait.
    void reader.cancel(error).catch(() => {});
    throw error;
  }

  return new Response(buildOnDemandStream(reader, first), {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

export function isResponsesFirstByteTimeout(err: unknown): boolean {
  return (
    !!err &&
    typeof err === "object" &&
    "code" in err &&
    (err as { code?: unknown }).code === RESPONSES_FIRST_BYTE_TIMEOUT_CODE
  );
}

export function guardResponsesStreamFirstByte(
  response: Response,
  timeoutMs: number,
  signal?: AbortSignal | null
): Promise<Response> {
  return guardFirstByte(response, {
    timeoutMs,
    signal,
    code: RESPONSES_FIRST_BYTE_TIMEOUT_CODE,
    message: (ms) => `Responses stream produced no first body byte within ${ms}ms`,
  });
}
