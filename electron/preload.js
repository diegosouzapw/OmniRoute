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

// ── Channel Whitelist ──────────────────────────────────────
const VALID_CHANNELS = {
  invoke: ["get-app-info", "open-external", "get-data-dir", "restart-server"],
  send: ["window-minimize", "window-maximize", "window-close"],
  receive: ["server-status", "port-changed"],
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

  // ── Send (fire-and-forget) ───────────────────────────────
  minimizeWindow: () => safeSend("window-minimize"),
  maximizeWindow: () => safeSend("window-maximize"),
  closeWindow: () => safeSend("window-close"),

  // ── Receive (event listeners) ────────────────────────────
  // Fix #6: Returns a disposer function for precise cleanup
  onServerStatus: (callback) => safeOn("server-status", callback),
  onPortChanged: (callback) => safeOn("port-changed", callback),

  // ── Static Properties ────────────────────────────────────
  isElectron: true,
  platform: process.platform,
});
