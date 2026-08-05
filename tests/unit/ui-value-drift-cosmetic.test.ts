/**
 * Guard for the cosmetic-rewrite exemption in the UI value-drift gate (gap 9).
 *
 * `"Reset Defaults"` → `"Reset defaults"` marked the key stale in 41 locales during the
 * v3.8.49 cycle. Every one of those translations was still a correct translation of the same
 * sentence, and in locales with no letter case the "fix" is not even expressible. The
 * documented escape hatch — a `__MISSING__:` placeholder — is BANNED in `vi` by
 * tests/unit/i18n-vi-completeness.test.ts, so `vi` had no legitimate way out of a purely
 * cosmetic English edit.
 *
 * The exemption has to stay narrow, and that is the real risk here: too generous and a genuine
 * copy change ships with 41 stale translations and nobody is told. So most of these tests exist
 * to pin what is NOT cosmetic.
 */
import test from "node:test";
import assert from "node:assert/strict";

// @ts-expect-error — plain .mjs gate script, no type declarations by design
import { findStaleTranslations, isCosmeticRewrite } from "../../scripts/i18n/check-ui-value-drift.mjs";

test("case-only changes are cosmetic — the reported case", () => {
  assert.equal(isCosmeticRewrite("Reset Defaults", "Reset defaults"), true);
  assert.equal(isCosmeticRewrite("SAVE", "Save"), true);
  assert.equal(isCosmeticRewrite("api key", "API Key"), true);
});

test("trailing terminal punctuation is cosmetic", () => {
  assert.equal(isCosmeticRewrite("Reset defaults", "Reset defaults."), true);
  assert.equal(isCosmeticRewrite("Are you sure", "Are you sure?"), true);
  assert.equal(isCosmeticRewrite("Done!", "Done"), true);
});

test("WHITESPACE is deliberately NOT cosmetic — it is someone else's call", () => {
  // tests/unit/i18n-ui-value-drift.test.ts pins "a value that only changes whitespace still
  // counts as an edit", with a stated reason: trailing-space churn is rare, and treating it as a
  // no-op would let a real reword hide behind an innocuous-looking diff. The problem reported
  // here was CASE. Narrowing to the reported scope rather than reversing a documented decision
  // for free — asserted so a later "tidy-up" cannot fold whitespace back in by accident.
  assert.equal(isCosmeticRewrite("hello", "hello "), false);
  assert.equal(isCosmeticRewrite("Reset  defaults", "Reset defaults"), false);
  assert.equal(isCosmeticRewrite(" Save ", "Save"), false);
});

test("a changed WORD is never cosmetic", () => {
  assert.equal(isCosmeticRewrite("Reset defaults", "Restore defaults"), false);
  assert.equal(isCosmeticRewrite("Delete", "Delete all"), false);
  assert.equal(isCosmeticRewrite("Save", "Cancel"), false);
});

test("added or removed words are never cosmetic, even with matching case", () => {
  assert.equal(isCosmeticRewrite("Delete this connection", "Delete connection"), false);
  assert.equal(isCosmeticRewrite("Enabled", "Enabled by default"), false);
});

test("a change inside an interpolation is never cosmetic", () => {
  // Placeholders are contract, not prose — renaming one breaks every translation.
  assert.equal(isCosmeticRewrite("{count} items", "{total} items"), false);
  assert.equal(isCosmeticRewrite("{count} items", "{count} entries"), false);
});

test("mid-string punctuation is not folded — only trailing", () => {
  assert.equal(isCosmeticRewrite("Save, then close", "Save then close"), false);
});

test("non-strings are never cosmetic", () => {
  assert.equal(isCosmeticRewrite(undefined, "Save"), false);
  assert.equal(isCosmeticRewrite("Save", null), false);
  assert.equal(isCosmeticRewrite(42, 42), false);
});

test("end to end: a cosmetic English edit leaves every locale alone", () => {
  const stale = findStaleTranslations({
    baseEn: { ui: { reset: "Reset Defaults" } },
    headEn: { ui: { reset: "Reset defaults" } },
    baseLocales: { vi: { ui: { reset: "Đặt lại mặc định" } }, de: { ui: { reset: "Standardwerte" } } },
    headLocales: { vi: { ui: { reset: "Đặt lại mặc định" } }, de: { ui: { reset: "Standardwerte" } } },
  });
  assert.deepEqual(stale, [], "41 correct translations must not be invalidated by a capital letter");
});

test("end to end: a REAL English rewrite still flags every untranslated locale", () => {
  // The gate's whole purpose — this must keep working, or the exemption traded one bug for a
  // worse one.
  const stale = findStaleTranslations({
    baseEn: { ui: { reset: "Reset defaults" } },
    headEn: { ui: { reset: "Restore factory settings" } },
    baseLocales: { vi: { ui: { reset: "Đặt lại mặc định" } }, de: { ui: { reset: "Standardwerte" } } },
    headLocales: { vi: { ui: { reset: "Đặt lại mặc định" } }, de: { ui: { reset: "Standardwerte" } } },
  });
  assert.equal(stale.length, 2, "both locales still carry the old translation");
  assert.deepEqual(
    stale.map((s: { locale: string }) => s.locale).sort(),
    ["de", "vi"]
  );
});
