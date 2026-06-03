import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { initWindowsTray, type WinTrayHandle } from "./trayWin.ts";
import { enableAutoStart, disableAutoStart, isAutoStartEnabled } from "./autostart.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface MenuItem {
  title: string;
  enabled: boolean;
}

export interface TrayOptions {
  port: number;
  onQuit: () => void;
  onOpenDashboard: () => void;
}

export interface TrayInstance {
  update(items: MenuItem[]): void;
  setTooltip(text: string): void;
  destroy(): void;
}

// Minimal 16x16 OmniRoute icon as base64 PNG (fallback when file missing)
const FALLBACK_ICON_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAHpJREFUOE9jYBgFgwEwMjIy/Gdg+P8fyP4PxP8ZGBgEcBnGyMjIsICBgSEAhyH/gfgBUNN8XJoZsdkCVL8Ah+b/QPwbqvkBMvk/AwMDAzYX/GdgYAhAN+A/SICRWAMYGfFEJSMjzriEiwDR/xmIa2RkZCSqnZERb3QCAAo3KxzxbKe1AAAAAElFTkSuQmCC";

export function getIconPath(): string {
  const isWin = process.platform === "win32";
  // On Windows prefer .ico but fall back to .png (tray.ps1 handles both via GDI+)
  const candidates = isWin ? ["icon.ico", "icon.png"] : ["icon.png"];
  for (const iconFile of candidates) {
    const iconPath = join(__dirname, iconFile);
    if (existsSync(iconPath)) return iconPath;
  }
  return "";
}

export function getIconBase64(): string {
  const iconPath = getIconPath();
  if (iconPath) {
    try {
      return readFileSync(iconPath).toString("base64");
    } catch {
      // fall through to default
    }
  }
  return FALLBACK_ICON_BASE64;
}

export function isTraySupported(): boolean {
  const p = process.platform;
  if (!["darwin", "win32", "linux"].includes(p)) return false;
  if (p === "linux" && !process.env.DISPLAY) return false;
  return true;
}

export function buildMenuItems(args: { port: number; autostartEnabled: boolean }): MenuItem[] {
  return [
    { title: "Open OmniRoute Dashboard", enabled: true },
    { title: `Port: ${args.port}`, enabled: false },
    { title: args.autostartEnabled ? "Disable Autostart" : "Enable Autostart", enabled: true },
    { title: "Quit OmniRoute", enabled: true },
  ];
}

const MENU_INDEX = {
  OPEN_DASHBOARD: 0,
  PORT: 1,
  AUTOSTART_TOGGLE: 2,
  QUIT: 3,
} as const;

export async function initTray(options: TrayOptions): Promise<TrayInstance | null> {
  if (!isTraySupported()) return null;
  if (process.platform === "win32") return initWindowsTrayInstance(options);
  return initUnixTray(options);
}

async function initWindowsTrayInstance(options: TrayOptions): Promise<TrayInstance | null> {
  const iconPath = getIconPath();
  if (!iconPath) return null;
  let autostartEnabled = await isAutoStartEnabled();
  let handle: WinTrayHandle | null = null;
  handle = initWindowsTray({
    iconPath,
    tooltip: `OmniRoute :${options.port}`,
    onEvent: async (evt) => {
      if (evt.type !== "click") return;
      switch (evt.index) {
        case MENU_INDEX.OPEN_DASHBOARD:
          options.onOpenDashboard();
          break;
        case MENU_INDEX.AUTOSTART_TOGGLE: {
          if (autostartEnabled) await disableAutoStart();
          else await enableAutoStart();
          autostartEnabled = !autostartEnabled;
          handle?.update(buildMenuItems({ port: options.port, autostartEnabled }));
          break;
        }
        case MENU_INDEX.QUIT:
          options.onQuit();
          break;
      }
    },
  });
  if (!handle) return null;
  handle.update(buildMenuItems({ port: options.port, autostartEnabled }));
  return {
    update: (items) => handle!.update(items),
    setTooltip: (text) => handle!.setTooltip(text),
    destroy: () => handle!.destroy(),
  };
}

async function initUnixTray(options: TrayOptions): Promise<TrayInstance | null> {
  const { loadSystray } = await import("../runtime/trayRuntime.ts");
  const SysTray = await loadSystray();
  if (!SysTray) return null;
  let autostartEnabled = await isAutoStartEnabled();
  const menuItems = buildMenuItems({ port: options.port, autostartEnabled });
  const systray = new SysTray({
    menu: {
      icon: getIconBase64(),
      title: "OmniRoute",
      tooltip: `OmniRoute :${options.port}`,
      items: menuItems.map((it) => ({
        title: it.title,
        tooltip: "",
        checked: false,
        enabled: it.enabled,
      })),
    },
    debug: false,
    copyDir: false,
  });
  systray.onClick(async (action: { seq_id: number }) => {
    switch (action.seq_id) {
      case MENU_INDEX.OPEN_DASHBOARD:
        options.onOpenDashboard();
        break;
      case MENU_INDEX.AUTOSTART_TOGGLE: {
        if (autostartEnabled) await disableAutoStart();
        else await enableAutoStart();
        autostartEnabled = !autostartEnabled;
        systray.sendAction({
          type: "update-item",
          item: {
            title: autostartEnabled ? "Disable Autostart" : "Enable Autostart",
            enabled: true,
            checked: false,
            tooltip: "",
          },
          seq_id: MENU_INDEX.AUTOSTART_TOGGLE,
        });
        break;
      }
      case MENU_INDEX.QUIT:
        options.onQuit();
        break;
    }
  });
  return {
    update: (items) => {
      items.forEach((it, idx) => {
        systray.sendAction({
          type: "update-item",
          item: { title: it.title, enabled: it.enabled, checked: false, tooltip: "" },
          seq_id: idx,
        });
      });
    },
    setTooltip: () => {
      /* systray2 does not support runtime tooltip change */
    },
    destroy: () => systray.kill(),
  };
}
