'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Check if the app is running in Electron
 */
export function useIsElectron(): boolean {
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    setIsElectron(typeof window !== 'undefined' && window.electronAPI?.isElectron === true);
  }, []);

  return isElectron;
}

/**
 * Get Electron app information
 */
export function useElectronAppInfo() {
  const [appInfo, setAppInfo] = useState<{
    name: string;
    version: string;
    platform: string;
    isDev: boolean;
    port: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.electronAPI) {
      setLoading(false);
      return;
    }

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
 */
export function useDataDir() {
  const [dataDir, setDataDir] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.electronAPI) {
      setLoading(false);
      return;
    }

    window.electronAPI
      .getDataDir()
      .then((dir) => {
        setDataDir(dir);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return { dataDir, loading };
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

  return {
    isElectron,
    minimize,
    maximize,
    close,
  };
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
        window.open(url, '_blank', 'noopener,noreferrer');
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

  return {
    isElectron,
    restart,
    restarting,
  };
}

/**
 * Listen for server status updates
 */
export function useServerStatus(onStatus: (status: { status: string; port: number }) => void) {
  const isElectron = useIsElectron();

  useEffect(() => {
    if (!isElectron || !window.electronAPI) return;

    window.electronAPI.onServerStatus(onStatus);

    return () => {
      window.electronAPI.removeServerStatusListener();
    };
  }, [isElectron, onStatus]);
}

/**
 * Listen for port changes
 */
export function usePortChanged(onPortChanged: (port: number) => void) {
  const isElectron = useIsElectron();

  useEffect(() => {
    if (!isElectron || !window.electronAPI) return;

    window.electronAPI.onPortChanged(onPortChanged);

    return () => {
      window.electronAPI.removePortChangedListener();
    };
  }, [isElectron, onPortChanged]);
}
