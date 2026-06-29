import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { isAutostartEnabled } from "./autostart.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const MENU_INDEX = { STATUS: 0, DASHBOARD: 1, LOGS: 2, AUTOSTART: 3, QUIT: 4 };

export function isTraySupported() {
  const p = process.platform;
  if (!["darwin", "linux", "win32"].includes(p)) return false;
  if (p === "linux" && !process.env.DISPLAY && !process.env.WAYLAND_DISPLAY) return false;
  return true;
}

// systray2 is NOT a static dependency — it is lazily installed into
// ~/.omniroute/runtime by trayRuntime.ts (loadSystray). The previous inline
// loader called `require("module")`, which throws `ReferenceError: require is
// not defined` in this ESM file (package "type":"module"); the throw was
// silently swallowed, so the tray never appeared on macOS/Linux with no error
// printed (#4605, regressed in v3.8.34). Delegate to the runtime loader, which
// resolves systray2 from the runtime dir and surfaces install/import failures.
async function loadSystray2() {
  const { loadSystray } = await import("../runtime/trayRuntime.ts");
  return loadSystray();
}

function getIconBase64() {
  // Icon ships at bin/cli/tray/icon.png — the previous "icons/icon.png" path
  // never existed, so the tray was created with an empty icon (#4605).
  const iconPath = join(__dirname, "icon.png");
  if (existsSync(iconPath)) return readFileSync(iconPath).toString("base64");
  return "";
}

export async function initSystrayUnix(
  { port, onQuit, onOpenDashboard, onShowLogs },
  loadCtor = loadSystray2
) {
  const SysTray = await loadCtor();
  if (!SysTray) return null;

  const autostartEnabled = isAutostartEnabled();
  const items = [
    { title: `OmniRoute  •  port ${port}`, tooltip: "Server running", enabled: false },
    { title: "Open Dashboard", enabled: true },
    { title: "Show Logs", enabled: true },
    {
      title: autostartEnabled ? "✓ Auto-start (click to disable)" : "Enable Auto-start",
      enabled: true,
    },
    { title: "Quit OmniRoute", enabled: true },
  ];

  let tray;
  try {
    tray = new SysTray({
      menu: {
        icon: getIconBase64(),
        // isTemplateIcon must be false: icon.png is a full-color RGBA logo, and
        // macOS template mode uses only the alpha channel → a solid white square
        // (the icon looked "missing" even when the tray loaded). (PR #1080)
        isTemplateIcon: false,
        title: "",
        tooltip: `OmniRoute — port ${port}`,
        items,
      },
      debug: false,
      copyDir: false,
    });
  } catch {
    return null;
  }

  tray.onClick(async (action) => {
    if (action.seq_id === MENU_INDEX.DASHBOARD) {
      onOpenDashboard?.();
    } else if (action.seq_id === MENU_INDEX.LOGS) {
      onShowLogs?.();
    } else if (action.seq_id === MENU_INDEX.AUTOSTART) {
      const { enable, disable, isAutostartEnabled: isEnabled } = await import("./autostart.mjs");
      const wasOn = isEnabled();
      if (wasOn) disable();
      else enable();
      const nowOn = !wasOn;
      tray.sendAction({
        type: "update-item",
        item: {
          title: nowOn ? "✓ Auto-start (click to disable)" : "Enable Auto-start",
          enabled: true,
        },
        seq_id: MENU_INDEX.AUTOSTART,
      });
    } else if (action.seq_id === MENU_INDEX.QUIT) {
      onQuit?.();
    }
  });

  tray.ready().catch((err) => {
    process.stderr.write(`[omniroute][tray] systray2 failed: ${err?.message ?? String(err)}\n`);
  });

  return tray;
}

/**
 * Resolve the Go systray2 child subprocess PID from a tray instance.
 * systray2 exposes the spawned binary either as the `_process` field or via a
 * `process()` accessor depending on version. Returns the numeric PID or null.
 */
export function getSystrayChildPid(tray) {
  if (!tray) return null;
  try {
    const proc = tray._process || (typeof tray.process === "function" ? tray.process() : null);
    if (proc && typeof proc.pid === "number") return proc.pid;
  } catch {}
  return null;
}

export function killSystrayUnix(tray) {
  try {
    // systray2.kill(false) closes the IPC channel but leaves the Go tray binary
    // subprocess running, which keeps an orphan NSStatusItem on macOS and blocks
    // a freshly spawned tray (e.g. on respawn / hide-to-tray) from registering.
    // SIGKILL the child PID directly first, then close IPC.
    const pid = getSystrayChildPid(tray);
    if (pid) {
      try {
        process.kill(pid, "SIGKILL");
      } catch {}
    }
    tray.kill(false);
  } catch {}
}
