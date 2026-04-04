export const SHOW_CONFIGURED_ONLY_STORAGE_KEY = "omniroute-providers-show-configured-only";

interface StorageReader {
  getItem(key: string): string | null;
}

interface StorageWriter extends StorageReader {
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export function parseConfiguredOnlyPreference(value: string | null | undefined): boolean {
  return value === "true";
}

function getBrowserStorage(): StorageWriter | null {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

export function readConfiguredOnlyPreference(storage: StorageReader | null = getBrowserStorage()) {
  if (!storage) return false;

  return parseConfiguredOnlyPreference(storage.getItem(SHOW_CONFIGURED_ONLY_STORAGE_KEY));
}

export function writeConfiguredOnlyPreference(
  enabled: boolean,
  storage: StorageWriter | null = getBrowserStorage()
) {
  if (!storage) return;

  if (enabled) {
    storage.setItem(SHOW_CONFIGURED_ONLY_STORAGE_KEY, "true");
    return;
  }

  storage.removeItem(SHOW_CONFIGURED_ONLY_STORAGE_KEY);
}
