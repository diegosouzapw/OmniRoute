export const ACTIVE_ONLY_STORAGE_KEY = "omniroute-api-manager-active-only";

interface StorageReader {
  getItem(key: string): string | null;
}

interface StorageWriter extends StorageReader {
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function getBrowserStorage(): StorageWriter | null {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

export function parseActiveOnlyPreference(value: string | null | undefined): boolean {
  return value === "true";
}

export function readActiveOnlyPreference(
  storage: StorageReader | null = getBrowserStorage()
): boolean {
  if (!storage) return false;
  return parseActiveOnlyPreference(storage.getItem(ACTIVE_ONLY_STORAGE_KEY));
}

export function writeActiveOnlyPreference(
  enabled: boolean,
  storage: StorageWriter | null = getBrowserStorage()
): void {
  if (!storage) return;
  if (enabled) {
    storage.setItem(ACTIVE_ONLY_STORAGE_KEY, "true");
    return;
  }
  storage.removeItem(ACTIVE_ONLY_STORAGE_KEY);
}
