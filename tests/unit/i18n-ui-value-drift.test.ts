import { test } from "node:test";
import assert from "node:assert/strict";
// @ts-expect-error — plain .mjs gate script, no type declarations by design.
import { findStaleTranslations, flattenLeaves } from "../../scripts/i18n/check-ui-value-drift.mjs";

// Why this gate exists (the #8463 defect):
//
// `googleOAuthWarning`'s English value was rewritten when the Antigravity login helper
// shipped (#5203). Nothing noticed that 39 of 43 locales still carried a translation of
// the PREVIOUS English — which told operators to "copy the full URL and paste it below",
// a flow that cannot complete for that provider. Users saw confident, wrong instructions
// in their own language for months.
//
// Neither existing gate can see this:
//   - `sync-ui-keys.mjs` only fills keys that are ABSENT, never ones that are STALE;
//   - `check-ui-keys-coverage.mjs` counts key presence, so a stale translation scores
//     as 100% covered;
//   - `check-translation-drift.mjs` tracks `docs/i18n/<locale>/**.md` (documentation
//     mirrors), not the UI message catalogs at all.
//
// So: when a PR edits an English VALUE, every locale still holding a translation derived
// from the old English is stale and must either be refreshed or flagged
// `__MISSING__:` (which makes the runtime fall back to the correct English, #7258).

test("flattenLeaves walks nested catalogs into dotted paths", () => {
  assert.deepEqual(flattenLeaves({ a: { b: "x" }, c: "y" }), {
    "a.b": "x",
    c: "y",
  });
});

test("an edited EN value with an untouched translation is STALE", () => {
  const stale = findStaleTranslations({
    baseEn: { m: { k: "old english" } },
    headEn: { m: { k: "new english" } },
    baseLocales: { "pt-BR": { m: { k: "português antigo" } } },
    headLocales: { "pt-BR": { m: { k: "português antigo" } } },
  });

  assert.deepEqual(stale, [{ key: "m.k", locale: "pt-BR" }]);
});

test("a translation refreshed in the same diff is NOT stale", () => {
  const stale = findStaleTranslations({
    baseEn: { m: { k: "old english" } },
    headEn: { m: { k: "new english" } },
    baseLocales: { "pt-BR": { m: { k: "português antigo" } } },
    headLocales: { "pt-BR": { m: { k: "português novo" } } },
  });

  assert.deepEqual(stale, []);
});

test("a translation demoted to __MISSING__: is NOT stale (runtime falls back to EN)", () => {
  const stale = findStaleTranslations({
    baseEn: { m: { k: "old english" } },
    headEn: { m: { k: "new english" } },
    baseLocales: { "pt-BR": { m: { k: "português antigo" } } },
    headLocales: { "pt-BR": { m: { k: "__MISSING__:new english" } } },
  });

  assert.deepEqual(stale, []);
});

test("a locale that never had the key is NOT stale — that is coverage's business", () => {
  const stale = findStaleTranslations({
    baseEn: { m: { k: "old english" } },
    headEn: { m: { k: "new english" } },
    baseLocales: { de: {} },
    headLocales: { de: {} },
  });

  assert.deepEqual(stale, []);
});

test("a BRAND-NEW EN key cannot be stale anywhere", () => {
  const stale = findStaleTranslations({
    baseEn: {},
    headEn: { m: { k: "brand new" } },
    baseLocales: { "pt-BR": {} },
    headLocales: { "pt-BR": { m: { k: "tradução nova" } } },
  });

  assert.deepEqual(stale, []);
});

test("an unchanged EN value never flags, however stale the translation actually is", () => {
  // This is the deliberate "freeze existing debt" semantics: a diff-aware gate cannot
  // know what a pre-existing translation was derived from, so it only judges what the
  // current change touches. Pre-existing drift stays invisible instead of failing every
  // unrelated PR.
  const stale = findStaleTranslations({
    baseEn: { m: { k: "same english" } },
    headEn: { m: { k: "same english" } },
    baseLocales: { "pt-BR": { m: { k: "tradução obsoleta de outra era" } } },
    headLocales: { "pt-BR": { m: { k: "tradução obsoleta de outra era" } } },
  });

  assert.deepEqual(stale, []);
});

test("a renamed key (delete + add) flags nothing — the fix pattern used by #8463", () => {
  const stale = findStaleTranslations({
    baseEn: { m: { oldName: "old english" } },
    headEn: { m: { newName: "new english" } },
    baseLocales: { "pt-BR": { m: { oldName: "português antigo" } } },
    headLocales: { "pt-BR": { m: { newName: "__MISSING__:new english" } } },
  });

  assert.deepEqual(stale, []);
});

test("every affected locale is reported, and en itself is never a target", () => {
  const stale = findStaleTranslations({
    baseEn: { m: { k: "old" } },
    headEn: { m: { k: "new" } },
    baseLocales: {
      en: { m: { k: "old" } },
      "pt-BR": { m: { k: "antigo" } },
      de: { m: { k: "alt" } },
      fr: { m: { k: "__MISSING__:old" } },
    },
    headLocales: {
      en: { m: { k: "new" } },
      "pt-BR": { m: { k: "antigo" } },
      de: { m: { k: "alt" } },
      fr: { m: { k: "__MISSING__:old" } },
    },
  });

  assert.deepEqual(
    stale.map((s) => s.locale).sort(),
    ["de", "pt-BR"],
    "en must be excluded and __MISSING__ locales skipped"
  );
});

test("a value that only changes whitespace still counts as an edit", () => {
  // Conservative on purpose: trailing-space churn is rare, and treating it as a no-op
  // would let a real reword slip through behind an innocuous-looking diff.
  const stale = findStaleTranslations({
    baseEn: { m: { k: "hello" } },
    headEn: { m: { k: "hello " } },
    baseLocales: { de: { m: { k: "hallo" } } },
    headLocales: { de: { m: { k: "hallo" } } },
  });

  assert.deepEqual(stale, [{ key: "m.k", locale: "de" }]);
});

test("non-string leaves (numbers, booleans, null) are compared without throwing", () => {
  const stale = findStaleTranslations({
    baseEn: { m: { n: 1, b: true, z: null } },
    headEn: { m: { n: 2, b: true, z: null } },
    baseLocales: { de: { m: { n: 1, b: true, z: null } } },
    headLocales: { de: { m: { n: 1, b: true, z: null } } },
  });

  assert.deepEqual(stale, [{ key: "m.n", locale: "de" }]);
});
