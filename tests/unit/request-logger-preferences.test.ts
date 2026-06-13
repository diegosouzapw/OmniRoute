import test from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_REFRESH_INTERVAL_SEC,
  MAX_REFRESH_INTERVAL_SEC,
  MIN_REFRESH_INTERVAL_SEC,
  REFRESH_INTERVAL_STORAGE_KEY,
  clampRefreshIntervalSec,
  readSavedRefreshIntervalSec,
  writeSavedRefreshIntervalSec,
} from "../../src/shared/components/requestLoggerPreferences.ts";

function createStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
    values,
  };
}

test("clampRefreshIntervalSec keeps refresh intervals within supported bounds", () => {
  assert.equal(clampRefreshIntervalSec(Number.NaN), DEFAULT_REFRESH_INTERVAL_SEC);
  assert.equal(clampRefreshIntervalSec(0), MIN_REFRESH_INTERVAL_SEC);
  assert.equal(clampRefreshIntervalSec(17.4), 17);
  assert.equal(clampRefreshIntervalSec(999), MAX_REFRESH_INTERVAL_SEC);
});

test("readSavedRefreshIntervalSec reads and clamps persisted values", () => {
  const storage = createStorage({ [REFRESH_INTERVAL_STORAGE_KEY]: "17" });
  assert.equal(readSavedRefreshIntervalSec(storage), 17);

  storage.values.set(REFRESH_INTERVAL_STORAGE_KEY, "999");
  assert.equal(readSavedRefreshIntervalSec(storage), MAX_REFRESH_INTERVAL_SEC);

  storage.values.set(REFRESH_INTERVAL_STORAGE_KEY, "not-a-number");
  assert.equal(readSavedRefreshIntervalSec(storage), DEFAULT_REFRESH_INTERVAL_SEC);
});

test("writeSavedRefreshIntervalSec persists clamped values outside React state updaters", () => {
  const storage = createStorage();

  assert.equal(writeSavedRefreshIntervalSec(0, storage), true);
  assert.equal(storage.values.get(REFRESH_INTERVAL_STORAGE_KEY), String(MIN_REFRESH_INTERVAL_SEC));

  assert.equal(writeSavedRefreshIntervalSec(17, storage), true);
  assert.equal(storage.values.get(REFRESH_INTERVAL_STORAGE_KEY), "17");
});

test("refresh interval persistence degrades gracefully when storage is unavailable", () => {
  const throwingStorage = {
    getItem: () => {
      throw new Error("storage blocked");
    },
    setItem: () => {
      throw new Error("storage blocked");
    },
  };

  assert.equal(readSavedRefreshIntervalSec(null), DEFAULT_REFRESH_INTERVAL_SEC);
  assert.equal(readSavedRefreshIntervalSec(throwingStorage), DEFAULT_REFRESH_INTERVAL_SEC);
  assert.equal(writeSavedRefreshIntervalSec(17, null), false);
  assert.equal(writeSavedRefreshIntervalSec(17, throwingStorage), false);
});
