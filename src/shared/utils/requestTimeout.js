/**
 * Request Timeout Utility — FASE-04 Observability
 *
 * Wraps fetch/async calls with configurable timeouts and
 * abort controller support.
 *
 * @module shared/utils/requestTimeout
 */

/**
 * @typedef {Object} TimeoutOptions
 * @property {number} [timeoutMs=30000] - Timeout in milliseconds
 * @property {string} [label='Request'] - Label for error messages
 * @property {AbortSignal} [signal] - Pre-existing abort signal to merge
 */

/**
 * Execute a fetch with timeout.
 *
 * @param {string} url - URL to fetch
 * @param {RequestInit & TimeoutOptions} options - Fetch options plus timeout config
 * @returns {Promise<Response>}
 * @throws {Error} With name 'TimeoutError' if request times out
 */
export async function fetchWithTimeout(url, options = {}) {
  const { timeoutMs = 30000, label = "Request", signal: externalSignal, ...fetchOptions } = options;

  const controller = new AbortController();

  // Merge with external signal if provided
  if (externalSignal) {
    externalSignal.addEventListener("abort", () => controller.abort(externalSignal.reason));
  }

  const timeoutId = setTimeout(() => {
    controller.abort(new Error(`${label} timed out after ${timeoutMs}ms`));
  }, timeoutMs);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    return response;
  } catch (error) {
    if (error.name === "AbortError" || controller.signal.aborted) {
      const timeoutError = new Error(`${label} timed out after ${timeoutMs}ms`);
      timeoutError.name = "TimeoutError";
      timeoutError.originalUrl = url;
      timeoutError.timeoutMs = timeoutMs;
      throw timeoutError;
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Execute any async function with a timeout.
 *
 * @template T
 * @param {() => Promise<T>} fn - Async function to execute
 * @param {number} timeoutMs - Timeout in milliseconds
 * @param {string} [label='Operation'] - Label for error messages
 * @returns {Promise<T>}
 * @throws {Error} With name 'TimeoutError' if operation times out
 */
export async function withTimeout(fn, timeoutMs, label = "Operation") {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      const error = new Error(`${label} timed out after ${timeoutMs}ms`);
      error.name = "TimeoutError";
      error.timeoutMs = timeoutMs;
      reject(error);
    }, timeoutMs);

    fn()
      .then((result) => {
        clearTimeout(timeoutId);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}

/**
 * Default provider timeouts (ms).
 */
export const PROVIDER_TIMEOUTS = {
  openai: 60000,
  claude: 90000, // Claude can be slower for long outputs
  gemini: 60000,
  codex: 120000, // Coding tasks often take longer
  qwen: 45000,
  deepseek: 60000,
  cohere: 45000,
  groq: 30000, // Groq is fast
  mistral: 45000,
  openrouter: 60000,
  default: 60000,
};

/**
 * Get the timeout for a specific provider.
 *
 * @param {string} provider - Provider identifier
 * @returns {number} Timeout in milliseconds
 */
export function getProviderTimeout(provider) {
  return PROVIDER_TIMEOUTS[provider] || PROVIDER_TIMEOUTS.default;
}
