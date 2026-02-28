/**
 * OmniRoute Electron Types
 *
 * TypeScript definitions for the Electron API exposed to the renderer process.
 *
 * Updated to reflect:
 * - Fix #6: onServerStatus/onPortChanged return disposer functions
 * - Removed removeServerStatusListener/removePortChangedListener (replaced by disposers)
 */

export interface AppInfo {
  name: string;
  version: string;
  platform: "win32" | "darwin" | "linux";
  isDev: boolean;
  port: number;
}

export interface ServerStatus {
  status: "starting" | "running" | "stopped" | "restarting" | "error";
  port: number;
}

export interface ElectronAPI {
  // ── Invoke (async) ─────────────────────────────────────
  getAppInfo(): Promise<AppInfo>;
  openExternal(url: string): Promise<void>;
  getDataDir(): Promise<string>;
  restartServer(): Promise<{ success: boolean }>;

  // ── Send (fire-and-forget) ─────────────────────────────
  minimizeWindow(): void;
  maximizeWindow(): void;
  closeWindow(): void;

  // ── Receive (returns disposer for cleanup) ─────────────
  onServerStatus(callback: (data: ServerStatus) => void): () => void;
  onPortChanged(callback: (port: number) => void): () => void;

  // ── Static Properties ──────────────────────────────────
  isElectron: boolean;
  platform: "win32" | "darwin" | "linux";
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};
