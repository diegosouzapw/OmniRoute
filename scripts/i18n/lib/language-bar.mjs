/**
 * Shared builders for the `🌐 **Languages:** …` bars that head every English
 * doc and every translated mirror. `config` is the parsed `config/i18n.json`
 * (`locales[]` with `code`, `flag`, `native`); all paths are repo-relative POSIX
 * (`docs/guides/USER_GUIDE.md`, `README.md`) and the links are relative to the
 * file that carries the bar.
 *
 *   buildMirrorBar(rel, locale, config)  →  docs/i18n/<locale>/… format:
 *     🌐 **Languages:** 🇺🇸 [English](../../../README.md) · 🇸🇦 [ar](../ar/README.md) · …
 *   buildSourceBar(rel, config)          →  English source format:
 *     🌐 **Languages:** 🇺🇸 [English](./USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../i18n/pt-BR/docs/guides/USER_GUIDE.md) | …
 *   replaceLanguageBar(markdown, bar)    →  swaps EVERY language-bar line (any
 *                                          `🌐 **<label>:** …[…](…)`, translated labels
 *                                          included), `null` when there is none.
 */
import path from "node:path";

const DOCS_I18N = "docs/i18n";

function mirrorPath(relSource, locale) {
  return path.posix.join(DOCS_I18N, locale, relSource);
}

export function buildMirrorBar(relSource, locale, config) {
  const targetDir = path.posix.dirname(mirrorPath(relSource, locale));
  const parts = [`🇺🇸 [English](${path.posix.relative(targetDir, relSource)})`];
  for (const entry of config.locales) {
    if (entry.code === "en" || entry.code === locale) continue;
    const peer = path.posix.relative(targetDir, mirrorPath(relSource, entry.code));
    parts.push(`${entry.flag} [${entry.code}](${peer})`);
  }
  return `🌐 **Languages:** ${parts.join(" · ")}`;
}

export function buildSourceBar(relSource, config) {
  const sourceDir = path.posix.dirname(relSource);
  const parts = [`🇺🇸 [English](./${path.posix.basename(relSource)})`];
  for (const entry of config.locales) {
    if (entry.code === "en") continue;
    const peer = path.posix.relative(sourceDir, mirrorPath(relSource, entry.code));
    parts.push(`${entry.flag} [${entry.native ?? entry.name}](${peer})`);
  }
  return `🌐 **Languages:** ${parts.join(" | ")}`;
}

/**
 * A language-bar line has BOTH halves of the shape `🌐 **<label>:** …[…](…)`:
 *
 *   1. a bold label of 1–40 non-`*` characters closed by a colon (ASCII `:` or the
 *      fullwidth `：` the CJK mirrors use), followed by a space, and
 *   2. at least one markdown link — a bar without links is not a bar.
 *
 * The label is NOT pinned to the canonical English "Languages": older mirrors carry
 * whatever the translation backend produced (`🌐 **Idiomas:**`, `🌐 **語言：**`,
 * `🌐 **Available in:**`, …) and those bars are exactly the ones that still listed
 * retired locales, so syncLanguageBars must normalize them too. Both halves are
 * required so a future `🌐 **Website**` or `🌐 **Note:** we support many languages`
 * line is never silently overwritten. The label class is bounded and anchored, so
 * the regex cannot backtrack on the ~6 KB bar lines.
 */
const LANGUAGE_BAR_LABEL = /^🌐 \*\*[^*]{1,40}[:：]\*\* /;
const isLanguageBar = (line) => LANGUAGE_BAR_LABEL.test(line) && line.includes("](");

export function replaceLanguageBar(markdown, bar) {
  const lines = markdown.split("\n");
  let found = false;
  for (let index = 0; index < lines.length; index += 1) {
    if (!isLanguageBar(lines[index])) continue;
    lines[index] = bar;
    found = true;
  }
  // Every bar in the file describes the same file, so they all get the same
  // (correct) list: a stale second bar left in a translated body would otherwise
  // keep pointing at locales that no longer exist.
  return found ? lines.join("\n") : null;
}
