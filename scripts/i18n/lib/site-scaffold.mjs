/**
 * Pure text helpers for the marketing site (omnirouteSite — a separate repo
 * mirrored next to this one; `scripts/i18n/add-locale.mjs --site-dir=…` points
 * at it). Text in, text out — no filesystem.
 *
 *   addSupportedLang(jsSource, code)                 js/i18n.js
 *     Adds `code` to the `const SUPPORTED_LANGS = [ … ];` literal, keeps the
 *     codes in `localeCompare(…, "en")` order and re-flows the literal in the
 *     file's own style: a multi-line array is filled line by line up to its
 *     existing width (80 columns in the site file), a single-line array stays
 *     on one line. Returns the input unchanged when the code is already listed.
 *
 *   addDropdownOption(html, { code, flag, native })  index.html and friends
 *     Inserts
 *       <a href="#" class="lang-option" data-lang="<code>" role="menuitem"><flag> <native></a>
 *     into every language menu of the page — a menu being a contiguous run of
 *     `.lang-option` lines — in `data-lang` code order, with the indentation of
 *     its neighbours. Returns the input unchanged when every menu lists the code.
 *
 * Both throw when the anchor they edit cannot be found.
 */

const SUPPORTED_LANGS_RE = /(const SUPPORTED_LANGS = \[)([\s\S]*?)(\];)/;
const OPTION_LINE_RE = /^([ \t]*)<a href="#" class="lang-option(?: [^"]*)?" data-lang="([^"]+)"/;
const MIN_FILL_WIDTH = 80;

function compareCodes(a, b) {
  return a.localeCompare(b, "en");
}

function fillLines(items, indent, width) {
  const lines = [];
  let current = "";
  for (const item of items) {
    const token = `${item},`;
    const candidate = current ? `${current} ${token}` : `${indent}${token}`;
    if (current && candidate.length > width) {
      lines.push(current);
      current = `${indent}${token}`;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function addSupportedLang(jsSource, code) {
  const match = jsSource.match(SUPPORTED_LANGS_RE);
  if (!match) throw new Error("SUPPORTED_LANGS array literal not found");
  const list = match[2];
  const quote = list.match(/["']/)?.[0] ?? '"';
  const codes = [...list.matchAll(/["']([^"']+)["']/g)].map((m) => m[1]);
  if (codes.includes(code)) return jsSource;
  codes.push(code);
  codes.sort(compareCodes);
  const items = codes.map((c) => `${quote}${c}${quote}`);

  let body;
  if (list.includes("\n")) {
    const indent = list.match(/\n([ \t]*)\S/)?.[1] ?? "  ";
    const width = Math.max(MIN_FILL_WIDTH, ...list.split("\n").map((line) => line.length));
    body = `\n${fillLines(items, indent, width).join("\n")}\n`;
  } else {
    body = items.join(", ");
  }
  return jsSource.replace(
    SUPPORTED_LANGS_RE,
    (_whole, open, _list, close) => `${open}${body}${close}`
  );
}

export function addDropdownOption(html, { code, flag, native }) {
  const eol = html.includes("\r\n") ? "\r\n" : "\n";
  const lines = html.split(eol);
  const options = [];
  lines.forEach((line, index) => {
    const m = line.match(OPTION_LINE_RE);
    if (m) options.push({ index, indent: m[1], code: m[2] });
  });
  if (options.length === 0) throw new Error("no .lang-option lines found (language menu missing)");

  // One menu = one contiguous run of option lines.
  const menus = [];
  for (const option of options) {
    const menu = menus[menus.length - 1];
    if (menu && option.index === menu[menu.length - 1].index + 1) menu.push(option);
    else menus.push([option]);
  }

  // Insert bottom-up so the indexes of the menus above stay valid.
  for (const menu of [...menus].reverse()) {
    if (menu.some((option) => option.code === code)) continue;
    const next = menu.find((option) => compareCodes(option.code, code) > 0);
    const last = menu[menu.length - 1];
    const at = next ? next.index : last.index + 1;
    const indent = (next ?? last).indent;
    lines.splice(
      at,
      0,
      `${indent}<a href="#" class="lang-option" data-lang="${code}" role="menuitem">${flag} ${native}</a>`
    );
  }
  return lines.join(eol);
}
