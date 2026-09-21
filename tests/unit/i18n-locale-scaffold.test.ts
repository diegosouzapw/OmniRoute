import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  insertLocaleEntry,
  flagFileFor,
  insertReadmeFlagLink,
  insertDocsIndexRow,
  insertI18nGuideRow,
  bumpCounts,
  buildMirrorStub,
} from "../../scripts/i18n/lib/locale-scaffold.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const readRepo = (rel: string): string => readFileSync(path.join(ROOT, rel), "utf8");

type LocaleEntry = {
  code: string;
  label?: string;
  name?: string;
  native: string;
  english?: string;
  flag: string;
  flagFile?: string;
  aliases?: string[];
};

type I18nConfig = {
  $schema?: string;
  default: string;
  rtl: string[];
  uiOnly?: string[];
  docsExcluded?: string[];
  locales: LocaleEntry[];
};

const el: LocaleEntry = {
  code: "el",
  label: "EL",
  name: "Ελληνικά",
  native: "Ελληνικά",
  english: "Greek",
  flag: "🇬🇷",
};

const EL_README_LINK =
  '  <a href="docs/i18n/el/README.md"><img src="docs/assets/flags/gr.svg" width="30" alt="Ελληνικά (el)" title="Ελληνικά (el)"></a>';
const EL_INDEX_ROW = "- 🇬🇷 **Ελληνικά** (`el`): [Docs Root](./el/README.md)";

const realConfig = (): I18nConfig => JSON.parse(readRepo("config/i18n.json")) as I18nConfig;

// Column positions of every `|` — two table rows are aligned when these match.
const pipeColumns = (line: string): number[] =>
  [...line].flatMap((char, index) => (char === "|" ? [index] : []));

// A locale code that can never be configured, so the real-file tests keep passing after any
// real locale (Greek included) lands. Fails loudly if every candidate is taken.
const SENTINEL_CANDIDATES = ["zz", "zy", "zx"];
const sentinelCode = (config: I18nConfig): string => {
  const configured = new Set(config.locales.map((l) => l.code));
  const code = SENTINEL_CANDIDATES.find((candidate) => !configured.has(candidate));
  assert.ok(
    code,
    `every sentinel code (${SENTINEL_CANDIDATES.join(", ")}) is configured — extend SENTINEL_CANDIDATES`
  );
  return code;
};

const readmeLinkFor = (entry: LocaleEntry, flagFile: string): string =>
  `  <a href="docs/i18n/${entry.code}/README.md"><img src="docs/assets/flags/${flagFile}" width="30" alt="${entry.native} (${entry.code})" title="${entry.native} (${entry.code})"></a>`;
const indexRowFor = (entry: LocaleEntry): string =>
  `- ${entry.flag} **${entry.native}** (\`${entry.code}\`): [Docs Root](./${entry.code}/README.md)`;

type RowRef = { index: number; code: string };

// Where a new row must land: right before the first existing row whose code sorts after it
// under localeCompare("en"), or right after the last row when no row sorts after it.
const expectedRowIndex = (rows: RowRef[], code: string): number => {
  assert.ok(rows.length > 0, "no locale rows found");
  const next = rows.find((row) => row.code.localeCompare(code, "en") > 0);
  return next ? next.index : rows[rows.length - 1].index + 1;
};

