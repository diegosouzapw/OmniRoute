/**
 * Pure, dependency-free retry helper for transient failures (used by the
 * subscription fetch path). No DB / network imports, so it is unit-testable
 * with a fake async function.
 *
 * Retries on transient errors with bounded exponential backoff:
 *   delay(attempt) = min(maxDelayMs, baseDelayMs * 2 ** attempt)
 * The caller decides what is retryable via `isRetryable` (e.g. network/5xx/429
 * are retryable; a 4xx or an SSRF-block is not).
 */
export interface RetryOptions {
  maxAttempts?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  /** Return false to stop retrying immediately (re-throw the error). */
  isRetryable?: (err: unknown) => boolean;
  /** Injectable for tests; defaults to a real setTimeout sleep. */
  sleep?: (ms: number) => Promise<void>;
}

const DEFAULTS = { maxAttempts: 3, baseDelayMs: 500, maxDelayMs: 5000 } as const;

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const maxAttempts = options.maxAttempts ?? DEFAULTS.maxAttempts;
  const baseDelayMs = options.baseDelayMs ?? DEFAULTS.baseDelayMs;
  const maxDelayMs = options.maxDelayMs ?? DEFAULTS.maxDelayMs;
  const isRetryable = options.isRetryable ?? (() => true);
  const sleep = options.sleep ?? ((ms: number) => new Promise<void>((r) => setTimeout(r, ms)));

  let lastErr: unknown;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      // Last attempt: no point delaying, just surface the error.
      if (attempt === maxAttempts - 1) break;
      // Permanent error (caller says so): stop immediately.
      if (!isRetryable(e)) throw e;
      const delay = Math.min(maxDelayMs, baseDelayMs * 2 ** attempt);
      await sleep(delay);
    }
  }
  throw lastErr;
}
