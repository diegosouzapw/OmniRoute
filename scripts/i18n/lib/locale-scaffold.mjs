/**
 * Pure text helpers for scaffolding a new locale across every surface that
 * lists the supported languages. Text in, text out — no filesystem and no
 * Prettier: the orchestrator (scripts/i18n/add-locale.mjs) reads each file,
 * transforms it here and writes it back.
 *
 * `entry` is a `config/i18n.json` locale object (`code`, `label`, `name`,
 * `native`, `english`, `flag`, optional `aliases`) plus one helper key that is
 * never stored: `flagFile`, the `docs/assets/flags/<file>` to use when the
 * ISO-3166 file cannot be derived from the flag emoji (e.g. `sw` → `tz.svg`).
 * `total` is the number of UI locales after the insertion, English included.
 *
 *   insertLocaleEntry(configText, entry)                  config/i18n.json
 *   flagFileFor(entry)                                    🇬🇷 → "gr.svg"
 *   insertReadmeFlagLink(readmeText, entry, total)        README.md language block
 *   insertDocsIndexRow(indexText, entry, total)           docs/i18n/README.md
 *   insertI18nGuideRow(guideText, entry, total, rtlCodes) docs/guides/I18N.md locale table
 *   bumpCounts(text, total)                               llm.txt counts: "N languages",
 *                                                         "N translated documentation sets",
 *                                                         "N language JSON files",
 *                                                         "N-language translated docs"
 *   buildMirrorStub({ heading, native, bar, body })       docs/i18n/<code>/llm.txt, CHANGELOG.md
 *
 * Every insertion leaves the existing lines exactly as they are and places the
 * new one in `code` order (`localeCompare`, "en"): right before the first
 * existing entry that sorts after it, or after the last one. Duplicates throw.
 */

const REGIONAL_INDICATOR_A = 0x1f1e6;
const REGIONAL_INDICATOR_Z = REGIONAL_INDICATOR_A + 25;
const DEFAULT_RTL_CODES = ["ar", "fa", "he", "ur"];

const README_MARKER = /<b>🌐 In \d+ languages<\/b>/;
const INDEX_SENTENCE =
  /into \d+ languages; together with the English source, the UI supports \d+ locales/;
