type DirectFetchOptions = RequestInit & { dispatcher?: unknown };
type DirectFetch = (
  input: RequestInfo | URL,
  options: DirectFetchOptions
) => Promise<Response>;

const DEFAULT_DIRECT_HEADERS_TIMEOUT_MS = 30_000;
const DIRECT_RESPONSE_START_TIMEOUT_CODE = "DIRECT_RESPONSE_START_TIMEOUT";

export function resolveDirectHeadersTimeoutMs(
  env: Record<string, string | undefined> = process.env
): number {
  const raw = env.OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS;
  if (raw == null || raw.trim() === "") return DEFAULT_DIRECT_HEADERS_TIMEOUT_MS;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 0;
}

function createDirectResponseStartTimeout(timeoutMs: number): Error & { code: string } {
  const err = new Error(
    `Direct response did not start within ${timeoutMs}ms — retrying on a fresh socket`
  ) as Error & { code: string };
  err.name = "TimeoutError";
  err.code = DIRECT_RESPONSE_START_TIMEOUT_CODE;
  return err;
}

export function isDirectResponseStartTimeout(err: unknown): boolean {
  return (
    !!err &&
    typeof err === "object" &&
    "code" in err &&
    err.code === DIRECT_RESPONSE_START_TIMEOUT_CODE
  );
}

function mergeAbortSignals(
  primary: AbortSignal | null | undefined,
  secondary: AbortSignal
): AbortSignal {
  if (!primary) return secondary;
  if (primary.aborted) return primary;
  const controller = new AbortController();
  const onPrimaryAbort = () => controller.abort(primary.reason);
  const onSecondaryAbort = () => controller.abort(secondary.reason);
  const cleanup = () => {
    primary.removeEventListener("abort", onPrimaryAbort);
    secondary.removeEventListener("abort", onSecondaryAbort);
  };
  primary.addEventListener("abort", onPrimaryAbort, { once: true });
  secondary.addEventListener("abort", onSecondaryAbort, { once: true });
  controller.signal.addEventListener("abort", cleanup, { once: true });
  return controller.signal;
}

export async function directFetchWithBoundedResponseStart(
  input: RequestInfo | URL,
  options: DirectFetchOptions,
  fetchImpl: DirectFetch,
  timeoutMs: number
): Promise<Response> {
  if (!timeoutMs || timeoutMs <= 0) return fetchImpl(input, options);
  const attemptController = new AbortController();
  // #12861: guards a narrow but real race between the timer macrotask and the
  // fetch promise settling. If `fetchImpl` has already resolved/rejected by
  // the time this timer fires, aborting now delivers the abort reason to a
  // promise nobody is awaiting anymore — Node promotes that to an
  // unhandledRejection -> uncaughtException and kills the process. Once the
  // attempt has settled, the timer becomes a no-op instead: the caller
  // already has its answer, and there's nothing left to abort for.
  let settled = false;
  const timer = setTimeout(() => {
    if (settled) return;
    attemptController.abort(createDirectResponseStartTimeout(timeoutMs));
  }, timeoutMs);
  timer.unref?.();
  try {
    const response = await fetchImpl(input, {
      ...options,
      signal: mergeAbortSignals(options.signal, attemptController.signal),
    });
    settled = true;
    return response;
  } catch (err) {
    settled = true;
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
