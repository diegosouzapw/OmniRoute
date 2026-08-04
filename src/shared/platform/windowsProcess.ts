/**
 * Platform-aware graceful process termination for the CLI's own child/self stop
 * paths (`bin/cli/runtime/processSupervisor.mjs`, `bin/cli/commands/stop.mjs`).
 *
 * #8045: on win32, `process.kill(pid, "SIGTERM")` is documented by Node.js to cause
 * "unconditional termination of the target process" — it is never a real, interceptable
 * signal there, identical to SIGKILL. Sending it to the OmniRoute server child
 * immediately on every stop/Ctrl+C force-kills it before its own async
 * `initGracefulShutdown()` cleanup (WAL checkpoint + closeDbInstance()) has any
 * realistic chance to run, corrupting storage.sqlite's WAL state for the next launch.
 *
 * On win32, the target process already receives the real CTRL_C_EVENT/CTRL_CLOSE_EVENT
 * independently (it shares the console) and runs its own graceful shutdown — so instead
 * of racing it with an immediate force-kill, this helper polls for exit and only
 * escalates to SIGKILL if the process is still alive after the timeout.
 *
 * @module shared/platform/windowsProcess
 */

export interface StopProcessGracefullyOptions {
  /** PID of the target process to stop. */
  pid: number;
  /** Max time to wait for the process to exit on its own before escalating (ms). */
  timeoutMs?: number;
  /** Poll interval while waiting for exit (ms). */
  pollIntervalMs?: number;
  /** Injectable liveness check (defaults to `process.kill(pid, 0)`-based check). */
  isPidRunning?: (pid: number) => boolean;
  /** Injectable sleep (for tests). */
  sleep?: (ms: number) => Promise<void>;
  /** Injectable platform override (for tests); defaults to `process.platform`. */
  platform?: NodeJS.Platform;
}

const defaultIsPidRunning = (pid: number): boolean => {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
};

const defaultSleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Stop `pid` without force-killing it immediately on win32.
 *
 * - Non-win32: sends SIGTERM immediately (unchanged prior behavior — SIGTERM is a
 *   real, interceptable signal on POSIX, so this still lets the target run its own
 *   graceful shutdown before an eventual SIGKILL escalation).
 * - win32: does NOT send SIGTERM (it would force-kill immediately, racing the
 *   target's own console-close/Ctrl+C handling). Instead polls `isPidRunning` for up
 *   to `timeoutMs`, then escalates to SIGKILL only if the process is still alive.
 */
export async function stopProcessGracefully(options: StopProcessGracefullyOptions): Promise<void> {
  const {
    pid,
    timeoutMs = 5000,
    pollIntervalMs = 100,
    isPidRunning = defaultIsPidRunning,
    sleep = defaultSleep,
    platform = process.platform,
  } = options;

  if (platform !== "win32") {
    try {
      process.kill(pid, "SIGTERM");
    } catch {
      // Process already gone — nothing to escalate.
      return;
    }
  }

  const start = Date.now();
  while (Date.now() - start < timeoutMs && isPidRunning(pid)) {
    await sleep(pollIntervalMs);
  }

  if (isPidRunning(pid)) {
    try {
      process.kill(pid, "SIGKILL");
    } catch {
      // Already gone.
    }
  }
}
