#!/usr/bin/env node
/**
 * OmniRoute — zh-CN terminology glossary consistency gate.
 *
 * Complements the existing parity (check-ui-keys-coverage.mjs) and ICU
 * (validate_translation.py) checks with a native-quality layer:
 *   - glossary-synonym: a value uses a non-canonical synonym for a concept
 *     that has an actively-normalized canonical rendering
 *     (scripts/i18n/glossary/<locale>.json).
 *   - protected-term-altered: a value renders a protected product/provider/
 *     protocol/CLI/env identifier (scripts/i18n/glossary/protected-terms.json)
 *     using a known incorrect translation instead of leaving it verbatim.
 *
 * Usage:
 *   node scripts/i18n/check-glossary-consistency.mjs                 # zh-CN, exit 1 on drift
 *   node scripts/i18n/check-glossary-consistency.mjs --locale=zh-CN
 *   node scripts/i18n/check-glossary-consistency.mjs --json
 *   node scripts/i18n/check-glossary-consistency.mjs --report        # print, always exit 0
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const MESSAGES_DIR = path.join(ROOT, "src", "i18n", "messages");
const GLOSSARY_DIR = path.join(SCRIPT_DIR, "glossary");
const LOG_PREFIX = "[i18n-glossary]";

// Small, maintained map of known incorrect renderings for protected terms —
// identifiers that must survive translation verbatim. NOT exhaustive by
// design (a full back-translation model is out of scope for a static gate),
// and deliberately conservative: an entry is only added once we've verified
// it doesn't collide with a legitimate, unrelated use of the same Chinese
// phrase elsewhere in the real catalog (e.g. a generic word for
// "authorization" is NOT a safe proxy for "OAuth was translated instead of
// left verbatim" — it fires on every unrelated auth string). Extend as new,
// non-colliding mistranslations are discovered in native review.
const KNOWN_MISTRANSLATIONS = {
  DATA_DIR: ["数据目录"],
};

function logInfo(...parts) {
  console.log(LOG_PREFIX, ...parts);
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function collectLeaves(obj, prefix = []) {
  const leaves = [];
  for (const [key, value] of Object.entries(obj)) {
    const next = [...prefix, key];
    if (isPlainObject(value)) {
      leaves.push(...collectLeaves(value, next));
    } else if (typeof value === "string") {
      leaves.push({ path: next.join("."), value });
    }
  }
  return leaves;
}

/**
 * Pure consistency check — no I/O. Mirrors evaluateFileSizes' split in
 * check-file-size.mjs (pure fn + separate CLI wrapper).
 *
 * @param {object} localeMessages - parsed src/i18n/messages/<locale>.json
 * @param {object} glossary - parsed scripts/i18n/glossary/<locale>.json
 * @param {string[]} protectedTerms - flat list from protected-terms.json
 * @returns {{violations: Array<object>}}
 */
export function checkGlossaryConsistency(localeMessages, glossary, protectedTerms) {
  const violations = [];
  const leaves = collectLeaves(localeMessages || {});

  const terms = glossary && glossary.terms ? glossary.terms : {};
  for (const [concept, def] of Object.entries(terms)) {
    const synonyms = Array.isArray(def.synonyms) ? def.synonyms : [];
    for (const synonym of synonyms) {
      if (!synonym) continue;
      for (const leaf of leaves) {
        if (leaf.value.includes(synonym)) {
          violations.push({
            type: "glossary-synonym",
            concept,
            path: leaf.path,
            found: synonym,
            canonical: def.canonical,
          });
        }
      }
    }
  }

  const protectedList = Array.isArray(protectedTerms) ? protectedTerms : [];
  for (const term of protectedList) {
    const badRenderings = KNOWN_MISTRANSLATIONS[term];
    if (!badRenderings || badRenderings.length === 0) continue;
    for (const bad of badRenderings) {
      for (const leaf of leaves) {
        if (leaf.value.includes(bad)) {
          violations.push({
            type: "protected-term-altered",
            term,
            path: leaf.path,
            found: bad,
          });
        }
      }
    }
  }

  return { violations };
}

function parseArgs(argv) {
  const opts = { locale: "zh-CN", json: false, report: false };
  for (const arg of argv.slice(2)) {
    if (arg.startsWith("--locale=")) {
      opts.locale = arg.slice(9);
    } else if (arg === "--json") {
      opts.json = true;
    } else if (arg === "--report") {
      opts.report = true;
    } else if (arg === "--help" || arg === "-h") {
      console.log(
        [
          "Usage: node scripts/i18n/check-glossary-consistency.mjs [options]",
          "",
          "  --locale=<code>   Locale to check (default zh-CN)",
          "  --json            Emit JSON report to stdout",
          "  --report          Print violations, exit 0 regardless",
        ].join("\n")
      );
      process.exit(0);
    }
  }
  return opts;
}

async function loadJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function main() {
  const opts = parseArgs(process.argv);

  const messagesPath = path.join(MESSAGES_DIR, `${opts.locale}.json`);
  const glossaryPath = path.join(GLOSSARY_DIR, `${opts.locale}.json`);
  const protectedPath = path.join(GLOSSARY_DIR, "protected-terms.json");

  const [messages, glossary, protectedData] = await Promise.all([
    loadJson(messagesPath),
    loadJson(glossaryPath),
    loadJson(protectedPath),
  ]);
  const protectedTerms = Array.isArray(protectedData.terms) ? protectedData.terms : [];

  const { violations } = checkGlossaryConsistency(messages, glossary, protectedTerms);

  if (opts.json) {
    process.stdout.write(
      JSON.stringify({ locale: opts.locale, ok: violations.length === 0, violations }, null, 2) +
        "\n"
    );
    if (violations.length && !opts.report) process.exit(1);
    return;
  }

  if (violations.length === 0) {
    logInfo(`PASS — ${opts.locale} has no glossary/protected-term drift.`);
    return;
  }

  logInfo(`FAIL — ${violations.length} violation(s) in ${opts.locale}.`);
  for (const v of violations.slice(0, 50)) {
    if (v.type === "glossary-synonym") {
      console.log(`  - [${v.concept}] ${v.path}: found "${v.found}", canonical is "${v.canonical}"`);
    } else {
      console.log(`  - [protected-term] ${v.path}: "${v.term}" rendered as "${v.found}"`);
    }
  }
  if (violations.length > 50) {
    console.log(`  ... and ${violations.length - 50} more`);
  }
  if (!opts.report) process.exit(1);
}

const isDirectRun = import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  main().catch((err) => {
    console.error(LOG_PREFIX, "ERROR", err?.stack || err?.message || String(err));
    process.exit(1);
  });
}
