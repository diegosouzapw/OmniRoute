/**
 * Regression guard for #12561 — backfill missing usage.kiloPass* translations
 * across all canonical locales plus pt-only flag description.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { LOCALES } from "../../src/i18n/config";

const MESSAGES_DIR = fileURLToPath(
  new URL("../../src/i18n/messages", import.meta.url)
);

/**
 * The sentinel marker stamped by `sync-ui-keys.mjs` when a translation key
 * is generated without a localized value.
 */
const UNTRANSLATED_SENTINEL = "__MISSING__:";

const KILO_KEYS = [
  "kiloAccountBalance",
  "kiloPassBonus",
  "kiloPassMeterLabel",
  "kiloPassPaid",
  "kiloPassRemaining",
  "kiloPassRenews",
  "kiloPassUsageLabel",
] as const;

function readCatalog(filePath: string, file: string): Record<string, unknown> {
  const content = fs.readFileSync(filePath, "utf8");
  try {
    return JSON.parse(content) as Record<string, unknown>;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    assert.fail(`Failed to parse JSON in catalog ${file} (${filePath}): ${msg}`);
  }
}

test("#12561 all canonical locales define the 7 usage.kilo* keys without untranslated placeholders", async (t) => {
  assert.ok(LOCALES.length > 0, "LOCALES list must not be empty");

  for (const locale of LOCALES) {
    await t.test(`locale: ${locale}`, () => {
      const file = `${locale}.json`;
      const filePath = path.join(MESSAGES_DIR, file);
      assert.ok(fs.existsSync(filePath), `Catalog file missing for canonical locale: ${file}`);

      const data = readCatalog(filePath, file);
      const usage = data.usage;

      assert.ok(
        usage && typeof usage === "object" && !Array.isArray(usage),
        `Catalog ${file} is missing valid object 'usage' namespace`
      );
      const usageObj = usage as Record<string, unknown>;

      for (const key of KILO_KEYS) {
        assert.ok(
          key in usageObj,
          `Catalog ${file} missing key usage.${key}`
        );
        const rawVal = usageObj[key];
        assert.equal(
          typeof rawVal,
          "string",
          `Catalog ${file} usage.${key} must be a string, got ${typeof rawVal}`
        );
        const val = rawVal as string;
        assert.ok(
          val.trim().length > 0,
          `Catalog ${file} has empty usage.${key}`
        );
        assert.ok(
          !val.trim().startsWith(UNTRANSLATED_SENTINEL),
          `Catalog ${file} has untranslated sentinel for usage.${key}: ${val}`
        );
      }

      const renewsVal = usageObj.kiloPassRenews as string;
      // KiloPassMeter.tsx:219 interpolates { count: renewDays } into kiloPassRenews
      assert.ok(
        renewsVal.includes("{count}"),
        `Catalog ${file} usage.kiloPassRenews must contain '{count}' placeholder required by KiloPassMeter.tsx: ${renewsVal}`
      );
    });
  }
});

test("#12561 pt.json defines featureFlagOmnirouteDisableThinkingLevelVariantsDescription", () => {
  const ptPath = path.join(MESSAGES_DIR, "pt.json");
  assert.ok(fs.existsSync(ptPath), `Catalog file missing: ${ptPath}`);

  const pt = readCatalog(ptPath, "pt.json");
  assert.ok(
    pt && typeof pt === "object" && !Array.isArray(pt),
    "pt.json must be a valid object"
  );
  const ptObj = pt as Record<string, unknown>;

  const key = "featureFlagOmnirouteDisableThinkingLevelVariantsDescription";
  assert.ok(key in ptObj, `pt.json missing ${key}`);
  const rawVal = ptObj[key];
  assert.equal(
    typeof rawVal,
    "string",
    `pt.json ${key} must be a string, got ${typeof rawVal}`
  );
  const val = rawVal as string;
  assert.ok(val.trim().length > 0, `pt.json has empty ${key}`);
  assert.ok(
    !val.trim().startsWith(UNTRANSLATED_SENTINEL),
    `pt.json has untranslated sentinel for ${key}: ${val}`
  );
});
