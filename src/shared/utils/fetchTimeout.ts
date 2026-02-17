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

/**
 * Fetch with automatic timeout via AbortController.
 *
 * @param {string | URL} url - URL to fetch
 * @param {RequestInit & { timeoutMs?: number }} [options] - Fetch options + optional timeoutMs
 * @returns {Promise<Response>}
 * @throws {Error} With name "AbortError" on timeout
 */
export async function fetchWithTimeout(url, options = {}) {
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
  } catch (error) {
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
  /**
   * @param {string} message
   * @param {number} timeoutMs
   * @param {string} url
   */
  constructor(message, timeoutMs, url) {
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
