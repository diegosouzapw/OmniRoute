/**
 * OmniRoute Electron Desktop App - Preload Script
 *
 * Secure bridge between renderer (Next.js) and main process (Electron).
 * Uses contextIsolation: true for maximum security.
 *
 * Code Review Fixes Applied:
 * #6  Listener accumulation — return disposer functions instead of using removeAllListeners
 * #16 Simplified channel validation — generic wrapper reduces boilerplate
 */

const { contextBridge, ipcRenderer } = require("electron");

const MAC_DRAG_STYLE_ID = "omniroute-electron-drag-region-style";
const MAC_DRAG_FALLBACK_ID = "omniroute-electron-drag-region";
const MAC_DRAG_OBSERVER_KEY = "__omnirouteMacDragRegionObserver";

function installMacDragRegion() {
  if (process.platform !== "darwin") return;

  const attach = () => {
    if (!document.head || !document.body) return;

    document.getElementById(MAC_DRAG_STYLE_ID)?.remove();
    document.getElementById(MAC_DRAG_FALLBACK_ID)?.remove();

    const style = document.createElement("style");
    style.id = MAC_DRAG_STYLE_ID;
    style.textContent = `
      header,
      .omniroute-electron-drag-region {
        app-region: drag;
        -webkit-app-region: drag;
        user-select: none;
      }

      header a,
      header button,
      header input,
      header select,
      header textarea,
      header [role="button"],
      header [role="link"],
      header [tabindex]:not([tabindex="-1"]) {
        app-region: no-drag;
        -webkit-app-region: no-drag;
      }

      .omniroute-electron-drag-region {
        position: fixed;
        top: 0;
        left: 96px;
        right: 180px;
        height: 46px;
        z-index: 9999;
      }
    `;

    const dragRegion = document.createElement("div");
    dragRegion.id = MAC_DRAG_FALLBACK_ID;
    dragRegion.className = "omniroute-electron-drag-region";
    dragRegion.setAttribute("aria-hidden", "true");

    document.head.appendChild(style);
    document.body.appendChild(dragRegion);

    const syncDragFallback = () => {
      const hasHeader = Boolean(document.querySelector("header"));
      dragRegion.hidden = hasHeader;
      if (hasHeader) observer.disconnect();
    };
    const previousObserver = window[MAC_DRAG_OBSERVER_KEY];
    if (previousObserver) previousObserver.disconnect();

    const observer = new MutationObserver(syncDragFallback);
    observer.observe(document.body, { childList: true, subtree: true });
    window[MAC_DRAG_OBSERVER_KEY] = observer;
    window.setTimeout(() => observer.disconnect(), 5000);
    window.addEventListener("pagehide", () => observer.disconnect(), { once: true });
    syncDragFallback();
  };

  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", attach, { once: true });
  } else {
    attach();
  }
}

installMacDragRegion();

// ── Channel Whitelist ──────────────────────────────────────
const VALID_CHANNELS = {
  invoke: [
    "get-app-info",
    "open-external",
    "get-data-dir",
    "restart-server",
    "check-for-updates",
    "download-update",
    "install-update",
    "get-app-version",
    "get-autostart-status",
    "enable-autostart",
    "disable-autostart",
  ],
  send: ["window-minimize", "window-maximize", "window-close"],
  receive: ["server-status", "port-changed", "update-status"],
};

// ── Fix #16: Generic IPC wrappers ──────────────────────────
function safeInvoke(channel, ...args) {
  if (!VALID_CHANNELS.invoke.includes(channel)) {
    return Promise.reject(new Error(`Blocked IPC invoke: ${channel}`));
  }
  return ipcRenderer.invoke(channel, ...args);
}

function safeSend(channel, ...args) {
  if (VALID_CHANNELS.send.includes(channel)) {
    ipcRenderer.send(channel, ...args);
  }
}

// Fix #6: Return disposer function for proper listener cleanup
function safeOn(channel, callback) {
  if (!VALID_CHANNELS.receive.includes(channel)) return () => {};
  const handler = (_event, data) => callback(data);
  ipcRenderer.on(channel, handler);
  // Return a disposer — caller removes only THIS specific listener
  return () => ipcRenderer.removeListener(channel, handler);
}

// ── Expose API to Renderer ─────────────────────────────────
contextBridge.exposeInMainWorld("electronAPI", {
  // ── Invoke (async, returns Promise) ──────────────────────
  getAppInfo: () => safeInvoke("get-app-info"),
  openExternal: (url) => safeInvoke("open-external", url),
  getDataDir: () => safeInvoke("get-data-dir"),
  restartServer: () => safeInvoke("restart-server"),
  getAppVersion: () => safeInvoke("get-app-version"),

  // ── Auto-Update ──────────────────────────────────────────
  checkForUpdates: () => safeInvoke("check-for-updates"),
  downloadUpdate: () => safeInvoke("download-update"),
  installUpdate: () => safeInvoke("install-update"),

  // ── Autostart ────────────────────────────────────────────
  getAutostartStatus: () => safeInvoke("get-autostart-status"),
  enableAutostart: () => safeInvoke("enable-autostart"),
  disableAutostart: () => safeInvoke("disable-autostart"),

  // ── Send (fire-and-forget) ───────────────────────────────
  minimizeWindow: () => safeSend("window-minimize"),
  maximizeWindow: () => safeSend("window-maximize"),
  closeWindow: () => safeSend("window-close"),

  // ── Receive (event listeners) ────────────────────────────
  // Fix #6: Returns a disposer function for precise cleanup
  onServerStatus: (callback) => safeOn("server-status", callback),
  onPortChanged: (callback) => safeOn("port-changed", callback),
  onUpdateStatus: (callback) => safeOn("update-status", callback),

  // ── Static Properties ────────────────────────────────────
  isElectron: true,
  platform: process.platform,
});
