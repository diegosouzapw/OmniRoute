import test from "node:test";
import assert from "node:assert/strict";
import {
  parseConfiguredOnlyPreference,
  parseProviderDisplayModePreference,
  readConfiguredOnlyPreference,
  writeConfiguredOnlyPreference,
  readProviderDisplayModePreference,
  shouldSyncProviderDisplayMode,
  writeProviderDisplayModePreference,
  SHOW_CONFIGURED_ONLY_STORAGE_KEY,
  PROVIDER_DISPLAY_MODE_STORAGE_KEY,
} from "../../../src/app/(dashboard)/dashboard/providers/providerPageStorage";

// ---------------------------------------------------------------------------
// Helpers: in-memory storage mock
// ---------------------------------------------------------------------------
function makeMockStorage(): {
  store: Map<string, string>;
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
} {
  const store = new Map<string, string>();
  return {
    store,
    getItem(key: string) {
      return store.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
    removeItem(key: string) {
      store.delete(key);
    },
  };
}

// ---------------------------------------------------------------------------
// parseConfiguredOnlyPreference
// ---------------------------------------------------------------------------
test("parseConfiguredOnlyPreference returns true for 'true'", () => {
  assert.equal(parseConfiguredOnlyPreference("true"), true);
});

test("parseConfiguredOnlyPreference returns false for 'false'", () => {
  assert.equal(parseConfiguredOnlyPreference("false"), false);
});

test("parseConfiguredOnlyPreference returns false for null", () => {
  assert.equal(parseConfiguredOnlyPreference(null), false);
});

test("parseConfiguredOnlyPreference returns false for undefined", () => {
  assert.equal(parseConfiguredOnlyPreference(undefined), false);
});

test("parseConfiguredOnlyPreference returns false for empty string", () => {
  assert.equal(parseConfiguredOnlyPreference(""), false);
});

// ---------------------------------------------------------------------------
// parseProviderDisplayModePreference
// ---------------------------------------------------------------------------
test("parseProviderDisplayModePreference returns 'all' for 'all'", () => {
  assert.equal(parseProviderDisplayModePreference("all"), "all");
});

test("parseProviderDisplayModePreference returns 'configured' for 'configured'", () => {
  assert.equal(parseProviderDisplayModePreference("configured"), "configured");
});

test("parseProviderDisplayModePreference returns 'compact' for 'compact'", () => {
  assert.equal(parseProviderDisplayModePreference("compact"), "compact");
});

test("parseProviderDisplayModePreference returns null for invalid value", () => {
  assert.equal(parseProviderDisplayModePreference("unknown"), null);
});

test("parseProviderDisplayModePreference returns null for null", () => {
  assert.equal(parseProviderDisplayModePreference(null), null);
});

test("parseProviderDisplayModePreference returns null for undefined", () => {
  assert.equal(parseProviderDisplayModePreference(undefined), null);
});

// ---------------------------------------------------------------------------
// readConfiguredOnlyPreference
// ---------------------------------------------------------------------------
test("readConfiguredOnlyPreference returns false when storage is null", () => {
  assert.equal(readConfiguredOnlyPreference(null), false);
});

test("readConfiguredOnlyPreference reads value from storage", () => {
  const storage = makeMockStorage();
  storage.setItem(SHOW_CONFIGURED_ONLY_STORAGE_KEY, "true");
  assert.equal(readConfiguredOnlyPreference(storage), true);
});

test("readConfiguredOnlyPreference returns false when key is missing", () => {
  const storage = makeMockStorage();
  assert.equal(readConfiguredOnlyPreference(storage), false);
});

// ---------------------------------------------------------------------------
// writeConfiguredOnlyPreference
// ---------------------------------------------------------------------------
test("writeConfiguredOnlyPreference does nothing when storage is null", () => {
  // Should not throw
  writeConfiguredOnlyPreference(true, null);
});

test("writeConfiguredOnlyPreference sets key to 'true' when enabled", () => {
  const storage = makeMockStorage();
  writeConfiguredOnlyPreference(true, storage);
  assert.equal(storage.getItem(SHOW_CONFIGURED_ONLY_STORAGE_KEY), "true");
});

test("writeConfiguredOnlyPreference removes key when disabled", () => {
  const storage = makeMockStorage();
  storage.setItem(SHOW_CONFIGURED_ONLY_STORAGE_KEY, "true");
  writeConfiguredOnlyPreference(false, storage);
  assert.equal(storage.getItem(SHOW_CONFIGURED_ONLY_STORAGE_KEY), null);
});

// ---------------------------------------------------------------------------
// readProviderDisplayModePreference (the main function used by the page)
// ---------------------------------------------------------------------------
test("readProviderDisplayModePreference returns 'all' when storage is null", () => {
  assert.equal(readProviderDisplayModePreference(null), "all");
});

test("readProviderDisplayModePreference reads stored display mode", () => {
  const storage = makeMockStorage();
  storage.setItem(PROVIDER_DISPLAY_MODE_STORAGE_KEY, "configured");
  assert.equal(readProviderDisplayModePreference(storage), "configured");
});

test("readProviderDisplayModePreference reads 'compact' mode", () => {
  const storage = makeMockStorage();
  storage.setItem(PROVIDER_DISPLAY_MODE_STORAGE_KEY, "compact");
  assert.equal(readProviderDisplayModePreference(storage), "compact");
});

test("readProviderDisplayModePreference returns 'all' when no preference stored", () => {
  const storage = makeMockStorage();
  assert.equal(readProviderDisplayModePreference(storage), "all");
});

test("readProviderDisplayModePreference migrates from old configured-only key", () => {
  const storage = makeMockStorage();
  // Old key set but new key missing
  storage.setItem(SHOW_CONFIGURED_ONLY_STORAGE_KEY, "true");
  assert.equal(storage.getItem(PROVIDER_DISPLAY_MODE_STORAGE_KEY), null);

  // Should migrate: return "configured" AND write the new key
  const result = readProviderDisplayModePreference(storage);
  assert.equal(result, "configured");
  assert.equal(storage.getItem(PROVIDER_DISPLAY_MODE_STORAGE_KEY), "configured");
  assert.equal(storage.getItem(SHOW_CONFIGURED_ONLY_STORAGE_KEY), null);
});

test("readProviderDisplayModePreference prefers new display mode key over old key", () => {
  const storage = makeMockStorage();
  storage.setItem(PROVIDER_DISPLAY_MODE_STORAGE_KEY, "compact");
  storage.setItem(SHOW_CONFIGURED_ONLY_STORAGE_KEY, "true");

  // New key takes precedence — no migration
  assert.equal(readProviderDisplayModePreference(storage), "compact");
  assert.equal(storage.getItem(PROVIDER_DISPLAY_MODE_STORAGE_KEY), "compact");
  assert.equal(storage.getItem(SHOW_CONFIGURED_ONLY_STORAGE_KEY), "true");
});

// ---------------------------------------------------------------------------
// writeProviderDisplayModePreference
// ---------------------------------------------------------------------------
test("writeProviderDisplayModePreference does nothing when storage is null", () => {
  writeProviderDisplayModePreference("configured", null);
});

test("writeProviderDisplayModePreference stores 'configured' and cleans old key", () => {
  const storage = makeMockStorage();
  storage.setItem(SHOW_CONFIGURED_ONLY_STORAGE_KEY, "true");

  writeProviderDisplayModePreference("configured", storage);
  assert.equal(storage.getItem(PROVIDER_DISPLAY_MODE_STORAGE_KEY), "configured");
  assert.equal(storage.getItem(SHOW_CONFIGURED_ONLY_STORAGE_KEY), null);
});

test("writeProviderDisplayModePreference stores 'compact' and cleans old key", () => {
  const storage = makeMockStorage();
  writeProviderDisplayModePreference("compact", storage);
  assert.equal(storage.getItem(PROVIDER_DISPLAY_MODE_STORAGE_KEY), "compact");
  assert.equal(storage.getItem(SHOW_CONFIGURED_ONLY_STORAGE_KEY), null);
});

test("writeProviderDisplayModePreference with 'all' removes all keys", () => {
  const storage = makeMockStorage();
  storage.setItem(PROVIDER_DISPLAY_MODE_STORAGE_KEY, "configured");
  storage.setItem(SHOW_CONFIGURED_ONLY_STORAGE_KEY, "true");

  writeProviderDisplayModePreference("all", storage);
  assert.equal(storage.getItem(PROVIDER_DISPLAY_MODE_STORAGE_KEY), null);
  assert.equal(storage.getItem(SHOW_CONFIGURED_ONLY_STORAGE_KEY), null);
});

// ---------------------------------------------------------------------------
// shouldSyncProviderDisplayMode — race guard (#5510)
// The persistence effects must stay inert while the connections fetch is still
// loading; otherwise an empty connections list coerces a saved "configured"
// preference to "all" and the filter is lost across reloads.
// ---------------------------------------------------------------------------

test("shouldSyncProviderDisplayMode blocks the effects while loading (#5510 race guard)", () => {
  // The bug: without the loading check, the effect runs against connections.length === 0
  // mid-fetch and overwrites the saved preference. This is the failing-without-fix case.
  assert.equal(shouldSyncProviderDisplayMode(true, true), false);
});

test("shouldSyncProviderDisplayMode stays inert until the stored preference is read", () => {
  assert.equal(shouldSyncProviderDisplayMode(false, false), false);
  assert.equal(shouldSyncProviderDisplayMode(false, true), false);
});

test("shouldSyncProviderDisplayMode allows persistence once ready and settled", () => {
  assert.equal(shouldSyncProviderDisplayMode(true, false), true);
});
