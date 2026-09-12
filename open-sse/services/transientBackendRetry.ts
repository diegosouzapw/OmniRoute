/**
 * transientBackendRetry — bounded retry-with-jitter for transient HTTP errors.
 *
 * Only retryable: 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout.
 * 429 is intentionally NOT retryable here — the upstream proxy uses 429 as a
 * per-tenant policy signal (quota, region, credential) and the same retry would
 * just hit the same policy.
 *
 * Strategy: decorrelated full-jitter (AWS pattern). Each attempt picks a random
 * delay in [baseMs, prev*3], capped at capMs. With defaults (baseMs=200, capMs=2000)
 * the worst-case wall-clock for 3 attempts is ~7s.
 */

export const TRANSIENT_BACKEND_STATUS_CODES: ReadonlySet<number> = new Set([
  502,
  503,
  504,
]);

export function isResponseStatusRetryable(status: number | undefined | null): boolean {
  if (typeof status !== "number") return false;
  return TRANSIENT_BACKEND_STATUS_CODES.has(status);
}

export interface TransientRetryOptions {
  maxAttempts?: number;
  baseMs?: number;
  capMs?: number;
  /** Source label propagated to onRetry for observability (e.g. "global-fallback"). */
  source?: string;
  sleep?: (ms: number, signal?: AbortSignal) => Promise<void>;
  signal?: AbortSignal;
  onRetry?: (info: { attempt: number; delayMs: number; status?: number; error?: unknown; source?: string }) => void;
}

export interface ResponseLike {
  ok: boolean;
  status: number;
  body: unknown;
}

const DEFAULT_SLEEP = (ms: number, signal?: AbortSignal): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(Object.assign(new Error("aborted"), { name: "AbortError" }));
      return;
    }
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    const onAbort = (): void => {
      clearTimeout(timer);
      reject(Object.assign(new Error("aborted"), { name: "AbortError" }));
    };
    signal?.addEventListener("abort", onAbort, { once: true });
  });

/**
 * Run an action that returns a ResponseLike or throws. Retries while the response
 * is non-OK with a transient status (502/503/504). Honours AbortSignal between
 * attempts. Returns the last response on exhaustion — never throws on a transient
 * HTTP response (only throws if the action itself throws).
 */
export async function runWithTransientBackendRetry<T extends ResponseLike>(
  action: () => Promise<T>,
  options: TransientRetryOptions = {},
): Promise<T> {
  const maxAttempts = options.maxAttempts ?? 3;
  const baseMs = options.baseMs ?? 200;
  const capMs = options.capMs ?? 2000;
  const sleep = options.sleep ?? DEFAULT_SLEEP;
  const signal = options.signal;
  const onRetry = options.onRetry;
  const source = options.source;

  let prev = baseMs;
  let lastResult: T | undefined;

  // Decorrelated jitter (AWS pattern): temp = min(cap, random(base, prev*3)); prev = temp.
  // See https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/ — "full jitter"
  // variant of decorrelated jitter produces lower contention under thundering-herd conditions
  // than naive exponential backoff with constant jitter.
  const decorrelatedDelay = (): number => {
    const upper = Math.max(baseMs, prev * 3);
    const candidate = baseMs + Math.floor(Math.random() * (upper - baseMs + 1));
    return Math.min(capMs, candidate);
  };

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (signal?.aborted) {
      throw new DOMException("Retry aborted", "AbortError");
    }
    try {
      const result = await action();
      lastResult = result;
      if (result.ok) return result;
      if (!isResponseStatusRetryable(result.status)) return result;
      // Exhausted: return the last result rather than throwing
      if (attempt >= maxAttempts) return result;
      const delayMs = decorrelatedDelay();
      onRetry?.({ attempt, delayMs, status: result.status, source });
      await sleep(delayMs, signal);
      prev = delayMs;
    } catch (error) {
      if (signal?.aborted) {
        throw error;
      }
      if (attempt >= maxAttempts) throw error;
      const delayMs = decorrelatedDelay();
      onRetry?.({ attempt, delayMs, error, source });
      await sleep(delayMs, signal);
      prev = delayMs;
    }
  }

  // Unreachable, but TypeScript wants an explicit return
  return lastResult as T;
}
