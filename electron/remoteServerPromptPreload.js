/**
 * Preload for the small "Connect to Remote Server" prompt window.
 *
 * Kept separate from the main preload.js — this window only ever loads our
 * own bundled remoteServerPrompt.html (never remote/untrusted content), but we
 * still keep contextIsolation on and expose the minimum surface needed.
 */

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("remoteServerPrompt", {
  getInitialUrl: () => ipcRenderer.invoke("remote-server-prompt:get-initial-url"),
  submit: (url) => ipcRenderer.send("remote-server-prompt:submit", url),
  cancel: () => ipcRenderer.send("remote-server-prompt:cancel"),
});
