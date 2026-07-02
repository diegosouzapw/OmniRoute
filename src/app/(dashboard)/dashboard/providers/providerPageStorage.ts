export const SHOW_CONFIGURED_ONLY_STORAGE_KEY = "omniroute-providers-show-configured-only";
export const PROVIDER_DISPLAY_MODE_STORAGE_KEY = "omniroute-providers-display-mode";

export type ProviderDisplayMode = "all" | "configured" | "compact";

interface StorageReader {
  getItem(key: string): string | null;
}

interface StorageWriter extends StorageReader {
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

type StorageReaderWriter = StorageReader & Partial<StorageWriter>;

export function parseConfiguredOnlyPreference(value: string | null | undefined): boolean {
  return value === "true";
}

export function parseProviderDisplayModePreference(
  value: string | null | undefined
): ProviderDisplayMode | null {
  if (value === "all" || value === "configured" || value === "compact") return value;

  return null;
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

export function readProviderDisplayModePreference(
  storage: StorageReaderWriter | null = getBrowserStorage()
): ProviderDisplayMode {
  if (!storage) return "all";

  const storedMode = parseProviderDisplayModePreference(
    storage.getItem(PROVIDER_DISPLAY_MODE_STORAGE_KEY)
  );
  if (storedMode) return storedMode;

  if (!readConfiguredOnlyPreference(storage)) return "all";

  storage.setItem?.(PROVIDER_DISPLAY_MODE_STORAGE_KEY, "configured");
  storage.removeItem?.(SHOW_CONFIGURED_ONLY_STORAGE_KEY);
  return "configured";
}

export function writeProviderDisplayModePreference(
  mode: ProviderDisplayMode,
  storage: StorageWriter | null = getBrowserStorage()
) {
  if (!storage) return;

  storage.removeItem(SHOW_CONFIGURED_ONLY_STORAGE_KEY);

  if (mode === "all") {
    storage.removeItem(PROVIDER_DISPLAY_MODE_STORAGE_KEY);
    return;
  }

  storage.setItem(PROVIDER_DISPLAY_MODE_STORAGE_KEY, mode);
}
