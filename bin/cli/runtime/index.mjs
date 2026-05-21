import { loadSqliteRuntime } from "./sqliteRuntime.mjs";

let warmed = false;

/**
 * Pre-resolves native runtimes at startup so the first DB access is fast
 * and EBUSY-resilient on Windows.
 *
 * Tray runtime (systray2) is warmed lazily by initTray() in bin/cli/tray/.
 */
export async function warmUpRuntimes() {
  if (warmed) return;
  warmed = true;
  try {
    await loadSqliteRuntime();
  } catch {}
}

export { loadSqliteRuntime };
