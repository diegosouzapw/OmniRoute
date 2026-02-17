/**
 * Fetch Timeout — T-25
 *
 * Wraps fetch() with an AbortController-based timeout.
 * Default timeout is 120 seconds (FETCH_TIMEOUT_MS env var).
 *
 * @module shared/utils/fetchTimeout
 */

// @ts-check

const DEFAULT_TIMEOUT_MS = 120000; // 2 minutes
const FETCH_TIMEOUT_MS = parseInt(process.env.FETCH_TIMEOUT_MS || "", 10) || DEFAULT_TIMEOUT_MS;

interface FetchTimeoutOptions extends RequestInit {
  timeoutMs?: number;
}

export async function fetchWithTimeout(url: string | URL, options: FetchTimeoutOptions = {}) {
  const { timeoutMs = FETCH_TIMEOUT_MS, signal: externalSignal, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  // If an external signal was provided, wire it to abort our controller too
  if (externalSignal) {
    if (externalSignal.aborted) {
      controller.abort();
    } else {
      externalSignal.addEventListener("abort", () => controller.abort(), { once: true });
    }
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    return response;
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new FetchTimeoutError(
        `Request to ${url} timed out after ${timeoutMs}ms`,
        timeoutMs,
        String(url)
      );
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Error thrown on fetch timeout.
 */
export class FetchTimeoutError extends Error {
  timeoutMs: number;
  url: string;

  constructor(message: string, timeoutMs: number, url: string) {
    super(message);
    this.name = "FetchTimeoutError";
    this.timeoutMs = timeoutMs;
    this.url = url;
  }
}

/**
 * Get the configured timeout value.
 * @returns {number} Timeout in milliseconds
 */
export function getConfiguredTimeout() {
  return FETCH_TIMEOUT_MS;
}
