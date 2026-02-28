/**
 * OmniRoute Electron Types
 * 
 * TypeScript definitions for the Electron API exposed to the renderer process.
 */

export interface AppInfo {
  name: string;
  version: string;
  platform: 'win32' | 'darwin' | 'linux';
  isDev: boolean;
  port: number;
}

export interface ElectronAPI {
  /**
   * Get application information
   */
  getAppInfo(): Promise<AppInfo>;

  /**
   * Open an external URL in the default browser
   */
  openExternal(url: string): Promise<void>;

  /**
   * Get the data directory path
   */
  getDataDir(): Promise<string>;

  /**
   * Restart the server
   */
  restartServer(): Promise<{ success: boolean }>;

  /**
   * Minimize the window
   */
  minimizeWindow(): void;

  /**
   * Maximize/unmaximize the window
   */
  maximizeWindow(): void;

  /**
   * Close the window
   */
  closeWindow(): void;

  /**
   * Listen for server status updates
   */
  onServerStatus(callback: (data: { status: string; port: number }) => void): void;

  /**
   * Remove server status listener
   */
  removeServerStatusListener(): void;

  /**
   * Listen for port changes
   */
  onPortChanged(callback: (port: number) => void): void;

  /**
   * Remove port changed listener
   */
  removePortChangedListener(): void;

  /**
   * Check if running in Electron
   */
  isElectron: boolean;

  /**
   * Get the platform
   */
  platform: 'win32' | 'darwin' | 'linux';
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};
