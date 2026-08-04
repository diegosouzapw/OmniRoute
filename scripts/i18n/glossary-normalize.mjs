/**
 * OmniRoute — shared glossary terminology normalization.
 *
 * Single implementation of the "canonical term" rules declared in
 * scripts/i18n/glossary/<locale>.json, used by three call sites so they can
 * never disagree about what canonical means:
 *
 *   - scripts/i18n/run-translation.mjs        (active docs pipeline)
 *   - scripts/i18n/generate-multilang.mjs     (deprecated legacy generator)
 *   - scripts/i18n/check-glossary-consistency.mjs (drift gate)
 *
 * Why `blockedPrefixes` exists: a synonym is matched as a plain substring, and
 * Chinese compounds have no word separators, so a synonym can appear inside an
 * unrelated term. 型別 ("type") sits across the character boundary of 模型別名
 * ("model alias") and is also the correct rendering of a programming data type
 * in 基本型別. Blocking on the preceding character keeps such a term enforced
 * instead of forcing it to be dropped from the glossary entirely.
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const GLOSSARY_DIR = path.join(SCRIPT_DIR, "glossary");

const cache = new Map();

/**
 * @param {string} haystack
 * @param {string} needle
 * @param {string[]} [blockedPrefixes]
 * @returns {boolean} true when at least one occurrence is NOT preceded by a blocked prefix
 */
export function hasUnblockedOccurrence(haystack, needle, blockedPrefixes = []) {
  if (!haystack || !needle) return false;
  const blocked = Array.isArray(blockedPrefixes) ? blockedPrefixes.filter(Boolean) : [];
  let from = 0;
  for (;;) {
    const at = haystack.indexOf(needle, from);
    if (at === -1) return false;
    const prev = at === 0 ? "" : haystack.slice(at - 1, at);
    if (!prev || !blocked.includes(prev)) return true;
    from = at + 1;
  }
}

/**
 * Flatten a parsed glossary into applicable replacement rules. Concepts with an
 * empty `synonyms` array are documentation-only and produce no rule.
 *
 * @param {object} glossary - parsed scripts/i18n/glossary/<locale>.json
 * @returns {Array<{synonym: string, canonical: string, blockedPrefixes: string[]}>}
 */
export function buildReplacements(glossary) {
  const terms = glossary && glossary.terms ? glossary.terms : {};
  const replacements = [];
  for (const def of Object.values(terms)) {
    if (!def || !def.canonical) continue;
    const synonyms = Array.isArray(def.synonyms) ? def.synonyms : [];
    const blockedPrefixes = Array.isArray(def.blockedPrefixes) ? def.blockedPrefixes : [];
    for (const synonym of synonyms) {
      if (!synonym) continue;
      replacements.push({ synonym, canonical: def.canonical, blockedPrefixes });
    }
  }
  return replacements;
}

/**
 * @param {string} locale
 * @returns {Array<{synonym: string, canonical: string, blockedPrefixes: string[]}>}
 */
export function loadReplacements(locale) {
  if (cache.has(locale)) return cache.get(locale);
  let replacements = [];
  try {
    const raw = readFileSync(path.join(GLOSSARY_DIR, `${locale}.json`), "utf8");
    replacements = buildReplacements(JSON.parse(raw));
  } catch {
    // No glossary for this locale (or unreadable) — normalization is optional.
    replacements = [];
  }
  cache.set(locale, replacements);
  return replacements;
}

/**
 * Apply one replacement rule, skipping blocked occurrences.
 *
 * @param {string} text
 * @param {{synonym: string, canonical: string, blockedPrefixes: string[]}} rule
 * @returns {string}
 */
export function applyReplacement(text, rule) {
  const { synonym, canonical, blockedPrefixes = [] } = rule;
  if (!synonym || !text.includes(synonym)) return text;
  let out = "";
  let from = 0;
  for (;;) {
    const at = text.indexOf(synonym, from);
    if (at === -1) return out + text.slice(from);
    const prev = at === 0 ? "" : text.slice(at - 1, at);
    const blocked = Boolean(prev) && blockedPrefixes.includes(prev);
    out += text.slice(from, at) + (blocked ? synonym : canonical);
    from = at + synonym.length;
  }
}

/**
 * Normalize a translated string to the locale's canonical terminology.
 * Returns the input unchanged when the locale has no glossary.
 *
 * @param {string} text
 * @param {string} locale
 * @returns {string}
 */
export function normalizeLocaleText(text, locale) {
  if (typeof text !== "string" || !text || !locale) return text;
  const replacements = loadReplacements(locale);
  if (replacements.length === 0) return text;
  let result = text;
  for (const rule of replacements) {
    result = applyReplacement(result, rule);
  }
  return result;
}
