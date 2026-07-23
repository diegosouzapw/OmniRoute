export const DEFAULT_REFRESH_INTERVAL_SEC = 10;
export const MIN_REFRESH_INTERVAL_SEC = 1;
export const MAX_REFRESH_INTERVAL_SEC = 300;
export const REFRESH_INTERVAL_STORAGE_KEY = "loggerRefreshIntervalSec";

type RefreshIntervalStorage = Pick<Storage, "getItem" | "setItem">;

function getBrowserStorage(): RefreshIntervalStorage | null {
  if (globalThis.window === undefined) return null;
  return window.localStorage;
}

export function clampRefreshIntervalSec(value: number): number {
  if (!Number.isFinite(value)) return DEFAULT_REFRESH_INTERVAL_SEC;
  return Math.min(MAX_REFRESH_INTERVAL_SEC, Math.max(MIN_REFRESH_INTERVAL_SEC, Math.round(value)));
}

export function readSavedRefreshIntervalSec(
  storage: RefreshIntervalStorage | null = getBrowserStorage()
): number {
  if (!storage) return DEFAULT_REFRESH_INTERVAL_SEC;
  try {
    const saved = storage.getItem(REFRESH_INTERVAL_STORAGE_KEY);
    if (!saved) return DEFAULT_REFRESH_INTERVAL_SEC;
    return clampRefreshIntervalSec(Number.parseInt(saved, 10));
  } catch {
    return DEFAULT_REFRESH_INTERVAL_SEC;
  }
}

export function writeSavedRefreshIntervalSec(
  value: number,
  storage: RefreshIntervalStorage | null = getBrowserStorage()
): boolean {
  if (!storage) return false;
  try {
    storage.setItem(REFRESH_INTERVAL_STORAGE_KEY, String(clampRefreshIntervalSec(value)));
    return true;
  } catch {
    // Storage may be unavailable in private browsing or locked-down embeds.
    // The in-memory control still updates, so persistence failure is non-fatal.
    return false;
  }
}
