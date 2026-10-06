/**
 * Pure helpers for polling the embedded or remote OmniRoute server without
 * importing the Electron main process.
 */

const DEFAULT_TIMEOUT_MS = 180000;
const DEFAULT_REQUEST_TIMEOUT_MS = 2000;
const DEFAULT_POLL_INTERVAL_MS = 500;

function buildReadinessUrl(baseUrl) {
  return `${baseUrl.replace(/\/+$/, "")}/api/health/ping`;
}

async function waitForServer(url, timeoutMs = DEFAULT_TIMEOUT_MS, options = {}) {
  const {
    fetchFn = globalThis.fetch,
    requestTimeoutMs = DEFAULT_REQUEST_TIMEOUT_MS,
    pollIntervalMs = DEFAULT_POLL_INTERVAL_MS,
    nowFn = Date.now,
    sleepFn = (delayMs) => new Promise((resolve) => setTimeout(resolve, delayMs)),
    warnFn = console.warn,
  } = options;

  const startedAt = nowFn();
  while (nowFn() - startedAt < timeoutMs) {
    const remainingMs = timeoutMs - (nowFn() - startedAt);
    const attemptTimeoutMs = Math.max(1, Math.min(requestTimeoutMs, remainingMs));
    const controller = new AbortController();
    let timeoutId;

    try {
      const response = await Promise.race([
        fetchFn(url, { signal: controller.signal }),
        new Promise((resolve) => {
          timeoutId = setTimeout(() => {
            controller.abort();
            resolve(null);
          }, attemptTimeoutMs);
        }),
      ]);

      if (response?.ok) return true;
    } catch {
      /* server not ready yet */
    } finally {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    }

    const pollRemainingMs = timeoutMs - (nowFn() - startedAt);
    if (pollRemainingMs <= 0) break;
    await sleepFn(Math.min(pollIntervalMs, pollRemainingMs));
  }

  warnFn("[Electron] Server readiness timeout — showing window anyway");
  return false;
}

module.exports = {
  buildReadinessUrl,
  waitForServer,
};
