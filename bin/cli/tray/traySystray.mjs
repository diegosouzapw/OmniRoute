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

function loadSystray2() {
  const candidates = [
    () => {
      const { createRequire } = require("module");
      const req = createRequire(import.meta.url);
      return req("systray2").default;
    },
  ];
  for (const attempt of candidates) {
    try {
      return attempt();
    } catch {}
  }
  return null;
}

function getIconBase64() {
  const iconPath = join(__dirname, "icons", "icon.png");
  if (existsSync(iconPath)) return readFileSync(iconPath).toString("base64");
  return "";
}

export function initSystrayUnix({ port, onQuit, onOpenDashboard, onShowLogs }) {
  const SysTray = loadSystray2();
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
        isTemplateIcon: process.platform === "darwin",
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

export function killSystrayUnix(tray) {
  try {
    tray.kill(false);
  } catch {}
}
