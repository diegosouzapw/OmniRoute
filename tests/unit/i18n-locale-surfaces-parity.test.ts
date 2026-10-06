import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import i18nConfig from "../../config/i18n.json" with { type: "json" };

/**
 * Parity guard: every locale declared in config/i18n.json (the single source of
 * truth) must exist on every in-repo surface — dashboard catalog, CLI catalog,
 * docs mirror (README.md / llm.txt / CHANGELOG.md), README flag link and the
 * docs/i18n/README.md index row — and the README headline count must match.
 * Locales listed in `docsExcluded` (the English source) only need the two
 * catalogs. The reverse direction is guarded as well: every docs-surface entry
 * (index row, README flag link, docs/i18n/ directory) must map back to a
 * configured docs locale, so a retired locale cannot leave orphans behind.
 */

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const docsExcluded = new Set(i18nConfig.docsExcluded ?? ["en"]);
const readme = readFileSync(path.join(ROOT, "README.md"), "utf8");
const docsIndex = readFileSync(path.join(ROOT, "docs", "i18n", "README.md"), "utf8");

for (const { code } of i18nConfig.locales) {
  test(`locale ${code} exists on every in-repo surface`, () => {
    assert.ok(
      existsSync(path.join(ROOT, "src", "i18n", "messages", `${code}.json`)),
      "dashboard catalog"
    );
    assert.ok(existsSync(path.join(ROOT, "bin", "cli", "locales", `${code}.json`)), "CLI catalog");
    if (docsExcluded.has(code)) return;
    assert.ok(existsSync(path.join(ROOT, "docs", "i18n", code, "README.md")), "docs mirror README");
    assert.ok(existsSync(path.join(ROOT, "docs", "i18n", code, "llm.txt")), "llm.txt mirror");
    assert.ok(
      existsSync(path.join(ROOT, "docs", "i18n", code, "CHANGELOG.md")),
      "CHANGELOG mirror"
    );
    assert.ok(readme.includes(`docs/i18n/${code}/README.md`), "README flag link");
    assert.ok(docsIndex.includes(`(\`${code}\`)`), "docs/i18n/README.md index row");
  });
}

test("README headline count matches config/i18n.json", () => {
  const m = readme.match(/In (\d+) languages/);
  assert.ok(m, "README must carry the 'In N languages' headline");
  assert.equal(Number(m[1]), i18nConfig.locales.length);
});

test("docs/i18n/README.md counts sentence matches config/i18n.json", () => {
  const sentence = `into ${i18nConfig.locales.length - 1} languages; together with the English source, the UI supports ${i18nConfig.locales.length} locales`;
  assert.ok(docsIndex.includes(sentence), `docs/i18n/README.md must contain "${sentence}"`);
});

test("no orphan locale surface outside config/i18n.json (reverse parity)", () => {
  const docsLocales = new Set(
    i18nConfig.locales.map(({ code }) => code).filter((code) => !docsExcluded.has(code))
  );
  const offenders: string[] = [];

  // docs/i18n/README.md rows: "- … (`code`): [Docs Root](./code/README.md)"
  for (const line of docsIndex.split("\n")) {
    const row = line.match(/^- .*\(`([^`]+)`\): \[Docs Root\]\(\.\/([^/]+)\/README\.md\)/);
    if (!row) continue;
    const [, code, linkCode] = row;
    if (!docsLocales.has(code)) offenders.push(`docs/i18n/README.md row: ${code}`);
    if (linkCode !== code) {
      offenders.push(`docs/i18n/README.md row ${code} links to ./${linkCode}/README.md`);
    }
  }

  // Root README.md language block: docs/i18n/<code>/README.md flag links.
  for (const [, code] of readme.matchAll(/docs\/i18n\/([^/\s"')]+)\/README\.md/g)) {
    if (!docsLocales.has(code)) offenders.push(`README.md link: ${code}`);
  }

  // Every directory under docs/i18n/ must be a configured docs locale.
  for (const entry of readdirSync(path.join(ROOT, "docs", "i18n"), { withFileTypes: true })) {
    if (entry.isDirectory() && !docsLocales.has(entry.name)) {
      offenders.push(`docs/i18n/ directory: ${entry.name}`);
    }
  }

  assert.deepEqual(
    offenders,
    [],
    `orphan locale surfaces that are not a configured docs locale (config/i18n.json minus docsExcluded) — retired locale left behind?: ${offenders.join("; ")}`
  );
});
