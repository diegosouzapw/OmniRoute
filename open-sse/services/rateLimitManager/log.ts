/**
 * rateLimitManager/log — rate-limit console output, silent inside node:test
 * child processes so test runs stay readable. Shared by the manager and its
 * submodules.
 *
 * @module services/rateLimitManager/log
 */

function isNodeTestRunnerChild(): boolean {
  return typeof process.env.NODE_TEST_CONTEXT === "string";
}

export function logRateLimit(...args: unknown[]): void {
  if (!isNodeTestRunnerChild()) console.log(...args);
}

export function warnRateLimit(...args: unknown[]): void {
  if (!isNodeTestRunnerChild()) console.warn(...args);
}

export function errorRateLimit(...args: unknown[]): void {
  if (!isNodeTestRunnerChild()) console.error(...args);
}
