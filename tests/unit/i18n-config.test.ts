import test from "node:test";
import assert from "node:assert/strict";

import i18nConfig from "../../config/i18n.json" with { type: "json" };
import {
  DEFAULT_LOCALE,
  LANGUAGES,
  LOCALES,
  LOCALE_COOKIE,
  RTL_LOCALES,
} from "../../src/i18n/config.ts";

test("i18n config adapter reflects the JSON source of truth", () => {
  assert.deepEqual(
    LOCALES,
    i18nConfig.locales.map((locale) => locale.code)
  );
  assert.equal(DEFAULT_LOCALE, i18nConfig.default);
  assert.deepEqual(RTL_LOCALES, i18nConfig.rtl);
  assert.equal(LOCALE_COOKIE, "NEXT_LOCALE");
});

test("i18n language metadata preserves native and English names", () => {
  assert.equal(LANGUAGES.length, i18nConfig.locales.length);

  const english = LANGUAGES.find((language) => language.code === "en");
  const englishConfig = i18nConfig.locales.find((language) => language.code === "en");
  assert.deepEqual(english, {
    code: "en",
    label: englishConfig?.label,
    name: englishConfig?.name,
    native: englishConfig?.native,
    english: englishConfig?.english,
    flag: englishConfig?.flag,
  });
});
