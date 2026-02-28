/**
 * OmniRoute Electron Desktop App - Preload Script
 * 
 * This script runs in a separate context before the web page loads.
 * It provides a secure bridge between the renderer process (Next.js app)
 * and the main process (Electron).
 * 
 * Security: Uses contextIsolation: true for maximum security.
 */

const { contextBridge, ipcRenderer } = require('electron');

// Valid IPC channels for security
const VALID_CHANNELS = {
  invoke: [
    'get-app-info',
    'open-external',
    'get-data-dir',
    'restart-server',
  ],
  send: [
    'window-minimize',
    'window-maximize',
    'window-close',
  ],
  receive: [
    'server-status',
    'port-changed',
  ],
};

/**
 * Expose a limited API to the renderer process
 */
contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * Get application information
   * @returns {Promise<{name: string, version: string, platform: string, isDev: boolean, port: number}>}
   */
  getAppInfo: () => ipcRenderer.invoke('get-app-info'),

  /**
   * Open an external URL in the default browser
   * @param {string} url - The URL to open
   */
  openExternal: (url) => ipcRenderer.invoke('open-external', url),

  /**
   * Get the data directory path
   * @returns {Promise<string>}
   */
  getDataDir: () => ipcRenderer.invoke('get-data-dir'),

  /**
   * Restart the server
   * @returns {Promise<{success: boolean}>}
   */
  restartServer: () => ipcRenderer.invoke('restart-server'),

  /**
   * Minimize the window
   */
  minimizeWindow: () => ipcRenderer.send('window-minimize'),

  /**
   * Maximize/unmaximize the window
   */
  maximizeWindow: () => ipcRenderer.send('window-maximize'),

  /**
   * Close the window
   */
  closeWindow: () => ipcRenderer.send('window-close'),

  /**
   * Listen for server status updates
   * @param {function} callback - Callback function
   */
  onServerStatus: (callback) => {
    ipcRenderer.on('server-status', (event, data) => callback(data));
  },

  /**
   * Remove server status listener
   */
  removeServerStatusListener: () => {
    ipcRenderer.removeAllListeners('server-status');
  },

  /**
   * Listen for port changes
   * @param {function} callback - Callback function
   */
  onPortChanged: (callback) => {
    ipcRenderer.on('port-changed', (event, port) => callback(port));
  },

  /**
   * Remove port changed listener
   */
  removePortChangedListener: () => {
    ipcRenderer.removeAllListeners('port-changed');
  },

  /**
   * Check if running in Electron
   * @returns {boolean}
   */
  isElectron: true,

  /**
   * Get the platform
   * @returns {string}
   */
  platform: process.platform,
});

/**
 * Type definition for the exposed API (for TypeScript support)
 * This can be referenced in the Next.js app for type safety.
 */
// declare global {
//   interface Window {
//     electronAPI: {
//       getAppInfo: () => Promise<AppInfo>;
//       openExternal: (url: string) => Promise<void>;
//       getDataDir: () => Promise<string>;
//       restartServer: () => Promise<{success: boolean}>;
//       minimizeWindow: () => void;
//       maximizeWindow: () => void;
//       closeWindow: () => void;
//       onServerStatus: (callback: (data: any) => void) => void;
//       removeServerStatusListener: () => void;
//       onPortChanged: (callback: (port: number) => void) => void;
//       removePortChangedListener: () => void;
//       isElectron: boolean;
//       platform: string;
//     };
//   }
// }
