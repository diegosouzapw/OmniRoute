import { isTraySupported, initSystrayUnix, killSystrayUnix } from "./traySystray.mjs";
import { initWinTray, killWinTray } from "./trayWindows.mjs";

let active = null;

export { isTraySupported };

export function initTray({ port, onQuit, onOpenDashboard, onShowLogs }) {
  if (!isTraySupported()) return null;
  const ctx = { port, onQuit, onOpenDashboard, onShowLogs };
  active = process.platform === "win32" ? initWinTray(ctx) : initSystrayUnix(ctx);
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