const indexRows = (lines: string[]): RowRef[] =>
  lines.flatMap((line, index) => {
    const code = line.match(/^- .+ \(`([^`]+)`\): \[Docs Root\]/)?.[1];
    return code ? [{ index, code }] : [];
  });

// The locale table of docs/guides/I18N.md: its header line and the contiguous rows under it
// (the guide has other tables with backticked first cells, which must not count).
const guideRows = (lines: string[]): { header: number; rows: RowRef[] } => {
  const header = lines.findIndex((line) =>
    /^\| Code +\| Language +\| RTL +\| Google Translate Code +\|$/.test(line)
  );
  assert.ok(header >= 0, "locale table header not found");
  const rows: RowRef[] = [];
  for (let index = header + 2; index < lines.length; index += 1) {
    const code = lines[index].match(/^\| `([^`]+)` *\|/)?.[1];
    if (!code) break;
    rows.push({ index, code });
  }
  return { header, rows };
};

const escapeRegExp = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// ---------------------------------------------------------------------------
// insertLocaleEntry
// ---------------------------------------------------------------------------

test("insertLocaleEntry keeps alphabetical order by code and rejects duplicates", () => {
  const cfg = JSON.stringify({
    default: "en",
    rtl: [],
    locales: [{ code: "de" }, { code: "en" }, { code: "es" }],
  });
  const out = JSON.parse(insertLocaleEntry(cfg, el)) as I18nConfig;
  assert.deepEqual(
    out.locales.map((l) => l.code),
    ["de", "el", "en", "es"]
  );
  assert.throws(() => insertLocaleEntry(JSON.stringify(out), el), /already configured/);
});

test("insertLocaleEntry inserts at both ends, strips flagFile and stores the entry's own keys", () => {
  const cfg = JSON.stringify({ default: "en", rtl: [], locales: [{ code: "de" }, { code: "es" }] });
  const first = JSON.parse(insertLocaleEntry(cfg, { ...el, code: "aa" })) as I18nConfig;
  assert.deepEqual(
    first.locales.map((l) => l.code),
    ["aa", "de", "es"]
  );
  const last = JSON.parse(
    insertLocaleEntry(cfg, { ...el, code: "zz", flagFile: "gr.svg", aliases: ["zz-x"] })
  ) as I18nConfig;
  assert.deepEqual(
    last.locales.map((l) => l.code),
    ["de", "es", "zz"]
  );
  assert.deepEqual(last.locales[2], {
    code: "zz",
    label: "EL",
    name: "Ελληνικά",
    native: "Ελληνικά",
    english: "Greek",
    flag: "🇬🇷",
    aliases: ["zz-x"],
  });
  assert.throws(() => insertLocaleEntry(cfg, { ...el, code: "" }), /code/);
});

test("insertLocaleEntry on the real config keeps every top-level key, its order and the existing code order", () => {
  const raw = readRepo("config/i18n.json");
  const before = JSON.parse(raw) as I18nConfig;
  const entry: LocaleEntry = { ...el, code: sentinelCode(before) };
  const text = insertLocaleEntry(raw, { ...entry, flagFile: "gr.svg" });
  assert.ok(text.endsWith("}\n"));
  const after = JSON.parse(text) as I18nConfig;

  assert.deepEqual(Object.keys(after), Object.keys(before));
  const { locales: beforeLocales, ...beforeRest } = before;
  const { locales: afterLocales, ...afterRest } = after;
  assert.deepEqual(afterRest, beforeRest);

  // The existing entries are untouched and keep their relative order.
  assert.equal(afterLocales.length, beforeLocales.length + 1);
  assert.deepEqual(
    afterLocales.filter((l) => l.code !== entry.code),
    beforeLocales
  );
  // ...and the new entry sits exactly where a full localeCompare("en") sort would put it:
  // before the first existing code that sorts after it, or last when none does.
  const sorted = [...beforeLocales.map((l) => l.code), entry.code].sort((a, b) =>
    a.localeCompare(b, "en")
  );
  assert.deepEqual(
    afterLocales.map((l) => l.code),
    sorted
  );
  const next = beforeLocales.findIndex((l) => l.code.localeCompare(entry.code, "en") > 0);
  assert.equal(
    afterLocales.findIndex((l) => l.code === entry.code),
    next === -1 ? beforeLocales.length : next
  );
  assert.deepEqual(
    afterLocales.find((l) => l.code === entry.code),
    entry
  );
});

// ---------------------------------------------------------------------------
// flagFileFor
// ---------------------------------------------------------------------------

test("flagFileFor derives the ISO-3166 file from the emoji and honours an override", () => {
  assert.equal(flagFileFor(el), "gr.svg");
  assert.equal(flagFileFor({ ...el, code: "kn", flag: "🇮🇳", flagFile: "in.svg" }), "in.svg");
  // An override that differs from the derivation proves the override really wins.
  assert.equal(flagFileFor({ ...el, code: "sw", flag: "🇰🇪", flagFile: "tz.svg" }), "tz.svg");
  assert.equal(flagFileFor({ ...el, code: "ja", flag: "🇯🇵" }), "jp.svg");
});

test("flagFileFor rejects anything that is not a regional-indicator pair unless flagFile is given", () => {
  assert.throws(() => flagFileFor({ ...el, flag: "🏳️" }), /pass flagFile explicitly/);
  assert.throws(() => flagFileFor({ ...el, flag: "🇬" }), /pass flagFile explicitly/);
  assert.throws(() => flagFileFor({ ...el, flag: "GR" }), /pass flagFile explicitly/);
  const noFlag: Partial<LocaleEntry> = { code: "x", native: "x" };
  assert.throws(() => flagFileFor(noFlag as LocaleEntry), /pass flagFile explicitly/);
  assert.equal(flagFileFor({ ...el, flag: "🏳️", flagFile: "custom.svg" }), "custom.svg");
});

test("flagFileFor reproduces the README flag file of every configured locale (legacy `sw` needs flagFile)", () => {
  const readme = readRepo("README.md");
  // Pre-existing README drift, exactly what the flagFile override is for: Kiswahili
  // uses tz.svg although its emoji is 🇰🇪.
  const overrides: Record<string, string> = { sw: "tz.svg" };
  for (const entry of realConfig().locales) {
    const href = entry.code === "en" ? "README.md" : `docs/i18n/${entry.code}/README.md`;
    const pattern = new RegExp(
      `<a href="${escapeRegExp(href)}"><img src="docs/assets/flags/([a-z]+\\.svg)"`
    );
    const match = readme.match(pattern);
    assert.ok(match, `README has no flag link for ${entry.code}`);
    assert.equal(flagFileFor({ ...entry, flagFile: overrides[entry.code] }), match[1], entry.code);
  }
});

// ---------------------------------------------------------------------------
// insertReadmeFlagLink
// ---------------------------------------------------------------------------

const README_BLOCK = `<div align="center">\n  <b>🌐 In 43 languages</b>\n  <br/><br/>\n  <a href="README.md"><img src="docs/assets/flags/us.svg" width="30" alt="English (en)" title="English (en)"></a>\n</div>\n`;

test("insertReadmeFlagLink appends the link inside the block and bumps the headline", () => {
  const out = insertReadmeFlagLink(README_BLOCK, el, 44);
  assert.match(out, /In 44 languages/);
  assert.match(
    out,
    /<a href="docs\/i18n\/el\/README\.md"><img src="docs\/assets\/flags\/gr\.svg" width="30" alt="Ελληνικά \(el\)" title="Ελληνικά \(el\)"><\/a>\n<\/div>/
  );
});

test("insertReadmeFlagLink lands after the last link, before </div>, and only rewrites the marker", () => {
  const link = (code: string, file: string): string =>
    `  <a href="docs/i18n/${code}/README.md"><img src="docs/assets/flags/${file}" width="30" alt="${code}" title="${code}"></a>`;
  const lines = [
    "# OmniRoute",
    "",
    "Docs In 43 languages, see below.",
    "",
    '<div align="center">',
    "  <b>🌐 In 43 languages</b>",
    "  <br/><br/>",
    link("de", "de.svg"),
    link("es", "es.svg"),
    link("fr", "fr.svg"),
    "</div>",
    "",
    "<div>In 43 languages</div>",
    "",
  ];
  const out = insertReadmeFlagLink(lines.join("\n"), el, 44).split("\n");
  const expected = [...lines];
  expected[5] = "  <b>🌐 In 44 languages</b>";
  expected.splice(10, 0, EL_README_LINK);
  assert.deepEqual(out, expected);
});

test("insertReadmeFlagLink rejects a duplicate link and a README without the language block", () => {
  const once = insertReadmeFlagLink(README_BLOCK, el, 44);
  assert.throws(() => insertReadmeFlagLink(once, el, 45), /already linked/);
  assert.throws(() => insertReadmeFlagLink("# no block\n", el, 44), /language block not found/);
});

test("insertReadmeFlagLink on the real README adds exactly one line right before the block's </div>", () => {
  const config = realConfig();
  const total = config.locales.length;
  const entry: LocaleEntry = { ...el, code: sentinelCode(config) };
  const before = readRepo("README.md").split("\n");
  const after = insertReadmeFlagLink(before.join("\n"), entry, total + 1).split("\n");
  assert.equal(after.length, before.length + 1);

  const marker = before.indexOf(`  <b>🌐 In ${total} languages</b>`);
  const close = before.findIndex((line, index) => index > marker && line === "</div>");
  assert.ok(marker > 0 && close > marker);
  assert.equal(after[marker], `  <b>🌐 In ${total + 1} languages</b>`);
  assert.match(after[close - 1], /^  <a href="docs\/i18n\/[^"]+\/README\.md"><img /);
  assert.equal(after[close], readmeLinkFor(entry, "gr.svg"));
  assert.equal(after[close + 1], "</div>");
  assert.deepEqual(
    [...after.slice(0, marker), ...after.slice(marker + 1, close), ...after.slice(close + 1)],
    [...before.slice(0, marker), ...before.slice(marker + 1)]
  );
});

// ---------------------------------------------------------------------------
// insertDocsIndexRow
// ---------------------------------------------------------------------------

const INDEX_FIXTURE =
  "Translations of documentation into 42 languages; together with the English source, the UI supports 43 locales. Code blocks remain in English.\n\n---\n\n- 🇩🇪 **Deutsch** (`de`): [Docs Root](./de/README.md)\n- 🇪🇸 **Español** (`es`): [Docs Root](./es/README.md)\n";

test("insertDocsIndexRow inserts in code order and updates the counts sentence", () => {
  const out = insertDocsIndexRow(INDEX_FIXTURE, el, 44);
  assert.match(
    out,
    /into 43 languages; together with the English source, the UI supports 44 locales/
  );
  assert.equal(out.split("\n").indexOf(EL_INDEX_ROW), 5);
});

test("insertDocsIndexRow inserts at the beginning and the end of the row block and leaves other lines alone", () => {
  const withTrailer = `${INDEX_FIXTURE}\nSee also [the guide](../guides/I18N.md).\n`;
  const lines = withTrailer.split("\n");
  const sentence = lines[0]
    .replace("into 42 languages", "into 43 languages")
    .replace("supports 43 locales", "supports 44 locales");

  const first = insertDocsIndexRow(
    withTrailer,
    { ...el, code: "aa", native: "Aa", flag: "🇦🇦" },
    44
  );
  const aaRow = "- 🇦🇦 **Aa** (`aa`): [Docs Root](./aa/README.md)";
  assert.deepEqual(first.split("\n"), [sentence, ...lines.slice(1, 4), aaRow, ...lines.slice(4)]);

  const last = insertDocsIndexRow(withTrailer, { ...el, code: "zz", native: "Zz", flag: "🇿🇿" }, 44);
  const zzRow = "- 🇿🇿 **Zz** (`zz`): [Docs Root](./zz/README.md)";
  assert.deepEqual(last.split("\n"), [sentence, ...lines.slice(1, 6), zzRow, ...lines.slice(6)]);
});

test("insertDocsIndexRow rejects a duplicate row, a missing sentence and an index without rows", () => {
  assert.throws(
    () => insertDocsIndexRow(INDEX_FIXTURE, { ...el, code: "de" }, 44),
    /already listed/
  );
  assert.throws(
    () =>
      insertDocsIndexRow("# x\n\n- 🇩🇪 **Deutsch** (`de`): [Docs Root](./de/README.md)\n", el, 44),
    /counts sentence/
  );
  assert.throws(
    () => insertDocsIndexRow(`${INDEX_FIXTURE.split("\n").slice(0, 4).join("\n")}\n`, el, 44),
    /no locale rows/
  );
});

test("insertDocsIndexRow on the real docs/i18n/README.md adds one row at the derived position and rewrites only the sentence", () => {
  const config = realConfig();
  const total = config.locales.length;
  const entry: LocaleEntry = { ...el, code: sentinelCode(config) };
  const before = readRepo("docs/i18n/README.md").split("\n");
  const after = insertDocsIndexRow(before.join("\n"), entry, total + 1).split("\n");
  assert.equal(after.length, before.length + 1);

  const sentence = before.findIndex((line) =>
    line.startsWith("Translations of documentation into")
  );
  const at = expectedRowIndex(indexRows(before), entry.code);
  assert.ok(sentence >= 0 && at > sentence);
  assert.equal(
    after[sentence],
    before[sentence]
      .replace(`into ${total - 1} languages`, `into ${total} languages`)
      .replace(`supports ${total} locales`, `supports ${total + 1} locales`)
  );
  assert.equal(after[at], indexRowFor(entry));
  assert.deepEqual(
    [...after.slice(0, sentence), ...after.slice(sentence + 1, at), ...after.slice(at + 1)],
    [...before.slice(0, sentence), ...before.slice(sentence + 1)]
  );
});

// ---------------------------------------------------------------------------
// insertI18nGuideRow
// ---------------------------------------------------------------------------

const GUIDE_FIXTURE =
  "OmniRoute supports **43 languages** with full dashboard UI translation.\n\n| Code | Language | RTL | Google Translate Code |\n| --- | --- | --- | --- |\n| `de` | Deutsch | No | `de` |\n| `es` | Español | No | `es` |\n";

test("insertI18nGuideRow adds a table row in code order and bumps the headline", () => {
  const out = insertI18nGuideRow(GUIDE_FIXTURE, el, 44);
  assert.match(out, /supports \*\*44 languages\*\*/);
  // headline (0), blank (1), header (2), separator (3), `de` (4), `el` (5), `es` (6)
  assert.equal(out.split("\n")[4], "| `de` | Deutsch | No | `de` |");
  assert.equal(out.split("\n")[5], "| `el` | Ελληνικά | No | `el` |");
  assert.equal(out.split("\n")[6], "| `es` | Español | No | `es` |");
});

test("insertI18nGuideRow inserts at both ends, takes RTL from rtlCodes and leaves other lines alone", () => {
  const withTrailer = `${GUIDE_FIXTURE}\nRTL locales flip the layout.\n`;
  const lines = withTrailer.split("\n");
  const headline = lines[0].replace("**43 languages**", "**44 languages**");

  const first = insertI18nGuideRow(withTrailer, { ...el, code: "ar", native: "العربية" }, 44);
  const arRow = "| `ar` | العربية | Yes | `ar` |";
  assert.deepEqual(first.split("\n"), [headline, ...lines.slice(1, 4), arRow, ...lines.slice(4)]);

  const last = insertI18nGuideRow(withTrailer, { ...el, code: "zz", native: "Zz" }, 44, ["zz"]);
  const zzRow = "| `zz` | Zz | Yes | `zz` |";
  assert.deepEqual(last.split("\n"), [headline, ...lines.slice(1, 6), zzRow, ...lines.slice(6)]);

  const he = { ...el, code: "he", native: "עברית" };
  assert.equal(
    insertI18nGuideRow(GUIDE_FIXTURE, he, 44).split("\n")[6],
    "| `he` | עברית | Yes | `he` |"
  );
  assert.equal(
    insertI18nGuideRow(GUIDE_FIXTURE, he, 44, []).split("\n")[6],
    "| `he` | עברית | No | `he` |"
  );
});

test("insertI18nGuideRow rejects a duplicate row, a missing headline and a guide without rows", () => {
  assert.throws(
    () => insertI18nGuideRow(GUIDE_FIXTURE, { ...el, code: "es" }, 44),
    /already listed/
  );
  assert.throws(() => insertI18nGuideRow("| `de` | Deutsch | No | `de` |\n", el, 44), /headline/);
  assert.throws(
    () => insertI18nGuideRow(`${GUIDE_FIXTURE.split("\n").slice(0, 4).join("\n")}\n`, el, 44),
    /no locale rows/
  );
});

test("insertI18nGuideRow pads the new row to the column widths of a Prettier-aligned table", () => {
  const aligned = [
    "OmniRoute supports **43 languages** with full dashboard UI translation.",
    "",
    "| Code    | Language             | RTL | Google Translate Code |",
    "| ------- | -------------------- | --- | --------------------- |",
    "| `de`    | Deutsch              | No  | `de`                  |",
    "| `zh-CN` | 中文 (简体)          | No  | `zh-CN`               |",
    "",
  ].join("\n");

  const greek = insertI18nGuideRow(aligned, el, 44).split("\n");
  assert.equal(greek[5], "| `el`    | Ελληνικά             | No  | `el`                  |");
  assert.deepEqual(pipeColumns(greek[5]), pipeColumns(greek[4]));

  // CJK ideographs are two columns wide for Prettier, so 中文 (香港) gets the same 9 spaces
  // of padding as the 中文 (简体) row above it — not the 13 a plain .length would give.
  const hk = insertI18nGuideRow(aligned, { ...el, code: "zh-HK", native: "中文 (香港)" }, 44);
  assert.equal(
    hk.split("\n")[6],
    "| `zh-HK` | 中文 (香港)          | No  | `zh-HK`               |"
  );
});

test("insertI18nGuideRow only touches the locale table, not other tables with backticked cells", () => {
  const guide = [
    "OmniRoute supports **43 languages** with full dashboard UI translation.",
    "",
    "| Variable | Default |",
    "| --- | --- |",
    "| `OMNIROUTE_LANG` | `en` |",
    "| `zz` | `zz` |",
    "",
    "### Supported Locales",
    "",
    "| Code | Language | RTL | Google Translate Code |",
    "| --- | --- | --- | --- |",
    "| `de` | Deutsch | No | `de` |",
    "| `es` | Español | No | `es` |",
    "",
    "| Other | Table |",
    "| --- | --- |",
    "| `aa` | after |",
    "",
  ];
  const out = insertI18nGuideRow(guide.join("\n"), el, 44).split("\n");
  const expected = [...guide];
  expected[0] = expected[0].replace("**43 languages**", "**44 languages**");
  expected.splice(12, 0, "| `el` | Ελληνικά | No | `el` |");
  assert.deepEqual(out, expected);
  // A duplicate in a decoy table is not a duplicate locale row.
  assert.doesNotThrow(() =>
    insertI18nGuideRow(guide.join("\n"), { ...el, code: "zz", native: "Zz" }, 44)
  );
  assert.throws(
    () =>
      insertI18nGuideRow(
        "OmniRoute supports **43 languages**\n\n| `de` | Deutsch | No | `de` |\n",
        el,
        44
      ),
    /locale table not found/
  );
});

test("insertI18nGuideRow on the real docs/guides/I18N.md adds one aligned row at the derived position", () => {
  const config = realConfig();
  const total = config.locales.length;
  const entry: LocaleEntry = { ...el, code: sentinelCode(config) };
  const before = readRepo("docs/guides/I18N.md").split("\n");
  const after = insertI18nGuideRow(before.join("\n"), entry, total + 1, config.rtl).split("\n");
  assert.equal(after.length, before.length + 1);

  const headline = before.findIndex((line) => line.includes(`supports **${total} languages**`));
  const { header, rows } = guideRows(before);
  const at = expectedRowIndex(rows, entry.code);
  assert.ok(headline >= 0 && header > headline && at > header + 1);
  assert.equal(
    after[headline],
    before[headline].replace(`**${total} languages**`, `**${total + 1} languages**`)
  );
  const rtl = config.rtl.includes(entry.code) ? "Yes" : "No";
  assert.match(
    after[at],
    new RegExp(
      `^\\| \`${escapeRegExp(entry.code)}\` +\\| ${escapeRegExp(entry.native)} +\\| ${rtl} +\\| \`${escapeRegExp(entry.code)}\` +\\|$`
    )
  );
  // Aligned with the table: the same pipe columns as its (ASCII) header and separator lines.
  assert.deepEqual(pipeColumns(after[at]), pipeColumns(before[header]));
  assert.deepEqual(pipeColumns(after[at]), pipeColumns(before[header + 1]));
  assert.deepEqual(
    [...after.slice(0, headline), ...after.slice(headline + 1, at), ...after.slice(at + 1)],
    [...before.slice(0, headline), ...before.slice(headline + 1)]
  );
});

// ---------------------------------------------------------------------------
// bumpCounts
// ---------------------------------------------------------------------------

test("bumpCounts rewrites language and doc-set counts", () => {
  assert.equal(
    bumpCounts("next-intl with 43 languages\n42 translated documentation sets", 44),
    "next-intl with 44 languages\n43 translated documentation sets"
  );
});

// llm.txt's repo-tree comments count the same two things in a different shape:
// `messages/ # N language JSON files` is the UI-locale total, `i18n/ # N-language
// translated docs` is the docs total (one less — English is the source, not a
// translation). Both were left behind by bumpCounts until this was added.
test("bumpCounts rewrites the llm.txt tree-comment count phrasings", () => {
  assert.equal(
    bumpCounts("messages/ # 43 language JSON files\ni18n/ # 42-language translated docs", 44),
    "messages/ # 44 language JSON files\ni18n/ # 43-language translated docs"
  );
});

test("bumpCounts touches only those four phrases", () => {
  const text =
    "352 providers, 43 languages for UI, 42 translated documentation sets, 43 language JSON files, 42-language translated docs, 43 locales, 7 language packs, in 42 locales, 43 langs";
  assert.equal(
    bumpCounts(text, 44),
    "352 providers, 44 languages for UI, 43 translated documentation sets, 44 language JSON files, 43-language translated docs, 43 locales, 7 language packs, in 42 locales, 43 langs"
  );
});

// The four phrases, in the shapes llm.txt actually uses. `-language translated
// docs` is hyphenated, so the separator class is `[ -]`, not a plain space.
const LLM_COUNT_PHRASE =
  /(?:languages|translated documentation sets|language JSON files|language translated docs)/;
const LLM_COUNT_LINE = new RegExp(`\\d+[ -]${LLM_COUNT_PHRASE.source}`);
const LLM_COUNT_NUMBER = new RegExp(`\\d+(?=[ -]${LLM_COUNT_PHRASE.source})`);

test("bumpCounts on the real llm.txt rewrites exactly the five count lines, each by one", () => {
  const total = realConfig().locales.length;
  const before = readRepo("llm.txt").split("\n");
  const after = bumpCounts(before.join("\n"), total + 1).split("\n");
  assert.equal(after.length, before.length);
  const changed = before
    .map((line, index) => [line, after[index]])
    .filter(([from, to]) => from !== to);
  assert.equal(changed.length, 5);
  for (const [from, to] of changed) {
    assert.match(from, LLM_COUNT_LINE);
    assert.equal(
      to,
      from.replace(LLM_COUNT_NUMBER, (n) => String(Number(n) + 1))
    );
  }
});

// The counterpart of the test above: at the CURRENT locale total the file is
// already correct, so bumpCounts must be a no-op. This is what would have caught
// the two tree-comment phrasings drifting out of sync.
test("bumpCounts on the real llm.txt is a no-op at the current locale total", () => {
  const total = realConfig().locales.length;
  const text = readRepo("llm.txt");
  assert.equal(bumpCounts(text, total), text);
});

// ---------------------------------------------------------------------------
// buildMirrorStub
// ---------------------------------------------------------------------------

test("buildMirrorStub produces the header + separator layout check-docs-sync expects", () => {
  assert.equal(
    buildMirrorStub({
      heading: "OmniRoute",
      native: "Ελληνικά",
      bar: "🌐 **Languages:** x",
      body: "body\n",
    }),
    "# OmniRoute (Ελληνικά)\n\n🌐 **Languages:** x\n\n---\n\nbody\n"
  );
});

test("buildMirrorStub is accepted by check-docs-sync's separator logic and is a fixed point of sync-llm-mirrors", () => {
  const body = "> OmniRoute is a proxy.\n\n## Section\n\ntext\n";
  const stub = buildMirrorStub({
    heading: "OmniRoute",
    native: "Ελληνικά",
    bar: "🌐 **Languages:** x",
    body,
  });

  // scripts/check/check-docs-sync.mjs::extractI18nMirrorBody
  const separator = stub.match(/^---\s*$/m);
  assert.ok(separator && separator.index !== undefined);
  const extracted = stub.slice(separator.index + separator[0].length).replace(/^\r?\n+/, "");
  assert.equal(extracted, body);

  // scripts/i18n/sync-llm-mirrors.mjs keeps the header up to `---` and re-appends the root body
  const header = stub.slice(0, separator.index + separator[0].length).replace(/\n+$/, "");
  assert.equal(`${header}\n\n${body.trimStart()}`, stub);
});

test("buildMirrorStub reproduces a real mirror byte for byte", () => {
  const mirror = readRepo("docs/i18n/pt-BR/llm.txt");
  const parts = mirror.match(
    /^# (\S+) \((.+)\)\n\n(🌐 \*\*Languages:\*\* [^\n]+)\n\n---\n\n([\s\S]*)$/
  );
  assert.ok(parts, "docs/i18n/pt-BR/llm.txt does not have the five-part mirror layout");
  const [, heading, native, bar, body] = parts;
  assert.equal(heading, "OmniRoute");
  assert.equal(native, realConfig().locales.find((l) => l.code === "pt-BR")?.native);
  assert.equal(buildMirrorStub({ heading, native, bar, body }), mirror);
});
