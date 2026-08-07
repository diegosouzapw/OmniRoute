/**
 * Probe-retry utilities for the SQLite corruption-probe path in getDbInstance().
 *
 * Transient probe errors (SQLITE_BUSY, ENOENT, SQLITE_PROTOCOL, SQLITE_IOERR)
 * should be retried with backoff instead of immediately renaming the DB away
 * and creating an empty one (data loss under concurrent load, #9541).
 */
import fs from "node:fs";
import path from "node:path";

/**
 * Identifies transient SQLite/OS probe errors that should be retried instead of
 * triggering the corruption-rename path.
 *
 * Transient errors are conditions that can self-resolve within milliseconds:
 *   - SQLITE_BUSY: database is locked by another connection
 *   - SQLITE_PROTOCOL: locking protocol violation
 *   - SQLITE_IOERR: disk I/O error (can be transient under load)
 *   - ENOENT: file disappeared (race with another process/worker deleting it)
 *
 * Fatal errors (native load failures, OOM, module-not-found) are NOT transient.
 */
export function isTransientProbeError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /SQLITE_BUSY|SQLITE_PROTOCOL|SQLITE_IOERR|ENOENT/i.test(message);
}

/**
 * Synchronous sleep that blocks the event loop for `ms` milliseconds.
 * Only used in the transient-probe-error retry path where we are already in
 * a synchronous context (better-sqlite3). Uses `Atomics.wait` which yields to
 * the OS scheduler during the wait, falling back to a busy-wait on runtimes
 * where Atomics.wait is restricted.
 */
function syncSleep(ms: number): void {
  if (typeof SharedArrayBuffer !== "undefined" && typeof Atomics !== "undefined") {
    try {
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
      return;
    } catch {
      // Atomics.wait may throw on restricted runtimes — fall through to busy-wait
    }
  }
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    /* busy-wait */
  }
}

/**
 * Type for openSqliteDatabase callback — avoids importing the full SQLite adapter type.
 */
type OpenDbFn = (
  filePath: string,
  options?: Record<string, unknown>
) => {
  driver: string;
  open: boolean;
  close(): void;
};

/**
 * Retries opening a SQLite database probe when the initial attempt fails with
 * a transient error. Uses exponential backoff (500ms, 1000ms, 2000ms).
 *
 * @param sqliteFile - Path to the SQLite database file
 * @param openDb - Function to open the database (normally openSqliteDatabase)
 * @param closeDb - Function to safely close the probe adapter
 * @returns true if the retry succeeded (transient condition resolved)
 *          false if all retries were exhausted or error is non-transient
 */
export function retryProbeIfTransient(
  sqliteFile: string,
  probeError: unknown,
  openDb: OpenDbFn,
  closeDb: (adapter: { driver: string; open: boolean; close(): void } | null | undefined) => void
): boolean {
  if (!isTransientProbeError(probeError)) return false;

  const retryDelays = [500, 1000, 2000];
  for (let i = 0; i < retryDelays.length; i++) {
    syncSleep(retryDelays[i]);
    try {
      const retryAdapter = openDb(sqliteFile, { readonly: true });
      closeDb(retryAdapter);
      return true;
    } catch {
      // Retry failed, try next delay
    }
  }

  console.warn(
    `[DB] All ${retryDelays.length} transient probe retries exhausted — declaring corruption`
  );
  return false;
}
