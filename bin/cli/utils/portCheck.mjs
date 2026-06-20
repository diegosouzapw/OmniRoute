/**
 * Port availability check — used by the ProcessSupervisor to wait for the OS
 * to release a port before attempting to rebind after a crash.
 *
 * After a child process is killed (SIGKILL / OOM), the socket may linger in
 * TIME_WAIT for up to 60s. Retrying bind immediately causes EADDRINUSE
 * cascades that exhaust the supervisor's restart budget.
 *
 * @module bin/cli/utils/portCheck
 */

import { createServer } from "node:net";

/**
 * Check whether a TCP port is free by attempting to bind it.
 * Returns true if the port is available, false if it's still held.
 *
 * @param {number} port
 * @param {string} [host="0.0.0.0"]
 * @returns {Promise<boolean>}
 */
export function isPortFree(port, host = "0.0.0.0") {
  return new Promise((resolve) => {
    const server = createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(port, host);
  });
}

/**
 * Wait until a TCP port becomes free, polling at `intervalMs`.
 * Returns after the port is free, or rejects after `timeoutMs`.
 *
 * @param {number} port
 * @param {object} [opts]
 * @param {number} [opts.timeoutMs=15000]  Max wait time
 * @param {number} [opts.intervalMs=500]   Poll interval
 * @param {string} [opts.host="0.0.0.0"]
 * @returns {Promise<void>}
 */
export function waitUntilPortFree(port, { timeoutMs = 15_000, intervalMs = 500, host = "0.0.0.0" } = {}) {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + timeoutMs;

    async function poll() {
      if (await isPortFree(port, host)) {
        return resolve();
      }
      if (Date.now() >= deadline) {
        return reject(new Error(`Port ${port} still in use after ${timeoutMs}ms`));
      }
      setTimeout(poll, intervalMs);
    }

    poll();
  });
}
