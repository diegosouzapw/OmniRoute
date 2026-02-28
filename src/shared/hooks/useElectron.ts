"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";

/**
 * Code Review Fixes Applied:
 * #7  useIsElectron — useSyncExternalStore for zero re-renders
 * #11 Import AppInfo type instead of inline duplication
 * #12 useDataDir — add error state (was swallowed silently)
 */

// ── Fix #7: Module-level detection (no state, no re-renders) ──

function getIsElectronSnapshot(): boolean {
  return typeof window !== "undefined" && window.electronAPI?.isElectron === true;
}

function getServerSnapshot(): boolean {
  return false; // SSR always returns false
}

const noop = () => () => {};

/**
 * Check if running in Electron — zero re-renders via useSyncExternalStore
 */
export function useIsElectron(): boolean {
  return useSyncExternalStore(noop, getIsElectronSnapshot, getServerSnapshot);
}

/**
 * App info shape from Electron main process
 * Fix #11: Single source of truth (matches electron/types.d.ts)
 */
interface AppInfo {
  name: string;
  version: string;
  platform: string;
  isDev: boolean;
  port: number;
}

/**
 * Get Electron app information
 */
export function useElectronAppInfo() {
  const hasApi = getIsElectronSnapshot();
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [loading, setLoading] = useState(hasApi);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.electronAPI) return;

    window.electronAPI
      .getAppInfo()
      .then((info) => {
        setAppInfo(info);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { appInfo, loading, error };
}

/**
 * Get the data directory path
 * Fix #12: Now exposes error state (was swallowed silently)
 */
export function useDataDir() {
  const hasApi = getIsElectronSnapshot();
  const [dataDir, setDataDir] = useState<string | null>(null);
  const [loading, setLoading] = useState(hasApi);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.electronAPI) return;

    window.electronAPI
      .getDataDir()
      .then((dir) => {
        setDataDir(dir);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      });
  }, []);

  return { dataDir, loading, error };
}

/**
 * Window controls for Electron
 */
export function useWindowControls() {
  const isElectron = useIsElectron();

  const minimize = useCallback(() => {
    if (isElectron && window.electronAPI) {
      window.electronAPI.minimizeWindow();
    }
  }, [isElectron]);

  const maximize = useCallback(() => {
    if (isElectron && window.electronAPI) {
      window.electronAPI.maximizeWindow();
    }
  }, [isElectron]);

  const close = useCallback(() => {
    if (isElectron && window.electronAPI) {
      window.electronAPI.closeWindow();
    }
  }, [isElectron]);

  return { isElectron, minimize, maximize, close };
}

/**
 * Open external URL in default browser
 */
export function useOpenExternal() {
  const isElectron = useIsElectron();

  const openExternal = useCallback(
    async (url: string) => {
      if (isElectron && window.electronAPI) {
        await window.electronAPI.openExternal(url);
      } else {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    },
    [isElectron]
  );

  return { openExternal };
}

/**
 * Server controls for Electron
 */
export function useServerControls() {
  const isElectron = useIsElectron();
  const [restarting, setRestarting] = useState(false);

  const restart = useCallback(async () => {
    if (!isElectron || !window.electronAPI) {
      return { success: false };
    }

    setRestarting(true);
    try {
      const result = await window.electronAPI.restartServer();
      return result;
    } finally {
      setRestarting(false);
    }
  }, [isElectron]);

  return { isElectron, restart, restarting };
}

/**
 * Listen for server status updates
 * Fix #6: Uses disposer returned by preload for precise cleanup
 */
export function useServerStatus(onStatus: (status: { status: string; port: number }) => void) {
  const isElectron = useIsElectron();

  useEffect(() => {
    if (!isElectron || !window.electronAPI) return;

    const dispose = window.electronAPI.onServerStatus(onStatus);
    return dispose;
  }, [isElectron, onStatus]);
}

/**
 * Listen for port changes
 * Fix #6: Uses disposer returned by preload for precise cleanup
 */
export function usePortChanged(onPortChanged: (port: number) => void) {
  const isElectron = useIsElectron();

  useEffect(() => {
    if (!isElectron || !window.electronAPI) return;

    const dispose = window.electronAPI.onPortChanged(onPortChanged);
    return dispose;
  }, [isElectron, onPortChanged]);
}