const INDEX_ROW = /^- .+ \(`([^`]+)`\): \[Docs Root\]/;
const GUIDE_HEADLINE = /supports \*\*\d+ languages\*\*/;
const GUIDE_HEADER = /^\| Code +\| Language +\| RTL +\| Google Translate Code +\|$/;
const GUIDE_ROW = /^\| `([^`]+)` *\|/;
const TABLE_SEPARATOR = /^\|(?: *:?-{3,}:? *\|)+$/;

function compareCodes(a, b) {
  return a.localeCompare(b, "en");
}

function requireCode(entry) {
  if (!entry || typeof entry.code !== "string" || entry.code.length === 0) {
    throw new Error("locale entry needs a non-empty code");
  }
  return entry.code;
}

function insertInCodeOrder(items, item, codeOf) {
  const code = codeOf(item);
  const at = items.findIndex((existing) => compareCodes(codeOf(existing), code) > 0);
  return at === -1 ? [...items, item] : [...items.slice(0, at), item, ...items.slice(at)];
}

// Insert `row` among `rows` (`{ index, code }` of the existing locale rows in
// `lines`); every other line — headings, blank lines, table header, prose —
// stays exactly where it is.
function insertAmongRows(lines, rows, row, code, surface) {
  if (rows.length === 0) throw new Error(`${surface}: no locale rows found`);
  if (rows.some((existing) => existing.code === code)) {
    throw new Error(`${surface}: ${code} is already listed`);
  }
  const next = rows.find((existing) => compareCodes(existing.code, code) > 0);
  const at = next ? next.index : rows[rows.length - 1].index + 1;
  return [...lines.slice(0, at), row, ...lines.slice(at)];
}

export function flagFileFor(entry) {
  if (entry.flagFile) return entry.flagFile;
  const codePoints =
    typeof entry.flag === "string" ? [...entry.flag].map((char) => char.codePointAt(0)) : [];
  const isRegionalPair =
    codePoints.length === 2 &&
    codePoints.every((cp) => cp >= REGIONAL_INDICATOR_A && cp <= REGIONAL_INDICATOR_Z);
  if (!isRegionalPair) {
    throw new Error(`cannot derive a flag file from ${entry.flag}; pass flagFile explicitly`);
  }
  return (
    codePoints.map((cp) => String.fromCharCode(cp - REGIONAL_INDICATOR_A + 97)).join("") + ".svg"
  );
}

export function insertLocaleEntry(configText, entry) {
  const code = requireCode(entry);
  const config = JSON.parse(configText);
  if (!Array.isArray(config.locales)) throw new Error("config has no locales array");
  if (config.locales.some((locale) => locale.code === code)) {
    throw new Error(`${code} is already configured`);
  }
  const stored = { ...entry };
  delete stored.flagFile;
  config.locales = insertInCodeOrder(config.locales, stored, (locale) => locale.code);
  return JSON.stringify(config, null, 2) + "\n";
}

export function insertReadmeFlagLink(readmeText, entry, total) {
  const code = requireCode(entry);
  const marker = readmeText.match(README_MARKER);
  if (!marker || marker.index === undefined) throw new Error("README language block not found");
  const close = readmeText.indexOf("</div>", marker.index);
  if (close === -1) throw new Error("README language block is not closed");
  const href = `docs/i18n/${code}/README.md`;
  if (readmeText.slice(marker.index, close).includes(`href="${href}"`)) {
    throw new Error(`${code} is already linked in the README language block`);
  }
  const label = `${entry.native} (${code})`;
  const link = `  <a href="${href}"><img src="docs/assets/flags/${flagFileFor(entry)}" width="30" alt="${label}" title="${label}"></a>`;
  // `</div>` sits on its own line in README.md; the link goes on the line before it.
  const lineStart = readmeText.lastIndexOf("\n", close) + 1;
  return (
    readmeText.slice(0, marker.index) +
    `<b>🌐 In ${total} languages</b>` +
    readmeText.slice(marker.index + marker[0].length, lineStart) +
    `${link}\n` +
    readmeText.slice(lineStart)
  );
}

export function insertDocsIndexRow(indexText, entry, total) {
  const code = requireCode(entry);
  if (!INDEX_SENTENCE.test(indexText)) {
    throw new Error("docs/i18n/README.md counts sentence not found");
  }
  const lines = indexText
    .replace(
      INDEX_SENTENCE,
      `into ${total - 1} languages; together with the English source, the UI supports ${total} locales`
    )
    .split("\n");
  const rows = lines
    .map((line, index) => ({ index, code: line.match(INDEX_ROW)?.[1] ?? null }))
    .filter((candidate) => candidate.code !== null);
  const row = `- ${entry.flag} **${entry.native}** (\`${code}\`): [Docs Root](./${code}/README.md)`;
  return insertAmongRows(lines, rows, row, code, "docs/i18n/README.md").join("\n");
}

export function insertI18nGuideRow(guideText, entry, total, rtlCodes = DEFAULT_RTL_CODES) {
  const code = requireCode(entry);
  if (!GUIDE_HEADLINE.test(guideText)) throw new Error("docs/guides/I18N.md headline not found");
  const lines = guideText.replace(GUIDE_HEADLINE, `supports **${total} languages**`).split("\n");
  // The guide has other tables with backticked first cells, so the locale rows
  // are the contiguous block right under the "Supported Locales" table header.
  const header = lines.findIndex((line) => GUIDE_HEADER.test(line));
  if (header === -1 || !TABLE_SEPARATOR.test(lines[header + 1] ?? "")) {
    throw new Error("docs/guides/I18N.md locale table not found");
  }
  const rows = [];
  for (let index = header + 2; index < lines.length; index += 1) {
    const rowCode = lines[index].match(GUIDE_ROW)?.[1] ?? null;
    if (rowCode === null) break;
    rows.push({ index, code: rowCode });
  }
  const cells = [
    `\`${code}\``,
    entry.native,
    rtlCodes.includes(code) ? "Yes" : "No",
    `\`${code}\``,
  ];
  const row = formatTableRow(cells, tableColumnWidths(lines[header], lines[header + 1]));
  return insertAmongRows(lines, rows, row, code, "docs/guides/I18N.md").join("\n");
}

export function bumpCounts(text, total) {
  return text
    .replace(/\d+ languages/g, `${total} languages`)
    .replace(/\d+ translated documentation sets/g, `${total - 1} translated documentation sets`)
    .replace(/(\d+) language JSON files/g, `${total} language JSON files`)
    .replace(/(\d+)-language translated docs/g, `${total - 1}-language translated docs`);
}

export function buildMirrorStub({ heading, native, bar, body }) {
  return `# ${heading} (${native})\n\n${bar}\n\n---\n\n${body}`;
}

// --- markdown table alignment ------------------------------------------------
//
// docs/guides/I18N.md is Prettier-formatted, so every cell is padded to its
// column width. A new row is padded the same way when the table is aligned
// (header cell widths equal the separator dash counts, which is how Prettier
// emits it); otherwise the compact `| a | b |` form is used.

function tableCells(line) {
  return line.replace(/^\| ?/, "").replace(/ ?\|$/, "").split(" | ");
}

function tableColumnWidths(headerLine, separatorLine) {
  const headerWidths = tableCells(headerLine).map((cell) => cell.length);
  const separatorWidths = tableCells(separatorLine).map((cell) => cell.length);
  const aligned =
    headerWidths.length === separatorWidths.length &&
    headerWidths.every((width, index) => width === separatorWidths[index]);
  return aligned ? separatorWidths : null;
}

function formatTableRow(cells, widths) {
  const padded =
    widths && widths.length === cells.length
      ? cells.map(
          (cell, index) => cell + " ".repeat(Math.max(0, widths[index] - displayWidth(cell)))
        )
      : cells;
  return `| ${padded.join(" | ")} |`;
}

// Column width the way Prettier measures markdown tables: East Asian wide and
// fullwidth code points take two columns, combining diacritics none, everything
// else one. (Emoji never appear in these cells, so they are not special-cased.)
function displayWidth(text) {
  let width = 0;
  for (const char of text) {
    const cp = char.codePointAt(0);
    if (cp >= 0x0300 && cp <= 0x036f) continue;
    width += isWide(cp) ? 2 : 1;
  }
  return width;
}

function isWide(cp) {
  return (
    (cp >= 0x1100 && cp <= 0x115f) || // Hangul Jamo
    (cp >= 0x2e80 && cp <= 0x303e) || // CJK radicals, ideographic punctuation
    (cp >= 0x3041 && cp <= 0x33ff) || // Hiragana, Katakana, Bopomofo, Hangul compat, CJK compat
    (cp >= 0x3400 && cp <= 0x4dbf) || // CJK Extension A
    (cp >= 0x4e00 && cp <= 0x9fff) || // CJK Unified Ideographs
    (cp >= 0xa960 && cp <= 0xa97f) || // Hangul Jamo Extended-A
    (cp >= 0xac00 && cp <= 0xd7a3) || // Hangul Syllables
    (cp >= 0xf900 && cp <= 0xfaff) || // CJK Compatibility Ideographs
    (cp >= 0xfe30 && cp <= 0xfe4f) || // CJK Compatibility Forms
    (cp >= 0xff00 && cp <= 0xff60) || // Fullwidth Forms
    (cp >= 0xffe0 && cp <= 0xffe6) || // Fullwidth signs
    (cp >= 0x20000 && cp <= 0x3fffd) // CJK Extensions B and later
  );
}
