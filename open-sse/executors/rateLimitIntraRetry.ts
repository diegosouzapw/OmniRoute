import { parseDetailedRetryHintFromJsonBody } from "../services/retryAfterJson.ts";

/**
 * Upper bound (ms) on an upstream 429 retry hint for which the executor's
 * intra-URL retry still makes sense. At the default RETRY_CONFIG (2 attempts x
 * 2 s) both same-account retries land within 4 s of the first 429; when the
 * upstream says "retry in 37s" (Gemini free-tier RetryInfo, or a Retry-After
 * header), both retries are guaranteed to hit the same throttle window. They
 * only add two wasted upstream calls and ~4 s of dead wait before the caller
 * gets to rotate to the next account or lock the model with the hint.
 */
export const INTRA_RETRY_MAX_HINT_MS = 4_000;

function retryAfterHeaderMs(headers: Headers | null | undefined): number | null {
  const raw = headers?.get?.("retry-after");
  if (!raw) return null;
  const seconds = Number(raw.trim());
  if (Number.isFinite(seconds)) return seconds > 0 ? seconds * 1000 : null;
  const at = Date.parse(raw);
  if (!Number.isFinite(at)) return null;
  const waitMs = at - Date.now();
  return waitMs > 0 ? waitMs : null;
}

/**
 * Read the retry hint (ms) a 429 response carries: the `Retry-After` header
 * first, then a JSON body hint (google.rpc.RetryInfo.retryDelay, retry_after_ms,
 * resets_at...). Returns null when the response carries no hint. Reads a clone,
 * so the caller can still consume the original body.
 */
export async function readRateLimitRetryHintMs(response: Response): Promise<number | null> {
  const headerMs = retryAfterHeaderMs(response.headers);
  if (headerMs !== null) return headerMs;
  const text = await response
    .clone()
    .text()
    .catch(() => "");
  if (!text) return null;
  return parseDetailedRetryHintFromJsonBody(text, Number.MAX_SAFE_INTEGER)?.retryAfterMs ?? null;
}

/**
 * True when a 429 tells us to wait longer than the intra-URL retry window, so
 * the same-account retry should be skipped and the response handed back to the
 * caller (account rotation / model lockout honors the hint from there).
 */
export async function shouldSkipIntraRetryFor429(response: Response): Promise<boolean> {
  const hintMs = await readRateLimitRetryHintMs(response);
  return hintMs !== null && hintMs > INTRA_RETRY_MAX_HINT_MS;
}
