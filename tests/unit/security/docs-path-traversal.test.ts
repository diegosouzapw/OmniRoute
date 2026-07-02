import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { resolveSafeI18nSectionDir } from "../../../src/lib/docsI18nPath.ts";

const DOCS_ROOT = path.resolve("/srv/app", "docs");
const I18N_ROOT = path.join(DOCS_ROOT, "i18n");

test("resolveSafeI18nSectionDir rejects traversal in the locale (cookie-controlled)", () => {
  const badLocales = ["..", "../..", "/etc", "es/../../etc", "es\0", "..%2f", "en.", "es/x"];
  for (const locale of badLocales) {
    assert.strictEqual(
      resolveSafeI18nSectionDir(DOCS_ROOT, locale, ["overview"]),
      null,
      `Should reject bad locale: ${JSON.stringify(locale)}`
    );
  }
});

test("resolveSafeI18nSectionDir rejects traversal in slug segments", () => {
  const badSlugs = [[".."], ["..", "foo"], ["/etc", "passwd"], ["foo", "..", "bar"], ["a/b"]];
  for (const slug of badSlugs) {
    assert.strictEqual(
      resolveSafeI18nSectionDir(DOCS_ROOT, "pt-BR", slug),
      null,
      `Should reject bad slug: ${slug.join("/")}`
    );
  }
});

test("resolveSafeI18nSectionDir confines the resolved dir to docs/i18n", () => {
  // Valid input → a dir strictly under i18nRoot.
  const ok = resolveSafeI18nSectionDir(DOCS_ROOT, "pt-BR", ["architecture", "overview"]);
  assert.ok(ok, "valid locale+slug should resolve");
  assert.ok(
    ok === I18N_ROOT || ok.startsWith(I18N_ROOT + path.sep),
    `resolved dir must stay under i18nRoot, got ${ok}`
  );
  assert.strictEqual(ok, path.join(I18N_ROOT, "pt-BR", "docs", "architecture"));
});

test("resolveSafeI18nSectionDir allows valid locale/slug patterns", () => {
  const goodLocales = ["en", "pt-BR", "zh-CN", "es"];
  for (const locale of goodLocales) {
    assert.ok(
      resolveSafeI18nSectionDir(DOCS_ROOT, locale, ["getting-started"]),
      `Should allow good locale: ${locale}`
    );
  }
  assert.ok(resolveSafeI18nSectionDir(DOCS_ROOT, "es", ["v1-migration"]));
  assert.strictEqual(resolveSafeI18nSectionDir(DOCS_ROOT, "es", []), null, "empty slug → null");
});
