import { isTraySupported, initSystrayUnix, killSystrayUnix } from "./traySystray.mjs";
import { initWinTray, killWinTray } from "./trayWindows.mjs";

let active = null;

export { isTraySupported };

export async function initTray({ port, onQuit, onOpenDashboard, onShowLogs }) {
  if (!isTraySupported()) return null;
  const ctx = { port, onQuit, onOpenDashboard, onShowLogs };
  // initSystrayUnix is async: it lazily installs/loads systray2 from the runtime
  // dir (trayRuntime.ts) rather than from node_modules. (#4605)
  active = process.platform === "win32" ? initWinTray(ctx) : await initSystrayUnix(ctx);
  return active;
}

export function killTray() {
  if (!active) return;
  try {
    if (process.platform === "win32") killWinTray(active);
    else killSystrayUnix(active);
  } catch {}
  active = null;
}

export function isTrayActive() {
  return active !== null;
}
