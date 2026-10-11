// #15536: transient poll failures (429/503) must back off and retry instead of
// aborting an async video job that is still rendering upstream.

export const MAX_CONSECUTIVE_POLL_RETRIES = 5;
export const MAX_POLL_RETRY_DELAY_MS = 30_000;

export function isRetryablePollStatus(status: number): boolean {
  return status === 429 || status === 503;
}

/** Parse a Retry-After header (delta-seconds or HTTP-date) into milliseconds. */
export function parseRetryAfterMs(value: string | null | undefined, now = Date.now()): number {
  if (!value) return 0;
  const trimmed = value.trim();
  if (/^\d+(\.\d+)?$/.test(trimmed)) return Math.round(parseFloat(trimmed) * 1000);
  const date = Date.parse(trimmed);
  return Number.isNaN(date) ? 0 : Math.max(0, date - now);
}

/** Delay before the next poll after `consecutive` (1-based) transient failures. */
export function computePollRetryDelayMs(
  pollIntervalMs: number,
  consecutive: number,
  retryAfterMs = 0
): number {
  const backoff = pollIntervalMs * 2 ** Math.max(0, consecutive - 1);
  return Math.min(MAX_POLL_RETRY_DELAY_MS, Math.max(retryAfterMs, backoff));
}
