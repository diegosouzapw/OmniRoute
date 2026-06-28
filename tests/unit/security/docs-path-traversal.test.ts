import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// We can't easily unit test tryI18nFallback because it's internal to the page component
// and depends on process.cwd() and fs. But we can test the regex logic.

const LOCALE_REGEX = /^[a-z0-9-]+$/i;
const SLUG_REGEX = /^[a-z0-9-]+$/i;

test("Locale and slug regex blocks common traversal patterns", () => {
  const badLocales = ["..", "../..", "/etc", "es/../../etc", "es\0"];
  const badSlugs = [[".."], ["..", "foo"], ["/etc", "passwd"], ["foo", "..", "bar"]];

  for (const locale of badLocales) {
    assert.strictEqual(LOCALE_REGEX.test(locale), false, `Should block bad locale: ${locale}`);
  }

  for (const slug of badSlugs) {
    const allOk = slug.every(s => SLUG_REGEX.test(s));
    assert.strictEqual(allOk, false, `Should block bad slug: ${slug.join("/")}`);
  }
});

test("Locale and slug regex allows valid patterns", () => {
  const goodLocales = ["en", "pt-BR", "zh-CN", "es"];
  const goodSlugs = [["getting-started"], ["architecture", "overview"], ["v1-migration"]];

  for (const locale of goodLocales) {
    assert.strictEqual(LOCALE_REGEX.test(locale), true, `Should allow good locale: ${locale}`);
  }

  for (const slug of goodSlugs) {
    const allOk = slug.every(s => SLUG_REGEX.test(s));
    assert.strictEqual(allOk, true, `Should allow good slug: ${slug.join("/")}`);
  }
});
