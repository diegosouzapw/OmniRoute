/**
 * Request Timeout Utility — FASE-04 Observability
 *
 * Wraps fetch/async calls with configurable timeouts and
 * abort controller support.
 *
 * @module shared/utils/requestTimeout
 */

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
export async function withTimeout<T>(
  fn: () => Promise<T>,
  timeoutMs: number,
  label = "Operation"
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      const error: any = new Error(`${label} timed out after ${timeoutMs}ms`);
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
export const PROVIDER_TIMEOUTS: Record<string, number> = {
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

export function getProviderTimeout(provider: string): number {
  return PROVIDER_TIMEOUTS[provider] || PROVIDER_TIMEOUTS.default;
}
