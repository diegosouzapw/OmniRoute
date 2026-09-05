import test from "node:test";
import assert from "node:assert/strict";

import i18nConfig from "../../../config/i18n.json" with { type: "json" };
import {
  DEFAULT_LOCALE,
  LANGUAGES,
  LOCALES,
  LOCALE_ALIASES,
  LOCALE_COOKIE,
  RTL_LOCALES,
} from "../../../src/i18n/config.ts";

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

test("locale aliases are lower-case, unique and never collide with a locale code", () => {
  const codes = new Set(LOCALES.map((code) => code.toLowerCase()));
  const seen = new Set<string>();
  for (const [code, aliases] of Object.entries(LOCALE_ALIASES)) {
    assert.ok(codes.has(code.toLowerCase()), `${code} is not a configured locale`);
    for (const alias of aliases) {
      assert.equal(alias, alias.toLowerCase(), `${alias} must be lower-case`);
      assert.ok(!codes.has(alias), `${alias} collides with a locale code`);
      assert.ok(!seen.has(alias), `${alias} is declared for two locales`);
      seen.add(alias);
    }
  }
});

test("Ukrainian, Filipino, legacy Indonesian, Hong-Kong/Macau and zh-Hant browsers resolve through declared aliases", () => {
  assert.deepEqual(LOCALE_ALIASES["uk-UA"], ["uk"]);
  assert.deepEqual(LOCALE_ALIASES["phi"], ["fil", "tl"]);
  // `in` was a duplicate Indonesian locale, retired in favour of `id`. The alias is the
  // only thing keeping a saved NEXT_LOCALE=in / OMNIROUTE_LANG=in working — do not drop it.
  assert.deepEqual(LOCALE_ALIASES["id"], ["in"]);
  // `zh-hant` lets script-tagged Traditional Chinese (`zh-Hant-TW`, `zh-Hant-HK`)
  // reach zh-TW instead of the first zh-* locale in config order (zh-CN).
  assert.deepEqual(LOCALE_ALIASES["zh-TW"], ["zh-hk", "zh-mo", "zh-hant"]);
});
