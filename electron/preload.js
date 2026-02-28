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
 * Validate IPC channel name for security
 * @param {string} channel - The channel to validate
 * @param {'invoke' | 'send' | 'receive'} type - The channel type
 * @returns {boolean}
 */
function isValidChannel(channel, type) {
  return VALID_CHANNELS[type]?.includes(channel) ?? false;
}

/**
 * Expose a limited API to the renderer process
 */
contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * Get application information
   * @returns {Promise<{name: string, version: string, platform: string, isDev: boolean, port: number}>}
   */
  getAppInfo: () => {
    if (!isValidChannel('get-app-info', 'invoke')) {
      return Promise.reject(new Error('Invalid channel'));
    }
    return ipcRenderer.invoke('get-app-info');
  },

  /**
   * Open an external URL in the default browser
   * @param {string} url - The URL to open
   */
  openExternal: (url) => {
    if (!isValidChannel('open-external', 'invoke')) {
      return Promise.reject(new Error('Invalid channel'));
    }
    return ipcRenderer.invoke('open-external', url);
  },

  /**
   * Get the data directory path
   * @returns {Promise<string>}
   */
  getDataDir: () => {
    if (!isValidChannel('get-data-dir', 'invoke')) {
      return Promise.reject(new Error('Invalid channel'));
    }
    return ipcRenderer.invoke('get-data-dir');
  },

  /**
   * Restart the server
   * @returns {Promise<{success: boolean}>}
   */
  restartServer: () => {
    if (!isValidChannel('restart-server', 'invoke')) {
      return Promise.reject(new Error('Invalid channel'));
    }
    return ipcRenderer.invoke('restart-server');
  },

  /**
   * Minimize the window
   */
  minimizeWindow: () => {
    if (isValidChannel('window-minimize', 'send')) {
      ipcRenderer.send('window-minimize');
    }
  },

  /**
   * Maximize/unmaximize the window
   */
  maximizeWindow: () => {
    if (isValidChannel('window-maximize', 'send')) {
      ipcRenderer.send('window-maximize');
    }
  },

  /**
   * Close the window
   */
  closeWindow: () => {
    if (isValidChannel('window-close', 'send')) {
      ipcRenderer.send('window-close');
    }
  },

  /**
   * Listen for server status updates
   * @param {function} callback - Callback function
   */
  onServerStatus: (callback) => {
    if (isValidChannel('server-status', 'receive')) {
      ipcRenderer.on('server-status', (event, data) => callback(data));
    }
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
    if (isValidChannel('port-changed', 'receive')) {
      ipcRenderer.on('port-changed', (event, port) => callback(port));
    }
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
