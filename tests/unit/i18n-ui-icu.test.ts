import { test } from "node:test";
import assert from "node:assert/strict";
// @ts-expect-error — plain .mjs gate script, no type declarations by design.
import { findInvalidMessages, flattenLeaves } from "../../scripts/i18n/check-ui-icu.mjs";

// Why this gate exists (the #12302/#12505 defect class):
//
// A message value containing raw `<tag>` or `{...}` literals — e.g.
// `<your OmniRoute API key>` or `~/.claude/profiles/<name>/settings.json` —
// fails to compile under `IntlMessageFormat`, the exact parser next-intl
// uses. In the app the affected component silently breaks: the RSC/Flight
// path throws INVALID_MESSAGE and the UI falls back to showing the raw key
// name instead of the translated copy.
//
// Before this gate, that class shipped 6 times: #12302 (ccOnboardingKeyPlaceholder),
// #12505 (OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES.description), plus 4 more
// (featureFlagExposeFunctionalGatewayMirrorsDescription, three paste-hint
// JSON/regex examples, two `{" "}` artifacts) — 381 literal values across
// the 42 locale catalogs, all fixed by scripts/ad-hoc/fix-invalid-icu.mjs with a
// render-identical assertion.
//
// This suite guards the pure core of the gate: a strict full-catalog compile
// of every message in every locale, so any future raw <tag> in a plain t()
// message fails CI instead of silently breaking pages.

test("flattenLeaves walks nested catalogs into dotted paths", () => {
  assert.deepEqual(flattenLeaves({ a: { b: "x" }, c: "y" }), {
    "a.b": "x",
    c: "y",
  });
});

test("a raw <tag> with spaces fails compilation (INVALID_TAG class, #12302)", () => {
  const bad = findInvalidMessages({ "en.json": { bad: "<your OmniRoute API key>" } });
  assert.equal(bad.length, 1);
  assert.equal(bad[0].key, "bad");
  assert.equal(bad[0].code, "SyntaxError");
  assert.ok(String(bad[0].message).includes("INVALID_TAG"));
});

test("an unclosed <name> path fails compilation (UNCLOSED_TAG class, #12505)", () => {
  const bad = findInvalidMessages({
    "en.json": { bad: "~/.claude/profiles/<name>/settings.json" },
  });
  assert.equal(bad.length, 1);
  assert.ok(String(bad[0].message).includes("UNCLOSED_TAG"));
});

test("a literal JSON/array example fails compilation (MALFORMED_ARGUMENT class)", () => {
  const bad = findInvalidMessages({
    "en.json": { bad: "Paste an array of objects: [{ json, name?, email? }...]" },
  });
  assert.equal(bad.length, 1);
  assert.equal(bad[0].code, "SyntaxError");
});

test("ICU single-quote escaping makes the same text compile (the sanctioned fix)", () => {
  const bad = findInvalidMessages({
    "en.json": {
      ok1: "'<your OmniRoute API key>'",
      ok2: "~/.claude/profiles/'<name>'/settings.json",
      ok3: "Paste an array of objects: ['{ json, name?, email? }'...]",
      ok4: "'{ json, name?, email? }'",
    },
  });
  assert.deepEqual(bad, []);
});

test("legitimate rich-text messages (t.rich) compile fine — no false positives", () => {
  const bad = findInvalidMessages({
    "en.json": {
      bold: "This is <b>bold</b> text",
      nested:
        "<strong>Important:</strong> sign in on <code>trae.ai</code> in <em>this</em> browser",
      withArg: "Hello <bold>{name}</bold>",
    },
  });
  assert.deepEqual(bad, []);
});

test("normal ICU arguments and plurals compile fine", () => {
  const bad = findInvalidMessages({
    "en.json": {
      simple: "Hello {name}",
      plural: "{count, plural, one {# item} other {# items}}",
      select: "{gender, select, male {He} female {She} other {They}}",
      formatted: "You have {count, number} messages",
    },
  });
  assert.deepEqual(bad, []);
});

test("non-string leaves are skipped, not compiled", () => {
  const bad = findInvalidMessages({
    "en.json": { n: 1, b: true, z: null, arr: ["<not-a-message>"] },
  });
  assert.deepEqual(bad, []);
});

test("every locale file is reported with its own dotted key path", () => {
  const bad = findInvalidMessages({
    "en.json": { a: { b: "<x>" } },
    "fr.json": { a: { b: "~/.claude/profiles/<name>/x" } },
  });
  assert.equal(bad.length, 2);
  assert.deepEqual(bad.map((b) => `${b.file}:${b.key}`).sort(), ["en.json:a.b", "fr.json:a.b"]);
  // Sorted by file, then key.
  assert.deepEqual(
    bad.map((b) => b.file),
    ["en.json", "fr.json"]
  );
});

test("an empty catalog has no failures", () => {
  assert.deepEqual(findInvalidMessages({ "en.json": {} }), []);
});
