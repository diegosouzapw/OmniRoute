/**
 * Structured retry timing for error bodies (quota-reset-timing, #14188): resolves a
 * retry hint into the `retry_after` / `reset_at` pair and reads a raw HTTP
 * `Retry-After` header. Re-exported from ./error.ts, which remains the public entry.
 */

/**
 * Resolve a retryAfter hint (ISO string / epoch-ms number / seconds-duration
 * number / Date) into the error body's `retry_after` (integer seconds, rounded up,
 * minimum 1) + `reset_at` (ISO instant) pair. Returns null for anything that is
 * absent, unparseable, or already in the past — callers MUST omit both fields
 * rather than emit `retry_after: 0` for a past/invalid input.
 */
export function resolveRetryAfterInstant(
  retryAfter?: string | number | Date | null
): { retry_after: number; reset_at: string } | null {
  let ms: number | null = null;
  if (typeof retryAfter === "number") {
    if (!Number.isFinite(retryAfter) || retryAfter <= 0) return null;
    ms = retryAfter < 1_000_000_000 ? Date.now() + retryAfter * 1000 : retryAfter;
  } else if (typeof retryAfter === "string") {
    if (retryAfter.trim() === "" || !Number.isNaN(Number(retryAfter))) return null;
    const parsed = new Date(retryAfter).getTime();
    ms = Number.isFinite(parsed) ? parsed : null;
  } else if (retryAfter instanceof Date) {
    const parsed = retryAfter.getTime();
    ms = Number.isFinite(parsed) ? parsed : null;
  }
  if (ms === null) return null;
  const now = Date.now();
  if (ms <= now) return null;
  return {
    retry_after: Math.max(Math.ceil((ms - now) / 1000), 1),
    reset_at: new Date(ms).toISOString(),
  };
}

/**
 * Combo target drain fallback: read a raw HTTP `Retry-After` header (seconds or an
 * HTTP-date) into an ISO instant, or null when absent/past/unparseable. Used when a
 * target's error BODY carries no retry hint at all (quota-reset-timing).
 */
export function parseRetryAfterHeader(headers: Headers | null | undefined): string | null {
  const raw = headers?.get?.("retry-after");
  if (!raw) return null;
  const seconds = Number(raw.trim());
  if (Number.isFinite(seconds) && seconds > 0)
    return new Date(Date.now() + Math.ceil(seconds) * 1000).toISOString();
  const ms = Date.parse(raw);
  return Number.isFinite(ms) && ms > Date.now() ? new Date(ms).toISOString() : null;
}
