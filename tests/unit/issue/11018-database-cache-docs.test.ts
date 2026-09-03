import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DEFAULT_DATABASE_SETTINGS } from "../../../src/types/databaseSettings.ts";

const guide = readFileSync(new URL("../../../docs/ops/DATABASE_GUIDE.md", import.meta.url), "utf8");

test("database guide keeps cache tuning aligned with runtime settings (#11018)", () => {
  const defaultCacheSize = DEFAULT_DATABASE_SETTINGS.optimization.cacheSize;

  assert.match(guide, new RegExp(`${defaultCacheSize.toLocaleString("en-US")} KiB`));
  assert.match(guide, /1 to\s+1,000,000 KiB/);
  assert.match(guide, /saving the setting applies it to the live database connection/);
  assert.match(guide, /restores the persisted value at startup/);
});
