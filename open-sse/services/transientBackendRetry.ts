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
  sleep?: (ms: number) => Promise<void>;
  signal?: AbortSignal;
  onRetry?: (info: { attempt: number; delayMs: number; status?: number; error?: unknown }) => void;
}

export interface ResponseLike {
  ok: boolean;
  status: number;
  body: unknown;
}

const DEFAULT_SLEEP = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

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

  let prev = baseMs;
  let lastResult: T | undefined;

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
      const delayMs = Math.min(capMs, baseMs + Math.floor(Math.random() * prev * 2));
      onRetry?.({ attempt, delayMs, status: result.status });
      await sleep(delayMs);
      prev = delayMs;
    } catch (error) {
      if (signal?.aborted) {
        throw error;
      }
      if (attempt >= maxAttempts) throw error;
      const delayMs = Math.min(capMs, baseMs + Math.floor(Math.random() * prev * 2));
      onRetry?.({ attempt, delayMs, error });
      await sleep(delayMs);
      prev = delayMs;
    }
  }

  // Unreachable, but TypeScript wants an explicit return
  return lastResult as T;
}
