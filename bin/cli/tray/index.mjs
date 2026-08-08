import { isTraySupported, initSystrayUnix, killSystrayUnix } from "./traySystray.mjs";

let active = null;

export { isTraySupported };

export async function initTray({ port, onQuit, onOpenDashboard, onShowLogs }) {
  if (!isTraySupported()) return null;
  const ctx = { port, onQuit, onOpenDashboard, onShowLogs };
  // initSystrayUnix is async: it lazily installs/loads systray2 from the runtime
  // dir (trayRuntime.ts) rather than from node_modules. (#4605)
  // Use systray2 on all platforms including Windows — the tarball ships
  // tray_windows_release.exe, avoiding the Norton/AVG IDP.HELU.PSE85 heuristic
  // that fires on temp-dir PowerShell scripts. (#8609)
  active = await initSystrayUnix(ctx);
  return active;
}

export function killTray() {
  if (!active) return;
  try {
    killSystrayUnix(active);
  } catch {}
  active = null;
}

export function isTrayActive() {
  return active !== null;
}
