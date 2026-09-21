import test from "node:test";
import assert from "node:assert/strict";
import {
  flattenLeaves,
  measureLocale,
  compareToBaseline,
} from "../../scripts/i18n/check-translation-ratio.mjs";

test("measureLocale counts identical, placeholder and missing leaves and skips the allowlist", () => {
  const en = flattenLeaves({ a: { b: "Save", c: "Cancel", d: "OmniRoute", e: "Delete" } });
  const loc = flattenLeaves({ a: { b: "Save", c: "__MISSING__:Cancel", d: "OmniRoute" } });
  assert.deepEqual(measureLocale(en, loc, new Set(["a.d"])), {
    total: 3,
    identical: 1,
    placeholder: 1,
    missing: 1,
    untranslated: 3,
    ratio: 100,
  });
});

test("measureLocale reports 0 for a fully translated catalog", () => {
  const en = flattenLeaves({ x: "Save", y: "Cancel" });
  const loc = flattenLeaves({ x: "Salvar", y: "Cancelar" });
  assert.equal(measureLocale(en, loc, new Set()).ratio, 0);
});

test("compareToBaseline flags only locales above baseline + slack", () => {
  const regressions = compareToBaseline(
    { es: 56.4, ar: 3.7, de: 26.0 },
    { es: 55.8, ar: 3.7, de: 26.1 },
    0.5
  );
  assert.deepEqual(regressions, [{ locale: "es", measured: 56.4, baseline: 55.8 }]);
});

test("compareToBaseline treats a locale absent from the baseline as a regression against 0", () => {
  assert.deepEqual(compareToBaseline({ el: 12 }, {}, 0.5), [
    { locale: "el", measured: 12, baseline: 0 },
  ]);
});
