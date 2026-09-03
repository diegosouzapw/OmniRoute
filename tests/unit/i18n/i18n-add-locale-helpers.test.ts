/**
 * Helpers behind `scripts/i18n/add-locale.mjs`:
 *   - `computeDocsCoreSet` (scripts/i18n/lib/docs-core-set.mjs) — the docs a new
 *     locale must carry to be at parity with every existing locale mirror.
 *   - `addSupportedLang` / `addDropdownOption` (scripts/i18n/lib/site-scaffold.mjs)
 *     — the two text edits made to the marketing site (a separate repo, so the
 *     fixtures below are verbatim copies of its `js/i18n.js` and `index.html`).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { computeDocsCoreSet, docsLocaleDirs } from "../../../scripts/i18n/lib/docs-core-set.mjs";
import { addDropdownOption, addSupportedLang } from "../../../scripts/i18n/lib/site-scaffold.mjs";

type I18nConfig = {
  default: string;
  rtl: string[];
  docsExcluded?: string[];
  locales: Array<{ code: string; flag?: string; native?: string }>;
};

// ---------------------------------------------------------------------------
// computeDocsCoreSet
// ---------------------------------------------------------------------------

function withTempRoot(fn: (root: string) => void): void {
  const root = mkdtempSync(path.join(tmpdir(), "i18n-core-set-"));
  try {
    fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function touch(root: string, rel: string, body = "# x\n"): void {
  const abs = path.join(root, rel);
  mkdirSync(path.dirname(abs), { recursive: true });
  writeFileSync(abs, body);
}

const CONFIG: I18nConfig = {
  default: "en",
  rtl: [],
  docsExcluded: ["en"],
  locales: [{ code: "aa" }, { code: "bb" }, { code: "cc" }, { code: "en" }],
};

test("computeDocsCoreSet intersects the locale mirrors and drops excluded / sourceless paths", () => {
  withTempRoot((root) => {
    // English sources.
    for (const rel of [
      "README.md",
      "docs/guides/USER_GUIDE.md",
      "docs/ONLY_IN_AA.md",
      "llm.txt",
      "CHANGELOG.md",
      "docs/guides/I18N.md",
    ]) {
      touch(root, rel);
    }
    // Two complete-ish locales: everything shared except ONLY_IN_AA.md; both carry
    // the strict-mirror files, the operator-only guide and a mirror whose English
    // source no longer exists (GHOST.md).
    for (const locale of ["aa", "bb"]) {
      for (const rel of [
        "README.md",
        "docs/guides/USER_GUIDE.md",
        "llm.txt",
        "CHANGELOG.md",
        "docs/guides/I18N.md",
        "docs/GHOST.md",
      ]) {
        touch(root, `docs/i18n/${locale}/${rel}`);
      }
    }
    touch(root, "docs/i18n/aa/docs/ONLY_IN_AA.md");
    // The docsExcluded locale has a (tiny) directory — it must not shrink the set.
    touch(root, "docs/i18n/en/README.md");
    // The index file next to the locale directories is not a locale.
    touch(root, "docs/i18n/README.md");
    // `cc` is configured but has no mirror directory yet (the locale being added).

    assert.deepEqual(docsLocaleDirs({ root, config: CONFIG }), ["aa", "bb"]);
    assert.deepEqual(computeDocsCoreSet({ root, config: CONFIG }), [
      "README.md",
      "docs/guides/USER_GUIDE.md",
    ]);
  });
});

test("computeDocsCoreSet returns a sorted list and an empty one when no mirror exists", () => {
  withTempRoot((root) => {
    assert.deepEqual(computeDocsCoreSet({ root, config: CONFIG }), []);
    for (const rel of ["docs/z.md", "docs/a.md", "AGENTS.md"]) {
      touch(root, rel);
      touch(root, `docs/i18n/aa/${rel}`);
    }
    assert.deepEqual(computeDocsCoreSet({ root, config: CONFIG }), [
      "AGENTS.md",
      "docs/a.md",
      "docs/z.md",
    ]);
  });
});

test("computeDocsCoreSet excludes `en` by default when docsExcluded is absent", () => {
  withTempRoot((root) => {
    touch(root, "README.md");
    touch(root, "docs/i18n/aa/README.md");
    touch(root, "docs/i18n/en/OTHER.md");
    touch(root, "OTHER.md");
    const config: I18nConfig = {
      default: "en",
      rtl: [],
      locales: [{ code: "aa" }, { code: "en" }],
    };
    assert.deepEqual(computeDocsCoreSet({ root, config }), ["README.md"]);
  });
});

// ---------------------------------------------------------------------------
// addSupportedLang — js/i18n.js (fixture: verbatim lines of the site file)
// ---------------------------------------------------------------------------

const I18N_JS = [
  'const LANG_BASE = document.documentElement.dataset.langBase || "";',
  "const SUPPORTED_LANGS = [",
  '  "ar", "az", "bg", "bn", "cs", "da", "de", "en", "es", "fa", "fi", "fr", "gu",',
  '  "he", "hi", "hu", "id", "in", "it", "ja", "ko", "mr", "ms", "nl", "no", "phi",',
  '  "pl", "pt", "pt-BR", "ro", "ru", "sk", "sv", "sw", "ta", "te", "th", "tr",',
  '  "uk-UA", "ur", "vi", "zh-CN",',
  "];",
  "// Right-to-left scripts — flip document direction when active.",
  'const RTL_LANGS = ["ar", "fa", "he", "ur"];',
  "",
].join("\n");

const I18N_JS_WITH_EL = [
  'const LANG_BASE = document.documentElement.dataset.langBase || "";',
  "const SUPPORTED_LANGS = [",
  '  "ar", "az", "bg", "bn", "cs", "da", "de", "el", "en", "es", "fa", "fi", "fr",',
  '  "gu", "he", "hi", "hu", "id", "in", "it", "ja", "ko", "mr", "ms", "nl", "no",',
  '  "phi", "pl", "pt", "pt-BR", "ro", "ru", "sk", "sv", "sw", "ta", "te", "th",',
  '  "tr", "uk-UA", "ur", "vi", "zh-CN",',
  "];",
  "// Right-to-left scripts — flip document direction when active.",
  'const RTL_LANGS = ["ar", "fa", "he", "ur"];',
  "",
].join("\n");

test("addSupportedLang inserts the code in order and re-flows the array at the file's width", () => {
  assert.equal(addSupportedLang(I18N_JS, "el"), I18N_JS_WITH_EL);
});

test("addSupportedLang is idempotent and leaves an already-listed code untouched", () => {
  assert.equal(addSupportedLang(I18N_JS, "de"), I18N_JS);
  assert.equal(addSupportedLang(I18N_JS, "zh-CN"), I18N_JS);
  assert.equal(addSupportedLang(addSupportedLang(I18N_JS, "el"), "el"), I18N_JS_WITH_EL);
});

test("addSupportedLang keeps region variants in localeCompare order and appends a last code", () => {
  const withPtPt = addSupportedLang(I18N_JS, "pt-PT");
  assert.match(withPtPt, /"pt", "pt-BR", "pt-PT", "ro"/);
  const withZhTw = addSupportedLang(I18N_JS, "zh-TW");
  assert.ok(withZhTw.includes('  "uk-UA", "ur", "vi", "zh-CN", "zh-TW",\n];'));
  // Only the array literal changes — the rest of the file is byte-identical.
  assert.equal(
    withZhTw.split("const SUPPORTED_LANGS")[0],
    I18N_JS.split("const SUPPORTED_LANGS")[0]
  );
  assert.equal(withZhTw.split("];")[1], I18N_JS.split("];")[1]);
});

test("addSupportedLang keeps a single-line array on one line and rejects a file without the array", () => {
  assert.equal(
    addSupportedLang('const SUPPORTED_LANGS = ["en", "pt-BR"];\n', "el"),
    'const SUPPORTED_LANGS = ["el", "en", "pt-BR"];\n'
  );
  assert.throws(() => addSupportedLang("const OTHER = [];\n", "el"), /SUPPORTED_LANGS/);
});

// ---------------------------------------------------------------------------
// addDropdownOption — index.html language menu (fixture: verbatim site lines)
// ---------------------------------------------------------------------------

const OPTION = (code: string, label: string, extraClass = ""): string =>
  `              <a href="#" class="lang-option${extraClass}" data-lang="${code}" role="menuitem">${label}</a>`;

const DROPDOWN = [
  '            <div id="langDropdown" class="lang-dropdown" role="menu">',
  OPTION("ar", "🇸🇦 العربية"),
  OPTION("de", "🇩🇪 Deutsch"),
  OPTION("en", "🇺🇸 English", " active"),
  OPTION("es", "🇪🇸 Español"),
  OPTION("pt-BR", "🇧🇷 Português (Brasil)"),
  OPTION("zh-CN", "🇨🇳 中文 (简体)"),
  "            </div>",
  "",
].join("\n");

const EL = { code: "el", flag: "🇬🇷", native: "Ελληνικά" };
const EL_LINE = OPTION("el", "🇬🇷 Ελληνικά");

test("addDropdownOption inserts the exact option line in data-lang order", () => {
  const out = addDropdownOption(DROPDOWN, EL);
  const lines = out.split("\n");
  assert.equal(lines[3], EL_LINE);
  assert.equal(lines[2], OPTION("de", "🇩🇪 Deutsch"));
  assert.equal(lines[4], OPTION("en", "🇺🇸 English", " active"));
  assert.equal(lines.length, DROPDOWN.split("\n").length + 1);
});

test("addDropdownOption is idempotent and leaves a listed code untouched", () => {
  const once = addDropdownOption(DROPDOWN, EL);
  assert.equal(addDropdownOption(once, EL), once);
  assert.equal(
    addDropdownOption(DROPDOWN, { code: "de", flag: "🇩🇪", native: "Deutsch" }),
    DROPDOWN
  );
});

test("addDropdownOption places a first / last / region-variant code correctly", () => {
  const first = addDropdownOption(DROPDOWN, { code: "aa", flag: "🏳️", native: "Aa" }).split("\n");
  assert.equal(first[1], OPTION("aa", "🏳️ Aa"));
  assert.equal(first[2], OPTION("ar", "🇸🇦 العربية"));

  const last = addDropdownOption(DROPDOWN, { code: "zu", flag: "🇿🇦", native: "isiZulu" }).split(
    "\n"
  );
  assert.equal(last[7], OPTION("zu", "🇿🇦 isiZulu"));
  assert.equal(last[8], "            </div>");

  const variant = addDropdownOption(DROPDOWN, {
    code: "pt-PT",
    flag: "🇵🇹",
    native: "Português (Portugal)",
  }).split("\n");
  assert.equal(variant[5], OPTION("pt-BR", "🇧🇷 Português (Brasil)"));
  assert.equal(variant[6], OPTION("pt-PT", "🇵🇹 Português (Portugal)"));
  assert.equal(variant[7], OPTION("zh-CN", "🇨🇳 中文 (简体)"));
});

test("addDropdownOption handles the two-entry why/ page and every dropdown on a page", () => {
  const why = [OPTION("en", "🇺🇸 English", " active"), OPTION("pt-BR", "🇧🇷 Português"), ""].join(
    "\n"
  );
  // "el" sorts before "en" — it becomes the first entry of that two-entry menu.
  assert.equal(
    addDropdownOption(why, EL),
    [EL_LINE, OPTION("en", "🇺🇸 English", " active"), OPTION("pt-BR", "🇧🇷 Português"), ""].join("\n")
  );

  const twoMenus = `${DROPDOWN}\n<footer>\n${DROPDOWN}`;
  const out = addDropdownOption(twoMenus, EL);
  assert.equal(out.split("\n").filter((line) => line === EL_LINE).length, 2);
  assert.equal(addDropdownOption(out, EL), out);
});

test("addDropdownOption preserves CRLF endings and rejects a page without a language menu", () => {
  const crlf = DROPDOWN.replace(/\n/g, "\r\n");
  const out = addDropdownOption(crlf, EL);
  assert.ok(out.includes(`${OPTION("de", "🇩🇪 Deutsch")}\r\n${EL_LINE}\r\n`));
  assert.equal(out.split("\r\n").length, crlf.split("\r\n").length + 1);
  assert.throws(() => addDropdownOption("<div>no menu</div>\n", EL), /lang-option/);
});
